<div align="center">
  <h1>🚀 AI 导航 - ainav.space</h1>
  <p><strong>精选全球优质 AI 工具 | 72 AI 服务 | 16 大分类 | 5 种语言</strong></p>
  
  <p>
    <a href="https://ainav.space">🌐 在线访问</a> •
    <a href="#特色功能">✨ 特色功能</a> •
    <a href="#快速开始">🎯 快速开始</a> •
    <a href="#贡献指南">🤝 贡献指南</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>

  <p>
    <strong>🇨🇳 中文</strong> | <a href="README.md">🇺🇸 English</a>
  </p>
</div>

---

## 📖 项目简介

**AI 导航**是一个精心策划的 AI 工具导航网站，帮助用户快速发现和探索最新、最实用的人工智能服务。

### 🎯 为什么选择 AI 导航？

- 🎨 **精选收录** - 72 精选 AI 工具，覆盖 16 大应用场景
- 🔍 **智能搜索** - 快速查找你需要的 AI 工具
- 🏷️ **分类清晰** - 对话、绘画、视频、编程、音乐等 16 大分类
- 🌍 **多语言支持** - 支持中文、English、日本語、한국어、Français 五种语言
- 🌓 **深色模式** - 支持浅色/深色主题切换
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **极速加载** - 静态网站生成，秒开无等待
- 🆓 **完全免费** - 无广告，无需注册

### 📊 数据统计

| 项目 | 数量 |
|------|------|
| AI 工具总数 | 72 |
| 分类数量 | 16 |
| 支持语言 | 5 |
| 精选推荐 | 11 |
| 支持中文工具 | 25+ |

## ✨ 特色功能

### 🔥 热门工具
- **对话类**: ChatGPT、Claude、Gemini、Kimi、文心一言等
- **绘画类**: Midjourney、Stable Diffusion、DALL·E 3、Firefly等
- **编程类**: GitHub Copilot、Cursor、v0、Codeium等
- **视频类**: Runway、Pika、Synthesia、HeyGen等
- **音乐类**: Suno、Udio、AIVA等

### 🎨 功能亮点
- ✅ **智能搜索** - 支持名称、描述、标签多维度搜索
- ✅ **分类浏览** - 16 大分类，快速定位所需工具
- ✅ **多语言支持** - 完整的 5 语言翻译（中/英/日/韩/法）
- ✅ **移动端优化** - 响应式导航，图标化操作，完美适配手机
- ✅ **工具提交** - 在线表单提交新工具，后台审核
- ✅ **评论系统** - 用户评分和评论（Supabase 存储）
- ✅ **管理后台** - NextAuth 登录，评论/服务/提交审核
- ✅ **SEO 优化** - 完善的 SEO 配置，易被搜索引擎收录

## 🎯 快速开始

### 📦 安装依赖

```bash
# 克隆项目
git clone https://github.com/AlbertYang666/ainav.git
cd ainav

# 安装依赖（需要 Node.js >= 20.9.0）
pnpm install
# 或使用 npm
npm install
```

### ⚙️ 环境配置

创建 `.env.local` 文件：

```bash
# Supabase（评论、评分、提交功能）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth（管理后台登录）
AUTH_SECRET=your_auth_secret  # 使用 openssl rand -base64 32 生成
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
ADMIN_EMAILS=admin@example.com  # 管理员邮箱，逗号分隔
```

### 🚀 运行项目

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 📦 构建部署

```bash
# 构建生产版本
pnpm build
```

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **Next.js 16** | React 框架，支持 SSG 和 App Router |
| **TypeScript 5** | 类型安全的 JavaScript |
| **Tailwind CSS 4** | 实用优先的 CSS 框架 |
| **React 19** | 最新的 React 版本 |
| **NextAuth v5** | 身份认证（GitHub OAuth） |
| **Supabase** | 后端数据库（评论、评分、提交） |

## 📂 项目结构

