# 评论投票功能 (Review Voting)

## 功能概述

为评论系统添加了"有用/无用"投票功能，允许用户对评论进行评价，帮助其他用户找到最有价值的评论。

## 技术实现

### 1. 数据库结构

#### `review_votes` 表

```sql
CREATE TABLE review_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  ip_hash TEXT NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('helpful', 'unhelpful')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, ip_hash)
);
```

**关键特性：**

- 使用 IP 哈希进行匿名投票追踪
- UNIQUE 约束防止重复投票
- 支持修改投票（从 helpful 改为 unhelpful 或反之）
- 级联删除：评论删除时自动删除相关投票

#### `reviews` 表字段

- `helpful_count`: 有用投票计数
- `unhelpful_count`: 无用投票计数

### 2. API 端点

**路径：** `/api/reviews/vote`  
**方法：** POST

**请求体：**

```json
{
  "reviewId": "uuid",
  "voteType": "helpful" | "unhelpful"
}
```

**响应：**

```json
{
  "success": true,
  "helpful_count": 10,
  "unhelpful_count": 2
}
```

**错误响应：**

- `403`: 已经投过票（阻止重复投票）
- `400`: 参数无效
- `500`: 服务器错误

**实现逻辑：**

1. 获取客户端 IP 并生成哈希
2. 检查是否已投票
3. 如果已投票且类型相同，返回 403
4. 如果已投票但类型不同，更新投票并调整计数
5. 如果未投票，插入新投票记录
6. 返回更新后的投票计数

### 3. 前端组件

**位置：** `src/components/ReviewSection.tsx`

**状态管理：**

```typescript
const [votingReviewId, setVotingReviewId] = useState<string | null>(null);
```

**投票处理：**

```typescript
const handleVote = async (
  reviewId: string,
  voteType: "helpful" | "unhelpful",
) => {
  setVotingReviewId(reviewId);
  try {
    const response = await fetch("/api/reviews/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId, voteType }),
    });

    // 更新本地状态
    if (response.ok) {
      const result = await response.json();
      // 更新 data.reviews 中的计数
    }
  } catch (error) {
    alert(dict.reviews?.voteError);
  } finally {
    setVotingReviewId(null);
  }
};
```

**UI 元素：**

- 👍 Helpful (count) 按钮
- 👎 Not Helpful (count) 按钮
- 投票时禁用按钮
- hover 效果（绿色/红色）

### 4. 国际化

**支持语言：** 中文、英文、日文、韩文、法文

**新增翻译键：**

```typescript
{
  reviews: {
    helpful: "有用 / Helpful",
    notHelpful: "无用 / Not Helpful",
    alreadyVoted: "您已经对此评论投过票",
    voteError: "投票失败，请重试"
  }
}
```

## 安全特性

1. **IP 哈希：** 使用 SHA-256 哈希保护用户隐私
2. **防重复投票：** 数据库 UNIQUE 约束
3. **投票修改：** 允许用户改变主意
4. **服务端验证：** 所有投票都经过服务端验证

## 用户体验

1. **实时反馈：** 投票后立即更新计数
2. **加载状态：** 投票时显示加载状态（按钮禁用）
3. **错误处理：** 友好的错误提示
4. **视觉反馈：** hover 效果和计数显示

## 测试要点

### 功能测试

- [ ] 首次投票"有用"
- [ ] 首次投票"无用"
- [ ] 从"有用"改为"无用"
- [ ] 从"无用"改为"有用"
- [ ] 计数正确更新
- [ ] 多个评论的独立投票

### 边界测试

- [ ] 同一 IP 重复投票
- [ ] 无效的 reviewId
- [ ] 无效的 voteType
- [ ] 网络错误处理

### 国际化测试

- [ ] 5 种语言的文本显示正确
- [ ] RTL 语言支持（如需要）

## 数据库迁移

执行 `supabase/schema.sql` 中的 `review_votes` 表创建语句：

```bash
# 在 Supabase Dashboard 的 SQL Editor 中执行
# 或者使用 Supabase CLI
supabase db push
```

## 性能考虑

1. **索引：** `review_id` 和 `ip_hash` 字段已建立索引
2. **缓存：** 计数字段直接存储在 `reviews` 表中，避免实时计算
3. **事务：** 投票和计数更新在同一事务中完成

## 未来改进

1. **投票统计：** 添加投票趋势分析
2. **反作弊：** 检测异常投票模式
3. **投票历史：** 允许用户查看自己的投票历史
4. **投票原因：** 可选的投票理由说明
5. **管理功能：** 管理员查看投票数据

## 相关文件

- `src/app/api/reviews/vote/route.ts` - API 路由
- `src/components/ReviewSection.tsx` - 前端组件
- `supabase/schema.sql` - 数据库架构
- `locales/*.ts` - 国际化文本
- `src/lib/i18n.ts` - 类型定义
