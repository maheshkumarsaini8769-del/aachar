import React, { useState, useRef, useEffect } from 'react';
import { 
  Pause, 
  Play, 
  Volume2, 
  VolumeX
} from 'lucide-react';

export const HeroSection = ({ onNavigate }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const videoRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchCurrentX = useRef(null);
  const mouseStartX = useRef(null);
  const isMouseDragging = useRef(false);
  const didSwipeRef = useRef(false);
  const touchDidMoveRef = useRef(false);
  const wheelLocked = useRef(false);
  const wheelDeltaAccum = useRef(0);

  // 4 Curated Slides: 3 Product Slides (tap -> all-products) + 1 Combo Pack Slide (tap -> combo-builder)
  const slides = [
    {
      id: 'slide-0',
      tag: 'MARUSTHALI ACHAR • SIKAR RAJASTHAN',
      title1: 'Authentic Homemade Taste,',
      title2: 'Delivered to Every Doorstep',
      desc: 'Traditional Rajasthani homemade pickles, prepared with stone-ground spices, pure mustard oil, and authentic family warmth.',
      primaryBtn: 'Shop Pickles →',
      primaryTarget: 'all-products',
      secondaryBtn: 'Explore Combos',
      secondaryTarget: 'combo-builder',
      imageTapTarget: 'all-products',
      imageTapLabel: 'Tap Image to View All Products →',
      bgImage: '/images/banners/hero-master-banner.jpg',
      badge1: '100% Homemade',
      badge2: 'No Preservatives',
      badge3: 'Made by Rural Women'
    },
    {
      id: 'slide-1',
      tag: '100% HOMEMADE & PURE',
      title1: 'Cherished Family Recipes,',
      title2: 'Straight from Ceramic Barnis',
      desc: 'Pure cold-pressed mustard oil, sun-ripened green mangoes, and cherished traditional recipes.',
      primaryBtn: 'Explore All Pickles →',
      primaryTarget: 'all-products',
      secondaryBtn: 'Explore Combos',
      secondaryTarget: 'combo-builder',
      imageTapTarget: 'all-products',
      imageTapLabel: 'Tap Image to View All Products →',
      bgImage: '/images/banners/hero-slide-barni.jpg',
      badge1: 'Sun-Cured Ceramic Jar',
      badge2: 'Zero Chemicals',
      badge3: 'Village Heritage'
    },
    {
      id: 'slide-2',
      tag: 'AUTHENTIC SPICES & SOLAR CURED',
      title1: 'Stone-Ground Spices,',
      title2: 'Pure Mustard Oil',
      desc: 'Zero chemical preservatives, 21-day solar-cured pickles in authentic Banarasi and Ramkela recipes.',
      primaryBtn: 'Shop All Pickles →',
      primaryTarget: 'all-products',
      secondaryBtn: 'Explore Combos',
      secondaryTarget: 'combo-builder',
      imageTapTarget: 'all-products',
      imageTapLabel: 'Tap Image to View All Products →',
      bgImage: '/images/banners/hero-slide-spices.jpg',
      badge1: 'Stone-Ground Spices',
      badge2: 'Cold-Pressed Mustard Oil',
      badge3: '21-Day Solar Aged'
    },
    {
      id: 'slide-3',
      tag: 'SPECIAL COMBO PACK OFFER',
      title1: 'Build Your Own Achar Combo,',
      title2: 'Pick 2, 3 or 4 Jars & Save 23%',
      desc: 'Choose your favorite Marusthali Achar glass jar boxes in a custom Combo Pack with free wooden spoon & shockproof packing.',
      primaryBtn: 'Build Your Combo Pack →',
      primaryTarget: 'combo-builder',
      secondaryBtn: 'View All Products',
      secondaryTarget: 'all-products',
      imageTapTarget: 'combo-builder',
      imageTapLabel: '🎁 Combo Pack Image • Tap to Open Combo Page →',
      isComboSlide: true,
      bgImage: '/images/products/combo-2pack-duo.jpg',
      badge1: 'Custom 2/3/4 Jar Box',
      badge2: 'Save Up to 23%',
      badge3: 'Free Wooden Spoon'
    }
  ];

  const currentSlide = slides[activeSlide];

  // Stop video immediately if it is playing
  const stopVideoIfPlaying = () => {
    if (isPlayingVideo) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlayingVideo(false);
    }
  };

  const handleNextSlide = () => {
    stopVideoIfPlaying();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    stopVideoIfPlaying();
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSelectDot = (idx) => {
    stopVideoIfPlaying();
    setActiveSlide(idx);
  };

  // Auto-scroll slides every 4.5 seconds (runs continuously unless ambient video is playing or user is actively swiping)
  useEffect(() => {
    if (isPlayingVideo || isSwiping) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlayingVideo, isSwiping, slides.length, activeSlide]);

  // Laptop Touchpad & Horizontal Gesture Support
  const handleWheel = (e) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 4) {
      if (wheelLocked.current) return;
      wheelDeltaAccum.current += delta;

      if (Math.abs(wheelDeltaAccum.current) > 20) {
        if (wheelDeltaAccum.current > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
        wheelDeltaAccum.current = 0;
        wheelLocked.current = true;
        setTimeout(() => {
          wheelLocked.current = false;
        }, 500);
      }
    }
  };

  // Mobile 1-Finger Touch Swipe Support (with live finger-following physics)
  const handleTouchStart = (e) => {
    if (e.targetTouches.length === 1) {
      touchStartX.current = e.targetTouches[0].clientX;
      touchStartY.current = e.targetTouches[0].clientY;
      touchCurrentX.current = e.targetTouches[0].clientX;
      didSwipeRef.current = false;
      touchDidMoveRef.current = false;
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isSwiping || touchStartX.current === null || e.targetTouches.length !== 1) return;
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - (touchStartY.current || 0);

    // If finger moved more than 6px in ANY direction (scroll or swipe), mark moved so click won't fire
    if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
      touchDidMoveRef.current = true;
    }

    // Only track horizontal 1-finger swipe for carousel drag
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      didSwipeRef.current = true;
      touchCurrentX.current = currentX;
      setDragOffset(Math.max(-120, Math.min(120, diffX * 0.45)));
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const diffX = touchStartX.current - touchCurrentX.current;
      if (Math.abs(diffX) > 35) {
        didSwipeRef.current = true;
        touchDidMoveRef.current = true;
        if (diffX > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    setDragOffset(0);
    setIsSwiping(false);
    setTimeout(() => {
      didSwipeRef.current = false;
      touchDidMoveRef.current = false;
    }, 250);
  };

  // Desktop Mouse Drag Support
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      mouseStartX.current = e.clientX;
      isMouseDragging.current = true;
      didSwipeRef.current = false;
      touchDidMoveRef.current = false;
      setIsSwiping(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isMouseDragging.current || mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;
    if (Math.abs(diffX) > 6) {
      touchDidMoveRef.current = true;
    }
    if (Math.abs(diffX) > 10) {
      didSwipeRef.current = true;
    }
    setDragOffset(Math.max(-120, Math.min(120, diffX * 0.35)));
  };

  const handleMouseUp = (e) => {
    if (!isMouseDragging.current || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      didSwipeRef.current = true;
      touchDidMoveRef.current = true;
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    mouseStartX.current = null;
    isMouseDragging.current = false;
    setDragOffset(0);
    setIsSwiping(false);
    setTimeout(() => {
      didSwipeRef.current = false;
      touchDidMoveRef.current = false;
    }, 250);
  };

  // Tap on Hero Image -> Opens Products Page ONLY if user actually tapped without scrolling
  const handleImageTap = (slide) => {
    if (didSwipeRef.current || touchDidMoveRef.current) return;
    const targetSlide = slide || currentSlide;
    if (targetSlide.isComboSlide || targetSlide.imageTapTarget === 'combo-builder') {
      onNavigate('combo-builder');
    } else {
      onNavigate(targetSlide.imageTapTarget || 'all-products');
    }
  };

  // Video play / pause handler
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlayingVideo) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log('Playback error', e));
      }
      setIsPlayingVideo(!isPlayingVideo);
    } else {
      setIsPlayingVideo(!isPlayingVideo);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlayingVideo) {
        videoRef.current.play().catch(e => {
          console.log('Autoplay muted deferred', e);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlayingVideo]);

  return (
    <section 
      className="relative w-full bg-transparent overflow-hidden border-b border-[#E8DDCD]/60"
    >
      
      {/* ================= DESKTOP LAYOUT (2-Finger Trackpad Scroll + Auto-Scroll, No Arrows) ================= */}
      <div className="hidden md:block py-4 lg:py-6">
        <div 
          onClick={() => handleImageTap(currentSlide)}
          className="relative w-[92%] max-w-[1360px] mx-auto min-h-[500px] lg:min-h-[560px] rounded-3xl overflow-hidden shadow-xl border border-[#E8DDCD] select-none cursor-pointer touch-pan-y group"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          
          {/* Dynamic Background Slider Track with Smooth Horizontal Slide */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div 
              className={`flex w-full h-full ${isSwiping ? 'transition-none' : 'transition-transform duration-600 ease-out'}`}
              style={{ transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))` }}
            >
              {slides.map((s) => (
                <div key={s.id} className="w-full h-full shrink-0 relative overflow-hidden">
                  <img
                    src={s.bgImage}
                    alt={s.title1}
                    className="w-full h-full object-cover object-right lg:object-center select-none group-hover:scale-[1.01] transition-transform duration-500"
                    draggable="false"
                  />
                  {/* Subtle left-side warm gradient for effortless card contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Ambient Video Player (Visible ONLY when isPlayingVideo is true) */}
            <video
              ref={videoRef}
              src="/videos/hero-bg.mp4"
              loop
              muted={isMuted}
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-2 ${
                isPlayingVideo ? 'opacity-90' : 'opacity-0 pointer-events-none'
              }`}
            />
          </div>

          {/* Top-Right Clickable Image Badge */}
          <div className="absolute top-5 right-6 z-20 pointer-events-none">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md backdrop-blur-md border ${
              currentSlide.isComboSlide
                ? 'bg-[#2D1810]/90 text-[#FBBF24] border-[#F5A623]'
                : 'bg-black/55 text-white border-white/25'
            }`}>
              <span>{currentSlide.imageTapLabel}</span>
            </span>
          </div>

          {/* Foreground Content Container */}
          <div className="w-full min-h-[500px] lg:min-h-[560px] relative z-10 flex flex-col justify-between px-8 lg:px-14 pt-8 lg:pt-12 pb-5 pointer-events-none">
            
            {/* High-Contrast Card (Hides completely with smooth fade/scale when video plays so the user sees FULL video!) */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className={`my-auto bg-[#FFFDF9]/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 lg:p-8 border-2 border-[#E5D9C5] shadow-2xl max-w-lg lg:max-w-[520px] transition-all duration-500 cursor-default pointer-events-auto ${
                isPlayingVideo 
                  ? 'opacity-0 scale-95 pointer-events-none translate-y-6 invisible' 
                  : 'opacity-100 scale-100 translate-y-0 visible'
              }`}
            >
              
              {/* Tag with Golden Amber Accent Line */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-black tracking-wider text-[#1F110B] uppercase">
                  {currentSlide.tag}
                </span>
                <div className="w-8 h-[2.5px] bg-[#D97706]" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-black text-[#1F110B] leading-[1.15] mb-2.5">
                {currentSlide.title1} <br />
                <span className="text-[#B45309]">{currentSlide.title2}</span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm font-bold text-[#2D1810] leading-relaxed mb-5 max-w-md">
                {currentSlide.desc}
              </p>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate(currentSlide.primaryTarget, currentSlide.primaryParams || {}); }}
                  className="bg-[#F5A623] hover:bg-[#E09415] text-[#1F110B] font-black text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full shadow-md flex items-center gap-1.5 transform hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{currentSlide.primaryBtn}</span>
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate(currentSlide.secondaryTarget); }}
                  className="bg-white hover:bg-[#FAF6EE] text-[#1F110B] font-extrabold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full border-2 border-[#C8B9A6] shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <span>{currentSlide.secondaryBtn}</span>
                </button>
              </div>

              {/* 3 Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-3.5 border-t border-[#E5D9C5] text-[11px] sm:text-xs font-extrabold text-[#1F110B]">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 text-sm">🍃</span>
                  <span>{currentSlide.badge1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 text-sm">⚗️</span>
                  <span>{currentSlide.badge2}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 text-sm">👥</span>
                  <span>{currentSlide.badge3}</span>
                </div>
              </div>

            </div>

            {/* Bottom Controls Bar (Video Pill + Pagination Dots) */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between pt-4 z-20 pointer-events-auto"
            >
              
              {/* Left: Video Play/Pause Pill */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleVideo}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md transition-all shadow-md cursor-pointer border ${
                    isPlayingVideo 
                      ? 'bg-[#1C120C]/90 text-[#FBBF24] border-[#C88214] scale-105' 
                      : 'bg-black/70 hover:bg-black/85 text-white border-white/20'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white">
                    {isPlayingVideo ? (
                      <Pause className="w-2.5 h-2.5 fill-current" />
                    ) : (
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    )}
                  </div>
                  <span>
                    {isPlayingVideo ? 'Full Video Playing • Click to Stop & Return' : 'Play Video'}
                  </span>
                </button>

                {isPlayingVideo && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-[#1C120C]/90 hover:bg-black text-white border border-[#C88214] backdrop-blur-md transition-all cursor-pointer shadow-md"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#F5A623]" />}
                  </button>
                )}
              </div>

              {/* Center: 4 Pagination Dots Indicator */}
              <div className="flex items-center gap-2 bg-black/45 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDot(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'w-8 bg-[#F5A623]'
                        : 'w-2.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MOBILE LAYOUT (< md) 1-Finger Touch Swipe + Auto-Scroll, No Arrows ================= */}
      <div className="md:hidden flex flex-col bg-transparent py-3">
        
        {/* Top Hero Image Container (92% Width, Rounded, Shadow, 1-Finger Swipe + Tap to Navigate) */}
        <div className="w-[92%] mx-auto">
          <div 
            onClick={() => {
              if (isPlayingVideo) {
                toggleVideo();
              } else {
                handleImageTap(currentSlide);
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className={`relative w-full transition-all duration-500 bg-stone-900 rounded-2xl overflow-hidden shadow-md border border-[#E8DDCD] cursor-pointer touch-pan-y select-none ${
              isPlayingVideo ? 'aspect-[4/3] sm:aspect-[16/10] ring-2 ring-[#C88214]' : 'aspect-[16/10]'
            }`}
          >
            
            {/* Real Horizontal Sliding Track on Mobile */}
            <div 
              className={`flex w-full h-full ${isSwiping ? 'transition-none' : 'transition-transform duration-500 ease-out'}`}
              style={{ transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))` }}
            >
              {slides.map((s) => (
                <div key={s.id} className="w-full h-full shrink-0 relative overflow-hidden">
                  <img
                    src={s.bgImage}
                    alt={s.title1}
                    className="w-full h-full object-cover object-right select-none"
                    draggable="false"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Tap Badge on Image (Hidden when video plays) */}
            {!isPlayingVideo && (
              <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black shadow-sm backdrop-blur-md ${
                  currentSlide.isComboSlide
                    ? 'bg-[#2D1810]/90 text-[#FBBF24] border border-[#F5A623]'
                    : 'bg-black/60 text-white'
                }`}>
                  {currentSlide.isComboSlide ? '🎁 Tap for Combo Pack →' : 'Tap for Products →'}
                </span>
              </div>
            )}

            {isPlayingVideo && (
              <>
                <video
                  src="/videos/hero-bg.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-2"
                />
                {/* Floating pill over video on mobile */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                    className="p-1.5 rounded-full bg-black/75 text-white backdrop-blur-md shadow-md"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FBBF24]" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                    className="px-2.5 py-1 rounded-full bg-black/75 text-[#FBBF24] text-[10px] font-black backdrop-blur-md shadow-md flex items-center gap-1 border border-[#C88214]/50"
                  >
                    <Pause className="w-2.5 h-2.5 fill-current" />
                    <span>Close Video</span>
                  </button>
                </div>
              </>
            )}

            {/* Soft Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/30 to-transparent z-3 pointer-events-none" />
          </div>
        </div>

        {/* Bottom Clean Soft Card (92% Width) - Hides when video plays so full video is seen */}
        {!isPlayingVideo ? (
          <div className="w-[92%] mx-auto px-1 pt-3.5 pb-2 flex flex-col relative transition-opacity duration-300">
            
            {/* Subtitle tag */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black tracking-wider text-[#2D1810] uppercase">
                {currentSlide.tag}
              </span>
              <div className="w-7 h-[2px] bg-[#E59400]" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-xl sm:text-2xl font-black text-[#2D1810] leading-tight mb-1.5">
              {currentSlide.title1} <br />
              <span className="text-[#D97706]">{currentSlide.title2}</span>
            </h1>

            {/* Description */}
            <p className="text-xs font-semibold text-[#5A493F] leading-relaxed mb-3.5">
              {currentSlide.desc}
            </p>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2.5 w-full mb-3">
              <button
                onClick={() => onNavigate(currentSlide.primaryTarget, currentSlide.primaryParams || {})}
                className="flex-1 bg-[#F5A623] hover:bg-[#E09415] text-[#2D1810] font-black text-xs py-2.5 px-3 rounded-full shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span>{currentSlide.primaryBtn}</span>
              </button>

              <button
                onClick={() => onNavigate(currentSlide.secondaryTarget)}
                className="flex-1 bg-white hover:bg-stone-50 text-[#2D1810] font-bold text-xs py-2.5 px-3 rounded-full border border-[#D5C7B8] shadow-2xs active:scale-95 transition-all"
              >
                <span>{currentSlide.secondaryBtn}</span>
              </button>
            </div>

            {/* Mobile Bottom Row: Carousel Dots + Video Pause/Play Button */}
            <div className="flex items-center justify-between pt-1">
              {/* Dots */}
              <div className="flex items-center gap-1.5 py-1">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDot(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'w-7 bg-[#F5A623]'
                        : 'w-2 bg-stone-300'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Video Play Button on Bottom-Right */}
              <button
                onClick={toggleVideo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C120C] text-[#FBBF24] border border-[#C88214] text-xs font-bold shadow-sm active:scale-90 transition-transform"
                aria-label="Play video"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Video</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="w-[92%] mx-auto px-1 pt-3 pb-1 flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C120C] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Full Process Video Playing
            </span>
            <button
              onClick={toggleVideo}
              className="text-xs font-extrabold text-[#C88214] hover:underline"
            >
              Show Offer Details →
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
