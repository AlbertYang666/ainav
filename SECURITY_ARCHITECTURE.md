# 🔐 评论系统安全架构说明

## 混合模式架构（方案 A）

### 📊 架构图

```
用户浏览器
    ↓
    ├─→ 读取评论 → Supabase (ANON_KEY, 只读)
    │   ✅ 客户端直连，快速
    │   ✅ RLS 保护，只能读取 approved 评论
    │
    └─→ 提交评论 → Vercel Serverless Function
        ↓
        真实 IP 检测 + 速率限制
        ↓
        Supabase (SERVICE_ROLE_KEY, 服务端)
        ✅ 完整权限，安全验证
```

---

## 🛡️ 安全措施

### 1. 密钥分离

| 密钥 | 位置 | 权限 | 用途 |
|------|------|------|------|
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 客户端（公开） | 只读 | 读取已批准的评论 |
| `SUPABASE_SERVICE_ROLE_KEY` | 服务端（私密） | 完整 | 写入、验证、管理 |

### 2. RLS（行级安全）策略

```sql
-- 用户只能读取已批准的评论
CREATE POLICY "reviews_read_approved" 
ON reviews FOR SELECT 
USING (status = 'approved');

-- 禁止客户端直接写入
CREATE POLICY "reviews_insert_denied" 
ON reviews FOR INSERT 
WITH CHECK (false);
```

### 3. 服务端验证（API 路由）

- ✅ **真实 IP 检测**：使用 Vercel 提供的 IP 头
- ✅ **速率限制**：每小时最多 5 次提交
- ✅ **输入验证**：长度、格式、必填字段
- ✅ **防重复提交**：IP 哈希 + 服务 ID 唯一约束
- ✅ **自动审核**：所有评论默认 `pending` 状态

### 4. 数据库约束

```sql
-- 评分范围
CHECK (rating >= 1 AND rating <= 5)

-- 防重复
UNIQUE(ip_hash, service_id)

-- 内容长度
CHECK (length(content) >= 10 AND length(content) <= 5000)
```

---

## 🚀 部署到 Vercel

### 环境变量配置

在 Vercel 仪表板设置以下环境变量：

```bash
# 客户端可见（自动添加到浏览器）
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...（anon key）

# 服务端专用（仅 Serverless Functions 可访问）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...（service_role key）
```

### 部署步骤

1. **推送代码到 GitHub**
```bash
git add -A
git commit -m "feat: implement secure review system with serverless functions"
git push origin main
```

2. **在 Vercel 导入项目**
   - 访问 https://vercel.com/new
   - 选择你的 GitHub 仓库 `ainav`
   - 点击 "Import"

3. **配置环境变量**
   - 在 Vercel 项目设置 → Environment Variables
   - 添加上述三个变量

4. **部署**
   - Vercel 会自动构建和部署
   - 检查部署日志确认成功

---

## ✅ 安全性优势

### vs. 完全客户端方案

| 特性 | 客户端直连 | 混合模式（当前） |
|------|-----------|-----------------|
| 真实 IP 检测 | ❌ 可伪造 | ✅ Vercel 提供真实 IP |
| 速率限制 | ❌ 无法实现 | ✅ 服务端限制 |
| 业务逻辑 | ❌ 可绕过 | ✅ 服务端强制执行 |
| 敏感 Key | ⚠️ 可能暴露 | ✅ 服务端私密 |
| 性能 | ⭐⭐⭐ | ⭐⭐⭐ |

### vs. 完全 SSR 方案

| 特性 | 完全 SSR | 混合模式（当前） |
|------|---------|-----------------|
| SEO | ⭐⭐⭐ | ⭐⭐⭐ |
| 首屏速度 | ⭐⭐ | ⭐⭐⭐ |
| 服务器成本 | 💰💰💰 | 💰 |
| 缓存能力 | ⭐⭐ | ⭐⭐⭐ |
| 安全性 | ⭐⭐⭐ | ⭐⭐⭐ |

---

## 🔍 测试安全性

### 测试 1: 验证客户端无法直接写入

```javascript
// 在浏览器控制台尝试直接插入（应该失败）
const { createClient } = supabase;
const client = createClient(
  'https://xxx.supabase.co',
  'anon-key'
);

await client.from('reviews').insert({
  service_id: 'chatgpt',
  rating: 5,
  content: 'Hacked!',
  status: 'approved' // 尝试绕过审核
});
// 结果：RLS 阻止，返回权限错误
```

### 测试 2: 验证速率限制

```bash
# 连续提交 6 次（第 6 次应该被拒绝）
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/reviews/submit \
    -H "Content-Type: application/json" \
    -d '{
      "service_id": "chatgpt",
      "rating": 5,
      "content": "Test review number '$i'"
    }'
  echo "\n---"
done

# 第 6 次应返回：429 Too Many Requests
```

### 测试 3: 验证防重复提交

```bash
# 提交第一次（成功）
curl -X POST http://localhost:3000/api/reviews/submit \
  -H "Content-Type: application/json" \
  -d '{
    "service_id": "chatgpt",
    "rating": 5,
    "content": "Great tool!"
  }'

# 提交第二次（应被拒绝）
# 返回：403 You have already reviewed this service
```

---

## 📊 监控与日志

### Vercel 函数日志

访问 Vercel 仪表板 → 你的项目 → Functions → Logs

可以看到：
- 每次 API 调用
- IP 地址
- 速率限制触发
- 错误信息

### Supabase 审计

访问 Supabase 仪表板 → Logs

可以看到：
- 所有数据库操作
- RLS 策略触发
- 权限拒绝事件

---

## 🎯 最佳实践

1. ✅ **定期审核评论**：设置每日提醒检查待审核评论
2. ✅ **监控异常流量**：Vercel Analytics 追踪 API 调用
3. ✅ **备份数据**：Supabase 自动备份，但建议定期导出
4. ✅ **更新密钥**：每季度轮换 Service Role Key
5. ✅ **内容审核**：可集成 AI 审核 API（如 OpenAI Moderation）

---

## 🆘 应急响应

### 如果发现恶意提交

```sql
-- 1. 立即封禁 IP
INSERT INTO blocked_ips (ip_hash, reason) 
VALUES ('恶意IP哈希', 'Spam');

-- 2. 删除垃圾评论
DELETE FROM reviews 
WHERE ip_hash = '恶意IP哈希';

-- 3. 清理投票记录
DELETE FROM user_votes 
WHERE ip_hash = '恶意IP哈希';
```

### 如果 API 被滥用

```bash
# 临时禁用 API（在 Vercel 设置环境变量）
REVIEWS_API_DISABLED=true

# 然后在 API 路由开头检查
if (process.env.REVIEWS_API_DISABLED === 'true') {
  return new Response('Service temporarily unavailable', { status: 503 });
}
```

---

## 📚 参考资源

- [Supabase RLS 文档](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [OWASP API 安全](https://owasp.org/www-project-api-security/)
