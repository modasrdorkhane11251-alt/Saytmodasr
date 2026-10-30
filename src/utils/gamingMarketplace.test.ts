import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GAMING_MAIN_CATEGORIES,
  GAMING_PLATFORMS,
  POPULAR_GAMING_SEARCH_CHIPS,
  buildCustomizedGamingCartProduct,
  buildGamingCatalog,
  filterGamingCatalog,
  getGamingCategoryCounts,
  getGamingSearchSuggestions,
  validateTopUpDeliveryFields,
} from './gamingMarketplace';
import { getProductPurchaseTypes } from './modasrStore';

test('GAMING_MAIN_CATEGORIES defines the 4 primary gaming categories (Games, Top-Ups, Accounts, Items & Services)', () => {
  assert.equal(GAMING_MAIN_CATEGORIES.length, 4);
  assert.deepEqual(
    GAMING_MAIN_CATEGORIES.map((c) => c.id),
    ['games', 'topups', 'accounts', 'items-services']
  );
  assert.deepEqual(
    GAMING_MAIN_CATEGORIES.map((c) => c.code),
    ['A', 'B', 'C', 'D']
  );
  assert.equal(GAMING_PLATFORMS.length, 6);
  assert.deepEqual(
    GAMING_PLATFORMS.map((p) => p.id),
    ['all', 'mobile', 'pc', 'playstation', 'xbox', 'switch']
  );
});

test('buildGamingCatalog classifies products into the 4 categories with zero password prompts for UID top-ups', () => {
  const catalog = buildGamingCatalog();
  assert.ok(catalog.length >= 25);

  const counts = getGamingCategoryCounts(catalog);
  assert.ok(counts.games >= 8, 'Games category should have at least 8 items');
  assert.ok(counts.topups >= 10, 'Top-Ups category should have at least 10 items');
  assert.equal(counts.accounts, 5, 'Accounts category should have 5 verified capacity/game accounts');
  assert.ok(counts['items-services'] >= 12, 'Items & Services category should have at least 12 items');

  // Verify no top-up item asks for an account password
  const topups = filterGamingCatalog(catalog, { category: 'topups' });
  for (const item of topups) {
    assert.equal(item.requiresPassword, false);
    assert.ok(
      !item.requiredCustomerFields.some((f) =>
        f.labelFa.includes('رمز') || f.labelEn.toLowerCase().includes('password')
      )
    );
  }

  // Verify Gaming Accounts include full metadata, screenshots, and publisher policy warnings
  const accounts = filterGamingCatalog(catalog, { category: 'accounts' });
  assert.equal(accounts.length, 5);
  for (const acc of accounts) {
    assert.ok(acc.accountMeta, `Account ${acc.id} must have accountMeta`);
    assert.ok(acc.accountMeta.highlightsFa.length >= 3);
    assert.ok(acc.accountMeta.screenshots.length >= 2);
    assert.ok(acc.accountMeta.policyWarningFa.includes('هشدار'));
  }
});

