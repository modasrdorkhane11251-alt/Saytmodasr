import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MERIDIAN_VIDEO_URL,
  MERIDIAN_TAGLINE,
  MERIDIAN_NAV_ITEMS,
  MERIDIAN_GLASS_HALO_CONFIG,
  getMeridianCopyrightYear,
} from './MeridianFooter';

test('MeridianFooter constants and glass halo configuration match specification', () => {
  assert.equal(
    MERIDIAN_VIDEO_URL,
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4'
  );
  assert.equal(
    MERIDIAN_TAGLINE,
    'The scenic route to shipped work. Plan, track, and deliver from town to town.'
  );
  assert.deepEqual(MERIDIAN_NAV_ITEMS, [
    'Platform',
    'Workflows',
    'Integrations',
    'For Teams',
    'For Studios',
    'About',
    'Journal',
    'Contact',
  ]);
  assert.equal(MERIDIAN_GLASS_HALO_CONFIG.textRemoved, true);
  assert.equal(MERIDIAN_GLASS_HALO_CONFIG.glassHaloEnabled, true);
  assert.equal(getMeridianCopyrightYear(new Date('2026-10-26T00:00:00Z')), '2026');
});
