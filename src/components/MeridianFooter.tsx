import { useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  Gamepad2,
  Globe,
  Home,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { Language, SectionId } from '../utils/heroConfig';
import { ProductCategory } from '../utils/modasrStore';

export const MERIDIAN_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4';

export const MERIDIAN_TAGLINE =
  'The scenic route to shipped work. Plan, track, and deliver from town to town.';

export const MERIDIAN_NAV_ITEMS = [
  'Platform',
  'Workflows',
  'Integrations',
  'For Teams',
  'For Studios',
  'About',
  'Journal',
  'Contact',
] as const;

export function getMeridianCopyrightYear(date: Date = new Date()): string {
  return String(date.getFullYear());
}

export const MERIDIAN_GLASS_HALO_CONFIG = {
  textRemoved: true,
  glassHaloEnabled: true,
  backdropBlurPx: 22,
} as const;

interface MeridianFooterProps {
  lang?: Language;
  onNavigateSection?: (section: SectionId) => void;
  onSelectCategory?: (category: ProductCategory) => void;
  onOpenCart?: () => void;
}

export function MeridianFooter({
  lang = 'fa',
  onNavigateSection,
  onSelectCategory,
  onOpenCart,
}: MeridianFooterProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isRtl = lang === 'fa';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
              }
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(video);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const handleQuickCategory = (cat: ProductCategory, targetPage: SectionId) => {
    onSelectCategory?.(cat);
    onNavigateSection?.(targetPage);
  };

  return (
    <footer
      className="footer"
      dir={isRtl ? 'rtl' : 'ltr'}
      data-testid="meridian-footer"
      data-glass-halo="true"
      aria-label={
        isRtl
          ? 'درباره سایت مدثر، دسترسی‌های سریع و نمای پل تاریخی'
          : 'About MODASR, Quick Access Links, and Engraved Viaduct Panorama'
      }
    >
      {/* Ambient outer glassy aura behind the full-width footer */}
      <div className="footer__glass-aura" aria-hidden="true" />

      {/* Full-Width Complete Footer Stage at Bottom of Home / Dashboard */}
      <div
        className="footer__glass-stage"
        data-testid="meridian-glass-stage"
      >
        <div className="footer__glass-halo-ring" aria-hidden="true" />

        {/* TOP CONTENT DECK: ABOUT MODASR ("حالت ابلوت سایت") & QUICK ACCESS LINKS ("دسترسی ها") */}
        <div
          data-testid="meridian-about-and-links"
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-900/15">
            {/* Column 1: About MODASR (درباره سایت مدثر — 5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/15 border border-teal-800/25 text-teal-950 text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>
                  {isRtl
                    ? 'ABOUT MODASR · درباره سایت و اصالت مدثر'
                    : 'ABOUT MODASR · OFFICIAL DIGITAL STOREFRONT'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-podium text-3xl sm:text-4xl font-black tracking-wider text-slate-950 uppercase">
                  MODASR
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-teal-300">
                  {isRtl ? 'مرجع محصولات دیجیتال' : 'Digital Hub'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {isRtl
                  ? 'مدثر (MODASR) پلتفرم تخصصی تأمین اشتراک‌های اورجینال هوش مصنوعی (ChatGPT Plus، Claude Pro، Cursor)، گیفت‌کارت‌های رسمی کنسول و استیم، شارژ مستقیم بازی‌های موبایل با آیدی و سرویس‌های اتصال پایدار است. تمامی سفارش‌ها با نرخ لحظه‌ای تتر والکس، قیمت قطعی سرور و کلید یکتای ضدتکرار ثبت و به‌صورت آنی تحویل می‌شوند.'
                  : 'MODASR is the premier digital marketplace for authentic AI subscriptions, console & Steam gift cards, instant mobile game UID top-ups, and dedicated connectivity plans—backed by live Wallex USDT rates and server-verified order tracking.'}
              </p>

              {/* 4 Core About Pillars */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/65 border border-slate-900/10 text-slate-900 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {isRtl ? 'ضمانت ۱۰۰٪ اصالت و ریجن' : '100% Authentic & Verified'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/65 border border-slate-900/10 text-slate-900 text-xs font-bold">
                  <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {isRtl ? 'نرخ لحظه‌ای تتر والکس' : 'Live 30s Wallex USDT'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/65 border border-slate-900/10 text-slate-900 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {isRtl ? 'تحویل آنی و کلید یکتا' : 'Idempotent Instant Delivery'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/65 border border-slate-900/10 text-slate-900 text-xs font-bold">
                  <Globe className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {isRtl ? 'پشتیبانی تلگرام @modasrpanel' : '24/7 Support @modasrpanel'}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Site Navigation (دسترسی سریع به صفحات سایت — 3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide flex items-center gap-2">
                <Home className="w-4 h-4 text-teal-700" />
                <span>
                  {isRtl ? 'دسترسی سریع به صفحات سایت' : 'Quick Site Navigation'}
                </span>
              </h3>
              <ul className="space-y-2 text-xs font-bold text-slate-800">
                {[
                  {
                    id: 'home' as SectionId,
                    icon: Home,
                    fa: 'خانه و داشبورد اصلی سایت',
                    en: 'Main Home & Dashboard',
                  },
                  {
                    id: 'games' as SectionId,
                    icon: Gamepad2,
                    fa: 'بخش گیم، گیفت‌کارت و جم بازی',
                    en: 'Gaming, Gift Cards & Gems',
                  },
                  {
                    id: 'ai' as SectionId,
                    icon: Cpu,
                    fa: 'بخش هوش مصنوعی و ابزار کد',
                    en: 'AI Subscriptions & Coding',
                  },
                  {
                    id: 'web' as SectionId,
                    icon: Globe,
                    fa: 'سرویس اتصال، وی‌پی‌ان و اپ‌ها',
                    en: 'MODASR Connect VPN & Apps',
                  },
                  {
                    id: 'search' as SectionId,
                    icon: Search,
                    fa: 'صفحه اختصاصی جستجوی هوشمند',
                    en: 'Dedicated Smart Search Page',
                  },
                  {
                    id: 'studio' as SectionId,
                    icon: UserCheck,
                    fa: 'حساب کاربری و پیگیری سفارش',
                    en: 'User Account & Order Tracker',
                  },
                ].map((navItem) => {
                  const Icon = navItem.icon;
                  return (
                    <li key={navItem.id}>
                      <button
                        type="button"
                        data-testid={`footer-nav-${navItem.id}`}
                        onClick={() => onNavigateSection?.(navItem.id)}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/55 hover:bg-slate-900 hover:text-white border border-slate-900/10 transition-all cursor-pointer group"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-teal-700 group-hover:text-teal-300 transition-colors" />
                          <span>{isRtl ? navItem.fa : navItem.en}</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Direct Category Shortcuts (دسترسی به دسته‌بندی‌ها — 2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                {isRtl ? 'دسترسی دسته‌بندی‌ها' : 'Top Categories'}
              </h3>
              <ul className="space-y-2 text-xs font-bold text-slate-800">
                {[
                  {
                    cat: 'gaming' as ProductCategory,
                    page: 'games' as SectionId,
                    fa: 'گیفت‌کارت PS5 و Steam',
                    en: 'PS5 & Steam Cards',
                  },
                  {
                    cat: 'ingame' as ProductCategory,
                    page: 'games' as SectionId,
                    fa: 'سی‌پی کالاف و یوسی پابجی',
                    en: 'CODM CP & PUBG UC',
                  },
                  {
                    cat: 'ai' as ProductCategory,
                    page: 'ai' as SectionId,
                    fa: 'اکانت ChatGPT و Claude',
                    en: 'ChatGPT & Claude Pro',
                  },
                  {
                    cat: 'vpn' as ProductCategory,
                    page: 'web' as SectionId,
                    fa: 'آی‌پی ثابت و تحریم‌شکن',
                    en: 'Static IP & VPN VIP',
                  },
                  {
                    cat: 'subscriptions' as ProductCategory,
                    page: 'web' as SectionId,
                    fa: 'تلگرام پرمیوم و اسپاتیفای',
                    en: 'Telegram & Spotify',
                  },
                ].map((item) => (
                  <li key={item.cat}>
                    <button
                      type="button"
                      onClick={() => handleQuickCategory(item.cat, item.page)}
                      className="w-full text-start px-3 py-2 rounded-xl bg-white/45 hover:bg-slate-900 hover:text-white border border-slate-900/10 transition-all cursor-pointer flex items-center justify-between gap-1"
                    >
                      <span className="truncate">{isRtl ? item.fa : item.en}</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0 opacity-60" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Support Desk & Quick Actions (پشتیبانی و ارتباط — 2 Cols) */}
            <div className="lg:col-span-2 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">
                  {isRtl ? 'پشتیبانی و ارتباط' : 'Support & Desk'}
                </h3>
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-lg">
                  <div className="text-[11px] text-teal-300 font-bold">
                    {isRtl ? 'پشتیبانی مستقیم تلگرام:' : 'Direct Telegram Desk:'}
                  </div>
                  <div className="font-mono text-xs font-black text-white">
                    @modasrpanel
                  </div>
                  <div className="text-[11px] text-white/70 leading-relaxed">
                    {isRtl
                      ? 'تحویل آنی کد دیجیتال و فعال‌سازی اشتراک در کمتر از ۵ دقیقه.'
                      : 'Instant digital code & subscription activation under 5 mins.'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenCart?.()}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isRtl ? 'مشاهده سبد خرید' : 'Open Shopping Cart'}</span>
                </button>
                <div className="text-[11px] font-bold text-slate-700 text-center">
                  © {getMeridianCopyrightYear()} MODASR · ALL RIGHTS RESERVED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH PANORAMIC ENGRAVED VIADUCT BRIDGE & STAGECOACH AT BOTTOM */}
        <div className="footer__panorama-wrap">
          <video
            ref={videoRef}
            className="footer__video"
            poster="/assets/meridian-viaduct-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src="/assets/meridian-viaduct.webm" type="video/webm" />
            <source src={MERIDIAN_VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        <div className="footer__glass-sheen" aria-hidden="true" />
      </div>
    </footer>
  );
}
