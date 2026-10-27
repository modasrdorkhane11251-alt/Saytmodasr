import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NAV_LINKS,
  HERO_STATS,
  HERO_VIDEO_URL,
  AI_HERO_VIDEO_URL,
  WEB_HERO_VIDEO_URL,
  SECTIONS,
  HOME_SECTION,
  BOTTOM_NAV_SECTIONS,
  SHOWCASE_ITEMS,
  getStaggerDelayMs,
  getSectionById,
  getPageVisualTheme,
  PAGE_VISUAL_THEMES,
  filterShowcaseItems,
} from './heroConfig';

test('getStaggerDelayMs computes i * 80 + 100ms accurately', () => {
  assert.equal(getStaggerDelayMs(0), '100ms');
  assert.equal(getStaggerDelayMs(1), '180ms');
  assert.equal(getStaggerDelayMs(2), '260ms');
  assert.equal(getStaggerDelayMs(3), '340ms');
  assert.equal(getStaggerDelayMs(4), '420ms');
});

test('NAV_LINKS and HERO_STATS match specification', () => {
  assert.deepEqual(NAV_LINKS, ['Projects', 'Studio', 'Offerings', 'Inquire']);
  assert.equal(HERO_STATS.length, 3);
  assert.equal(HERO_STATS[0].value, '250+');
  assert.equal(HERO_STATS[1].value, '95%');
  assert.equal(
    HERO_VIDEO_URL,
    '/assets/aistudio/gaming_bc368cb4.mp4'
  );
  assert.equal(
    AI_HERO_VIDEO_URL,
    '/assets/aistudio/ai_e39a24ce.mp4'
  );
  assert.equal(
    WEB_HERO_VIDEO_URL,
    '/assets/aistudio/premium_11ba9e23.mp4'
  );
});

test('SECTIONS defines 5 themed realms and BOTTOM_NAV_SECTIONS starts with Home/Dashboard', () => {
  assert.equal(SECTIONS.length, 5);
  assert.deepEqual(
    SECTIONS.map((s) => s.id),
    ['games', 'ai', 'search', 'web', 'studio']
  );
  assert.equal(BOTTOM_NAV_SECTIONS.length, 6);
  assert.deepEqual(
    BOTTOM_NAV_SECTIONS.map((s) => s.id),
    ['home', 'games', 'ai', 'web', 'search', 'studio']
  );
  assert.equal(HOME_SECTION.fa.tabLabel, 'خانه / داشبورد');
  assert.equal(getSectionById('home').id, 'home');
  const gamesSection = getSectionById('games');
  assert.equal(gamesSection.en.tabLabel, 'Gaming');
  assert.equal(gamesSection.fa.tabLabel, 'گیم و بازی');
  const aiSection = getSectionById('ai');
  assert.equal(aiSection.en.tabLabel, 'AI Hub');
  assert.equal(aiSection.fa.tabLabel, 'هوش مصنوعی');
  const searchSection = getSectionById('search');
  assert.equal(searchSection.isCenterAction, true);
  assert.equal(searchSection.fa.tabLabel, 'جستجو');
  assert.equal(searchSection.fa.navLabel, 'جستجو');
  assert.equal(searchSection.en.tabLabel, 'Search');
  assert.equal(searchSection.en.navLabel, 'Search');
  const studioSection = getSectionById('studio');
  assert.equal(studioSection.fa.tabLabel, 'حساب');
  assert.equal(studioSection.en.tabLabel, 'Account');
});

test('getPageVisualTheme returns a distinct full-page theme for all 6 pages', () => {
  const allIds = ['home', 'games', 'ai', 'web', 'search', 'studio'] as const;
  const primaryHexes = new Set(allIds.map((id) => getPageVisualTheme(id).primaryHex));
  assert.equal(primaryHexes.size, 6);
  assert.equal(PAGE_VISUAL_THEMES.games.heroMediaType, 'video');
  assert.equal(PAGE_VISUAL_THEMES.ai.heroMediaType, 'video');
  assert.equal(PAGE_VISUAL_THEMES.web.heroMediaType, 'video');
  assert.equal(PAGE_VISUAL_THEMES.home.mediaUrl, '');
  assert.equal(PAGE_VISUAL_THEMES.search.mediaUrl, '');
  assert.equal(PAGE_VISUAL_THEMES.studio.heroMediaType, 'artwork');
});

test('filterShowcaseItems filters by category and search query', () => {
  const aiOnly = filterShowcaseItems(SHOWCASE_ITEMS, 'ai', '');
  assert.equal(aiOnly.length, 2);
  const queryMatch = filterShowcaseItems(SHOWCASE_ITEMS, 'all', 'MODASR Connect');
  assert.equal(queryMatch.length, 1);
  assert.equal(queryMatch[0].id, 'hyper-commerce');
});
