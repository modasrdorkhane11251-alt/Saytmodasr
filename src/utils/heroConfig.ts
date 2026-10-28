export type SectionId = 'home' | 'games' | 'ai' | 'search' | 'web' | 'studio';
export type Language = 'en' | 'fa';

export const NAV_LINKS = ['Projects', 'Studio', 'Offerings', 'Inquire'] as const;

export const HERO_STATS = [
  { value: '250+', label: 'Brands Transformed' },
  { value: '95%', label: 'Client Retention' },
  { value: '10+', label: 'Years in the Game' },
] as const;

export const HERO_VIDEO_URL =
  '/assets/aistudio/gaming_bc368cb4.mp4';
export const HERO_POSTER_URL =
  '/assets/aistudio/gaming_poster.jpg';

export const AI_HERO_VIDEO_URL =
  '/assets/aistudio/ai_e39a24ce.mp4';
export const AI_HERO_POSTER_URL =
  '/assets/aistudio/ai_poster.jpg';

export const WEB_HERO_VIDEO_URL =
  '/assets/aistudio/premium_11ba9e23.mp4';
export const WEB_HERO_POSTER_URL =
  '/assets/aistudio/premium_poster.jpg';

export function getStaggerDelayMs(index: number): string {
  return `${index * 80 + 100}ms`;
}

export interface SectionLocalizedContent {
  tabLabel: string;
  navLabel: string;
  tagline: string;
  headingLines: [string, string, string];
  subtextLine1: string;
  subtextLine2: string;
  subtextHighlight: string;
  ctaText: string;
  badgeLine1: string;
  badgeLine2: string;
  stats: Array<{ value: string; label: string }>;
}

export interface SectionConfig {
  id: SectionId;
  accentHex: string;
  accentGlow: string;
  videoFilter: string;
  isCenterAction?: boolean;
  en: SectionLocalizedContent;
  fa: SectionLocalizedContent;
}

