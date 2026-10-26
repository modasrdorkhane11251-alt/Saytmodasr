import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MODASR_PRODUCTS,
  DEFAULT_USDT_RATE_TOMAN,
  convertUsdToToman,
  calculateCartSummary,
  filterModasrProducts,
  getCategoryCounts,
} from './modasrStore';

test('convertUsdToToman converts USD price using Wallex USDT rate accurately', () => {
  assert.equal(convertUsdToToman(20, 68450), 1369000);
  assert.equal(convertUsdToToman(4.5, 68450), 308025);
});

test('calculateCartSummary computes server-style totals and discount codes', () => {
  const chatgpt = MODASR_PRODUCTS.find((p) => p.id === 'chatgpt-plus')!;
  const vpn = MODASR_PRODUCTS.find((p) => p.id === 'modasr-connect')!;
  const items = [
    { product: chatgpt, quantity: 1 }, // $20
    { product: vpn, quantity: 2 }, // $4.5 * 2 = $9
  ];
  const withoutDiscount = calculateCartSummary(items, '', DEFAULT_USDT_RATE_TOMAN);
  assert.equal(withoutDiscount.subtotalUsd, 29);
  assert.equal(withoutDiscount.totalUsd, 29);
  assert.equal(withoutDiscount.discountApplied, false);

  const withModasr10 = calculateCartSummary(items, 'modasr10', DEFAULT_USDT_RATE_TOMAN);
  assert.equal(withModasr10.discountApplied, true);
  assert.equal(withModasr10.discountUsd, 2.9);
  assert.equal(withModasr10.totalUsd, 26.1);
});

test('MODASR_PRODUCTS contains all 50 comprehensive products across 5 categories', () => {
  const counts = getCategoryCounts(MODASR_PRODUCTS);
  assert.equal(counts.all, 50);
  assert.equal(counts.ai, 10);
  assert.equal(counts.ingame, 10);
  assert.equal(counts.gaming, 13);
  assert.equal(counts.subscriptions, 12);
  assert.equal(counts.vpn, 5);
});

test('filterModasrProducts filters by category, brandFilter, and Persian/English search terms', () => {
  const aiProducts = filterModasrProducts(MODASR_PRODUCTS, 'ai', '');
  assert.equal(aiProducts.length, 10);

  const ingameProducts = filterModasrProducts(MODASR_PRODUCTS, 'ingame', '');
  assert.equal(ingameProducts.length, 10);

  const steamSearch = filterModasrProducts(MODASR_PRODUCTS, 'all', 'Steam Wallet');
  assert.equal(steamSearch.length, 2);

  // Dicardo In-Game CP & UC search in Persian
  const cpSearch = filterModasrProducts(MODASR_PRODUCTS, 'all', 'سی پی کالاف');
  assert.ok(cpSearch.length >= 2);
  assert.equal(cpSearch[0].id, 'codm-cp-880');

  const ucSearch = filterModasrProducts(MODASR_PRODUCTS, 'all', 'یوسی پابجی');
  assert.ok(ucSearch.length >= 2);
  assert.equal(ucSearch[0].id, 'pubg-uc-660');

  const telegramSearch = filterModasrProducts(MODASR_PRODUCTS, 'all', 'تلگرام پرمیوم');
  assert.ok(telegramSearch.some((p) => p.id === 'telegram-premium-3m'));

  const appleIdSearch = filterModasrProducts(MODASR_PRODUCTS, 'all', 'اپل آیدی');
  assert.ok(appleIdSearch.some((p) => p.id === 'apple-id-verified'));
});
