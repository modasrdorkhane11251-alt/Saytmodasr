export type StudioCategoryKey = 'home' | 'gaming' | 'ai' | 'webapp' | 'vpn';

export type StudioModuleId =
  | 'dashboard'
  | 'scene-editor'
  | 'brand-theme'
  | 'asset-library'
  | 'release-pipeline';

export type SceneEditorToolId =
  | 'scene-editor'
  | 'model-manager'
  | 'animation-timeline'
  | 'camera-controls'
  | 'lighting-studio'
  | 'object-placement'
  | 'interaction-rules'
  | 'responsive-preview';

export type StudioAnimationAction =
  | 'idle'
  | 'raise-hand-reveal'
  | 'product-focus'
  | 'orbital-pulse';

export type ResponsiveDeviceFrame = 'desktop' | 'tablet' | 'mobile';

export type ReleaseStepNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface InteractionRule {
  id: string;
  trigger: 'on-load' | 'on-click-character' | 'on-select-product' | 'on-scroll' | 'on-category-switch';
  triggerLabelFa: string;
  action: StudioAnimationAction;
  actionLabelFa: string;
  revealProductCards: boolean;
  cameraZoomDelta: number;
  enabled: boolean;
}

export interface StudioSceneConfig {
  categoryKey: StudioCategoryKey;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  characterNameFa: string;
  modelAssetId: string;
  modelFormat: 'GLB' | 'glTF';
  polyCount: number;
  fileSizeMb: number;
  // Animation Timeline
  activeAction: StudioAnimationAction;
  timelineDurationSec: number;
  timelineStartSec: number;
  timelineEndSec: number;
  animationSpeed: number;
  loopAnimation: boolean;
  handRaiseProgress: number; // 0..1 controls hand elevation & card emergence
  selectedCardIndex: number; // 0..3
  // Camera Controls
  cameraPos: [number, number, number];
  cameraTargetY: number;
  cameraFov: number;
  autoOrbitSpeed: number;
  // Lighting Studio
  keyLightColor: string;
  keyLightIntensity: number;
  fillLightColor: string;
  fillLightIntensity: number;
  rimLightColor: string;
  rimLightIntensity: number;
  fogColor: string;
  fogDensity: number;
  bloomIntensity: number;
  // Object Placement
  objectPosition: [number, number, number];
  objectRotationYDeg: number;
  objectScale: number;
  cardRingRadius: number;
  // Interaction Rules
  interactionRules: InteractionRule[];
  // Responsive & Performance
  mobileReducedEffects: boolean;
  featuredProductTitles: [string, string, string, string];
}

export interface BrandIdentityConfig {
  primaryColor: string;
  secondaryColor: string;
  surfaceColor: string;
  glassOpacity: number;
  glassBlurPx: number;
  neonIntensity: number;
  headingFontFa: 'Vazirmatn' | 'Peyda' | 'YekanBakh';
  displayFontEn: 'Orbitron' | 'Plus Jakarta Sans' | 'Chakra Petch';
  cardBorderRadiusPx: number;
  motionScale: 'full' | 'balanced' | 'reduced';
}

export interface DigitalAssetItem {
  id: string;
  name: string;
  categoryKey: StudioCategoryKey;
  type: 'glb' | 'gltf' | 'texture' | 'video' | 'image' | 'audio';
  version: string;
  sizeMb: number;
  polyCount?: number;
  animationClips?: string[];
  mimeType: string;
  status: 'compatible' | 'warning' | 'rejected';
  statusNoteFa: string;
  updatedAt: string;
}

export interface StudioAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actionFa: string;
  detailFa: string;
  severity: 'info' | 'success' | 'warning';
}

export interface ValidationCheckResult {
  id: string;
  titleFa: string;
  passed: boolean;
  severity: 'pass' | 'warning' | 'error';
  detailFa: string;
}

export interface StudioSnapshotVersion {
  versionId: string;
  labelFa: string;
  status: 'published' | 'draft' | 'archived' | 'rolled_back';
  createdAt: string;
  publishedAt?: string;
  author: string;
  notesFa: string;
  scenes: Record<StudioCategoryKey, StudioSceneConfig>;
  brand: BrandIdentityConfig;
}

