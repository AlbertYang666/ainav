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
  'veo-4-ai-video-generator': {
    name: 'Veo 4 AI Video Generator',
    description: 'Generate AI videos from text with audio sync and high-resolution export.',
    tags: ['Text to Video', 'AI Video', '4K'],
  },
  timelinify: {
    name: 'Timelinify',
    description: 'Create editable visual timelines for learning, planning, and storytelling.',
    tags: ['Timeline', 'Productivity', 'Planning'],
  },
  'ki-hausaufgaben': {
    name: 'KI Hausaufgaben',
    description: 'German AI homework assistant with step-by-step explanations across subjects.',
    tags: ['Homework Help', 'Education', 'German'],
  },
  'ki-song-de': {
    name: 'KI-Song.de',
    description: 'German-focused AI music generator for lyrics, vocals, and song ideas.',
    tags: ['Music', 'Lyrics', 'German'],
  },
  mathpanda: {
    name: 'MathPanda',
    description: 'AI math solver for text, photo, and PDF questions with detailed steps.',
    tags: ['Math Solver', 'Education', 'Step by Step'],
  },
  'zikia-fr': {
    name: 'ZikIA.fr',
    description: 'French AI music generator for creating songs from text prompts.',
    tags: ['Music', 'French', 'Song Generator'],
  },
  'math-ai-net': {
    name: 'Math AI',
    description: 'Solve math problems from text, photos, and PDFs with clear explanations.',
    tags: ['Math', 'Homework', 'AI Tutor'],
  },
  'matheai-de': {
    name: 'MatheAI.de',
    description: 'German AI math platform for worksheets, quizzes, and graphing support.',
    tags: ['Math', 'German', 'Study Tools'],
  },
  photosstyle: {
    name: 'PhotosStyle',
    description: 'AI image-to-image tool for anime, sketch, painting, and other effects.',
    tags: ['Image to Image', 'Photo Effects', 'AI Art'],
  },
  'random-pick-tools': {
    name: 'Random Pick Tools',
    description: 'Multilingual random picker suite for wheels, teams, names, and giveaways.',
    tags: ['Random Picker', 'Wheel', 'Giveaway'],
  },
  estatepass: {
    name: 'EstatePass',
    description: 'AI-powered real estate exam prep and daily productivity tools for agents.',
    tags: ['Real Estate', 'Exam Prep', 'AI Tutor'],
  },
  'fast-image-ai-headshot-generator': {
    name: 'Fast Image AI Headshot Generator',
    description: 'Create professional AI headshots from a single photo in seconds.',
    tags: ['Headshot', 'Portrait', 'Profile Photo'],
  },
  'fast-image-ai-sticker-generator': {
    name: 'Fast Image AI Sticker Generator',
    description: 'Generate personalized AI stickers from your photos online for free.',
    tags: ['Sticker', 'Image Tool', 'Creator'],
  },
  'fast-image-ai-cartoon-generator': {
    name: 'Fast Image AI Cartoon Generator',
    description: 'Turn photos into cartoon-style avatars with one-click AI generation.',
    tags: ['Cartoon', 'Avatar', 'AI Image'],
  },
  'fast-image-ai-image-enhancer': {
    name: 'Fast Image AI Image Enhancer',
    description: 'Enhance, upscale, and restore photos automatically with AI.',
    tags: ['Image Enhancer', 'Upscale', 'Photo Restore'],
  },
  'fast-image-ai-white-background': {
    name: 'Fast Image AI White Background',
    description: 'Convert images to clean white backgrounds for product and portrait use.',
    tags: ['Background Removal', 'Ecommerce', 'Photo Editing'],
  },
  studyx: {
    name: 'StudyX',
    description: 'All-in-one AI study partner for homework help, notes, flashcards, and test prep.',
    tags: ['Study', 'Homework', 'Flashcards', 'Education'],
  },
  teachquill: {
    name: 'TeachQuill',
    description: 'All-in-one AI platform for teachers to plan lessons, create materials, and manage classroom work efficiently.',
    tags: ['Teachers', 'Education', 'Lesson Planning', 'Classroom'],
  },
  prepgo: {
    name: 'PrepGo',
    description: 'AI-powered AP exam prep platform with courses, practice questions, mock exams, and score tools.',
    tags: ['AP Exam', 'Exam Prep', 'Study', 'Education'],
  },
  'kling-ai-video-generator': {
    name: 'Kling AI Video Generator',
    description: 'Generate cinematic videos from text or image prompts with coherent motion and native 4K output.',
    tags: ['AI Video', 'Text to Video', 'Image to Video', 'Video Generation'],
  },
  'fast-image-ai-sketch-to-image': {
    name: 'Fast Image AI Sketch to Image',
    description: 'Turn any sketch into detailed AI-generated images for product concepts, interior design, and character ideas.',
    tags: ['Sketch to Image', 'Concept Design', 'AI Art'],
  },
  coderplan: {
    name: 'CoderPlan',
    description: 'Affordable OpenAI-compatible API relay service with unified access to GPT-4o, Claude, Gemini, and 100+ AI models.',
    tags: ['API', 'OpenAI', 'Relay', 'AI Coding', 'Developer Tools'],
  },
  'lockedin-ai': {
    name: 'LockedIn AI',
    description: 'AI career development assistant for interview prep, resume optimization, and career planning.',
    tags: ["Interview","Career","Resume"],
  },
  'medally': {
    name: 'Medally',
    description: 'Smart productivity tool for meeting notes, task management, and team collaboration with auto-generated meeting summaries.',
    tags: ["Meeting Notes","Task Management","Collaboration"],
  },
  'saascity': {
    name: 'SaaSCity',
    description: 'Gamified SaaS and AI product directory where every listing becomes a building on a live isometric city map.',
    tags: ["Directory","Launch","SaaS"],
  },
  'rao-edits': {
    name: 'Rao Edits',
    description: 'AI-powered image generation and photo editing platform for creating and transforming visual content.',
    tags: ["Image Generation","Photo Editing","Creative Tools"],
  },
  'agent-qa': {
    name: 'Agent QA',
    description: 'AI-assisted browser QA CLI that runs journeys against web apps and captures evidence for review. The CLI package is free; configured AI providers may charge for usage.',
    tags: ["Browser QA","Testing","CLI"],
  },
  'agent-coordinator': {
    name: 'Agent Coordinator',
    description: 'A per-user Codex skill for bounded work graphs with revisioned local state, reconciliation before retry, and optional specialist agents or inline execution.',
    tags: ["Codex","Work Graphs","Task Coordination"],
  },
};

export default enServices;
