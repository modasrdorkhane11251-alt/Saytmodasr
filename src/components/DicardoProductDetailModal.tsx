import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Crown,
  Info,
  LayoutGrid,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  UserCheck,
  X,
  Zap,
} from 'lucide-react';
import {
  ModasrProduct,
  ProductPackageOption,
  convertUsdToToman,
  createPackageCartProduct,
  filterProductPackages,
  getDicardoCardTitles,
  getProductCapabilities,
  getProductFaqs,
  getProductPurchaseTypes,
} from '../utils/modasrStore';
import { Language } from '../utils/heroConfig';
import { renderBrandEmblem } from './ProductSplitCard';

export interface DicardoProductDetailModalProps {
  product: ModasrProduct;
  usdtRate: number;
  lang: Language;
  showUsd?: boolean;
  initialPackageIdx?: number;
  onClose: () => void;
  onAddToCart: (customizedProduct: ModasrProduct) => void;
  onOpenCart?: () => void;
}

const PACKAGE_THEME_STYLES: Record<
  ProductPackageOption['colorTheme'],
  {
    cardBorder: string;
    selectedBorder: string;
    headerGradient: string;
    priceColor: string;
    iconColor: string;
    checkBg: string;
    glowShadow: string;
  }
> = {
  purple: {
    cardBorder: 'border-violet-500/35 hover:border-violet-400/70',
    selectedBorder:
      'border-[#8B5CF6] ring-2 ring-[#8B5CF6]/45 shadow-[0_14px_38px_rgba(139,92,246,0.28)]',
    headerGradient:
      'linear-gradient(135deg, rgba(139, 92, 246, 0.24) 0%, rgba(124, 58, 237, 0.06) 65%, transparent 100%)',
    priceColor: 'text-violet-300',
    iconColor: 'text-violet-400',
    checkBg: 'bg-[#8B5CF6]',
    glowShadow: 'rgba(139, 92, 246, 0.35)',
  },
  blue: {
    cardBorder: 'border-sky-500/35 hover:border-sky-400/70',
    selectedBorder:
      'border-sky-400 ring-2 ring-sky-400/45 shadow-[0_14px_38px_rgba(56,189,248,0.26)]',
    headerGradient:
      'linear-gradient(135deg, rgba(56, 189, 248, 0.24) 0%, rgba(14, 165, 233, 0.06) 65%, transparent 100%)',
    priceColor: 'text-sky-300',
    iconColor: 'text-sky-400',
    checkBg: 'bg-sky-500',
    glowShadow: 'rgba(56, 189, 248, 0.35)',
  },
  green: {
    cardBorder: 'border-emerald-500/35 hover:border-emerald-400/70',
    selectedBorder:
      'border-emerald-400 ring-2 ring-emerald-400/45 shadow-[0_14px_38px_rgba(16,185,129,0.26)]',
    headerGradient:
      'linear-gradient(135deg, rgba(16, 185, 129, 0.24) 0%, rgba(5, 150, 105, 0.06) 65%, transparent 100%)',
    priceColor: 'text-emerald-300',
    iconColor: 'text-emerald-400',
    checkBg: 'bg-emerald-500',
    glowShadow: 'rgba(16, 185, 129, 0.35)',
  },
  amber: {
    cardBorder: 'border-amber-500/35 hover:border-amber-400/70',
    selectedBorder:
      'border-amber-400 ring-2 ring-amber-400/45 shadow-[0_14px_38px_rgba(245,158,11,0.26)]',
    headerGradient:
      'linear-gradient(135deg, rgba(245, 158, 11, 0.24) 0%, rgba(217, 119, 6, 0.06) 65%, transparent 100%)',
    priceColor: 'text-amber-300',
    iconColor: 'text-amber-400',
    checkBg: 'bg-amber-500',
    glowShadow: 'rgba(245, 158, 11, 0.35)',
  },
  rose: {
    cardBorder: 'border-rose-500/35 hover:border-rose-400/70',
    selectedBorder:
      'border-rose-400 ring-2 ring-rose-400/45 shadow-[0_14px_38px_rgba(244,63,94,0.26)]',
    headerGradient:
      'linear-gradient(135deg, rgba(244, 63, 94, 0.24) 0%, rgba(225, 29, 72, 0.06) 65%, transparent 100%)',
    priceColor: 'text-rose-300',
    iconColor: 'text-rose-400',
    checkBg: 'bg-rose-500',
    glowShadow: 'rgba(244, 63, 94, 0.35)',
  },
};

