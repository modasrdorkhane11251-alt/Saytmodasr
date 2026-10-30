import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DASHBOARD_ACCORDION_CATEGORIES,
  MODASR_BLOG_POSTS,
  resolveDashboardProduct,
} from './dashboardCatalog';

test('DASHBOARD_ACCORDION_CATEGORIES defines all 7 Permio-inspired MODASR service categories', () => {
  assert.equal(DASHBOARD_ACCORDION_CATEGORIES.length, 7);
  const ids = DASHBOARD_ACCORDION_CATEGORIES.map((c) => c.id);
  assert.deepEqual(ids, [
    'international-websites',
    'virtual-numbers-esim',
    'international-cards-accounts',
    'gift-cards',
    'games-and-coins',
    'advertising-services',
    'cashout-income',
  ]);
});

test('resolveDashboardProduct resolves every actionable item in DASHBOARD_ACCORDION_CATEGORIES to a valid ModasrProduct', () => {
  for (const cat of DASHBOARD_ACCORDION_CATEGORIES) {
    for (const item of cat.items) {
      if (item.productId) {
        const product = resolveDashboardProduct(item.productId);
        assert.ok(product.id, `Expected valid product id for ${item.id}`);
        assert.ok(product.titleFa.length > 0, `Expected Persian title for ${item.id}`);
        assert.ok(product.priceUsd > 0, `Expected positive priceUsd for ${item.id}`);
      }
    }
  }
});

test('MODASR_BLOG_POSTS contains all 6 branded blog guides with valid related products', () => {
  assert.equal(MODASR_BLOG_POSTS.length, 6);
  for (const post of MODASR_BLOG_POSTS) {
    const related = resolveDashboardProduct(post.relatedProductId);
    assert.ok(related.id, `Expected valid related product for blog ${post.id}`);
    assert.ok(post.titleFa.length > 0);
  }
});
