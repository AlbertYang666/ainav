// src/app/api/reviews/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendReviewModerationEmail } from '@/lib/email';
import { getAIServiceById } from '@/lib/data';

interface ReviewSubmission {
  service_id: string;
  rating: number;
  title?: string;
  content: string;
  language?: string;
}

// 获取真实客户端 IP
function getClientIP(request: NextRequest): string {
  // Vercel 提供的真实 IP 头
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  
  return (
    vercelIP ||
    forwarded?.split(',')[0].trim() ||
    realIP ||
    'unknown'
  );
}

// 简单的速率限制（内存存储，适合 Serverless）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 3600000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// 简单的哈希函数
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

export async function POST(request: NextRequest) {
  try {
    // 1. 获取客户端 IP
    const clientIP = getClientIP(request);
    const ipHash = hashString(clientIP);

    // 2. 速率限制检查
    if (!checkRateLimit(ipHash)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. 解析请求体
    const body: ReviewSubmission = await request.json();
    const { service_id, rating, title, content, language = 'en' } = body;

    // 4. 验证输入
    if (!service_id || !rating || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (content.trim().length < 10) {
      return NextResponse.json(
        { error: 'Review must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: 'Review is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // 5. 连接 Supabase（使用 Service Role Key，仅服务端）
    const supabase = getSupabaseAdmin();

    // 6. 检查是否已经评分过
    const { count } = await supabase
      .from('user_votes')
      .select('id', { count: 'exact' })
      .eq('service_id', service_id)
      .eq('ip_hash', ipHash);

    if (count && count > 0) {
      return NextResponse.json(
        { error: 'You have already reviewed this service' },
        { status: 403 }
      );
    }

    // 7. 插入评论（待审核）
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert([
        {
          service_id,
          rating: Math.round(rating),
          title: title?.slice(0, 255) || null,
          content: content.trim(),
          language,
          status: 'pending',
          ip_hash: ipHash,
        },
      ])
      .select()
      .single();

    if (reviewError) {
      console.error('Review insert error:', reviewError);
      throw new Error('Failed to save review');
    }

    // 8. 记录投票（防刷）
    const { error: voteError } = await supabase
      .from('user_votes')
      .insert([
        {
          service_id,
          ip_hash: ipHash,
        },
      ]);

    if (voteError) {
      console.warn('Vote insert error:', voteError);
      // 不中断流程，评论已记录
    }

    // 9. 发送邮件通知管理员
    try {
      const service = getAIServiceById(service_id, 'zh');
      if (service) {
        await sendReviewModerationEmail({
          serviceName: service.name,
          reviewTitle: title,
          reviewContent: content,
          rating: Math.round(rating),
        });
      }
    } catch (emailError) {
      // 邮件发送失败不影响评论提交
      console.error('Failed to send review notification email:', emailError);
    }

    // 10. 返回成功响应

    // 9. 返回成功响应
    return NextResponse.json(
      {
        success: true,
        review,
        message: 'Thank you! Your review will be published after moderation.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Submit review error:', error);
    const message = error instanceof Error ? error.message : 'Failed to submit review';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 请求（CORS 预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
