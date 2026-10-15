import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Share2, 
  Check, 
  Sparkles,
  ArrowRight,
  PenTool,
  Camera,
  CheckCircle,
  Tag
} from 'lucide-react';
import { products } from '../data/products';
import { initialReviews, reviewStats } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { DeliveryEstimator } from '../components/product/DeliveryEstimator';
import { ProductCard } from '../components/product/ProductCard';
import { ProductTrustBadges } from '../components/product/ProductTrustBadges';

export const ProductDetailPage = ({ productId: propProductId, onNavigate, onQuickView }) => {
  const { productId: paramProductId } = useParams();
  const productId = propProductId || paramProductId || 'aam-classic';
  const product = products.find(p => p.id === productId || p.slug === productId) || products[0];

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [packagingMode, setPackagingMode] = useState('jar'); // 'jar' or 'box'
  const [selectedBoxType, setSelectedBoxType] = useState(() => {
    return product.boxPricing && product.boxPricing.length > 0
      ? product.boxPricing[0].boxType
      : null;
  });

  const [selectedSize, setSelectedSize] = useState(() => {
    return product.packSizes && product.packSizes.length > 0 
      ? product.packSizes[1]?.size || product.packSizes[0].size 
      : '500 g';
  });

  const [selectedSpice, setSelectedSpice] = useState(() => {
    if (product.spiceLevel === 'Mild' || product.spiceLevel === 'Low') return 'Low';
    if (product.spiceLevel === 'Spicy' || product.spiceLevel === 'High' || product.spiceLevel === 'Hot') return 'Spicy';
    return 'Medium';
  });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedCustomTags, setSelectedCustomTags] = useState([]);
  const [customNoteInput, setCustomNoteInput] = useState('');

  const customQuickOptions = [
    '🌿 Pure Jain (No Garlic)',
    '✨ + Extra Hing',
    '🫗 - Less Oil',
    '🧂 - Less Salt'
  ];

  const toggleCustomTag = (tag) => {
    setSelectedCustomTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Determine variant price based on packaging mode (jar vs box)
  const selectedBox = packagingMode === 'box' && Array.isArray(product.boxPricing) && product.boxPricing.length > 0
    ? (product.boxPricing.find(b => b.boxType === selectedBoxType) || product.boxPricing[0])
    : null;

  const currentVariant = selectedBox
    ? { price: selectedBox.price, mrp: selectedBox.mrp, size: selectedBox.boxType, isBox: true }
    : product.packSizes?.find(s => s.size === selectedSize) || {
        price: product.price,
        mrp: product.mrp
      };

  const getCombinedNote = () => {
    return [
      `Spice: ${selectedSpice}`,
      selectedBox ? `Box: ${selectedBox.boxType}` : null,
      ...selectedCustomTags,
      customNoteInput.trim()
    ].filter(Boolean).join(', ');
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity, getCombinedNote(), selectedBox);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const { isLoggedIn, openAuthModal } = useAuth();

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity, getCombinedNote(), selectedBox);
    if (!isLoggedIn) {
      openAuthModal(() => {
        onNavigate('checkout');
      });
    } else {
      onNavigate('checkout');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('category', { categoryId: product.category })} className="hover:text-brand-green">
            {product.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Section: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Left Gallery (Col 6) */}
          <div className="lg:col-span-6">
            <div className="sticky top-28 space-y-5">
              <ProductGallery
                images={product.gallery || [product.image]}
                productName={product.name}
                productId={product.id}
                onNavigate={onNavigate}
              />
              {/* Product Trust Badges under gallery on large screens */}
              <div className="hidden lg:block">
                <ProductTrustBadges />
              </div>
            </div>
          </div>

          {/* Right Product Buy Box (Col 6) */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-brand-yellow font-bold uppercase tracking-wider">
                  {product.categoryName} • {product.hindiName}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-full hover:bg-brand-cream text-brand-brownMuted transition-colors text-xs flex items-center gap-1"
                    title="Share product link"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedLink && <span className="text-[10px] text-brand-green font-bold">Copied!</span>}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-1.5 rounded-full border transition-colors ${
                      isFavorited ? 'bg-red-50 text-red-600 border-red-200' : 'border-brand-border text-brand-brown hover:bg-brand-cream'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-red-600' : ''}`} />
                  </button>
                </div>
              </div>

              <h1 className="font-serif text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand-brown tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2.5 sm:gap-3 mt-1.5 sm:mt-2">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-brand-brownMuted font-medium">
                  ({product.reviewCount} reviews)
                </span>
                <span className="text-brand-border">•</span>
                <span className="text-xs text-brand-green font-bold">
                  ✓ In Stock
                </span>
              </div>
            </div>

            {/* Pricing Area */}
            <div className="p-2.5 sm:p-4 bg-brand-cream/60 rounded-xl sm:rounded-2xl border border-brand-border flex items-baseline gap-2.5 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-brown">
                ₹{currentVariant.price}
              </span>
              {currentVariant.mrp && currentVariant.mrp > currentVariant.price && (
                <>
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    ₹{currentVariant.mrp}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 sm:px-2 py-0.5 rounded-md">
                    {product.discount || '17% OFF'}
                  </span>
                </>
              )}
              <span className="text-[10px] sm:text-[11px] text-brand-brownMuted ml-auto">
                Inclusive of all taxes
              </span>
            </div>

            {/* Minimal Luxury Coupons Strip */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[11px] font-bold text-[#78350F] flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#D97706]" />
                Offers:
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#E5D7C3] text-[10px]">
                <strong className="font-mono text-[#92400E]">DESI10</strong>
                <span className="text-stone-600">10% Off (₹300+)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#E5D7C3] text-[10px]">
                <strong className="font-mono text-[#92400E]">FESTIVE15</strong>
                <span className="text-stone-600">15% Off (₹500+)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px]">
                <strong className="font-mono text-emerald-800">FREESHIP</strong>
                <span className="text-emerald-700">Free Ship (₹299+)</span>
              </span>
            </div>

            {/* Packaging Presentation Mode (Single Jar vs Box Hampers) */}
            {product.boxPricing && product.boxPricing.length > 0 && (
              <div className="flex items-center gap-1.5 p-1 bg-[#FAF6EE] rounded-xl border border-[#E8DDCD] max-w-sm">
                <button
                  type="button"
                  onClick={() => setPackagingMode('jar')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    packagingMode === 'jar'
                      ? 'bg-[#B45309] text-white shadow-xs'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  Individual Jar
                </button>
                <button
                  type="button"
                  onClick={() => setPackagingMode('box')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    packagingMode === 'box'
                      ? 'bg-[#B45309] text-white shadow-xs'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  Gift &amp; Family Boxes
                </button>
              </div>
            )}

            {/* Pack Size Selector (When in Jar mode) */}
            {packagingMode === 'jar' && product.packSizes && product.packSizes.length > 0 && (
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-brand-brown uppercase tracking-wider">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                  {product.packSizes.map(variant => (
                    <button
                      key={variant.size}
                      type="button"
                      onClick={() => setSelectedSize(variant.size)}
                      className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        selectedSize === variant.size
                          ? 'border-brand-brown bg-brand-brown text-white shadow-sm'
                          : 'border-brand-border bg-white text-brand-brown hover:bg-brand-cream hover:border-brand-yellow'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{variant.size}</div>
                      <div className="text-[10px] sm:text-xs font-semibold mt-0.5 opacity-90">
                        ₹{variant.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Box Pricing Selector (When in Box mode) */}
            {packagingMode === 'box' && product.boxPricing && product.boxPricing.length > 0 && (
              <div className="space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-brand-brown uppercase tracking-wider">
                  Select Box Hamper Presentation:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.boxPricing.map(box => (
                    <button
                      key={box.boxType}
                      type="button"
                      onClick={() => setSelectedBoxType(box.boxType)}
                      className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        selectedBoxType === box.boxType
                          ? 'border-[#B45309] bg-amber-50/60 shadow-xs'
                          : 'border-[#E8DDCD] bg-white hover:bg-[#FAF6EE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#1F110B]">{box.boxType}</span>
                        <span className="font-black text-xs text-[#B45309]">₹{box.price}</span>
                      </div>
                      {box.description && (
                        <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{box.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spice Level Selector (Low / Medium / Spicy) */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-brand-brown uppercase tracking-wider">
                Choose Spice Level (Mirch / Masala):
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                {[
                  { id: 'Low', label: '🌿 Low', sub: 'Mild / Kam Mirch', activeClass: 'border-[#1E5631] bg-[#1E5631] text-white' },
                  { id: 'Medium', label: '🌶️ Medium', sub: 'Balanced Taste', activeClass: 'border-[#D97706] bg-[#D97706] text-white' },
                  { id: 'Spicy', label: '🔥 Spicy', sub: 'Extra Teekha', activeClass: 'border-red-700 bg-red-700 text-white' }
                ].map(sp => {
                  const isSelected = selectedSpice === sp.id;
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSelectedSpice(sp.id)}
                      className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? `${sp.activeClass} shadow-sm`
                          : 'border-brand-border bg-white text-brand-brown hover:bg-brand-cream hover:border-brand-yellow'
                      }`}
                    >
                      <div className="font-extrabold text-xs sm:text-sm">{sp.label}</div>
                      <div className={`text-[10px] sm:text-xs font-semibold mt-0.5 ${isSelected ? 'opacity-95' : 'text-brand-brownMuted'}`}>
                        {sp.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customize Ingredients (Add Extra / Reduce) */}
            <div className="bg-[#FAF6EE] p-3 sm:p-4 rounded-2xl border border-[#E8DDCD] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#2D1810] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Customize Taste (Add Extra / Less Ingredients):</span>
                </span>
                <span className="text-[10px] font-bold text-[#8C7E72] bg-white px-2 py-0.5 rounded-full border border-[#E8DDCD]">
                  Optional
                </span>
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
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-[#D97706] text-white border-[#D97706] shadow-xs'
                          : 'bg-white hover:bg-amber-50 text-[#2D1810] border-[#E8DDCD]'
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
                placeholder="Write any custom request (e.g., extra methi, less salt, less oil, no garlic)..."
                className="w-full bg-white border border-[#E8DDCD] rounded-xl px-3.5 py-2 text-xs text-[#2D1810] placeholder-[#8C7E72] font-medium focus:outline-none focus:ring-1 focus:ring-[#D97706]"
              />
            </div>

            {/* Quantity Selector & Action Buttons (Streamlined Compact Row on Mobile!) */}
            <div className="pt-1">
              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* Quantity */}
                <div className="flex items-center border-2 border-brand-border rounded-xl bg-white px-1 sm:px-2 py-0.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-brand-brown hover:bg-brand-cream text-sm"
                  >
                    -
                  </button>
                  <span className="px-1.5 sm:px-3 text-xs sm:text-sm font-extrabold text-brand-brown min-w-[20px] sm:min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-brand-brown hover:bg-brand-cream text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-xs sm:text-base py-2.5 sm:py-3.5 px-2.5 sm:px-6 rounded-xl sm:rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span className="truncate">{addedToast ? 'Added!' : 'Add to Cart'}</span>
                </button>

                {/* Buy Now Button Side-by-Side */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#2D1810] hover:bg-[#43251A] text-white font-extrabold text-xs sm:text-base py-2.5 sm:py-3.5 px-2.5 sm:px-6 rounded-xl sm:rounded-full shadow-sm flex items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <span className="truncate">Buy Now</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>

            {/* Pincode Delivery Estimator */}
            <DeliveryEstimator />

            {/* Bullet Points (Compact 2-Column Grid on Mobile) */}
            {product.bullets && (
              <div className="grid grid-cols-2 gap-1.5 pt-0.5 text-[11px] sm:text-xs text-brand-brown">
                {product.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-[#FAF7F0] p-1.5 rounded-lg">
                    <span className="text-brand-green font-bold text-xs shrink-0">✓</span>
                    <span className="truncate">{b}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile View: Product Trust Badges directly below Buy Box */}
            <div className="block lg:hidden pt-3">
              <ProductTrustBadges />
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Description, Ingredients, Nutrition, Reviews */}
        <div className="mt-8 border-t border-brand-border pt-8">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-brand-border space-x-6 overflow-x-auto">
            {[
              { id: 'description', label: 'Description' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'nutrition', label: 'Nutritional Info' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-brand-yellow text-brand-brown font-extrabold'
                    : 'border-transparent text-brand-brownMuted hover:text-brand-brown'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-6">
            
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-4 max-w-3xl text-sm text-brand-brown leading-relaxed">
                <p>{product.fullDesc || product.shortDesc}</p>
                <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border space-y-2 text-xs">
                  <h4 className="font-bold text-brand-brown uppercase">Storage & Shelf Life:</h4>
                  <p><strong>Shelf Life:</strong> {product.shelfLife || '12 Months'}</p>
                  <p><strong>Storage Instructions:</strong> {product.storage || 'Store in a cool dry place. Use dry spoon only.'}</p>
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div className="max-w-2xl space-y-3">
                <h4 className="font-serif font-bold text-base text-brand-brown">Authentic Ingredients:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-brown">
                  {product.ingredients?.map((ing, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-white border border-brand-border flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Tab */}
            {activeTab === 'nutrition' && product.nutrition && (
              <div className="max-w-md bg-white p-5 rounded-2xl border border-brand-border space-y-3">
                <div className="border-b border-brand-border pb-2">
                  <h4 className="font-serif font-bold text-base text-brand-brown">Nutritional Facts</h4>
                  <span className="text-xs text-brand-brownMuted">Serving size: {product.nutrition.servingSize}</span>
                </div>
                <div className="space-y-2 text-xs divide-y divide-brand-border/40">
                  <div className="flex justify-between pt-1"><span>Energy</span><strong>{product.nutrition.energy}</strong></div>
                  <div className="flex justify-between pt-1"><span>Protein</span><strong>{product.nutrition.protein}</strong></div>
                  <div className="flex justify-between pt-1"><span>Carbohydrates</span><strong>{product.nutrition.carbs}</strong></div>
                  <div className="flex justify-between pt-1"><span>Total Fat</span><strong>{product.nutrition.totalFat}</strong></div>
                  <div className="flex justify-between pt-1"><span>Sodium</span><strong>{product.nutrition.sodium}</strong></div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-brand-cream rounded-2xl border border-brand-border">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl font-extrabold text-brand-brown font-serif">{product.rating}</div>
                    <div className="flex text-amber-500 my-1 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-brand-brownMuted">Based on {product.reviewCount} verified reviews for {product.name}</div>
                  </div>

                  <button
                    onClick={() => onNavigate('reviews', { productId: product.id, openWriteModal: true })}
                    className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-xs transition-transform hover:scale-105"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Write a Review with Photos</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(initialReviews.filter(r => r.productId === product.id).length > 0 
                    ? initialReviews.filter(r => r.productId === product.id)
                    : initialReviews.slice(0, 4)
                  ).map(r => (
                    <div key={r.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-border space-y-2.5 shadow-2xs">
                      <div className="flex justify-between items-start text-xs">
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-brand-brown">
                            <span>{r.userName}</span>
                            {r.verified && (
                              <span className="inline-flex items-center text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">
                                <CheckCircle className="w-3 h-3 text-emerald-600 mr-0.5" /> Verified
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-brand-brownMuted">{r.location}</span>
                        </div>
                        <span className="text-brand-brownMuted text-[11px] font-mono">{r.date}</span>
                      </div>

                      <div className="flex text-amber-500">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <p className="text-xs text-brand-brown leading-relaxed italic bg-brand-bg/60 p-2.5 rounded-xl border border-brand-border/40">
                        "{r.comment}"
                      </p>

                      {/* Attached Customer Photos */}
                      {r.images && r.images.length > 0 && (
                        <div className="pt-1">
                          <div className="flex items-center gap-1 text-[10px] text-brand-brownMuted font-semibold mb-1">
                            <Camera className="w-3 h-3 text-brand-green" />
                            <span>Customer Photos:</span>
                          </div>
                          <div className="flex gap-2">
                            {r.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="Customer review photo"
                                className="w-14 h-14 object-cover rounded-xl border border-brand-border"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* You May Also Like / Related Pickles */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-brand-border">
            <h3 className="font-serif text-2xl font-bold text-brand-brown mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
