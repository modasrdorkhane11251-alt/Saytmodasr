import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Cpu, Gamepad2, Globe, Search, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import {
  Language,
  SHOWCASE_ITEMS,
  SectionId,
  filterShowcaseItems,
} from '../utils/heroConfig';

interface InteractiveShowcasePanelProps {
  activeSection: SectionId;
  lang: Language;
  onNavigateSection: (id: SectionId) => void;
}

export function InteractiveShowcasePanel({
  activeSection,
  lang,
  onNavigateSection,
}: InteractiveShowcasePanelProps) {
  const [category, setCategory] = useState<'all' | 'ai' | 'web' | 'games'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (activeSection !== 'search' && activeSection !== 'studio') {
    return null;
  }

  const filteredItems = filterShowcaseItems(SHOWCASE_ITEMS, category, searchQuery);

  if (activeSection === 'search') {
    const categories: Array<{ id: 'all' | 'ai' | 'web' | 'games'; labelEn: string; labelFa: string }> = [
      { id: 'all', labelEn: 'All', labelFa: 'همه' },
      { id: 'ai', labelEn: 'AI Models', labelFa: 'هوش مصنوعی' },
      { id: 'web', labelEn: 'Web & Apps', labelFa: 'طراحی وب' },
      { id: 'games', labelEn: 'Gaming', labelFa: 'بازی' },
    ];

    return (
      <div
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
        className="hidden lg:flex flex-col w-[420px] xl:w-[460px] bg-black/70 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_40px_rgba(0,210,255,0.15)] animate-scale-in"
      >
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-cyan-400 absolute start-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'fa'
                ? 'جستجوی سرویس هوش مصنوعی، وب یا گیم...'
                : 'Search AI models, web platforms, or games...'
            }
            aria-label={lang === 'fa' ? 'جستجو' : 'Search products'}
            className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl ps-10 pe-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 mt-3 bg-white/5 p-1 rounded-xl">
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  active
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {lang === 'fa' ? cat.labelFa : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Filtered Product Cards with framer-motion smooth hover scale & glowing shadow */}
        <div className="mt-4 space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
          {filteredItems.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <motion.div
                key={item.id}
                whileHover={{
                  scale: 1.025,
                  boxShadow: `0 0 25px ${item.accent}35, 0 8px 24px rgba(0,0,0,0.5)`,
                  borderColor: `${item.accent}80`,
                }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    style={{ borderColor: `${item.accent}50`, color: item.accent }}
                    className="w-10 h-10 rounded-xl bg-black/60 border flex items-center justify-center shrink-0"
                  >
                    {item.category === 'ai' && <Cpu className="w-5 h-5" />}
                    {item.category === 'web' && <Globe className="w-5 h-5" />}
                    {item.category === 'games' && <Gamepad2 className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {lang === 'fa' ? item.titleFa : item.titleEn}
                    </div>
                    <div className="text-xs text-white/55 truncate">
                      {lang === 'fa' ? item.subtitleFa : item.subtitleEn}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedItemId(item.id);
                    onNavigateSection(item.category);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>
                    {isSelected
                      ? lang === 'fa'
                        ? 'انتخاب شد'
                        : 'Active'
                      : lang === 'fa'
                        ? 'مشاهده'
                        : 'Open'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Studio Capabilities Card (when activeSection === 'studio')
  const studioPillars = [
    {
      icon: Zap,
      titleEn: 'Ultra-Fast Performance',
      titleFa: 'عملکرد سریع',
      descEn: 'Zero lag, sub-second load times',
      descFa: 'بدون لگ و تاخیر با هسته بهینه',
    },
    {
      icon: ShieldCheck,
      titleEn: 'Enterprise Security',
      titleFa: 'طراحی امن',
      descEn: 'Hardened architecture & standards',
      descFa: 'با رعایت بالاترین استانداردهای امنیتی',
    },
    {
      icon: Smartphone,
      titleEn: 'Fully Responsive',
      titleFa: 'کاملاً ریسپانسیو',
      descEn: 'Mobile, tablet & 4K desktop',
      descFa: 'سازگار با موبایل، تبلت و دسکتاپ',
    },
    {
      icon: CheckCircle2,
      titleEn: 'Dedicated Dark Aesthetics',
      titleFa: 'حالت تاریک مدرن',
      descEn: 'Tailored to high-contrast luxury',
      descFa: 'طراحی نئونی و شیشه‌ای چشم‌نواز',
    },
  ];

  return (
    <div
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
      className="hidden lg:grid grid-cols-2 gap-3 w-[420px] xl:w-[460px] animate-scale-in"
    >
      {studioPillars.map((pillar) => {
        const IconComponent = pillar.icon;
        return (
          <motion.div
            key={pillar.titleEn}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 28px rgba(245, 158, 11, 0.35), 0 10px 24px rgba(0,0,0,0.5)',
              borderColor: 'rgba(251, 191, 36, 0.6)',
            }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 rounded-2xl bg-black/65 backdrop-blur-xl border border-amber-500/25 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3">
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-white">
              {lang === 'fa' ? pillar.titleFa : pillar.titleEn}
            </div>
            <div className="text-xs text-white/55 mt-1">
              {lang === 'fa' ? pillar.descFa : pillar.descEn}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
