import facebook_icon from './facebook_icon.svg'
import googleplus_icon from './googleplus_icon.svg'
import twitter_icon from './twitter_icon.svg'
import logo from './logo.svg'
import arrow from './arrow.svg'
import logo_light from './logo_light.svg'
import blog_icon from './blog_icon.png'
import add_icon from './add_icon.svg'
import list_icon from './list_icon.svg'
import email_icon from './email_icon.png'
import upload_area from './upload_area.svg'
import user_icon from './user_icon.svg'
import bin_icon from './bin_icon.svg'
import comment_icon from './comment_icon.svg'
import tick_icon from './tick_icon.svg'
import star_icon from './star_icon.svg'
import cross_icon from './cross_icon.svg'
import home_icon from './home_icon.svg'
import gradientBackground from './gradientBackground.png'
import dashboard_icon_1 from './dashboard_icon_1.svg'
import dashboard_icon_2 from './dashboard_icon_2.svg'
import dashboard_icon_3 from './dashboard_icon_3.svg'
import dashboard_icon_4 from './dashboard_icon_4.svg'


export const assets = {
    facebook_icon,
    googleplus_icon,
    twitter_icon,
    logo,
    arrow,
    logo_light,
    blog_icon,
    add_icon,
    email_icon,
    upload_area,
    user_icon,
    bin_icon,
    comment_icon,
    tick_icon,
    star_icon,
    home_icon,
    gradientBackground,
    list_icon,
    cross_icon,
    dashboard_icon_1,
    dashboard_icon_2,
    dashboard_icon_3,
    dashboard_icon_4,
}
export const blogCategories = ['All', 'Technology', 'Startup', 'Lifestyle', 'Finance']

export const footer_data = [
      {
          title: "Quick Links",
          links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
      },
      {
          title: "Need Help?",
          links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
      },
      {
          title: "Follow Us",
          links: ["Instagram", "Twitter", "Facebook", "YouTube"]
      }
  ];

// Consultant Info
// Consultant Info
export const consultant = {
    name: "Arun Akash J",
    title: "Independent Financial Consultant",
    city: "New York",
    address: "45/7b, Main Road, Erumpukadu, Nagercoil, Tamil Nadu 629004, India",
    phone: "+91 8122920290",
    phoneTel: "+91 8122920290",
    email: "arunfinancialconsulting@gmail.com",
    hours: "Mon–Fri: 8AM–7PM, Sat: 9AM–4PM",
    mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.84513792357066!2d77.39311981637883!3d8.1500233200215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f16bef65f2cf%3A0xfc5bf71b20598469!2sRAJA%20HINDI%20VIDHYALAYA%2C%20MUTHAARAMMAN%20KOVIL!5e0!3m2!1sen!2sin!4v1769418432436!5m2!1sen!2sin",
};

// Contact Methods
export const contactMethods = (setShowScheduler, consultant) => [
    {
        icon: "📞",
        title: "Phone Call",
        description: "Talk directly with me about your financial goals and concerns.",
        action: "Call Now",
        gradient: "from-blue-500 to-cyan-500",
        href: `tel:${consultant.phoneTel}`,
        type: "phone",
    },
    {
        icon: "💻",
        title: "Video Meeting",
        description: "Meet online from the comfort of your home—no travel needed.",
        action: "Schedule Video Call",
        gradient: "from-violet-500 to-fuchsia-500",
        onClick: () => setShowScheduler(true),
        type: "video",
    },
    {
        icon: "📧",
        title: "Send Email",
        description: "Send me your questions and I'll reply personally within 24 hours.",
        action: "Write an Email",
        gradient: "from-amber-500 to-orange-500",
        href: `mailto:${consultant.email}?subject=Financial Consultation Inquiry&body=Hello Alex,%0D%0A%0D%0AI'm interested in discussing my financial situation and would like to learn more about your services.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you!`,
        type: "email",
    },
];

// Services
export const services = [
    "Personal Financial Planning",
    "Investment Advisory",
    "Wealth Management",
    "Tax Planning",
    "Estate Planning",
    "Retirement Planning",
];

