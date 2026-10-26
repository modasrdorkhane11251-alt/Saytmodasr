import { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'slide-up'
  | 'fade-up'
  | 'scale-in'
  | 'slide-right'
  | 'slide-left'
  | 'flip-up'
  | 'blur-in'
  | 'fade-in';

export type StorefrontSectionKey =
  | 'lower-feature-block'
  | 'static-image-section'
  | 'exchange-rate'
  | 'bento-spotlights'
  | 'product-catalog'
  | 'product-grid-card'
  | 'architecture-showcase'
  | 'order-tracker'
  | 'faq-section';

export const SECTION_REVEAL_MAP: Record<StorefrontSectionKey, RevealVariant> = {
  'lower-feature-block': 'fade-up',
  'static-image-section': 'fade-up',
  'exchange-rate': 'scale-in',
  'bento-spotlights': 'flip-up',
  'product-catalog': 'slide-up',
  'product-grid-card': 'slide-up',
  'architecture-showcase': 'slide-left',
  'order-tracker': 'slide-right',
  'faq-section': 'blur-in',
};

export function getSectionRevealVariant(
  sectionKey: StorefrontSectionKey
): RevealVariant {
  return SECTION_REVEAL_MAP[sectionKey] ?? 'slide-up';
}

export interface ScrollRevealOptions {
  variant?: RevealVariant;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delayMs?: number;
  cascadeIndex?: number;
}

export const CASCADE_STEP_MS = 90;
export const MAX_CASCADE_SLOTS = 8;

/**
 * Computes the cascading stagger delay in milliseconds for a card at `index`.
 */
export function computeCascadeDelayMs(
  index: number,
  stepMs: number = CASCADE_STEP_MS,
  maxSlots: number = MAX_CASCADE_SLOTS
): number {
  const safeIndex = Math.max(0, Math.floor(index)) % Math.max(1, maxSlots);
  return safeIndex * Math.max(0, stepMs);
}

/**
 * Maps a card's cascade index (0..7) to a deterministic CSS utility class `.cascade-delay-{0..7}`.
 */
export function getCascadeDelayClassName(cascadeIndex?: number): string {
  if (typeof cascadeIndex !== 'number' || Number.isNaN(cascadeIndex)) {
    return '';
  }
  const slot = Math.max(0, Math.floor(cascadeIndex)) % MAX_CASCADE_SLOTS;
  return `cascade-delay-${slot}`;
}

export function getScrollRevealClassName(
  isVisible: boolean,
  variant: RevealVariant = 'slide-up',
  cascadeIndex?: number
): string {
  if (!isVisible) {
    return 'opacity-0 will-change-transform';
  }
  const cascadeClass = getCascadeDelayClassName(cascadeIndex);
  let animClass = 'animate-fade-up';

  switch (variant) {
    case 'slide-up':
      animClass = 'animate-slide-up';
      break;
    case 'scale-in':
      animClass = 'animate-scale-in';
      break;
    case 'slide-right':
      animClass = 'animate-slide-right';
      break;
    case 'slide-left':
      animClass = 'animate-slide-left';
      break;
    case 'flip-up':
      animClass = 'animate-flip-up';
      break;
    case 'blur-in':
      animClass = 'animate-blur-in';
      break;
    case 'fade-in':
      animClass = 'animate-fade-in';
      break;
    case 'fade-up':
    default:
      animClass = 'animate-fade-up';
      break;
  }

  return [animClass, cascadeClass, 'will-change-transform']
    .filter(Boolean)
    .join(' ');
}

export function getScrollRevealStyle(
  isVisible: boolean,
  variant: RevealVariant = 'slide-up',
  delayMs: number = 0
): {
  animationDelay?: string;
  transitionDelay?: string;
  transform?: string;
  opacity?: number;
  filter?: string;
} {
  const safeDelay = Math.max(0, delayMs);
  if (isVisible) {
    return {
      animationDelay: `${safeDelay}ms`,
      transitionDelay: `${safeDelay}ms`,
    };
  }
  switch (variant) {
    case 'slide-up':
      return {
        opacity: 0,
        transform: 'translateY(36px)',
        transitionDelay: '0ms',
      };
    case 'scale-in':
      return {
        opacity: 0,
        transform: 'scale(0.92)',
        transitionDelay: '0ms',
      };
    case 'slide-right':
      return {
        opacity: 0,
        transform: 'translateX(-32px)',
        transitionDelay: '0ms',
      };
    case 'slide-left':
      return {
        opacity: 0,
        transform: 'translateX(32px)',
        transitionDelay: '0ms',
      };
    case 'flip-up':
      return {
        opacity: 0,
        transform: 'perspective(800px) rotateX(14deg) translateY(24px)',
        transitionDelay: '0ms',
      };
    case 'blur-in':
      return {
        opacity: 0,
        transform: 'translateY(18px) scale(0.97)',
        filter: 'blur(8px)',
        transitionDelay: '0ms',
      };
    case 'fade-in':
      return {
        opacity: 0,
        transform: 'none',
        transitionDelay: '0ms',
      };
    case 'fade-up':
    default:
      return {
        opacity: 0,
        transform: 'translateY(28px)',
        transitionDelay: '0ms',
      };
  }
}

/**
 * Custom Intersection Observer hook that accepts either an animation variant string
 * (`useScrollReveal('slide-up', options)`) or an options object (`useScrollReveal({ variant: 'slide-up', ... })`).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  variantOrOptions: RevealVariant | ScrollRevealOptions = 'slide-up',
  maybeOptions: Omit<ScrollRevealOptions, 'variant'> = {}
) {
  const resolvedOptions: ScrollRevealOptions =
    typeof variantOrOptions === 'string'
      ? { ...maybeOptions, variant: variantOrOptions }
      : variantOrOptions;

  const {
    variant = 'slide-up',
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
    delayMs = 0,
    cascadeIndex,
  } = resolvedOptions;

  const effectiveDelayMs =
    typeof cascadeIndex === 'number' && delayMs === 0
      ? computeCascadeDelayMs(cascadeIndex)
      : delayMs;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true;
    }
    if (typeof window.IntersectionObserver === 'undefined') {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver === 'undefined'
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref,
    isVisible,
    variant,
    cascadeDelayMs: effectiveDelayMs,
    revealClassName: getScrollRevealClassName(isVisible, variant, cascadeIndex),
    revealStyle: getScrollRevealStyle(isVisible, variant, effectiveDelayMs),
  };
}
