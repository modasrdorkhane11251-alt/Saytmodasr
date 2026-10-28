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
  const getIcon = (id: SectionId, isActive: boolean) => {
    const className = `w-5 h-5 transition-transform duration-200 ${
      isActive ? 'scale-110' : 'group-hover:scale-105'
    }`;
    switch (id) {
      case 'home':
        return <Home className={className} />;
      case 'games':
        return <Gamepad2 className={className} />;
      case 'ai':
        return <Cpu className={className} />;
      case 'web':
        return <LayoutGrid className={className} />;
      case 'search':
        return <Search className={className} />;
      case 'studio':
        return <User className={className} />;
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 flex justify-center px-2 sm:px-4 pb-2.5 sm:pb-4 pt-2 z-40 pointer-events-none bg-gradient-to-t from-black/45 via-black/15 to-transparent">
      <nav
        aria-label="Bottom Page Navigation"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
        style={{
          boxShadow: `0 12px 40px -8px rgba(0, 0, 0, 0.35), 0 0 28px -6px ${accentHex}35, inset 0 1px 2px rgba(255, 255, 255, 0.75)`,
        }}
        className="pointer-events-auto relative grid grid-cols-6 items-center gap-0.5 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full bg-white/[0.15] backdrop-blur-2xl border border-white/45 transition-all duration-300 max-w-2xl w-full"
      >
        {/* Top subtle specular reflection line */}
        <div
          className="absolute inset-x-8 top-0 h-[1.5px] opacity-90 pointer-events-none transition-colors duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)`,
          }}
        />

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
              style={{
                color: isActive ? section.accentHex : 'rgba(255,255,255,0.88)',
              }}
              className={`group relative min-h-[46px] flex flex-col items-center justify-center py-1.5 px-0.5 sm:px-2 rounded-xl sm:rounded-2xl transition-all duration-200 focus:outline-none cursor-pointer ${
                isActive
                  ? 'bg-white/[0.22] border border-white/35 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65)]'
                  : 'hover:bg-white/[0.12] hover:text-white'
              }`}
            >
              {getIcon(section.id, isActive)}
              <span className="mt-1 text-[9.5px] sm:text-[11px] font-bold tracking-tight whitespace-nowrap">
                {label}
              </span>

              {/* Active Neon Underline Indicator */}
              {isActive && (
                <span
                  style={{
                    backgroundColor: section.accentHex,
                    boxShadow: `0 0 12px ${section.accentHex}`,
                  }}
                  className="absolute -bottom-0.5 w-6 sm:w-8 h-1 rounded-full transition-all duration-300"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