// FAQ
export const faqData = [
    {
        q: "How quickly can we schedule a meeting?",
        a: "I typically have availability within 24–48 hours. For urgent matters, mention it in your message and I'll do my best to accommodate you sooner.",
    },
    {
        q: "Do you work with clients remotely?",
        a: "Absolutely! I serve clients both locally and nationwide through video calls and phone consultations. Many of my clients prefer the convenience of virtual meetings.",
    },
    {
        q: "Is there a fee for the initial consultation?",
        a: "No, the first consultation is completely free. It's a chance for us to get acquainted and see if we're a good fit for working together long-term.",
    },
    {
        q: "What should I bring to our first meeting?",
        a: "Just come with questions and an open mind! If you have specific financial documents you'd like to discuss, feel free to bring them, but it's not required for our initial chat.",
    },
];

// Height offset for sticky header
export const HEADER_OFFSET = 40;

// Extended service details for modals (no pricing fields)
export const serviceModalContent = {
    "financial-planning": {
        title: "Comprehensive Financial Planning",
        icon: "📊",
        description:
            "A holistic approach to managing your financial life, covering every aspect from budgeting to wealth building.",
        benefits: [
            "Complete financial health assessment and analysis",
            "Personalized roadmap aligned with your life goals",
            "Cash flow optimization and debt management strategies",
            "Emergency fund planning and risk assessment",
            "Regular progress reviews and plan adjustments",
        ],
        process: [
            "Initial discovery meeting to understand your goals and current situation",
            "Comprehensive analysis of your income, expenses, assets, and liabilities",
            "Development of a personalized financial plan with actionable steps",
            "Implementation guidance and ongoing monitoring",
            "Quarterly reviews and annual plan updates",
        ],
        faqs: [
            {
                q: "How often will we meet?",
                a: "We typically meet quarterly for progress reviews, with additional meetings as needed for major life changes.",
            },
            {
                q: "What documents do I need to bring?",
                a: "Recent statements for all accounts, tax returns, insurance policies, and any existing financial plans.",
            },
        ],
    },
    "investment-advisory": {
        title: "Investment Portfolio Management",
        icon: "📈",
        description:
            "Professional investment management tailored to your risk tolerance, time horizon, and financial objectives.",
        benefits: [
            "Personalized asset allocation based on your risk profile",
            "Diversified portfolio construction across asset classes",
            "Regular rebalancing to maintain optimal allocation",
            "Tax-efficient investment strategies",
            "Comprehensive performance reporting and analysis",
        ],
        process: [
            "Risk tolerance assessment and investment objective analysis",
            "Portfolio design and asset allocation strategy",
            "Investment selection and portfolio implementation",
            "Ongoing monitoring and rebalancing",
            "Quarterly performance reviews and market commentary",
        ],
        faqs: [
            {
                q: "What is the minimum investment amount?",
                a: "I work with clients starting from $100,000 in investable assets, with personalized attention at every level.",
            },
            {
                q: "How do you select investments?",
                a: "I use a disciplined approach focusing on low-cost, diversified investments aligned with your risk tolerance and goals.",
            },
        ],
    },
    "retirement-planning": {
        title: "Retirement Income Planning",
        icon: "🏖️",
        description:
            "Strategic planning to ensure a comfortable retirement with sustainable income throughout your golden years.",
        benefits: [
            "Retirement income needs analysis and projection",
            "Social Security optimization strategies",
            "Tax-efficient withdrawal strategies from retirement accounts",
            "Healthcare cost planning and long-term care considerations",
            "Legacy planning and wealth transfer strategies",
        ],
        process: [
            "Retirement lifestyle and income needs assessment",
            "Analysis of current retirement savings and projected growth",
            "Development of comprehensive retirement income strategy",
            "Implementation of withdrawal and tax optimization plans",
            "Annual strategy reviews and adjustments",
        ],
        faqs: [
            {
                q: "When should I start retirement planning?",
                a: "The earlier the better! Even in your 20s, retirement planning can make a huge difference in your financial security.",
            },
            {
                q: "How much should I save for retirement?",
                a: "This varies by individual, but a common guideline is 10-15% of your income, including any employer match.",
            },
        ],
    },
    "tax-planning": {
        title: "Tax Optimization Strategies",
        icon: "💰",
        description:
            "Proactive tax planning to minimize your tax burden while maximizing your wealth-building opportunities.",
        benefits: [
            "Tax-efficient investment placement and asset location",
            "Strategic Roth IRA conversions and retirement account optimization",
            "Tax loss harvesting and capital gains management",
            "Charitable giving strategies for tax benefits",
            "Estate tax minimization and wealth transfer planning",
        ],
        process: [
            "Comprehensive review of current tax situation and strategies",
            "Analysis of tax-saving opportunities across all income sources",
            "Development of year-round tax optimization plan",
            "Implementation of tax-efficient investment strategies",
            "Year-end tax planning and strategy adjustments",
        ],
        faqs: [
            {
                q: "Do you prepare tax returns?",
                a: "I focus on tax planning strategy and work closely with your CPA or tax preparer for implementation.",
            },
            {
                q: "When should we discuss tax strategies?",
                a: "Tax planning should be a year-round conversation, not just during tax season.",
            },
        ],
    },
    "business-consulting": {
        title: "Business Financial Consulting",
        icon: "🚀",
        description:
            "Expert financial guidance to help Indian businesses manage growth, reduce risks, and stay tax-efficient.",
        benefits: [
            "Business cash flow and working capital management",
            "Tax planning for business owners",
            "Financial risk assessment & mitigation strategies",
            "Growth planning and funding strategies",
            "Advisory for business expansion, restructuring, or succession",
        ],
        process: [
            "Business financial health assessment",
            "Cash flow & tax efficiency review",
            "Strategic planning for growth & expansion",
            "Risk management framework setup",
        ],
        faqs: [
            {
                q: "What size businesses do you work with?",
                a: "I work with small to medium-sized businesses across various industries, focusing on growth-stage companies.",
            },
            {
                q: "How do you help with cash flow management?",
                a: "I provide comprehensive cash flow analysis, forecasting, and strategies to optimize working capital and improve liquidity.",
            },
        ],
    },
    "wealth-management": {
        title: "Wealth Management",
        icon: "💎",
        description:
            "Comprehensive wealth management tailored to Indian families and entrepreneurs, ensuring growth, protection, and smooth legacy transfer.",
        benefits: [
            "Investment management",
            "Tax-efficient wealth strategies",
            "Estate & succession planning",
            "Risk management & asset protection",
            "Long-term legacy planning for future generations",
        ],
        process: [
            "Wealth review & family financial goals assessment",
            "Portfolio design across multiple asset classes",
            "Implementation with tax-optimized strategies",
            "Ongoing monitoring & performance review",
        ],
        faqs: [
            {
                q: "What makes your wealth management approach different?",
                a: "I focus on holistic wealth preservation and growth, integrating tax efficiency, risk management, and legacy planning.",
            },
            {
                q: "Do you work with families across generations?",
                a: "Yes, I provide multi-generational planning to help families preserve and transfer wealth effectively.",
            },
        ],
    },
};