export const SECTIONS: SectionConfig[] = [
  {
    id: 'games',
    accentHex: '#F43F5E',
    accentGlow: 'rgba(244, 63, 94, 0.55)',
    videoFilter: 'none',
    en: {
      tabLabel: 'Gaming',
      navLabel: 'Gaming',
      tagline: 'MODASR / GAMING & GIFT CARDS',
      headingLines: ['Next-Gen', 'Gaming &', 'Instant Codes.'],
      subtextLine1: 'Official Steam Wallet, PlayStation PSN & Xbox Game Pass codes',
      subtextLine2: 'with transparent region specs —',
      subtextHighlight: 'and instant digital delivery.',
      ctaText: 'EXPLORE GAMING',
      badgeLine1: 'Official Codes',
      badgeLine2: 'USA & Global Regions',
      stats: [
        { value: 'STEAM', label: 'Instant Wallet Code' },
        { value: 'PS5 / PSN', label: 'Official US Store' },
        { value: 'XBOX', label: 'Game Pass Ultimate' },
      ],
    },
    fa: {
      tabLabel: 'گیم و بازی',
      navLabel: 'گیم و بازی',
      tagline: 'MODASR / GAMING & GIFT CARDS',
      headingLines: ['دنیای گیم و', 'گیفت‌کارت‌های', 'اورجینال جهانی.'],
      subtextLine1: 'گیفت‌کارت‌های اورجینال Steam، PlayStation و Xbox Game Pass',
      subtextLine2: 'با ریجن شفاف، قیمت قطعی سرور —',
      subtextHighlight: 'و تحویل آنی کد دیجیتال.',
      ctaText: 'مشاهده محصولات گیم',
      badgeLine1: 'کد اورجینال ریجن آمریکا',
      badgeLine2: 'تحویل آنی پس از تایید',
      stats: [
        { value: 'STEAM', label: 'شارژ آنی کیف پول' },
        { value: 'PSN / PS5', label: 'گیفت‌کارت رسمی سونی' },
        { value: 'XBOX', label: 'گیم‌پس آلتیمیت' },
      ],
    },
  },
  {
    id: 'ai',
    accentHex: '#00F5D4',
    accentGlow: 'rgba(0, 245, 212, 0.55)',
    videoFilter: 'hue-rotate(155deg) saturate(1.45) brightness(0.65) contrast(1.15)',
    en: {
      tabLabel: 'AI Hub',
      navLabel: 'AI Hub',
      tagline: 'MODASR / NEURAL INTELLIGENCE HUB',
      headingLines: ['Superhuman', 'AI Models,', 'In Your Hands.'],
      subtextLine1: 'Official ChatGPT Plus (GPT-4o), Claude 3.7 Sonnet & Cursor AI',
      subtextLine2: 'activated directly on your personal account —',
      subtextHighlight: 'with full-term guarantee.',
      ctaText: 'BROWSE AI PLANS',
      badgeLine1: 'Guaranteed',
      badgeLine2: 'Full Term Access',
      stats: [
        { value: 'GPT-4o', label: 'OpenAI Official Plus' },
        { value: 'Claude 3.7', label: 'Anthropic Sonnet Pro' },
        { value: 'Cursor AI', label: '500 Fast Requests' },
      ],
    },
    fa: {
      tabLabel: 'هوش مصنوعی',
      navLabel: 'هوش مصنوعی',
      tagline: 'MODASR / NEURAL INTELLIGENCE HUB',
      headingLines: ['نسل آینده‌ی', 'هوش مصنوعی،', 'در دستان شما.'],
      subtextLine1: 'اشتراک‌های اورجینال ChatGPT Plus، Claude 3.7 Sonnet و Cursor AI',
      subtextLine2: 'با فعال‌سازی رسمی روی ایمیل شخصی —',
      subtextHighlight: 'و ضمانت کامل دوره.',
      ctaText: 'انتخاب اشتراک هوش مصنوعی',
      badgeLine1: 'فعالسازی قانونی',
      badgeLine2: 'تضمین کامل مدت',
      stats: [
        { value: 'GPT-4o', label: 'اکانت رسمی OpenAI' },
        { value: 'Claude 3.7', label: 'بهترین مدل کدنویسی' },
        { value: 'Cursor Pro', label: 'هوش مصنوعی برنامه‌نویسی' },
      ],
    },
  },
  {
    id: 'search',
    accentHex: '#00D2FF',
    accentGlow: 'rgba(0, 210, 255, 0.6)',
    videoFilter: 'hue-rotate(180deg) saturate(1.3) brightness(0.5) contrast(1.2)',
    isCenterAction: true,
    en: {
      tabLabel: 'Search',
      navLabel: 'Search',
      tagline: 'MODASR / SMART PRODUCT FINDER',
      headingLines: ['Compare.', 'Select.', 'Order.'],
      subtextLine1: 'Inspect category, duration, region, and delivery method',
      subtextLine2: 'before placing your order —',
      subtextHighlight: 'with zero guesswork.',
      ctaText: 'OPEN FULL STORE',
      badgeLine1: 'Live Search',
      badgeLine2: 'Transparent Specs',
      stats: [
        { value: '8+', label: 'Flagship Products' },
        { value: 'USDT/IRT', label: 'Dual Currency View' },
        { value: '4.9/5', label: 'Verified Satisfaction' },
      ],
    },
    fa: {
      tabLabel: 'جستجو',
      navLabel: 'جستجو',
      tagline: 'MODASR / SMART PRODUCT FINDER',
      headingLines: ['جستجو.', 'مقایسه.', 'انتخاب.'],
      subtextLine1: 'دسته، مدت، حجم، ریجن و روش تحویل هر محصول را',
      subtextLine2: 'پیش از خرید به‌صورت شفاف بررسی کنید —',
      subtextHighlight: 'بدون حدس و ابهام.',
      ctaText: 'جستجوی هوشمند محصولات',
      badgeLine1: 'شفافیت کامل',
      badgeLine2: 'مشخصات دقیق ریجن',
      stats: [
        { value: '+۸', label: 'محصول منتخب فروشگاهی' },
        { value: 'تتر/تومان', label: 'نرخ لحظه‌ای والکس' },
        { value: '۴.۹/۵', label: 'رضایت خریداران' },
      ],
    },
  },
  {
    id: 'web',
    accentHex: '#6366F1',
    accentGlow: 'rgba(99, 102, 241, 0.55)',
    videoFilter: 'none',
    en: {
      tabLabel: 'VPN & Apps',
      navLabel: 'MODASR Connect',
      tagline: 'MODASR / CONNECTIVITY & SOFTWARE',
      headingLines: ['Connect.', 'Stream.', 'Scale.'],
      subtextLine1: 'High-speed MODASR Connect VPN & premium subscriptions',
      subtextLine2: 'engineered for low-latency work and trading —',
      subtextHighlight: 'always online.',
      ctaText: 'VIEW CONNECT PLANS',
      badgeLine1: 'Dedicated IP',
      badgeLine2: '99.9% Uptime',
      stats: [
        { value: '100 GB', label: 'High-Speed Bandwidth' },
        { value: 'DE / FI', label: 'Dedicated VIP Nodes' },
        { value: '99.9%', label: 'Connection Stability' },
      ],
    },
    fa: {
      tabLabel: 'اتصال و اپ',
      navLabel: 'سرویس اتصال',
      tagline: 'MODASR / CONNECTIVITY & SOFTWARE',
      headingLines: ['اتصال.', 'پایداری.', 'سرعت.'],
      subtextLine1: 'پلن‌های اختصاصی MODASR Connect و اشتراک‌های پریمیوم',
      subtextLine2: 'با آی‌پی ثابت و پینگ پایین برای ترید و هوش مصنوعی —',
      subtextHighlight: 'همیشه پایدار.',
      ctaText: 'بررسی پلن‌های اتصال',
      badgeLine1: 'آی‌پی ثابت VIP',
      badgeLine2: 'بدون افت سرعت',
      stats: [
        { value: '۱۰۰ GB', label: 'حجم ترافیک اختصاصی' },
        { value: 'آلمان/فنلاند', label: 'سرورهای پرسرعت' },
        { value: '۹۹.۹٪', label: 'پایداری اتصال' },
      ],
    },
  },
  {
    id: 'studio',
    accentHex: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.55)',
    videoFilter: 'hue-rotate(38deg) saturate(1.3) brightness(0.62) contrast(1.15)',
    en: {
      tabLabel: 'Account',
      navLabel: 'Account',
      tagline: 'MODASR / ACCOUNT & ORDER TRACKING',
      headingLines: ['Verify.', 'Track.', 'Receive.'],
      subtextLine1: 'Every order has an idempotency key and live event log',
      subtextLine2: 'calculated strictly on the server —',
      subtextHighlight: '100% auditable.',
      ctaText: 'TRACK YOUR ORDER',
      badgeLine1: 'Idempotent',
      badgeLine2: 'Audit Trail',
      stats: [
        { value: '0', label: 'Duplicate Orders' },
        { value: 'Live', label: 'Event Audit Log' },
        { value: '@modasrpanel', label: 'Direct Telegram Desk' },
      ],
    },
    fa: {
      tabLabel: 'حساب',
      navLabel: 'حساب کاربری',
      tagline: 'MODASR / ACCOUNT & ORDER TRACKING',
      headingLines: ['ثبت یکتا.', 'رویدادها.', 'پیگیری.'],
      subtextLine1: 'هر خرید یک رکورد قابل پیگیری با کلید یکتای سرور است',
      subtextLine2: 'که تمام رویدادهای آن با زمان دقیق —',
      subtextHighlight: 'قابل بررسی است.',
      ctaText: 'پیگیری با شماره سفارش',
      badgeLine1: 'بدون سفارش تکراری',
      badgeLine2: 'پشتیبانی @modasrpanel',
      stats: [
        { value: '۰', label: 'سفارش تکراری یا ساختگی' },
        { value: 'دقیق', label: 'تایم‌لاین رویداد سفارش' },
        { value: 'مستقیم', label: 'هماهنگی با پشتیبانی' },
      ],
    },
  },
];