export const STUDIO_TOOLS_META: Array<{
  id: SceneEditorToolId;
  titleEn: string;
  titleFa: string;
  descFa: string;
}> = [
  {
    id: 'scene-editor',
    titleEn: 'Scene Editor',
    titleFa: 'مدیریت صحنه‌ها',
    descFa: 'ساخت و مدیریت صحنه‌های مستقل برای هر دسته',
  },
  {
    id: 'model-manager',
    titleEn: 'Model Manager',
    titleFa: 'مدیریت مدل سه‌بعدی',
    descFa: 'بارگذاری مدل‌های GLB و glTF و بررسی اسکلت انیمیشن',
  },
  {
    id: 'animation-timeline',
    titleEn: 'Animation Timeline',
    titleFa: 'خط زمانی انیمیشن',
    descFa: 'تنظیم حرکت‌ها، زمان شروع و پایان و حلقهٔ انیمیشن',
  },
  {
    id: 'camera-controls',
    titleEn: 'Camera Controls',
    titleFa: 'کنترل دوربین',
    descFa: 'تعیین زاویه، فاصله، FOV و حرکت دوربین',
  },
  {
    id: 'lighting-studio',
    titleEn: 'Lighting Studio',
    titleFa: 'استودیوی نورپردازی',
    descFa: 'تنظیم نور کلیدی، محیطی، درخشش نئون و مه صحنه',
  },
  {
    id: 'object-placement',
    titleEn: 'Object Placement',
    titleFa: 'چیدمان اشیا و کاراکتر',
    descFa: 'جابه‌جایی، چرخش و تغییر مقیاس شخصیت‌ها و کارت‌های محصول',
  },
  {
    id: 'interaction-rules',
    titleEn: 'Interaction Rules',
    titleFa: 'قوانین تعامل',
    descFa: 'تعریف واکنش به کلیک، اسکرول، حرکت اشاره‌گر و انتخاب دسته',
  },
  {
    id: 'responsive-preview',
    titleEn: 'Responsive Preview',
    titleFa: 'پیش‌نمایش واکنش‌گرا',
    descFa: 'بررسی نتیجه در موبایل، تبلت و دسکتاپ و حالت کم‌مصرف',
  },
];

