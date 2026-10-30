import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Cpu,
  Edit3,
  Eye,
  Filter,
  Gamepad2,
  Layers,
  Lock,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  UserCheck,
  X,
  Zap,
} from 'lucide-react';
import { Language } from '../utils/heroConfig';
import {
  ModasrProduct,
  ProductCategory,
  convertUsdToToman,
  getDicardoCardTitles,
  getProductPurchaseTypes,
} from '../utils/modasrStore';
import {
  GAMING_GENRES,
  GAMING_MAIN_CATEGORIES,
  GAMING_PLATFORMS,
  GamingCatalogItem,
  GamingGenreId,
  GamingMainCategoryId,
  GamingPlatformId,
  GamingSortOption,
  ItemsServicesSubFilter,
  POPULAR_GAMING_SEARCH_CHIPS,
  buildCustomizedGamingCartProduct,
  buildGamingCatalog,
  filterGamingCatalog,
  getGamingCategoryCounts,
  getGamingSearchSuggestions,
  validateTopUpDeliveryFields,
} from '../utils/gamingMarketplace';
import {
  PermioCategoryProductCard,
  renderBrandEmblem,
} from './ProductSplitCard';

export interface GamingMarketplaceProps {
  lang: Language;
  usdtRate: number;
  currencyMode: 'toman' | 'usd';
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onAddToCart: (product: ModasrProduct) => void;
  onShowDetails: (product: ModasrProduct) => void;
  onOpenCart?: () => void;
}

/**
 * Bespoke 3D SVG Artwork for Each of the 4 Main Gaming Categories
 */
function Category3DArtwork({ categoryId }: { categoryId: GamingMainCategoryId }) {
  if (categoryId === 'games') {
    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0 select-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/35 via-red-700/20 to-black border border-rose-400/50 shadow-[0_0_32px_rgba(244,63,94,0.45),inset_0_1px_2px_rgba(255,255,255,0.6)] rotate-3 group-hover:rotate-0 transition-transform duration-300" />
        <svg viewBox="0 0 80 80" className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_6px_14px_rgba(244,63,94,0.6)]" fill="none">
          <defs>
            <linearGradient id="gamePadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          {/* 3D Game Disc Behind Controller */}
          <circle cx="48" cy="28" r="16" fill="#1F060D" stroke="#F43F5E" strokeWidth="2" />
          <circle cx="48" cy="28" r="5" fill="#090306" stroke="#FDA4AF" strokeWidth="1.5" />
          {/* Next-Gen Controller Body */}
          <path
            d="M18 38C18 31 23 26 30 26H46C53 26 58 31 58 38L62 52C63 57 59 62 54 62C50 62 47 59 45 55L43 51H33L31 55C29 59 26 62 22 62C17 62 13 57 14 52L18 38Z"
            fill="url(#gamePadGrad)"
            stroke="#FFF1F2"
            strokeWidth="1.8"
          />
          {/* D-Pad & Action Buttons */}
          <path d="M27 36V44M23 40H31" stroke="#110408" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="48" cy="37" r="2.2" fill="#110408" />
          <circle cx="52" cy="41" r="2.2" fill="#110408" />
          <circle cx="44" cy="41" r="2.2" fill="#110408" />
          <circle cx="48" cy="45" r="2.2" fill="#110408" />
        </svg>
      </div>
    );
  }

  if (categoryId === 'topups') {
    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0 select-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/35 via-rose-600/25 to-black border border-amber-400/55 shadow-[0_0_32px_rgba(245,158,11,0.45),inset_0_1px_2px_rgba(255,255,255,0.65)] -rotate-3 group-hover:rotate-0 transition-transform duration-300" />
        <svg viewBox="0 0 80 80" className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_6px_14px_rgba(245,158,11,0.65)]" fill="none">
          <defs>
            <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="gemCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
          </defs>
          {/* Faceted Gem Crystal */}
          <polygon points="48,12 64,24 58,46 38,46 32,24" fill="url(#gemCrimson)" stroke="#FFE4E6" strokeWidth="1.6" />
          {/* 3D Gold CP/UC Coin Foreground */}
          <circle cx="32" cy="48" r="18" fill="url(#coinGold)" stroke="#FEF9C3" strokeWidth="2.2" />
          <circle cx="32" cy="48" r="13.5" stroke="#78350F" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="32" y="53" textAnchor="middle" fill="#1C1003" fontSize="13" fontWeight="900" fontFamily="sans-serif">
            CP
          </text>
        </svg>
      </div>
    );
  }

  if (categoryId === 'accounts') {
    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0 select-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/35 via-emerald-600/20 to-black border border-rose-400/50 shadow-[0_0_32px_rgba(225,29,72,0.45),inset_0_1px_2px_rgba(255,255,255,0.6)] rotate-2 group-hover:rotate-0 transition-transform duration-300" />
        <svg viewBox="0 0 80 80" className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_6px_14px_rgba(225,29,72,0.6)]" fill="none">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#4C0519" />
            </linearGradient>
          </defs>
          <path
            d="M40 12L62 21V39C62 53.5 52.6 65.4 40 70C27.4 65.4 18 53.5 18 39V21L40 12Z"
            fill="url(#shieldGrad)"
            stroke="#FECDD3"
            strokeWidth="2"
          />
          <circle cx="40" cy="36" r="7" fill="#FFF1F2" />
          <path d="M29 53C29 47.5 33.9 44 40 44C46.1 44 51 47.5 51 53" stroke="#FFF1F2" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="55" cy="23" r="7" fill="#10B981" stroke="#ECFDF5" strokeWidth="1.5" />
          <path d="M52 23L54.2 25.2L58.5 21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0 select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/35 via-purple-700/25 to-black border border-red-400/50 shadow-[0_0_32px_rgba(239,68,68,0.45),inset_0_1px_2px_rgba(255,255,255,0.6)] -rotate-2 group-hover:rotate-0 transition-transform duration-300" />
      <svg viewBox="0 0 80 80" className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_6px_14px_rgba(239,68,68,0.6)]" fill="none">
        <defs>
          <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
        {/* Battle Pass Winged Star Crest */}
        <polygon
          points="40,12 47,27 64,29 51,41 54,58 40,49 26,58 29,41 16,29 33,27"
          fill="url(#crestGrad)"
          stroke="#FEE2E2"
          strokeWidth="2"
        />
        <circle cx="40" cy="37" r="7" fill="#FEF08A" />
        <path d="M38 33L43 37L38 41V33Z" fill="#7F1D1D" />
      </svg>
    </div>
  );
}

