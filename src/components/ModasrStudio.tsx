import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Box,
  Camera,
  CheckCircle2,
  Clock,
  Cpu,
  Eye,
  FileCheck2,
  FolderKanban,
  Gamepad2,
  Globe,
  History,
  Layers,
  Lock,
  Monitor,
  Move3d,
  Palette,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  Upload,
} from 'lucide-react';
import {
  BrandIdentityConfig,
  DigitalAssetItem,
  INITIAL_AUDIT_LOGS,
  ResponsiveDeviceFrame,
  SceneEditorToolId,
  STUDIO_TOOLS_META,
  StudioAnimationAction,
  StudioAuditEntry,
  StudioCategoryKey,
  StudioModuleId,
  StudioSceneConfig,
  StudioSnapshotVersion,
  computeDraftDiff,
  runPreReleaseChecks,
  validateDigitalAsset,
} from '../utils/modasrStudioEngine';
import { StudioThreeViewport } from './StudioThreeViewport';

interface ModasrStudioProps {
  publishedVersion: StudioSnapshotVersion;
  versionHistory: StudioSnapshotVersion[];
  draftScenes: Record<StudioCategoryKey, StudioSceneConfig>;
  draftBrand: BrandIdentityConfig;
  assets: DigitalAssetItem[];
  onUpdateDraftScene: (
    category: StudioCategoryKey,
    updater: (prev: StudioSceneConfig) => StudioSceneConfig
  ) => void;
  onUpdateDraftBrand: (
    updater: (prev: BrandIdentityConfig) => BrandIdentityConfig
  ) => void;
  onAddAsset: (asset: DigitalAssetItem) => void;
  onPublishApprovedDraft: (notesFa: string) => void;
  onRollbackToVersion: (versionId: string) => void;
  onEnterIsolatedPreview: () => void;
  onExitStudioToPublicStore: () => void;
}

const CATEGORY_TABS: Array<{
  key: StudioCategoryKey;
  labelFa: string;
  badgeFa: string;
}> = [
  { key: 'home', labelFa: 'خانه و همهٔ محصولات', badgeFa: 'کاراکتر اصلی + کارت‌ها' },
  { key: 'gaming', labelFa: 'گیمینگ', badgeFa: 'نئون و عناصر واکنشی' },
  { key: 'ai', labelFa: 'هوش مصنوعی', badgeFa: 'ربات و پنل هولوگرافیک' },
  { key: 'webapp', labelFa: 'وب و اپلیکیشن', badgeFa: 'پنجره‌های شناور فضایی' },
  { key: 'vpn', labelFa: 'VPN و شبکه', badgeFa: 'سپر سایبری (ایزوله)' },
];

