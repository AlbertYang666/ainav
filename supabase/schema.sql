-- ============================================
-- AI Navigation - Ratings & Reviews Schema
-- ============================================

-- 1. 评分汇总表
CREATE TABLE IF NOT EXISTS public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id VARCHAR(255) NOT NULL,
  average_score DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(service_id)
);

-- 2. 个人评论表
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT NOT NULL,
  helpful_count INT DEFAULT 0,
  unhelpful_count INT DEFAULT 0,
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending',
  ip_hash VARCHAR(255)
);

-- 3. 防重复评分表
CREATE TABLE IF NOT EXISTS public.user_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255),
  service_id VARCHAR(255) NOT NULL,
  ip_hash VARCHAR(255),
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_vote UNIQUE NULLS NOT DISTINCT(user_id, service_id),
  CONSTRAINT unique_ip_vote UNIQUE NULLS NOT DISTINCT(ip_hash, service_id)
);

-- 4. 审核日志表
CREATE TABLE IF NOT EXISTS public.moderation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE,
  action VARCHAR(50),
  reason TEXT,
  reviewed_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 索引
-- ============================================
CREATE INDEX idx_reviews_service_id ON public.reviews(service_id);
CREATE INDEX idx_reviews_status ON public.reviews(status);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX idx_user_votes_service_id ON public.user_votes(service_id);
CREATE INDEX idx_user_votes_ip_hash ON public.user_votes(ip_hash);
CREATE INDEX idx_ratings_service_id ON public.ratings(service_id);

-- ============================================
-- 行级安全策略（RLS）
-- ============================================

-- 启用 RLS
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_logs ENABLE ROW LEVEL SECURITY;

-- ratings: 所有用户可读，仅内部可写
CREATE POLICY "ratings_read_all" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "ratings_write_internal" ON public.ratings FOR INSERT WITH CHECK (false);
CREATE POLICY "ratings_update_internal" ON public.ratings FOR UPDATE USING (false);

-- reviews: 已批准的评论所有用户可读，任何人可提交待审查评论
CREATE POLICY "reviews_read_approved" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "reviews_insert_anonymous" ON public.reviews FOR INSERT WITH CHECK (true);

-- user_votes: 仅用于防刷，不需要读权限
CREATE POLICY "user_votes_insert_anonymous" ON public.user_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "user_votes_select_internal" ON public.user_votes FOR SELECT USING (false);

-- moderation_logs: 仅内部可读写
CREATE POLICY "moderation_logs_select_internal" ON public.moderation_logs FOR SELECT USING (false);
CREATE POLICY "moderation_logs_insert_internal" ON public.moderation_logs FOR INSERT WITH CHECK (false);

-- ============================================
-- 触发器：自动更新 ratings 表
-- ============================================

CREATE OR REPLACE FUNCTION update_rating_on_review_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- 只在评论被批准时更新评分
  IF NEW.status = 'approved' THEN
    INSERT INTO public.ratings (service_id, average_score, review_count)
    SELECT 
      NEW.service_id,
      ROUND(AVG(rating)::NUMERIC, 2),
      COUNT(*)
    FROM public.reviews
    WHERE service_id = NEW.service_id AND status = 'approved'
    ON CONFLICT (service_id) DO UPDATE SET
      average_score = ROUND(
        (SELECT AVG(rating) FROM public.reviews WHERE service_id = NEW.service_id AND status = 'approved')::NUMERIC, 2
      ),
      review_count = (SELECT COUNT(*) FROM public.reviews WHERE service_id = NEW.service_id AND status = 'approved'),
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rating_on_review_insert
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_rating_on_review_insert();

CREATE OR REPLACE FUNCTION update_rating_on_review_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- 评论状态变化时重新计算评分
  IF OLD.status != NEW.status THEN
    UPDATE public.ratings SET
      average_score = ROUND(
        (SELECT AVG(rating) FROM public.reviews WHERE service_id = NEW.service_id AND status = 'approved')::NUMERIC, 2
      ),
      review_count = (SELECT COUNT(*) FROM public.reviews WHERE service_id = NEW.service_id AND status = 'approved'),
      updated_at = NOW()
    WHERE service_id = NEW.service_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rating_on_review_status_change
AFTER UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_rating_on_review_status_change();

-- ============================================
-- 5. 服务提交表
-- ============================================
CREATE TABLE IF NOT EXISTS public.service_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  pricing VARCHAR(50) DEFAULT 'freemium',
  tags TEXT,
  submitter_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  review_note TEXT
);

-- 索引
CREATE INDEX idx_submissions_status ON public.service_submissions(status);
CREATE INDEX idx_submissions_created_at ON public.service_submissions(created_at DESC);

-- RLS
ALTER TABLE public.service_submissions ENABLE ROW LEVEL SECURITY;

-- 任何人可以提交，只有管理员可以查看
CREATE POLICY "submissions_insert_anonymous" ON public.service_submissions 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "submissions_select_internal" ON public.service_submissions 
  FOR SELECT USING (false);