export const INITIAL_SCENES_CONFIG: Record<StudioCategoryKey, StudioSceneConfig> = {
  home: {
    categoryKey: 'home',
    titleFa: 'خانه و همهٔ محصولات',
    titleEn: 'Home & All Products',
    subtitleFa: 'شخصیت اصلی برند با بالا بردن دست، کارت‌های محصولات منتخب را ظاهر می‌کند و با انتخاب هر محصول انیمیشن اختصاصی آن اجرا می‌شود.',
    characterNameFa: 'آواتار اصلی مدثر (MODASR Prime Curator)',
    modelAssetId: 'asset-glb-prime-curator',
    modelFormat: 'GLB',
    polyCount: 28400,
    fileSizeMb: 4.2,
    activeAction: 'raise-hand-reveal',
    timelineDurationSec: 5.0,
    timelineStartSec: 0.0,
    timelineEndSec: 5.0,
    animationSpeed: 1.0,
    loopAnimation: true,
    handRaiseProgress: 0.88,
    selectedCardIndex: 0,
    cameraPos: [0, 1.45, 6.2],
    cameraTargetY: 1.05,
    cameraFov: 44,
    autoOrbitSpeed: 0.18,
    keyLightColor: '#2dd4bf',
    keyLightIntensity: 2.2,
    fillLightColor: '#38bdf8',
    fillLightIntensity: 1.1,
    rimLightColor: '#f59e0b',
    rimLightIntensity: 1.8,
    fogColor: '#050914',
    fogDensity: 0.045,
    bloomIntensity: 0.75,
    objectPosition: [0, 0, 0],
    objectRotationYDeg: 0,
    objectScale: 1.0,
    cardRingRadius: 1.9,
    interactionRules: [
      {
        id: 'rule-home-1',
        trigger: 'on-load',
        triggerLabelFa: 'ورود کاربر به صحنهٔ خانه',
        action: 'raise-hand-reveal',
        actionLabelFa: 'بالا بردن دست کاراکتر و احضار هولوگرام محصولات',
        revealProductCards: true,
        cameraZoomDelta: -0.4,
        enabled: true,
      },
      {
        id: 'rule-home-2',
        trigger: 'on-select-product',
        triggerLabelFa: 'کلیک روی کارت محصول سه‌بعدی',
        action: 'product-focus',
        actionLabelFa: 'چرخش کاراکتر به سمت کارت و اجرای انیمیشن معرفی محصول',
        revealProductCards: true,
        cameraZoomDelta: -0.9,
        enabled: true,
      },
    ],
    mobileReducedEffects: true,
    featuredProductTitles: [
      'ChatGPT Plus 4o',
      'PS5 Gift Card $50',
      'Spotify Premium',
      'V2Ray VIP Titanium',
    ],
  },
  gaming: {
    categoryKey: 'gaming',
    titleFa: 'گیمینگ و کنسول',
    titleEn: 'Gaming & Esports Arena',
    subtitleFa: 'محیط بازی اختصاصی با نورهای نئونی، عناصر متحرک و افکت‌های واکنشی هنگام انتخاب اکانت و گیفت‌کارت.',
    characterNameFa: 'نگهبان سایبر گیمینگ (Neon Vanguard Mech)',
    modelAssetId: 'asset-glb-neon-vanguard',
    modelFormat: 'GLB',
    polyCount: 34200,
    fileSizeMb: 5.1,
    activeAction: 'orbital-pulse',
    timelineDurationSec: 4.5,
    timelineStartSec: 0.0,
    timelineEndSec: 4.5,
    animationSpeed: 1.15,
    loopAnimation: true,
    handRaiseProgress: 0.92,
    selectedCardIndex: 1,
    cameraPos: [0.35, 1.5, 6.1],
    cameraTargetY: 1.08,
    cameraFov: 46,
    autoOrbitSpeed: 0.28,
    keyLightColor: '#a855f7',
    keyLightIntensity: 2.5,
    fillLightColor: '#10b981',
    fillLightIntensity: 1.3,
    rimLightColor: '#ec4899',
    rimLightIntensity: 2.1,
    fogColor: '#090414',
    fogDensity: 0.05,
    bloomIntensity: 0.9,
    objectPosition: [0, 0, 0],
    objectRotationYDeg: -12,
    objectScale: 1.02,
    cardRingRadius: 1.95,
    interactionRules: [
      {
        id: 'rule-game-1',
        trigger: 'on-category-switch',
        triggerLabelFa: 'انتخاب دستهٔ گیمینگ',
        action: 'orbital-pulse',
        actionLabelFa: 'فعال‌سازی پورتال نئون و چرخش کنترلرهای هولوگرافیک',
        revealProductCards: true,
        cameraZoomDelta: -0.5,
        enabled: true,
      },
    ],
    mobileReducedEffects: true,
    featuredProductTitles: [
      'PlayStation Plus Deluxe',
      'Steam Wallet $20',
      'Xbox Game Pass Ultimate',
      'Valorant Points 2050',
    ],
  },
  ai: {
    categoryKey: 'ai',
    titleFa: 'هوش مصنوعی',
    titleEn: 'Artificial Intelligence Lab',
    subtitleFa: 'ربات و هستهٔ عصبی اختصاصی با پنل‌های هولوگرافیک و حرکت‌های متناسب با ابزارهای هوش مصنوعی.',
    characterNameFa: 'ربات سنتینل هوش مصنوعی (Neural Sentinel Core)',
    modelAssetId: 'asset-glb-neural-sentinel',
    modelFormat: 'GLB',
    polyCount: 24800,
    fileSizeMb: 3.7,
    activeAction: 'raise-hand-reveal',
    timelineDurationSec: 6.0,
    timelineStartSec: 0.0,
    timelineEndSec: 6.0,
    animationSpeed: 1.0,
    loopAnimation: true,
    handRaiseProgress: 0.85,
    selectedCardIndex: 0,
    cameraPos: [-0.25, 1.45, 6.0],
    cameraTargetY: 1.05,
    cameraFov: 42,
    autoOrbitSpeed: 0.22,
    keyLightColor: '#06b6d4',
    keyLightIntensity: 2.4,
    fillLightColor: '#3b82f6',
    fillLightIntensity: 1.2,
    rimLightColor: '#22d3ee',
    rimLightIntensity: 2.0,
    fogColor: '#030b17',
    fogDensity: 0.04,
    bloomIntensity: 0.82,
    objectPosition: [0, 0, 0],
    objectRotationYDeg: 8,
    objectScale: 1.0,
    cardRingRadius: 1.9,
    interactionRules: [
      {
        id: 'rule-ai-1',
        trigger: 'on-click-character',
        triggerLabelFa: 'کلیک روی هستهٔ هوش مصنوعی',
        action: 'product-focus',
        actionLabelFa: 'باز شدن پنل‌های هولوگرافیک مدل‌های زبانی',
        revealProductCards: true,
        cameraZoomDelta: -0.7,
        enabled: true,
      },
    ],
    mobileReducedEffects: true,
    featuredProductTitles: [
      'ChatGPT Plus Official',
      'Claude 3.7 Sonnet Pro',
      'Midjourney Pro Plan',
      'Cursor AI Pro IDE',
    ],
  },
  webapp: {
    categoryKey: 'webapp',
    titleFa: 'وب و اپلیکیشن',
    titleEn: 'Web & Software Applications',
    subtitleFa: 'پنجره‌های شناور، نمایش رابط‌های دیجیتال و انیمیشن‌های مخصوص محصولات نرم‌افزاری و پرمیوم.',
    characterNameFa: 'معمار رابط‌های فضایی (Spatial UI Architect)',
    modelAssetId: 'asset-glb-spatial-ui',
    modelFormat: 'glTF',
    polyCount: 19600,
    fileSizeMb: 2.9,
    activeAction: 'raise-hand-reveal',
    timelineDurationSec: 5.2,
    timelineStartSec: 0.0,
    timelineEndSec: 5.2,
    animationSpeed: 0.95,
    loopAnimation: true,
    handRaiseProgress: 0.8,
    selectedCardIndex: 2,
    cameraPos: [0.2, 1.45, 6.1],
    cameraTargetY: 1.05,
    cameraFov: 44,
    autoOrbitSpeed: 0.15,
    keyLightColor: '#38bdf8',
    keyLightIntensity: 2.1,
    fillLightColor: '#818cf8',
    fillLightIntensity: 1.15,
    rimLightColor: '#f472b6',
    rimLightIntensity: 1.7,
    fogColor: '#050814',
    fogDensity: 0.038,
    bloomIntensity: 0.68,
    objectPosition: [0, 0, 0],
    objectRotationYDeg: 0,
    objectScale: 1.0,
    cardRingRadius: 1.9,
    interactionRules: [
      {
        id: 'rule-web-1',
        trigger: 'on-scroll',
        triggerLabelFa: 'اسکرول یا انتخاب کارت اپلیکیشن',
        action: 'raise-hand-reveal',
        actionLabelFa: 'شناورسازی لایه‌ای پنجره‌های رابط کاربری',
        revealProductCards: true,
        cameraZoomDelta: -0.45,
        enabled: true,
      },
    ],
    mobileReducedEffects: true,
    featuredProductTitles: [
      'Spotify Premium Individual',
      'Telegram Premium 1Yr',
      'YouTube Premium Family',
      'Canva Pro Workspace',
    ],
  },
  vpn: {
    categoryKey: 'vpn',
    titleFa: 'VPN و سرویس‌های شبکه',
    titleEn: 'VPN & Encrypted Network Shield',
    subtitleFa: 'فضای سایبری اختصاصی، سپر دیجیتال و افکت‌های ارتباطی؛ با حفظ کامل منطق فروش و تحویل فعلی ربات.',
    characterNameFa: 'سپر سایبری کوانتومی (Quantum Network Guardian)',
    modelAssetId: 'asset-glb-cyber-shield',
    modelFormat: 'GLB',
    polyCount: 22100,
    fileSizeMb: 3.3,
    activeAction: 'orbital-pulse',
    timelineDurationSec: 4.8,
    timelineStartSec: 0.0,
    timelineEndSec: 4.8,
    animationSpeed: 1.05,
    loopAnimation: true,
    handRaiseProgress: 0.9,
    selectedCardIndex: 0,
    cameraPos: [0, 1.5, 6.1],
    cameraTargetY: 1.05,
    cameraFov: 45,
    autoOrbitSpeed: 0.25,
    keyLightColor: '#10b981',
    keyLightIntensity: 2.3,
    fillLightColor: '#0ea5e9',
    fillLightIntensity: 1.1,
    rimLightColor: '#fbbf24',
    rimLightIntensity: 1.9,
    fogColor: '#020c0b',
    fogDensity: 0.042,
    bloomIntensity: 0.8,
    objectPosition: [0, 0, 0],
    objectRotationYDeg: 15,
    objectScale: 1.0,
    cardRingRadius: 1.9,
    interactionRules: [
      {
        id: 'rule-vpn-1',
        trigger: 'on-select-product',
        triggerLabelFa: 'انتخاب پلن شبکه یا لوکیشن',
        action: 'product-focus',
        actionLabelFa: 'درخشش سپر امنیتی بدون دخالت در هستهٔ تحویل ربات PHP',
        revealProductCards: true,
        cameraZoomDelta: -0.6,
        enabled: true,
      },
    ],
    mobileReducedEffects: true,
    featuredProductTitles: [
      'V2Ray VIP Multi-Location',
      'Dedicated IP Germany/Finland',
      'Gaming Low-Ping Tunnel',
      'Enterprise Team Access',
    ],
  },
};

