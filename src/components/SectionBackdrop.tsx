import { useEffect, useRef } from 'react';
import {
  AI_HERO_POSTER_URL,
  AI_HERO_VIDEO_URL,
  HERO_POSTER_URL,
  HERO_VIDEO_URL,
  WEB_HERO_POSTER_URL,
  WEB_HERO_VIDEO_URL,
  SectionId,
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
    const particleCount = 42;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: ((i * 137.5) % 100) * 0.01 * width,
      y: ((i * 73.1) % 100) * 0.01 * height,
      vx: ((i % 7) - 3) * 0.28 || 0.22,
      vy: ((i % 5) - 2) * 0.28 || -0.22,
      size: (i % 3) + 1.5,
      phase: i * 0.6,
    }));

    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const t = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      const focalX = isRtl ? width * 0.27 : width * 0.73;
      const focalY = height * 0.48;

      // 1. Base Volumetric Shader Gradient
      const radialGrad = ctx.createRadialGradient(
        focalX,
        focalY,
        20,
        focalX,
        focalY,
        Math.max(width, height) * 0.68
      );
      radialGrad.addColorStop(0, `${preset.primaryColor}22`);
      radialGrad.addColorStop(0.45, `${preset.secondaryColor}12`);
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Preset-Specific Canvas Shader Effects
      if (activePresetId === 'neural-nexus' || activeSection === 'ai') {
        // Subtle Synaptic Node Connections complementing the AI Video
        particles.forEach((p, i) => {
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;

          ctx.fillStyle = `${preset.primaryColor}65`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 135) {
              ctx.strokeStyle = `${preset.primaryColor}${Math.floor(
                (1 - dist / 135) * 28
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
      } else if (activePresetId === 'cyber-glitch') {
        // Perspective Cyber Grid & Chromatic Scanline Bars
        ctx.strokeStyle = `${preset.primaryColor}22`;
        ctx.lineWidth = 1;
        const gridSpacing = 54;
        const offset = (t * 28) % gridSpacing;
        for (let y = offset; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Animated Chromatic Glitch Slices
        for (let g = 0; g < 5; g++) {
          const sliceY = ((Math.sin(t * 2.1 + g * 1.7) * 0.5 + 0.5) * height) | 0;
          const sliceW = 90 + ((g * 45) % 160);
          const sliceX =
            ((Math.cos(t * 1.5 + g * 2.3) * 0.5 + 0.5) * (width - sliceW)) | 0;
          ctx.fillStyle =
            g % 2 === 0
              ? `${preset.primaryColor}25`
              : `${preset.secondaryColor}25`;
          ctx.fillRect(sliceX, sliceY, sliceW, 3);
        }
      } else if (activePresetId === 'cosmic-flow') {
        // Fluid Aurora Ribbons & Deep Starfield
        for (let band = 0; band < 4; band++) {
          ctx.beginPath();
          ctx.strokeStyle =
            band % 2 === 0
              ? `${preset.primaryColor}35`
              : `${preset.secondaryColor}30`;
          ctx.lineWidth = 2.2;
          for (let x = 0; x <= width; x += 20) {
            const y =
              height * (0.25 + band * 0.16) +
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
          const alpha = Math.floor((Math.sin(t * 2 + p.phase) * 0.4 + 0.6) * 180)
            .toString(16)
            .padStart(2, '0');
          ctx.fillStyle = `${preset.secondaryColor}${alpha}`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activePresetId === 'crimson-overdrive' || activeSection === 'games') {
        // Rising Ember Vortex Particles for Gaming Arena
        particles.forEach((p) => {
          p.y = (p.y - Math.abs(p.vy) * 1.9 + height) % height;
          p.x = (p.x + Math.sin(t + p.phase) * 0.55 + width) % width;
          ctx.fillStyle = `${preset.primaryColor}88`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.15, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activePresetId === 'obsidian-prism') {
        // Architectural Golden Light Beams & Prism Dust
        ctx.save();
        ctx.strokeStyle = `${preset.primaryColor}22`;
        ctx.lineWidth = 48;
        for (let b = 0; b < 3; b++) {
          const beamX = focalX + (b - 1) * 140 + Math.sin(t * 0.5 + b) * 30;
          ctx.beginPath();
          ctx.moveTo(beamX - 120, 0);
          ctx.lineTo(beamX + 120, height);
          ctx.stroke();
        }
        ctx.restore();

        particles.forEach((p) => {
          p.y = (p.y - 0.3 + height) % height;
          ctx.fillStyle = `${preset.primaryColor}75`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
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
  }, [activeSection, activePresetId, preset.primaryColor, preset.secondaryColor, isRtl]);

  // Gaming Video plays on Gaming ('games') or 'crimson-overdrive'
  const showGamingVideo =
    activeSection === 'games' || activePresetId === 'crimson-overdrive';

  // Dedicated AI Video plays on AI ('ai')
  const showAiVideo = activeSection === 'ai' && !showGamingVideo;

  // Dedicated Web & Apps Video (VPN, Telegram Premium, Apps) plays on Web ('web')
  const showWebVideo = activeSection === 'web' && !showGamingVideo && !showAiVideo;

  // Explicitly manage mobile & desktop HTML5 video playback when switching tabs
  // (Android Chrome pauses videos with opacity:0 and requires programmatic .play() when revealed)
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
              p.catch(() => {
                // Handled by user interaction fallback below
              });
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
      style={{ backgroundColor: preset.ambientBg }}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none transition-colors duration-700"
    >
      {/* 1A. Dynamic Gaming Video & Instant Poster Layer */}
      <img
        src={HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          filter: preset.videoFilter,
          opacity: showGamingVideo ? 0.92 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-[80%_center] md:object-[74%_center] lg:object-center transition-opacity duration-700"
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
        className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-[80%_center] md:object-[74%_center] lg:object-center transition-all duration-700"
      />

      {/* 1B. Dedicated Artificial Intelligence (هوش مصنوعی) Hero Video & Instant Poster Layer */}
      <img
        src={AI_HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          opacity: showAiVideo ? 0.96 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[80%_center] sm:object-[76%_center] md:object-[72%_center] lg:object-center transition-opacity duration-700"
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
          opacity: showAiVideo ? 0.96 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[80%_center] sm:object-[76%_center] md:object-[72%_center] lg:object-center transition-opacity duration-700"
      />

      {/* 1C. Dedicated Web & Apps (اتصال، وی‌پی‌ان و تلگرام پرمیوم) Hero Video & Instant Poster Layer */}
      <img
        src={WEB_HERO_POSTER_URL}
        alt=""
        aria-hidden="true"
        style={{
          opacity: showWebVideo ? 0.96 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-center transition-opacity duration-700"
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
          opacity: showWebVideo ? 0.96 : 0,
        }}
        className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-center transition-opacity duration-700"
      />

      {/* Dark Vignette Readability Guard over Gaming, AI or Web Video */}
      {(showGamingVideo || showAiVideo || showWebVideo) && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070B] via-[#04070B]/25 to-[#04070B]/55 z-[5]" />
      )}

      {/* 2. Real-Time Custom Canvas Shader & Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />
    </div>
  );
}
