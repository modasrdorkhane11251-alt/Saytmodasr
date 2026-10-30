export type ProductCategory =
  | 'all'
  | 'ai'
  | 'ingame'
  | 'gaming'
  | 'subscriptions'
  | 'vpn';

export type ProductIconType =
  | 'openai'
  | 'claude'
  | 'cursor'
  | 'gemini'
  | 'midjourney'
  | 'steam'
  | 'psn'
  | 'xbox'
  | 'apple'
  | 'googleplay'
  | 'nintendo'
  | 'razer'
  | 'codm'
  | 'pubg'
  | 'freefire'
  | 'supercell'
  | 'genshin'
  | 'telegram'
  | 'spotify'
  | 'youtube'
  | 'netflix'
  | 'canva'
  | 'tradingview'
  | 'discord'
  | 'vpn';

export interface ModasrProduct {
  id: string;
  slug: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabelFa: string;
  categoryLabelEn: string;
  platformBrand: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  priceUsd: number;
  durationFa: string;
  durationEn: string;
  regionFa: string;
  regionEn: string;
  deliveryFa: string;
  deliveryEn: string;
  badgeFa: string;
  badgeEn: string;
  accentColor: string;
  iconType: ProductIconType;
  keywords?: string;
  popularPackagesFa?: string[];
}

export interface OrderEvent {
  id: string;
  titleFa: string;
  titleEn: string;
  detailFa: string;
  detailEn: string;
  timestamp: string;
  actor: string;
  status: 'completed' | 'active' | 'pending';
}

export interface ModasrOrder {
  orderNumber: string;
  email: string;
  idempotencyKey: string;
  items: Array<{ product: ModasrProduct; quantity: number }>;
  usdtRateToman: number;
  subtotalUsd: number;
  discountUsd: number;
  totalUsd: number;
  totalToman: number;
  statusFa: string;
  statusEn: string;
  createdAt: string;
  events: OrderEvent[];
}

export const DEFAULT_USDT_RATE_TOMAN = 68450;