-- ============================================
-- 评论投票表（review_votes）
-- ============================================

-- 5. 评论投票记录表
CREATE TABLE IF NOT EXISTS public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  ip_hash VARCHAR(255) NOT NULL,
  vote_type VARCHAR(20) NOT NULL CHECK (vote_type IN ('helpful', 'unhelpful')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_review_vote UNIQUE(review_id, ip_hash)
);

-- 索引
CREATE INDEX idx_review_votes_review_id ON public.review_votes(review_id);
CREATE INDEX idx_review_votes_ip_hash ON public.review_votes(ip_hash);

-- RLS 策略
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

-- 任何人可以投票（插入）
CREATE POLICY "review_votes_insert_anonymous" ON public.review_votes 
  FOR INSERT WITH CHECK (true);

-- 仅内部可读（用于防止重复投票检查）
CREATE POLICY "review_votes_select_internal" ON public.review_votes 
  FOR SELECT USING (false);

-- 允许更新自己的投票
CREATE POLICY "review_votes_update_own" ON public.review_votes 
  FOR UPDATE USING (true);

-- ============================================
-- 6. 订阅者表 (Newsletter Subscribers)
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source VARCHAR(50), -- homepage, footer, popup, manual
  language VARCHAR(10) DEFAULT 'en',
  ip_hash VARCHAR(255),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  last_sent_at TIMESTAMPTZ,
  unsubscribe_token VARCHAR(255) UNIQUE,
  metadata JSONB DEFAULT '{}'::jsonb -- 额外信息：推荐来源、用户偏好等
);

-- 索引
CREATE INDEX idx_subscribers_email ON public.subscribers(email);
CREATE INDEX idx_subscribers_status ON public.subscribers(status);
CREATE INDEX idx_subscribers_subscribed_at ON public.subscribers(subscribed_at DESC);
CREATE INDEX idx_subscribers_unsubscribe_token ON public.subscribers(unsubscribe_token);

-- RLS 策略
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 任何人可以订阅（插入）
CREATE POLICY "subscribers_insert_anonymous" ON public.subscribers 
  FOR INSERT WITH CHECK (true);

-- 仅内部可读（管理员查看）
CREATE POLICY "subscribers_select_internal" ON public.subscribers 
  FOR SELECT USING (false);

-- 允许通过 token 更新订阅状态（退订）
CREATE POLICY "subscribers_update_by_token" ON public.subscribers 
  FOR UPDATE USING (true);

-- ============================================
-- 7. 邮件发送记录表 (Email Campaigns)
-- ============================================
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject VARCHAR(255) NOT NULL,
  recipient_count INT DEFAULT 0,
  successful_count INT DEFAULT 0,
  failed_count INT DEFAULT 0,
  sent_by VARCHAR(255),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  campaign_type VARCHAR(50) DEFAULT 'newsletter', -- newsletter, announcement, promotion
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 索引
CREATE INDEX idx_email_campaigns_sent_at ON public.email_campaigns(sent_at DESC);
CREATE INDEX idx_email_campaigns_type ON public.email_campaigns(campaign_type);

-- RLS 策略
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

-- 仅内部可读写
CREATE POLICY "email_campaigns_select_internal" ON public.email_campaigns 
  FOR SELECT USING (false);
CREATE POLICY "email_campaigns_insert_internal" ON public.email_campaigns 
  FOR INSERT WITH CHECK (false);

-- ============================================
-- 触发器：自动生成退订 token
-- ============================================
CREATE OR REPLACE FUNCTION generate_unsubscribe_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.unsubscribe_token IS NULL THEN
    NEW.unsubscribe_token := encode(gen_random_bytes(32), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_unsubscribe_token
BEFORE INSERT ON public.subscribers
FOR EACH ROW
EXECUTE FUNCTION generate_unsubscribe_token();

-- ============================================
-- Resend Webhook Events Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.resend_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  from_email VARCHAR(255),
  to_emails TEXT[],
  subject TEXT,
  event_data JSONB DEFAULT '{}'::jsonb,
  webhook_signature TEXT,
  webhook_timestamp TEXT,
  webhook_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_resend_events_email_id ON public.resend_webhook_events(email_id);
CREATE INDEX idx_resend_events_type ON public.resend_webhook_events(event_type);
CREATE INDEX idx_resend_events_from ON public.resend_webhook_events(from_email);
CREATE INDEX idx_resend_events_created_at ON public.resend_webhook_events(created_at DESC);

-- RLS policies
ALTER TABLE public.resend_webhook_events ENABLE ROW LEVEL SECURITY;

-- Internal access only
CREATE POLICY "resend_events_select_internal" ON public.resend_webhook_events 
  FOR SELECT USING (false);
CREATE POLICY "resend_events_insert_internal" ON public.resend_webhook_events 
  FOR INSERT WITH CHECK (false);
