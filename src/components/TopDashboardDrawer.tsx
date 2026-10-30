import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Cloud,
  Cpu,
  CreditCard,
  Diamond,
  Gamepad2,
  Gift,
  Globe,
  Headphones,
  Home,
  Mail,
  Megaphone,
  MessageCircle,
  Music,
  Orbit,
  Phone,
  PhoneCall,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Terminal,
  Tv,
  User,
  Wallet,
  Wand2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import {
  DASHBOARD_ACCORDION_CATEGORIES,
  DashboardSubItem,
  MODASR_BLOG_POSTS,
  ModasrBlogPost,
  resolveDashboardProduct,
} from '../utils/dashboardCatalog';
import { Language, SectionId } from '../utils/heroConfig';
import {
  MODASR_PRODUCTS,
  ModasrOrder,
  ModasrProduct,
  ProductCategory,
  convertUsdToToman,
  formatToman,
} from '../utils/modasrStore';

/**
 * 3-Line Staggered Hamburger Menu Icon (Permio-inspired 3-line menu shape with MODASR 3D glow)
 * Used in the top header button instead of text.
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
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${className} transition-transform duration-300 ease-out ${
        isOpen ? 'scale-105' : 'group-hover:scale-105'
      }`}
    >
      <defs>
        <linearGradient
          id="modasrMenuBarsGrad"
          x1="3"
          y1="6"
          x2="25"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Top Line */}
      <rect
        x="4"
        y="6.25"
        width="20"
        height="2.75"
        rx="1.375"
        fill="url(#modasrMenuBarsGrad)"
      />
      {/* Middle Line (Slightly shorter staggered Permio-style bar) */}
      <rect
        x="8"
        y="12.625"
        width="16"
        height="2.75"
        rx="1.375"
        fill="url(#modasrMenuBarsGrad)"
      />
      {/* Bottom Line */}
      <rect
        x="5.5"
        y="19"
        width="18.5"
        height="2.75"
        rx="1.375"
        fill="url(#modasrMenuBarsGrad)"
      />
    </svg>
  );
}

/**
 * Branded 3D MODASR Emblem for inside the Sliding Drawer Header
 */
function ModasrBrandCubeLogo() {
  return (
    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-[1.5px] shadow-[0_4px_0_#042f2e,0_8px_20px_rgba(20,184,166,0.4)] shrink-0">
      <div className="w-full h-full rounded-[14px] bg-[#04121a] flex items-center justify-center relative overflow-hidden">
        <span className="pointer-events-none absolute inset-x-1 top-0.5 h-2 rounded-full bg-white/25" />
        <span className="font-podium font-black text-lg text-teal-300 tracking-tighter drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]">
          M
        </span>
      </div>
    </div>
  );
}

interface TopDashboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectProduct?: (product: ModasrProduct) => void;
  usdtRate: number;
  onRefreshRate: () => void;
  currencyMode: 'toman' | 'usd';
  onToggleCurrency: (mode: 'toman' | 'usd') => void;
  totalCartCount: number;
  onOpenCart: () => void;
  latestOrder: ModasrOrder;
}

