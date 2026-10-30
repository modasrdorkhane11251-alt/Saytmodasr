import {
  DEFAULT_USDT_RATE_TOMAN,
  MODASR_PRODUCTS,
  ModasrProduct,
  ProductPackageOption,
  convertUsdToToman,
  createPackageCartProduct,
  getDicardoCardTitles,
  getProductPurchaseTypes,
} from './modasrStore';

export type GamingMainCategoryId =
  | 'games'
  | 'topups'
  | 'accounts'
  | 'items-services';

export type GamingPlatformId =
  | 'all'
  | 'mobile'
  | 'pc'
  | 'playstation'
  | 'xbox'
  | 'switch';

export type GamingGenreId =
  | 'all'
  | 'shooter'
  | 'sports'
  | 'open-world-rpg'
  | 'strategy-royale'
  | 'platform-service';

export type ItemsServicesSubFilter =
  | 'all'
  | 'battlepass-skin'
  | 'gaming-subscription'
  | 'gift-card'
  | 'ping-dns'
  | 'controller-hardware';

export type GamingSortOption = 'popular' | 'price-asc' | 'price-desc';

export interface CustomerDeliveryFieldSpec {
  key:
    | 'player_uid'
    | 'player_tag'
    | 'zone_id'
    | 'server_region'
    | 'account_email'
    | 'console_type';
  labelFa: string;
  labelEn: string;
  placeholderFa: string;
  placeholderEn: string;
  required: boolean;
  helperFa: string;
  helperEn: string;
}

export interface GamingAccountMetadata {
  levelOrRankFa: string;
  levelOrRankEn: string;
  capacitySummaryFa: string;
  capacitySummaryEn: string;
  highlightsFa: string[];
  highlightsEn: string[];
  screenshots: Array<{
    id: string;
    titleFa: string;
    titleEn: string;
    badge: string;
    gradient: string;
  }>;
  deliveryConditionsFa: string;
  deliveryConditionsEn: string;
  policyWarningFa: string;
  policyWarningEn: string;
}

export interface GamingCatalogItem {
  id: string;
  product: ModasrProduct;
  mainCategory: GamingMainCategoryId;
   AllCategories: GamingMainCategoryId[];
  subCategory: ItemsServicesSubFilter | 'game-title' | 'currency-topup' | 'verified-account';
  productTypeFa: string;
  productTypeEn: string;
  relatedGameFa: string;
  relatedGameEn: string;
  currencyUnitFa?: string;
  currencyUnitEn?: string;
  genre: Exclude<GamingGenreId, 'all'>;
  supportedPlatforms: Array<Exclude<GamingPlatformId, 'all'>>;
  stockStatus: 'in_stock' | 'limited' | 'out_of_stock';
  requiresPassword: boolean;
  securityNoticeFa: string;
  securityNoticeEn: string;
  requiredCustomerFields: CustomerDeliveryFieldSpec[];
  accountMeta?: GamingAccountMetadata;
  active: boolean;
  featuredRank: number;
}

export interface GamingCategoryCardConfig {
  id: GamingMainCategoryId;
  code: 'A' | 'B' | 'C' | 'D';
  titleFa: string;
  titleEn: string;
  shortTitleFa: string;
  shortTitleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  ctaFa: string;
  ctaEn: string;
  badgeFa: string;
  badgeEn: string;
  accentHex: string;
  glowRgba: string;
  gradientClass: string;
}

