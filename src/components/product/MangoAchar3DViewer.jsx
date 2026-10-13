import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut,
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Layers, 
  Play, 
  Pause, 
  Repeat, 
  X, 
  Palette, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Eye,
  Plus,
  Compass,
  ArrowRight
} from 'lucide-react';
import { buildMangoAcharScene } from './threeJarBuilder';
import { createStudioEnvironment } from './studioEnvironment';
import { get3DSettings } from '../../utils/threeSettingsStorage';

export const MangoAchar3DViewer = ({ 
  onClose, 
  productName = 'Classic Mango Pickle', 
  fallbackImage = '/images/products/marusthali-mango-jar.jpg' 
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Configuration from persistent storage / admin
  const [settings, setSettings] = useState(get3DSettings);

  // View Modes: 'default' | 'inside' | 'explore' | 'animate' | 'closeup'
  const [viewMode, setViewMode] = useState('default');
  const [selectedIngredient, setSelectedIngredient] = useState(() => settings.ingredients[0]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [backgroundTheme, setBackgroundTheme] = useState(settings.defaultBackground || 'warm-studio');
  const [showBgMenu, setShowBgMenu] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInteractionHint, setShowInteractionHint] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Animation Sequence States (Stage 1 -> 2 -> 3 -> 4)
  const [isPlayingAnim, setIsPlayingAnim] = useState(false);
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const animTimeRef = useRef(0);
  const animRequestRef = useRef(null);

  // Three.js References
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    builder: null,
    envMap: null,
    targetCamPos: new THREE.Vector3(0, 0.35, 5.4),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    isTransitioningCam: false
  });

  // Active step calculation for Panel 4
  const currentStep = animProgress < 0.25 ? 1 : animProgress < 0.52 ? 2 : animProgress < 0.8 ? 3 : 4;

  // Listen for admin changes
  useEffect(() => {
    const handleSettingsUpdate = (e) => {
      if (e.detail) {
        setSettings(e.detail);
        if (e.detail.ingredients) {
          setSelectedIngredient(e.detail.ingredients[0]);
        }
      }
    };
    window.addEventListener('marusthali:3d-settings-changed', handleSettingsUpdate);
    return () => window.removeEventListener('marusthali:3d-settings-changed', handleSettingsUpdate);
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 5.4);

    // 3. WebGL Renderer with High-Precision Tone Mapping
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch (err) {
      console.error('WebGL initialization failed:', err);
      setLoadError('WebGL not supported or context could not be created.');
      setIsLoading(false);
      return;
    }

    // 4. Studio Environment Reflections (PMREMGenerator)
    let envMap;
    try {
      envMap = createStudioEnvironment(renderer, backgroundTheme);
      scene.environment = envMap;
    } catch (err) {
      console.warn('Could not generate HDR studio environment:', err);
    }

    // 5. OrbitControls with Silk-Smooth Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.4;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.12; // Prevent going beneath pedestal
    controls.autoRotate = false;
    controls.autoRotateSpeed = settings.autoRotateSpeed || 1.3;

    // 6. Build High-Fidelity Photorealistic Scene
    let builder;
    try {
      builder = buildMangoAcharScene();
      scene.add(builder.rootGroup);
      scene.add(builder.lightsGroup);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to construct 3D scene:', err);
      setLoadError('Failed to assemble 3D product geometry.');
      setIsLoading(false);
      return;
    }

    // Store references
    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      builder,
      envMap,
      targetCamPos: new THREE.Vector3(0, 0.35, 5.4),
      targetLookAt: new THREE.Vector3(0, 0, 0),
      isTransitioningCam: false
    };

    // Interaction state listeners
    const onInteractionStart = () => {
      setShowInteractionHint(false);
      setIsInteracting(true);
    };
    const onInteractionEnd = () => {
      setIsInteracting(false);
    };
    controls.addEventListener('start', onInteractionStart);
    controls.addEventListener('end', onInteractionEnd);

    // Animation & Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera transition lerp
      if (threeRef.current.isTransitioningCam) {
        camera.position.lerp(threeRef.current.targetCamPos, 0.07);
        controls.target.lerp(threeRef.current.targetLookAt, 0.07);
        if (camera.position.distanceTo(threeRef.current.targetCamPos) < 0.03) {
          threeRef.current.isTransitioningCam = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.removeEventListener('start', onInteractionStart);
      controls.removeEventListener('end', onInteractionEnd);
      resizeObserver.disconnect();
      if (envMap) envMap.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Studio Environment Map when Background Changes
  useEffect(() => {
    const { scene, renderer } = threeRef.current;
    if (!scene || !renderer) return;
    try {
      const newEnv = createStudioEnvironment(renderer, backgroundTheme);
      scene.environment = newEnv;
      if (threeRef.current.envMap) threeRef.current.envMap.dispose();
      threeRef.current.envMap = newEnv;
    } catch (e) {
      console.warn('Environment update failed:', e);
    }
  }, [backgroundTheme]);

  // Update AutoRotate State
  useEffect(() => {
    if (threeRef.current.controls) {
      threeRef.current.controls.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Camera & Scene Mode Viewpoint Transitions
  useEffect(() => {
    const { builder } = threeRef.current;
    if (!builder) return;

    if (viewMode === 'default') {
      builder.resetToDefault();
      threeRef.current.targetCamPos.set(0, 0.35, 5.4);
      threeRef.current.targetLookAt.set(0, 0, 0);
      threeRef.current.isTransitioningCam = true;
      setIsPlayingAnim(false);
      setIsZoomedIn(false);
    } else if (viewMode === 'inside') {
      builder.setLidOpen(1);
      builder.setHighlightVisible(false);
      // Angled downward camera to look inside open jar mouth
      threeRef.current.targetCamPos.set(0, 2.3, 4.3);
      threeRef.current.targetLookAt.set(0, 0.4, 0);
      threeRef.current.isTransitioningCam = true;
      setIsPlayingAnim(false);
      setIsZoomedIn(false);
    } else if (viewMode === 'explore') {
      builder.setLidOpen(0.85);
      builder.setHighlightVisible(true, new THREE.Vector3(0.35, 0.25, 0.35));
      // Close angled focus on the highlighted mango chunk
      threeRef.current.targetCamPos.set(0.7, 1.4, 3.8);
      threeRef.current.targetLookAt.set(0.1, 0.25, 0.1);
      threeRef.current.isTransitioningCam = true;
      setIsPlayingAnim(false);
      setIsZoomedIn(false);
    } else if (viewMode === 'animate') {
      threeRef.current.targetCamPos.set(0, 0.7, 5.2);
      threeRef.current.targetLookAt.set(0, 0.15, 0);
      threeRef.current.isTransitioningCam = true;
      setIsPlayingAnim(true);
      setAnimProgress(0);
      animTimeRef.current = 0;
      setIsZoomedIn(false);
    } else if (viewMode === 'closeup') {
      builder.setLidOpen(0);
      builder.setHighlightVisible(false);
      // Extreme close-up on the glistening achar texture and spices
      threeRef.current.targetCamPos.set(0.2, -0.15, 2.85);
      threeRef.current.targetLookAt.set(0, -0.15, 0);
      threeRef.current.isTransitioningCam = true;
      setIsZoomedIn(true);
    }
  }, [viewMode]);

  // Ingredient Animation Loop (Stage 1 -> 2 -> 3 -> 4)
  useEffect(() => {
    if (viewMode !== 'animate' || !isPlayingAnim) {
      if (animRequestRef.current) cancelAnimationFrame(animRequestRef.current);
      return;
    }

    const duration = 12000; // 12-second cycle
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      animTimeRef.current += delta;
      const progress = (animTimeRef.current % duration) / duration;
      setAnimProgress(progress);

      if (threeRef.current.builder) {
        threeRef.current.builder.setAnimationProgress(progress);
      }

      animRequestRef.current = requestAnimationFrame(loop);
    };

    animRequestRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRequestRef.current) cancelAnimationFrame(animRequestRef.current);
    };
  }, [viewMode, isPlayingAnim]);

  // Manual Scrubber Handler
  const handleScrub = (newProgress) => {
    setAnimProgress(newProgress);
    animTimeRef.current = newProgress * 12000;
    if (threeRef.current.builder) {
      threeRef.current.builder.setAnimationProgress(newProgress);
    }
  };

  // Reset Camera View
  const handleResetCamera = () => {
    if (!threeRef.current.controls || !threeRef.current.camera) return;
    setViewMode('default');
    setIsZoomedIn(false);
    setIsAutoRotating(false);
    threeRef.current.targetCamPos.set(0, 0.35, 5.4);
    threeRef.current.targetLookAt.set(0, 0, 0);
    threeRef.current.isTransitioningCam = true;
  };

  // Toggle Zoom / Close-up View
  const handleToggleZoom = () => {
    if (isZoomedIn) {
      setViewMode('default');
    } else {
      setViewMode('closeup');
    }
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => setIsFullscreen(false));
    }
  };

  // Background Theme Styling
  const bgStyle = useMemo(() => {
    switch (backgroundTheme) {
      case 'marble':
        return 'bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#D1D5DB]';
      case 'rustic':
        return 'bg-gradient-to-b from-[#2E1D13] via-[#1E120A] to-[#120A05] text-white';
      case 'warm-studio':
      default:
        return 'bg-gradient-to-b from-[#FDFBF7] via-[#F6EFE2] to-[#ECE1D0]';
    }
  }, [backgroundTheme]);

  // Fallback if WebGL fails
  if (loadError) {
    return (
      <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-border bg-brand-cream/60 flex flex-col items-center justify-center p-6 text-center">
        <img src={fallbackImage} alt={productName} className="w-48 h-48 object-cover rounded-2xl mb-4 shadow-md" />
        <h4 className="font-serif font-bold text-base text-brand-brown mb-1">3D View Unavailable</h4>
        <p className="text-xs text-brand-brownMuted max-w-sm mb-4">
          Your device does not support hardware WebGL acceleration. Showing high-resolution product photography.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-brand-brown text-white text-xs font-bold rounded-xl shadow-xs"
        >
          Return to Photo Gallery
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square max-h-[380px] sm:max-h-none rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-border shadow-warm transition-colors duration-500 select-none ${bgStyle} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen max-h-none aspect-auto' : ''
      }`}
    >
      {/* WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#FDFBF7]/92 backdrop-blur-xs flex flex-col items-center justify-center z-30">
          <div className="w-12 h-12 border-3 border-brand-yellow border-t-brand-brown rounded-full animate-spin mb-3" />
          <div className="font-serif font-bold text-sm text-brand-brown">Loading Photorealistic 3D Model...</div>
          <div className="text-[11px] text-brand-brownMuted mt-1">Generating studio reflections & glass refraction</div>
        </div>
      )}

      {/* Top Banner & Close Button */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold pointer-events-auto shadow-xs border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#FBBF24]" />
          <span>Interactive 3D Experience</span>
        </div>

        {/* Exit 3D / Back to Photos */}
        <button
          type="button"
          onClick={onClose}
          className="bg-black/55 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xs border border-white/10"
          title="Return to Product Photos"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Top Right Floating Action Badges (Panel 1, 3, 5) */}
      <div className="absolute top-12 right-3 flex flex-col gap-1.5 z-20">
        
        {/* Explore Ingredients */}
        {viewMode !== 'explore' && (
          <button
            type="button"
            onClick={() => setViewMode('explore')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-brand-brown border border-brand-border/80 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md text-xs font-extrabold transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Explore Ingredients</span>
            <span className="sm:hidden">Ingredients</span>
          </button>
        )}

        {/* Show Inside / Close Jar */}
        {viewMode === 'inside' ? (
          <button
            type="button"
            onClick={() => setViewMode('default')}
            className="flex items-center gap-1.5 bg-brand-brown text-white px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md text-xs font-extrabold transition-all hover:scale-102 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Close Jar</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode('inside')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-brand-brown border border-brand-border/80 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md text-xs font-extrabold transition-all hover:scale-102 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Show Inside</span>
            <span className="sm:hidden">Inside</span>
          </button>
        )}

        {/* Animate Ingredients (Available when inside or default) */}
        {viewMode === 'inside' && (
          <button
            type="button"
            onClick={() => setViewMode('animate')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md text-xs font-extrabold transition-all hover:scale-102 cursor-pointer animate-pulse"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Animate Ingredients</span>
          </button>
        )}

        {/* Change Background Studio */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowBgMenu(prev => !prev)}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-brand-brown border border-brand-border/80 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md text-xs font-extrabold transition-all hover:scale-102 cursor-pointer"
            title="Change Studio Lighting"
          >
            <Palette className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Change Background</span>
          </button>

          {showBgMenu && (
            <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-brand-border p-1.5 w-38 flex flex-col gap-1 z-30">
              {[
                { id: 'warm-studio', label: 'Warm Studio', dot: 'bg-[#F6EFE2]' },
                { id: 'marble', label: 'Marble Kitchen', dot: 'bg-[#E5E7EB]' },
                { id: 'rustic', label: 'Rustic Shelf', dot: 'bg-[#2E1D13]' }
              ].map(bg => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setBackgroundTheme(bg.id);
                    setShowBgMenu(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer ${
                    backgroundTheme === bg.id ? 'bg-amber-100/70 text-brand-brown' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full border border-gray-300 ${bg.dot}`} />
                  <span>{bg.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Rotation Helper Guidance Pill (Panel 1: "Drag to Rotate 360° View") */}
      {showInteractionHint && !isLoading && viewMode === 'default' && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center animate-bounce">
          <div className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            <Rotate3d className="w-3.5 h-3.5 text-amber-400" />
            <span>Drag to Rotate 360° View</span>
          </div>
        </div>
      )}

      {/* Drag & Pitch Guidance Labels (Panel 2: "Rotate & Zoom") */}
      {isInteracting && (
        <div className="absolute top-24 left-3 pointer-events-none z-10 flex flex-col gap-1.5 animate-fadeIn">
          <div className="bg-black/55 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
            ↔ Drag Left / Right: 360° Turntable
          </div>
          <div className="bg-black/55 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
            ↕ Drag Up / Down: Tilt Angle
          </div>
          <div className="bg-black/55 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
            🔍 Scroll / Pinch: Zoom Close-up
          </div>
        </div>
      )}

      {/* CIRCULAR "EXTREME CLOSE-UP" LOUPE INSET (Panels 2 & 6) */}
      {viewMode === 'default' && !isLoading && (
        <div 
          onClick={handleToggleZoom}
          className="absolute bottom-14 right-3 group z-20 cursor-pointer pointer-events-auto"
          title="Click to view Extreme Close-Up texture"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl group-hover:scale-105 transition-transform bg-white">
            <img 
              src="/images/products/mango-jar-spiced.jpg" 
              alt="Extreme close-up texture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-white">
              <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </div>
          </div>
          <div className="text-[10px] font-extrabold text-brand-brown bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs mt-1 text-center border border-brand-border">
            Close-Up
          </div>
        </div>
      )}

      {/* Close-Up Active Banner (Panel 6) */}
      {viewMode === 'closeup' && (
        <div className="absolute top-12 left-3 bg-amber-500/90 backdrop-blur-md text-brand-brown text-xs font-black px-3 py-1.5 rounded-xl shadow-md border border-amber-300 flex items-center gap-1.5 z-20">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Extreme Close-up Texture View</span>
        </div>
      )}

      {/* LAYER INSPECTION MARKERS (Panel 3: Show Inside View) */}
      {viewMode === 'inside' && (
        <div className="absolute right-3 top-36 flex flex-col gap-2 z-20 max-w-[210px] pointer-events-auto">
          {settings.layers?.map((layer) => (
            <div 
              key={layer.id}
              onClick={() => setSelectedLayer(selectedLayer?.id === layer.id ? null : layer)}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-xl backdrop-blur-md cursor-pointer transition-all shadow-md border ${
                selectedLayer?.id === layer.id
                  ? 'bg-brand-brown text-white border-brand-yellow scale-105'
                  : 'bg-white/95 text-brand-brown border-brand-border/80 hover:bg-white'
              }`}
            >
              <span 
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs border border-white" 
                style={{ backgroundColor: layer.color }}
              />
              <span className="text-[11px] font-black truncate">{layer.name}</span>
            </div>
          ))}

          {/* Layer Popover Detail Card */}
          {selectedLayer && (
            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-brand-border shadow-2xl text-xs text-brand-brown space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between font-bold text-amber-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedLayer.color }} />
                  <span>{selectedLayer.name}</span>
                </span>
                <button onClick={() => setSelectedLayer(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <p className="text-[11px] text-brand-brownMuted leading-relaxed">{selectedLayer.desc}</p>
            </div>
          )}
        </div>
      )}

      {/* ANIMATE INGREDIENTS OVERLAY (Panel 4) */}
      {viewMode === 'animate' && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-3">
          
          {/* Top 4-Stage Stepper Header */}
          <div className="pointer-events-auto max-w-md mx-auto w-full bg-black/65 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-xl">
            <div className="grid grid-cols-4 gap-1 text-center">
              {[
                { step: 1, name: 'Raw Mangoes' },
                { step: 2, name: 'Spices' },
                { step: 3, name: 'Mustard Oil' },
                { step: 4, name: 'Mix & Seal' }
              ].map(item => (
                <div 
                  key={item.step} 
                  className={`p-1.5 rounded-xl transition-all ${
                    currentStep === item.step 
                      ? 'bg-brand-yellow text-brand-brown font-extrabold shadow-md scale-102' 
                      : currentStep > item.step 
                      ? 'bg-white/20 text-white font-semibold' 
                      : 'bg-white/10 text-white/45'
                  }`}
                >
                  <div className="text-[9px] uppercase font-bold tracking-tight">Step {item.step}</div>
                  <div className="text-[11px] truncate font-bold">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Floating Ingredient Photo Cards (Matching Mockup Panel 4!) */}
          <div className="absolute top-20 right-3 flex flex-col gap-2 z-20 max-w-[150px] pointer-events-auto">
            {[
              { id: 3, title: 'Pure Mustard Oil', img: '/images/process/step-3-spices-oil.jpg' },
              { id: 2, title: 'Rai & Methi', img: '/images/products/mango-raw-kairi.jpg' },
              { id: 2, title: 'Red Chilli', img: '/images/products/card-redmirch.jpg' },
              { id: 1, title: 'Raw Mangoes', img: '/images/products/mango-fresh-harvest.jpg' }
            ].map((card, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 p-1.5 rounded-xl backdrop-blur-md border shadow-md transition-all ${
                  (currentStep === card.id)
                    ? 'bg-brand-yellow text-brand-brown border-amber-300 font-extrabold scale-105'
                    : 'bg-white/85 text-brand-brown border-white/40 opacity-80'
                }`}
              >
                <img src={card.img} alt={card.title} className="w-8 h-8 rounded-lg object-cover shrink-0 border border-white" />
                <span className="text-[10px] font-bold truncate">{card.title}</span>
              </div>
            ))}
          </div>

          {/* Bottom Scrubber & Play/Pause Controls Bar (Matching Mockup Panel 4!) */}
          <div className="pointer-events-auto max-w-md mx-auto w-full bg-black/75 backdrop-blur-md rounded-2xl p-2.5 flex items-center gap-3 border border-white/20 shadow-2xl mb-12 sm:mb-10">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlayingAnim(prev => !prev)}
              className="w-8 h-8 rounded-full bg-brand-yellow text-brand-brown flex items-center justify-center font-bold hover:scale-105 transition-transform cursor-pointer shrink-0"
            >
              {isPlayingAnim ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Scrubber Progress Bar */}
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={animProgress}
                onChange={(e) => handleScrub(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-white/20 rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-white/70 font-mono">
                <span>0:00</span>
                <span>Stage {currentStep} of 4: {
                  currentStep === 1 ? 'Raw Mangoes' :
                  currentStep === 2 ? 'Rai & Methi Spices' :
                  currentStep === 3 ? 'Mustard Oil Pour' : 'Mix & Seal'
                }</span>
                <span>0:12</span>
              </div>
            </div>

            {/* Replay */}
            <button
              type="button"
              onClick={() => {
                handleScrub(0);
                setIsPlayingAnim(true);
              }}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Replay animation"
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Exit Animation */}
            <button
              type="button"
              onClick={() => setViewMode('default')}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Exit 3D Animation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* EXPLORE INGREDIENTS INTERACTIVE CARD & DOCK (Panel 5) */}
      {viewMode === 'explore' && selectedIngredient && (
        <div className="absolute inset-x-3 top-14 z-20 pointer-events-auto">
          {/* Floating Ingredient Detail Card with Photo & Checkmarks */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-brand-border shadow-2xl max-w-sm ml-auto space-y-2 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <img 
                  src={selectedIngredient.image} 
                  alt={selectedIngredient.name} 
                  className="w-12 h-12 rounded-xl object-cover border border-brand-border shrink-0 shadow-xs" 
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-brown leading-tight">
                    {selectedIngredient.name}
                  </h4>
                  <span className="text-[10px] text-amber-700 font-bold block">
                    {selectedIngredient.hindiName}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setViewMode('default')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-brand-brown leading-snug">
              {selectedIngredient.subtitle}
            </p>

            {/* Role in recipe */}
            <div className="bg-[#FAF6EE] p-2 rounded-xl border border-[#E8DDCD] text-[11px] text-brand-brown">
              <strong className="text-amber-800">Role in pickle: </strong>
              {selectedIngredient.role}
            </div>

            {/* Verified Bullet Highlights with Green Checks */}
            <div className="space-y-1 pt-1">
              {selectedIngredient.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Roundel Carousel Dock (Matching Mockup Panel 5!) */}
          <div className="fixed sm:absolute bottom-16 sm:bottom-14 inset-x-2 flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-brand-border flex items-center gap-1.5">
              {settings.ingredients.map(ing => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    selectedIngredient.id === ing.id
                      ? 'bg-brand-brown text-white shadow-md scale-105 ring-2 ring-amber-400/50'
                      : 'hover:bg-amber-50 text-brand-brown'
                  }`}
                >
                  <span className="text-base">{ing.icon}</span>
                  <span className="hidden sm:inline">{ing.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM CONTROL TOOLBAR (Panels 1, 2, 3, 6) */}
      <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-center z-20 pointer-events-none">
        <div className="bg-black/65 backdrop-blur-md text-white rounded-full px-3 py-1.5 flex items-center gap-3 sm:gap-5 shadow-xl border border-white/20 pointer-events-auto">
          
          {/* 360° Rotate Button */}
          <button
            type="button"
            onClick={() => setIsAutoRotating(prev => !prev)}
            className={`flex items-center gap-1 text-[11px] font-bold hover:text-amber-400 transition-colors cursor-pointer ${
              isAutoRotating ? 'text-amber-400' : 'text-white'
            }`}
            title="Toggle 360 Turntable Rotation"
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>360° {isAutoRotating ? 'On' : 'Rotate'}</span>
          </button>

          {/* Zoom Button */}
          <button
            type="button"
            onClick={handleToggleZoom}
            className={`flex items-center gap-1 text-[11px] font-bold hover:text-amber-400 transition-colors cursor-pointer ${
              isZoomedIn ? 'text-amber-400' : 'text-white'
            }`}
            title="Inspect Extreme Close-Up Texture"
          >
            {isZoomedIn ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span>{isZoomedIn ? 'Standard' : 'Close-up'}</span>
          </button>

          {/* Reset Camera Button */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="flex items-center gap-1 text-[11px] font-bold hover:text-amber-400 transition-colors cursor-pointer"
            title="Reset to default front view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Full Screen Button */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="flex items-center gap-1 text-[11px] font-bold hover:text-amber-400 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>

        </div>
      </div>

    </div>
  );
};