function renderPermioSubItemIcon(item: DashboardSubItem) {
  const iconCls = 'w-4 h-4';
  switch (item.iconKey) {
    case 'social':
      return <Mail className={`${iconCls} text-sky-300`} />;
    case 'telegram':
      return (
        <span className="w-6 h-6 rounded-full bg-[#2AABEE] flex items-center justify-center text-white shadow-xs shrink-0">
          <Send className="w-3.5 h-3.5 -translate-x-[1px]" />
        </span>
      );
    case 'music':
      return <Music className={`${iconCls} text-emerald-300`} />;
    case 'spotify':
      return (
        <span className="w-6 h-6 rounded-full bg-[#1DB954] flex items-center justify-center text-slate-950 font-black text-[10px] shadow-xs shrink-0">
          SP
        </span>
      );
    case 'language':
      return <Globe className={`${iconCls} text-lime-300`} />;
    case 'duolingo':
      return (
        <span className="w-6 h-6 rounded-lg bg-[#58CC02] flex items-center justify-center text-slate-950 font-black text-[9px] shadow-xs shrink-0">
          DUO
        </span>
      );
    case 'ai':
      return <Terminal className={`${iconCls} text-teal-300`} />;
    case 'openai':
      return (
        <span className="w-6 h-6 rounded-lg bg-[#10A37F] flex items-center justify-center text-white font-black text-[9px] shadow-xs shrink-0">
          AI
        </span>
      );
    case 'utility':
      return <Sparkles className={`${iconCls} text-cyan-300`} />;
    case 'graphics':
      return <Wand2 className={`${iconCls} text-purple-300`} />;
    case 'meditation':
      return <Diamond className={`${iconCls} text-teal-300`} />;
    case 'seo':
      return <Search className={`${iconCls} text-sky-300`} />;
    case 'antivirus':
      return <Shield className={`${iconCls} text-emerald-300`} />;
    case 'apple':
      return (
        <span className="w-6 h-6 rounded-lg bg-slate-700 border border-white/25 flex items-center justify-center text-white font-black text-[10px] shrink-0">
          
        </span>
      );
    case 'sports':
      return <Activity className={`${iconCls} text-orange-400`} />;
    case 'video':
      return <Tv className={`${iconCls} text-rose-400`} />;
    case 'library':
      return <BookOpen className={`${iconCls} text-amber-300`} />;
    case 'cloud':
      return <Cloud className={`${iconCls} text-blue-300`} />;
    case 'kyc':
      return <ShieldCheck className={`${iconCls} text-teal-300`} />;
    case 'phone':
      return <Phone className={`${iconCls} text-sky-300`} />;
    case 'googlevoice':
      return <PhoneCall className={`${iconCls} text-emerald-400`} />;
    case 'esim':
      return <Smartphone className={`${iconCls} text-purple-300`} />;
    case 'paypal':
      return (
        <span className="w-6 h-6 rounded-lg bg-[#00457C] flex items-center justify-center text-white font-black text-xs italic shrink-0">
          P
        </span>
      );
    case 'redotpay':
      return (
        <span className="w-6 h-6 rounded-full border-2 border-red-500 bg-red-500/15 flex items-center justify-center text-red-400 font-black text-xs shrink-0">
          R
        </span>
      );
    case 'webmoney':
      return (
        <span className="w-6 h-6 rounded-full bg-sky-600 flex items-center justify-center text-white font-black text-[9px] shrink-0">
          WM
        </span>
      );
    case 'binance':
      return (
        <span className="w-6 h-6 rounded-full bg-[#F3BA2F] flex items-center justify-center text-slate-950 font-black text-[10px] shrink-0">
          ◆
        </span>
      );
    case 'kucoin':
      return (
        <span className="w-6 h-6 rounded-full bg-[#23AF91] flex items-center justify-center text-white font-black text-[10px] shrink-0">
          K
        </span>
      );
    case 'visa':
      return (
        <span className="px-1.5 h-5 rounded bg-[#1A1F71] border border-blue-400/40 flex items-center justify-center text-white font-black text-[9px] tracking-tighter shrink-0">
          VISA
        </span>
      );
    case 'mastercard':
      return (
        <span className="px-1.5 h-5 rounded bg-gradient-to-r from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-[9px] shrink-0">
          MC
        </span>
      );
    case 'verve':
      return (
        <span className="px-1.5 h-5 rounded bg-rose-900/90 border border-rose-400/40 flex items-center justify-center text-rose-200 font-black text-[9px] shrink-0">
          Verve
        </span>
      );
    case 'afrigo':
      return (
        <span className="px-1.5 h-5 rounded bg-emerald-900/90 border border-emerald-400/40 flex items-center justify-center text-emerald-200 font-black text-[9px] shrink-0">
          Afrigo
        </span>
      );
    default:
      return (
        <span
          style={{
            background: item.badgeBg,
            borderColor: `${item.badgeColor}66`,
          }}
          className="w-6 h-6 rounded-lg border flex items-center justify-center text-[9.5px] font-black text-white shrink-0 shadow-xs"
        >
          {item.badgeText || '★'}
        </span>
      );
  }
}