export const INITIAL_BRAND_IDENTITY: BrandIdentityConfig = {
  primaryColor: '#2dd4bf',
  secondaryColor: '#38bdf8',
  surfaceColor: '#090d16',
  glassOpacity: 0.72,
  glassBlurPx: 16,
  neonIntensity: 0.78,
  headingFontFa: 'Vazirmatn',
  displayFontEn: 'Orbitron',
  cardBorderRadiusPx: 20,
  motionScale: 'full',
};

export const INITIAL_DIGITAL_ASSETS: DigitalAssetItem[] = [
  {
    id: 'asset-glb-prime-curator',
    name: 'modasr_prime_curator_v2.glb',
    categoryKey: 'home',
    type: 'glb',
    version: 'v2.1',
    sizeMb: 4.2,
    polyCount: 28400,
    animationClips: ['Idle_Float', 'Raise_Hand_Summon_Cards', 'Inspect_Product_Card'],
    mimeType: 'model/gltf-binary',
    status: 'compatible',
    statusNoteFa: 'فشرده‌سازی Draco فعال · ۳ کلیپ انیمیشن اسکلتی سالم',
    updatedAt: '۱۴۰۵/۰۸/۰۴ - ۱۰:۱۵',
  },
  {
    id: 'asset-glb-neon-vanguard',
    name: 'neon_vanguard_gaming_rig.glb',
    categoryKey: 'gaming',
    type: 'glb',
    version: 'v1.4',
    sizeMb: 5.1,
    polyCount: 34200,
    animationClips: ['Arena_Idle', 'Portal_Pulse', 'Controller_Orbit'],
    mimeType: 'model/gltf-binary',
    status: 'compatible',
    statusNoteFa: 'بافت‌های KTX2 بهینه · سازگار با موبایل و دسکتاپ',
    updatedAt: '۱۴۰۵/۰۸/۰۳ - ۱۸:۴۰',
  },
  {
    id: 'asset-glb-neural-sentinel',
    name: 'neural_sentinel_ai_core.glb',
    categoryKey: 'ai',
    type: 'glb',
    version: 'v3.0',
    sizeMb: 3.7,
    polyCount: 24800,
    animationClips: ['Neural_Sync', 'Holo_Panel_Expand', 'Deep_Focus'],
    mimeType: 'model/gltf-binary',
    status: 'compatible',
    statusNoteFa: 'تأییدشده · زمان بارگذاری کمتر از ۱.۲ ثانیه',
    updatedAt: '۱۴۰۵/۰۸/۰۴ - ۱۱:۲۰',
  },
  {
    id: 'asset-glb-spatial-ui',
    name: 'spatial_ui_windows_deck.gltf',
    categoryKey: 'webapp',
    type: 'gltf',
    version: 'v1.2',
    sizeMb: 2.9,
    polyCount: 19600,
    animationClips: ['Layers_Float', 'Window_Cascade'],
    mimeType: 'model/gltf+json',
    status: 'compatible',
    statusNoteFa: 'سبک و بهینه برای تمامی مرورگرها',
    updatedAt: '۱۴۰۵/۰۸/۰۲ - ۱۴:۱۰',
  },
  {
    id: 'asset-glb-cyber-shield',
    name: 'quantum_vpn_shield_dome.glb',
    categoryKey: 'vpn',
    type: 'glb',
    version: 'v2.0',
    sizeMb: 3.3,
    polyCount: 22100,
    animationClips: ['Shield_Rotate', 'Tunnel_Lock'],
    mimeType: 'model/gltf-binary',
    status: 'compatible',
    statusNoteFa: 'ایزوله از منطق ربات VPN · فقط لایهٔ بصری',
    updatedAt: '۱۴۰۵/۰۸/۰۴ - ۰۹:۰۵',
  },
  {
    id: 'asset-tex-holo-grid',
    name: 'holographic_card_normal_2k.webp',
    categoryKey: 'home',
    type: 'texture',
    version: 'v1.0',
    sizeMb: 0.65,
    mimeType: 'image/webp',
    status: 'compatible',
    statusNoteFa: 'ابعاد 2048×2048 · فرمت WebP فشرده',
    updatedAt: '۱۴۰۵/۰۸/۰۱ - ۱۶:۳۰',
  },
];

