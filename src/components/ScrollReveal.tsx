import { ReactNode } from 'react';
import { RevealVariant, useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  cascadeIndex?: number;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = 'slide-up',
  delayMs = 0,
  cascadeIndex,
  threshold = 0.12,
  className = '',
}: ScrollRevealProps) {
  const { ref, isVisible, revealClassName } = useScrollReveal<HTMLDivElement>(
    variant,
    {
      delayMs,
      cascadeIndex,
      threshold,
    }
  );

  return (
    <div
      ref={ref}
      data-scroll-reveal={variant}
      data-revealed={isVisible ? 'true' : 'false'}
      data-cascade-index={cascadeIndex}
      className={`${revealClassName} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
