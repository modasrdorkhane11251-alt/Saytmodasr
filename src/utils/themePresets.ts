import { SectionId } from './heroConfig';

export type ThemePresetId =
  | 'neural-nexus'
  | 'cyber-glitch'
  | 'cosmic-flow'
  | 'crimson-overdrive'
  | 'obsidian-prism';

export interface ThemePreset {
  id: ThemePresetId;
  nameEn: string;
  nameFa: string;
  primaryColor: string;
  secondaryColor: string;
  ambientBg: string;
  videoOpacity: number;
  videoFilter: string;
  descriptionEn: string;
  descriptionFa: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'neural-nexus',
    nameEn: 'Neural Nexus',
    nameFa: 'نکسوس عصبی',
    primaryColor: '#00F5D4',
    secondaryColor: '#10B981',
    ambientBg: '#02080B',
    videoOpacity: 0.18,
    videoFilter: 'hue-rotate(155deg) saturate(1.6) brightness(0.55) contrast(1.2)',
    descriptionEn: 'Bioluminescent synaptic lattice & quantum wave shader',
    descriptionFa: 'شبکه سیناپسی زنده و موج‌های کوانتومی',
  },
  {
    id: 'cyber-glitch',
    nameEn: 'Cyber Glitch',
    nameFa: 'گلیچ سایبری',
    primaryColor: '#00D2FF',
    secondaryColor: '#F43F5E',
    ambientBg: '#03060E',
    videoOpacity: 0.25,
    videoFilter: 'hue-rotate(185deg) saturate(1.8) brightness(0.55) contrast(1.35)',
    descriptionEn: 'Chromatic scanline matrix & neon horizon pulses',
    descriptionFa: 'ماتریس اسکن‌لاین و پالس‌های نئونی سایبری',
  },
  {
    id: 'cosmic-flow',
    nameEn: 'Cosmic Flow',
    nameFa: 'جریان کیهانی',
    primaryColor: '#6366F1',
    secondaryColor: '#38BDF8',
    ambientBg: '#040614',
    videoOpacity: 0.22,
    videoFilter: 'hue-rotate(230deg) saturate(1.5) brightness(0.6) contrast(1.15)',
    descriptionEn: 'Fluid aurora ribbons & deep spatial starfield',
    descriptionFa: 'جریان شفق کیهانی و میدان ستاره‌ای سه‌بعدی',
  },
  {
    id: 'crimson-overdrive',
    nameEn: 'Crimson Overdrive',
    nameFa: 'آوردرایو کریمسون',
    primaryColor: '#EF4444',
    secondaryColor: '#F97316',
    ambientBg: '#090204',
    videoOpacity: 0.92,
    videoFilter: 'none',
    descriptionEn: 'Cinematic gaming video & kinetic ember vortex',
    descriptionFa: 'ویدیوی سینمایی گیمینگ و ذرات اخگر',
  },
  {
    id: 'obsidian-prism',
    nameEn: 'Obsidian Prism',
    nameFa: 'منشور ابسیدین',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24',
    ambientBg: '#050402',
    videoOpacity: 0.2,
    videoFilter: 'hue-rotate(38deg) saturate(1.4) brightness(0.55) contrast(1.2)',
    descriptionEn: 'Golden architectural light beams & geometric prisms',
    descriptionFa: 'پرتوهای طلایی معماری و منشورهای هندسی',
  },
];

export const SECTION_DEFAULT_PRESET: Record<SectionId, ThemePresetId> = {
  games: 'crimson-overdrive',
  ai: 'neural-nexus',
  search: 'cyber-glitch',
  web: 'cosmic-flow',
  studio: 'obsidian-prism',
};

export function getPresetById(id: ThemePresetId): ThemePreset {
  return THEME_PRESETS.find((preset) => preset.id === id) ?? THEME_PRESETS[0];
}

export function getDefaultPresetForSection(sectionId: SectionId): ThemePresetId {
  return SECTION_DEFAULT_PRESET[sectionId] ?? 'neural-nexus';
}

export function getNextPresetId(
  currentId: ThemePresetId,
  direction: 1 | -1 = 1
): ThemePresetId {
  const index = THEME_PRESETS.findIndex((p) => p.id === currentId);
  if (index === -1) return THEME_PRESETS[0].id;
  const nextIndex =
    (index + direction + THEME_PRESETS.length) % THEME_PRESETS.length;
  return THEME_PRESETS[nextIndex].id;
}