export const GAMING_MAIN_CATEGORIES: GamingCategoryCardConfig[] = [
  {
    id: 'games',
    code: 'A',
    titleFa: 'بازی‌های اورجینال کنسول، PC و موبایل',
    titleEn: 'Original Games (Console, PC & Mobile)',
    shortTitleFa: 'بازی‌ها (Games)',
    shortTitleEn: 'Games',
    descriptionFa:
      'جستجو و خرید مستقیم بازی‌های روز پلی‌استیشن، ایکس‌باکس، ویندوز (Steam / Battle.net)، نینتندو سوییچ و موبایل بدون اجبار به انتخاب اولیه پلتفرم.',
    descriptionEn:
      'Browse and buy PlayStation, Xbox, Windows PC, Nintendo Switch, and Mobile games with optional platform and genre filters.',
    ctaFa: 'مشاهده کاتالوگ بازی‌ها',
    ctaEn: 'Explore Games Catalog',
    badgeFa: 'کد دیجیتال و نسخه کامل',
    badgeEn: 'Full Games & Keys',
    accentHex: '#F43F5E',
    glowRgba: 'rgba(244, 63, 94, 0.35)',
    gradientClass: 'from-[#280610] via-[#16040a] to-[#090306]',
  },
  {
    id: 'topups',
    code: 'B',
    titleFa: 'شارژ بازی و ارز درون‌برنامه‌ای',
    titleEn: 'Game Top-Ups & Virtual Currency',
    shortTitleFa: 'شارژ بازی و جم/سی‌پی',
    shortTitleEn: 'Game Top-Ups',
    descriptionFa:
      'واریز سریع و قانونی سی‌پی کالاف دیوتی موبایل، یوسی پابجی، جم کلش، الماس فری‌فایر، روباکس و ولورانت پوینت با انتخاب بسته و ثبت آیدی بازی.',
    descriptionEn:
      'Instant official top-ups for Call of Duty CP, PUBG UC, Free Fire Diamonds, Clash Gems, Roblox Robux, and FC Points.',
    ctaFa: 'انتخاب بازی و شارژ فوری',
    ctaEn: 'Select Game & Top-Up',
    badgeFa: 'واریز آنی با آیدی (UID)',
    badgeEn: 'Instant UID Top-Up',
    accentHex: '#E11D48',
    glowRgba: 'rgba(225, 29, 72, 0.38)',
    gradientClass: 'from-[#2d0712] via-[#18050b] to-[#0a0306]',
  },
  {
    id: 'accounts',
    code: 'C',
    titleFa: 'اکانت‌های گیمینگ و ظرفیتی قانونی',
    titleEn: 'Verified Gaming & Capacity Accounts',
    shortTitleFa: 'اکانت‌های گیمینگ',
    shortTitleEn: 'Gaming Accounts',
    descriptionFa:
      'اکانت‌های ظرفیتی قانونی PS5 / PS4 (ظرفیت ۱، ۲ پرایمری و ۳ سوییچ)، اکانت هوم Xbox و اکانت‌های وریفای‌شده استیم با گارانتی دائمی و قابلیت فروش مجدد.',
    descriptionEn:
      'Verified PS5/PS4 Capacity 1, 2 Primary & 3 Switch accounts, Xbox Home accounts, and Steam accounts with lifetime warranty.',
    ctaFa: 'مشاهده اکانت‌های گیمینگ',
    ctaEn: 'Browse Gaming Accounts',
    badgeFa: 'گارانتی مادام‌العمر + فروش مجدد',
    badgeEn: 'Lifetime Warranty',
    accentHex: '#FB7185',
    glowRgba: 'rgba(251, 113, 133, 0.32)',
    gradientClass: 'from-[#240611] via-[#14040a] to-[#080205]',
  },
  {
    id: 'items-services',
    code: 'D',
    titleFa: 'آیتم‌های درون‌بازی، اشتراک و خدمات گیمینگ',
    titleEn: 'In-Game Items, Subscriptions & Gaming Services',
    shortTitleFa: 'آیتم‌ها، اشتراک و دیوایس',
    shortTitleEn: 'Items & Services',
    descriptionFa:
      'بتل‌پس و اسکین‌های فصل، اشتراک PS Plus و Game Pass، سرویس کاهش پینگ و DNS گیمینگ، گیفت‌کارت‌ها و دسته‌های بازی اورجینال.',
    descriptionEn:
      'Battle Passes, season skins, PS Plus & Game Pass memberships, ExitLag/DNS ping reducers, and official controllers.',
    ctaFa: 'مشاهده آیتم‌ها و خدمات',
    ctaEn: 'View Items & Services',
    badgeFa: 'بتل‌پس · پلاس · DNS · دیوایس',
    badgeEn: 'Passes, Subs & Gear',
    accentHex: '#EF4444',
    glowRgba: 'rgba(239, 68, 68, 0.34)',
    gradientClass: 'from-[#26070d] via-[#150408] to-[#090204]',
  },
];

export const GAMING_PLATFORMS: Array<{
  id: GamingPlatformId;
  labelFa: string;
  labelEn: string;
  shortFa: string;
}> = [
  { id: 'all', labelFa: 'همه پلتفرم‌ها', labelEn: 'All Platforms', shortFa: 'همه' },
  { id: 'mobile', labelFa: 'موبایل (Android / iOS)', labelEn: 'Mobile (Android / iOS)', shortFa: 'موبایل' },
  { id: 'pc', labelFa: 'ویندوز و استیم (Windows / PC)', labelEn: 'Windows / PC', shortFa: 'ویندوز / PC' },
  { id: 'playstation', labelFa: 'پلی‌استیشن (PS5 / PS4)', labelEn: 'PlayStation (PS5 / PS4)', shortFa: 'پلی‌استیشن' },
  { id: 'xbox', labelFa: 'ایکس‌باکس (Xbox Series X|S)', labelEn: 'Xbox Series X|S', shortFa: 'ایکس‌باکس' },
  { id: 'switch', labelFa: 'نینتندو سوییچ (Switch)', labelEn: 'Nintendo Switch', shortFa: 'نینتندو سوییچ' },
];

export const GAMING_GENRES: Array<{
  id: GamingGenreId;
  labelFa: string;
  labelEn: string;
}> = [
  { id: 'all', labelFa: 'همه سبک‌های بازی', labelEn: 'All Genres' },
  { id: 'shooter', labelFa: 'اکشن، شوتر و بتل‌رویال', labelEn: 'Action, Shooter & Battle Royale' },
  { id: 'sports', labelFa: 'ورزشی و رقابتی (FC 25)', labelEn: 'Sports & Competitive' },
  { id: 'open-world-rpg', labelFa: 'جهان‌باز، داستانی و نقش‌آفرینی', labelEn: 'Open-World & Action RPG' },
  { id: 'strategy-royale', labelFa: 'استراتژی و موبا (Clash / MLBB)', labelEn: 'Strategy & MOBA' },
  { id: 'platform-service', labelFa: 'اشتراک، گیفت‌کارت و تجهیزات', labelEn: 'Subscriptions, Gift Cards & Gear' },
];

