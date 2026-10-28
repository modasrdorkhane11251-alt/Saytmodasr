import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toPersianDigits,
  formatPersianUsd,
  getCleanCardTitle,
} from './ProductSplitCard';
import { MODASR_PRODUCTS } from '../utils/modasrStore';

test('toPersianDigits and formatPersianUsd format USD with Persian digits and slash', () => {
  assert.equal(toPersianDigits('2350000'), '۲۳۵۰۰۰۰');
  assert.equal(formatPersianUsd(8.73), '≈ ۸/۷۳ دلار');
  assert.equal(formatPersianUsd(0.93), '≈ ۰/۹۳ دلار');
  assert.equal(formatPersianUsd(20), '≈ ۲۰/۰۰ دلار');
});

test('getCleanCardTitle strips parenthetical suffixes and redundant adjectives cleanly', () => {
  const chatgpt = MODASR_PRODUCTS.find((p) => p.id === 'chatgpt-plus')!;
  assert.equal(getCleanCardTitle(chatgpt, true), 'اشتراک ChatGPT Plus');
  assert.equal(getCleanCardTitle(chatgpt, false), 'ChatGPT Plus Dedicated');
});

test('VISUAL_STYLES contains 3D crystal glassGradient and accentGlow for all brand icons', async () => {
  const { VISUAL_STYLES } = await import('./ProductSplitCard');
  const brands = Object.keys(VISUAL_STYLES) as (keyof typeof VISUAL_STYLES)[];
  assert.ok(brands.length >= 20);
  for (const b of brands) {
    const style = VISUAL_STYLES[b];
    assert.ok(style.glassGradient.includes('linear-gradient'));
    assert.ok(style.glassGradient.includes('rgba'));
    assert.ok(style.accentGlow.length > 0);
  }
});