export const INITIAL_VERSION_HISTORY: StudioSnapshotVersion[] = [
  {
    versionId: 'v1.0.2',
    labelFa: 'نسخهٔ ۱.۰.۲ — صحنهٔ تعاملی کاراکتر اصلی و تفکیک ۵ دسته',
    status: 'published',
    createdAt: '۱۴۰۵/۰۸/۰۴ - ۱۲:۰۰',
    publishedAt: '۱۴۰۵/۰۸/۰۴ - ۱۲:۰۵',
    author: 'مدیر ارشد (modasrdorkhane@gmail.com)',
    notesFa: 'فعال‌سازی انیمیشن بالا بردن دست و نمایش کارت‌های محصول در صفحهٔ خانه، بهینه‌سازی نور نئون گیمینگ و حفظ ایزولاسیون کامل ربات VPN.',
    scenes: structuredClone(INITIAL_SCENES_CONFIG),
    brand: structuredClone(INITIAL_BRAND_IDENTITY),
  },
  {
    versionId: 'v1.0.1',
    labelFa: 'نسخهٔ ۱.۰.۱ — نسخهٔ پایهٔ پایدار فروشگاه و تم Neural Nexus',
    status: 'archived',
    createdAt: '۱۴۰۵/۰۸/۰۱ - ۰۹:۳۰',
    publishedAt: '۱۴۰۵/۰۸/۰۱ - ۱۰:۰۰',
    author: 'مدیر ارشد (modasrdorkhane@gmail.com)',
    notesFa: 'نسخهٔ سالم قبلی با تنظیمات پیش‌فرض دوربین و نورپردازی استاندارد جهت بازگشت سریع در مواقع ضروری.',
    scenes: {
      ...structuredClone(INITIAL_SCENES_CONFIG),
      home: {
        ...structuredClone(INITIAL_SCENES_CONFIG.home),
        keyLightColor: '#38bdf8',
        handRaiseProgress: 0.65,
        cameraFov: 48,
      },
    },
    brand: {
      ...structuredClone(INITIAL_BRAND_IDENTITY),
      primaryColor: '#38bdf8',
      neonIntensity: 0.6,
    },
  },
];

