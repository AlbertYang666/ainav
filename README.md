<div align="center">
  <h1>🚀 AI Directory - ainav.space</h1>
  <p><strong>Curated AI Tools Directory | 72 AI Services | 16 Categories | 5 Languages</strong></p>
  
  <p>
    <a href="https://ainav.space">🌐 Live Demo</a> •
    <a href="#features">✨ Features</a> •
    <a href="#quick-start">🎯 Quick Start</a> •
    <a href="#contributing">🤝 Contributing</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>

  <p>
    <a href="https://www.producthunt.com/products/ai-directory-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-ai-directory-4" target="_blank" rel="noopener noreferrer">
      <img alt="AI Directory - Discover the best AI tools | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1067417&theme=light" />
    </a>
  </p>

  <p>
    <a href="README.zh.md">🇨🇳 中文</a> | <strong>🇺🇸 English</strong>
  </p>
</div>

---

## 📖 About

**AI Directory** is a carefully curated AI tools directory website that helps users quickly discover and explore the latest and most practical artificial intelligence services.

### 🎯 Why AI Directory?

- 🎨 **Curated Collection** - 72 handpicked AI tools across 16 categories
- 🔍 **Smart Search** - Quickly find the AI tools you need
- 🏷️ **Clear Categories** - Chat, Image, Video, Coding, Music and more
- 🌍 **Multi-language** - Supports English, 中文, 日本語, 한국어, Français
- 🌓 **Dark Mode** - Light/Dark theme switching
- 📱 **Responsive Design** - Perfect on desktop and mobile
- ⚡ **Fast Loading** - Static site generation, instant load
- 🆓 **Completely Free** - No ads, no registration required
- [Nick Launches](https://nicklaunches.com/) - Launch platform for builders, AI startups, and SaaS founders to get discovered and earn a permanent dofollow backlink.

### 📊 Statistics

| Item           | Count |
| -------------- | ----- |
| Total AI Tools | 72    |
| Categories     | 16    |
| Languages      | 5     |
| Featured Tools | 11    |
| Chinese Tools  | 25+   |

## ✨ Features

### 🔥 Popular Tools

- **Chat**: ChatGPT, Claude, Gemini, Kimi, Wenxin Yiyan, etc.
- **Image**: Midjourney, Stable Diffusion, DALL·E 3, Firefly, etc.
- **Coding**: GitHub Copilot, Cursor, v0, Codeium, etc.
- **Video**: Runway, Pika, Synthesia, HeyGen, etc.
- **Music**: Suno, Udio, AIVA, etc.

### 🎨 Highlights

- ✅ **Smart Search** - Search by name, description, and tags
- ✅ **Category Browsing** - 16 categories for quick navigation
- ✅ **Multi-language** - Full translations in 5 languages
- ✅ **Mobile Optimized** - Responsive navigation, icon-based UI
- ✅ **Tool Submission** - Online form submission with admin review
- ✅ **Review System** - User ratings and reviews (Supabase storage)
- ✅ **Admin Dashboard** - NextAuth login, review/service/submission management
- ✅ **Tool Comparison** - Compare up to 4 AI tools side by side
- ✅ **SEO Optimized** - Comprehensive SEO configuration

## 🎯 Quick Start

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AlbertYang666/ainav.git
cd ainav

# Install dependencies (requires Node.js >= 20.9.0)
pnpm install
# or use npm
npm install
```

### ⚙️ Configuration

Create `.env.local` file:

```bash
# Supabase (for reviews, ratings, submissions)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth (for admin dashboard login)
AUTH_SECRET=your_auth_secret  # Generate with: openssl rand -base64 32
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
ADMIN_EMAILS=admin@example.com  # Admin emails, comma separated
```

### 🚀 Development

```bash
# Start development server
pnpm dev

# Visit http://localhost:3000
```

### 📦 Build

```bash
# Build for production
pnpm build
```

## 🛠️ Tech Stack

| Technology         | Description                                      |
| ------------------ | ------------------------------------------------ |
| **Next.js 16**     | React framework with SSG and App Router          |
| **TypeScript 5**   | Type-safe JavaScript                             |
| **Tailwind CSS 4** | Utility-first CSS framework                      |
| **React 19**       | Latest React version                             |
| **NextAuth v5**    | Authentication (GitHub OAuth)                    |
| **Supabase**       | Backend database (reviews, ratings, submissions) |

## 📂 Project Structure

```
ainav/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── [lang]/       # Multi-language routes (en/zh/ja/ko/fr)
│   │   │   ├── category/[id]/  # Category pages
│   │   │   ├── compare/        # Tool comparison page
│   │   │   ├── search/         # Search page
│   │   │   └── submit/         # Submit page
│   │   ├── admin/        # Admin dashboard
│   │   │   ├── reviews/        # Review management
│   │   │   ├── services/       # Service management
│   │   │   └── submissions/    # Submission review
│   │   ├── api/          # API routes
│   │   │   ├── admin/          # Admin APIs
│   │   │   ├── auth/           # NextAuth
│   │   │   ├── reviews/        # Review APIs
│   │   │   └── submit/         # Submit API
│   │   ├── auth/         # Login pages
│   │   ├── layout.tsx    # Global layout
│   │   ├── page.tsx      # Home redirect
│   │   ├── sitemap.ts    # Sitemap
│   │   └── robots.ts     # robots.txt
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── locales/              # Translation files
├── data/                 # AI tools data
├── supabase/             # Supabase schema
├── public/               # Static assets
└── package.json
```

## 🤝 Contributing

We welcome contributions of all kinds!

### Submit a New AI Tool

1. **Option 1**: Visit the [Submit page](https://ainav.space/submit) (recommended)
2. **Option 2**: Edit `data/ai-services.json` and submit a PR

### Tool Data Format

Edit `data/ai-services.json`:

```json
{
  "id": "unique-id",
  "name": "Tool Name",
  "description": "Brief description of the tool",
  "url": "https://example.com",
  "category": "chat", // Choose from 16 categories
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false, // Featured recommendation
  "pricing": "freemium", // free/freemium/paid
  "language": ["zh", "en"] // Supported languages
}
```

### Contribution Workflow

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add: new amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Submit a Pull Request

## 📝 Roadmap

- [x] Tool ratings and reviews
- [x] Multi-language support (EN/ZH/JA/KO/FR)
- [x] Mobile navigation optimization
- [x] Admin dashboard (NextAuth + Supabase)
- [x] Online tool submission system
- [x] Tool comparison feature
- [ ] User favorites/bookmarks
- [ ] Tool changelog
- [ ] Mobile app

## ⭐ Star History

If this project helps you, please give it a ⭐️ Star!

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🔗 Links

- **Website**: [ainav.space](https://ainav.space)
- **GitHub**: [AlbertYang666/ainav](https://github.com/AlbertYang666/ainav)
- **Issues**: [GitHub Issues](https://github.com/AlbertYang666/ainav/issues)
- **Submit Tool**: [Submit](https://ainav.space/submit)

## 💬 Contact

- Submit Issue: [GitHub Issues](https://github.com/AlbertYang666/ainav/issues)
- Feature Request: [GitHub Discussions](https://github.com/AlbertYang666/ainav/discussions)

---

<div align="center">
  <p>If you find this project helpful, please give it a ⭐️</p>
  <p>© 2026 <a href="https://ainav.space">ainav.space</a> • Made with ❤️ by <a href="https://github.com/AlbertYang666">AlbertYang666</a></p>
</div>
