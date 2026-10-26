import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Layers, Play, Pause, Sparkles } from 'lucide-react';
import { Language } from '../utils/heroConfig';
import {
  THEME_PRESETS,
  ThemePresetId,
  getNextPresetId,
  getPresetById,
} from '../utils/themePresets';

interface ThemeManagerProps {
  activePresetId: ThemePresetId;
  onSelectPreset: (presetId: ThemePresetId) => void;
  lang: Language;
}

export function ThemeManager({
  activePresetId,
  onSelectPreset,
  lang,
}: ThemeManagerProps) {
  const [autoCycle, setAutoCycle] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const activePreset = getPresetById(activePresetId);
  const isRtl = lang === 'fa';

  useEffect(() => {
    if (!autoCycle) return;
    const interval = window.setInterval(() => {
      onSelectPreset(getNextPresetId(activePresetId, 1));
    }, 5000);
    return () => window.clearInterval(interval);
  }, [autoCycle, activePresetId, onSelectPreset]);

  const handleCycle = (direction: 1 | -1) => {
    onSelectPreset(getNextPresetId(activePresetId, direction));
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      data-testid="theme-manager"
      className="flex flex-col items-end gap-2 z-30"
    >
      {/* Expanded Preset Selector Tray */}
      {expanded && (
        <div
          role="region"
          aria-label={isRtl ? 'انتخابگر پس‌زمینه شیدر' : 'Shader Background Presets'}
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl animate-scale-in"
        >
          {THEME_PRESETS.map((preset) => {
            const isSelected = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                aria-pressed={isSelected}
                style={{
                  borderColor: isSelected ? preset.primaryColor : 'transparent',
                  backgroundColor: isSelected
                    ? `${preset.primaryColor}22`
                    : 'rgba(255,255,255,0.04)',
                  color: isSelected ? preset.primaryColor : 'rgba(255,255,255,0.75)',
                }}
                className="px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 hover:text-white hover:bg-white/10 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isRtl ? preset.nameFa : preset.nameEn}
              </button>
            );
          })}
        </div>
      )}

      {/* Compact ThemeManager Control Bar */}
      <div
        style={{
          borderColor: `${activePreset.primaryColor}45`,
          boxShadow: `0 8px 28px -6px rgba(0,0,0,0.8), 0 0 18px -4px ${activePreset.primaryColor}35`,
        }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border transition-all duration-300"
      >
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={isRtl ? 'مدیریت تم و پس‌زمینه' : 'Toggle Theme Preset Drawer'}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white pr-1 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Layers
            style={{ color: activePreset.primaryColor }}
            className="w-3.5 h-3.5 shrink-0"
          />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide">
            {isRtl ? activePreset.nameFa : activePreset.nameEn}
          </span>
        </button>

        <span className="text-white/20 select-none" aria-hidden="true">
          |
        </span>

        {/* Previous Preset Button */}
        <button
          type="button"
          onClick={() => handleCycle(-1)}
          aria-label={isRtl ? 'تم قبلی' : 'Previous theme preset'}
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isRtl ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Next / Cycle Preset Button */}
        <button
          type="button"
          onClick={() => handleCycle(1)}
          aria-label={isRtl ? 'چرخش تم بعدی' : 'Cycle next theme preset'}
          style={{ color: activePreset.primaryColor }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span className="hidden sm:inline">
            {isRtl ? 'تغییر شیدر' : 'Cycle Shader'}
          </span>
        </button>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={() => handleCycle(1)}
          aria-label={isRtl ? 'تم بعدی' : 'Next theme preset'}
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isRtl ? (
            <ChevronLeft className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Auto-Cycle Toggle */}
        <button
          type="button"
          onClick={() => setAutoCycle((prev) => !prev)}
          aria-pressed={autoCycle}
          aria-label={isRtl ? 'چرخش خودکار پس‌زمینه' : 'Auto-cycle theme presets'}
          style={{
            color: autoCycle ? activePreset.primaryColor : 'rgba(255,255,255,0.6)',
          }}
          className="p-1 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          {autoCycle ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