test('filterGamingCatalog supports secondary platform filters, genre filters, price sorting, and active/inactive state', () => {
  const catalog = buildGamingCatalog();

  // Category A: Games filtered by secondary platforms
  const allGames = filterGamingCatalog(catalog, { category: 'games', platform: 'all' });
  assert.ok(allGames.length >= 8);

  const psGames = filterGamingCatalog(catalog, { category: 'games', platform: 'playstation' });
  assert.ok(psGames.some((i) => i.id === 'ps5-fc25-capacity'));
  assert.ok(psGames.some((i) => i.id === 'ps5-exclusives-capacity'));

  const pcGames = filterGamingCatalog(catalog, { category: 'games', platform: 'pc' });
  assert.ok(pcGames.some((i) => i.id === 'steam-wallet-20'));
  assert.ok(pcGames.some((i) => i.id === 'ps5-elden-wukong-capacity'));

  const switchGames = filterGamingCatalog(catalog, { category: 'games', platform: 'switch' });
  assert.ok(switchGames.some((i) => i.id === 'nintendo-eshop-20'));

  // Sort by price ascending and descending
  const asc = filterGamingCatalog(catalog, { category: 'games', sortBy: 'price-asc' });
  const desc = filterGamingCatalog(catalog, { category: 'games', sortBy: 'price-desc' });
  assert.ok(asc[0].product.priceUsd <= asc[asc.length - 1].product.priceUsd);
  assert.ok(desc[0].product.priceUsd >= desc[desc.length - 1].product.priceUsd);

  // Toggling an item inactive hides it from public catalog unless includeInactive is true
  const modified = catalog.map((item, idx) =>
    idx === 0 ? { ...item, active: false } : item
  );
  const publicOnly = filterGamingCatalog(modified);
  const withInactive = filterGamingCatalog(modified, { includeInactive: true });
  assert.equal(publicOnly.length, catalog.length - 1);
  assert.equal(withInactive.length, catalog.length);
});

test('Smart Search handles English and Persian gaming queries and live suggestions', () => {
  const catalog = buildGamingCatalog();

  const queries = [
    { q: 'Call of Duty Mobile CP', expectedId: 'codm-cp-880' },
    { q: 'Clash of Clans Gems', expectedId: 'clash-royale-pass' },
    { q: 'PUBG Mobile UC', expectedId: 'pubg-uc-660' },
    { q: 'GTA V PC', expectedId: 'ps5-gta-rdr-capacity' },
    { q: 'PS5 games', expectedId: 'ps5-fc25-capacity' },
    { q: 'Gaming accounts', expectedId: 'ps5-fc25-capacity' },
    { q: 'سی پی کالاف', expectedId: 'codm-cp-880' },
    { q: 'یوسی پابجی', expectedId: 'pubg-uc-660' },
  ];

  for (const { q, expectedId } of queries) {
    const results = filterGamingCatalog(catalog, { searchQuery: q });
    assert.ok(
      results.some((r) => r.id === expectedId),
      `Query "${q}" should match product "${expectedId}"`
    );
  }

  const suggestions = getGamingSearchSuggestions(catalog, 'Call of Duty');
  assert.ok(suggestions.length >= 2);
  assert.equal(suggestions[0].id, 'codm-cp-880');

  const emptySuggestions = getGamingSearchSuggestions(catalog, 'xyznonexistent999');
  assert.equal(emptySuggestions.length, 0);
  assert.equal(POPULAR_GAMING_SEARCH_CHIPS.length, 6);
});

test('validateTopUpDeliveryFields and buildCustomizedGamingCartProduct validate required Player ID and build cart item', () => {
  const catalog = buildGamingCatalog();
  const pubg = catalog.find((i) => i.id === 'pubg-uc-660')!;

  // Missing required player_uid fails validation
  const invalidCheck = validateTopUpDeliveryFields(pubg.requiredCustomerFields, {
    player_uid: '   ',
  });
  assert.equal(invalidCheck.valid, false);
  assert.equal(invalidCheck.missingLabelsFa.length, 1);

  // Providing player_uid passes validation
  const validCheck = validateTopUpDeliveryFields(pubg.requiredCustomerFields, {
    player_uid: '5192837465',
    server_region: 'Global_Player',
  });
  assert.equal(validCheck.valid, true);
  assert.equal(validCheck.missingLabelsFa.length, 0);
  assert.ok(validCheck.formattedSummary.includes('5192837465'));

  const pTypes = getProductPurchaseTypes(pubg.product);
  const pkg = pTypes[0].packages[0];
  const cartProduct = buildCustomizedGamingCartProduct(pubg, pkg, {
    player_uid: '5192837465',
    server_region: 'Global',
  });
  assert.ok(cartProduct.titleFa.includes('5192837465'));
  assert.equal(cartProduct.priceUsd, pkg.priceUsd);
});
