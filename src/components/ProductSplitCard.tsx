import React from 'react';
import { Plus } from 'lucide-react';
import {
  ModasrProduct,
  ProductIconType,
  convertUsdToToman,
} from '../utils/modasrStore';
import { Language } from '../utils/heroConfig';

interface ProductVisualStyle {
  bgGradient: string;
  pedestalColor: string;
  ringColor: string;
  squircleLeft: string;
  squircleRight: string;
  glassGradient: string;
  watermark: string;
  accentGlow: string;
}

export const VISUAL_STYLES: Record<ProductIconType, ProductVisualStyle> = {
  openai: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(20, 184, 166, 0.36) 0%, rgba(5, 46, 38, 0.92) 55%, #031512 100%)',
    pedestalColor: '#2dd4bf',
    ringColor: '#c084fc',
    squircleLeft: '#e6fffa',
    squircleRight: '#81e6d9',
    glassGradient:
      'linear-gradient(135deg, rgba(204, 251, 241, 0.95) 0%, rgba(45, 212, 191, 0.75) 42%, rgba(13, 148, 136, 0.96) 100%)',
    watermark: 'AI',
    accentGlow: 'rgba(45, 212, 191, 0.5)',
  },
  canva: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(139, 92, 246, 0.4) 0%, rgba(30, 18, 62, 0.92) 55%, #0b071a 100%)',
    pedestalColor: '#a855f7',
    ringColor: '#e879f9',
    squircleLeft: '#f3e8ff',
    squircleRight: '#c084fc',
    glassGradient:
      'linear-gradient(135deg, rgba(243, 232, 255, 0.95) 0%, rgba(192, 132, 252, 0.75) 42%, rgba(126, 34, 206, 0.96) 100%)',
    watermark: 'CC',
    accentGlow: 'rgba(168, 85, 247, 0.52)',
  },
  claude: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(249, 115, 22, 0.34) 0%, rgba(45, 22, 12, 0.92) 55%, #120905 100%)',
    pedestalColor: '#fb923c',
    ringColor: '#f472b6',
    squircleLeft: '#ffedd5',
    squircleRight: '#fdba74',
    glassGradient:
      'linear-gradient(135deg, rgba(255, 237, 213, 0.95) 0%, rgba(251, 146, 60, 0.75) 42%, rgba(194, 65, 12, 0.96) 100%)',
    watermark: 'AI',
    accentGlow: 'rgba(251, 146, 60, 0.45)',
  },
  cursor: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(56, 189, 248, 0.35) 0%, rgba(10, 32, 54, 0.92) 55%, #040f1c 100%)',
    pedestalColor: '#38bdf8',
    ringColor: '#c084fc',
    squircleLeft: '#e0f2fe',
    squircleRight: '#7dd3fc',
    glassGradient:
      'linear-gradient(135deg, rgba(224, 242, 254, 0.95) 0%, rgba(56, 189, 248, 0.75) 42%, rgba(2, 132, 199, 0.98) 100%)',
    watermark: 'ID',
    accentGlow: 'rgba(56, 189, 248, 0.48)',
  },
  gemini: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(99, 102, 241, 0.38) 0%, rgba(20, 22, 58, 0.92) 55%, #080a1c 100%)',
    pedestalColor: '#818cf8',
    ringColor: '#e879f9',
    squircleLeft: '#e0e7ff',
    squircleRight: '#a5b4fc',
    glassGradient:
      'linear-gradient(135deg, rgba(224, 231, 255, 0.95) 0%, rgba(129, 140, 248, 0.75) 42%, rgba(67, 56, 202, 0.96) 100%)',
    watermark: 'AI',
    accentGlow: 'rgba(129, 140, 248, 0.48)',
  },
  midjourney: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(45, 212, 191, 0.35) 0%, rgba(8, 38, 46, 0.92) 55%, #041217 100%)',
    pedestalColor: '#2dd4bf',
    ringColor: '#a855f7',
    squircleLeft: '#ccfbf1',
    squircleRight: '#5eead4',
    glassGradient:
      'linear-gradient(135deg, rgba(204, 251, 241, 0.95) 0%, rgba(45, 212, 191, 0.72) 42%, rgba(15, 118, 110, 0.96) 100%)',
    watermark: 'MJ',
    accentGlow: 'rgba(45, 212, 191, 0.48)',
  },
  spotify: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(34, 197, 94, 0.35) 0%, rgba(6, 42, 24, 0.92) 55%, #03140b 100%)',
    pedestalColor: '#4ade80',
    ringColor: '#c084fc',
    squircleLeft: '#dcfce7',
    squircleRight: '#86efac',
    glassGradient:
      'linear-gradient(135deg, rgba(220, 252, 231, 0.95) 0%, rgba(74, 222, 128, 0.75) 42%, rgba(21, 128, 61, 0.96) 100%)',
    watermark: 'SP',
    accentGlow: 'rgba(74, 222, 128, 0.48)',
  },
  netflix: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(244, 63, 94, 0.36) 0%, rgba(48, 10, 20, 0.92) 55%, #140408 100%)',
    pedestalColor: '#fb7185',
    ringColor: '#e879f9',
    squircleLeft: '#ffe4e6',
    squircleRight: '#fda4af',
    glassGradient:
      'linear-gradient(135deg, rgba(255, 228, 230, 0.95) 0%, rgba(251, 113, 133, 0.75) 42%, rgba(190, 18, 60, 0.96) 100%)',
    watermark: 'TV',
    accentGlow: 'rgba(251, 113, 133, 0.48)',
  },
  youtube: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(239, 68, 68, 0.36) 0%, rgba(48, 12, 12, 0.92) 55%, #140505 100%)',
    pedestalColor: '#f87171',
    ringColor: '#f472b6',
    squircleLeft: '#fee2e2',
    squircleRight: '#fca5a5',
    glassGradient:
      'linear-gradient(135deg, rgba(254, 226, 226, 0.95) 0%, rgba(248, 113, 113, 0.75) 42%, rgba(185, 28, 28, 0.96) 100%)',
    watermark: 'YT',
    accentGlow: 'rgba(248, 113, 113, 0.48)',
  },
  telegram: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(14, 165, 233, 0.36) 0%, rgba(8, 35, 56, 0.92) 55%, #04111c 100%)',
    pedestalColor: '#38bdf8',
    ringColor: '#c084fc',
    squircleLeft: '#e0f2fe',
    squircleRight: '#7dd3fc',
    glassGradient:
      'linear-gradient(135deg, rgba(224, 242, 254, 0.95) 0%, rgba(56, 189, 248, 0.75) 42%, rgba(3, 105, 161, 0.96) 100%)',
    watermark: 'TG',
    accentGlow: 'rgba(56, 189, 248, 0.48)',
  },
  discord: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(99, 102, 241, 0.36) 0%, rgba(22, 20, 58, 0.92) 55%, #09081a 100%)',
    pedestalColor: '#818cf8',
    ringColor: '#e879f9',
    squircleLeft: '#e0e7ff',
    squircleRight: '#a5b4fc',
    glassGradient:
      'linear-gradient(135deg, rgba(224, 231, 255, 0.95) 0%, rgba(129, 140, 248, 0.75) 42%, rgba(67, 56, 202, 0.96) 100%)',
    watermark: 'DC',
    accentGlow: 'rgba(129, 140, 248, 0.48)',
  },
  tradingview: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(6, 182, 212, 0.36) 0%, rgba(8, 36, 48, 0.92) 55%, #041117 100%)',
    pedestalColor: '#22d3ee',
    ringColor: '#a855f7',
    squircleLeft: '#cffafe',
    squircleRight: '#67e8f9',
    glassGradient:
      'linear-gradient(135deg, rgba(207, 250, 254, 0.95) 0%, rgba(34, 211, 238, 0.75) 42%, rgba(14, 116, 144, 0.96) 100%)',
    watermark: 'FX',
    accentGlow: 'rgba(34, 211, 238, 0.48)',
  },
  psn: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(59, 130, 246, 0.38) 0%, rgba(10, 26, 62, 0.92) 55%, #040b1c 100%)',
    pedestalColor: '#60a5fa',
    ringColor: '#c084fc',
    squircleLeft: '#dbeAFE',
    squircleRight: '#93c5fd',
    glassGradient:
      'linear-gradient(135deg, rgba(219, 234, 254, 0.95) 0%, rgba(96, 165, 250, 0.75) 42%, rgba(29, 78, 216, 0.98) 100%)',
    watermark: 'PS',
    accentGlow: 'rgba(96, 165, 250, 0.48)',
  },
  xbox: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(34, 197, 94, 0.36) 0%, rgba(8, 42, 20, 0.92) 55%, #031409 100%)',
    pedestalColor: '#4ade80',
    ringColor: '#a855f7',
    squircleLeft: '#dcfce7',
    squircleRight: '#86efac',
    glassGradient:
      'linear-gradient(135deg, rgba(220, 252, 231, 0.95) 0%, rgba(74, 222, 128, 0.75) 42%, rgba(21, 128, 61, 0.96) 100%)',
    watermark: 'XB',
    accentGlow: 'rgba(74, 222, 128, 0.48)',
  },
  steam: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(56, 189, 248, 0.38) 0%, rgba(15, 28, 52, 0.94) 55%, #050b14 100%)',
    pedestalColor: '#38bdf8',
    ringColor: '#60a5fa',
    squircleLeft: '#f0f9ff',
    squircleRight: '#7dd3fc',
    glassGradient:
      'linear-gradient(135deg, rgba(224, 242, 254, 0.95) 0%, rgba(56, 189, 248, 0.72) 42%, rgba(15, 23, 42, 0.96) 100%)',
    watermark: 'ST',
    accentGlow: 'rgba(56, 189, 248, 0.52)',
  },
  apple: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(148, 163, 184, 0.32) 0%, rgba(20, 28, 40, 0.92) 55%, #070b12 100%)',
    pedestalColor: '#38bdf8',
    ringColor: '#c084fc',
    squircleLeft: '#f8fafc',
    squircleRight: '#cbd5e1',
    glassGradient:
      'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(203, 213, 225, 0.75) 42%, rgba(51, 65, 85, 0.96) 100%)',
    watermark: 'AP',
    accentGlow: 'rgba(148, 163, 184, 0.45)',
  },
  googleplay: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(45, 212, 191, 0.34) 0%, rgba(8, 38, 42, 0.92) 55%, #041315 100%)',
    pedestalColor: '#2dd4bf',
    ringColor: '#c084fc',
    squircleLeft: '#ccfbf1',
    squircleRight: '#7dd3fc',
    glassGradient:
      'linear-gradient(135deg, rgba(204, 251, 241, 0.95) 0%, rgba(45, 212, 191, 0.75) 42%, rgba(13, 148, 136, 0.96) 100%)',
    watermark: 'GP',
    accentGlow: 'rgba(45, 212, 191, 0.48)',
  },
  nintendo: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(244, 63, 94, 0.36) 0%, rgba(48, 12, 20, 0.92) 55%, #140508 100%)',
    pedestalColor: '#fb7185',
    ringColor: '#e879f9',
    squircleLeft: '#ffe4e6',
    squircleRight: '#fda4af',
    glassGradient:
      'linear-gradient(135deg, rgba(255, 228, 230, 0.95) 0%, rgba(251, 113, 133, 0.75) 42%, rgba(190, 18, 60, 0.96) 100%)',
    watermark: 'NS',
    accentGlow: 'rgba(251, 113, 133, 0.48)',
  },
  razer: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(132, 204, 22, 0.36) 0%, rgba(18, 38, 8, 0.92) 55%, #071203 100%)',
    pedestalColor: '#a3e635',
    ringColor: '#c084fc',
    squircleLeft: '#ecfccb',
    squircleRight: '#bef264',
    glassGradient:
      'linear-gradient(135deg, rgba(236, 252, 203, 0.95) 0%, rgba(163, 230, 53, 0.75) 42%, rgba(77, 124, 15, 0.96) 100%)',
    watermark: 'RZ',
    accentGlow: 'rgba(163, 230, 53, 0.48)',
  },
  codm: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(245, 158, 11, 0.36) 0%, rgba(44, 28, 6, 0.92) 55%, #140c02 100%)',
    pedestalColor: '#fbbf24',
    ringColor: '#f472b6',
    squircleLeft: '#fef3c7',
    squircleRight: '#fcd34d',
    glassGradient:
      'linear-gradient(135deg, rgba(254, 243, 199, 0.95) 0%, rgba(251, 191, 36, 0.75) 42%, rgba(180, 83, 9, 0.96) 100%)',
    watermark: 'CP',
    accentGlow: 'rgba(251, 191, 36, 0.48)',
  },
  pubg: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(245, 158, 11, 0.36) 0%, rgba(44, 26, 6, 0.92) 55%, #140b02 100%)',
    pedestalColor: '#fbbf24',
    ringColor: '#e879f9',
    squircleLeft: '#fef3c7',
    squircleRight: '#fcd34d',
    glassGradient:
      'linear-gradient(135deg, rgba(254, 243, 199, 0.95) 0%, rgba(251, 191, 36, 0.75) 42%, rgba(180, 83, 9, 0.96) 100%)',
    watermark: 'UC',
    accentGlow: 'rgba(251, 191, 36, 0.48)',
  },
  freefire: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(249, 115, 22, 0.36) 0%, rgba(46, 20, 6, 0.92) 55%, #140802 100%)',
    pedestalColor: '#fb923c',
    ringColor: '#f472b6',
    squircleLeft: '#ffedd5',
    squircleRight: '#fdba74',
    glassGradient:
      'linear-gradient(135deg, rgba(255, 237, 213, 0.95) 0%, rgba(251, 146, 60, 0.75) 42%, rgba(194, 65, 12, 0.96) 100%)',
    watermark: 'FF',
    accentGlow: 'rgba(251, 146, 60, 0.48)',
  },
  supercell: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(234, 179, 8, 0.36) 0%, rgba(42, 32, 6, 0.92) 55%, #120d02 100%)',
    pedestalColor: '#facc15',
    ringColor: '#c084fc',
    squircleLeft: '#fef9c3',
    squircleRight: '#fde047',
    glassGradient:
      'linear-gradient(135deg, rgba(254, 249, 195, 0.95) 0%, rgba(250, 204, 21, 0.75) 42%, rgba(161, 98, 7, 0.96) 100%)',
    watermark: 'SC',
    accentGlow: 'rgba(250, 204, 21, 0.48)',
  },
  genshin: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(168, 85, 247, 0.38) 0%, rgba(32, 16, 56, 0.92) 55%, #0c0617 100%)',
    pedestalColor: '#c084fc',
    ringColor: '#38bdf8',
    squircleLeft: '#f3e8ff',
    squircleRight: '#d8b4fe',
    glassGradient:
      'linear-gradient(135deg, rgba(243, 232, 255, 0.95) 0%, rgba(192, 132, 252, 0.75) 42%, rgba(107, 33, 168, 0.96) 100%)',
    watermark: 'GI',
    accentGlow: 'rgba(192, 132, 252, 0.48)',
  },
  vpn: {
    bgGradient:
      'radial-gradient(circle at 50% 42%, rgba(20, 184, 166, 0.36) 0%, rgba(6, 40, 38, 0.92) 55%, #031312 100%)',
    pedestalColor: '#2dd4bf',
    ringColor: '#c084fc',
    squircleLeft: '#ccfbf1',
    squircleRight: '#5eead4',
    glassGradient:
      'linear-gradient(135deg, rgba(204, 251, 241, 0.95) 0%, rgba(45, 212, 191, 0.75) 42%, rgba(13, 148, 136, 0.96) 100%)',
    watermark: 'VP',
    accentGlow: 'rgba(45, 212, 191, 0.48)',
  },
};

