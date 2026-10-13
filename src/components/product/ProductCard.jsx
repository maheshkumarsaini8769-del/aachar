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

  const [selectedSpice, setSelectedSpice] = useState(() => {
    if (product.spiceLevel === 'Mild' || product.spiceLevel === 'Low') return 'Low';
    if (product.spiceLevel === 'Spicy' || product.spiceLevel === 'High' || product.spiceLevel === 'Hot') return 'Spicy';
    return 'Medium';
  });

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
    addToCart(product, selectedSize, 1, `Spice: ${selectedSpice}`);
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
      return 'bg-[#D97706] text-white';
    }
    if (product.badge === 'Spicy' || product.badgeType === 'spicy') {
      return 'bg-[#DC2626] text-white';
    }
    if (product.badge === 'New' || product.badgeType === 'new') {
      return 'bg-[#1E5631] text-white';
    }
    return 'bg-[#D97706] text-white';
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-[#ECE4D8] overflow-hidden hover:shadow-[0_12px_32px_rgba(61,35,20,0.1)] hover:border-[#D97706]/60 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image Carousel Area - 2-Finger Laptop Scroll + 1-Finger Mobile Swipe (No Auto-Change) */}
      <div 
        onClick={handleImageTap}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden flex items-center justify-center p-2 sm:p-2.5 select-none touch-pan-y"
      >
        <div 
          className="w-full h-full relative rounded-xl sm:rounded-2xl overflow-hidden"
          style={{
            transform: dragOffset ? `translateX(${dragOffset}px)` : undefined,
            transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <img 
            src={currentImg} 
            alt={`${product.name} - View ${activeImgIdx + 1}`} 
            className="w-full h-full object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-all duration-500" 
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Left / Right Subtle Chevrons on Hover (Desktop) */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Previous image"
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/85 hover:bg-white text-[#2D1810] items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Next image"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/85 hover:bg-white text-[#2D1810] items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 rounded-md shadow-xs ${getBadgeStyle()}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            isFavorited 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : 'bg-white/95 text-[#2D1810] hover:text-red-500 hover:bg-white border border-[#E5D9C5]'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-current text-red-600' : ''}`} />
        </button>

        {/* Slide Indicator Dots */}
        {galleryImages.length > 1 && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/35 backdrop-blur-xs px-2 py-1 rounded-full"
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
                    ? 'w-3.5 h-1.5 bg-[#FBBF24]'
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
            className="absolute bottom-9 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-[#2D1810] text-[11px] sm:text-xs font-bold py-1 sm:py-1.5 px-2.5 sm:px-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md flex items-center gap-1.5 border border-[#E5D9C5] z-10 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-[#1E5631]" /> Quick View
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-2.5">
        <div>
          {/* Title */}
          <h3 className="font-serif font-black text-xs sm:text-base lg:text-lg text-[#2D1810] group-hover:text-[#1E5631] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Pack size indicator & Rating */}
          <div className="flex items-center justify-between text-xs sm:text-sm mt-1 sm:mt-1.5">
            <span className="text-[11px] sm:text-sm font-bold text-[#6B5E55]">
              {selectedSize}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[#F59E0B] font-extrabold text-xs sm:text-sm shrink-0">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span>{product.rating}</span>
              <span className="hidden sm:inline text-xs text-[#78716C] font-semibold">
                ({product.reviewCount > 999 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Pack Size Pills */}
        {product.packSizes && product.packSizes.length > 1 && (
          <div className="pt-0.5 sm:pt-1">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
              {product.packSizes.map(p => (
                <button
                  key={p.size}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedSize(p.size); }}
                  className={`px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-extrabold transition-all border shrink-0 whitespace-nowrap cursor-pointer ${
                    selectedSize === p.size
                      ? 'bg-[#2D1810] text-white border-[#2D1810] font-black'
                      : 'bg-[#F4ECE1] text-[#2D1810] border-[#E5D9C5] hover:bg-[#EAE0D1]'
                  }`}
                >
                  {p.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spice Level Selector (Low / Medium / Spicy) */}
        <div className="pt-0.5">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {[
              { id: 'Low', label: 'Low', icon: Leaf },
              { id: 'Medium', label: 'Medium', icon: Flame },
              { id: 'Spicy', label: 'Spicy', icon: Flame }
            ].map(sp => {
              const IconComponent = sp.icon;
              const isSelected = selectedSpice === sp.id;
              return (
                <button
                  key={sp.id}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedSpice(sp.id); }}
                  className={`flex-1 py-1 px-1 sm:px-2 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all border text-center whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1 ${
                    isSelected
                      ? sp.id === 'Spicy'
                        ? 'bg-red-700 text-white border-red-700 shadow-2xs'
                        : sp.id === 'Low'
                        ? 'bg-[#1E5631] text-white border-[#1E5631] shadow-2xs'
                        : 'bg-[#D97706] text-white border-[#D97706] shadow-2xs'
                      : 'bg-[#FAF6EE] text-[#2D1810] border-[#E5D9C5] hover:border-[#D97706]'
                  }`}
                >
                  <IconComponent className={`w-3 h-3 ${isSelected ? 'text-white' : sp.id === 'Spicy' ? 'text-red-600' : sp.id === 'Low' ? 'text-emerald-700' : 'text-amber-600'}`} />
                  <span>{sp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 sm:pt-3 border-t border-[#E5D9C5]/60">
          <div className="flex items-baseline flex-wrap gap-1 sm:gap-2.5 mb-2 sm:mb-3">
            <span className="text-base sm:text-2xl lg:text-3xl font-black text-[#2D1810]">
              ₹{currentVariant.price}
            </span>
            {currentVariant.mrp && currentVariant.mrp > currentVariant.price && (
              <>
                <span className="text-[11px] sm:text-sm text-gray-400 line-through">
                  ₹{currentVariant.mrp}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-[#DC2626] bg-red-50 border border-red-200 px-1 sm:px-1.5 py-0.5 rounded">
                  {product.discount || '17% OFF'}
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all shadow-xs ${
              addedAnim
                ? 'bg-[#1E5631] text-white scale-98'
                : 'bg-[#1E5631] hover:bg-[#164426] text-white hover:shadow-md'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
