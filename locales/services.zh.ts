const zhServices = {
  chatgpt: {
    name: 'ChatGPT',
    description: 'OpenAI 开发的强大对话式 AI 助手，可以回答问题、写作、编程等',
    tags: ['对话', '写作', '编程'],
  },
  claude: {
    name: 'Claude',
    description: 'Anthropic 开发的 AI 助手，擅长长文本理解和分析',
    tags: ['对话', '分析', '写作'],
  },
  gemini: {
    name: 'Gemini',
    description: 'Google 推出的多模态 AI 助手',
    tags: ['对话', '多模态'],
  },
  midjourney: {
    name: 'Midjourney',
    description: '顶级 AI 图像生成工具，以艺术性著称',
    tags: ['绘画', '艺术'],
  },
  'stable-diffusion': {
    name: 'Stable Diffusion',
    description: '开源的 AI 图像生成模型',
    tags: ['绘画', '开源'],
  },
  'github-copilot': {
    name: 'GitHub Copilot',
    description: 'GitHub 和 OpenAI 合作的 AI 编程助手',
    tags: ['编程', '代码生成'],
  },
  cursor: {
    name: 'Cursor',
    description: 'AI 驱动的代码编辑器',
    tags: ['编程', 'IDE'],
  },
  perplexity: {
    name: 'Perplexity AI',
    description: 'AI 驱动的搜索引擎，提供准确答案和来源',
    tags: ['搜索', '问答'],
  },
  runway: {
    name: 'Runway',
    description: '专业的 AI 视频生成和编辑平台',
    tags: ['视频', '编辑'],
  },
  elevenlabs: {
    name: 'ElevenLabs',
    description: '高质量 AI 语音合成工具',
    tags: ['语音合成', '配音'],
  },
  'notion-ai': {
    name: 'Notion AI',
    description: '集成在 Notion 中的 AI 写作助手',
    tags: ['写作', '笔记', '总结'],
  },
  jasper: {
    name: 'Jasper',
    description: '专业的 AI 内容创作平台，适合营销文案',
    tags: ['营销', '文案', '内容创作'],
  },
  'copy-ai': {
    name: 'Copy.ai',
    description: 'AI 文案生成工具，快速创建营销内容',
    tags: ['文案', '营销', '社交媒体'],
  },
  writesonic: {
    name: 'Writesonic',
    description: '多功能 AI 写作工具，支持博客、广告等',
    tags: ['写作', '博客', 'SEO'],
  },
  'dall-e': {
    name: 'DALL·E 3',
    description: 'OpenAI 的图像生成模型，文字转图像',
    tags: ['绘画', '图像生成'],
  },
  'leonardo-ai': {
    name: 'Leonardo.ai',
    description: '游戏资产和创意内容的 AI 生成工具',
    tags: ['绘画', '游戏', '设计'],
  },
  firefly: {
    name: 'Adobe Firefly',
    description: 'Adobe 的 AI 图像生成和编辑工具',
    tags: ['绘画', '编辑', '设计'],
  },
  'canva-ai': {
    name: 'Canva AI',
    description: 'Canva 内置的 AI 设计助手',
    tags: ['设计', '图像生成', '模板'],
  },
  pika: {
    name: 'Pika',
    description: '文字转视频的 AI 工具',
    tags: ['视频生成', '创意'],
  },
  synthesia: {
    name: 'Synthesia',
    description: 'AI 虚拟人视频生成平台',
    tags: ['视频', '虚拟人', '培训'],
  },
  heygen: {
    name: 'HeyGen',
    description: 'AI 视频生成平台，支持数字人和口型同步',
    tags: ['视频', '数字人', '营销'],
  },
  v0: {
    name: 'v0',
    description: 'Vercel 的 AI UI 生成工具',
    tags: ['UI生成', '前端', 'React'],
  },
  codeium: {
    name: 'Codeium',
    description: '免费的 AI 代码补全工具',
    tags: ['编程', '代码补全', '免费'],
  },
  tabnine: {
    name: 'Tabnine',
    description: 'AI 代码补全助手，支持多种 IDE',
    tags: ['编程', '代码补全'],
  },
  'replit-ai': {
    name: 'Replit AI',
    description: '在线编程平台的 AI 助手',
    tags: ['编程', '在线IDE', '学习'],
  },
  'you-com': {
    name: 'You.com',
    description: 'AI 搜索引擎，提供个性化结果',
    tags: ['搜索', '问答'],
  },
  phind: {
    name: 'Phind',
    description: '面向开发者的 AI 搜索引擎',
    tags: ['搜索', '编程', '开发'],
  },
  grammarly: {
    name: 'Grammarly',
    description: 'AI 写作助手，检查语法和优化文本',
    tags: ['写作', '语法', '英文'],
  },
  quillbot: {
    name: 'QuillBot',
    description: 'AI 改写和释义工具',
    tags: ['改写', '释义', '写作'],
  },
  chatpdf: {
    name: 'ChatPDF',
    description: '与 PDF 文档对话的 AI 工具',
    tags: ['PDF', '文档分析', '学习'],
  },
  'otter-ai': {
    name: 'Otter.ai',
    description: 'AI 会议记录和转录工具',
    tags: ['转录', '会议', '笔记'],
  },
  'fireflies-ai': {
    name: 'Fireflies.ai',
    description: 'AI 会议助手，自动记录和总结',
    tags: ['会议', '转录', '总结'],
  },
  'murf-ai': {
    name: 'Murf AI',
    description: 'AI 配音和语音生成工具',
    tags: ['语音合成', '配音', '视频'],
  },
  'resemble-ai': {
    name: 'Resemble AI',
    description: 'AI 语音克隆和生成平台',
    tags: ['语音合成', '克隆', '定制'],
  },
  kimi: {
    name: 'Kimi',
    description: '月之暗面推出的长文本 AI 助手',
    tags: ['对话', '长文本', '中文'],
  },
  tongyi: {
    name: '通义千问',
    description: '阿里巴巴的大语言模型',
    tags: ['对话', '中文', '问答'],
  },
  wenxin: {
    name: '文心一言',
    description: '百度推出的 AI 对话系统',
    tags: ['对话', '中文', '搜索'],
  },
  doubao: {
    name: '豆包',
    description: '字节跳动的 AI 助手',
    tags: ['对话', '中文', '多功能'],
  },
  'figma-ai': {
    name: 'Figma AI',
    description: 'Figma 内置的 AI 设计助手',
    tags: ['UI设计', '原型', '协作'],
  },
  uizard: {
    name: 'Uizard',
    description: '草图转 UI 设计的 AI 工具',
    tags: ['UI生成', '原型', '设计'],
  },
  'galileo-ai': {
    name: 'Galileo AI',
    description: '文字描述生成 UI 设计',
    tags: ['UI生成', '设计', '快速原型'],
  },
  looka: {
    name: 'Looka',
    description: 'AI Logo 和品牌设计工具',
    tags: ['Logo', '品牌', '设计'],
  },
  suno: {
    name: 'Suno',
    description: 'AI 音乐生成工具，文字转音乐',
    tags: ['音乐创作', '歌曲生成'],
  },
  udio: {
    name: 'Udio',
    description: '高质量 AI 音乐创作平台',
    tags: ['音乐创作', '作曲'],
  },
  soundraw: {
    name: 'Soundraw',
    description: 'AI 背景音乐生成工具',
    tags: ['背景音乐', '配乐'],
  },
  aiva: {
    name: 'AIVA',
    description: 'AI 作曲助手，专注于电影配乐',
    tags: ['作曲', '配乐', '电影'],
  },
  deepl: {
    name: 'DeepL',
    description: '高质量 AI 翻译工具',
    tags: ['翻译', '多语言'],
  },
  'google-translate': {
    name: 'Google 翻译',
    description: '支持100+语言的免费翻译',
    tags: ['翻译', '多语言', '免费'],
  },
  'immersive-translate': {
    name: '沉浸式翻译',
    description: '网页双语对照翻译插件',
    tags: ['网页翻译', '双语', '插件'],
  },
  tableau: {
    name: 'Tableau AI',
    description: '智能数据分析和可视化',
    tags: ['数据分析', '可视化', 'BI'],
  },
  'julius-ai': {
    name: 'Julius AI',
    description: '对话式数据分析工具',
    tags: ['数据分析', '对话', '图表'],
  },
  'browse-ai': {
    name: 'Browse AI',
    description: '无代码网页数据抓取',
    tags: ['数据抓取', '自动化'],
  },
  'duolingo-max': {
    name: 'Duolingo Max',
    description: 'AI 驱动的语言学习平台',
    tags: ['语言学习', '教育'],
  },
  'khan-academy': {
    name: 'Khan Academy AI',
    description: '个性化学习助手 Khanmigo',
    tags: ['学习', '教育', '辅导'],
  },
  quizlet: {
    name: 'Quizlet AI',
    description: 'AI 学习卡片和测验工具',
    tags: ['学习', '记忆', '测验'],
  },
  gamma: {
    name: 'Gamma',
    description: 'AI 演示文稿和文档生成',
    tags: ['演示', '文档', 'PPT'],
  },
  'adcreative-ai': {
    name: 'AdCreative.ai',
    description: 'AI 广告创意生成工具',
    tags: ['广告', '营销', '创意'],
  },
  hemingway: {
    name: 'Hemingway Editor',
    description: 'AI 写作优化和可读性分析',
    tags: ['写作', '编辑', '优化'],
  },
  brandwatch: {
    name: 'Brandwatch AI',
    description: '社交媒体监控和分析',
    tags: ['社交媒体', '分析', '监控'],
  },
  spline: {
    name: 'Spline AI',
    description: '3D 设计和建模工具',
    tags: ['3D建模', '设计', 'Web3D'],
  },
  'luma-ai': {
    name: 'Luma AI',
    description: '手机扫描生成 3D 模型',
    tags: ['3D扫描', '建模'],
  },
  meshy: {
    name: 'Meshy',
    description: '文字/图片转 3D 模型',
    tags: ['3D生成', '建模'],
  },
  'tripo-ai': {
    name: 'Tripo AI',
    description: '快速 3D 资产生成',
    tags: ['3D生成', '游戏资产'],
  },
  'ready-player-me': {
    name: 'Ready Player Me',
    description: '跨平台 3D 虚拟形象生成',
    tags: ['虚拟形象', '3D', '元宇宙'],
  },
  lensa: {
    name: 'Lensa AI',
    description: 'AI 头像和肖像生成',
    tags: ['头像', '肖像', '艺术'],
  },
  photoleap: {
    name: 'Photoleap',
    description: 'AI 头像和照片编辑',
    tags: ['头像', '照片编辑'],
  },
  remini: {
    name: 'Remini',
    description: '照片修复和增强',
    tags: ['照片修复', '增强', '老照片'],
  },
  'remove-bg': {
    name: 'Remove.bg',
    description: 'AI 自动抠图去背景',
    tags: ['抠图', '去背景'],
  },
  'topaz-labs': {
    name: 'Topaz Labs',
    description: 'AI 图像增强和升级',
    tags: ['图像增强', '放大', '降噪'],
  },
  'd-id': {
    name: 'D-ID',
    description: 'AI 数字人视频生成',
    tags: ['数字人', '口型同步', '视频'],
  },
  descript: {
    name: 'Descript',
    description: 'AI 视频和音频编辑工具',
    tags: ['视频编辑', '转录', '配音'],
  },
  kapwing: {
    name: 'Kapwing',
    description: '在线视频编辑和 AI 工具',
    tags: ['视频编辑', '字幕', '在线'],
  },
  'fast-image-ai': {
    name: 'Fast Image AI',
    description: '快速将照片转换为多种艺术风格的作品，支持吉卜力风格、素描等，适合社交媒体头像和创意项目',
    tags: ['图片转换', '风格化', '艺术风格'],
  },
  'veo-4-ai-video-generator': {
    name: 'Veo 4 AI Video Generator',
    description: '支持文生视频、音画同步和高分辨率导出的视频生成工具。',
    tags: ['视频生成', '文生视频', '4K'],
  },
  timelinify: {
    name: 'Timelinify',
    description: '将主题或笔记快速生成可编辑的可视化时间线，适用于学习与项目规划。',
    tags: ['时间线', '效率工具', '项目规划'],
  },
  'ki-hausaufgaben': {
    name: 'KI Hausaufgaben',
    description: '面向德国学生的 AI 作业助手，提供分步讲解与多学科学习支持。',
    tags: ['作业辅导', '教育', '德语'],
  },
  'ki-song-de': {
    name: 'KI-Song.de',
    description: '面向德语用户的 AI 音乐生成工具，可生成歌词、人声与歌曲灵感。',
    tags: ['音乐生成', '歌词', '德语'],
  },
  mathpanda: {
    name: 'MathPanda',
    description: '支持文本、拍照和 PDF 的 AI 数学解题工具，提供详细步骤讲解。',
    tags: ['数学解题', '教育', '分步讲解'],
  },
  'zikia-fr': {
    name: 'ZikIA.fr',
    description: '法语 AI 音乐生成平台，可根据文本提示创作歌曲与人声。',
    tags: ['音乐生成', '法语', '歌曲创作'],
  },
  'math-ai-net': {
    name: 'Math AI',
    description: '通过文字、图片和 PDF 解决数学题，覆盖作业与备考场景。',
    tags: ['数学', '作业', 'AI 导师'],
  },
  'matheai-de': {
    name: 'MatheAI.de',
    description: '德语数学 AI 工具，支持试题解析、测验生成与函数图像辅助学习。',
    tags: ['数学', '德语', '学习工具'],
  },
  photosstyle: {
    name: 'PhotosStyle',
    description: 'AI 图生图工具，可将照片转换为动漫、素描、绘画等多种风格。',
    tags: ['图生图', '照片特效', 'AI 绘图'],
  },
  'random-pick-tools': {
    name: 'Random Pick Tools',
    description: '多语言随机抽取工具集，支持转盘、分组、点名和抽奖。',
    tags: ['随机抽取', '转盘', '抽奖'],
  },
  estatepass: {
    name: 'EstatePass',
    description: '房地产考试备考与经纪人日常工具一体化的 AI 平台。',
    tags: ['房地产', '考试备考', 'AI 导师'],
  },
  'fast-image-ai-headshot-generator': {
    name: 'Fast Image AI Headshot Generator',
    description: '上传照片即可快速生成专业形象照，适用于简历和社交主页。',
    tags: ['证件照', '头像', '职业形象'],
  },
  'fast-image-ai-sticker-generator': {
    name: 'Fast Image AI Sticker Generator',
    description: '在线将照片生成个性化 AI 贴纸，适合社交分享与创意表达。',
    tags: ['贴纸生成', '图片工具', '创意'],
  },
  'fast-image-ai-cartoon-generator': {
    name: 'Fast Image AI Cartoon Generator',
    description: '一键将照片转为卡通头像和插画风格图片。',
    tags: ['卡通化', '头像', 'AI 图片'],
  },
  'fast-image-ai-image-enhancer': {
    name: 'Fast Image AI Image Enhancer',
    description: '自动增强、放大与修复图片细节，适合老照片与产品图优化。',
    tags: ['图像增强', '超分辨率', '照片修复'],
  },
  'fast-image-ai-white-background': {
    name: 'Fast Image AI White Background',
    description: '快速将图片转换为纯白背景，适用于电商产品图与人像处理。',
    tags: ['白底图', '电商', '抠图'],
  },
  studyx: {
    name: 'StudyX',
    description: '全能 AI 学习伙伴，提供作业帮助、笔记整理、闪卡制作和考试备考支持。',
    tags: ['学习', '作业', '闪卡', '教育'],
  },
  teachquill: {
    name: 'TeachQuill',
    description: '为教师打造的一体化 AI 平台，高效完成课程规划、教材制作和课堂管理。',
    tags: ['教师', '教育', '课程规划', '课堂管理'],
  },
  prepgo: {
    name: 'PrepGo',
    description: 'AI 驱动的 AP 考试备考平台，提供课程、练习题、模拟考试和成绩工具。',
    tags: ['AP 考试', '备考', '学习', '教育'],
  },
  'kling-ai-video-generator': {
    name: 'Kling AI Video Generator',
    description: '为创作者、营销人员和团队打造的影视级视频生成工具，支持文生视频和图生视频，原生 4K 输出。',
    tags: ['AI 视频', '文生视频', '图生视频', '视频生成'],
  },
  'fast-image-ai-sketch-to-image': {
    name: 'Fast Image AI Sketch to Image',
    description: '上传草图即可快速生成精细的 AI 图像，适合产品概念、室内设计、角色创作等场景。',
    tags: ['草图生图', '概念设计', 'AI 绘图'],
  },
  coderplan: {
    name: 'CoderPlan',
    description: '经济实惠的 OpenAI 兼容 API 中转服务，统一接口访问 GPT-4o、Claude、Gemini 等 100+ AI 模型。',
    tags: ['API', 'OpenAI', '中转站', 'AI 编程', '开发者工具'],
  },
  'lockedin-ai': {
    name: 'LockedIn AI',
    description: '提供面试准备、简历优化和职业规划的 AI 职业发展助手。',
    tags: ["面试","职业发展","简历优化"],
  },
  'medally': {
    name: 'Medally',
    description: '会议记录、任务管理和团队协作的智能生产力工具，自动生成会议摘要和行动项。',
    tags: ["会议记录","任务管理","团队协作"],
  },
};

export default zhServices;