function renderBrandEmblem(iconType: ProductIconType) {
  switch (iconType) {
    case 'openai':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#051814]"
          fill="currentColor"
          aria-label="OpenAI Official Logo"
        >
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
        </svg>
      );
    case 'canva':
      return (
        <div className="w-11 h-11 rounded-full bg-[#0d0e12] border border-white/25 flex items-center justify-center shadow-lg">
          <span className="text-white font-serif italic font-extrabold text-[15px] tracking-tight select-none">
            Canva
          </span>
        </div>
      );
    case 'claude':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#C2410C]"
          fill="currentColor"
          aria-label="Anthropic Claude Official Asterisk"
        >
          {/* Authentic Anthropic Claude starburst asterisk */}
          <path d="M12 2a1.2 1.2 0 0 1 1.15.86l1.32 4.38 4.38-1.32a1.2 1.2 0 0 1 1.48 1.48l-1.32 4.38 4.38 1.32a1.2 1.2 0 0 1 0 2.3l-4.38 1.32 1.32 4.38a1.2 1.2 0 0 1-1.48 1.48l-4.38-1.32-1.32 4.38a1.2 1.2 0 0 1-2.3 0l-1.32-4.38-4.38 1.32a1.2 1.2 0 0 1-1.48-1.48l1.32-4.38-4.38-1.32a1.2 1.2 0 0 1 0-2.3l4.38-1.32-1.32-4.38a1.2 1.2 0 0 1 1.48-1.48l4.38 1.32 1.32-4.38A1.2 1.2 0 0 1 12 2z" />
        </svg>
      );
    case 'cursor':
      return (
        <svg
          viewBox="0 0 32 32"
          className="w-10 h-10 drop-shadow-md"
          fill="none"
          aria-label="Cursor AI Official Isometric Cube"
        >
          {/* Authentic Cursor 3D isometric cube facets */}
          <path d="M16 2.5L28.5 9.7V22.3L16 29.5L3.5 22.3V9.7L16 2.5Z" fill="#0369A1" />
          <path d="M16 2.5L28.5 9.7L16 16.9L3.5 9.7L16 2.5Z" fill="#38BDF8" />
          <path d="M16 16.9L28.5 9.7V22.3L16 29.5V16.9Z" fill="#0284C7" />
          <path d="M16 16.9L3.5 9.7V22.3L16 29.5V16.9Z" fill="#0C4A6E" />
          <path d="M16 7.5L23.5 11.8L16 16.1L8.5 11.8L16 7.5Z" fill="#F0F9FF" fillOpacity="0.95" />
        </svg>
      );
    case 'gemini':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 drop-shadow-md"
          fill="none"
          aria-label="Google Gemini Official Spark Star"
        >
          <defs>
            <linearGradient id="geminiOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A73E8" />
              <stop offset="35%" stopColor="#8AB4F8" />
              <stop offset="70%" stopColor="#C58AF9" />
              <stop offset="100%" stopColor="#F28B82" />
            </linearGradient>
          </defs>
          <path
            d="M12 2C12 7.523 7.523 12 2 12c5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z"
            fill="url(#geminiOfficialGrad)"
          />
        </svg>
      );
    case 'midjourney':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#042f2e]"
          fill="currentColor"
          aria-label="Midjourney Official Sailboat"
        >
          {/* Authentic Midjourney wireframe boat emblem */}
          <path d="M11.9 2.5L12 2.4l.1.1 5.8 9.3-2.8 1.5-3-5.7-.1 13.9h-1.1V7.5L7.9 13.2l-2.8-1.5 5.7-9.2zm-8.2 14h16.6l-2.4 4.5H6.1l-2.4-4.5zm3 2.8h10.6l1-1.7H6.7l1 1.7z" />
        </svg>
      );
    case 'spotify':
      return (
        <div className="w-10 h-10 rounded-full bg-[#052e16] border border-[#22c55e]/40 flex items-center justify-center shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-[#22c55e]"
            fill="currentColor"
            aria-label="Spotify Official Wave Logo"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.625.625 0 0 1-.282-1.218c3.808-.87 7.076-.5 9.717 1.118a.625.625 0 0 1 .207.857zm1.224-2.72a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.781.781 0 0 1-.453-1.496c3.633-1.102 8.147-.568 11.233 1.333a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.936.936 0 1 1-.548-1.791c3.53-1.072 9.404-.865 13.116 1.338a.937.937 0 0 1-.95 1.612z" />
          </svg>
        </div>
      );
    case 'netflix':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-10 drop-shadow-md"
          fill="none"
          aria-label="Netflix Official Ribbon N"
        >
          <path d="M4 2v20l5.5-2.2V2H4z" fill="#B81D24" />
          <path d="M14.5 2v17.8L20 22V2h-5.5z" fill="#B81D24" />
          <path d="M4 2l10.5 17.8h5.5L9.5 2H4z" fill="#E50914" />
        </svg>
      );
    case 'youtube':
      return (
        <div className="w-11 h-8 rounded-xl bg-[#DC2626] border border-white/20 flex items-center justify-center shadow-lg">
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[11px] border-l-white ml-0.5" />
        </div>
      );
    case 'telegram':
      return (
        <div className="w-10 h-10 rounded-full bg-[#0284C7] border border-white/20 flex items-center justify-center shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            fill="currentColor"
            aria-label="Telegram Official Paper Plane"
          >
            <path d="M21.5 3.5L2.7 10.8c-.9.4-.9 1.7.1 2l4.7 1.5 1.8 5.4c.3.9 1.4 1.1 2 .4l2.7-2.8 4.8 3.5c.8.6 2 .1 2.2-.9l2.7-15c.2-1-.8-1.8-1.7-1.4z" />
          </svg>
        </div>
      );
    case 'psn':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#003791] drop-shadow-md"
          fill="currentColor"
          aria-label="PlayStation Official Interlocking PS Logo"
        >
          <path d="M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.505v5.875c2.441 1.193 4.362-.002 4.362-3.152 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.39-1.502zm4.656 16.241l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.5V14.98l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.03 5.437.661 1.848.601 2.04 1.472 1.576 2.072-.465.6-1.622 1.036-1.622 1.036l-8.544 3.107V18.86zM1.807 18.6c-1.9-.545-2.214-1.668-1.352-2.32.801-.586 2.16-1.052 2.16-1.052l5.615-2.013v2.313L4.205 17c-.705.271-.825.632-.239.826.586.195 1.637.15 2.343-.12L8.247 17v2.074c-.12.03-.256.044-.39.073-1.939.331-3.996.196-6.038-.479z" />
        </svg>
      );
    case 'xbox':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#107C10] drop-shadow-sm"
          fill="currentColor"
          aria-label="Microsoft Xbox Official Sphere Logo"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-4.3 3.6a8.4 8.4 0 0 1 8.6 0 20.8 20.8 0 0 1-4.3 5.4A20.8 20.8 0 0 1 7.7 5.6zM4.1 8.3a8.5 8.5 0 0 1 2.3-2.8 19 19 0 0 1 3.5 4.8 24 24 0 0 1-5.8-2zm15.8 0a24 24 0 0 1-5.8 2 19 19 0 0 1 3.5-4.8 8.5 8.5 0 0 1 2.3 2.8zM5.5 17.5a8.4 8.4 0 0 1-1.6-4.7c2.3.9 4.7 1.5 6.7 1.8a25 25 0 0 1-5.1 2.9zm13 0a25 25 0 0 1-5.1-2.9c2-.3 4.4-.9 6.7-1.8a8.4 8.4 0 0 1-1.6 4.7zm-6.5-.4c-2.4 1.8-4.7 2.8-5.3 3a8.5 8.5 0 0 0 10.6 0c-.6-.2-2.9-1.2-5.3-3z" />
        </svg>
      );
    case 'steam':
      return (
        <div className="w-11 h-11 rounded-full overflow-hidden border border-white/35 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
          <svg
            viewBox="0 0 65 65"
            className="w-full h-full"
            fill="none"
            aria-label="Valve Steam Official Logo"
          >
            <defs>
              <linearGradient id="steamBgGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop stopColor="#111d2e" offset="0%" />
                <stop stopColor="#051839" offset="21.2%" />
                <stop stopColor="#0a1b48" offset="40.7%" />
                <stop stopColor="#132e62" offset="58.1%" />
                <stop stopColor="#144b7e" offset="73.8%" />
                <stop stopColor="#136497" offset="87.3%" />
                <stop stopColor="#1387b8" offset="100%" />
              </linearGradient>
            </defs>
            <path
              d="M1.305 41.202C5.259 54.386 17.488 64 31.959 64c17.673 0 32-14.327 32-32s-14.327-32-32-32C15.001 0 1.124 13.193.028 29.874c2.074 3.477 2.879 5.628 1.275 11.328z"
              fill="url(#steamBgGrad)"
            />
            <path
              d="M30.31 23.985l.003.158-7.83 11.375c-1.268-.058-2.54.165-3.748.662a8.14 8.14 0 0 0-1.498.8L.042 29.893s-.398 6.546 1.26 11.424l12.156 5.016c.6 2.728 2.48 5.12 5.242 6.27a8.88 8.88 0 0 0 11.603-4.782 8.89 8.89 0 0 0 .684-3.656L42.18 36.16l.275.005c6.705 0 12.155-5.466 12.155-12.18s-5.44-12.16-12.155-12.174c-6.702 0-12.155 5.46-12.155 12.174zm-1.88 23.05c-1.454 3.5-5.466 5.147-8.953 3.694a6.84 6.84 0 0 1-3.524-3.362l3.957 1.64a5.04 5.04 0 0 0 6.591-2.719 5.05 5.05 0 0 0-2.715-6.601l-4.1-1.695c1.578-.6 3.372-.62 5.05.077 1.7.703 3 2.027 3.696 3.72s.692 3.56-.01 5.246M42.466 32.1a8.12 8.12 0 0 1-8.098-8.113 8.12 8.12 0 0 1 8.098-8.111 8.12 8.12 0 0 1 8.1 8.111 8.12 8.12 0 0 1-8.1 8.113m-6.068-8.126a6.09 6.09 0 0 1 6.08-6.095c3.355 0 6.084 2.73 6.084 6.095a6.09 6.09 0 0 1-6.084 6.093 6.09 6.09 0 0 1-6.081-6.093z"
              fill="#ffffff"
            />
          </svg>
        </div>
      );
    case 'apple':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-slate-900 drop-shadow-sm"
          fill="currentColor"
          aria-label="Apple Official Silhouette Logo"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.56.65-1.05 1.72-.92 2.74 1 .08 2.02-.49 2.62-1.24z" />
        </svg>
      );
    case 'googleplay':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-9 h-9 drop-shadow-sm"
          fill="none"
          aria-label="Google Play Official Multi-Color Triangle"
        >
          <path d="M3.6 2.4c-.3.4-.4.9-.4 1.6v16c0 .7.1 1.2.4 1.6l.1.1 9.2-9.2v-.2L3.7 2.3l-.1.1z" fill="#00E676" />
          <path d="M16 15.3l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.5 0 2.1l-3.8 2.1z" fill="#FFD600" />
          <path d="M12.9 12.1L3.6 21.6c.4.4 1 .5 1.8.1l10.7-6.1-3.2-3.5z" fill="#FF1744" />
          <path d="M12.9 11.9l3.2-3.5L5.4 2.3c-.8-.5-1.4-.3-1.8.1l9.3 9.5z" fill="#00B0FF" />
        </svg>
      );
    case 'nintendo':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#E60012] drop-shadow-sm"
          fill="currentColor"
          aria-label="Nintendo Switch Official Joy-Con Logo"
        >
          <path d="M8.2 2C4.8 2 2 4.8 2 8.2v7.6C2 19.2 4.8 22 8.2 22h2V2h-2zm-1 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm1.8 5.5H7.2v-1.8H9v1.8zM15.8 2c3.4 0 6.2 2.8 6.2 6.2v7.6c0 3.4-2.8 6.2-6.2 6.2h-2V2h2zm-1 3.5h1.8v1.8h-1.8V5.5zm1 7.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      );
    case 'razer':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#00E700] drop-shadow-md"
          fill="currentColor"
          aria-label="Razer Official Triple-Headed Snake Logo"
        >
          <path d="M12 2C8 6 4 10 5 14c.7 2.8 3 4 5 3-1.5-.5-2.2-1.7-2-3 .3-1.8 2.5-3.5 4-5.5 1.5 2 3.7 3.7 4 5.5.2 1.3-.5 2.5-2 3 2 1 4.3-.2 5-3 1-4-3-8-7-12zm-3.5 14c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm7 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
        </svg>
      );
    case 'codm':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#78350F] drop-shadow-md"
          fill="currentColor"
          aria-label="Call of Duty Mobile Official Skull & Shield"
        >
          <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4zm0 4c2.8 0 5 2.2 5 5 0 1.5-.6 2.8-1.6 3.7v1.8h-1.5v-1.2h-1v1.2h-1.8v-1.2h-1v1.2H8.6v-1.8C7.6 13.8 7 12.5 7 11c0-2.8 2.2-5 5-5zm-2 4.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm4 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
        </svg>
      );
    case 'pubg':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#78350F] drop-shadow-md"
          fill="currentColor"
          aria-label="PUBG Mobile Level 3 Helmet Official Silhouette"
        >
          <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.5 6.5l1.5-2C5 15.2 4.5 13.7 4.5 12c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5c0 1.7-.5 3.2-1.5 4.5l1.5 2c1.5-1.7 2.5-4 2.5-6.5 0-5.5-4.5-10-10-10zm-6 9v3h12v-3H6zm1 8.5c1.4.9 3.1 1.5 5 1.5s3.6-.6 5-1.5l-1.2-2.5H8.2l-1.2 2.5z" />
        </svg>
      );
    case 'freefire':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#C2410C] drop-shadow-md"
          fill="currentColor"
          aria-label="Garena Free Fire Official Flame Wings"
        >
          <path d="M12 2C9.5 5 6 9.5 7 13.5c.7 2.8 3 4.5 5 4.5s4.3-1.7 5-4.5C18 9.5 14.5 5 12 2zm0 18c-3.5 0-6.5-1.5-7.5-3.5 1.5.5 3.5.5 5.5-.5-2-1.5-3-3.5-3-5.5 2 1 4.5 1 6.5-1 1 2 2 3.5 3.5 4.5-1.5 1-3.5 1.5-5 1.5z" />
        </svg>
      );
    case 'supercell':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#A16207] drop-shadow-md"
          fill="currentColor"
          aria-label="Supercell Official Crown Crest"
        >
          <path d="M5 4l3.5 4L12 3l3.5 5L19 4l1 13H4L5 4zm-1 15h16v2H4v-2z" />
          <circle cx="12" cy="13" r="1.5" />
        </svg>
      );
    case 'genshin':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#6B21A8] drop-shadow-md"
          fill="currentColor"
          aria-label="Genshin Impact Primogem Official Emblem"
        >
          <path d="M12 2L15.5 9L22 12L15.5 15L12 22L8.5 15L2 12L8.5 9L12 2Z" />
          <path d="M12 5.5L14.5 10L19 12L14.5 14L12 18.5L9.5 14L5 12L9.5 10L12 5.5Z" fill="#F3E8FF" />
        </svg>
      );
    case 'tradingview':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#0E7490] drop-shadow-md"
          fill="currentColor"
          aria-label="TradingView Official Logo"
        >
          <path d="M3 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5-6h3v12H8V8zm5 4h3v8h-3v-8zm5-7h3v15h-3V5z" />
        </svg>
      );
    case 'discord':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#4338CA] drop-shadow-md"
          fill="currentColor"
          aria-label="Discord Official Clyde Mascot"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case 'vpn':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-[#0F766E] drop-shadow-md"
          fill="currentColor"
          aria-label="MODASR Connect Official Shield"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm3 9.5l-3 2-1-1.5 2-1.5h-3v-2h4l-2-2 1-1 3.5 3.5-1.5 2.5z" />
        </svg>
      );
    default:
      return (
        <span className="font-black text-base tracking-tight text-slate-900 uppercase">
          {iconType}
        </span>
      );
  }
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(val: string | number): string {
  return String(val).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] || d);
}

