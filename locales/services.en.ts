const enServices = {
  chatgpt: {
    name: 'ChatGPT',
    description: 'Powerful conversational AI assistant by OpenAI for answering questions, writing, coding and more',
    tags: ['Chat', 'Writing', 'Coding'],
  },
  claude: {
    name: 'Claude',
    description: 'AI assistant by Anthropic, excellent at long-form text understanding and analysis',
    tags: ['Chat', 'Analysis', 'Writing'],
  },
  gemini: {
    name: 'Gemini',
    description: 'Multimodal AI assistant by Google',
    tags: ['Chat', 'Multimodal'],
  },
  midjourney: {
    name: 'Midjourney',
    description: 'Top-tier AI image generation tool known for artistic quality',
    tags: ['Art', 'Image Generation'],
  },
  'stable-diffusion': {
    name: 'Stable Diffusion',
    description: 'Open-source AI image generation model',
    tags: ['Art', 'Open Source'],
  },
  'github-copilot': {
    name: 'GitHub Copilot',
    description: 'AI programming assistant by GitHub and OpenAI',
    tags: ['Coding', 'Code Generation'],
  },
  cursor: {
    name: 'Cursor',
    description: 'AI-powered code editor',
    tags: ['Coding', 'IDE'],
  },
  perplexity: {
    name: 'Perplexity AI',
    description: 'AI-powered search engine providing accurate answers with sources',
    tags: ['Search', 'Q&A'],
  },
  runway: {
    name: 'Runway',
    description: 'Professional AI video generation and editing platform',
    tags: ['Video', 'Editing'],
  },
  elevenlabs: {
    name: 'ElevenLabs',
    description: 'High-quality AI voice synthesis tool',
    tags: ['Voice Synthesis', 'Voiceover'],
  },
  'notion-ai': {
    name: 'Notion AI',
    description: 'AI writing assistant integrated in Notion',
    tags: ['Writing', 'Notes', 'Summary'],
  },
  jasper: {
    name: 'Jasper',
    description: 'Professional AI content creation platform for marketing copy',
    tags: ['Marketing', 'Copywriting', 'Content'],
  },
  'copy-ai': {
    name: 'Copy.ai',
    description: 'AI copywriting tool for quick marketing content creation',
    tags: ['Copywriting', 'Marketing', 'Social Media'],
  },
  writesonic: {
    name: 'Writesonic',
    description: 'Multi-functional AI writing tool for blogs, ads and more',
    tags: ['Writing', 'Blog', 'SEO'],
  },
  'dall-e': {
    name: 'DALL·E 3',
    description: 'Image generation model by OpenAI, text-to-image',
    tags: ['Art', 'Image Generation'],
  },
  'leonardo-ai': {
    name: 'Leonardo.ai',
    description: 'AI generation tool for game assets and creative content',
    tags: ['Art', 'Gaming', 'Design'],
  },
  firefly: {
    name: 'Adobe Firefly',
    description: 'AI image generation and editing tool by Adobe',
    tags: ['Art', 'Editing', 'Design'],
  },
  'canva-ai': {
    name: 'Canva AI',
    description: 'Built-in AI design assistant in Canva',
    tags: ['Design', 'Image Generation', 'Templates'],
  },
  pika: {
    name: 'Pika',
    description: 'Text-to-video AI tool',
    tags: ['Video Generation', 'Creative'],
  },
  synthesia: {
    name: 'Synthesia',
    description: 'AI avatar video generation platform',
    tags: ['Video', 'Avatar', 'Training'],
  },
  heygen: {
    name: 'HeyGen',
    description: 'AI video generation platform with digital humans and lip sync',
    tags: ['Video', 'Digital Human', 'Marketing'],
  },
  v0: {
    name: 'v0',
    description: 'AI UI generation tool by Vercel',
    tags: ['UI Generation', 'Frontend', 'React'],
  },
  codeium: {
    name: 'Codeium',
    description: 'Free AI code completion tool',
    tags: ['Coding', 'Code Completion', 'Free'],
  },
  tabnine: {
    name: 'Tabnine',
    description: 'AI code completion assistant supporting multiple IDEs',
    tags: ['Coding', 'Code Completion'],
  },
  'replit-ai': {
    name: 'Replit AI',
    description: 'AI assistant for online coding platform',
    tags: ['Coding', 'Online IDE', 'Learning'],
  },
  'you-com': {
    name: 'You.com',
    description: 'AI search engine with personalized results',
    tags: ['Search', 'Q&A'],
  },
  phind: {
    name: 'Phind',
    description: 'AI search engine for developers',
    tags: ['Search', 'Coding', 'Development'],
  },
  grammarly: {
    name: 'Grammarly',
    description: 'AI writing assistant for grammar checking and text optimization',
    tags: ['Writing', 'Grammar', 'English'],
  },
  quillbot: {
    name: 'QuillBot',
    description: 'AI paraphrasing and rewriting tool',
    tags: ['Rewriting', 'Paraphrasing', 'Writing'],
  },
  chatpdf: {
    name: 'ChatPDF',
    description: 'AI tool for conversing with PDF documents',
    tags: ['PDF', 'Document Analysis', 'Learning'],
  },
  'otter-ai': {
    name: 'Otter.ai',
    description: 'AI meeting notes and transcription tool',
    tags: ['Transcription', 'Meeting', 'Notes'],
  },
  'fireflies-ai': {
    name: 'Fireflies.ai',
    description: 'AI meeting assistant for automatic recording and summarization',
    tags: ['Meeting', 'Transcription', 'Summary'],
  },
  'murf-ai': {
    name: 'Murf AI',
    description: 'AI voiceover and voice generation tool',
    tags: ['Voice Synthesis', 'Voiceover', 'Video'],
  },
  'resemble-ai': {
    name: 'Resemble AI',
    description: 'AI voice cloning and generation platform',
    tags: ['Voice Synthesis', 'Cloning', 'Custom'],
  },
  kimi: {
    name: 'Kimi',
    description: 'Long-context AI assistant by Moonshot AI',
    tags: ['Chat', 'Long Context', 'Chinese'],
  },
  tongyi: {
    name: 'Tongyi Qianwen',
    description: 'Large language model by Alibaba',
    tags: ['Chat', 'Chinese', 'Q&A'],
  },
  wenxin: {
    name: 'Wenxin Yiyan',
    description: 'AI conversational system by Baidu',
    tags: ['Chat', 'Chinese', 'Search'],
  },
  doubao: {
    name: 'Doubao',
    description: 'AI assistant by ByteDance',
    tags: ['Chat', 'Chinese', 'Multifunctional'],
  },
  'figma-ai': {
    name: 'Figma AI',
    description: 'Built-in AI design assistant in Figma',
    tags: ['UI Design', 'Prototyping', 'Collaboration'],
  },
  uizard: {
    name: 'Uizard',
    description: 'AI tool to convert sketches to UI designs',
    tags: ['UI Generation', 'Prototyping', 'Design'],
  },
  'galileo-ai': {
    name: 'Galileo AI',
    description: 'Generate UI designs from text descriptions',
    tags: ['UI Generation', 'Design', 'Rapid Prototyping'],
  },
  looka: {
    name: 'Looka',
    description: 'AI logo and brand design tool',
    tags: ['Logo', 'Branding', 'Design'],
  },
  suno: {
    name: 'Suno',
    description: 'AI music generation tool, text-to-music',
    tags: ['Music Creation', 'Song Generation'],
  },
  udio: {
    name: 'Udio',
    description: 'High-quality AI music creation platform',
    tags: ['Music Creation', 'Composition'],
  },
  soundraw: {
    name: 'Soundraw',
    description: 'AI background music generation tool',
    tags: ['Background Music', 'Soundtrack'],
  },
  aiva: {
    name: 'AIVA',
    description: 'AI composition assistant focused on film scoring',
    tags: ['Composition', 'Soundtrack', 'Film'],
  },
  deepl: {
    name: 'DeepL',
    description: 'High-quality AI translation tool',
    tags: ['Translation', 'Multilingual'],
  },
  'google-translate': {
    name: 'Google Translate',
    description: 'Free translation supporting 100+ languages',
    tags: ['Translation', 'Multilingual', 'Free'],
  },
  'immersive-translate': {
    name: 'Immersive Translate',
    description: 'Bilingual webpage translation extension',
    tags: ['Web Translation', 'Bilingual', 'Extension'],
  },
  tableau: {
    name: 'Tableau AI',
    description: 'Intelligent data analysis and visualization',
    tags: ['Data Analysis', 'Visualization', 'BI'],
  },
  'julius-ai': {
    name: 'Julius AI',
    description: 'Conversational data analysis tool',
    tags: ['Data Analysis', 'Chat', 'Charts'],
  },
  'browse-ai': {
    name: 'Browse AI',
    description: 'No-code web data scraping',
    tags: ['Data Scraping', 'Automation'],
  },
  'duolingo-max': {
    name: 'Duolingo Max',
    description: 'AI-powered language learning platform',
    tags: ['Language Learning', 'Education'],
  },
  'khan-academy': {
    name: 'Khan Academy AI',
    description: 'Personalized learning assistant Khanmigo',
    tags: ['Learning', 'Education', 'Tutoring'],
  },
  quizlet: {
    name: 'Quizlet AI',
    description: 'AI study cards and quiz tool',
    tags: ['Learning', 'Memorization', 'Quiz'],
  },
  gamma: {
    name: 'Gamma',
    description: 'AI presentation and document generation',
    tags: ['Presentation', 'Documents', 'Slides'],
  },
  'adcreative-ai': {
    name: 'AdCreative.ai',
    description: 'AI advertising creative generation tool',
    tags: ['Advertising', 'Marketing', 'Creative'],
  },
  hemingway: {
    name: 'Hemingway Editor',
    description: 'AI writing optimization and readability analysis',
    tags: ['Writing', 'Editing', 'Optimization'],
  },
  brandwatch: {
    name: 'Brandwatch AI',
    description: 'Social media monitoring and analytics',
    tags: ['Social Media', 'Analytics', 'Monitoring'],
  },
  spline: {
    name: 'Spline AI',
    description: '3D design and modeling tool',
    tags: ['3D Modeling', 'Design', 'Web3D'],
  },
  'luma-ai': {
    name: 'Luma AI',
    description: 'Generate 3D models from phone scans',
    tags: ['3D Scanning', 'Modeling'],
  },
  meshy: {
    name: 'Meshy',
    description: 'Text/image to 3D model conversion',
    tags: ['3D Generation', 'Modeling'],
  },
  'tripo-ai': {
    name: 'Tripo AI',
    description: 'Fast 3D asset generation',
    tags: ['3D Generation', 'Game Assets'],
  },
  'ready-player-me': {
    name: 'Ready Player Me',
    description: 'Cross-platform 3D avatar creation',
    tags: ['Avatar', '3D', 'Metaverse'],
  },
  lensa: {
    name: 'Lensa AI',
    description: 'AI avatar and portrait generation',
    tags: ['Avatar', 'Portrait', 'Art'],
  },
  photoleap: {
    name: 'Photoleap',
    description: 'AI avatar and photo editing',
    tags: ['Avatar', 'Photo Editing'],
  },
  remini: {
    name: 'Remini',
    description: 'Photo restoration and enhancement',
    tags: ['Photo Restoration', 'Enhancement', 'Old Photos'],
  },
  'remove-bg': {
    name: 'Remove.bg',
    description: 'AI automatic background removal',
    tags: ['Background Removal', 'Cutout'],
  },
  'topaz-labs': {
    name: 'Topaz Labs',
    description: 'AI image enhancement and upscaling',
    tags: ['Image Enhancement', 'Upscaling', 'Denoising'],
  },
  'd-id': {
    name: 'D-ID',
    description: 'AI digital human video generation',
    tags: ['Digital Human', 'Lip Sync', 'Video'],
  },
  descript: {
    name: 'Descript',
    description: 'AI video and audio editing tool',
    tags: ['Video Editing', 'Transcription', 'Voiceover'],
  },
  kapwing: {
    name: 'Kapwing',
    description: 'Online video editing and AI tools',
    tags: ['Video Editing', 'Subtitles', 'Online'],
  },
  'fast-image-ai': {
    name: 'Fast Image AI',
    description: 'Instantly transform photos into stunning artworks in popular styles like Studio Ghibli and sketch, perfect for social media and creative projects',
    tags: ['Image Transformation', 'Style Transfer', 'Art Styles'],
  },
};

export default enServices;