// Core service categories
export const serviceCategories = [
    {
        id: "financial-planning",
        title: "Financial Planning",
        icon: "📊",
        gradient: "from-indigo-500 via-blue-500 to-cyan-500",
        services: [
            "Comprehensive Financial Review",
            "Goal Setting & Prioritization",
            "Cash Flow Analysis",
            "Debt Management Strategy",
            "Emergency Fund Planning",
        ],
    },
    {
        id: "investment-advisory",
        title: "Investment Advisory",
        icon: "📈",
        gradient: "from-emerald-400 via-teal-500 to-cyan-600",
        services: [
            "Portfolio Construction",
            "Asset Allocation Strategy",
            "Risk Assessment",
            "Investment Selection",
            "Performance Monitoring",
        ],
    },
    {
        id: "retirement-planning",
        title: "Retirement Planning",
        icon: "🏖️",
        gradient: "from-purple-500 via-violet-500 to-indigo-600",
        services: [
            "Retirement Needs Analysis",
            "EPF & PPF optimization",
            "NPS planning",
            "Systematic withdrawal strategies",
            "Income Distribution Planning",
        ],
    },
    {
        id: "tax-planning",
        title: "Tax Planning",
        icon: "💰",
        gradient: "from-amber-400 via-orange-500 to-red-500",
        services: [
            "Tax-Efficient Investing",
            "Tax Loss Harvesting",
            "Section 80C deductions",
            "Charitable Giving Strategies",
            "Year-End Tax Planning",
        ],
    },
    {
        id: "business-consulting",
        title: "Business Financial Consulting",
        icon: "🚀",
        gradient: "from-rose-400 via-pink-500 to-purple-600",
        services: [
            "Optimize business cash flow",
            "Strategic growth planning",
            "Smart tax strategies for businesses",
            "Risk assessment & financial control",
            "Advisory support for expansion",
        ],
    },
    {
        id: "wealth-management",
        title: "Wealth Management",
        icon: "💎",
        gradient: "from-slate-600 via-gray-700 to-zinc-800",
        services: [
            "Preserve and grow wealth",
            "Integrated investment & tax planning",
            "Personalized family financial strategies",
            "Asset protection & risk management",
            "Legacy and estate planning",
        ],
    }
];

