#!/usr/bin/env node

/**
 * 测试脚本：验证评论系统是否正确配置
 */

console.log('🔍 正在检查评论系统配置...\n');

// 检查环境变量
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

let envCheckPassed = true;

console.log('1️⃣ 检查环境变量:');
requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar];
  if (value) {
    console.log(`   ✅ ${envVar}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`   ❌ ${envVar}: 未设置`);
    envCheckPassed = false;
  }
});

if (!envCheckPassed) {
  console.log('\n⚠️  请在 .env.local 中配置 Supabase 环境变量');
  console.log('   参考 REVIEWS_INTEGRATION_GUIDE.md');
  process.exit(1);
}

// 检查依赖
console.log('\n2️⃣ 检查依赖包:');
try {
  require('@supabase/supabase-js');
  console.log('   ✅ @supabase/supabase-js 已安装');
} catch (e) {
  console.log('   ❌ @supabase/supabase-js 未安装');
  console.log('   运行: pnpm add @supabase/supabase-js');
  process.exit(1);
}

// 检查文件
console.log('\n3️⃣ 检查必需文件:');
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/lib/supabase.ts',
  'src/lib/ip-hash.ts',
  'src/components/ReviewSection.tsx',
  'src/app/api/services/[id]/reviews/route.ts',
  'src/app/[lang]/service/[serviceId]/page.tsx',
  'supabase/schema.sql',
];

requiredFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} 不存在`);
  }
});

console.log('\n✨ 配置检查完成！\n');
console.log('📋 下一步:');
console.log('   1. 确保已在 Supabase 执行 SQL schema');
console.log('   2. 运行 pnpm dev 启动开发服务器');
console.log('   3. 访问 http://localhost:3000/zh/service/chatgpt');
console.log('   4. 提交测试评论');
console.log('\n💡 详细说明请查看 REVIEWS_INTEGRATION_GUIDE.md\n');
