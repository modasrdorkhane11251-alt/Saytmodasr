import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BG_IMAGE_1,
  BG_IMAGE_2,
  SPOTLIGHT_GRADIENT_STOPS,
  CORNER_PATHS,
  SHOP_ITEMS,
  COLLECTION_ITEMS,
  JOURNAL_ITEMS,
  DRAWER_HEADERS,
  CHECKERBOARD_SQUARES,
  computeSpotlightRadius,
  computeGridCellSize,
  stepSmoothCursor,
  stepParallaxOffset,
  addCartItem,
  removeCartItem,
  calculateCartTotal,
  formatAddedToastMessage,
} from './lgpsmLogic';

test('background URLs match exact specification', () => {
  assert.ok(BG_IMAGE_1.includes('hf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png'));
  assert.ok(BG_IMAGE_2.includes('hf_20260802_075145_1b557479-775b-43af-8270-f45d79d97d5a.png'));
});

test('spotlight radius clamps between 160 and 420 at 16vw', () => {
  assert.equal(computeSpotlightRadius(800), 160);
  assert.equal(computeSpotlightRadius(1440), Math.round(1440 * 0.16)); // 230
  assert.equal(computeSpotlightRadius(3000), 420);
});

test('grid cell size clamps between 36 and 64 at 2.8vw', () => {
  assert.equal(computeGridCellSize(1000), 36);
  assert.equal(computeGridCellSize(1600), Math.round(1600 * 0.028)); // 45
  assert.equal(computeGridCellSize(3000), 64);
});

test('stepSmoothCursor eases by 0.1 per frame', () => {
  const next = stepSmoothCursor({ x: 100, y: 200 }, { x: 200, y: 400 });
  assert.equal(next.x, 110);
  assert.equal(next.y, 220);
});

test('stepParallaxOffset normalizes cursor to [-0.5, 0.5] and eases toward cx*16 / cy*16 by 0.06', () => {
  // At right-bottom corner (1000, 500) on 1000x500 viewport -> cx = 0.5, cy = 0.5 -> target = (8, 8)
  const next = stepParallaxOffset({ x: 0, y: 0 }, { x: 1000, y: 500 }, 1000, 500);
  assert.ok(Math.abs(next.x - 8 * 0.06) < 1e-6);
  assert.ok(Math.abs(next.y - 8 * 0.06) < 1e-6);
});

test('spotlight gradient stops match exact 6-stop radial mask recipe', () => {
  assert.equal(SPOTLIGHT_GRADIENT_STOPS.length, 6);
  assert.deepEqual(SPOTLIGHT_GRADIENT_STOPS[0], [0, 'rgba(255,255,255,1)']);
  assert.deepEqual(SPOTLIGHT_GRADIENT_STOPS[1], [0.4, 'rgba(255,255,255,1)']);
  assert.deepEqual(SPOTLIGHT_GRADIENT_STOPS[2], [0.6, 'rgba(255,255,255,0.75)']);
  assert.deepEqual(SPOTLIGHT_GRADIENT_STOPS[3], [0.75, 'rgba(255,255,255,0.4)']);
  assert.deepEqual(SPOTLIGHT_GRADIENT_STOPS[4], [0.88, 'rgba(255,255,255,0.12)']);
  assert.deepEqual(SPOTLIGHT_GRADIENT_STOPS[5], [1, 'rgba(255,255,255,0)']);
});

test('checkerboard squares contain 4 rows of 3.8x3.8 squares with 2.25 shift on even rows', () => {
  assert.equal(CHECKERBOARD_SQUARES.length, 20);
  const row0First = CHECKERBOARD_SQUARES.find((s) => s.id === 'r0-c0')!;
  const row1First = CHECKERBOARD_SQUARES.find((s) => s.id === 'r1-c0')!;
  assert.equal(row0First.size, 3.8);
  assert.equal(row0First.x, 0);
  assert.equal(row1First.x, 2.25);
  for (const sq of CHECKERBOARD_SQUARES) {
    assert.ok(sq.x + sq.size <= 36);
    assert.ok(sq.y + sq.size <= 18);
  }
});

test('corner bracket SVG paths match specification', () => {
  assert.equal(CORNER_PATHS.tl, 'M0 11.5V0.5H11.5');
  assert.equal(CORNER_PATHS.tr, 'M0.5 0.5H11.5V11.5');
  assert.equal(CORNER_PATHS.bl, 'M0 0.5V11.5H11.5');
  assert.equal(CORNER_PATHS.br, 'M0.5 11.5H11.5V0.5');
});

test('catalog, collections, journal, and cart operations match exact copy', () => {
  assert.equal(SHOP_ITEMS.length, 4);
  assert.equal(SHOP_ITEMS[0].title, 'CYBER-TEX OVERCOAT');
  assert.equal(SHOP_ITEMS[0].price, 850);
  assert.equal(COLLECTION_ITEMS.length, 3);
  assert.equal(JOURNAL_ITEMS.length, 3);
  assert.equal(DRAWER_HEADERS.shop.title, 'Catalog');
  assert.equal(DRAWER_HEADERS.collections.title, 'Archive 2026');
  assert.equal(DRAWER_HEADERS.journal.title, 'Editorial');
  assert.equal(DRAWER_HEADERS.cart.title, 'Shopping Bag');

  let cart = addCartItem([], SHOP_ITEMS[0], 'item-1');
  cart = addCartItem(cart, SHOP_ITEMS[1], 'item-2');
  assert.equal(cart.length, 2);
  assert.equal(calculateCartTotal(cart), 1170);

  cart = removeCartItem(cart, 'item-1');
  assert.equal(cart.length, 1);
  assert.equal(calculateCartTotal(cart), 320);

  assert.equal(
    formatAddedToastMessage('CYBER-TEX OVERCOAT'),
    'Added "CYBER-TEX OVERCOAT" to your shopping bag.'
  );
});
