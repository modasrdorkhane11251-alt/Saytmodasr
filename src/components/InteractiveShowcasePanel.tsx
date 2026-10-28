import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Gamepad2,
  Globe,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
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
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (activeSection !== 'search' && activeSection !== 'studio') {
    return null;
  }

  const filteredItems = filterShowcaseItems(SHOWCASE_ITEMS, category, '');

  if (activeSection === 'search') {
    const categories: Array<{
      id: 'all' | 'ai' | 'web' | 'games';
      labelEn: string;
      labelFa: string;
    }> = [
      { id: 'all', labelEn: 'All', labelFa: 'همه' },
      { id: 'ai', labelEn: 'AI Models', labelFa: 'هوش مصنوعی' },
      { id: 'web', labelEn: 'Web & Apps', labelFa: 'طراحی وب' },
      { id: 'games', labelEn: 'Gaming', labelFa: 'بازی' },
    ];

    return (
      <div
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
        className="hidden lg:flex flex-col w-[420px] xl:w-[460px] bg-white/[0.14] backdrop-blur-2xl border border-white/45 rounded-2xl p-5 shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.7)] animate-scale-in"
      >
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-white/[0.12] border border-white/30 p-1 rounded-xl">
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {lang === 'fa' ? cat.labelFa : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Items List */}
        <div className="mt-3.5 space-y-2 max-h-[340px] overflow-y-auto pe-1">
          {filteredItems.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.22] border-white/75 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]'
                    : 'bg-white/[0.12] border-white/35 hover:border-white/60 hover:bg-white/[0.18]'
                }`}
                onClick={() =>
                  setSelectedItemId(isSelected ? null : item.id)
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {lang === 'fa' ? item.titleFa : item.titleEn}
                      </div>
                      <div className="text-[11px] text-white/75">
                        {item.category.toUpperCase()} ·{' '}
                        {lang === 'fa' ? item.subtitleFa : item.subtitleEn}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-300 tabular-nums">
                    {item.metric}
                  </span>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2.5 pt-2.5 border-t border-white/25 text-[11px] text-white/85 space-y-1.5"
                  >
                    <p>{lang === 'fa' ? item.subtitleFa : item.subtitleEn}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-emerald-300 flex items-center gap-1 text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        {lang === 'fa' ? 'تضمین تحویل آنی' : 'Instant Guaranteed'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.category === 'ai') onNavigateSection('ai');
                          else if (item.category === 'games') onNavigateSection('games');
                          else onNavigateSection('web');
                        }}
                        className="text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>{lang === 'fa' ? 'مشاهده دسته' : 'Explore'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Studio / Account Section
  return (
    <div
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
      className="hidden lg:flex flex-col w-[420px] xl:w-[460px] bg-white/[0.14] backdrop-blur-2xl border border-white/45 rounded-2xl p-5 shadow-[0_16px_45px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.7)] animate-scale-in"
    >
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/25">
        <ShieldCheck className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          {lang === 'fa' ? 'وضعیت پلتفرم و تضمین‌ها' : 'Platform & Verification'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] text-white/50">
            {lang === 'fa' ? 'زمان پاسخگویی' : 'Response Time'}
          </div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">
            {lang === 'fa' ? '< ۱۵ دقیقه' : '< 15 mins'}
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] text-white/50">
            {lang === 'fa' ? 'پشتیبانی' : 'Support'}
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            {lang === 'fa' ? '۲۴/۷ آنلاین' : '24/7 Live'}
          </div>
        </div>
      </div>
    </div>
  );
}
