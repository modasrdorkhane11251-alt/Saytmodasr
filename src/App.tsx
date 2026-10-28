/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Crown,
  Eye,
  Globe,
  ShoppingBag,
} from 'lucide-react';
import {
  Language,
  SectionId,
  getSectionById,
} from './utils/heroConfig';
import {
  DEFAULT_USDT_RATE_TOMAN,
  INITIAL_DEMO_ORDER,
  MODASR_PRODUCTS,
  ModasrOrder,
  ModasrProduct,
  ProductCategory,
  calculateCartSummary,
} from './utils/modasrStore';
import {
  ThemePresetId,
  getDefaultPresetForSection,
  getPresetById,
} from './utils/themePresets';
import {
  BrandIdentityConfig,
  DigitalAssetItem,
  INITIAL_BRAND_IDENTITY,
  INITIAL_DIGITAL_ASSETS,
  INITIAL_SCENES_CONFIG,
  INITIAL_VERSION_HISTORY,
  StudioCategoryKey,
  StudioSceneConfig,
  StudioSnapshotVersion,
} from './utils/modasrStudioEngine';
import { SectionBackdrop } from './components/SectionBackdrop';
import { BottomDock } from './components/BottomDock';
import { InteractiveShowcasePanel } from './components/InteractiveShowcasePanel';
import { ThemeManager } from './components/ThemeManager';
import { ModasrMarketplace } from './components/ModasrMarketplace';
import { CartDrawer } from './components/CartDrawer';
import { ModasrStudio } from './components/ModasrStudio';
import { StudioThreeViewport } from './components/StudioThreeViewport';
import { useScrollReveal } from './hooks/useScrollReveal';

function mapSectionToStudioCategory(sec: SectionId): StudioCategoryKey {
  if (sec === 'games') return 'gaming';
  if (sec === 'ai') return 'ai';
  if (sec === 'web') return 'vpn';
  if (sec === 'studio') return 'webapp';
  return 'home';
}

