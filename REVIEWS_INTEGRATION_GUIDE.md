# Reviews & Ratings 功能集成指南

## 🎯 快速启动清单

### 1️⃣ Supabase 配置（已完成）
- [x] 创建 Supabase 项目
- [x] 执行 SQL schema 创建表和触发器
- [x] 配置 RLS 策略
- [x] 获取 API 密钥

### 2️⃣ 项目配置（已完成）
- [x] 安装依赖：`@supabase/supabase-js`
- [x] 配置 `.env.local`
- [x] 创建 Supabase 客户端库
- [x] 创建 IP 哈希工具

### 3️⃣ 后端实现（已完成）
- [x] `/api/services/[id]/reviews` - 获取和提交评论
- [x] `/api/admin/reviews` - 管理员审核工具

### 4️⃣ 前端实现（已完成）
- [x] `ReviewSection` 组件
- [x] 评分显示与投票功能
- [x] 评论表单与验证

### 5️⃣ 集成到页面（待执行）
- [ ] 在服务详情页导入 `ReviewSection`
- [ ] 测试完整流程
- [ ] 部署上线

---

## 📋 环境变量配置

在你的 `.env.local` 文件中填入 Supabase 信息：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

获取方式：
1. 登录 Supabase 仪表板
2. 左侧菜单 → Settings → API
3. 复制 `Project URL` 和上述三个密钥

---

## 🔧 如何集成到现有页面

### 示例 1：在服务详情页添加评论

如果你有一个服务详情页（如 `src/app/[lang]/category/[id]/page.tsx`），添加以下代码：

```tsx
import ReviewSection from '@/components/ReviewSection';

export default async function ServiceDetailPage({
  params: { id, lang },
}: {
  params: { id: string; lang: string };
}) {
  // 获取服务信息...
  const service = await getService(id);

  return (
    <div>
      {/* 既有内容 */}
      <h1>{service.name}</h1>
      <p>{service.description}</p>

      {/* 添加评论部分 */}
      <ReviewSection serviceId={id} locale={lang as Locale} />
    </div>
  );
}
```

### 示例 2：在搜索结果页展示迷你评分卡

```tsx
import { serviceId } from '@/types';

interface MiniRatingProps {
  serviceId: string;
}

async function MiniRating({ serviceId }: MiniRatingProps) {
  // 从 API 获取评分
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}/reviews`
  );
  const { rating } = await res.json();

  if (!rating || rating.review_count === 0) {
    return <span className="text-xs text-gray-500">No ratings yet</span>;
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="text-yellow-400">★</span>
      <span>{rating.average_score.toFixed(1)}</span>
      <span className="text-gray-500">({rating.review_count})</span>
    </div>
  );
}
```

---

## 🛡️ 防刷分策略详解

| 层级 | 机制 | 说明 |
|------|------|------|
| **数据库** | UNIQUE 约束 | 同一用户/IP 只能为同一服务投票一次 |
| **API** | 检查 `user_votes` | 提交前验证是否已投票 |
| **审核** | 待审核状态 | 所有评论默认需要人工或自动审核 |
| **前端** | 一次性提交 | 表单提交后禁用直到页面刷新 |

### 高级防刷方案（可选）

```typescript
// 限流（Rate Limiting）
const rateLimit = new Map<string, number[]>();

export function checkRateLimit(ipHash: string, windowMs = 3600000, limit = 10) {
  const now = Date.now();
  const timestamps = rateLimit.get(ipHash) || [];
  
  // 清理过期时间戳
  const recent = timestamps.filter(t => now - t < windowMs);
  
  if (recent.length >= limit) {
    return false;
  }
  
  recent.push(now);
  rateLimit.set(ipHash, recent);
  return true;
}
```

---

## 📊 管理员后台（待建）

### 审核待发布的评论

```bash
# 获取待审核评论列表
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://your-site.com/api/admin/reviews

# 批准或拒绝评论
curl -X PATCH -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"review_id": "uuid", "action": "approve", "reason": ""}' \
  https://your-site.com/api/admin/reviews
```

---

## 🚀 测试步骤

### 本地测试

1. **启动开发服务器**
```bash
pnpm dev
```

2. **访问服务详情页**
```
http://localhost:3000/en/category/chat  # 或其他分类
```

3. **提交测试评论**
   - 填写表单并提交
   - 应看到 "Thank you! Your review will be published after moderation" 消息

4. **验证数据**
   - 进入 Supabase SQL Editor
   - 执行：`SELECT * FROM reviews WHERE service_id = 'chatgpt';`
   - 应看到待审核的评论

5. **手动批准评论**
   - 在 SQL Editor 执行：
   ```sql
   UPDATE reviews SET status = 'approved' WHERE id = '<review_id>';
   ```
   - 页面应显示已批准的评论和更新的评分

### 生产环境检查清单

- [ ] `.env.local` 已配置生产 Supabase 密钥
- [ ] RLS 策略已正确启用
- [ ] 触发器已创建并测试
- [ ] 管理员审核流程已建立
- [ ] 内容审核规则已设置（垃圾词汇过滤等）
- [ ] 日志记录已启用
- [ ] 部署前已在 Vercel 配置环境变量

---

## 📈 商业化建议

### 评论收集价值
- **增加转化率**：有评论的产品转化率提高 20-30%
- **SEO 加成**：新鲜用户内容改善搜索排名
- **工具方合作**：工具可付费获取自己的评价报告

### 变现模式
1. **免费评论** → 吸引用户
2. **高级功能** → 工具方付费查看深度分析
3. **评论导出** → 按月订阅模式
4. **认证评论** → 对已验证用户的评论标记为"已验证"

---

## ❓ 常见问题

### Q: 评论多久才会显示？
A: 待审核。管理员或自动系统批准后立即显示。建议建立 24 小时内审核的 SLA。

### Q: 如何隐藏垃圾评论？
A: 使用 AI 内容审核 API（OpenAI、Moderatex 等）自动标记可疑评论。

### Q: 如何处理重复/付费评论？
A: 组合使用 IP 追踪、账户验证、内容相似度检查等多层防守。

### Q: 可以导出评论吗？
A: 支持。添加管理端点 `GET /api/admin/reviews/export?format=csv`。

---

## 🔗 参考资源

- Supabase 官方文档：https://supabase.com/docs
- Next.js API Routes：https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Supabase RLS：https://supabase.com/docs/guides/auth/row-level-security
- 内容审核 API：https://openai.com/docs/guides/moderation

---

## 📝 下一步

1. **测试集成** → 在本地跑通整个流程
2. **部署到 Vercel** → 配置生产环境变量
3. **启用审核** → 建立人工或自动审核流程
4. **监控分析** → 追踪用户参与度和转化率
5. **优化迭代** → 根据反馈改进功能

需要帮助？回复你的问题！