```
ainav/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── [lang]/       # 多语言路由（支持 zh/en/ja/ko/fr）
│   │   │   ├── category/[id]/  # 分类页面
│   │   │   ├── search/         # 搜索页面
│   │   │   └── submit/         # 提交页面
│   │   ├── admin/        # 管理后台
│   │   │   ├── reviews/        # 评论管理
│   │   │   ├── services/       # 服务管理
│   │   │   └── submissions/    # 提交审核
│   │   ├── api/          # API 路由
│   │   │   ├── admin/          # 管理接口
│   │   │   ├── auth/           # NextAuth 认证
│   │   │   ├── reviews/        # 评论接口
│   │   │   └── submit/         # 提交接口
│   │   ├── auth/         # 登录页面
│   │   ├── layout.tsx    # 全局布局
│   │   ├── page.tsx      # 首页重定向
│   │   ├── sitemap.ts    # 站点地图
│   │   └── robots.ts     # robots.txt
│   ├── components/       # React 组件
│   │   ├── AIServiceCard.tsx
│   │   ├── AuthProvider.tsx    # NextAuth Provider
│   │   ├── CategoryCard.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ReviewSection.tsx   # 评论组件
│   │   ├── SearchBar.tsx
│   │   ├── SubmitForm.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── UserMenu.tsx        # 用户菜单
│   ├── lib/              # 工具函数
│   │   ├── data.ts       # 数据处理
│   │   ├── i18n.ts       # 国际化配置
│   │   ├── seo.ts        # SEO配置
│   │   └── supabase.ts   # Supabase 客户端
│   └── types/            # TypeScript 类型
│       ├── index.ts
│       └── next-auth.d.ts      # NextAuth 类型扩展
├── locales/              # 多语言翻译文件
├── data/                 # AI工具数据
├── supabase/             # Supabase Schema
├── public/               # 静态资源
└── package.json
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 提交新的 AI 工具

1. **方式一**：访问 [提交页面](https://ainav.space/submit) 在线提交（推荐）
2. **方式二**：直接编辑 `data/ai-services.json` 并提交 PR

### 添加新工具格式

编辑 `data/ai-services.json`：

```json
{
  "id": "unique-id",
  "name": "工具名称",
  "description": "工具描述（简明扼要）",
  "url": "https://example.com",
  "category": "chat",  // 从16个分类中选择
  "tags": ["标签1", "标签2", "标签3"],
  "featured": false,  // 是否精选推荐
  "pricing": "freemium",  // free/freemium/paid
  "language": ["zh", "en"]  // 支持的语言
}
```

### 贡献流程

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/amazing-tool`)
3. 提交更改 (`git commit -m 'Add: 新增某某工具'`)
4. 推送到分支 (`git push origin feature/amazing-tool`)
5. 提交 Pull Request

## 📝 待办清单

- [x] 添加工具评分和评论功能
- [x] 支持多语言（中文/英文/日语/韩语/法语）
- [x] 移动端导航优化（响应式设计）
- [x] 管理后台（NextAuth + Supabase）
- [x] 在线工具提交系统
- [ ] 添加工具对比功能
- [ ] 集成用户收藏功能
- [ ] 添加工具更新日志
- [ ] 开发移动端 App

## ⭐ Star History

如果这个项目对你有帮助，请给它一个 ⭐️ Star！

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 🔗 相关链接

- **官方网站**: [ainav.space](https://ainav.space)
- **GitHub**: [AlbertYang666/ainav](https://github.com/AlbertYang666/ainav)
- **问题反馈**: [Issues](https://github.com/AlbertYang666/ainav/issues)
- **提交工具**: [Submit](https://ainav.space/submit)

## 💬 联系我们

- 提交 Issue: [GitHub Issues](https://github.com/AlbertYang666/ainav/issues)
- 功能建议: [GitHub Discussions](https://github.com/AlbertYang666/ainav/discussions)

---

<div align="center">
  <p>如果觉得这个项目有帮助，请给它一个 ⭐️</p>
  <p>© 2026 <a href="https://ainav.space">ainav.space</a> • Made with ❤️ by <a href="https://github.com/AlbertYang666">AlbertYang666</a></p>
</div>

