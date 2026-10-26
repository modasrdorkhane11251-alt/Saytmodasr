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
import { AI_HERO_VIDEO_URL, HERO_VIDEO_URL, WEB_HERO_VIDEO_URL, Language, SectionId } from '../utils/heroConfig';
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
import { MeridianFooter } from './MeridianFooter';

interface ModasrMarketplaceProps {
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

  const isRtl = lang === 'fa';
  const tomanPrice = convertUsdToToman(product.priceUsd, usdtRate);

  return (
    <div
      ref={cardReveal.ref}
      data-testid={`product-card-${product.id}`}
      data-scroll-reveal="slide-up"
      data-cascade-index={cascadeIndex}
      data-revealed="true"
      className="animate-fade-up h-full"
    >
      <div className="group h-full rounded-3xl bg-slate-900/65 hover:bg-slate-900/95 border border-white/10 hover:border-teal-500/40 p-5 flex flex-col justify-between transition-all duration-300">
        <div>
          {/* Top Row: Icon + Quiet Brand & Kicker */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center shrink-0">
              {renderMarketplaceProductIcon(product.iconType)}
            </div>
            <div className="text-end">
              <div className="text-[11px] font-semibold text-teal-300/90">
                {product.platformBrand}
              </div>
              <div className="text-[11px] font-medium text-white/50 mt-0.5">
                {isRtl ? product.badgeFa : product.badgeEn}
              </div>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-white leading-snug">
            {isRtl ? product.titleFa : product.titleEn}
          </h3>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed line-clamp-2">
            {isRtl ? product.subtitleFa : product.subtitleEn}
          </p>

          {/* Unboxed Clean Metadata with Typographic Separators (Zero-Pill Discipline) */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-white/65 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{isRtl ? product.durationFa : product.durationEn}</span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? product.regionFa : product.regionEn}</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-300">
              {isRtl ? product.deliveryFa : product.deliveryEn}
            </span>
          </div>

          {product.popularPackagesFa && product.popularPackagesFa.length > 0 && (
            <div className="mt-2.5 text-[11px] text-white/45 truncate">
              {isRtl ? 'پکیج‌ها: ' : 'Packages: '}
              {product.popularPackagesFa.slice(0, 3).join(' / ')}
            </div>
          )}
        </div>

        {/* Price + Actions */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-lg font-black text-white tabular-nums">
                {currencyMode === 'toman'
                  ? `≈ ${formatToman(tomanPrice, lang)}`
                  : `$${product.priceUsd.toFixed(2)}`}
              </div>
              <div className="text-[11px] text-white/50 tabular-nums">
                {currencyMode === 'toman'
                  ? `$${product.priceUsd.toFixed(2)} USD`
                  : `≈ ${formatToman(tomanPrice, lang)}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isRtl ? 'افزودن سریع' : 'Quick Add'}</span>
            </button>
            <button
              type="button"
              onClick={() => onShowDetails(product)}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isRtl ? 'جزئیات' : 'Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModasrMarketplace({
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
  const filteredProducts = filterModasrProducts(
    MODASR_PRODUCTS,
    selectedCategory,
    searchQuery,
    brandFilter
  );

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

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative z-20 bg-[#04070B] text-white border-t border-white/10 font-vazir"
    >
      {/* 1. LIVE WALLEX USDT / TOMAN EXCHANGE RATE BAR — Animation: scale-in */}
      <section
        id="exchange-rate"
        aria-label={
          isRtl ? 'نرخ لحظه‌ای تتر به تومان' : 'Live USDT Exchange Rate'
        }
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-6"
      >
        <div
          ref={rateBannerReveal.ref}
          data-testid="exchange-rate-banner"
          data-scroll-reveal="scale-in"
          data-revealed={rateBannerReveal.isVisible ? 'true' : 'false'}
          className={`${rateBannerReveal.revealClassName} rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900/85 to-teal-950/60 border border-teal-500/25 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl`}
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
            <p className="text-xs sm:text-sm text-white/65 mt-2 leading-relaxed">
              {isRtl
                ? 'قیمت تتر مستقیم از Wallex و هر ۳۰ ثانیه تازه می‌شود. معادل دلاری محصولات با همین نرخ و علامت ≈ نمایش داده می‌شود؛ مبلغ سفارش پس از ثبت قفل می‌گردد.'
                : 'USDT rates sync directly from Wallex every 30 seconds. Product equivalents are shown with ≈ and locked upon order creation.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="px-5 py-3.5 rounded-2xl bg-black/70 border border-teal-500/35">
              <div className="text-[11px] text-white/55">
                {isRtl ? '۱ تتر (USDT) معادل:' : '1 USDT Equals:'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-teal-300 tabular-nums mt-0.5">
                {formatToman(usdtRate, lang)}
              </div>
            </div>

            {/* Currency Display Toggle (Interactive Segmented Buttons) */}
            <div className="flex items-center bg-black/70 p-1 rounded-2xl border border-white/15">
              <button
                type="button"
                onClick={() => onToggleCurrency('toman')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  currencyMode === 'toman'
                    ? 'bg-teal-400 text-slate-950 shadow-sm'
                    : 'text-white/70 hover:text-white'
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
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {isRtl ? 'دلار ($)' : 'USD ($)'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleRefreshClick}
              aria-label={isRtl ? 'بروزرسانی نرخ تتر' : 'Refresh USDT rate'}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/85 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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

      {/* 2. FEATURED BENTO SHOWCASE (منتخب‌های فروشگاهی) — Animation: flip-up */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
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
              className="group relative h-full overflow-hidden rounded-3xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400/80 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_0_35px_rgba(16,185,129,0.15)]"
            >
              {/* Web & Apps Video embedded directly on the VPN Bento Card */}
              <video
                data-testid="bento-card-vpn-video"
                src={WEB_HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-[70%_center] opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-emerald-950/35 pointer-events-none" />

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
                <p className="text-xs sm:text-sm text-white/65 mt-2 leading-relaxed">
                  {isRtl
                    ? 'پلن‌های MODASR Connect، تلگرام پرمیوم و اشتراک اپ‌ها با تحویل آنی.'
                    : 'Compare MODASR Connect VPN nodes and premium app licenses.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                  <span>{isRtl ? 'مشاهده پلن‌ها' : 'Explore Plans'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  <span className="font-podium text-2xl font-bold text-emerald-300 leading-none">
                    M
                  </span>
                  <span className="text-[9px] font-bold text-emerald-200 tracking-widest mt-0.5">
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
              className="group relative h-full overflow-hidden rounded-3xl bg-slate-950 border border-cyan-500/40 hover:border-cyan-400/80 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_0_35px_rgba(0,245,212,0.15)]"
            >
              {/* AI Hero Video embedded directly on the AI Bento Card */}
              <video
                data-testid="bento-card-ai-video"
                src={AI_HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-cyan-950/35 pointer-events-none" />

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
                <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                  {isRtl
                    ? 'ChatGPT Plus (GPT-4o)، Claude 3.7 Sonnet و Cursor AI Pro با فعال‌سازی رسمی روی ایمیل شخصی.'
                    : 'Select ChatGPT Plus, Claude 3.7 Sonnet, and Cursor Pro with verified personal activation.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                  <span>{isRtl ? 'ورود به بخش هوش مصنوعی' : 'Explore AI Hub'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.25)]">
                  <Cpu className="w-5 h-5 text-cyan-300" />
                  <span className="font-orbitron text-[10px] font-bold text-cyan-200 mt-0.5">
                    AI PRO
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento Card 3: Gaming & Gift Cards (with Live Gaming Video Background!) */}
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
              className="group relative h-full overflow-hidden rounded-3xl bg-slate-950 border border-rose-500/40 hover:border-rose-400/80 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_0_35px_rgba(244,63,94,0.15)]"
            >
              {/* Gaming Hero Video embedded directly on the Gaming Bento Card */}
              <video
                src={HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-rose-950/35 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 tracking-wider uppercase">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'گیم و بازی · GAMING HUB' : 'GAMING & GIFT CARDS'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  {isRtl
                    ? 'دنیای گیم و گیفت‌کارت، با ریجن روشن'
                    : 'Gaming & Store Credit, Clear Regions'}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                  {isRtl
                    ? 'گیفت‌کارت‌های اورجینال Steam، PlayStation و Xbox Game Pass با تحویل آنی کد دیجیتال.'
                    : 'Browse official Steam Wallet, PlayStation, and Xbox Game Pass cards with instant delivery.'}
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-end justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 group-hover:translate-x-0.5 transition-transform">
                  <span>
                    {isRtl ? 'مشاهده محصولات گیم' : 'Explore Gaming'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 backdrop-blur-md border border-rose-400/50 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.35)]">
                  <Gamepad2 className="w-6 h-6 text-rose-300" />
                  <span className="font-orbitron text-[9px] font-bold text-rose-200 mt-0.5">
                    GAME
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. FULL INTERACTIVE PRODUCT CATALOG (از نیازت شروع کن) — Animation: fade-up + slide-left */}
      <section
        id="catalog-section"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-white/10"
      >
        <div
          ref={catalogHeaderReveal.ref}
          data-scroll-reveal="fade-up"
          data-revealed={catalogHeaderReveal.isVisible ? 'true' : 'false'}
          className={`${catalogHeaderReveal.revealClassName} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8`}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {isRtl ? 'از نیازت شروع کن' : 'Start From Your Need'}
            </h2>
            <p className="text-sm text-white/60 mt-2">
              {isRtl
                ? 'به‌جای گم‌شدن بین صدها گزینه، دسته‌ی مناسب را انتخاب کن و پلن‌ها را با جزئیات کامل مقایسه کن.'
                : 'Filter by category or search directly to compare duration, region, and server-verified pricing.'}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-teal-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isRtl
                  ? 'جستجوی نام محصول (مثلاً ChatGPT، Steam...)'
                  : 'Search products (e.g. ChatGPT, Steam...)'
              }
              aria-label={
                isRtl ? 'جستجو در کاتالوگ محصولات' : 'Search product catalog'
              }
              className="w-full bg-white/5 border border-white/15 focus:border-teal-400 rounded-2xl ps-10 pe-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Interactive Category Filter Bar — Animation: slide-left */}
        <ScrollReveal variant="slide-left" delayMs={60}>
          <div className="flex flex-wrap items-center gap-2 mb-4 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
            {(
              [
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
              ] as Array<{ id: ProductCategory; fa: string; en: string }>
            ).map((tab) => {
              const active = selectedCategory === tab.id;
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
                      ? 'bg-teal-400 text-slate-950 shadow-md'
                      : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isRtl ? tab.fa : tab.en}
                </button>
              );
            })}
          </div>

          {/* Quick Ecosystem & Brand Filter Bar (Dicardo, Iranicard, GiftCard.ir, Global Hubs) */}
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
        </ScrollReveal>

        {/* ===================================================================
            3A-0. DEDICATED DICARDO IN-GAME TOP-UP SPOTLIGHT (CP, UC, GEMS & PASSES)
        ==================================================================== */}
        {selectedCategory === 'ingame' && (
          <div
            data-testid="ingame-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-amber-500/40 bg-gradient-to-br from-amber-950/50 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl animate-scale-in"
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
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {isRtl
                    ? 'تمامی بسته‌های سی‌پی کالاف دیوتی موبایل، یوسی پابجی موبایل، جم فری‌فایر، بلیط طلایی کلش و ولکین مون گنشین ایمپکت به‌صورت قانونی و با تضمین ۱۰۰٪ عدم بن شدن اکانت شارژ می‌شوند.'
                    : 'All Call of Duty Mobile CP, PUBG UC, Free Fire Diamonds, and Supercell Passes are fulfilled via official gateways.'}
                </p>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-black/70 border border-amber-400/30 p-5 space-y-3">
                <div className="text-xs font-bold text-amber-300">
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
                    className="flex-1 bg-slate-900 border border-white/15 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="text-[11px] text-white/55">
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
        {selectedCategory === 'gaming' && (
          <div
            data-testid="gaming-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-rose-500/40 bg-slate-950 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.2)] animate-scale-in"
          >
            <video
              data-testid="gaming-category-video"
              src={HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[73%_center] sm:object-[68%_center] md:object-[64%_center] lg:object-center opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/30" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 my-auto">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 tracking-wider uppercase mb-2">
                  <Gamepad2 className="w-4 h-4" />
                  <span>
                    {isRtl
                      ? 'MODASR GAMING ARENA · تحویل آنی کد اورجینال گیم'
                      : 'MODASR GAMING ARENA · INSTANT DIGITAL CODES'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isRtl
                    ? 'گیفت‌کارت‌های اورجینال Steam، PlayStation و Xbox'
                    : 'Authentic Steam, PlayStation & Xbox Digital Codes'}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
                  {isRtl
                    ? 'تم اختصاصی گیم فعال شد! تمام گیفت‌کارت‌ها و اشتراک‌های بازی با ریجن مشخص (آمریکا و گلوبال) و کد دیجیتال اورجینال بدون تاریخ انقضا عرضه می‌شوند.'
                    : 'Gaming mode active! All gaming gift cards and memberships include verified region specifications and instant digital code delivery.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-3 rounded-2xl bg-black/75 backdrop-blur-md border border-rose-500/40">
                  <div className="text-[11px] text-rose-300 font-bold">STEAM WALLET</div>
                  <div className="text-sm font-black text-white mt-0.5">$20 USA Code</div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-black/75 backdrop-blur-md border border-indigo-500/40">
                  <div className="text-[11px] text-indigo-300 font-bold">PLAYSTATION PSN</div>
                  <div className="text-sm font-black text-white mt-0.5">$25 US Store</div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-black/75 backdrop-blur-md border border-emerald-500/40">
                  <div className="text-[11px] text-emerald-300 font-bold">XBOX ULTIMATE</div>
                  <div className="text-sm font-black text-white mt-0.5">Global 1-Month</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            3B. CUSTOM ARTIFICIAL INTELLIGENCE (هوش مصنوعی) INTERACTIVE COMMAND DECK
        ==================================================================== */}
        {selectedCategory === 'ai' && (
          <div
            data-testid="ai-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-teal-400/40 bg-slate-950 p-6 sm:p-8 shadow-[0_0_55px_rgba(0,245,212,0.16)] animate-scale-in"
          >
            {/* Dedicated Uploaded AI Video Backdrop */}
            <video
              data-testid="ai-category-spotlight-video"
              src={AI_HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[80%_center] sm:object-[76%_center] md:object-[72%_center] lg:object-center opacity-50 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/65 to-slate-950/85 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left 7 Cols: Interactive AI Model Selector & Live Capability Matrix */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 tracking-wider uppercase">
                  <Cpu className="w-4 h-4" />
                  <span>
                    {isRtl
                      ? 'MODASR NEURAL CORE · آزمایشگاه مقایسه مدل‌های هوش مصنوعی'
                      : 'MODASR NEURAL CORE · INTERACTIVE AI MODEL MATRIX'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isRtl
                    ? 'ابرقدرت‌های هوش مصنوعی با فعال‌سازی رسمی روی اکانت شخصی'
                    : 'Flagship AI Subscriptions with Direct Personal Activation'}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
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
                            ? 'bg-teal-400 text-slate-950 border-teal-300 shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                            : 'bg-white/5 text-white/80 border-white/15 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 Cols: Live Selected AI Model Telemetry & Quick Add Card */}
              <div className="lg:col-span-5 rounded-2xl bg-black/75 border border-teal-400/35 p-5 space-y-4">
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
                      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <div className="text-sm font-black text-white">
                            {isRtl ? activeAiProduct.titleFa : activeAiProduct.titleEn}
                          </div>
                          <div className="text-[11px] text-teal-300 mt-0.5">
                            {isRtl ? activeAiProduct.deliveryFa : activeAiProduct.deliveryEn}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-base font-black text-teal-300 tabular-nums">
                            ${activeAiProduct.priceUsd.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-white/50">
                            {isRtl ? activeAiProduct.durationFa : activeAiProduct.durationEn}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <div className="text-xs font-black text-teal-300">{specs.coding}</div>
                          <div className="text-[10px] text-white/55 mt-0.5">
                            {isRtl ? 'دقت کدنویسی' : 'Coding Score'}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <div className="text-xs font-black text-cyan-300">
                            {specs.reasoning}
                          </div>
                          <div className="text-[10px] text-white/55 mt-0.5">
                            {isRtl ? 'قدرت استدلال' : 'Reasoning'}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <div className="text-xs font-black text-emerald-300">
                            {specs.context}
                          </div>
                          <div className="text-[10px] text-white/55 mt-0.5">
                            {isRtl ? 'ظرفیت مدل' : 'Capacity'}
                          </div>
                        </div>
                      </div>

                      <div
                        dir="ltr"
                        className="px-3 py-2 rounded-xl bg-slate-950 border border-teal-500/25 font-mono text-[11px] text-teal-300 truncate"
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
        {selectedCategory === 'vpn' && (
          <div
            data-testid="vpn-category-spotlight"
            className="mb-8 relative rounded-3xl overflow-hidden border border-indigo-400/40 bg-slate-950 p-6 sm:p-8 shadow-[0_0_55px_rgba(99,102,241,0.18)] animate-scale-in"
          >
            {/* Dedicated Uploaded Web, VPN & Apps Video Backdrop */}
            <video
              data-testid="vpn-category-spotlight-video"
              src={WEB_HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-center opacity-65 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/40 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 my-auto">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 tracking-wider uppercase mb-2">
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
                <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                  {isRtl
                    ? 'سرورهای پرسرعت اختصاصی آلمان و فنلاند، اشتراک تلگرام پرمیوم قانونی بدون نیاز به ورود به اکانت و لایسنس معتبر نرم‌افزارها با تحویل آنی و پشتیبانی شبانه‌روزی.'
                    : 'MODASR Connect high-speed nodes, zero-login Telegram Premium gifting, and verified software licenses.'}
                </p>
              </div>

              <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-400/30 backdrop-blur-xl">
                  <div className="text-[11px] text-indigo-300 font-semibold">
                    {isRtl ? 'پایداری سرورها' : 'Server Uptime'}
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">99.9% High-Speed</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-400/30 backdrop-blur-xl">
                  <div className="text-[11px] text-indigo-300 font-semibold">
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
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filteredProducts.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3'
          } gap-5`}
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

      {/* 4. DIGITAL ARCHITECTURE SHOWCASE: STATIC IMAGE SECTION + LOWER FEATURE BLOCK (Intersection Observer fade-up) */}
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
            className={`${staticImageSectionReveal.revealClassName} lg:col-span-7 rounded-3xl overflow-hidden border border-teal-500/30 bg-slate-950 relative min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8`}
          >
            <img
              src="/assets/aistudio/file_0000000013d4820d8db4a2c8678426e1_1c955518.png"
              alt={
                isRtl
                  ? 'نمای اختصاصی زیرساخت محصولات دیجیتال مدثر'
                  : 'MODASR Digital Ecosystem Showcase'
              }
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

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
            className={`${lowerFeatureBlockReveal.revealClassName} lg:col-span-5 relative rounded-3xl bg-slate-900/75 border border-teal-500/30 p-7 sm:p-8 flex flex-col justify-between`}
          >
            {/* Four L-shaped corner brackets */}
            <CornerBracketSvg
              position="tl"
              className="absolute top-4 left-4 text-teal-400 pointer-events-none"
            />
            <CornerBracketSvg
              position="tr"
              className="absolute top-4 right-4 text-teal-400 pointer-events-none"
            />
            <CornerBracketSvg
              position="bl"
              className="absolute bottom-4 left-4 text-teal-400 pointer-events-none"
            />
            <CornerBracketSvg
              position="br"
              className="absolute bottom-4 right-4 text-teal-400 pointer-events-none"
            />

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-teal-500/10 border border-teal-400/30 text-teal-300">
                <WireframeGlobeSvg className="text-teal-300" />
              </div>

              <div
                dir="ltr"
                className="font-orbitron font-bold uppercase tracking-[0.16em] text-sm sm:text-base text-teal-300 text-start"
              >
                <p>BEYOND TRENDS.</p>
                <p>BUILT FOR TOMORROW.</p>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isRtl
                  ? 'زیرساخت نسل جدید خرید اشتراک و محصولات دیجیتال'
                  : 'Next-Generation Digital Subscription Infrastructure'}
              </h3>

              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                {isRtl
                  ? 'هر سفارش در مدثر با نرخ لحظه‌ای والکس، کلید یکتای ضدتکرار و تایم‌لاین شفاف رویدادها ثبت می‌شود تا تجربه‌ای مطمئن و حرفه‌ای داشته باشید.'
                  : 'Every order in MODASR is backed by live Wallex USDT rates, idempotent keys, and a verifiable audit log.'}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-base sm:text-lg font-black text-teal-300 tabular-nums">
                  100%
                </div>
                <div className="text-[11px] text-white/55 mt-0.5">
                  {isRtl ? 'ضمانت دوره' : 'Term Warranty'}
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-white tabular-nums">
                  30s
                </div>
                <div className="text-[11px] text-white/55 mt-0.5">
                  {isRtl ? 'نرخ زنده تتر' : 'Live USDT Sync'}
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-emerald-300 tabular-nums">
                  24/7
                </div>
                <div className="text-[11px] text-white/55 mt-0.5">
                  {isRtl ? 'پشتیبانی مستقیم' : 'Direct Support'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVER-VERIFIED TRANSPARENCY & LIVE ORDER TRACKER — Animation: slide-right + scale-in */}
      <section
        id="order-tracker-section"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-white/10"
      >
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
                <p className="text-sm text-white/60 mt-2">
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
                    <div className="h-full p-4 rounded-2xl bg-slate-900/60 border border-white/10">
                      <Icon className="w-5 h-5 text-teal-400 mb-2.5" />
                      <h3 className="text-sm font-bold text-white">
                        {isRtl ? item.titleFa : item.titleEn}
                      </h3>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
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
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-slate-900/80 border border-teal-500/30 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {isRtl
                      ? 'پیگیری با شماره سفارش و رویدادها'
                      : 'Live Order & Event Timeline Tracker'}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
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
                    className="bg-black/70 border border-white/20 focus:border-teal-400 rounded-xl px-3.5 py-2 text-xs text-white font-mono uppercase w-36 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isRtl ? 'بررسی سفارش' : 'Track'}
                  </button>
                </form>
              </div>

              {/* Quick Order Switcher if user placed new orders */}
              {orders.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-xs text-white/55">
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
                          ? 'bg-teal-500/25 border border-teal-400 text-teal-300'
                          : 'bg-white/5 text-white/70 hover:text-white'
                      }`}
                    >
                      {ord.orderNumber}
                    </button>
                  ))}
                </div>
              )}

              {/* Order Summary Header */}
              <div className="mt-5 p-4 rounded-2xl bg-black/55 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-white/50">
                    {isRtl
                      ? 'شماره سفارش و کلید یکتا:'
                      : 'Order ID & Idempotency Key:'}
                  </div>
                  <div className="text-sm font-bold text-teal-300 font-mono mt-0.5">
                    {trackedOrder.orderNumber} · {trackedOrder.idempotencyKey}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-xs text-amber-300 font-semibold">
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
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          ev.status === 'active'
                            ? 'text-amber-400'
                            : 'text-teal-400'
                        }`}
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {isRtl ? ev.titleFa : ev.titleEn}
                        </div>
                        <div className="text-xs text-white/60 mt-1 leading-relaxed">
                          {isRtl ? ev.detailFa : ev.detailEn}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-white/45 tabular-nums whitespace-nowrap shrink-0">
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
            <p className="text-sm text-white/60 mt-2">
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
                <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-start text-sm sm:text-base font-bold text-white hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <span>{isRtl ? faq.qFa : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-teal-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                      {isRtl ? faq.aFa : faq.aEn}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 7. MERIDIAN FULL-VIEWPORT ENGRAVED ILLUSTRATION FOOTER */}
      <MeridianFooter />

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