export interface ShowcaseItem {
  id: string;
  category: 'ai' | 'web' | 'games';
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  metric: string;
  accent: string;
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'neural-gpt',
    category: 'ai',
    titleEn: 'ChatGPT Plus Dedicated',
    titleFa: 'اشتراک ChatGPT Plus اختصاصی',
    subtitleEn: 'Full GPT-4o & Reasoning on Personal Email',
    subtitleFa: 'فعالسازی رسمی روی ایمیل شخصی — ۲۰ دلار',
    metric: '$20.00 / mo',
    accent: '#00F5D4',
  },
  {
    id: 'vision-synth',
    category: 'ai',
    titleEn: 'Claude 3.7 Sonnet Pro',
    titleFa: 'اشتراک Claude 3.7 Sonnet Pro',
    subtitleEn: 'Premier AI for Coding & Deep Analysis',
    subtitleFa: 'محبوب‌ترین هوش مصنوعی برنامه‌نویسان — ۲۱.۵ دلار',
    metric: '$21.50 / mo',
    accent: '#10B981',
  },
  {
    id: 'hyper-commerce',
    category: 'web',
    titleEn: 'MODASR Connect Pro VPN',
    titleFa: 'سرویس اختصاصی MODASR Connect',
    subtitleEn: '100 GB Multi-Location Static IP Config',
    subtitleFa: 'آی‌پی ثابت آلمان و فنلاند ۱۰۰ گیگ — ۴.۵ دلار',
    metric: '$4.50 / mo',
    accent: '#6366F1',
  },
  {
    id: 'apex-arena',
    category: 'games',
    titleEn: 'Steam Wallet & PSN Gift Cards',
    titleFa: 'گیفت‌کارت Steam و PlayStation',
    subtitleEn: 'Official USA Region Instant Digital Codes',
    subtitleFa: 'ریجن آمریکا با تحویل کد اورجینال — ۲۰ دلار',
    metric: '$20.00 Code',
    accent: '#EF4444',
  },
];