export const MODASR_PRODUCTS: ModasrProduct[] = [
  // =========================================================================
  // 1. ARTIFICIAL INTELLIGENCE & DEVELOPER TOOLS (10 PRODUCTS)
  // =========================================================================
  {
    id: 'chatgpt-plus',
    slug: 'chatgpt-plus',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'OpenAI',
    titleFa: 'اشتراک ChatGPT Plus اختصاصی (GPT-4o / o3)',
    titleEn: 'ChatGPT Plus Dedicated (GPT-4o / o3)',
    subtitleFa: 'دسترسی کامل به GPT-4o، مدل‌های استدلالی o3-mini، تولید تصویر و تحلیل داده روی ایمیل شخصی',
    subtitleEn: 'Full access to GPT-4o, o3 reasoning, image generation & advanced data analysis',
    priceUsd: 20,
    durationFa: '۱ ماهه (تضمینی)',
    durationEn: '1 Month Warranty',
    regionFa: 'گلوبال / بدون محدودیت',
    regionEn: 'Global Access',
    deliveryFa: 'فعالسازی روی ایمیل شخصی',
    deliveryEn: 'Personal Email Activation',
    badgeFa: 'پرفروش‌ترین AI',
    badgeEn: 'Best Seller AI',
    accentColor: '#00F5D4',
    iconType: 'openai',
    keywords: 'چت جی پی تی پلاس اوپن ای آی chatgpt plus openai gpt4o gpt-4o هوش مصنوعی دیکاردو',
    popularPackagesFa: ['۱ ماهه اشتراکی', '۱ ماهه اختصاصی ایمیل شخصی', '۳ ماهه اختصاصی'],
  },
  {
    id: 'claude-pro',
    slug: 'claude-pro',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'Anthropic',
    titleFa: 'اشتراک Claude 3.7 Sonnet Pro اختصاصی',
    titleEn: 'Anthropic Claude 3.7 Sonnet Pro',
    subtitleFa: 'بهترین هوش مصنوعی برای برنامه‌نویسی، تحلیل سورس‌کد، معماری نرم‌افزار و متون طولانی',
    subtitleEn: 'Premier AI assistant for engineering, architecture & extended thinking',
    priceUsd: 21.5,
    durationFa: '۱ ماهه اختصاصی',
    durationEn: '1 Month Dedicated',
    regionFa: 'گلوبال (امریکا/اروپا)',
    regionEn: 'Global Tier',
    deliveryFa: 'اکانت اختصاصی وریفای‌شده',
    deliveryEn: 'Verified Dedicated Account',
    badgeFa: 'محبوب برنامه‌نویسان',
    badgeEn: 'Dev Favorite',
    accentColor: '#00D2FF',
    iconType: 'claude',
    keywords: 'کلود پرو انتروپیک claude sonnet anthropic کدنویسی برنامه نویسی هوش مصنوعی',
    popularPackagesFa: ['۱ ماهه اختصاصی کامل', 'اکانت وریفای‌شده با ایمیل شما'],
  },
  {
    id: 'cursor-pro',
    slug: 'cursor-pro',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'Cursor',
    titleFa: 'اشتراک Cursor AI Pro (ادیتور کد هوشمند)',
    titleEn: 'Cursor AI Pro IDE Subscription',
    subtitleFa: '۵۰۰ درخواست Fast Premium ماهانه با مدل‌های Claude 3.7 Sonnet و GPT-4o بدون محدودیت',
    subtitleEn: '500 fast premium requests/mo with Claude 3.7 Sonnet & GPT-4o integration',
    priceUsd: 20,
    durationFa: '۱ ماهه اختصاصی',
    durationEn: '1 Month Pro',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'فعالسازی روی اکانت شما',
    deliveryEn: 'Direct Account Upgrade',
    badgeFa: 'ویژه توسعه‌دهندگان',
    badgeEn: 'Pro Engineers',
    accentColor: '#38BDF8',
    iconType: 'cursor',
    keywords: 'کرسر پرو ادیتور کد cursor pro ide هوش مصنوعی برنامه نویسی',
    popularPackagesFa: ['۱ ماهه Pro', '۱ ساله Pro با تخفیف'],
  },
  {
    id: 'gemini-advanced',
    slug: 'gemini-advanced',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'Google',
    titleFa: 'اشتراک Google Gemini Advanced + 2TB فضای ابری',
    titleEn: 'Google One AI Premium (Gemini Advanced + 2TB)',
    subtitleFa: 'دسترسی به قوی‌ترین مدل گوگل (Gemini 2.5 Pro) به همراه ۲ ترابایت فضای Google Drive روی جیمیل شخصی',
    subtitleEn: 'Gemini 2.5 Pro Ultra access with 2TB Google One cloud storage on personal Gmail',
    priceUsd: 19.99,
    durationFa: '۱ ماهه / ۱ ساله',
    durationEn: '1 Month / 1 Year',
    regionFa: 'گلوبال (جیمیل شخصی)',
    regionEn: 'Global Personal Gmail',
    deliveryFa: 'فعالسازی بدون نیاز به پسورد',
    deliveryEn: 'Family/Direct Gmail Invite',
    badgeFa: 'همراه ۲ ترابایت فضا',
    badgeEn: '+2TB Google One',
    accentColor: '#60A5FA',
    iconType: 'gemini',
    keywords: 'جمنای گوگل جمینی وان gemini advanced google one ai جیمیل دیکاردو',
    popularPackagesFa: ['۱ ماهه جیمیل شخصی', '۳ ماهه اقتصادی', '۱ ساله کامل + ۲ ترابایت'],
  },
  {
    id: 'midjourney-pro',
    slug: 'midjourney-pro',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'Midjourney',
    titleFa: 'اشتراک Midjourney V6.1 (تولید تصویر حرفه‌ای)',
    titleEn: 'Midjourney Standard & Pro Subscription',
    subtitleFa: 'ساخت تصاویر سینمایی، طراحی رابط کاربری و رندرهای معماری با موتور Midjourney نسخه ۶.۱',
    subtitleEn: 'Photorealistic AI art, product renders & architectural visualization in V6.1',
    priceUsd: 30,
    durationFa: '۱ ماهه نامحدود Relax',
    durationEn: '1 Month Unlimited Relax',
    regionFa: 'گلوبال (دیسکورد و وب)',
    regionEn: 'Global Web & Discord',
    deliveryFa: 'فعالسازی روی اکانت دیسکورد',
    deliveryEn: 'Direct Discord Activation',
    badgeFa: 'طراحی و گرافیک AI',
    badgeEn: '#1 AI Art Engine',
    accentColor: '#A855F7',
    iconType: 'midjourney',
    keywords: 'میدجرنی ساخت عکس تصویر هوش مصنوعی midjourney دیسکورد',
    popularPackagesFa: ['پلن Basic ($10)', 'پلن Standard ($30)', 'پلن Pro ($60)'],
  },
  {
    id: 'perplexity-pro',
    slug: 'perplexity-pro',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'Perplexity',
    titleFa: 'اشتراک Perplexity AI Pro (موتور جستجو و پژوهش)',
    titleEn: 'Perplexity AI Pro Research Engine',
    subtitleFa: 'جستجوی علمی و وب زنده با دسترسی همزمان به GPT-4o، Claude 3.7، DeepSeek R1 و آپلود نامحدود فایل',
    subtitleEn: 'Real-time academic & web research powered by Claude, GPT-4o & DeepSeek R1',
    priceUsd: 20,
    durationFa: '۱ ماهه اختصاصی',
    durationEn: '1 Month Pro',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'فعالسازی روی ایمیل شخصی',
    deliveryEn: 'Personal Email Upgrade',
    badgeFa: 'پژوهش و مقاله',
    badgeEn: 'Pro Research',
    accentColor: '#2DD4BF',
    iconType: 'openai',
    keywords: 'پرپلکسیتی پرو جستجو مقاله perplexity pro هوش مصنوعی',
    popularPackagesFa: ['۱ ماهه اختصاصی', '۱ ساله ویژه دانشگاهی'],
  },
  {
    id: 'github-copilot',
    slug: 'github-copilot',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'GitHub',
    titleFa: 'اشتراک GitHub Copilot Pro (دستیار کدنویسی)',
    titleEn: 'GitHub Copilot Pro Individual',
    subtitleFa: 'تکمیل خودکار کد و چت هوشمند داخل VS Code، JetBrains و Visual Studio روی اکانت گیت‌هاب شما',
    subtitleEn: 'AI pair programmer inside VS Code, JetBrains & Neovim on your GitHub account',
    priceUsd: 10,
    durationFa: '۱ ماهه رسمی',
    durationEn: '1 Month Official',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'فعالسازی روی اکانت گیت‌هاب',
    deliveryEn: 'Direct GitHub Activation',
    badgeFa: 'استاندارد جهانی کد',
    badgeEn: 'GitHub Official',
    accentColor: '#38BDF8',
    iconType: 'cursor',
    keywords: 'گیت هاب کوپایلت github copilot vscode برنامه نویسی کدنویسی',
    popularPackagesFa: ['۱ ماهه Copilot Pro', '۱ ساله Copilot Pro'],
  },
  {
    id: 'chatgpt-pro-200',
    slug: 'chatgpt-pro-200',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'OpenAI',
    titleFa: 'اشتراک ChatGPT Pro (دسترسی نامحدود o1 Pro & Sora)',
    titleEn: 'ChatGPT Pro Unlimited Tier (o1 Pro & Sora)',
    subtitleFa: 'بالاترین سطح پردازش OpenAI بدون سقف مصرف، شامل مدل o1 Pro Mode، GPT-4.5 و تولید ویدیوی Sora',
    subtitleEn: 'Unlimited frontier compute with o1 Pro Mode, GPT-4.5 & Sora video generation',
    priceUsd: 200,
    durationFa: '۱ ماهه سازمانی VIP',
    durationEn: '1 Month Enterprise VIP',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'فعالسازی مستقیم ایمیل شخصی',
    deliveryEn: 'Personal Email Activation',
    badgeFa: 'قوی‌ترین پلن OpenAI',
    badgeEn: 'Frontier Tier',
    accentColor: '#10B981',
    iconType: 'openai',
    keywords: 'چت جی پی تی پرو دویست دلاری سورا chatgpt pro sora o1 pro',
    popularPackagesFa: ['۱ ماهه اختصاصی کامل ($200)'],
  },
  {
    id: 'elevenlabs-creator',
    slug: 'elevenlabs-creator',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'ElevenLabs',
    titleFa: 'اشتراک ElevenLabs Creator (تبدیل متن به صدا و دوبله AI)',
    titleEn: 'ElevenLabs Creator Voice AI & Dubbing',
    subtitleFa: 'کلون حرفه‌ای صدا، دوبله خودکار ویدیو به ۲۹ زبان از جمله فارسی و تولید نریشن استودیویی',
    subtitleEn: 'Professional voice cloning, AI video dubbing & studio-grade speech synthesis',
    priceUsd: 22,
    durationFa: '۱ ماهه — ۱۰۰ دقیقه صدا',
    durationEn: '1 Month — 100K Chars',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'فعالسازی روی ایمیل شخصی',
    deliveryEn: 'Personal Email Upgrade',
    badgeFa: 'دوبله و نریشن AI',
    badgeEn: 'Voice Clone AI',
    accentColor: '#F59E0B',
    iconType: 'openai',
    keywords: 'الون لبز صدا دوبله گویندگی elevenlabs voice ai',
    popularPackagesFa: ['پلن Starter ($5)', 'پلن Creator ($22)', 'پلن Pro ($99)'],
  },
  {
    id: 'suno-runway-ai',
    slug: 'suno-runway-ai',
    category: 'ai',
    categoryLabelFa: 'هوش مصنوعی',
    categoryLabelEn: 'Artificial Intelligence',
    platformBrand: 'Suno / Runway',
    titleFa: 'اشتراک Suno AI Pro (ساخت آهنگ و موسیقی با هوش مصنوعی)',
    titleEn: 'Suno AI Pro Music & Vocal Generator',
    subtitleFa: 'ساخت ۲۵۰۰ قطعه موسیقی با کلام فارسی و انگلیسی در سبک‌های پاپ، رپ و سنتی با مالکیت تجاری',
    subtitleEn: 'Generate 2,500 studio songs/month with Persian & English vocals and commercial rights',
    priceUsd: 10,
    durationFa: '۱ ماهه — ۲۵۰۰ کردیت',
    durationEn: '1 Month — 2,500 Credits',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'فعالسازی روی اکانت شما',
    deliveryEn: 'Direct Account Upgrade',
    badgeFa: 'آهنگسازی هوشمند',
    badgeEn: 'AI Music Studio',
    accentColor: '#EC4899',
    iconType: 'midjourney',
    keywords: 'سونو ساخت آهنگ موسیقی راوی runway suno ai music',
    popularPackagesFa: ['Suno Pro (۲۵۰۰ کردیت)', 'Suno Premier (۱۰۰۰۰ کردیت)', 'Runway Gen-3 Unlimited'],
  },

  // =========================================================================
  // 2. IN-GAME CURRENCIES: CP, UC, GEMS & MOBILE TOP-UPS (DICARDO SPECIALTY - 10 PRODUCTS)
  // =========================================================================
  {
    id: 'codm-cp-880',
    slug: 'call-of-duty-mobile-cp-880',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Activision / Dicardo',
    titleFa: 'خرید ۸۸۰ سی‌پی کالاف دیوتی موبایل (Call of Duty Mobile CP)',
    titleEn: '880 CP Call of Duty: Mobile (Instant Top-Up)',
    subtitleFa: 'شارژ قانونی و فوری سی‌پی کالاف دیوتی موبایل با رسید رسمی استور بدون خطر بن شدن اکانت',
    subtitleEn: 'Official store receipt CP top-up for Call of Duty Mobile Battle Pass & Lucky Draws',
    priceUsd: 9.99,
    durationFa: 'واریز فوری (زیر ۱۵ دقیقه)',
    durationEn: 'Instant (<15 Min)',
    regionFa: 'همه ریجن‌ها (ایران/هند/اروپا)',
    regionEn: 'All Regions Supported',
    deliveryFa: 'شارژ مستقیم روی اکانت اکتیویژن',
    deliveryEn: 'Direct Activision Recharge',
    badgeFa: 'پرفروش‌ترین دیکاردو',
    badgeEn: '#1 Dicardo Top-Up',
    accentColor: '#F59E0B',
    iconType: 'codm',
    keywords: 'سی پی کالاف دیوتی موبایل خرید cp call of duty mobile دیکاردو dicardo',
    popularPackagesFa: ['۸۰ سی‌پی', '۴۲۰ سی‌پی', '۸۸۰ سی‌پی', '۲۴۰۰ سی‌پی', '۵۰۰۰ سی‌پی', '۱۰۸۰۰ سی‌پی'],
  },
  {
    id: 'codm-cp-2400',
    slug: 'call-of-duty-mobile-cp-2400',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Activision / Dicardo',
    titleFa: 'خرید ۲۴۰۰ سی‌پی کالاف دیوتی موبایل (پک ویژه گردونه و میتیک)',
    titleEn: '2,400 CP Call of Duty: Mobile (Mythic Draw Pack)',
    subtitleFa: 'بسته اقتصادی ۲۴۰۰ عددی CP شامل ۴۰۰ سی‌پی پاداش رایگان، مناسب فول‌گردونه و بتل‌پس',
    subtitleEn: '2,000 + 400 Bonus CP bundle for Mythic weapon draws and seasonal Battle Pass',
    priceUsd: 24.99,
    durationFa: 'شامل ۴۰۰ سی‌پی هدیه',
    durationEn: '+400 Bonus CP Included',
    regionFa: 'همه ریجن‌ها',
    regionEn: 'Global / India / EU',
    deliveryFa: 'شارژ سریع با ضمانت کامل',
    deliveryEn: 'Verified Store Top-Up',
    badgeFa: '۴۰۰ سی‌پی هدیه',
    badgeEn: '+400 Bonus CP',
    accentColor: '#F59E0B',
    iconType: 'codm',
    keywords: '۲۴۰۰ سی پی کالاف گردونه میتیک 2400 cp codm دیکاردو',
    popularPackagesFa: ['۲۴۰۰ سی‌پی استاندارد', '۲۴۰۰ سی‌پی دوبل ایونت'],
  },
  {
    id: 'pubg-uc-660',
    slug: 'pubg-mobile-uc-660',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Tencent / Midasbuy',
    titleFa: 'خرید ۶۶۰ یوسی پابجی موبایل با آیدی (PUBG Mobile 660 UC)',
    titleEn: '660 UC PUBG Mobile (Instant Player ID Top-Up)',
    subtitleFa: 'واریز اتوماتیک و آنی یوسی پابجی موبایل فقط با وارد کردن Player ID بدون نیاز به رمز اکانت',
    subtitleEn: 'Instant automated PUBG Mobile UC delivery via Player ID with zero login required',
    priceUsd: 9.99,
    durationFa: 'واریز آنی با آیدی (۱ دقیقه)',
    durationEn: '1-Minute UID Delivery',
    regionFa: 'گلوبال (Midasbuy Official)',
    regionEn: 'Global Midasbuy',
    deliveryFa: 'شارژ مستقیم با Player ID',
    deliveryEn: 'Player ID Instant Top-Up',
    badgeFa: 'واریز اتوماتیک با آیدی',
    badgeEn: 'UID Instant Top-Up',
    accentColor: '#EAB308',
    iconType: 'pubg',
    keywords: 'یوسی پابجی موبایل خرید uc pubg mobile آیدی دیکاردو رویال پس',
    popularPackagesFa: ['۶۰ یوسی', '۳۲۵ یوسی', '۶۶۰ یوسی (رویال‌پس)', '۱۸۰۰ یوسی', '۳۸۵۰ یوسی', '۸۱۰۰ یوسی'],
  },
  {
    id: 'pubg-uc-1800',
    slug: 'pubg-mobile-uc-1800',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Tencent / Midasbuy',
    titleFa: 'خرید ۱۸۰۰ یوسی پابجی موبایل (پک رویال‌پس الیت پلاس)',
    titleEn: '1,800 UC PUBG Mobile (Royale Pass Elite Pack)',
    subtitleFa: '۱۵۰۰ + ۳۰۰ یوسی هدیه با واریز آنی از طریق درگاه رسمی Midasbuy فقط با شماره آیدی بازی',
    subtitleEn: '1,500 + 300 Bonus UC delivered instantly via official Midasbuy Player ID gateway',
    priceUsd: 24.99,
    durationFa: 'واریز آنی با آیدی',
    durationEn: 'Instant UID Delivery',
    regionFa: 'گلوبال',
    regionEn: 'Global Region',
    deliveryFa: 'بدون نیاز به اطلاعات اکانت',
    deliveryEn: 'No Password Required',
    badgeFa: '۳۰۰ یوسی هدیه',
    badgeEn: '+300 Bonus UC',
    accentColor: '#EAB308',
    iconType: 'pubg',
    keywords: '۱۸۰۰ یوسی پابجی رویال پس الیت 1800 uc pubg دیکاردو',
    popularPackagesFa: ['۱۸۰۰ یوسی با آیدی', '۳۸۵۰ یوسی با آیدی'],
  },
  {
    id: 'freefire-diamonds-1080',
    slug: 'free-fire-diamonds-1080',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Garena / Dicardo',
    titleFa: 'خرید ۱۰۸۰ جم فری‌فایر با آیدی (Garena Free Fire Diamonds)',
    titleEn: '1,080 Free Fire Diamonds (Instant Player ID)',
    subtitleFa: 'شارژ آنی الماس (جم) بازی گارنا فری‌فایر در کمتر از ۲ دقیقه فقط با ثبت Player ID اکانت شما',
    subtitleEn: 'Instant Garena Free Fire diamond recharge using only your in-game Player ID',
    priceUsd: 9.99,
    durationFa: 'تحویل آنی ۲ دقیقه‌ای',
    durationEn: '2-Minute Instant Top-Up',
    regionFa: 'خاورمیانه و اروپا',
    regionEn: 'MENA & EU Regions',
    deliveryFa: 'شارژ مستقیم با آیدی بازی',
    deliveryEn: 'Direct Player ID Top-Up',
    badgeFa: 'بدون نیاز به رمز',
    badgeEn: 'UID Only',
    accentColor: '#EF4444',
    iconType: 'freefire',
    keywords: 'جم فری فایر الماس گارنا free fire diamonds دیکاردو آیدی',
    popularPackagesFa: ['۱۱۰ جم', '۳۴۱ جم', '۵۸۳ جم', '۱۰۸۰ جم', '۲۴۲۰ جم', 'کارت هفتگی و ماهانه'],
  },
  {
    id: 'clash-royale-pass',
    slug: 'supercell-clash-pass-gems',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Supercell Store',
    titleFa: 'خرید بلیط طلایی و جم کلش آف کلنز و کلش رویال (Gold & Diamond Pass)',
    titleEn: 'Clash of Clans Gold Pass & Clash Royale Diamond Pass',
    subtitleFa: 'فعال‌سازی رسمی گلد پس کلش آف کلنز، دایموند پس کلش رویال و بسته‌های جم از استور رسمی سوپرسل',
    subtitleEn: 'Official Supercell Store Gold Pass, Diamond Pass & Gem bundles with Supercell ID',
    priceUsd: 6.99,
    durationFa: 'فصل کامل (۱ ماهه)',
    durationEn: 'Full Season Pass',
    regionFa: 'گلوبال (Supercell Store)',
    regionEn: 'Global Supercell ID',
    deliveryFa: 'فعالسازی با تگ یا سوپرسل آیدی',
    deliveryEn: 'Supercell ID Gift / Top-Up',
    badgeFa: 'استور رسمی سوپرسل',
    badgeEn: 'Official Supercell',
    accentColor: '#10B981',
    iconType: 'supercell',
    keywords: 'جم کلش آف کلنز کلش رویال بلیط طلایی گلد پس دایموند پس clash of clans royale دیکاردو',
    popularPackagesFa: ['بلیط طلایی کلش آف کلنز ($6.99)', 'دایموند پس کلش رویال ($11.99)', '۵۰۰ جم', '۱۲۰۰ جم', '۲۵۰۰ جم'],
  },
  {
    id: 'brawl-stars-pass',
    slug: 'brawl-stars-pass-plus',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Supercell Store',
    titleFa: 'خرید براول پس پلاس و جم براول استارز (Brawl Pass Plus)',
    titleEn: 'Brawl Stars Pass Plus & Gem Bundles',
    subtitleFa: 'فعال‌سازی فوری Brawl Pass و Brawl Pass Plus به همراه اسکین‌های انحصاری و ۳۰٪ پیشرفت سریع‌تر',
    subtitleEn: 'Instant Brawl Pass Plus activation with exclusive skins, chroma variants & gems',
    priceUsd: 9.99,
    durationFa: 'فصل کامل + اسکین ویژه',
    durationEn: 'Full Season + Skins',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'شارژ رسمی سوپرسل استور',
    deliveryEn: 'Official Supercell Store',
    badgeFa: 'محبوب گیمرهای موبایل',
    badgeEn: 'Brawl Pass Plus',
    accentColor: '#8B5CF6',
    iconType: 'supercell',
    keywords: 'براول استارز جم براول پس پلاس brawl stars pass دیکاردو',
    popularPackagesFa: ['Brawl Pass استاندارد ($6.99)', 'Brawl Pass Plus ($9.99)', '۱۷۰ جم', '۳۶۰ جم'],
  },
  {
    id: 'genshin-welkin-crystals',
    slug: 'genshin-impact-welkin-moon',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'HoYoverse',
    titleFa: 'خرید بلسینگ ماهانه ولکین مون و کریستال گنشین ایمپکت (Welkin Moon)',
    titleEn: 'Genshin Impact Blessing of the Welkin Moon & Crystals',
    subtitleFa: 'دریافت ۳۰۰ جنسیس کریستال آنی + ۲۷۰۰ پریموجم طی ۳۰ روز فقط با UID و سرور بازی بدون نیاز به رمز',
    subtitleEn: '300 Genesis Crystals immediately + 2,700 Primogems over 30 days via UID & Server',
    priceUsd: 4.99,
    durationFa: '۳۰ روزه (۳۰۰۰ پریموجم)',
    durationEn: '30 Days (3,000 Gems)',
    regionFa: 'اروپا / آمریکا / آسیا',
    regionEn: 'EU / NA / Asia Servers',
    deliveryFa: 'واریز آنی فقط با UID',
    deliveryEn: 'UID & Server Instant Top-Up',
    badgeFa: 'واریز آنی با UID',
    badgeEn: 'Instant UID',
    accentColor: '#38BDF8',
    iconType: 'genshin',
    keywords: 'گنشین ایمپکت ولکین مون کریستال هونکای genshin impact welkin moon دیکاردو',
    popularPackagesFa: ['بلسینگ Welkin Moon ($4.99)', '۹۸۰ کریستال', '۱۹۸۰ کریستال', '۳۲۸۰ کریستال', '۶۴۸۰ کریستال'],
  },
  {
    id: 'mobile-legends-diamonds',
    slug: 'mobile-legends-diamonds-1000',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'Moonton',
    titleFa: 'خرید جم موبایل لجندز و ویکلی پس (Mobile Legends Diamonds)',
    titleEn: 'Mobile Legends: Bang Bang Diamonds & Weekly Pass',
    subtitleFa: 'شارژ آنی الماس موبایل لجندز و Weekly Diamond Pass فقط با User ID و Zone ID در کمتر از ۲ دقیقه',
    subtitleEn: 'Instant MLBB Diamonds & Weekly Diamond Pass via User ID and Zone ID',
    priceUsd: 14.99,
    durationFa: 'تحویل آنی با آیدی',
    durationEn: 'Instant ID Top-Up',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'شارژ با User ID و Zone ID',
    deliveryEn: 'User ID + Zone ID',
    badgeFa: 'تحویل اتوماتیک',
    badgeEn: 'Auto Delivery',
    accentColor: '#6366F1',
    iconType: 'pubg',
    keywords: 'جم موبایل لجندز الماس mobile legends mlbb دیکاردو',
    popularPackagesFa: ['Weekly Diamond Pass ($1.99)', '۲۵۰ جم', '۵۰۰ جم', '۱۰۰۰ جم', '۲۵۰۰ جم'],
  },
  {
    id: 'fc-mobile-points',
    slug: 'ea-fc-mobile-points',
    category: 'ingame',
    categoryLabelFa: 'جم و سی‌پی بازی',
    categoryLabelEn: 'In-Game Currencies & CP',
    platformBrand: 'EA Sports',
    titleFa: 'خرید اف‌سی پوینت، نقره و استار پس (EA Sports FC Mobile)',
    titleEn: 'EA Sports FC Mobile Points, Silver & Star Pass',
    subtitleFa: 'شارژ قانونی FC Points، Silver و فعال‌سازی Star Pass بازی اف‌سی موبایل (فیفا موبایل) با ضمانت کامل',
    subtitleEn: 'Official FC Points, Silver & Star Pass Premium bundle for EA Sports FC Mobile',
    priceUsd: 9.99,
    durationFa: 'فوری و تضمینی',
    durationEn: 'Fast Verified Top-Up',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'شارژ مستقیم اکانت EA',
    deliveryEn: 'Direct EA Account Top-Up',
    badgeFa: 'مخصوص فیفا موبایل',
    badgeEn: 'FC Mobile Official',
    accentColor: '#10B981',
    iconType: 'xbox',
    keywords: 'اف سی موبایل فیفا پوینت استار پس نقره fc mobile fifa points دیکاردو',
    popularPackagesFa: ['Star Pass Premium ($9.99)', '۱۰۰۰ اف‌سی پوینت', '۲۲۰۰ اف‌سی پوینت', '۵۷۵۰ اف‌سی پوینت'],
  },

  // =========================================================================
  // 3. GIFT CARDS & CONSOLE STORES (13 PRODUCTS)
  // =========================================================================
  {
    id: 'steam-wallet-20',
    slug: 'steam-wallet-20',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Valve / Steam',
    titleFa: 'گیفت‌کارت Steam Wallet بیست دلاری (ریجن آمریکا)',
    titleEn: 'Steam Wallet $20 Gift Card (USA)',
    subtitleFa: 'کد اورجینال شارژ کیف پول استیم جهت خرید بازی و آیتم‌های Dota 2 و CS2 با تحویل آنی',
    subtitleEn: 'Authentic digital code for instant Steam Wallet balance, CS2 & Dota 2 items',
    priceUsd: 20,
    durationFa: 'دائمی (بدون انقضا)',
    durationEn: 'No Expiration',
    regionFa: 'ریجن آمریکا (USA $)',
    regionEn: 'Region: USA ($)',
    deliveryFa: 'کد دیجیتال آنی',
    deliveryEn: 'Instant Digital Code',
    badgeFa: 'تحویل آنی کد',
    badgeEn: 'Instant Code',
    accentColor: '#EF4444',
    iconType: 'steam',
    keywords: 'گیفت کارت استیم والت بیست دلاری steam wallet 20 دیکاردو',
    popularPackagesFa: ['۵ دلاری', '۱۰ دلاری', '۲۰ دلاری', '۵۰ دلاری', '۱۰۰ دلاری'],
  },
  {
    id: 'steam-wallet-50',
    slug: 'steam-wallet-50',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Valve / Steam',
    titleFa: 'گیفت‌کارت Steam Wallet پنجاه دلاری (مناسب خرید بازی‌های روز)',
    titleEn: 'Steam Wallet $50 Gift Card (USA / Global)',
    subtitleFa: 'شارژ مستقیم ۵۰ دلار اعتبار استیم برای پیش‌خرید بازی‌های AAA جدید بدون کارمزد اضافی',
    subtitleEn: 'Official $50 Steam Wallet physical-scan code for AAA PC releases',
    priceUsd: 50,
    durationFa: 'دائمی (بدون انقضا)',
    durationEn: 'No Expiration',
    regionFa: 'ریجن آمریکا و گلوبال',
    regionEn: 'USA & Global',
    deliveryFa: 'کد اورجینال ۱۵ رقمی',
    deliveryEn: '15-Digit Official Code',
    badgeFa: 'ویژه بازی‌های AAA',
    badgeEn: 'AAA Gamer Pack',
    accentColor: '#EF4444',
    iconType: 'steam',
    keywords: 'گیفت کارت استیم ۵۰ دلاری steam wallet 50',
    popularPackagesFa: ['۵۰ دلاری آمریکا', '۵۰ یورویی اروپا', 'ریجن ترکیه و اوکراین'],
  },
  {
    id: 'playstation-store-25',
    slug: 'playstation-store-25',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Sony PlayStation',
    titleFa: 'گیفت‌کارت PlayStation Store (PSN) بیست‌وپنج دلاری',
    titleEn: 'PlayStation Store $25 Gift Card (PSN)',
    subtitleFa: 'مناسب خرید بازی و تمدید اشتراک پلی‌استیشن پلاس در کنسول PS5 و PS4 با کد ۱۲ رقمی سونی',
    subtitleEn: 'Official PSN Store credit for PS5/PS4 games and PS Plus membership',
    priceUsd: 25,
    durationFa: 'اعتبار دائمی کیف پول PSN',
    durationEn: 'Permanent PSN Credit',
    regionFa: 'ریجن آمریکا (US)',
    regionEn: 'Region: USA',
    deliveryFa: 'کد ۱۲ رقمی اورجینال',
    deliveryEn: '12-Digit Official Code',
    badgeFa: 'کد رسمی سونی',
    badgeEn: 'Official Sony Code',
    accentColor: '#6366F1',
    iconType: 'psn',
    keywords: 'گیفت کارت پلی استیشن سونی پی اس ان psn playstation ps5 دیکاردو',
    popularPackagesFa: ['۱۰ دلاری آمریکا', '۲۵ دلاری آمریکا', '۵۰ دلاری آمریکا', '۱۰۰ دلاری آمریکا', 'ریجن انگلیس و امارات'],
  },
  {
    id: 'playstation-plus-extra',
    slug: 'playstation-plus-extra-12m',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Sony PlayStation',
    titleFa: 'اشتراک قانونی PlayStation Plus Extra (کاتالوگ ۴۰۰+ بازی PS5)',
    titleEn: 'PlayStation Plus Extra Membership (PS5 & PS4)',
    subtitleFa: 'دسترسی به کاتالوگ صدها بازی انحصاری سونی، Ubisoft+ Classics و بازی آنلاین روی کنسول PS5 / PS4',
    subtitleEn: 'Full access to the PS5/PS4 Game Catalog, Ubisoft+ Classics & online multiplayer',
    priceUsd: 39.99,
    durationFa: '۳ ماهه / ۱۲ ماهه قانونی',
    durationEn: '3M / 12M Official',
    regionFa: 'آمریکا / ترکیه / اوکراین',
    regionEn: 'US / TR / UA Regions',
    deliveryFa: 'فعالسازی قانونی و ظرفیتی',
    deliveryEn: 'Official Account / Code',
    badgeFa: 'کاتالوگ ۴۰۰+ بازی',
    badgeEn: '400+ PS5 Games',
    accentColor: '#6366F1',
    iconType: 'psn',
    keywords: 'پلی استیشن پلاس اکسترا پریمیوم اسنشیال ps plus extra دیکاردو',
    popularPackagesFa: ['۱ ماهه Extra', '۳ ماهه Extra ($39.99)', '۱۲ ماهه Extra ظرفیت کامل', '۱۲ ماهه Deluxe/Premium'],
  },
  {
    id: 'xbox-gamepass-ultimate',
    slug: 'xbox-gamepass-ultimate',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Microsoft Xbox',
    titleFa: 'اشتراک Xbox Game Pass Ultimate (کنسول + PC + EA Play)',
    titleEn: 'Xbox Game Pass Ultimate (Console + PC + Cloud)',
    subtitleFa: 'دسترسی نامحدود به بیش از ۴۰۰ بازی روز از جمله Call of Duty Black Ops 6 در روز اول انتشار',
    subtitleEn: 'Day-one access to 400+ console & PC titles including Call of Duty & EA Play',
    priceUsd: 16.99,
    durationFa: '۱ ماهه آلتیمیت (تمدیدپذیر)',
    durationEn: '1 Month Ultimate',
    regionFa: 'گلوبال (Global Key)',
    regionEn: 'Global Region',
    deliveryFa: 'کد دیجیتال ۲۵ رقمی اورجینال',
    deliveryEn: '25-Digit Official Key',
    badgeFa: 'ویژه گیمرها',
    badgeEn: 'Gamer Choice',
    accentColor: '#10B981',
    iconType: 'xbox',
    keywords: 'ایکس باکس گیم پس آلتیمیت پی سی xbox game pass ultimate دیکاردو',
    popularPackagesFa: ['۱ ماهه Ultimate', '۳ ماهه Ultimate', 'PC Game Pass یک‌ماهه'],
  },
  {
    id: 'ps5-fc25-capacity',
    slug: 'ea-sports-fc-25-ps5-ps4-capacity-account',
    category: 'gaming',
    categoryLabelFa: 'اکانت ظرفیتی و گیمینگ',
    categoryLabelEn: 'Console Capacity & Gaming',
    platformBrand: 'PS5 / PS4 / Xbox',
    titleFa: 'اکانت ظرفیتی EA Sports FC 25 (پلی‌استیشن PS5 / PS4 و ایکس‌باکس)',
    titleEn: 'EA Sports FC 25 Capacity Account (PS5 / PS4 / Xbox)',
    subtitleFa:
      'فروش قانونی اکانت ظرفیتی اف‌سی ۲۵ (ظرفیت ۱ آفلاین، ظرفیت ۲ پرایمری آنلاین و آفلاین روی اکانت شخصی، ظرفیت ۳ سوییچ) با گارانتی مادام‌العمر و قابلیت فروش مجدد',
    subtitleEn:
      'Official EA Sports FC 25 Capacity 1, Capacity 2 Primary & Capacity 3 Switch accounts with lifetime warranty & resale right',
    priceUsd: 18.5,
    durationFa: 'دائمی با گارانتی مادام‌العمر',
    durationEn: 'Lifetime Warranty + Resale',
    regionFa: 'آمریکا / ترکیه / اوکراین',
    regionEn: 'US / TR / UA Official Store',
    deliveryFa: 'تحویل اکانت قانونی + کد بکاپ',
    deliveryEn: 'Official PSN / Xbox Account',
    badgeFa: 'ظرفیت ۱ / ۲ / ۳ قانونی',
    badgeEn: 'Cap 1 / 2 / 3 Official',
    accentColor: '#10B981',
    iconType: 'psn',
    keywords:
      'اکانت ظرفیتی اف سی ۲۵ فیفا ۲۵ پلی استیشن ۵ ظرفیت ۲ ظرفیت ۳ fc 25 fifa 25 ps5 ps4 capacity account',
    popularPackagesFa: [
      'ظرفیت ۲ پرایمری PS5 (آنلاین + آفلاین روی اکانت شخصی)',
      'ظرفیت ۳ سوییچ PS5 (آنلاین اقتصادی)',
      'ظرفیت ۱ آفلاین PS5 / PS4',
      'اکانت هوم Xbox Series X|S',
    ],
  },
  {
    id: 'ps5-bo6-capacity',
    slug: 'call-of-duty-black-ops-6-capacity-account',
    category: 'gaming',
    categoryLabelFa: 'اکانت ظرفیتی و گیمینگ',
    categoryLabelEn: 'Console Capacity & Gaming',
    platformBrand: 'PS5 / PS4 / Xbox',
    titleFa: 'اکانت ظرفیتی Call of Duty: Black Ops 6 (PS5 / PS4 / Xbox)',
    titleEn: 'Call of Duty: Black Ops 6 Capacity Account (PS5 / PS4)',
    subtitleFa:
      'اکانت قانونی و ظرفیتی کالاف دیوتی بلک آپس ۶ شامل بخش داستانی، مولتی‌پلیر آنلاین و زامبی در ظرفیت‌های ۱، ۲ پرایمری و ۳ سوییچ با تضمین عدم بن کنسول',
    subtitleEn:
      'Official Call of Duty Black Ops 6 Capacity 1, 2 Primary & 3 Switch for PS5, PS4, and Xbox Series X|S',
    priceUsd: 21.0,
    durationFa: 'دائمی با قابلیت فروش مجدد',
    durationEn: 'Lifetime + Resale Support',
    regionFa: 'ریجن آمریکا و ترکیه',
    regionEn: 'USA & Turkey Store',
    deliveryFa: 'تحویل فوری ایمیل و رمز اختصاصی',
    deliveryEn: 'Instant PSN / Xbox Credentials',
    badgeFa: 'پرفروش‌ترین اکانت ظرفیتی',
    badgeEn: '#1 Capacity Seller',
    accentColor: '#F59E0B',
    iconType: 'codm',
    keywords:
      'اکانت ظرفیتی کالاف دیوتی بلک آپس ۶ پلی استیشن ۵ ظرفیت ۲ ظرفیت ۳ black ops 6 bo6 ps5 ps4 capacity',
    popularPackagesFa: [
      'ظرفیت ۲ پرایمری PS5 (مولتی‌پلیر + زامبی + داستانی)',
      'ظرفیت ۳ سوییچ PS5 (آنلاین زامبی و مولتی)',
      'ظرفیت ۱ آفلاین (کمپین داستانی)',
      'نسخه Vault Edition ظرفیت ۲',
    ],
  },
  {
    id: 'ps5-gta-rdr-capacity',
    slug: 'gta-v-red-dead-2-ps5-capacity-account',
    category: 'gaming',
    categoryLabelFa: 'اکانت ظرفیتی و گیمینگ',
    categoryLabelEn: 'Console Capacity & Gaming',
    platformBrand: 'Rockstar / PS5 & Xbox',
    titleFa: 'اکانت ظرفیتی GTA V Premium & Red Dead Redemption 2 (PS5 / PS4)',
    titleEn: 'GTA V 4K & Red Dead Redemption 2 Capacity Account (PS5 / PS4)',
    subtitleFa:
      'نسخه نسل نهمی 4K 60fps بازی GTA V Online و شاهکار Red Dead Redemption 2 با تحویل فوری اکانت قانونی سونی و قابلیت تعویض و فروش مجدد',
    subtitleEn:
      'Next-gen 4K 60fps GTA V Online & Red Dead Redemption 2 official console capacity accounts',
    priceUsd: 12.5,
    durationFa: 'دائمی (گارانتی مادام‌العمر)',
    durationEn: 'Permanent Ownership',
    regionFa: 'آمریکا و اروپا',
    regionEn: 'US & EU Official',
    deliveryFa: 'اکانت قانونی ظرفیتی (۱ / ۲ / ۳)',
    deliveryEn: 'Official Capacity 1 / 2 / 3',
    badgeFa: 'گارانتی دائمی + فروش مجدد',
    badgeEn: 'Resale Guaranteed',
    accentColor: '#EF4444',
    iconType: 'psn',
    keywords:
      'اکانت ظرفیتی جی تی ای وی رد دد ۲ پلی استیشن ۵ gta v gta 5 red dead redemption 2 ps5 capacity',
    popularPackagesFa: [
      'ظرفیت ۲ پرایمری GTA V PS5 (آنلاین + آفلاین)',
      'ظرفیت ۳ سوییچ GTA V PS5',
      'ظرفیت ۲ پرایمری Red Dead Redemption 2',
      'باندل دوگانه GTA V + Red Dead 2 ظرفیت ۲',
    ],
  },
  {
    id: 'ps5-exclusives-capacity',
    slug: 'ps5-exclusives-spiderman-god-of-war-capacity',
    category: 'gaming',
    categoryLabelFa: 'اکانت ظرفیتی و گیمینگ',
    categoryLabelEn: 'Console Capacity & Gaming',
    platformBrand: 'PlayStation Studios',
    titleFa: 'اکانت ظرفیتی انحصاری‌های سونی (Spider-Man 2 / God of War / Last of Us)',
    titleEn: 'PS5 Exclusives Capacity (Spider-Man 2 / God of War / Astro Bot)',
    subtitleFa:
      'خرید اکانت ظرفیتی شاهکارهای انحصاری پلی‌استیشن ۵ شامل Marvel Spider-Man 2، God of War Ragnarök، Astro Bot و The Last of Us Part I & II با فاکتور رسمی سونی',
    subtitleEn:
      'Official PS5 capacity accounts for Marvel Spider-Man 2, God of War Ragnarök, Astro Bot & The Last of Us',
    priceUsd: 19.99,
    durationFa: 'دائمی + قابلیت تعویض بازی',
    durationEn: 'Lifetime + Trade-In Option',
    regionFa: 'ریجن آمریکا و ترکیه',
    regionEn: 'USA & Turkey PSN',
    deliveryFa: 'تحویل اکانت قانونی ظرفیتی',
    deliveryEn: 'Verified PSN Capacity Account',
    badgeFa: 'ویژه انحصاری‌های PS5',
    badgeEn: 'PS5 Exclusive Hits',
    accentColor: '#6366F1',
    iconType: 'psn',
    keywords:
      'اکانت ظرفیتی اسپایدرمن ۲ گاد آف وار رگناروک لست آف آس استرو بات spiderman 2 god of war ps5 capacity',
    popularPackagesFa: [
      'ظرفیت ۲ پرایمری Marvel Spider-Man 2',
      'ظرفیت ۲ پرایمری God of War Ragnarök',
      'ظرفیت ۲ پرایمری The Last of Us Part I & II',
      'ظرفیت ۲ پرایمری Astro Bot PS5',
    ],
  },
  {
    id: 'ps5-elden-wukong-capacity',
    slug: 'elden-ring-black-myth-wukong-capacity-account',
    category: 'gaming',
    categoryLabelFa: 'اکانت ظرفیتی و گیمینگ',
    categoryLabelEn: 'Console Capacity & Gaming',
    platformBrand: 'PS5 / Xbox / Steam',
    titleFa: 'اکانت ظرفیتی Elden Ring & Black Myth: Wukong (PS5 / Xbox / Steam)',
    titleEn: 'Elden Ring & Black Myth: Wukong Capacity Account (PS5 / Steam)',
    subtitleFa:
      'اکانت ظرفیتی و اشتراکی بازی‌های روز دنیا شامل Black Myth: Wukong و Elden Ring: Shadow of the Erdtree برای کنسول PS5، ایکس‌باکس و استیم',
    subtitleEn:
      'Capacity 1, 2, 3 and Steam offline/online accounts for Black Myth: Wukong & Elden Ring Shadow of the Erdtree',
    priceUsd: 17.99,
    durationFa: 'دائمی با ضمانت کامل',
    durationEn: 'Lifetime Guarantee',
    regionFa: 'گلوبال (PSN / Xbox / Steam)',
    regionEn: 'Global Console & PC',
    deliveryFa: 'تحویل آنی مشخصات اکانت و راهنما',
    deliveryEn: 'Instant Account & Setup Guide',
    badgeFa: 'PS5 / Xbox / Steam',
    badgeEn: 'Console & PC Ready',
    accentColor: '#F43F5E',
    iconType: 'steam',
    keywords:
      'اکانت ظرفیتی الدن رینگ بلک میث ووکانگ استیم پلی استیشن ۵ elden ring black myth wukong ps5 steam',
    popularPackagesFa: [
      'ظرفیت ۲ پرایمری Black Myth: Wukong (PS5)',
      'ظرفیت ۳ سوییچ Black Myth: Wukong (PS5)',
      'ظرفیت ۲ پرایمری Elden Ring + DLC (PS5 / Xbox)',
      'اکانت اشتراکی قانونی Steam (PC)',
    ],
  },
  {
    id: 'gaming-console-ps5-xbox',
    slug: 'playstation-5-slim-pro-xbox-series-x-console',
    category: 'gaming',
    categoryLabelFa: 'دیوایس و کنسول گیمینگ',
    categoryLabelEn: 'Gaming Consoles & Devices',
    platformBrand: 'Sony PS5 / Xbox Hardware',
    titleFa: 'کنسول بازی PlayStation 5 Slim / Pro و Xbox Series X|S (دیوایس گیمینگ)',
    titleEn: 'PlayStation 5 Slim / Pro & Xbox Series X|S Gaming Consoles',
    subtitleFa:
      'فروش تخصصی کنسول‌های نسل نهم سونی PS5 Slim / Pro و ایکس‌باکس Series X|S پلمپ اصلی با مهلت تست، ضمانت اصالت و پکیج نصب فول‌گیم قانونی و ظرفیتی',
    subtitleEn:
      'Brand-new sealed PS5 Slim, PS5 Pro 2TB, and Xbox Series X|S consoles plus optional full-game capacity installation',
    priceUsd: 495.0,
    durationFa: 'گارانتی ۱۸ ماهه + مهلت تست',
    durationEn: '18-Month Hardware Warranty',
    regionFa: 'اروپا (۲۰۱۶) / آمریکا / ژاپن',
    regionEn: 'EU CFI-2016 / US / JP',
    deliveryFa: 'ارسال فوری پلمپ + نصب بازی',
    deliveryEn: 'Express Sealed Delivery',
    badgeFa: 'دیوایس + نصب فول‌گیم',
    badgeEn: 'Console + Full Games',
    accentColor: '#38BDF8',
    iconType: 'psn',
    keywords:
      'خرید کنسول بازی پلی استیشن ۵ اسلیم پرو ایکس باکس سری ایکس اس دیوایس گیمینگ ps5 slim pro xbox series x s',
    popularPackagesFa: [
      'کنسول PS5 Slim نسخه دیجیتال (1TB)',
      'کنسول PS5 Slim استاندارد دیسک‌خور (اروپا ۲۰۱۶)',
      'کنسول PS5 Pro حافظه ۲ ترابایت',
      'کنسول Xbox Series S / Series X به همراه فول‌گیم',
      'پکیج نصب ۱۰ بازی انتخابی ظرفیتی روی کنسول شما',
    ],
  },
  {
    id: 'gaming-controller-dualsense',
    slug: 'ps5-dualsense-edge-playstation-controller',
    category: 'gaming',
    categoryLabelFa: 'دیوایس و کنسول گیمینگ',
    categoryLabelEn: 'Gaming Consoles & Devices',
    platformBrand: 'Sony PlayStation',
    titleFa: 'دسته بازی پلی‌استیشن PS5 DualSense و DualSense Edge (سازگار با ویندوز، آیفون و اندروید)',
    titleEn: 'Sony PlayStation PS5 DualSense & Edge Official Controller',
    subtitleFa:
      'انواع دسته اورجینال پلی‌استیشن ۵ دوال‌سنس (سفید، مشکی Midnight، قرمز Cosmic، متالیک و DualSense Edge) با قابلیت اتصال بلوتوث و کابل به PS5، ویندوز، آیفون و اندروید',
    subtitleEn:
      'Authentic Sony PlayStation 5 DualSense & DualSense Edge controllers compatible with PS5, Windows PC, iPhone/iOS, and Android',
    priceUsd: 74.0,
    durationFa: 'ضمانت اصالت برد اصلی سونی',
    durationEn: '100% Original OEM Board',
    regionFa: 'سفارش اروپا و آمریکا (اورجینال)',
    regionEn: 'Official EU / US Import',
    deliveryFa: 'تحویل فوری پلمپ با ضمانت تست',
    deliveryEn: 'Sealed Box + Test Warranty',
    badgeFa: 'دسته پلی‌استیشن + مولتی‌پلتفرم',
    badgeEn: 'PlayStation & Multi-Device',
    accentColor: '#8B5CF6',
    iconType: 'psn',
    keywords:
      'دسته بازی پلی استیشن ۵ دوال سنس کنترلر ویندوز آیفون اندروید دیوایس گیم dualsense ps5 playstation controller windows iphone android',
    popularPackagesFa: [
      'دسته PS5 DualSense سفید اورجینال',
      'دسته PS5 DualSense مشکی (Midnight Black)',
      'دسته PS5 DualSense رنگ‌های متالیک و کالکشن',
      'دسته حرفه‌ای Sony DualSense Edge',
      'پایه شارژر دوگانه اورجینال سونی (Charging Station)',
    ],
  },
  {
    id: 'gaming-controller-xbox-windows',
    slug: 'xbox-wireless-elite-windows-pc-controller',
    category: 'gaming',
    categoryLabelFa: 'دیوایس و کنسول گیمینگ',
    categoryLabelEn: 'Gaming Consoles & Devices',
    platformBrand: 'Xbox & Windows',
    titleFa: 'دسته بازی ایکس‌باکس و ویندوز (Xbox Wireless & Elite Series 2 + دانگل PC)',
    titleEn: 'Xbox Series X|S & Windows PC Official Wireless / Elite 2 Controller',
    subtitleFa:
      'بهترین دسته بازی رسمی برای ویندوز ۱۰/۱۱، استیم و کنسول‌های ایکس‌باکس (مدل‌های Carbon Black، Robot White، رنگ‌های خاص، باندل دانگل بی‌سیم ویندوز و Xbox Elite Series 2)',
    subtitleEn:
      'Official Microsoft Xbox Wireless & Elite Series 2 controllers with native Windows 10/11, Steam, Xbox Series X|S, iOS & Android support',
    priceUsd: 65.0,
    durationFa: 'گارانتی اصالت مایکروسافت + مهلت تست',
    durationEn: 'Official Microsoft OEM Warranty',
    regionFa: 'اورجینال جهانی (ویندوز و ایکس‌باکس)',
    regionEn: 'Global Windows & Xbox OEM',
    deliveryFa: 'ارسال فوری پلمپ اصلی',
    deliveryEn: 'Express Sealed Delivery',
    badgeFa: 'دسته تخصصی ویندوز و Xbox',
    badgeEn: '#1 Windows & Xbox Pad',
    accentColor: '#10B981',
    iconType: 'xbox',
    keywords:
      'دسته بازی ویندوز دسته ایکس باکس کامپیوتر پی سی الیت سری ۲ کنترلر xbox controller windows pc steam elite series 2 android iphone',
    popularPackagesFa: [
      'دسته Xbox Series X|S مشکی (Carbon Black) مخصوص ایکس‌باکس و ویندوز',
      'دسته Xbox Series X|S سفید (Robot White) و رنگ‌های خاص',
      'باندل دسته Xbox + دانگل بی‌سیم اورجینال ویندوز (PC Wireless Adapter)',
      'دسته حرفه‌ای Xbox Elite Wireless Series 2 (فول‌پک)',
    ],
  },
  {
    id: 'gaming-controller-mobile-iphone-android',
    slug: 'backbone-one-razer-kishi-iphone-android-controller',
    category: 'gaming',
    categoryLabelFa: 'دیوایس و کنسول گیمینگ',
    categoryLabelEn: 'Gaming Consoles & Devices',
    platformBrand: 'iPhone & Android',
    titleFa: 'دسته بازی موبایل مخصوص آیفون و اندروید (Backbone One & Razer Kishi V2)',
    titleEn: 'Backbone One & Razer Kishi V2 Mobile Controller (iPhone iOS & Android)',
    subtitleFa:
      'تبدیل گوشی آیفون (iPhone 15/16 Type-C و مدل‌های Lightning) و موبایل‌های اندروید به کنسول دستی حرفه‌ای برای اجرای کالاف دیوتی موبایل، پابجی، وارزون، PS Remote Play و اپ‌ها',
    subtitleEn:
      'Turn your iPhone (USB-C & Lightning) or Android phone into a pro handheld console for Call of Duty Mobile, Warzone, PS Remote Play & Xbox Cloud',
    priceUsd: 59.0,
    durationFa: 'گارانتی اصالت + سازگاری کامل iOS/Android',
    durationEn: 'Official iOS & Android Certified',
    regionFa: 'نسخه PlayStation & Xbox Edition',
    regionEn: 'iPhone & Android Editions',
    deliveryFa: 'تحویل فوری پلمپ + راهنمای اپ',
    deliveryEn: 'Express Sealed + App Setup',
    badgeFa: 'مخصوص آیفون و اندروید',
    badgeEn: 'iPhone & Android Pro Pad',
    accentColor: '#38BDF8',
    iconType: 'apple',
    keywords:
      'دسته بازی موبایل آیفون اندروید بک بون ریزر کیشی گیم سر کالاف پابجی backbone one razer kishi iphone ios android mobile controller',
    popularPackagesFa: [
      'دسته موبایل GameSir G8 Galileo (مخصوص اندروید و آیفون ۱۵/۱۶)',
      'دسته موبایل Razer Kishi V2 Pro (نسخه اندروید و آیفون)',
      'دسته موبایل Backbone One PlayStation Edition (مخصوص آیفون USB-C / Lightning)',
      'دسته موبایل Backbone One Gen 2 (مخصوص آیفون و اندروید با قاب گوشی)',
    ],
  },
  {
    id: 'gaming-headset-gear',
    slug: 'sony-pulse-3d-elite-headset-ssd-ps5',
    category: 'gaming',
    categoryLabelFa: 'دیوایس و کنسول گیمینگ',
    categoryLabelEn: 'Gaming Consoles & Devices',
    platformBrand: 'Sony Pulse / Razer Gear',
    titleFa: 'هدست گیمینگ Pulse 3D / Razer، استند شارژر و حافظه SSD M.2 PS5',
    titleEn: 'Sony Pulse 3D / Elite Headset, PS5 M.2 SSD & Gaming Gear',
    subtitleFa:
      'تجهیزات جانبی اورجینال کنسول و PC شامل هدست سونی Pulse 3D و Pulse Elite، هارد SSD M.2 هیت‌سینک‌دار مخصوص PS5 و موس و کیبورد گیمینگ ریزر',
    subtitleEn:
      'Official Sony Pulse 3D/Elite wireless headsets, PS5 heatsink NVMe M.2 SSDs, and Razer esports peripherals',
    priceUsd: 34.0,
    durationFa: 'گارانتی معتبر تعویض',
    durationEn: 'Official Hardware Warranty',
    regionFa: 'اورجینال جهانی',
    regionEn: 'Global Original OEM',
    deliveryFa: 'ارسال سریع + مشاوره تخصصی',
    deliveryEn: 'Fast Dispatch + Pro Support',
    badgeFa: 'تجهیزات حرفه‌ای گیم',
    badgeEn: 'Pro Esports Gear',
    accentColor: '#22C55E',
    iconType: 'razer',
    keywords:
      'هدست گیمینگ پالس تری دی الیت اس اس دی پلی استیشن ۵ تجهیزات گیمینگ دیوایس pulse 3d ssd ps5 razer',
    popularPackagesFa: [
      'پایه شارژر دوگانه دسته PS5',
      'هدست بی‌سیم سونی Pulse 3D Wireless',
      'هدست حرفه‌ای سونی Pulse Elite',
      'حافظه SSD M.2 ظرفیت 1TB هیت‌سینک‌دار مخصوص PS5',
    ],
  },
  {
    id: 'gaming-ping-dns-pro',
    slug: 'gaming-ping-reducer-dns-exitlag-pro',
    category: 'gaming',
    categoryLabelFa: 'اکانت ظرفیتی و گیمینگ',
    categoryLabelEn: 'Console Capacity & Gaming',
    platformBrand: 'ExitLag / Gaming DNS',
    titleFa: 'سرویس کاهش پینگ، رادار گیمینگ و DNS اختصاصی کنسول و PC (ExitLag)',
    titleEn: 'Gaming Ping Reducer, ExitLag & Console DNS Pro (PS5 / Xbox / PC)',
    subtitleFa:
      'رفع کامل تحریم و کاهش پینگ کنسول PS5 / Xbox و کامپیوتر با آی‌پی و DNS اختصاصی گیمینگ، اشتراک ExitLag و GearUP Booster برای رجیستر تیر عالی در FC 25 و CoD',
    subtitleEn:
      'Dedicated anti-sanction Gaming DNS for PS5/Xbox plus official ExitLag & GearUP Booster subscriptions for low ping',
    priceUsd: 3.99,
    durationFa: '۱ ماهه الی ۱ ساله گیمینگ',
    durationEn: '1M to 12M Low-Ping Routing',
    regionFa: 'سرورهای امارات، آلمان، بحرین و ترکیه',
    regionEn: 'UAE / DE / Bahrain Gaming Nodes',
    deliveryFa: 'تحویل آنی کد DNS و اکانت در پنل',
    deliveryEn: 'Instant DNS IP & Account',
    badgeFa: 'کاهش پینگ و رفع تحریم',
    badgeEn: 'Zero Packet Loss',
    accentColor: '#10B981',
    iconType: 'xbox',
    keywords:
      'کاهش پینگ دی ان اس گیمینگ کنسول اگزیت لگ رادار پینگ اف سی ۲۵ کالاف dns gaming exitlag gearup ps5 xbox',
    popularPackagesFa: [
      'DNS اختصاصی گیمینگ کنسول PS5 / Xbox (۱ ماهه)',
      'DNS اختصاصی گیمینگ کنسول (۳ ماهه اقتصادی)',
      'اشتراک ۱ ماهه ExitLag اختصاصی (PC)',
      'اشتراک GearUP Console & Mobile Booster',
    ],
  },
  {
    id: 'razer-gold-20',
    slug: 'razer-gold-global-20',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Razer Gold',
    titleFa: 'گیفت‌کارت Razer Gold بیست دلاری گلوبال (پین شارژ بازی‌ها)',
    titleEn: 'Razer Gold $20 Global Pin (All Games Top-Up)',
    subtitleFa: 'پین جهانی ریزر گلد برای شارژ مستقیم پابجی موبایل، کراس‌فایر، موبایل لجندز و بیش از ۴۲ هزار بازی',
    subtitleEn: 'Universal Razer Gold Pin accepted across PUBG Mobile, MLBB & 42,000+ games',
    priceUsd: 20,
    durationFa: 'پین گلوبال بدون انقضا',
    durationEn: 'Global Pin Code',
    regionFa: 'گلوبال (Global)',
    regionEn: 'Global Region',
    deliveryFa: 'تحویل آنی پین و سریال',
    deliveryEn: 'Instant Pin & Serial',
    badgeFa: 'ارز جهانی گیمرها',
    badgeEn: 'Global Gamer Pin',
    accentColor: '#22C55E',
    iconType: 'razer',
    keywords: 'ریزر گلد پین گلوبال razer gold pin دیکاردو پابجی',
    popularPackagesFa: ['۵ دلاری گلوبال', '۱۰ دلاری گلوبال', '۲۰ دلاری گلوبال', '۵۰ دلاری گلوبال', '۱۰۰ دلاری گلوبال'],
  },
  {
    id: 'nintendo-eshop-20',
    slug: 'nintendo-eshop-20',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Nintendo',
    titleFa: 'گیفت‌کارت Nintendo eShop بیست دلاری (کنسول نینتندو سوییچ)',
    titleEn: 'Nintendo eShop $20 Gift Card (Switch / Switch 2)',
    subtitleFa: 'شارژ کیف پول نینتندو ای‌شاپ برای خرید بازی‌های Zelda، Mario و اشتراک Nintendo Switch Online',
    subtitleEn: 'Official Nintendo eShop credit for Switch digital games & Switch Online membership',
    priceUsd: 20,
    durationFa: 'دائمی (بدون انقضا)',
    durationEn: 'No Expiration',
    regionFa: 'ریجن آمریکا (USA)',
    regionEn: 'Region: USA',
    deliveryFa: 'کد ۱۶ رقمی نینتندو',
    deliveryEn: '16-Digit eShop Code',
    badgeFa: 'مخصوص Nintendo Switch',
    badgeEn: 'Nintendo Official',
    accentColor: '#EF4444',
    iconType: 'nintendo',
    keywords: 'گیفت کارت نینتندو سوییچ ای شاپ nintendo switch eshop دیکاردو',
    popularPackagesFa: ['۱۰ دلاری', '۲۰ دلاری', '۳۵ دلاری', '۵۰ دلاری', 'اشتراک Switch Online یک‌ساله'],
  },
  {
    id: 'battlenet-balance-20',
    slug: 'battlenet-giftcard-20',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Blizzard Battle.net',
    titleFa: 'گیفت‌کارت Battle.net بیست دلاری (World of Warcraft & CoD PC)',
    titleEn: 'Blizzard Battle.net $20 Balance Card',
    subtitleFa: 'شارژ حساب بلیزارد برای خرید تایم‌کارت World of Warcraft، سی‌پی کالاف دیوتی وارزون و Diablo IV',
    subtitleEn: 'Official Blizzard balance for WoW Game Time, Call of Duty Warzone & Diablo IV',
    priceUsd: 20,
    durationFa: 'اعتبار دائمی بلیزارد',
    durationEn: 'Permanent Balance',
    regionFa: 'آمریکا و اروپا',
    regionEn: 'US & EU Regions',
    deliveryFa: 'کد دیجیتال آنی',
    deliveryEn: 'Instant Key Delivery',
    badgeFa: 'وارکرفت و وارزون',
    badgeEn: 'Blizzard Official',
    accentColor: '#3B82F6',
    iconType: 'steam',
    keywords: 'گیفت کارت بتل نت بلیزارد وارکرفت وارزون battlenet blizzard wow دیکاردو',
    popularPackagesFa: ['۲۰ دلاری آمریکا', '۲۰ یورویی اروپا', '۵۰ دلاری', 'تایم‌کارت ۶۰ روزه WoW'],
  },
  {
    id: 'riot-valorant-points',
    slug: 'riot-valorant-points-20',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Riot Games',
    titleFa: 'گیفت‌کارت Valorant Points و League of Legends (رایوت گیمز)',
    titleEn: 'Riot Access $20 Card (Valorant VP & LoL RP)',
    subtitleFa: 'کد مستقیم شارژ Valorant Points (VP) برای خرید اسکین‌های باندل جدید و بتل‌پس ولورانت',
    subtitleEn: 'Instant Riot Games prepaid code for Valorant Points (VP) and League of Legends RP',
    priceUsd: 20,
    durationFa: 'تحویل آنی کد Riot',
    durationEn: 'Instant Riot Code',
    regionFa: 'اروپا / ترکیه / آمریکا',
    regionEn: 'EU / TR / NA Regions',
    deliveryFa: 'کد دیجیتال قابل ردیم در بازی',
    deliveryEn: 'In-Client Redeemable Code',
    badgeFa: 'مخصوص ولورانت',
    badgeEn: 'Valorant VP',
    accentColor: '#F43F5E',
    iconType: 'razer',
    keywords: 'ولورانت پوینت رایوت گیمز لیگ آف لجندز valorant points vp riot دیکاردو',
    popularPackagesFa: ['۴۷۵ VP', '۱۰۰۰ VP', '۲۰۵۰ VP ($20)', '۳۶۵۰ VP', '۵۳۵۰ VP'],
  },
  {
    id: 'roblox-robux-800',
    slug: 'roblox-giftcard-800-robux',
    category: 'gaming',
    categoryLabelFa: 'گیفت‌کارت و کنسول',
    categoryLabelEn: 'Gaming & Gift Cards',
    platformBrand: 'Roblox',
    titleFa: 'گیفت‌کارت Roblox (۸۰۰ الی ۱۰۰۰ روباکس گلوبال + آیتم هدیه)',
    titleEn: 'Roblox $10 Gift Card (Robux + Exclusive Virtual Item)',
    subtitleFa: 'کد رسمی روبلوکس قابل فعال‌سازی روی تمام ریجن‌ها به همراه آیتم آواتار رایگان اختصاصی ماه',
    subtitleEn: 'Global Roblox credit code for Robux and Roblox Premium plus free virtual item',
    priceUsd: 10,
    durationFa: 'دائمی + آیتم رایگان',
    durationEn: 'Permanent + Bonus Item',
    regionFa: 'گلوبال (بدون محدودیت ریجن)',
    regionEn: 'Global Region-Free',
    deliveryFa: 'کد پین رسمی روبلوکس',
    deliveryEn: 'Official Roblox PIN',
    badgeFa: 'شامل آیتم اختصاصی',
    badgeEn: '+Free Avatar Item',
    accentColor: '#EF4444',
    iconType: 'nintendo',
    keywords: 'روبلوکس روباکس گیفت کارت roblox robux دیکاردو',
    popularPackagesFa: ['۸۰۰ روباکس ($10)', '۲۰۰۰ روباکس ($25)', '۴۵۰۰ روباکس ($50)'],
  },

  // =========================================================================
  // 4. PREMIUM SUBSCRIPTIONS, TELEGRAM & APPLE ID (12 PRODUCTS)
  // =========================================================================
  {
    id: 'telegram-premium-3m',
    slug: 'telegram-premium-subscription',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Telegram / Fragment',
    titleFa: 'اشتراک تلگرام پرمیوم (Telegram Premium فعال‌سازی آنی با آیدی)',
    titleEn: 'Telegram Premium Official (Instant @Username Gift)',
    subtitleFa: 'فعال‌سازی فوری تیک آبی/ستاره تلگرام پرمیوم، استوری نامحدود، سرعت دانلود ۲ برابر و تبدیل ویس به متن بدون نیاز به لاگین',
    subtitleEn: 'Instant official Telegram Premium via Fragment using only your @username—zero login needed',
    priceUsd: 11.99,
    durationFa: '۳ ماهه / ۶ ماهه / ۱ ساله',
    durationEn: '3M / 6M / 12M Official',
    regionFa: 'همه شماره‌ها (ایران و مجازی)',
    regionEn: 'All Phone Numbers (+98 OK)',
    deliveryFa: 'هدیه آنی فقط با آیدی (@Username)',
    deliveryEn: 'Instant @Username Activation',
    badgeFa: 'بدون نیاز به کد ورود',
    badgeEn: 'No Login Required',
    accentColor: '#38BDF8',
    iconType: 'telegram',
    keywords: 'تلگرام پرمیوم پریمیوم خرید اشتراک استارز telegram premium دیکاردو',
    popularPackagesFa: ['۱ ماهه با لاگین ($4.99)', '۳ ماهه با آیدی بدون لاگین ($11.99)', '۶ ماهه با آیدی ($15.99)', '۱ ساله کامل با آیدی ($28.99)'],
  },
  {
    id: 'telegram-stars-500',
    slug: 'telegram-stars-pack',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Telegram / Fragment',
    titleFa: 'خرید استارز تلگرام (Telegram Stars — ۵۰۰ ستاره آنی با آیدی)',
    titleEn: '500 Telegram Stars (Instant @Username Delivery)',
    subtitleFa: 'ارسال آنی ستاره تلگرام برای خرید گیفت‌های کلکسیونی (NFT)، پرداخت درون مینی‌اپ‌ها و حمایت از کانال‌ها',
    subtitleEn: 'Instant Telegram Stars via official Fragment gateway for Telegram Gifts & Mini-Apps',
    priceUsd: 8.99,
    durationFa: 'واریز آنی زیر ۲ دقیقه',
    durationEn: 'Instant (<2 Min)',
    regionFa: 'همه اکانت‌های تلگرام',
    regionEn: 'Global Telegram',
    deliveryFa: 'واریز مستقیم با @Username',
    deliveryEn: 'Direct @Username Transfer',
    badgeFa: 'مخصوص گیفت و مینی‌اپ',
    badgeEn: 'Telegram Stars',
    accentColor: '#F59E0B',
    iconType: 'telegram',
    keywords: 'استارز تلگرام ستاره تلگرام گیفت telegram stars fragment دیکاردو',
    popularPackagesFa: ['۱۰۰ استارز', '۲۵۰ استارز', '۵۰۰ استارز ($8.99)', '۱۰۰۰ استارز', '۲۵۰۰ استارز', '۱۰۰۰۰ استارز'],
  },
  {
    id: 'apple-id-verified',
    slug: 'verified-usa-apple-id',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Apple Official',
    titleFa: 'اپل آیدی وریفای‌شده آمریکا با ایمیل شخصی (Verified USA Apple ID)',
    titleEn: 'Verified USA Apple ID (Personal Email + Security Questions)',
    subtitleFa: 'ساخت اپل آیدی قانونی ریجن آمریکا روی ایمیل شخصی شما یا تحویل فوری به همراه تاریخ تولد و ۳ سوال امنیتی بدون نات‌اکتیو شدن',
    subtitleEn: 'Guaranteed non-locked USA Apple ID with full security questions and personal email support',
    priceUsd: 3.5,
    durationFa: 'دائمی با گارانتی مادام‌العمر',
    durationEn: 'Lifetime Warranty',
    regionFa: 'ریجن آمریکا (معاف از مالیات)',
    regionEn: 'Tax-Free USA State',
    deliveryFa: 'تحویل آنی + سوالات امنیتی',
    deliveryEn: 'Instant + Full Security Info',
    badgeFa: 'پرفروش‌ترین سرویس اپل',
    badgeEn: 'Anti-Lock Guaranteed',
    accentColor: '#38BDF8',
    iconType: 'apple',
    keywords: 'خرید اپل آیدی آمریکا وریفای شده آیفون آی او اس apple id usa iphone ios دیکاردو',
    popularPackagesFa: ['اپل آیدی آماده تحویل آنی ($3.50)', 'ساخت روی ایمیل و شماره شخصی شما ($4.99)', 'اپل آیدی + اشتراک iCloud+ 50GB'],
  },
  {
    id: 'google-play-android-pro',
    slug: 'google-play-pass-android-giftcard',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Google Play Android',
    titleFa: 'گیفت‌کارت Google Play و اشتراک Play Pass مخصوص اندروید (Android Store)',
    titleEn: 'Google Play Gift Card & Play Pass for Android Apps & Games',
    subtitleFa:
      'شارژ قانونی حساب گوگل پلی آمریکا و ترکیه برای خرید برنامه‌ها، پرداخت درون‌برنامه‌ای بازی‌های اندروید و فعال‌سازی Google Play Pass بدون تبلیغات',
    subtitleEn:
      'Official Google Play Store balance & Google Play Pass subscription for Android apps, games, and in-app purchases',
    priceUsd: 10.0,
    durationFa: 'اعتبار دائمی + اشتراک ماهانه',
    durationEn: 'Permanent Balance / Monthly Pass',
    regionFa: 'ریجن آمریکا / ترکیه / اروپا',
    regionEn: 'USA / TR / EU Regions',
    deliveryFa: 'تحویل آنی کد ۱۶ رقمی گوگل پلی',
    deliveryEn: 'Instant 16-Digit Google Play Code',
    badgeFa: 'مخصوص کاربران اندروید',
    badgeEn: 'Official Android Hub',
    accentColor: '#2DD4BF',
    iconType: 'googleplay',
    keywords:
      'گوگل پلی اندروید گیفت کارت پلی پس خرید برنامه اندروید google play android gift card play pass',
    popularPackagesFa: [
      'گیفت‌کارت ۵ دلاری Google Play آمریکا',
      'گیفت‌کارت ۱۰ دلاری Google Play آمریکا',
      'گیفت‌کارت ۲۵ دلاری Google Play آمریکا',
      'اشتراک ۱ ماهه و ۱ ساله Google Play Pass اندروید',
    ],
  },
  {
    id: 'windows-microsoft-365-pro',
    slug: 'windows-11-pro-microsoft-365-official-license',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Microsoft Windows',
    titleFa: 'لایسنس اورجینال Windows 11 Pro و اشتراک Microsoft 365 (مخصوص ویندوز و مک)',
    titleEn: 'Official Windows 11 Pro Retail Key & Microsoft 365 Personal (1TB OneDrive)',
    subtitleFa:
      'کد فعال‌سازی دائمی ویندوز ۱۱ و ۱۰ پرو (Retail مادام‌العمر) به همراه اشتراک رسمی آفیس ۳۶۵ و ۱ ترابایت فضای ابری OneDrive روی ایمیل شخصی شما',
    subtitleEn:
      'Lifetime retail license key for Windows 11/10 Pro plus official Microsoft 365 subscription with 1TB OneDrive cloud storage',
    priceUsd: 12.99,
    durationFa: 'مادام‌العمر (ویندوز) / ۱ ساله (آفیس)',
    durationEn: 'Lifetime (Win 11) / 1-Year (M365)',
    regionFa: 'گلوبال (فعال‌سازی رسمی مایکروسافت)',
    regionEn: 'Global Official Microsoft',
    deliveryFa: 'کد ۲۵ رقمی اورجینال + دعوت‌نامه ایمیل',
    deliveryEn: '25-Digit Retail Key / Email Invite',
    badgeFa: 'مخصوص سیستم‌های ویندوز',
    badgeEn: 'Official Windows Pro',
    accentColor: '#38BDF8',
    iconType: 'xbox',
    keywords:
      'ویندوز ۱۱ پرو لایسنس اورجینال مایکروسافت آفیس ۳۶۵ وان درایو windows 11 pro microsoft 365 office pc',
    popularPackagesFa: [
      'لایسنس دائمی Windows 11 Pro Retail (تک‌کاربره مادام‌العمر)',
      'اشتراک ۱ ساله Microsoft 365 + ۱ ترابایت OneDrive روی ایمیل شخصی',
      'باندل ویژه لایسنس Windows 11 Pro + آفیس ۳۶۵ یک‌ساله',
    ],
  },
  {
    id: 'spotify-premium',
    slug: 'spotify-premium',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Spotify',
    titleFa: 'اشتراک Spotify Premium Individual (روی اکانت شخصی)',
    titleEn: 'Spotify Premium Individual Subscription',
    subtitleFa: 'پخش موسیقی بدون تبلیغات، دانلود آفلاین و کیفیت صدای Very High روی اکانت فعلی شما با حفظ پلی‌لیست‌ها',
    subtitleEn: 'Ad-free music streaming, offline downloads & lossless audio on your own account',
    priceUsd: 5.5,
    durationFa: '۱ ماهه الی ۱ ساله قابل تمدید',
    durationEn: '1M to 12M Renewable',
    regionFa: 'اروپا / آمریکا / هند',
    regionEn: 'EU / US / Global',
    deliveryFa: 'فعالسازی با حفظ پلی‌لیست',
    deliveryEn: 'Keep Existing Playlists',
    badgeFa: 'فعالسازی فوری',
    badgeEn: 'Fast Upgrade',
    accentColor: '#10B981',
    iconType: 'spotify',
    keywords: 'اسپاتیفای پرمیوم پریمیوم موزیک آهنگ spotify premium دیکاردو',
    popularPackagesFa: ['۱ ماهه Individual ($5.50)', '۳ ماهه Individual ($13.99)', '۶ ماهه Individual', '۱ ساله کامل Individual'],
  },
  {
    id: 'youtube-premium',
    slug: 'youtube-premium-personal',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Google YouTube',
    titleFa: 'اشتراک YouTube Premium + YouTube Music (بدون تبلیغات)',
    titleEn: 'YouTube Premium + Music (Personal Gmail Invite)',
    subtitleFa: 'حذف کامل تبلیغات یوتیوب، پخش در پس‌زمینه موبایل، دانلود ویدیو و اشتراک رایگان YouTube Music روی جیمیل شما',
    subtitleEn: 'Ad-free YouTube, background play, offline downloads & YouTube Music on your Gmail',
    priceUsd: 4.99,
    durationFa: '۱ ماهه / ۶ ماهه / ۱ ساله',
    durationEn: '1M / 6M / 12M Plans',
    regionFa: 'گلوبال (جیمیل شخصی)',
    regionEn: 'Global Personal Gmail',
    deliveryFa: 'دعوت‌نامه رسمی بدون نیاز به رمز',
    deliveryEn: 'Invite Link — No Password',
    badgeFa: 'بدون نیاز به رمز جیمیل',
    badgeEn: 'Zero Password Needed',
    accentColor: '#EF4444',
    iconType: 'youtube',
    keywords: 'یوتیوب پرمیوم پریمیوم بدون تبلیغ youtube premium music دیکاردو',
    popularPackagesFa: ['۱ ماهه جیمیل شخصی ($4.99)', '۳ ماهه جیمیل شخصی', '۶ ماهه تضمینی', '۱ ساله کامل تضمینی'],
  },
  {
    id: 'netflix-premium',
    slug: 'netflix-premium',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Netflix',
    titleFa: 'اشتراک Netflix Premium 4K Ultra HD (پروفایل اختصاصی)',
    titleEn: 'Netflix Premium 4K UHD (Private PIN Profile)',
    subtitleFa: 'پروفایل اختصاصی قفل‌دار با کیفیت 4K HDR، زیرنویس فارسی/انگلیسی و بدون محدودیت دستگاه در تلویزیون و موبایل',
    subtitleEn: 'Private PIN-protected profile with 4K HDR streaming across Smart TV, PC & Mobile',
    priceUsd: 6.99,
    durationFa: '۱ ماهه — کیفیت 4K UHD',
    durationEn: '1 Month — 4K HDR',
    regionFa: 'بدون محدودیت ریجن',
    regionEn: 'Region-Free',
    deliveryFa: 'تحویل پروفایل اختصاصی با PIN',
    deliveryEn: 'Private PIN Profile',
    badgeFa: 'کیفیت 4K Ultra',
    badgeEn: '4K Ultra HD',
    accentColor: '#F43F5E',
    iconType: 'netflix',
    keywords: 'نتفلیکس پرمیوم فیلم سریال netflix 4k دیکاردو',
    popularPackagesFa: ['۱ ماهه تک‌کاربره قفل‌دار ($6.99)', '۱ ماهه اکانت کامل ۵ پروفایل ($18.99)', '۳ ماهه اختصاصی'],
  },
  {
    id: 'canva-pro',
    slug: 'canva-pro-subscription',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Canva',
    titleFa: 'اشتراک Canva Pro (ابزار طراحی گرافیک، استوری و هوش مصنوعی)',
    titleEn: 'Canva Pro Official Design & Magic Studio',
    subtitleFa: 'دسترسی به ۱۰۰ میلیون قالب پرمیوم، حذف پس‌زمینه با یک کلیک، فونت‌های فارسی و ابزار هوش مصنوعی Magic Studio',
    subtitleEn: '100M+ premium templates, 1-click background remover & Magic Studio AI on personal email',
    priceUsd: 5.99,
    durationFa: '۱ ساله تضمینی',
    durationEn: '1 Year Warranty',
    regionFa: 'گلوبال (ایمیل شخصی)',
    regionEn: 'Global Personal Email',
    deliveryFa: 'دعوت‌نامه مستقیم بدون رمز',
    deliveryEn: 'Direct Email Invite',
    badgeFa: 'محبوب طراحان و ادمین‌ها',
    badgeEn: '1-Year Pro Invite',
    accentColor: '#8B5CF6',
    iconType: 'canva',
    keywords: 'کانوا پرو طراحی گرافیک اینستاگرام canva pro دیکاردو',
    popularPackagesFa: ['۱ ماهه Canva Pro', '۱ ساله کامل روی ایمیل شخصی ($5.99)'],
  },
  {
    id: 'adobe-creative-cloud',
    slug: 'adobe-creative-cloud-all-apps',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Adobe',
    titleFa: 'اشتراک Adobe Creative Cloud All Apps (فتوشاپ + هوش مصنوعی Firefly)',
    titleEn: 'Adobe Creative Cloud All Apps + 100GB Cloud',
    subtitleFa: 'لایسنس اورجینال تمام برنامه‌های ادوبی (Photoshop, Premiere, Illustrator) به همراه Generative Fill هوش مصنوعی فایرفلای',
    subtitleEn: 'Official license for 20+ Adobe apps with Firefly Generative Fill & 100GB cloud storage',
    priceUsd: 24.99,
    durationFa: '۱ ماهه — ۱۰۰۰ کردیت Firefly',
    durationEn: '1 Month — 1000 AI Credits',
    regionFa: 'گلوبال (ویندوز و مک)',
    regionEn: 'Windows & macOS',
    deliveryFa: 'فعالسازی روی ایمیل شخصی شما',
    deliveryEn: 'Personal Email Activation',
    badgeFa: 'شامل Generative Fill',
    badgeEn: 'Firefly AI Included',
    accentColor: '#EF4444',
    iconType: 'canva',
    keywords: 'ادوبی فتوشاپ فایرفلای پریمیر adobe creative cloud firefly photoshop',
    popularPackagesFa: ['۱ ماهه All Apps', '۳ ماهه All Apps', '۱ ساله سازمانی'],
  },
  {
    id: 'tradingview-essential',
    slug: 'tradingview-pro-subscription',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'TradingView',
    titleFa: 'اشتراک TradingView Essential / Plus (ویژه تریدرها و تحلیل تکنیکال)',
    titleEn: 'TradingView Essential & Plus Subscription',
    subtitleFa: 'چندین چارت همزمان، ۵ الی ۱۰ اندیکاتور روی هر نمودار، آلارم‌های قیمتی لحظه‌ای و بک‌تست استراتژی‌های ارز دیجیتال و فارکس',
    subtitleEn: 'Multi-chart layouts, custom Pine Script indicators, server-side alerts & Bar Replay',
    priceUsd: 14.95,
    durationFa: '۱ ماهه رسمی',
    durationEn: '1 Month Official',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'تحویل اکانت اختصاصی',
    deliveryEn: 'Dedicated Pro Account',
    badgeFa: 'مخصوص ترید و فارکس',
    badgeEn: 'Pro Traders',
    accentColor: '#3B82F6',
    iconType: 'tradingview',
    keywords: 'تریدینگ ویو چارت ارز دیجیتال فارکس tradingview pro plus دیکاردو',
    popularPackagesFa: ['پلن Essential ($14.95)', 'پلن Plus ($29.95)', 'پلن Premium ($59.95)'],
  },
  {
    id: 'linkedin-premium',
    slug: 'linkedin-premium-career-business',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'LinkedIn',
    titleFa: 'اشتراک LinkedIn Premium Career & Business (لینکدین پرمیوم)',
    titleEn: 'LinkedIn Premium Career / Business Upgrade',
    subtitleFa: 'نشان طلایی لینکدین، مشاهده بازدیدکنندگان پروفایل، ارسال پیام InMail مستقیم به ریکروترها و دسترسی کامل به LinkedIn Learning',
    subtitleEn: 'Gold badge, Who Viewed Your Profile, InMail credits & full LinkedIn Learning access',
    priceUsd: 19.99,
    durationFa: '۱ ماهه / ۶ ماهه / ۱ ساله',
    durationEn: '1M / 6M / 12M Plans',
    regionFa: 'گلوبال',
    regionEn: 'Global',
    deliveryFa: 'لینک فعالسازی بدون نیاز به رمز',
    deliveryEn: 'Direct Activation Link',
    badgeFa: 'بدون نیاز به رمز عبور',
    badgeEn: 'Redeem Link',
    accentColor: '#0EA5E9',
    iconType: 'tradingview',
    keywords: 'لینکدین پرمیوم بیزینس کریر linkedin premium career business',
    popularPackagesFa: ['Career یک‌ماهه', 'Business شش‌ماهه با لینک مستقیم', 'Business یک‌ساله'],
  },
  {
    id: 'discord-nitro',
    slug: 'discord-nitro-full',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Discord',
    titleFa: 'اشتراک Discord Nitro Full (همراه ۲ بوست سرور رایگان)',
    titleEn: 'Discord Nitro Full (With 2 Server Boosts)',
    subtitleFa: 'پروفایل متحرک، استریم بازی با کیفیت 4K 60fps، آپلود فایل تا ۵۰۰ مگابایت، ایموجی اختصاصی و ۲ بوست سرور ماهانه',
    subtitleEn: 'HD 4K 60fps streaming, custom animated profile, 500MB uploads & 2 free Server Boosts',
    priceUsd: 9.99,
    durationFa: '۱ ماهه / ۱ ساله',
    durationEn: '1 Month / 1 Year',
    regionFa: 'گلوبال (همه اکانت‌ها)',
    regionEn: 'Global Discord',
    deliveryFa: 'گیفت لینک رسمی یا فعالسازی مستقیم',
    deliveryEn: 'Official Gift Link / Direct',
    badgeFa: 'شامل ۲ بوست سرور',
    badgeEn: '+2 Server Boosts',
    accentColor: '#6366F1',
    iconType: 'discord',
    keywords: 'دیسکورد نیترو بوست سرور discord nitro boost دیکاردو',
    popularPackagesFa: ['Nitro Basic ($3.99)', 'Nitro Full + 2 Boosts ($9.99)', 'Nitro یک‌ساله'],
  },
  {
    id: 'duolingo-super',
    slug: 'duolingo-super-max',
    category: 'subscriptions',
    categoryLabelFa: 'اشتراک پرمیوم و اپل‌آیدی',
    categoryLabelEn: 'Premium & Apple ID',
    platformBrand: 'Duolingo',
    titleFa: 'اشتراک Duolingo Super (آموزش زبان بدون محدودیت قلب)',
    titleEn: 'Duolingo Super Individual / Family Invite',
    subtitleFa: 'یادگیری بیش از ۴۰ زبان زنده دنیا بدون تبلیغات، با قلب نامحدود، تمرین‌های اختصاصی رفع اشکال و آزمون تعیین سطح',
    subtitleEn: 'Unlimited hearts, zero ads, personalized mistake review & mastery quizzes on your account',
    priceUsd: 4.5,
    durationFa: '۳ ماهه / ۱ ساله',
    durationEn: '3 Months / 1 Year',
    regionFa: 'گلوبال (اکانت شخصی)',
    regionEn: 'Global Account',
    deliveryFa: 'دعوت‌نامه مستقیم فقط با یوزرنیم',
    deliveryEn: 'Instant Username Invite',
    badgeFa: 'بدون نیاز به پسورد',
    badgeEn: 'Username Only',
    accentColor: '#22C55E',
    iconType: 'spotify',
    keywords: 'دولینگو سوپر آموزش زبان انگلیسی duolingo super max دیکاردو',
    popularPackagesFa: ['۳ ماهه Duolingo Super ($4.50)', '۱ ساله کامل Duolingo Super ($12.99)'],
  },

  // =========================================================================
  // 5. VPN, STATIC IP & TRADING SERVERS (5 PRODUCTS)
  // =========================================================================
  {
    id: 'modasr-connect',
    slug: 'modasr-connect',
    category: 'vpn',
    categoryLabelFa: 'اتصال و آی‌پی ثابت',
    categoryLabelEn: 'VPN & Static IP',
    platformBrand: 'MODASR Network',
    titleFa: 'اشتراک اختصاصی MODASR Connect Pro (آی‌پی ثابت V2Ray / Sing-Box)',
    titleEn: 'MODASR Connect Pro Dedicated Static IP',
    subtitleFa: 'اتصال پایدار با پینگ زیر ۶۰ میلی‌ثانیه، آی‌پی ثابت آلمان، فنلاند، هلند و ترکیه، مناسب ترید، هوش مصنوعی و گیمینگ',
    subtitleEn: 'Ultra-low latency static IP routing across Germany, Finland, NL & Turkey for AI & trading',
    priceUsd: 4.5,
    durationFa: '۱ ماهه — ۱۰۰ گیگابایت',
    durationEn: '1 Month — 100 GB',
    regionFa: 'مولتی‌لوکیشن ۱۰ کشور VIP',
    regionEn: '10 VIP Locations',
    deliveryFa: 'تحویل آنی کانفیگ و لینک سابسکریپشن',
    deliveryEn: 'Instant Subscription Link',
    badgeFa: 'اختصاصی مدثر',
    badgeEn: 'MODASR Exclusive',
    accentColor: '#10B981',
    iconType: 'vpn',
    keywords: 'وی پی ان آی پی ثابت مدثر v2ray vpn static ip فیلترشکن',
    popularPackagesFa: ['۱ ماهه ۵۰ گیگ ($2.50)', '۱ ماهه ۱۰۰ گیگ ($4.50)', '۳ ماهه ۳۰۰ گیگ ($11.99)'],
  },
  {
    id: 'modasr-vps-trading',
    slug: 'trading-static-ip-vps',
    category: 'vpn',
    categoryLabelFa: 'اتصال و آی‌پی ثابت',
    categoryLabelEn: 'VPN & Static IP',
    platformBrand: 'MODASR Cloud',
    titleFa: 'سرور مجازی و آی‌پی ثابت اختصاصی ترید (بایننس، کوکوین و فارکس)',
    titleEn: 'Dedicated Trading Static IP & Cloud Desktop',
    subtitleFa: 'آی‌پی ۱۰۰٪ اختصاصی و تمیز دیتاسنترهای امارات، فنلاند و هلند با کیل‌سوئیچ خودکار جهت جلوگیری از مسدودسازی حساب صرافی‌ها',
    subtitleEn: 'Dedicated static IPv4 with hardware kill-switch engineered for Binance, Bybit & Forex',
    priceUsd: 11.5,
    durationFa: '۱ ماهه — ترافیک نامحدود',
    durationEn: '1 Month — Unmetered',
    regionFa: 'امارات / فنلاند / آلمان / هلند',
    regionEn: 'UAE / FI / DE / NL',
    deliveryFa: 'تحویل آنی آی‌پی اختصاصی تک‌کاربره',
    deliveryEn: 'Instant Dedicated IP',
    badgeFa: 'تضمین امنیت صرافی',
    badgeEn: 'Binance Safe IP',
    accentColor: '#00F5D4',
    iconType: 'vpn',
    keywords: 'آی پی ثابت ترید بایننس سرور مجازی فارکس vps trading binance',
    popularPackagesFa: ['آی‌پی ثابت فنلاند ($11.50)', 'آی‌پی ثابت امارات ($13.50)', 'سرور ویندوز ترید رم ۴ گیگ'],
  },
  {
    id: 'express-nord-premium',
    slug: 'expressvpn-nordvpn-official',
    category: 'vpn',
    categoryLabelFa: 'اتصال و آی‌پی ثابت',
    categoryLabelEn: 'VPN & Static IP',
    platformBrand: 'Nord / Express',
    titleFa: 'اکانت اورجینال ExpressVPN & NordVPN اختصاصی (۱۰۴ کشور)',
    titleEn: 'ExpressVPN & NordVPN Official Account',
    subtitleFa: 'دسترسی به سرورهای بیش از ۱۰۰ کشور جهان برای تغییر ریجن استیم، پلی‌استیشن، اپل تی‌وی و استریم بدون افت سرعت',
    subtitleEn: 'Official multi-device VPN subscription covering 104+ countries with Lightway/NordLynx',
    priceUsd: 7.99,
    durationFa: '۱ ماهه الی ۱ ساله تضمینی',
    durationEn: '1M to 12M Warranty',
    regionFa: '۱۰۴ کشور جهان',
    regionEn: '104 Global Countries',
    deliveryFa: 'تحویل اکانت و کد اکتیویشن',
    deliveryEn: 'Activation Code & Account',
    badgeFa: '۱۰۰+ لوکیشن جهانی',
    badgeEn: '104 Countries',
    accentColor: '#3B82F6',
    iconType: 'vpn',
    keywords: 'اکسپرس وی پی ان نورد وی پی ان expressvpn nordvpn دیکاردو',
    popularPackagesFa: ['۱ ماهه ExpressVPN', '۶ ماهه NordVPN', '۱ ساله کامل دوکاربره'],
  },
  {
    id: 'residential-static-ip',
    slug: 'residential-isp-static-ip',
    category: 'vpn',
    categoryLabelFa: 'اتصال و آی‌پی ثابت',
    categoryLabelEn: 'VPN & Static IP',
    platformBrand: 'AT&T / Vodafone ISP',
    titleFa: 'آی‌پی ثابت مسکونی آمریکا و انگلیس (ویژه پی‌پال، Upwork و وریفای)',
    titleEn: 'Residential ISP Static IP (USA AT&T / UK Virgin)',
    subtitleFa: 'آی‌پی مسکونی واقعی (ISP Home IP) با امتیاز ریسک صفر (Fraud Score 0) مخصوص حساب‌های PayPal، Stripe، لینکدین و فریلنسینگ',
    subtitleEn: 'Genuine home ISP static IP (0% Fraud Score) for PayPal, Stripe, Upwork & banking',
    priceUsd: 9.5,
    durationFa: '۱ ماهه اختصاصی',
    durationEn: '1 Month Dedicated ISP',
    regionFa: 'آمریکا (AT&T) / انگلیس (BT)',
    regionEn: 'USA & UK Home ISP',
    deliveryFa: 'تحویل آنی Socks5 / WireGuard / Vless',
    deliveryEn: 'Instant WireGuard / Vless',
    badgeFa: 'Fraud Score: 0%',
    badgeEn: 'True Residential ISP',
    accentColor: '#10B981',
    iconType: 'vpn',
    keywords: 'آی پی مسکونی پی پال فریلنسینگ residential ip paypal upwork',
    popularPackagesFa: ['آی‌پی مسکونی آمریکا ($9.50)', 'آی‌پی مسکونی انگلیس ($9.50)', 'آی‌پی مسکونی آلمان'],
  },
  {
    id: 'modasr-family-router',
    slug: 'modasr-unlimited-family-router',
    category: 'vpn',
    categoryLabelFa: 'اتصال و آی‌پی ثابت',
    categoryLabelEn: 'VPN & Static IP',
    platformBrand: 'MODASR Network',
    titleFa: 'اشتراک خانواده و روتر MODASR Unlimited (۸ دستگاه همزمان)',
    titleEn: 'MODASR Family & Router Unlimited Plan (8 Devices)',
    subtitleFa: 'مناسب ست کردن روی مودم‌های Asus/OpenWRT، کنسول‌های بازی PS5/Xbox برای کاهش پینگ و استفاده همزمان تمام اعضای خانواده',
    subtitleEn: 'Engineered for OpenWRT/Asus routers, PS5/Xbox NAT Type 2 gaming & 8 family devices',
    priceUsd: 12,
    durationFa: '۱ ماهه — ۳۵۰ گیگابایت (۸ کاربره)',
    durationEn: '1 Month — 350 GB (8 Users)',
    regionFa: 'لوکیشن گیمینگ + استریم',
    regionEn: 'Gaming & Streaming Nodes',
    deliveryFa: 'تحویل آنی پنل مدیریت خانواده',
    deliveryEn: 'Instant Multi-Device Link',
    badgeFa: 'مخصوص مودم و کنسول',
    badgeEn: 'Router & Console Ready',
    accentColor: '#10B981',
    iconType: 'vpn',
    keywords: 'اشتراک خانواده مودم روتر کنسول گیمینگ پینگ router vpn gaming',
    popularPackagesFa: ['۱ ماهه ۳۵۰ گیگ ۸ کاربره ($12.00)', '۳ ماهه ۱ ترابایت خانواده ($29.99)'],
  },
];