// Detailed service showcase (for detailed section)
export const detailedServices = [
    {
        title: "Comprehensive Financial Planning",
        category: "Core Service",
        duration: "Ongoing Relationship",
        description:
            "A complete approach to your financial life, covering budgeting, tax-saving, investments, and long-term wealth creation.",
        features: [
            "Full financial health check-up",
            "Customized financial roadmap",
            "Monthly review of goals and progress",
            "Goal tracking and adjustments",
            "Direct access via phone/email for ongoing support",
        ],
        process: [
            "Initial financial discovery",
            "Strategic plan development",
            "Implementation guidance",
            "Ongoing monitoring & adjustments",
        ],
        gradient: "from-indigo-500 to-cyan-600",
        bgColor: "bg-gradient-to-br from-indigo-50 to-cyan-50",
        iconBg: "from-indigo-500 to-cyan-500",
    },
    {
        title: "Investment Portfolio Management",
        category: "Investment Service",
        duration: "Quarterly Reviews",
        description:
            "Professional investment management tailored to your risk tolerance, time horizon, and financial objectives.",
        features: [
            "Personalized asset allocation",
            "Diversified portfolio construction",
            "Regular rebalancing",
            "Tax-efficient strategies",
            "Performance reporting",
            "Market commentary & insights",
        ],
        process: [
            "Risk tolerance assessment",
            "Portfolio design",
            "Implementation",
            "Quarterly reviews",
        ],
        gradient: "from-emerald-600 to-teal-600",
        bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
        iconBg: "from-emerald-500 to-teal-500",
    },
    {
        title: "Retirement Income Planning",
        category: "Retirement Service",
        duration: "Annual Strategy Review",
        description:
            "Secure your golden years with a clear retirement strategy that ensures steady income and peace of mind.",
        features: [
            "Retirement income projection",
            "EPF, PPF & NPS optimization",
            "Tax-efficient withdrawal strategies",
            "Health and insurance cost planning",
            "Pension & legacy planning for family security",
            "Risk management with balanced asset allocation",
        ],
        process: [
            "Retirement goals analysis",
            "Income strategy development",
            "Implementation planning",
            "Annual strategy reviews",
        ],
        gradient: "from-purple-600 to-indigo-600",
        bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
        iconBg: "from-purple-500 to-indigo-500",
    },
    {
        title: "Tax Optimization Strategies",
        category: "Tax Service",
        duration: "Year-Round Planning",
        description:
            "Proactive tax planning to minimize your tax burden while maximizing your wealth-building opportunities.",
        features: [
            "Tax-efficient investments under Section 80C & 80D",
            "Retirement account optimization",
            "Tax loss harvesting",
            "Capital gains tax planning",
            "Charitable giving planning",
            "Year-end tax planning strategies",
        ],
        process: [
            "Detailed tax situation analysis",
            "Personalized tax-saving strategy design",
            "Year-round implementation & monitoring",
            "Future-Proofing",
        ],
        gradient: "from-amber-600 to-orange-600",
        bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
        iconBg: "from-amber-500 to-orange-500",
    },
    {
        title: "Business Financial Consulting",
        category: "Business Service",
        duration: "Quarterly & Annual Reviews",
        description:
            "Expert financial guidance to help Indian businesses manage growth, reduce risks, and stay tax-efficient.",
        features: [
            "Business cash flow and working capital management",
            "Tax planning for business owners",
            "Financial risk assessment & mitigation strategies",
            "Growth planning and funding strategies",
            "Advisory for business expansion, restructuring, or succession",
        ],
        process: [
            "Business financial health assessment",
            "Cash flow & tax efficiency review",
            "Strategic planning for growth & expansion",
            "Risk management framework setup",
        ],
        gradient: "from-rose-600 to-pink-600",
        bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
        iconBg: "from-rose-500 to-pink-500",
    },
    {
        title: "Wealth Management",
        category: "Wealth Service",
        duration: "Ongoing Relationship",
        description:
            "Comprehensive wealth management tailored to Indian families and entrepreneurs, ensuring growth, protection, and smooth legacy transfer.",
        features: [
            "Investment management",
            "Tax-efficient wealth strategies",
            "Estate & succession planning",
            "Risk management & asset protection",
            "Long-term legacy planning for future generations",
        ],
        process: [
            "Wealth review & family financial goals assessment",
            "Portfolio design across multiple asset classes",
            "Implementation with tax-optimized strategies",
            "Ongoing monitoring & performance review",
        ],
        gradient: "from-slate-600 to-gray-700",
        bgColor: "bg-gradient-to-br from-slate-50 to-gray-50",
        iconBg: "from-slate-500 to-gray-600",
    },
];