const UID_ONLY_FIELDS: CustomerDeliveryFieldSpec[] = [
  {
    key: 'player_uid',
    labelFa: 'آیدی عددی بازیکن (Player UID)',
    labelEn: 'In-Game Player UID',
    placeholderFa: 'مثال: 51829403812 (از بخش پروفایل بازی کپی کنید)',
    placeholderEn: 'e.g. 51829403812',
    required: true,
    helperFa: 'شارژ مستقیماً از درگاه رسمی روی آیدی عددی شما واریز می‌شود و نیازی به رمز عبور نیست.',
    helperEn: 'Top-up is sent directly to your numeric Player ID. Never share your password.',
  },
  {
    key: 'server_region',
    labelFa: 'نام اکانت در بازی یا ریجن سرور (جهت تطبیق نام)',
    labelEn: 'In-Game Nickname / Region',
    placeholderFa: 'مثال: Ghost_IR (گلوبال / اروپا)',
    placeholderEn: 'e.g. Ghost_IR (Global / EU)',
    required: false,
    helperFa: 'درج نام داخل بازی به سیستم کمک می‌کند صحت آیدی شما را پیش از واریز بررسی کند.',
    helperEn: 'Helps verify that the UID belongs to your in-game profile before fulfillment.',
  },
];

const CODM_DELIVERY_FIELDS: CustomerDeliveryFieldSpec[] = [
  {
    key: 'player_uid',
    labelFa: 'Player UID یا شناسه اکانت اکتیویژن (Activision ID)',
    labelEn: 'Player UID / Activision Tag',
    placeholderFa: 'مثال: UID: 6742910482 یا ایمیل اکتیویژن...',
    placeholderEn: 'e.g. 6742910482 or Activision ID',
    required: true,
    helperFa: 'هرگز رمز عبور ایمیل شخصی خود را وارد نکنید؛ برای بسته‌های UID فقط شماره آیدی کافی است.',
    helperEn: 'Never enter your personal email password; UID packages only require your Player ID.',
  },
  {
    key: 'server_region',
    labelFa: 'ریجن اکانت کالاف دیوتی موبایل',
    labelEn: 'Call of Duty Mobile Account Region',
    placeholderFa: 'ایران (۲۰ سی‌پی) / هند (۱۰ سی‌پی) / اروپا (۳۰ سی‌پی)',
    placeholderEn: 'Iran / India / Europe Region',
    required: true,
    helperFa: 'انتخاب ریجن برای تطبیق دقیق بسته‌های Supply Pass و آفرها استفاده می‌شود.',
    helperEn: 'Used to match regional Supply Pass and special offer denominations.',
  },
];

const SUPERCELL_DELIVERY_FIELDS: CustomerDeliveryFieldSpec[] = [
  {
    key: 'player_tag',
    labelFa: 'تگ بازیکن (Player Tag با علامت #) یا ایمیل Supercell ID',
    labelEn: 'Player Tag (#XXXXXX) or Supercell ID Email',
    placeholderFa: 'مثال: #2PP98Q0YL',
    placeholderEn: 'e.g. #2PP98Q0YL',
    required: true,
    helperFa: 'از استور رسمی سوپرسل بدون نیاز به رمز عبور و فقط با تگ بازیکن (#) قابل فعال‌سازی است.',
    helperEn: 'Activated directly via official Supercell Store using your #PlayerTag.',
  },
];

const MLBB_DELIVERY_FIELDS: CustomerDeliveryFieldSpec[] = [
  {
    key: 'player_uid',
    labelFa: 'شماره User ID موبایل لجندز',
    labelEn: 'Mobile Legends User ID',
    placeholderFa: 'مثال: 482910482',
    placeholderEn: 'e.g. 482910482',
    required: true,
    helperFa: 'شماره اصلی آیدی که در زیر آواتار پروفایل بازی نمایش داده می‌شود.',
    helperEn: 'Main numeric ID shown below your in-game profile avatar.',
  },
  {
    key: 'zone_id',
    labelFa: 'شماره Zone ID (عدد داخل پرانتز)',
    labelEn: 'Zone ID (Number in parentheses)',
    placeholderFa: 'مثال: 4218',
    placeholderEn: 'e.g. 4218',
    required: true,
    helperFa: 'عدد ۴ یا ۵ رقمی داخل پرانتز در کنار User ID.',
    helperEn: 'The 4-5 digit server zone number shown in parentheses next to User ID.',
  },
];

const ACCOUNT_DELIVERY_FIELDS: CustomerDeliveryFieldSpec[] = [
  {
    key: 'console_type',
    labelFa: 'پلتفرم و ظرفیت انتخابی (PS5 / PS4 / Xbox / Steam)',
    labelEn: 'Target Console / Platform',
    placeholderFa: 'مثال: کنسول PS5 — ظرفیت ۲ پرایمری',
    placeholderEn: 'e.g. PS5 Console — Capacity 2 Primary',
    required: true,
    helperFa: 'مشخصات اکانت قانونی به همراه کد بکاپ و راهنمای گام‌به‌گام نصب برای این کنسول ارسال می‌شود.',
    helperEn: 'Account credentials, backup codes, and setup guide will be tailored to your console.',
  },
  {
    key: 'account_email',
    labelFa: 'شماره تلگرام یا ایمیل جهت دریافت آنی اطلاعات اکانت',
    labelEn: 'Telegram @Username or Email for Delivery',
    placeholderFa: 'مثال: @your_telegram یا email@gmail.com',
    placeholderEn: 'e.g. @your_telegram or email@gmail.com',
    required: false,
    helperFa: 'اطلاعات اکانت علاوه بر پنل سایت، به این آدرس نیز ارسال می‌گردد.',
    helperEn: 'Credentials are delivered both in your MODASR dashboard and to this contact.',
  },
];

