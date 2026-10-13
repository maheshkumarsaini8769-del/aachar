import React, { useState } from 'react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ArrowRight, ChevronLeft, Sparkles, Layers, ShieldCheck, Check } from 'lucide-react';

export const AllCategoriesPage = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter out the 'all' pseudo-category, keep only real categories
  const realCategories = categories.filter(c => c.id !== 'all');

  // Add Combo Builder as a featured category card
  const allCategoryCards = [
    ...realCategories,
    {
      id: 'combo-builder',
      slug: 'combo-builder',
      name: 'Custom Gift Combos',
      hindiName: 'Handpick 2, 3 or 4 Flavours',
      shortName: 'Gift Boxes',
      count: 4,
      image: '/images/products/combo-3pack-heritage.jpg',
      bannerImage: '/images/banners/combo-signature-box-hero.jpg',
      description: 'Design your personalized heirloom gift box with customized jar selection, handwritten greeting card, and luxury festive packaging.',
      heroTag: 'Custom Curated',
      accentColor: '#B45309',
      isCustomCombo: true
    }
  ];

  // Featured Jain Family products for the highlighted section
  const jainSpotlightProducts = products.filter(p => 
    ['heeng-kachha-aam', 'ker-sangri-achar', 'methi-dana-rajasthani', 'aam-classic'].includes(p.id)
  );

  const jainFriendlyCategoryIds = ['jain', 'mango', 'nimbu', 'methi', 'heritage', 'red-mirch'];

  const filteredCategories = selectedFilter === 'all'
    ? allCategoryCards
    : selectedFilter === 'jain'
      ? allCategoryCards.filter(c => jainFriendlyCategoryIds.includes(c.id))
      : selectedFilter === 'pickles'
        ? allCategoryCards.filter(c => c.id !== 'festive' && c.id !== 'combo-builder')
        : selectedFilter === 'gifts'
          ? allCategoryCards.filter(c => c.id === 'festive' || c.id === 'combo-builder')
          : allCategoryCards;

  const handleCardClick = (cat) => {
    if (cat.isCustomCombo || cat.id === 'combo-builder') {
      onNavigate('combo-builder');
    } else if (cat.id === 'festive') {
      onNavigate('festive');
    } else {
      onNavigate('category', { categoryId: cat.id });
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-6 sm:py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E8DDCD]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7E72]">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 text-[#2D1810] hover:text-[#D97706] font-bold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <span className="text-[#D97706] font-bold">All Categories</span>
          </div>

          <button
            onClick={() => onNavigate('all-products')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#2D1810] hover:text-[#D97706] bg-[#FAF5EC] px-3.5 py-1.5 rounded-full border border-[#E8DDCD] transition-colors cursor-pointer"
          >
            <span>Browse All 37 Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Complete Heritage Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1810] leading-tight mb-3">
            All Achar <span className="text-[#D97706]">Categories</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#5A493F] leading-relaxed">
            Every pickle handcrafted in small batches by rural women artisans of Marusthali, sun-ripened in pure mustard oil with zero artificial preservatives.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#2D1810] text-amber-50 shadow-sm'
                  : 'bg-white text-[#5A493F] border border-[#E8DDCD] hover:border-amber-400'
              }`}
            >
              All Categories ({allCategoryCards.length})
            </button>
            <button
              onClick={() => setSelectedFilter('jain')}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                selectedFilter === 'jain'
                  ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-400/50'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <span>🌿 Jain Family Special ({jainFriendlyCategoryIds.length})</span>
            </button>
            <button
              onClick={() => setSelectedFilter('pickles')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'pickles'
                  ? 'bg-[#2D1810] text-amber-50 shadow-sm'
                  : 'bg-white text-[#5A493F] border border-[#E8DDCD] hover:border-amber-400'
              }`}
            >
              Traditional Pickles ({allCategoryCards.filter(c => c.id !== 'festive' && c.id !== 'combo-builder').length})
            </button>
            <button
              onClick={() => setSelectedFilter('gifts')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'gifts'
                  ? 'bg-[#2D1810] text-amber-50 shadow-sm'
                  : 'bg-white text-[#5A493F] border border-[#E8DDCD] hover:border-amber-400'
              }`}
            >
              Gift Sets & Combos ({allCategoryCards.filter(c => c.id === 'festive' || c.id === 'combo-builder').length})
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* HIGHLIGHTED SECTION: JAIN FAMILY SPECIAL (NO ONION • NO GARLIC) */}
        {/* ===================================================================== */}
        <div className="mb-10 sm:mb-14 rounded-3xl bg-gradient-to-br from-[#ECFDF5] via-[#FAF6EE] to-[#FEF3C7]/60 border-2 border-emerald-600/50 shadow-lg p-5 sm:p-8 relative overflow-hidden">
          
          {/* Top Highlight Ribbon & Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-emerald-800/15">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-800 text-amber-200 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs">
                <span>🌿 Jain Family Special • 100% Pure Satvik Kitchen</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#2D1810] leading-tight">
                Pure Jain & Satvik Pickles <span className="text-emerald-800">(No Onion • No Garlic)</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#5A493F] leading-relaxed">
                Prepared in strictly separate Satvik ceramic barnis using pure Hathras Heeng, sendha namak, and cold-pressed mustard oil — 100% free from garlic, onion, and root vegetables. You can also write custom instructions for less oil, less salt, or extra hing!
              </p>

              {/* Satvik Trust Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-extrabold text-emerald-900">
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  Zero Garlic & Onion
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  100% Root-Free Satvik
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  Separate Utensils & Barnis
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
                  ✨ Custom Spice/Oil Note Available
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onNavigate('category', { categoryId: 'jain' })}
                className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore All Jain Pickles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Spotlight Jain Family Pickles Grid */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                Most Loved by Jain Families:
              </span>
              <span className="text-[11px] font-bold text-[#7A695B]">
                Click any jar to customize & order
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {jainSpotlightProducts.map(item => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('product-detail', { productId: item.id })}
                  className="bg-white rounded-2xl p-3 border border-emerald-200 hover:border-emerald-600 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-amber-50 mb-2.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        🌿 Pure Jain
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2D1810] group-hover:text-emerald-800 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#7A695B] line-clamp-1 mt-0.5">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
                    <span className="text-xs sm:text-sm font-black text-emerald-800">
                      ₹{item.price}
                    </span>
                    <span className="text-[10px] font-extrabold text-[#D97706] group-hover:underline">
                      Customize →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Visual Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat)}
              className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col ${
                cat.isJainSpecial
                  ? 'border-2 border-emerald-600 ring-2 ring-emerald-400/30'
                  : 'border border-[#E8DDCD]'
              }`}
            >
              {/* Category Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-amber-50">
                <img
                  src={cat.bannerImage || cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Circular Inset Roundel Badge */}
                <div className="absolute top-3.5 left-3.5 w-13 h-13 rounded-full aspect-square overflow-hidden border-2 border-white shadow-md bg-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Variety Count Tag */}
                <span className={`absolute top-3.5 right-3.5 backdrop-blur-md text-[11px] font-black px-3 py-1 rounded-full border ${
                  cat.isJainSpecial
                    ? 'bg-emerald-800/90 text-amber-200 border-emerald-400/40'
                    : 'bg-black/65 text-amber-200 border-white/20'
                }`}>
                  {cat.isJainSpecial ? '🌿 Pure Satvik • ' : ''}{cat.count} {cat.count === 1 ? 'Variety' : 'Varieties'}
                </span>

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {cat.heroTag || cat.hindiName}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-black leading-tight text-white drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Category Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <p className="text-xs font-semibold text-[#5A493F] leading-relaxed line-clamp-2 mb-4">
                    {cat.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-bold text-[#8C7E72] mb-4">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D97706]" />
                      {cat.isJainSpecial ? 'No Onion No Garlic' : '100% Homemade'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Zero Chemicals
                    </span>
                  </div>
                </div>

                {/* Action CTA Row */}
                <div className="pt-3 border-t border-[#F0E8DC] flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2D1810] group-hover:text-[#D97706] transition-colors">
                    {cat.isCustomCombo ? 'Build Box Now' : cat.isJainSpecial ? 'Explore Pure Jain Pickles' : 'Explore All Varieties'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EC] group-hover:bg-[#F5A623] text-[#2D1810] flex items-center justify-center transition-all group-hover:translate-x-1 shadow-2xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Custom Combo Box CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#2D1810] to-[#432314] rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-amber-900/40">
          <div className="max-w-xl text-center sm:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              ✨ Cannot Decide On One Flavour?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black mt-1 mb-2 text-white">
              Build Your Own Custom Achar Combo Box
            </h2>
            <p className="text-xs sm:text-sm text-[#F5EDE4]/80 font-medium leading-relaxed">
              Mix and match any 2, 3, or 4 flavours into our carved keepsake gift box with flat 15% bundle savings and complimentary handwritten greeting.
            </p>
          </div>

          <button
            onClick={() => onNavigate('combo-builder')}
            className="bg-[#F5A623] hover:bg-[#E09415] text-[#2D1810] font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Build Custom Combo Box →
          </button>
        </div>

      </div>
    </div>
  );
};

export default AllCategoriesPage;
