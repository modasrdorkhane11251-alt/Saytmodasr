import { useEffect, useRef, useState } from 'react';
import { Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import {
  MODASR_PRODUCTS,
  ModasrProduct,
  convertUsdToToman,
  DEFAULT_USDT_RATE_TOMAN,
  filterModasrProducts,
} from '../utils/modasrStore';

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

interface LumoraSkyrangerHeroProps {
  onAddToCart?: (product: ModasrProduct) => void;
  usdtRate?: number;
}

export function LumoraSkyrangerHero({
  onAddToCart,
  usdtRate = DEFAULT_USDT_RATE_TOMAN,
}: LumoraSkyrangerHeroProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const pushBtnRef = useRef<HTMLButtonElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const [helmetOn, setHelmetOn] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [clipReady, setClipReady] = useState(false);
  const [pointerVisible, setPointerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const matchedProducts = filterModasrProducts(
    MODASR_PRODUCTS,
    'all',
    searchQuery
  ).slice(0, 4);

  // Entrance Web Animations Timeline
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }

    const anims: Animation[] = [];

    if (
      searchBoxRef.current &&
      typeof searchBoxRef.current.animate === 'function'
    ) {
      anims.push(
        searchBoxRef.current.animate(
          [
            {
              opacity: 0,
              filter: 'blur(10px)',
              transform: 'translateY(-18px) scale(0.96)',
            },
            {
              opacity: 1,
              filter: 'blur(0px)',
              transform: 'translateY(0) scale(1)',
            },
          ],
          {
            duration: 720,
            delay: 180,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both',
          }
        )
      );
    }

    if (pushBtnRef.current && typeof pushBtnRef.current.animate === 'function') {
      anims.push(
        pushBtnRef.current.animate(
          [
            { opacity: 0, transform: 'scale(0.35)' },
            { opacity: 1, transform: 'scale(1.06)' },
            { opacity: 1, transform: 'scale(1)' },
          ],
          {
            duration: 620,
            delay: 680,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'both',
          }
        )
      );
    }

    return () => {
      anims.forEach((a) => a.cancel());
    };
  }, []);

  // Load Head-Turn Clip via Blob URL & Scrub with Cursor + Idle Sine Drift
  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video || !stage) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) return;

    let objectUrl: string | null = null;
    let cancelled = false;

    const loadClipAsBlob = (url: string, fallbackUrl?: string) => {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error('Blob fetch failed');
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
        loadClipAsBlob('/assets/lumora-head-turn.webm');
      }
    };

    video.addEventListener('error', handleVideoError);
    loadClipAsBlob(LUMORA_HEAD_CLIP_URL, '/assets/lumora-head-turn.webm');

    let duration = 5.04;
    let targetTime = duration * 0.5;
    let shownTime = duration * 0.5;
    let lastMoveTime = performance.now();
    let hasRevealed = false;

    // Cursor coordinates
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
          // ignore initial seek error before buffer
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

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      lastMoveTime = performance.now();
      setPointerVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }

      const frameEl = frameRef.current;
      if (frameEl) {
        const rect = frameEl.getBoundingClientRect();
        targetTime = mapPointerXToClipTime(
          e.clientX,
          rect.left,
          rect.width,
          duration
        );
      }
    };

    const handlePointerLeave = () => {
      setPointerVisible(false);
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', handlePointerLeave);

    let rafId = 0;
    const tick = (now: number) => {
      const idleMs = now - lastMoveTime;
      if (idleMs > 3500) {
        const idleElapsedSec = (idleMs - 3500) * 0.001;
        targetTime = computeIdleDriftTime(idleElapsedSec, duration);
      }

      shownTime = easeValue(shownTime, targetTime, 0.14);

      if (
        video.readyState >= 2 &&
        !video.seeking &&
        Math.abs(video.currentTime - shownTime) > 0.008
      ) {
        try {
          video.currentTime = shownTime;
        } catch {
          // ignore transient seek state
        }
      }

      // Ease 44px ring toward pointer (x0.55 per frame)
      ringX = easeValue(ringX, pointerX, 0.55);
      ringY = easeValue(ringY, pointerY, 0.55);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  const handlePushClick = () => {
    setPressing(true);
    setHelmetOn((prev) => !prev);
    window.setTimeout(() => {
      setPressing(false);
    }, 320);
  };

  return (
    <div
      ref={stageRef}
      dir="ltr"
      data-testid="lumora-skyranger-stage"
      className="lumora-stage"
    >
      {/* 1440x810 (16:9) Responsive Unit Frame */}
      <div
        ref={frameRef}
        data-testid="lumora-frame"
        className="lumora-frame"
      >
        {/* Base Plate (1920x1080) */}
        <img
          src={LUMORA_PLATE_URL}
          alt="Cadet Skyranger in space suit before glowing planet horizon"
          data-testid="lumora-plate"
          className="lumora-plate"
          draggable={false}
        />

        {/* Scrubbed Head-Turn Clip (510, 255, 435x450) */}
        <video
          ref={videoRef}
          data-testid="lumora-head-clip"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`lumora-head-clip ${clipReady ? 'is-ready' : ''}`}
        />

        {/* Glass Bubble Helmet (533, 288, 360x360, mix-blend-mode: screen) */}
        <img
          src={LUMORA_HELMET_URL}
          alt=""
          aria-hidden="true"
          data-testid="lumora-helmet"
          data-helmet-on={helmetOn ? 'true' : 'false'}
          className={`lumora-helmet ${helmetOn ? 'is-on' : ''}`}
          draggable={false}
        />

        {/* Chest PUSH ME Button: 75u circle at (675, 720) */}
        <button
          ref={pushBtnRef}
          type="button"
          aria-pressed={helmetOn}
          onClick={handlePushClick}
          data-testid="lumora-push-btn"
          className={`lumora-push-btn ${pressing ? 'is-pressing' : ''}`}
        >
          <span>PUSH</span>
          <span>ME</span>
        </button>
      </div>

      {/* GREEN-CIRCLED AREA ABOVE CHARACTER HEAD: Interactive Glass Search Bar */}
      <div
        ref={searchBoxRef}
        dir="rtl"
        data-testid="lumora-hero-search-container"
        className="lumora-search-zone font-vazir"
      >
        <div className="lumora-search-box">
          <Search className="w-5 h-5 text-cyan-300 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchFocused(true);
            }}
            placeholder="جستجوی محصول (ChatGPT، PS5، Spotify، V2Ray...)"
            aria-label="جستجوی سریع محصولات دیجیتال"
            data-testid="lumora-search-input"
            className="lumora-search-input"
          />
          {searchQuery ? (
            <button
              type="button"
              aria-label="پاک کردن جستجو"
              onClick={() => setSearchQuery('')}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-400/15 border border-cyan-300/35 text-[11px] font-bold text-cyan-200 whitespace-nowrap">
              <Sparkles className="w-3 h-3" />
              <span>جستجوی هوشمند</span>
            </span>
          )}
        </div>

        {/* Quick Search Filter Tags */}
        <div className="lumora-search-tags">
          {['ChatGPT Plus', 'PS5 Gift Card', 'Spotify', 'Claude Pro', 'V2Ray VIP'].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  setSearchFocused(true);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${
                  searchQuery === tag
                    ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'bg-slate-950/65 text-slate-200 border-white/15 hover:border-cyan-400/50 hover:text-white backdrop-blur-md'
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Live Search Results Dropdown (Shown when typing or focused) */}
        {(searchQuery.trim().length > 0 || searchFocused) && (
          <div
            data-testid="lumora-search-results"
            className="lumora-search-results"
          >
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 text-[11px] text-slate-300">
              <span>
                {searchQuery.trim()
                  ? `نتایج مرتبط با «${searchQuery}»`
                  : 'محصولات پرطرفدار آماده تحویل'}
              </span>
              <button
                type="button"
                onClick={() => setSearchFocused(false)}
                className="text-cyan-300 hover:text-white font-semibold cursor-pointer"
              >
                بستن
              </button>
            </div>

            {matchedProducts.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-300">
                محصولی با این عبارت یافت نشد.
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {matchedProducts.map((prod) => {
                  const toman = convertUsdToToman(prod.priceUsd, usdtRate);
                  return (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 transition-colors"
                    >
                      <div className="min-w-0 text-right">
                        <div className="text-xs font-bold text-white truncate">
                          {prod.titleFa}
                        </div>
                        <div className="text-[11px] text-cyan-300 tabular-nums">
                          ${prod.priceUsd.toFixed(2)} ·{' '}
                          {toman.toLocaleString('fa-IR')} تومان
                        </div>
                      </div>
                      {onAddToCart && (
                        <button
                          type="button"
                          onClick={() => onAddToCart(prod)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[11px] shrink-0 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>خرید</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Ring + Dot Cursor */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        style={{ opacity: pointerVisible ? 1 : 0 }}
        className="lumora-cursor-dot hidden md:block"
      />
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        style={{ opacity: pointerVisible ? 1 : 0 }}
        className="lumora-cursor-ring hidden md:block"
      />
    </div>
  );
}
