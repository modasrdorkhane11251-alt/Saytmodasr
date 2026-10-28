import {
  ArrowUpRight,
  CheckCircle2,
  ChevronUp,
  Clock,
  Cpu,
  Gamepad2,
  Globe,
  Home,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Language, SectionId } from '../utils/heroConfig';
import {
  MODASR_PRODUCTS,
  ModasrOrder,
  ProductCategory,
  formatToman,
} from '../utils/modasrStore';

/**
 * Custom Bespoke Geometric Crystal Prism & Lotus Emblem for the Top Dashboard Button
 * Replaces text label with an intricate multi-layered vector design.
 */
export function DashboardPrismEmblem({
  isOpen,
  className = 'w-6 h-6',
}: {
  isOpen?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${className} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? 'rotate-90 scale-110' : 'group-hover:scale-110'
      }`}
    >
      <defs>
        <linearGradient
          id="modasrPrismGrad1"
          x1="4"
          y1="4"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient
          id="modasrPrismGrad2"
          x1="30"
          y1="6"
          x2="6"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#99F6E4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Outer Orbital Precision Ring */}
      <circle
        cx="18"
        cy="18"
        r="15.2"
        stroke="url(#modasrPrismGrad1)"
        strokeWidth="1.25"
        strokeDasharray="5 3"
        strokeOpacity="0.85"
      />

      {/* Rotated Crystal Diamond Frame */}
      <rect
        x="18"
        y="5.2"
        width="18.1"
        height="18.1"
        rx="4"
        transform="rotate(45 18 5.2)"
        fill="url(#modasrPrismGrad1)"
        fillOpacity="0.22"
        stroke="url(#modasrPrismGrad2)"
        strokeWidth="1.35"
      />

      {/* 4-Petal Geometric Lotus / Command Star */}
      <path
        d="M18 7.5L21.1 14.9L28.5 18L21.1 21.1L18 28.5L14.9 21.1L7.5 18L14.9 14.9L18 7.5Z"
        fill="url(#modasrPrismGrad2)"
        stroke="#FFFFFF"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* Inner Luminous Core Jewel */}
      <circle
        cx="18"
        cy="18"
        r="3.2"
        fill="#0F172A"
        stroke="#5EEAD4"
        strokeWidth="1.4"
      />
      <circle cx="18" cy="18" r="1.3" fill="#FFFFFF" />

      {/* 4 Cardinal Micro Nodes */}
      <circle cx="18" cy="4.2" r="1.3" fill="#5EEAD4" />
      <circle cx="31.8" cy="18" r="1.3" fill="#38BDF8" />
      <circle cx="18" cy="31.8" r="1.3" fill="#C084FC" />
      <circle cx="4.2" cy="18" r="1.3" fill="#5EEAD4" />
    </svg>
  );
}

interface TopDashboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onSelectCategory: (category: ProductCategory) => void;
  usdtRate: number;
  onRefreshRate: () => void;
  currencyMode: 'toman' | 'usd';
  onToggleCurrency: (mode: 'toman' | 'usd') => void;
  totalCartCount: number;
  onOpenCart: () => void;
  latestOrder: ModasrOrder;
}

export function TopDashboardDrawer({
  isOpen,
  onClose,
  lang,
  activeSection,
  onSelectSection,
  onSelectCategory,
  usdtRate,
  onRefreshRate,
  currencyMode,
  onToggleCurrency,
  totalCartCount,
  onOpenCart,
  latestOrder,
}: TopDashboardDrawerProps) {
  const [refreshing, setRefreshing] = useState(false);
  const isRtl = lang === 'fa';

  if (!isOpen) return null;

  const categoryCounts = {
    gaming: MODASR_PRODUCTS.filter((p) => p.category === 'gaming').length,
    ingame: MODASR_PRODUCTS.filter((p) => p.category === 'ingame').length,
    ai: MODASR_PRODUCTS.filter((p) => p.category === 'ai').length,
    vpn: MODASR_PRODUCTS.filter((p) => p.category === 'vpn').length,
    subscriptions: MODASR_PRODUCTS.filter((p) => p.category === 'subscriptions')
      .length,
  };

  const handleSyncRate = () => {
    setRefreshing(true);
    onRefreshRate();
    window.setTimeout(() => setRefreshing(false), 500);
  };

  const handleNavigate = (section: SectionId, category?: ProductCategory) => {
    if (category) {
      onSelectCategory(category);
    }
    onSelectSection(section);
    onClose();
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-label={isRtl ? 'داشبورد کشویی بالای صفحه' : 'Top Sliding Dashboard'}
      data-testid="top-dashboard-drawer"
      className="fixed inset-0 z-50 flex flex-col justify-start"
    >
      {/* Frosted Dimmed Backdrop */}
      <div
        data-testid="top-dashboard-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity"
      />

      {/* Spring-Animated Top Crystal Glass Sheet */}
      <aside className="relative z-10 w-full max-h-[90dvh] overflow-y-auto rounded-b-[36px] bg-white/[0.17] backdrop-blur-3xl border-b border-x border-white/60 shadow-[0_32px_90px_rgba(0,0,0,0.55),inset_0_-1px_3px_rgba(255,255,255,0.85)] px-4 sm:px-10 lg:px-16 pt-4 pb-5 text-white animate-fade-up">
        {/* Spring Aurora Multi-Hue Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[36px]"
        >
          <div className="absolute -top-24 left-1/4 w-96 h-64 rounded-full bg-teal-300/25 blur-3xl" />
          <div className="absolute -top-16 right-1/4 w-80 h-60 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-40 rounded-full bg-cyan-300/15 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          {/* Header Row with Bespoke Prism Emblem + Live Status Pill + Close Orb */}
          <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/30">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.22] backdrop-blur-2xl border border-white/70 flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(45,212,191,0.28),inset_0_1px_2px_rgba(255,255,255,0.9)]">
                <DashboardPrismEmblem className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/50 text-[10px] font-bold text-emerald-200 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    {isRtl ? 'آنلاین · تحویل آنی' : 'LIVE · INSTANT HUB'}
                  </span>
                  <span className="text-[11px] font-mono text-white/75 hidden sm:inline">
                    MODASR PRISM OS
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg font-black text-white truncate mt-1">
                  {isRtl
                    ? 'مرکز فرماندهی و دسترسی سریع مدثر'
                    : 'MODASR Quick Command & Navigation Hub'}
                </h2>
              </div>
            </div>

            <button
              type="button"
              data-testid="close-top-dashboard-btn"
              onClick={onClose}
              aria-label={isRtl ? 'بستن داشبورد' : 'Close dashboard'}
              className="w-10 h-10 rounded-2xl bg-white/[0.2] hover:bg-white/[0.32] border border-white/60 flex items-center justify-center text-white transition-all cursor-pointer shrink-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Visual Category & Section Command Tiles (Primary Visual Grid) */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                {
                  id: 'drawer-nav-home',
                  section: 'home' as SectionId,
                  category: 'all' as ProductCategory,
                  icon: Home,
                  titleFa: 'خانه اصلی',
                  titleEn: 'Home Hub',
                  subFa: 'نمای کلی سایت',
                  subEn: 'Main Storefront',
                  aura: 'from-teal-300/35 via-cyan-300/15 to-transparent',
                  iconBg: 'bg-teal-400/25 border-teal-200/60 text-teal-100',
                },
                {
                  id: 'drawer-nav-games',
                  section: 'games' as SectionId,
                  category: 'gaming' as ProductCategory,
                  icon: Gamepad2,
                  titleFa: 'گیفت‌کارت و گیم',
                  titleEn: 'Gaming & Cards',
                  subFa: `${(categoryCounts.gaming + categoryCounts.ingame).toLocaleString('fa-IR')} محصول`,
                  subEn: `${categoryCounts.gaming + categoryCounts.ingame} Items`,
                  aura: 'from-rose-400/35 via-orange-300/15 to-transparent',
                  iconBg: 'bg-rose-400/25 border-rose-200/60 text-rose-100',
                },
                {
                  id: 'drawer-nav-ai',
                  section: 'ai' as SectionId,
                  category: 'ai' as ProductCategory,
                  icon: Cpu,
                  titleFa: 'هوش مصنوعی',
                  titleEn: 'AI & Coding Pro',
                  subFa: `${categoryCounts.ai.toLocaleString('fa-IR')} محصول`,
                  subEn: `${categoryCounts.ai} Items`,
                  aura: 'from-sky-400/35 via-indigo-400/15 to-transparent',
                  iconBg: 'bg-sky-400/25 border-sky-200/60 text-sky-100',
                },
                {
                  id: 'drawer-nav-web',
                  section: 'web' as SectionId,
                  category: 'vpn' as ProductCategory,
                  icon: ShieldCheck,
                  titleFa: 'وی‌پی‌ان و اپ',
                  titleEn: 'VPN & Apps',
                  subFa: `${(categoryCounts.vpn + categoryCounts.subscriptions).toLocaleString('fa-IR')} محصول`,
                  subEn: `${categoryCounts.vpn + categoryCounts.subscriptions} Items`,
                  aura: 'from-emerald-400/35 via-teal-300/15 to-transparent',
                  iconBg:
                    'bg-emerald-400/25 border-emerald-200/60 text-emerald-100',
                },
                {
                  id: 'drawer-nav-search',
                  section: 'search' as SectionId,
                  category: 'all' as ProductCategory,
                  icon: Globe,
                  titleFa: 'آرشیو ۵۰ محصول',
                  titleEn: 'Full Catalog',
                  subFa: 'جستجو و فیلتر',
                  subEn: 'Search & Filter',
                  aura: 'from-purple-400/35 via-fuchsia-300/15 to-transparent',
                  iconBg:
                    'bg-purple-400/25 border-purple-200/60 text-purple-100',
                },
                {
                  id: 'drawer-nav-account',
                  section: 'studio' as SectionId,
                  category: undefined,
                  icon: User,
                  titleFa: 'حساب کاربری',
                  titleEn: 'My Account',
                  subFa: 'پیگیری سفارش‌ها',
                  subEn: 'Order Tracker',
                  aura: 'from-amber-300/35 via-yellow-300/15 to-transparent',
                  iconBg: 'bg-amber-400/25 border-amber-200/60 text-amber-100',
                },
              ].map((item) => {
                const Icon = item.icon;
                const isCurrent = activeSection === item.section;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={item.id}
                    onClick={() => handleNavigate(item.section, item.category)}
                    className={`group relative overflow-hidden p-3.5 rounded-2xl backdrop-blur-2xl border text-start flex flex-col justify-between gap-2.5 transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-white/[0.3] border-white shadow-[0_10px_28px_rgba(255,255,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.95)] scale-[1.01]'
                        : 'bg-white/[0.14] hover:bg-white/[0.24] border-white/45 hover:border-white/80 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7)]'
                    }`}
                  >
                    {/* Subtle Corner Aura */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.aura} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] ${item.iconBg}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {isCurrent ? (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-slate-950 shadow-xs">
                          {isRtl ? 'فعال' : 'Active'}
                        </span>
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                    </div>

                    <div className="relative z-10">
                      <div className="text-xs sm:text-sm font-black text-white">
                        {isRtl ? item.titleFa : item.titleEn}
                      </div>
                      <div className="text-[11px] text-white/85 mt-0.5 font-medium">
                        {isRtl ? item.subFa : item.subEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Compact Live Telemetry & Action Strips (Wallex USDT + Order Progress + Cart & 3D Studio) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Strip 1 (5 cols): Live Wallex Exchange Rate + Sparkline Wave + Currency Switch */}
            <div className="lg:col-span-5 p-3.5 sm:p-4 rounded-2xl bg-white/[0.15] backdrop-blur-2xl border border-white/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isRtl ? 'نرخ لحظه‌ای تتر والکس' : 'Live Wallex USDT'}
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-black text-white tabular-nums mt-0.5">
                  {formatToman(usdtRate, lang)}
                </div>
              </div>

              {/* Decorative Live Wave SVG */}
              <svg
                viewBox="0 0 72 28"
                className="w-16 h-7 hidden sm:block shrink-0"
                fill="none"
              >
                <path
                  d="M2 22C12 20 16 10 26 13C36 16 42 5 52 8C60 10 64 4 70 3"
                  stroke="#5EEAD4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="70" cy="3" r="2.5" fill="#FFFFFF" />
              </svg>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center bg-white/[0.16] p-0.5 rounded-xl border border-white/45 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => onToggleCurrency('toman')}
                    className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                      currencyMode === 'toman'
                        ? 'bg-white text-slate-950 font-black'
                        : 'text-white/85'
                    }`}
                  >
                    {isRtl ? 'تومان' : 'IRT'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleCurrency('usd')}
                    className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                      currencyMode === 'usd'
                        ? 'bg-white text-slate-950 font-black'
                        : 'text-white/85'
                    }`}
                  >
                    USD
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSyncRate}
                  aria-label={isRtl ? 'بروزرسانی نرخ تتر' : 'Refresh USDT rate'}
                  className="w-8 h-8 rounded-xl bg-white/[0.2] hover:bg-white/[0.32] border border-white/50 flex items-center justify-center text-teal-100 cursor-pointer transition-colors"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Strip 2 (4 cols): Active Order Live Status Card */}
            <button
              type="button"
              onClick={() => handleNavigate('studio')}
              className="lg:col-span-4 p-3.5 sm:p-4 rounded-2xl bg-white/[0.15] hover:bg-white/[0.24] backdrop-blur-2xl border border-white/50 hover:border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)] flex items-center justify-between gap-3 text-start transition-all cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isRtl ? 'پیگیری آخرین سفارش' : 'Active Order Status'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-base sm:text-lg font-black text-white font-mono">
                    {latestOrder.orderNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-100">
                    <CheckCircle2 className="w-3 h-3" />
                    {isRtl ? 'ثبت‌شده' : 'Verified'}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-200 shrink-0" />
            </button>

            {/* Strip 3 (3 cols): Quick Cart Action Button */}
            <div className="lg:col-span-3 flex items-center">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="w-full h-full p-3.5 sm:p-4 rounded-2xl bg-white/[0.18] hover:bg-white/[0.28] backdrop-blur-2xl border border-white/55 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)] flex items-center justify-between gap-2 text-start cursor-pointer transition-all"
              >
                <div>
                  <div className="text-[11px] font-bold text-emerald-200">
                    {isRtl ? 'سبد خرید' : 'Shopping Cart'}
                  </div>
                  <div className="text-base sm:text-lg font-black text-white tabular-nums mt-0.5">
                    {totalCartCount.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}{' '}
                    {isRtl ? 'آیتم در سبد' : 'Items'}
                  </div>
                </div>
                <ShoppingBag className="w-4 h-4 text-emerald-200 shrink-0" />
              </button>
            </div>
          </div>

          {/* Sleek Bottom Pull-Up Handle Bar */}
          <div className="pt-0.5 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              aria-label={isRtl ? 'جمع کردن کشوی داشبورد' : 'Collapse drawer'}
              className="group inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-white/[0.16] hover:bg-white/[0.28] border border-white/50 text-[11px] font-bold text-white/90 cursor-pointer transition-all"
            >
              <span className="w-8 h-1 rounded-full bg-white/70 group-hover:bg-white transition-colors" />
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