export const INITIAL_DEMO_ORDER: ModasrOrder = {
  orderNumber: 'MDS-84920',
  email: 'client@modasr.pro',
  idempotencyKey: 'idem_modasr_84920_verified',
  items: [
    { product: MODASR_PRODUCTS[0], quantity: 1 },
    {
      product:
        MODASR_PRODUCTS.find((p) => p.id === 'modasr-connect') ??
        MODASR_PRODUCTS[0],
      quantity: 1,
    },
  ],
  usdtRateToman: 68450,
  subtotalUsd: 24.5,
  discountUsd: 0,
  totalUsd: 24.5,
  totalToman: Math.round(24.5 * 68450),
  statusFa: 'در انتظار هماهنگی پرداخت (ثبت‌شده روی سرور)',
  statusEn: 'Awaiting Payment Coordination (Server Verified)',
  createdAt: '۱۴۰۵/۰۸/۰۳ — ۲۰:۴۵',
  events: [
    {
      id: 'ev-1',
      titleFa: 'ثبت سفارش با کلید یکتا (Idempotency)',
      titleEn: 'Order Created with Unique Idempotency Key',
      detailFa: 'سفارش بدون تکرار در دیتابیس ثبت شد و کلید یکتای idem_modasr_84920_verified تخصیص یافت.',
      detailEn: 'Order recorded in database with unique key idem_modasr_84920_verified.',
      timestamp: '۲۰:۴۵:۱۲',
      actor: 'MODASR Core Engine',
      status: 'completed',
    },
    {
      id: 'ev-2',
      titleFa: 'اعتبارسنجی قیمت از سرور و نرخ لحظه‌ای Wallex',
      titleEn: 'Server-Side Price & Wallex USDT Rate Locked',
      detailFa: 'جمع سفارش (۲۴.۵ دلار ≈ ۱,۶۷۷,۰۲۵ تومان) مستقیماً از کاتالوگ سرور محاسبه و قفل شد.',
      detailEn: 'Order total ($24.50) validated strictly against server catalog prices.',
      timestamp: '۲۰:۴۵:۱۳',
      actor: 'Price Guard Validator',
      status: 'completed',
    },
    {
      id: 'ev-3',
      titleFa: 'آماده هماهنگی پرداخت دستی با پشتیبانی',
      titleEn: 'Ready for Manual Payment Coordination',
      detailFa: 'تا زمان فعال‌سازی درگاه بانکی، وضعیت سفارش صادقانه در حالت پرداخت‌نشده باقی می‌ماند.',
      detailEn: 'Order honestly remains unpaid until verified via @modasrpanel support.',
      timestamp: '۲۰:۴۶:۰۰',
      actor: 'Support Desk (@modasrpanel)',
      status: 'active',
    },
  ],
};

