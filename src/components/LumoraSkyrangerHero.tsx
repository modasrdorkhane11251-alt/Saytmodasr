import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Crown,
  Search,
  Shield,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  MODASR_PRODUCTS,
  ModasrProduct,
  convertUsdToToman,
  DEFAULT_USDT_RATE_TOMAN,
  filterModasrProducts,
} from '../utils/modasrStore';
import { SectionId } from '../utils/heroConfig';
import { ProductSplitCard } from './ProductSplitCard';

export const LUMORA_PLATE_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a194141a-44ba-44bb-8372-e6720af994ca.jpg';
export const LUMORA_HEAD_CLIP_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e1b48476-24ab-456a-bb12-13e63bc60973.mp4';
export const LUMORA_HELMET_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e8c78660-4497-41b9-82ae-a4738a5edd11.jpg';

/**
 * Maps pointer X across the frame (14% to 86%) to clip time 0 -> duration.
 */
export function mapPointerXToClipTime(
  pointerX: number,
  frameLeft: number,
  frameWidth: number,
  duration: number
): number {
  if (frameWidth <= 0 || duration <= 0) return 0;
  const relX = (pointerX - frameLeft) / frameWidth;
  const normalized = (relX - 0.14) / (0.86 - 0.14);
  const clamped = Math.max(0, Math.min(1, normalized));
  return clamped * duration;
}

/**
 * Eases current value toward target by factor per frame.
 */
export function easeValue(
  current: number,
  target: number,
  factor: number
): number {
  return current + (target - current) * factor;
}

/**
 * After 3.5s without movement, gaze drifts slowly side to side (sine around middle, +-32% of clip).
 */
export function computeIdleDriftTime(
  elapsedSec: number,
  duration: number
): number {
  if (duration <= 0) return 0;
  const ratio = 0.5 + Math.sin(elapsedSec * 1.15) * 0.32;
  return Math.max(0, Math.min(duration, ratio * duration));
}

export interface GazeRotationState {
  normX: number;
  normY: number;
  rotateYDeg: number;
  rotateXDeg: number;
  shiftXPx: number;
  shiftYPx: number;
}

/**
 * Computes 3D head/character rotation state for unit test validation.
 */
export function computeGazeRotation(
  pointerX: number,
  pointerY: number,
  frameLeft: number,
  frameTop: number,
  frameWidth: number,
  frameHeight: number
): GazeRotationState {
  if (frameWidth <= 0 || frameHeight <= 0) {
    return {
      normX: 0,
      normY: 0,
      rotateYDeg: 0,
      rotateXDeg: 0,
      shiftXPx: 0,
      shiftYPx: 0,
    };
  }
  const headCenterX = frameLeft + frameWidth * 0.5;
  const headCenterY = frameTop + frameHeight * 0.52;
  const rawX = (pointerX - headCenterX) / (frameWidth * 0.42);
  const rawY = (pointerY - headCenterY) / (frameHeight * 0.42);
  const normX = Math.max(-1, Math.min(1, rawX));
  const normY = Math.max(-1, Math.min(1, rawY));

  return {
    normX,
    normY,
    rotateYDeg: Number((normX * 24).toFixed(2)),
    rotateXDeg: Number((-normY * 18).toFixed(2)),
    shiftXPx: Number((normX * 22).toFixed(2)),
    shiftYPx: Number((normY * 16).toFixed(2)),
  };
}

interface LumoraSkyrangerHeroProps {
  onAddToCart?: (product: ModasrProduct) => void;
  usdtRate?: number;
  externalSearchQuery?: string;
  onExternalSearchChange?: (query: string) => void;
  onNavigateSection?: (sectionId: SectionId) => void;
}

