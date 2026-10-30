import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MODASR_PRODUCTS,
  DEFAULT_USDT_RATE_TOMAN,
  POPULAR_HOME_HASHTAGS,
  convertUsdToToman,
  calculateCartSummary,
  filterModasrProducts,
  filterGamingHubProducts,
  filterAppHubProducts,
  getCategoryCounts,
  getGamingHubSections,
  getAppHubSections,
  getHomeCategorizedSections,
  getProductPackages,
  getProductPurchaseTypes,
  filterProductPackages,
  getDicardoCardTitles,
  getUnifiedBrandProducts,
  getProductCapabilities,
  getProductFaqs,
  createPackageCartProduct,
  isCapacityAccountProduct,
  isGamingDeviceProduct,
  isControllerProduct,
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

test('MODASR_PRODUCTS contains all 60 comprehensive products with pure gaming items and 5-platform OS/controller coverage', () => {
  const counts = getCategoryCounts(MODASR_PRODUCTS);
  assert.equal(counts.all, 60);
  assert.equal(counts.ai, 10);
  assert.equal(counts.ingame, 10);
  assert.equal(counts.gaming, 21);
  assert.equal(counts.subscriptions, 14);
  assert.equal(counts.vpn, 5);

  // Verify no non-gaming Apple iCloud/Music or general Google Play items exist in gaming or ingame
  const allGamingItems = MODASR_PRODUCTS.filter(
    (p) => p.category === 'gaming' || p.category === 'ingame'
  );
  assert.equal(allGamingItems.length, 31);
  assert.ok(!allGamingItems.some((p) => p.id.startsWith('apple-giftcard')));
  assert.ok(!allGamingItems.some((p) => p.id === 'google-play-10'));

  // Verify dedicated controller products exist for PS5, Xbox/Windows, and iPhone/Android
  const controllers = MODASR_PRODUCTS.filter((p) => isControllerProduct(p));
  assert.equal(controllers.length, 3);
  assert.deepEqual(
    controllers.map((p) => p.id),
    [
      'gaming-controller-dualsense',
      'gaming-controller-xbox-windows',
      'gaming-controller-mobile-iphone-android',
    ]
  );
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

test('getHomeCategorizedSections returns Permio-style categorized Home sections with valid products', () => {
  const sections = getHomeCategorizedSections(MODASR_PRODUCTS);
  assert.equal(sections.length, 6);
  const sectionIds = sections.map((s) => s.id);
  assert.deepEqual(sectionIds, [
    'ai-services',
    'telegram-social',
    'gift-cards',
    'ingame-coins',
    'music-video',
    'graphics-vpn',
  ]);
  for (const sec of sections) {
    assert.ok(sec.products.length >= 5, `Section ${sec.id} should have at least 5 products`);
    assert.ok(sec.titleFa.length > 0);
    assert.ok(sec.kickerFa.length > 0);
  }
  assert.equal(POPULAR_HOME_HASHTAGS.length, 12);
});

test('getGamingHubSections and filterGamingHubProducts organize gaming products across PlayStation, Xbox, Windows, Android, and iPhone', () => {
  const shelves = getGamingHubSections(MODASR_PRODUCTS);
  assert.equal(shelves.length, 4);
  assert.deepEqual(
    shelves.map((s) => s.id),
    ['capacity-accounts', 'gaming-devices', 'mobile-ingame', 'console-subs-giftcards']
  );

  // Capacity accounts shelf has 7 products (5 AAA game capacity accounts + PS Plus Extra + Xbox GamePass Home)
  const capacityShelf = shelves.find((s) => s.id === 'capacity-accounts')!;
  assert.equal(capacityShelf.products.length, 7);
  assert.equal(
    capacityShelf.products.filter((p) => isCapacityAccountProduct(p)).length,
    5
  );

  // Gaming devices shelf has 6 products (including DualSense, Xbox+Windows controller, and iPhone+Android Backbone/Kishi)
  const devicesShelf = shelves.find((s) => s.id === 'gaming-devices')!;
  assert.equal(devicesShelf.products.length, 6);
  assert.ok(devicesShelf.products.every((p) => isGamingDeviceProduct(p)));

  // Filter by subCategory and 5 platforms (ps5, xbox, windows, android, iphone)
  const ps5Capacity = filterGamingHubProducts(MODASR_PRODUCTS, 'capacity', 'ps5', '');
  assert.equal(ps5Capacity.length, 6);

  const hardwareOnly = filterGamingHubProducts(MODASR_PRODUCTS, 'devices', 'devices', '');
  assert.equal(hardwareOnly.length, 6);

  const windowsGaming = filterGamingHubProducts(MODASR_PRODUCTS, 'all', 'windows', '');
  assert.ok(windowsGaming.some((p) => p.id === 'gaming-controller-xbox-windows'));
  assert.ok(windowsGaming.some((p) => p.id === 'gaming-controller-dualsense'));
  assert.ok(windowsGaming.some((p) => p.id === 'steam-wallet-20'));

  const androidGaming = filterGamingHubProducts(MODASR_PRODUCTS, 'all', 'android', '');
  assert.ok(androidGaming.some((p) => p.id === 'gaming-controller-mobile-iphone-android'));
  assert.ok(androidGaming.some((p) => p.id === 'codm-cp-880'));

  const iphoneGaming = filterGamingHubProducts(MODASR_PRODUCTS, 'all', 'iphone', '');
  assert.ok(iphoneGaming.some((p) => p.id === 'gaming-controller-mobile-iphone-android'));
  assert.ok(iphoneGaming.some((p) => p.id === 'gaming-controller-dualsense'));
  assert.ok(iphoneGaming.some((p) => p.id === 'codm-cp-880'));

  const ingameOnly = filterGamingHubProducts(MODASR_PRODUCTS, 'ingame', 'mobile', '');
  assert.equal(ingameOnly.length, 10);
  assert.ok(ingameOnly.every((p) => p.category === 'ingame'));
});

test('getAppHubSections and filterAppHubProducts organize App & Connectivity hub across Windows, Android, iPhone, Xbox, PlayStation, and Controllers', () => {
  const shelves = getAppHubSections(MODASR_PRODUCTS);
  assert.equal(shelves.length, 4);
  assert.deepEqual(
    shelves.map((s) => s.id),
    ['platform-os-apps', 'multiplatform-controllers', 'vpn-static-ip-dns', 'streaming-design-apps']
  );

  // Verify all 5 platforms filter accurately in App Hub
  const winApps = filterAppHubProducts(MODASR_PRODUCTS, 'all', 'windows', '');
  assert.ok(winApps.some((p) => p.id === 'windows-microsoft-365-pro'));
  assert.ok(winApps.some((p) => p.id === 'gaming-controller-xbox-windows'));

  const androidApps = filterAppHubProducts(MODASR_PRODUCTS, 'all', 'android', '');
  assert.ok(androidApps.some((p) => p.id === 'google-play-android-pro'));
  assert.ok(androidApps.some((p) => p.id === 'gaming-controller-mobile-iphone-android'));

  const iphoneApps = filterAppHubProducts(MODASR_PRODUCTS, 'all', 'iphone', '');
  assert.ok(iphoneApps.some((p) => p.id === 'apple-id-verified'));
  assert.ok(iphoneApps.some((p) => p.id === 'gaming-controller-mobile-iphone-android'));

  const xboxApps = filterAppHubProducts(MODASR_PRODUCTS, 'all', 'xbox', '');
  assert.ok(xboxApps.some((p) => p.id === 'xbox-gamepass-ultimate'));
  assert.ok(xboxApps.some((p) => p.id === 'gaming-controller-xbox-windows'));

  const ps5Apps = filterAppHubProducts(MODASR_PRODUCTS, 'all', 'ps5', '');
  assert.ok(ps5Apps.some((p) => p.id === 'playstation-plus-extra'));
  assert.ok(ps5Apps.some((p) => p.id === 'gaming-controller-dualsense'));

  const controllersInApp = filterAppHubProducts(MODASR_PRODUCTS, 'all', 'controllers', '');
  assert.equal(controllersInApp.length, 4);
});

test('getProductPackages, getProductCapabilities, and createPackageCartProduct generate Dicardo-style panels and capabilities for all 60 products', () => {
  for (const product of MODASR_PRODUCTS) {
    const packages = getProductPackages(product);
    assert.ok(packages.length >= 4, `Product ${product.id} must have at least 4 packages`);
    for (const pkg of packages) {
      assert.ok(pkg.priceUsd > 0);
      assert.ok(pkg.titleFa.length > 0);
      assert.ok(pkg.deliveryMethodFa.length > 0);
      assert.ok(pkg.warrantyFa.length > 0);
      assert.ok(pkg.deliveryTimeFa.length > 0);
      assert.ok(pkg.descriptionFa.length > 0);
    }

    const caps = getProductCapabilities(product);
    assert.equal(caps.length, 4);
    const faqs = getProductFaqs(product);
    assert.equal(faqs.length, 4);

    const snapshot = createPackageCartProduct(product, packages[0]);
    assert.equal(snapshot.priceUsd, packages[0].priceUsd);
    assert.ok(snapshot.id.includes(packages[0].id));
  }
});

test('getProductPurchaseTypes returns Dicardo purchase types for Call of Duty Mobile, Capacity Accounts, and Multi-Platform Controllers', () => {
  const codm = MODASR_PRODUCTS.find((p) => p.id === 'codm-cp-880')!;
  const codmTypes = getProductPurchaseTypes(codm, DEFAULT_USDT_RATE_TOMAN);
  assert.equal(codmTypes.length, 4);
  assert.deepEqual(
    codmTypes.map((t) => t.titleFa),
    ['سی پی CP', 'اشتراک ( Supply Pass )', 'آفرها', 'بتل پس']
  );
  assert.equal(codmTypes[0].startingPriceToman, 295000);

  // Filter packages inside CODM CP purchase type ('80' matches 80 CP and 880 CP)
  const filtered80 = filterProductPackages(codmTypes[0].packages, '80');
  assert.equal(filtered80.length, 2);
  assert.equal(filtered80[0].id, 'codm-cp-80');
  assert.equal(filtered80[0].fixedTomanPrice, 295000);

  // Verify Capacity Account purchase types (ظرفیت ۲ پرایمری، ظرفیت ۳ سوییچ، ظرفیت ۱ آفلاین، اکانت هوم Xbox)
  const fc25 = MODASR_PRODUCTS.find((p) => p.id === 'ps5-fc25-capacity')!;
  const fc25Types = getProductPurchaseTypes(fc25, DEFAULT_USDT_RATE_TOMAN);
  assert.equal(fc25Types.length, 4);
  assert.ok(fc25Types[0].titleFa.includes('ظرفیت ۲'));
  assert.ok(fc25Types[1].titleFa.includes('ظرفیت ۳'));
  assert.ok(fc25Types[2].titleFa.includes('ظرفیت ۱'));
  assert.ok(fc25Types[3].titleFa.includes('Xbox'));

  // Verify Xbox/Windows and Mobile iPhone/Android Controller purchase types
  const xboxCtrl = MODASR_PRODUCTS.find((p) => p.id === 'gaming-controller-xbox-windows')!;
  const xboxCtrlTypes = getProductPurchaseTypes(xboxCtrl, DEFAULT_USDT_RATE_TOMAN);
  assert.equal(xboxCtrlTypes.length, 2);
  assert.ok(xboxCtrlTypes[0].titleFa.includes('ویندوز'));
  assert.ok(xboxCtrlTypes[1].titleFa.includes('Elite Series 2'));

  const mobileCtrl = MODASR_PRODUCTS.find(
    (p) => p.id === 'gaming-controller-mobile-iphone-android'
  )!;
  const mobileCtrlTypes = getProductPurchaseTypes(mobileCtrl, DEFAULT_USDT_RATE_TOMAN);
  assert.equal(mobileCtrlTypes.length, 2);
  assert.ok(mobileCtrlTypes[0].titleFa.includes('Backbone One'));
  assert.ok(mobileCtrlTypes[1].titleFa.includes('GameSir G8'));

  // Check unified titles and deduplication
  const titles = getDicardoCardTitles(codm);
  assert.equal(titles.titleFa, 'سی پی کالاف دیوتی موبایل');
  assert.equal(titles.titleEn, 'Call of Duty Mobile');

  const unified = getUnifiedBrandProducts(MODASR_PRODUCTS);
  assert.ok(!unified.some((p) => p.id === 'codm-cp-2400'));
  assert.ok(unified.some((p) => p.id === 'codm-cp-880'));
});
