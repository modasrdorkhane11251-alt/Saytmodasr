import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  BrandIdentityConfig,
  ResponsiveDeviceFrame,
  StudioCategoryKey,
  StudioSceneConfig,
} from '../utils/modasrStudioEngine';

interface StudioThreeViewportProps {
  sceneConfig: StudioSceneConfig;
  brandConfig: BrandIdentityConfig;
  deviceFrame: ResponsiveDeviceFrame;
  timelineSec: number;
  isPlaying: boolean;
  onSelectCardIndex: (idx: number) => void;
  onTriggerHandRaise: () => void;
  compactMode?: boolean;
}

/**
 * Generates a crisp procedural CanvasTexture for each 3D floating product card.
 */
function createProductCardTexture(
  title: string,
  index: number,
  accentHex: string,
  isSelected: boolean
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark obsidian card base
    ctx.fillStyle = isSelected ? '#0f1f2e' : '#090f1a';
    ctx.fillRect(0, 0, 512, 320);

    // Subtle tech grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let x = 32; x < 512; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 320);
      ctx.stroke();
    }
    for (let y = 32; y < 320; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Glowing border
    ctx.strokeStyle = isSelected ? '#ffffff' : accentHex;
    ctx.lineWidth = isSelected ? 10 : 6;
    ctx.strokeRect(8, 8, 496, 304);

    // Top accent bar
    ctx.fillStyle = accentHex;
    ctx.fillRect(28, 28, 120, 10);

    // Card slot index
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = 'bold 22px Vazirmatn, sans-serif';
    ctx.fillText(`SLOT 0${index + 1} · MODASR`, 28, 72);

    // Product Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px Vazirmatn, sans-serif';
    ctx.fillText(title.slice(0, 22), 28, 148);

    // Subtitle / Status
    ctx.fillStyle = accentHex;
    ctx.font = 'bold 24px Vazirmatn, sans-serif';
    ctx.fillText(
      isSelected ? '● ACTIVE SELECTION' : '○ CLICK TO INSPECT',
      28,
      215
    );

    // Bottom bar
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(28, 252, 456, 34);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 20px Vazirmatn, sans-serif';
    ctx.fillText('INSTANT DELIVERY · WALLEX SYNC', 42, 276);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function StudioThreeViewport({
  sceneConfig,
  brandConfig,
  deviceFrame,
  timelineSec,
  isPlaying,
  onSelectCardIndex,
  onTriggerHandRaise,
  compactMode = false,
}: StudioThreeViewportProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Store latest props in ref so WebGL loop reads live state without re-creating canvas
  const liveRef = useRef({
    sceneConfig,
    brandConfig,
    deviceFrame,
    timelineSec,
    isPlaying,
    onSelectCardIndex,
  });

  useEffect(() => {
    liveRef.current = {
      sceneConfig,
      brandConfig,
      deviceFrame,
      timelineSec,
      isPlaying,
      onSelectCardIndex,
    };
  }, [
    sceneConfig,
    brandConfig,
    deviceFrame,
    timelineSec,
    isPlaying,
    onSelectCardIndex,
  ]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 260);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(liveRef.current.sceneConfig.fogColor);
    scene.fog = new THREE.FogExp2(
      liveRef.current.sceneConfig.fogColor,
      liveRef.current.sceneConfig.fogDensity
    );

    const camera = new THREE.PerspectiveCamera(
      liveRef.current.sceneConfig.cameraFov,
      width / height,
      0.1,
      100
    );

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    // Check software WebGL renderer
    const gl = renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|SoftPipe/i.test(rendererStr);

    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio PBR Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;

    // 3-Point Studio Lighting (Key + Hemisphere Fill + Rim)
    const hemiLight = new THREE.HemisphereLight(
      liveRef.current.sceneConfig.fillLightColor,
      '#080d1a',
      liveRef.current.sceneConfig.fillLightIntensity
    );
    hemiLight.position.set(0, 8, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(
      liveRef.current.sceneConfig.keyLightColor,
      liveRef.current.sceneConfig.keyLightIntensity
    );
    keyLight.position.set(3.5, 5.5, 4.0);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(
      liveRef.current.sceneConfig.rimLightColor,
      liveRef.current.sceneConfig.rimLightIntensity * 2.2,
      14
    );
    rimLight.position.set(-3.0, 3.2, -2.8);
    scene.add(rimLight);

    // Ground Pedestal & Grid Platform (Disjoint Y offsets >= 0.02 to prevent Z-fighting)
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const floorGeo = new THREE.CylinderGeometry(3.6, 3.9, 0.16, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0b1322,
      roughness: 0.65,
      metalness: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.08;
    stageGroup.add(floorMesh);

    const ringGeo = new THREE.RingGeometry(2.05, 2.18, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: liveRef.current.sceneConfig.keyLightColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.025;
    stageGroup.add(ringMesh);

    const outerGrid = new THREE.GridHelper(14, 28, 0x1e293b, 0x0f172a);
    outerGrid.position.y = -0.15;
    scene.add(outerGrid);

    // =========================================================================
    // COMPOSITE 3D CHARACTER & CATEGORY RIG (8-11 Distinct Parts per Category)
    // =========================================================================
    const actorRoot = new THREE.Group();
    scene.add(actorRoot);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.32,
      metalness: 0.72,
    });
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.22,
      metalness: 0.45,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: liveRef.current.sceneConfig.keyLightColor,
      emissive: liveRef.current.sceneConfig.keyLightColor,
      emissiveIntensity: 0.85,
      roughness: 0.18,
      metalness: 0.6,
    });
    const secondaryMat = new THREE.MeshStandardMaterial({
      color: liveRef.current.sceneConfig.rimLightColor,
      emissive: liveRef.current.sceneConfig.rimLightColor,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.5,
    });

    // Core Pedestal Column
    const baseCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.58, 0.42, 24),
      bodyMat
    );
    baseCore.position.y = 0.21;
    actorRoot.add(baseCore);

    // Torso (Primary Silhouette)
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = 0.95;
    actorRoot.add(torsoGroup);

    const torsoMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.44, 0.32, 0.92, 16),
      armorMat
    );
    torsoGroup.add(torsoMesh);

    // Glowing Chest Core Reactor
    const chestCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.19, 1),
      accentMat
    );
    chestCore.position.set(0, 0.08, 0.38);
    torsoGroup.add(chestCore);

    // Shoulder Pauldrons
    const leftShoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      bodyMat
    );
    leftShoulder.position.set(-0.54, 0.32, 0);
    torsoGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      bodyMat
    );
    rightShoulder.position.set(0.54, 0.32, 0);
    torsoGroup.add(rightShoulder);

    // Head + Glowing Visor (Turns toward selected product card!)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.72, 0);
    torsoGroup.add(headGroup);

    const helmetSkull = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 24, 24),
      armorMat
    );
    helmetSkull.scale.set(1, 1.08, 1.02);
    headGroup.add(helmetSkull);

    const visorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.16, 0.28),
      accentMat
    );
    visorMesh.position.set(0, 0.02, 0.2);
    headGroup.add(visorMesh);

    // Antenna / Crown Crest
    const crestMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.28, 8),
      secondaryMat
    );
    crestMesh.position.set(0, 0.42, 0);
    headGroup.add(crestMesh);

    // Left Arm (Stabilizer)
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.56, 0.28, 0);
    torsoGroup.add(leftArmPivot);

    const leftForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.08, 0.62, 12),
      armorMat
    );
    leftForearm.position.set(-0.08, -0.3, 0.1);
    leftForearm.rotation.z = 0.22;
    leftArmPivot.add(leftForearm);

    // Right Arm & Hand (Articulated Summoner Arm that raises to reveal product cards!)
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.56, 0.28, 0);
    torsoGroup.add(rightArmPivot);

    const rightForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.09, 0.65, 12),
      armorMat
    );
    rightForearm.position.set(0.1, -0.28, 0.18);
    rightArmPivot.add(rightForearm);

    const rightHandEmitter = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.15, 1),
      accentMat
    );
    rightHandEmitter.position.set(0.15, -0.62, 0.28);
    rightArmPivot.add(rightHandEmitter);

    // Category-Specific Orbital Ring / Shield / Portal Attachment
    const categoryPropGroup = new THREE.Group();
    categoryPropGroup.position.set(0, 1.25, 0);
    actorRoot.add(categoryPropGroup);

    const orbitalRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.025, 12, 64),
      accentMat
    );
    const orbitalRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.42, 0.018, 12, 64),
      secondaryMat
    );
    orbitalRing2.rotation.x = Math.PI / 3;
    categoryPropGroup.add(orbitalRing1);
    categoryPropGroup.add(orbitalRing2);

    // VPN Geodesic Shield Wireframe (Visible prominently in VPN or AI mode)
    const shieldWireMat = new THREE.MeshBasicMaterial({
      color: liveRef.current.sceneConfig.keyLightColor,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const shieldDome = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.65, 1),
      shieldWireMat
    );
    categoryPropGroup.add(shieldDome);

    // =========================================================================
    // 4 FLOATING HOLOGRAPHIC 3D PRODUCT CARDS (Summoned by Character's Hand)
    // =========================================================================
    const cardsGroup = new THREE.Group();
    scene.add(cardsGroup);

    const cardMeshes: THREE.Mesh[] = [];
    const cardGeo = new THREE.BoxGeometry(1.25, 0.78, 0.04);

    let lastSignature = '';

    const rebuildCardTextures = () => {
      const cfg = liveRef.current.sceneConfig;
      const sig = `${cfg.categoryKey}|${cfg.keyLightColor}|${cfg.selectedCardIndex}|${cfg.featuredProductTitles.join(',')}`;
      if (sig === lastSignature) return;
      lastSignature = sig;

      cardMeshes.forEach((mesh, idx) => {
        const oldMat = mesh.material as THREE.MeshStandardMaterial;
        if (oldMat.map) oldMat.map.dispose();
        const tex = createProductCardTexture(
          cfg.featuredProductTitles[idx] || `Product ${idx + 1}`,
          idx,
          cfg.keyLightColor,
          cfg.selectedCardIndex === idx
        );
        oldMat.map = tex;
        oldMat.emissive = new THREE.Color(
          cfg.selectedCardIndex === idx ? cfg.keyLightColor : '#000000'
        );
        oldMat.emissiveIntensity = cfg.selectedCardIndex === idx ? 0.28 : 0.05;
        oldMat.needsUpdate = true;
      });
    };

    for (let i = 0; i < 4; i++) {
      const tex = createProductCardTexture(
        liveRef.current.sceneConfig.featuredProductTitles[i],
        i,
        liveRef.current.sceneConfig.keyLightColor,
        liveRef.current.sceneConfig.selectedCardIndex === i
      );
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.15,
      });
      const cardMesh = new THREE.Mesh(cardGeo, mat);
      cardMesh.userData = { cardIndex: i };
      cardsGroup.add(cardMesh);
      cardMeshes.push(cardMesh);
    }

    // Raycasting for clicking 3D product cards directly inside the viewport
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    const handlePointerDown = (ev: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerNdc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(cardMeshes, false);
      if (hits.length > 0) {
        const idx = hits[0].object.userData?.cardIndex;
        if (typeof idx === 'number') {
          liveRef.current.onSelectCardIndex(idx);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 300);
      const h = Math.max(container.clientHeight, 240);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop (Zero-allocation scratch state)
    const clock = new THREE.Clock();
    let rafId = 0;
    let accumTime = 0;

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      const { sceneConfig: cfg, brandConfig: brand, isPlaying: playing, timelineSec: tSec } =
        liveRef.current;

      const motionFactor =
        cfg.mobileReducedEffects && liveRef.current.deviceFrame === 'mobile'
          ? 0.45
          : brand.motionScale === 'reduced'
            ? 0.25
            : 1.0;

      if (playing) {
        accumTime += dt * cfg.animationSpeed * motionFactor;
      } else {
        accumTime = tSec;
      }

      // Sync colors & lighting dynamically
      scene.background = new THREE.Color(cfg.fogColor);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.set(cfg.fogColor);
        scene.fog.density = cfg.fogDensity;
      }
      keyLight.color.set(cfg.keyLightColor);
      keyLight.intensity = cfg.keyLightIntensity;
      hemiLight.color.set(cfg.fillLightColor);
      hemiLight.intensity = cfg.fillLightIntensity;
      rimLight.color.set(cfg.rimLightColor);
      rimLight.intensity = cfg.rimLightIntensity * 2.2;
      accentMat.color.set(cfg.keyLightColor);
      accentMat.emissive.set(cfg.keyLightColor);
      accentMat.emissiveIntensity = 0.5 + cfg.bloomIntensity * 0.7;
      secondaryMat.color.set(cfg.rimLightColor);
      secondaryMat.emissive.set(cfg.rimLightColor);
      ringMat.color.set(cfg.keyLightColor);
      shieldWireMat.color.set(cfg.keyLightColor);
      shieldDome.visible =
        cfg.categoryKey === 'vpn' ||
        cfg.categoryKey === 'ai' ||
        cfg.categoryKey === 'gaming';

      rebuildCardTextures();

      // Update Camera
      if (Math.abs(camera.fov - cfg.cameraFov) > 0.1) {
        camera.fov = cfg.cameraFov;
        camera.updateProjectionMatrix();
      }
      const orbitAngle = accumTime * cfg.autoOrbitSpeed;
      const baseCamX = cfg.cameraPos[0];
      const baseCamY = cfg.cameraPos[1];
      const baseCamZ = cfg.cameraPos[2];
      camera.position.set(
        baseCamX + Math.sin(orbitAngle) * 0.45,
        baseCamY + Math.sin(accumTime * 1.4) * 0.06,
        baseCamZ + (Math.cos(orbitAngle) - 1) * 0.25
      );
      camera.lookAt(0, cfg.cameraTargetY, 0);

      // Update Actor Transform
      actorRoot.position.set(
        cfg.objectPosition[0],
        cfg.objectPosition[1],
        cfg.objectPosition[2]
      );
      actorRoot.rotation.y =
        THREE.MathUtils.degToRad(cfg.objectRotationYDeg) +
        Math.sin(accumTime * 0.9) * 0.08;
      actorRoot.scale.setScalar(cfg.objectScale);

      // Articulated Right Arm & Hand Raise (Summons Holographic Product Cards!)
      const effectiveRaise =
        cfg.activeAction === 'idle'
          ? 0.2 + Math.sin(accumTime * 2.0) * 0.08
          : cfg.handRaiseProgress;
      rightArmPivot.rotation.x = -effectiveRaise * 1.45;
      rightArmPivot.rotation.z = -effectiveRaise * 0.35;
      rightHandEmitter.rotation.y = accumTime * 3.2;

      // Head looks toward the selected product card
      const selectedCardAngle =
        ((cfg.selectedCardIndex - 1.5) / 1.5) * 0.55;
      headGroup.rotation.y = THREE.MathUtils.lerp(
        headGroup.rotation.y,
        selectedCardAngle,
        0.12
      );
      headGroup.position.y = 0.72 + Math.sin(accumTime * 2.2) * 0.03;

      // Orbital rings rotation
      orbitalRing1.rotation.z = accumTime * 0.7;
      orbitalRing1.rotation.x = Math.sin(accumTime * 0.5) * 0.35;
      orbitalRing2.rotation.y = -accumTime * 0.95;
      shieldDome.rotation.y = accumTime * 0.35;

      // Position & Animate the 4 Floating Holographic Product Cards
      const cardRevealFactor = Math.max(0.08, effectiveRaise);
      const radius = cfg.cardRingRadius;
      cardMeshes.forEach((mesh, idx) => {
        const spread = (idx - 1.5) * 0.62;
        const isSelected = cfg.selectedCardIndex === idx;
        const targetX = Math.sin(spread) * radius;
        const targetZ = Math.cos(spread) * radius * 0.55 + (isSelected ? 0.55 : 0);
        const targetY =
          0.55 +
          cardRevealFactor * 0.95 +
          (isSelected ? 0.22 : 0) +
          Math.sin(accumTime * 2.1 + idx * 1.1) * 0.06;

        mesh.position.set(targetX, targetY, targetZ);
        mesh.lookAt(camera.position.x * 0.4, targetY, camera.position.z);

        const targetScale =
          cardRevealFactor * (isSelected ? 1.16 : 0.9) * (effectiveRaise > 0.15 ? 1 : 0.01);
        mesh.scale.setScalar(targetScale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cardMeshes.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
      cardGeo.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  // Calculate Responsive Device Frame Dimensions
  const frameSizeClasses =
    deviceFrame === 'mobile'
      ? 'max-w-[380px] h-[540px]'
      : deviceFrame === 'tablet'
        ? 'max-w-[740px] h-[540px]'
        : compactMode
          ? 'w-full h-[380px]'
          : 'w-full h-[540px]';

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        data-testid="studio-three-viewport-frame"
        data-device-frame={deviceFrame}
        data-category={sceneConfig.categoryKey}
        className={`relative w-full ${frameSizeClasses} rounded-2xl overflow-hidden border border-slate-700/80 bg-[#050914] shadow-2xl transition-all duration-300`}
      >
        {/* Dedicated WebGL Mount Container */}
        <div
          ref={mountRef}
          data-testid="studio-three-canvas-mount"
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Top-Right Telemetry & Model Status Overlay (Solid background per WebGL HUD rule) */}
        <div className="absolute top-3 right-3 z-10 flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg bg-[#090f1d] border border-slate-700/80 text-[11px] text-slate-200 pointer-events-none">
          <span className="font-bold text-teal-300">{sceneConfig.titleFa}</span>
          <span aria-hidden="true">·</span>
          <span className="font-vazir tabular-nums">{sceneConfig.modelFormat}</span>
          <span aria-hidden="true">·</span>
          <span className="font-vazir tabular-nums">
            {sceneConfig.polyCount.toLocaleString('en-US')} Polys
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-vazir tabular-nums">
            {sceneConfig.fileSizeMb.toFixed(1)} MB
          </span>
        </div>

        {/* Top-Left Device Frame Indicator */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#090f1d] border border-slate-700/80 text-[11px] text-slate-300 pointer-events-none font-vazir tabular-nums">
          <span>
            {deviceFrame === 'desktop'
              ? '1440×900 Desktop'
              : deviceFrame === 'tablet'
                ? '768×1024 Tablet'
                : '375×812 Mobile'}
          </span>
          <span aria-hidden="true">·</span>
          <span>FOV {sceneConfig.cameraFov}°</span>
        </div>

        {/* Bottom Interactive Scene Action Strip (Test Hand-Raise & Product Card Selection directly) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/90">
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="studio-trigger-hand-raise-btn"
              onClick={onTriggerHandRaise}
              className="px-3 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              اجرای حرکت دست و احضار کارت‌ها ({Math.round(sceneConfig.handRaiseProgress * 100)}٪)
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {sceneConfig.featuredProductTitles.map((prodTitle, idx) => {
              const isSel = sceneConfig.selectedCardIndex === idx;
              return (
                <button
                  key={prodTitle}
                  type="button"
                  data-testid={`studio-card-select-${idx}`}
                  onClick={() => onSelectCardIndex(idx)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSel
                      ? 'bg-cyan-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {idx + 1}. {prodTitle}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