export function convertUsdToToman(usd: number, rateToman: number): number {
  return Math.round(usd * rateToman);
}

export function formatToman(amount: number, lang: 'fa' | 'en'): string {
  if (lang === 'fa') {
    return `${amount.toLocaleString('fa-IR')} تومان`;
  }
  return `${amount.toLocaleString('en-US')} IRT`;
}

export function calculateCartSummary(
  items: Array<{ product: ModasrProduct; quantity: number }>,
  discountCode: string,
  usdtRateToman: number
): {
  subtotalUsd: number;
  discountUsd: number;
  totalUsd: number;
  totalToman: number;
  discountApplied: boolean;
} {
  const subtotalUsd = Number(
    items.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0).toFixed(2)
  );
  const normalizedCode = discountCode.trim().toUpperCase();
  const discountApplied =
    normalizedCode === 'MODASR10' || normalizedCode === 'VIP20';
  const discountRate =
    normalizedCode === 'VIP20' ? 0.2 : normalizedCode === 'MODASR10' ? 0.1 : 0;
  const discountUsd = Number((subtotalUsd * discountRate).toFixed(2));
  const totalUsd = Number(Math.max(0, subtotalUsd - discountUsd).toFixed(2));
  const totalToman = convertUsdToToman(totalUsd, usdtRateToman);

  return {
    subtotalUsd,
    discountUsd,
    totalUsd,
    totalToman,
    discountApplied,
  };
}

export function getCategoryCounts(
  products: ModasrProduct[] = MODASR_PRODUCTS
): Record<ProductCategory, number> {
  const counts: Record<ProductCategory, number> = {
    all: products.length,
    ai: 0,
    ingame: 0,
    gaming: 0,
    subscriptions: 0,
    vpn: 0,
  };
  for (const p of products) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}

export function filterModasrProducts(
  products: ModasrProduct[],
  category: ProductCategory,
  query: string,
  brandFilter: string = 'all'
): ModasrProduct[] {
  const q = query.trim().toLowerCase();
  const bf = brandFilter.trim().toLowerCase();

  return products.filter((p) => {
    const matchesCat = category === 'all' || p.category === category;
    if (!matchesCat) return false;

    if (bf && bf !== 'all') {
      const hayBrand = `${p.platformBrand} ${p.id} ${p.keywords ?? ''}`.toLowerCase();
      if (!hayBrand.includes(bf)) return false;
    }

    if (!q) return true;
    return (
      p.titleFa.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.subtitleFa.toLowerCase().includes(q) ||
      p.subtitleEn.toLowerCase().includes(q) ||
      p.categoryLabelFa.toLowerCase().includes(q) ||
      p.platformBrand.toLowerCase().includes(q) ||
      (p.keywords ? p.keywords.toLowerCase().includes(q) : false)
    );
  });
}

export interface HomeCategorySection {
  id: string;
  kickerFa: string;
  kickerEn: string;
  titleFa: string;
  titleEn: string;
  targetPage: 'ai' | 'games' | 'web' | 'search';
  targetCategory: ProductCategory;
  accentColor: string;
  products: ModasrProduct[];
}

export const POPULAR_HOME_HASHTAGS: Array<{
  id: string;
  labelFa: string;
  labelEn: string;
  productId: string;
  category: ProductCategory;
}> = [
  {
    id: 'tag-telegram',
    labelFa: '#تلگرام پرمیوم',
    labelEn: '#Telegram Premium',
    productId: 'telegram-premium-3m',
    category: 'subscriptions',
  },
  {
    id: 'tag-spotify',
    labelFa: '#اکانت اسپاتیفای',
    labelEn: '#Spotify Premium',
    productId: 'spotify-premium',
    category: 'subscriptions',
  },
  {
    id: 'tag-chatgpt',
    labelFa: '#چت جی پی تی',
    labelEn: '#ChatGPT Plus',
    productId: 'chatgpt-plus',
    category: 'ai',
  },
  {
    id: 'tag-gemini',
    labelFa: '#جمینای پرو',
    labelEn: '#Gemini Pro',
    productId: 'gemini-advanced',
    category: 'ai',
  },
  {
    id: 'tag-duolingo',
    labelFa: '#دولینگو',
    labelEn: '#Duolingo Super',
    productId: 'duolingo-super',
    category: 'subscriptions',
  },
  {
    id: 'tag-static-ip',
    labelFa: '#آی‌پی ثابت و وی‌پی‌ان',
    labelEn: '#Static IP & VPN',
    productId: 'modasr-connect',
    category: 'vpn',
  },
  {
    id: 'tag-youtube',
    labelFa: '#یوتیوب پرمیوم',
    labelEn: '#YouTube Premium',
    productId: 'youtube-premium',
    category: 'subscriptions',
  },
  {
    id: 'tag-netflix',
    labelFa: '#نتفلیکس',
    labelEn: '#Netflix 4K',
    productId: 'netflix-premium',
    category: 'subscriptions',
  },
  {
    id: 'tag-steam',
    labelFa: '#گیفت کارت استیم',
    labelEn: '#Steam Gift Card',
    productId: 'steam-wallet-20',
    category: 'gaming',
  },
  {
    id: 'tag-codm',
    labelFa: '#سی‌پی کالاف دیوتی',
    labelEn: '#Call of Duty CP',
    productId: 'codm-cp-880',
    category: 'ingame',
  },
  {
    id: 'tag-pubg',
    labelFa: '#یوسی پابجی',
    labelEn: '#PUBG Mobile UC',
    productId: 'pubg-uc-660',
    category: 'ingame',
  },
  {
    id: 'tag-apple-id',
    labelFa: '#اپل آیدی',
    labelEn: '#Verified Apple ID',
    productId: 'apple-id-verified',
    category: 'subscriptions',
  },
];

export function getHomeCategorizedSections(
  products: ModasrProduct[] = MODASR_PRODUCTS
): HomeCategorySection[] {
  const byId = (ids: string[]) =>
    ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is ModasrProduct => Boolean(p));

  const aiProducts = byId([
    'chatgpt-plus',
    'claude-pro',
    'gemini-advanced',
    'cursor-pro',
    'midjourney-pro',
    'perplexity-pro',
    'github-copilot',
    'elevenlabs-creator',
    'suno-runway-ai',
  ]);
  const telegramAndSocialProducts = byId([
    'telegram-premium-3m',
    'apple-id-verified',
    'google-play-android-pro',
    'windows-microsoft-365-pro',
    'discord-nitro',
    'linkedin-premium',
    'duolingo-super',
    'youtube-premium',
  ]);
  const giftCardProducts = byId([
    'ps5-fc25-capacity',
    'ps5-bo6-capacity',
    'gaming-console-ps5-xbox',
    'gaming-controller-dualsense',
    'gaming-controller-xbox-windows',
    'gaming-controller-mobile-iphone-android',
    'playstation-plus-extra',
    'xbox-gamepass-ultimate',
    'steam-wallet-20',
    'playstation-store-25',
    'ps5-gta-rdr-capacity',
    'ps5-exclusives-capacity',
    'riot-valorant-points',
    'razer-gold-20',
    'nintendo-eshop-20',
    'battlenet-balance-20',
    'roblox-robux-800',
  ]);
  const ingameProducts = byId([
    'codm-cp-880',
    'clash-royale-pass',
    'pubg-uc-660',
    'freefire-diamonds-1080',
    'brawl-stars-pass',
    'genshin-welkin-crystals',
    'mobile-legends-diamonds',
    'fc-mobile-points',
  ]);
  const musicAndVideoProducts = byId([
    'spotify-premium',
    'youtube-premium',
    'netflix-premium',
    'suno-runway-ai',
    'elevenlabs-creator',
    'duolingo-super',
  ]);
  const graphicsAndVpnProducts = byId([
    'adobe-creative-cloud',
    'canva-pro',
    'midjourney-pro',
    'tradingview-essential',
    'modasr-connect',
    'modasr-vps-trading',
    'express-nord-premium',
    'residential-static-ip',
    'modasr-family-router',
  ]);

  return [
    {
      id: 'ai-services',
      kickerFa: 'یک قدم جلو باش · انتخاب پنل و API',
      kickerEn: 'STAY ONE STEP AHEAD',
      titleFa: 'خدمات هوش مصنوعی',
      titleEn: 'Artificial Intelligence Services',
      targetPage: 'ai',
      targetCategory: 'ai',
      accentColor: '#2DD4BF',
      products: aiProducts,
    },
    {
      id: 'telegram-social',
      kickerFa: 'تلگرام پرمیوم · اپل آیدی آیفون · گوگل پلی اندروید · ویندوز ۱۱',
      kickerEn: 'TELEGRAM, IPHONE APPLE ID, ANDROID GOOGLE PLAY & WINDOWS',
      titleFa: 'اپ‌ها، تلگرام، آیفون، اندروید و ویندوز',
      titleEn: 'Telegram, iPhone, Android & Windows Apps',
      targetPage: 'web',
      targetCategory: 'subscriptions',
      accentColor: '#38BDF8',
      products: telegramAndSocialProducts,
    },
    {
      id: 'gift-cards',
      kickerFa: 'اکانت ظرفیتی · دسته‌های ویندوز/موبایل/کنسول · گیفت‌کارت گیم',
      kickerEn: 'CAPACITY ACCOUNTS, CONTROLLERS & GAMING GIFT CARDS',
      titleFa: 'اکانت ظرفیتی، دسته‌های بازی و گیفت‌کارت گیم',
      titleEn: 'Capacity Accounts, Controllers & Gift Cards',
      targetPage: 'games',
      targetCategory: 'gaming',
      accentColor: '#F43F5E',
      products: giftCardProducts,
    },
    {
      id: 'ingame-coins',
      kickerFa: 'شارژ فوری با آیدی و اکانت (اندروید و آیفون)',
      kickerEn: 'MOBILE GAMES & TOP-UPS (ANDROID & IPHONE)',
      titleFa: 'بازی‌های موبایلی (اندروید و آیفون)',
      titleEn: 'Mobile Games (Android & iPhone CP / UC)',
      targetPage: 'games',
      targetCategory: 'ingame',
      accentColor: '#F59E0B',
      products: ingameProducts,
    },
    {
      id: 'music-video',
      kickerFa: 'محبوب‌ترین خدمات مدثر',
      kickerEn: 'STREAMING & AUDIO',
      titleFa: 'مرتبط با موسیقی و ویدیو',
      titleEn: 'Music & Video Streaming Services',
      targetPage: 'web',
      targetCategory: 'subscriptions',
      accentColor: '#10B981',
      products: musicAndVideoProducts,
    },
    {
      id: 'graphics-vpn',
      kickerFa: 'محبوب‌ترین خدمات مدثر',
      kickerEn: 'DESIGN, TRADING & STATIC IP',
      titleFa: 'مرتبط با گرافیک، ترید و آی‌پی ثابت',
      titleEn: 'Graphics, Trading & Static IP Services',
      targetPage: 'web',
      targetCategory: 'vpn',
      accentColor: '#A855F7',
      products: graphicsAndVpnProducts,
    },
  ];
}

export type GamingDeviceFilter =
  | 'all'
  | 'ps5'
  | 'xbox'
  | 'windows'
  | 'android'
  | 'iphone'
  | 'pc'
  | 'mobile'
  | 'devices'
  | 'switch';

export type GamingSubCategoryFilter =
  | 'all'
  | 'capacity'
  | 'devices'
  | 'ingame'
  | 'subs-gifts';

export interface GamingHubSection {
  id: string;
  kickerFa: string;
  kickerEn: string;
  titleFa: string;
  titleEn: string;
  subCategory: Exclude<GamingSubCategoryFilter, 'all'>;
  accentColor: string;
  products: ModasrProduct[];
}

export type AppPlatformFilter =
  | 'all'
  | 'windows'
  | 'android'
  | 'iphone'
  | 'xbox'
  | 'ps5'
  | 'controllers';

export type AppSubCategoryFilter =
  | 'all'
  | 'platform-apps'
  | 'controllers'
  | 'vpn'
  | 'streaming';

export interface AppHubSection {
  id: string;
  kickerFa: string;
  kickerEn: string;
  titleFa: string;
  titleEn: string;
  subCategory: Exclude<AppSubCategoryFilter, 'all'>;
  accentColor: string;
  products: ModasrProduct[];
}

const CAPACITY_ACCOUNT_IDS = new Set([
  'ps5-fc25-capacity',
  'ps5-bo6-capacity',
  'ps5-gta-rdr-capacity',
  'ps5-exclusives-capacity',
  'ps5-elden-wukong-capacity',
]);

const GAMING_DEVICE_IDS = new Set([
  'gaming-console-ps5-xbox',
  'gaming-controller-dualsense',
  'gaming-controller-xbox-windows',
  'gaming-controller-mobile-iphone-android',
  'gaming-headset-gear',
  'gaming-ping-dns-pro',
]);

const CONTROLLER_PRODUCT_IDS = new Set([
  'gaming-controller-dualsense',
  'gaming-controller-xbox-windows',
  'gaming-controller-mobile-iphone-android',
]);

export function isCapacityAccountProduct(product: ModasrProduct): boolean {
  return CAPACITY_ACCOUNT_IDS.has(product.id);
}

export function isGamingDeviceProduct(product: ModasrProduct): boolean {
  return GAMING_DEVICE_IDS.has(product.id);
}

export function isControllerProduct(product: ModasrProduct): boolean {
  return CONTROLLER_PRODUCT_IDS.has(product.id);
}

export function getGamingHubSections(
  products: ModasrProduct[] = MODASR_PRODUCTS
): GamingHubSection[] {
  const byId = (ids: string[]) =>
    ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is ModasrProduct => Boolean(p));

  return [
    {
      id: 'capacity-accounts',
      kickerFa: 'ظرفیت ۱ آفلاین · ظرفیت ۲ پرایمری · ظرفیت ۳ سوییچ · هوم ایکس‌باکس',
      kickerEn: 'PS5 / PS4 CAPACITY 1, 2, 3 & XBOX HOME ACCOUNTS',
      titleFa: 'فروش اکانت ظرفیتی و قانونی کنسول (PS5 / PS4 / Xbox)',
      titleEn: 'Console Capacity Accounts (PS5 / PS4 / Xbox)',
      subCategory: 'capacity',
      accentColor: '#10B981',
      products: byId([
        'ps5-fc25-capacity',
        'ps5-bo6-capacity',
        'ps5-gta-rdr-capacity',
        'ps5-exclusives-capacity',
        'ps5-elden-wukong-capacity',
        'playstation-plus-extra',
        'xbox-gamepass-ultimate',
      ]),
    },
    {
      id: 'gaming-devices',
      kickerFa: 'دسته پلی‌استیشن · دسته ایکس‌باکس و ویندوز · دسته موبایل آیفون و اندروید · کنسول',
      kickerEn: 'PS5, XBOX, WINDOWS, IPHONE & ANDROID CONTROLLERS & CONSOLES',
      titleFa: 'دسته‌های بازی (ویندوز، اندروید، آیفون، ایکس‌باکس و PS5) و کنسول‌ها',
      titleEn: 'Controllers (Windows, Android, iPhone, Xbox, PS5) & Consoles',
      subCategory: 'devices',
      accentColor: '#8B5CF6',
      products: byId([
        'gaming-controller-dualsense',
        'gaming-controller-xbox-windows',
        'gaming-controller-mobile-iphone-android',
        'gaming-console-ps5-xbox',
        'gaming-headset-gear',
        'gaming-ping-dns-pro',
      ]),
    },
    {
      id: 'mobile-ingame',
      kickerFa: 'واریز آنی با آیدی و اکانت · مخصوص اندروید و آیفون',
      kickerEn: 'INSTANT UID TOP-UP · ANDROID & IPHONE GAMES',
      titleFa: 'شارژ فوری بازی‌های اندروید و آیفون (سی‌پی، یوسی و جم)',
      titleEn: 'Android & iPhone Mobile Games Top-Up (CP, UC & Gems)',
      subCategory: 'ingame',
      accentColor: '#F59E0B',
      products: byId([
        'codm-cp-880',
        'clash-royale-pass',
        'pubg-uc-660',
        'freefire-diamonds-1080',
        'brawl-stars-pass',
        'genshin-welkin-crystals',
        'mobile-legends-diamonds',
        'fc-mobile-points',
      ]),
    },
    {
      id: 'console-subs-giftcards',
      kickerFa: 'پلی‌استیشن · ایکس‌باکس · ویندوز (استیم / بتل‌نت / ولورانت)',
      kickerEn: 'PLAYSTATION, XBOX & WINDOWS PC GAMING GIFT CARDS',
      titleFa: 'اشتراک‌ها و گیفت‌کارت‌های پلی‌استیشن، ایکس‌باکس و ویندوز',
      titleEn: 'PlayStation, Xbox & Windows PC Subscriptions & Gift Cards',
      subCategory: 'subs-gifts',
      accentColor: '#F43F5E',
      products: byId([
        'playstation-plus-extra',
        'xbox-gamepass-ultimate',
        'steam-wallet-20',
        'playstation-store-25',
        'riot-valorant-points',
        'battlenet-balance-20',
        'razer-gold-20',
        'nintendo-eshop-20',
        'roblox-robux-800',
      ]),
    },
  ];
}

export function filterGamingHubProducts(
  products: ModasrProduct[] = MODASR_PRODUCTS,
  subCategory: GamingSubCategoryFilter = 'all',
  deviceFilter: GamingDeviceFilter = 'all',
  searchQuery: string = ''
): ModasrProduct[] {
  const q = searchQuery.trim().toLowerCase();

  // Strictly restrict to pure gaming categories ('gaming' and 'ingame')
  const pureGaming = products.filter(
    (p) => p.category === 'gaming' || p.category === 'ingame'
  );

  return pureGaming.filter((p) => {
    // 1. SubCategory check
    if (subCategory === 'capacity') {
      if (
        !isCapacityAccountProduct(p) &&
        p.id !== 'playstation-plus-extra' &&
        p.id !== 'xbox-gamepass-ultimate'
      ) {
        return false;
      }
    } else if (subCategory === 'devices') {
      if (!isGamingDeviceProduct(p)) return false;
    } else if (subCategory === 'ingame') {
      if (p.category !== 'ingame') return false;
    } else if (subCategory === 'subs-gifts') {
      if (
        p.category !== 'gaming' ||
        isCapacityAccountProduct(p) ||
        isGamingDeviceProduct(p)
      ) {
        return false;
      }
    }

    // 2. Device / Platform check (ps5, xbox, windows/pc, android, iphone, mobile, devices, switch)
    const hay = `${p.id} ${p.platformBrand} ${p.titleFa} ${p.titleEn} ${
      p.keywords ?? ''
    }`.toLowerCase();

    if (deviceFilter === 'ps5') {
      if (
        !hay.includes('ps5') &&
        !hay.includes('psn') &&
        !hay.includes('playstation') &&
        !hay.includes('پلی‌استیشن') &&
        !hay.includes('پلی استیشن')
      ) {
        return false;
      }
    } else if (deviceFilter === 'xbox') {
      if (
        !hay.includes('xbox') &&
        !hay.includes('ایکس‌باکس') &&
        !hay.includes('ایکس باکس')
      ) {
        return false;
      }
    } else if (deviceFilter === 'windows' || deviceFilter === 'pc') {
      if (
        !hay.includes('steam') &&
        !hay.includes('battle.net') &&
        !hay.includes('riot') &&
        !hay.includes('valorant') &&
        !hay.includes('roblox') &&
        !hay.includes('razer') &&
        !hay.includes('exitlag') &&
        !hay.includes('windows') &&
        !hay.includes('ویندوز') &&
        !hay.includes('pc') &&
        p.id !== 'xbox-gamepass-ultimate'
      ) {
        return false;
      }
    } else if (deviceFilter === 'android') {
      if (
        p.category !== 'ingame' &&
        p.id !== 'gaming-controller-mobile-iphone-android' &&
        p.id !== 'gaming-controller-dualsense' &&
        p.id !== 'gaming-controller-xbox-windows' &&
        p.id !== 'razer-gold-20' &&
        p.id !== 'roblox-robux-800' &&
        p.id !== 'gaming-ping-dns-pro'
      ) {
        return false;
      }
    } else if (deviceFilter === 'iphone') {
      if (
        p.category !== 'ingame' &&
        p.id !== 'gaming-controller-mobile-iphone-android' &&
        p.id !== 'gaming-controller-dualsense' &&
        p.id !== 'gaming-controller-xbox-windows' &&
        p.id !== 'roblox-robux-800' &&
        p.id !== 'gaming-ping-dns-pro'
      ) {
        return false;
      }
    } else if (deviceFilter === 'mobile') {
      if (
        p.category !== 'ingame' &&
        p.id !== 'gaming-controller-mobile-iphone-android' &&
        p.id !== 'razer-gold-20' &&
        p.id !== 'roblox-robux-800'
      ) {
        return false;
      }
    } else if (deviceFilter === 'devices') {
      if (!isGamingDeviceProduct(p)) {
        return false;
      }
    } else if (deviceFilter === 'switch') {
      if (!hay.includes('nintendo') && !hay.includes('switch') && !hay.includes('نینتندو')) {
        return false;
      }
    }

    // 3. Search query check
    if (!q) return true;
    return (
      p.titleFa.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.subtitleFa.toLowerCase().includes(q) ||
      p.subtitleEn.toLowerCase().includes(q) ||
      p.platformBrand.toLowerCase().includes(q) ||
      (p.keywords ? p.keywords.toLowerCase().includes(q) : false)
    );
  });
}

export function getAppHubSections(
  products: ModasrProduct[] = MODASR_PRODUCTS
): AppHubSection[] {
  const byId = (ids: string[]) =>
    ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is ModasrProduct => Boolean(p));

  return [
    {
      id: 'platform-os-apps',
      kickerFa: 'آیفون (Apple ID) · اندروید (Google Play) · ویندوز ۱۱ · تلگرام پرمیوم',
      kickerEn: 'IPHONE IOS, ANDROID GOOGLE PLAY, WINDOWS 11 & TELEGRAM PRO',
      titleFa: 'اپ‌ها و اکانت‌های ویندوز، اندروید و آیفون',
      titleEn: 'Windows, Android & iPhone Official Apps & Accounts',
      subCategory: 'platform-apps',
      accentColor: '#38BDF8',
      products: byId([
        'apple-id-verified',
        'google-play-android-pro',
        'windows-microsoft-365-pro',
        'telegram-premium-3m',
        'discord-nitro',
        'duolingo-super',
        'linkedin-premium',
        'adobe-creative-cloud',
      ]),
    },
    {
      id: 'multiplatform-controllers',
      kickerFa: 'دسته‌های مخصوص ویندوز، اندروید، آیفون، ایکس‌باکس و پلی‌استیشن',
      kickerEn: 'WINDOWS, ANDROID, IPHONE, XBOX & PLAYSTATION CONTROLLERS',
      titleFa: 'دسته‌های بازی و کنترلرهای ویندوز، اندروید، آیفون، ایکس‌باکس و PS5',
      titleEn: 'Gamepads & Controllers for Windows, Android, iPhone, Xbox & PS5',
      subCategory: 'controllers',
      accentColor: '#8B5CF6',
      products: byId([
        'gaming-controller-mobile-iphone-android',
        'gaming-controller-xbox-windows',
        'gaming-controller-dualsense',
        'gaming-headset-gear',
      ]),
    },
    {
      id: 'vpn-static-ip-dns',
      kickerFa: 'آی‌پی ثابت و تحریم‌شکن مخصوص ویندوز، اندروید، آیفون، ایکس‌باکس و PS5',
      kickerEn: 'STATIC IP, VPN & DNS FOR WINDOWS, ANDROID, IPHONE, XBOX & PS5',
      titleFa: 'اتصال پایدار، آی‌پی ثابت و DNS (همه پلتفرم‌ها)',
      titleEn: 'VPN, Dedicated Static IP & Console/App DNS',
      subCategory: 'vpn',
      accentColor: '#10B981',
      products: byId([
        'modasr-connect',
        'modasr-vps-trading',
        'express-nord-premium',
        'residential-static-ip',
        'modasr-family-router',
        'gaming-ping-dns-pro',
      ]),
    },
    {
      id: 'streaming-design-apps',
      kickerFa: 'اسپاتیفای · یوتیوب پرمیوم · نتفلیکس 4K · کانوا · تریدینگ‌ویو',
      kickerEn: 'SPOTIFY, YOUTUBE, NETFLIX 4K, CANVA & TRADINGVIEW',
      titleFa: 'اشتراک‌های پرمیوم فیلم، موزیک، طراحی و ترید',
      titleEn: 'Streaming, Music, Design & Trading Pro Apps',
      subCategory: 'streaming',
      accentColor: '#EC4899',
      products: byId([
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
        'canva-pro',
        'adobe-creative-cloud',
        'tradingview-essential',
      ]),
    },
  ];
}

export function filterAppHubProducts(
  products: ModasrProduct[] = MODASR_PRODUCTS,
  subCategory: AppSubCategoryFilter = 'all',
  platformFilter: AppPlatformFilter = 'all',
  searchQuery: string = ''
): ModasrProduct[] {
  const q = searchQuery.trim().toLowerCase();

  // App Hub includes subscriptions, vpn, and multi-platform controllers/DNS/console-subscriptions
  const appHubPool = products.filter(
    (p) =>
      p.category === 'subscriptions' ||
      p.category === 'vpn' ||
      isControllerProduct(p) ||
      p.id === 'gaming-headset-gear' ||
      p.id === 'gaming-ping-dns-pro' ||
      p.id === 'playstation-plus-extra' ||
      p.id === 'xbox-gamepass-ultimate' ||
      p.id === 'playstation-store-25'
  );

  return appHubPool.filter((p) => {
    // 1. SubCategory check
    if (subCategory === 'platform-apps') {
      if (
        p.category !== 'subscriptions' &&
        p.id !== 'playstation-plus-extra' &&
        p.id !== 'xbox-gamepass-ultimate'
      ) {
        return false;
      }
    } else if (subCategory === 'controllers') {
      if (!isControllerProduct(p) && p.id !== 'gaming-headset-gear') {
        return false;
      }
    } else if (subCategory === 'vpn') {
      if (p.category !== 'vpn' && p.id !== 'gaming-ping-dns-pro') {
        return false;
      }
    } else if (subCategory === 'streaming') {
      const streamingIds = new Set([
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
        'canva-pro',
        'adobe-creative-cloud',
        'tradingview-essential',
        'discord-nitro',
      ]);
      if (!streamingIds.has(p.id)) {
        return false;
      }
    }

    // 2. Platform check ('windows', 'android', 'iphone', 'xbox', 'ps5', 'controllers')
    if (platformFilter === 'windows') {
      const winIds = new Set([
        'windows-microsoft-365-pro',
        'gaming-controller-xbox-windows',
        'gaming-controller-dualsense',
        'adobe-creative-cloud',
        'canva-pro',
        'tradingview-essential',
        'discord-nitro',
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
        'telegram-premium-3m',
        'linkedin-premium',
        'modasr-connect',
        'modasr-vps-trading',
        'express-nord-premium',
        'residential-static-ip',
        'gaming-ping-dns-pro',
        'xbox-gamepass-ultimate',
      ]);
      if (!winIds.has(p.id)) return false;
    } else if (platformFilter === 'android') {
      const androidIds = new Set([
        'google-play-android-pro',
        'gaming-controller-mobile-iphone-android',
        'gaming-controller-xbox-windows',
        'gaming-controller-dualsense',
        'telegram-premium-3m',
        'telegram-stars-500',
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
        'duolingo-super',
        'canva-pro',
        'discord-nitro',
        'modasr-connect',
        'express-nord-premium',
        'gaming-ping-dns-pro',
      ]);
      if (!androidIds.has(p.id)) return false;
    } else if (platformFilter === 'iphone') {
      const iphoneIds = new Set([
        'apple-id-verified',
        'gaming-controller-mobile-iphone-android',
        'gaming-controller-dualsense',
        'gaming-controller-xbox-windows',
        'telegram-premium-3m',
        'telegram-stars-500',
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
        'duolingo-super',
        'canva-pro',
        'discord-nitro',
        'modasr-connect',
        'express-nord-premium',
        'residential-static-ip',
      ]);
      if (!iphoneIds.has(p.id)) return false;
    } else if (platformFilter === 'xbox') {
      const xboxAppIds = new Set([
        'gaming-controller-xbox-windows',
        'xbox-gamepass-ultimate',
        'gaming-ping-dns-pro',
        'modasr-family-router',
        'discord-nitro',
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
      ]);
      if (!xboxAppIds.has(p.id)) return false;
    } else if (platformFilter === 'ps5') {
      const ps5AppIds = new Set([
        'gaming-controller-dualsense',
        'gaming-headset-gear',
        'playstation-plus-extra',
        'playstation-store-25',
        'gaming-ping-dns-pro',
        'modasr-family-router',
        'discord-nitro',
        'spotify-premium',
        'youtube-premium',
        'netflix-premium',
      ]);
      if (!ps5AppIds.has(p.id)) return false;
    } else if (platformFilter === 'controllers') {
      if (!isControllerProduct(p) && p.id !== 'gaming-headset-gear') {
        return false;
      }
    }

    // 3. Search query
    if (!q) return true;
    return (
      p.titleFa.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.subtitleFa.toLowerCase().includes(q) ||
      p.subtitleEn.toLowerCase().includes(q) ||
      p.platformBrand.toLowerCase().includes(q) ||
      (p.keywords ? p.keywords.toLowerCase().includes(q) : false)
    );
  });
}

