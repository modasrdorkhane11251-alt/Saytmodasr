import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LUMORA_PLATE_URL,
  LUMORA_HEAD_CLIP_URL,
  LUMORA_HELMET_URL,
  mapPointerXToClipTime,
  easeValue,
  computeIdleDriftTime,
} from './LumoraSkyrangerHero';

test('Lumora media URLs match specification', () => {
  assert.ok(LUMORA_PLATE_URL.endsWith('a194141a-44ba-44bb-8372-e6720af994ca.jpg'));
  assert.ok(LUMORA_HEAD_CLIP_URL.endsWith('e1b48476-24ab-456a-bb12-13e63bc60973.mp4'));
  assert.ok(LUMORA_HELMET_URL.endsWith('e8c78660-4497-41b9-82ae-a4738a5edd11.jpg'));
});

test('mapPointerXToClipTime maps 14%..86% of frame width to 0..duration', () => {
  const duration = 5.04;
  // At 14% of 1000px frame -> 0s
  assert.equal(mapPointerXToClipTime(140, 0, 1000, duration), 0);
  // Below 14% -> clamped to 0s
  assert.equal(mapPointerXToClipTime(50, 0, 1000, duration), 0);
  // At 50% (midpoint between 14% and 86%) -> 2.52s
  assert.ok(Math.abs(mapPointerXToClipTime(500, 0, 1000, duration) - 2.52) < 1e-6);
  // At 86% -> 5.04s
  assert.ok(Math.abs(mapPointerXToClipTime(860, 0, 1000, duration) - 5.04) < 1e-6);
});

test('easeValue and computeIdleDriftTime behave deterministically', () => {
  assert.ok(Math.abs(easeValue(0, 10, 0.14) - 1.4) < 1e-6);
  assert.ok(Math.abs(easeValue(0, 100, 0.55) - 55) < 1e-6);
  // At elapsed = 0, sin(0) = 0 -> midpoint (2.52s)
  assert.ok(Math.abs(computeIdleDriftTime(0, 5.04) - 2.52) < 1e-6);
});