function PackageArtworkThumbnail({
  product,
  pkg,
}: {
  product: ModasrProduct;
  pkg: ProductPackageOption;
}) {
  const topText = pkg.thumbTopText || product.platformBrand.toUpperCase();
  const mainText = pkg.thumbMainText || pkg.shortBadge;
  const subText =
    pkg.thumbSubText ||
    (product.iconType === 'codm'
      ? 'CP'
      : product.iconType === 'pubg'
      ? 'UC'
      : 'PRO');

  const isGoldTheme =
    product.category === 'ingame' ||
    product.iconType === 'codm' ||
    product.iconType === 'pubg' ||
    product.iconType === 'supercell' ||
    product.iconType === 'freefire';

  return (
    <div
      style={{
        background: isGoldTheme
          ? 'radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.42) 0%, rgba(30, 20, 6, 0.96) 65%, #090602 100%)'
          : 'radial-gradient(circle at 50% 35%, rgba(139, 92, 246, 0.38) 0%, rgba(15, 23, 42, 0.96) 65%, #050811 100%)',
      }}
      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] border border-amber-400/40 overflow-hidden shrink-0 flex flex-col items-center justify-between p-2 shadow-[0_10px_25px_rgba(0,0,0,0.65)] select-none"
    >
      {/* Top ambient golden light burst */}
      <div
        aria-hidden="true"
        className="absolute -top-6 inset-x-2 h-14 rounded-full bg-amber-400/25 blur-xl pointer-events-none"
      />

      {/* Top small header label (e.g., SUPPLY PASS / CALL OF DUTY / BATTLE PASS) */}
      <span className="relative z-10 text-[7.5px] sm:text-[8px] font-black tracking-wider uppercase text-amber-200/90 text-center leading-tight line-clamp-1 px-1 py-0.5 rounded bg-black/50 border border-amber-400/25">
        {topText}
      </span>

      {/* Center Coin / Brand Emblem */}
      <div className="relative z-10 flex items-center justify-center my-0.5">
        {product.iconType === 'codm' ? (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-yellow-700 border-2 border-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.65)] flex items-center justify-center">
            <span className="font-sans font-black text-xs sm:text-sm text-[#1a1002] tracking-tighter">
              CP
            </span>
          </div>
        ) : product.iconType === 'pubg' ? (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-amber-300 via-orange-500 to-amber-800 border-2 border-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.65)] flex items-center justify-center">
            <span className="font-sans font-black text-xs sm:text-sm text-[#1a1002] tracking-tighter">
              UC
            </span>
          </div>
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/95 border border-white flex items-center justify-center shadow-md scale-75">
            {renderBrandEmblem(product.iconType)}
          </div>
        )}
      </div>

      {/* Bottom Metallic Denomination Text (e.g. 80 CP, $2 WEEKLY IRAN) */}
      <div className="relative z-10 flex flex-col items-center leading-none pb-0.5">
        <span
          style={{
            backgroundImage:
              'linear-gradient(180deg, #FEF08A 0%, #F59E0B 65%, #B45309 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          className="font-sans font-black text-lg sm:text-xl tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
        >
          {mainText}
        </span>
        <span className="text-[7.5px] sm:text-[8px] font-black tracking-widest uppercase text-amber-100/90 mt-0.5 text-center line-clamp-1">
          {subText}
        </span>
      </div>
    </div>
  );
}