export type ProductPackageColorTheme =
  | 'purple'
  | 'blue'
  | 'green'
  | 'amber'
  | 'rose';

export interface ProductPackageOption {
  id: string;
  purchaseTypeId?: string;
  titleFa: string;
  titleEn: string;
  priceUsd: number;
  fixedTomanPrice?: number;
  originalTomanPrice?: number;
  discountPercent?: number;
  deliveryMethodFa: string;
  deliveryMethodEn: string;
  warrantyFa: string;
  warrantyEn: string;
  deliveryTimeFa: string;
  deliveryTimeEn: string;
  descriptionFa: string;
  descriptionEn: string;
  colorTheme: ProductPackageColorTheme;
  badgeFa?: string;
  badgeEn?: string;
  thumbTopText?: string;
  thumbMainText?: string;
  thumbSubText?: string;
}

export interface ProductPurchaseType {
  id: string;
  titleFa: string;
  titleEn: string;
  startingPriceToman: number;
  startingPriceUsd: number;
  packages: ProductPackageOption[];
}

export interface ProductCapabilityItem {
  id: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  iconKey:
    | 'mic'
    | 'volume'
    | 'share'
    | 'code'
    | 'sparkles'
    | 'shield'
    | 'zap'
    | 'globe'
    | 'layers'
    | 'cpu';
}

export interface ProductFaqItem {
  qFa: string;
  qEn: string;
  aFa: string;
  aEn: string;
}

const PACKAGE_COLOR_SEQUENCE: ProductPackageColorTheme[] = [
  'purple',
  'blue',
  'green',
  'amber',
  'rose',
];

/**
 * Returns clean Dicardo-style bilingual titles for unified parent product cards
 * (e.g., "سی پی کالاف دیوتی موبایل" / "Call of Duty Mobile").
 */
export function getDicardoCardTitles(product: ModasrProduct): {
  titleFa: string;
  titleEn: string;
  coverBadgeTop: string;
  coverBadgeMain: string;
  coverBadgeSub: string;
} {
  switch (product.id) {
    case 'ps5-fc25-capacity':
      return {
        titleFa: 'اکانت ظرفیتی FC 25',
        titleEn: 'EA Sports FC 25 PS5',
        coverBadgeTop: 'PS5 · PS4 · XBOX',
        coverBadgeMain: 'EA SPORTS FC 25',
        coverBadgeSub: 'CAPACITY 1 · 2 · 3',
      };
    case 'ps5-bo6-capacity':
      return {
        titleFa: 'اکانت ظرفیتی بلک آپس ۶',
        titleEn: 'Black Ops 6 Capacity',
        coverBadgeTop: 'PS5 · PS4 · XBOX',
        coverBadgeMain: 'BLACK OPS 6',
        coverBadgeSub: 'CAPACITY 1 · 2 · 3',
      };
    case 'ps5-gta-rdr-capacity':
      return {
        titleFa: 'اکانت ظرفیتی GTA V و RDR2',
        titleEn: 'GTA V & Red Dead 2',
        coverBadgeTop: 'ROCKSTAR PS5 / PS4',
        coverBadgeMain: 'GTA V & RDR 2',
        coverBadgeSub: '4K CAPACITY ACCOUNT',
      };
    case 'ps5-exclusives-capacity':
      return {
        titleFa: 'اکانت ظرفیتی انحصاری PS5',
        titleEn: 'PS5 Exclusives Capacity',
        coverBadgeTop: 'PLAYSTATION STUDIOS',
        coverBadgeMain: 'PS5 EXCLUSIVES',
        coverBadgeSub: 'SPIDER-MAN · GOW',
      };
    case 'ps5-elden-wukong-capacity':
      return {
        titleFa: 'اکانت ظرفیتی ووکانگ و الدن',
        titleEn: 'Wukong & Elden Ring',
        coverBadgeTop: 'PS5 · XBOX · STEAM',
        coverBadgeMain: 'WUKONG & ELDEN',
        coverBadgeSub: 'CAPACITY & STEAM',
      };
    case 'gaming-console-ps5-xbox':
      return {
        titleFa: 'کنسول PS5 Slim و Xbox',
        titleEn: 'PS5 Slim / Pro & Xbox',
        coverBadgeTop: 'GAMING CONSOLES',
        coverBadgeMain: 'PS5 & XBOX X|S',
        coverBadgeSub: 'HARDWARE + FULL GAME',
      };
    case 'gaming-controller-dualsense':
      return {
        titleFa: 'دسته بازی پلی‌استیشن PS5',
        titleEn: 'PS5 DualSense Controller',
        coverBadgeTop: 'PS5 · PC · IPHONE · ANDROID',
        coverBadgeMain: 'DUALSENSE PS5',
        coverBadgeSub: 'STANDARD & EDGE PRO',
      };
    case 'gaming-controller-xbox-windows':
      return {
        titleFa: 'دسته بازی ایکس‌باکس و ویندوز',
        titleEn: 'Xbox & Windows Controller',
        coverBadgeTop: 'XBOX SERIES X|S & WINDOWS',
        coverBadgeMain: 'XBOX CONTROLLER',
        coverBadgeSub: 'WIRELESS · ELITE 2 · DONGLE',
      };
    case 'gaming-controller-mobile-iphone-android':
      return {
        titleFa: 'دسته بازی آیفون و اندروید',
        titleEn: 'iPhone & Android Gamepad',
        coverBadgeTop: 'IPHONE IOS & ANDROID PRO',
        coverBadgeMain: 'BACKBONE & KISHI',
        coverBadgeSub: 'CODM · WARZONE · REMOTE PLAY',
      };
    case 'gaming-headset-gear':
      return {
        titleFa: 'هدست، شارژر و تجهیزات گیم',
        titleEn: 'Gaming Headset & SSD',
        coverBadgeTop: 'PRO GAMING GEAR',
        coverBadgeMain: 'PULSE 3D & SSD',
        coverBadgeSub: 'HEADSET · M.2 · DOCK',
      };
    case 'gaming-ping-dns-pro':
      return {
        titleFa: 'کاهش پینگ و DNS گیمینگ',
        titleEn: 'Gaming DNS & ExitLag',
        coverBadgeTop: 'LOW PING ROUTING',
        coverBadgeMain: 'EXITLAG & DNS',
        coverBadgeSub: 'PS5 · XBOX · PC',
      };
    case 'codm-cp-880':
    case 'codm-cp-2400':
      return {
        titleFa: 'سی پی کالاف دیوتی موبایل',
        titleEn: 'Call of Duty Mobile',
        coverBadgeTop: 'ACTIVISION OFFICIAL',
        coverBadgeMain: 'CALL OF DUTY',
        coverBadgeSub: 'MOBILE · CP & PASS',
      };
    case 'clash-royale-pass':
      return {
        titleFa: 'جم کلش رویال',
        titleEn: 'Clash Royal',
        coverBadgeTop: 'SUPERCELL STORE',
        coverBadgeMain: 'CLASH ROYALE',
        coverBadgeSub: 'GEMS & PASS',
      };
    case 'brawl-stars-pass':
      return {
        titleFa: 'جم و براول پس براول استارز',
        titleEn: 'Brawl Stars',
        coverBadgeTop: 'SUPERCELL OFFICIAL',
        coverBadgeMain: 'BRAWL STARS',
        coverBadgeSub: 'BRAWL PASS PLUS',
      };
    case 'pubg-uc-660':
    case 'pubg-uc-1800':
      return {
        titleFa: 'یوسی پابجی موبایل',
        titleEn: 'PUBG Mobile',
        coverBadgeTop: 'MIDASBUY OFFICIAL',
        coverBadgeMain: 'PUBG MOBILE',
        coverBadgeSub: 'UC & ROYALE PASS',
      };
    case 'freefire-diamonds-1080':
      return {
        titleFa: 'جم فری فایر گارنا',
        titleEn: 'Garena Free Fire',
        coverBadgeTop: 'GARENA OFFICIAL',
        coverBadgeMain: 'FREE FIRE',
        coverBadgeSub: 'DIAMONDS & PASS',
      };
    case 'genshin-welkin-crystals':
      return {
        titleFa: 'ولکین مون و کریستال گنشین',
        titleEn: 'Genshin Impact',
        coverBadgeTop: 'HOYOVERSE STORE',
        coverBadgeMain: 'GENSHIN IMPACT',
        coverBadgeSub: 'WELKIN & CRYSTALS',
      };
    case 'mobile-legends-diamonds':
      return {
        titleFa: 'جم موبایل لجندز',
        titleEn: 'Mobile Legends',
        coverBadgeTop: 'MOONTON OFFICIAL',
        coverBadgeMain: 'MOBILE LEGENDS',
        coverBadgeSub: 'DIAMONDS & WEEKLY',
      };
    case 'fc-mobile-points':
      return {
        titleFa: 'اف‌سی پوینت و استار پس',
        titleEn: 'EA Sports FC Mobile',
        coverBadgeTop: 'EA SPORTS OFFICIAL',
        coverBadgeMain: 'FC MOBILE 25',
        coverBadgeSub: 'POINTS & STAR PASS',
      };
    case 'chatgpt-plus':
    case 'chatgpt-pro-200':
      return {
        titleFa: 'اکانت و API چت جی‌پی‌تی',
        titleEn: 'ChatGPT Plus & OpenAI API',
        coverBadgeTop: 'OPENAI FRONTIER',
        coverBadgeMain: 'CHATGPT PLUS',
        coverBadgeSub: 'GPT-4o · o3 · API',
      };
    case 'claude-pro':
      return {
        titleFa: 'اشتراک کلود پرو',
        titleEn: 'Anthropic Claude Pro',
        coverBadgeTop: 'ANTHROPIC AI',
        coverBadgeMain: 'CLAUDE 3.7 PRO',
        coverBadgeSub: 'SONNET · CODING',
      };
    case 'cursor-pro':
      return {
        titleFa: 'اشتراک کرسر پرو',
        titleEn: 'Cursor AI Pro',
        coverBadgeTop: 'AI CODE EDITOR',
        coverBadgeMain: 'CURSOR PRO',
        coverBadgeSub: '500 FAST REQUESTS',
      };
    case 'gemini-advanced':
      return {
        titleFa: 'اشتراک جمینای ادونسد گوگل',
        titleEn: 'Google Gemini Advanced',
        coverBadgeTop: 'GOOGLE ONE AI',
        coverBadgeMain: 'GEMINI 2.5 PRO',
        coverBadgeSub: '+2TB CLOUD STORAGE',
      };
    case 'midjourney-pro':
      return {
        titleFa: 'اشتراک میدجرنی پرو',
        titleEn: 'Midjourney V6.1',
        coverBadgeTop: 'AI ART STUDIO',
        coverBadgeMain: 'MIDJOURNEY',
        coverBadgeSub: 'PRO & STANDARD',
      };
    case 'perplexity-pro':
      return {
        titleFa: 'اشتراک پرپلکسیتی پرو',
        titleEn: 'Perplexity AI Pro',
        coverBadgeTop: 'AI RESEARCH HUB',
        coverBadgeMain: 'PERPLEXITY PRO',
        coverBadgeSub: 'UNLIMITED SEARCH',
      };
    case 'github-copilot':
      return {
        titleFa: 'اشتراک گیت‌هاب کوپایلت',
        titleEn: 'GitHub Copilot Pro',
        coverBadgeTop: 'GITHUB OFFICIAL',
        coverBadgeMain: 'COPILOT PRO',
        coverBadgeSub: 'AI PAIR PROGRAMMER',
      };
    case 'elevenlabs-creator':
      return {
        titleFa: 'اشتراک الون‌لبز (صدا و دوبله)',
        titleEn: 'ElevenLabs Voice AI',
        coverBadgeTop: 'VOICE CLONING AI',
        coverBadgeMain: 'ELEVENLABS',
        coverBadgeSub: 'CREATOR & PRO',
      };
    case 'suno-runway-ai':
      return {
        titleFa: 'اشتراک سونو و ران‌وی AI',
        titleEn: 'Suno & Runway AI',
        coverBadgeTop: 'AI MUSIC & VIDEO',
        coverBadgeMain: 'SUNO AI PRO',
        coverBadgeSub: '2,500 CREDITS',
      };
    case 'steam-wallet-20':
    case 'steam-wallet-50':
      return {
        titleFa: 'گیفت کارت استیم والت',
        titleEn: 'Steam Wallet Gift Card',
        coverBadgeTop: 'VALVE STORE',
        coverBadgeMain: 'STEAM WALLET',
        coverBadgeSub: 'USA & GLOBAL CODE',
      };
    case 'playstation-store-25':
      return {
        titleFa: 'گیفت کارت پلی‌استیشن',
        titleEn: 'PlayStation Store PSN',
        coverBadgeTop: 'SONY PLAYSTATION',
        coverBadgeMain: 'PSN GIFT CARD',
        coverBadgeSub: 'US · UK · TR · UAE',
      };
    case 'playstation-plus-extra':
      return {
        titleFa: 'اشتراک پلی‌استیشن پلاس',
        titleEn: 'PlayStation Plus',
        coverBadgeTop: 'PS5 & PS4 CATALOG',
        coverBadgeMain: 'PS PLUS EXTRA',
        coverBadgeSub: 'ESSENTIAL · PREMIUM',
      };
    case 'xbox-gamepass-ultimate':
      return {
        titleFa: 'اشتراک ایکس‌باکس گیم‌پس',
        titleEn: 'Xbox Game Pass Ultimate',
        coverBadgeTop: 'MICROSOFT XBOX',
        coverBadgeMain: 'GAME PASS',
        coverBadgeSub: 'ULTIMATE & PC',
      };
    case 'razer-gold-20':
      return {
        titleFa: 'گیفت کارت ریزر گلد گلوبال',
        titleEn: 'Razer Gold Global Pin',
        coverBadgeTop: 'RAZER OFFICIAL',
        coverBadgeMain: 'RAZER GOLD',
        coverBadgeSub: 'GLOBAL GAME PIN',
      };
    case 'nintendo-eshop-20':
      return {
        titleFa: 'گیفت کارت نینتندو سوییچ',
        titleEn: 'Nintendo eShop Card',
        coverBadgeTop: 'NINTENDO SWITCH',
        coverBadgeMain: 'ESHOP CARD',
        coverBadgeSub: 'USA DIGITAL CODE',
      };
    case 'telegram-premium-3m':
    case 'telegram-stars-500':
      return {
        titleFa: 'تلگرام پرمیوم و استارز',
        titleEn: 'Telegram Premium & Stars',
        coverBadgeTop: 'TELEGRAM OFFICIAL',
        coverBadgeMain: 'TELEGRAM PRO',
        coverBadgeSub: 'PREMIUM & STARS',
      };
    case 'spotify-premium':
      return {
        titleFa: 'اشتراک اسپاتیفای پرمیوم',
        titleEn: 'Spotify Premium',
        coverBadgeTop: 'LOSSLESS MUSIC',
        coverBadgeMain: 'SPOTIFY PRO',
        coverBadgeSub: 'INDIVIDUAL & DUO',
      };
    case 'youtube-premium':
      return {
        titleFa: 'اشتراک یوتیوب پرمیوم',
        titleEn: 'YouTube Premium 4K',
        coverBadgeTop: 'GOOGLE YOUTUBE',
        coverBadgeMain: 'YOUTUBE PRO',
        coverBadgeSub: 'AD-FREE + MUSIC',
      };
    case 'netflix-premium':
      return {
        titleFa: 'اشتراک نتفلیکس اولترا 4K',
        titleEn: 'Netflix Ultra HD 4K',
        coverBadgeTop: 'CINEMA STREAMING',
        coverBadgeMain: 'NETFLIX 4K',
        coverBadgeSub: 'PRIVATE PROFILE',
      };
    case 'apple-id-verified':
      return {
        titleFa: 'اپل آیدی وریفای‌شده آیفون',
        titleEn: 'Verified iPhone Apple ID',
        coverBadgeTop: 'IPHONE · IPAD · MACOS',
        coverBadgeMain: 'APPLE ID USA',
        coverBadgeSub: 'VERIFIED & GIFT CARD',
      };
    case 'google-play-android-pro':
      return {
        titleFa: 'گوگل پلی و Play Pass اندروید',
        titleEn: 'Google Play & Android Pass',
        coverBadgeTop: 'GOOGLE ANDROID STORE',
        coverBadgeMain: 'GOOGLE PLAY',
        coverBadgeSub: 'GIFT CARD & PLAY PASS',
      };
    case 'windows-microsoft-365-pro':
      return {
        titleFa: 'ویندوز ۱۱ پرو و آفیس ۳۶۵',
        titleEn: 'Windows 11 Pro & Office 365',
        coverBadgeTop: 'MICROSOFT WINDOWS PC',
        coverBadgeMain: 'WINDOWS 11 PRO',
        coverBadgeSub: 'RETAIL KEY & M365',
      };
    default: {
      const cleanFa = product.titleFa.replace(/\s*\([^)]*\)/g, '').trim();
      const cleanEn = product.titleEn.replace(/\s*\([^)]*\)/g, '').trim();
      return {
        titleFa: cleanFa,
        titleEn: cleanEn,
        coverBadgeTop: product.platformBrand.toUpperCase(),
        coverBadgeMain: cleanEn.slice(0, 16).toUpperCase(),
        coverBadgeSub: product.categoryLabelEn.toUpperCase(),
      };
    }
  }
}

/**
 * Returns Dicardo-style Purchase Types ("برای تغییر نوع خرید یکی را انتخاب کنید")
 * with nested packages for any product in the catalog.
 */