export function formatPersianUsd(usd: number): string {
  const fixed = usd.toFixed(2).replace('.', '/');
  return `≈ ${toPersianDigits(fixed)} دلار`;
}

/**
 * Strips parenthetical suffixes and redundant adjectives so the card title
 * fits on one clean line just like "اشتراک ChatGPT Plus" or "اشتراک Canva Pro".
 */
export function getCleanCardTitle(product: ModasrProduct, isRtl: boolean): string {
  if (!isRtl) {
    return product.titleEn.replace(/\s*\([^)]*\)/g, '').trim();
  }
  return product.titleFa
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/Claude 3\.7 Sonnet Pro/g, 'Claude Pro')
    .replace(/Google Gemini Advanced \+ 2TB فضای ابری/g, 'Gemini Advanced')
    .replace(/Midjourney V6\.1/g, 'Midjourney Pro')
    .replace(/\s+اختصاصی/g, '')
    .replace(/\s+اورجینال/g, '')
    .replace(/\s+قانونی/g, '')
    .trim();
}

export interface ProductSplitCardProps {
  product: ModasrProduct;
  cascadeIndex?: number;
  lang?: Language;
  usdtRate: number;
  currencyMode?: 'toman' | 'usd';
  onAddToCart: (product: ModasrProduct) => void;
  onShowDetails?: (product: ModasrProduct) => void;
  testIdPrefix?: string;
}