function BlogArtworkBanner({
  post,
  isRtl,
}: {
  post: ModasrBlogPost;
  isRtl: boolean;
}) {
  const categoryText = isRtl ? post.categoryFa : post.categoryEn;
  const bannerTitle = isRtl ? post.bannerTitleFa : post.bannerTitleEn;
  const bannerSub = isRtl ? post.bannerSubtitleFa : post.bannerSubtitleEn;

  const themeBg =
    post.visualTheme === 'ai-orbs'
      ? 'bg-gradient-to-br from-[#030712] via-[#0a192f] to-[#1e1b4b]'
      : post.visualTheme === 'steam-gaming'
      ? 'bg-gradient-to-br from-[#1f060d] via-[#111827] to-[#0f172a]'
      : post.visualTheme === 'soundcloud-audio'
      ? 'bg-gradient-to-br from-[#1c1008] via-[#27150a] to-[#09090b]'
      : post.visualTheme === 'telegram-stairs'
      ? 'bg-gradient-to-b from-[#1e1b4b] via-[#0f172a] to-[#020617]'
      : post.visualTheme === 'telegram-lightning'
      ? 'bg-gradient-to-br from-[#090d26] via-[#172554] to-[#020617]'
      : 'bg-gradient-to-br from-[#1d4ed8] via-[#1e40af] to-[#0f172a]';

  return (
    <div
      className={`relative w-full min-h-[208px] sm:min-h-[220px] overflow-hidden ${themeBg} flex flex-col items-center justify-center px-4 pt-12 pb-3.5 text-center select-none`}
    >
      {post.visualTheme === 'ai-orbs' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-start gap-2 px-4 opacity-50"
        >
          <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-300 shadow-[0_0_24px_#10b981]" />
          <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 to-sky-300 shadow-[0_0_26px_#38bdf8]" />
          <span className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-200 via-white to-teal-100 shadow-[0_0_32px_#ffffff]" />
          <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-300 shadow-[0_0_24px_#f59e0b]" />
        </div>
      )}

      {post.visualTheme === 'steam-gaming' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-8 top-4 w-36 h-36 rounded-full border-4 border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.5)]" />
          <div className="absolute -right-6 bottom-2 w-40 h-40 rounded-3xl border-2 border-blue-400/35 rotate-12 shadow-[0_0_40px_rgba(59,130,246,0.45)]" />
        </div>
      )}

      {post.visualTheme === 'soundcloud-audio' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 opacity-45"
        >
          <div className="w-24 h-24 rounded-full border-4 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.5)]" />
          <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_16px_#f59e0b]" />
          <div className="w-20 h-20 rounded-2xl border-2 border-orange-400/40" />
        </div>
      )}

      {post.visualTheme === 'google-cloud' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
        >
          <Globe className="w-10 h-10 text-white" />
        </div>
      )}

      {/* Top-Right White Category Pill */}
      <span className="absolute top-3.5 right-3.5 z-10 px-3.5 py-1 rounded-full bg-white text-slate-950 text-[11px] font-black shadow-md">
        {categoryText}
      </span>

      {/* Center Framed Headline Box */}
      <div className="relative z-10 max-w-[88%] px-4 py-2.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="text-sm sm:text-base font-black text-white leading-snug drop-shadow">
          {bannerTitle}
        </div>
        {bannerSub && (
          <div className="text-[10px] sm:text-[11px] text-teal-200/90 font-semibold mt-0.5">
            {bannerSub}
          </div>
        )}
        <div className="mx-auto mt-1.5 w-12 h-0.5 rounded-full bg-gradient-to-r from-teal-400 via-amber-300 to-cyan-400" />
      </div>

      {post.bannerPills && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 mt-2 max-w-xs">
          {post.bannerPills.map((pill) => (
            <span
              key={pill}
              className="px-2.5 py-0.5 rounded-full bg-slate-950/75 border border-teal-400/45 text-[10px] font-bold text-teal-100"
            >
              {pill}
            </span>
          ))}
        </div>
      )}

      {/* Branded Pill: "modasr.ir | مدثر" */}
      <span className="relative z-10 mt-2.5 px-3 py-0.5 rounded-full bg-slate-950/85 border border-amber-400/55 text-[10px] font-bold text-amber-200 tracking-wide shadow">
        modasr.ir | مدثر
      </span>
    </div>
  );
}