export function LumoraSkyrangerHero({
  onAddToCart,
  usdtRate = DEFAULT_USDT_RATE_TOMAN,
  externalSearchQuery,
  onExternalSearchChange,
  onNavigateSection,
}: LumoraSkyrangerHeroProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pushBtnRef = useRef<HTMLButtonElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const [powerActive, setPowerActive] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [clipReady, setClipReady] = useState(false);
  const [pointerVisible, setPointerVisible] = useState(false);

  // Search query state
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showResultsDrawer, setShowResultsDrawer] = useState(false);

  const searchQuery =
    externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;

  const updateSearchQuery = (val: string) => {
    setLocalSearchQuery(val);
    onExternalSearchChange?.(val);
    if (val.trim().length > 0) {
      setShowResultsDrawer(true);
    }
  };

  const matchedProducts = filterModasrProducts(
    MODASR_PRODUCTS,
    'all',
    searchQuery
  );

  const QUICK_TAGS = [
    { label: 'Claude Pro', query: 'Claude' },
    { label: 'Spotify', query: 'Spotify' },
    { label: 'PS5 Gift Card', query: 'PlayStation' },
    { label: 'ChatGPT Plus', query: 'ChatGPT' },
    { label: 'V2Ray VIP', query: 'V2Ray' },
  ];

  // Head-turn scrubbing logic strictly driven by the video clip without code transforms
  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!video || !stage || !frame) return;

    let objectUrl: string | null = null;
    let cancelled = false;

    // Load full clip as blob for instant zero-lag seeking
    const loadClipAsBlob = (url: string, fallbackUrl?: string) => {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load blob');
          return res.blob();
        })
        .then((blob) => {
          if (cancelled) return;
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          objectUrl = URL.createObjectURL(blob);
          video.src = objectUrl;
          video.load();
        })
        .catch(() => {
          if (cancelled) return;
          video.src = fallbackUrl || url;
          video.load();
        });
    };

    let triedFallback = false;
    const handleVideoError = () => {
      if (!triedFallback && !cancelled) {
        triedFallback = true;
        loadClipAsBlob(LUMORA_HEAD_CLIP_URL);
      }
    };

    video.addEventListener('error', handleVideoError);
    loadClipAsBlob('/assets/lumora-head-turn.mp4', LUMORA_HEAD_CLIP_URL);

    let duration = 5.04;
    let targetTime = duration * 0.5;
    let shownTime = duration * 0.5;
    let lastMoveTime = performance.now();
    let hasRevealed = false;

    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.5;
    let ringX = pointerX;
    let ringY = pointerY;

    const handleLoadedMetadata = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        duration = video.duration;
        targetTime = duration * 0.5;
        shownTime = duration * 0.5;
        try {
          video.currentTime = shownTime;
        } catch {
          // ignore
        }
      }
    };

    const handleSeeked = () => {
      if (!hasRevealed) {
        hasRevealed = true;
        setClipReady(true);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    const updateGazeFromPointer = (clientX: number, clientY: number) => {
      pointerX = clientX;
      pointerY = clientY;
      lastMoveTime = performance.now();

      const frameRect = frame.getBoundingClientRect();
      targetTime = mapPointerXToClipTime(
        clientX,
        frameRect.left,
        frameRect.width,
        duration
      );
    };

    const handlePointerMove = (e: PointerEvent) => {
      setPointerVisible(true);
      updateGazeFromPointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateGazeFromPointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateGazeFromPointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      setPointerVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('pointerleave', handlePointerLeave);

    // RAF Animation Loop: eases scrubbed time and handles idle drift
    let rafId: number;
    const tick = () => {
      const now = performance.now();
      const idleElapsed = (now - lastMoveTime) / 1000;

      if (idleElapsed > 3.5) {
        targetTime = computeIdleDriftTime(idleElapsed, duration);
      }

      shownTime = easeValue(shownTime, targetTime, 0.14);
      if (video && !video.seeking && Math.abs(video.currentTime - shownTime) > 0.018) {
        try {
          video.currentTime = Math.max(0, Math.min(duration, shownTime));
        } catch {
          // ignore seek bounds
        }
      }

      // Cursor ring tracking
      ringX = easeValue(ringX, pointerX, 0.55);
      ringY = easeValue(ringY, pointerY, 0.55);
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('pointerleave', handlePointerLeave);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const handlePushClick = () => {
    setPressing(true);
    setPowerActive((prev) => !prev);
    setTimeout(() => setPressing(false), 320);
  };

  return (
    <div
      ref={stageRef}
      dir="rtl"
      data-testid="search-hub-container"
      className="search-hub-container font-vazir relative w-full overflow-hidden"
    >
      {/* Fine Pointer Cursor */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`search-cursor-dot ${pointerVisible ? 'is-visible' : ''}`}
      />
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`search-cursor-ring ${pointerVisible ? 'is-visible' : ''}`}
      />

      {/* 1. TOP SEARCH & FILTER BAR (Pinned cleanly above, leaving character free) */}
      <div className="relative z-30 w-full max-w-2xl px-3 pt-2 sm:pt-4 flex flex-col items-center gap-2 sm:gap-2.5">
        {/* Navigation pill row (Desktop/Tablet; on mobile bottom dock provides direct navigation) */}
        <div
          data-testid="search-hub-nav-pills"
          className="hidden md:flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#060B14] border border-cyan-500/30 shadow-[0_0_24px_rgba(0,210,255,0.18)] overflow-x-auto max-w-full"
        >
          <button
            type="button"
            onClick={() => onNavigateSection?.('games')}
            className="px-3 py-1 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            گیم و بازی
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection?.('ai')}
            className="px-3 py-1 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            هوش مصنوعی
          </button>
          <div className="px-4 py-1 rounded-full text-xs font-black bg-cyan-400 text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.7)] whitespace-nowrap">
            جستجو
          </div>
          <button
            type="button"
            onClick={() => onNavigateSection?.('web')}
            className="px-3 py-1 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            اتصال و اپ
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection?.('studio')}
            className="px-3 py-1 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            حساب
          </button>
        </div>

        {/* Glowing Search Input */}
        <div className="w-full relative">
          <div
            data-testid="search-hub-input-wrapper"
            className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#060B14] border-2 border-cyan-400/80 shadow-[0_0_28px_rgba(34,211,238,0.45),inset_0_1px_3px_rgba(255,255,255,0.4)] transition-all duration-300 focus-within:border-cyan-300 focus-within:shadow-[0_0_36px_rgba(34,211,238,0.65)]"
          >
            <Search className="w-5 h-5 text-cyan-300 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              placeholder="جستجوی محصول (ChatGPT، PS5، Spotify، V2Ray...)"
              aria-label="جستجوی سریع محصولات دیجیتال"
              data-testid="search-hub-main-input"
              className="flex-1 bg-transparent text-white placeholder-white/50 text-xs sm:text-sm font-medium focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => updateSearchQuery('')}
                aria-label="پاک کردن جستجو"
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-300/35 text-[11px] font-bold text-cyan-200">
                <Sparkles className="w-3 h-3" />
                <span>۵۰+ محصول</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {QUICK_TAGS.map((tag) => {
            const isSelected =
              searchQuery.toLowerCase().includes(tag.query.toLowerCase());
            return (
              <button
                key={tag.label}
                type="button"
                data-testid={`search-tag-${tag.label.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => updateSearchQuery(tag.query)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.6)] font-bold'
                    : 'bg-slate-950/70 hover:bg-slate-900 border-white/20 text-white/85 hover:text-white hover:border-cyan-400/50'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SEARCH RESULTS OVERLAY (Only visible when user searches) */}
      {searchQuery.trim().length > 0 && showResultsDrawer && (
        <div
          data-testid="search-results-panel"
          className="relative z-40 w-full max-w-3xl px-4 mt-3 animate-scale-in"
        >
          <div className="rounded-3xl bg-[#06101D] border-2 border-cyan-400/50 shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(34,211,238,0.25)] p-4 sm:p-5 max-h-[55vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  نتایج جستجو برای «{searchQuery}»
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-black">
                  {matchedProducts.length} محصول
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowResultsDrawer(false)}
                className="text-xs text-white/70 hover:text-white flex items-center gap-1 cursor-pointer bg-white/10 px-2.5 py-1 rounded-full"
              >
                <span>مشاهده کاراکتر</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {matchedProducts.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-white/70">
                  محصولی با عبارت «{searchQuery}» یافت نشد.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {QUICK_TAGS.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => updateSearchQuery(t.query)}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-xs text-cyan-200 cursor-pointer"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                {matchedProducts.map((product, idx) => (
                  <ProductSplitCard
                    key={product.id}
                    product={product}
                    cascadeIndex={idx}
                    lang="fa"
                    usdtRate={usdtRate}
                    onAddToCart={(p) => onAddToCart?.(p)}
                    testIdPrefix="search-product-card"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. 1440x810 FRAME: CADET HERO WITH PIXEL-PERFECT ALIGNED HEAD CLIP & HELMET */}
      <div
        ref={frameRef}
        data-testid="search-cadet-frame"
        className="search-cadet-frame"
      >
        {/* Full Plate Image */}
        <img
          src="/assets/lumora-plate.jpg"
          alt="MODASR Cadet"
          referrerPolicy="no-referrer"
          className="search-cadet-plate"
          draggable={false}
        />

        {/* Head-turn video clip: Exactly (510, 255, 435x450) matching the plate without transforms */}
        <video
          ref={videoRef}
          data-testid="search-character-head-video"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`search-cadet-head-video ${clipReady ? 'is-ready' : ''}`}
        />


        {/* Real PUSH ME Button laid exactly at (675, 720, 75u) over printed chest button */}
        <button
          ref={pushBtnRef}
          type="button"
          aria-pressed={powerActive}
          onClick={handlePushClick}
          data-testid="search-character-push-btn"
          className={`search-cadet-push-btn ${pressing ? 'is-pressing' : ''} ${powerActive ? 'is-active' : ''}`}
        >
          <span>PUSH</span>
          <span>ME</span>
        </button>
      </div>

      {/* Floating Status Note at bottom (Desktop/Tablet) */}
      <div className="hidden sm:flex absolute bottom-3 inset-x-4 items-center justify-center pointer-events-none z-20">
        <div className="flex items-center gap-2 bg-[#060B14] px-3.5 py-1 rounded-full border border-cyan-400/30 text-[11px] text-cyan-200 shadow-lg">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>چرخش روان سر با حرکت لمس و ماوس · فشردن PUSH ME</span>
        </div>
      </div>
    </div>
  );
}
