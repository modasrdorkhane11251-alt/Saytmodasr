import { Cpu, Gamepad2, LayoutGrid, Search, User } from 'lucide-react';
import { Language, SECTIONS, SectionId } from '../utils/heroConfig';

interface BottomDockProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  lang: Language;
  accentHex: string;
}

export function BottomDock({
  activeSection,
  onSelectSection,
  lang,
  accentHex,
}: BottomDockProps) {
  const getIcon = (id: SectionId, isActive: boolean) => {
    const className = `w-5 h-5 sm:w-5 sm:h-5 transition-transform duration-300 ${
      isActive ? 'scale-110' : 'group-hover:scale-105'
    }`;
    switch (id) {
      case 'games':
        return <Gamepad2 className={className} />;
      case 'ai':
        return <Cpu className={className} />;
      case 'search':
        return <Search className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'web':
        return <LayoutGrid className={className} />;
      case 'studio':
        return <User className={className} />;
    }
  };

  return (
    <div className="w-full flex justify-center px-4 pb-3 sm:pb-5 z-30">
      <nav
        aria-label="Section Switcher Dock"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
        style={{
          boxShadow: `0 12px 40px -8px rgba(0, 0, 0, 0.85), 0 0 28px -6px ${accentHex}45`,
          borderColor: `${accentHex}45`,
        }}
        className="relative flex items-center justify-between gap-1 sm:gap-3 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/80 backdrop-blur-xl border transition-all duration-500 max-w-xl w-full"
      >
        {/* Top subtle specular reflection line */}
        <div
          className="absolute inset-x-8 top-0 h-px opacity-60 pointer-events-none transition-colors duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)`,
          }}
        />

        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          const label = lang === 'fa' ? section.fa.tabLabel : section.en.tabLabel;

          if (section.isCenterAction) {
            return (
              <button
                key={section.id}
                type="button"
                data-testid={`dock-btn-${section.id}`}
                onClick={() => onSelectSection(section.id)}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className="group relative flex flex-col items-center justify-center -mt-4 sm:-mt-5 px-2 focus:outline-none cursor-pointer"
              >
                <div
                  style={{
                    borderColor: isActive ? section.accentHex : 'rgba(255,255,255,0.28)',
                    boxShadow: isActive
                      ? `0 0 24px ${section.accentHex}80, inset 0 0 14px ${section.accentHex}40`
                      : `0 0 16px ${accentHex}30`,
                    color: isActive ? section.accentHex : '#FFFFFF',
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-950/95 border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-white/70"
                >
                  {getIcon(section.id, isActive)}
                </div>
                <span
                  style={{ color: isActive ? section.accentHex : 'rgba(255,255,255,0.75)' }}
                  className="mt-1 text-[10px] sm:text-[11px] font-medium tracking-wide whitespace-nowrap transition-colors"
                >
                  {label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={section.id}
              type="button"
              data-testid={`dock-btn-${section.id}`}
              onClick={() => onSelectSection(section.id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              style={{
                color: isActive ? section.accentHex : 'rgba(255,255,255,0.72)',
              }}
              className="group relative flex-1 flex flex-col items-center justify-center py-1.5 px-2 sm:px-3 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-200 focus:outline-none cursor-pointer"
            >
              {getIcon(section.id, isActive)}
              <span className="mt-1 text-[10px] sm:text-xs font-medium tracking-wide whitespace-nowrap">
                {label}
              </span>

              {/* Active Neon Underline Indicator */}
              {isActive && (
                <span
                  style={{
                    backgroundColor: section.accentHex,
                    boxShadow: `0 0 12px ${section.accentHex}`,
                  }}
                  className="absolute -bottom-1 w-7 sm:w-9 h-1 rounded-full transition-all duration-300"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
