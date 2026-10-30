import { Cpu, Gamepad2, Home, LayoutGrid, Search, User } from 'lucide-react';
import { BOTTOM_NAV_SECTIONS, Language, SectionId } from '../utils/heroConfig';

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
  const getIcon = (id: SectionId, isActive: boolean, sectionAccent: string) => {
    const className = `w-[18px] h-[18px] sm:w-5 sm:h-5 transition-all duration-300 ${
      isActive
        ? 'scale-110 stroke-[2.4]'
        : 'group-hover:scale-110 stroke-[2]'
    }`;
    const style = {
      filter: isActive
        ? `drop-shadow(0 2px 6px ${sectionAccent}) drop-shadow(0 0 2px rgba(255,255,255,0.65))`
        : 'drop-shadow(0 2px 3px rgba(0,0,0,0.75))',
    };

    switch (id) {
      case 'home':
        return <Home className={className} style={style} />;
      case 'games':
        return <Gamepad2 className={className} style={style} />;
      case 'ai':
        return <Cpu className={className} style={style} />;
      case 'web':
        return <LayoutGrid className={className} style={style} />;
      case 'search':
        return <Search className={className} style={style} />;
      case 'studio':
        return <User className={className} style={style} />;
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 flex justify-center px-2 sm:px-4 pb-2.5 sm:pb-4 pt-3 z-40 pointer-events-none bg-gradient-to-t from-black/90 via-black/45 to-transparent">
      <nav
        aria-label="Bottom Page Navigation"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
        style={{
          boxShadow: `0 7px 0 #02050a, 0 20px 44px -6px rgba(0, 0, 0, 0.95), 0 0 32px -6px ${accentHex}45, inset 0 1.5px 1px rgba(255, 255, 255, 0.24), inset 0 -3px 8px rgba(0, 0, 0, 0.85)`,
        }}
        className="dock-3d-chassis pointer-events-auto relative grid grid-cols-6 items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-[22px] sm:rounded-[28px] backdrop-blur-2xl transition-all duration-300 max-w-2xl w-full"
      >
        {/* Top 3D Metallic-Glass Bevel Highlight */}
        <div
          className="absolute inset-x-6 top-0 h-[1.5px] opacity-80 pointer-events-none transition-colors duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.55), ${accentHex}, rgba(255,255,255,0.55), transparent)`,
          }}
        />

        {/* Subtle Inner Recessed Tray Rim */}
        <div className="absolute inset-1 rounded-[18px] sm:rounded-[24px] pointer-events-none border border-white/[0.04] bg-black/25" />

        {BOTTOM_NAV_SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          const label =
            section.id === 'home'
              ? lang === 'fa'
                ? 'خانه'
                : 'Home'
              : section.id === 'games'
              ? lang === 'fa'
                ? 'گیم و بازی'
                : 'Gaming'
              : section.id === 'ai'
              ? lang === 'fa'
                ? 'هوش مصنوعی'
                : 'AI Hub'
              : section.id === 'web'
              ? lang === 'fa'
                ? 'اتصال و اپ'
                : 'VPN & Apps'
              : section.id === 'search'
              ? lang === 'fa'
                ? 'جستجو'
                : 'Search'
              : lang === 'fa'
              ? 'حساب'
              : 'Account';

          return (
            <button
              key={section.id}
              type="button"
              data-testid={`dock-btn-${section.id}`}
              onClick={() => onSelectSection(section.id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              style={
                isActive
                  ? {
                      color: '#ffffff',
                      background: `linear-gradient(180deg, ${section.accentHex}48 0%, ${section.accentHex}22 48%, rgba(9, 15, 26, 0.96) 100%)`,
                      borderColor: `${section.accentHex}99`,
                      boxShadow: `0 5px 0 ${section.accentHex}66, 0 7px 0 #02060d, 0 12px 22px -3px ${section.accentHex}70, inset 0 1.5px 2px rgba(255, 255, 255, 0.65), inset 0 -2px 6px ${section.accentHex}40`,
                    }
                  : {
                      color: 'rgba(241, 245, 249, 0.86)',
                    }
              }
              className={`dock-3d-btn group relative min-h-[54px] sm:min-h-[60px] flex flex-col items-center justify-center py-1.5 px-0.5 sm:px-2 rounded-2xl border focus:outline-none cursor-pointer select-none ${
                isActive ? 'dock-3d-btn--active z-10' : 'dock-3d-btn--inactive'
              }`}
            >
              {/* Top Specular Glass Dome Gloss on each 3D Keycap */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-1.5 top-0.5 h-3 rounded-t-xl bg-gradient-to-b from-white/25 to-transparent opacity-80"
              />

              {/* 3D Sculpted Icon Orb / Squircle */}
              <div
                style={
                  isActive
                    ? {
                        background: `radial-gradient(circle at 30% 25%, #ffffff40 0%, ${section.accentHex}55 45%, rgba(8, 14, 26, 0.9) 100%)`,
                        boxShadow: `0 3px 0 ${section.accentHex}80, 0 6px 12px ${section.accentHex}55, inset 0 1.5px 2px rgba(255,255,255,0.75)`,
                        borderColor: `${section.accentHex}`,
                        color: '#ffffff',
                      }
                    : {
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.85) 100%)',
                        boxShadow:
                          '0 2.5px 0 rgba(2,6,14,0.95), 0 4px 6px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.28)',
                        borderColor: 'rgba(255,255,255,0.14)',
                        color: section.accentHex,
                      }
                }
                className={`dock-3d-icon-badge w-8 h-8 sm:w-9 sm:h-9 rounded-xl border ${
                  isActive
                    ? '-translate-y-0.5 scale-105'
                    : 'group-hover:-translate-y-0.5 group-hover:scale-105'
                }`}
              >
                {/* Inner Top Specular Dot */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1 top-0.5 h-1.5 rounded-full bg-gradient-to-b from-white/35 to-transparent"
                />
                {getIcon(section.id, isActive, section.accentHex)}
              </div>

              {/* Crisp 3D Embossed Label */}
              <span
                style={{
                  textShadow: isActive
                    ? `0 1px 2px rgba(0,0,0,0.95), 0 0 10px ${section.accentHex}`
                    : '0 1px 2px rgba(0,0,0,0.9)',
                  color: isActive ? '#ffffff' : 'rgba(226, 232, 240, 0.88)',
                }}
                className="mt-1 text-[9.5px] sm:text-[11px] font-extrabold tracking-tight whitespace-nowrap transition-colors duration-200"
              >
                {label}
              </span>

              {/* Active 3D Neon Front Ledge Bar */}
              {isActive && (
                <span
                  style={{
                    backgroundColor: section.accentHex,
                    boxShadow: `0 0 12px ${section.accentHex}, 0 0 4px #ffffff`,
                  }}
                  className="absolute -bottom-1 w-7 sm:w-9 h-1.5 rounded-full border border-white/60 transition-all duration-300"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