const DIGITAL_CODE_FIELDS: CustomerDeliveryFieldSpec[] = [
  {
    key: 'account_email',
    labelFa: 'ایمیل یا آیدی تلگرام جهت دریافت آنی کد دیجیتال (اختیاری)',
    labelEn: 'Email for Instant Digital Code Delivery (Optional)',
    placeholderFa: 'مثال: gamer@gmail.com',
    placeholderEn: 'e.g. gamer@gmail.com',
    required: false,
    helperFa: 'کد دیجیتال بلافاصله در داشبورد سفارش‌های شما نمایش داده می‌شود.',
    helperEn: 'Digital code is displayed immediately in your order dashboard.',
  },
];

export function buildGamingCatalog(
  products: ModasrProduct[] = MODASR_PRODUCTS
): GamingCatalogItem[] {
  const pureGaming = products.filter(
    (p) =>
      (p.category === 'gaming' || p.category === 'ingame') &&
      p.id !== 'codm-cp-2400' &&
      p.id !== 'pubg-uc-1800'
  );

  return pureGaming.map((product, index): GamingCatalogItem => {
    const id = product.id;

    // 1. Mobile & PC Top-Ups (Category B primary)
    if (product.category === 'ingame' || id === 'riot-valorant-points' || id === 'roblox-robux-800') {
      const isCodm = id.startsWith('codm-');
      const isPubg = id.startsWith('pubg-');
      const isFreeFire = id.startsWith('freefire-');
      const isClash = id === 'clash-royale-pass';
      const isBrawl = id === 'brawl-stars-pass';
      const isGenshin = id === 'genshin-welkin-crystals';
      const isMlbb = id === 'mobile-legends-diamonds';
      const isFcMobile = id === 'fc-mobile-points';
      const isValorant = id === 'riot-valorant-points';
      const isRoblox = id === 'roblox-robux-800';

      const relatedGameFa = isCodm
        ? 'کالاف دیوتی موبایل (Call of Duty: Mobile)'
        : isPubg
        ? 'پابجی موبایل (PUBG Mobile)'
        : isFreeFire
        ? 'گارنا فری‌فایر (Garena Free Fire)'
        : isClash
        ? 'کلش آف کلنز و کلش رویال (Clash)'
        : isBrawl
        ? 'براول استارز (Brawl Stars)'
        : isGenshin
        ? 'گنشین ایمپکت (Genshin Impact)'
        : isMlbb
        ? 'موبایل لجندز (Mobile Legends)'
        : isFcMobile
        ? 'اف‌سی موبایل (EA Sports FC Mobile)'
        : isValorant
        ? 'ولورانت و لیگ آف لجندز (Valorant)'
        : 'روبلوکس (Roblox)';

      const relatedGameEn = isCodm
        ? 'Call of Duty: Mobile'
        : isPubg
        ? 'PUBG Mobile'
        : isFreeFire
        ? 'Garena Free Fire'
        : isClash
        ? 'Clash of Clans & Clash Royale'
        : isBrawl
        ? 'Brawl Stars'
        : isGenshin
        ? 'Genshin Impact'
        : isMlbb
        ? 'Mobile Legends: Bang Bang'
        : isFcMobile
        ? 'EA Sports FC Mobile'
        : isValorant
        ? 'Valorant (Riot Games)'
        : 'Roblox';

      const currencyUnitFa = isCodm
        ? 'سی‌پی (CP)'
        : isPubg
        ? 'یوسی (UC)'
        : isFreeFire || isMlbb
        ? 'الماس (Diamonds)'
        : isClash || isBrawl
        ? 'جم و بلیط طلایی (Gems & Pass)'
        : isGenshin
        ? 'کریستال و ولکین مون (Crystals)'
        : isFcMobile
        ? 'اف‌سی پوینت و نقره (FC Points)'
        : isValorant
        ? 'ولورانت پوینت (VP)'
        : 'روباکس (Robux)';

      const currencyUnitEn = isCodm
        ? 'CP (Call of Duty Points)'
        : isPubg
        ? 'UC (Unknown Cash)'
        : isFreeFire || isMlbb
        ? 'Diamonds'
        : isClash || isBrawl
        ? 'Gems & Season Pass'
        : isGenshin
        ? 'Genesis Crystals & Welkin'
        : isFcMobile
        ? 'FC Points & Silver'
        : isValorant
        ? 'Valorant Points (VP)'
        : 'Robux';

      const supportedPlatforms: Array<Exclude<GamingPlatformId, 'all'>> = isValorant
        ? ['pc', 'playstation', 'xbox']
        : isGenshin || isRoblox
        ? ['mobile', 'pc', 'playstation', 'xbox']
        : ['mobile'];

      const fields = isCodm
        ? CODM_DELIVERY_FIELDS
        : isClash || isBrawl
        ? SUPERCELL_DELIVERY_FIELDS
        : isMlbb
        ? MLBB_DELIVERY_FIELDS
        : isValorant || isRoblox
        ? DIGITAL_CODE_FIELDS
        : UID_ONLY_FIELDS;

      // Also include Battle Pass / Skin items in Category D ('items-services') and playable games in 'games'
      const allCats: GamingMainCategoryId[] = ['topups'];
      if (isClash || isBrawl || isCodm || isPubg || isGenshin || isFcMobile || isValorant || isRoblox) {
        allCats.push('items-services');
      }

      return {
        id,
        product,
        mainCategory: 'topups',
        AllCategories: allCats,
        subCategory: 'currency-topup',
        productTypeFa: `شارژ فوری ${currencyUnitFa}`,
        productTypeEn: `Instant ${currencyUnitEn} Top-Up`,
        relatedGameFa,
        relatedGameEn,
        currencyUnitFa,
        currencyUnitEn,
        genre:
          isCodm || isPubg || isFreeFire || isValorant
            ? 'shooter'
            : isFcMobile
            ? 'sports'
            : isGenshin || isRoblox
            ? 'open-world-rpg'
            : 'strategy-royale',
        supportedPlatforms,
        stockStatus: 'in_stock',
        requiresPassword: false,
        securityNoticeFa:
          'بدون نیاز به رمز عبور اکانت · شارژ مستقیم و ۱۰۰٪ قانونی با رسید استور رسمی (ضد بن)',
        securityNoticeEn:
          'No Account Password Required · 100% Official Store Top-Up with Anti-Ban Guarantee',
        requiredCustomerFields: fields,
        active: true,
        featuredRank: index + 1,
      };
    }

    // 2. Gaming Accounts & Capacity / Full Game Titles (Categories A & C)
    if (
      id === 'ps5-fc25-capacity' ||
      id === 'ps5-bo6-capacity' ||
      id === 'ps5-gta-rdr-capacity' ||
      id === 'ps5-exclusives-capacity' ||
      id === 'ps5-elden-wukong-capacity'
    ) {
      const isFc25 = id === 'ps5-fc25-capacity';
      const isBo6 = id === 'ps5-bo6-capacity';
      const isGta = id === 'ps5-gta-rdr-capacity';
      const isExcl = id === 'ps5-exclusives-capacity';

      const relatedGameFa = isFc25
        ? 'EA Sports FC 25 (فیفا ۲۵)'
        : isBo6
        ? 'Call of Duty: Black Ops 6'
        : isGta
        ? 'GTA V Online & Red Dead Redemption 2'
        : isExcl
        ? 'Spider-Man 2, God of War Ragnarök & Last of Us'
        : 'Black Myth: Wukong & Elden Ring';

      const relatedGameEn = isFc25
        ? 'EA Sports FC 25'
        : isBo6
        ? 'Call of Duty: Black Ops 6'
        : isGta
        ? 'GTA V & Red Dead Redemption 2'
        : isExcl
        ? 'Marvel Spider-Man 2 & God of War Ragnarök'
        : 'Black Myth: Wukong & Elden Ring';

      const supportedPlatforms: Array<Exclude<GamingPlatformId, 'all'>> = isExcl
        ? ['playstation', 'pc']
        : ['playstation', 'xbox', 'pc'];

      const genre: Exclude<GamingGenreId, 'all'> = isFc25
        ? 'sports'
        : isBo6
        ? 'shooter'
        : 'open-world-rpg';

      return {
        id,
        product,
        mainCategory: 'accounts',
        AllCategories: ['accounts', 'games'],
        subCategory: 'verified-account',
        productTypeFa: 'بازی کامل و اکانت ظرفیتی قانونی',
        productTypeEn: 'Full Game & Official Capacity Account',
        relatedGameFa,
        relatedGameEn,
        genre,
        supportedPlatforms,
        stockStatus: 'in_stock',
        requiresPassword: false,
        securityNoticeFa:
          'خریداری‌شده با گیفت‌کارت رسمی سونی/مایکروسافت · گارانتی مادام‌العمر عدم بن کنسول + قابلیت فروش مجدد',
        securityNoticeEn:
          'Purchased with official store gift cards · Lifetime anti-ban guarantee + trade-in resale option',
        requiredCustomerFields: ACCOUNT_DELIVERY_FIELDS,
        accountMeta: {
          levelOrRankFa:
            'نسخه کامل اورجینال (ظرفیت ۲ پرایمری / ظرفیت ۳ سوییچ / ظرفیت ۱ آفلاین / هوم Xbox)',
          levelOrRankEn:
            'Full Official Edition (Capacity 2 Primary / Capacity 3 Switch / Capacity 1 / Xbox Home)',
          capacitySummaryFa:
            'امکان بازی آنلاین و آفلاین روی پروفایل شخصی خودتان (در ظرفیت ۲ و هوم Xbox) و ثبت تمام تروفی‌ها',
          capacitySummaryEn:
            'Play online & offline on your personal profile (Capacity 2 & Xbox Home) with full trophy progression',
          highlightsFa: [
            'فاکتور رسمی خرید از استور PlayStation / Xbox / Steam',
            'گارانتی مادام‌العمر سلامت اکانت و تضمین ۱۰۰٪ عدم بن شدن کنسول',
            'قابلیت فروش مجدد یا تعویض بازی در مارکت‌پلیس مدثر در هر زمان',
            'تحویل فوری ایمیل، رمز، کدهای بکاپ ۲ مرحله‌ای و راهنمای تصویری نصب',
          ],
          highlightsEn: [
            'Official PlayStation / Xbox / Steam store purchase receipt',
            'Lifetime account health & 100% console anti-ban warranty',
            'Eligible for instant resale or trade-in at MODASR anytime',
            'Includes 2FA backup codes and step-by-step console activation guide',
          ],
          screenshots: [
            {
              id: `${id}-shot-1`,
              titleFa: `گیم‌پلی 4K 60fps ${relatedGameEn}`,
              titleEn: `${relatedGameEn} 4K 60fps Gameplay`,
              badge: '4K HDR · 60 FPS',
              gradient: 'from-rose-600/40 via-red-950/80 to-black',
            },
            {
              id: `${id}-shot-2`,
              titleFa: 'بخش آنلاین، مولتی‌پلیر و تروفی روی اکانت شخصی',
              titleEn: 'Online Multiplayer & Personal Profile Trophies',
              badge: 'ONLINE MULTIPLAYER',
              gradient: 'from-amber-600/35 via-rose-950/80 to-black',
            },
            {
              id: `${id}-shot-3`,
              titleFa: 'تأییدیه لایسنس رسمی استور و کد بکاپ دو مرحله‌ای',
              titleEn: 'Verified Store License & 2FA Backup Security',
              badge: 'VERIFIED LICENSE',
              gradient: 'from-emerald-600/35 via-slate-950/85 to-black',
            },
          ],
          deliveryConditionsFa:
            'تحویل فوری (۱۵ الی ۳۰ دقیقه) در پنل کاربری و تلگرام به همراه آموزش فعال‌سازی Console Sharing and Offline Play.',
          deliveryConditionsEn:
            'Fast delivery (15-30 mins) via user dashboard & Telegram with Console Sharing activation instructions.',
          policyWarningFa:
            'هشدار قوانین انتقال و ناشر: برای حفظ گارانتی مادام‌العمر، از تغییر دادن ایمیل/پسورد اکانت تحویلی یا تغییر وضعیت پرایمری خارج از ظرفیت خریداری‌شده خودداری فرمایید.',
          policyWarningEn:
            'Publisher & Transfer Policy Notice: To maintain your lifetime warranty, do not alter the delivered account email/password or modify Console Sharing outside your purchased capacity tier.',
        },
        active: true,
        featuredRank: index + 1,
      };
    }

    // 3. Store Games & Gift Cards / Subscriptions / Hardware / Services (Categories A & D)
    const isSteam = id.startsWith('steam-wallet');
    const isPsnCard = id === 'playstation-store-25';
    const isPsPlus = id === 'playstation-plus-extra';
    const isGamePass = id === 'xbox-gamepass-ultimate';
    const isSwitch = id === 'nintendo-eshop-20';
    const isBattlenet = id === 'battlenet-balance-20';
    const isRazerGold = id === 'razer-gold-20';
    const isPingDns = id === 'gaming-ping-dns-pro';
    const isHardware =
      id === 'gaming-console-ps5-xbox' ||
      id === 'gaming-controller-dualsense' ||
      id === 'gaming-controller-xbox-windows' ||
      id === 'gaming-controller-mobile-iphone-android' ||
      id === 'gaming-headset-gear';

    const supportedPlatforms: Array<Exclude<GamingPlatformId, 'all'>> = isSteam || isBattlenet
      ? ['pc']
      : isPsnCard || isPsPlus
      ? ['playstation']
      : isGamePass
      ? ['xbox', 'pc']
      : isSwitch
      ? ['switch']
      : id === 'gaming-controller-mobile-iphone-android'
      ? ['mobile']
      : id === 'gaming-controller-xbox-windows'
      ? ['xbox', 'pc', 'mobile']
      : id === 'gaming-controller-dualsense'
      ? ['playstation', 'pc', 'mobile']
      : ['playstation', 'xbox', 'pc', 'mobile'];

    const subCategory: ItemsServicesSubFilter = isPsPlus || isGamePass
      ? 'gaming-subscription'
      : isPingDns
      ? 'ping-dns'
      : isHardware
      ? 'controller-hardware'
      : 'gift-card';

    // Steam, Nintendo eShop, Battle.net, PS Plus, Game Pass also let users discover & buy games in Category A ('games')
    const allCats: GamingMainCategoryId[] = ['items-services'];
    if (isSteam || isSwitch || isBattlenet || isPsPlus || isGamePass || isPsnCard) {
      allCats.push('games');
    }
    if (isRazerGold) {
      allCats.push('topups');
    }

    const relatedGameFa = isSteam
      ? 'استیم و بازی‌های PC (Counter-Strike 2 / Dota 2 / Steam)'
      : isBattlenet
      ? 'بلیزارد بتل‌نت (World of Warcraft / Call of Duty Warzone / Diablo IV)'
      : isSwitch
      ? 'بازی‌های نینتندو سوییچ (Zelda / Super Mario / Switch Online)'
      : isPsPlus
      ? 'کاتالوگ ۴۰۰+ بازی پلی‌استیشن پلاس (PS5 / PS4)'
      : isGamePass
      ? 'کاتالوگ ۴۰۰+ بازی ایکس‌باکس و PC گیم‌پس آلتیمیت'
      : isPsnCard
      ? 'فروشگاه پلی‌استیشن (PlayStation Store PS5 / PS4)'
      : isPingDns
      ? 'سرویس کاهش پینگ و رادار گیمینگ (ExitLag & Console DNS)'
      : getDicardoCardTitles(product).titleFa;

    const relatedGameEn = isSteam
      ? 'Steam PC Games (CS2, Dota 2 & AAA)'
      : isBattlenet
      ? 'Blizzard Battle.net (WoW, Warzone & Diablo IV)'
      : isSwitch
      ? 'Nintendo Switch Games & eShop'
      : isPsPlus
      ? 'PlayStation Plus 400+ Game Catalog'
      : isGamePass
      ? 'Xbox & PC Game Pass Ultimate Catalog'
      : isPsnCard
      ? 'PlayStation Store (PS5 / PS4)'
      : isPingDns
      ? 'ExitLag & Pro Gaming DNS'
      : getDicardoCardTitles(product).titleEn;

    return {
      id,
      product,
      mainCategory: 'items-services',
      AllCategories: allCats,
      subCategory,
      productTypeFa:
        subCategory === 'gaming-subscription'
          ? 'اشتراک رسمی کاتالوگ بازی'
          : subCategory === 'ping-dns'
          ? 'سرویس کاهش پینگ و رفع تحریم گیم'
          : subCategory === 'controller-hardware'
          ? 'دیوایس، کنسول و دسته بازی اورجینال'
          : 'گیفت‌کارت و اعتبار خرید بازی',
      productTypeEn:
        subCategory === 'gaming-subscription'
          ? 'Official Game Catalog Subscription'
          : subCategory === 'ping-dns'
          ? 'Low-Ping Routing & Gaming DNS'
          : subCategory === 'controller-hardware'
          ? 'Official Console & Controller Hardware'
          : 'Official Store Gift Card & Game Credit',
      relatedGameFa,
      relatedGameEn,
      genre: 'platform-service',
      supportedPlatforms,
      stockStatus: 'in_stock',
      requiresPassword: false,
      securityNoticeFa:
        'تحویل آنی کد دیجیتال اورجینال یا پلمپ شرکتی با ضمانت اصالت ۱۰۰٪ مدثر',
      securityNoticeEn:
        'Instant authentic digital code or sealed OEM hardware backed by MODASR warranty',
      requiredCustomerFields: DIGITAL_CODE_FIELDS,
      active: true,
      featuredRank: index + 1,
    };
  });
}

