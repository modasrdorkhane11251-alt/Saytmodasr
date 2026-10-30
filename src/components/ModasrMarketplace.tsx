import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  CreditCard,
  Gamepad2,
  Gift,
  Globe,
  Lock,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tv,
  Wifi,
  Zap,
} from 'lucide-react';
import {
  AI_HERO_POSTER_URL,
  AI_HERO_VIDEO_URL,
  HERO_POSTER_URL,
  HERO_VIDEO_URL,
  WEB_HERO_POSTER_URL,
  WEB_HERO_VIDEO_URL,
  Language,
  SectionId,
  getPageVisualTheme,
} from '../utils/heroConfig';
import {
  AppHubSection,
  AppPlatformFilter,
  AppSubCategoryFilter,
  GamingDeviceFilter,
  GamingHubSection,
  GamingSubCategoryFilter,
  HomeCategorySection,
  MODASR_PRODUCTS,
  ModasrOrder,
  ModasrProduct,
  POPULAR_HOME_HASHTAGS,
  ProductCategory,
  convertUsdToToman,
  filterAppHubProducts,
  filterGamingHubProducts,
  filterModasrProducts,
  formatToman,
  getAppHubSections,
  getCategoryCounts,
  getGamingHubSections,
  getHomeCategorizedSections,
  getUnifiedBrandProducts,
} from '../utils/modasrStore';
import {
  getSectionRevealVariant,
  useScrollReveal,
} from '../hooks/useScrollReveal';
import { ScrollReveal } from './ScrollReveal';
import { CornerBracketSvg, WireframeGlobeSvg } from './LgpsmIcons';
import { LumoraSkyrangerHero } from './LumoraSkyrangerHero';
import { MeridianFooter } from './MeridianFooter';
import {
  PermioCategoryProductCard,
  ProductSplitCard,
} from './ProductSplitCard';
import { DicardoProductDetailModal } from './DicardoProductDetailModal';
import { GamingMarketplace } from './GamingMarketplace';
import { DashboardPrismEmblem } from './TopDashboardDrawer';

interface ModasrMarketplaceProps {
  activePage?: SectionId;
  lang: Language;
  usdtRate: number;
  onRefreshRate: () => void;
  currencyMode: 'toman' | 'usd';
  onToggleCurrency: (mode: 'toman' | 'usd') => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onAddToCart: (product: ModasrProduct) => void;
  orders: ModasrOrder[];
  activeOrderNumber: string;
  onSelectOrderNumber: (orderNo: string) => void;
  accentHex: string;
  onActivateHeroSection?: (id: SectionId) => void;
  totalCartCount?: number;
  onOpenCart?: () => void;
}

const FAQ_ITEMS = [
  {
    qFa: 'چرا پرداخت آنلاین فعال نیست؟',
    qEn: 'Why is direct online payment currently disabled?',
    aFa: 'در نسخه‌ی فعلی مدثر، برای جلوگیری از هرگونه خطای درگاه و حفظ شفافیت، سفارش شما با قیمت قطعی سرور و کلید یکتا در دیتابیس ثبت می‌شود و هماهنگی پرداخت مستقیماً از طریق پشتیبانی تلگرام (@modasrpanel) انجام می‌گیرد.',
    aEn: 'To ensure 100% transparency and zero gateway errors during rollout, orders are locked at server prices with a unique ID and finalized directly via @modasrpanel support.',
  },
  {
    qFa: 'بعد از ثبت سفارش چه اتفاقی می‌افتد؟',
    qEn: 'What happens immediately after placing an order?',
    aFa: 'بلافاصله یک شماره سفارش یکتا (مانند MDS-84920) به همراه تایم‌لاین رویدادها برای شما صادر می‌شود. کافیست شماره سفارش را برای پشتیبانی ارسال کنید تا تحویل محصول فوراً انجام شود.',
    aEn: 'You immediately receive a unique Order ID (e.g., MDS-84920) with a verifiable event log. Send the ID to support for instant license or account delivery.',
  },
  {
    qFa: 'قیمت نهایی چگونه محاسبه می‌شود؟',
    qEn: 'How is the final product price calculated?',
    aFa: 'قیمت پایه دلاری هر محصول روی سرور ثابت است و معادل تومانی آن مستقیماً بر اساس نرخ لحظه‌ای تتر از صرافی والکس (Wallex) محاسبه و در لحظه ثبت سفارش قفل می‌شود.',
    aEn: 'Base USD prices are locked on the server, and Toman equivalents are computed live from the Wallex USDT rate every 30 seconds.',
  },
  {
    qFa: 'تصاویر و مشخصات محصولات واقعی هستند؟',
    qEn: 'Are the product specifications and regions authentic?',
    aFa: 'بله؛ پیش از خرید، تمام جزئیات شامل مدت اشتراک، حجم، ریجن (آمریکا، اروپا یا گلوبال) و روش تحویل (ایمیل شخصی یا کد دیجیتال) به صورت شفاف درج شده است.',
    aEn: 'Yes. Every product lists its exact duration, region, bandwidth, and delivery method transparently before checkout.',
  },
];

export function renderMarketplaceProductIcon(type: ModasrProduct['iconType']) {
  const className = 'w-6 h-6 text-teal-300';
  switch (type) {
    case 'openai':
    case 'claude':
    case 'cursor':
    case 'gemini':
    case 'midjourney':
      return <Cpu className={className} />;
    case 'vpn':
      return <Wifi className={className} />;
    case 'codm':
    case 'pubg':
    case 'freefire':
    case 'supercell':
    case 'genshin':
      return <Zap className="w-6 h-6 text-amber-300" />;
    case 'steam':
    case 'psn':
    case 'xbox':
    case 'nintendo':
    case 'razer':
    case 'apple':
    case 'googleplay':
      return <Gamepad2 className={className} />;
    case 'telegram':
    case 'discord':
      return <Globe className="w-6 h-6 text-sky-300" />;
    case 'netflix':
    case 'spotify':
    case 'youtube':
    case 'canva':
    case 'tradingview':
    default:
      return <Tv className={className} />;
  }
}

interface MarketplaceProductCardProps {
  product: ModasrProduct;
  cascadeIndex: number;
  lang: Language;
  usdtRate: number;
  currencyMode: 'toman' | 'usd';
  onAddToCart: (product: ModasrProduct) => void;
  onShowDetails: (product: ModasrProduct) => void;
}

function AutoPlayVideo({
  src,
  poster,
  className,
  testId,
}: {
  src: string;
  poster?: string;
  className?: string;
  testId?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const ensurePlaying = () => {
      if (!el) return;
      el.muted = true;
      el.defaultMuted = true;
      el.playsInline = true;
      el.setAttribute('muted', '');
      el.setAttribute('playsinline', '');
      el.setAttribute('webkit-playsinline', '');
      if (el.paused) {
        const playPromise = el.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };

    ensurePlaying();

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  ensurePlaying();
                }
              });
            },
            { rootMargin: '300px 0px 300px 0px', threshold: 0.01 }
          )
        : null;

    if (observer) {
      observer.observe(el);
    }

    window.addEventListener('touchstart', ensurePlaying, { passive: true });
    window.addEventListener('scroll', ensurePlaying, { passive: true });
    window.addEventListener('click', ensurePlaying, { passive: true });
    document.addEventListener('visibilitychange', ensurePlaying);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('touchstart', ensurePlaying);
      window.removeEventListener('scroll', ensurePlaying);
      window.removeEventListener('click', ensurePlaying);
      document.removeEventListener('visibilitychange', ensurePlaying);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      data-testid={testId}
      src={src}
      poster={poster}
      preload="auto"
      autoPlay
      muted
      loop
      playsInline
      onLoadedData={(e) => {
        const el = e.currentTarget;
        el.muted = true;
        if (el.paused) el.play().catch(() => {});
      }}
      onCanPlay={(e) => {
        const el = e.currentTarget;
        el.muted = true;
        if (el.paused) el.play().catch(() => {});
      }}
      className={className}
    />
  );
}

function MarketplaceProductCard({
  product,
  cascadeIndex,
  lang,
  usdtRate,
  currencyMode,
  onAddToCart,
  onShowDetails,
}: MarketplaceProductCardProps) {
  const cardReveal = useScrollReveal<HTMLDivElement>('slide-up', {
    cascadeIndex,
    threshold: 0.01,
    rootMargin: '120px 0px 120px 0px',
  });

  return (
    <div
      ref={cardReveal.ref}
      className="animate-fade-up h-full"
    >
      <ProductSplitCard
        product={product}
        cascadeIndex={cascadeIndex}
        lang={lang}
        usdtRate={usdtRate}
        currencyMode={currencyMode}
        onAddToCart={onAddToCart}
        onShowDetails={onShowDetails}
      />
    </div>
  );
}

interface PermioCategoryShowcaseSectionProps {
  section: HomeCategorySection;
  lang: Language;
  usdtRate: number;
  currencyMode: 'toman' | 'usd';
  onAddToCart: (product: ModasrProduct) => void;
  onShowDetails: (product: ModasrProduct) => void;
  onOpenCategoryPage: (
    page: 'ai' | 'games' | 'web' | 'search',
    category: ProductCategory
  ) => void;
}

