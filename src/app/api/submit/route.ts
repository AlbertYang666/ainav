import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendNewToolSubmissionEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, description, category, pricing, tags, submitter_email } = body;

    // 验证必填字段
    if (!name || !url || !description || !category) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 验证 URL 格式
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: '请输入有效的网址' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // 插入到 service_submissions 表
    const { data, error } = await supabase
      .from('service_submissions')
      .insert({
        name,
        url,
        description,
        category,
        pricing: pricing || 'freemium',
        tags: tags || null,
        submitter_email: submitter_email || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '提交失败，请稍后重试' },
        { status: 500 }
      );
    }

    // 发送邮件通知管理员
    try {
      await sendNewToolSubmissionEmail({
        toolName: name,
        toolUrl: url,
        description,
        category,
        submitterEmail: submitter_email,
      });
    } catch (emailError) {
      // 邮件发送失败不影响提交
      console.error('Failed to send submission notification email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: '提交成功！我们会尽快审核您的提交。',
      id: data.id,
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