export function ProductSplitCard({
  product,
  cascadeIndex = 0,
  lang = 'fa',
  usdtRate,
  onAddToCart,
  onShowDetails,
  testIdPrefix = 'product-card',
}: ProductSplitCardProps) {
  const isRtl = lang === 'fa';
  const tomanPrice = convertUsdToToman(product.priceUsd, usdtRate);
  const oldTomanPrice =
    Math.round((tomanPrice * 1.15) / 10000) * 10000 || tomanPrice + 150000;

  const style = VISUAL_STYLES[product.iconType] || VISUAL_STYLES.openai;
  const cleanTitle = getCleanCardTitle(product, isRtl);

  const categorySubLabel =
    product.category === 'ai' || product.category === 'subscriptions'
      ? isRtl
        ? 'اشتراک‌های دیجیتال'
        : 'Digital Subscriptions'
      : isRtl
      ? product.categoryLabelFa
      : product.categoryLabelEn;

  return (
    <div
      data-testid={`${testIdPrefix}-${product.id}`}
      data-scroll-reveal="slide-up"
      data-cascade-index={cascadeIndex}
      data-revealed="true"
      data-glass-card="true"
      onClick={() => onShowDetails?.(product)}
      className="group relative rounded-[26px] bg-[#061C19]/65 backdrop-blur-2xl border border-white/20 hover:border-[#2BBAA5]/80 overflow-hidden transition-all duration-300 shadow-[0_16px_42px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:shadow-[0_18px_48px_rgba(43,186,165,0.25),inset_0_1px_2px_rgba(255,255,255,0.5)] cursor-pointer select-none"
    >
      {/* Top specular glass highlight line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none z-20"
      />

      {/* Brand gradient aura scaled at 1.5 and 0 opacity, dropping to scale 1 and opacity 100 on group-hover */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${style.accentGlow} 0%, transparent 70%)`,
        }}
        className="absolute inset-0 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0"
      />

      {/* Subtle diagonal glass reflection sheen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none z-0"
      />

      <div
        dir="rtl"
        className="relative z-10 flex flex-row items-stretch min-h-[224px] sm:min-h-[236px]"
      >
        {/* RIGHT PANEL: 3D HOLOGRAM PEDESTAL & FLOATING SQUIRCLE ICON (38% width) */}
        <div
          style={{ background: style.bgGradient }}
          className="relative w-[38%] sm:w-[39%] shrink-0 overflow-hidden flex flex-col items-center justify-center border-l border-white/15 backdrop-blur-xl"
        >
          {/* Ambient Cyber Grid & Star Dots */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
            className="absolute inset-0 opacity-25 pointer-events-none"
          />

          {/* Holographic Wireframe Globe / Aura behind icon */}
          <div
            aria-hidden="true"
            style={{
              borderColor: `${style.pedestalColor}40`,
              boxShadow: `0 0 40px ${style.accentGlow}`,
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed bg-white/[0.03] backdrop-blur-md flex items-center justify-center relative"
          >
            {/* Outer Orbital Ring */}
            <div
              aria-hidden="true"
              style={{ borderColor: `${style.pedestalColor}30` }}
              className="absolute inset-2 rounded-full border"
            />

            {/* 3D Perspective Stage for Crystal Glass Squircle (چرخش نرم و کامل ۳۶۰ درجه سه بعدی) */}
            <div
              data-testid={`product-glass-squircle-${product.id}`}
              style={{
                perspective: '900px',
              }}
              className="relative z-10 w-16 h-16 sm:w-[72px] sm:h-[72px] flex items-center justify-center cursor-pointer select-none"
            >
              <div
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full animate-glass-spin-3d group-hover:[animation-play-state:paused]"
              >
                {/* FRONT FACE (وجه جلویی کریستال شیشه‌ای) */}
                <div
                  style={{
                    background: style.glassGradient,
                    boxShadow: `-5px 7px 0px rgba(255,255,255,0.48), -8px 12px 24px rgba(0,0,0,0.55), 0 16px 36px -4px ${style.accentGlow}, inset 0 2px 4px rgba(255,255,255,0.95), inset 2px 0 3px rgba(255,255,255,0.7), inset -3px -5px 10px rgba(0,0,0,0.45)`,
                    transform: 'translateZ(5px)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 rounded-[20px] border border-white/85 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl"
                >
                  {/* Glass Top Curve Specular Sheen (انعکاس نور هلالی بالای شیشه) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[48%] rounded-t-[19px] bg-gradient-to-b from-white/80 via-white/25 to-transparent pointer-events-none z-10"
                  />

                  {/* Glass Diagonal Reflection Arc */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-white/45 via-transparent to-black/25 pointer-events-none z-10"
                  />

                  {/* Animated Glass Specular Sheen Beam (نور بازتابی متحرک روی شیشه) */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-15 animate-glass-sheen blur-[0.8px]"
                  />

                  {/* Distinctive Glass Refraction Aperture Notch at Top Edge */}
                  <div
                    aria-hidden="true"
                    className="absolute top-1.5 right-2 w-3.5 h-1.5 rounded-full border border-white/95 bg-white/45 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)] pointer-events-none z-20 animate-glass-aperture"
                  />

                  {/* Bottom Prism Rim Highlight */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-2.5 bottom-1 h-[1.5px] bg-white/65 blur-[0.3px] rounded-full pointer-events-none z-10"
                  />

                  {/* Embedded Brand Emblem Inside Crystal Glass Body */}
                  <div className="relative z-20 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
                    {renderBrandEmblem(product.iconType)}
                  </div>
                </div>

                {/* BACK FACE (وجه پشتی با لوگوی برند و مُهر اصالت مودسر برای چرخش کامل ۳۶۰ درجه بدون تار شدن یا معکوس شدن) */}
                <div
                  style={{
                    background: style.glassGradient,
                    boxShadow: `-5px 7px 0px rgba(255,255,255,0.48), -8px 12px 24px rgba(0,0,0,0.55), 0 16px 36px -4px ${style.accentGlow}, inset 0 2px 4px rgba(255,255,255,0.95), inset 2px 0 3px rgba(255,255,255,0.7), inset -3px -5px 10px rgba(0,0,0,0.45)`,
                    transform: 'rotateY(180deg) translateZ(5px)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 rounded-[20px] border border-white/85 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl"
                >
                  {/* Reverse Face Top Curve Sheen */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[48%] rounded-t-[19px] bg-gradient-to-b from-white/80 via-white/25 to-transparent pointer-events-none z-10"
                  />

                  {/* Reverse Diagonal Arc */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-bl from-white/45 via-transparent to-black/25 pointer-events-none z-10"
                  />

                  {/* Reverse Aperture Notch */}
                  <div
                    aria-hidden="true"
                    className="absolute top-1.5 left-2 w-3.5 h-1.5 rounded-full border border-white/95 bg-white/45 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)] pointer-events-none z-20"
                  />

                  {/* Embedded Brand Emblem Inside Back Face */}
                  <div className="relative z-20 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
                    {renderBrandEmblem(product.iconType)}
                  </div>

                  {/* Modasr Holographic Verified Stamp */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 font-mono text-[7px] font-black tracking-widest text-white/55 uppercase select-none pointer-events-none"
                  >
                    MODASR ✦
                  </span>
                </div>

                {/* Physical Crystal Glass Core/Thickness Rim */}
                <div
                  aria-hidden="true"
                  style={{
                    transform: 'translateZ(0px)',
                  }}
                  className="absolute inset-0 rounded-[20px] border-2 border-white/30 bg-white/[0.08] pointer-events-none"
                />
              </div>
            </div>

            {/* Neon Magenta/Violet Elliptical Ring Under Squircle */}
            <div
              aria-hidden="true"
              style={{
                borderColor: style.ringColor,
                boxShadow: `0 0 14px ${style.ringColor}`,
              }}
              className="absolute -bottom-1 w-24 sm:w-28 h-6 rounded-[100%] border opacity-85 pointer-events-none animate-glass-ring"
            />
          </div>

          {/* Glowing Hologram Pedestal Base */}
          <div
            aria-hidden="true"
            className="relative mt-1.5 flex flex-col items-center pointer-events-none"
          >
            <div
              style={{
                borderColor: `${style.pedestalColor}75`,
                background: `radial-gradient(ellipse at center, ${style.pedestalColor}55 0%, transparent 72%)`,
              }}
              className="w-28 sm:w-32 h-5 rounded-[100%] border"
            />
            <div
              style={{
                borderColor: `${style.pedestalColor}38`,
              }}
              className="w-36 sm:w-40 h-4 -mt-3 rounded-[100%] border"
            />
          </div>

          {/* Large Faint Watermark Letters at Bottom-Right */}
          <span
            aria-hidden="true"
            className="absolute bottom-1 right-2.5 font-podium font-black text-2xl sm:text-3xl tracking-wider text-white/[0.11] pointer-events-none select-none uppercase"
          >
            {style.watermark}
          </span>
        </div>

        {/* LEFT PANEL: PRODUCT DETAILS, PRICING & QUICK ADD BUTTON (62% width) */}
        <div className="flex-1 p-3.5 sm:p-5 flex flex-col justify-between text-center bg-white/[0.03] backdrop-blur-xl">
          <div>
            {/* Row 1: Brand + Category Kicker */}
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium text-slate-200/90">
              <span className="font-semibold text-white">
                {product.platformBrand}
              </span>
              <span>{categorySubLabel}</span>
            </div>

            {/* Row 2: Bold White Title */}
            <h3 className="mt-1 text-[15px] sm:text-[18px] font-black text-white leading-snug line-clamp-1">
              {cleanTitle}
            </h3>

            {/* Row 3: Truncated Description */}
            <p className="mt-1 text-[11px] sm:text-xs text-slate-200/80 line-clamp-1 leading-relaxed">
              {isRtl ? product.subtitleFa : product.subtitleEn}
            </p>
          </div>

          {/* Row 4 & 5: Price + Strikethrough + USD */}
          <div className="my-2">
            <div className="flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0.5">
              <span className="text-[11px] sm:text-xs text-slate-300/85 font-medium">
                {isRtl ? 'شروع از' : 'From'}
              </span>
              <span className="text-[17px] sm:text-[21px] font-black text-white tracking-tight tabular-nums">
                {tomanPrice.toLocaleString('fa-IR')} تومان
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400/70 line-through tabular-nums">
                {oldTomanPrice.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="mt-0.5 text-[11px] sm:text-xs font-semibold text-[#81E6D9] tabular-nums">
              {formatPersianUsd(product.priceUsd)}
            </div>
          </div>

          {/* Row 6: Full-Width Glass-Finished Mint-Teal Quick Add Button */}
          <button
            type="button"
            data-testid={`quick-add-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full py-2.5 sm:py-3 px-4 rounded-2xl bg-[#2BBAA5]/90 hover:bg-[#34CDB6] backdrop-blur-md border border-white/35 active:scale-[0.98] text-[#041815] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 shadow-[0_6px_20px_rgba(43,186,165,0.32),inset_0_1px_1px_rgba(255,255,255,0.5)] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{isRtl ? 'افزودن سریع' : 'Quick Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