function PermioCategoryShowcaseSection({
  section,
  lang,
  usdtRate,
  currencyMode,
  onAddToCart,
  onShowDetails,
  onOpenCategoryPage,
}: PermioCategoryShowcaseSectionProps) {
  const isRtl = lang === 'fa';

  const SectionBadgeIcon =
    section.id === 'ingame-coins' || section.id === 'gift-cards'
      ? Gamepad2
      : section.id === 'ai-services'
      ? Cpu
      : section.id === 'music-video'
      ? Tv
      : section.id === 'graphics-vpn'
      ? ShieldCheck
      : Globe;

  return (
    <div
      data-testid={`permio-category-section-${section.id}`}
      className="py-6 sm:py-8 first:pt-2"
    >
      {/* Dicardo-Style Category Header Bar (Matches Screenshot 08-43-50: 3D Badge + Bold Title on Right, Divider Line in Middle, "مشاهده آرشیو" on Left) */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 px-1">
        {/* Right: 3D Category Icon Box + Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#4F46E5] border border-violet-300/50 shadow-[0_8px_22px_rgba(139,92,246,0.4)] flex items-center justify-center text-white shrink-0">
            <SectionBadgeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              {isRtl ? section.titleFa : section.titleEn}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold text-white/60 mt-0.5">
              {isRtl ? section.kickerFa : section.kickerEn}
            </p>
          </div>
        </div>

        {/* Center Horizontal Line */}
        <div
          aria-hidden="true"
          className="flex-1 h-[1px] bg-gradient-to-l from-white/25 via-white/12 to-white/5 mx-1 sm:mx-3"
        />

        {/* Left: "مشاهده آرشیو" Button */}
        <button
          type="button"
          data-testid={`permio-view-all-${section.id}`}
          onClick={() =>
            onOpenCategoryPage(section.targetPage, section.targetCategory)
          }
          className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-violet-600/30 text-white/85 hover:text-white border border-white/15 hover:border-violet-400/50 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <span>{isRtl ? 'مشاهده آرشیو' : 'View Archive'}</span>
          {isRtl ? (
            <ChevronLeft className="w-3.5 h-3.5 text-violet-300" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-violet-300" />
          )}
        </button>
      </div>

      {/* Dicardo 2-Column Mobile / 3-Column Tablet / 4-Column Desktop Unified Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {section.products.slice(0, 4).map((product, idx) => (
          <PermioCategoryProductCard
            key={`${section.id}-${product.id}`}
            product={product}
            cascadeIndex={idx}
            lang={lang}
            usdtRate={usdtRate}
            currencyMode={currencyMode}
            onAddToCart={onAddToCart}
            onShowDetails={onShowDetails}
            testIdPrefix={`permio-card-${section.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ModasrMarketplace({
  activePage = 'home',
  lang,
  usdtRate,
  onRefreshRate,
  currencyMode,
  onToggleCurrency,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  orders,
  activeOrderNumber,
  onSelectOrderNumber,
  onActivateHeroSection,
  totalCartCount = 0,
  onOpenCart,
}: ModasrMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [detailProduct, setDetailProduct] = useState<ModasrProduct | null>(null);
  const [selectedPackageIdx, setSelectedPackageIdx] = useState<number>(0);
  const [playerUidInput, setPlayerUidInput] = useState<string>('');
  const [trackInput, setTrackInput] = useState(activeOrderNumber);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [rateRefreshing, setRateRefreshing] = useState(false);
  const [selectedAiModelId, setSelectedAiModelId] = useState<
    'chatgpt-plus' | 'claude-pro' | 'cursor-pro'
  >('chatgpt-plus');
  const [gamingSubCategory, setGamingSubCategory] =
    useState<GamingSubCategoryFilter>('all');
  const [gamingDevice, setGamingDevice] = useState<GamingDeviceFilter>('all');
  const [appSubCategory, setAppSubCategory] =
    useState<AppSubCategoryFilter>('all');
  const [appPlatform, setAppPlatform] = useState<AppPlatformFilter>('all');
  const [activeCapacityGuideTab, setActiveCapacityGuideTab] = useState<
    'cap2' | 'cap3' | 'cap1' | 'xbox'
  >('cap2');

  useEffect(() => {
    if (activePage === 'games') {
      if (selectedCategory === 'ingame') {
        setGamingSubCategory('ingame');
      } else if (selectedCategory === 'gaming') {
        setGamingSubCategory('all');
      }
    }
  }, [activePage, selectedCategory]);

  const categoryCounts = getCategoryCounts(MODASR_PRODUCTS);
  const gamingHubSections: GamingHubSection[] = getGamingHubSections(MODASR_PRODUCTS);
  const appHubSections: AppHubSection[] = getAppHubSections(MODASR_PRODUCTS);

  // Section-specific Intersection Observer hooks (distinct animation per section)
  const rateBannerReveal = useScrollReveal<HTMLDivElement>('scale-in', {
    threshold: 0.12,
  });
  const bentoHeaderReveal = useScrollReveal<HTMLDivElement>('flip-up', {
    threshold: 0.12,
  });
  const catalogHeaderReveal = useScrollReveal<HTMLDivElement>(
    getSectionRevealVariant('product-catalog'), // 'slide-up'
    { threshold: 0.12 }
  );
  const productGridReveal = useScrollReveal<HTMLDivElement>('slide-up', {
    threshold: 0.01,
    rootMargin: '120px 0px 120px 0px',
  });
  const staticImageSectionReveal = useScrollReveal<HTMLDivElement>(
    getSectionRevealVariant('static-image-section'), // 'fade-up'
    { threshold: 0.12 }
  );
  const lowerFeatureBlockReveal = useScrollReveal<HTMLDivElement>(
    getSectionRevealVariant('lower-feature-block'), // 'fade-up'
    { threshold: 0.12, delayMs: 120 }
  );

  const isRtl = lang === 'fa';

  // Determine effective category filter per dedicated page
  const effectiveCategory: ProductCategory =
    activePage === 'ai'
      ? 'ai'
      : activePage === 'games'
      ? selectedCategory === 'gaming' || selectedCategory === 'ingame'
        ? selectedCategory
        : 'gaming'
      : activePage === 'web'
      ? selectedCategory === 'vpn' || selectedCategory === 'subscriptions'
        ? selectedCategory
        : 'vpn'
      : selectedCategory;

  const rawFilteredProducts =
    activePage === 'games'
      ? filterGamingHubProducts(
          MODASR_PRODUCTS,
          gamingSubCategory,
          gamingDevice,
          searchQuery
        )
      : activePage === 'web'
      ? filterAppHubProducts(
          MODASR_PRODUCTS,
          appSubCategory,
          appPlatform,
          searchQuery
        )
      : filterModasrProducts(
          MODASR_PRODUCTS,
          effectiveCategory,
          searchQuery,
          brandFilter
        );

  const filteredProducts =
    searchQuery.trim() === ''
      ? getUnifiedBrandProducts(rawFilteredProducts)
      : rawFilteredProducts;

  const rawHomeSections = getHomeCategorizedSections(MODASR_PRODUCTS);
  // Display Mobile Games ("بازی‌های موبایلی") first so CODM & Clash Royale appear right at the top of the home showcase
  const homeCategorizedSections = [
    ...rawHomeSections.filter((s) => s.id === 'ingame-coins'),
    ...rawHomeSections.filter((s) => s.id !== 'ingame-coins'),
  ];

  const trackedOrder =
    orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === activeOrderNumber.trim().toLowerCase()
    ) ?? orders[0];

  const handleRefreshClick = () => {
    setRateRefreshing(true);
    onRefreshRate();
    window.setTimeout(() => setRateRefreshing(false), 450);
  };

  const isHomePage = activePage === 'home';
  const isCatalogPage =
    activePage === 'games' ||
    activePage === 'ai' ||
    activePage === 'web';
  const isOrdersPage = activePage === 'studio';
  const pageTheme = getPageVisualTheme(activePage);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      data-testid="modasr-page-container"
      data-active-page={activePage}
      data-page-theme={pageTheme.id}
      className={`relative z-20 bg-transparent text-white font-vazir ${
        isHomePage || activePage === 'search' ? 'pb-0' : 'pb-24'
      }`}
    >
      {/* 0A. DEDICATED SEARCH PAGE — ONLY THE 3D INTERACTIVE ASTRONAUT BOY & SMART SEARCH ('search') */}
      {activePage === 'search' && (
        <section
          data-testid="search-lumora-hero-section"
          className="w-full"
        >
          <LumoraSkyrangerHero
            onAddToCart={onAddToCart}
            usdtRate={usdtRate}
            externalSearchQuery={searchQuery}
            onExternalSearchChange={setSearchQuery}
          />
        </section>
      )}

      {/* 0. HOME / DASHBOARD COMMAND OVERVIEW (Only on 'home' page) */}
      {isHomePage && (
        <section
          data-testid="home-dashboard-overview"
          className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 pt-6 pb-4"
        >
          <div className="relative overflow-hidden rounded-3xl bg-[#041317]/90 backdrop-blur-2xl border border-teal-500/25 p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            {/* Ambient Emerald & Cyan Glows */}
            <div className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full bg-teal-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-white/10">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-950/70 border border-teal-400/35 shadow-[0_10px_28px_rgba(20,184,166,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <DashboardPrismEmblem isOpen={false} className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/12 border border-teal-400/30 text-[10px] sm:text-xs font-bold text-teal-300 tracking-wider uppercase mb-2">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>
                      {isRtl
                        ? 'MODASR COMMAND HUB · پیشخوان اصلی فروشگاه'
                        : 'MODASR COMMAND HUB · MAIN DASHBOARD'}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-4xl font-black text-white leading-tight">
                    {isRtl
                      ? 'داشبورد یکپارچه محصولات دیجیتال و اشتراک‌های اورجینال'
                      : 'Unified Digital Products & Subscriptions Dashboard'}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/75 mt-2 max-w-2xl leading-relaxed">
                    {isRtl
                      ? 'از دکمه طرح‌دار بالای صفحه، نوار پایین سایت یا کارت‌های زیر، مستقیماً وارد بخش دلخواه شوید.'
                      : 'Use the top crystal emblem button, bottom navigation dock, or cards below to jump into any store hub.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onActivateHeroSection?.('studio')}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-teal-400/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>
                    {isRtl
                      ? `حساب کاربری (${trackedOrder.orderNumber})`
                      : `My Account (${trackedOrder.orderNumber})`}
                  </span>
                </button>
              </div>
            </div>

            {/* 4 Quick Dashboard Metric Cards */}
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-[#031014]/90 border border-teal-500/25">
                <div className="text-[11px] font-medium text-white/65">
                  {isRtl ? 'محصولات فعال فروشگاه' : 'Active Store Products'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tabular-nums mt-1">
                  {categoryCounts.all.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}{' '}
                  <span className="text-xs font-semibold text-teal-400">
                    {isRtl ? 'محصول اورجینال' : 'Verified'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#031014]/90 border border-cyan-500/25">
                <div className="text-[11px] font-medium text-white/65">
                  {isRtl ? 'نرخ لحظه‌ای تتر والکس' : 'Live Wallex USDT Rate'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-teal-300 tabular-nums mt-1">
                  {formatToman(usdtRate, lang)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onActivateHeroSection?.('studio')}
                className="p-4 rounded-2xl bg-[#031014]/90 hover:bg-[#05181e] border border-amber-500/25 hover:border-amber-400/50 text-start transition-all cursor-pointer"
              >
                <div className="text-[11px] font-medium text-white/65">
                  {isRtl ? 'آخرین سفارش ثبت‌شده' : 'Latest Active Order'}
                </div>
                <div className="text-base sm:text-lg font-black text-amber-300 font-mono mt-1 flex items-center justify-between">
                  <span>{trackedOrder.orderNumber}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/70" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => onOpenCart?.()}
                className="p-4 rounded-2xl bg-[#031014]/90 hover:bg-[#05181e] border border-emerald-500/25 hover:border-emerald-400/50 text-start transition-all cursor-pointer"
              >
                <div className="text-[11px] font-medium text-white/65">
                  {isRtl ? 'وضعیت سبد خرید شما' : 'Shopping Cart Status'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-300 tabular-nums mt-1 flex items-center justify-between">
                  <span>
                    {totalCartCount.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}{' '}
                    <span className="text-xs font-semibold text-white/80">
                      {isRtl ? 'آیتم در سبد' : 'Items'}
                    </span>
                  </span>
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                </div>
              </button>
            </div>

            {/* 6 Categorized Page Shortcuts */}
            <div className="relative mt-6 pt-6 border-t border-white/10">
              <div className="text-xs font-bold text-white/90 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  {isRtl
                    ? 'دسته‌بندی‌های تخصصی سایت (کلیک برای ورود به صفحه اختصاصی):'
                    : 'Specialized Store Categories (Click to open dedicated page):'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    id: 'games-card',
                    titleFa: 'اکانت ظرفیتی و دیوایس گیم',
                    titleEn: 'Capacity Accounts & Gear',
                    subFa: `${categoryCounts.gaming.toLocaleString('fa-IR')} محصول گیمینگ`,
                    subEn: `${categoryCounts.gaming} Gaming Items`,
                    accent: 'from-[#280610]/90 to-[#120308]/95 border-rose-500/30 hover:border-rose-400/60 text-rose-300',
                    icon: Gamepad2,
                    onClick: () => {
                      onSelectCategory('gaming');
                      setGamingSubCategory('all');
                      setGamingDevice('all');
                      onActivateHeroSection?.('games');
                    },
                  },
                  {
                    id: 'ingame-card',
                    titleFa: 'جم، سی‌پی و یوسی',
                    titleEn: 'CP, UC & Game Gems',
                    subFa: `${categoryCounts.ingame.toLocaleString('fa-IR')} محصول`,
                    subEn: `${categoryCounts.ingame} Products`,
                    accent: 'from-[#241404]/90 to-[#110a02]/95 border-amber-500/30 hover:border-amber-400/60 text-amber-300',
                    icon: Zap,
                    onClick: () => {
                      onSelectCategory('ingame');
                      onActivateHeroSection?.('games');
                    },
                  },
                  {
                    id: 'ai-card',
                    titleFa: 'هوش مصنوعی و کد',
                    titleEn: 'AI & Coding Pro',
                    subFa: `${categoryCounts.ai.toLocaleString('fa-IR')} محصول`,
                    subEn: `${categoryCounts.ai} Products`,
                    accent: 'from-[#041d28]/90 to-[#020c14]/95 border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300',
                    icon: Cpu,
                    onClick: () => {
                      onSelectCategory('ai');
                      onActivateHeroSection?.('ai');
                    },
                  },
                  {
                    id: 'vpn-card',
                    titleFa: 'وی‌پی‌ان و آی‌پی ثابت',
                    titleEn: 'VPN & Static IP',
                    subFa: `${categoryCounts.vpn.toLocaleString('fa-IR')} محصول`,
                    subEn: `${categoryCounts.vpn} Products`,
                    accent: 'from-[#0c102b]/90 to-[#060818]/95 border-indigo-500/30 hover:border-indigo-400/60 text-indigo-300',
                    icon: Wifi,
                    onClick: () => {
                      onSelectCategory('vpn');
                      onActivateHeroSection?.('web');
                    },
                  },
                  {
                    id: 'subs-card',
                    titleFa: 'تلگرام و اپل‌آیدی',
                    titleEn: 'Telegram & Apple ID',
                    subFa: `${categoryCounts.subscriptions.toLocaleString('fa-IR')} محصول`,
                    subEn: `${categoryCounts.subscriptions} Products`,
                    accent: 'from-[#041a24]/90 to-[#020d14]/95 border-teal-500/30 hover:border-teal-400/60 text-teal-300',
                    icon: Tv,
                    onClick: () => {
                      onSelectCategory('subscriptions');
                      onActivateHeroSection?.('web');
                    },
                  },
                  {
                    id: 'orders-card',
                    titleFa: 'حساب کاربری',
                    titleEn: 'My Account',
                    subFa: isRtl ? 'سفارش‌ها و وضعیت حساب' : 'Orders & Account',
                    subEn: 'Orders & Status',
                    accent: 'from-[#04201a]/90 to-[#020e0c]/95 border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300',
                    icon: ShieldCheck,
                    onClick: () => {
                      onActivateHeroSection?.('studio');
                    },
                  },
                ].map((catItem) => {
                  const IconComp = catItem.icon;
                  return (
                    <button
                      key={catItem.id}
                      type="button"
                      data-testid={`dashboard-cat-${catItem.id}`}
                      onClick={catItem.onClick}
                      className={`group p-3.5 rounded-2xl bg-gradient-to-br border transition-all text-start flex flex-col justify-between cursor-pointer ${catItem.accent}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="w-7 h-7 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shrink-0">
                          <IconComp className="w-3.5 h-3.5" />
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="mt-2.5">
                        <div className="text-xs font-bold text-white">
                          {isRtl ? catItem.titleFa : catItem.titleEn}
                        </div>
                        <div className="mt-1 text-[11px] opacity-85">
                          {isRtl ? catItem.subFa : catItem.subEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Permio-style Popular Hashtag Pill Cloud ("محصولات پر کاربرد:") */}
              <div
                data-testid="permio-popular-hashtags"
                className="mt-5 pt-5 border-t border-white/10"
              >
                <div className="text-xs font-bold text-teal-300 mb-3 flex items-center gap-2">
                  <span>
                    {isRtl ? 'محصولات پر کاربرد:' : 'Popular Products:'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {POPULAR_HOME_HASHTAGS.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      data-testid={`popular-hashtag-${tag.id}`}
                      onClick={() => {
                        const targetProd = MODASR_PRODUCTS.find(
                          (p) => p.id === tag.productId
                        );
                        if (targetProd) {
                          setDetailProduct(targetProd);
                        } else {
                          onSelectCategory(tag.category);
                        }
                      }}
                      className="px-3.5 py-2 rounded-2xl bg-teal-500/12 hover:bg-teal-400 hover:text-slate-950 border border-teal-400/30 text-teal-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      {isRtl ? tag.labelFa : tag.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 1. LIVE WALLEX USDT / TOMAN EXCHANGE RATE BAR — Shown ONLY on 'home' Dashboard */}
      {isHomePage && (
      <section
        id="exchange-rate"
        aria-label={
          isRtl ? 'نرخ لحظه‌ای تتر به تومان' : 'Live USDT Exchange Rate'
        }
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-4"
      >
        <div
          ref={rateBannerReveal.ref}
          data-testid="exchange-rate-banner"
          data-scroll-reveal="scale-in"
          data-revealed="true"
          className="animate-scale-in rounded-3xl bg-[#041317]/90 backdrop-blur-2xl border border-teal-500/25 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_16px_45px_rgba(0,0,0,0.6)]"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>
                {isRtl
                  ? 'WALLEX LIVE RATE · بروزرسانی هر ۳۰ ثانیه'
                  : 'WALLEX LIVE USDT ORACLE · 30S SYNC'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isRtl
                ? 'نرخ لحظه‌ای تتر به تومان'
                : 'Live USDT to Toman Exchange Rate'}
            </h2>
            <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
              {isRtl
                ? 'قیمت تتر مستقیم از Wallex و هر ۳۰ ثانیه تازه می‌شود. معادل دلاری محصولات با همین نرخ و علامت ≈ نمایش داده می‌شود؛ مبلغ سفارش پس از ثبت قفل می‌گردد.'
                : 'USDT rates sync directly from Wallex every 30 seconds. Product equivalents are shown with ≈ and locked upon order creation.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="px-5 py-3.5 rounded-2xl bg-[#030e12] border border-teal-500/30">
              <div className="text-[11px] text-white/70">
                {isRtl ? '۱ تتر (USDT) معادل:' : '1 USDT Equals:'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-teal-400 tabular-nums mt-0.5">
                {formatToman(usdtRate, lang)}
              </div>
            </div>

            {/* Currency Display Toggle (Interactive Segmented Buttons) */}
            <div className="flex items-center bg-[#030e12] p-1 rounded-2xl border border-teal-500/25">
              <button
                type="button"
                onClick={() => onToggleCurrency('toman')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  currencyMode === 'toman'
                    ? 'bg-teal-400 text-slate-950 shadow-sm'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {isRtl ? 'تومان (≈)' : 'IRT (≈)'}
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('usd')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  currencyMode === 'usd'
                    ? 'bg-teal-400 text-slate-950 shadow-sm'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {isRtl ? 'دلار ($)' : 'USD ($)'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleRefreshClick}
              aria-label={isRtl ? 'بروزرسانی نرخ تتر' : 'Refresh USDT rate'}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#030e12] hover:bg-[#05181f] border border-teal-500/30 text-xs text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 text-teal-400 ${
                  rateRefreshing ? 'animate-spin' : ''
                }`}
              />
              <span>{isRtl ? 'بروزرسانی نرخ' : 'Sync Rate'}</span>
            </button>
          </div>
        </div>
      </section>
      )}

      {/* 2. FEATURED BENTO SHOWCASE (منتخب‌های فروشگاهی) — Shown on 'home' Dashboard */}
      {isHomePage && (
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div
          ref={bentoHeaderReveal.ref}
          data-scroll-reveal="flip-up"
          data-revealed={bentoHeaderReveal.isVisible ? 'true' : 'false'}
          className={`${bentoHeaderReveal.revealClassName} mb-8`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {isRtl
              ? 'منتخب‌های فروشگاهی، زنده‌تر و سریع‌تر'
              : 'Featured Storefront Spotlights'}
          </h2>
          <p className="text-sm text-white/60 mt-2">
            {isRtl
              ? 'دسترسی سریع به محصولات محبوب، نرخ‌های بازار و دسته‌های اصلی — با هویت اختصاصی مدثر.'
              : 'Direct access to flagship products, live market rates, and core categories.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bento Card 1: MODASR Connect VPN */}
          <ScrollReveal variant="flip-up" delayMs={0} className="h-full">
            <div
              data-testid="bento-card-vpn"
              onClick={() => {
                onSelectCategory('vpn');
                onActivateHeroSection?.('web');
                document
                  .getElementById('catalog-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-full overflow-hidden rounded-3xl bg-[#040c14] border border-emerald-500/25 hover:border-emerald-400/60 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
            >
              {/* High-Quality Animated Video Background + Natural Dark Vignette */}
              <AutoPlayVideo
                testId="bento-video-vpn"
                src={WEB_HERO_VIDEO_URL}
                poster={WEB_HERO_POSTER_URL}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-55 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02070d]/90 via-[#04111a]/50 to-[#051a24]/30 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'VPN و اپ · CONNECTIVITY' : 'VPN & APPS'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'اتصال پایدار، آماده‌ی کار و دور زدن تحریم'
                    : 'Stable Connection, Shielded Security & Apps'}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                  {isRtl
                    ? 'پلن‌های MODASR Connect، تلگرام پرمیوم و اشتراک اپ‌ها با تحویل آنی.'
                    : 'Compare MODASR Connect VPN nodes and premium app licenses.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{isRtl ? 'مشاهده پلن‌ها' : 'Explore Plans'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="animate-glass-spin-3d w-16 h-16 rounded-2xl bg-emerald-950/60 backdrop-blur-md border border-emerald-400/35 flex flex-col items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                  <span className="font-podium text-2xl font-bold text-emerald-400 leading-none">
                    M
                  </span>
                  <span className="text-[9px] font-bold text-white tracking-widest mt-0.5">
                    VPN
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento Card 2: Artificial Intelligence */}
          <ScrollReveal variant="flip-up" delayMs={120} className="h-full">
            <div
              data-testid="bento-card-ai"
              onClick={() => {
                onSelectCategory('ai');
                onActivateHeroSection?.('ai');
                document
                  .getElementById('catalog-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-full overflow-hidden rounded-3xl bg-[#040b16] border border-cyan-500/25 hover:border-cyan-400/60 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
            >
              {/* High-Quality Animated Video Background + Natural Dark Navy Vignette */}
              <AutoPlayVideo
                testId="bento-video-ai"
                src={AI_HERO_VIDEO_URL}
                poster={AI_HERO_POSTER_URL}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-55 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02060e]/90 via-[#040f1d]/50 to-[#06172b]/30 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'هوش مصنوعی · NEURAL HUB' : 'ARTIFICIAL INTELLIGENCE'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'نسل جدید هوش مصنوعی، بدون پیچیدگی'
                    : 'Next-Gen AI Models, Zero Complexity'}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                  {isRtl
                    ? 'ChatGPT Plus (GPT-4o)، Claude 3.7 Sonnet و Cursor AI Pro با فعال‌سازی رسمی روی ایمیل شخصی.'
                    : 'Select ChatGPT Plus, Claude 3.7 Sonnet, and Cursor Pro with verified personal activation.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{isRtl ? 'ورود به بخش هوش مصنوعی' : 'Explore AI Hub'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="animate-glass-spin-3d w-16 h-16 rounded-2xl bg-cyan-950/60 backdrop-blur-md border border-cyan-400/35 flex flex-col items-center justify-center shadow-[0_0_24px_rgba(6,182,212,0.2)]">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span className="font-orbitron text-[10px] font-bold text-white mt-0.5">
                    AI PRO
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento Card 3: Gaming & Gift Cards */}
          <ScrollReveal variant="flip-up" delayMs={240} className="h-full">
            <div
              data-testid="bento-card-gaming"
              onClick={() => {
                onSelectCategory('gaming');
                onActivateHeroSection?.('games');
                document
                  .getElementById('catalog-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-full overflow-hidden rounded-3xl bg-[#110307] border border-rose-500/25 hover:border-rose-400/60 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
            >
              {/* High-Quality Animated Video Background + Natural Dark Crimson Vignette */}
              <AutoPlayVideo
                testId="bento-video-gaming"
                src={HERO_VIDEO_URL}
                poster={HERO_POSTER_URL}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-55 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060205]/90 via-[#16040a]/50 to-[#280610]/30 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 tracking-wider uppercase">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'گیمینگ، دیوایس و اکانت ظرفیتی · GAMING HUB' : 'CAPACITY ACCOUNTS, DEVICES & GAMING'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'اکانت ظرفیتی PS5، دیوایس‌های گیمینگ و شارژ آنی بازی'
                    : 'PS5 Capacity Accounts, Gaming Gear & Instant Top-Ups'}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                  {isRtl
                    ? 'فروش تخصصی اکانت ظرفیتی قانونی (ظرفیت ۲ و ۳)، کنسول و دسته بازی، سی‌پی/یوسی و گیفت‌کارت استیم و پلی‌استیشن.'
                    : 'Primary & Switch capacity accounts, PS5/Xbox consoles & controllers, CP/UC, and official gaming gift cards.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:translate-x-0.5 transition-transform">
                  <span>
                    {isRtl ? 'مشاهده محصولات گیم' : 'Explore Gaming'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="animate-glass-spin-3d w-16 h-16 rounded-2xl bg-rose-950/60 backdrop-blur-md border border-rose-500/35 flex flex-col items-center justify-center shadow-[0_0_24px_rgba(244,63,94,0.2)]">
                  <Gamepad2 className="w-6 h-6 text-rose-400" />
                  <span className="font-orbitron text-[9px] font-bold text-white mt-0.5">
                    GAME
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 2B. PERMIO-STYLE POPULAR SERVICES HUB ("محبوب‌ترین خدمات · دسترسی سریع به سرویس‌های محبوب") */}
        <div
          data-testid="permio-popular-services-hub"
          className="mt-8 rounded-[32px] bg-gradient-to-b from-[#062c27]/95 via-[#052320]/95 to-[#041819]/98 border border-teal-400/35 p-5 sm:p-8 shadow-[0_22px_55px_rgba(0,0,0,0.65)]"
        >
          <div className="text-start mb-6">
            <p className="text-xs sm:text-sm font-bold text-teal-300">
              {isRtl ? 'محبوب‌ترین خدمات مدثر' : 'Most Popular MODASR Services'}
            </p>
            <h3 className="text-xl sm:text-3xl font-black text-white mt-1 leading-snug">
              {isRtl
                ? 'دسترسی سریع به سرویس‌های محبوب'
                : 'Quick Access to Flagship Services'}
            </h3>
          </div>

          {/* 3 Permio-style Horizontal Spotlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'hub-intl-ai',
                titleFa: 'اکانت‌های هوش مصنوعی و پرداخت ارزی',
                titleEn: 'AI Accounts & Global Payments',
                icon: Globe,
                subIcon: Cpu,
                accent: 'text-teal-300 border-teal-400/40 bg-teal-500/15',
                onClick: () => {
                  onSelectCategory('ai');
                  onActivateHeroSection?.('ai');
                },
              },
              {
                id: 'hub-giftcards',
                titleFa: 'خرید گیفت کارت اورجینال',
                titleEn: 'Buy Official Gift Cards',
                icon: Gift,
                subIcon: CreditCard,
                accent: 'text-emerald-300 border-emerald-400/40 bg-emerald-500/15',
                onClick: () => {
                  onSelectCategory('gaming');
                  onActivateHeroSection?.('games');
                },
              },
              {
                id: 'hub-gaming-coins',
                titleFa: 'خرید بازی و کوین (سی‌پی و یوسی)',
                titleEn: 'Buy Games & In-Game Coins',
                icon: Gamepad2,
                subIcon: Sparkles,
                accent: 'text-cyan-300 border-cyan-400/40 bg-cyan-500/15',
                onClick: () => {
                  onSelectCategory('ingame');
                  onActivateHeroSection?.('games');
                },
              },
            ].map((card) => {
              const MainIcon = card.icon;
              const SubIcon = card.subIcon;
              return (
                <button
                  key={card.id}
                  type="button"
                  data-testid={`permio-hub-card-${card.id}`}
                  onClick={card.onClick}
                  className="group relative overflow-hidden rounded-[26px] bg-[#031315]/95 hover:bg-[#051d20] border border-teal-400/30 hover:border-teal-300/65 p-5 sm:p-6 flex items-center justify-between gap-4 text-start transition-all duration-300 shadow-[0_14px_34px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <div className="flex flex-col justify-between h-full space-y-6">
                    <span className="text-base sm:text-lg font-black text-white group-hover:text-teal-200 transition-colors">
                      {isRtl ? card.titleFa : card.titleEn}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2DD4BF] group-hover:translate-x-[-2px] transition-transform">
                      <span>{isRtl ? 'مشاهده' : 'Explore'}</span>
                      {isRtl ? (
                        <ChevronLeft className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  </div>

                  {/* Permio-style Angled 3D Emblem Illustration on Left */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl -rotate-6 group-hover:rotate-0 transition-transform duration-300 border flex items-center justify-center shadow-lg ${card.accent}`}
                    >
                      <MainIcon className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#041518] border border-teal-400/50 flex items-center justify-center text-teal-300 shadow-md">
                      <SubIcon className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 5 Outlined Emerald Service Box Tiles (2x2 + 1 Full-Width Bottom Box matching permio-mobile-2.png) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
            {[
              {
                id: 'tile-telegram-esim',
                labelFa: 'تلگرام پرمیوم و استارز',
                labelEn: 'Telegram Premium & Stars',
                icon: Globe,
                onClick: () => {
                  onSelectCategory('subscriptions');
                  onActivateHeroSection?.('web');
                },
              },
              {
                id: 'tile-apple-id',
                labelFa: 'اپل آیدی و آیکلود آمریکا',
                labelEn: 'USA Apple ID & iCloud',
                icon: CreditCard,
                onClick: () => {
                  onSelectCategory('subscriptions');
                  onActivateHeroSection?.('web');
                },
              },
              {
                id: 'tile-static-ip',
                labelFa: 'آی‌پی ثابت و سرور ترید',
                labelEn: 'Static IP & Trading VPS',
                icon: Wifi,
                onClick: () => {
                  onSelectCategory('vpn');
                  onActivateHeroSection?.('web');
                },
              },
              {
                id: 'tile-streaming',
                labelFa: 'اسپاتیفای و یوتیوب پرمیوم',
                labelEn: 'Spotify & YouTube Pro',
                icon: Tv,
                onClick: () => {
                  onSelectCategory('subscriptions');
                  onActivateHeroSection?.('web');
                },
              },
            ].map((tile) => {
              const TileIcon = tile.icon;
              return (
                <button
                  key={tile.id}
                  type="button"
                  data-testid={`permio-tile-${tile.id}`}
                  onClick={tile.onClick}
                  className="p-4 sm:p-5 rounded-[22px] bg-teal-500/10 hover:bg-teal-500/20 border border-teal-300/35 hover:border-teal-300/70 flex flex-col items-center justify-center text-center gap-2.5 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-400/15 border border-teal-300/40 flex items-center justify-center text-teal-200">
                    <TileIcon className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    <span>{isRtl ? tile.labelFa : tile.labelEn}</span>
                    {isRtl ? (
                      <ChevronLeft className="w-3.5 h-3.5 text-teal-300" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                    )}
                  </div>
                </button>
              );
            })}

            {/* 5th Full-Width Service Tile (Matches bottom wide tile in permio-mobile-2.png) */}
            <button
              type="button"
              data-testid="permio-tile-all-catalog"
              onClick={() => onActivateHeroSection?.('search')}
              className="col-span-2 lg:col-span-4 p-4 sm:p-5 rounded-[22px] bg-teal-500/10 hover:bg-teal-500/20 border border-teal-300/35 hover:border-teal-300/70 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-400/15 border border-teal-300/40 flex items-center justify-center text-teal-200">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                <span>
                  {isRtl
                    ? 'جستجوی هوشمند و مشاهده تمام ۵۰ سرویس پرمیوم بین‌المللی'
                    : 'Smart Search & Full 50+ International Premium Catalog'}
                </span>
                {isRtl ? (
                  <ChevronLeft className="w-3.5 h-3.5 text-teal-300" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* 2C. PERMIO-STYLE CATEGORIZED PRODUCT SHOWCASE SECTIONS ON HOME PAGE */}
        <div
          id="featured-dashboard-products"
          data-testid="permio-home-categorized-products"
          className="mt-10 pt-4"
        >
          {homeCategorizedSections.map((section) => (
            <PermioCategoryShowcaseSection
              key={section.id}
              section={section}
              lang={lang}
              usdtRate={usdtRate}
              currencyMode={currencyMode}
              onAddToCart={onAddToCart}
              onShowDetails={setDetailProduct}
              onOpenCategoryPage={(page, cat) => {
                onSelectCategory(cat);
                onActivateHeroSection?.(page);
              }}
            />
          ))}
        </div>
      </section>
      )}

      {/* 3. DEDICATED CATEGORY / FULL PRODUCT CATALOG — Shown on 'games', 'ai', 'web', 'search' */}
      {isCatalogPage && (
      <section
        id="catalog-section"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-12"
      >
        {activePage !== 'games' && (
          <div
            ref={catalogHeaderReveal.ref}
            data-scroll-reveal="fade-up"
            data-revealed="true"
            className="animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {activePage === 'web'
                  ? isRtl
                    ? 'مرکز تخصصی اپ‌ها، ویندوز، اندروید، آیفون، کنسول و دسته‌های بازی'
                    : 'App, OS & Gaming Controller Hub: Windows, Android, iPhone, Xbox & PlayStation'
                  : isRtl
                  ? 'از نیازت شروع کن'
                  : 'Start From Your Need'}
              </h2>
              <p className="text-sm text-white/75 mt-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
                {activePage === 'web'
                  ? isRtl
                    ? 'دسته‌بندی اختصاصی ویندوز، اندروید، آیفون، ایکس‌باکس و پلی‌استیشن به همراه دسته‌های بازی اورجینال، اپل‌آیدی، گوگل‌پلی، VPN و اشتراک‌های پرمیوم.'
                    : 'Dedicated Windows, Android, iPhone, Xbox, and PlayStation categories alongside original controllers, Apple ID, Google Play, VPN, and premium apps.'
                  : isRtl
                  ? 'به‌جای گم‌شدن بین صدها گزینه، دسته‌ی مناسب را انتخاب کن و پلن‌ها را با جزئیات کامل مقایسه کن.'
                  : 'Select your category tab to compare duration, region, and server-verified pricing.'}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================================
            DEDICATED GAMING MARKETPLACE (ONLY ON activePage === 'games')
        ==================================================================== */}
        {activePage === 'games' ? (
          <GamingMarketplace
            lang={lang}
            usdtRate={usdtRate}
            currencyMode={currencyMode}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            onAddToCart={onAddToCart}
            onShowDetails={setDetailProduct}
            onOpenCart={onOpenCart}
          />
        ) : activePage === 'web' ? (
          /* ===================================================================
              DEDICATED APP, OS & CONTROLLERS HUB (ONLY ON activePage === 'web')
          ==================================================================== */
          <div data-testid="dedicated-app-hub" className="space-y-8 mb-10">
            {/* 1. APP & CONNECTIVITY SUB-CATEGORY TABS */}
            <div
              data-testid="app-subcategory-bar"
              className={`flex flex-wrap items-center gap-2 p-2 rounded-2xl border ${pageTheme.cardGlassClass} ${pageTheme.cardBorderClass}`}
            >
              {(
                [
                  {
                    id: 'all',
                    fa: 'همه اپ‌ها، پلتفرم‌ها و دسته‌ها',
                    en: 'All Apps, Platforms & Controllers',
                  },
                  {
                    id: 'platform-apps',
                    fa: 'ویندوز، اندروید، آیفون و کنسول',
                    en: 'Windows, Android, iPhone & Console Apps',
                  },
                  {
                    id: 'controllers',
                    fa: 'دسته‌های بازی (ویندوز / موبایل / کنسول)',
                    en: 'Game Controllers (PC / Mobile / Console)',
                  },
                  {
                    id: 'vpn',
                    fa: `اتصال، VPN و DNS گیمینگ (${(categoryCounts.vpn + 1).toLocaleString('fa-IR')})`,
                    en: `VPN, Static IP & Gaming DNS (${categoryCounts.vpn + 1})`,
                  },
                  {
                    id: 'streaming',
                    fa: 'تلگرام پرمیوم، استریم و طراحی',
                    en: 'Telegram Pro, Streaming & Design',
                  },
                ] as Array<{ id: AppSubCategoryFilter; fa: string; en: string }>
              ).map((tab) => {
                const active = appSubCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    data-testid={`app-subtab-${tab.id}`}
                    onClick={() => {
                      setAppSubCategory(tab.id);
                      if (tab.id === 'vpn') {
                        onSelectCategory('vpn');
                      } else {
                        onSelectCategory('subscriptions');
                      }
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? pageTheme.pillActiveClass
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isRtl ? tab.fa : tab.en}
                  </button>
                );
              })}
            </div>

            {/* 2. 5-PLATFORM & CONTROLLER FILTER BAR (ویندوز، اندروید، آیفون، ایکس‌باکس، پلی‌استیشن + دسته‌ها) */}
            <div className="rounded-3xl bg-[#070b1d]/90 backdrop-blur-2xl border border-indigo-500/35 p-4 sm:p-5 shadow-[0_14px_40px_rgba(0,0,0,0.55)] space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>
                      {isRtl
                        ? 'فیلتر بر اساس سیستم‌عامل، پلتفرم و دسته بازی (ویندوز · اندروید · آیفون · ایکس‌باکس · پلی‌استیشن):'
                        : 'Filter by OS, Platform & Gamepad (Windows · Android · iPhone · Xbox · PlayStation):'}
                    </span>
                  </div>
                  <div
                    data-testid="app-platform-filter-bar"
                    className="flex flex-wrap items-center gap-2 mt-3"
                  >
                    {(
                      [
                        { id: 'all', fa: 'همه پلتفرم‌ها و اپ‌ها', en: 'All Platforms & Apps' },
                        {
                          id: 'windows',
                          fa: 'ویندوز (Windows 11 / PC)',
                          en: 'Windows 11 / PC',
                        },
                        {
                          id: 'android',
                          fa: 'اندروید (Google Play / Android)',
                          en: 'Android & Google Play',
                        },
                        {
                          id: 'iphone',
                          fa: 'آیفون (Apple ID / iOS)',
                          en: 'iPhone & Apple ID',
                        },
                        {
                          id: 'xbox',
                          fa: 'ایکس‌باکس (Xbox App & Game Pass)',
                          en: 'Xbox App & Game Pass',
                        },
                        {
                          id: 'ps5',
                          fa: 'پلی‌استیشن (PSN & DualSense)',
                          en: 'PlayStation (PSN & DualSense)',
                        },
                        {
                          id: 'controllers',
                          fa: 'دسته‌های بازی (PC / موبایل / کنسول)',
                          en: 'Controllers (PC / Mobile / Console)',
                        },
                      ] as Array<{ id: AppPlatformFilter; fa: string; en: string }>
                    ).map((plat) => {
                      const isPlatActive = appPlatform === plat.id;
                      return (
                        <button
                          key={plat.id}
                          type="button"
                          data-testid={`app-platform-chip-${plat.id}`}
                          onClick={() => setAppPlatform(plat.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                            isPlatActive
                              ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white border-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.45)]'
                              : 'bg-white/[0.05] border-white/15 text-white/75 hover:text-white hover:border-indigo-400/50'
                          }`}
                        >
                          {isRtl ? plat.fa : plat.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Instant App & Platform Search Input */}
                <div className="w-full lg:w-72 shrink-0">
                  <div className="relative">
                    <Search className="w-4 h-4 text-indigo-300 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <input
                      type="text"
                      data-testid="app-hub-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        isRtl
                          ? 'جستجو در اپ و دسته (ویندوز، آیفون، اندروید، دسته...)'
                          : 'Search Windows, Android, iPhone, Xbox, PS5...'
                      }
                      aria-label={isRtl ? 'جستجو در بخش اتصال و اپ' : 'Search App Hub'}
                      className="w-full bg-black/45 border border-indigo-500/35 focus:border-indigo-400 rounded-2xl pr-10 pl-3.5 py-2.5 text-xs text-white placeholder:text-white/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. WEB, VPN & MULTI-PLATFORM SPOTLIGHT BANNER */}
            <div
              data-testid="vpn-category-spotlight"
              className="relative rounded-3xl overflow-hidden border border-white/45 bg-white/[0.14] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)] animate-scale-in"
            >
              <video
                data-testid="vpn-category-spotlight-video"
                src={WEB_HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-center opacity-100 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#070b1f]/65 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 my-auto">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-200 tracking-wider uppercase mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {isRtl
                        ? 'WINDOWS · ANDROID · IPHONE · XBOX · PLAYSTATION HUB'
                        : 'WINDOWS · ANDROID · IPHONE · XBOX · PLAYSTATION HUB'}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {isRtl
                      ? 'اپ‌ها، لایسنس سیستم‌عامل، دسته‌های بازی و اتصال پایدار برای هر ۵ پلتفرم'
                      : 'Official OS Licenses, Mobile/Console Apps, Controllers & High-Speed VPN'}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
                    {isRtl
                      ? 'از لایسنس اورجینال ویندوز ۱۱ و آفیس ۳۶۵، اپل‌آیدی آیفون و گوگل‌پلی اندروید تا دسته‌های بازی پلی‌استیشن، ایکس‌باکس و موبایل (Backbone / Kishi) به همراه سرورهای آی‌پی ثابت.'
                      : 'From Windows 11 Pro & Office 365, Verified iPhone Apple ID, and Android Google Play Pass to DualSense, Xbox, and Backbone controllers.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
                  <button
                    type="button"
                    data-testid="quick-app-controllers-btn"
                    onClick={() => setAppPlatform('controllers')}
                    className="p-3 rounded-2xl bg-white/[0.18] hover:bg-indigo-500/40 border border-white/50 backdrop-blur-xl text-start transition-all cursor-pointer"
                  >
                    <div className="text-[11px] text-indigo-200 font-semibold">
                      {isRtl ? 'دسته‌های بازی ۵ پلتفرم' : 'All 5 Platform Gamepads'}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-white mt-0.5">
                      {isRtl ? 'PS5 · Xbox · ویندوز · موبایل' : 'PS5 · Xbox · PC · Mobile'}
                    </div>
                  </button>
                  <button
                    type="button"
                    data-testid="quick-app-windows-btn"
                    onClick={() => setAppPlatform('windows')}
                    className="p-3 rounded-2xl bg-white/[0.18] hover:bg-indigo-500/40 border border-white/50 backdrop-blur-xl text-start transition-all cursor-pointer"
                  >
                    <div className="text-[11px] text-indigo-200 font-semibold">
                      {isRtl ? 'ویندوز و آفیس ۳۶۵' : 'Windows 11 & M365'}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-white mt-0.5">
                      {isRtl ? 'لایسنس و دسته PC' : 'PC Keys & Controllers'}
                    </div>
                  </button>
                  <button
                    type="button"
                    data-testid="quick-app-mobile-btn"
                    onClick={() => setAppPlatform('iphone')}
                    className="p-3 rounded-2xl bg-white/[0.18] hover:bg-indigo-500/40 border border-white/50 backdrop-blur-xl text-start transition-all cursor-pointer col-span-2 sm:col-span-1"
                  >
                    <div className="text-[11px] text-indigo-200 font-semibold">
                      {isRtl ? 'آیفون و اندروید' : 'iPhone & Android'}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-white mt-0.5">
                      {isRtl ? 'اپل‌آیدی، گوگل‌پلی و Backbone' : 'Apple ID, Play & Backbone'}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* 4. CATEGORIZED DICARDO-STYLE APP & PLATFORM SHELVES */}
            {appSubCategory === 'all' &&
            appPlatform === 'all' &&
            searchQuery.trim() === '' ? (
              <div data-testid="app-hub-shelves" className="space-y-8">
                {appHubSections.map((shelf) => (
                  <div
                    key={shelf.id}
                    data-testid={`app-shelf-${shelf.id}`}
                    className="rounded-3xl bg-[#060919]/90 border border-indigo-500/25 p-5 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-sky-500 border border-indigo-300/50 shadow-[0_8px_22px_rgba(99,102,241,0.35)] flex items-center justify-center text-white shrink-0">
                          <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-2xl font-black text-white">
                            {isRtl ? shelf.titleFa : shelf.titleEn}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-semibold text-white/65 mt-0.5">
                            {isRtl ? shelf.kickerFa : shelf.kickerEn}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        data-testid={`app-shelf-filter-${shelf.id}`}
                        onClick={() => setAppSubCategory(shelf.subCategory)}
                        className="px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500 text-indigo-200 hover:text-white border border-indigo-400/35 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>
                          {isRtl ? 'مشاهده همه این بخش' : 'Filter This Section'}
                        </span>
                        {isRtl ? (
                          <ChevronLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                      {shelf.products.map((product, idx) => (
                        <PermioCategoryProductCard
                          key={`${shelf.id}-${product.id}`}
                          product={product}
                          cascadeIndex={idx}
                          lang={lang}
                          usdtRate={usdtRate}
                          currencyMode={currencyMode}
                          onAddToCart={onAddToCart}
                          onShowDetails={setDetailProduct}
                          testIdPrefix={`app-shelf-card-${shelf.id}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                data-testid="app-filtered-dicardo-grid"
                className="rounded-3xl bg-[#060919]/90 border border-indigo-500/30 p-5 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {isRtl
                        ? `محصولات فیلترشده اپ، پلتفرم و دسته‌ها (${filteredProducts.length.toLocaleString('fa-IR')} محصول)`
                        : `Filtered App & Platform Products (${filteredProducts.length})`}
                    </h3>
                    <p className="text-xs text-white/65 mt-0.5">
                      {isRtl
                        ? 'روی هر محصول کلیک کنید تا پنل انتخاب پکیج، مدل دسته بازی یا لایسنس پلتفرم برایتان باز شود.'
                        : 'Click any card to choose your controller model, OS license, or subscription plan.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-testid="app-reset-filters-btn"
                    onClick={() => {
                      setAppSubCategory('all');
                      setAppPlatform('all');
                      setSearchQuery('');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 cursor-pointer"
                  >
                    {isRtl ? 'نمایش همه قفسه‌های اپ و پلتفرم' : 'Show All App Shelves'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                  {filteredProducts.map((product, idx) => (
                    <PermioCategoryProductCard
                      key={`filtered-app-${product.id}`}
                      product={product}
                      cascadeIndex={idx}
                      lang={lang}
                      usdtRate={usdtRate}
                      currencyMode={currencyMode}
                      onAddToCart={onAddToCart}
                      onShowDetails={setDetailProduct}
                      testIdPrefix="app-filtered-card"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ===================================================================
              AI CATALOG SECTION (ONLY ON activePage === 'ai')
          ==================================================================== */
          <>
            <ScrollReveal variant="slide-left" delayMs={60}>
              <div
                className={`flex flex-wrap items-center gap-2 mb-5 p-1.5 rounded-2xl border ${pageTheme.cardGlassClass} ${pageTheme.cardBorderClass}`}
              >
                {(
                  [
                    {
                      id: 'ai',
                      fa: `هوش مصنوعی و ابزار کدنویسی (${categoryCounts.ai.toLocaleString('fa-IR')})`,
                      en: `AI & Code (${categoryCounts.ai})`,
                    },
                  ] as Array<{ id: ProductCategory; fa: string; en: string }>
                ).map((tab) => {
                  const active = effectiveCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-testid={`category-tab-${tab.id}`}
                      onClick={() => {
                        onSelectCategory(tab.id);
                        setBrandFilter('all');
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? pageTheme.pillActiveClass
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {isRtl ? tab.fa : tab.en}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* 3B. CUSTOM ARTIFICIAL INTELLIGENCE (هوش مصنوعی) INTERACTIVE COMMAND DECK */}
            {effectiveCategory === 'ai' && (
              <div
                data-testid="ai-category-spotlight"
                className="mb-8 relative rounded-3xl overflow-hidden border border-white/45 bg-white/[0.14] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)] animate-scale-in"
              >
                {/* Dedicated Uploaded AI Video Backdrop */}
                <video
                  data-testid="ai-category-spotlight-video"
                  src={AI_HERO_VIDEO_URL}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-[80%_center] sm:object-[76%_center] md:object-[72%_center] lg:object-center opacity-100 pointer-events-none"
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left 7 Cols: Interactive AI Model Selector & Live Capability Matrix */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-200 tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                      <Cpu className="w-4 h-4" />
                      <span>
                        {isRtl
                          ? 'MODASR NEURAL CORE · آزمایشگاه مقایسه مدل‌های هوش مصنوعی'
                          : 'MODASR NEURAL CORE · INTERACTIVE AI MODEL MATRIX'}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {isRtl
                        ? 'ابرقدرت‌های هوش مصنوعی با فعال‌سازی رسمی روی اکانت شخصی'
                        : 'Flagship AI Subscriptions with Direct Personal Activation'}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                      {isRtl
                        ? 'مدل مورد نظر خود را انتخاب کنید تا ظرفیت پردازش، سرعت کدنویسی و نحوه تحویل اختصاصی آن را بررسی و مستقیماً به سبد خرید اضافه کنید.'
                        : 'Select an AI model below to inspect live reasoning benchmarks, token capacity, and direct personal email activation.'}
                    </p>

                    {/* Interactive Model Switcher Tabs */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {(
                        [
                          {
                            id: 'chatgpt-plus',
                            label: 'ChatGPT Plus (GPT-4o)',
                            badgeFa: 'همه‌فن‌حریف و تحلیل داده',
                            badgeEn: 'Multimodal & Reasoning',
                          },
                          {
                            id: 'claude-pro',
                            label: 'Claude 3.7 Sonnet Pro',
                            badgeFa: 'قهرمان کدنویسی و معماری',
                            badgeEn: '#1 Coding & Architecture',
                          },
                          {
                            id: 'cursor-pro',
                            label: 'Cursor AI Pro IDE',
                            badgeFa: 'ادیتور هوشمند برنامه‌نویسان',
                            badgeEn: '500 Fast Requests IDE',
                          },
                        ] as const
                      ).map((m) => {
                        const isSelected = selectedAiModelId === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setSelectedAiModelId(m.id)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-teal-400 text-slate-950 border-white shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                                : 'bg-white/[0.16] backdrop-blur-xl text-white border-white/45 hover:bg-white/[0.24]'
                            }`}
                          >
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right 5 Cols: Live Selected AI Model Telemetry & Quick Add Card */}
                  <div className="lg:col-span-5 rounded-2xl bg-white/[0.16] backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] p-5 space-y-4">
                    {(() => {
                      const activeAiProduct =
                        MODASR_PRODUCTS.find((p) => p.id === selectedAiModelId) ??
                        MODASR_PRODUCTS[0];
                      const specs =
                        selectedAiModelId === 'claude-pro'
                          ? {
                              coding: '99%',
                              reasoning: '98%',
                              context: '200K Tokens',
                              promptPreview:
                                'claude-3.7-sonnet --thinking=extended -> Verified Clean Architecture',
                            }
                          : selectedAiModelId === 'cursor-pro'
                          ? {
                              coding: '99%',
                              reasoning: '96%',
                              context: '500 Fast Req/mo',
                              promptPreview:
                                'cursor-agent: Multi-file refactor completed in 1.2s',
                            }
                          : {
                              coding: '96%',
                              reasoning: '99%',
                              context: '128K + Vision/Voice',
                              promptPreview:
                                'gpt-4o-omni: Multimodal analysis & image synthesis ready',
                            };

                      return (
                        <>
                          <div className="flex items-center justify-between gap-2 border-b border-white/25 pb-3">
                            <div>
                              <div className="text-sm font-black text-white">
                                {isRtl ? activeAiProduct.titleFa : activeAiProduct.titleEn}
                              </div>
                              <div className="text-[11px] text-teal-200 mt-0.5">
                                {isRtl ? activeAiProduct.deliveryFa : activeAiProduct.deliveryEn}
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="text-base font-black text-teal-200 tabular-nums">
                                ${activeAiProduct.priceUsd.toFixed(2)}
                              </div>
                              <div className="text-[10px] text-white/80">
                                {isRtl ? activeAiProduct.durationFa : activeAiProduct.durationEn}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2.5 rounded-xl bg-white/[0.15] border border-white/40">
                              <div className="text-xs font-black text-teal-200">{specs.coding}</div>
                              <div className="text-[10px] text-white/85 mt-0.5">
                                {isRtl ? 'دقت کدنویسی' : 'Coding Score'}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.15] border border-white/40">
                              <div className="text-xs font-black text-cyan-200">
                                {specs.reasoning}
                              </div>
                              <div className="text-[10px] text-white/85 mt-0.5">
                                {isRtl ? 'قدرت استدلال' : 'Reasoning'}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.15] border border-white/40">
                              <div className="text-xs font-black text-emerald-200">
                                {specs.context}
                              </div>
                              <div className="text-[10px] text-white/85 mt-0.5">
                                {isRtl ? 'ظرفیت مدل' : 'Capacity'}
                              </div>
                            </div>
                          </div>

                          <div
                            dir="ltr"
                            className="px-3 py-2 rounded-xl bg-white/[0.16] border border-white/40 font-mono text-[11px] text-teal-100 truncate"
                          >
                            $ {specs.promptPreview}
                          </div>

                          <button
                            type="button"
                            onClick={() => onAddToCart(activeAiProduct)}
                            className="w-full py-2.5 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>
                              {isRtl
                                ? `افزودن سریع «${activeAiProduct.titleFa}» به سبد`
                                : `Add ${activeAiProduct.titleEn} to Cart`}
                            </span>
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid — Cascading 'slide-up' via useScrollReveal */}
            <div
              ref={productGridReveal.ref}
              data-testid="marketplace-product-grid"
              data-scroll-reveal="slide-up"
              data-revealed={productGridReveal.isVisible ? 'true' : 'false'}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
            >
              {filteredProducts.map((product, idx) => (
                <MarketplaceProductCard
                  key={product.id}
                  product={product}
                  cascadeIndex={idx}
                  lang={lang}
                  usdtRate={usdtRate}
                  currencyMode={currencyMode}
                  onAddToCart={onAddToCart}
                  onShowDetails={setDetailProduct}
                />
              ))}
            </div>
          </>
        )}
      </section>
      )}

      {/* 4. DIGITAL ARCHITECTURE SHOWCASE — Shown on 'home' Dashboard */}
      {isHomePage && (
      <section
        id="architecture-showcase-section"
        aria-label={
          isRtl
            ? 'معماری تحویل آنی و زیرساخت جهانی مدثر'
            : 'MODASR Global Digital Infrastructure & Showcase'
        }
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Static Image Section with fade-up Intersection Observer hook */}
          <div
            ref={staticImageSectionReveal.ref}
            data-testid="static-image-section"
            data-scroll-reveal="fade-up"
            data-revealed={staticImageSectionReveal.isVisible ? 'true' : 'false'}
            className={`${staticImageSectionReveal.revealClassName} lg:col-span-7 rounded-3xl overflow-hidden border border-teal-500/25 bg-[#041317]/90 backdrop-blur-2xl relative min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.65)]`}
          >
            <AutoPlayVideo
              testId="static-section-video"
              src={AI_HERO_VIDEO_URL}
              poster={AI_HERO_POSTER_URL}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02080d]/95 via-[#04121a]/65 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-2">
                {isRtl
                  ? 'INFRASTRUCTURE · تحویل مستقیم لایسنس و اکانت'
                  : 'DIRECT LICENSE & ACCOUNT PIPELINE'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {isRtl
                  ? 'همه سرویس‌های پرمیوم جهانی در یک پنل یکپارچه'
                  : 'All Global Premium Digital Services in One Unified Hub'}
              </h2>
              <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                {isRtl
                  ? 'از اشتراک‌های هوش مصنوعی و ابزارهای توسعه‌دهندگان تا گیفت‌کارت‌های اورجینال کنسول و استیم، همه با ضمانت کامل دوره و پشتیبانی مستقیم تلگرام ارائه می‌شوند.'
                  : 'From official AI developer subscriptions to console and Steam gift cards, backed by full-term warranty and direct support.'}
              </p>
            </div>
          </div>

          {/* Lower Feature Block with fade-up Intersection Observer hook + 4 Corner Brackets & Wireframe Globe */}
          <div
            ref={lowerFeatureBlockReveal.ref}
            data-testid="lower-feature-block"
            data-scroll-reveal="fade-up"
            data-revealed={lowerFeatureBlockReveal.isVisible ? 'true' : 'false'}
            className={`${lowerFeatureBlockReveal.revealClassName} lg:col-span-5 relative rounded-3xl bg-[#041317]/90 backdrop-blur-2xl border border-teal-500/25 p-7 sm:p-8 flex flex-col justify-between shadow-[0_16px_45px_rgba(0,0,0,0.65)]`}
          >
            {/* Four L-shaped corner brackets */}
            <CornerBracketSvg
              position="tl"
              className="absolute top-4 left-4 text-teal-400/70 pointer-events-none"
            />
            <CornerBracketSvg
              position="tr"
              className="absolute top-4 right-4 text-teal-400/70 pointer-events-none"
            />
            <CornerBracketSvg
              position="bl"
              className="absolute bottom-4 left-4 text-teal-400/70 pointer-events-none"
            />
            <CornerBracketSvg
              position="br"
              className="absolute bottom-4 right-4 text-teal-400/70 pointer-events-none"
            />

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-teal-950/60 border border-teal-400/30 text-white">
                <WireframeGlobeSvg className="text-teal-400" />
              </div>

              <div
                dir="ltr"
                className="font-orbitron font-bold uppercase tracking-[0.16em] text-sm sm:text-base text-teal-400 text-start"
              >
                <p>BEYOND TRENDS.</p>
                <p>BUILT FOR TOMORROW.</p>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isRtl
                  ? 'زیرساخت نسل جدید خرید اشتراک و محصولات دیجیتال'
                  : 'Next-Generation Digital Subscription Infrastructure'}
              </h3>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isRtl
                  ? 'هر سفارش در مدثر با نرخ لحظه‌ای والکس، کلید یکتای ضدتکرار و تایم‌لاین شفاف رویدادها ثبت می‌شود تا تجربه‌ای مطمئن و حرفه‌ای داشته باشید.'
                  : 'Every order in MODASR is backed by live Wallex USDT rates, idempotent keys, and a verifiable audit log.'}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-base sm:text-lg font-black text-teal-400 tabular-nums">
                  100%
                </div>
                <div className="text-[11px] text-white/65 mt-0.5">
                  {isRtl ? 'ضمانت دوره' : 'Term Warranty'}
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-white tabular-nums">
                  30s
                </div>
                <div className="text-[11px] text-white/65 mt-0.5">
                  {isRtl ? 'نرخ زنده تتر' : 'Live USDT Sync'}
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-emerald-400 tabular-nums">
                  24/7
                </div>
                <div className="text-[11px] text-white/65 mt-0.5">
                  {isRtl ? 'پشتیبانی مستقیم' : 'Direct Support'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 5. ACCOUNT OVERVIEW & LIVE ORDER TRACKER — Shown on 'studio' (Account / حساب) page */}
      {isOrdersPage && (
      <>
      <section
        id="order-tracker-section"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-10"
      >
        {/* Account Overview Header Card */}
        <div
          data-testid="account-overview-card"
          className="mb-8 rounded-3xl bg-[#090814]/90 backdrop-blur-2xl border border-amber-500/25 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
        >
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1.5">
              {isRtl
                ? 'MODASR ACCOUNT · حساب کاربری و مدیریت سفارش‌ها'
                : 'MODASR ACCOUNT · USER PROFILE & ORDERS'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isRtl
                ? 'حساب کاربری، سوابق خرید و پیگیری زنده'
                : 'Your Account, Purchase History & Live Order Tracker'}
            </h1>
            <p className="text-xs sm:text-sm text-white/75 mt-1.5 max-w-2xl leading-relaxed">
              {isRtl
                ? `ایمیل فعال حساب: ${trackedOrder.email} — در این بخش وضعیت لحظه‌ای سفارش‌های ثبت‌شده، کلید یکتای سرور و سبد خرید خود را مدیریت کنید.`
                : `Active Account Email: ${trackedOrder.email} — Manage your verified orders, server idempotency keys, and active cart.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-black/40 border border-amber-500/30 text-xs">
              <span className="text-white/75">
                {isRtl ? 'تعداد سفارش‌ها: ' : 'Orders: '}
              </span>
              <span className="font-black text-amber-400 tabular-nums">
                {orders.length.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenCart?.()}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>
                {isRtl
                  ? `سبد خرید (${totalCartCount.toLocaleString('fa-IR')})`
                  : `Cart (${totalCartCount})`}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: 4 Architectural Trust Pillars — Animation: slide-right */}
          <div className="lg:col-span-5 space-y-5">
            <ScrollReveal variant="slide-right">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {isRtl
                    ? 'فروشگاهی که پشت صحنه‌اش هم قابل بررسی است'
                    : 'A Storefront Whose Backend Logic Is Auditable'}
                </h2>
                <p className="text-sm text-white/75 mt-2">
                  {isRtl
                    ? 'ظاهر فقط بخشی از کار است. منطق خرید هم باید قابل اعتماد باشد.'
                    : 'Visual polish is only half the story—checkout integrity must be verifiable.'}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  icon: ShieldCheck,
                  titleFa: 'قیمت فقط از سرور',
                  titleEn: 'Server-Only Pricing',
                  descFa:
                    'تغییر قیمت در مرورگر هیچ تأثیری روی جمع سفارش ندارد.',
                  descEn:
                    'Client-side tampering never alters the server order total.',
                },
                {
                  icon: Lock,
                  titleFa: 'بدون سفارش تکراری',
                  titleEn: 'Idempotent Orders',
                  descFa:
                    'کلید یکتای ثبت سفارش، تلاش مجدد را به همان سفارش قبلی برمی‌گرداند.',
                  descEn:
                    'Unique idempotency keys prevent duplicate order charges.',
                },
                {
                  icon: Clock,
                  titleFa: 'رویدادهای سفارش',
                  titleEn: 'Order Audit Events',
                  descFa:
                    'ایجاد، یادداشت و وضعیت سفارش با عامل و زمان دقیق ثبت می‌شود.',
                  descEn:
                    'Every state transition is logged with timestamp and actor.',
                },
                {
                  icon: CheckCircle2,
                  titleFa: 'بدون موفقیت ساختگی',
                  titleEn: 'Zero Fake States',
                  descFa:
                    'تا وقتی درگاه فعال نیست، سفارش پرداخت‌نشده می‌ماند و صادقانه دیده می‌شود.',
                  descEn: 'Orders remain honestly marked unpaid until verified.',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal
                    key={item.titleEn}
                    variant="slide-right"
                    delayMs={idx * 90}
                    className="h-full"
                  >
                    <div className="h-full p-4 rounded-2xl bg-[#090814]/88 backdrop-blur-2xl border border-amber-500/20 shadow-[0_10px_28px_rgba(0,0,0,0.5)]">
                      <Icon className="w-5 h-5 text-amber-400 mb-2.5" />
                      <h3 className="text-sm font-bold text-white">
                        {isRtl ? item.titleFa : item.titleEn}
                      </h3>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">
                        {isRtl ? item.descFa : item.descEn}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right 7 Columns: Interactive Order Tracker & Audit Timeline — Animation: scale-in */}
          <ScrollReveal
            variant="scale-in"
            delayMs={120}
            className="order-first lg:order-none lg:col-span-7"
          >
            <div className="rounded-3xl bg-[#090814]/90 backdrop-blur-2xl border border-amber-500/25 p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.65)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {isRtl
                      ? 'پیگیری با شماره سفارش و رویدادها'
                      : 'Live Order & Event Timeline Tracker'}
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    {isRtl
                      ? 'شماره سفارش را وارد کنید یا از سفارش‌های ثبت‌شده انتخاب نمایید.'
                      : 'Enter your Order Number to inspect server verification events.'}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (trackInput.trim()) {
                      onSelectOrderNumber(trackInput.trim());
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    placeholder="MDS-84920"
                    aria-label={isRtl ? 'شماره سفارش' : 'Order Number'}
                    className="bg-black/45 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/50 font-mono uppercase w-36 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    {isRtl ? 'بررسی سفارش' : 'Track'}
                  </button>
                </form>
              </div>

              {/* Quick Order Switcher if user placed new orders */}
              {orders.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-xs text-white/75">
                    {isRtl ? 'سفارش‌های اخیر شما:' : 'Recent Orders:'}
                  </span>
                  {orders.map((ord) => (
                    <button
                      key={ord.orderNumber}
                      type="button"
                      onClick={() => {
                        setTrackInput(ord.orderNumber);
                        onSelectOrderNumber(ord.orderNumber);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                        trackedOrder.orderNumber === ord.orderNumber
                          ? 'bg-amber-400 border border-amber-300 text-slate-950 font-bold'
                          : 'bg-black/40 border border-white/15 text-white hover:bg-white/10'
                      }`}
                    >
                      {ord.orderNumber}
                    </button>
                  ))}
                </div>
              )}

              {/* Order Summary Header */}
              <div className="mt-5 p-4 rounded-2xl bg-black/40 border border-amber-500/25 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-white/70">
                    {isRtl
                      ? 'شماره سفارش و کلید یکتا:'
                      : 'Order ID & Idempotency Key:'}
                  </div>
                  <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">
                    {trackedOrder.orderNumber} · {trackedOrder.idempotencyKey}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-xs text-amber-400 font-semibold">
                    {isRtl ? trackedOrder.statusFa : trackedOrder.statusEn}
                  </div>
                  <div className="text-sm font-black text-white tabular-nums mt-0.5">
                    ${trackedOrder.totalUsd.toFixed(2)} ≈{' '}
                    {formatToman(trackedOrder.totalToman, lang)}
                  </div>
                </div>
              </div>

              {/* Order Event Timeline */}
              <div className="mt-5 space-y-3">
                {trackedOrder.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-2xl bg-black/35 border border-white/10 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          ev.status === 'active'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {isRtl ? ev.titleFa : ev.titleEn}
                        </div>
                        <div className="text-xs text-white/70 mt-1 leading-relaxed">
                          {isRtl ? ev.detailFa : ev.detailEn}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-white/60 tabular-nums whitespace-nowrap shrink-0">
                      {ev.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. PRE-PURCHASE FAQ ACCORDION (پرسش‌های پیش از خرید) — Animation: blur-in */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-white/10">
        <ScrollReveal variant="blur-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {isRtl ? 'پرسش‌های پیش از خرید' : 'Pre-Purchase FAQ'}
            </h2>
            <p className="text-sm text-white/70 mt-2">
              {isRtl
                ? 'اطلاعات روشن درباره‌ی پرداخت، تحویل، پیگیری و اصالت محصولات مدثر.'
                : 'Clear answers regarding payment coordination, instant delivery, and server pricing.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <ScrollReveal key={faq.qEn} variant="blur-in" delayMs={idx * 70}>
                <div className="rounded-2xl bg-[#090814]/88 backdrop-blur-2xl border border-amber-500/20 overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.5)]">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-start text-sm sm:text-base font-bold text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    <span>{isRtl ? faq.qFa : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-white/75 leading-relaxed border-t border-white/10 pt-3">
                      {isRtl ? faq.aFa : faq.aEn}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
      </>
      )}

      {/* 7. MERIDIAN FULL-WIDTH ABOUT & QUICK ACCESS + VIADUCT BRIDGE FOOTER (Only at bottom of Home / Dashboard) */}
      {isHomePage && (
        <MeridianFooter
          lang={lang}
          onNavigateSection={onActivateHeroSection}
          onSelectCategory={onSelectCategory}
          onOpenCart={onOpenCart}
        />
      )}

      {/* PRODUCT DETAIL MODAL (DICARDO MULTI-PACKAGE & CAPABILITIES VIEW) */}
      {detailProduct && (
        <DicardoProductDetailModal
          product={detailProduct}
          usdtRate={usdtRate}
          lang={lang}
          showUsd={currencyMode === 'usd'}
          initialPackageIdx={selectedPackageIdx}
          onClose={() => {
            setDetailProduct(null);
            setSelectedPackageIdx(0);
          }}
          onAddToCart={(customizedProduct) => {
            onAddToCart(customizedProduct);
          }}
          onOpenCart={onOpenCart}
        />
      )}
    </div>
  );
}
