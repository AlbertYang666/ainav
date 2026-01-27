const enPages = {
  about: {
    metaTitle: "About Us - AI Nav | Best AI Tools Discovery Platform",
    metaDescription: "AI Nav is a curated platform for discovering quality AI tools. Our mission is to help users find the perfect AI tools to boost productivity. Learn about our vision, values, and business model.",
    keywords: ["AI Navigation", "About Us", "AI Tools Platform", "Artificial Intelligence Directory", "AI Tool Discovery"],
    title: "About AI Nav",
    subtitle: "We're committed to building the world's best AI tools discovery platform, helping everyone find the perfect AI tools to boost productivity and unleash creativity.",
    missionLabel: "Our Mission",
    missionTitle: "Making AI Accessible to All",
    missionText1: "In the era of rapid AI development, new AI tools emerge constantly. However, users often struggle to find the right tools amidst the overwhelming information. AI Nav was created to solve this pain point.",
    missionText2: "We carefully curate and evaluate every AI tool, providing objective descriptions and authentic user reviews to help you quickly find the best solution. Whether you're a developer, designer, content creator, or business user, you'll find what you need here.",
    stats: {
      tools: "Curated Tools",
      categories: "Categories",
      users: "Monthly Visits",
      languages: "Languages",
    },
    valuesTitle: "Our Core Values",
    valuesSubtitle: "These principles guide every decision we make",
    values: {
      community: {
        title: "Community First",
        description: "We believe in the power of open, transparent communities. User feedback and reviews help everyone make better choices.",
      },
      quality: {
        title: "Quality Above All",
        description: "We rigorously review every listed tool to ensure we only recommend high-quality, practical AI products.",
      },
      innovation: {
        title: "Embrace Innovation",
        description: "We continuously monitor the latest developments in AI, bringing you cutting-edge tools and technologies first.",
      },
    },
    businessLabel: "Business Model",
    businessTitle: "A Sustainable Path Forward",
    businessDescription: "AI Nav operates on a transparent, user-friendly business model that ensures long-term platform sustainability while delivering maximum value to users.",
    business: {
      free: {
        title: "🆓 Free Access",
        description: "All core features are permanently free, including tool browsing, search, bookmarks, and reviews. We believe knowledge should be freely shared.",
      },
      premium: {
        title: "💎 Premium Services",
        description: "We generate revenue through targeted advertising and premium tool promotion services, ensuring sustainable operations while continuously improving user experience.",
      },
    },
    legalLabel: "Legal & Compliance",
    legalTitle: "Your Rights, Our Responsibility",
    legal: {
      privacy: {
        title: "🔒 Privacy Protection",
        description: "We strictly comply with international privacy regulations including GDPR and CCPA. Your personal data is only used for service provision and will never be shared with third parties without authorization. We use industry-standard encryption to protect your information.",
        link: "View Full Privacy Policy",
      },
      dataProtection: {
        title: "🛡️ Data Security",
        description: "We use Supabase as our database provider, with all data transmissions encrypted via SSL/TLS. Sensitive information like email addresses is hashed to ensure it cannot be recovered even in extreme circumstances.",
      },
      terms: {
        title: "📋 Terms of Service",
        description: "Using AI Nav indicates your acceptance of our Terms of Service. We reserve the right to review, edit, or remove inappropriate content. Submitted tools and reviews must be truthful, accurate, and free from false information or malicious content.",
        link: "View Full Terms of Service",
      },
      disclaimer: {
        title: "⚠️ Disclaimer",
        description: "AI Nav serves solely as a tool discovery platform and is not responsible for the functionality, reliability, or legality of third-party AI tools. Users should assess risks independently before using any tool. We recommend carefully reading each tool's Terms of Service and Privacy Policy.",
      },
    },
    contactTitle: "Join Our Journey",
    contactDescription: "Whether you're an AI tool developer, user, or investor, we welcome communication. Let's build a better AI ecosystem together.",
    submitTool: "Submit a Tool",
    contactUs: "Contact Us",
  },
  privacy: {
    metaTitle: "Privacy Policy - AI Nav",
    metaDescription: "Learn how AI Nav collects, uses, and protects your personal information. We are committed to complying with international privacy regulations including GDPR and CCPA.",
    keywords: ["privacy policy", "data protection", "GDPR", "personal information", "data security"],
    badge: "Your Privacy, Our Commitment",
    title: "Privacy Policy",
    subtitle: "We value and protect your privacy. This policy details how we collect, use, store, and protect your personal information.",
    lastUpdated: "Last Updated",
    quickNav: "Quick Navigation",
    introduction: "AI Nav (ainav.space) is committed to protecting user privacy. This Privacy Policy explains what information we collect, how we use it, and the rights you have over this information. By using our services, you agree to the practices described in this policy.",
    sections: {
      dataCollection: {
        title: "Information We Collect",
        description: "To provide better services, we may collect the following types of information:",
        items: {
          account: {
            title: "Account Information",
            description: "When you create an account, we collect your email address. When using third-party login (Google, GitHub), we only receive necessary identification information."
          },
          newsletter: {
            title: "Newsletter Subscription",
            description: "When you subscribe to our newsletter recommendations, we collect your email address. You can unsubscribe at any time."
          },
          submission: {
            title: "Tool Submissions",
            description: "When submitting AI tools, we collect tool information (name, URL, description, etc.) and your email address for review and notifications."
          },
          usage: {
            title: "Usage Data",
            description: "We collect anonymous usage statistics (such as page visits, search keywords) to improve our services. This data does not contain personally identifiable information."
          }
        }
      },
      dataUsage: {
        title: "How We Use Information",
        description: "The information we collect is only used for the following purposes:",
        purposes: [
          "Provide, maintain, and improve our services",
          "Process your tool submissions and send review result notifications",
          "Send AI tool recommendation emails you've subscribed to",
          "Respond to your inquiries and requests",
          "Detect, prevent, and address technical issues and fraudulent activities",
          "Analyze service usage to optimize user experience",
          "Comply with legal obligations and protect our legitimate interests",
          "Use for other purposes with your consent"
        ]
      },
      dataSecurity: {
        title: "Data Security Measures",
        description: "We implement multi-layered security measures to protect your information:",
        measures: [
          "All data transmissions use SSL/TLS encryption protocols",
          "Sensitive information (such as email) is stored with hashing",
          "Use secure and reliable cloud service providers like Supabase",
          "Regularly review and update security policies",
          "Limit employee access to personal data, only when necessary",
          "Implement data backup and disaster recovery plans"
        ]
      },
      yourRights: {
        title: "Your Rights",
        description: "Under regulations such as GDPR and CCPA, you have the following rights:",
        rights: [
          {
            title: "Right to Access",
            description: "You have the right to request access to the personal data we hold about you."
          },
          {
            title: "Right to Rectification",
            description: "You have the right to request correction of inaccurate or incomplete personal information."
          },
          {
            title: "Right to Erasure",
            description: "You have the right to request deletion of your personal data (the 'right to be forgotten')."
          },
          {
            title: "Right to Data Portability",
            description: "You have the right to obtain your data in a structured, commonly used format."
          },
          {
            title: "Right to Object",
            description: "You have the right to object to our processing of your personal data for specific purposes."
          },
          {
            title: "Right to Restriction",
            description: "In certain circumstances, you have the right to request restriction of processing your data."
          }
        ]
      },
      cookies: {
        title: "Cookies and Tracking Technologies",
        description: "We use the following types of cookies:",
        types: [
          {
            name: "Essential Cookies",
            purpose: "Cookies necessary for maintaining normal website operation, such as authentication and session management."
          },
          {
            name: "Analytics Cookies",
            purpose: "Help us understand how users interact with the website to improve services (e.g., Google Analytics)."
          },
          {
            name: "Preference Cookies",
            purpose: "Remember your preference settings, such as language, theme, etc."
          }
        ]
      },
      thirdParty: {
        title: "Third-Party Services",
        description: "We use the following trusted third-party services to operate our platform:",
        services: [
          {
            name: "Supabase",
            purpose: "Database and authentication service provider",
            link: "https://supabase.com/privacy"
          },
          {
            name: "Resend",
            purpose: "Email delivery service",
            link: "https://resend.com/legal/privacy-policy"
          },
          {
            name: "NextAuth",
            purpose: "Third-party login (Google, GitHub) authentication",
            link: "https://next-auth.js.org/getting-started/introduction"
          },
          {
            name: "Vercel",
            purpose: "Website hosting and deployment",
            link: "https://vercel.com/legal/privacy-policy"
          }
        ],
        viewPolicy: "View Privacy Policy"
      },
      international: {
        title: "International Data Transfers",
        description: "Your information may be transferred to and stored on servers outside your country/region. We take appropriate safeguards to ensure your data is adequately protected during transfer and complies with applicable data protection laws."
      },
      contact: {
        title: "Contact Us",
        description: "If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:"
      }
    }
  },
  terms: {
    metaTitle: "Terms of Service - AI Nav",
    metaDescription: "Understand the terms and conditions for using AI Nav services, including user conduct guidelines, content policies, and disclaimers.",
    keywords: ["terms of service", "terms of use", "user agreement", "legal notice"],
    badge: "Rules and Agreements",
    title: "Terms of Service",
    subtitle: "Please read the following terms carefully before using AI Nav services. Continued use of our services indicates your agreement to these terms.",
    lastUpdated: "Last Updated",
    quickNav: "Quick Navigation",
    introduction: "Welcome to AI Nav (ainav.space). These Terms of Service ('Terms') govern your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms.",
    sections: {
      acceptance: {
        title: "Acceptance of Terms",
        description: "By using AI Nav, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services. We reserve the right to modify these Terms at any time, and the modified Terms will take effect upon posting on the website."
      },
      services: {
        title: "Service Description",
        description: "AI Nav provides the following services:",
        items: [
          {
            title: "AI Tool Directory",
            description: "Browse and discover curated AI tools and services."
          },
          {
            title: "Search and Categories",
            description: "Find AI tools through keyword search or category browsing."
          },
          {
            title: "Bookmarks and Comparison",
            description: "Bookmark favorite tools and compare them."
          },
          {
            title: "Tool Submission",
            description: "Submit new AI tools for review and inclusion."
          },
          {
            title: "Reviews and Ratings",
            description: "Post reviews and ratings for AI tools you've used."
          },
          {
            title: "Newsletter Subscription",
            description: "Subscribe to AI tool recommendations and industry news."
          }
        ]
      },
      userConduct: {
        title: "User Conduct Guidelines",
        description: "When using our services, you agree to:",
        prohibited: {
          title: "Prohibited Activities",
          items: [
            "Posting false, misleading, or fraudulent information",
            "Uploading malware, viruses, or harmful code",
            "Harassing, threatening, or violating others' rights",
            "Sending spam or engaging in unauthorized advertising",
            "Infringing on intellectual property rights of others",
            "Using automated tools (such as scrapers) to access our services without authorization",
            "Impersonating others or falsely representing your relationship with any person or entity",
            "Engaging in any illegal activities or violating applicable laws"
          ]
        }
      },
      content: {
        title: "User Content",
        description: "Regarding content you submit:",
        ownership: {
          title: "Content Ownership",
          description: "You retain ownership of the content you submit but grant us a non-exclusive license to use, display, modify, and distribute that content."
        },
        moderation: {
          title: "Content Moderation",
          description: "We reserve the right to review, edit, or remove any content that violates these Terms or that we deem inappropriate."
        },
        responsibility: {
          title: "Content Responsibility",
          description: "You are solely responsible for the content you submit and warrant that you have all necessary rights and licenses."
        }
      },
      intellectual: {
        title: "Intellectual Property",
        description: "The AI Nav website and its content (including but not limited to text, graphics, logos, icons, software) are protected by copyright, trademark, and other intellectual property laws. Without express permission, you may not copy, modify, distribute, or otherwise use our content.",
        aiTools: "Trademarks and content of third-party AI tools belong to their respective owners. We only provide information and links and do not claim any rights to these tools."
      },
      disclaimer: {
        title: "Disclaimer",
        description: "Our services are provided 'as is' without any express or implied warranties, including but not limited to:",
        items: [
          "We do not guarantee that the services will be uninterrupted, secure, or error-free",
          "We are not responsible for the quality, accuracy, or reliability of third-party AI tools",
          "User reviews and ratings represent personal opinions only and do not represent our position",
          "We do not guarantee the functionality or effectiveness of any AI tool",
          "Content on external links is controlled by third parties, for which we are not responsible"
        ]
      },
      liability: {
        title: "Limitation of Liability",
        description: "To the maximum extent permitted by law:",
        limitations: [
          "We are not liable for any indirect, incidental, special, or consequential damages",
          "Our total liability does not exceed the fees you paid to us in the past 12 months (if any)",
          "You agree to assume all risks of using third-party AI tools at your own discretion",
          "We are not responsible for losses caused by service interruptions, data loss, or other technical issues"
        ]
      },
      termination: {
        title: "Termination",
        description: "We reserve the right to suspend or terminate your access to our services in the following situations:",
        reasons: [
          "Violation of these Terms of Service",
          "Engaging in fraudulent or illegal activities",
          "Abuse of our services or resources",
          "At the request of law enforcement authorities",
          "For any other reasonable cause"
        ],
        effect: "Upon termination, your right to access and use our services will immediately cease."
      },
      changes: {
        title: "Changes to Terms",
        content: "We may update these Terms of Service from time to time. Significant changes will be announced via website notification or email. Continued use of the services indicates your acceptance of the modified Terms. We recommend reviewing this page regularly to stay informed of the latest information."
      },
      contact: {
        title: "Contact Us",
        description: "If you have any questions or suggestions about these Terms of Service, please contact us:"
      }
    }
  }
};

export default enPages;
