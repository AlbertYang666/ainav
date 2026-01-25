# 邮件通知系统使用指南

## 功能概述

AI Nav 集成了完整的邮件通知系统，支持以下功能：

1. **自动通知**
   - ✅ 新评论提交时自动通知管理员
   - ✅ 新工具提交时自动通知管理员

2. **手动推送**
   - 📧 向用户发送精选工具推荐邮件

## 配置步骤

### 1. 注册 Resend 账号

1. 访问 [Resend](https://resend.com)
2. 注册并验证您的域名
3. 获取 API Key

### 2. 配置环境变量

在 `.env.local` 文件中添加以下配置：

```bash
# Resend API Key
RESEND_API_KEY=re_your_api_key_here

# 发件人邮箱（必须是您在 Resend 中验证过的域名）
EMAIL_FROM=noreply@ainav.space

# 管理员邮箱（接收通知）
ADMIN_EMAIL=admin@ainav.space

# 网站URL（用于邮件中的链接）
NEXT_PUBLIC_SITE_URL=https://ainav.space
```

### 3. 验证域名（重要）

在 Resend 控制台中验证您的域名：

- 添加 DNS 记录（SPF, DKIM, DMARC）
- 等待验证通过
- 使用验证过的域名作为 `EMAIL_FROM`

## 邮件类型

### 1. 评论审核通知

**触发时机**：用户提交新评论

**发送至**：ADMIN_EMAIL

**内容包含**：

- 服务名称
- 评分（星级）
- 评论标题和内容
- 审核链接

**代码位置**：

- API: `src/app/api/reviews/submit/route.ts`
- 模板: `src/lib/email.ts` - `sendReviewModerationEmail()`

### 2. 工具提交通知

**触发时机**：用户提交新工具

**发送至**：ADMIN_EMAIL

**内容包含**：

- 工具名称和URL
- 分类
- 描述
- 提交者邮箱
- 审核链接

**代码位置**：

- API: `src/app/api/submit/route.ts`
- 模板: `src/lib/email.ts` - `sendNewToolSubmissionEmail()`

### 3. 工具推荐邮件

**触发方式**：管理员手动发送

**发送至**：指定的用户邮箱列表

**内容包含**：

- 精选工具列表（默认5个）
- 工具名称、描述、分类
- 工具详情链接
- 取消订阅链接

**代码位置**：

- API: `src/app/api/admin/send-recommendations/route.ts`
- UI: `src/app/admin/emails/page.tsx`
- 模板: `src/lib/email.ts` - `sendToolRecommendationEmail()`

## 使用方法

### 发送工具推荐邮件

1. 登录管理后台
2. 访问 `/admin/emails`
3. 输入收件人邮箱（每行一个或逗号分隔）
4. 点击"发送推荐邮件"

### API 调用示例

```typescript
// 发送推荐邮件（需要管理员权限）
const response = await fetch("/api/admin/send-recommendations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    emails: ["user1@example.com", "user2@example.com"],
    toolIds: ["chatgpt", "claude", "midjourney"], // 可选，不提供则使用默认精选
  }),
});

const data = await response.json();
console.log(data.message); // "成功发送 2 封邮件"
```

## 邮件模板

所有邮件模板都采用响应式 HTML 设计，包含：

- 渐变色标题
- 卡片式内容布局
- 行动按钮
- 品牌页脚
- 深色模式适配

可在 `src/lib/email.ts` 中自定义模板样式。

## 测试

### 开发环境测试

由于没有配置 RESEND_API_KEY，邮件不会真实发送，但会在控制台打印日志：

```
[Email] Skipping email send (no RESEND_API_KEY configured)
[Email] To: admin@ainav.space, Subject: [AI Nav] 新评论待审核: ChatGPT
```

### 生产环境测试

1. 配置好所有环境变量
2. 提交一条测试评论
3. 检查管理员邮箱是否收到通知

## 最佳实践

1. **邮件发送频率控制**
   - 推荐邮件：每周不超过1次
   - 避免短时间内大量发送

2. **邮箱列表管理**
   - 提供取消订阅功能
   - 定期清理无效邮箱

3. **内容质量**
   - 精选高质量工具推荐
   - 邮件内容简洁明了

4. **监控**
   - 关注邮件送达率
   - 检查 Resend 控制台的统计数据

## 故障排查

### 邮件未发送

1. 检查 `RESEND_API_KEY` 是否正确
2. 确认 `EMAIL_FROM` 域名已验证
3. 查看服务器日志是否有错误

### 邮件进入垃圾箱

1. 确保 DNS 记录配置正确（SPF, DKIM, DMARC）
2. 避免使用垃圾邮件关键词
3. 提供清晰的取消订阅链接

### API 返回 401 错误

确保已登录且账号具有管理员权限：

- 邮箱在 `ADMIN_EMAILS` 环境变量中
- 或者是开发环境的测试账号

## 扩展功能

可以基于现有系统实现：

1. **定时推送**
   - 使用 Vercel Cron Jobs
   - 每周自动发送推荐邮件

2. **个性化推荐**
   - 根据用户浏览历史
   - 基于分类偏好推荐

3. **邮件统计**
   - 打开率追踪
   - 点击率分析

4. **模板管理**
   - 使用 React Email 组件
   - 可视化编辑器

## 相关文档

- [Resend 官方文档](https://resend.com/docs)
- [React Email](https://react.email)
- [NextAuth.js](https://next-auth.js.org)