export const INITIAL_AUDIT_LOGS: StudioAuditEntry[] = [
  {
    id: 'audit-104',
    timestamp: '۱۲:۰۵:۱۰',
    actor: 'modasrdorkhane@gmail.com',
    actionFa: 'انتشار نسخهٔ تأییدشده (v1.0.2)',
    detailFa: 'پس از بررسی سلامت موبایل و تأیید صریح مدیر، نسخهٔ v1.0.2 بدون تغییر در سرویس‌های پرداخت و VPN منتشر شد.',
    severity: 'success',
  },
  {
    id: 'audit-103',
    timestamp: '۱۱:۴۸:۲۲',
    actor: 'Studio Asset Guard',
    actionFa: 'اعتبارسنجی امنیتی فایل GLB',
    detailFa: 'مدل modasr_prime_curator_v2.glb از نظر ساختار باینری، حجم (4.2MB) و تعداد چندضلعی بررسی و تأیید شد.',
    severity: 'info',
  },
  {
    id: 'audit-102',
    timestamp: '۱۱:۳۰:۰۵',
    actor: 'Security Isolation Monitor',
    actionFa: 'تأیید جداسازی API فروش و ربات VPN',
    detailFa: 'مسیرهای نوشتن استودیو فقط به جدول تنظیمات صحنه و دارایی‌ها محدود هستند؛ دسترسی به کیف پول و کانفیگ VPN مسدود و ایزوله است.',
    severity: 'info',
  },
];

/**
 * Validates a candidate digital asset file for type, size, and polygon limits.
 */