export function getProductPurchaseTypes(
  product: ModasrProduct,
  usdtRate: number = DEFAULT_USDT_RATE_TOMAN
): ProductPurchaseType[] {
  const pickColor = (idx: number): ProductPackageColorTheme =>
    PACKAGE_COLOR_SEQUENCE[idx % PACKAGE_COLOR_SEQUENCE.length];

  // 0A. CONSOLE CAPACITY ACCOUNTS (PS5 / PS4 / XBOX: ظرفیت ۲ پرایمری، ظرفیت ۳ سوییچ، ظرفیت ۱ آفلاین، هوم ایکس‌باکس)
  if (isCapacityAccountProduct(product)) {
    const base = product.priceUsd;
    const cap2PrimaryUsd = Number((base * 1.45).toFixed(2));
    const cap2Ps4Usd = Number((base * 1.15).toFixed(2));
    const capFullUsd = Number((base * 2.35).toFixed(2));
    const cap3SwitchUsd = base;
    const cap3Ps4Usd = Number((base * 0.82).toFixed(2));
    const cap1OfflineUsd = Number(Math.max(5.5, base * 0.45).toFixed(2));
    const xboxHomeUsd = Number((base * 1.25).toFixed(2));

    const cap2Packages: ProductPackageOption[] = [
      {
        id: `${product.id}-cap2-ps5`,
        purchaseTypeId: 'cap-2-primary',
        titleFa: `ظرفیت ۲ (پرایمری) مخصوص PS5 — آنلاین و آفلاین روی اکانت شخصی`,
        titleEn: `PS5 Capacity 2 (Primary) — Online & Offline on Personal Profile`,
        priceUsd: cap2PrimaryUsd,
        discountPercent: 18,
        deliveryMethodFa: 'اکانت قانونی سونی + کد بکاپ',
        deliveryMethodEn: 'Official PSN Account + Backup Code',
        warrantyFa: 'مادام‌العمر + قابلیت فروش مجدد',
        warrantyEn: 'Lifetime + Resale Guarantee',
        deliveryTimeFa: 'فوری (۱۵ الی ۳۰ دقیقه)',
        deliveryTimeEn: '15 - 30 Mins',
        descriptionFa:
          'بهترین و کامل‌ترین ظرفیت پلی‌استیشن ۵: بازی را هم آنلاین و هم آفلاین مستقیماً داخل پروفایل شخصی خودتان اجرا می‌کنید، تروفی‌ها روی اکانت خودتان ثبت می‌شود و هر زمان بخواهید قابلیت فروش مجدد دارد.',
        descriptionEn:
          'Play both online and offline directly on your personal PS5 profile, earn trophies, and enjoy lifetime warranty with resale rights.',
        colorTheme: 'purple',
        badgeFa: 'پرفروش‌ترین ظرفیت (پیشنهاد ویژه)',
        badgeEn: 'Most Popular Capacity',
        thumbTopText: 'PS5 PRIMARY',
        thumbMainText: 'CAP 2',
        thumbSubText: 'ONLINE + OFFLINE',
      },
      {
        id: `${product.id}-cap2-ps4`,
        purchaseTypeId: 'cap-2-primary',
        titleFa: `ظرفیت ۲ (پرایمری) مخصوص PS4 — آنلاین و آفلاین روی اکانت شخصی`,
        titleEn: `PS4 Capacity 2 (Primary) — Online & Offline`,
        priceUsd: cap2Ps4Usd,
        discountPercent: 15,
        deliveryMethodFa: 'اکانت قانونی سونی (اکتیو پرایمری)',
        deliveryMethodEn: 'Official PSN Primary Account',
        warrantyFa: 'مادام‌العمر + قابلیت فروش مجدد',
        warrantyEn: 'Lifetime + Resale Guarantee',
        deliveryTimeFa: 'فوری (۱۵ الی ۳۰ دقیقه)',
        deliveryTimeEn: '15 - 30 Mins',
        descriptionFa:
          'مخصوص کنسول پلی‌استیشن ۴ با قابلیت اجرای آنلاین و آفلاین روی یوزر شخصی بدون قفل شدن و با گارانتی دائمی مدثر.',
        descriptionEn:
          'Designed for PS4 consoles with full online and offline play on your personal profile.',
        colorTheme: 'blue',
        thumbTopText: 'PS4 PRIMARY',
        thumbMainText: 'CAP 2',
        thumbSubText: 'PERSONAL USER',
      },
      {
        id: `${product.id}-cap-full-vip`,
        purchaseTypeId: 'cap-2-primary',
        titleFa: `اکانت کامل اختصاصی (ظرفیت ۲ + ظرفیت ۳ یکجا برای ۲ کنسول)`,
        titleEn: `Full Dedicated PSN Account (Capacity 2 + 3 Bundle)`,
        priceUsd: capFullUsd,
        discountPercent: 20,
        deliveryMethodFa: 'تحویل کامل ایمیل و اکانت سونی',
        deliveryMethodEn: 'Full PSN Account Ownership',
        warrantyFa: 'مادام‌العمر طلایی',
        warrantyEn: 'Lifetime Gold Warranty',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'مناسب خرید مشترک با دوستتان: شامل هر دو ظرفیت ۲ و ظرفیت ۳ به صورت یکجا با مالکیت کامل و امکان استفاده همزمان روی دو کنسول.',
        descriptionEn:
          'Includes both Capacity 2 and Capacity 3 together—ideal for sharing with a friend across two consoles.',
        colorTheme: 'green',
        thumbTopText: 'FULL ACCOUNT',
        thumbMainText: 'VIP',
        thumbSubText: 'CAP 2 + CAP 3',
      },
    ];

    const cap3Packages: ProductPackageOption[] = [
      {
        id: `${product.id}-cap3-ps5`,
        purchaseTypeId: 'cap-3-switch',
        titleFa: `ظرفیت ۳ (سوییچ) مخصوص PS5 — اجرای آنلاین روی اکانت تحویلی`,
        titleEn: `PS5 Capacity 3 (Switch) — Online Play`,
        priceUsd: cap3SwitchUsd,
        discountPercent: 20,
        deliveryMethodFa: 'اکانت قانونی سونی + راهنمای نصب',
        deliveryMethodEn: 'Official PSN Switch Account',
        warrantyFa: 'مادام‌العمر + قابلیت فروش مجدد',
        warrantyEn: 'Lifetime + Resale Guarantee',
        deliveryTimeFa: 'فوری (آنی تا ۳۰ دقیقه)',
        deliveryTimeEn: 'Instant - 30 Mins',
        descriptionFa:
          'انتخاب اقتصادی برای گیمرهای آنلاین: بازی را داخل همان اکانت تحویلی با اتصال اینترنت اجرا می‌کنید، تمامی بخش‌های آنلاین (Ultimate Team / Multiplayer) فعال است و هر زمان اراده کنید قابل فروش مجدد است.',
        descriptionEn:
          'Economy online capacity: play inside the delivered PSN account with full online multiplayer and resale support.',
        colorTheme: 'purple',
        badgeFa: 'اقتصادی‌ترین ظرفیت آنلاین',
        badgeEn: 'Best Value Online',
        thumbTopText: 'PS5 SWITCH',
        thumbMainText: 'CAP 3',
        thumbSubText: 'ONLINE PLAY',
      },
      {
        id: `${product.id}-cap3-ps4`,
        purchaseTypeId: 'cap-3-switch',
        titleFa: `ظرفیت ۳ (سوییچ) مخصوص PS4 — اجرای آنلاین اقتصادی`,
        titleEn: `PS4 Capacity 3 (Switch) — Online Economy`,
        priceUsd: cap3Ps4Usd,
        discountPercent: 16,
        deliveryMethodFa: 'اکانت قانونی سونی',
        deliveryMethodEn: 'Official PSN Switch Account',
        warrantyFa: 'مادام‌العمر + قابلیت فروش مجدد',
        warrantyEn: 'Lifetime + Resale Guarantee',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'ظرفیت ۳ مخصوص کنسول PS4 با قیمت بسیار مناسب، گارانتی دائمی اصالت و امکان تعویض با بازی‌های دیگر.',
        descriptionEn:
          'PS4 Capacity 3 account with lifetime guarantee and easy trade-in for other games.',
        colorTheme: 'blue',
        thumbTopText: 'PS4 SWITCH',
        thumbMainText: 'CAP 3',
        thumbSubText: 'ECONOMY',
      },
    ];

    const cap1Packages: ProductPackageOption[] = [
      {
        id: `${product.id}-cap1-offline`,
        purchaseTypeId: 'cap-1-offline',
        titleFa: `ظرفیت ۱ (آفلاین) مخصوص PS5 & PS4 — بدون محدودیت زمانی`,
        titleEn: `PS5 & PS4 Capacity 1 (Offline Story Mode)`,
        priceUsd: cap1OfflineUsd,
        discountPercent: 22,
        deliveryMethodFa: 'اکانت قانونی سونی (اکتیو آفلاین)',
        deliveryMethodEn: 'Official PSN Offline Activation',
        warrantyFa: 'تضمین سلامت کامل تا پایان بازی',
        warrantyEn: 'Full Campaign Guarantee',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'ارزان‌ترین روش تجربه بازی‌های اورجینال: پس از دانلود کامل دیتا، کنسول را در حالت آفلاین قرار داده و بدون هیچ محدودیت زمانی روی اکانت شخصی خودتان بازی می‌کنید.',
        descriptionEn:
          'Lowest-cost official option: download the game, take your console offline, and play indefinitely on your own profile.',
        colorTheme: 'amber',
        thumbTopText: 'OFFLINE MODE',
        thumbMainText: 'CAP 1',
        thumbSubText: 'UNLIMITED TIME',
      },
    ];

    const xboxPackages: ProductPackageOption[] = [
      {
        id: `${product.id}-xbox-home`,
        purchaseTypeId: 'xbox-home-pc',
        titleFa: `اکانت هوم (Home) ایکس‌باکس Series X|S — آنلاین و آفلاین`,
        titleEn: `Xbox Series X|S Home Account (Online & Offline)`,
        priceUsd: xboxHomeUsd,
        discountPercent: 15,
        deliveryMethodFa: 'اکانت رسمی مایکروسافت (Home Xbox)',
        deliveryMethodEn: 'Official Microsoft Home Account',
        warrantyFa: 'دارد (مادام‌العمر + فروش مجدد)',
        warrantyEn: 'Lifetime + Resale Guarantee',
        deliveryTimeFa: '۱۵ الی ۳۰ دقیقه',
        deliveryTimeEn: '15 - 30 Mins',
        descriptionFa:
          'معادل ظرفیت ۲ در کنسول‌های ایکس‌باکس: اکانت را Home کرده و روی پروفایل شخصی خودتان به صورت آنلاین و آفلاین بازی کنید.',
        descriptionEn:
          'Set as Home Xbox and play both online and offline on your personal Xbox gamertag.',
        colorTheme: 'green',
        thumbTopText: 'XBOX SERIES X|S',
        thumbMainText: 'HOME',
        thumbSubText: 'ONLINE + OFFLINE',
      },
      {
        id: `${product.id}-xbox-switch`,
        purchaseTypeId: 'xbox-home-pc',
        titleFa: `اکانت عادی (سوییچ) ایکس‌باکس و اشتراکی Steam PC`,
        titleEn: `Xbox Switch Account / Steam PC Shared`,
        priceUsd: cap3Ps4Usd,
        discountPercent: 18,
        deliveryMethodFa: 'اکانت قانونی مایکروسافت / استیم',
        deliveryMethodEn: 'Official Xbox / Steam Account',
        warrantyFa: 'دارد (دائمی)',
        warrantyEn: 'Lifetime Warranty',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'نسخه اقتصادی برای کنسول‌های Xbox Series X|S و یا اکانت اشتراکی قانونی Steam برای کامپیوتر همراه با گارانتی دائمی.',
        descriptionEn:
          'Economy Xbox Switch account or official Steam PC shared account with full support.',
        colorTheme: 'blue',
        thumbTopText: 'XBOX / STEAM',
        thumbMainText: 'PRO',
        thumbSubText: 'CONSOLE & PC',
      },
    ];

    return [
      {
        id: 'cap-2-primary',
        titleFa: 'ظرفیت ۲ پرایمری (آنلاین + آفلاین)',
        titleEn: 'Capacity 2 Primary (Online & Offline)',
        startingPriceToman: convertUsdToToman(cap2Ps4Usd, usdtRate),
        startingPriceUsd: cap2Ps4Usd,
        packages: cap2Packages,
      },
      {
        id: 'cap-3-switch',
        titleFa: 'ظرفیت ۳ سوییچ (آنلاین اقتصادی)',
        titleEn: 'Capacity 3 Switch (Online)',
        startingPriceToman: convertUsdToToman(cap3Ps4Usd, usdtRate),
        startingPriceUsd: cap3Ps4Usd,
        packages: cap3Packages,
      },
      {
        id: 'cap-1-offline',
        titleFa: 'ظرفیت ۱ (آفلاین داستانی)',
        titleEn: 'Capacity 1 (Offline Mode)',
        startingPriceToman: convertUsdToToman(cap1OfflineUsd, usdtRate),
        startingPriceUsd: cap1OfflineUsd,
        packages: cap1Packages,
      },
      {
        id: 'xbox-home-pc',
        titleFa: 'اکانت هوم Xbox و نسخه PC',
        titleEn: 'Xbox Home & Steam PC',
        startingPriceToman: convertUsdToToman(cap3Ps4Usd, usdtRate),
        startingPriceUsd: cap3Ps4Usd,
        packages: xboxPackages,
      },
    ];
  }

  // 0B. GAMING DEVICES, CONSOLES, CONTROLLERS & PING REDUCERS
  if (isGamingDeviceProduct(product)) {
    if (product.id === 'gaming-console-ps5-xbox') {
      const ps5Pkgs: ProductPackageOption[] = [
        {
          id: 'console-ps5-slim-digital',
          purchaseTypeId: 'ps5-consoles',
          titleFa: 'کنسول PlayStation 5 Slim Digital Edition (حافظه ۱ ترابایت)',
          titleEn: 'PlayStation 5 Slim Digital Edition 1TB (CFI-2016)',
          priceUsd: 495,
          discountPercent: 8,
          deliveryMethodFa: 'ارسال پلمپ اصلی + گارانتی ۱۸ ماهه',
          deliveryMethodEn: 'Sealed Box + 18M Warranty',
          warrantyFa: 'دارد (۱۰ روز مهلت تست تعویض)',
          warrantyEn: '10-Day Replacement + 18M Warranty',
          deliveryTimeFa: 'ارسال فوری همان روز',
          deliveryTimeEn: 'Same-Day Express Dispatch',
          descriptionFa:
            'کنسول پلی‌استیشن ۵ اسلیم دیجیتال سری اروپا CFI-2016 با حافظه ۱ ترابایت SSD، پلمپ اصلی کارخانه به همراه ۱۰ روز مهلت تست بی‌قید و شرط.',
          descriptionEn:
            'Brand-new sealed Sony PS5 Slim Digital 1TB (Europe CFI-2016) with 10-day test replacement guarantee.',
          colorTheme: 'purple',
          badgeFa: 'پرفروش‌ترین کنسول نسل ۹',
          badgeEn: '#1 Next-Gen Console',
          thumbTopText: 'SONY PS5 SLIM',
          thumbMainText: '1TB',
          thumbSubText: 'DIGITAL EDITION',
        },
        {
          id: 'console-ps5-slim-disc',
          purchaseTypeId: 'ps5-consoles',
          titleFa: 'کنسول PlayStation 5 Slim Standard (دیسک‌خور اروپا ۲۰۱۶)',
          titleEn: 'PlayStation 5 Slim Standard Disc Edition 1TB',
          priceUsd: 555,
          discountPercent: 7,
          deliveryMethodFa: 'ارسال پلمپ اصلی + گارانتی ۱۸ ماهه',
          deliveryMethodEn: 'Sealed Box + 18M Warranty',
          warrantyFa: 'دارد (۱۰ روز مهلت تست تعویض)',
          warrantyEn: '10-Day Replacement + 18M Warranty',
          deliveryTimeFa: 'ارسال فوری همان روز',
          deliveryTimeEn: 'Same-Day Express Dispatch',
          descriptionFa:
            'نسخه استاندارد دیسک‌خور PS5 Slim اروپا CFI-2016 با درایو بلوری 4K قابل جداسازی و حافظه ۱ ترابایت.',
          descriptionEn:
            'Official PS5 Slim Standard Disc 1TB console (Europe CFI-2016) with detachable Ultra HD Blu-ray drive.',
          colorTheme: 'blue',
          thumbTopText: 'SONY PS5 SLIM',
          thumbMainText: 'DISC',
          thumbSubText: 'CFI-2016 EU',
        },
        {
          id: 'console-ps5-pro-2tb',
          purchaseTypeId: 'ps5-consoles',
          titleFa: 'کنسول PlayStation 5 Pro (حافظه ۲ ترابایت — قدرتمندترین کنسول)',
          titleEn: 'PlayStation 5 Pro 2TB Console (PSSR Ray-Tracing)',
          priceUsd: 765,
          discountPercent: 6,
          deliveryMethodFa: 'ارسال ویژه VIP پلمپ اصلی',
          deliveryMethodEn: 'VIP Sealed Express Delivery',
          warrantyFa: 'دارد (۱۸ ماه گارانتی طلایی)',
          warrantyEn: '18-Month Gold Warranty',
          deliveryTimeFa: 'ارسال فوری VIP',
          deliveryTimeEn: 'VIP Same-Day Dispatch',
          descriptionFa:
            'کنسول پرچمدار PS5 Pro با ۲ ترابایت حافظه، گرافیک ۴۵٪ سریع‌تر، فناوری هوش مصنوعی PSSR و Wi-Fi 7.',
          descriptionEn:
            'Flagship PlayStation 5 Pro with 2TB SSD, PSSR AI upscaling, advanced ray-tracing, and Wi-Fi 7.',
          colorTheme: 'amber',
          badgeFa: 'پرچمدار 4K 120fps',
          badgeEn: 'Flagship Pro',
          thumbTopText: 'PLAYSTATION',
          thumbMainText: 'PS5 PRO',
          thumbSubText: '2TB ULTRA 4K',
        },
      ];

      const xboxAndInstallPkgs: ProductPackageOption[] = [
        {
          id: 'console-xbox-series-s',
          purchaseTypeId: 'xbox-and-fullgame',
          titleFa: 'کنسول Xbox Series S به همراه اشتراک Game Pass Ultimate',
          titleEn: 'Xbox Series S Console + Game Pass Ultimate Bundle',
          priceUsd: 335,
          discountPercent: 10,
          deliveryMethodFa: 'پلمپ اصلی + نصب فول‌گیم گیم‌پس',
          deliveryMethodEn: 'Sealed Console + Game Pass Setup',
          warrantyFa: 'دارد (۱۸ ماه گارانتی)',
          warrantyEn: '18-Month Warranty',
          deliveryTimeFa: 'ارسال فوری همان روز',
          deliveryTimeEn: 'Same-Day Dispatch',
          descriptionFa:
            'اقتصادی‌ترین کنسول نسل نهم مایکروسافت همراه با فعال‌سازی اشتراک گیم‌پس آلتیمیت و نصب بازی‌های انتخابی شما.',
          descriptionEn:
            'Best-value next-gen Xbox Series S bundled with Xbox Game Pass Ultimate setup.',
          colorTheme: 'green',
          thumbTopText: 'MICROSOFT XBOX',
          thumbMainText: 'SERIES S',
          thumbSubText: '+ GAME PASS',
        },
        {
          id: 'console-xbox-series-x',
          purchaseTypeId: 'xbox-and-fullgame',
          titleFa: 'کنسول Xbox Series X حافظه ۱ ترابایت (پلمپ اصلی)',
          titleEn: 'Xbox Series X 1TB 4K 120Hz Console',
          priceUsd: 525,
          discountPercent: 8,
          deliveryMethodFa: 'ارسال پلمپ اصلی + گارانتی ۱۸ ماهه',
          deliveryMethodEn: 'Sealed Box + 18M Warranty',
          warrantyFa: 'دارد (۱۰ روز مهلت تست)',
          warrantyEn: '10-Day Test Guarantee',
          deliveryTimeFa: 'ارسال فوری',
          deliveryTimeEn: 'Express Dispatch',
          descriptionFa:
            'قدرتمندترین کنسول مایکروسافت با توان ۱۲ ترافلاپس واقعی، اجرای 4K 120fps و ۱ ترابایت حافظه NVMe SSD.',
          descriptionEn:
            '12 TFLOPS true 4K 120fps Xbox Series X 1TB console with official warranty.',
          colorTheme: 'blue',
          thumbTopText: 'MICROSOFT XBOX',
          thumbMainText: 'SERIES X',
          thumbSubText: '1TB 12 TFLOPS',
        },
        {
          id: 'console-fullgame-pack-10',
          purchaseTypeId: 'xbox-and-fullgame',
          titleFa: 'پکیج نصب فول‌گیم کنسول شما (۵ بازی انتخابی ظرفیتی + ۵ بازی رندوم)',
          titleEn: 'Full-Game Console Installation Pack (10 AAA Titles)',
          priceUsd: 59,
          discountPercent: 25,
          deliveryMethodFa: 'نصب قانونی و ظرفیتی با گارانتی بن نشدن',
          deliveryMethodEn: 'Official Capacity & Data Install',
          warrantyFa: 'ضمانت مادام‌العمر بن نشدن کنسول',
          warrantyEn: '100% Anti-Ban Lifetime Warranty',
          deliveryTimeFa: 'تحویل ۳ الی ۶ ساعته',
          deliveryTimeEn: '3 - 6 Hours',
          descriptionFa:
            'نصب پکیج کامل ۱۰ بازی روز (شامل FC 25، GTA V، Call of Duty، God of War و...) روی کنسول PS5 یا PS4 شما با اکانت‌های قانونی.',
          descriptionEn:
            'Complete 10-game AAA bundle installed legally on your PS5/PS4 with 100% anti-ban warranty.',
          colorTheme: 'purple',
          badgeFa: 'ویژه دارندگان کنسول',
          badgeEn: '10 Games Pack',
          thumbTopText: 'FULL GAME PACK',
          thumbMainText: '10 AAA',
          thumbSubText: 'PS5 & PS4',
        },
      ];

      return [
        {
          id: 'ps5-consoles',
          titleFa: 'کنسول‌های PlayStation 5 (اسلیم و پرو)',
          titleEn: 'PlayStation 5 Slim & Pro Consoles',
          startingPriceToman: convertUsdToToman(495, usdtRate),
          startingPriceUsd: 495,
          packages: ps5Pkgs,
        },
        {
          id: 'xbox-and-fullgame',
          titleFa: 'کنسول Xbox و پکیج نصب فول‌گیم',
          titleEn: 'Xbox Series X|S & Full-Game Packs',
          startingPriceToman: convertUsdToToman(59, usdtRate),
          startingPriceUsd: 59,
          packages: xboxAndInstallPkgs,
        },
      ];
    }

    if (product.id === 'gaming-controller-xbox-windows') {
      const xboxStandardPkgs: ProductPackageOption[] = [
        {
          id: 'xbox-ctrl-carbon-white',
          purchaseTypeId: 'xbox-pc-standard',
          titleFa: 'دسته اورجینال Xbox Series X|S (مشکی Carbon Black / سفید Robot White)',
          titleEn: 'Official Xbox Wireless Controller (Carbon Black / Robot White)',
          priceUsd: 64.0,
          discountPercent: 14,
          deliveryMethodFa: 'پلمپ اصلی مایکروسافت + گارانتی تعویض',
          deliveryMethodEn: 'Sealed Official Microsoft Box',
          warrantyFa: 'دارد (ضمانت اصالت ۱۰۰٪ و سلامت آنالوگ)',
          warrantyEn: '100% Original + Analog Drift Warranty',
          deliveryTimeFa: 'ارسال فوری همان روز',
          deliveryTimeEn: 'Same-Day Express Dispatch',
          descriptionFa:
            'کنترلر بی‌سیم نسل نهم مایکروسافت با بلوتوث داخلی؛ اتصال مستقیم و بدون نیاز به برنامه اضافی به کنسول‌های Xbox، ویندوز ۱۰/۱۱، اندروید و آیفون.',
          descriptionEn:
            'Next-gen Microsoft Xbox Wireless Controller with native Bluetooth for Xbox Series X|S, Windows 10/11, Android, and iPhone.',
          colorTheme: 'green',
          badgeFa: 'پرفروش‌ترین دسته ویندوز و کنسول',
          badgeEn: '#1 PC & Xbox Controller',
          thumbTopText: 'XBOX & WINDOWS',
          thumbMainText: 'SERIES X|S',
          thumbSubText: 'CARBON / WHITE',
        },
        {
          id: 'xbox-ctrl-windows-dongle-bundle',
          purchaseTypeId: 'xbox-pc-standard',
          titleFa: 'باندل دسته Xbox Series X|S + دانگل بی‌سیم اورجینال ویندوز (بدون تاخیر)',
          titleEn: 'Xbox Controller + Official Windows 10/11 Wireless Adapter Bundle',
          priceUsd: 84.0,
          discountPercent: 15,
          deliveryMethodFa: 'پلمپ اصلی + دانگل اختصاصی PC',
          deliveryMethodEn: 'Controller + Xbox Wireless Adapter for Windows',
          warrantyFa: 'دارد (گارانتی رسمی ۱۸ ماهه)',
          warrantyEn: '18-Month Official Warranty',
          deliveryTimeFa: 'ارسال فوری',
          deliveryTimeEn: 'Same-Day Express Dispatch',
          descriptionFa:
            'بهترین پکیج برای گیمرهای ویندوز (PC): اتصال اختصاصی Xbox Wireless با تاخیر صفر و پشتیبانی از جک هدفون روی خود دسته در ویندوز ۱۱ و ۱۰.',
          descriptionEn:
            'Zero-latency proprietary wireless connection for Windows 10/11 PCs with full stereo headset audio support through the controller.',
          colorTheme: 'blue',
          thumbTopText: 'WINDOWS PC PRO',
          thumbMainText: '+ DONGLE',
          thumbSubText: 'ZERO LATENCY',
        },
      ];

      const xboxElitePkgs: ProductPackageOption[] = [
        {
          id: 'xbox-ctrl-elite-core',
          purchaseTypeId: 'xbox-pc-elite',
          titleFa: 'دسته حرفه‌ای Xbox Elite Wireless Controller Series 2 Core',
          titleEn: 'Xbox Elite Wireless Controller Series 2 Core (White/Black)',
          priceUsd: 135.0,
          discountPercent: 12,
          deliveryMethodFa: 'پلمپ اصلی مایکروسافت + مهلت تست',
          deliveryMethodEn: 'Sealed Official Elite Series 2 Core',
          warrantyFa: 'دارد (گارانتی طلایی مدثر)',
          warrantyEn: 'Modasr Gold Warranty',
          deliveryTimeFa: 'ارسال فوری VIP',
          deliveryTimeEn: 'VIP Express Dispatch',
          descriptionFa:
            'دارای قفل‌های ماشه سه مرحله‌ای (Hair Trigger Locks)، آنالوگ‌های قابل تنظیم سفتی و باتری داخلی ۴۰ ساعته مخصوص بازیکنان رقابتی شوتر و فیفا.',
          descriptionEn:
            'Adjustable-tension thumbsticks, shorter hair trigger locks, wrap-around rubberized grip, and 40-hour rechargeable battery.',
          colorTheme: 'purple',
          thumbTopText: 'ELITE SERIES 2',
          thumbMainText: 'CORE',
          thumbSubText: 'PRO COMPETITIVE',
        },
        {
          id: 'xbox-ctrl-elite-2-complete',
          purchaseTypeId: 'xbox-pc-elite',
          titleFa: 'پک کامل Xbox Elite Series 2 (همراه با ۴ پدال پشت، کیف شارژر و قطعات)',
          titleEn: 'Xbox Elite Wireless Controller Series 2 Complete Component Pack',
          priceUsd: 179.0,
          discountPercent: 10,
          deliveryMethodFa: 'پلمپ اصلی کامل + کیف و داک شارژ',
          deliveryMethodEn: 'Full Sealed Elite 2 Kit + Charging Dock',
          warrantyFa: 'دارد (۱۸ ماه گارانتی طلایی)',
          warrantyEn: '18-Month Gold Warranty',
          deliveryTimeFa: 'ارسال فوری VIP',
          deliveryTimeEn: 'VIP Express Dispatch',
          descriptionFa:
            'کامل‌ترین کنترلر حرفه‌ای ویندوز و ایکس‌باکس با ۴ پدال فلزی پشت دسته، ۶ آنالوگ قابل تعویض و داک شارژ مغناطیسی.',
          descriptionEn:
            'Complete pro tournament controller with 4 interchangeable rear paddles, 6 thumbsticks, carrying case, and charging dock.',
          colorTheme: 'amber',
          badgeFa: 'پرچمدار تورنمنت',
          badgeEn: 'Pro Flagship',
          thumbTopText: 'ELITE SERIES 2',
          thumbMainText: 'FULL KIT',
          thumbSubText: '4 PADDLES + DOCK',
        },
      ];

      return [
        {
          id: 'xbox-pc-standard',
          titleFa: 'دسته استاندارد Xbox و باندل ویندوز PC',
          titleEn: 'Standard Xbox & Windows Adapter Bundle',
          startingPriceToman: convertUsdToToman(64, usdtRate),
          startingPriceUsd: 64,
          packages: xboxStandardPkgs,
        },
        {
          id: 'xbox-pc-elite',
          titleFa: 'دسته حرفه‌ای Xbox Elite Series 2',
          titleEn: 'Xbox Elite Series 2 Pro Controllers',
          startingPriceToman: convertUsdToToman(135, usdtRate),
          startingPriceUsd: 135,
          packages: xboxElitePkgs,
        },
      ];
    }

    if (product.id === 'gaming-controller-mobile-iphone-android') {
      const mobileBackbonePkgs: ProductPackageOption[] = [
        {
          id: 'mobile-ctrl-backbone-ps-iphone',
          purchaseTypeId: 'mobile-backbone-kishi',
          titleFa: 'دسته موبایل Backbone One PlayStation Edition (مخصوص آیفون و اندروید)',
          titleEn: 'Backbone One Gen 2 PlayStation Edition (USB-C / Lightning for iPhone & Android)',
          priceUsd: 98.0,
          discountPercent: 12,
          deliveryMethodFa: 'پلمپ اصلی شرکت Backbone آمریکا',
          deliveryMethodEn: 'Sealed Official Backbone One Box',
          warrantyFa: 'دارد (ضمانت اصالت و مهلت تست)',
          warrantyEn: '100% Original + Test Warranty',
          deliveryTimeFa: 'ارسال فوری همان روز',
          deliveryTimeEn: 'Same-Day Express Dispatch',
          descriptionFa:
            'بهترین دسته بازی دنیا برای آیفون (سری ۱۵/۱۶ USB-C و مدل‌های Lightning) و گوشی‌های اندروید؛ طراحی رسمی پلی‌استیشن با پشتیبانی از قاب گوشی، کالاف دیوتی موبایل و PS Remote Play.',
          descriptionEn:
            'Official PlayStation-licensed mobile controller for iPhone (USB-C & Lightning) and Android with magnetic case adapters and zero latency.',
          colorTheme: 'purple',
          badgeFa: 'بهترین دسته آیفون و اندروید',
          badgeEn: '#1 iPhone & Android Gamepad',
          thumbTopText: 'IPHONE & ANDROID',
          thumbMainText: 'BACKBONE',
          thumbSubText: 'PS EDITION GEN 2',
        },
        {
          id: 'mobile-ctrl-razer-kishi-v2',
          purchaseTypeId: 'mobile-backbone-kishi',
          titleFa: 'دسته موبایل Razer Kishi V2 Pro (مخصوص اندروید و آیفون با میکروسوییچ)',
          titleEn: 'Razer Kishi V2 Mobile Gaming Controller (iPhone & Android)',
          priceUsd: 89.0,
          discountPercent: 14,
          deliveryMethodFa: 'پلمپ اصلی Razer + گارانتی رسمی',
          deliveryMethodEn: 'Sealed Official Razer Box',
          warrantyFa: 'دارد (گارانتی رسمی)',
          warrantyEn: 'Official Warranty',
          deliveryTimeFa: 'ارسال فوری',
          deliveryTimeEn: 'Express Dispatch',
          descriptionFa:
            'مجهز به کلیدهای میکروسوییچ تکتایل ریزر، دکمه‌های قابل برنامه‌ریزی پشت دسته و نرم‌افزار Razer Nexus برای مپ کردن دکمه‌های صفحه لمسی در اندروید و اجرای بی‌نقص روی iOS.',
          descriptionEn:
            'Tactile microswitch buttons, programmable multifunction buttons, and Razer Nexus virtual controller mode for Android & iOS.',
          colorTheme: 'green',
          thumbTopText: 'RAZER OFFICIAL',
          thumbMainText: 'KISHI V2',
          thumbSubText: 'MICROSWITCH PRO',
        },
      ];

      const mobileHallEffectPkgs: ProductPackageOption[] = [
        {
          id: 'mobile-ctrl-gamesir-g8-galileo',
          purchaseTypeId: 'mobile-pro-hall',
          titleFa: 'دسته حرفه‌ای GameSir G8 Galileo / G8 Plus (آنالوگ مغناطیسی Hall Effect)',
          titleEn: 'GameSir G8 Galileo / G8+ Bluetooth & Type-C Mobile Controller',
          priceUsd: 59.0,
          discountPercent: 18,
          deliveryMethodFa: 'پلمپ اصلی + ۳ سر آنالوگ اضافی',
          deliveryMethodEn: 'Sealed Box + 3 Extra Thumbsticks',
          warrantyFa: 'دارد (ضمانت ضد دریفت آنالوگ)',
          warrantyEn: 'Anti-Drift Hall Effect Warranty',
          deliveryTimeFa: 'ارسال فوری همان روز',
          deliveryTimeEn: 'Same-Day Express Dispatch',
          descriptionFa:
            'خوش‌دست‌ترین کنترلر موبایل در ابعاد دسته کنسول با آنالوگ‌های مغناطیسی Hall Effect (ضد دریفت دائمی)، سازگار با تمامی گوشی‌های اندروید، آیفون و نینتندو سوییچ.',
          descriptionEn:
            'Console-sized ergonomic grips with anti-drift Hall Effect sticks and triggers for Android, iPhone, and Switch.',
          colorTheme: 'blue',
          badgeFa: 'ارزش خرید فوق‌العاده',
          badgeEn: 'Best Value Pro',
          thumbTopText: 'HALL EFFECT',
          thumbMainText: 'G8 PRO',
          thumbSubText: 'ANDROID & IOS',
        },
        {
          id: 'mobile-ctrl-cooler-memo-bundle',
          purchaseTypeId: 'mobile-pro-hall',
          titleFa: 'پک گیمینگ موبایل: تریگر ۶ انگشتی مکانیکی + فن خنک‌کننده رادیاتوری یخ‌ساز',
          titleEn: '6-Finger Mechanical Mobile Triggers + Peltier Magnetic Phone Cooler Pack',
          priceUsd: 29.0,
          discountPercent: 20,
          deliveryMethodFa: 'ارسال فوری پک کامل موبایل گیمینگ',
          deliveryMethodEn: 'Express Mobile Esports Bundle',
          warrantyFa: 'دارد (مهلت تست سلامت)',
          warrantyEn: 'Full Health Guarantee',
          deliveryTimeFa: 'ارسال فوری',
          deliveryTimeEn: 'Same-Day Dispatch',
          descriptionFa:
            'ویژه پلیرهای حرفه‌ای کالاف دیوتی موبایل و پابجی روی آیفون و اندروید: جلوگیری ۱۰۰٪ از داغ شدن گوشی و افت فریم به همراه تریگرهای مکانیکی سه‌بعدی.',
          descriptionEn:
            'Eliminates thermal throttling on iPhone & Android during 120fps PUBG/CODM sessions, bundled with mechanical triggers.',
          colorTheme: 'amber',
          thumbTopText: 'CODM & PUBG',
          thumbMainText: 'COOLER',
          thumbSubText: '+ 6-FINGER TRIGGER',
        },
      ];

      return [
        {
          id: 'mobile-backbone-kishi',
          titleFa: 'دسته Backbone One و Razer Kishi (آیفون و اندروید)',
          titleEn: 'Backbone One & Razer Kishi V2 (iPhone & Android)',
          startingPriceToman: convertUsdToToman(89, usdtRate),
          startingPriceUsd: 89,
          packages: mobileBackbonePkgs,
        },
        {
          id: 'mobile-pro-hall',
          titleFa: 'دسته GameSir G8 و پک فن خنک‌کننده موبایل',
          titleEn: 'GameSir G8 Hall-Effect & Pro Mobile Cooler',
          startingPriceToman: convertUsdToToman(29, usdtRate),
          startingPriceUsd: 29,
          packages: mobileHallEffectPkgs,
        },
      ];
    }

    // Controllers, Headsets/SSD, and Ping/DNS
    const base = product.priceUsd;
    const mainPkgs: ProductPackageOption[] = [
      {
        id: `${product.id}-pkg-1`,
        purchaseTypeId: 'device-standard',
        titleFa:
          product.id === 'gaming-controller-dualsense'
            ? 'دسته اورجینال PS5 DualSense سفید (سازگار با پلی‌استیشن ۵، ویندوز، آیفون و اندروید)'
            : product.id === 'gaming-headset-gear'
            ? 'پایه شارژر دوگانه اورجینال دسته PS5 (DualSense Charging Station)'
            : 'اشتراک ۱ ماهه DNS اختصاصی و کاهش پینگ کنسول (PS5 / Xbox)',
        titleEn:
          product.id === 'gaming-controller-dualsense'
            ? 'Sony PS5 DualSense Wireless Controller (PS5 / PC / iPhone / Android)'
            : product.id === 'gaming-headset-gear'
            ? 'Official Sony DualSense Twin Charging Station'
            : '1-Month Dedicated Console Gaming DNS (PS5 / Xbox)',
        priceUsd: base,
        discountPercent: 14,
        deliveryMethodFa: product.deliveryFa,
        deliveryMethodEn: product.deliveryEn,
        warrantyFa: 'دارد (ضمانت اصالت ۱۰۰٪)',
        warrantyEn: '100% Original Warranty',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant / Express',
        descriptionFa: `${product.subtitleFa}`,
        descriptionEn: `${product.subtitleEn}`,
        colorTheme: 'purple',
        badgeFa: 'پرفروش‌ترین گزینه',
        badgeEn: 'Best Seller',
        thumbTopText: 'GAMING PRO',
        thumbMainText: product.id === 'gaming-ping-dns-pro' ? '1 MO' : 'OEM',
        thumbSubText: 'ORIGINAL',
      },
      {
        id: `${product.id}-pkg-2`,
        purchaseTypeId: 'device-standard',
        titleFa:
          product.id === 'gaming-controller-dualsense'
            ? 'دسته اورجینال PS5 DualSense مشکی (Midnight Black) و رنگ‌های متالیک Chroma'
            : product.id === 'gaming-headset-gear'
            ? 'هدست بی‌سیم سونی PlayStation Pulse 3D Wireless اورجینال'
            : 'اشتراک ۳ ماهه DNS گیمینگ + رادار ضدتحریم کنسول و PC',
        titleEn:
          product.id === 'gaming-controller-dualsense'
            ? 'Sony PS5 DualSense Midnight Black / Chroma Collection'
            : product.id === 'gaming-headset-gear'
            ? 'Sony PlayStation Pulse 3D Wireless Gaming Headset'
            : '3-Month Pro Gaming DNS & Anti-Sanction Routing',
        priceUsd:
          product.id === 'gaming-ping-dns-pro'
            ? 9.99
            : Number((base * 1.08).toFixed(2)),
        discountPercent: 15,
        deliveryMethodFa: product.deliveryFa,
        deliveryMethodEn: product.deliveryEn,
        warrantyFa: 'دارد (ضمانت کامل)',
        warrantyEn: 'Full Warranty',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant / Express',
        descriptionFa:
          'تضمین اصالت کالا و بالاترین کیفیت ساخت برای تجربه بدون لگ و حرفه‌ای بازی‌های نسل نهم روی کنسول، کامپیوتر و موبایل.',
        descriptionEn:
          'Verified authentic gaming hardware & low-latency setup with full Modasr guarantee.',
        colorTheme: 'blue',
        thumbTopText: 'GAMING PRO',
        thumbMainText: product.id === 'gaming-ping-dns-pro' ? '3 MO' : 'PRO',
        thumbSubText: 'EDITION',
      },
    ];

    const proPkgs: ProductPackageOption[] = [
      {
        id: `${product.id}-pkg-3`,
        purchaseTypeId: 'device-pro',
        titleFa:
          product.id === 'gaming-controller-dualsense'
            ? 'پک دسته PS5 DualSense + دانگل بلوتوث ۵.۳ و پایه نگهدارنده موبایل (ویژه PC و گوشی)'
            : product.id === 'gaming-headset-gear'
            ? 'حافظه SSD M.2 NVMe ظرفیت 1TB هیت‌سینک‌دار مخصوص PS5 (سرعت 7300MB/s)'
            : 'اشتراک ۱ ماهه ExitLag اختصاصی (کاهش پینگ تخصصی PC)',
        titleEn:
          product.id === 'gaming-controller-dualsense'
            ? 'PS5 DualSense + PC Bluetooth 5.3 Dongle & Mobile Clip Bundle'
            : product.id === 'gaming-headset-gear'
            ? '1TB Heatsink NVMe M.2 SSD for PS5 (7300MB/s)'
            : '1-Month Official ExitLag Subscription (PC Low Ping)',
        priceUsd:
          product.id === 'gaming-ping-dns-pro'
            ? 6.99
            : product.id === 'gaming-headset-gear'
            ? 109.0
            : 78.0,
        discountPercent: 12,
        deliveryMethodFa: product.deliveryFa,
        deliveryMethodEn: product.deliveryEn,
        warrantyFa: 'دارد (گارانتی رسمی)',
        warrantyEn: 'Official Warranty',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Express',
        descriptionFa:
          'مخصوص گیمرهای حرفه‌ای که می‌خواهند از دسته DualSense علاوه بر کنسول، روی ویندوز، آیفون و اندروید نیز با کمترین تاخیر استفاده کنند.',
        descriptionEn:
          'Engineered for gamers using DualSense across PS5, Windows PC, iPhone, and Android with zero input lag.',
        colorTheme: 'green',
        thumbTopText: 'MULTI-PLATFORM',
        thumbMainText: 'PC+IOS',
        thumbSubText: 'PRO BUNDLE',
      },
      {
        id: `${product.id}-pkg-4`,
        purchaseTypeId: 'device-pro',
        titleFa:
          product.id === 'gaming-controller-dualsense'
            ? 'دسته حرفه‌ای Sony DualSense Edge (دارای پدال پشت و ماژول آنالوگ قابل تعویض)'
            : product.id === 'gaming-headset-gear'
            ? 'هدست پرچمدار سونی PlayStation Pulse Elite (درایور Planar Magnetic)'
            : 'اشتراک GearUP Console & Mobile Booster (کاهش پینگ کنسول و موبایل)',
        titleEn:
          product.id === 'gaming-controller-dualsense'
            ? 'Sony DualSense Edge Pro Wireless Controller'
            : product.id === 'gaming-headset-gear'
            ? 'Sony PlayStation Pulse Elite Wireless Headset'
            : 'GearUP Console & Mobile Game Booster (1-Month)',
        priceUsd:
          product.id === 'gaming-ping-dns-pro'
            ? 5.99
            : product.id === 'gaming-headset-gear'
            ? 152.0
            : 205.0,
        discountPercent: 10,
        deliveryMethodFa: product.deliveryFa,
        deliveryMethodEn: product.deliveryEn,
        warrantyFa: 'دارد (گارانتی طلایی)',
        warrantyEn: 'Gold Warranty',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Express',
        descriptionFa:
          'بالاترین رده تجهیزات گیمینگ با امکانات شخصی‌سازی کامل برای رقابت در سطح تورنمنت‌های جهانی.',
        descriptionEn:
          'Tournament-grade gaming hardware and network routing for zero-compromise gameplay.',
        colorTheme: 'amber',
        thumbTopText: 'TOURNAMENT',
        thumbMainText: 'MAX',
        thumbSubText: 'FLAGSHIP',
      },
    ];

    return [
      {
        id: 'device-standard',
        titleFa:
          product.id === 'gaming-ping-dns-pro'
            ? 'DNS اختصاصی کاهش پینگ کنسول'
            : 'مدل‌های استاندارد و اورجینال',
        titleEn:
          product.id === 'gaming-ping-dns-pro'
            ? 'Console Gaming DNS'
            : 'Original Standard Models',
        startingPriceToman: convertUsdToToman(mainPkgs[0].priceUsd, usdtRate),
        startingPriceUsd: mainPkgs[0].priceUsd,
        packages: mainPkgs,
      },
      {
        id: 'device-pro',
        titleFa:
          product.id === 'gaming-ping-dns-pro'
            ? 'اشتراک ExitLag و GearUP'
            : 'مدل‌های حرفه‌ای Edge / Pro و باندل PC/موبایل',
        titleEn:
          product.id === 'gaming-ping-dns-pro'
            ? 'ExitLag & GearUP Booster'
            : 'Edge / Pro & PC/Mobile Bundles',
        startingPriceToman: convertUsdToToman(proPkgs[0].priceUsd, usdtRate),
        startingPriceUsd: proPkgs[0].priceUsd,
        packages: proPkgs,
      },
    ];
  }

  // 1. EXACT CALL OF DUTY MOBILE PURCHASE TYPES & PACKAGES (Matching User Screenshots)
  if (product.id === 'codm-cp-880' || product.id === 'codm-cp-2400') {
    const cpPackages: ProductPackageOption[] = [
      {
        id: 'codm-cp-80',
        purchaseTypeId: 'cp',
        titleFa: '80 سی پی کالاف',
        titleEn: '80 CP Call of Duty Mobile',
        priceUsd: 4.31,
        fixedTomanPrice: 295000,
        originalTomanPrice: 354000,
        discountPercent: 20,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'شارژ قانونی ۸۰ سی پی کالاف دیوتی موبایل با رسید رسمی استور اکتیویژن روی اکانت شما، بدون خطر بن یا منفی شدن سی‌پی.',
        descriptionEn:
          'Official 80 CP Call of Duty Mobile top-up directly onto your Activision account with store receipt.',
        colorTheme: 'purple',
        badgeFa: 'پرفروش‌ترین بسته پایه',
        badgeEn: 'Popular Starter',
        thumbTopText: 'CP',
        thumbMainText: '80',
        thumbSubText: 'CP',
      },
      {
        id: 'codm-cp-160',
        purchaseTypeId: 'cp',
        titleFa: '160 سی پی کالاف',
        titleEn: '160 CP Call of Duty Mobile',
        priceUsd: 8.62,
        fixedTomanPrice: 590000,
        originalTomanPrice: 660000,
        discountPercent: 11,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'شارژ مستقیم ۱۶۰ سی پی کالاف دیوتی موبایل مناسب زدن ۳ دور اول گردونه‌ها با تضمین کامل اصالت.',
        descriptionEn:
          'Direct 160 CP top-up ideal for initial Lucky Draw spins with full authenticity guarantee.',
        colorTheme: 'blue',
        thumbTopText: 'CP',
        thumbMainText: '160',
        thumbSubText: 'CP',
      },
      {
        id: 'codm-cp-240',
        purchaseTypeId: 'cp',
        titleFa: '240 سی پی کالاف',
        titleEn: '240 CP Call of Duty Mobile',
        priceUsd: 12.93,
        fixedTomanPrice: 885000,
        originalTomanPrice: 980000,
        discountPercent: 10,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'بسته ۲۴۰ سی پی کالاف دیوتی موبایل مناسب خرید بتل‌پس ریجن هند و گردونه‌های فصل جدید.',
        descriptionEn:
          '240 CP package ideal for India region Battle Pass and seasonal Lucky Draws.',
        colorTheme: 'green',
        thumbTopText: 'CP',
        thumbMainText: '240',
        thumbSubText: 'CP',
      },
      {
        id: 'codm-cp-320',
        purchaseTypeId: 'cp',
        titleFa: '320 سی پی کالاف',
        titleEn: '320 CP Call of Duty Mobile',
        priceUsd: 16.95,
        fixedTomanPrice: 1160000,
        originalTomanPrice: 1290000,
        discountPercent: 10,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'شارژ ۳۲۰ سی پی قانونی کالاف دیوتی موبایل با انجام سریع توسط تیم پشتیبانی مجرب مدثر.',
        descriptionEn:
          '320 CP official top-up fulfilled securely on your Call of Duty Mobile account.',
        colorTheme: 'amber',
        thumbTopText: 'CP',
        thumbMainText: '320',
        thumbSubText: 'CP',
      },
      {
        id: 'codm-cp-420',
        purchaseTypeId: 'cp',
        titleFa: '420 سی پی کالاف (۴۰۰ + ۲۰ هدیه)',
        titleEn: '420 CP Call of Duty Mobile',
        priceUsd: 21.18,
        fixedTomanPrice: 1450000,
        originalTomanPrice: 1650000,
        discountPercent: 12,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'بسته ۴۲۰ عددی سی‌پی مناسب فعال‌سازی بتل‌پس ریجن ایران و اروپا به همراه ۲۰ سی‌پی بونوس رایگان.',
        descriptionEn:
          '420 CP bundle (400 + 20 Bonus CP) sized for Iran/Global Battle Pass activation.',
        colorTheme: 'rose',
        thumbTopText: 'CP',
        thumbMainText: '420',
        thumbSubText: 'CP',
      },
      {
        id: 'codm-cp-880-pack',
        purchaseTypeId: 'cp',
        titleFa: '880 سی پی کالاف (۸۰۰ + ۸۰ هدیه)',
        titleEn: '880 CP Call of Duty Mobile',
        priceUsd: 42.22,
        fixedTomanPrice: 2890000,
        originalTomanPrice: 3250000,
        discountPercent: 11,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'پک محبوب ۸۸۰ سی پی شامل ۸۰ سی‌پی هدیه استور رسمی، عالی برای بتل‌پس باندل و گردونه‌ها.',
        descriptionEn:
          'Best-selling 880 CP pack with 80 bonus CP and official store receipt.',
        colorTheme: 'purple',
        badgeFa: 'محبوب گیمرها',
        badgeEn: 'Gamer Favorite',
        thumbTopText: 'CP',
        thumbMainText: '880',
        thumbSubText: 'CP',
      },
      {
        id: 'codm-cp-2400-pack',
        purchaseTypeId: 'cp',
        titleFa: '2400 سی پی کالاف (۲۰۰۰ + ۴۰۰ هدیه)',
        titleEn: '2400 CP Call of Duty Mobile',
        priceUsd: 108.84,
        fixedTomanPrice: 7450000,
        originalTomanPrice: 8300000,
        discountPercent: 10,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'فوری (اولویت VIP)',
        deliveryTimeEn: 'VIP Instant',
        descriptionFa:
          'بسته اقتصادی ۲۴۰۰ سی‌پی شامل ۴۰۰ سی‌پی پاداش رایگان، مخصوص فول‌گردونه و گان‌های متیک و لجندری.',
        descriptionEn:
          '2400 CP Mythic Draw pack including 400 free bonus CP with VIP priority fulfillment.',
        colorTheme: 'blue',
        badgeFa: '۴۰۰ سی‌پی هدیه',
        badgeEn: '+400 Bonus CP',
        thumbTopText: 'CP',
        thumbMainText: '2400',
        thumbSubText: 'CP',
      },
    ];

    const supplyPassPackages: ProductPackageOption[] = [
      {
        id: 'codm-supply-weekly-iran',
        purchaseTypeId: 'supply-pass',
        titleFa: 'هفتگی 2 دلاری (ریجن ایران)',
        titleEn: '$2 Weekly Supply Pass (Iran Region)',
        priceUsd: 8.62,
        fixedTomanPrice: 590000,
        originalTomanPrice: 595900,
        discountPercent: 1,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'اشتراک هفتگی Supply Pass دو دلاری ویژه اکانت‌های ریجن ایران شامل سی‌پی روزانه و کوپن تخفیف گردونه.',
        descriptionEn:
          '$2 Weekly Supply Pass for Iran region accounts granting daily CP and crate coupons.',
        colorTheme: 'purple',
        thumbTopText: 'SUPPLY PASS',
        thumbMainText: '$2',
        thumbSubText: 'WEEKLY IRAN',
      },
      {
        id: 'codm-supply-monthly-iran',
        purchaseTypeId: 'supply-pass',
        titleFa: 'ماهانه 7 دلاری (ریجن ایران)',
        titleEn: '$7 Monthly Supply Pass (Iran Region)',
        priceUsd: 30.17,
        fixedTomanPrice: 2065000,
        originalTomanPrice: 2250000,
        discountPercent: 8,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'اشتراک ماهانه Supply Pass هفت دلاری ریجن ایران با مجموع سی‌پی بسیار بیشتر نسبت به خرید عادی طی ۳۰ روز.',
        descriptionEn:
          '$7 Monthly Supply Pass for Iran region with 30 days of cumulative CP rewards.',
        colorTheme: 'blue',
        thumbTopText: 'SUPPLY PASS',
        thumbMainText: '$7',
        thumbSubText: 'MONTHLY IRAN',
      },
      {
        id: 'codm-supply-weekly-india',
        purchaseTypeId: 'supply-pass',
        titleFa: 'هفتگی 1 دلاری (ریجن هند)',
        titleEn: '$1 Weekly Supply Pass (India Region)',
        priceUsd: 4.31,
        fixedTomanPrice: 295000,
        originalTomanPrice: 330000,
        discountPercent: 11,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'اشتراک هفتگی ۱ دلاری مخصوص اکانت‌های ریجن هند با بالاترین ارزش خرید و دریافت سی‌پی روزانه.',
        descriptionEn:
          '$1 Weekly Supply Pass tailored for India region Call of Duty Mobile accounts.',
        colorTheme: 'green',
        thumbTopText: 'SUPPLY PASS',
        thumbMainText: '$1',
        thumbSubText: 'WEEKLY INDIA',
      },
    ];

    const offerPackages: ProductPackageOption[] = [
      {
        id: 'codm-offer-lagos',
        purchaseTypeId: 'offers',
        titleFa: 'آفر Lagos fashion week offer',
        titleEn: 'Lagos Fashion Week Special Offer',
        priceUsd: 30.71,
        fixedTomanPrice: 2102100,
        originalTomanPrice: 2350000,
        discountPercent: 11,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'فعال‌سازی آفر ویژه Lagos Fashion Week شامل کاراکتر اختصاصی، سی‌پی و آیتم‌های کلکسیونی فصل روی اکانت شما.',
        descriptionEn:
          'Official Lagos Fashion Week in-game bundle offer activated directly on your account.',
        colorTheme: 'purple',
        thumbTopText: 'CALL OF DUTY',
        thumbMainText: 'CP',
        thumbSubText: 'SPECIAL OFFER',
      },
      {
        id: 'codm-offer-bp-1usd',
        purchaseTypeId: 'offers',
        titleFa: 'آفر بتل پس 1 دلاری',
        titleEn: '$1 Battle Pass Special Offer',
        priceUsd: 4.31,
        fixedTomanPrice: 295000,
        originalTomanPrice: 340000,
        discountPercent: 13,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'خرید آفر تخفیفی ۱ دلاری بتل‌پس در بازی کالاف دیوتی موبایل با شارژ قانونی و فوری.',
        descriptionEn:
          '$1 promotional Battle Pass offer activated directly inside Call of Duty Mobile.',
        colorTheme: 'blue',
        thumbTopText: 'BATTLE PASS',
        thumbMainText: '$1',
        thumbSubText: 'OFFER',
      },
    ];

    const battlePassPackages: ProductPackageOption[] = [
      {
        id: 'codm-bp-standard',
        purchaseTypeId: 'battle-pass',
        titleFa: 'بتل پس ( معمولی )',
        titleEn: 'Battle Pass (Standard)',
        priceUsd: 30.17,
        fixedTomanPrice: 2065000,
        originalTomanPrice: 2478000,
        discountPercent: 20,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'فعال‌سازی بتل پس معمولی فصل جدید کالاف دیوتی موبایل با باز شدن تمام ۵۰ تایر جوایز و برگشت کامل سی‌پی در پایان سیزن.',
        descriptionEn:
          'Standard seasonal Battle Pass unlocking all 50 premium reward tiers and full CP return.',
        colorTheme: 'purple',
        thumbTopText: 'BATTLE PASS',
        thumbMainText: 'STANDARD',
        thumbSubText: 'FULL SEASON',
      },
      {
        id: 'codm-bp-bundle',
        purchaseTypeId: 'battle-pass',
        titleFa: 'بتل پس باندل',
        titleEn: 'Battle Pass Bundle (+12 Tiers)',
        priceUsd: 64.65,
        fixedTomanPrice: 4425000,
        originalTomanPrice: 4950000,
        discountPercent: 11,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'بتل پس باندل شامل باز شدن آنی ۱۲ تایر اول، قاب آواتار، چارم و آیتم‌های انحصاری باندل فصل.',
        descriptionEn:
          'Battle Pass Bundle with instant 12-tier skip and exclusive seasonal bundle rewards.',
        colorTheme: 'blue',
        thumbTopText: 'BATTLE PASS',
        thumbMainText: 'BUNDLE',
        thumbSubText: '+12 TIERS',
      },
      {
        id: 'codm-bp-training-india',
        purchaseTypeId: 'battle-pass',
        titleFa: 'بتل پس تمرینی (ریجن هند)',
        titleEn: 'Battle Pass Training (India Region)',
        priceUsd: 8.62,
        fixedTomanPrice: 590000,
        originalTomanPrice: 680000,
        discountPercent: 13,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'بتل پس اقتصادی ویژه اکانت‌های ریجن هند با تحویل فوری و قیمت استثنایی.',
        descriptionEn:
          'India Region Battle Pass activated rapidly with full seasonal rewards.',
        colorTheme: 'green',
        thumbTopText: 'BATTLE PASS',
        thumbMainText: 'TRAINING',
        thumbSubText: 'INDIA',
      },
    ];

    return [
      {
        id: 'cp',
        titleFa: 'سی پی CP',
        titleEn: 'Call of Duty CP',
        startingPriceToman: 295000,
        startingPriceUsd: 4.31,
        packages: cpPackages,
      },
      {
        id: 'supply-pass',
        titleFa: 'اشتراک ( Supply Pass )',
        titleEn: 'Supply Pass Subscription',
        startingPriceToman: 295000,
        startingPriceUsd: 4.31,
        packages: supplyPassPackages,
      },
      {
        id: 'offers',
        titleFa: 'آفرها',
        titleEn: 'Special Offers',
        startingPriceToman: 295000,
        startingPriceUsd: 4.31,
        packages: offerPackages,
      },
      {
        id: 'battle-pass',
        titleFa: 'بتل پس',
        titleEn: 'Battle Pass',
        startingPriceToman: 590000,
        startingPriceUsd: 8.62,
        packages: battlePassPackages,
      },
    ];
  }

  // 2. OPENAI / CHATGPT PURCHASE TYPES (API Credit, ChatGPT Plus, ChatGPT Pro/Team)
  if (product.id === 'chatgpt-plus' || product.id === 'chatgpt-pro-200') {
    const allPkgs = getProductPackages(product);
    const apiPkgs = allPkgs
      .filter((p) => p.id.startsWith('api-'))
      .map((p, i) => ({
        ...p,
        purchaseTypeId: 'openai-api',
        colorTheme: pickColor(i),
        discountPercent: 15,
        thumbTopText: 'OPENAI API',
        thumbMainText: p.id.replace('api-', '$').replace('usd', ''),
        thumbSubText: 'CREDIT',
      }));
    const plusPkgs: ProductPackageOption[] = [
      {
        id: 'plus-1m-shared',
        purchaseTypeId: 'chatgpt-plus-sub',
        titleFa: 'اکانت ۱ ماهه ChatGPT Plus (اقتصادی)',
        titleEn: 'ChatGPT Plus 1-Month (Economy)',
        priceUsd: 9.5,
        discountPercent: 20,
        deliveryMethodFa: 'اکانت آماده وریفای‌شده',
        deliveryMethodEn: 'Verified Ready Account',
        warrantyFa: 'دارد (۳۰ روز کامل)',
        warrantyEn: '30-Day Warranty',
        deliveryTimeFa: 'فوری (آنی)',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'دسترسی کامل ۳۰ روزه به GPT-4o و مدل‌های استدلالی o3 با قیمت اقتصادی و گارانتی تعویض آنی.',
        descriptionEn:
          '30-day access to GPT-4o and o3 reasoning models at an economy rate.',
        colorTheme: 'purple',
        thumbTopText: 'CHATGPT',
        thumbMainText: 'PLUS',
        thumbSubText: '1M ECONOMY',
      },
      {
        id: 'plus-1m-personal',
        purchaseTypeId: 'chatgpt-plus-sub',
        titleFa: 'اشتراک ۱ ماهه ChatGPT Plus (ایمیل شخصی)',
        titleEn: 'ChatGPT Plus 1-Month (Personal Email)',
        priceUsd: 20.0,
        discountPercent: 12,
        deliveryMethodFa: 'روی ایمیل شخصی شما',
        deliveryMethodEn: 'On Your Personal Email',
        warrantyFa: 'دارد (۳۰ روز کامل)',
        warrantyEn: '30-Day Full Guarantee',
        deliveryTimeFa: 'آنی تا ۱ ساعت',
        deliveryTimeEn: 'Instant - 1 Hour',
        descriptionFa:
          'فعال‌سازی رسمی اشتراک ChatGPT Plus مستقیماً روی ایمیل شخصی شما با فاکتور رسمی OpenAI.',
        descriptionEn:
          'Official ChatGPT Plus upgrade directly on your personal email.',
        colorTheme: 'blue',
        badgeFa: 'پرفروش‌ترین پنل',
        badgeEn: 'Best Seller',
        thumbTopText: 'CHATGPT',
        thumbMainText: '$20',
        thumbSubText: 'PERSONAL',
      },
      {
        id: 'plus-3m-personal',
        purchaseTypeId: 'chatgpt-plus-sub',
        titleFa: 'اشتراک ۳ ماهه ChatGPT Plus (اختصاصی)',
        titleEn: 'ChatGPT Plus 3-Month Dedicated',
        priceUsd: 54.0,
        discountPercent: 15,
        deliveryMethodFa: 'روی ایمیل شخصی شما',
        deliveryMethodEn: 'On Your Personal Email',
        warrantyFa: 'دارد (۹۰ روز کامل)',
        warrantyEn: '90-Day Full Guarantee',
        deliveryTimeFa: 'آنی تا ۱ ساعت',
        deliveryTimeEn: 'Instant - 1 Hour',
        descriptionFa:
          'تمدید ۳ ماهه اختصاصی روی ایمیل شخصی بدون نیاز به تمدید ماهانه و با ۱۰٪ تخفیف.',
        descriptionEn:
          '3-Month dedicated ChatGPT Plus subscription on your personal email.',
        colorTheme: 'green',
        thumbTopText: 'CHATGPT',
        thumbMainText: '3 MO',
        thumbSubText: 'DEDICATED',
      },
    ];
    const proPkgs: ProductPackageOption[] = [
      {
        id: 'team-1m-workspace',
        purchaseTypeId: 'chatgpt-pro-vip',
        titleFa: 'اشتراک ChatGPT Team (ورک‌اسپیس اختصاصی)',
        titleEn: 'ChatGPT Team Workspace (1 Month)',
        priceUsd: 30.0,
        discountPercent: 10,
        deliveryMethodFa: 'دعوت‌نامه رسمی ایمیل شما',
        deliveryMethodEn: 'Official Email Invite',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa:
          'سقف پیام ۲ برابر نسبت به پلاس و عدم استفاده از داده‌های شما برای آموزش مدل‌های OpenAI.',
        descriptionEn:
          '2x higher message limits than Plus and enterprise data privacy.',
        colorTheme: 'purple',
        thumbTopText: 'OPENAI',
        thumbMainText: 'TEAM',
        thumbSubText: 'WORKSPACE',
      },
      {
        id: 'pro-200usd',
        purchaseTypeId: 'chatgpt-pro-vip',
        titleFa: 'اشتراک ۱ ماهه ChatGPT Pro ($200 نامحدود)',
        titleEn: 'ChatGPT Pro $200 Unlimited Tier',
        priceUsd: 200.0,
        discountPercent: 10,
        deliveryMethodFa: 'روی ایمیل شخصی شما',
        deliveryMethodEn: 'On Your Personal Email',
        warrantyFa: 'دارد (VIP کامل)',
        warrantyEn: 'Full VIP Warranty',
        deliveryTimeFa: 'آنی تا ۱ ساعت',
        deliveryTimeEn: 'Instant - 1 Hour',
        descriptionFa:
          'بالاترین پلن OpenAI شامل دسترسی نامحدود به o1 Pro Mode، GPT-4.5 و تولید ویدیوی Sora.',
        descriptionEn:
          'Ultimate OpenAI tier with unlimited o1 Pro Mode, GPT-4.5, and Sora.',
        colorTheme: 'amber',
        thumbTopText: 'OPENAI VIP',
        thumbMainText: '$200',
        thumbSubText: 'PRO UNLIMITED',
      },
    ];

    return [
      {
        id: 'chatgpt-plus-sub',
        titleFa: 'اشتراک ChatGPT Plus',
        titleEn: 'ChatGPT Plus Plans',
        startingPriceToman: convertUsdToToman(9.5, usdtRate),
        startingPriceUsd: 9.5,
        packages: plusPkgs,
      },
      {
        id: 'openai-api',
        titleFa: 'شارژ اعتبار API OpenAI',
        titleEn: 'OpenAI API Credits',
        startingPriceToman: convertUsdToToman(5.5, usdtRate),
        startingPriceUsd: 5.5,
        packages: apiPkgs,
      },
      {
        id: 'chatgpt-pro-vip',
        titleFa: 'پلن‌های Team و Pro ($200)',
        titleEn: 'Team & Pro ($200) Tiers',
        startingPriceToman: convertUsdToToman(30, usdtRate),
        startingPriceUsd: 30,
        packages: proPkgs,
      },
    ];
  }

  // 3. GENERIC MULTI-PURCHASE-TYPE GROUPING FOR ALL OTHER PRODUCTS
  const basePackages = getProductPackages(product).map((pkg, idx) => ({
    ...pkg,
    discountPercent: idx === 0 ? 20 : idx === 1 ? 12 : 10,
    thumbTopText: product.platformBrand.slice(0, 12).toUpperCase(),
    thumbMainText:
      idx === 0
        ? 'STARTER'
        : idx === 1
        ? 'PRO'
        : idx === 2
        ? 'PLUS'
        : idx === 3
        ? 'ELITE'
        : 'VIP',
    thumbSubText: product.categoryLabelEn.slice(0, 12).toUpperCase(),
  }));

  if (product.category === 'ingame') {
    const coinPackages = basePackages.slice(0, 3).map((p, i) => ({
      ...p,
      purchaseTypeId: 'coins',
      colorTheme: pickColor(i),
      thumbTopText: product.iconType.toUpperCase(),
      thumbMainText: i === 0 ? 'PACK 1' : i === 1 ? 'PACK 2' : 'PACK 3',
      thumbSubText: 'INSTANT UID',
    }));
    const passPackages: ProductPackageOption[] = [
      {
        id: `${product.id}-season-pass`,
        purchaseTypeId: 'season-pass',
        titleFa: `سیزن پس / بلیط طلایی ${product.platformBrand}`,
        titleEn: `${product.platformBrand} Official Season Pass`,
        priceUsd: Math.max(4.99, Number((product.priceUsd * 0.7).toFixed(2))),
        discountPercent: 18,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'فوری (آنی تا ۳۰ دقیقه)',
        deliveryTimeEn: 'Instant - 30m',
        descriptionFa: `فعال‌سازی رسمی سیزن پس فصل جدید ${product.titleFa} با تمام جوایز ویژه و اسکین‌های فصل.`,
        descriptionEn: `Official seasonal pass activation for ${product.titleEn}.`,
        colorTheme: 'purple',
        thumbTopText: 'SEASON PASS',
        thumbMainText: 'PASS',
        thumbSubText: 'STANDARD',
      },
      {
        id: `${product.id}-season-bundle`,
        purchaseTypeId: 'season-pass',
        titleFa: `پس پلاس / باندل ویژه ${product.platformBrand}`,
        titleEn: `${product.platformBrand} Pass Plus Bundle`,
        priceUsd: Number((product.priceUsd * 1.35).toFixed(2)),
        discountPercent: 15,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa: `باندل کامل پس پلاس همراه با تایرهای اضافی و آیتم‌های کلکسیونی استور رسمی.`,
        descriptionEn: `Full Pass Plus bundle with bonus tiers and exclusive cosmetics.`,
        colorTheme: 'blue',
        thumbTopText: 'PASS PLUS',
        thumbMainText: 'BUNDLE',
        thumbSubText: 'VIP TIER',
      },
    ];
    const offerPackages = basePackages.slice(3).map((p, i) => ({
      ...p,
      purchaseTypeId: 'special-offers',
      colorTheme: pickColor(i),
      thumbTopText: 'SPECIAL OFFER',
      thumbMainText: i === 0 ? '2X PACK' : 'MAX VIP',
      thumbSubText: 'BONUS COINS',
    }));

    return [
      {
        id: 'coins',
        titleFa: 'کوین، جم و شارژ مستقیم',
        titleEn: 'Coins & Direct Top-Up',
        startingPriceToman: convertUsdToToman(coinPackages[0].priceUsd, usdtRate),
        startingPriceUsd: coinPackages[0].priceUsd,
        packages: coinPackages,
      },
      {
        id: 'season-pass',
        titleFa: 'سیزن پس و اشتراک بازی',
        titleEn: 'Season Pass & Membership',
        startingPriceToman: convertUsdToToman(passPackages[0].priceUsd, usdtRate),
        startingPriceUsd: passPackages[0].priceUsd,
        packages: passPackages,
      },
      {
        id: 'special-offers',
        titleFa: 'آفرها و پک‌های VIP',
        titleEn: 'Special Offers & Bundles',
        startingPriceToman: convertUsdToToman(offerPackages[0].priceUsd, usdtRate),
        startingPriceUsd: offerPackages[0].priceUsd,
        packages: offerPackages,
      },
    ];
  }

  if (product.category === 'gaming') {
    const usPkgs = basePackages.map((p, i) => ({
      ...p,
      purchaseTypeId: 'region-us',
      colorTheme: pickColor(i),
      thumbTopText: 'USA STORE',
      thumbMainText: `$${Math.round(p.priceUsd)}`,
      thumbSubText: 'GIFT CODE',
    }));
    const euTrPkgs: ProductPackageOption[] = [
      {
        id: `${product.id}-tr-region`,
        purchaseTypeId: 'region-eu-tr',
        titleFa: `گیفت کارت / اشتراک ریجن ترکیه و اوکراین ${product.platformBrand}`,
        titleEn: `${product.platformBrand} Turkey / Ukraine Region`,
        priceUsd: Math.max(8, Number((product.priceUsd * 0.65).toFixed(2))),
        discountPercent: 16,
        deliveryMethodFa: 'کد دیجیتال / اکانت ظرفیتی',
        deliveryMethodEn: 'Instant Code / Capacity',
        warrantyFa: 'دارد (دائمی)',
        warrantyEn: 'Lifetime Warranty',
        deliveryTimeFa: 'فوری (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto',
        descriptionFa: `مخصوص اکانت‌های ریجن ترکیه، اوکراین و اروپا با قیمت اقتصادی و گارانتی کامل.`,
        descriptionEn: `Official digital code or capacity tier for Turkey, Ukraine, and Europe accounts.`,
        colorTheme: 'purple',
        thumbTopText: 'EU / TR',
        thumbMainText: 'CODE',
        thumbSubText: 'INSTANT',
      },
      {
        id: `${product.id}-uk-uae-region`,
        purchaseTypeId: 'region-eu-tr',
        titleFa: `ریجن امارات و انگلیس ${product.platformBrand}`,
        titleEn: `${product.platformBrand} UAE & UK Region Code`,
        priceUsd: product.priceUsd,
        discountPercent: 12,
        deliveryMethodFa: 'کد دیجیتال آنی',
        deliveryMethodEn: 'Instant Digital Code',
        warrantyFa: 'دارد (دائمی)',
        warrantyEn: 'Lifetime Warranty',
        deliveryTimeFa: 'فوری (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto',
        descriptionFa: `کد رسمی استور امارات و انگلیس بدون تاریخ انقضا و با ضمانت اصالت ۱۰۰٪.`,
        descriptionEn: `Official UAE and UK store digital gift card code.`,
        colorTheme: 'blue',
        thumbTopText: 'UAE / UK',
        thumbMainText: 'STORE',
        thumbSubText: 'OFFICIAL',
      },
    ];

    return [
      {
        id: 'region-us',
        titleFa: 'ریجن آمریکا و گلوبال (USA)',
        titleEn: 'USA & Global Region',
        startingPriceToman: convertUsdToToman(usPkgs[0].priceUsd, usdtRate),
        startingPriceUsd: usPkgs[0].priceUsd,
        packages: usPkgs,
      },
      {
        id: 'region-eu-tr',
        titleFa: 'ریجن ترکیه، اوکراین و امارات',
        titleEn: 'Turkey, Ukraine & UAE Regions',
        startingPriceToman: convertUsdToToman(euTrPkgs[0].priceUsd, usdtRate),
        startingPriceUsd: euTrPkgs[0].priceUsd,
        packages: euTrPkgs,
      },
    ];
  }

  // AI, Subscriptions & VPN
  const personalPkgs = basePackages.slice(0, 3).map((p, i) => ({
    ...p,
    purchaseTypeId: 'personal-sub',
    colorTheme: pickColor(i),
    thumbTopText: 'OFFICIAL PLAN',
    thumbMainText: i === 0 ? '1 MO' : i === 1 ? '3 MO' : '6 MO',
    thumbSubText: 'GUARANTEED',
  }));
  const vipAnnualPkgs = basePackages.slice(2).map((p, i) => ({
    ...p,
    purchaseTypeId: 'vip-annual',
    colorTheme: pickColor(i),
    thumbTopText: 'VIP ENTERPRISE',
    thumbMainText: i === 0 ? 'PRO' : '1 YEAR',
    thumbSubText: 'MAX SAVINGS',
  }));

  return [
    {
      id: 'personal-sub',
      titleFa: 'اشتراک روی اکانت شخصی',
      titleEn: 'Personal Account Plans',
      startingPriceToman: convertUsdToToman(personalPkgs[0].priceUsd, usdtRate),
      startingPriceUsd: personalPkgs[0].priceUsd,
      packages: personalPkgs,
    },
    {
      id: 'vip-annual',
      titleFa: 'پلن‌های بلندمدت و VIP',
      titleEn: 'Long-Term & VIP Bundles',
      startingPriceToman: convertUsdToToman(vipAnnualPkgs[0].priceUsd, usdtRate),
      startingPriceUsd: vipAnnualPkgs[0].priceUsd,
      packages: vipAnnualPkgs,
    },
  ];
}

