# AI导航 - ainav.space

精选优质AI工具导航网站，收录ChatGPT、Midjourney等热门AI服务。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **部署**: 静态导出 (Static Export)

## 功能特性

✅ 静态网站生成 (SSG)  
✅ SEO优化（sitemap、robots.txt、meta标签）  
✅ 响应式设计  
✅ 深色模式支持  
✅ 分类浏览  
✅ 搜索功能  
✅ 零服务器成本  

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 项目结构

```
ainav/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── category/     # 分类页面
│   │   ├── search/       # 搜索页面
│   │   ├── layout.tsx    # 全局布局
│   │   ├── page.tsx      # 首页
│   │   ├── sitemap.ts    # 站点地图
│   │   └── robots.ts     # robots.txt
│   ├── components/       # React 组件
│   │   ├── AIServiceCard.tsx
│   │   ├── CategoryCard.tsx
│   │   └── SearchBar.tsx
│   ├── lib/              # 工具函数
│   │   ├── data.ts       # 数据处理
│   │   └── seo.ts        # SEO配置
│   └── types/            # TypeScript 类型
│       └── index.ts
├── data/                 # 数据文件
│   ├── ai-services.json  # AI工具数据
│   └── categories.json   # 分类数据
├── public/               # 静态资源
├── next.config.ts        # Next.js 配置
└── package.json
```

## 添加新的AI工具

编辑 `data/ai-services.json`，添加新条目：

```json
{
  "id": "unique-id",
  "name": "工具名称",
  "description": "工具描述",
  "url": "https://example.com",
  "category": "chat",
  "tags": ["标签1", "标签2"],
  "featured": true,
  "pricing": "freemium",
  "language": ["zh", "en"]
}
```

## 部署

### Vercel (推荐)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. 将项目推送到 GitHub
2. 在 Vercel 导入项目
3. 自动检测为 Next.js 项目
4. 点击部署
5. 绑定自定义域名 `ainav.space`

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Netlify

1. 构建命令: `pnpm build`
2. 发布目录: `out`
3. 绑定域名

### GitHub Pages

```bash
pnpm build
# 将 out 目录的内容推送到 gh-pages 分支
```

## SEO 优化

- ✅ 自动生成 sitemap.xml
- ✅ 自动生成 robots.txt
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ 语义化 HTML
- ✅ 移动端友好

## 许可证

MIT License

---

**域名**: ainav.space  
**维护**: AI Nav Team  
**更新**: 2026