export function ModasrStudio({
  publishedVersion,
  versionHistory,
  draftScenes,
  draftBrand,
  assets,
  onUpdateDraftScene,
  onUpdateDraftBrand,
  onAddAsset,
  onPublishApprovedDraft,
  onRollbackToVersion,
  onEnterIsolatedPreview,
  onExitStudioToPublicStore,
}: ModasrStudioProps) {
  const [activeModule, setActiveModule] = useState<StudioModuleId>('scene-editor');
  const [selectedCategory, setSelectedCategory] =
    useState<StudioCategoryKey>('home');
  const [activeTool, setActiveTool] =
    useState<SceneEditorToolId>('scene-editor');
  const [deviceFrame, setDeviceFrame] =
    useState<ResponsiveDeviceFrame>('desktop');
  const [isPlaying, setIsPlaying] = useState(true);
  const [timelineSec, setTimelineSec] = useState(2.2);

  // Asset Upload Simulator State
  const [newFileName, setNewFileName] = useState('cyber_avatar_v3.glb');
  const [newFileSizeMb, setNewFileSizeMb] = useState('3.8');
  const [newPolyCount, setNewPolyCount] = useState('26500');
  const [assetCategory, setAssetCategory] = useState<StudioCategoryKey>('home');
  const [uploadFeedback, setUploadFeedback] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  // Release Pipeline Approval State
  const [releaseNotes, setReleaseNotes] = useState(
    'بروزرسانی زاویهٔ دوربین، زمان‌بندی حرکت دست کاراکتر اصلی و بهینه‌سازی نورپردازی دسته‌ها'
  );
  const [adminExplicitConfirmed, setAdminExplicitConfirmed] = useState(false);
  const [auditLogs, setAuditLogs] =
    useState<StudioAuditEntry[]>(INITIAL_AUDIT_LOGS);
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  const currentScene = draftScenes[selectedCategory];
  const draftDiffs = computeDraftDiff(publishedVersion, draftScenes, draftBrand);
  const validationChecks = runPreReleaseChecks(draftScenes, assets);
  const allChecksPass = validationChecks.every((c) => c.passed);

  const appendAudit = (
    actionFa: string,
    detailFa: string,
    severity: StudioAuditEntry['severity'] = 'info'
  ) => {
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 8);
    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: timeStr,
        actor: 'modasrdorkhane@gmail.com',
        actionFa,
        detailFa,
        severity,
      },
      ...prev,
    ]);
  };

  const showNotice = (msg: string) => {
    setBannerNotice(msg);
    window.setTimeout(() => {
      setBannerNotice((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const handleTriggerHandRaise = () => {
    onUpdateDraftScene(selectedCategory, (prev) => ({
      ...prev,
      activeAction: 'raise-hand-reveal',
      handRaiseProgress: prev.handRaiseProgress > 0.85 ? 0.35 : 0.95,
    }));
    showNotice(
      `انیمیشن بالا بردن دست کاراکتر و احضار کارت‌های محصول در صحنهٔ «${currentScene.titleFa}» اجرا شد.`
    );
  };

  const handleSelectProductCard = (idx: number) => {
    onUpdateDraftScene(selectedCategory, (prev) => ({
      ...prev,
      selectedCardIndex: idx,
      activeAction: 'product-focus',
      handRaiseProgress: Math.max(prev.handRaiseProgress, 0.85),
    }));
    showNotice(
      `کارت محصول «${currentScene.featuredProductTitles[idx]}» انتخاب شد؛ انیمیشن تمرکز کاراکتر فعال گردید.`
    );
  };

  const handleValidateAndAddAsset = (
    overrideName?: string,
    overrideSize?: number,
    overridePolys?: number
  ) => {
    const nameToUse = overrideName ?? newFileName;
    const sizeToUse = overrideSize ?? parseFloat(newFileSizeMb || '0');
    const polysToUse = overridePolys ?? parseInt(newPolyCount || '0', 10);

    const check = validateDigitalAsset({
      fileName: nameToUse,
      sizeMb: sizeToUse,
      polyCount: polysToUse > 0 ? polysToUse : undefined,
    });

    setUploadFeedback({
      valid: check.valid,
      message: check.reasonFa,
    });

    if (!check.valid || check.detectedType === 'unknown') {
      appendAudit(
        `رد خودکار فایل نامعتبر (${nameToUse})`,
        check.reasonFa,
        'warning'
      );
      return;
    }

    const newItem: DigitalAssetItem = {
      id: `asset-${Date.now()}`,
      name: nameToUse,
      categoryKey: assetCategory,
      type: check.detectedType,
      version: 'v1.0',
      sizeMb: sizeToUse,
      polyCount: polysToUse > 0 ? polysToUse : undefined,
      animationClips:
        check.detectedType === 'glb' || check.detectedType === 'gltf'
          ? ['Idle_Pose', 'Raise_Hand_Reveal', 'Card_Select_Focus']
          : undefined,
      mimeType:
        check.detectedType === 'glb'
          ? 'model/gltf-binary'
          : 'application/octet-stream',
      status: check.status,
      statusNoteFa: check.reasonFa,
      updatedAt: 'هم‌اکنون',
    };

    onAddAsset(newItem);
    appendAudit(
      `بارگذاری و اعتبارسنجی دارایی (${nameToUse})`,
      `فایل با حجم ${sizeToUse.toFixed(1)}MB بررسی و به کتابخانه اضافه شد.`,
      'success'
    );
    showNotice(`دارایی «${nameToUse}» پس از تأیید سلامت به کتابخانه اضافه شد.`);
  };

  const handleConfirmPublish = () => {
    if (!adminExplicitConfirmed || !allChecksPass) return;
    onPublishApprovedDraft(releaseNotes);
    setAdminExplicitConfirmed(false);
    appendAudit(
      'تأیید نهایی و انتشار نسخهٔ جدید روی سایت عمومی',
      `تغییرات پیش‌نویس با تأیید صریح مدیر منتشر شد. یادداشت: ${releaseNotes}`,
      'success'
    );
    showNotice(
      'نسخهٔ جدید با موفقیت منتشر شد و روی فروشگاه عمومی فعال گردید!'
    );
  };

  const handleRollback = (versionId: string) => {
    onRollbackToVersion(versionId);
    appendAudit(
      `بازگشت امن (Rollback) به نسخهٔ ${versionId}`,
      `تمامی تنظیمات صحنه‌ها و ظاهر برند فوراً به نسخهٔ سالم ${versionId} بازگردانی شدند.`,
      'warning'
    );
    showNotice(`بازگشت امن به نسخهٔ ${versionId} با موفقیت انجام شد.`);
  };

  return (
    <div
      dir="rtl"
      data-testid="modasr-studio-workspace"
      className="min-h-screen w-full bg-[#070B12] text-slate-100 font-vazir flex flex-col selection:bg-teal-400 selection:text-slate-950"
    >
      {/* =====================================================================
          TOP STUDIO HEADER BAR (Single-Elevation Workspace Contract)
      ====================================================================== */}
      <header className="sticky top-0 z-40 h-16 px-5 lg:px-8 bg-[#0B101B] border-b border-slate-800 flex items-center justify-between gap-4">
        {/* Left/Right Zone 1: Brand & Studio Isolation Status */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-400/15 border border-teal-400/40 flex items-center justify-center text-teal-300 font-black text-sm shrink-0">
              3D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-wide text-white whitespace-nowrap">
                  MODASR STUDIO
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  ·
                </span>
                <span className="text-xs text-teal-300 font-vazir tabular-nums hidden sm:inline">
                  studio.modasr.ir
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                محیط مستقل طراحی صحنه‌های سه‌بعدی · ایزوله از هستهٔ پرداخت و ربات VPN
              </p>
            </div>
          </div>
        </div>

        {/* Center Zone 2: Version & Draft Status Telemetry (Unboxed Text with · Separators) */}
        <div className="hidden xl:flex items-center gap-2.5 text-xs text-slate-300 font-vazir tabular-nums">
          <span>نسخهٔ فعال عمومی: {publishedVersion.versionId}</span>
          <span aria-hidden="true">·</span>
          <span
            className={
              draftDiffs.length > 0 ? 'text-amber-300 font-vazir' : 'text-emerald-400 font-vazir'
            }
          >
            {draftDiffs.length > 0
              ? `${draftDiffs.length} تغییر در پیش‌نویس (منتشرنشده)`
              : 'پیش‌نویس منطبق با نسخهٔ عمومی'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-vazir">
            پرداخت و VPN: ۱۰۰٪ ایزوله
          </span>
        </div>

        {/* Zone 3: Primary Studio Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            data-testid="studio-isolated-preview-btn"
            onClick={onEnterIsolatedPreview}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>پیش‌نمایش ایزوله در سایت</span>
          </button>

          <button
            type="button"
            data-testid="studio-goto-release-btn"
            onClick={() => setActiveModule('release-pipeline')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>بررسی و تأیید انتشار ({draftDiffs.length})</span>
          </button>

          <button
            type="button"
            data-testid="studio-exit-btn"
            onClick={onExitStudioToPublicStore}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>فروشگاه عمومی</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Banner Notification */}
      {bannerNotice && (
        <div
          role="status"
          data-testid="studio-banner-notice"
          className="bg-teal-950/90 border-b border-teal-500/40 px-6 py-2.5 text-xs text-teal-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{bannerNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setBannerNotice(null)}
            className="text-teal-300 hover:text-white text-[11px] cursor-pointer"
          >
            بستن
          </button>
        </div>
      )}

      {/* =====================================================================
          MAIN WORKSPACE BODY (Sidebar 250px + Main Viewport)
      ====================================================================== */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Right Sidebar (RTL): 5 Core Studio Sections */}
        <aside className="w-full lg:w-64 bg-[#0B101B] border-b lg:border-b-0 lg:border-l border-slate-800 p-4 flex flex-col justify-between gap-6 shrink-0">
          <div className="space-y-1.5">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              بخش‌های اصلی استودیو
            </div>

            {(
              [
                {
                  id: 'dashboard',
                  labelFa: '۱. داشبورد مرکزی و معماری',
                  icon: Activity,
                },
                {
                  id: 'scene-editor',
                  labelFa: '۲. ویرایشگر صحنه‌های سه‌بعدی',
                  icon: Box,
                },
                {
                  id: 'brand-theme',
                  labelFa: '۳. مدیریت ظاهر و هویت برند',
                  icon: Palette,
                },
                {
                  id: 'asset-library',
                  labelFa: '۴. کتابخانهٔ دارایی‌های دیجیتال',
                  icon: FolderKanban,
                },
                {
                  id: 'release-pipeline',
                  labelFa: '۵. نسخه‌بندی و انتشار کنترل‌شده',
                  icon: History,
                },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isAct = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`studio-module-tab-${item.id}`}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isAct
                      ? 'bg-teal-400/15 text-teal-300 border border-teal-400/40'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.labelFa}</span>
                  </div>
                  {item.id === 'release-pipeline' && draftDiffs.length > 0 && (
                    <span className="font-vazir tabular-nums tabular-nums text-[11px] text-amber-300">
                      {draftDiffs.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Security & Isolation Guarantee Box */}
          <div className="p-3.5 rounded-xl bg-[#070B12] border border-slate-800 space-y-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>سپر امنیت و تفکیک سامانه</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              این استودیو هیچ دسترسی مستقیمی به عملیات مالی، کیف پول، یا ربات PHP تحویل VPN ندارد. هیچ تغییری بدون تأیید صریح شما در مرحلهٔ ۴ منتشر نمی‌شود.
            </p>
            <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-vazir tabular-nums tabular-nums">
              <span>2FA Session: Active</span>
              <span>Role: SuperAdmin</span>
            </div>
          </div>
        </aside>

        {/* Main Studio Content Area */}
        <main className="flex-1 p-5 lg:p-7 overflow-y-auto space-y-6">
          {/* =================================================================
              MODULE 2: 3D SCENE EDITOR (ویرایشگر صحنه‌های سه‌بعدی حرفه‌ای)
          ================================================================== */}
          {activeModule === 'scene-editor' && (
            <div
              data-testid="studio-section-scene-editor"
              className="space-y-6"
            >
              {/* Category Selector Strip (Section 4 of Spec: رفتار اختصاصی هر دسته) */}
              <div className="bg-[#0B101B] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h1 className="text-base sm:text-lg font-bold text-white">
                      ویرایشگر صحنه‌های سه‌بعدی و رفتار اختصاصی هر دسته
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      هر دسته دارای کاراکتر، نورپردازی، قوانین تعامل و کارت‌های هولوگرافیک مستقل است (تغییرات در پیش‌نویس ذخیره می‌شوند).
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#070B12] p-1 rounded-xl border border-slate-800">
                    {(
                      [
                        { id: 'desktop', label: 'دسکتاپ', icon: Monitor },
                        { id: 'tablet', label: 'تبلت', icon: Tablet },
                        { id: 'mobile', label: 'موبایل', icon: Smartphone },
                      ] as const
                    ).map((dev) => {
                      const DevIcon = dev.icon;
                      return (
                        <button
                          key={dev.id}
                          type="button"
                          data-testid={`studio-device-${dev.id}`}
                          onClick={() => setDeviceFrame(dev.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            deviceFrame === dev.id
                              ? 'bg-teal-400 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <DevIcon className="w-3.5 h-3.5" />
                          <span>{dev.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5 Category Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {CATEGORY_TABS.map((cat) => {
                    const isSel = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        data-testid={`studio-cat-btn-${cat.key}`}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                          isSel
                            ? 'bg-teal-400/15 border-teal-400 text-white'
                            : 'bg-[#070B12] border-slate-800/90 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{cat.labelFa}</div>
                        <div className="text-[11px] text-slate-400 mt-1 truncate">
                          {cat.badgeFa}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main 2-Column 3D Workspace: Live Three.js Viewport + 8-Tool Inspector */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Center/Right: Live 3D Viewport + Timeline Bar (7 Cols) */}
                <div className="xl:col-span-7 space-y-4">
                  <StudioThreeViewport
                    sceneConfig={currentScene}
                    brandConfig={draftBrand}
                    deviceFrame={deviceFrame}
                    timelineSec={timelineSec}
                    isPlaying={isPlaying}
                    onSelectCardIndex={handleSelectProductCard}
                    onTriggerHandRaise={handleTriggerHandRaise}
                  />

                  {/* Animation Timeline Quick Scrubber Bar */}
                  <div className="bg-[#0B101B] border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          data-testid="studio-timeline-play-toggle"
                          onClick={() => setIsPlaying((p) => !p)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold cursor-pointer"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>توقف زمان‌بندی</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>پخش انیمیشن</span>
                            </>
                          )}
                        </button>
                        <span className="text-xs text-slate-300">
                          کاراکتر فعال:{' '}
                          <strong className="text-white">
                            {currentScene.characterNameFa}
                          </strong>
                        </span>
                      </div>

                      <div className="text-xs font-vazir tabular-nums tabular-nums text-slate-400">
                        <span>
                          زمان: {timelineSec.toFixed(2)}s /{' '}
                          {currentScene.timelineDurationSec.toFixed(2)}s
                        </span>
                        <span className="mx-2">·</span>
                        <span>سرعت: {currentScene.animationSpeed.toFixed(2)}x</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-vazir tabular-nums tabular-nums text-slate-400">
                        0.0s
                      </span>
                      <input
                        type="range"
                        aria-label="اسکرابر خط زمانی انیمیشن"
                        min={0}
                        max={currentScene.timelineDurationSec}
                        step={0.05}
                        value={timelineSec}
                        onChange={(e) => {
                          setIsPlaying(false);
                          setTimelineSec(parseFloat(e.target.value));
                        }}
                        className="flex-1 accent-teal-400 cursor-pointer"
                      />
                      <span className="text-[11px] font-vazir tabular-nums tabular-nums text-slate-400">
                        {currentScene.timelineDurationSec.toFixed(1)}s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left: 8-Tool Studio Inspector Panel (5 Cols) */}
                <div className="xl:col-span-5 bg-[#0B101B] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-5">
                  <div>
                    <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                      جعبه ابزار ۸گانهٔ ویرایشگر سه‌بعدی
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ابزار مورد نظر را برای ویرایش صحنهٔ «{currentScene.titleFa}» انتخاب کنید:
                    </p>
                  </div>

                  {/* 8 Tools Grid Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-1.5">
                    {STUDIO_TOOLS_META.map((tool) => {
                      const isCurr = activeTool === tool.id;
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          data-testid={`studio-tool-btn-${tool.id}`}
                          onClick={() => setActiveTool(tool.id)}
                          className={`px-3 py-2 rounded-xl border text-right transition-colors cursor-pointer ${
                            isCurr
                              ? 'bg-teal-400/15 border-teal-400 text-teal-300 font-bold'
                              : 'bg-[#070B12] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs truncate">{tool.titleFa}</div>
                          <div className="text-[10px] font-vazir tabular-nums text-slate-400 truncate">
                            {tool.titleEn}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tool Controls Panel */}
                  <div
                    data-testid={`studio-tool-panel-${activeTool}`}
                    className="p-4 rounded-xl bg-[#070B12] border border-slate-800 space-y-4"
                  >
                    {/* TOOL 1: SCENE EDITOR */}
                    {activeTool === 'scene-editor' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white">
                            Scene Editor · مدیریت صحنهٔ {currentScene.titleFa}
                          </h3>
                          <span className="text-[11px] font-vazir tabular-nums text-teal-300">
                            ID: {currentScene.categoryKey}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {currentScene.subtitleFa}
                        </p>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-300">
                            عناوین ۴ کارت محصول هولوگرافیک در این صحنه:
                          </label>
                          {currentScene.featuredProductTitles.map((title, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-xs font-vazir tabular-nums text-slate-400 w-6">
                                0{idx + 1}
                              </span>
                              <input
                                type="text"
                                aria-label={`عنوان کارت محصول ${idx + 1}`}
                                value={title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  onUpdateDraftScene(selectedCategory, (prev) => {
                                    const nextTitles = [
                                      ...prev.featuredProductTitles,
                                    ] as [string, string, string, string];
                                    nextTitles[idx] = val;
                                    return {
                                      ...prev,
                                      featuredProductTitles: nextTitles,
                                    };
                                  });
                                }}
                                className="flex-1 bg-[#0B101B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-400"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TOOL 2: MODEL MANAGER */}
                    {activeTool === 'model-manager' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white">
                          Model Manager · مدیریت مدل‌های GLB و glTF
                        </h3>
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-300">
                            انتخاب مدل سه‌بعدی از کتابخانهٔ دارایی‌ها:
                          </label>
                          <select
                            aria-label="انتخاب مدل سه‌بعدی"
                            value={currentScene.modelAssetId}
                            onChange={(e) => {
                              const found = assets.find(
                                (a) => a.id === e.target.value
                              );
                              if (!found) return;
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                modelAssetId: found.id,
                                modelFormat:
                                  found.type === 'gltf' ? 'glTF' : 'GLB',
                                fileSizeMb: found.sizeMb,
                                polyCount: found.polyCount ?? prev.polyCount,
                              }));
                            }}
                            className="w-full bg-[#0B101B] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            {assets
                              .filter(
                                (a) => a.type === 'glb' || a.type === 'gltf'
                              )
                              .map((a) => (
                                <option key={a.id} value={a.id}>
                                  {a.name} ({a.sizeMb.toFixed(1)} MB ·{' '}
                                  {(a.polyCount ?? 24000).toLocaleString()} Polys)
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center font-vazir tabular-nums tabular-nums">
                          <div className="p-2.5 rounded-lg bg-[#0B101B] border border-slate-800">
                            <div className="text-[10px] text-slate-400">فرمت</div>
                            <div className="text-xs font-bold text-teal-300 mt-0.5">
                              {currentScene.modelFormat}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#0B101B] border border-slate-800">
                            <div className="text-[10px] text-slate-400">حجم</div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              {currentScene.fileSizeMb.toFixed(1)} MB
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#0B101B] border border-slate-800">
                            <div className="text-[10px] text-slate-400">چندضلعی</div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              {currentScene.polyCount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-amber-300/90 leading-relaxed">
                          نکتهٔ فنی: اجرای حرکت بالا بردن دست و ظاهر شدن کارت‌ها نیازمند وجود کلیپ‌های انیمیشن اسکلتی (`Raise_Hand_Summon_Cards`) در فایل مدل است.
                        </p>
                      </div>
                    )}

                    {/* TOOL 3: ANIMATION TIMELINE */}
                    {activeTool === 'animation-timeline' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white">
                          Animation Timeline · زمان‌بندی و حرکت کاراکتر
                        </h3>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-300">
                            کلیپ انیمیشن فعال:
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(
                              [
                                {
                                  id: 'raise-hand-reveal',
                                  label: 'بالا بردن دست و احضار کارت‌ها',
                                },
                                {
                                  id: 'product-focus',
                                  label: 'تمرکز روی محصول انتخابی',
                                },
                                {
                                  id: 'orbital-pulse',
                                  label: 'چرخش هولوگرافیک و پالس نئون',
                                },
                                { id: 'idle', label: 'حالت تنفس و انتظار (Idle)' },
                              ] as Array<{
                                id: StudioAnimationAction;
                                label: string;
                              }>
                            ).map((act) => (
                              <button
                                key={act.id}
                                type="button"
                                onClick={() =>
                                  onUpdateDraftScene(selectedCategory, (prev) => ({
                                    ...prev,
                                    activeAction: act.id,
                                  }))
                                }
                                className={`px-3 py-2 rounded-lg text-xs text-right border cursor-pointer ${
                                  currentScene.activeAction === act.id
                                    ? 'bg-teal-400/20 border-teal-400 text-teal-300 font-bold'
                                    : 'bg-[#0B101B] border-slate-800 text-slate-300'
                                }`}
                              >
                                {act.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>میزان بالا رفتن دست و ظهور کارت‌های محصول</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {Math.round(currentScene.handRaiseProgress * 100)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="میزان بالا رفتن دست کاراکتر"
                            min={0}
                            max={1}
                            step={0.02}
                            value={currentScene.handRaiseProgress}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                handRaiseProgress: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>سرعت اجرای انیمیشن</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.animationSpeed.toFixed(2)}x
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="سرعت اجرای انیمیشن"
                            min={0.25}
                            max={2.0}
                            step={0.05}
                            value={currentScene.animationSpeed}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                animationSpeed: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* TOOL 4: CAMERA CONTROLS */}
                    {activeTool === 'camera-controls' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white">
                          Camera Controls · زاویه، فاصله و حرکت دوربین
                        </h3>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>زاویهٔ دید لنز (FOV)</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.cameraFov}°
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="زاویه دید دوربین FOV"
                            min={30}
                            max={72}
                            step={1}
                            value={currentScene.cameraFov}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                cameraFov: parseInt(e.target.value, 10),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>فاصلهٔ دوربین (محور Z)</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.cameraPos[2].toFixed(2)}m
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="فاصله دوربین محور Z"
                            min={3.4}
                            max={7.5}
                            step={0.1}
                            value={currentScene.cameraPos[2]}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                cameraPos: [
                                  prev.cameraPos[0],
                                  prev.cameraPos[1],
                                  parseFloat(e.target.value),
                                ],
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>ارتفاع دوربین (محور Y)</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.cameraPos[1].toFixed(2)}m
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="ارتفاع دوربین محور Y"
                            min={0.8}
                            max={3.4}
                            step={0.05}
                            value={currentScene.cameraPos[1]}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                cameraPos: [
                                  prev.cameraPos[0],
                                  parseFloat(e.target.value),
                                  prev.cameraPos[2],
                                ],
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* TOOL 5: LIGHTING STUDIO */}
                    {activeTool === 'lighting-studio' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white">
                          Lighting Studio · نورپردازی، سایه و درخشش محیط
                        </h3>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              نور کلیدی (Key)
                            </label>
                            <input
                              type="color"
                              aria-label="رنگ نور کلیدی"
                              value={currentScene.keyLightColor}
                              onChange={(e) =>
                                onUpdateDraftScene(selectedCategory, (prev) => ({
                                  ...prev,
                                  keyLightColor: e.target.value,
                                }))
                              }
                              className="w-full h-9 rounded-lg bg-[#0B101B] border border-slate-700 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              نور محیطی (Fill)
                            </label>
                            <input
                              type="color"
                              aria-label="رنگ نور محیطی"
                              value={currentScene.fillLightColor}
                              onChange={(e) =>
                                onUpdateDraftScene(selectedCategory, (prev) => ({
                                  ...prev,
                                  fillLightColor: e.target.value,
                                }))
                              }
                              className="w-full h-9 rounded-lg bg-[#0B101B] border border-slate-700 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              نور لبه (Rim)
                            </label>
                            <input
                              type="color"
                              aria-label="رنگ نور لبه"
                              value={currentScene.rimLightColor}
                              onChange={(e) =>
                                onUpdateDraftScene(selectedCategory, (prev) => ({
                                  ...prev,
                                  rimLightColor: e.target.value,
                                }))
                              }
                              className="w-full h-9 rounded-lg bg-[#0B101B] border border-slate-700 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>شدت نور کلیدی (Key Light Intensity)</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.keyLightIntensity.toFixed(1)}
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="شدت نور کلیدی"
                            min={0.5}
                            max={4.0}
                            step={0.1}
                            value={currentScene.keyLightIntensity}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                keyLightIntensity: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>شدت درخشش نئونی (Bloom / Emissive)</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {Math.round(currentScene.bloomIntensity * 100)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="شدت درخشش نئونی"
                            min={0.1}
                            max={1.5}
                            step={0.05}
                            value={currentScene.bloomIntensity}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                bloomIntensity: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* TOOL 6: OBJECT PLACEMENT */}
                    {activeTool === 'object-placement' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white">
                          Object Placement · چرخش، مقیاس و چیدمان اشیا
                        </h3>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>چرخش کاراکتر حول محور Y</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.objectRotationYDeg}°
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="چرخش کاراکتر"
                            min={-90}
                            max={90}
                            step={1}
                            value={currentScene.objectRotationYDeg}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                objectRotationYDeg: parseInt(e.target.value, 10),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>مقیاس کاراکتر (Scale)</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.objectScale.toFixed(2)}x
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="مقیاس کاراکتر"
                            min={0.7}
                            max={1.35}
                            step={0.02}
                            value={currentScene.objectScale}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                objectScale: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>شعاع حلقهٔ کارت‌های محصول سه‌بعدی</span>
                            <span className="font-vazir tabular-nums tabular-nums text-teal-300">
                              {currentScene.cardRingRadius.toFixed(2)}m
                            </span>
                          </div>
                          <input
                            type="range"
                            aria-label="شعاع حلقه کارت‌های محصول"
                            min={1.4}
                            max={3.0}
                            step={0.05}
                            value={currentScene.cardRingRadius}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                cardRingRadius: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full accent-teal-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* TOOL 7: INTERACTION RULES */}
                    {activeTool === 'interaction-rules' && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white">
                          Interaction Rules · قوانین واکنش صحنه
                        </h3>
                        <p className="text-xs text-slate-400">
                          واکنش کاراکتر و کارت‌ها به کلیک، اسکرول و انتخاب دسته را تنظیم کنید:
                        </p>
                        {currentScene.interactionRules.map((rule) => (
                          <div
                            key={rule.id}
                            className="p-3 rounded-xl bg-[#0B101B] border border-slate-800 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-teal-300">
                                رویداد: {rule.triggerLabelFa}
                              </span>
                              <input
                                type="checkbox"
                                aria-label={`فعال‌سازی قانون ${rule.triggerLabelFa}`}
                                checked={rule.enabled}
                                onChange={(e) =>
                                  onUpdateDraftScene(selectedCategory, (prev) => ({
                                    ...prev,
                                    interactionRules: prev.interactionRules.map(
                                      (r) =>
                                        r.id === rule.id
                                          ? { ...r, enabled: e.target.checked }
                                          : r
                                    ),
                                  }))
                                }
                                className="accent-teal-400 w-4 h-4 cursor-pointer"
                              />
                            </div>
                            <p className="text-xs text-slate-300">
                              واکنش: {rule.actionLabelFa}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TOOL 8: RESPONSIVE PREVIEW */}
                    {activeTool === 'responsive-preview' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white">
                          Responsive Preview · عملکرد در موبایل، تبلت و دسکتاپ
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          قاب نمایش بوم سه‌بعدی را تغییر دهید و حالت کم‌مصرف موبایل را بررسی کنید:
                        </p>

                        <div className="grid grid-cols-3 gap-2">
                          {(
                            [
                              { id: 'desktop', label: 'دسکتاپ (1440px)' },
                              { id: 'tablet', label: 'تبلت (768px)' },
                              { id: 'mobile', label: 'موبایل (375px)' },
                            ] as const
                          ).map((d) => (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setDeviceFrame(d.id)}
                              className={`px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                                deviceFrame === d.id
                                  ? 'bg-teal-400 text-slate-950 font-bold border-teal-400'
                                  : 'bg-[#0B101B] border-slate-800 text-slate-300'
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>

                        <label className="flex items-center justify-between p-3 rounded-xl bg-[#0B101B] border border-slate-800 cursor-pointer">
                          <div>
                            <div className="text-xs font-bold text-white">
                              کاهش خودکار افکت‌های سنگین در موبایل
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              حفظ فریم‌ریت ۶۰fps و جلوگیری از داغ شدن موبایل کاربران
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={currentScene.mobileReducedEffects}
                            onChange={(e) =>
                              onUpdateDraftScene(selectedCategory, (prev) => ({
                                ...prev,
                                mobileReducedEffects: e.target.checked,
                              }))
                            }
                            className="accent-teal-400 w-4 h-4 cursor-pointer"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              MODULE 1: CENTRAL DASHBOARD & ARCHITECTURE (داشبورد مرکزی)
          ================================================================== */}
          {activeModule === 'dashboard' && (
            <div
              data-testid="studio-section-dashboard"
              className="space-y-6"
            >
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  داشبورد مرکزی و وضعیت معماری MODASR STUDIO
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  نمای کلی وضعیت فروشگاه، آخرین نسخهٔ منتشرشده، تغییرات در انتظار تأیید و تفکیک کامل سامانه‌ها.
                </p>
              </div>

              {/* 4 Key Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">آخرین نسخهٔ منتشرشده</div>
                  <div className="text-xl font-bold text-teal-300 font-vazir tabular-nums">
                    {publishedVersion.versionId}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    انتشار: {publishedVersion.publishedAt}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">تغییرات در انتظار تأیید</div>
                  <div className="text-xl font-bold text-amber-300 font-vazir tabular-nums">
                    {draftDiffs.length} مورد
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ذخیره‌شده در محیط پیش‌نویس ایزوله
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">وضعیت سلامت انتشار</div>
                  <div className="text-xl font-bold text-emerald-400 font-vazir tabular-nums">
                    {allChecksPass ? '۰ خطا (سالم)' : 'نیازمند بررسی'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {assets.length} دارایی دیجیتال بررسی‌شده
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">ایزولاسیون فروش و VPN</div>
                  <div className="text-xl font-bold text-cyan-300">
                    ۱۰۰٪ تفکیک‌شده
                  </div>
                  <div className="text-[11px] text-slate-400">
                    بدون دسترسی به کیف پول و ربات PHP
                  </div>
                </div>
              </div>

              {/* 5-Layer Architecture Separation Diagram (Section 1 of Spec) */}
              <div className="p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-4">
                <h2 className="text-sm font-bold text-white">
                  ۱. معماری تفکیک‌شدهٔ پیشنهادی (حفظ سلامت پرداخت و سرویس‌های VPN)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {[
                    {
                      title: 'MODASR HUB',
                      sub: 'فروشگاه عمومی · نسخهٔ موبایل و دسکتاپ · صحنه‌های تعاملی',
                      status: 'خواندن نسخهٔ تأییدشده',
                    },
                    {
                      title: 'MODASR STUDIO',
                      sub: 'دامنهٔ مدیریت مستقل · ورود امن · ویرایشگر سه‌بعدی · تأیید انتشار',
                      status: 'محیط ایزولهٔ فعلی',
                    },
                    {
                      title: 'لایهٔ API و تنظیمات',
                      sub: 'ذخیرهٔ نسخه‌ها، تنظیمات صحنه‌ها، فایل‌های رسانه‌ای و ثبت فعالیت‌ها',
                      status: 'نسخه‌بندی JSON',
                    },
                    {
                      title: 'پایگاه فروشگاه',
                      sub: 'محصولات، قیمت لحظه‌ای والکس و سفارش‌ها',
                      status: 'محافظت‌شده (بدون تغییر)',
                    },
                    {
                      title: 'سامانهٔ VPN',
                      sub: 'کاربران، کیف پول و تحویل سرویس‌های ربات PHP',
                      status: 'ایزوله و مستقل',
                    },
                  ].map((box) => (
                    <div
                      key={box.title}
                      className="p-3.5 rounded-xl bg-[#070B12] border border-slate-800 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-teal-300">
                          {box.title}
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          {box.sub}
                        </p>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-vazir font-medium">
                        ● {box.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Logs Table */}
              <div className="p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-3">
                <h2 className="text-sm font-bold text-white">
                  ثبت فعالیت‌های مدیریتی و رویدادهای امنیتی (Audit Log)
                </h2>
                <div className="divide-y divide-slate-800">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-white">
                          {log.actionFa}
                        </div>
                        <div className="text-slate-400">{log.detailFa}</div>
                      </div>
                      <div className="font-vazir tabular-nums text-[11px] text-slate-400 shrink-0">
                        {log.actor} · {log.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              MODULE 3: BRAND & THEME STUDIO (مدیریت ظاهر و هویت برند)
          ================================================================== */}
          {activeModule === 'brand-theme' && (
            <div
              data-testid="studio-section-brand-theme"
              className="space-y-6"
            >
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  مدیریت ظاهر و هویت برند (Brand & Visual Identity)
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  تنظیم رنگ‌ها، گرادیان‌ها، شفافیت شیشه‌ای، نورهای نئونی، تایپوگرافی و افکت‌های حرکتی در پیش‌نویس.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        رنگ اصلی برند (Primary)
                      </label>
                      <input
                        type="color"
                        aria-label="رنگ اصلی برند"
                        value={draftBrand.primaryColor}
                        onChange={(e) =>
                          onUpdateDraftBrand((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg bg-[#070B12] border border-slate-700 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        رنگ مکمل نئونی (Secondary)
                      </label>
                      <input
                        type="color"
                        aria-label="رنگ مکمل نئونی"
                        value={draftBrand.secondaryColor}
                        onChange={(e) =>
                          onUpdateDraftBrand((prev) => ({
                            ...prev,
                            secondaryColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg bg-[#070B12] border border-slate-700 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        رنگ سطح کارت‌ها (Surface)
                      </label>
                      <input
                        type="color"
                        aria-label="رنگ سطح کارت‌ها"
                        value={draftBrand.surfaceColor}
                        onChange={(e) =>
                          onUpdateDraftBrand((prev) => ({
                            ...prev,
                            surfaceColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg bg-[#070B12] border border-slate-700 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>شفافیت شیشه‌ای پنل‌ها (Glass Opacity)</span>
                      <span className="font-vazir tabular-nums text-teal-300">
                        {Math.round(draftBrand.glassOpacity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="شفافیت شیشه‌ای پنل‌ها"
                      min={0.35}
                      max={0.95}
                      step={0.02}
                      value={draftBrand.glassOpacity}
                      onChange={(e) =>
                        onUpdateDraftBrand((prev) => ({
                          ...prev,
                          glassOpacity: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>شدت نورهای نئونی (Neon Glow Intensity)</span>
                      <span className="font-vazir tabular-nums text-teal-300">
                        {Math.round(draftBrand.neonIntensity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="شدت نورهای نئونی"
                      min={0.1}
                      max={1.0}
                      step={0.05}
                      value={draftBrand.neonIntensity}
                      onChange={(e) =>
                        onUpdateDraftBrand((prev) => ({
                          ...prev,
                          neonIntensity: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>شعاع انحنای کارت‌های محصول (Border Radius)</span>
                      <span className="font-vazir tabular-nums text-teal-300">
                        {draftBrand.cardBorderRadiusPx}px
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="شعاع انحنای کارت‌های محصول"
                      min={8}
                      max={32}
                      step={2}
                      value={draftBrand.cardBorderRadiusPx}
                      onChange={(e) =>
                        onUpdateDraftBrand((prev) => ({
                          ...prev,
                          cardBorderRadiusPx: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {(
                      [
                        { id: 'full', label: 'حرکت کامل (Full Motion)' },
                        { id: 'balanced', label: 'متعادل (Balanced)' },
                        { id: 'reduced', label: 'کم‌مصرف (Reduced)' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          onUpdateDraftBrand((prev) => ({
                            ...prev,
                            motionScale: m.id,
                          }))
                        }
                        className={`px-3 py-2 rounded-xl text-xs border cursor-pointer ${
                          draftBrand.motionScale === m.id
                            ? 'bg-teal-400 text-slate-950 font-bold border-teal-400'
                            : 'bg-[#070B12] border-slate-800 text-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Brand Card Sample Preview */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0B101B] border border-slate-800 flex flex-col justify-between gap-4">
                  <div className="text-xs font-bold text-slate-300">
                    پیش‌نمایش زندهٔ کارت محصول با توکن‌های فعلی برند
                  </div>
                  <div
                    style={{
                      backgroundColor: draftBrand.surfaceColor,
                      borderRadius: `${draftBrand.cardBorderRadiusPx}px`,
                      borderColor: draftBrand.primaryColor,
                      boxShadow: `0 0 ${Math.round(
                        draftBrand.neonIntensity * 28
                      )}px ${draftBrand.primaryColor}33`,
                    }}
                    className="p-5 border transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>اکانت قانونی هوش مصنوعی</span>
                      <span className="font-vazir tabular-nums">$20.00</span>
                    </div>
                    <div className="text-base font-bold text-white">
                      ChatGPT Plus 4o — اشتراک اختصاصی
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      تحویل آنی با تضمین سرور و هماهنگی خودکار نرخ لحظه‌ای والکس.
                    </p>
                    <button
                      type="button"
                      style={{
                        backgroundColor: draftBrand.primaryColor,
                        borderRadius: `${Math.max(
                          6,
                          draftBrand.cardBorderRadiusPx - 8
                        )}px`,
                      }}
                      className="w-full py-2.5 text-slate-950 font-bold text-xs"
                    >
                      افزودن به سبد خرید
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 font-vazir tabular-nums">
                    Primary: {draftBrand.primaryColor} · Secondary:{' '}
                    {draftBrand.secondaryColor} · Radius:{' '}
                    {draftBrand.cardBorderRadiusPx}px
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              MODULE 4: DIGITAL ASSET LIBRARY (کتابخانهٔ دارایی‌های دیجیتال)
          ================================================================== */}
          {activeModule === 'asset-library' && (
            <div
              data-testid="studio-section-asset-library"
              className="space-y-6"
            >
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  کتابخانهٔ دارایی‌های دیجیتال و بررسی سلامت فایل‌ها
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  مدیریت مدل‌های سه‌بعدی (GLB/glTF)، بافت‌ها، ویدیوها و بررسی خودکار نوع، حجم و سازگاری فایل پیش از انتشار.
                </p>
              </div>

              {/* Safe Asset Upload & Validation Gate Simulator */}
              <div className="p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-bold text-white">
                    بررسی امنیتی و افزودن فایل جدید به کتابخانه
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      data-testid="studio-test-valid-asset-btn"
                      onClick={() =>
                        handleValidateAndAddAsset('ai_holo_companion_v2.glb', 3.4, 21500)
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold cursor-pointer"
                    >
                      + تست بارگذاری فایل GLB سالم (3.4MB)
                    </button>
                    <button
                      type="button"
                      data-testid="studio-test-corrupt-asset-btn"
                      onClick={() =>
                        handleValidateAndAddAsset('unoptimized_raw_scene.glb', 48.5, 190000)
                      }
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold cursor-pointer"
                    >
                      تست مسدودسازی فایل سنگین/ناسازگار (48.5MB)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    aria-label="نام فایل دارایی"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="نام فایل (مثلاً character.glb)"
                    className="bg-[#070B12] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="number"
                    aria-label="حجم فایل به مگابایت"
                    value={newFileSizeMb}
                    onChange={(e) => setNewFileSizeMb(e.target.value)}
                    placeholder="حجم (MB)"
                    className="bg-[#070B12] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-vazir tabular-nums"
                  />
                  <select
                    aria-label="دستهٔ هدف دارایی"
                    value={assetCategory}
                    onChange={(e) =>
                      setAssetCategory(e.target.value as StudioCategoryKey)
                    }
                    className="bg-[#070B12] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    {CATEGORY_TABS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.labelFa}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    data-testid="studio-validate-upload-btn"
                    onClick={() => handleValidateAndAddAsset()}
                    className="inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-lg px-4 py-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>بررسی و ثبت در کتابخانه</span>
                  </button>
                </div>

                {uploadFeedback && (
                  <div
                    data-testid="studio-upload-feedback"
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      uploadFeedback.valid
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    {uploadFeedback.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{uploadFeedback.message}</span>
                  </div>
                )}
              </div>

              {/* Assets Table */}
              <div className="bg-[#0B101B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#070B12] text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">نام فایل</th>
                        <th className="py-3 px-4">نوع / نسخه</th>
                        <th className="py-3 px-4">حجم و چندضلعی</th>
                        <th className="py-3 px-4">وضعیت سازگاری</th>
                        <th className="py-3 px-4">آخرین بروزرسانی</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {assets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-slate-800/30">
                          <td className="py-3 px-4 font-vazir tabular-nums text-white font-semibold">
                            {asset.name}
                          </td>
                          <td className="py-3 px-4 font-vazir tabular-nums text-slate-300">
                            {asset.type.toUpperCase()} · {asset.version}
                          </td>
                          <td className="py-3 px-4 font-vazir tabular-nums text-slate-300">
                            {asset.sizeMb.toFixed(1)} MB
                            {asset.polyCount
                              ? ` · ${asset.polyCount.toLocaleString()} Polys`
                              : ''}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={
                                asset.status === 'compatible'
                                  ? 'text-emerald-400'
                                  : asset.status === 'warning'
                                    ? 'text-amber-300'
                                    : 'text-rose-400'
                              }
                            >
                              ● {asset.statusNoteFa}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-vazir tabular-nums text-slate-400">
                            {asset.updatedAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              MODULE 5: 6-STEP CONTROLLED RELEASE & ROLLBACK PIPELINE
          ================================================================== */}
          {activeModule === 'release-pipeline' && (
            <div
              data-testid="studio-section-release-pipeline"
              className="space-y-6"
            >
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  نسخه‌بندی و انتشار کنترل‌شده (۶ مرحلهٔ ایمن + بازگشت سریع)
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  هیچ تغییر ظاهری بدون تأیید صریح شما روی سایت عمومی فعال نمی‌شود و انتشار محتوا از کد برنامه کاملاً مستقل است.
                </p>
              </div>

              {/* 6-Step Visual Pipeline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    step: '۱',
                    title: 'ویرایش',
                    desc: 'تغییر صحنه، مدل، رنگ یا انیمیشن در محیط پیش‌نویس',
                  },
                  {
                    step: '۲',
                    title: 'پیش‌نمایش',
                    desc: 'نمایش نسخهٔ پیشنهادی در محیط ایزوله بدون تغییر سایت عمومی',
                  },
                  {
                    step: '۳',
                    title: 'بررسی',
                    desc: 'بررسی خطاها، عملکرد موبایل و حجم فایل‌ها',
                  },
                  {
                    step: '۴',
                    title: 'تأیید نهایی',
                    desc: 'نمایش خلاصهٔ تغییرات و درخواست تأیید صریح از مدیر',
                  },
                  {
                    step: '۵',
                    title: 'انتشار نسخه',
                    desc: 'فعال‌کردن نسخهٔ تأییدشده و ثبت شناسه و زمان انتشار',
                  },
                  {
                    step: '۶',
                    title: 'بازگشت امن',
                    desc: 'بازگرداندن فوری نسخهٔ قبلی تنظیمات در صورت نیاز',
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="p-3.5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-teal-300 font-vazir tabular-nums">
                        مرحله {s.step}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div className="text-xs font-bold text-white">{s.title}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left/Right 7 Cols: Diff Summary + Automated Pre-Release Checks + Explicit Confirmation */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Diff Viewer */}
                  <div className="p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-white">
                        مقایسهٔ نسخهٔ فعلی ({publishedVersion.versionId}) و پیش‌نویس پیشنهادی
                      </h2>
                      <span className="text-xs font-vazir tabular-nums text-amber-300">
                        {draftDiffs.length} تغییر شناسایی شد
                      </span>
                    </div>

                    {draftDiffs.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2">
                        در حال حاضر پیش‌نویس دقیقاً منطبق با نسخهٔ فعال عمومی ({publishedVersion.versionId}) است. می‌توانید در ویرایشگر سه‌بعدی یا بخش هویت برند تغییراتی ایجاد کنید.
                      </p>
                    ) : (
                      <ul
                        data-testid="studio-diff-list"
                        className="space-y-1.5 text-xs text-slate-200 list-disc list-inside"
                      >
                        {draftDiffs.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Step 3 Automated Validation Checks */}
                  <div className="p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-3">
                    <h2 className="text-sm font-bold text-white">
                      نتایج بررسی خودکار پیش از انتشار (مرحلهٔ ۳)
                    </h2>
                    <div className="space-y-2">
                      {validationChecks.map((chk) => (
                        <div
                          key={chk.id}
                          className="p-3 rounded-xl bg-[#070B12] border border-slate-800 flex items-start gap-2.5 text-xs"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              chk.passed ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          />
                          <div>
                            <div className="font-bold text-white">
                              {chk.titleFa}
                            </div>
                            <div className="text-slate-400 mt-0.5">
                              {chk.detailFa}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 4 & 5: Explicit Admin Approval & Publish */}
                  <div className="p-5 rounded-2xl bg-[#0B101B] border border-teal-500/40 space-y-4">
                    <h2 className="text-sm font-bold text-white">
                      مرحلهٔ ۴ و ۵: تأیید صریح مدیر و انتشار نسخهٔ جدید
                    </h2>
                    <input
                      type="text"
                      aria-label="یادداشت انتشار نسخه"
                      value={releaseNotes}
                      onChange={(e) => setReleaseNotes(e.target.value)}
                      className="w-full bg-[#070B12] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      placeholder="توضیح مختصر دربارهٔ تغییرات این نسخه..."
                    />

                    <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        data-testid="studio-explicit-approval-checkbox"
                        checked={adminExplicitConfirmed}
                        onChange={(e) =>
                          setAdminExplicitConfirmed(e.target.checked)
                        }
                        className="accent-teal-400 w-4 h-4 cursor-pointer"
                      />
                      <span>
                        تغییرات پیش‌نویس و پیش‌نمایش ایزوله را بررسی کرده‌ام و صریحاً انتشار این نسخه روی سایت عمومی را تأیید می‌کنم.
                      </span>
                    </label>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        data-testid="studio-publish-confirmed-btn"
                        disabled={!adminExplicitConfirmed || !allChecksPass}
                        onClick={handleConfirmPublish}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          adminExplicitConfirmed && allChecksPass
                            ? 'bg-teal-400 hover:bg-teal-300 text-slate-950'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        انتشار نسخهٔ تأییدشده روی فروشگاه عمومی
                      </button>

                      <button
                        type="button"
                        onClick={onEnterIsolatedPreview}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold cursor-pointer"
                      >
                        مشاهدهٔ پیش‌نمایش ایزوله قبل از انتشار
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right/Left 5 Cols: Step 6 Version History & Instant Safe Rollback */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0B101B] border border-slate-800 space-y-4">
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      مرحلهٔ ۶: تاریخچهٔ نسخه‌ها و بازگشت امن (Safe Rollback)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      در صورت بروز هرگونه مشکل، با یک کلیک نسخهٔ سالم قبلی را بدون دستکاری کد یا دیتابیس فروش بازیابی کنید:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {versionHistory.map((ver) => {
                      const isCurrentPub =
                        ver.versionId === publishedVersion.versionId;
                      return (
                        <div
                          key={ver.versionId}
                          data-testid={`studio-version-card-${ver.versionId}`}
                          className={`p-4 rounded-xl border space-y-2 ${
                            isCurrentPub
                              ? 'bg-teal-950/30 border-teal-400/50'
                              : 'bg-[#070B12] border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-vazir tabular-nums font-bold text-sm text-white">
                              {ver.versionId}
                            </span>
                            <span
                              className={`text-[11px] font-semibold ${
                                isCurrentPub
                                  ? 'text-teal-300'
                                  : 'text-slate-400'
                              }`}
                            >
                              {isCurrentPub
                                ? '● نسخهٔ فعال روی سایت عمومی'
                                : 'نسخهٔ سالم آرشیوشده'}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-200">
                            {ver.labelFa}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {ver.notesFa}
                          </p>
                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-vazir tabular-nums">
                            <span>{ver.publishedAt || ver.createdAt}</span>
                            {!isCurrentPub && (
                              <button
                                type="button"
                                data-testid={`studio-rollback-btn-${ver.versionId}`}
                                onClick={() => handleRollback(ver.versionId)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-vazir font-bold text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>بازگشت امن به {ver.versionId}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
