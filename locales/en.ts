const enTranslations = {
  brand: "AI Directory",
  siteName: "AI Directory - ainav.space",
  siteDescription:
    "A curated AI tools directory featuring ChatGPT, Midjourney, and more to help you explore AI efficiently.",
  keywords: [
    "AI directory",
    "AI tools",
    "ChatGPT",
    "AI websites",
    "Artificial Intelligence",
    "AI assistant",
    "AI art",
  ],
  nav: {
    home: "Home",
    search: "Search",
    submit: "Submit",
    bookmarks: "Bookmarks",
  },
  hero: {
    title: "Discover the best AI tools",
    subtitle:
      "Curated AI websites to help you explore the AI world efficiently",
  },
  stats: {
    tools: "AI Tools",
    categories: "Categories",
    featured: "Featured",
  },
  sections: {
    browseCategories: "Browse Categories",
    featured: "Featured Picks",
  },
  newsletter: {
    title: "Stay Updated with AI Innovations",
    description: "Get weekly updates on the latest AI tools, trends, and resources directly to your inbox.",
    placeholder: "Enter your email",
    button: "Subscribe",
    privacy: "We respect your privacy. Unsubscribe at any time.",
  },
  search: {
    title: "Search AI tools",
    results: (query: string, count: number) =>
      `Search "${query}" - ${count} results`,
    noResultsTitle: "No matching tools found",
    noResultsHint: 'Try other keywords like "chat", "image", or "coding"',
    emptyTitle: "Start searching",
    emptyHint: "Enter keywords to find the AI tools you need",
    placeholder: "Search AI tools...",
    button: "Search",
    filters: {
      category: "Filter by Category",
      allCategories: "All Categories",
      sortBy: "Sort By",
      relevance: "Relevance",
      rating: "Highest Rating",
      reviewCount: "Most Reviews",
      nameAsc: "Name A-Z",
      nameDesc: "Name Z-A",
    },
  },
  category: {
    count: (count: number) => `${count} tools found`,
    empty: "No tools in this category yet",
  },
  submit: {
    title: "Submit a new AI tool",
    subtitle: "Found a great AI tool? Share it with the community!",
    flowTitle: "Submission process",
    flowSteps: [
      {
        title: "Fill in tool information",
        description: "Provide the tool name, URL, and a clear description",
      },
      {
        title: "Submit form",
        description: "Click submit to save the tool information for review",
      },
      {
        title: "Review and publish",
        description:
          "We will review your submission and add it to the directory",
      },
    ],
    requirementsTitle: "📋 Requirements",
    requirements: [
      "The tool or service must be available and working",
      "Provide accurate information and a valid link",
      "Clear description that reflects the main features",
      "No illegal or malicious content",
      "Preference for tools with real value and good feedback",
    ],
  },
  submitForm: {
    labels: {
      name: "Tool name",
      url: "Website",
      description: "Description",
      category: "Category",
      pricing: "Pricing",
      tags: "Tags",
      email: "Your email",
    },
    placeholders: {
      name: "e.g. ChatGPT",
      url: "https://example.com",
      description: "Briefly describe what this AI tool does...",
      tags: "Comma separated, e.g. chat, writing, coding",
      email: "your@email.com",
    },
    tagsHint: "Use commas to separate tags",
    emailHint: "We may contact you to confirm details",
    submit: "Submit tool",
    submitting: "Submitting...",
    success:
      "✅ Thanks! We will review your submission and add it to the site soon.",
    error: "❌ Submission failed. Please try again later.",
    tip: "💡 Tip: After submission, we will review your tool and notify you via email once approved.",
  },
  pricing: {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
  },
  serviceDetail: {
    backToCategory: '← Back to Category',
    visitWebsite: 'Visit Website',
    features: 'Features',
    keyFeatures: 'Key Features',
    useCases: 'Use Cases',
    howToUse: 'How to Use',
    quickStart: 'Quick Start',
    faq: 'FAQ',
  },
  footer: {
    copyright: "© 2026 ainav.space - Curated AI tools directory",
    tagline: "A curated AI tools directory featuring ChatGPT, Midjourney, and more to help you explore AI efficiently.",
    product: {
      title: "Product",
      home: "Home",
      search: "Search",
      submit: "Submit Tool",
    },
    resources: {
      title: "Resources",
      github: "GitHub",
      blog: "Blog",
      aboutUs: "About Us",
    },
    connect: {
      title: "Connect",
    },
  },
  language: {
    switchLabel: "Language",
  },
  compare: {
    title: "Tool Comparison",
    description: "Compare AI tools side by side",
  },
  common: {
    back: "Back to category",
    visit: "Visit Website",
  },
  categories: {
    chat: {
      name: "AI Chat",
      description: "Conversational assistants and chatbots",
    },
    image: {
      name: "AI Image",
      description: "Image generation and editing tools",
    },
    video: {
      name: "AI Video",
      description: "Video generation and editing tools",
    },
    writing: {
      name: "AI Writing",
      description: "Content creation and copywriting",
    },
    coding: {
      name: "AI Coding",
      description: "Code generation and developer tools",
    },
    voice: {
      name: "AI Voice",
      description: "Speech synthesis and recognition",
    },
    search: { name: "AI Search", description: "AI-powered search engines" },
    productivity: {
      name: "AI Productivity",
      description: "Tools to boost productivity",
    },
    design: {
      name: "AI Design",
      description: "UI/Ux and creative design tools",
    },
    music: {
      name: "AI Music",
      description: "Music creation and audio processing",
    },
    translation: {
      name: "AI Translation",
      description: "Translation and localization tools",
    },
    data: { name: "AI Data", description: "Data analysis and visualization" },
    education: {
      name: "AI Education",
      description: "Learning and knowledge tools",
    },
    marketing: {
      name: "AI Marketing",
      description: "Marketing automation and content",
    },
    "3d": { name: "AI 3D", description: "3D modeling and virtual reality" },
    avatar: {
      name: "AI Avatar",
      description: "Virtual avatars and digital humans",
    },
  },
  reviews: {
    title: "Reviews & Ratings",
    ratingLabels: {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    },
    basedOn: (count: number) =>
      `Based on ${count} review${count !== 1 ? "s" : ""}`,
    shareTitle: "Share Your Experience",
    submit: {
      button: "Submit Review",
      submitting: "Submitting...",
      submitted: "Review Submitted",
      successMessage:
        "✓ Thank you! Your review will be published after moderation.",
      errorTooShort: "Review must be at least 10 characters",
      errorTooLong: "Review is too long (max 5000 characters)",
      minLength: 10,
      maxLength: 5000,
      titlePlaceholder: "Summary of your experience",
      contentPlaceholder: "Share your thoughts about this AI tool...",
    },
    loading: "Loading reviews...",
    recentTitle: "Recent Reviews",
    noReviews: "No reviews yet. Be the first to share your experience!",
    noReviewsHint: "There are no approved reviews yet.",
    helpful: "Helpful",
    notHelpful: "Not Helpful",
    alreadyVoted: "You have already voted on this review",
    voteError: "Failed to record your vote. Please try again.",
    votedHelpful: "👍 Thank you for your feedback!",
    votedUnhelpful: "👎 Thank you for your feedback!",
    pagination: {
      previous: "Previous",
      next: "Next",
      pageInfo: (page: number, totalPages: number) =>
        `Page ${page} of ${totalPages}`,
    },
  },
};

export default enTranslations;
