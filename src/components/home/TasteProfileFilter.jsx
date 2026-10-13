import React, { useState } from 'react';
import { Flame, Sparkles, Heart, ShoppingBag, Eye, Star, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const TasteProfileFilter = ({ onNavigate, onQuickView }) => {
  const { addToCart } = useCart();
  const [activeTaste, setActiveTaste] = useState('spicy');
  const [addedToast, setAddedToast] = useState(null);

  const TASTE_PROFILES = [
    {
      id: 'spicy',
      title: 'Spicy & Fiery',
      hindi: 'Fiery & Spiced',
      emoji: '🌶️',
      desc: 'Bold Banarasi spices, sun-cured red chillies, and sharp cold-pressed mustard punch.',
      meter: { tanginess: 65, spice: 95, crunch: 85, aroma: 98 },
      productIds: ['lal-mirch-bharwa', 'garlic-lahsun', 'green-mirch-classic', 'chatpata-aam']
    },
    {
      id: 'tangy',
      title: 'Tangy & Zesty',
      hindi: 'Tangy & Zesty',
      emoji: '🍋',
      desc: 'Sour Ramkela green mangoes and Kagzi lemons soaked in yellow mustard and rock salt.',
      meter: { tanginess: 95, spice: 60, crunch: 90, aroma: 85 },
      productIds: ['aam-classic', 'kairi-aam', 'rajasthani-aam', 'hari-mirch-rai']
    },
    {
      id: 'sweet-sour',
      title: 'Sweet & Tangy',
      hindi: 'Sweet & Tangy',
      emoji: '🍯',
      desc: 'Natural raw organic jaggery & dates gently cooked with lemon and mango shreds.',
      meter: { tanginess: 75, spice: 30, crunch: 80, aroma: 80 },
      productIds: ['nimbu-khatta-meetha', 'meethi-aam', 'nimbu-meetha', 'holi-chatpata-duo']
    },
    {
      id: 'digestive',
      title: 'Herbal & Digestive',
      hindi: 'Digestive & Mild',
      emoji: '🌿',
      desc: 'Infused with pure compounded asafoetida (hing), roasted carom seeds & fenugreek. Perfect with every meal.',
      meter: { tanginess: 70, spice: 45, crunch: 80, aroma: 92 },
      productIds: ['gunda-lesua-achar', 'methi-aam', 'nimbu-masaledar', 'mix-pachranga']
    }
  ];

  const currentProfile = TASTE_PROFILES.find(t => t.id === activeTaste) || TASTE_PROFILES[0];
  const profileProducts = currentProfile.productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  const handleQuickAdd = (product) => {
    addToCart(product, product.packSizes?.[1]?.size || product.packSizes?.[0]?.size || '500 g', 1);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-brand-yellow/30 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Shop by Family Palate • Discover by Taste</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown tracking-tight">
              Flavour Matrix: Discover by Taste
            </h2>
            <p className="text-xs sm:text-sm text-brand-brownMuted mt-1">
              Select your family’s preferred spice and tanginess profile
            </p>
          </div>

          <button
            onClick={() => onNavigate('all-products')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-green hover:underline self-start md:self-auto"
          >
            <span>Explore All 28 Varieties</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Flavour Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TASTE_PROFILES.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTaste(t.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                activeTaste === t.id
                  ? 'border-brand-brown bg-gradient-to-br from-[#2D1810] to-[#43251A] text-white shadow-md transform -translate-y-0.5'
                  : 'border-brand-border bg-white text-brand-brown hover:border-amber-400 hover:bg-amber-50/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{t.emoji}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeTaste === t.id ? 'bg-amber-400 text-brand-brown' : 'bg-brand-cream text-brand-brownMuted'
                }`}>
                  {t.hindi}
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base">
                {t.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Flavour Meter Info Card */}
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 md:max-w-md">
            <h5 className="font-serif font-bold text-sm text-brand-brown flex items-center gap-2">
              <span>{currentProfile.emoji} {currentProfile.title} ({currentProfile.hindi})</span>
            </h5>
            <p className="text-xs text-brand-brownMuted leading-relaxed">
              {currentProfile.desc}
            </p>
          </div>

          {/* Sensory Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-brand-brown mb-1">
                <span>Spice Level</span>
                <span>{currentProfile.meter.spice}%</span>
              </div>
              <div className="w-full bg-brand-cream rounded-full h-2 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${currentProfile.meter.spice}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-brand-brown mb-1">
                <span>Tanginess</span>
                <span>{currentProfile.meter.tanginess}%</span>
              </div>
              <div className="w-full bg-brand-cream rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${currentProfile.meter.tanginess}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-brand-brown mb-1">
                <span>Texture & Crunch</span>
                <span>{currentProfile.meter.crunch}%</span>
              </div>
              <div className="w-full bg-brand-cream rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${currentProfile.meter.crunch}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-brand-brown mb-1">
                <span>Aroma & Fragrance</span>
                <span>{currentProfile.meter.aroma}%</span>
              </div>
              <div className="w-full bg-brand-cream rounded-full h-2 overflow-hidden">
                <div className="bg-amber-700 h-full rounded-full transition-all duration-500" style={{ width: `${currentProfile.meter.aroma}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Filtered Pickles Cards (4 in a row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileProducts.map(p => (
            <div 
              key={p.id}
              className="bg-white rounded-3xl border border-brand-border p-4 hover:shadow-warm transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div 
                  onClick={() => onNavigate('product-detail', { productId: p.id })}
                  className="cursor-pointer relative overflow-hidden rounded-2xl bg-brand-cream aspect-square mb-3 border border-brand-border/60"
                >
                  <img
                    src={p.image || '/images/products/marusthali-mango-jar.jpg'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#2D1810] text-amber-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
                    {p.spiceLevel || 'Authentic'}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-brand-brown">{p.rating}</span>
                    <span className="text-brand-brownMuted font-mono">({p.reviewCount})</span>
                  </div>

                  <h4 
                    onClick={() => onNavigate('product-detail', { productId: p.id })}
                    className="font-serif font-bold text-sm sm:text-base text-brand-brown hover:text-brand-green cursor-pointer truncate"
                  >
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-amber-900 font-medium">
                    {p.hindiName}
                  </p>
                </div>
              </div>

              {/* Price & Add */}
              <div className="pt-3 border-t border-brand-border/60 mt-3 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-sm text-brand-brown">₹{p.price}</span>
                  <span className="text-[10px] text-brand-brownMuted line-through ml-1.5">₹{p.mrp}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onQuickView(p)}
                    className="p-2 rounded-full border border-brand-border hover:bg-brand-cream text-brand-brown transition-colors"
                    title="Quick preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-xs px-3.5 py-2 rounded-full shadow-2xs flex items-center gap-1 transition-transform active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Added to cart toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-600 animate-slide-up text-xs font-bold">
          <span>✓ Added "{addedToast}" to your thali!</span>
        </div>
      )}
    </section>
  );
};