export function getGamingCategoryCounts(
  catalog: GamingCatalogItem[]
): Record<GamingMainCategoryId, number> {
  const activeItems = catalog.filter((item) => item.active);
  return {
    games: activeItems.filter((i) => i.AllCategories.includes('games')).length,
    topups: activeItems.filter((i) => i.AllCategories.includes('topups')).length,
    accounts: activeItems.filter((i) => i.AllCategories.includes('accounts')).length,
    'items-services': activeItems.filter((i) =>
      i.AllCategories.includes('items-services')
    ).length,
  };
}

export interface FilterGamingCatalogOptions {
  category?: GamingMainCategoryId | 'all';
  platform?: GamingPlatformId;
  genre?: GamingGenreId;
  itemsSubFilter?: ItemsServicesSubFilter;
  gameFilter?: string;
  onlyInStock?: boolean;
  sortBy?: GamingSortOption;
  searchQuery?: string;
  includeInactive?: boolean;
}

export function filterGamingCatalog(
  catalog: GamingCatalogItem[],
  options: FilterGamingCatalogOptions = {}
): GamingCatalogItem[] {
  const {
    category = 'all',
    platform = 'all',
    genre = 'all',
    itemsSubFilter = 'all',
    gameFilter = 'all',
    onlyInStock = false,
    sortBy = 'popular',
    searchQuery = '',
    includeInactive = false,
  } = options;

  const q = searchQuery.trim().toLowerCase();
  const gf = gameFilter.trim().toLowerCase();

  const filtered = catalog.filter((item) => {
    if (!includeInactive && !item.active) return false;

    if (category !== 'all' && !item.AllCategories.includes(category)) {
      return false;
    }

    if (platform !== 'all' && !item.supportedPlatforms.includes(platform)) {
      return false;
    }

    if (genre !== 'all' && item.genre !== genre) {
      return false;
    }

    if (
      category === 'items-services' &&
      itemsSubFilter !== 'all' &&
      item.subCategory !== itemsSubFilter
    ) {
      // Allow battlepass-skin to match topup products that include battle passes
      if (itemsSubFilter === 'battlepass-skin' && item.mainCategory === 'topups') {
        // valid battle pass / skin item
      } else {
        return false;
      }
    }

    if (gf && gf !== 'all') {
      const gameHay = `${item.id} ${item.relatedGameFa} ${item.relatedGameEn} ${item.product.titleFa} ${item.product.titleEn}`.toLowerCase();
      if (!gameHay.includes(gf)) return false;
    }

    if (onlyInStock && item.stockStatus === 'out_of_stock') {
      return false;
    }

    if (!q) return true;

    const searchHaystack = [
      item.id,
      item.product.titleFa,
      item.product.titleEn,
      item.product.subtitleFa,
      item.product.subtitleEn,
      item.product.platformBrand,
      item.product.keywords ?? '',
      item.relatedGameFa,
      item.relatedGameEn,
      item.productTypeFa,
      item.productTypeEn,
      item.currencyUnitFa ?? '',
      item.currencyUnitEn ?? '',
      ...item.supportedPlatforms,
    ]
      .join(' ')
      .toLowerCase();

    // Support multi-word queries like "Call of Duty Mobile CP" or "GTA V PC" or "PS5 games"
    const tokens = q.split(/\s+/).filter(Boolean);
    return tokens.every((token) => {
      if (
        token === 'games' ||
        token === 'game' ||
        token === 'gaming' ||
        token === 'بازی' ||
        token === 'گیمینگ' ||
        token === 'گیم'
      ) {
        return true;
      }
      if (token === 'accounts' || token === 'account' || token === 'اکانت') {
        return (
          item.AllCategories.includes('accounts') ||
          searchHaystack.includes('account') ||
          searchHaystack.includes('اکانت')
        );
      }
      return searchHaystack.includes(token);
    });
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.product.priceUsd - b.product.priceUsd;
    }
    if (sortBy === 'price-desc') {
      return b.product.priceUsd - a.product.priceUsd;
    }
    return a.featuredRank - b.featuredRank;
  });
}