export function TopDashboardDrawer({
  isOpen,
  onClose,
  lang,
  activeSection,
  onSelectSection,
  onSelectCategory,
  onSelectProduct,
  usdtRate,
  onRefreshRate,
  currencyMode,
  onToggleCurrency,
  totalCartCount,
  onOpenCart,
  latestOrder,
}: TopDashboardDrawerProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'blog' | 'contact'>(
    'menu'
  );
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([
    'international-websites',
  ]);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [activeBlogPage, setActiveBlogPage] = useState<number>(1);
  const [selectedBlogPost, setSelectedBlogPost] =
    useState<ModasrBlogPost | null>(null);
  const [cashoutUsdInput, setCashoutUsdInput] = useState<string>('100');

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

  const toggleAccordion = (id: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubItemClick = (item: DashboardSubItem) => {
    if (item.targetSection) {
      handleNavigate(item.targetSection, item.targetCategory);
      return;
    }
    if (item.productId) {
      const product = resolveDashboardProduct(item.productId);
      if (onSelectProduct) {
        onSelectProduct(product);
        onClose();
      } else {
        handleNavigate('home', product.category);
      }
    }
  };

  const handleOpenCustomWebsiteModal = () => {
    const customProduct = resolveDashboardProduct('custom-website-order');
    if (onSelectProduct) {
      onSelectProduct(customProduct);
      onClose();
    }
  };

  const getAccordionIcon = (catId: string) => {
    const cls = 'w-4 h-4';
    switch (catId) {
      case 'international-websites':
        return <Globe className={cls} />;
      case 'virtual-numbers-esim':
        return <Smartphone className={cls} />;
      case 'international-cards-accounts':
        return <CreditCard className={cls} />;
      case 'gift-cards':
        return <Gift className={cls} />;
      case 'games-and-coins':
        return <Gamepad2 className={cls} />;
      case 'advertising-services':
        return <Megaphone className={cls} />;
      case 'cashout-income':
      default:
        return <Wallet className={cls} />;
    }
  };

  const normalizedQuery = drawerSearch.trim().toLowerCase();
  const filteredCategories = DASHBOARD_ACCORDION_CATEGORIES.map((cat) => {
    if (!normalizedQuery) return cat;
    const catMatches =
      cat.titleFa.toLowerCase().includes(normalizedQuery) ||
      cat.titleEn.toLowerCase().includes(normalizedQuery) ||
      cat.subtitleFa.toLowerCase().includes(normalizedQuery);
    if (catMatches) return cat;
    const matchingItems = cat.items.filter(
      (item) =>
        item.titleFa.toLowerCase().includes(normalizedQuery) ||
        item.titleEn.toLowerCase().includes(normalizedQuery)
    );
    return {
      ...cat,
      items: matchingItems,
    };
  }).filter((cat) => cat.items.length > 0);

  const parsedCashoutUsd = Math.max(1, Number(cashoutUsdInput) || 100);
  const cashoutPayoutToman = Math.round(parsedCashoutUsd * usdtRate * 0.97);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-label={
        isRtl ? 'منوی کشویی خدمات مدثر' : 'MODASR Sliding Service Menu'
      }
      data-testid="top-dashboard-drawer"
      className="fixed inset-0 z-50 flex justify-start"
    >
      {/* Frosted Dimmed Backdrop */}
      <div
        data-testid="top-dashboard-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
      />

      {/* Permio-Style Sliding Side Drawer with MODASR 3D Dark Glass Aesthetic */}
      <aside
        className={`relative z-10 w-[88vw] max-w-[430px] sm:max-w-[460px] h-full max-h-dvh overflow-y-auto bg-[#060f18]/98 backdrop-blur-3xl border-e border-teal-400/30 shadow-[0_24px_90px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between text-white ${
          isRtl ? 'animate-slide-left' : 'animate-slide-right'
        }`}
      >
        {/* =================================================================
            1. STICKY PERMIO-STYLE BRAND HEADER (مدثر — پرمیوم تا ابد + X Button)
        ================================================================== */}
        <div className="sticky top-0 z-20 bg-[#060f18]/95 backdrop-blur-2xl border-b border-white/12 px-4 sm:px-5 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            {/* Right (in RTL): MODASR Brand Logo + "پرمیوم تا ابد" */}
            <div className="flex items-center gap-3 min-w-0">
              <ModasrBrandCubeLogo />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-vazir font-black text-2xl tracking-tight text-teal-300 leading-none drop-shadow-[0_0_12px_rgba(45,212,191,0.35)]">
                    {isRtl ? 'مدثر' : 'MODASR'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-400/15 border border-teal-400/40 text-[10px] font-mono font-bold text-teal-200">
                    MODASR
                  </span>
                </div>
                <p className="text-[11px] font-bold text-white/75 truncate mt-1">
                  {isRtl ? 'پرمیوم تا ابد' : 'Premium Forever'}
                </p>
              </div>
            </div>

            {/* Left (in RTL): Close X Button (Matches Permio Drawer Top-Left X) */}
            <button
              type="button"
              data-testid="close-top-dashboard-btn"
              onClick={onClose}
              aria-label={isRtl ? 'بستن منو' : 'Close menu'}
              className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shrink-0 shadow-[0_3px_0_#02060d,inset_0_1px_1px_rgba(255,255,255,0.25)] active:translate-y-0.5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Instant Filter Search Bar inside Drawer */}
          <div className="relative">
            <Search className="w-4 h-4 text-teal-300/80 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="text"
              data-testid="dashboard-service-search"
              value={drawerSearch}
              onChange={(e) => {
                setDrawerSearch(e.target.value);
                if (activeTab !== 'menu') setActiveTab('menu');
              }}
              placeholder={
                isRtl
                  ? 'جستجو در منو (پی‌پال، ردات‌پی، گوگل ویس، استیم، چت جی‌پی‌تی...)'
                  : 'Search menu (PayPal, Redotpay, Google Voice, Steam, ChatGPT...)'
              }
              className="w-full ps-10 pe-8 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 focus:border-teal-400/70 text-xs text-white placeholder:text-white/45 focus:outline-none transition-colors"
            />
            {drawerSearch && (
              <button
                type="button"
                onClick={() => setDrawerSearch('')}
                className="absolute top-1/2 -translate-y-1/2 end-2.5 text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 3-Tab Mode Switcher: منوی خدمات | وبلاگ مدثر | تماس با مدثر */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950/90 border border-white/10">
            <button
              type="button"
              data-testid="dashboard-tab-menu"
              onClick={() => {
                setActiveTab('menu');
                setSelectedBlogPost(null);
              }}
              className={`py-2 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'menu'
                  ? 'bg-gradient-to-b from-teal-400 to-teal-500 text-slate-950 shadow-[0_2px_10px_rgba(20,184,166,0.45)]'
                  : 'text-white/75 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">
                {isRtl ? 'منوی خدمات' : 'Services'}
              </span>
            </button>

            <button
              type="button"
              data-testid="dashboard-tab-blog"
              onClick={() => {
                setActiveTab('blog');
                setSelectedBlogPost(null);
              }}
              className={`py-2 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'blog'
                  ? 'bg-gradient-to-b from-teal-400 to-teal-500 text-slate-950 shadow-[0_2px_10px_rgba(20,184,166,0.45)]'
                  : 'text-white/75 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Orbit className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">
                {isRtl ? 'وبلاگ مدثر' : 'MODASR Blog'}
              </span>
            </button>

            <button
              type="button"
              data-testid="dashboard-tab-contact"
              onClick={() => {
                setActiveTab('contact');
                setSelectedBlogPost(null);
              }}
              className={`py-2 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'bg-gradient-to-b from-teal-400 to-teal-500 text-slate-950 shadow-[0_2px_10px_rgba(20,184,166,0.45)]'
                  : 'text-white/75 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">
                {isRtl ? 'تماس با مدثر' : 'Contact Us'}
              </span>
            </button>
          </div>
        </div>

        {/* =================================================================
            2. SCROLLABLE BODY (PERMIO ACCORDION MENU | BLOG | CONTACT)
        ================================================================== */}
        <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-4">
          {activeTab === 'menu' && (
            <>
              {/* =============================================================
                  PERMIO-STYLE EXPANDABLE ACCORDION MENU (ALL 7 CATEGORIES)
              ============================================================== */}
              <div className="divide-y divide-white/10 rounded-2xl bg-slate-900/80 border border-white/12 overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                {filteredCategories.map((cat) => {
                  const isExpanded =
                    Boolean(normalizedQuery) ||
                    expandedCategoryIds.includes(cat.id);

                  return (
                    <div
                      key={cat.id}
                      data-testid={`dashboard-accordion-${cat.id}`}
                      className="transition-colors"
                    >
                      {/* Top-Level Category Row (Matches Permio Screenshots 1-9: Title on Right, Chevron on Left) */}
                      <button
                        type="button"
                        data-testid={`dashboard-accordion-btn-${cat.id}`}
                        onClick={() => toggleAccordion(cat.id)}
                        aria-expanded={isExpanded}
                        className={`w-full px-4 py-4 flex items-center justify-between gap-3 text-start transition-colors cursor-pointer ${
                          isExpanded
                            ? 'bg-teal-500/[0.1] text-teal-300'
                            : 'hover:bg-white/[0.04] text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            style={{
                              color: cat.accentHex,
                              borderColor: `${cat.accentHex}55`,
                              backgroundColor: `${cat.accentHex}18`,
                            }}
                            className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-[0_2px_0_rgba(0,0,0,0.7)]"
                          >
                            {getAccordionIcon(cat.id)}
                          </span>
                          <div className="min-w-0">
                            <div
                              className={`text-sm font-black truncate ${
                                isExpanded ? 'text-teal-300' : 'text-white'
                              }`}
                            >
                              {isRtl ? cat.titleFa : cat.titleEn}
                            </div>
                            <div className="text-[10.5px] text-white/55 truncate mt-0.5">
                              {isRtl ? cat.subtitleFa : cat.subtitleEn}
                            </div>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-teal-300 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/60 shrink-0" />
                        )}
                      </button>

                      {/* Expanded Sub-Items List */}
                      {isExpanded && (
                        <div className="bg-[#040a12]/90 px-3.5 py-2.5 space-y-1.5 border-t border-white/10">
                          {cat.items.map((item) => {
                            if (item.isGroupHeader) {
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => handleSubItemClick(item)}
                                  className="w-full pt-2.5 first:pt-1 pb-1 px-1.5 flex items-center justify-between text-xs font-black text-white hover:text-teal-300 transition-colors cursor-pointer"
                                >
                                  <span className="inline-flex items-center gap-2">
                                    {renderPermioSubItemIcon(item)}
                                    <span>
                                      {isRtl ? item.titleFa : item.titleEn}
                                    </span>
                                    <span className="text-teal-300 font-black">
                                      ‹
                                    </span>
                                  </span>
                                </button>
                              );
                            }

                            const priceLabel =
                              item.priceUsd > 0
                                ? currencyMode === 'usd'
                                  ? `$${item.priceUsd.toFixed(2)}`
                                  : formatToman(
                                      convertUsdToToman(
                                        item.priceUsd,
                                        usdtRate
                                      ),
                                      lang
                                    )
                                : isRtl
                                ? 'مشاهده همه ‹'
                                : 'View All ›';

                            return (
                              <button
                                key={item.id}
                                type="button"
                                data-testid={`dashboard-item-${item.id}`}
                                onClick={() => handleSubItemClick(item)}
                                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-teal-500/[0.12] border border-white/[0.06] hover:border-teal-400/40 flex items-center justify-between gap-2.5 text-start transition-all cursor-pointer group"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {renderPermioSubItemIcon(item)}
                                  <span className="text-xs font-bold text-white/85 group-hover:text-white truncate">
                                    {isRtl ? item.titleFa : item.titleEn}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[10.5px] font-extrabold text-teal-300/90 tabular-nums">
                                    {priceLabel}
                                  </span>
                                  {isRtl ? (
                                    <ChevronLeft className="w-3.5 h-3.5 text-white/45 group-hover:text-teal-300 transition-transform group-hover:-translate-x-0.5" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-white/45 group-hover:text-teal-300 transition-transform group-hover:translate-x-0.5" />
                                  )}
                                </div>
                              </button>
                            );
                          })}

                          {/* Interactive Cash-Out Calculator inside "نقد درآمد" Accordion */}
                          {cat.id === 'cashout-income' && (
                            <div className="mt-2 p-3 rounded-xl bg-slate-900/90 border border-emerald-400/30 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300">
                                <span>
                                  {isRtl
                                    ? 'محاسبه‌گر آنی نقد درآمد ارزی:'
                                    : 'Instant Cash-Out Calculator:'}
                                </span>
                                <span>{isRtl ? 'تسویه آنی' : 'Fast Payout'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  value={cashoutUsdInput}
                                  onChange={(e) =>
                                    setCashoutUsdInput(e.target.value)
                                  }
                                  className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-xs font-black text-white text-center focus:outline-none focus:border-emerald-400"
                                />
                                <span className="text-xs font-bold text-white/70">
                                  USD ≈
                                </span>
                                <span className="text-xs font-black text-emerald-300 tabular-nums">
                                  {formatToman(cashoutPayoutToman, lang)}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Prominent Green Rounded CTA Button (Matches Screenshot 7: "وبسایت دلخواه") */}
                          {cat.ctaButton && (
                            <div className="pt-2.5 pb-1">
                              <button
                                type="button"
                                data-testid={`dashboard-cta-${cat.ctaButton.id}`}
                                onClick={handleOpenCustomWebsiteModal}
                                className="w-full py-3 px-4 rounded-2xl bg-[#16b385] hover:bg-[#10b981] text-white font-black text-sm text-center shadow-[0_4px_0_#065f46,0_10px_22px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.45)] active:translate-y-0.5 transition-all cursor-pointer"
                              >
                                {isRtl
                                  ? cat.ctaButton.labelFa
                                  : cat.ctaButton.labelEn}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* =============================================================
                  DIRECT BOTTOM ROWS: وبلاگ & تماس با مدثر (Screenshots 1, 6, 8)
              ============================================================== */}
              <div className="rounded-2xl bg-slate-900/80 border border-white/12 divide-y divide-white/10 overflow-hidden">
                <button
                  type="button"
                  data-testid="dashboard-link-blog"
                  onClick={() => {
                    setActiveTab('blog');
                    setSelectedBlogPost(null);
                  }}
                  className="w-full px-4 py-4 flex items-center justify-between gap-3 hover:bg-teal-500/[0.08] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Orbit className="w-5 h-5 text-teal-300" />
                    <span className="text-sm font-black text-white">
                      {isRtl ? 'وبلاگ' : 'MODASR Blog'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-400/15 border border-teal-400/40 text-[10px] font-bold text-teal-200">
                    {isRtl ? 'مجله مدثر' : '6 Guides'}
                  </span>
                </button>

                <button
                  type="button"
                  data-testid="dashboard-link-contact"
                  onClick={() => setActiveTab('contact')}
                  className="w-full px-4 py-4 flex items-center justify-between gap-3 hover:bg-teal-500/[0.08] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-emerald-300" />
                    <span className="text-sm font-black text-white">
                      {isRtl ? 'تماس با مدثر' : 'Contact MODASR'}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Quick 6 Section Tiles (Below the Permio menu for direct hub jumping) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold text-teal-300/90">
                    {isRtl ? 'بخش‌های اصلی سایت:' : 'Main Site Hubs:'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      id: 'drawer-nav-home',
                      section: 'home' as SectionId,
                      category: 'all' as ProductCategory,
                      icon: Home,
                      titleFa: 'خانه اصلی',
                      titleEn: 'Home',
                      accent: '#14b8a6',
                    },
                    {
                      id: 'drawer-nav-games',
                      section: 'games' as SectionId,
                      category: 'gaming' as ProductCategory,
                      icon: Gamepad2,
                      titleFa: `گیم (${(
                        categoryCounts.gaming + categoryCounts.ingame
                      ).toLocaleString('fa-IR')})`,
                      titleEn: 'Gaming',
                      accent: '#f43f5e',
                    },
                    {
                      id: 'drawer-nav-ai',
                      section: 'ai' as SectionId,
                      category: 'ai' as ProductCategory,
                      icon: Cpu,
                      titleFa: `هوش مصنوعی (${categoryCounts.ai.toLocaleString(
                        'fa-IR'
                      )})`,
                      titleEn: 'AI Hub',
                      accent: '#06b6d4',
                    },
                    {
                      id: 'drawer-nav-web',
                      section: 'web' as SectionId,
                      category: 'vpn' as ProductCategory,
                      icon: ShieldCheck,
                      titleFa: 'اتصال و اپ',
                      titleEn: 'VPN & Apps',
                      accent: '#6366f1',
                    },
                    {
                      id: 'drawer-nav-search',
                      section: 'search' as SectionId,
                      category: 'all' as ProductCategory,
                      icon: Globe,
                      titleFa: 'جستجو',
                      titleEn: 'Search',
                      accent: '#22d3ee',
                    },
                    {
                      id: 'drawer-nav-account',
                      section: 'studio' as SectionId,
                      category: undefined,
                      icon: User,
                      titleFa: 'حساب و سفارش',
                      titleEn: 'Account',
                      accent: '#10b981',
                    },
                  ].map((tile) => {
                    const Icon = tile.icon;
                    const isCurrent = activeSection === tile.section;
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        data-testid={tile.id}
                        onClick={() =>
                          handleNavigate(tile.section, tile.category)
                        }
                        style={
                          isCurrent
                            ? {
                                borderColor: tile.accent,
                                boxShadow: `0 3px 0 ${tile.accent}66, 0 6px 14px ${tile.accent}35`,
                              }
                            : undefined
                        }
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-white/[0.12] text-white'
                            : 'bg-slate-900/80 hover:bg-slate-800/90 border-white/10 text-white/80 hover:text-white'
                        }`}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: tile.accent }}
                        />
                        <span className="text-[10.5px] font-bold truncate w-full">
                          {isRtl ? tile.titleFa : tile.titleEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              TAB 2: MODASR BLOG (وبلاگ مدثر — Matches Screenshots 10, 11, 12, 13)
          ================================================================== */}
          {activeTab === 'blog' && (
            <div data-testid="dashboard-blog-view" className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950/85 to-slate-900 border border-teal-400/35 p-5 text-center shadow-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-400/15 border border-teal-300/40 text-[10px] font-bold text-teal-200 mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>MODASR MAGAZINE • 1405</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {isRtl ? 'وبلاگ مدثر' : 'MODASR Official Blog'}
                </h2>
                <p className="text-xs text-white/70 mt-1">
                  {isRtl
                    ? 'راهنمای تخصصی خرید اکانت هوش مصنوعی، گیفت کارت، موسیقی و سرویس‌های بین‌المللی'
                    : 'In-depth guides on AI subscriptions, Steam regions, Spotify, and Telegram Boosts'}
                </p>
              </div>

              {selectedBlogPost ? (
                <div
                  data-testid="dashboard-blog-reader"
                  className="rounded-3xl bg-slate-900/90 border border-teal-400/40 overflow-hidden shadow-2xl space-y-4 pb-5"
                >
                  <BlogArtworkBanner post={selectedBlogPost} isRtl={isRtl} />
                  <div className="px-4 sm:px-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-white/60">
                      <span>
                        {isRtl
                          ? `${selectedBlogPost.dateFa} • ${selectedBlogPost.commentsFa}`
                          : `${selectedBlogPost.dateEn} • ${selectedBlogPost.commentsEn}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedBlogPost(null)}
                        className="text-teal-300 hover:underline font-bold cursor-pointer"
                      >
                        {isRtl
                          ? 'بازگشت به لیست مقالات »'
                          : '« Back to articles'}
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
                      {isRtl
                        ? selectedBlogPost.titleFa
                        : selectedBlogPost.titleEn}
                    </h3>

                    <div className="space-y-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                      {(isRtl
                        ? selectedBlogPost.contentFa
                        : selectedBlogPost.contentEn
                      ).map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        data-testid="blog-buy-related-btn"
                        onClick={() => {
                          const prod = resolveDashboardProduct(
                            selectedBlogPost.relatedProductId
                          );
                          if (onSelectProduct) {
                            onSelectProduct(prod);
                            onClose();
                          }
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs text-center cursor-pointer transition-colors"
                      >
                        {isRtl
                          ? 'مشاهده پلن‌ها و خرید آنی این سرویس'
                          : 'View Plans & Buy Instantly'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBlogPost(null)}
                        className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold cursor-pointer"
                      >
                        {isRtl ? 'بستن مطلب' : 'Close'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {MODASR_BLOG_POSTS.map((post) => (
                      <article
                        key={post.id}
                        data-testid={`dashboard-blog-card-${post.id}`}
                        className="rounded-3xl bg-slate-900/90 border border-white/15 hover:border-teal-400/50 overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.65)] transition-all"
                      >
                        <BlogArtworkBanner post={post} isRtl={isRtl} />

                        <div className="p-4 sm:p-5 space-y-2.5">
                          <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                            {isRtl ? post.titleFa : post.titleEn}
                          </h3>
                          <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                            {isRtl ? post.excerptFa : post.excerptEn}
                          </p>

                          <div className="pt-1 flex items-center justify-between">
                            <button
                              type="button"
                              data-testid={`blog-read-btn-${post.id}`}
                              onClick={() => setSelectedBlogPost(post)}
                              className="text-xs font-black text-teal-300 hover:text-teal-200 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>
                                {isRtl ? 'خواندن مطلب «' : 'Read Article »'}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const prod = resolveDashboardProduct(
                                  post.relatedProductId
                                );
                                if (onSelectProduct) {
                                  onSelectProduct(prod);
                                  onClose();
                                }
                              }}
                              className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-teal-400/20 border border-white/10 hover:border-teal-400/40 text-[11px] font-bold text-white/85 hover:text-teal-200 transition-colors cursor-pointer"
                            >
                              {isRtl ? 'خرید سرویس مرتبط' : 'Buy Service'}
                            </button>
                          </div>

                          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/55">
                            <span>{isRtl ? post.dateFa : post.dateEn}</span>
                            <span>•</span>
                            <span>
                              {isRtl ? post.commentsFa : post.commentsEn}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Blog Numbered Pagination (1 2 3 4 5 6) */}
                  <div className="pt-2 pb-1 flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setActiveBlogPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          activeBlogPage === pageNum
                            ? 'bg-teal-400 text-slate-950 shadow-[0_0_12px_rgba(45,212,191,0.5)]'
                            : 'bg-slate-900 text-teal-300 border border-white/10 hover:border-teal-400/40'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 3: CONTACT MODASR & LIVE ORDER / WALLEX RATE
          ================================================================== */}
          {activeTab === 'contact' && (
            <div data-testid="dashboard-contact-view" className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-950/70 via-slate-900 to-slate-950 border border-teal-400/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-400/20 border border-teal-300/50 flex items-center justify-center text-teal-300 shrink-0">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl
                        ? 'پشتیبانی ۲۴ ساعته و تحویل آنی مدثر'
                        : 'MODASR 24/7 Live Support Desk'}
                    </h3>
                    <p className="text-[11px] text-white/70">
                      {isRtl
                        ? 'هماهنگی پرداخت، تحویل اکانت و مشاوره تخصصی خرید'
                        : 'Instant order activation, custom payments & account support'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleOpenCustomWebsiteModal}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center cursor-pointer transition-colors"
                  >
                    {isRtl
                      ? 'ثبت سفارش پرداخت در وبسایت دلخواه'
                      : 'Request Custom Website Payment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('studio')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs text-center cursor-pointer transition-colors"
                  >
                    {isRtl
                      ? 'ورود به بخش پیگیری سفارش‌ها (@modasrpanel)'
                      : 'Open Live Order Tracker (@modasrpanel)'}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate('studio')}
                className="w-full p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-white/15 flex items-center justify-between gap-3 text-start transition-all cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {isRtl ? 'پیگیری آخرین سفارش' : 'Active Order Status'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-black text-white font-mono">
                      {latestOrder.orderNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {isRtl ? 'ثبت‌شده روی سرور' : 'Server Verified'}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-amber-300 shrink-0" />
              </button>
            </div>
          )}
        </div>

        {/* =================================================================
            3. STICKY BOTTOM FOOTER BAR (Wallex USDT Rate + Cart + Floating Chat Bubble)
        ================================================================== */}
        <div className="sticky bottom-0 z-20 bg-[#040a11]/95 backdrop-blur-2xl border-t border-white/12 px-4 sm:px-5 py-3 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={handleSyncRate}
                aria-label={isRtl ? 'بروزرسانی نرخ تتر' : 'Refresh USDT rate'}
                className="w-8 h-8 rounded-xl bg-teal-400/15 hover:bg-teal-400/25 border border-teal-400/40 flex items-center justify-center text-teal-300 cursor-pointer shrink-0"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
                />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-teal-300">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {isRtl ? 'نرخ تتر والکس:' : 'Wallex USDT:'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-black text-white tabular-nums">
                  {formatToman(usdtRate, lang)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-white/15 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => onToggleCurrency('toman')}
                  className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                    currencyMode === 'toman'
                      ? 'bg-teal-400 text-slate-950 font-black'
                      : 'text-white/75'
                  }`}
                >
                  {isRtl ? 'تومان' : 'IRT'}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleCurrency('usd')}
                  className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                    currencyMode === 'usd'
                      ? 'bg-teal-400 text-slate-950 font-black'
                      : 'text-white/75'
                  }`}
                >
                  USD
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-black text-white cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-teal-300" />
                <span className="tabular-nums">
                  {totalCartCount.toLocaleString(isRtl ? 'fa-IR' : 'en-US')}
                </span>
              </button>

              {/* Floating 3D Emerald Support Bubble (Matches green chat bubble in Permio screenshots) */}
              <button
                type="button"
                data-testid="dashboard-floating-chat-btn"
                onClick={() => setActiveTab('contact')}
                title={
                  isRtl ? 'گفتگو با پشتیبانی مدثر' : 'Chat with MODASR Support'
                }
                className="w-9 h-9 rounded-2xl bg-gradient-to-b from-emerald-400 to-teal-600 text-slate-950 flex items-center justify-center shadow-[0_3px_0_#064e3b,0_0_16px_rgba(16,185,129,0.55)] cursor-pointer active:translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