/**
 * Filters a list of packages by Persian or English search query inside the Dicardo modal.
 */
export function filterProductPackages(
  packages: ProductPackageOption[],
  query: string
): ProductPackageOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return packages;
  return packages.filter(
    (pkg) =>
      pkg.titleFa.toLowerCase().includes(q) ||
      pkg.titleEn.toLowerCase().includes(q) ||
      pkg.descriptionFa.toLowerCase().includes(q) ||
      (pkg.thumbMainText && pkg.thumbMainText.toLowerCase().includes(q)) ||
      (pkg.thumbSubText && pkg.thumbSubText.toLowerCase().includes(q))
  );
}

/**
 * Deduplicates secondary denomination entries (e.g., codm-cp-2400, pubg-uc-1800,
 * steam-wallet-50, chatgpt-pro-200) when displaying unified
 * Dicardo brand cards so each brand/game appears once as a sleek parent hub.
 */
const SECONDARY_DENOMINATION_IDS = new Set([
  'codm-cp-2400',
  'pubg-uc-1800',
  'steam-wallet-50',
  'chatgpt-pro-200',
  'telegram-stars-500',
]);

export function getUnifiedBrandProducts(
  products: ModasrProduct[]
): ModasrProduct[] {
  return products.filter((p) => !SECONDARY_DENOMINATION_IDS.has(p.id));
}

