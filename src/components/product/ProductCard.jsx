import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check, ChevronLeft, ChevronRight, Leaf, Flame } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product, onNavigate, onQuickView, activePriceRange }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(() => {
    return product.packSizes && product.packSizes.length > 0 
      ? product.packSizes[1]?.size || product.packSizes[0].size 
      : '500 g';
  });

  // When a price range filter (e.g. ₹100-₹200, ₹200-₹300, ₹300-₹500) is active, auto-select the matching pack size
  useEffect(() => {
    if (!product.packSizes || product.packSizes.length === 0) return;
    if (activePriceRange && (activePriceRange.min > 0 || activePriceRange.max < 1500)) {
      const currentSizeObj = product.packSizes.find(s => s.size === selectedSize);
      const currentInRange = currentSizeObj && currentSizeObj.price >= activePriceRange.min && currentSizeObj.price <= activePriceRange.max;
      if (!currentInRange) {
        const matchingPack = product.packSizes.find(
          s => s.price >= activePriceRange.min && s.price <= activePriceRange.max
        );
        if (matchingPack) {
          setSelectedSize(matchingPack.size);
        }
      }
    }
  }, [activePriceRange?.min, activePriceRange?.max, product.packSizes]);

  // Default to Medium spice level initially as requested
  const [selectedSpice, setSelectedSpice] = useState('Medium');

  const [addedAnim, setAddedAnim] = useState(false);

  // Build product image gallery list for this product (No auto-change, only product's own images)
  const galleryImages = useMemo(() => {
    const imgs = [];
    if (product.image) imgs.push(product.image);
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        if (img && !imgs.includes(img)) imgs.push(img);
      });
    }
    const fallbacks = [
      '/images/products/mango-bowl-serving.jpg',
      '/images/products/achar-bowl-serving.jpg',
      '/images/products/marusthali-mango-jar.jpg'
    ];
    for (const fb of fallbacks) {
      if (imgs.length < 3 && !imgs.includes(fb)) {
        imgs.push(fb);
      }
    }
    return imgs;
  }, [product.image, product.gallery]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const currentImg = galleryImages[activeImgIdx] || galleryImages[0] || '';

  // Gesture refs for 1-finger mobile touch & 2-finger laptop touchpad scroll
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchCurrentX = useRef(null);
  const didSwipeRef = useRef(false);
  const wheelDeltaAccum = useRef(0);
  const wheelLocked = useRef(false);

  const handleNextImg = (e) => {
    if (e) e.stopPropagation();
    setActiveImgIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImg = (e) => {
    if (e) e.stopPropagation();
    setActiveImgIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
      setDragOffset(Math.max(-60, Math.min(60, diffX * 0.4)));
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const diffX = touchStartX.current - touchCurrentX.current;
      if (Math.abs(diffX) > 30) {
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

  // Price calculations based on selected size
  const currentVariant = product.packSizes?.find(s => s.size === selectedSize) || {
    price: product.price,
    mrp: product.mrp
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const spiceText = selectedSpice === 'Low' ? 'Mild' : selectedSpice;
    addToCart(product, selectedSize, 1, `Spice: ${spiceText}`);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Tapping on the Image opens this Product's Detail page
  const handleImageTap = (e) => {
    e.stopPropagation();
    if (didSwipeRef.current) return;
    onNavigate('product-detail', { productId: product.id });
  };

  const handleCardClick = () => {
    if (didSwipeRef.current) return;
    onNavigate('product-detail', { productId: product.id });
  };

  const isFavorited = isInWishlist(product.id);

  const getBadgeStyle = () => {
    if (product.badge === 'Bestseller' || product.badgeType === 'bestseller') {
      return 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-amber-50 border-amber-400/60 shadow-amber-950/20';
    }
    if (product.badge === 'Spicy' || product.badgeType === 'spicy') {
      return 'bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-rose-50 border-rose-400/60 shadow-rose-950/20';
    }
    if (product.badge === 'New' || product.badgeType === 'new') {
      return 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-emerald-50 border-emerald-400/60 shadow-emerald-950/20';
    }
    return 'bg-gradient-to-r from-amber-700 to-yellow-700 text-amber-50 border-amber-300/60';
  };

  const spiceDetails = {
    Low: { label: 'Mild', color: 'text-[#8C5E35]', chilis: '🌶️' },
    Medium: { label: 'Medium', color: 'text-[#8C4309]', chilis: '🌶️🌶️' },
    Spicy: { label: 'Spicy', color: 'text-[#B91C1C]', chilis: '🌶️🌶️🌶️' }
  };

  const handleSpiceCycle = (e) => {
    e.stopPropagation();
    const cycle = ['Medium', 'Spicy', 'Low'];
    const next = cycle[(cycle.indexOf(selectedSpice) + 1) % cycle.length];
    setSelectedSpice(next);
  };

  const currentSpice = spiceDetails[selectedSpice] || spiceDetails.Medium;

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E6] to-[#F5EAD6] rounded-t-[32px] sm:rounded-t-[38px] rounded-b-2xl sm:rounded-b-3xl border-2 border-[#D8BE95] hover:border-[#C59A3F] shadow-[0_8px_24px_rgba(45,24,16,0.08)] hover:shadow-[0_22px_44px_rgba(45,24,16,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden"
    >
      {/* Decorative Antique Corner Studs */}
      <span className="absolute top-2 left-2 text-[9px] text-[#C59A3F]/60 select-none pointer-events-none">✦</span>
      <span className="absolute top-2 right-2 text-[9px] text-[#C59A3F]/60 select-none pointer-events-none">✦</span>

      {/* Product Image Stage with Organic Wave Line Divider at Bottom */}
      <div 
        onClick={handleImageTap}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square w-full bg-gradient-to-b from-[#EFE3CF] via-[#E5D4BC] to-[#DBC5A8] overflow-hidden flex items-center justify-center p-2.5 sm:p-3 select-none touch-pan-y rounded-t-[30px] sm:rounded-t-[36px]"
      >
        {/* Arched Inner Picture Frame */}
        <div 
          className="w-full h-full relative rounded-t-[24px] sm:rounded-t-[28px] rounded-b-xl overflow-hidden shadow-sm border border-[#D5C2A5]/70"
          style={{
            transform: dragOffset ? `translateX(${dragOffset}px)` : undefined,
            transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <img 
            src={currentImg} 
            alt={`${product.name} - View ${activeImgIdx + 1}`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform" 
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          {/* Subtle bottom gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Left / Right Subtle Chevrons on Hover (Desktop) */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Previous image"
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 hover:bg-white text-[#2D1810] items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-amber-300"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Next image"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 hover:bg-white text-[#2D1810] items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-amber-300"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Top Badge */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-xs flex items-center gap-1 ${getBadgeStyle()}`}>
              <span>★ {product.badge}</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs backdrop-blur-xs ${
            isFavorited 
              ? 'bg-rose-50 text-rose-600 border border-rose-300 scale-105' 
              : 'bg-white/95 text-[#2D1810] hover:text-rose-600 hover:bg-white border border-amber-300/80 hover:scale-105'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-current text-rose-600' : ''}`} />
        </button>

        {/* Stamp Tag on Image */}
        <div className="absolute bottom-4 left-2.5 pointer-events-none z-10 flex items-center gap-1 bg-[#1A0C06]/85 backdrop-blur-xs text-[#FBBF24] text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-500/40 shadow-xs">
          <span>🏺 100% Mustard Oil • Sun Aged</span>
        </div>

        {/* Slide Indicator Dots */}
        {galleryImages.length > 1 && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-2.5 flex items-center gap-1 z-10 bg-black/55 backdrop-blur-xs px-2 py-1 rounded-full"
          >
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIdx(idx);
                }}
                aria-label={`View image ${idx + 1}`}
                className={`rounded-full transition-all ${
                  activeImgIdx === idx
                    ? 'w-3 h-1.5 bg-[#FBBF24]'
                    : 'w-1.5 h-1.5 bg-white/75 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="absolute bottom-9 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-[#2D1810] text-[11px] sm:text-xs font-black py-1.5 px-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md flex items-center gap-1.5 border border-amber-400 z-10 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-[#1E5631]" /> Quick View
          </button>
        )}

        {/* Signature Layered Wave Line Transition (Curved line style like the footer wave) */}
        <div className="absolute -bottom-0.5 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="w-full h-3.5 sm:h-4 text-[#FAF4E6] fill-current block" viewBox="0 0 300 20" preserveAspectRatio="none">
            <path d="M0,6 C75,18 150,2 225,12 C265,17 285,5 300,8 L300,20 L0,20 Z" fill="#D9C2A3" opacity="0.4" />
            <path d="M0,9 C70,1 145,17 215,8 C260,3 285,14 300,9 L300,20 L0,20 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Origin Tag & Star Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
            <span className="font-black text-[#8C5E35] uppercase tracking-widest text-[9px] sm:text-[10px] truncate">
              ✦ {product.categoryName || 'Sikar • Sun-Cured'} ✦
            </span>
            <div className="flex items-center gap-1 text-amber-950 bg-amber-100/80 border border-amber-300/80 px-2 py-0.5 rounded-full font-black text-[10px] sm:text-[11px] shrink-0 shadow-2xs">
              <Star className="w-3 h-3 text-amber-600 fill-current" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-[#8C5E35] font-bold">
                ({product.reviewCount > 999 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-black text-sm sm:text-base lg:text-lg text-[#231209] group-hover:text-[#B45309] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Pack Size Segmented Dial */}
        {product.packSizes && product.packSizes.length > 1 && (
          <div className="bg-[#EFE2CE] p-1 rounded-xl border border-[#DFC4A2] flex items-center gap-1 shadow-inner">
            {product.packSizes.map(p => {
              const isSel = selectedSize === p.size;
              return (
                <button
                  key={p.size}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedSize(p.size); }}
                  className={`flex-1 py-1 rounded-lg text-[10px] sm:text-xs font-black transition-all cursor-pointer text-center ${
                    isSel
                      ? 'bg-[#2A1408] text-[#FBBF24] shadow-xs'
                      : 'text-[#5C4535] hover:text-[#2A1408]'
                  }`}
                >
                  {p.size}
                </button>
              );
            })}
          </div>
        )}

        {/* Interactive Single-Tap Spice Indicator Strip (Exact design matching user reference) */}
        <div 
          onClick={handleSpiceCycle}
          className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-[#F5D096] bg-[#FFFDF5] hover:bg-[#FFF9EA] cursor-pointer transition-all shadow-2xs active:scale-[0.98] group/spice select-none"
          title="Click to change spice level"
        >
          <div className="flex items-center gap-1 min-w-0 flex-nowrap">
            <Flame className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
            <span className="text-[10px] sm:text-xs font-black text-[#2A1408] whitespace-nowrap">Spice:</span>
            <span className="text-[10px] sm:text-xs font-black text-[#8C4309] whitespace-nowrap">
              {currentSpice.label}
            </span>
            <span className="text-[10px] sm:text-xs tracking-tighter whitespace-nowrap inline-flex items-center">
              {currentSpice.chilis}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-black text-[#8C4309] uppercase tracking-wider underline hover:text-[#5C2B04] group-hover/spice:text-[#5C2B04] transition-colors shrink-0 whitespace-nowrap ml-1">
            <span className="hidden sm:inline">CHANGE </span>↻
          </span>
        </div>

        {/* Price & Add to Cart Section with Decorative Curved Stitch Divider */}
        <div className="pt-1.5 relative">
          {/* Decorative Wave Stitch Line Divider (Inspired by Footer Curve Accent) */}
          <div className="w-full flex items-center justify-center gap-2 mb-2">
            <svg className="flex-1 h-2 text-[#DFC4A2]" viewBox="0 0 120 8" fill="none" preserveAspectRatio="none">
              <path d="M0,4 Q30,8 60,4 T120,4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
            </svg>
            <span className="text-[8px] text-[#B45309] select-none font-serif">✦</span>
            <svg className="flex-1 h-2 text-[#DFC4A2]" viewBox="0 0 120 8" fill="none" preserveAspectRatio="none">
              <path d="M0,4 Q30,0 60,4 T120,4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
            </svg>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#1F110B] font-serif">
                ₹{currentVariant.price}
              </span>
              {currentVariant.mrp && currentVariant.mrp > currentVariant.price && (
                <span className="text-xs text-gray-500 line-through font-bold">
                  ₹{currentVariant.mrp}
                </span>
              )}
            </div>
            {currentVariant.mrp && currentVariant.mrp > currentVariant.price && (
              <span className="text-[10px] sm:text-xs font-black text-amber-950 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full">
                {product.discount || '17% OFF'}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer border ${
              addedAnim
                ? 'bg-[#1E5631] text-white border-emerald-400'
                : 'bg-gradient-to-r from-[#144525] via-[#1B5E33] to-[#144525] hover:from-[#0E351B] hover:to-[#174F2B] text-white border-[#FBBF24]/50 shadow-emerald-950/25 hover:shadow-lg hover:border-[#FBBF24]'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4 text-emerald-200 stroke-[3]" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#FBBF24]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