export const HOME_SECTION: SectionConfig = {
  id: 'home',
  accentHex: '#14B8A6',
  accentGlow: 'rgba(20, 184, 166, 0.55)',
  videoFilter: 'none',
  en: {
    tabLabel: 'Dashboard',
    navLabel: 'Home & Dashboard',
    tagline: 'MODASR / MAIN DASHBOARD & COMMAND HUB',
    headingLines: ['Digital', 'Products', 'Command Hub.'],
    subtextLine1: 'Unified dashboard for AI subscriptions, Gaming gift cards & VPN nodes',
    subtextLine2: 'with live Wallex USDT rates —',
    subtextHighlight: 'and instant server-verified delivery.',
    ctaText: 'EXPLORE CATEGORIES',
    badgeLine1: 'Unified Hub',
    badgeLine2: '26+ Official Products',
    stats: [
      { value: '26+', label: 'Authentic Products' },
      { value: '30s', label: 'Wallex Live Rate' },
      { value: '24/7', label: 'Instant Delivery' },
    ],
  },
  fa: {
    tabLabel: 'خانه / داشبورد',
    navLabel: 'خانه و داشبورد',
    tagline: 'MODASR / MAIN DASHBOARD & COMMAND HUB',
    headingLines: ['داشبورد اصلی', 'محصولات دیجیتال', 'مدثر.'],
    subtextLine1: 'مرکز یکپارچه خرید اشتراک هوش مصنوعی، گیفت‌کارت گیم و سرویس اتصال',
    subtextLine2: 'با نرخ لحظه‌ای تتر والکس —',
    subtextHighlight: 'و تحویل آنی با تضمین سرور.',
    ctaText: 'مشاهده دسته‌بندی‌ها',
    badgeLine1: 'داشبورد یکپارچه',
    badgeLine2: '+۲۶ محصول اورجینال',
    stats: [
      { value: '+۲۶', label: 'محصول اورجینال' },
      { value: '۳۰ ثانیه', label: 'نرخ زنده والکس' },
      { value: '۲۴/۷', label: 'تحویل آنی' },
    ],
  },
};