export default function App() {
  const [viewMode, setViewMode] = useState<
    'public-store' | 'studio' | 'isolated-preview'
  >(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('studio') === '1') return 'studio';
      if (params.get('preview') === '1') return 'isolated-preview';
    }
    return 'public-store';
  });

  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [activePresetId, setActivePresetId] =
    useState<ThemePresetId>('neural-nexus');
  const [lang, setLang] = useState<Language>('fa');
  const [show3DStageInHero, setShow3DStageInHero] = useState(false);

  // MODASR STUDIO Versioned State (Isolated from Storefront Order & VPN Engine)
  const [versionHistory, setVersionHistory] = useState<StudioSnapshotVersion[]>(
    INITIAL_VERSION_HISTORY
  );
  const [publishedVersionId, setPublishedVersionId] = useState<string>(
    INITIAL_VERSION_HISTORY[0].versionId
  );
  const [draftScenes, setDraftScenes] = useState<
    Record<StudioCategoryKey, StudioSceneConfig>
  >(() => structuredClone(INITIAL_SCENES_CONFIG));
  const [draftBrand, setDraftBrand] = useState<BrandIdentityConfig>(() =>
    structuredClone(INITIAL_BRAND_IDENTITY)
  );
  const [studioAssets, setStudioAssets] = useState<DigitalAssetItem[]>(
    INITIAL_DIGITAL_ASSETS
  );

  // Storefront State (Orders, Cart, Wallex USDT Rate — 100% Untouched by Studio)
  const [usdtRate, setUsdtRate] = useState<number>(DEFAULT_USDT_RATE_TOMAN);
  const [currencyMode, setCurrencyMode] = useState<'toman' | 'usd'>('toman');
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('all');
  const [cartItems, setCartItems] = useState<
    Array<{ product: ModasrProduct; quantity: number }>
  >([{ product: MODASR_PRODUCTS[0], quantity: 1 }]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<ModasrOrder[]>([INITIAL_DEMO_ORDER]);
  const [activeOrderNumber, setActiveOrderNumber] = useState<string>(
    INITIAL_DEMO_ORDER.orderNumber
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intersection Observer fade-up hook for the hero lower feature block
  const heroLowerFeatureReveal = useScrollReveal<HTMLDivElement>({
    variant: 'fade-up',
    threshold: 0.1,
  });

  const publishedVersion =
    versionHistory.find((v) => v.versionId === publishedVersionId) ||
    versionHistory[0];

  // In 'isolated-preview', storefront previews the unapproved Draft; in 'public-store', ONLY the approved Published snapshot is used!
  const activeStoreScenes =
    viewMode === 'isolated-preview' ? draftScenes : publishedVersion.scenes;
  const activeStoreBrand =
    viewMode === 'isolated-preview' ? draftBrand : publishedVersion.brand;

  const currentSection = getSectionById(activeSection);
  const currentPreset = getPresetById(activePresetId);
  const content = currentSection[lang];
  const isRtl = lang === 'fa';

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleUpdateDraftScene = (
    catKey: StudioCategoryKey,
    updater: (prev: StudioSceneConfig) => StudioSceneConfig
  ) => {
    setDraftScenes((prev) => ({
      ...prev,
      [catKey]: updater(prev[catKey]),
    }));
  };

  const handleUpdateDraftBrand = (
    updater: (prev: BrandIdentityConfig) => BrandIdentityConfig
  ) => {
    setDraftBrand((prev) => updater(prev));
  };

  const handleAddStudioAsset = (asset: DigitalAssetItem) => {
    setStudioAssets((prev) => [asset, ...prev]);
  };

  const handlePublishApprovedDraft = (notesFa: string) => {
    const nextPatch = versionHistory.length + 1;
    const newVersionId = `v1.0.${nextPatch}`;
    const nowStr = '۱۴۰۵/۰۸/۰۴ - اکنون';

    const newSnapshot: StudioSnapshotVersion = {
      versionId: newVersionId,
      labelFa: `نسخهٔ ${newVersionId} — انتشار تأییدشده توسط مدیر`,
      status: 'published',
      createdAt: nowStr,
      publishedAt: nowStr,
      author: 'مدیر ارشد (modasrdorkhane@gmail.com)',
      notesFa,
      scenes: structuredClone(draftScenes),
      brand: structuredClone(draftBrand),
    };

    setVersionHistory((prev) => [
      newSnapshot,
      ...prev.map((v) => ({ ...v, status: 'archived' as const })),
    ]);
    setPublishedVersionId(newVersionId);
  };

  const handleRollbackToVersion = (targetVersionId: string) => {
    const target = versionHistory.find((v) => v.versionId === targetVersionId);
    if (!target) return;
    setPublishedVersionId(target.versionId);
    setDraftScenes(structuredClone(target.scenes));
    setDraftBrand(structuredClone(target.brand));
  };

  const handleSelectSection = (id: SectionId) => {
    setActiveSection(id);
    setActivePresetId(getDefaultPresetForSection(id));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (id === 'ai') {
      setSelectedCategory('ai');
    } else if (id === 'games') {
      setSelectedCategory('gaming');
    } else if (id === 'web') {
      setSelectedCategory('vpn');
    } else if (id === 'search' || id === 'home') {
      setSelectedCategory('all');
    }
  };

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
  };

  const handleRefreshRate = () => {
    const delta = Math.floor(Math.random() * 350) - 150;
    const nextRate = Math.max(67800, DEFAULT_USDT_RATE_TOMAN + delta);
    setUsdtRate(nextRate);
    showToast(
      isRtl
        ? `نرخ لحظه‌ای تتر از والکس بروزرسانی شد: ${nextRate.toLocaleString('fa-IR')} تومان`
        : `Wallex USDT rate synced: ${nextRate.toLocaleString('en-US')} IRT`
    );
  };

  const handleAddToCart = (product: ModasrProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(
      isRtl
        ? `«${product.titleFa}» به سبد خرید اضافه شد.`
        : `"${product.titleEn}" added to your cart.`
    );
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleSubmitOrder = (email: string, discountCode: string) => {
    const summary = calculateCartSummary(cartItems, discountCode, usdtRate);
    const randomNum = Math.floor(10000 + Math.random() * 89999);
    const orderNumber = `MDS-${randomNum}`;
    const idempotencyKey = `idem_modasr_${randomNum}_verified`;

    const newOrder: ModasrOrder = {
      orderNumber,
      email,
      idempotencyKey,
      items: [...cartItems],
      usdtRateToman: usdtRate,
      subtotalUsd: summary.subtotalUsd,
      discountUsd: summary.discountUsd,
      totalUsd: summary.totalUsd,
      totalToman: summary.totalToman,
      statusFa: 'در انتظار هماهنگی پرداخت (ثبت‌شده روی سرور)',
      statusEn: 'Awaiting Payment Coordination (Server Verified)',
      createdAt: isRtl ? 'هم‌اکنون' : 'Just now',
      events: [
        {
          id: `ev-${randomNum}-1`,
          titleFa: 'ثبت سفارش با کلید یکتا (Idempotency)',
          titleEn: 'Order Created with Unique Idempotency Key',
          detailFa: `سفارش برای ${email} ثبت شد و کلید یکتای ${idempotencyKey} صادر گردید.`,
          detailEn: `Order registered for ${email} with key ${idempotencyKey}.`,
          timestamp: '۰۰:۰۰:۰۱',
          actor: 'MODASR Core Engine',
          status: 'completed',
        },
        {
          id: `ev-${randomNum}-2`,
          titleFa: 'قفل قیمت سرور و نرخ لحظه‌ای Wallex',
          titleEn: 'Server Price & Wallex USDT Rate Locked',
          detailFa: `مبلغ نهایی ($${summary.totalUsd.toFixed(2)}) بر اساس نرخ تتر ${usdtRate.toLocaleString('fa-IR')} تومان قفل شد.`,
          detailEn: `Final total ($${summary.totalUsd.toFixed(2)}) locked at server rate.`,
          timestamp: '۰۰:۰۰:۰۲',
          actor: 'Price Guard Validator',
          status: 'completed',
        },
        {
          id: `ev-${randomNum}-3`,
          titleFa: 'آماده تحویل آنی از طریق پشتیبانی تلگرام',
          titleEn: 'Ready for Instant Delivery via Support',
          detailFa: `شماره سفارش ${orderNumber} را به @modasrpanel ارسال کنید.`,
          detailEn: `Send Order ID ${orderNumber} to @modasrpanel for instant activation.`,
          timestamp: '۰۰:۰۰:۰۳',
          actor: 'Support Desk (@modasrpanel)',
          status: 'active',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderNumber(orderNumber);
    setCartItems([]);
    setCartOpen(false);
    setActiveSection('studio');
    showToast(
      isRtl
        ? `سفارش ${orderNumber} با موفقیت ثبت شد! در بخش پیگیری قابل مشاهده است.`
        : `Order ${orderNumber} created! View live status in the Order Tracker.`
    );

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    document
      .getElementById('catalog-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  // ===========================================================================
  // RENDER INDEPENDENT MODASR STUDIO WORKSPACE WHEN viewMode === 'studio'
  // ===========================================================================
  if (viewMode === 'studio') {
    return (
      <ModasrStudio
        publishedVersion={publishedVersion}
        versionHistory={versionHistory}
        draftScenes={draftScenes}
        draftBrand={draftBrand}
        assets={studioAssets}
        onUpdateDraftScene={handleUpdateDraftScene}
        onUpdateDraftBrand={handleUpdateDraftBrand}
        onAddAsset={handleAddStudioAsset}
        onPublishApprovedDraft={handlePublishApprovedDraft}
        onRollbackToVersion={handleRollbackToVersion}
        onEnterIsolatedPreview={() => {
          setShow3DStageInHero(true);
          setViewMode('isolated-preview');
        }}
        onExitStudioToPublicStore={() => setViewMode('public-store')}
      />
    );
  }

  const mappedStudioCategory = mapSectionToStudioCategory(activeSection);
  const currentCategorySceneConfig = activeStoreScenes[mappedStudioCategory];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`relative min-h-screen w-full text-white select-none ${
        isRtl ? 'font-vazir' : 'font-inter'
      }`}
    >
      {/* GLOBAL FULL-PAGE TAILORED BACKDROP FOR ALL 6 PAGES */}
      <SectionBackdrop
        activeSection={activeSection}
        activePresetId={activePresetId}
        isRtl={isRtl}
      />

      {/* ISOLATED PREVIEW MODE TOP BANNER (Step 2 of Release Pipeline) */}
      {viewMode === 'isolated-preview' && (
        <div
          data-testid="isolated-preview-banner"
          className="sticky top-0 z-50 bg-amber-950/95 border-b border-amber-400/50 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-100"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-bold text-amber-300">
              محیط پیش‌نمایش ایزوله (MODASR STUDIO Draft Preview):
            </span>
            <span>
              شما در حال مشاهدهٔ نسخهٔ پیش‌نویس هستید؛ سایت عمومی هنوز روی نسخهٔ{' '}
              <strong className="font-mono">{publishedVersion.versionId}</strong>{' '}
              قرار دارد.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="return-to-studio-from-preview-btn"
              onClick={() => setViewMode('studio')}
              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer"
            >
              بازگشت به استودیو و تأیید انتشار
            </button>
            <button
              type="button"
              onClick={() => setViewMode('public-store')}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-amber-400/40 text-amber-200 hover:text-white cursor-pointer"
            >
              خروج به سایت عمومی
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          data-testid="toast-notification"
          className="fixed top-20 end-6 z-50 pointer-events-none flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 border border-teal-400/50 text-white text-xs sm:text-sm font-semibold shadow-2xl animate-scale-in"
        >
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          TOP HEADER BAR (Brand Wordmark + Language & Cart — All Page Nav in BottomDock)
      ====================================================================== */}
      {!(
        activeSection === 'games' ||
        activeSection === 'ai' ||
        activeSection === 'web'
      ) && (
        <header className="sticky top-0 z-30 bg-white/[0.12] backdrop-blur-2xl border-b border-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.18),inset_0_-1px_1px_rgba(255,255,255,0.45)] flex items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 py-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleSelectSection('home');
            }}
            className="font-podium text-white font-bold uppercase text-2xl sm:text-3xl tracking-wider whitespace-nowrap shrink-0"
          >
            MODASR
          </a>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'en' ? 'fa' : 'en'))}
              aria-label="Switch Language"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.16] hover:bg-white/[0.24] backdrop-blur-xl border border-white/40 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)] text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-teal-300" />
              <span>{lang === 'en' ? 'فارسی' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={isRtl ? 'مشاهده سبد خرید' : 'Open shopping cart'}
              className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer shadow-lg"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isRtl ? 'سبد خرید' : 'Cart'}</span>
              <span
                data-testid="cart-count-badge"
                className="px-1.5 py-0.5 rounded-full bg-slate-950 text-teal-300 text-[11px] font-black tabular-nums"
              >
                {totalCartCount}
              </span>
            </button>
          </div>
        </header>
      )}

      {/* =====================================================================
          HERO STAGE (Seamless Fullscreen Video Hero on Dedicated Category Pages: 'games', 'ai', 'web')
      ====================================================================== */}
      {(activeSection === 'games' ||
        activeSection === 'ai' ||
        activeSection === 'web') && (
        <div className="relative z-20 min-h-[78dvh] lg:min-h-[90dvh] w-full flex flex-col justify-between pb-6">
          {/* Top Bar inside Hero (Brand Wordmark + Language & Cart only) */}
          <header className="relative z-30 flex items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 py-5 lg:py-6">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleSelectSection('home');
              }}
              className="font-podium text-white font-bold uppercase text-2xl sm:text-3xl tracking-wider whitespace-nowrap shrink-0"
            >
              MODASR
            </a>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setLang((prev) => (prev === 'en' ? 'fa' : 'en'))
                }
                aria-label="Switch Language"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span>{lang === 'en' ? 'فارسی' : 'EN'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={isRtl ? 'مشاهده سبد خرید' : 'Open shopping cart'}
                className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isRtl ? 'سبد خرید' : 'Cart'}</span>
                <span
                  data-testid="cart-count-badge"
                  className="px-1.5 py-0.5 rounded-full bg-slate-950 text-teal-300 text-[11px] font-black tabular-nums"
                >
                  {totalCartCount}
                </span>
              </button>
            </div>
          </header>

          {/* Hero Main Content */}
          <main className="relative z-20 flex-1 flex flex-col justify-between gap-6 px-6 sm:px-10 lg:px-16 pb-2 pt-1">
            {/* Top Sub-bar: Tagline + Desktop Theme Preset Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-teal-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  {content.tagline}
                </div>
              </div>

              <div className="hidden lg:block">
                <ThemeManager
                  activePresetId={activePresetId}
                  onSelectPreset={setActivePresetId}
                  lang={lang}
                />
              </div>
            </div>

            {/* Center Row: Dynamic Headline + Interactive Showcase OR Live 3D Category Stage */}
            {show3DStageInHero ? (
              <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-xs font-mono text-teal-300">
                    MODASR STUDIO · {publishedVersion.versionId} ·{' '}
                    {currentCategorySceneConfig.titleEn}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {currentCategorySceneConfig.titleFa}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentCategorySceneConfig.subtitleFa}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('studio')}
                      className="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      ویرایش این صحنه در MODASR STUDIO
                    </button>
                    <button
                      type="button"
                      onClick={() => setShow3DStageInHero(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      بازگشت به نمای کلاسیک هیرو
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <StudioThreeViewport
                    sceneConfig={currentCategorySceneConfig}
                    brandConfig={activeStoreBrand}
                    deviceFrame="desktop"
                    timelineSec={2.4}
                    isPlaying={true}
                    compactMode={true}
                    onSelectCardIndex={(idx) => {
                      handleUpdateDraftScene(mappedStudioCategory, (prev) => ({
                        ...prev,
                        selectedCardIndex: idx,
                      }));
                    }}
                    onTriggerHandRaise={() => {
                      handleUpdateDraftScene(mappedStudioCategory, (prev) => ({
                        ...prev,
                        handRaiseProgress:
                          prev.handRaiseProgress > 0.85 ? 0.35 : 0.95,
                      }));
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="my-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
                <div className="max-w-3xl">
                  <h1
                    key={`${activeSection}-${lang}`}
                    className={`text-white uppercase leading-[0.98] tracking-tight animate-fade-up ${
                      isRtl
                        ? 'font-vazir font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl'
                        : 'font-podium font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem]'
                    }`}
                  >
                    <span className="block">{content.headingLines[0]}</span>
                    <span
                      style={{ color: activeStoreBrand.primaryColor }}
                      className="block"
                    >
                      {content.headingLines[1]}
                    </span>
                    <span className="block">{content.headingLines[2]}</span>
                  </h1>
                </div>

                <InteractiveShowcasePanel
                  activeSection={activeSection}
                  lang={lang}
                  onNavigateSection={handleSelectSection}
                />
              </div>
            )}

            {/* Bottom Hero Row: Subtext + CTA + Hero Lower Feature Block */}
            <div
              ref={heroLowerFeatureReveal.ref}
              data-testid="hero-lower-feature-block"
              data-scroll-reveal="fade-up"
              data-revealed="true"
              className="animate-fade-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-3 border-t border-white/15"
            >
              {/* Left: Subtext & Primary Store CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 max-w-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-teal-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Crown className="w-4 h-4 text-teal-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {content.subtextLine1} {content.subtextLine2}{' '}
                    <span className="text-teal-300 font-semibold">
                      {content.subtextHighlight}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="inline-flex items-center justify-center gap-2 border border-teal-400/60 bg-teal-400/15 hover:bg-teal-400 hover:text-slate-950 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white transition-all duration-300 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>{content.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Stats + Server-Verified Guarantee Badge */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-6 sm:gap-8">
                  {content.stats.map((stat) => (
                    <div key={stat.label}>
                      <div
                        className={`text-xl sm:text-2xl text-white tracking-wide tabular-nums ${
                          isRtl ? 'font-vazir font-black' : 'font-podium font-bold'
                        }`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-white/60 tracking-wide mt-0.5 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:flex items-center gap-2.5 bg-white/5 backdrop-blur-md border border-teal-400/35 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-teal-300 shrink-0" />
                  <div className="text-[11px] leading-tight text-white/90">
                    <div className="font-semibold">{content.badgeLine1}</div>
                    <div className="text-white/65">{content.badgeLine2}</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* =====================================================================
          DEDICATED PAGE CONTENT (Home Dashboard / Category Store / Catalog / Orders)
      ====================================================================== */}
      <ModasrMarketplace
        activePage={activeSection}
        lang={lang}
        usdtRate={usdtRate}
        onRefreshRate={handleRefreshRate}
        currencyMode={currencyMode}
        onToggleCurrency={setCurrencyMode}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onAddToCart={handleAddToCart}
        orders={orders}
        activeOrderNumber={activeOrderNumber}
        onSelectOrderNumber={setActiveOrderNumber}
        accentHex={activeStoreBrand.primaryColor || currentPreset.primaryColor}
        onActivateHeroSection={handleSelectSection}
        totalCartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* =====================================================================
          FIXED BOTTOM NAVIGATION DOCK (All 6 Categorized Pages at Bottom of Site)
      ====================================================================== */}
      <BottomDock
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        lang={lang}
        accentHex={activeStoreBrand.primaryColor || currentPreset.primaryColor}
      />

      {/* Interactive Server-Verified Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        lang={lang}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        usdtRate={usdtRate}
        onSubmitOrder={handleSubmitOrder}
      />

    </div>
  );
}