export function getProductPackages(
  product: ModasrProduct
): ProductPackageOption[] {
  const pickColor = (idx: number): ProductPackageColorTheme =>
    PACKAGE_COLOR_SEQUENCE[idx % PACKAGE_COLOR_SEQUENCE.length];

  // Special Dicardo-exact packages for Call of Duty Mobile, Capacity Accounts & Gaming Devices
  if (
    product.id === 'codm-cp-880' ||
    product.id === 'codm-cp-2400' ||
    isCapacityAccountProduct(product) ||
    isGamingDeviceProduct(product)
  ) {
    const types = getProductPurchaseTypes(product);
    return types.flatMap((t) => t.packages);
  }

  // Special Dicardo-exact packages for OpenAI / ChatGPT products
  if (product.id === 'chatgpt-plus' || product.id === 'chatgpt-pro-200') {
    const raw: Array<Omit<ProductPackageOption, 'colorTheme'>> = [
      {
        id: 'api-5usd',
        titleFa: 'اعتبار 5 دلاری API OpenAI',
        titleEn: 'OpenAI API $5 Credit Tier',
        priceUsd: 5.5,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد (کامل)',
        warrantyEn: 'Full Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'شارژ رسمی ۵ دلار اعتبار API OpenAI روی اکانت شخصی شما جهت فراخوانی مدل‌های GPT-4o، o3-mini، Whisper و Embeddings بدون محدودیت.',
        descriptionEn:
          'Official $5 OpenAI API credit loaded onto your account for GPT-4o, o3-mini, Whisper, and Embeddings.',
        badgeFa: 'اقتصادی و محبوب',
        badgeEn: 'Popular Starter',
      },
      {
        id: 'api-10usd',
        titleFa: 'اعتبار 10 دلاری API OpenAI',
        titleEn: 'OpenAI API $10 Credit Tier',
        priceUsd: 10.8,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد (کامل)',
        warrantyEn: 'Full Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'شارژ مستقیم ۱۰ دلار اعتبار API با فاکتور رسمی استرایپ و ارتقای سطح مصرف (Tier) برای توسعه‌دهندگان و استارتاپ‌ها.',
        descriptionEn:
          'Direct $10 OpenAI API credit with official billing receipt and rate-limit tier upgrade.',
      },
      {
        id: 'api-15usd',
        titleFa: 'اعتبار 15 دلاری API OpenAI',
        titleEn: 'OpenAI API $15 Credit Tier',
        priceUsd: 16.0,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد (کامل)',
        warrantyEn: 'Full Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'بسته ۱۵ دلاری مناسب پروژه‌های تلگرامی، چت‌بات‌های پشتیبانی سایت و پردازش صوت و متن با پایداری ۱۰۰٪.',
        descriptionEn:
          '$15 API credit bundle ideal for production chatbots, RAG pipelines, and voice assistants.',
      },
      {
        id: 'plus-1m-personal',
        titleFa: 'اشتراک ۱ ماهه ChatGPT Plus (ایمیل شخصی)',
        titleEn: 'ChatGPT Plus 1-Month (Personal Email)',
        priceUsd: 20.0,
        deliveryMethodFa: 'روی ایمیل شخصی شما',
        deliveryMethodEn: 'Personal Email Activation',
        warrantyFa: 'دارد (۳۰ روز کامل)',
        warrantyEn: '30-Day Full Guarantee',
        deliveryTimeFa: 'آنی تا ۱ ساعت',
        deliveryTimeEn: 'Instant - 1 Hour',
        descriptionFa:
          'فعال‌سازی رسمی اشتراک ChatGPT Plus روی ایمیل شخصی شما با دسترسی کامل به GPT-4o، مدل‌های استدلالی o3، ساخت تصویر و تحلیل فایل.',
        descriptionEn:
          'Official ChatGPT Plus subscription activated directly on your personal email with full GPT-4o and o3 access.',
        badgeFa: 'پرفروش‌ترین پنل',
        badgeEn: 'Best Seller',
      },
      {
        id: 'api-30usd',
        titleFa: 'اعتبار 30 دلاری API OpenAI',
        titleEn: 'OpenAI API $30 Credit Tier',
        priceUsd: 31.5,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد (کامل)',
        warrantyEn: 'Full Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'شارژ ۳۰ دلاری ویژه تیم‌های فنی و اپلیکیشن‌های پرمصرف با دسترسی به بالاترین Rate Limit و مدل‌های نسل جدید.',
        descriptionEn:
          '$30 API credit tier for engineering teams and high-throughput AI applications.',
      },
      {
        id: 'api-50usd',
        titleFa: 'اعتبار 50 دلاری API OpenAI (سازمانی)',
        titleEn: 'OpenAI API $50 Enterprise Credit',
        priceUsd: 52.0,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد (کامل)',
        warrantyEn: 'Full Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa:
          'اعتبار ۵۰ دلاری سازمانی همراه با وریفای کامل حساب و پشتیبانی اختصاصی ۲۴ ساعته مدثر.',
        descriptionEn:
          '$50 Enterprise OpenAI API credit with verified billing profile and priority 24/7 support.',
      },
      {
        id: 'pro-200usd',
        titleFa: 'اشتراک ۱ ماهه ChatGPT Pro ($200 نامحدود)',
        titleEn: 'ChatGPT Pro $200 Unlimited Tier',
        priceUsd: 200.0,
        deliveryMethodFa: 'روی ایمیل شخصی شما',
        deliveryMethodEn: 'Personal Email Activation',
        warrantyFa: 'دارد (VIP کامل)',
        warrantyEn: 'Full VIP Warranty',
        deliveryTimeFa: 'آنی تا ۱ ساعت',
        deliveryTimeEn: 'Instant - 1 Hour',
        descriptionFa:
          'بالاترین پلن OpenAI شامل دسترسی نامحدود به o1 Pro Mode، GPT-4.5 و تولید ویدیوی Sora بدون هیچ سقف مصرف.',
        descriptionEn:
          'Ultimate OpenAI tier with unlimited o1 Pro Mode, GPT-4.5, and Sora video generation.',
        badgeFa: 'پلن VIP نامحدود',
        badgeEn: 'Unlimited VIP',
      },
    ];
    return raw.map((item, idx) => ({ ...item, colorTheme: pickColor(idx) }));
  }

  // Category-aware package generation for all other products
  if (product.category === 'ai') {
    const base = product.priceUsd;
    const raw: Array<Omit<ProductPackageOption, 'colorTheme'>> = [
      {
        id: `${product.id}-starter`,
        titleFa: `پنل پایه / تستی ${product.platformBrand} (۷ روزه / اعتبار ۵ دلاری)`,
        titleEn: `${product.platformBrand} Starter / $5 Credit Panel`,
        priceUsd: Math.max(5, Number((base * 0.35).toFixed(2))),
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'آنی تا ۱ ساعت',
        deliveryTimeEn: 'Instant - 1 Hour',
        descriptionFa: `بسته اقتصادی و تستی ${product.titleFa} جهت بررسی سرعت، کیفیت پاسخ‌دهی و ابزارهای هوش مصنوعی بدون محدودیت.`,
        descriptionEn: `Starter package for ${product.titleEn} to test models and capabilities with full warranty.`,
      },
      {
        id: `${product.id}-1m-shared`,
        titleFa: `اشتراک ۱ ماهه اقتصادی ${product.platformBrand} (نصف قیمت)`,
        titleEn: `${product.platformBrand} 1-Month Economy Plan`,
        priceUsd: Math.max(8, Number((base * 0.55).toFixed(2))),
        deliveryMethodFa: 'اکانت آماده وریفای‌شده',
        deliveryMethodEn: 'Verified Ready Account',
        warrantyFa: 'دارد (۳۰ روز کامل)',
        warrantyEn: '30-Day Warranty',
        deliveryTimeFa: 'تحویل آنی',
        deliveryTimeEn: 'Instant Delivery',
        descriptionFa: `دسترسی کامل ۱ ماهه به تمام قابلیت‌های پرمیوم ${product.platformBrand} با هزینه اقتصادی و گارانتی تعویض آنی.`,
        descriptionEn: `1-Month economy access to all premium features of ${product.platformBrand} with instant replacement guarantee.`,
      },
      {
        id: `${product.id}-1m-dedicated`,
        titleFa: `اشتراک ۱ ماهه اختصاصی ${product.platformBrand} (روی ایمیل شخصی)`,
        titleEn: `${product.platformBrand} 1-Month Dedicated (Personal Email)`,
        priceUsd: base,
        deliveryMethodFa: product.deliveryFa,
        deliveryMethodEn: product.deliveryEn,
        warrantyFa: 'دارد (کامل تا پایان دوره)',
        warrantyEn: 'Full Period Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa: `فعال‌سازی ۱۰۰٪ قانونی و اختصاصی ${product.titleFa} روی ایمیل شخصی شما بدون نیاز به اشتراک‌گذاری با سایر کاربران.`,
        descriptionEn: `100% official dedicated activation on your personal email with complete privacy and warranty.`,
        badgeFa: 'پیشنهاد ویژه',
        badgeEn: 'Recommended',
      },
      {
        id: `${product.id}-3m-dedicated`,
        titleFa: `اشتراک ۳ ماهه اختصاصی ${product.platformBrand} (۱۰٪ تخفیف)`,
        titleEn: `${product.platformBrand} 3-Month Dedicated (10% Off)`,
        priceUsd: Number((base * 2.7).toFixed(2)),
        deliveryMethodFa: 'روی ایمیل شخصی شما',
        deliveryMethodEn: 'Personal Email Activation',
        warrantyFa: 'دارد (۹۰ روز کامل)',
        warrantyEn: '90-Day Full Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa: `تمدید ۳ ماهه بدون دغدغه ${product.platformBrand} با ۱۰ درصد تخفیف ویژه و پشتیبانی VIP تلگرام.`,
        descriptionEn: `3-Month continuous subscription with 10% bundle discount and priority VIP support.`,
      },
      {
        id: `${product.id}-annual-vip`,
        titleFa: `اشتراک ۱ ساله سازمانی ${product.platformBrand} (پکیج VIP)`,
        titleEn: `${product.platformBrand} 1-Year Enterprise VIP`,
        priceUsd: Number((base * 9.8).toFixed(2)),
        deliveryMethodFa: 'فعالسازی مستقیم + فاکتور رسمی',
        deliveryMethodEn: 'Direct Activation + Invoice',
        warrantyFa: 'دارد (۳۶۵ روز طلایی)',
        warrantyEn: '365-Day Gold Warranty',
        deliveryTimeFa: '۱-۲ ساعت',
        deliveryTimeEn: '1-2 Hours',
        descriptionFa: `پلن یک‌ساله با بیشترین صرفه‌جویی اقتصادی، تضمین عدم قطعی و اولویت در پشتیبانی ۲۴/۷ مدثر.`,
        descriptionEn: `Annual enterprise tier with maximum savings and 365-day uninterrupted guarantee.`,
      },
    ];
    return raw.map((item, idx) => ({ ...item, colorTheme: pickColor(idx) }));
  }

  if (product.category === 'gaming') {
    const raw: Array<Omit<ProductPackageOption, 'colorTheme'>> = [
      {
        id: `${product.id}-5usd`,
        titleFa: `گیفت کارت 5 دلاری ${product.platformBrand}`,
        titleEn: `${product.platformBrand} $5 Official Gift Card`,
        priceUsd: 5.2,
        deliveryMethodFa: 'کد دیجیتال آنی در پنل',
        deliveryMethodEn: 'Instant Digital Code',
        warrantyFa: 'ضمانت اورجینال دائمی',
        warrantyEn: 'Lifetime Original Guarantee',
        deliveryTimeFa: 'تحویل آنی (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto-Delivery',
        descriptionFa: `کد دیجیتال رسمی ۵ دلاری ${product.platformBrand} قابل ردیم فوری در استور اصلی بدون تاریخ انقضا.`,
        descriptionEn: `Official $5 digital redemption code delivered immediately upon checkout.`,
      },
      {
        id: `${product.id}-10usd`,
        titleFa: `گیفت کارت 10 دلاری ${product.platformBrand}`,
        titleEn: `${product.platformBrand} $10 Official Gift Card`,
        priceUsd: 10.2,
        deliveryMethodFa: 'کد دیجیتال آنی در پنل',
        deliveryMethodEn: 'Instant Digital Code',
        warrantyFa: 'ضمانت اورجینال دائمی',
        warrantyEn: 'Lifetime Original Guarantee',
        deliveryTimeFa: 'تحویل آنی (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto-Delivery',
        descriptionFa: `کد اورجینال ۱۰ دلاری ${product.platformBrand} مناسب خرید بازی، بتل‌پس و آیتم‌های درون‌برنامه‌ای.`,
        descriptionEn: `Original $10 gift card code for games, DLCs, and in-app purchases.`,
        badgeFa: 'پرفروش‌ترین کد',
        badgeEn: 'Top Seller',
      },
      {
        id: `${product.id}-20usd`,
        titleFa: `گیفت کارت 20 دلاری ${product.platformBrand}`,
        titleEn: `${product.platformBrand} $20 Official Gift Card`,
        priceUsd: 20.0,
        deliveryMethodFa: 'کد دیجیتال آنی در پنل',
        deliveryMethodEn: 'Instant Digital Code',
        warrantyFa: 'ضمانت اورجینال دائمی',
        warrantyEn: 'Lifetime Original Guarantee',
        deliveryTimeFa: 'تحویل آنی (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto-Delivery',
        descriptionFa: `شارژ ۲۰ دلاری کیف پول ${product.platformBrand} با اسکن رسمی و تحویل لحظه‌ای در داشبورد و ایمیل.`,
        descriptionEn: `$20 wallet top-up code with verified serial number and instant dashboard delivery.`,
      },
      {
        id: `${product.id}-50usd`,
        titleFa: `گیفت کارت 50 دلاری ${product.platformBrand}`,
        titleEn: `${product.platformBrand} $50 Official Gift Card`,
        priceUsd: 49.5,
        deliveryMethodFa: 'کد دیجیتال آنی در پنل',
        deliveryMethodEn: 'Instant Digital Code',
        warrantyFa: 'ضمانت اورجینال دائمی',
        warrantyEn: 'Lifetime Original Guarantee',
        deliveryTimeFa: 'تحویل آنی (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto-Delivery',
        descriptionFa: `کد ۵۰ دلاری ویژه پیش‌خرید بازی‌های AAA و اشتراک‌های سالانه با نرخ طلایی مدثر.`,
        descriptionEn: `$50 gift card for AAA game pre-orders and annual store memberships.`,
      },
      {
        id: `${product.id}-100usd`,
        titleFa: `گیفت کارت 100 دلاری ${product.platformBrand} (VIP)`,
        titleEn: `${product.platformBrand} $100 VIP Gift Card`,
        priceUsd: 98.0,
        deliveryMethodFa: 'کد دیجیتال آنی در پنل',
        deliveryMethodEn: 'Instant Digital Code',
        warrantyFa: 'ضمانت اورجینال دائمی',
        warrantyEn: 'Lifetime Original Guarantee',
        deliveryTimeFa: 'تحویل آنی (اتوماتیک)',
        deliveryTimeEn: 'Instant Auto-Delivery',
        descriptionFa: `بالاترین اعتبار گیفت کارت ${product.platformBrand} با تخفیف ویژه خرید عمده و تحویل آنی.`,
        descriptionEn: `$100 maximum denomination gift card with discounted VIP rate.`,
      },
    ];
    return raw.map((item, idx) => ({ ...item, colorTheme: pickColor(idx) }));
  }

  if (product.category === 'ingame') {
    const base = product.priceUsd;
    const raw: Array<Omit<ProductPackageOption, 'colorTheme'>> = [
      {
        id: `${product.id}-pack-small`,
        titleFa: `بسته پایه ${product.platformBrand} (شارژ اقتصادی با آیدی)`,
        titleEn: `${product.platformBrand} Starter Top-Up Pack`,
        priceUsd: Math.max(1.5, Number((base * 0.25).toFixed(2))),
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'آنی تا ۱۵ دقیقه',
        deliveryTimeEn: 'Instant - 15 Mins',
        descriptionFa: `شارژ سریع بسته پایه ${product.platformBrand} فقط با وارد کردن آیدی عددی بازی بدون نیاز به رمز اکانت.`,
        descriptionEn: `Fast starter pack top-up using only your in-game Player ID.`,
      },
      {
        id: `${product.id}-pack-medium`,
        titleFa: `بسته استاندارد ${product.platformBrand} (مناسب بتل‌پس / رویال‌پس)`,
        titleEn: `${product.platformBrand} Standard Battle Pass Pack`,
        priceUsd: Math.max(4.99, Number((base * 0.55).toFixed(2))),
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'آنی تا ۲۰ دقیقه',
        deliveryTimeEn: 'Instant - 20 Mins',
        descriptionFa: `مقدار استاندارد کوین جهت فعال‌سازی سیزن‌پس و گردونه‌های اولیه با ضمانت ۱۰۰٪ سلامت اکانت.`,
        descriptionEn: `Standard coin pack sized perfectly for season Battle Pass / Royale Pass activation.`,
        badgeFa: 'مناسب بتل‌پس',
        badgeEn: 'Battle Pass Size',
      },
      {
        id: `${product.id}-pack-main`,
        titleFa: `${product.titleFa} (بسته اصلی + بونوس رایگان)`,
        titleEn: `${product.titleEn} (Main Pack + Bonus)`,
        priceUsd: base,
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱۰ تا ۳۰ دقیقه',
        deliveryTimeEn: '10 - 30 Mins',
        descriptionFa: `بسته پرفروش ${product.titleFa} همراه با کوین هدیه استور رسمی و انجام سفارش توسط اپراتور احرازشده.`,
        descriptionEn: `Best-selling pack including official store bonus coins and verified fulfillment.`,
        badgeFa: 'پرفروش‌ترین بسته',
        badgeEn: 'Best Seller',
      },
      {
        id: `${product.id}-pack-double`,
        titleFa: `بسته دوبرابر ${product.platformBrand} (پکیج حرفه‌ای گیمرها)`,
        titleEn: `${product.platformBrand} Double Pro Bundle`,
        priceUsd: Number((base * 1.9).toFixed(2)),
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: '۱۵ تا ۳۰ دقیقه',
        deliveryTimeEn: '15 - 30 Mins',
        descriptionFa: `پکیج دو برابری با ۵٪ تخفیف ویژه گیمرهای حرفه‌ای برای فول کردن گردونه‌ها و اسکین‌های متیک.`,
        descriptionEn: `Double coin bundle with 5% discount for mythic draws and premium skins.`,
      },
      {
        id: `${product.id}-pack-whale`,
        titleFa: `فول‌پک VIP ${product.platformBrand} (بیشترین بونوس استور)`,
        titleEn: `${product.platformBrand} Max VIP Vault Pack`,
        priceUsd: Number((base * 4.5).toFixed(2)),
        deliveryMethodFa: 'روی اکانت شما',
        deliveryMethodEn: 'On Your Account',
        warrantyFa: 'دارد',
        warrantyEn: 'Included',
        deliveryTimeFa: 'فوری',
        deliveryTimeEn: 'Instant',
        descriptionFa: `بزرگ‌ترین بسته استور رسمی ${product.platformBrand} با حداکثر شارژ هدیه و پردازش خارج از نوبت.`,
        descriptionEn: `Largest official store vault pack with maximum bonus coins and priority queue processing.`,
      },
    ];
    return raw.map((item, idx) => ({ ...item, colorTheme: pickColor(idx) }));
  }

  // Subscriptions & VPN / Static IP products
  const base = product.priceUsd;
  const raw: Array<Omit<ProductPackageOption, 'colorTheme'>> = [
    {
      id: `${product.id}-1m`,
      titleFa: `اشتراک ۱ ماهه ${product.platformBrand} (فعال‌سازی فوری)`,
      titleEn: `${product.platformBrand} 1-Month Plan`,
      priceUsd:
        product.durationFa.includes('۳ ماه') || product.durationFa.includes('ساله')
          ? Math.max(3.5, Number((base * 0.42).toFixed(2)))
          : base,
      deliveryMethodFa: product.deliveryFa,
      deliveryMethodEn: product.deliveryEn,
      warrantyFa: 'دارد (۳۰ روز کامل)',
      warrantyEn: '30-Day Full Warranty',
      deliveryTimeFa: 'آنی تا ۱ ساعت',
      deliveryTimeEn: 'Instant - 1 Hour',
      descriptionFa: `فعال‌سازی ۱ ماهه ${product.titleFa} با دسترسی کامل به تمام امکانات پرمیوم و پشتیبانی ۲۴ ساعته.`,
      descriptionEn: `1-Month full premium subscription with complete warranty and 24/7 support.`,
    },
    {
      id: `${product.id}-3m`,
      titleFa: `اشتراک ۳ ماهه ${product.platformBrand} (پرفروش و اقتصادی)`,
      titleEn: `${product.platformBrand} 3-Month Popular Plan`,
      priceUsd: product.durationFa.includes('۳ ماه')
        ? base
        : Number((base * 2.6).toFixed(2)),
      deliveryMethodFa: product.deliveryFa,
      deliveryMethodEn: product.deliveryEn,
      warrantyFa: 'دارد (۹۰ روز کامل)',
      warrantyEn: '90-Day Full Warranty',
      deliveryTimeFa: 'آنی تا ۱ ساعت',
      deliveryTimeEn: 'Instant - 1 Hour',
      descriptionFa: `بسته ۳ ماهه ${product.titleFa} با قیمت بسیار به‌صرفه‌تر نسبت به خرید ماهانه و تضمین پایداری تا روز آخر.`,
      descriptionEn: `3-Month subscription package offering significant savings and uninterrupted service.`,
      badgeFa: 'محبوب‌ترین انتخاب',
      badgeEn: 'Most Popular',
    },
    {
      id: `${product.id}-6m`,
      titleFa: `اشتراک ۶ ماهه اختصاصی ${product.platformBrand}`,
      titleEn: `${product.platformBrand} 6-Month Dedicated Plan`,
      priceUsd: Number((base * 4.8).toFixed(2)),
      deliveryMethodFa: product.deliveryFa,
      deliveryMethodEn: product.deliveryEn,
      warrantyFa: 'دارد (۱۸۰ روز کامل)',
      warrantyEn: '180-Day Full Warranty',
      deliveryTimeFa: 'آنی تا ۱ ساعت',
      deliveryTimeEn: 'Instant - 1 Hour',
      descriptionFa: `اشتراک ۶ ماهه بدون دغدغه تمدید، فعال‌سازی قانونی و پشتیبانی اختصاصی در تمام طول دوره.`,
      descriptionEn: `6-Month worry-free subscription with official billing and dedicated support.`,
    },
    {
      id: `${product.id}-12m`,
      titleFa: `اشتراک ۱ ساله طلایی ${product.platformBrand} (بیشترین تخفیف)`,
      titleEn: `${product.platformBrand} 1-Year Gold Plan (Best Value)`,
      priceUsd: Number((base * 8.5).toFixed(2)),
      deliveryMethodFa: product.deliveryFa,
      deliveryMethodEn: product.deliveryEn,
      warrantyFa: 'دارد (۳۶۵ روز کامل)',
      warrantyEn: '365-Day Full Warranty',
      deliveryTimeFa: 'آنی تا ۱ ساعت',
      deliveryTimeEn: 'Instant - 1 Hour',
      descriptionFa: `پکیج ۱ ساله کامل ${product.titleFa} با بالاترین درصد تخفیف و ضمانت کتبی ۳۶۵ روزه مدثر.`,
      descriptionEn: `Full 1-Year subscription with maximum discount and 365-day written guarantee.`,
      badgeFa: 'بیشترین صرفه‌جویی',
      badgeEn: 'Best Value',
    },
  ];
  return raw.map((item, idx) => ({ ...item, colorTheme: pickColor(idx) }));
}

export function getProductCapabilities(
  product: ModasrProduct
): ProductCapabilityItem[] {
  if (product.category === 'ai') {
    return [
      {
        id: 'cap-speech-to-text',
        titleFa: 'تبدیل گفتار به متن (Whisper & Voice)',
        titleEn: 'Speech to Text (Whisper & Voice)',
        descFa:
          'پیاده‌سازی صوت به متن با دقت فوق‌العاده برای زیرنویس، رونویسی جلسات و دستیار صوتی دوطرفه.',
        descEn:
          'High-accuracy audio transcription for subtitles, meeting notes, and real-time voice assistants.',
        iconKey: 'mic',
      },
      {
        id: 'cap-text-to-speech',
        titleFa: 'تبدیل متن به گفتار و پردازش چندوجهی',
        titleEn: 'Text to Speech & Multimodal Output',
        descFa:
          'تولید صدای طبیعی، تصویرسازی دقیق و تحلیل فایل‌های PDF، اکسل و تصاویر پیچیده در چند ثانیه.',
        descEn:
          'Natural voice synthesis, image generation, and deep analysis of PDFs, spreadsheets, and visuals.',
        iconKey: 'volume',
      },
      {
        id: 'cap-embeddings',
        titleFa: 'Embeddings و جست‌وجوی معنایی پیشرفته',
        titleEn: 'Embeddings & Semantic RAG Search',
        descFa:
          'تبدیل متن و اسناد به بردار هوشمند برای جست‌وجوی دقیق و پاسخ‌گویی بر پایه‌ی پایگاه دانش شما (RAG).',
        descEn:
          'Vector embeddings for semantic search and intelligent retrieval-augmented generation (RAG) over your docs.',
        iconKey: 'share',
      },
      {
        id: 'cap-coding',
        titleFa: 'استدلال عمیق و کدنویسی فول‌استک',
        titleEn: 'Deep Reasoning & Full-Stack Coding',
        descFa:
          'دیباگ پروژه‌های نرم‌افزاری، طراحی معماری سیستم و نوشتن کدهای تمیز در Python، TypeScript و بیش از ۴۰ زبان.',
        descEn:
          'Complex debugging, system architecture, and production code generation across 40+ programming languages.',
        iconKey: 'code',
      },
    ];
  }

  if (product.category === 'gaming' || product.category === 'ingame') {
    return [
      {
        id: 'cap-instant-code',
        titleFa: 'تحویل آنی و اتوماتیک در پنل کاربری',
        titleEn: 'Instant Automated Panel Delivery',
        descFa:
          'بلافاصله پس از تکمیل پرداخت، کد دیجیتال یا رسید شارژ اکانت در داشبورد شما ثبت و قابل استفاده است.',
        descEn:
          'Immediately after checkout, your digital code or UID top-up receipt appears in your account dashboard.',
        iconKey: 'zap',
      },
      {
        id: 'cap-official-store',
        titleFa: 'شارژ ۱۰۰٪ قانونی از استور رسمی (ضد بن)',
        titleEn: '100% Official Store Top-Up (Anti-Ban)',
        descFa:
          'تمامی گیفت‌کارت‌ها و کوین‌های بازی با کارت‌های بانکی معتبر بین‌المللی و رسید رسمی خریداری می‌شوند.',
        descEn:
          'All gift cards and in-game currencies are sourced directly from official publishers with zero ban risk.',
        iconKey: 'shield',
      },
      {
        id: 'cap-global-region',
        titleFa: 'پشتیبانی کامل از ریجن‌های محبوب گیمرها',
        titleEn: 'Multi-Region Store Compatibility',
        descFa:
          'سازگاری کامل با اکانت‌های آمریکا، ترکیه، اروپا، امارات و گلوبال بدون تاریخ انقضا.',
        descEn:
          'Full compatibility with US, Turkey, EU, MENA, and Global store accounts with no expiration date.',
        iconKey: 'globe',
      },
      {
        id: 'cap-battlepass',
        titleFa: 'فعال‌سازی بتل‌پس، اسکین و آیتم‌های ویژه',
        titleEn: 'Unlock Battle Passes & Mythic Skins',
        descFa:
          'دسترسی سریع به سیزن‌پس‌های جدید، باندل‌های محدود و خرید مستقیم بازی‌های روز دنیا.',
        descEn:
          'Fast-track access to new season passes, limited-time bundles, and AAA game releases.',
        iconKey: 'sparkles',
      },
    ];
  }

  // Subscriptions & VPN / Static IP
  return [
    {
      id: 'cap-personal-account',
      titleFa: 'فعال‌سازی مستقیم روی اکانت شخصی شما',
      titleEn: 'Direct Activation on Your Personal Account',
      descFa:
        'ارتقای قانونی اشتراک روی ایمیل یا آیدی شخصی شما با حفظ کامل آرشیو، پلی‌لیست‌ها و اطلاعات قبلی.',
      descEn:
        'Official upgrade on your personal account preserving all playlists, chats, and cloud data.',
      iconKey: 'sparkles',
    },
    {
      id: 'cap-dedicated-ip',
      titleFa: 'اتصال پایدار و بدون تحریم در تمام دستگاه‌ها',
      titleEn: 'Uninterrupted Cross-Device Access',
      descFa:
        'استفاده همزمان روی موبایل (iOS / Android)، ویندوز، مک و تلویزیون هوشمند با بالاترین سرعت.',
      descEn:
        'Seamless usage across iOS, Android, Windows, macOS, and Smart TVs with maximum speed.',
      iconKey: 'globe',
    },
    {
      id: 'cap-full-warranty',
      titleFa: 'گارانتی ۱۰۰٪ تا آخرین روز اشتراک',
      titleEn: '100% Full-Term Warranty Protection',
      descFa:
        'تمامی بسته‌های مدثر دارای ضمانت کتبی تا پایان دوره بوده و در صورت هرگونه اختلال فوراً پشتیبانی می‌شوند.',
      descEn:
        'Every subscription tier is backed by a full-period guarantee and priority technical support.',
      iconKey: 'shield',
    },
    {
      id: 'cap-high-speed',
      titleFa: 'کیفیت اورجینال 4K / Lossless و امکانات کامل',
      titleEn: 'Original 4K / Lossless Pro Capabilities',
      descFa:
        'حذف کامل تبلیغات، دانلود آفلاین و باز شدن تمام ابزارهای قفل‌شده نسخه پرمیوم.',
      descEn:
        'Zero ads, offline downloads, and full access to all locked premium features.',
      iconKey: 'cpu',
    },
  ];
}

export function getProductFaqs(product: ModasrProduct): ProductFaqItem[] {
  return [
    {
      qFa: `نحوه تحویل و فعال‌سازی ${product.titleFa} چگونه است؟`,
      qEn: `How is ${product.titleEn} delivered and activated?`,
      aFa: `بسته به پنل انتخابی شما (${product.deliveryFa})، سفارش بلافاصله پس از ثبت در داشبورد مدثر پردازش شده و جزئیات فعال‌سازی یا کد دیجیتال برایتان ارسال می‌گردد.`,
      aEn: `Depending on your selected package (${product.deliveryEn}), your order is processed immediately and delivered via your dashboard and email.`,
    },
    {
      qFa: 'آیا تمام بسته‌ها دارای گارانتی معتبر مدثر هستند؟',
      qEn: 'Do all packages include official Modasr warranty?',
      aFa: 'بله، تمامی بسته‌ها و پنل‌های موجود در این صفحه دارای ضمانت اصالت ۱۰۰٪ و گارانتی کامل تا آخرین روز اشتراک یا مصرف اعتبار هستند.',
      aEn: 'Yes, every package on this page includes a 100% authenticity guarantee and full coverage until the end of your subscription or credit balance.',
    },
    {
      qFa: 'چگونه بهترین بسته یا پنل را متناسب با نیازم انتخاب کنم؟',
      qEn: 'How do I choose the right package for my needs?',
      aFa: 'در بالای صفحه از بخش «برای تغییر نوع خرید یکی را انتخاب کنید» نوع سرویس (مثلاً سی‌پی، اشتراک، آفر یا بتل‌پس) را برگزینید و سپس در لیست «انتخاب بسته» روی دکمه «توضیحات ⓘ» هر کارت بزنید تا جزئیات دقیق آن را مشاهده کنید.',
      aEn: 'Select your purchase type at the top, then click the "Details ⓘ" button on any package card to compare delivery methods and durations.',
    },
    {
      qFa: 'در صورت نیاز به راهنمایی پس از خرید چطور با پشتیبانی ارتباط بگیرم؟',
      qEn: 'How can I reach support after placing my order?',
      aFa: 'تیم پشتیبانی ۲۴/۷ مدثر از طریق چت آنلاین سایت، تلگرام و بخش پیگیری سفارش در کنار شماست تا فعال‌سازی را گام‌به‌گام برایتان انجام دهد.',
      aEn: 'Our 24/7 support team is available via live chat, Telegram, and the Order Tracker to assist you step-by-step.',
    },
  ];
}

export function createPackageCartProduct(
  product: ModasrProduct,
  pkg: ProductPackageOption,
  accountIdentifier?: string
): ModasrProduct {
  const cleanId = accountIdentifier?.trim();
  const idSuffix = cleanId ? ` — [${cleanId}]` : '';
  return {
    ...product,
    id: `${product.id}__${pkg.id}${cleanId ? `__${cleanId}` : ''}`,
    titleFa: `${getDicardoCardTitles(product).titleFa} (${pkg.titleFa})${idSuffix}`,
    titleEn: `${getDicardoCardTitles(product).titleEn} (${pkg.titleEn})${idSuffix}`,
    priceUsd: pkg.priceUsd,
    durationFa: pkg.titleFa,
    durationEn: pkg.titleEn,
    deliveryFa: cleanId
      ? `${pkg.deliveryMethodFa} (${cleanId})`
      : pkg.deliveryMethodFa,
    deliveryEn: cleanId
      ? `${pkg.deliveryMethodEn} (${cleanId})`
      : pkg.deliveryMethodEn,
  };
}