export const BOTTOM_NAV_SECTIONS: SectionConfig[] = [
  HOME_SECTION,
  SECTIONS[0], // games (گیم و بازی)
  SECTIONS[1], // ai (هوش مصنوعی)
  SECTIONS[3], // web (اتصال و اپ)
  SECTIONS[2], // search (جستجو)
  SECTIONS[4], // studio (حساب)
];

export function getSectionById(id: SectionId): SectionConfig {
  if (id === 'home') return HOME_SECTION;
  return SECTIONS.find((s) => s.id === id) ?? SECTIONS[0];
}

export interface PageVisualTheme {
  id: SectionId;
  nameFa: string;
  nameEn: string;
  primaryHex: string;
  secondaryHex: string;
  ambientBaseHex: string;
  fullPageGradient: string;
  cardBorderClass: string;
  cardGlassClass: string;
  pillActiveClass: string;
  heroMediaType: 'video' | 'artwork';
  mediaUrl: string;
  posterUrl: string;
}

export const PAGE_VISUAL_THEMES: Record<SectionId, PageVisualTheme> = {
  home: {
    id: 'home',
    nameFa: 'تم رویال زمردی داشبورد اصلی',
    nameEn: 'Royal Emerald Command Hub',
    primaryHex: '#14B8A6',
    secondaryHex: '#10B981',
    ambientBaseHex: '#020B0E',
    fullPageGradient:
      'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(20, 184, 166, 0.24) 0%, rgba(16, 185, 129, 0.10) 45%, rgba(2, 11, 14, 0.92) 100%)',
    cardBorderClass: 'border-teal-500/25 hover:border-teal-400/55',
    cardGlassClass: 'bg-[#041216]/90 backdrop-blur-2xl',
    pillActiveClass: 'bg-teal-400 text-slate-950 shadow-[0_0_20px_rgba(20,184,166,0.45)]',
    heroMediaType: 'artwork',
    mediaUrl: '',
    posterUrl: '',
  },
  games: {
    id: 'games',
    nameFa: 'تم کریمسون آرنا گیم و بازی',
    nameEn: 'Crimson Gaming Arena',
    primaryHex: '#F43F5E',
    secondaryHex: '#F97316',
    ambientBaseHex: '#0B0205',
    fullPageGradient:
      'radial-gradient(ellipse 95% 65% at 50% 12%, rgba(244, 63, 94, 0.34) 0%, rgba(249, 115, 22, 0.16) 48%, rgba(11, 2, 5, 0.68) 100%)',
    cardBorderClass: 'border-rose-500/25 hover:border-rose-400/55',
    cardGlassClass: 'bg-[#090d14]/88 backdrop-blur-2xl',
    pillActiveClass: 'bg-rose-500 text-white shadow-[0_0_22px_rgba(244,63,94,0.55)]',
    heroMediaType: 'video',
    mediaUrl: HERO_VIDEO_URL,
    posterUrl: HERO_POSTER_URL,
  },
  ai: {
    id: 'ai',
    nameFa: 'تم نکسوس نئونی هوش مصنوعی',
    nameEn: 'Cyan Neural Matrix',
    primaryHex: '#00F5D4',
    secondaryHex: '#06B6D4',
    ambientBaseHex: '#02090F',
    fullPageGradient:
      'radial-gradient(ellipse 95% 65% at 50% 12%, rgba(0, 245, 212, 0.30) 0%, rgba(6, 182, 212, 0.16) 48%, rgba(2, 9, 15, 0.68) 100%)',
    cardBorderClass: 'border-cyan-500/25 hover:border-cyan-400/55',
    cardGlassClass: 'bg-[#05101a]/88 backdrop-blur-2xl',
    pillActiveClass: 'bg-cyan-400 text-slate-950 shadow-[0_0_22px_rgba(0,245,212,0.5)]',
    heroMediaType: 'video',
    mediaUrl: AI_HERO_VIDEO_URL,
    posterUrl: AI_HERO_POSTER_URL,
  },
  web: {
    id: 'web',
    nameFa: 'تم کهکشانی ایندیگو اتصال و اپ',
    nameEn: 'Indigo Cosmic Connectivity',
    primaryHex: '#6366F1',
    secondaryHex: '#38BDF8',
    ambientBaseHex: '#030514',
    fullPageGradient:
      'radial-gradient(ellipse 95% 65% at 50% 12%, rgba(99, 102, 241, 0.34) 0%, rgba(56, 189, 248, 0.16) 48%, rgba(3, 5, 20, 0.68) 100%)',
    cardBorderClass: 'border-indigo-500/25 hover:border-indigo-400/55',
    cardGlassClass: 'bg-[#070b1c]/88 backdrop-blur-2xl',
    pillActiveClass: 'bg-indigo-500 text-white shadow-[0_0_22px_rgba(99,102,241,0.55)]',
    heroMediaType: 'video',
    mediaUrl: WEB_HERO_VIDEO_URL,
    posterUrl: WEB_HERO_POSTER_URL,
  },
  search: {
    id: 'search',
    nameFa: 'تم هولوگرافیک سایبری جستجو',
    nameEn: 'Sapphire Holographic Search',
    primaryHex: '#00D2FF',
    secondaryHex: '#3B82F6',
    ambientBaseHex: '#02040D',
    fullPageGradient:
      'radial-gradient(ellipse 95% 65% at 50% 8%, rgba(0, 210, 255, 0.24) 0%, rgba(59, 130, 246, 0.12) 48%, rgba(2, 4, 13, 0.95) 100%)',
    cardBorderClass: 'border-sky-500/25 hover:border-sky-400/55',
    cardGlassClass: 'bg-[#040e18]/88 backdrop-blur-2xl',
    pillActiveClass: 'bg-sky-400 text-slate-950 shadow-[0_0_22px_rgba(0,210,255,0.5)]',
    heroMediaType: 'artwork',
    mediaUrl: '',
    posterUrl: '',
  },
  studio: {
    id: 'studio',
    nameFa: 'تم طلایی VIP حساب کاربری',
    nameEn: 'Golden Obsidian VIP Account',
    primaryHex: '#F59E0B',
    secondaryHex: '#FBBF24',
    ambientBaseHex: '#090602',
    fullPageGradient:
      'radial-gradient(ellipse 95% 65% at 50% 8%, rgba(245, 158, 11, 0.30) 0%, rgba(217, 119, 6, 0.15) 48%, rgba(9, 6, 2, 0.72) 100%)',
    cardBorderClass: 'border-amber-500/25 hover:border-amber-400/55',
    cardGlassClass: 'bg-[#090814]/88 backdrop-blur-2xl',
    pillActiveClass: 'bg-amber-400 text-slate-950 shadow-[0_0_22px_rgba(245,158,11,0.5)]',
    heroMediaType: 'artwork',
    mediaUrl: HERO_POSTER_URL,
    posterUrl: HERO_POSTER_URL,
  },
};

export function getPageVisualTheme(sectionId: SectionId): PageVisualTheme {
  return PAGE_VISUAL_THEMES[sectionId] ?? PAGE_VISUAL_THEMES.home;
}

export function filterShowcaseItems(
  items: ShowcaseItem[],
  category: 'all' | 'ai' | 'web' | 'games',
  query: string
): ShowcaseItem[] {
  const normalized = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalized) return true;
    return (
      item.titleEn.toLowerCase().includes(normalized) ||
      item.titleFa.toLowerCase().includes(normalized) ||
      item.subtitleEn.toLowerCase().includes(normalized) ||
      item.subtitleFa.toLowerCase().includes(normalized)
    );
  });
}