// Process steps for "My Process" section
export const processSteps = [
    {
        step: "01",
        title: "Getting to Know You",
        description:
            "We start by listening — to understand your financial goals, values, vision for the future and challenges.",
        icon: "🤝",
        duration: "60-90 minutes",
    },
    {
        step: "02",
        title: "Analysis & Planning",
        description:
            "I analyze your financial data and create a personalized strategy tailored to your unique needs",
        icon: "📋",
        duration: "1-2 weeks",
    },
    {
        step: "03",
        title: "Plan Presentation",
        description:
            "We review your customized financial plan together and make any necessary adjustments",
        icon: "📊",
        duration: "60 minutes",
    },
    {
        step: "04",
        title: "Implementation & Monitoring",
        description:
            "We execute your plan and provide ongoing monitoring with regular check-ins and adjustments",
        icon: "⚡",
        duration: "Ongoing",
    },
];

export const testimonials = [
    {
        text: "As a student, I had no idea how to manage money or plan for the future. This financial guidance helped me understand savings, insurance, and long-term goals in a very simple way. I now feel confident about my finances and future plans. Highly recommended for young people who want to start early.",
        name: "Student / Early Career Aspirant",
        title: "Profession: College Student",
    },
    {
        text: "“I was earning well but had no structured plan. My financial consultant helped me organize my investments, reduce unnecessary expenses, and plan for major goals like buying a home. The advice was clear, practical, and completely tailored to my needs.”.",
        name: "Young Professional",
        title: "Profession: IT Professional",
    },
    {
        text: "Running a business leaves little time for financial planning. I received excellent guidance on tax efficiency, investment planning, and securing my family’s future. The support has been consistent and trustworthy. I finally feel financially secure.",
        name: "Small Business Owner",
        title: "Profession: Entrepreneur",
    },
    {
        text: "With children’s education and family responsibilities, financial planning felt overwhelming. The step-by-step approach made everything easy to understand. I now have clear plans for education, insurance, and long-term wealth creation.",
        name: "Mid-Career Professional with Family",
        title: "Profession: Manager / Working Parent",
    },
    {
        text: "After retirement, managing savings and regular income was my biggest concern. I received honest, patient, and well-planned advice that helped me protect my savings and ensure steady income. I now enjoy my retirement with peace of mind.",
        name: "Retired Person",
        title: "Profession: Retired Government Employee",
    },
];

export const coreServices = [
    {
        icon: "📊",
        title: "Financial Planning",
        description: "A personalized roadmap to strengthen your financial future.",
        highlights: ["Goal-Oriented Budgeting", "Cash Flow Optimization", "Risk & Compliance Assessmentt"]
    },
    {
        icon: "📈",
        title: "Investment Advisory",
        description: "Strategic guidance to grow and protect your wealth",
        highlights: ["Portfolio & Asset Allocation", "Performance Tracking & Valuation Models", "Tax-Efficient Strategies"]
    },
    {
        icon: "🏖️",
        title: "Business Financial Consulting",
        description: "Smart financial solutions to help your business scale with confidence.",
        highlights: ["Budgeting & Forecasting", "Profitability & Cash Flow Analysis", "Valuation & M&A Support"]
    }
];