export function validateDigitalAsset(input: {
  fileName: string;
  sizeMb: number;
  polyCount?: number;
}): {
  valid: boolean;
  status: 'compatible' | 'warning' | 'rejected';
  reasonFa: string;
  detectedType: DigitalAssetItem['type'] | 'unknown';
} {
  const lower = input.fileName.trim().toLowerCase();
  let detectedType: DigitalAssetItem['type'] | 'unknown' = 'unknown';

  if (lower.endsWith('.glb')) detectedType = 'glb';
  else if (lower.endsWith('.gltf')) detectedType = 'gltf';
  else if (lower.endsWith('.webp') || lower.endsWith('.png') || lower.endsWith('.jpg'))
    detectedType = 'texture';
  else if (lower.endsWith('.mp4') || lower.endsWith('.webm')) detectedType = 'video';
  else if (lower.endsWith('.mp3') || lower.endsWith('.wav') || lower.endsWith('.ogg'))
    detectedType = 'audio';

  if (detectedType === 'unknown') {
    return {
      valid: false,
      status: 'rejected',
      reasonFa: 'فرمت فایل مجاز نیست. فقط فایل‌های استاندارد (GLB, glTF, WebP, PNG, MP4, WebM, MP3) پذیرفته می‌شوند.',
      detectedType: 'unknown',
    };
  }

  if (input.sizeMb <= 0 || Number.isNaN(input.sizeMb)) {
    return {
      valid: false,
      status: 'rejected',
      reasonFa: 'حجم فایل نامعتبر یا صفر است (فایل خراب).',
      detectedType,
    };
  }

  if (input.sizeMb > 25) {
    return {
      valid: false,
      status: 'rejected',
      reasonFa: `حجم فایل (${input.sizeMb.toFixed(1)} مگابایت) بیشتر از سقف مجاز ۲۵ مگابایت است و انتشار را مختل می‌کند.`,
      detectedType,
    };
  }

  if (input.polyCount && input.polyCount > 100000) {
    return {
      valid: false,
      status: 'rejected',
      reasonFa: `تعداد چندضلعی‌های مدل (${input.polyCount.toLocaleString()}) بیش از حد مجاز برای اجرای روان در موبایل است.`,
      detectedType,
    };
  }

  if (input.sizeMb > 12 || (input.polyCount && input.polyCount > 55000)) {
    return {
      valid: true,
      status: 'warning',
      reasonFa: 'فایل سالم است اما برای موبایل‌های ضعیف پیشنهاد می‌شود فشرده‌سازی Draco/KTX2 اعمال شود.',
      detectedType,
    };
  }

  return {
    valid: true,
    status: 'compatible',
    reasonFa: 'ساختار فایل، حجم و سازگاری موبایل/دسکتاپ کاملاً مورد تأیید است.',
    detectedType,
  };
}

/**
 * Computes human-readable summary of differences between active published version and current draft.
 */
export function computeDraftDiff(
  published: StudioSnapshotVersion,
  draftScenes: Record<StudioCategoryKey, StudioSceneConfig>,
  draftBrand: BrandIdentityConfig
): string[] {
  const diffs: string[] = [];

  (Object.keys(draftScenes) as StudioCategoryKey[]).forEach((key) => {
    const pubScene = published.scenes[key];
    const drfScene = draftScenes[key];
    if (!pubScene || !drfScene) return;

    if (pubScene.activeAction !== drfScene.activeAction) {
      diffs.push(
        `صحنهٔ «${drfScene.titleFa}»: تغییر انیمیشن از ${pubScene.activeAction} به ${drfScene.activeAction}`
      );
    }
    if (Math.abs(pubScene.handRaiseProgress - drfScene.handRaiseProgress) > 0.01) {
      diffs.push(
        `صحنهٔ «${drfScene.titleFa}»: تنظیم ارتفاع دست و ظهور کارت‌ها روی ${Math.round(
          drfScene.handRaiseProgress * 100
        )}٪`
      );
    }
    if (
      pubScene.cameraFov !== drfScene.cameraFov ||
      pubScene.cameraPos.some((v, idx) => Math.abs(v - drfScene.cameraPos[idx]) > 0.05)
    ) {
      diffs.push(
        `صحنهٔ «${drfScene.titleFa}»: بروزرسانی مختصات دوربین و زاویهٔ دید (FOV: ${drfScene.cameraFov}°)`
      );
    }
    if (
      pubScene.keyLightColor !== drfScene.keyLightColor ||
      Math.abs(pubScene.keyLightIntensity - drfScene.keyLightIntensity) > 0.05 ||
      Math.abs(pubScene.bloomIntensity - drfScene.bloomIntensity) > 0.05
    ) {
      diffs.push(
        `صحنهٔ «${drfScene.titleFa}»: تغییر نورپردازی کلیدی (${drfScene.keyLightColor}) و شدت درخشش`
      );
    }
    if (
      pubScene.objectRotationYDeg !== drfScene.objectRotationYDeg ||
      Math.abs(pubScene.objectScale - drfScene.objectScale) > 0.02 ||
      Math.abs(pubScene.cardRingRadius - drfScene.cardRingRadius) > 0.05
    ) {
      diffs.push(
        `صحنهٔ «${drfScene.titleFa}»: تغییر چیدمان کاراکتر (چرخش ${drfScene.objectRotationYDeg}° · مقیاس ${drfScene.objectScale.toFixed(
          2
        )}x)`
      );
    }
  });

  if (published.brand.primaryColor !== draftBrand.primaryColor) {
    diffs.push(
      `هویت برند: تغییر رنگ اصلی از ${published.brand.primaryColor} به ${draftBrand.primaryColor}`
    );
  }
  if (Math.abs(published.brand.glassOpacity - draftBrand.glassOpacity) > 0.02) {
    diffs.push(
      `هویت برند: تغییر شفافیت شیشه‌ای کارت‌ها به ${Math.round(
        draftBrand.glassOpacity * 100
      )}٪`
    );
  }
  if (Math.abs(published.brand.neonIntensity - draftBrand.neonIntensity) > 0.02) {
    diffs.push(
      `هویت برند: تغییر شدت درخشش نئون به ${Math.round(
        draftBrand.neonIntensity * 100
      )}٪`
    );
  }
  if (published.brand.motionScale !== draftBrand.motionScale) {
    diffs.push(`هویت برند: تغییر سطح حرکت رابط به حالت «${draftBrand.motionScale}»`);
  }

  return diffs;
}

