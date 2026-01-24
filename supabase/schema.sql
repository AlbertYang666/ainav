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