export interface SmartSearchSuggestion {
  id: string;
  item: GamingCatalogItem;
  titleFa: string;
  titleEn: string;
  categoryBadgeFa: string;
  categoryBadgeEn: string;
  targetCategory: GamingMainCategoryId;
  startingToman: number;
  priceUsd: number;
}

export function getGamingSearchSuggestions(
  catalog: GamingCatalogItem[],
  query: string,
  usdtRate: number = DEFAULT_USDT_RATE_TOMAN,
  limit: number = 6
): SmartSearchSuggestion[] {
  const q = query.trim();
  if (!q) return [];

  const matched = filterGamingCatalog(catalog, { searchQuery: q });

  return matched.slice(0, limit).map((item) => {
    const dicardo = getDicardoCardTitles(item.product);
    const pTypes = getProductPurchaseTypes(item.product, usdtRate);
    const startingToman =
      pTypes[0]?.startingPriceToman ||
      convertUsdToToman(item.product.priceUsd, usdtRate);

    const catConfig =
      GAMING_MAIN_CATEGORIES.find((c) => c.id === item.mainCategory) ||
      GAMING_MAIN_CATEGORIES[0];

    return {
      id: item.id,
      item,
      titleFa: dicardo.titleFa,
      titleEn: dicardo.titleEn,
      categoryBadgeFa: catConfig.shortTitleFa,
      categoryBadgeEn: catConfig.shortTitleEn,
      targetCategory: item.mainCategory,
      startingToman,
      priceUsd: item.product.priceUsd,
    };
  });
}

