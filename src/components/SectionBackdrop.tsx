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
import { ThemePresetId, getPresetById } from '../utils/themePresets';

interface SectionBackdropProps {
  activeSection: SectionId;
  activePresetId: ThemePresetId;
  isRtl: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
}

export function SectionBackdrop({
  activeSection,
  activePresetId,
  isRtl,
}: SectionBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gamingVideoRef = useRef<HTMLVideoElement | null>(null);
  const aiVideoRef = useRef<HTMLVideoElement | null>(null);
  const webVideoRef = useRef<HTMLVideoElement | null>(null);
  const preset = getPresetById(activePresetId);
  const pageTheme = getPageVisualTheme(activeSection);

  // Real-time Custom Canvas Shader & Particle Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize deterministic particle field
    const particleCount = 46;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: ((i * 137.5) % 100) * 0.01 * width,
      y: ((i * 73.1) % 100) * 0.01 * height,
      vx: ((i % 7) - 3) * 0.28 || 0.22,
      vy: ((i % 5) - 2) * 0.28 || -0.22,
      size: (i % 3) + 1.6,
      phase: i * 0.6,
    }));

    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const t = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      const focalX = isRtl ? width * 0.28 : width * 0.72;
      const focalY = height * 0.48;

      // 1. Base Volumetric Shader Gradient tailored to active page
      const radialGrad = ctx.createRadialGradient(
        focalX,
        focalY,
        20,
        focalX,
        focalY,
        Math.max(width, height) * 0.75
      );
      radialGrad.addColorStop(0, `${pageTheme.primaryHex}28`);
      radialGrad.addColorStop(0.5, `${pageTheme.secondaryHex}16`);
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Page-Specific & Preset-Specific Full-Viewport Canvas Shader Effects
      if (activeSection === 'ai') {
        // Synaptic Neural Matrix Nodes & Connections
        particles.forEach((p, i) => {
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;

          ctx.fillStyle = `${pageTheme.primaryHex}75`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 140) {
              ctx.strokeStyle = `${pageTheme.primaryHex}${Math.floor(
                (1 - dist / 140) * 34
              )
                .toString(16)
                .padStart(2, '0')}`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      } else if (activeSection === 'search' || activePresetId === 'cyber-glitch') {
        // Sapphire Holographic Catalog Cyber Grid & Scanline Bars
        ctx.strokeStyle = `${pageTheme.primaryHex}24`;
        ctx.lineWidth = 1;
        const gridSpacing = 54;
        const offset = (t * 26) % gridSpacing;
        for (let y = offset; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Animated Holographic Data Slices & Floating Diamonds
        for (let g = 0; g < 6; g++) {
          const sliceY = ((Math.sin(t * 1.9 + g * 1.7) * 0.5 + 0.5) * height) | 0;
          const sliceW = 100 + ((g * 45) % 160);
          const sliceX =
            ((Math.cos(t * 1.4 + g * 2.3) * 0.5 + 0.5) * (width - sliceW)) | 0;
          ctx.fillStyle =
            g % 2 === 0
              ? `${pageTheme.primaryHex}28`
              : `${pageTheme.secondaryHex}28`;
          ctx.fillRect(sliceX, sliceY, sliceW, 3);
        }

        particles.forEach((p) => {
          p.x = (p.x + p.vx * 0.5 + width) % width;
          p.y = (p.y + p.vy * 0.5 + height) % height;
          ctx.fillStyle = `${pageTheme.primaryHex}80`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activeSection === 'web' || activePresetId === 'cosmic-flow') {
        // Indigo Cosmic Connectivity Aurora Ribbons & Starfield
        for (let band = 0; band < 4; band++) {
          ctx.beginPath();
          ctx.strokeStyle =
            band % 2 === 0
              ? `${pageTheme.primaryHex}40`
              : `${pageTheme.secondaryHex}35`;
          ctx.lineWidth = 2.4;
          for (let x = 0; x <= width; x += 20) {
            const y =
              height * (0.22 + band * 0.18) +
              Math.sin(x * 0.003 + t * 0.9 + band * 1.4) * 55 +
              Math.cos(x * 0.007 - t * 0.6) * 25;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        particles.forEach((p) => {
          p.x = (p.x + p.vx * 0.6 + width) % width;
          p.y = (p.y + p.vy * 0.6 + height) % height;
          const alpha = Math.floor((Math.sin(t * 2 + p.phase) * 0.4 + 0.6) * 190)
            .toString(16)
            .padStart(2, '0');
          ctx.fillStyle = `${pageTheme.secondaryHex}${alpha}`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.95, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activeSection === 'games' || activePresetId === 'crimson-overdrive') {
        // Rising Crimson Ember Vortex Particles across Full Gaming Page
        particles.forEach((p) => {
          p.y = (p.y - Math.abs(p.vy) * 1.9 + height) % height;
          p.x = (p.x + Math.sin(t + p.phase) * 0.55 + width) % width;
          ctx.fillStyle = `${pageTheme.primaryHex}95`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activeSection === 'studio' || activePresetId === 'obsidian-prism') {
        // Golden VIP Account Light Beams & Prism Dust
        ctx.save();
        ctx.strokeStyle = `${pageTheme.primaryHex}26`;
        ctx.lineWidth = 52;
        for (let b = 0; b < 3; b++) {
          const beamX = focalX + (b - 1) * 140 + Math.sin(t * 0.5 + b) * 30;
          ctx.beginPath();
          ctx.moveTo(beamX - 120, 0);
          ctx.lineTo(beamX + 120, height);
          ctx.stroke();
        }
        ctx.restore();

        particles.forEach((p) => {
          p.y = (p.y - 0.35 + height) % height;
          ctx.fillStyle = `${pageTheme.primaryHex}85`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.95, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Home / Royal Emerald Command Hub — Quantum Emerald Rings & Floating Orbs
        ctx.save();
        ctx.strokeStyle = `${pageTheme.primaryHex}24`;
        ctx.lineWidth = 1.5;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(
            width * 0.5,
            height * 0.45,
            r * 130 + Math.sin(t * 0.8 + r) * 14,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
        ctx.restore();

        particles.forEach((p) => {
          p.x = (p.x + p.vx * 0.5 + width) % width;
          p.y = (p.y + p.vy * 0.5 + height) % height;
          ctx.fillStyle = `${pageTheme.primaryHex}78`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    animationFrameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    activeSection,
    activePresetId,
    pageTheme.primaryHex,
    pageTheme.secondaryHex,
    isRtl,
  ]);

  // Dedicated Video / Artwork visibility per page
  const showGamingVideo = activeSection === 'games';
  const showAiVideo = activeSection === 'ai';
  const showWebVideo = activeSection === 'web';
  const showStudioArtwork = activeSection === 'studio';

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
      style={{
        backgroundColor: pageTheme.ambientBaseHex,
        backgroundImage: pageTheme.fullPageGradient,
      }}
      className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none transition-all duration-700"
    >
      {/* 1A. Full-Viewport Gaming Video & Poster Layer (Covers Entire 'games' Page) */}
      <img
        src={HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          filter: preset.videoFilter,
          opacity: showGamingVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-700"
      />
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
          filter: preset.videoFilter,
          opacity: showGamingVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-all duration-700"
      />

      {/* 1B. Full-Viewport AI Video & Poster Layer (Covers Entire 'ai' Page) */}
      <img
        src={AI_HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          opacity: showAiVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-700"
      />
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
          opacity: showAiVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-700"
      />

      {/* 1C. Full-Viewport Web & Apps Video & Poster Layer (Covers Entire 'web' Page) */}
      <img
        src={WEB_HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          opacity: showWebVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-700"
      />
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
          opacity: showWebVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[88%_center] sm:object-[82%_center] md:object-[76%_center] lg:object-center transition-opacity duration-700"
      />

      {/* 1F. Full-Viewport Account / Studio Golden Obsidian VIP Artwork Layer ('studio') */}
      <img
        src={HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          opacity: showStudioArtwork ? 0.58 : 0,
          filter: 'hue-rotate(38deg) saturate(1.45) brightness(0.75) contrast(1.18)',
        }}
        className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-center transition-opacity duration-700"
      />

      {/* 2. Page-Tinted Atmospheric Veil (Never opaque black — keeps artwork/video vivid across the whole scroll) */}
      <div
        style={{
          background: `linear-gradient(180deg, rgba(2,6,14,0.16) 0%, ${pageTheme.ambientBaseHex}48 55%, ${pageTheme.ambientBaseHex}78 100%)`,
        }}
        className="absolute inset-0 z-[5]"
      />

      {/* 3. Real-Time Custom Canvas Shader & Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />
    </div>
  );
}