export const achievements = [
    { number: "50+", label: "Happy Clients", icon: "👥" },
    { number: "$1M+", label: "Assets Managed", icon: "💰" },
    { number: "5+", label: "Years Experience", icon: "⏰" },
    { number: "100%", label: "Client Retention", icon: "⭐" }
];

export const myApproachSteps = [
    {
        step: "01",
        title: "Discover",
        description: "Learn about your financial habits, goals, and priorities.",
        icon: "👂",
        color: "blue"
    },
    {
        step: "02",
        title: "Assess",
        description: "Examine your current situation with detailed insights and reports.",
        icon: "📊",
        color: "emerald"
    },
    {
        step: "03",
        title: "Strategize",
        description: "Develop a clear, tailored roadmap to reach your objectives.",
        icon: "🗺️",
        color: "purple"
    },
    {
        step: "04",
        title: "Support",
        description: "Ongoing guidance and tools to stay on track and achieve success.",
        icon: "🎯",
        color: "orange"
    }
];

// assets.js

export const financeKeywords = [
    'finance',
    'financial',
    'investment',
    'invest',
    'trading',
    'quant',
    'derivative',
    'bank',
    'esg',
    'risk',
    'portfolio',
    'valuation',
    'credit',
    'merger',
    'acquisition',
    'm&a',
    'ddm',
    'dcf'
];

export const skills = [
    'Financial Modeling (DCF, M&A, DDM)',
    'Quantitative & Statistical Analysis',
    'Business and Financial Analysis',
    'Corporate Strategy & Risk Management',
];

export const skillBars = [
    { name: 'Business and Financial Analysis', level: 92 },
    { name: 'Financial Modeling (DCF, M&A)', level: 95 },
    { name: 'Quantitative Analysis & Simulation', level: 88 },
    { name: 'Corporate Strategy & Risk Planning', level: 90 },
];

export const featured = [
    {
        repo: "A‑Due‑diligent‑of‑an‑Islamic‑Banking‑or‑Islamic‑Window",
        title: "Islamic Banking Due Diligence Case Study",
        cover: "/cover-case1.png",
        excerpt:
            "A structured due diligence of Faisal Islamic Bank of Egypt SAE — evaluating board‑level Sharia governance, profit‑sharing models, and IFRS 9 alignment. The bank officially launched operations on July 5 1979 in Cairo, after being incorporated in 1977 under Egyptian law.",
        highlights: [
            "Shariah‑compliance review & board structure analysis",
            "Equity‑style profit‑distribution model",
            "Capital adequacy alignment under IFRS 9"
        ],
        link:
            "https://github.com/Aariyanakash/A-Due-diligent-of-an-Islamic-Banking-or-Islamic-Window"
    },
    {
        repo: "The‑concept‑of‑takeovers…",
        title: "Takeover Strategies & Corporate M&A Concepts",
        cover: "/cover-case2.png",
        excerpt:
            "Comparative analysis of friendly, hostile, reverse & backflip takeover models, using practical industry examples and real‑world financial rationale.",
        highlights: [
            "Structured in Harvard‑style case format",
            "Flow diagrams of strategy types",
            "Applied prototype model on hypothetical Egyptian mid‑cap firm"
        ],
        link:
            "https://github.com/Aariyanakash/The-concept-of-takeovers-and-the-different-types-of-takeover-strategies"
    },
    {
        repo: "Derivatives‑and‑Alternate‑Investments",
        title: "Derivatives & ESG‑linked Investment Framework",
        cover: "/cover-case3.png",
        excerpt:
            "Includes pricing modules for futures, forwards, and swaps, plus structured ESG‑compliant investment models aligned with Islamic finance principles.",
        highlights: [
            "Greeks dashboard prototype in Jupyter Notebook",
            "Sharpe‑ratio and simulation across multi‑asset time periods",
            "Islamic Landscaping Investment Strategy (ILIS) whitepaper"
        ],
        link:
            "https://github.com/Aariyanakash/Derivatives-and-Alternate-Investments"
    }
];