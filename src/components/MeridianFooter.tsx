import { useEffect, useRef } from 'react';

export const MERIDIAN_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4';

export const MERIDIAN_TAGLINE =
  'The scenic route to shipped work. Plan, track, and deliver from town to town.';

export const MERIDIAN_NAV_ITEMS = [
  'Platform',
  'Workflows',
  'Integrations',
  'For Teams',
  'For Studios',
  'About',
  'Journal',
  'Contact',
] as const;

export function getMeridianCopyrightYear(date: Date = new Date()): string {
  return String(date.getFullYear());
}

export const MERIDIAN_GLASS_HALO_CONFIG = {
  textRemoved: true,
  glassHaloEnabled: true,
  backdropBlurPx: 22,
} as const;

export function MeridianFooter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
              }
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(video);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <footer
      className="footer"
      dir="ltr"
      data-testid="meridian-footer"
      data-glass-halo="true"
      aria-label="Engraved viaduct bridge and stagecoach glass showcase"
    >
      {/* Ambient outer glassy aura / halo behind the stagecoach & bridge */}
      <div className="footer__glass-aura" aria-hidden="true" />

      {/* Frosted glass halo capsule framing ONLY the bridge & horse stagecoach */}
      <div
        className="footer__glass-stage"
        data-testid="meridian-glass-stage"
      >
        <div className="footer__glass-halo-ring" aria-hidden="true" />
        <video
          ref={videoRef}
          className="footer__video"
          poster="/assets/meridian-viaduct-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src="/assets/meridian-viaduct.webm" type="video/webm" />
          <source src={MERIDIAN_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="footer__glass-sheen" aria-hidden="true" />
      </div>
    </footer>
  );
}
