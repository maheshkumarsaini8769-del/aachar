import React, { useState, useMemo } from 'react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { CategoryHero } from '../components/category/CategoryHero';
import { ProductCard } from '../components/product/ProductCard';

export const CategoryPage = ({ categoryId = 'mango', onNavigate, onQuickView }) => {
  const currentCategory = categories.find(c => c.id === categoryId) || categories[1];
  const [sortBy, setSortBy] = useState('popularity');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);

  const quickPriceRanges = [
    { label: 'All Prices', min: 0, max: 1500 },
    { label: '₹100 – ₹200', min: 100, max: 200 },
    { label: '₹100 – ₹300', min: 100, max: 300 },
    { label: '₹200 – ₹300', min: 200, max: 300 },
    { label: '₹300 – ₹500', min: 300, max: 500 },
    { label: '₹500 – ₹1500', min: 500, max: 1500 },
  ];

  // Filter products by this category and price range
  const categoryProducts = useMemo(() => {
    let prods = [];
    if (currentCategory.id === 'jain') {
      prods = products.filter(p => 
        p.category !== 'garlic' && 
        p.category !== 'festive' && 
        p.category !== 'mix' &&
        !p.id.includes('lahsun') && 
        !p.id.includes('lasun') && 
        !p.id.includes('adrak')
      );
    } else {
      prods = products.filter(p => p.category === currentCategory.id);
    }

    // Apply Min-Max Price Filter
    prods = prods.filter(p => {
      const matchesBase = p.price >= minPrice && p.price <= maxPrice;
      const matchesPack = p.packSizes?.some(s => s.price >= minPrice && s.price <= maxPrice);
      return matchesBase || matchesPack;
    });

    if (sortBy === 'price-low') return [...prods].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return [...prods].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return [...prods].sort((a, b) => b.rating - a.rating);
    return prods;
  }, [currentCategory.id, sortBy, minPrice, maxPrice]);

  const isPriceFiltered = minPrice > 0 || maxPrice < 1500;

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Category Hero Banner */}
      <CategoryHero category={currentCategory} onNavigate={onNavigate} />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Special Jain Satvik Assurance Banner when on Jain Category */}
        {currentCategory.id === 'jain' && (
          <div className="mb-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white rounded-3xl p-5 sm:p-7 border-2 border-amber-400/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-[#2D1810] px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider">
                <span>🌿 100% Pure Jain & Satvik Guarantee</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-amber-100">
                Prepared in Separate Utensils • Strictly No Onion, No Garlic & Root-Free
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
                Every jar in our Jain Family Collection is sun-cured in dedicated ceramic barnis using pure Hathras Heeng, sendha namak, and cold-pressed mustard oil. You can also write custom spice/oil instructions on any jar!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 shrink-0 text-xs font-extrabold">
              <span className="bg-white/15 border border-white/25 px-3.5 py-2 rounded-xl text-amber-200">✓ Zero Garlic / Onion</span>
              <span className="bg-white/15 border border-white/25 px-3.5 py-2 rounded-xl text-amber-200">✓ Zero Root Veggies</span>
              <span className="bg-white/15 border border-white/25 px-3.5 py-2 rounded-xl text-amber-200">✓ Separate Satvik Barnis</span>
            </div>
          </div>
        )}

        {/* Top Bar: Count & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown">
              {currentCategory.name} Varieties
            </h2>
            <p className="text-xs text-brand-brownMuted">
              Showing {categoryProducts.length} authentic handcrafted options
              {isPriceFiltered && ` in ₹${minPrice} – ₹${maxPrice}`}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-brand-brown">
            <span className="hidden sm:inline text-brand-brownMuted">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-brand-border rounded-xl px-3 py-1.5 text-xs font-semibold text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-green shadow-xs"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick Price Range Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-brand-brown mr-1">
            💰 Price Range:
          </span>
          {quickPriceRanges.map((range) => {
            const isActive = minPrice === range.min && maxPrice === range.max;
            return (
              <button
                key={range.label}
                type="button"
                onClick={() => {
                  setMinPrice(range.min);
                  setMaxPrice(range.max);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E5631] text-white border-[#1E5631] shadow-xs'
                    : 'bg-white text-brand-brown border-brand-border hover:border-[#D97706] hover:bg-brand-cream'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {categoryProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
              activePriceRange={isPriceFiltered ? { min: minPrice, max: maxPrice } : null}
            />
          ))}
        </div>

        {/* Category Description & Heritage Box */}
        <div className="mt-14 bg-brand-cream/60 rounded-3xl p-6 sm:p-8 border border-brand-border">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
              Heritage Note
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-brown">
              About Marusthali Achar's {currentCategory.name}
            </h3>
            <p className="text-xs sm:text-sm text-brand-brownMuted leading-relaxed">
              {currentCategory.description} All ingredients are sourced from farmer cooperatives across Rajasthan, cleaned by hand, and seasoned with authentic stone-ground spices. Guaranteed 100% natural, zero chemical vinegar, and safely packed in premium food-grade glass jars.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
