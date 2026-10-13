import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductGallery = ({ images = [], productName }) => {
  const galleryImages = useMemo(() => {
    const list = Array.isArray(images) ? images.filter(Boolean) : [];
    const fallbacks = [
      '/images/products/mango-bowl-serving.jpg',
      '/images/products/achar-bowl-serving.jpg',
      '/images/products/marusthali-mango-jar.jpg'
    ];
    for (const fb of fallbacks) {
      if (list.length < 3 && !list.includes(fb)) {
        list.push(fb);
      }
    }
    return list;
  }, [images]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Gesture refs for 1-finger mobile touch & 2-finger laptop touchpad scroll
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchCurrentX = useRef(null);
  const didSwipeRef = useRef(false);
  const wheelDeltaAccum = useRef(0);
  const wheelLocked = useRef(false);

  // Reset active index when product changes
  useEffect(() => {
    setActiveIdx(0);
    setIsZoomed(false);
  }, [productName]);

  const handleNextImg = () => {
    setActiveIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImg = () => {
    setActiveIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Laptop 2-Finger Touchpad Horizontal Scroll Support
  const handleWheel = (e) => {
    if (galleryImages.length <= 1) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 6) {
      e.stopPropagation();
      if (wheelLocked.current) return;
      wheelDeltaAccum.current += e.deltaX;

      if (Math.abs(wheelDeltaAccum.current) > 25) {
        if (wheelDeltaAccum.current > 0) {
          handleNextImg();
        } else {
          handlePrevImg();
        }
        wheelDeltaAccum.current = 0;
        wheelLocked.current = true;
        setTimeout(() => {
          wheelLocked.current = false;
        }, 450);
      }
    }
  };

  // Mobile 1-Finger Touch Swipe Support
  const handleTouchStart = (e) => {
    if (e.targetTouches.length === 1) {
      touchStartX.current = e.targetTouches[0].clientX;
      touchStartY.current = e.targetTouches[0].clientY;
      touchCurrentX.current = e.targetTouches[0].clientX;
      didSwipeRef.current = false;
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isSwiping || touchStartX.current === null || e.targetTouches.length !== 1) return;
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - (touchStartY.current || 0);

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      didSwipeRef.current = true;
      touchCurrentX.current = currentX;
      setDragOffset(Math.max(-90, Math.min(90, diffX * 0.45)));
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const diffX = touchStartX.current - touchCurrentX.current;
      if (Math.abs(diffX) > 35) {
        didSwipeRef.current = true;
        if (diffX > 0) {
          handleNextImg();
        } else {
          handlePrevImg();
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
    }, 100);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const activeImage = galleryImages[activeIdx] || galleryImages[0] || '';

  const handleMainImageTap = () => {
    if (didSwipeRef.current) return;
    setIsZoomed((prev) => !prev);
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-4">
      
      {/* Thumbnail Strip - Clicking any thumbnail opens that image in the product frame */}
      <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-y-auto pb-1 sm:pb-0 shrink-0 no-scrollbar">
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setActiveIdx(idx);
              setIsZoomed(false);
            }}
            className={`relative w-13 h-13 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white shrink-0 cursor-pointer ${
              activeIdx === idx
                ? 'border-brand-green ring-2 ring-brand-green/30 scale-102 shadow-xs'
                : 'border-brand-border hover:border-brand-yellow/80 opacity-75 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover rounded-md sm:rounded-lg"
            />
          </button>
        ))}
      </div>

      {/* Main Product Image View (No Auto-Change, Clean Inline View & Manual Swipe/Scroll) */}
      <div 
        onClick={handleMainImageTap}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        className="relative flex-1 aspect-square max-h-[340px] sm:max-h-none rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-border bg-brand-cream/40 shadow-warm flex items-center justify-center cursor-zoom-in group select-none touch-pan-y"
      >
        <img
          src={activeImage}
          alt={`${productName} - View ${activeIdx + 1}`}
          draggable={false}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed && !isSwiping ? 'scale-125' : 'scale-100'
          }`}
          style={{
            transformOrigin: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : undefined,
            transform: dragOffset ? `translateX(${dragOffset}px)` : undefined
          }}
        />

        {/* Prev / Next Navigation Buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handlePrevImg(); }}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-brand-brown shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleNextImg(); }}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-brand-brown shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-brand-border text-brand-brown text-[11px] font-bold flex items-center gap-1 shadow-sm pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5 text-[#B45309]" />
          <span className="hidden sm:inline">{isZoomed ? 'Zoomed' : 'Hover / Tap to Zoom'}</span>
        </div>

        {/* 100% Homemade Stamp */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 bg-brand-yellow/90 backdrop-blur-md text-brand-brown font-extrabold text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm pointer-events-none">
          100% Traditional Sun-Cooked
        </div>

        {/* Slide Indicator Dots */}
        {galleryImages.length > 1 && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 flex items-center gap-1.5 bg-black/45 backdrop-blur-xs px-2.5 py-1 rounded-full z-10"
          >
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => { e.stopPropagation(); setActiveIdx(idx); }}
                aria-label={`View image ${idx + 1}`}
                className={`rounded-full transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'w-4 h-1.5 bg-[#FBBF24]'
                    : 'w-1.5 h-1.5 bg-white/75 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