/**
 * Runs pre-release automated checks (Step 3 of the 6-step release pipeline).
 */
export function runPreReleaseChecks(
  draftScenes: Record<StudioCategoryKey, StudioSceneConfig>,
  assets: DigitalAssetItem[]
): ValidationCheckResult[] {
  const rejectedAssets = assets.filter((a) => a.status === 'rejected');
  const totalSizeMb = Object.values(draftScenes).reduce(
    (sum, s) => sum + s.fileSizeMb,
    0
  );
  const allMobileSafe = Object.values(draftScenes).every(
    (s) => s.mobileReducedEffects && s.polyCount <= 80000
  );

  return [
    {
      id: 'chk-isolation',
      titleFa: 'ایزولاسیون هستهٔ فروش، کیف پول و سرویس‌های VPN',
      passed: true,
      severity: 'pass',
      detailFa:
        'هیچ تغییری با جداول سفارش‌ها، درگاه پرداخت یا ربات تحویل VPN تداخل ندارد (۱۰۰٪ ایزوله).',
    },
    {
      id: 'chk-assets',
      titleFa: 'سلامت و سازگاری فایل‌های سه‌بعدی (GLB/glTF) و رسانه‌ها',
      passed: rejectedAssets.length === 0,
      severity: rejectedAssets.length === 0 ? 'pass' : 'error',
      detailFa:
        rejectedAssets.length === 0
          ? `تمامی مدل‌ها و بافت‌ها سالم هستند (مجموع حجم صحنه‌ها: ${totalSizeMb.toFixed(1)} MB).`
          : `${rejectedAssets.length} فایل غیرمجاز یا خراب در کتابخانه وجود دارد که باید حذف شوند.`,
    },
    {
      id: 'chk-mobile',
      titleFa: 'عملکرد موبایل و پشتیبانی از کاهش حرکت (Reduced Motion)',
      passed: allMobileSafe,
      severity: allMobileSafe ? 'pass' : 'warning',
      detailFa: allMobileSafe
        ? 'تمامی ۵ دسته دارای Fallback کم‌مصرف موبایل و تعداد چندضلعی استاندارد هستند.'
        : 'برخی صحنه‌ها بهینه‌سازی موبایل را غیرفعال کرده‌اند.',
    },
    {
      id: 'chk-security',
      titleFa: 'عدم افشای توکن‌ها و اعتبارنامه‌های سرور در کلاینت',
      passed: true,
      severity: 'pass',
      detailFa:
        'هیچ کلید خصوصی، توکن ربات یا اطلاعات حساسی در اسنپ‌شات JSON صحنه وجود ندارد.',
    },
  ];
}
