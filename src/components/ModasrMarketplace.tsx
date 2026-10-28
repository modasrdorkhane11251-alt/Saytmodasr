import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cpu,
  Gamepad2,
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
  AI_HERO_VIDEO_URL,
  HERO_VIDEO_URL,
  WEB_HERO_VIDEO_URL,
  Language,
  SectionId,
  getPageVisualTheme,
} from '../utils/heroConfig';
import {
  MODASR_PRODUCTS,
  ModasrOrder,
  ModasrProduct,
  ProductCategory,
  convertUsdToToman,
  filterModasrProducts,
  formatToman,
  getCategoryCounts,
} from '../utils/modasrStore';
import {
  getSectionRevealVariant,
  useScrollReveal,
} from '../hooks/useScrollReveal';
import { ScrollReveal } from './ScrollReveal';
import { CornerBracketSvg, WireframeGlobeSvg } from './LgpsmIcons';
import { LumoraSkyrangerHero } from './LumoraSkyrangerHero';
import { MeridianFooter } from './MeridianFooter';
import { ProductSplitCard } from './ProductSplitCard';

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

  const categoryCounts = getCategoryCounts(MODASR_PRODUCTS);

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

  const filteredProducts = filterModasrProducts(
    MODASR_PRODUCTS,
    effectiveCategory,
    searchQuery,
    brandFilter
  );

  const featuredDashboardProducts = MODASR_PRODUCTS.slice(0, 6);

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
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-4"
        >
          <div className="rounded-3xl bg-white/[0.14] backdrop-blur-2xl border border-white/45 p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.7)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/25">
              <div>
                <div className="text-xs font-bold text-teal-300 tracking-wider uppercase mb-1.5">
                  {isRtl
                    ? 'MODASR DASHBOARD · خانه و داشبورد اصلی سایت'
                    : 'MODASR DASHBOARD · MAIN STOREFRONT HUB'}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
                  {isRtl
                    ? 'داشبورد یکپارچه محصولات دیجیتال و اشتراک‌های اورجینال'
                    : 'Unified Digital Products & Subscriptions Dashboard'}
                </h1>
                <p className="text-xs sm:text-sm text-white/85 mt-2 max-w-2xl leading-relaxed">
                  {isRtl
                    ? 'از نوار پایین سایت یا کارت‌های دسته‌بندی زیر، وارد صفحه اختصاصی هر بخش شوید: گیم و گیفت‌کارت، هوش مصنوعی، اتصال و اپ، جستجو یا حساب کاربری.'
                    : 'Use the bottom navigation bar or category cards below to open dedicated pages for Gaming, AI Hub, VPN & Apps, Search, or Account.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onActivateHeroSection?.('studio')}
                  className="px-5 py-3 rounded-2xl bg-white/[0.16] hover:bg-white/[0.24] backdrop-blur-xl border border-white/45 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-teal-300" />
                  <span>
                    {isRtl
                      ? `حساب کاربری (${trackedOrder.orderNumber})`
                      : `My Account (${trackedOrder.orderNumber})`}
                  </span>
                </button>
              </div>
            </div>

            {/* 4 Quick Dashboard Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-white/[0.14] backdrop-blur-xl border border-white/40 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)]">
                <div className="text-[11px] text-white/80">
                  {isRtl ? 'محصولات فعال فروشگاه' : 'Active Store Products'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tabular-nums mt-1">
                  {categoryCounts.all.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}{' '}
                  <span className="text-xs font-semibold text-teal-300">
                    {isRtl ? 'محصول اورجینال' : 'Verified'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.14] backdrop-blur-xl border border-white/40 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)]">
                <div className="text-[11px] text-white/80">
                  {isRtl ? 'نرخ لحظه‌ای تتر والکس' : 'Live Wallex USDT Rate'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-teal-300 tabular-nums mt-1">
                  {formatToman(usdtRate, lang)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onActivateHeroSection?.('studio')}
                className="p-4 rounded-2xl bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-xl border border-white/40 hover:border-white/75 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] text-start transition-colors cursor-pointer"
              >
                <div className="text-[11px] text-white/80">
                  {isRtl ? 'آخرین سفارش ثبت‌شده' : 'Latest Active Order'}
                </div>
                <div className="text-base sm:text-lg font-black text-amber-300 font-mono mt-1 flex items-center justify-between">
                  <span>{trackedOrder.orderNumber}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/80" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => onOpenCart?.()}
                className="p-4 rounded-2xl bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-xl border border-white/40 hover:border-white/75 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] text-start transition-colors cursor-pointer"
              >
                <div className="text-[11px] text-white/80">
                  {isRtl ? 'وضعیت سبد خرید شما' : 'Shopping Cart Status'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-300 tabular-nums mt-1 flex items-center justify-between">
                  <span>
                    {totalCartCount.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}{' '}
                    <span className="text-xs font-semibold text-white/85">
                      {isRtl ? 'آیتم در سبد' : 'Items'}
                    </span>
                  </span>
                  <ShoppingBag className="w-4 h-4 text-emerald-300" />
                </div>
              </button>
            </div>

            {/* 6 Categorized Page Shortcuts */}
            <div className="mt-6 pt-6 border-t border-white/25">
              <div className="text-xs font-bold text-white/90 mb-3">
                {isRtl
                  ? 'دسته‌بندی‌های تخصصی سایت (کلیک برای ورود به صفحه اختصاصی):'
                  : 'Specialized Store Categories (Click to open dedicated page):'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    id: 'games-card',
                    titleFa: 'گیفت‌کارت و کنسول',
                    titleEn: 'Console & Gift Cards',
                    subFa: `${categoryCounts.gaming.toLocaleString('fa-IR')} محصول`,
                    subEn: `${categoryCounts.gaming} Products`,
                    accent: 'border-white/40 hover:border-white/80 text-rose-200',
                    onClick: () => {
                      onSelectCategory('gaming');
                      onActivateHeroSection?.('games');
                    },
                  },
                  {
                    id: 'ingame-card',
                    titleFa: 'جم، سی‌پی و یوسی',
                    titleEn: 'CP, UC & Game Gems',
                    subFa: `${categoryCounts.ingame.toLocaleString('fa-IR')} محصول`,
                    subEn: `${categoryCounts.ingame} Products`,
                    accent: 'border-white/40 hover:border-white/80 text-amber-200',
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
                    accent: 'border-white/40 hover:border-white/80 text-teal-200',
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
                    accent: 'border-white/40 hover:border-white/80 text-indigo-200',
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
                    accent: 'border-white/40 hover:border-white/80 text-cyan-200',
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
                    accent: 'border-white/40 hover:border-white/80 text-emerald-200',
                    onClick: () => {
                      onActivateHeroSection?.('studio');
                    },
                  },
                ].map((catItem) => (
                  <button
                    key={catItem.id}
                    type="button"
                    data-testid={`dashboard-cat-${catItem.id}`}
                    onClick={catItem.onClick}
                    className={`p-3.5 rounded-2xl bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-xl border shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] transition-all text-start flex flex-col justify-between cursor-pointer ${catItem.accent}`}
                  >
                    <div className="text-xs font-bold text-white">
                      {isRtl ? catItem.titleFa : catItem.titleEn}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] opacity-90">
                      <span>{isRtl ? catItem.subFa : catItem.subEn}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
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
          className="animate-scale-in rounded-3xl bg-white/[0.14] backdrop-blur-2xl border border-white/45 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.7)]"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold tracking-wider uppercase mb-2">
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
            <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
              {isRtl
                ? 'قیمت تتر مستقیم از Wallex و هر ۳۰ ثانیه تازه می‌شود. معادل دلاری محصولات با همین نرخ و علامت ≈ نمایش داده می‌شود؛ مبلغ سفارش پس از ثبت قفل می‌گردد.'
                : 'USDT rates sync directly from Wallex every 30 seconds. Product equivalents are shown with ≈ and locked upon order creation.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="px-5 py-3.5 rounded-2xl bg-white/[0.15] backdrop-blur-xl border border-white/45 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)]">
              <div className="text-[11px] text-white/80">
                {isRtl ? '۱ تتر (USDT) معادل:' : '1 USDT Equals:'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-teal-300 tabular-nums mt-0.5">
                {formatToman(usdtRate, lang)}
              </div>
            </div>

            {/* Currency Display Toggle (Interactive Segmented Buttons) */}
            <div className="flex items-center bg-white/[0.15] backdrop-blur-xl p-1 rounded-2xl border border-white/45 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)]">
              <button
                type="button"
                onClick={() => onToggleCurrency('toman')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  currencyMode === 'toman'
                    ? 'bg-teal-400 text-slate-950 shadow-sm'
                    : 'text-white/85 hover:text-white'
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
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {isRtl ? 'دلار ($)' : 'USD ($)'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleRefreshClick}
              aria-label={isRtl ? 'بروزرسانی نرخ تتر' : 'Refresh USDT rate'}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.15] hover:bg-white/[0.24] backdrop-blur-xl border border-white/45 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] text-xs text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 text-teal-300 ${
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
              className="group relative h-full overflow-hidden rounded-3xl bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-2xl border border-white/45 hover:border-white/80 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)]"
            >
              {/* Luminous Emerald-Cyan Crystal Aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(45,212,191,0.28),rgba(56,189,248,0.12)_45%,transparent_75%)] group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-teal-300/20 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'VPN و اپ · CONNECTIVITY' : 'VPN & APPS'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'اتصال پایدار، آماده‌ی کار و دور زدن تحریم'
                    : 'Stable Connection, Shielded Security & Apps'}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
                  {isRtl
                    ? 'پلن‌های MODASR Connect، تلگرام پرمیوم و اشتراک اپ‌ها با تحویل آنی.'
                    : 'Compare MODASR Connect VPN nodes and premium app licenses.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 group-hover:translate-x-0.5 transition-transform">
                  <span>{isRtl ? 'مشاهده پلن‌ها' : 'Explore Plans'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.2] backdrop-blur-xl border border-white/60 flex flex-col items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.85)]">
                  <span className="font-podium text-2xl font-bold text-white leading-none">
                    M
                  </span>
                  <span className="text-[9px] font-bold text-emerald-100 tracking-widest mt-0.5">
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
              className="group relative h-full overflow-hidden rounded-3xl bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-2xl border border-white/45 hover:border-white/80 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)]"
            >
              {/* Luminous Indigo-Violet Crystal Aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.28),rgba(139,92,246,0.16)_45%,transparent_75%)] group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-cyan-300/20 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200 tracking-wider uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'هوش مصنوعی · NEURAL HUB' : 'ARTIFICIAL INTELLIGENCE'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'نسل جدید هوش مصنوعی، بدون پیچیدگی'
                    : 'Next-Gen AI Models, Zero Complexity'}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
                  {isRtl
                    ? 'ChatGPT Plus (GPT-4o)، Claude 3.7 Sonnet و Cursor AI Pro با فعال‌سازی رسمی روی ایمیل شخصی.'
                    : 'Select ChatGPT Plus, Claude 3.7 Sonnet, and Cursor Pro with verified personal activation.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-200 group-hover:translate-x-0.5 transition-transform">
                  <span>{isRtl ? 'ورود به بخش هوش مصنوعی' : 'Explore AI Hub'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.2] backdrop-blur-xl border border-white/60 flex flex-col items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.85)]">
                  <Cpu className="w-5 h-5 text-white" />
                  <span className="font-orbitron text-[10px] font-bold text-cyan-100 mt-0.5">
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
              className="group relative h-full overflow-hidden rounded-3xl bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-2xl border border-white/45 hover:border-white/80 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)]"
            >
              {/* Luminous Rose-Amber Crystal Aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(244,63,94,0.26),rgba(251,146,60,0.14)_45%,transparent_75%)] group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-rose-300/20 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-200 tracking-wider uppercase">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'گیم و بازی · GAMING HUB' : 'GAMING & GIFT CARDS'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'دنیای گیم و گیفت‌کارت، با ریجن روشن'
                    : 'Gaming & Store Credit, Clear Regions'}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
                  {isRtl
                    ? 'گیفت‌کارت‌های اورجینال Steam، PlayStation و Xbox Game Pass با تحویل آنی کد دیجیتال.'
                    : 'Browse official Steam Wallet, PlayStation, and Xbox Game Pass cards with instant delivery.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-200 group-hover:translate-x-0.5 transition-transform">
                  <span>
                    {isRtl ? 'مشاهده محصولات گیم' : 'Explore Gaming'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.2] backdrop-blur-xl border border-white/60 flex flex-col items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.85)]">
                  <Gamepad2 className="w-6 h-6 text-white" />
                  <span className="font-orbitron text-[9px] font-bold text-rose-100 mt-0.5">
                    GAME
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Featured Products Preview on Home Dashboard */}
        <div
          id="featured-dashboard-products"
          className="mt-10 pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isRtl
                  ? 'پرفروش‌ترین محصولات منتخب در یک نگاه'
                  : 'Top Featured Storefront Products'}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {isRtl
                  ? 'محبوب‌ترین اشتراک‌ها و گیفت‌کارت‌های آماده تحویل آنی در داشبورد اصلی'
                  : 'Most popular subscriptions and gift cards ready for instant delivery'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onActivateHeroSection?.('search')}
              className="px-4 py-2.5 rounded-xl bg-teal-400/15 hover:bg-teal-400 hover:text-slate-950 border border-teal-400/40 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>
                {isRtl
                  ? 'مشاهده کاتالوگ کامل همه محصولات'
                  : 'Open Full Product Catalog'}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {featuredDashboardProducts.map((product, idx) => (
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
        </div>
      </section>
      )}

      {/* 3. DEDICATED CATEGORY / FULL PRODUCT CATALOG — Shown on 'games', 'ai', 'web', 'search' */}
      {isCatalogPage && (
      <section
        id="catalog-section"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-12"
      >
        <div
          ref={catalogHeaderReveal.ref}
          data-scroll-reveal="fade-up"
          data-revealed="true"
          className="animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {isRtl ? 'از نیازت شروع کن' : 'Start From Your Need'}
            </h2>
            <p className="text-sm text-white/75 mt-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">
              {isRtl
                ? 'به‌جای گم‌شدن بین صدها گزینه، دسته‌ی مناسب را انتخاب کن و پلن‌ها را با جزئیات کامل مقایسه کن.'
                : 'Select your category tab to compare duration, region, and server-verified pricing.'}
            </p>
          </div>
        </div>

        {/* Interactive Category Filter Bar — Animation: slide-left */}
        <ScrollReveal variant="slide-left" delayMs={60}>
          <div
            className={`flex flex-wrap items-center gap-2 mb-5 p-1.5 rounded-2xl border ${pageTheme.cardGlassClass} ${pageTheme.cardBorderClass}`}
          >
            {(
              activePage === 'games'
                ? ([
                    {
                      id: 'gaming',
                      fa: `گیفت‌کارت و کنسول (${categoryCounts.gaming.toLocaleString('fa-IR')})`,
                      en: `Gift Cards & Console (${categoryCounts.gaming})`,
                    },
                    {
                      id: 'ingame',
                      fa: `جم، سی‌پی و یوسی · دیکاردو (${categoryCounts.ingame.toLocaleString('fa-IR')})`,
                      en: `CP, UC & Gems (${categoryCounts.ingame})`,
                    },
                  ] as Array<{ id: ProductCategory; fa: string; en: string }>)
                : activePage === 'ai'
                ? ([
                    {
                      id: 'ai',
                      fa: `هوش مصنوعی و ابزار کدنویسی (${categoryCounts.ai.toLocaleString('fa-IR')})`,
                      en: `AI & Code (${categoryCounts.ai})`,
                    },
                  ] as Array<{ id: ProductCategory; fa: string; en: string }>)
                : activePage === 'web'
                ? ([
                    {
                      id: 'vpn',
                      fa: `اتصال و آی‌پی ثابت (${categoryCounts.vpn.toLocaleString('fa-IR')})`,
                      en: `VPN & Static IP (${categoryCounts.vpn})`,
                    },
                    {
                      id: 'subscriptions',
                      fa: `اشتراک پرمیوم و اپل‌آیدی (${categoryCounts.subscriptions.toLocaleString('fa-IR')})`,
                      en: `Premium & Apple ID (${categoryCounts.subscriptions})`,
                    },
                  ] as Array<{ id: ProductCategory; fa: string; en: string }>)
                : ([
                    {
                      id: 'all',
                      fa: `همه محصولات (${categoryCounts.all.toLocaleString('fa-IR')})`,
                      en: `All Products (${categoryCounts.all})`,
                    },
                    {
                      id: 'ai',
                      fa: `هوش مصنوعی (${categoryCounts.ai.toLocaleString('fa-IR')})`,
                      en: `AI & Code (${categoryCounts.ai})`,
                    },
                    {
                      id: 'ingame',
                      fa: `جم، سی‌پی و یوسی · دیکاردو (${categoryCounts.ingame.toLocaleString('fa-IR')})`,
                      en: `CP, UC & Gems (${categoryCounts.ingame})`,
                    },
                    {
                      id: 'gaming',
                      fa: `گیفت‌کارت و کنسول (${categoryCounts.gaming.toLocaleString('fa-IR')})`,
                      en: `Gift Cards & Console (${categoryCounts.gaming})`,
                    },
                    {
                      id: 'subscriptions',
                      fa: `اشتراک پرمیوم و اپل‌آیدی (${categoryCounts.subscriptions.toLocaleString('fa-IR')})`,
                      en: `Premium & Apple ID (${categoryCounts.subscriptions})`,
                    },
                    {
                      id: 'vpn',
                      fa: `اتصال و آی‌پی ثابت (${categoryCounts.vpn.toLocaleString('fa-IR')})`,
                      en: `VPN & Static IP (${categoryCounts.vpn})`,
                    },
                  ] as Array<{ id: ProductCategory; fa: string; en: string }>)
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

          {/* Quick Ecosystem & Brand Filter Bar (Shown on Full Catalog 'search' page) */}
          {(activePage as unknown as string) === 'search' && (
          <div
            data-testid="brand-ecosystem-filter-bar"
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {(
              [
                { id: 'all', fa: 'همه برندها', en: 'All Brands' },
                { id: 'call of duty', fa: 'سی‌پی کالاف دیوتی', en: 'Call of Duty CP' },
                { id: 'pubg', fa: 'یوسی پابجی موبایل', en: 'PUBG Mobile UC' },
                { id: 'free fire', fa: 'جم فری‌فایر', en: 'Free Fire Gems' },
                { id: 'supercell', fa: 'کلش و براول استارز', en: 'Supercell / Clash' },
                { id: 'telegram', fa: 'تلگرام پرمیوم و استارز', en: 'Telegram & Stars' },
                { id: 'apple', fa: 'اپل‌آیدی و گیفت‌کارت اپل', en: 'Apple ID & iTunes' },
                { id: 'steam', fa: 'استیم و بتل‌نت', en: 'Steam & Battle.net' },
                { id: 'playstation', fa: 'پلی‌استیشن و پلاس', en: 'PlayStation & Plus' },
                { id: 'openai', fa: 'ChatGPT / هوش مصنوعی', en: 'OpenAI & AI' },
                { id: 'spotify', fa: 'اسپاتیفای و یوتیوب', en: 'Spotify & Media' },
              ] as const
            ).map((chip) => {
              const isChipActive = brandFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  data-testid={`brand-chip-${chip.id}`}
                  onClick={() => {
                    setBrandFilter(chip.id);
                    if (chip.id !== 'all') {
                      onSelectCategory('all');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                    isChipActive
                      ? 'bg-white/15 border-teal-400 text-teal-300'
                      : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/25'
                  }`}
                >
                  {isRtl ? chip.fa : chip.en}
                </button>
              );
            })}
          </div>
          )}
        </ScrollReveal>

        {/* ===================================================================
            3A-0. DEDICATED DICARDO IN-GAME TOP-UP SPOTLIGHT (CP, UC, GEMS & PASSES)
        ==================================================================== */}
        {effectiveCategory === 'ingame' && (
          <div
            data-testid="ingame-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-white/45 bg-white/[0.14] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.7)] animate-scale-in"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                  {isRtl
                    ? 'DICARDO & GLOBAL IN-GAME HUB · شارژ آنی سی‌پی، یوسی و جم بازی با آیدی'
                    : 'INSTANT UID TOP-UP · CALL OF DUTY CP, PUBG UC & GEMS'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isRtl
                    ? 'شارژ مستقیم بازی‌های موبایل با آیدی (UID) و رسید رسمی استور'
                    : 'Direct Mobile Game Top-Ups via Player ID & Official Store Receipts'}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {isRtl
                    ? 'تمامی بسته‌های سی‌پی کالاف دیوتی موبایل، یوسی پابجی موبایل، جم فری‌فایر، بلیط طلایی کلش و ولکین مون گنشین ایمپکت به‌صورت قانونی و با تضمین ۱۰۰٪ عدم بن شدن اکانت شارژ می‌شوند.'
                    : 'All Call of Duty Mobile CP, PUBG UC, Free Fire Diamonds, and Supercell Passes are fulfilled via official gateways.'}
                </p>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-white/[0.16] backdrop-blur-xl border border-white/45 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] p-5 space-y-3">
                <div className="text-xs font-bold text-amber-200">
                  {isRtl
                    ? 'ثبت سریع آیدی بازی (Player ID / UID) برای تحویل اتوماتیک:'
                    : 'Quick Player ID / UID Entry for Instant Top-Up:'}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={playerUidInput}
                    onChange={(e) => setPlayerUidInput(e.target.value)}
                    placeholder={
                      isRtl
                        ? 'مثال: 5128493021 یا ایمیل اکتیویژن'
                        : 'e.g. 5128493021 or Activision ID'
                    }
                    aria-label={isRtl ? 'آیدی بازیکن یا اکانت بازی' : 'Player UID'}
                    className="flex-1 bg-white/[0.16] border border-white/45 focus:border-white rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/60 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] text-white/80">
                  {playerUidInput.trim()
                    ? isRtl
                      ? `آیدی «${playerUidInput}» آماده ثبت روی سفارش است. بسته مورد نظر را از لیست زیر به سبد اضافه کنید.`
                      : `Player ID "${playerUidInput}" locked for your next top-up order.`
                    : isRtl
                    ? 'برای یوسی پابجی، جم فری‌فایر و گنشین ایمپکت نیازی به رمز عبور اکانت نیست.'
                    : 'No account password required for PUBG UC, Free Fire, or Genshin UID top-ups.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            3A. DEDICATED GAMING CATEGORY SPOTLIGHT BANNER (With Hero Gaming Video!)
        ==================================================================== */}
        {effectiveCategory === 'gaming' && (
          <div
            data-testid="gaming-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-white/45 bg-white/[0.14] backdrop-blur-2xl min-h-[260px] sm:min-h-[300px] flex flex-col justify-between p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)] animate-scale-in"
          >
            <video
              data-testid="gaming-category-video"
              src={HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center opacity-100"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 my-auto">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-200 tracking-wider uppercase mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                  <Gamepad2 className="w-4 h-4" />
                  <span>
                    {isRtl
                      ? 'MODASR GAMING ARENA · تحویل آنی کد اورجینال گیم'
                      : 'MODASR GAMING ARENA · INSTANT DIGITAL CODES'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {isRtl
                    ? 'گیفت‌کارت‌های اورجینال Steam، PlayStation و Xbox'
                    : 'Authentic Steam, PlayStation & Xbox Digital Codes'}
                </h3>
                <p className="text-xs sm:text-sm text-white/95 mt-2 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                  {isRtl
                    ? 'تم اختصاصی گیم فعال شد! تمام گیفت‌کارت‌ها و اشتراک‌های بازی با ریجن مشخص (آمریکا و گلوبال) و کد دیجیتال اورجینال بدون تاریخ انقضا عرضه می‌شوند.'
                    : 'Gaming mode active! All gaming gift cards and memberships include verified region specifications and instant digital code delivery.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-3 rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/55 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]">
                  <div className="text-[11px] text-rose-200 font-bold">STEAM WALLET</div>
                  <div className="text-sm font-black text-white mt-0.5">$20 USA Code</div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/55 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]">
                  <div className="text-[11px] text-sky-200 font-bold">PLAYSTATION PSN</div>
                  <div className="text-sm font-black text-white mt-0.5">$25 US Store</div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/55 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]">
                  <div className="text-[11px] text-emerald-200 font-bold">XBOX ULTIMATE</div>
                  <div className="text-sm font-black text-white mt-0.5">Global 1-Month</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            3B. CUSTOM ARTIFICIAL INTELLIGENCE (هوش مصنوعی) INTERACTIVE COMMAND DECK
        ==================================================================== */}
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

        {/* ===================================================================
            3C. CUSTOM WEB, VPN & APPS (اتصال، تحریم‌شکن و تلگرام پرمیوم) SPOTLIGHT
        ==================================================================== */}
        {effectiveCategory === 'vpn' && (
          <div
            data-testid="vpn-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-white/45 bg-white/[0.14] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.75)] animate-scale-in"
          >
            {/* Dedicated Uploaded Web, VPN & Apps Video Backdrop */}
            <video
              data-testid="vpn-category-spotlight-video"
              src={WEB_HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-center opacity-100 pointer-events-none"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 my-auto">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-200 tracking-wider uppercase mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isRtl
                      ? 'MODASR CONNECT & APPS · تحریم‌شکن، آی‌پی ثابت و اشتراک رسمی'
                      : 'MODASR CONNECT & APPS · DEDICATED IP, TELEGRAM PREMIUM & SOFTWARE'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isRtl
                    ? 'اتصال پایدار، دور زدن تحریم و اشتراک پریمیوم اپ‌ها'
                    : 'Unrestricted Speed, Shielded Security & Official Subscriptions'}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
                  {isRtl
                    ? 'سرورهای پرسرعت اختصاصی آلمان و فنلاند، اشتراک تلگرام پرمیوم قانونی بدون نیاز به ورود به اکانت و لایسنس معتبر نرم‌افزارها با تحویل آنی و پشتیبانی شبانه‌روزی.'
                    : 'MODASR Connect high-speed nodes, zero-login Telegram Premium gifting, and verified software licenses.'}
                </p>
              </div>

              <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl bg-white/[0.18] border border-white/50 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]">
                  <div className="text-[11px] text-indigo-200 font-semibold">
                    {isRtl ? 'پایداری سرورها' : 'Server Uptime'}
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">99.9% High-Speed</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.18] border border-white/50 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]">
                  <div className="text-[11px] text-indigo-200 font-semibold">
                    {isRtl ? 'تحویل تلگرام پرمیوم' : 'Telegram Premium'}
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    {isRtl ? 'ارسال فوری با گیفت' : 'Instant Gift Delivery'}
                  </div>
                </div>
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
            className={`${staticImageSectionReveal.revealClassName} lg:col-span-7 rounded-3xl overflow-hidden border border-white/45 bg-white/[0.14] backdrop-blur-2xl relative min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.75)]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(45,212,191,0.22),transparent_60%)] pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className="text-xs font-semibold text-teal-200 tracking-wider uppercase mb-2">
                {isRtl
                  ? 'INFRASTRUCTURE · تحویل مستقیم لایسنس و اکانت'
                  : 'DIRECT LICENSE & ACCOUNT PIPELINE'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {isRtl
                  ? 'همه سرویس‌های پرمیوم جهانی در یک پنل یکپارچه'
                  : 'All Global Premium Digital Services in One Unified Hub'}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
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
            className={`${lowerFeatureBlockReveal.revealClassName} lg:col-span-5 relative rounded-3xl bg-white/[0.14] backdrop-blur-2xl border border-white/45 p-7 sm:p-8 flex flex-col justify-between shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.75)]`}
          >
            {/* Four L-shaped corner brackets */}
            <CornerBracketSvg
              position="tl"
              className="absolute top-4 left-4 text-white/80 pointer-events-none"
            />
            <CornerBracketSvg
              position="tr"
              className="absolute top-4 right-4 text-white/80 pointer-events-none"
            />
            <CornerBracketSvg
              position="bl"
              className="absolute bottom-4 left-4 text-white/80 pointer-events-none"
            />
            <CornerBracketSvg
              position="br"
              className="absolute bottom-4 right-4 text-white/80 pointer-events-none"
            />

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.18] border border-white/50 text-white">
                <WireframeGlobeSvg className="text-teal-200" />
              </div>

              <div
                dir="ltr"
                className="font-orbitron font-bold uppercase tracking-[0.16em] text-sm sm:text-base text-teal-200 text-start"
              >
                <p>BEYOND TRENDS.</p>
                <p>BUILT FOR TOMORROW.</p>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isRtl
                  ? 'زیرساخت نسل جدید خرید اشتراک و محصولات دیجیتال'
                  : 'Next-Generation Digital Subscription Infrastructure'}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {isRtl
                  ? 'هر سفارش در مدثر با نرخ لحظه‌ای والکس، کلید یکتای ضدتکرار و تایم‌لاین شفاف رویدادها ثبت می‌شود تا تجربه‌ای مطمئن و حرفه‌ای داشته باشید.'
                  : 'Every order in MODASR is backed by live Wallex USDT rates, idempotent keys, and a verifiable audit log.'}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/25 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-base sm:text-lg font-black text-teal-200 tabular-nums">
                  100%
                </div>
                <div className="text-[11px] text-white/75 mt-0.5">
                  {isRtl ? 'ضمانت دوره' : 'Term Warranty'}
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-white tabular-nums">
                  30s
                </div>
                <div className="text-[11px] text-white/75 mt-0.5">
                  {isRtl ? 'نرخ زنده تتر' : 'Live USDT Sync'}
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-emerald-200 tabular-nums">
                  24/7
                </div>
                <div className="text-[11px] text-white/75 mt-0.5">
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
          className="mb-8 rounded-3xl bg-white/[0.15] backdrop-blur-2xl border border-white/50 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[0_18px_50px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.78)]"
        >
          <div>
            <div className="text-xs font-bold text-amber-200 tracking-wider uppercase mb-1.5">
              {isRtl
                ? 'MODASR ACCOUNT · حساب کاربری و مدیریت سفارش‌ها'
                : 'MODASR ACCOUNT · USER PROFILE & ORDERS'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isRtl
                ? 'حساب کاربری، سوابق خرید و پیگیری زنده'
                : 'Your Account, Purchase History & Live Order Tracker'}
            </h1>
            <p className="text-xs sm:text-sm text-white/85 mt-1.5 max-w-2xl leading-relaxed">
              {isRtl
                ? `ایمیل فعال حساب: ${trackedOrder.email} — در این بخش وضعیت لحظه‌ای سفارش‌های ثبت‌شده، کلید یکتای سرور و سبد خرید خود را مدیریت کنید.`
                : `Active Account Email: ${trackedOrder.email} — Manage your verified orders, server idempotency keys, and active cart.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/45 text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]">
              <span className="text-white/80">
                {isRtl ? 'تعداد سفارش‌ها: ' : 'Orders: '}
              </span>
              <span className="font-black text-amber-200 tabular-nums">
                {orders.length.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenCart?.()}
              className="px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
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
                <p className="text-sm text-white/80 mt-2">
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
                    <div className="h-full p-4 rounded-2xl bg-white/[0.14] backdrop-blur-2xl border border-white/45 shadow-[0_10px_28px_rgba(0,0,0,0.2),inset_0_1px_1.5px_rgba(255,255,255,0.7)]">
                      <Icon className="w-5 h-5 text-amber-200 mb-2.5" />
                      <h3 className="text-sm font-bold text-white">
                        {isRtl ? item.titleFa : item.titleEn}
                      </h3>
                      <p className="text-xs text-white/80 mt-1 leading-relaxed">
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
            <div className="rounded-3xl bg-white/[0.15] backdrop-blur-2xl border border-white/50 p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.78)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/25">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {isRtl
                      ? 'پیگیری با شماره سفارش و رویدادها'
                      : 'Live Order & Event Timeline Tracker'}
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
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
                    className="bg-white/[0.18] backdrop-blur-xl border border-white/50 focus:border-white rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/60 font-mono uppercase w-36 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    {isRtl ? 'بررسی سفارش' : 'Track'}
                  </button>
                </form>
              </div>

              {/* Quick Order Switcher if user placed new orders */}
              {orders.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-xs text-white/80">
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
                          ? 'bg-white/90 border border-white text-slate-950 font-bold'
                          : 'bg-white/[0.14] border border-white/35 text-white hover:bg-white/[0.24]'
                      }`}
                    >
                      {ord.orderNumber}
                    </button>
                  ))}
                </div>
              )}

              {/* Order Summary Header */}
              <div className="mt-5 p-4 rounded-2xl bg-white/[0.16] backdrop-blur-xl border border-white/45 flex flex-wrap items-center justify-between gap-4 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)]">
                <div>
                  <div className="text-xs text-white/80">
                    {isRtl
                      ? 'شماره سفارش و کلید یکتا:'
                      : 'Order ID & Idempotency Key:'}
                  </div>
                  <div className="text-sm font-bold text-amber-200 font-mono mt-0.5">
                    {trackedOrder.orderNumber} · {trackedOrder.idempotencyKey}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-xs text-amber-200 font-semibold">
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
                    className="p-3.5 rounded-2xl bg-white/[0.12] backdrop-blur-xl border border-white/35 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          ev.status === 'active'
                            ? 'text-amber-300'
                            : 'text-emerald-300'
                        }`}
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {isRtl ? ev.titleFa : ev.titleEn}
                        </div>
                        <div className="text-xs text-white/80 mt-1 leading-relaxed">
                          {isRtl ? ev.detailFa : ev.detailEn}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-white/75 tabular-nums whitespace-nowrap shrink-0">
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
      <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-white/20">
        <ScrollReveal variant="blur-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {isRtl ? 'پرسش‌های پیش از خرید' : 'Pre-Purchase FAQ'}
            </h2>
            <p className="text-sm text-white/80 mt-2">
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
                <div className="rounded-2xl bg-white/[0.14] backdrop-blur-2xl border border-white/45 overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.2),inset_0_1px_1.5px_rgba(255,255,255,0.7)]">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-start text-sm sm:text-base font-bold text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <span>{isRtl ? faq.qFa : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-200 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-white/85 leading-relaxed border-t border-white/20 pt-3">
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

      {/* PRODUCT DETAIL MODAL */}
      {detailProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isRtl ? detailProduct.titleFa : detailProduct.titleEn}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-teal-500/40 p-6 sm:p-8 shadow-2xl animate-scale-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-teal-400 font-semibold">
                  {detailProduct.platformBrand} ·{' '}
                  {isRtl
                    ? detailProduct.categoryLabelFa
                    : detailProduct.categoryLabelEn}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {isRtl ? detailProduct.titleFa : detailProduct.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDetailProduct(null);
                  setSelectedPackageIdx(0);
                }}
                className="px-3 py-1 rounded-xl bg-white/10 text-xs text-white/80 hover:text-white cursor-pointer"
              >
                {isRtl ? 'بستن' : 'Close'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed">
              {isRtl ? detailProduct.subtitleFa : detailProduct.subtitleEn}
            </p>

            {detailProduct.popularPackagesFa &&
              detailProduct.popularPackagesFa.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-white/80 mb-2">
                    {isRtl
                      ? 'انتخاب پکیج / ظرفیت محصول:'
                      : 'Available Packages & Denominations:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {detailProduct.popularPackagesFa.map((pkg, i) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() => setSelectedPackageIdx(i)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                          selectedPackageIdx === i
                            ? 'bg-teal-400 text-slate-950 border-teal-300 font-bold'
                            : 'bg-white/5 border-white/15 text-white/75 hover:text-white'
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-5 p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/55">
                  {isRtl ? 'مدت / اعتبار:' : 'Duration:'}
                </span>
                <span className="text-white font-semibold">
                  {isRtl ? detailProduct.durationFa : detailProduct.durationEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55">
                  {isRtl ? 'ریجن سرویس:' : 'Region:'}
                </span>
                <span className="text-white font-semibold">
                  {isRtl ? detailProduct.regionFa : detailProduct.regionEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55">
                  {isRtl ? 'روش تحویل:' : 'Delivery Method:'}
                </span>
                <span className="text-teal-300 font-semibold">
                  {isRtl ? detailProduct.deliveryFa : detailProduct.deliveryEn}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-black text-white tabular-nums">
                  ≈{' '}
                  {formatToman(
                    convertUsdToToman(detailProduct.priceUsd, usdtRate),
                    lang
                  )}
                </div>
                <div className="text-xs text-white/50 tabular-nums">
                  ${detailProduct.priceUsd.toFixed(2)} USD
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAddToCart(detailProduct);
                  setDetailProduct(null);
                  setSelectedPackageIdx(0);
                }}
                className="px-6 py-3 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs cursor-pointer"
              >
                {isRtl ? 'افزودن به سبد خرید' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
