import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_PRESETS,
  getPresetById,
  getDefaultPresetForSection,
  getNextPresetId,
} from './themePresets';

test('THEME_PRESETS includes Neural Nexus, Cyber Glitch, and Cosmic Flow', () => {
  const names = THEME_PRESETS.map((p) => p.nameEn);
  assert.ok(names.includes('Neural Nexus'));
  assert.ok(names.includes('Cyber Glitch'));
  assert.ok(names.includes('Cosmic Flow'));
});

test('getDefaultPresetForSection maps each section to its tailored preset', () => {
  assert.equal(getDefaultPresetForSection('ai'), 'neural-nexus');
  assert.equal(getDefaultPresetForSection('search'), 'cyber-glitch');
  assert.equal(getDefaultPresetForSection('web'), 'cosmic-flow');
  assert.equal(getDefaultPresetForSection('games'), 'crimson-overdrive');
  assert.equal(getDefaultPresetForSection('studio'), 'obsidian-prism');
});

test('getNextPresetId cycles forward and backward cleanly', () => {
  assert.equal(getNextPresetId('neural-nexus', 1), 'cyber-glitch');
  assert.equal(getNextPresetId('cyber-glitch', 1), 'cosmic-flow');
  assert.equal(getNextPresetId('neural-nexus', -1), 'obsidian-prism');
  assert.equal(getPresetById('cosmic-flow').nameEn, 'Cosmic Flow');
});
