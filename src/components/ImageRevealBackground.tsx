import { useEffect, useRef, useState } from 'react';
import {
  SPOTLIGHT_GRADIENT_STOPS,
  computeGridCellSize,
  computeSpotlightRadius,
  stepParallaxOffset,
  stepSmoothCursor,
  type Point2D,
} from '../utils/lgpsmLogic';

export function ImageRevealBackground() {
  const revealLayerRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<SVGPatternElement | null>(null);

  const [cellSize, setCellSize] = useState<number>(() =>
    typeof window !== 'undefined' ? computeGridCellSize(window.innerWidth) : 44
  );

  const mouseRef = useRef<Point2D>({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.56 : 720,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.46 : 450,
  });
  const smoothRef = useRef<Point2D>({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.56 : 720,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.46 : 450,
  });
  const gridOffsetRef = useRef<Point2D>({ x: 0, y: 0 });

  useEffect(() => {
    const offscreenCanvas = document.createElement('canvas');
    const ctx = offscreenCanvas.getContext('2d');
    let rafId = 0;
    let dirty = true;

    const syncDimensions = () => {
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      offscreenCanvas.width = w;
      offscreenCanvas.height = h;
      setCellSize(computeGridCellSize(w));
      dirty = true;
    };

    syncDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dirty = true;
    };

    const handleResize = () => {
      syncDimensions();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const renderFrame = () => {
      const w = offscreenCanvas.width;
      const h = offscreenCanvas.height;

      const prevSmooth = smoothRef.current;
      const nextSmooth = stepSmoothCursor(prevSmooth, mouseRef.current, 0.1);
      smoothRef.current = nextSmooth;

      const prevOffset = gridOffsetRef.current;
      const nextOffset = stepParallaxOffset(prevOffset, nextSmooth, w, h, 0.06);
      gridOffsetRef.current = nextOffset;

      const cursorDelta = Math.hypot(
        mouseRef.current.x - nextSmooth.x,
        mouseRef.current.y - nextSmooth.y
      );
      const offsetDelta = Math.hypot(
        nextOffset.x - prevOffset.x,
        nextOffset.y - prevOffset.y
      );

      if (patternRef.current && (dirty || offsetDelta > 0.001)) {
        patternRef.current.setAttribute('x', nextOffset.x.toFixed(2));
        patternRef.current.setAttribute('y', nextOffset.y.toFixed(2));
      }

      if (ctx && revealLayerRef.current && (dirty || cursorDelta > 0.05)) {
        const radius = computeSpotlightRadius(w);
        const cx = nextSmooth.x;
        const cy = nextSmooth.y;

        ctx.clearRect(0, 0, w, h);
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        for (const [stop, color] of SPOTLIGHT_GRADIENT_STOPS) {
          gradient.addColorStop(stop, color);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        const dataUrl = offscreenCanvas.toDataURL();
        const maskValue = `url(${dataUrl})`;
        revealLayerRef.current.style.maskImage = maskValue;
        revealLayerRef.current.style.webkitMaskImage = maskValue;
        revealLayerRef.current.style.maskSize = '100% 100%';
        revealLayerRef.current.style.webkitMaskSize = '100% 100%';
        dirty = false;
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      data-testid="image-reveal-background"
      aria-hidden="true"
      className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 1. Base layer: BG_IMAGE_1 full bleed */}
      <div className="absolute inset-0 lgpsm-bg-base" />

      {/* 2. Reveal layer: BG_IMAGE_2 full bleed, clipped by offscreen canvas radial spotlight mask */}
      <div
        ref={revealLayerRef}
        data-testid="image-reveal-layer"
        className="absolute inset-0 lgpsm-bg-reveal"
      />

      {/* 3. Subtle SVG grid overlay at opacity 0.10, stroke #64748b, strokeWidth 0.6 */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            ref={patternRef}
            id="lgpsm-parallax-grid"
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lgpsm-parallax-grid)" />
      </svg>
    </div>
  );
}