export function DicardoProductDetailModal({
  product,
  usdtRate,
  lang,
  showUsd = false,
  initialPackageIdx = 0,
  onClose,
  onAddToCart,
  onOpenCart,
}: DicardoProductDetailModalProps) {
  const isRtl = lang === 'fa';
  const dicardoTitles = useMemo(() => getDicardoCardTitles(product), [product]);
  const purchaseTypes = useMemo(
    () => getProductPurchaseTypes(product, usdtRate),
    [product, usdtRate]
  );

  const [activePurchaseTypeId, setActivePurchaseTypeId] = useState<string>(
    () => purchaseTypes[0]?.id || 'default'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(() => {
    const firstType = purchaseTypes[0];
    const pkg =
      firstType?.packages[initialPackageIdx] || firstType?.packages[0];
    return pkg?.id || '';
  });
  const [packageSearch, setPackageSearch] = useState('');
  const [expandedDescIds, setExpandedDescIds] = useState<Record<string, boolean>>(
    {}
  );
  const [accountIdentifier, setAccountIdentifier] = useState('');
  const [userRating, setUserRating] = useState<number>(5);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Sync when product changes
  useEffect(() => {
    const types = getProductPurchaseTypes(product, usdtRate);
    const firstType = types[0];
    if (firstType) {
      setActivePurchaseTypeId(firstType.id);
      const initialPkg =
        firstType.packages[initialPackageIdx] || firstType.packages[0];
      if (initialPkg) {
        setSelectedPackageId(initialPkg.id);
      }
    }
    setPackageSearch('');
    setExpandedDescIds({});
  }, [product, usdtRate, initialPackageIdx]);

  const activePurchaseType = useMemo(
    () =>
      purchaseTypes.find((t) => t.id === activePurchaseTypeId) ||
      purchaseTypes[0],
    [purchaseTypes, activePurchaseTypeId]
  );

  const visiblePackages = useMemo(
    () =>
      filterProductPackages(
        activePurchaseType?.packages || [],
        packageSearch
      ),
    [activePurchaseType, packageSearch]
  );

  // Selected package object across all purchase types (or fallback to first visible)
  const selectedPkg = useMemo(() => {
    for (const pt of purchaseTypes) {
      const found = pt.packages.find((p) => p.id === selectedPackageId);
      if (found) return found;
    }
    return activePurchaseType?.packages[0] || visiblePackages[0];
  }, [purchaseTypes, selectedPackageId, activePurchaseType, visiblePackages]);

  const capabilities = useMemo(
    () => getProductCapabilities(product),
    [product]
  );
  const faqs = useMemo(() => getProductFaqs(product), [product]);

  const handleSelectPurchaseType = (typeId: string) => {
    setActivePurchaseTypeId(typeId);
    setPackageSearch('');
    const targetType = purchaseTypes.find((t) => t.id === typeId);
    if (targetType && targetType.packages[0]) {
      setSelectedPackageId(targetType.packages[0].id);
    }
  };

  const toggleDescription = (pkgId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDescIds((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId],
    }));
  };

  const getPackageTomanPrice = (pkg: ProductPackageOption): number => {
    if (typeof pkg.fixedTomanPrice === 'number' && pkg.fixedTomanPrice > 0) {
      return pkg.fixedTomanPrice;
    }
    return convertUsdToToman(pkg.priceUsd, usdtRate);
  };

  const selectedTomanPrice = selectedPkg
    ? getPackageTomanPrice(selectedPkg)
    : convertUsdToToman(product.priceUsd, usdtRate);

  const selectedOriginalTomanPrice =
    selectedPkg?.originalTomanPrice ||
    Math.round((selectedTomanPrice * 1.18) / 1000) * 1000;

  const selectedDiscountPercent =
    selectedPkg?.discountPercent ||
    Math.max(
      1,
      Math.round(
        ((selectedOriginalTomanPrice - selectedTomanPrice) /
          selectedOriginalTomanPrice) *
          100
      )
    );

  const handleBuySelectedPackage = () => {
    if (!selectedPkg) {
      onAddToCart(product);
    } else {
      const customized = createPackageCartProduct(
        product,
        selectedPkg,
        accountIdentifier
      );
      onAddToCart(customized);
    }
    onClose();
    onOpenCart?.();
  };

  const modalContent = (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      data-testid="dicardo-product-detail-modal"
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-black/82 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[94vh] sm:max-h-[90vh] rounded-t-[32px] sm:rounded-[32px] bg-[#070b14] border border-violet-500/30 shadow-[0_28px_90px_rgba(0,0,0,0.92)] flex flex-col overflow-hidden text-white font-vazir"
      >
        {/* Top Sticky Modal Bar */}
        <div className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded-xl bg-violet-500/20 border border-violet-400/35 text-[11px] font-bold text-violet-300 shrink-0">
              {isRtl ? product.categoryLabelFa : product.categoryLabelEn}
            </span>
            <h2 className="text-sm sm:text-base font-black text-white truncate">
              {isRtl
                ? `خرید ${dicardoTitles.titleFa}`
                : `Buy ${dicardoTitles.titleEn}`}
            </h2>
          </div>

          <button
            type="button"
            data-testid="close-dicardo-modal-btn"
            onClick={onClose}
            aria-label={isRtl ? 'بستن پنجره' : 'Close modal'}
            className="w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-rose-500/25 border border-white/15 hover:border-rose-400/45 text-white/80 hover:text-rose-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4 pb-32 space-y-5">
          {/* 1. DICARDO PRODUCT HEADER CARD (Matches Screenshot 08-44-10) */}
          <div
            data-testid="dicardo-header-card"
            className="rounded-[26px] bg-gradient-to-b from-[#111729] to-[#0b101d] border border-white/12 p-4 sm:p-5 shadow-lg space-y-4"
          >
            {/* Right Icon + Title & Subtitle */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] bg-gradient-to-br from-amber-400/25 via-violet-500/20 to-[#050811] border border-white/20 flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                <div className="scale-110">
                  {renderBrandEmblem(product.iconType)}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-black text-white leading-snug">
                  {isRtl
                    ? `خرید ${dicardoTitles.titleFa}`
                    : `Buy ${dicardoTitles.titleEn}`}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-white/60 mt-1">
                  {dicardoTitles.titleEn} · {product.platformBrand}
                </p>
              </div>
            </div>

            {/* 5 Colorful Outlined Trust Badges (Exact Dicardo Layout: 3 top + 2 bottom) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isRtl ? '+۱۱۶,۸۷۳ خرید موفق' : '+116,873 Orders'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-300 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isRtl ? 'ضمانت اصالت' : 'Authenticity Guaranteed'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تحویل فوری' : 'Instant Delivery'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/40 text-violet-300 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{isRtl ? 'پشتیبانی ۲۴/۷' : '24/7 Support'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/40 text-rose-300 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>{isRtl ? 'فعالسازی سریع' : 'Fast Activation'}</span>
              </span>
            </div>

            {/* Customer Rating Box (Matches Screenshot 08-44-10) */}
            <div className="rounded-2xl bg-[#080d18] border border-white/10 p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-black text-base sm:text-lg">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>4.6</span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/75">
                  {isRtl
                    ? 'براساس ۱,۹۳۰ امتیاز مشتری'
                    : 'Based on 1,930 customer reviews'}
                </span>
              </div>

              <div className="border-t border-dashed border-white/15 pt-3 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-white/80">
                  {isRtl ? 'امتیاز شما به محصول:' : 'Your rating:'}
                </span>
                <div
                  dir="ltr"
                  className="flex items-center gap-1"
                  aria-label="Rate product"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="p-0.5 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          star <= userRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-white/25'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. PURCHASE TYPE / SUB-CATEGORY SELECTOR ("برای تغییر نوع خرید یکی را انتخاب کنید" — Matches Screenshot 08-44-13) */}
          <div
            data-testid="dicardo-purchase-type-section"
            className="rounded-[26px] bg-[#101626] border border-white/12 p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white/85 px-1">
              <span>
                {isRtl
                  ? 'برای تغییر نوع خرید یکی را انتخاب کنید'
                  : 'Select a purchase category to view packages'}
              </span>
              <ChevronLeft className="w-4 h-4 text-violet-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {purchaseTypes.map((pType) => {
                const isActive = pType.id === activePurchaseType?.id;
                return (
                  <button
                    key={pType.id}
                    type="button"
                    data-testid={`dicardo-purchase-type-${pType.id}`}
                    onClick={() => handleSelectPurchaseType(pType.id)}
                    className={`w-full rounded-[20px] p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer text-start border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] border-violet-300/60 text-white shadow-[0_10px_28px_rgba(139,92,246,0.4)]'
                        : 'bg-[#171f34] hover:bg-[#1e2842] border-white/10 text-white/90'
                    }`}
                  >
                    {/* Right Icon Box + Titles */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isActive
                            ? 'bg-white/20 border-white/40 text-white'
                            : 'bg-violet-500/15 border-violet-400/30 text-violet-300'
                        }`}
                      >
                        <Package className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-sm sm:text-base font-black truncate">
                          {isRtl ? pType.titleFa : pType.titleEn}
                        </div>
                        <div
                          className={`text-xs font-bold mt-0.5 tabular-nums ${
                            isActive ? 'text-white/90' : 'text-white/65'
                          }`}
                        >
                          {showUsd
                            ? `From $${pType.startingPriceUsd.toFixed(2)}`
                            : isRtl
                            ? `از ${pType.startingPriceToman.toLocaleString('fa-IR')} تومان`
                            : `From ${pType.startingPriceToman.toLocaleString()} Toman`}
                        </div>
                      </div>
                    </div>

                    {/* Active Indicator Dot/Check */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                        isActive
                          ? 'bg-white text-[#7C3AED] border-white'
                          : 'border-white/25 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. PACKAGE SELECTION SECTION ("انتخاب بسته" + Search Input + Colored Package Cards — Matches Screenshots 08-44-20, 08-44-22, 08-44-39, 08-44-42) */}
          <div
            data-testid="dicardo-packages-section"
            className="space-y-3.5"
          >
            {/* Section Title Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-violet-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isRtl ? 'انتخاب بسته' : 'Select Package'}
                </h3>
                <span className="text-xs font-bold text-violet-300 bg-violet-500/15 border border-violet-400/30 px-2.5 py-0.5 rounded-full">
                  {isRtl
                    ? activePurchaseType?.titleFa
                    : activePurchaseType?.titleEn}
                </span>
              </div>
              <span className="text-xs text-white/60 font-semibold">
                {isRtl
                  ? `${visiblePackages.length.toLocaleString('fa-IR')} بسته موجود`
                  : `${visiblePackages.length} packages`}
              </span>
            </div>

            {/* Live Package Search Input ("جستجو...") */}
            <div className="relative">
              <Search className="w-4 h-4 text-white/45 absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none" />
              <input
                type="text"
                data-testid="dicardo-package-search-input"
                value={packageSearch}
                onChange={(e) => setPackageSearch(e.target.value)}
                placeholder={
                  isRtl
                    ? 'جستجو در بسته‌ها (مثلاً 80 سی پی، هفتگی، بتل پس...)'
                    : 'Search packages...'
                }
                className="w-full rounded-2xl bg-[#111829] border border-white/15 focus:border-violet-400 pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/45 outline-none transition-colors"
              />
              {packageSearch && (
                <button
                  type="button"
                  onClick={() => setPackageSearch('')}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-xs text-white/60 hover:text-white px-2 py-0.5 rounded-lg bg-white/10 cursor-pointer"
                >
                  {isRtl ? 'پاک کردن' : 'Clear'}
                </button>
              )}
            </div>

            {/* Package Cards List */}
            {visiblePackages.length === 0 ? (
              <div className="rounded-2xl bg-[#101626] border border-white/10 p-8 text-center text-sm text-white/65">
                {isRtl
                  ? 'بسته‌ای با این عبارت یافت نشد. لطفاً عبارت دیگری را جستجو کنید.'
                  : 'No packages match your search query.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {visiblePackages.map((pkg, idx) => {
                  const isSelected = selectedPkg?.id === pkg.id;
                  const theme =
                    PACKAGE_THEME_STYLES[pkg.colorTheme] ||
                    PACKAGE_THEME_STYLES.purple;
                  const pkgToman = getPackageTomanPrice(pkg);
                  const isDescOpen = Boolean(expandedDescIds[pkg.id]);

                  return (
                    <div
                      key={pkg.id}
                      data-testid={`dicardo-package-card-${idx}`}
                      data-package-id={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      style={{
                        backgroundImage: theme.headerGradient,
                      }}
                      className={`relative rounded-[24px] bg-[#101626]/95 border p-4 sm:p-5 transition-all duration-200 cursor-pointer select-none ${
                        isSelected ? theme.selectedBorder : theme.cardBorder
                      }`}
                    >
                      {/* Row 1: Package Title on Right + Checkmark Circle on Left */}
                      <div className="flex items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-2 min-w-0">
                          {pkg.isPopular && (
                            <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <h4 className="text-sm sm:text-base font-black text-white truncate">
                            {isRtl ? pkg.titleFa : pkg.titleEn}
                          </h4>
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? `${theme.checkBg} text-white shadow-md scale-105`
                              : 'bg-white/10 border border-white/25 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>

                      {/* Row 2: Right 3-Row Spec Table + Left Graphic Thumbnail (Exact Dicardo Mobile Card Layout) */}
                      <div className="flex flex-row-reverse items-stretch gap-3 sm:gap-4">
                        {/* Left Visual Artwork Thumbnail */}
                        <PackageArtworkThumbnail product={product} pkg={pkg} />

                        {/* Right 3-Row Specification Box */}
                        <div className="flex-1 rounded-2xl bg-[#090e1a]/90 border border-white/10 p-3 flex flex-col justify-between text-xs">
                          <div className="flex items-center justify-between gap-2 py-1 border-b border-white/[0.06]">
                            <span className="text-white/65 inline-flex items-center gap-1.5 font-medium">
                              <Package className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                              <span>{isRtl ? 'نحوه تحویل' : 'Delivery'}</span>
                            </span>
                            <span className="font-bold text-white text-end">
                              {isRtl ? pkg.deliveryMethodFa : pkg.deliveryMethodEn}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2 py-1 border-b border-white/[0.06]">
                            <span className="text-white/65 inline-flex items-center gap-1.5 font-medium">
                              <ShieldCheck className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                              <span>{isRtl ? 'زمان گارانتی' : 'Warranty'}</span>
                            </span>
                            <span className="font-bold text-white text-end">
                              {isRtl ? pkg.warrantyFa : pkg.warrantyEn}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2 py-1">
                            <span className="text-white/65 inline-flex items-center gap-1.5 font-medium">
                              <Clock className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                              <span>{isRtl ? 'زمان تحویل' : 'Speed'}</span>
                            </span>
                            <span className="font-bold text-white text-end">
                              {isRtl ? pkg.deliveryTimeFa : pkg.deliveryTimeEn}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Price + Expandable "توضیحات ⓘ" Button */}
                      <div className="mt-3.5 pt-3 border-t border-dashed border-white/15 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          data-testid={`dicardo-pkg-desc-toggle-${idx}`}
                          onClick={(e) => toggleDescription(pkg.id, e)}
                          className="px-4 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-bold text-white/85 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Info className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                          <span>{isRtl ? 'توضیحات' : 'Details'}</span>
                        </button>

                        <div className="text-end">
                          {showUsd ? (
                            <div
                              className={`text-lg sm:text-xl font-black tabular-nums ${theme.priceColor}`}
                            >
                              ${pkg.priceUsd.toFixed(2)}
                            </div>
                          ) : (
                            <div
                              className={`text-lg sm:text-xl font-black tabular-nums ${theme.priceColor}`}
                            >
                              {pkgToman.toLocaleString('fa-IR')}{' '}
                              <span className="text-xs font-bold text-white/75">
                                تومان
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expanded Package Description Drawer */}
                      {isDescOpen && (
                        <div
                          data-testid={`dicardo-pkg-desc-content-${idx}`}
                          className="mt-3 rounded-xl bg-[#070b14] border border-white/10 p-3.5 text-xs sm:text-sm text-white/80 leading-relaxed"
                        >
                          {isRtl ? pkg.descriptionFa : pkg.descriptionEn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. OPTIONAL PLAYER UID / ACCOUNT EMAIL INPUT */}
          <div className="rounded-[24px] bg-[#101626] border border-white/12 p-4 sm:p-5 space-y-2.5">
            <label className="block text-xs sm:text-sm font-bold text-white/90">
              {product.category === 'ingame'
                ? isRtl
                  ? 'آیدی عددی (UID) یا ایمیل اکانت بازی (اختیاری - در سبد خرید هم قابل ثبت است):'
                  : 'Player UID or Game Account Email (Optional):'
                : isRtl
                ? 'ایمیل یا آیدی جهت فعال‌سازی اشتراک (اختیاری):'
                : 'Account Email or ID for Activation (Optional):'}
            </label>
            <input
              type="text"
              data-testid="dicardo-account-input"
              value={accountIdentifier}
              onChange={(e) => setAccountIdentifier(e.target.value)}
              placeholder={
                product.category === 'ingame'
                  ? isRtl
                    ? 'مثال: UID: 6742910482 یا ایمیل اکتیویژن / سوپرسل...'
                    : 'e.g. UID: 6742910482 or Activision Email'
                  : isRtl
                  ? 'مثال: yourname@gmail.com'
                  : 'e.g. yourname@gmail.com'
              }
              className="w-full rounded-xl bg-[#090d18] border border-white/15 focus:border-violet-400 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 outline-none"
            />
          </div>

          {/* 5. KEY CAPABILITIES & FEATURES ("قابلیت‌ها و مشخصات فنی") */}
          <div className="rounded-[24px] bg-[#101626] border border-white/12 p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm sm:text-base font-black text-white">
                {isRtl
                  ? `قابلیت‌ها و مزایای ${dicardoTitles.titleFa}`
                  : `${dicardoTitles.titleEn} Features & Capabilities`}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#090e1a] border border-white/10 p-3.5 space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-violet-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isRtl ? cap.titleFa : cap.titleEn}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {isRtl ? cap.descFa : cap.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. PRODUCT FAQ ACCORDION */}
          <div className="rounded-[24px] bg-[#101626] border border-white/12 p-4 sm:p-5 space-y-3">
            <h3 className="text-sm sm:text-base font-black text-white">
              {isRtl ? 'سوالات متداول خریداران' : 'Frequently Asked Questions'}
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#090e1a] border border-white/10 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-4 py-3 flex items-center justify-between gap-2 text-start text-xs sm:text-sm font-bold text-white cursor-pointer"
                    >
                      <span>{isRtl ? faq.qFa : faq.qEn}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-violet-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-white/75 leading-relaxed border-t border-white/10">
                        {isRtl ? faq.aFa : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 7. STICKY BOTTOM CHECKOUT BAR (Exact Dicardo Sticky Footer with Discount Pill & Purple CTA) */}
        <div
          data-testid="dicardo-sticky-checkout-bar"
          className="sticky bottom-0 z-30 px-4 sm:px-6 py-3.5 bg-[#0c1222]/98 backdrop-blur-2xl border-t border-violet-500/35 flex items-center justify-between gap-4 shadow-[0_-12px_35px_rgba(0,0,0,0.75)]"
        >
          {/* Price + Red Discount Badge + Strikethrough Original Price */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-black tabular-nums">
                -{selectedDiscountPercent}%
              </span>
              {showUsd ? (
                <span
                  data-testid="dicardo-sticky-price"
                  className="text-lg sm:text-2xl font-black text-white tabular-nums"
                >
                  ${(selectedPkg?.priceUsd ?? product.priceUsd).toFixed(2)}
                </span>
              ) : (
                <span
                  data-testid="dicardo-sticky-price"
                  className="text-lg sm:text-2xl font-black text-white tabular-nums"
                >
                  {selectedTomanPrice.toLocaleString('fa-IR')}{' '}
                  <span className="text-xs font-bold text-white/75">تومان</span>
                </span>
              )}
            </div>
            {!showUsd && (
              <span className="text-xs text-white/45 line-through tabular-nums mt-0.5">
                {selectedOriginalTomanPrice.toLocaleString('fa-IR')} تومان
              </span>
            )}
          </div>

          {/* Primary Purple CTA Button ("ورود و خرید / افزودن به سبد") */}
          <button
            type="button"
            data-testid="dicardo-modal-buy-btn"
            onClick={handleBuySelectedPackage}
            className="px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9366F9] hover:to-[#8B5CF6] active:scale-[0.98] text-white font-black text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-[0_10px_28px_rgba(139,92,246,0.45)] transition-all cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isRtl ? 'ورود و خرید آنی' : 'Buy Selected Package'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