export function GamingMarketplace({
  lang,
  usdtRate,
  currencyMode,
  onAddToCart,
  onShowDetails,
  onOpenCart,
}: GamingMarketplaceProps) {
  const isRtl = lang === 'fa';

  // Catalog state (supports store owner / admin creating, editing, and toggling active status)
  const [catalog, setCatalog] = useState<GamingCatalogItem[]>(() =>
    buildGamingCatalog()
  );

  // Primary View Navigation: 'landing' or one of the 4 dedicated category destinations
  const [activeView, setActiveView] = useState<'landing' | GamingMainCategoryId>(
    'landing'
  );

  // Smart Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Secondary Filters (Optional — never forced before browsing)
  const [platformFilter, setPlatformFilter] = useState<GamingPlatformId>('all');
  const [genreFilter, setGenreFilter] = useState<GamingGenreId>('all');
  const [itemsSubFilter, setItemsSubFilter] =
    useState<ItemsServicesSubFilter>('all');
  const [accountGameFilter, setAccountGameFilter] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<GamingSortOption>('popular');

  // Category B (Game Top-Ups) Dedicated Multi-Step Flow State
  const [selectedTopUpItemId, setSelectedTopUpItemId] =
    useState<string>('codm-cp-880');
  const [selectedTopUpTypeId, setSelectedTopUpTypeId] = useState<string>('');
  const [selectedTopUpPkgId, setSelectedTopUpPkgId] = useState<string>('');
  const [topUpFieldValues, setTopUpFieldValues] = useState<
    Record<string, string>
  >({
    player_uid: '',
    player_tag: '',
    zone_id: '',
    server_region: 'ایران (Iran Region)',
    account_email: '',
  });
  const [topUpValidationError, setTopUpValidationError] = useState<
    string | null
  >(null);
  const topUpFlowRef = useRef<HTMLDivElement | null>(null);

  // Category C (Gaming Accounts) Inspection Modal State
  const [inspectedAccountItem, setInspectedAccountItem] =
    useState<GamingCatalogItem | null>(null);
  const [selectedAccountPkgIdx, setSelectedAccountPkgIdx] = useState<number>(0);
  const [accountPolicyAccepted, setAccountPolicyAccepted] =
    useState<boolean>(true);
  const [accountTargetConsole, setAccountTargetConsole] =
    useState<string>('PS5 — ظرفیت ۲ پرایمری');

  const categoryCounts = useMemo(
    () => getGamingCategoryCounts(catalog),
    [catalog]
  );

  const searchSuggestions = useMemo(
    () => getGamingSearchSuggestions(catalog, searchQuery, usdtRate, 6),
    [catalog, searchQuery, usdtRate]
  );

  // Sync Top-Up selected game packages whenever selectedTopUpItemId changes
  const selectedTopUpItem = useMemo(
    () =>
      catalog.find((i) => i.id === selectedTopUpItemId) ||
      catalog.find((i) => i.mainCategory === 'topups') ||
      catalog[0],
    [catalog, selectedTopUpItemId]
  );

  const topUpPurchaseTypes = useMemo(
    () =>
      selectedTopUpItem
        ? getProductPurchaseTypes(selectedTopUpItem.product, usdtRate)
        : [],
    [selectedTopUpItem, usdtRate]
  );

  useEffect(() => {
    const firstType = topUpPurchaseTypes[0];
    if (firstType) {
      setSelectedTopUpTypeId(firstType.id);
      if (firstType.packages[0]) {
        setSelectedTopUpPkgId(firstType.packages[0].id);
      }
    }
    setTopUpValidationError(null);
  }, [selectedTopUpItemId, topUpPurchaseTypes]);

  const activeTopUpType = useMemo(
    () =>
      topUpPurchaseTypes.find((t) => t.id === selectedTopUpTypeId) ||
      topUpPurchaseTypes[0],
    [topUpPurchaseTypes, selectedTopUpTypeId]
  );

  const activeTopUpPkg = useMemo(() => {
    for (const pt of topUpPurchaseTypes) {
      const found = pt.packages.find((p) => p.id === selectedTopUpPkgId);
      if (found) return found;
    }
    return activeTopUpType?.packages[0];
  }, [topUpPurchaseTypes, selectedTopUpPkgId, activeTopUpType]);

  // Filtered lists for each view
  const filteredGames = useMemo(
    () =>
      filterGamingCatalog(catalog, {
        category: 'games',
        platform: platformFilter,
        genre: genreFilter,
        onlyInStock,
        sortBy,
        searchQuery,
      }),
    [catalog, platformFilter, genreFilter, onlyInStock, sortBy, searchQuery]
  );

  const filteredTopUps = useMemo(
    () =>
      filterGamingCatalog(catalog, {
        category: 'topups',
        platform: platformFilter,
        onlyInStock,
        sortBy,
        searchQuery,
      }),
    [catalog, platformFilter, onlyInStock, sortBy, searchQuery]
  );

  const filteredAccounts = useMemo(
    () =>
      filterGamingCatalog(catalog, {
        category: 'accounts',
        platform: platformFilter,
        gameFilter: accountGameFilter,
        onlyInStock,
        sortBy,
        searchQuery,
      }),
    [catalog, platformFilter, accountGameFilter, onlyInStock, sortBy, searchQuery]
  );

  const filteredItemsServices = useMemo(
    () =>
      filterGamingCatalog(catalog, {
        category: 'items-services',
        platform: platformFilter,
        itemsSubFilter,
        onlyInStock,
        sortBy,
        searchQuery,
      }),
    [catalog, platformFilter, itemsSubFilter, onlyInStock, sortBy, searchQuery]
  );

  const globalSearchResults = useMemo(
    () =>
      searchQuery.trim()
        ? filterGamingCatalog(catalog, {
            category: 'all',
            platform: platformFilter,
            searchQuery,
          })
        : [],
    [catalog, platformFilter, searchQuery]
  );

  const handleOpenCategory = (catId: GamingMainCategoryId) => {
    setActiveView(catId);
    setPlatformFilter('all');
    setGenreFilter('all');
    setItemsSubFilter('all');
    setAccountGameFilter('all');
  };

  const handleSelectGameForTopUp = (item: GamingCatalogItem) => {
    setSelectedTopUpItemId(item.id);
    setActiveView('topups');
    window.setTimeout(() => {
      topUpFlowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleCompleteTopUpOrder = () => {
    if (!selectedTopUpItem || !activeTopUpPkg) return;
    const check = validateTopUpDeliveryFields(
      selectedTopUpItem.requiredCustomerFields,
      topUpFieldValues
    );
    if (!check.valid) {
      setTopUpValidationError(
        isRtl
          ? `لطفاً فیلد الزامی «${check.missingLabelsFa.join('، ')}» را وارد کنید.`
          : 'Please enter your required Player ID / Tag before continuing.'
      );
      return;
    }
    setTopUpValidationError(null);
    const customizedProduct = buildCustomizedGamingCartProduct(
      selectedTopUpItem,
      activeTopUpPkg,
      topUpFieldValues
    );
    onAddToCart(customizedProduct);
    onOpenCart?.();
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      data-testid="dedicated-gaming-hub"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-16 space-y-8 text-white font-vazir"
    >
      {/* =====================================================================
          1. TOP GAMING MARKETPLACE NAVIGATION BAR (Landing + 4 Categories)
      ====================================================================== */}
      <nav
        aria-label={isRtl ? 'ناوبری بخش گیمینگ' : 'Gaming Marketplace Navigation'}
        data-testid="gaming-marketplace-nav"
        className="sticky top-16 z-30 rounded-2xl bg-[#090306]/70 backdrop-blur-xl border border-rose-500/35 px-3 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.65)] flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
          <button
            type="button"
            data-testid="gaming-nav-landing"
            onClick={() => setActiveView('landing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 border ${
              activeView === 'landing'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-300/70 shadow-[0_0_20px_rgba(225,29,72,0.5)]'
                : 'bg-white/[0.06] text-white/85 border-white/15 hover:bg-white/[0.12] hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{isRtl ? 'ویترین اصلی گیمینگ' : 'Gaming Home'}</span>
          </button>

          {GAMING_MAIN_CATEGORIES.map((cat) => {
            const isActive = activeView === cat.id;
            const count = categoryCounts[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                data-testid={`gaming-nav-${cat.id}`}
                onClick={() => handleOpenCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-300/70 shadow-[0_0_20px_rgba(225,29,72,0.5)]'
                    : 'bg-white/[0.06] text-white/85 border-white/15 hover:bg-white/[0.12] hover:text-white'
                }`}
              >
                <span>{isRtl ? cat.shortTitleFa : cat.shortTitleEn}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-black/50 text-[10px] font-black text-rose-200 tabular-nums">
                  {isRtl ? count.toLocaleString('fa-IR') : count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* =====================================================================
          2. TRANSLUCENT SMART SEARCH & QUICK-LINKS BAR (Preserves Site Background)
      ====================================================================== */}
      <section
        data-testid="gaming-hero-section"
        className="relative rounded-3xl overflow-visible bg-[#0c0307]/60 backdrop-blur-xl border border-rose-500/35 p-4 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
      >
        <div className="relative z-20 space-y-3.5">
          {/* Compact Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
              <h2 className="text-sm sm:text-lg font-black text-white">
                {isRtl
                  ? 'جستجوی هوشمند بازی، شارژ فوری سی‌پی/یوسی و اکانت ظرفیتی'
                  : 'Smart Search Games, Instant UID Top-Ups & Verified Accounts'}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/35 text-rose-200">
                {isRtl ? 'واریز آنی با UID' : 'Instant UID Top-Up'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/35 text-emerald-300">
                {isRtl ? 'ضمانت ضد بن ۱۰۰٪' : '100% Anti-Ban'}
              </span>
            </div>
          </div>

          {/* SMART GAMING SEARCH BAR WITH LIVE SUGGESTIONS */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-rose-400 absolute right-4 pointer-events-none" />
              <input
                type="text"
                data-testid="gaming-smart-search-input"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() =>
                  window.setTimeout(() => setSearchFocused(false), 200)
                }
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isRtl
                    ? 'جستجوی بازی، سی‌پی کالاف، یوسی پابجی، جم کلش، FC 25، اکانت PS5...'
                    : 'Search Call of Duty Mobile CP, PUBG UC, Clash Gems, GTA V PC, PS5 games...'
                }
                aria-label={
                  isRtl
                    ? 'جستجوی هوشمند بازی و محصولات گیمینگ'
                    : 'Smart Search Games and Gaming Products'
                }
                className="w-full rounded-2xl bg-black/65 border-2 border-rose-500/45 focus:border-rose-400 pr-12 pl-24 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white placeholder:text-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.55)] outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  data-testid="gaming-search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-400/35 text-[11px] font-bold text-rose-200 cursor-pointer"
                >
                  {isRtl ? 'پاک کردن' : 'Clear'}
                </button>
              )}
            </div>

            {/* LIVE AUTOCOMPLETE / SMART SUGGESTIONS DROPDOWN */}
            {(searchFocused || searchQuery.trim().length > 0) &&
              searchQuery.trim().length > 0 && (
                <div
                  data-testid="gaming-search-suggestions"
                  className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#0d0409]/98 backdrop-blur-2xl border border-rose-400/50 shadow-[0_24px_60px_rgba(0,0,0,0.95)] p-3 space-y-2 max-h-96 overflow-y-auto"
                >
                  <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold text-rose-300 border-b border-white/10">
                    <span>
                      {isRtl
                        ? `پیشنهادهای زنده جستجو برای «${searchQuery}»`
                        : `Live matches for "${searchQuery}"`}
                    </span>
                    <span>
                      {isRtl
                        ? `${searchSuggestions.length.toLocaleString('fa-IR')} نتیجه`
                        : `${searchSuggestions.length} results`}
                    </span>
                  </div>

                  {searchSuggestions.length === 0 ? (
                    <div
                      data-testid="gaming-search-empty-state"
                      className="p-5 text-center space-y-2"
                    >
                      <div className="text-xs sm:text-sm font-bold text-white/80">
                        {isRtl
                          ? 'محصولی با این عبارت در بخش گیمینگ یافت نشد.'
                          : 'No gaming products matched your search.'}
                      </div>
                      <div className="text-[11px] text-white/55">
                        {isRtl
                          ? 'پیشنهاد: عبارت‌هایی مثل «سی پی کالاف»، «یوسی پابجی»، «FC 25» یا «گیفت کارت استیم» را امتحان کنید.'
                          : 'Try searching for "Call of Duty CP", "PUBG UC", "FC 25", or "Steam".'}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {searchSuggestions.map((sug, idx) => (
                        <button
                          key={sug.id}
                          type="button"
                          data-testid={`gaming-search-suggestion-${idx}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            if (sug.targetCategory === 'topups') {
                              handleSelectGameForTopUp(sug.item);
                            } else if (
                              sug.targetCategory === 'accounts' &&
                              sug.item.accountMeta
                            ) {
                              setInspectedAccountItem(sug.item);
                            } else {
                              onShowDetails(sug.item.product);
                            }
                            setSearchFocused(false);
                          }}
                          className="w-full p-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 flex items-center justify-between gap-3 text-start transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-white/95 flex items-center justify-center shrink-0 scale-90">
                              {renderBrandEmblem(sug.item.product.iconType)}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-black text-white truncate">
                                {isRtl ? sug.titleFa : sug.titleEn}
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                <span className="px-2 py-0.2 rounded-md bg-rose-500/25 border border-rose-400/40 text-[10px] font-bold text-rose-200">
                                  {isRtl
                                    ? sug.categoryBadgeFa
                                    : sug.categoryBadgeEn}
                                </span>
                                <span className="text-[10px] text-white/60 truncate">
                                  {isRtl
                                    ? sug.item.relatedGameFa
                                    : sug.item.relatedGameEn}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-end shrink-0">
                            <div className="text-xs font-black text-emerald-300 tabular-nums">
                              {currencyMode === 'usd'
                                ? `$${sug.priceUsd.toFixed(2)}`
                                : `${sug.startingToman.toLocaleString('fa-IR')} تومان`}
                            </div>
                            <div className="text-[10px] font-bold text-rose-300 mt-0.5">
                              {isRtl ? 'انتخاب سریع ←' : 'Select →'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Popular Games & Current Offers Quick Links */}
          <div
            data-testid="gaming-popular-quicklinks"
            className="flex flex-wrap items-center gap-1.5"
          >
            <span className="text-[11px] font-bold text-rose-300/95 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isRtl ? 'پرفروش‌ترین‌های گیم:' : 'Popular Now:'}</span>
            </span>
            {POPULAR_GAMING_SEARCH_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                data-testid={`gaming-quicklink-${chip.id}`}
                onClick={() => {
                  const targetItem = catalog.find(
                    (i) => i.id === chip.productId
                  );
                  if (targetItem) {
                    if (chip.targetCategory === 'topups') {
                      handleSelectGameForTopUp(targetItem);
                    } else {
                      onShowDetails(targetItem.product);
                    }
                  } else {
                    setSearchQuery(chip.query);
                  }
                }}
                className="px-2.5 py-1 rounded-xl bg-black/45 hover:bg-rose-600/35 border border-rose-400/30 hover:border-rose-300 text-[11px] font-bold text-white/90 hover:text-white transition-all cursor-pointer"
              >
                {isRtl ? chip.labelFa : chip.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2B. LIVE SEARCH RESULTS PANEL (When user types a query in Smart Search)
      ====================================================================== */}
      {searchQuery.trim().length > 0 && (
        <section
          data-testid="gaming-live-search-results"
          className="rounded-3xl bg-[#0e0408]/95 border border-rose-500/40 p-5 sm:p-7 space-y-5 shadow-[0_18px_45px_rgba(0,0,0,0.75)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {isRtl
                  ? `نتایج جستجوی گیمینگ برای «${searchQuery}» (${globalSearchResults.length.toLocaleString('fa-IR')} محصول)`
                  : `Gaming Search Results for "${searchQuery}" (${globalSearchResults.length})`}
              </h2>
              <p className="text-xs text-white/65 mt-0.5">
                {isRtl
                  ? 'روی هر محصول کلیک کنید تا وارد صفحه خرید، شارژ فوری یا انتخاب ظرفیت شوید.'
                  : 'Click any product to open its top-up studio, capacity selector, or package modal.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white border border-rose-400/40 text-xs font-bold cursor-pointer"
            >
              {isRtl ? 'بستن جستجو و نمایش دسته‌ها' : 'Clear Search'}
            </button>
          </div>

          {globalSearchResults.length === 0 ? (
            <div className="rounded-2xl bg-black/45 border border-white/10 p-8 text-center space-y-3">
              <div className="text-base font-black text-white">
                {isRtl
                  ? 'هیچ محصول گیمینگی با این عبارت پیدا نشد.'
                  : 'No matching gaming products found.'}
              </div>
              <p className="text-xs text-white/65">
                {isRtl
                  ? 'نام بازی (مثل Call of Duty، PUBG، Clash، FC 25، GTA V) یا نوع محصول (سی‌پی، یوسی، اکانت ظرفیتی) را جستجو کنید.'
                  : 'Try searching by game title or currency type (CP, UC, Gems, PS5, Steam).'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {globalSearchResults.map((item, idx) => (
                <PermioCategoryProductCard
                  key={`search-res-${item.id}`}
                  product={item.product}
                  cascadeIndex={idx}
                  lang={lang}
                  usdtRate={usdtRate}
                  currencyMode={currencyMode}
                  onAddToCart={onAddToCart}
                  onShowDetails={(prod) => {
                    if (item.mainCategory === 'topups') {
                      handleSelectGameForTopUp(item);
                    } else if (item.mainCategory === 'accounts' && item.accountMeta) {
                      setInspectedAccountItem(item);
                    } else {
                      onShowDetails(prod);
                    }
                  }}
                  testIdPrefix="gaming-search-result-card"
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          3. FOUR MAIN VISUAL CATEGORY CARDS (Primary Storefront Structure)
      ====================================================================== */}
      <section
        aria-label={isRtl ? 'چهار دسته‌بندی اصلی گیمینگ' : 'Four Main Gaming Categories'}
        data-testid="gaming-main-categories-grid"
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <div className="text-xs font-black text-rose-400 uppercase tracking-wider">
              {isRtl ? 'انتخاب بر اساس نیاز شما' : 'BROWSE BY WHAT YOU WANT TO BUY'}
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-0.5">
              {isRtl
                ? '۴ دپارتمان اصلی مارکت‌پلیس گیمینگ'
                : '4 Main Gaming Marketplace Categories'}
            </h2>
          </div>
          {activeView !== 'landing' && (
            <button
              type="button"
              data-testid="back-to-gaming-landing-btn"
              onClick={() => setActiveView('landing')}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/[0.07] hover:bg-rose-600/30 border border-rose-400/40 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isRtl ? (
                <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <ArrowLeft className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>{isRtl ? 'بازگشت به ویترین اصلی گیم' : 'Back to Gaming Storefront'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {GAMING_MAIN_CATEGORIES.map((cat) => {
            const isSelected = activeView === cat.id;
            const count = categoryCounts[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                data-testid={`gaming-cat-card-${cat.id}`}
                onClick={() => handleOpenCategory(cat.id)}
                className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-b ${
                  cat.gradientClass
                } p-5 sm:p-6 text-start flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'border-rose-400 ring-2 ring-rose-500/45 shadow-[0_20px_50px_rgba(225,29,72,0.38)] -translate-y-1'
                    : 'border-rose-500/30 hover:border-rose-400/75 hover:-translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.7)]'
                }`}
              >
                {/* Top Specular Crimson Neon Rim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-rose-400/80 to-transparent"
                />

                {/* Top Row: Category Code Badge + 3D Artwork */}
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-[10px] font-black text-rose-200">
                      <span>{cat.code}</span>
                      <span>·</span>
                      <span>{isRtl ? cat.badgeFa : cat.badgeEn}</span>
                    </span>
                    <div className="text-[11px] font-bold text-emerald-300 tabular-nums">
                      {isRtl
                        ? `${count.toLocaleString('fa-IR')} محصول فعال`
                        : `${count} Active Products`}
                    </div>
                  </div>

                  <Category3DArtwork categoryId={cat.id} />
                </div>

                {/* Middle: Clear Persian Title & Description */}
                <div className="my-4 space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-rose-200 transition-colors leading-snug">
                    {isRtl ? cat.titleFa : cat.titleEn}
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed line-clamp-3">
                    {isRtl ? cat.descriptionFa : cat.descriptionEn}
                  </p>
                </div>

                {/* Bottom CTA Bar */}
                <div className="pt-3 border-t border-white/10 w-full flex items-center justify-between text-xs font-black text-rose-300 group-hover:text-white transition-colors">
                  <span>{isRtl ? cat.ctaFa : cat.ctaEn}</span>
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4 text-rose-400 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. DEDICATED VIEW FOR CATEGORY B: GAME TOP-UPS & VIRTUAL CURRENCY
             (Includes Interactive Game Selector + 4-Step Top-Up Studio)
      ====================================================================== */}
      {activeView === 'topups' && (
        <section
          data-testid="gaming-view-topups"
          className="space-y-8 animate-fade-in"
        >
          {/* Top-Ups Header & Secondary Platform Filter */}
          <div className="rounded-3xl bg-[#120409]/95 border border-rose-500/35 p-5 sm:p-7 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                  {isRtl
                    ? 'دپارتمان B · GAME TOP-UPS & VIRTUAL CURRENCY'
                    : 'CATEGORY B · GAME TOP-UPS & VIRTUAL CURRENCY'}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                  {isRtl
                    ? 'شارژ فوری بازی‌ها و ارز درون‌برنامه‌ای (CP, UC, Gems, Robux)'
                    : 'Instant Game Top-Ups & In-Game Currencies'}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  {isRtl
                    ? 'ابتدا بازی مورد نظر خود را انتخاب کنید، سپس بسته دلخواه را برگزیده و آیدی عددی (UID) خود را بدون نیاز به رمز عبور ثبت نمایید.'
                    : 'Select your game below, pick a currency package, and enter your Player ID (UID)—no account password required.'}
                </p>
              </div>

              {/* Optional Secondary Platform Filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                {GAMING_PLATFORMS.slice(0, 4).map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    data-testid={`topups-platform-filter-${plat.id}`}
                    onClick={() => setPlatformFilter(plat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      platformFilter === plat.id
                        ? 'bg-rose-600 text-white border-rose-300 shadow-[0_0_16px_rgba(225,29,72,0.45)]'
                        : 'bg-white/[0.05] text-white/75 border-white/15 hover:text-white'
                    }`}
                  >
                    {isRtl ? plat.shortFa : plat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1: Select Game Grid */}
            <div className="pt-2">
              <div className="text-xs font-black text-amber-300 mb-3 flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span>
                  {isRtl
                    ? 'گام ۱: بازی مورد نظر خود را برای شارژ انتخاب کنید:'
                    : 'Step 1: Select a game to top up:'}
                </span>
              </div>

              <div
                data-testid="topups-game-selector-grid"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
              >
                {filteredTopUps.map((item) => {
                  const dicardo = getDicardoCardTitles(item.product);
                  const isSelected = selectedTopUpItem?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-testid={`topup-select-game-${item.id}`}
                      onClick={() => handleSelectGameForTopUp(item)}
                      className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-gradient-to-br from-rose-600/35 via-amber-500/20 to-[#0d0408] border-amber-300 ring-2 ring-amber-400/40 shadow-[0_12px_30px_rgba(245,158,11,0.28)]'
                          : 'bg-[#0a0306]/90 hover:bg-[#16050c] border-white/15 hover:border-rose-400/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-11 h-11 rounded-xl bg-white/95 flex items-center justify-center shrink-0 shadow-md">
                          {renderBrandEmblem(item.product.iconType)}
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-black text-amber-300">
                          {isRtl ? item.currencyUnitFa : item.currencyUnitEn}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-white line-clamp-1">
                          {isRtl ? dicardo.titleFa : dicardo.titleEn}
                        </div>
                        <div className="text-[10px] text-white/65 mt-0.5 truncate">
                          {isRtl ? item.relatedGameFa : item.relatedGameEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dedicated 4-Step Game Top-Up Studio */}
          {selectedTopUpItem && (
            <div
              ref={topUpFlowRef}
              data-testid="gaming-topup-flow-panel"
              className="rounded-[30px] bg-gradient-to-b from-[#17050c] via-[#0e0308] to-[#070205] border-2 border-rose-500/45 p-5 sm:p-8 shadow-[0_24px_65px_rgba(0,0,0,0.85)] space-y-6"
            >
              {/* Selected Game Top Banner + No-Password Security Guarantee */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/95 border-2 border-amber-300 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                    {renderBrandEmblem(selectedTopUpItem.product.iconType)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/45 text-[11px] font-black text-emerald-300 inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>
                          {isRtl
                            ? 'بدون نیاز به رمز عبور (ضد بن ۱۰۰٪)'
                            : 'No Password Required (100% Anti-Ban)'}
                        </span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[11px] font-bold text-amber-200">
                        {isRtl
                          ? selectedTopUpItem.product.durationFa
                          : selectedTopUpItem.product.durationEn}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-white mt-1.5">
                      {isRtl
                        ? `شارژ مستقیم ${getDicardoCardTitles(selectedTopUpItem.product).titleFa}`
                        : `Direct Top-Up: ${getDicardoCardTitles(selectedTopUpItem.product).titleEn}`}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  data-testid="topup-open-dicardo-modal-btn"
                  onClick={() => onShowDetails(selectedTopUpItem.product)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-xs font-bold text-white inline-flex items-center gap-2 self-start lg:self-auto cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-rose-400" />
                  <span>
                    {isRtl
                      ? 'مشاهده جزئیات کامل و سوالات متداول'
                      : 'Full Package Specs & FAQ'}
                  </span>
                </button>
              </div>

              {/* Step 2: Select Purchase Type & Package Amount */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">
                      ۲
                    </span>
                    <span>
                      {isRtl
                        ? 'انتخاب نوع بسته و مقدار شارژ:'
                        : 'Step 2: Select Package & Amount:'}
                    </span>
                  </div>

                  {/* Purchase Type Sub-Tabs (e.g. CP / Supply Pass / Offers / Battle Pass) */}
                  {topUpPurchaseTypes.length > 1 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {topUpPurchaseTypes.map((pt) => (
                        <button
                          key={pt.id}
                          type="button"
                          data-testid={`topup-type-tab-${pt.id}`}
                          onClick={() => {
                            setSelectedTopUpTypeId(pt.id);
                            if (pt.packages[0]) {
                              setSelectedTopUpPkgId(pt.packages[0].id);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            activeTopUpType?.id === pt.id
                              ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                              : 'bg-white/[0.06] text-white/80 border-white/15 hover:text-white'
                          }`}
                        >
                          {isRtl ? pt.titleFa : pt.titleEn}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Package Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(activeTopUpType?.packages || []).map((pkg, idx) => {
                    const isPkgSelected = activeTopUpPkg?.id === pkg.id;
                    const pkgToman =
                      pkg.fixedTomanPrice ||
                      convertUsdToToman(pkg.priceUsd, usdtRate);
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        data-testid={`topup-package-option-${idx}`}
                        onClick={() => setSelectedTopUpPkgId(pkg.id)}
                        className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                          isPkgSelected
                            ? 'bg-gradient-to-br from-rose-600/30 via-[#1b0710] to-[#0a0306] border-rose-400 ring-2 ring-rose-500/40 shadow-[0_12px_30px_rgba(244,63,94,0.28)]'
                            : 'bg-[#0b0407]/90 hover:bg-[#14060c] border-white/12 hover:border-rose-400/45'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 w-full">
                          <div>
                            <div className="text-xs sm:text-sm font-black text-white">
                              {isRtl ? pkg.titleFa : pkg.titleEn}
                            </div>
                            <div className="text-[11px] text-white/60 mt-1">
                              {isRtl ? pkg.deliveryTimeFa : pkg.deliveryTimeEn} ·{' '}
                              {isRtl ? pkg.deliveryMethodFa : pkg.deliveryMethodEn}
                            </div>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                              isPkgSelected
                                ? 'bg-rose-500 border-rose-300 text-white'
                                : 'border-white/25 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between w-full">
                          <span className="text-[11px] font-bold text-emerald-300">
                            {isRtl ? 'گارانتی سلامت اکانت' : 'Verified Safe'}
                          </span>
                          <span className="text-sm sm:text-base font-black text-amber-300 tabular-nums">
                            {currencyMode === 'usd'
                              ? `$${pkg.priceUsd.toFixed(2)}`
                              : `${pkgToman.toLocaleString('fa-IR')} تومان`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3 & Step 4: Customer Game Delivery Details + Live Order Review */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                {/* Step 3: Required Customer Delivery Inputs */}
                <div className="lg:col-span-7 rounded-2xl bg-[#0a0306]/95 border border-white/15 p-5 space-y-4">
                  <div className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">
                      ۳
                    </span>
                    <span>
                      {isRtl
                        ? 'اطلاعات تحویل سفارش در بازی:'
                        : 'Step 3: Required Game Delivery Details:'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/35 text-xs text-emerald-200 flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isRtl
                        ? selectedTopUpItem.securityNoticeFa
                        : selectedTopUpItem.securityNoticeEn}
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {selectedTopUpItem.requiredCustomerFields.map((field) => (
                      <div key={field.key} className="space-y-1.5">
                        <label className="block text-xs font-bold text-white/90">
                          {isRtl ? field.labelFa : field.labelEn}{' '}
                          {field.required && (
                            <span className="text-rose-400">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          data-testid={`topup-input-${field.key}`}
                          value={topUpFieldValues[field.key] || ''}
                          onChange={(e) => {
                            setTopUpFieldValues((prev) => ({
                              ...prev,
                              [field.key]: e.target.value,
                            }));
                            if (topUpValidationError) {
                              setTopUpValidationError(null);
                            }
                          }}
                          placeholder={
                            isRtl ? field.placeholderFa : field.placeholderEn
                          }
                          className="w-full rounded-xl bg-[#12060b] border border-rose-500/35 focus:border-rose-400 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 outline-none"
                        />
                        <p className="text-[11px] text-white/55">
                          {isRtl ? field.helperFa : field.helperEn}
                        </p>
                      </div>
                    ))}
                  </div>

                  {topUpValidationError && (
                    <div
                      data-testid="topup-validation-error"
                      className="p-3 rounded-xl bg-rose-950/80 border border-rose-400 text-xs font-bold text-rose-200 flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{topUpValidationError}</span>
                    </div>
                  )}
                </div>

                {/* Step 4: Live Order Review & Checkout Box */}
                <div
                  data-testid="topup-order-review"
                  className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#1f0610] to-[#0c0307] border border-rose-400/45 p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">
                        ۴
                      </span>
                      <span>
                        {isRtl
                          ? 'پیش‌فاکتور و بررسی نهایی سفارش'
                          : 'Step 4: Order Review & Checkout'}
                      </span>
                    </div>

                    <div className="rounded-xl bg-black/55 border border-white/10 p-3.5 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white/65">
                          {isRtl ? 'بازی انتخابی:' : 'Selected Game:'}
                        </span>
                        <span className="font-black text-white">
                          {isRtl
                            ? selectedTopUpItem.relatedGameFa
                            : selectedTopUpItem.relatedGameEn}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white/65">
                          {isRtl ? 'بسته انتخابی:' : 'Selected Package:'}
                        </span>
                        <span className="font-black text-amber-300 text-end">
                          {activeTopUpPkg
                            ? isRtl
                              ? activeTopUpPkg.titleFa
                              : activeTopUpPkg.titleEn
                            : '-'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white/65">
                          {isRtl ? 'مشخصات دریافت‌کننده:' : 'Delivery Target:'}
                        </span>
                        <span
                          data-testid="topup-review-player-id"
                          className="font-mono font-bold text-emerald-300"
                        >
                          {topUpFieldValues.player_uid ||
                            topUpFieldValues.player_tag ||
                            topUpFieldValues.account_email ||
                            (isRtl ? 'در انتظار ورود آیدی...' : 'Awaiting ID...')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                        <span className="text-white/80 font-bold">
                          {isRtl ? 'مبلغ قابل پرداخت:' : 'Total Price:'}
                        </span>
                        <span
                          data-testid="topup-review-price"
                          className="text-base sm:text-lg font-black text-white tabular-nums"
                        >
                          {activeTopUpPkg
                            ? currencyMode === 'usd'
                              ? `$${activeTopUpPkg.priceUsd.toFixed(2)}`
                              : `${(
                                  activeTopUpPkg.fixedTomanPrice ||
                                  convertUsdToToman(
                                    activeTopUpPkg.priceUsd,
                                    usdtRate
                                  )
                                ).toLocaleString('fa-IR')} تومان`
                            : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid="topup-submit-checkout-btn"
                    onClick={handleCompleteTopUpOrder}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(225,29,72,0.5)] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isRtl
                        ? 'تأیید مشخصات و ادامه جهت پرداخت'
                        : 'Confirm Details & Proceed to Checkout'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          5. DEDICATED VIEW FOR CATEGORY C: GAMING ACCOUNTS
             (Filter by Game & Platform, Rank/Level/Capacity, Policy Warning, Details Modal)
      ====================================================================== */}
      {activeView === 'accounts' && (
        <section
          data-testid="gaming-view-accounts"
          className="space-y-6 animate-fade-in"
        >
          {/* Accounts Header + Game & Platform Filters */}
          <div className="rounded-3xl bg-[#120409]/95 border border-rose-500/35 p-5 sm:p-7 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                  {isRtl
                    ? 'دپارتمان C · VERIFIED GAMING & CAPACITY ACCOUNTS'
                    : 'CATEGORY C · VERIFIED GAMING ACCOUNTS'}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                  {isRtl
                    ? 'اکانت‌های گیمینگ و ظرفیتی قانونی (PS5 / PS4 / Xbox / Steam)'
                    : 'Verified Gaming & Console Capacity Accounts'}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  {isRtl
                    ? 'تمامی اکانت‌ها با گیفت‌کارت رسمی خریداری شده، دارای گارانتی مادام‌العمر عدم بن و قابلیت فروش مجدد هستند.'
                    : 'Every account is legally purchased from official stores with a lifetime anti-ban warranty and trade-in support.'}
                </p>
              </div>

              {/* Filter by Platform */}
              <div className="flex flex-wrap items-center gap-1.5">
                {GAMING_PLATFORMS.filter((p) => p.id !== 'switch').map(
                  (plat) => (
                    <button
                      key={plat.id}
                      type="button"
                      data-testid={`accounts-platform-filter-${plat.id}`}
                      onClick={() => setPlatformFilter(plat.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        platformFilter === plat.id
                          ? 'bg-rose-600 text-white border-rose-300 shadow-[0_0_16px_rgba(225,29,72,0.45)]'
                          : 'bg-white/[0.05] text-white/75 border-white/15 hover:text-white'
                      }`}
                    >
                      {isRtl ? plat.shortFa : plat.labelEn}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Filter by Game Title Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-rose-300">
                {isRtl ? 'فیلتر بر اساس بازی:' : 'Filter by Game:'}
              </span>
              {[
                { id: 'all', fa: 'همه بازی‌ها', en: 'All Games' },
                { id: 'fc 25', fa: 'EA Sports FC 25', en: 'EA Sports FC 25' },
                { id: 'black ops 6', fa: 'Call of Duty: Black Ops 6', en: 'Black Ops 6' },
                { id: 'gta', fa: 'GTA V & Red Dead 2', en: 'GTA V & RDR 2' },
                { id: 'spider-man', fa: 'Spider-Man 2 & God of War', en: 'PS5 Exclusives' },
                { id: 'wukong', fa: 'Black Myth: Wukong & Elden Ring', en: 'Wukong & Elden Ring' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  data-testid={`accounts-game-filter-${g.id.replace(/\s+/g, '-')}`}
                  onClick={() => setAccountGameFilter(g.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    accountGameFilter === g.id
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                      : 'bg-white/[0.05] text-white/75 border-white/15 hover:text-white'
                  }`}
                >
                  {isRtl ? g.fa : g.en}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Account Cards List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredAccounts.map((item) => {
              const meta = item.accountMeta;
              const tomanPrice = convertUsdToToman(item.product.priceUsd, usdtRate);
              return (
                <div
                  key={item.id}
                  data-testid={`gaming-account-card-${item.id}`}
                  className="rounded-[28px] bg-gradient-to-b from-[#17050b]/95 to-[#090205]/98 border border-rose-500/35 hover:border-rose-400/70 p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_18px_45px_rgba(0,0,0,0.75)] transition-all"
                >
                  <div className="space-y-4">
                    {/* Top Row: Game Emblem + Title + Stock Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-white/95 flex items-center justify-center shrink-0 shadow-md">
                          {renderBrandEmblem(item.product.iconType)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-black text-emerald-300">
                              {isRtl ? 'موجود · تحویل فوری' : 'In Stock · Instant'}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-400/40 text-[10px] font-bold text-rose-200">
                              {item.product.platformBrand}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-white mt-1">
                            {isRtl ? item.product.titleFa : item.product.titleEn}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Account Level / Rank / Capacity Tier Box */}
                    {meta && (
                      <div className="p-3 rounded-2xl bg-black/55 border border-white/10 space-y-2">
                        <div className="text-xs font-black text-amber-300">
                          {isRtl ? meta.levelOrRankFa : meta.levelOrRankEn}
                        </div>
                        <p className="text-[11px] text-white/75 leading-relaxed">
                          {isRtl ? meta.capacitySummaryFa : meta.capacitySummaryEn}
                        </p>
                      </div>
                    )}

                    {/* Visual Screenshots / Preview Cards */}
                    {meta && (
                      <div className="grid grid-cols-3 gap-2">
                        {meta.screenshots.map((shot) => (
                          <div
                            key={shot.id}
                            className={`rounded-xl bg-gradient-to-br ${shot.gradient} border border-white/15 p-2.5 flex flex-col justify-between h-20`}
                          >
                            <span className="text-[8px] font-black uppercase tracking-wider text-rose-200 bg-black/50 px-1.5 py-0.5 rounded self-start">
                              {shot.badge}
                            </span>
                            <span className="text-[10px] font-bold text-white leading-tight line-clamp-2">
                              {isRtl ? shot.titleFa : shot.titleEn}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key Highlights */}
                    {meta && (
                      <ul className="space-y-1.5 text-xs text-white/85">
                        {meta.highlightsFa.slice(0, 3).map((hl, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{isRtl ? hl : meta.highlightsEn[idx]}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Publisher & Transfer Policy Warning */}
                    {meta && (
                      <div className="p-3 rounded-xl bg-amber-950/35 border border-amber-500/35 text-[11px] text-amber-200/95 flex items-start gap-2 leading-relaxed">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          {isRtl ? meta.policyWarningFa : meta.policyWarningEn}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer: Price + Open Account Inspection Modal / Buy */}
                  <div className="pt-4 border-t border-white/12 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/60">
                        {isRtl ? 'شروع قیمت ظرفیت‌ها از:' : 'Starting From:'}
                      </div>
                      <div className="text-lg sm:text-xl font-black text-emerald-300 tabular-nums">
                        {currencyMode === 'usd'
                          ? `$${item.product.priceUsd.toFixed(2)}`
                          : `${tomanPrice.toLocaleString('fa-IR')} تومان`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-testid={`account-inspect-btn-${item.id}`}
                        onClick={() => {
                          setInspectedAccountItem(item);
                          setSelectedAccountPkgIdx(0);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-black inline-flex items-center gap-1.5 shadow-[0_8px_22px_rgba(225,29,72,0.45)] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>
                          {isRtl
                            ? 'انتخاب ظرفیت و خرید اکانت'
                            : 'Inspect & Buy Account'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          6. DEDICATED VIEW FOR CATEGORY A: GAMES
             (Browse All Games Immediately + Optional Secondary Platform/Genre/Price Filters)
      ====================================================================== */}
      {activeView === 'games' && (
        <section
          data-testid="gaming-view-games"
          className="space-y-6 animate-fade-in"
        >
          <div className="rounded-3xl bg-[#120409]/95 border border-rose-500/35 p-5 sm:p-7 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                  {isRtl
                    ? 'دپارتمان A · ORIGINAL GAMES CATALOG'
                    : 'CATEGORY A · ORIGINAL GAMES CATALOG'}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                  {isRtl
                    ? 'بازی‌های اورجینال کنسول، ویندوز (PC)، نینتندو و موبایل'
                    : 'Original Games for Console, Windows PC, Switch & Mobile'}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  {isRtl
                    ? 'تمام بازی‌ها بدون اجبار به انتخاب پلتفرم در دسترس هستند؛ در صورت تمایل از فیلترهای کمکی زیر استفاده کنید.'
                    : 'All games are immediately browsable below. Use the optional platform, genre, or price filters anytime.'}
                </p>
              </div>

              {/* Sort & Stock Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  data-testid="games-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as GamingSortOption)}
                  aria-label={isRtl ? 'مرتب‌سازی قیمت' : 'Sort games'}
                  className="rounded-xl bg-[#090306] border border-rose-500/40 px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer"
                >
                  <option value="popular">
                    {isRtl ? 'مرتب‌سازی: محبوب‌ترین' : 'Sort: Most Popular'}
                  </option>
                  <option value="price-asc">
                    {isRtl ? 'قیمت: ارزان‌ترین به گران‌ترین' : 'Price: Low to High'}
                  </option>
                  <option value="price-desc">
                    {isRtl ? 'قیمت: گران‌ترین به ارزان‌ترین' : 'Price: High to Low'}
                  </option>
                </select>

                <button
                  type="button"
                  data-testid="games-instock-toggle"
                  onClick={() => setOnlyInStock((prev) => !prev)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    onlyInStock
                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                      : 'bg-white/[0.05] border-white/15 text-white/75'
                  }`}
                >
                  {isRtl ? 'فقط موجود و تحویل فوری' : 'In-Stock Only'}
                </button>
              </div>
            </div>

            {/* Optional Secondary Platform Filters (Mobile, Windows / PC, PlayStation, Xbox, Nintendo Switch, All) */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>{isRtl ? 'فیلتر اختیاری پلتفرم:' : 'Optional Platform:'}</span>
              </span>
              {GAMING_PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  type="button"
                  data-testid={`games-platform-filter-${plat.id}`}
                  onClick={() => setPlatformFilter(plat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    platformFilter === plat.id
                      ? 'bg-rose-600 text-white border-rose-300 shadow-[0_0_16px_rgba(225,29,72,0.45)]'
                      : 'bg-white/[0.05] text-white/75 border-white/15 hover:text-white'
                  }`}
                >
                  {isRtl ? plat.labelFa : plat.labelEn}
                </button>
              ))}
            </div>

            {/* Optional Genre Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-amber-300">
                {isRtl ? 'سبک بازی:' : 'Genre:'}
              </span>
              {GAMING_GENRES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  data-testid={`games-genre-filter-${g.id}`}
                  onClick={() => setGenreFilter(g.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    genreFilter === g.id
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                      : 'bg-white/[0.04] text-white/75 border-white/10 hover:text-white'
                  }`}
                >
                  {isRtl ? g.labelFa : g.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Games Grid */}
          <div
            data-testid="gaming-games-grid"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
          >
            {filteredGames.map((item, idx) => (
              <PermioCategoryProductCard
                key={`game-cat-${item.id}`}
                product={item.product}
                cascadeIndex={idx}
                lang={lang}
                usdtRate={usdtRate}
                currencyMode={currencyMode}
                onAddToCart={onAddToCart}
                onShowDetails={onShowDetails}
                testIdPrefix="gaming-game-card"
              />
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          7. DEDICATED VIEW FOR CATEGORY D: IN-GAME ITEMS & GAMING SERVICES
      ====================================================================== */}
      {activeView === 'items-services' && (
        <section
          data-testid="gaming-view-items-services"
          className="space-y-6 animate-fade-in"
        >
          <div className="rounded-3xl bg-[#120409]/95 border border-rose-500/35 p-5 sm:p-7 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                  {isRtl
                    ? 'دپارتمان D · IN-GAME ITEMS, SUBSCRIPTIONS & GAMING SERVICES'
                    : 'CATEGORY D · IN-GAME ITEMS & GAMING SERVICES'}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                  {isRtl
                    ? 'آیتم‌های درون‌بازی، بتل‌پس، اشتراک‌ها، کاهش پینگ و دیوایس گیم'
                    : 'Battle Passes, Gaming Subscriptions, Ping Reducers & Controllers'}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  {isRtl
                    ? 'تفکیک شفاف بتل‌پس و اسکین‌ها، اشتراک‌های پلاس و گیم‌پس، سرویس‌های DNS/ExitLag و دسته‌های بازی اورجینال.'
                    : 'Clearly organized battle passes, console subscriptions, low-ping routing services, and official controllers.'}
                </p>
              </div>
            </div>

            {/* Subcategory Filter Pills for Category D */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              {(
                [
                  { id: 'all', fa: 'همه آیتم‌ها و خدمات', en: 'All Items & Services' },
                  {
                    id: 'battlepass-skin',
                    fa: 'بتل‌پس، رویال‌پس و اسکین‌ها',
                    en: 'Battle Passes & Skins',
                  },
                  {
                    id: 'gaming-subscription',
                    fa: 'اشتراک PS Plus و Game Pass',
                    en: 'PS Plus & Game Pass',
                  },
                  {
                    id: 'gift-card',
                    fa: 'گیفت‌کارت‌های استیم، PSN و کنسول',
                    en: 'Steam, PSN & Store Cards',
                  },
                  {
                    id: 'ping-dns',
                    fa: 'کاهش پینگ، ExitLag و DNS گیمینگ',
                    en: 'ExitLag & Gaming DNS',
                  },
                  {
                    id: 'controller-hardware',
                    fa: 'دسته‌های بازی و کنسول‌ها',
                    en: 'Controllers & Consoles',
                  },
                ] as Array<{ id: ItemsServicesSubFilter; fa: string; en: string }>
              ).map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  data-testid={`items-subfilter-${sub.id}`}
                  onClick={() => setItemsSubFilter(sub.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    itemsSubFilter === sub.id
                      ? 'bg-rose-600 text-white border-rose-300 shadow-[0_0_16px_rgba(225,29,72,0.45)]'
                      : 'bg-white/[0.05] text-white/75 border-white/15 hover:text-white'
                  }`}
                >
                  {isRtl ? sub.fa : sub.en}
                </button>
              ))}
            </div>
          </div>

          <div
            data-testid="gaming-items-services-grid"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
          >
            {filteredItemsServices.map((item, idx) => (
              <PermioCategoryProductCard
                key={`items-srv-${item.id}`}
                product={item.product}
                cascadeIndex={idx}
                lang={lang}
                usdtRate={usdtRate}
                currencyMode={currencyMode}
                onAddToCart={onAddToCart}
                onShowDetails={onShowDetails}
                testIdPrefix="gaming-item-service-card"
              />
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          8. LANDING PAGE CURATED SHOWCASE SHELVES (When activeView === 'landing')
      ====================================================================== */}
      {activeView === 'landing' && (
        <div data-testid="gaming-landing-shelves" className="space-y-8">
          {/* Quick Top-Up Spotlight Bar on Landing Page */}
          <section
            data-testid="gaming-landing-topup-spotlight"
            className="rounded-3xl bg-gradient-to-r from-[#240610]/95 via-[#130308]/95 to-[#090205]/98 border border-rose-500/35 p-5 sm:p-7 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-red-700 flex items-center justify-center text-slate-950 shadow-lg shrink-0">
                  <Zap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    {isRtl
                      ? 'شارژ سریع بازی و ارز درون‌برنامه‌ای (تحویل آنی با آیدی)'
                      : 'Quick Game Top-Ups & Virtual Currency (Instant UID)'}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    {isRtl
                      ? 'روی بازی دلخواه بزنید تا مستقیماً وارد مراحل انتخاب بسته و ثبت آیدی شوید.'
                      : 'Select any game below to open its dedicated top-up package & Player ID flow.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                data-testid="landing-open-topups-btn"
                onClick={() => handleOpenCategory('topups')}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-400/40 text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{isRtl ? 'ورود به بخش شارژ بازی‌ها' : 'Open Top-Ups Hub'}</span>
                {isRtl ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredTopUps.slice(0, 4).map((item, idx) => (
                <PermioCategoryProductCard
                  key={`landing-topup-${item.id}`}
                  product={item.product}
                  cascadeIndex={idx}
                  lang={lang}
                  usdtRate={usdtRate}
                  currencyMode={currencyMode}
                  onAddToCart={onAddToCart}
                  onShowDetails={() => handleSelectGameForTopUp(item)}
                  testIdPrefix="landing-topup-card"
                />
              ))}
            </div>
          </section>

          {/* Featured Gaming Accounts & Capacity Shelf on Landing Page */}
          <section
            data-testid="gaming-landing-accounts-spotlight"
            className="rounded-3xl bg-[#0e0408]/95 border border-rose-500/30 p-5 sm:p-7 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-red-600 to-rose-900 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    {isRtl
                      ? 'اکانت‌های گیمینگ و ظرفیتی قانونی (PS5 / PS4 / Xbox / Steam)'
                      : 'Verified Gaming & Console Capacity Accounts'}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    {isRtl
                      ? 'ظرفیت ۲ پرایمری، ظرفیت ۳ سوییچ و ظرفیت ۱ آفلاین با گارانتی مادام‌العمر و قابلیت فروش مجدد'
                      : 'Capacity 1, 2 Primary & 3 Switch accounts with lifetime warranty and resale option'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                data-testid="landing-open-accounts-btn"
                onClick={() => handleOpenCategory('accounts')}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-400/40 text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{isRtl ? 'مشاهده همه اکانت‌های گیمینگ' : 'Browse All Accounts'}</span>
                {isRtl ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredAccounts.slice(0, 4).map((item, idx) => (
                <PermioCategoryProductCard
                  key={`landing-acc-${item.id}`}
                  product={item.product}
                  cascadeIndex={idx}
                  lang={lang}
                  usdtRate={usdtRate}
                  currencyMode={currencyMode}
                  onAddToCart={onAddToCart}
                  onShowDetails={() => {
                    setInspectedAccountItem(item);
                    setSelectedAccountPkgIdx(0);
                  }}
                  testIdPrefix="landing-account-card"
                />
              ))}
            </div>
          </section>

          {/* Featured In-Game Items, Subscriptions & Gaming Hardware Shelf */}
          <section
            data-testid="gaming-landing-items-spotlight"
            className="rounded-3xl bg-[#0e0408]/95 border border-rose-500/30 p-5 sm:p-7 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 via-rose-600 to-purple-800 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    {isRtl
                      ? 'آیتم‌های درون‌بازی، اشتراک پلاس/گیم‌پس و دیوایس گیمینگ'
                      : 'In-Game Items, Subscriptions & Pro Gaming Hardware'}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    {isRtl
                      ? 'اشتراک PS Plus و Game Pass، سرویس کاهش پینگ ExitLag، گیفت‌کارت استیم و دسته‌های بازی اورجینال'
                      : 'PS Plus, Xbox Game Pass, ExitLag/DNS, Steam Wallet cards, and original controllers'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                data-testid="landing-open-items-btn"
                onClick={() => handleOpenCategory('items-services')}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-400/40 text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{isRtl ? 'مشاهده همه آیتم‌ها و خدمات' : 'View All Items & Services'}</span>
                {isRtl ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredItemsServices.slice(0, 4).map((item, idx) => (
                <PermioCategoryProductCard
                  key={`landing-items-${item.id}`}
                  product={item.product}
                  cascadeIndex={idx}
                  lang={lang}
                  usdtRate={usdtRate}
                  currencyMode={currencyMode}
                  onAddToCart={onAddToCart}
                  onShowDetails={onShowDetails}
                  testIdPrefix="landing-items-card"
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* =====================================================================
          9. GAMING ACCOUNT INSPECTION & PURCHASE MODAL (Journey B)
      ====================================================================== */}
      {inspectedAccountItem && inspectedAccountItem.accountMeta && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          data-testid="gaming-account-detail-modal"
          onClick={() => setInspectedAccountItem(null)}
          className="fixed inset-0 z-[85] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 pb-20 sm:pb-24 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[82vh] rounded-[28px] sm:rounded-[30px] bg-[#0c0307] border border-rose-500/45 shadow-[0_28px_85px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-white font-vazir"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#14040a] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-1 rounded-xl bg-rose-500/20 border border-rose-400/40 text-[11px] font-black text-rose-300">
                  {isRtl ? 'اکانت گیمینگ وریفای‌شده' : 'Verified Gaming Account'}
                </span>
                <h3 className="text-sm sm:text-base font-black text-white truncate">
                  {isRtl
                    ? inspectedAccountItem.product.titleFa
                    : inspectedAccountItem.product.titleEn}
                </h3>
              </div>
              <button
                type="button"
                data-testid="close-account-modal-btn"
                onClick={() => setInspectedAccountItem(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-rose-500/30 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Game & Account Level Summary */}
              <div className="rounded-2xl bg-[#16060d] border border-white/12 p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/95 flex items-center justify-center shrink-0">
                  {renderBrandEmblem(inspectedAccountItem.product.iconType)}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-300">
                    {isRtl
                      ? inspectedAccountItem.accountMeta.levelOrRankFa
                      : inspectedAccountItem.accountMeta.levelOrRankEn}
                  </div>
                  <div className="text-xs text-white/80 leading-relaxed">
                    {isRtl
                      ? inspectedAccountItem.accountMeta.deliveryConditionsFa
                      : inspectedAccountItem.accountMeta.deliveryConditionsEn}
                  </div>
                </div>
              </div>

              {/* Select Capacity / Edition Package */}
              <div className="space-y-2.5">
                <label className="block text-xs sm:text-sm font-black text-white">
                  {isRtl
                    ? '۱. ظرفیت و پلتفرم اکانت مورد نظر خود را انتخاب کنید:'
                    : '1. Select Account Capacity & Platform Tier:'}
                </label>
                {(() => {
                  const pTypes = getProductPurchaseTypes(
                    inspectedAccountItem.product,
                    usdtRate
                  );
                  const allAccountPkgs = pTypes.flatMap((t) => t.packages);
                  return (
                    <div className="space-y-2">
                      {allAccountPkgs.slice(0, 4).map((pkg, idx) => {
                        const isSel = selectedAccountPkgIdx === idx;
                        const pkgToman = convertUsdToToman(
                          pkg.priceUsd,
                          usdtRate
                        );
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            data-testid={`account-modal-pkg-${idx}`}
                            onClick={() => {
                              setSelectedAccountPkgIdx(idx);
                              setAccountTargetConsole(pkg.titleFa);
                            }}
                            className={`w-full p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSel
                                ? 'bg-rose-600/25 border-rose-400 ring-1 ring-rose-400'
                                : 'bg-black/45 border-white/12 hover:border-white/30'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-xs sm:text-sm font-black text-white">
                                {isRtl ? pkg.titleFa : pkg.titleEn}
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                {isRtl ? pkg.warrantyFa : pkg.warrantyEn} ·{' '}
                                {isRtl ? pkg.deliveryTimeFa : pkg.deliveryTimeEn}
                              </div>
                            </div>
                            <div className="text-end shrink-0">
                              <div className="text-sm font-black text-emerald-300 tabular-nums">
                                {currencyMode === 'usd'
                                  ? `$${pkg.priceUsd.toFixed(2)}`
                                  : `${pkgToman.toLocaleString('fa-IR')} تومان`}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Publisher Policy Warning & Acknowledgment */}
              <div className="rounded-2xl bg-amber-950/40 border border-amber-500/45 p-4 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-amber-200 leading-relaxed">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-amber-300 mb-1">
                      {isRtl
                        ? 'شرایط تحویل و قوانین ناشر (گارانتی مادام‌العمر):'
                        : 'Delivery Conditions & Publisher Policy:'}
                    </div>
                    {isRtl
                      ? inspectedAccountItem.accountMeta.policyWarningFa
                      : inspectedAccountItem.accountMeta.policyWarningEn}
                  </div>
                </div>

                <label className="flex items-center gap-2.5 text-xs font-bold text-white cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    data-testid="account-policy-checkbox"
                    checked={accountPolicyAccepted}
                    onChange={(e) => setAccountPolicyAccepted(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                  <span>
                    {isRtl
                      ? 'شرایط استفاده از اکانت ظرفیتی و قوانین گارانتی را مطالعه کرده و می‌پذیرم.'
                      : 'I have read and accept the account transfer and capacity usage terms.'}
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 bg-[#14040a] border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const prod = inspectedAccountItem.product;
                  setInspectedAccountItem(null);
                  onShowDetails(prod);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white cursor-pointer"
              >
                {isRtl ? 'مشاهده در پنل کامل دیکاردو' : 'Full Dicardo View'}
              </button>

              <button
                type="button"
                data-testid="account-modal-confirm-buy-btn"
                disabled={!accountPolicyAccepted}
                onClick={() => {
                  const pTypes = getProductPurchaseTypes(
                    inspectedAccountItem.product,
                    usdtRate
                  );
                  const allPkgs = pTypes.flatMap((t) => t.packages);
                  const chosenPkg =
                    allPkgs[selectedAccountPkgIdx] || allPkgs[0];
                  if (chosenPkg) {
                    const cartProd = buildCustomizedGamingCartProduct(
                      inspectedAccountItem,
                      chosenPkg,
                      { console_type: accountTargetConsole }
                    );
                    onAddToCart(cartProd);
                  } else {
                    onAddToCart(inspectedAccountItem.product);
                  }
                  setInspectedAccountItem(null);
                  onOpenCart?.();
                }}
                className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer ${
                  accountPolicyAccepted
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-[0_10px_25px_rgba(225,29,72,0.5)]'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isRtl
                    ? 'افزودن اکانت به سبد و خرید'
                    : 'Add Account to Cart'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