export const POPULAR_GAMING_SEARCH_CHIPS: Array<{
  id: string;
  labelFa: string;
  labelEn: string;
  query: string;
  targetCategory: GamingMainCategoryId;
  productId: string;
}> = [
  {
    id: 'chip-codm-cp',
    labelFa: 'سی‌پی کالاف دیوتی موبایل (CP)',
    labelEn: 'Call of Duty Mobile CP',
    query: 'Call of Duty Mobile CP',
    targetCategory: 'topups',
    productId: 'codm-cp-880',
  },
  {
    id: 'chip-pubg-uc',
    labelFa: 'یوسی پابجی موبایل با آیدی (UC)',
    labelEn: 'PUBG Mobile UC',
    query: 'PUBG Mobile UC',
    targetCategory: 'topups',
    productId: 'pubg-uc-660',
  },
  {
    id: 'chip-clash-gems',
    labelFa: 'جم و بلیط طلایی کلش',
    labelEn: 'Clash of Clans Gems',
    query: 'Clash Royale',
    targetCategory: 'topups',
    productId: 'clash-royale-pass',
  },
  {
    id: 'chip-fc25-ps5',
    labelFa: 'بازی و اکانت ظرفیتی FC 25',
    labelEn: 'EA Sports FC 25 PS5',
    query: 'FC 25',
    targetCategory: 'accounts',
    productId: 'ps5-fc25-capacity',
  },
  {
    id: 'chip-gta-pc-ps5',
    labelFa: 'GTA V & Red Dead 2',
    labelEn: 'GTA V PC & PS5',
    query: 'GTA V',
    targetCategory: 'games',
    productId: 'ps5-gta-rdr-capacity',
  },
  {
    id: 'chip-roblox-robux',
    labelFa: 'روباکس روبلوکس (Robux)',
    labelEn: 'Roblox Robux',
    query: 'Roblox Robux',
    targetCategory: 'topups',
    productId: 'roblox-robux-800',
  },
];

export function validateTopUpDeliveryFields(
  fields: CustomerDeliveryFieldSpec[],
  values: Record<string, string>
): { valid: boolean; missingLabelsFa: string[]; formattedSummary: string } {
  const missingLabelsFa: string[] = [];
  const summaryParts: string[] = [];

  for (const field of fields) {
    const rawVal = (values[field.key] || '').trim();
    if (field.required && !rawVal) {
      missingLabelsFa.push(field.labelFa);
    }
    if (rawVal) {
      summaryParts.push(`${field.key.toUpperCase()}: ${rawVal}`);
    }
  }

  return {
    valid: missingLabelsFa.length === 0,
    missingLabelsFa,
    formattedSummary: summaryParts.join(' | '),
  };
}

export function buildCustomizedGamingCartProduct(
  item: GamingCatalogItem,
  selectedPkg: ProductPackageOption,
  fieldValues: Record<string, string>
): ModasrProduct {
  const validation = validateTopUpDeliveryFields(
    item.requiredCustomerFields,
    fieldValues
  );
  return createPackageCartProduct(
    item.product,
    selectedPkg,
    validation.formattedSummary
  );
}
