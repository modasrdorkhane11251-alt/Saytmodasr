import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SECTION_REVEAL_MAP,
  computeCascadeDelayMs,
  getCascadeDelayClassName,
  getScrollRevealClassName,
  getScrollRevealStyle,
  getSectionRevealVariant,
} from './useScrollReveal';

test('getScrollRevealClassName returns distinct animation classes including slide-up and cascade delay classes', () => {
  assert.equal(
    getScrollRevealClassName(false, 'slide-up'),
    'opacity-0 will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'slide-up'),
    'animate-slide-up will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'slide-up', 2),
    'animate-slide-up cascade-delay-2 will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'fade-up'),
    'animate-fade-up will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'scale-in'),
    'animate-scale-in will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'slide-right'),
    'animate-slide-right will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'slide-left'),
    'animate-slide-left will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'flip-up'),
    'animate-flip-up will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'blur-in'),
    'animate-blur-in will-change-transform'
  );
  assert.equal(
    getScrollRevealClassName(true, 'fade-in'),
    'animate-fade-in will-change-transform'
  );
});

test('computeCascadeDelayMs and getCascadeDelayClassName compute staggered product card cascade slots', () => {
  assert.equal(computeCascadeDelayMs(0), 0);
  assert.equal(computeCascadeDelayMs(1), 90);
  assert.equal(computeCascadeDelayMs(3), 270);
  assert.equal(computeCascadeDelayMs(7), 630);
  assert.equal(computeCascadeDelayMs(8), 0); // wraps modulo 8

  assert.equal(getCascadeDelayClassName(), '');
  assert.equal(getCascadeDelayClassName(0), 'cascade-delay-0');
  assert.equal(getCascadeDelayClassName(3), 'cascade-delay-3');
  assert.equal(getCascadeDelayClassName(9), 'cascade-delay-1');
});

test('getScrollRevealStyle computes initial transform and staggered animationDelay for all variants including slide-up', () => {
  const hiddenSlideUp = getScrollRevealStyle(false, 'slide-up', 180);
  assert.equal(hiddenSlideUp.opacity, 0);
  assert.equal(hiddenSlideUp.transform, 'translateY(36px)');

  const hiddenFadeUp = getScrollRevealStyle(false, 'fade-up', 120);
  assert.equal(hiddenFadeUp.opacity, 0);
  assert.equal(hiddenFadeUp.transform, 'translateY(28px)');

  const hiddenScaleIn = getScrollRevealStyle(false, 'scale-in', 80);
  assert.equal(hiddenScaleIn.opacity, 0);
  assert.equal(hiddenScaleIn.transform, 'scale(0.92)');

  const hiddenSlideRight = getScrollRevealStyle(false, 'slide-right', 60);
  assert.equal(hiddenSlideRight.transform, 'translateX(-32px)');

  const hiddenSlideLeft = getScrollRevealStyle(false, 'slide-left', 60);
  assert.equal(hiddenSlideLeft.transform, 'translateX(32px)');

  const hiddenFlipUp = getScrollRevealStyle(false, 'flip-up', 100);
  assert.equal(
    hiddenFlipUp.transform,
    'perspective(800px) rotateX(14deg) translateY(24px)'
  );

  const hiddenBlurIn = getScrollRevealStyle(false, 'blur-in', 100);
  assert.equal(hiddenBlurIn.filter, 'blur(8px)');

  const visibleStaggered = getScrollRevealStyle(true, 'slide-up', 270);
  assert.equal(visibleStaggered.animationDelay, '270ms');
  assert.equal(visibleStaggered.transitionDelay, '270ms');
});

test('getSectionRevealVariant assigns slide-up to product-catalog and product-grid-card and distinct animations to each storefront section', () => {
  assert.equal(getSectionRevealVariant('lower-feature-block'), 'fade-up');
  assert.equal(getSectionRevealVariant('static-image-section'), 'fade-up');
  assert.equal(getSectionRevealVariant('exchange-rate'), 'scale-in');
  assert.equal(getSectionRevealVariant('bento-spotlights'), 'flip-up');
  assert.equal(getSectionRevealVariant('product-catalog'), 'slide-up');
  assert.equal(getSectionRevealVariant('product-grid-card'), 'slide-up');
  assert.equal(getSectionRevealVariant('architecture-showcase'), 'slide-left');
  assert.equal(getSectionRevealVariant('order-tracker'), 'slide-right');
  assert.equal(getSectionRevealVariant('faq-section'), 'blur-in');
  assert.equal(Object.keys(SECTION_REVEAL_MAP).length, 9);
});
