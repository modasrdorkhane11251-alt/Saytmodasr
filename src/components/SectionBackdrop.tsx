import { useEffect, useRef } from 'react';
import {
  AI_HERO_POSTER_URL,
  AI_HERO_VIDEO_URL,
  HERO_POSTER_URL,
  HERO_VIDEO_URL,
  WEB_HERO_POSTER_URL,
  WEB_HERO_VIDEO_URL,
  SectionId,
  getPageVisualTheme,
} from '../utils/heroConfig';
import { ThemePresetId } from '../utils/themePresets';

interface SectionBackdropProps {
  activeSection: SectionId;
  activePresetId: ThemePresetId;
  isRtl: boolean;
}

export function SectionBackdrop({
  activeSection,
  activePresetId,
}: SectionBackdropProps) {
  const gamingVideoRef = useRef<HTMLVideoElement | null>(null);
  const aiVideoRef = useRef<HTMLVideoElement | null>(null);
  const webVideoRef = useRef<HTMLVideoElement | null>(null);
  const pageTheme = getPageVisualTheme(activeSection);

  // Videos ONLY on their dedicated category pages ('games', 'ai', 'web') — NO video on 'home' or 'studio'
  const showGamingVideo = activeSection === 'games';
  const showAiVideo = activeSection === 'ai';
  const showWebVideo = activeSection === 'web';

  const isHomeBackdrop = activeSection === 'home' || activeSection === 'search';
  const isAccountBackdrop = activeSection === 'studio';

  // Explicitly manage mobile & desktop HTML5 video playback when switching tabs
  useEffect(() => {
    const syncVideoPlayback = () => {
      const entries: Array<{ el: HTMLVideoElement | null; active: boolean }> = [
        { el: gamingVideoRef.current, active: showGamingVideo },
        { el: aiVideoRef.current, active: showAiVideo },
        { el: webVideoRef.current, active: showWebVideo },
      ];

      entries.forEach(({ el, active }) => {
        if (!el) return;
        el.muted = true;
        el.defaultMuted = true;
        el.setAttribute('playsinline', '');
        el.setAttribute('webkit-playsinline', '');
        if (active) {
          if (el.paused) {
            const p = el.play();
            if (p !== undefined) {
              p.catch(() => {});
            }
          }
        } else if (!el.paused) {
          el.pause();
        }
      });
    };

    syncVideoPlayback();

    const handleUserWake = () => syncVideoPlayback();
    window.addEventListener('touchstart', handleUserWake, { passive: true });
    window.addEventListener('click', handleUserWake, { passive: true });
    document.addEventListener('visibilitychange', handleUserWake);

    return () => {
      window.removeEventListener('touchstart', handleUserWake);
      window.removeEventListener('click', handleUserWake);
      document.removeEventListener('visibilitychange', handleUserWake);
    };
  }, [showGamingVideo, showAiVideo, showWebVideo]);

  return (
    <div
      data-testid="section-backdrop"
      data-active-section={activeSection}
      data-theme-preset={activePresetId}
      data-page-theme={pageTheme.id}
      className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-[#070b14]"
    >
      {/* =====================================================================
          A. BESPOKE LUXURY PRISMATIC AURORA BACKDROP FOR HOME ('home' / 'search')
             Designed specifically to make transparent white glass cards glow
      ====================================================================== */}
      <div
        data-testid="home-luxury-backdrop"
        style={{ opacity: isHomeBackdrop ? 1 : 0 }}
        className="absolute inset-0 w-full h-full transition-opacity duration-700"
      >
        {/* Base Deep Midnight-Sapphire & Velvet Indigo Mesh */}
        <div
          style={{
            background:
              'radial-gradient(125% 95% at 15% 10%, #132a4a 0%, #0b1528 45%, #060a14 100%)',
          }}
          className="absolute inset-0"
        />

        {/* Ambient Aurora Silk Domes (Teal Cyan, Royal Violet, Rose Coral, and Warm Sky) */}
        <div
          style={{
            background:
              'radial-gradient(circle at 82% 18%, rgba(0, 245, 212, 0.34) 0%, rgba(56, 189, 248, 0.16) 32%, transparent 65%)',
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            background:
              'radial-gradient(circle at 18% 48%, rgba(99, 102, 241, 0.36) 0%, rgba(168, 85, 247, 0.18) 36%, transparent 68%)',
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            background:
              'radial-gradient(circle at 75% 82%, rgba(244, 63, 94, 0.26) 0%, rgba(251, 146, 60, 0.12) 35%, transparent 65%)',
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.07) 0%, transparent 60%)',
          }}
          className="absolute inset-0"
        />

        {/* Subtle Architectural Glass Horizon Rings & Perspective Grid */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-40"
        >
          <defs>
            <linearGradient id="homeArcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="homeArcGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id="homeOrbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft Luminous Glass Bokeh Sphere Top-Right */}
          <circle cx="1140" cy="210" r="240" fill="url(#homeOrbGlow)" />
          {/* Soft Luminous Glass Bokeh Sphere Center-Left */}
          <circle cx="290" cy="490" r="280" fill="url(#homeOrbGlow)" />

          {/* Sweeping Architectural Light Curves */}
          <ellipse
            cx="720"
            cy="450"
            rx="620"
            ry="290"
            fill="none"
            stroke="url(#homeArcGrad1)"
            strokeWidth="1.2"
            transform="rotate(-11 720 450)"
          />
          <ellipse
            cx="720"
            cy="450"
            rx="460"
            ry="210"
            fill="none"
            stroke="url(#homeArcGrad2)"
            strokeWidth="1"
            strokeDasharray="8 10"
            transform="rotate(9 720 450)"
          />
          <path
            d="M -100,680 C 360,510 1080,820 1540,560"
            fill="none"
            stroke="url(#homeArcGrad1)"
            strokeWidth="1.5"
          />
          <path
            d="M -100,260 C 420,440 980,120 1540,340"
            fill="none"
            stroke="url(#homeArcGrad2)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* =====================================================================
          B. BESPOKE ROYAL CHAMPAGNE & EMERALD VAULT BACKDROP FOR ACCOUNT ('studio')
             Executive VIP Lounge aesthetic with warm gold & emerald light domes
      ====================================================================== */}
      <div
        data-testid="account-luxury-backdrop"
        style={{ opacity: isAccountBackdrop ? 1 : 0 }}
        className="absolute inset-0 w-full h-full transition-opacity duration-700"
      >
        {/* Base Royal Obsidian & Deep Velvet Plum-Onyx Canvas */}
        <div
          style={{
            background:
              'radial-gradient(120% 95% at 80% 12%, #241934 0%, #111322 48%, #070810 100%)',
          }}
          className="absolute inset-0"
        />

        {/* Warm Champagne Gold, Imperial Emerald & Soft Rose Light Domes */}
        <div
          style={{
            background:
              'radial-gradient(circle at 78% 20%, rgba(251, 191, 36, 0.32) 0%, rgba(245, 158, 11, 0.14) 34%, transparent 66%)',
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            background:
              'radial-gradient(circle at 20% 62%, rgba(16, 185, 129, 0.28) 0%, rgba(20, 184, 166, 0.14) 36%, transparent 68%)',
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            background:
              'radial-gradient(circle at 65% 85%, rgba(139, 92, 246, 0.26) 0%, rgba(236, 72, 153, 0.12) 35%, transparent 65%)',
          }}
          className="absolute inset-0"
        />

        {/* Precision Swiss-Chronograph / VIP Vault Geometric Rings */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-45"
        >
          <defs>
            <linearGradient id="vipGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id="vipCrownGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="1060" cy="240" r="290" fill="url(#vipCrownGlow)" />
          <circle cx="360" cy="640" r="260" fill="url(#vipCrownGlow)" />

          {/* Concentric VIP Dial Rings */}
          <circle
            cx="1060"
            cy="240"
            r="190"
            fill="none"
            stroke="url(#vipGoldGrad)"
            strokeWidth="1.2"
          />
          <circle
            cx="1060"
            cy="240"
            r="250"
            fill="none"
            stroke="url(#vipGoldGrad)"
            strokeWidth="1"
            strokeDasharray="6 12"
          />
          <circle
            cx="360"
            cy="640"
            r="180"
            fill="none"
            stroke="url(#vipGoldGrad)"
            strokeWidth="1.1"
            strokeDasharray="10 8"
          />
          <path
            d="M -60,540 Q 720,240 1500,620"
            fill="none"
            stroke="url(#vipGoldGrad)"
            strokeWidth="1.3"
          />
        </svg>
      </div>

      {/* =====================================================================
          1. Full-Viewport High-Quality Gaming Video Layer (ONLY on 'games')
      ====================================================================== */}
      <video
        ref={gamingVideoRef}
        data-testid="gaming-hero-video"
        src={HERO_VIDEO_URL}
        poster={HERO_POSTER_URL}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        style={{
          opacity: showGamingVideo ? 1 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-500"
      />

      {/* =====================================================================
          2. Full-Viewport High-Quality AI Video Layer (ONLY on 'ai')
      ====================================================================== */}
      <video
        ref={aiVideoRef}
        data-testid="ai-hero-video"
        src={AI_HERO_VIDEO_URL}
        poster={AI_HERO_POSTER_URL}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        style={{
          opacity: showAiVideo ? 1 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-500"
      />

      {/* =====================================================================
          3. Full-Viewport High-Quality Web & Apps Video Layer (ONLY on 'web')
      ====================================================================== */}
      <video
        ref={webVideoRef}
        data-testid="web-hero-video"
        src={WEB_HERO_VIDEO_URL}
        poster={WEB_HERO_POSTER_URL}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        style={{
          opacity: showWebVideo ? 1 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-500"
      />
    </div>
  );
}


