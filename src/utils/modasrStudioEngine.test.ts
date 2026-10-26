import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_BRAND_IDENTITY,
  INITIAL_DIGITAL_ASSETS,
  INITIAL_SCENES_CONFIG,
  INITIAL_VERSION_HISTORY,
  STUDIO_TOOLS_META,
  computeDraftDiff,
  runPreReleaseChecks,
  validateDigitalAsset,
} from './modasrStudioEngine';

test('STUDIO_TOOLS_META defines all 8 required 3D studio tools', () => {
  assert.equal(STUDIO_TOOLS_META.length, 8);
  const ids = STUDIO_TOOLS_META.map((t) => t.id);
  assert.deepEqual(ids, [
    'scene-editor',
    'model-manager',
    'animation-timeline',
    'camera-controls',
    'lighting-studio',
    'object-placement',
    'interaction-rules',
    'responsive-preview',
  ]);
});

test('INITIAL_SCENES_CONFIG defines all 5 category-specific 3D scenes', () => {
  assert.ok(INITIAL_SCENES_CONFIG.home);
  assert.ok(INITIAL_SCENES_CONFIG.gaming);
  assert.ok(INITIAL_SCENES_CONFIG.ai);
  assert.ok(INITIAL_SCENES_CONFIG.webapp);
  assert.ok(INITIAL_SCENES_CONFIG.vpn);
  assert.equal(INITIAL_SCENES_CONFIG.home.featuredProductTitles.length, 4);
});

test('validateDigitalAsset accepts valid GLB/WebP and rejects corrupt or oversized files', () => {
  const validGlb = validateDigitalAsset({
    fileName: 'hero_avatar.glb',
    sizeMb: 4.5,
    polyCount: 25000,
  });
  assert.equal(validGlb.valid, true);
  assert.equal(validGlb.status, 'compatible');
  assert.equal(validGlb.detectedType, 'glb');

  const oversized = validateDigitalAsset({
    fileName: 'huge_scene.glb',
    sizeMb: 42.0,
    polyCount: 30000,
  });
  assert.equal(oversized.valid, false);
  assert.equal(oversized.status, 'rejected');

  const badExt = validateDigitalAsset({
    fileName: 'malicious_script.exe',
    sizeMb: 1.2,
  });
  assert.equal(badExt.valid, false);
  assert.equal(badExt.status, 'rejected');
});

test('computeDraftDiff detects scene and brand modifications accurately', () => {
  const published = INITIAL_VERSION_HISTORY[0];
  const modifiedScenes = structuredClone(INITIAL_SCENES_CONFIG);
  modifiedScenes.home.keyLightColor = '#f43f5e';
  modifiedScenes.home.handRaiseProgress = 0.99;

  const modifiedBrand = {
    ...INITIAL_BRAND_IDENTITY,
    primaryColor: '#a855f7',
  };

  const diffs = computeDraftDiff(published, modifiedScenes, modifiedBrand);
  assert.ok(diffs.length >= 3);
  assert.ok(diffs.some((d) => d.includes('#f43f5e')));
  assert.ok(diffs.some((d) => d.includes('#a855f7')));
});

test('runPreReleaseChecks verifies isolation, asset integrity, and mobile readiness', () => {
  const checks = runPreReleaseChecks(INITIAL_SCENES_CONFIG, INITIAL_DIGITAL_ASSETS);
  assert.equal(checks.length, 4);
  assert.ok(checks.every((c) => c.passed));
});
