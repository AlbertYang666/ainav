import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';

// 管理员邮箱列表
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());

// 动态构建 providers 列表
const providers: Provider[] = [];

// 只有配置了 GitHub OAuth 时才添加
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  );
}

// 只有配置了 Google OAuth 时才添加
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

// 开发环境下的 Credentials 登录（用于测试）
if (process.env.NODE_ENV === 'development') {
  providers.push(
    Credentials({
      name: 'Dev Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 开发环境简单验证
        if (
          credentials?.email === 'admin@example.com' &&
          credentials?.password === 'admin123'
        ) {
          return {
            id: 'dev-admin',
            email: 'admin@example.com',
            name: 'Dev Admin',
          };
        }
        return null;
      },
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  basePath: '/api/auth',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    // 登录成功后的重定向
    async signIn({ user }) {
      // 检查是否是管理员
      if (user?.email && (ADMIN_EMAILS.includes(user.email) || user.email === 'admin@example.com')) {
        // 管理员登录成功，标记为管理员
        return true;
      }
      // 普通用户也允许登录
      return true;
    },
    // 重定向回调
    async redirect({ url, baseUrl }) {
      // 如果 URL 以 baseUrl 开头，保持原样
      if (url.startsWith(baseUrl)) return url;
      // 如果是相对路径
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // 默认返回首页
      return baseUrl;
    },
    // 添加用户角色到 session
    async jwt({ token, user }) {
      if (user?.email) {
        token.isAdmin = ADMIN_EMAILS.includes(user.email) || user.email === 'admin@example.com';
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
