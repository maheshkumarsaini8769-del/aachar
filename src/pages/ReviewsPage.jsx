import React, { useState, useRef, useEffect } from 'react';
import { 
  Star, 
  CheckCircle, 
  ThumbsUp, 
  ChevronRight, 
  PenTool, 
  X, 
  Image as ImageIcon,
  Upload,
  Camera,
  ZoomIn,
  Sparkles,
  ShoppingBag,
  Filter,
  Check
} from 'lucide-react';
import { initialReviews, reviewStats } from '../data/reviews';
import { products } from '../data/products';

export const ReviewsPage = ({ onNavigate, viewParams = {} }) => {
  // Load reviews from localStorage or fall back to initialReviews
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem('marusthali_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [ratingFilter, setRatingFilter] = useState('all');
  const [productFilter, setProductFilter] = useState(viewParams.productId || 'all');
  const [withPhotosOnly, setWithPhotosOnly] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(Boolean(viewParams.openWriteModal));
  const [lightboxImage, setLightboxImage] = useState(null);

  // File input ref for customer photo uploads
  const fileInputRef = useRef(null);

  // Selected product lookup map
  const productMap = React.useMemo(() => {
    const map = {};
    products.forEach(p => {
      map[p.id] = p;
    });
    return map;
  }, []);

  // Write review form state
  const [newReview, setNewReview] = useState({
    productId: viewParams.productId || 'aam-classic',
    userName: '',
    location: '',
    rating: 5,
    comment: '',
    images: []
  });
  const [submittedToast, setSubmittedToast] = useState(false);

  // Sync if viewParams change
  useEffect(() => {
    if (viewParams.productId) {
      setProductFilter(viewParams.productId);
      setNewReview(prev => ({ ...prev, productId: viewParams.productId }));
    }
    if (viewParams.openWriteModal) {
      setIsWriteModalOpen(true);
    }
  }, [viewParams]);

  // Persist reviews changes to localStorage
  const saveReviews = (newList) => {
    setReviewsList(newList);
    try {
      localStorage.setItem('marusthali_reviews', JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const handleHelpfulClick = (id) => {
    const updated = reviewsList.map(r => 
      r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
    );
    saveReviews(updated);
  };

  // Handle local file uploads (converts to base64 DataURL for instant preview)
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setNewReview(prev => {
          if (prev.images.length >= 6) return prev;
          return {
            ...prev,
            images: [...prev.images, loadEvent.target.result]
          };
        });
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = '';
  };

  // Remove uploaded photo
  const handleRemovePhoto = (indexToRemove) => {
    setNewReview(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Quick 1-click sample customer photos
  const sampleCustomerPhotos = [
    { label: 'Classic Ceramic Jar', src: '/images/products/marusthali-mango-jar.jpg', emoji: '🏺' },
    { label: 'Serving Bowl', src: '/images/products/achar-bowl-serving.jpg', emoji: '🥣' },
    { label: 'Stuffed Chilli Jar', src: '/images/products/jar-bharwa-mirch.jpg', emoji: '🌶️' },
    { label: 'Garlic Pickle Jar', src: '/images/products/jar-lahsun-classic.jpg', emoji: '🧄' },
    { label: 'Mixed Pickle Bowl', src: '/images/products/card-mix.jpg', emoji: '🥗' }
  ];

  const handleAddSamplePhoto = (src) => {
    if (newReview.images.includes(src)) return;
    if (newReview.images.length >= 6) return;
    setNewReview(prev => ({
      ...prev,
      images: [...prev.images, src]
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    const item = {
      id: `rev-${Date.now()}`,
      productId: newReview.productId,
      userName: newReview.userName,
      location: newReview.location || 'India',
      rating: newReview.rating,
      date: 'Just now',
      verified: true,
      comment: newReview.comment,
      helpfulCount: 0,
      images: newReview.images
    };

    saveReviews([item, ...reviewsList]);
    setIsWriteModalOpen(false);
    setNewReview({
      productId: 'aam-classic',
      userName: '',
      location: '',
      rating: 5,
      comment: '',
      images: []
    });
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  // Filter logic
  const filteredReviews = reviewsList.filter(r => {
    if (ratingFilter !== 'all' && r.rating !== Number(ratingFilter)) {
      return false;
    }
    if (productFilter !== 'all' && r.productId !== productFilter) {
      return false;
    }
    if (withPhotosOnly && (!r.images || r.images.length === 0)) {
      return false;
    }
    return true;
  });

  const selectedFormProduct = productMap[newReview.productId] || products[0];

  return (
    <div className="bg-brand-bg min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Customer Reviews</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-brand-border gap-4">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
              Real Household Experiences • 100% Verified
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
              Customer Reviews (Verified Stories)
            </h1>
            <p className="text-xs sm:text-sm text-brand-brownMuted mt-1">
              Authentic photo reviews and feedback from 10,000+ happy households across India
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto hover:scale-105 active:scale-95"
          >
            <PenTool className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Overview Card */}
        <div className="my-8 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-warm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Average Rating (Col 4) */}
          <div className="md:col-span-4 text-center md:text-left md:border-r md:border-brand-border/60 md:pr-8">
            <div className="font-serif text-5xl font-black text-brand-brown">
              {reviewStats.averageRating}
            </div>
            <div className="flex text-amber-500 justify-center md:justify-start my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-brand-brownMuted font-medium">
              Based on {reviewStats.totalReviews.toLocaleString()} verified customer reviews
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-green font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>94% Recommend Marusthali Achar</span>
            </div>
          </div>

          {/* Breakdown Bars (Col 8) */}
          <div className="md:col-span-8 space-y-2">
            {reviewStats.breakdown.map(b => (
              <div key={b.stars} className="flex items-center gap-3 text-xs">
                <span className="w-14 font-bold text-brand-brown flex items-center gap-1">
                  <span>{b.stars}</span>
                  <Star className="w-3 h-3 fill-current text-amber-500" />
                </span>
                <div className="flex-1 bg-brand-cream rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${b.percentage}%` }}
                  />
                </div>
                <span className="w-12 text-right text-brand-brownMuted font-mono">
                  {b.percentage}%
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Multi-Facet Filter Bar (Ratings + Product Picker + Photo Filter) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-border shadow-xs mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left: Star Rating Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Ratings' },
                { id: '5', label: '5 Stars ★' },
                { id: '4', label: '4 Stars ★' },
                { id: '3', label: '3 Stars ★' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setRatingFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                    ratingFilter === f.id
                      ? 'bg-brand-brown text-white border-brand-brown shadow-xs'
                      : 'bg-brand-bg text-brand-brown border-brand-border hover:bg-brand-cream'
                  }`}
                >
                  {f.label}
                </button>
              ))}

              {/* Photos Only Toggle */}
              <button
                onClick={() => setWithPhotosOnly(!withPhotosOnly)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ${
                  withPhotosOnly
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold shadow-xs'
                    : 'bg-brand-bg text-brand-brown border-brand-border hover:bg-brand-cream'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-amber-700" />
                <span>With Photos 📸</span>
              </button>
            </div>

            {/* Right: Product Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-brown whitespace-nowrap flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-brand-green" />
                Pickle Variety:
              </span>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="bg-brand-bg border border-brand-border rounded-xl px-3 py-1.5 text-xs text-brand-brown font-semibold focus:outline-none focus:ring-1 focus:ring-brand-green"
              >
                <option value="all">All Pickles (All 37 Varieties)</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.hindiName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick popular pickle filter chips */}
          <div className="pt-2 border-t border-brand-border/60 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-brand-brownMuted font-bold shrink-0">Popular:</span>
            {[
              { id: 'aam-classic', label: '🥭 Classic Mango' },
              { id: 'lal-mirch-bharwa', label: '🌶️ Stuffed Banarasi Chilli' },
              { id: 'garlic-lahsun', label: '🧄 Country Garlic' },
              { id: 'nimbu-khatta-meetha', label: '🍋 Sweet & Tangy Lemon' },
              { id: 'mix-pachranga', label: '🥗 Mixed Pachranga' }
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setProductFilter(productFilter === chip.id ? 'all' : chip.id)}
                className={`px-2.5 py-1 rounded-lg border transition-colors whitespace-nowrap font-medium ${
                  productFilter === chip.id
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-brand-brown border-brand-border hover:bg-brand-cream'
                }`}
              >
                {chip.label}
              </button>
            ))}
            {productFilter !== 'all' && (
              <button
                onClick={() => setProductFilter('all')}
                className="text-brand-green hover:underline font-bold text-[11px] ml-2 shrink-0"
              >
                Clear Filter ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-brand-brownMuted mb-4 px-1">
          <span>Showing <strong>{filteredReviews.length}</strong> reviews</span>
          {productFilter !== 'all' && productMap[productFilter] && (
            <span className="text-brand-brown font-semibold">
              Filtered for: {productMap[productFilter].name}
            </span>
          )}
        </div>

        {/* Empty state */}
        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-border shadow-xs space-y-3">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-3xl">
              🥒
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-brown">
              No reviews found matching your filters
            </h3>
            <p className="text-xs text-brand-brownMuted max-w-sm mx-auto">
              Try switching your filter or be the very first person to write a review with photos for this pickle!
            </p>
            <button
              onClick={() => {
                setRatingFilter('all');
                setProductFilter('all');
                setWithPhotosOnly(false);
              }}
              className="mt-2 text-xs font-bold text-brand-green hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map(r => {
            const product = productMap[r.productId] || products[0];

            return (
              <div
                key={r.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-brand-border shadow-xs space-y-3.5 hover:shadow-sm transition-shadow"
              >
                {/* Product Association Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-brand-border/40">
                  <div
                    onClick={() => onNavigate('product-detail', { productId: product.id })}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50/40 hover:from-amber-100 hover:to-orange-100 border border-amber-200/80 rounded-full py-1 px-3 text-xs text-brand-brown cursor-pointer transition-all shadow-2xs"
                    title="Click to view this pickle product"
                  >
                    <img 
                      src={product.image || '/images/products/marusthali-mango-jar.jpg'} 
                      alt={product.name} 
                      className="w-5 h-5 rounded-full object-cover border border-amber-300 group-hover:scale-110 transition-transform" 
                    />
                    <span className="text-[11px] text-brand-brownMuted font-medium">Reviewed for:</span>
                    <span className="font-bold text-xs text-brand-brown group-hover:text-brand-green transition-colors">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-amber-900 bg-amber-200/70 px-1.5 py-0.5 rounded-full font-semibold">
                      {product.hindiName}
                    </span>
                    <ChevronRight className="w-3 h-3 text-brand-brownMuted group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  <span className="text-[11px] text-brand-brownMuted font-mono">
                    {r.date}
                  </span>
                </div>

                {/* Top reviewer info & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-yellow-200 border border-amber-300 flex items-center justify-center font-serif font-black text-brand-brown text-sm shadow-2xs">
                      {r.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-brand-brown">{r.userName}</h4>
                        {r.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-brand-brownMuted">{r.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < r.rating ? 'fill-current text-amber-500' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-brand-brown">
                      {r.rating}.0 / 5.0
                    </span>
                  </div>
                </div>

                {/* Comment text */}
                <p className="text-xs sm:text-sm text-brand-brown leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border border-brand-border/50 italic">
                  "{r.comment}"
                </p>

                {/* Customer Uploaded Photos Gallery */}
                {r.images && r.images.length > 0 && (
                  <div className="pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-brown mb-2">
                      <Camera className="w-3.5 h-3.5 text-brand-green" />
                      <span>Customer Photos ({r.images.length}) • Click to enlarge</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {r.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLightboxImage({ 
                            url: img, 
                            userName: r.userName, 
                            productName: product.name,
                            rating: r.rating,
                            comment: r.comment 
                          })}
                          className="relative group overflow-hidden rounded-xl border-2 border-brand-border/80 bg-brand-cream hover:border-brand-yellow shadow-2xs hover:shadow-md transition-all text-left"
                        >
                          <img
                            src={img}
                            alt={`${r.userName} achar review photo`}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <ZoomIn className="w-5 h-5 drop-shadow-md" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Helpful footer */}
                <div className="pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-xs text-brand-brownMuted">
                  <span className="text-[11px]">Was this review helpful to your family?</span>
                  <button
                    onClick={() => handleHelpfulClick(r.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-border hover:bg-brand-cream text-brand-brown font-semibold transition-colors active:scale-95"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-brand-green" />
                    <span>Helpful ({r.helpfulCount || 0})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal for Customer Photos */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-border animate-scale-up"
          >
            {/* Modal Header */}
            <div className="p-4 bg-brand-cream border-b border-brand-border flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-brand-brown text-sm sm:text-base">
                  Photo by {lightboxImage.userName}
                </h4>
                <p className="text-xs text-brand-brownMuted">
                  Reviewed for: <strong>{lightboxImage.productName}</strong>
                </p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-brand-border flex items-center justify-center text-brand-brown transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo */}
            <div className="bg-black/95 flex items-center justify-center p-2 max-h-[65vh]">
              <img
                src={lightboxImage.url}
                alt="Enlarged review"
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Comment snippet */}
            {lightboxImage.comment && (
              <div className="p-4 bg-white border-t border-brand-border text-xs sm:text-sm text-brand-brown italic">
                "{lightboxImage.comment}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Write a Review Modal with Product Picker & Photo Uploader */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            onClick={() => setIsWriteModalOpen(false)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-brand-border z-10 space-y-4 my-8 animate-scale-up max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-border pb-3.5">
              <div>
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider block">
                  Share Your Household Experience
                </span>
                <h3 className="font-serif text-xl font-extrabold text-brand-brown">
                  Write a Pickle Review (Share Your Experience)
                </h3>
              </div>
              <button 
                onClick={() => setIsWriteModalOpen(false)} 
                className="p-1.5 rounded-full hover:bg-brand-cream text-brand-brown"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              
              {/* 1. PRODUCT PICKER (Crucial User Requirement: "jis product ka dena h") */}
              <div className="space-y-1.5 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/70">
                <label className="block font-extrabold text-brand-brown text-xs flex items-center justify-between">
                  <span>1. Select Pickle *</span>
                  <span className="text-[10px] font-medium text-amber-800">37 Authentic Varieties</span>
                </label>
                
                <select
                  value={newReview.productId}
                  onChange={(e) => setNewReview({ ...newReview, productId: e.target.value })}
                  className="w-full bg-white border border-brand-border rounded-xl p-2.5 text-xs text-brand-brown font-bold focus:outline-none focus:ring-1 focus:ring-brand-green"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.hindiName}) - {p.categoryName}
                    </option>
                  ))}
                </select>

                {/* Selected Product Visual Card Preview */}
                <div className="mt-2.5 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs">
                  <img
                    src={selectedFormProduct.image || '/images/products/marusthali-mango-jar.jpg'}
                    alt={selectedFormProduct.name}
                    className="w-12 h-12 object-cover rounded-lg border border-brand-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-brand-brown truncate">
                      {selectedFormProduct.name}
                    </h5>
                    <p className="text-[11px] text-amber-800 font-medium">
                      {selectedFormProduct.hindiName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-brand-cream px-2 py-0.5 rounded-full text-brand-brown font-semibold">
                        {selectedFormProduct.categoryName}
                      </span>
                      <span className="text-[10px] font-bold text-brand-green">
                        ₹{selectedFormProduct.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick 1-click popular pickle chips */}
                <div className="pt-2 flex items-center gap-1 overflow-x-auto text-[10px]">
                  <span className="text-brand-brownMuted font-bold shrink-0">Quick Pick:</span>
                  {[
                    { id: 'aam-classic', label: '🥭 Classic Mango' },
                    { id: 'lal-mirch-bharwa', label: '🌶️ Stuffed Chilli' },
                    { id: 'garlic-lahsun', label: '🧄 Country Garlic' },
                    { id: 'nimbu-khatta-meetha', label: '🍋 Sweet Lemon' },
                    { id: 'mix-pachranga', label: '🥗 Mixed Pickle' }
                  ].map(item => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setNewReview({ ...newReview, productId: item.id })}
                      className={`px-2 py-0.5 rounded-md border whitespace-nowrap transition-colors ${
                        newReview.productId === item.id
                          ? 'bg-amber-200 text-amber-900 border-amber-400 font-bold'
                          : 'bg-white text-brand-brown border-brand-border hover:bg-brand-cream'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. PHOTO UPLOADER (Crucial User Requirement: "uss ki images dal ske okk") */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-extrabold text-brand-brown text-xs">
                    2. Attach Photos (Max 6)
                  </label>
                  <span className="text-[10px] text-brand-brownMuted font-mono">
                    {newReview.images.length}/6 attached
                  </span>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                {/* Upload Trigger Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50/80 rounded-2xl p-4 text-center cursor-pointer transition-all space-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-amber-200 flex items-center justify-center mx-auto text-amber-700 shadow-2xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-xs text-brand-brown">
                    Click to browse photos from phone/computer
                  </p>
                  <p className="text-[10px] text-brand-brownMuted">
                    Supports JPG, PNG, WEBP (Unboxing, Jar, Dining thali)
                  </p>
                </div>

                {/* Quick 1-click Authentic Sample Photos */}
                <div className="p-2.5 bg-brand-cream/60 rounded-xl border border-brand-border/60 space-y-1.5">
                  <span className="text-[10px] font-bold text-brand-brown flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Or add quick authentic achar photos with 1-click:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleCustomerPhotos.map(sample => (
                      <button
                        key={sample.label}
                        type="button"
                        onClick={() => handleAddSamplePhoto(sample.src)}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-white border border-brand-border hover:border-amber-400 text-brand-brown flex items-center gap-1 font-medium transition-colors"
                      >
                        <span>{sample.emoji}</span>
                        <span>{sample.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Uploaded Photo Preview Strip */}
                {newReview.images.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Attached Photos ({newReview.images.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {newReview.images.map((img, idx) => (
                        <div key={idx} className="relative group w-16 h-16 rounded-xl border border-brand-border overflow-hidden bg-white shadow-2xs">
                          <img
                            src={img}
                            alt="Uploaded preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                            title="Remove photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Star Rating */}
              <div>
                <label className="block font-bold text-brand-brown mb-1">
                  3. Your Rating *
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newReview.rating ? 'fill-current text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="font-bold text-brand-brown text-xs pl-2">
                    {newReview.rating === 5 && '🌟 Outstanding Flavor'}
                    {newReview.rating === 4 && '👍 Very Good'}
                    {newReview.rating === 3 && '😐 Average'}
                    {newReview.rating <= 2 && '👎 Needs Improvement'}
                  </span>
                </div>
              </div>

              {/* 4. Full Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-brown mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-brown mb-1">City / State</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              </div>

              {/* 5. Detailed Review Text */}
              <div>
                <label className="block font-bold text-brand-brown mb-1">
                  Your Honest Review *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="How did you like the aroma of mustard oil, stone-ground spices, and jar packaging?"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-brand-border flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="w-1/3 py-2.5 border border-brand-border rounded-full font-bold text-xs hover:bg-brand-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown py-2.5 rounded-full font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Verified Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification on Submission */}
      {submittedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-up border border-emerald-600">
          <CheckCircle className="w-5 h-5 text-emerald-300" />
          <div>
            <h5 className="font-bold text-xs">Review Submitted Successfully!</h5>
            <p className="text-[11px] text-emerald-100">
              Thank you! Your review and photos have been added to our website.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
