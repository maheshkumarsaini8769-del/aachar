import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Check, 
  Truck, 
  Sparkles, 
  Share2, 
  Sun, 
  Award,
  Clock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const QuickViewModal = ({ product, onClose, onNavigate }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // 1. Image Gallery State & Aggregation
  const galleryImages = useMemo(() => {
    const list = [];
    if (product.image) list.push(product.image);
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    // Guarantee 3-4 authentic visual angles for every product
    const contextualFallbacks = [
      '/images/products/achar-bowl-serving.jpg',
      '/images/products/mango-bowl-serving.jpg',
      '/images/products/mango-clay-barni.jpg',
      '/images/products/mango-sun-drying.jpg'
    ];
    for (const fb of contextualFallbacks) {
      if (!list.includes(fb) && list.length < 4) {
        list.push(fb);
      }
    }
    return list;
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Gesture refs for 1-finger mobile touch & 2-finger laptop touchpad scroll
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchCurrentX = useRef(null);
  const wheelDeltaAccum = useRef(0);
  const wheelLocked = useRef(false);

  // 2. Variant & Quantity State
  const [selectedSize, setSelectedSize] = useState(() => {
    return product.packSizes && product.packSizes.length > 0 
      ? product.packSizes[1]?.size || product.packSizes[0].size 
      : '500 g';
  });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedCustomTags, setSelectedCustomTags] = useState([]);
  const [customNoteInput, setCustomNoteInput] = useState('');

  const customQuickOptions = [
    '🌿 Pure Jain (No Garlic)',
    '✨ + Extra Hing',
    '🌶️ + Extra Masala',
    '🫗 - Less Oil',
    '🧂 - Less Salt',
    '🔥 - Less Chilli'
  ];

  const toggleCustomTag = (tag) => {
    setSelectedCustomTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Auto-scroll gallery images every 4 seconds (pauses when zoomed or swiping)
  useEffect(() => {
    if (isZoomed || isSwiping || galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isZoomed, isSwiping, galleryImages.length, activeImageIndex]);

  // Laptop 2-Finger Touchpad Horizontal Scroll Support
  const handleWheel = (e) => {
    if (galleryImages.length <= 1) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 6) {
      e.stopPropagation();
      if (wheelLocked.current) return;
      wheelDeltaAccum.current += e.deltaX;

      if (Math.abs(wheelDeltaAccum.current) > 25) {
        if (wheelDeltaAccum.current > 0) {
          setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        } else {
          setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
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
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isSwiping || touchStartX.current === null || e.targetTouches.length !== 1) return;
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - (touchStartY.current || 0);

    if (Math.abs(diffX) > Math.abs(diffY)) {
      touchCurrentX.current = currentX;
      setDragOffset(Math.max(-90, Math.min(90, diffX * 0.45)));
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const diffX = touchStartX.current - touchCurrentX.current;
      if (Math.abs(diffX) > 35) {
        if (diffX > 0) {
          setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        } else {
          setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    setDragOffset(0);
    setIsSwiping(false);
  };

  // Keyboard navigation (ESC to close, Left/Right for images)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryImages.length, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const currentVariant = product.packSizes?.find(s => s.size === selectedSize) || {
    price: product.price,
    mrp: product.mrp || Math.round(product.price * 1.2)
  };

  const discountPercent = currentVariant.mrp && currentVariant.mrp > currentVariant.price
    ? Math.round(((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100)
    : 17;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAdd = () => {
    const combinedNote = [
      ...selectedCustomTags,
      customNoteInput.trim()
    ].filter(Boolean).join(', ');
    addToCart(product, selectedSize, quantity, combinedNote);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `?product=${product.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isFavorited = isInWishlist(product.id);

  // Spice level visual rendering
  const spiceColor = {
    'Mild': 'text-emerald-700 bg-emerald-50 border-emerald-200',
    'Medium': 'text-amber-800 bg-amber-50 border-amber-200',
    'Spicy': 'text-red-700 bg-red-50 border-red-200',
    'Extra Spicy': 'text-rose-900 bg-rose-50 border-rose-300'
  }[product.spiceLevel] || 'text-amber-800 bg-amber-50 border-amber-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      
      {/* Backdrop with Soft Blur */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity animate-fade-in" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8DDCD] z-10 max-h-[92vh] flex flex-col md:flex-row animate-scale-up">
        
        {/* Top Floating Action Buttons (Close & Share) */}
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#FAF5EC] text-[#2D1810] border border-[#E8DDCD] shadow-sm flex items-center justify-center transition-all cursor-pointer"
            title="Share Product"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#FAF5EC] text-[#2D1810] hover:text-[#D97706] border border-[#E8DDCD] shadow-sm flex items-center justify-center transition-all cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* LEFT COLUMN: ADVANCED INTERACTIVE PHOTO GALLERY */}
        {/* ========================================================= */}
        <div className="w-full md:w-1/2 bg-[#FAF6EE] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFE7D8]">
          <div>
            
            {/* Main Stage Image with Auto-scroll, 2-Finger Laptop Scroll, 1-Finger Mobile Swipe & Hover Zoom */}
            <div 
              className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E8DDCD] shadow-sm group select-none touch-pan-y"
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Product Badge Tag */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#B45309] text-white shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>{product.badge}</span>
                  </span>
                </div>
              )}

              {/* Image Counter Indicator */}
              <div className="absolute top-3 right-14 md:right-3 z-20">
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 border border-white/20">
                  {activeImageIndex + 1} / {galleryImages.length} Photos
                </span>
              </div>

              {/* Main Image without Zoom blowup */}
              <img
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} - Angle ${activeImageIndex + 1}`}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-200 scale-100"
                style={{
                  transform: dragOffset ? `translateX(${dragOffset}px)` : undefined
                }}
                loading="eager"
              />

              {/* Previous Photo Button */}
              <button
                onClick={handlePrevImage}
                aria-label="Previous Photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#2D1810] shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Photo Button */}
              <button
                onClick={handleNextImage}
                aria-label="Next Photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#2D1810] shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Subtle Warm Overlay at bottom of main image */}
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Thumbnails Gallery Strip */}
            <div className="mt-3.5">
              <div className="text-[11px] font-bold text-[#7A695B] mb-2 flex items-center justify-between">
                <span>All Product Angles & Authentic Jars:</span>
                <span className="text-[10px] text-[#D97706]">Click to preview</span>
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl aspect-square overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#D97706] ring-2 ring-amber-300 shadow-md scale-105'
                        : 'border-[#E8DDCD] hover:border-amber-400 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {activeImageIndex === idx && (
                      <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Heritage Trust Strip */}
          <div className="mt-4 pt-3.5 border-t border-[#E8DDCD] grid grid-cols-2 gap-2 text-[11px] font-bold text-[#5A493F]">
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-xl border border-[#EFE7D8]">
              <Sun className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span className="truncate">21-Day Solar Cured</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-xl border border-[#EFE7D8]">
              <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">Cold-Pressed Mustard Oil</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: RICH PRODUCT SPECIFICATIONS & ACTIONS */}
        {/* ========================================================= */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[550px] md:max-h-[640px]">
          
          <div className="space-y-4">
            
            {/* Header: Category & Ratings */}
            <div className="flex items-center justify-between gap-2 border-b border-[#F0E8DC] pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#D97706] bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {product.categoryName || 'Authentic Achar'}
              </span>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-black shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating || '4.9'}</span>
                </div>
                <span className="text-[11px] font-bold text-[#8C7E72]">
                  ({product.reviewCount || 450} verified reviews)
                </span>
              </div>
            </div>

            {/* Product Title & Hindi Name */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2D1810] leading-tight">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-xs font-bold text-[#8C7E72] mt-0.5">
                  Traditional Name: <span className="text-[#2D1810] font-semibold">{product.hindiName}</span>
                </p>
              )}
            </div>

            {/* Pricing, MRP & Discount Savings Tag */}
            <div className="bg-[#FAF6EE] p-3 rounded-2xl border border-[#E8DDCD] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#2D1810]">
                    ₹{currentVariant.price}
                  </span>
                  {currentVariant.mrp && (
                    <span className="text-sm text-gray-400 line-through font-semibold">
                      ₹{currentVariant.mrp}
                    </span>
                  )}
                  <span className="text-xs font-black text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-md">
                    Save {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[10px] text-[#7A695B] font-semibold mt-0.5">
                  Inclusive of all taxes • Fresh batch delivered from Sikar
                </p>
              </div>

              {/* Spice Meter Pill */}
              {product.spiceLevel && (
                <div className={`px-2.5 py-1 rounded-xl border text-[11px] font-extrabold flex items-center gap-1 shrink-0 ${spiceColor}`}>
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{product.spiceLevel} Spice</span>
                </div>
              )}
            </div>

            {/* Short Heritage Story / Description */}
            <p className="text-xs sm:text-sm text-[#5A493F] font-medium leading-relaxed">
              {product.shortDesc || product.fullDesc}
            </p>

            {/* Key Bullets Highlights */}
            {product.bullets && product.bullets.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-black uppercase text-[#8C7E72] tracking-wider block">
                  Authentic Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {product.bullets.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs font-semibold text-[#2D1810]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pack Size Selector with Live Pricing */}
            {product.packSizes && product.packSizes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#F0E8DC]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#2D1810]">Choose Jar Size:</span>
                  <span className="text-[11px] font-bold text-[#D97706]">
                    Selected: {selectedSize}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.packSizes.map(p => (
                    <button
                      key={p.size}
                      onClick={() => setSelectedSize(p.size)}
                      className={`p-2 rounded-2xl text-center transition-all border cursor-pointer ${
                        selectedSize === p.size
                          ? 'bg-[#2D1810] text-amber-50 border-[#2D1810] shadow-md ring-2 ring-amber-400/50'
                          : 'bg-white hover:bg-amber-50 text-[#2D1810] border-[#E8DDCD]'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{p.size}</div>
                      <div className="text-[11px] font-bold opacity-90 mt-0.5">₹{p.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customize Ingredients (Add Extra / Reduce) */}
            <div className="space-y-2 pt-2.5 border-t border-[#F0E8DC]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#2D1810] flex items-center gap-1">
                  <span>✨ Customize Taste (Add Extra / Less):</span>
                </span>
                <span className="text-[10px] font-bold text-[#8C7E72]">Optional</span>
              </div>
              
              {/* Quick-Select Chips */}
              <div className="flex flex-wrap gap-1.5">
                {customQuickOptions.map(tag => {
                  const isActive = selectedCustomTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleCustomTag(tag)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-[#D97706] text-white border-[#D97706] shadow-xs'
                          : 'bg-[#FAF6EE] hover:bg-amber-50 text-[#2D1810] border-[#E8DDCD]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Custom Free-Text Input */}
              <input
                type="text"
                value={customNoteInput}
                onChange={(e) => setCustomNoteInput(e.target.value)}
                placeholder="Write any custom request (e.g., extra methi, less salt, less oil)..."
                className="w-full bg-[#FAF6EE] border border-[#E8DDCD] rounded-xl px-3 py-2 text-xs text-[#2D1810] placeholder-[#8C7E72] font-medium focus:outline-none focus:ring-1 focus:ring-[#D97706]"
              />
            </div>

            {/* Stock Scarcity Urgency Pill */}
            <div className="flex items-center justify-between text-[11px] font-bold pt-1">
              <span className="text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                In Stock & Handcrafted in Small Batches
              </span>
              <span className="text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md text-[10px]">
                {product.stockCount ? `Only ${product.stockCount} jars left` : 'High Demand'}
              </span>
            </div>

          </div>

          {/* ========================================================= */}
          {/* BOTTOM CONTROLS: QUANTITY, CART & NAVIGATION */}
          {/* ========================================================= */}
          <div className="space-y-3 pt-5 mt-4 border-t border-[#E8DDCD]">
            
            {/* Quantity Counter & Add To Cart Button */}
            <div className="flex items-center gap-3">
              
              {/* Stepper Quantity Counter */}
              <div className="flex items-center border border-[#E8DDCD] rounded-2xl bg-[#FAF6EE] shadow-2xs">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-11 text-[#2D1810] font-black hover:bg-amber-100/60 rounded-l-2xl transition-colors cursor-pointer text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-black text-[#2D1810]">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-11 text-[#2D1810] font-black hover:bg-amber-100/60 rounded-r-2xl transition-colors cursor-pointer text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Big CTA Add to Cart Button with dynamic subtotal */}
              <button
                onClick={handleAdd}
                className={`flex-1 h-11 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#D97706] hover:bg-[#B45309] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Your Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ₹{currentVariant.price * quantity}</span>
                  </>
                )}
              </button>

              {/* Wishlist Icon Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                  isFavorited
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white hover:bg-[#FAF5EC] border-[#E8DDCD] text-[#2D1810]'
                }`}
                title={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Micro Shipping Info & View Full Details Link */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[11px] font-semibold text-[#7A695B] flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                Free Shipping on ₹499+ orders • COD Available
              </span>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('product-detail', { productId: product.id });
                }}
                className="text-xs font-black text-[#2D1810] hover:text-[#D97706] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;
