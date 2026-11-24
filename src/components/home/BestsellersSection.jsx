import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles, Filter } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { products } from '../../data/products';

export const BestsellersSection = ({ onNavigate, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Bestsellers' },
    { id: 'mango', label: 'Mango' },
    { id: 'mirchi', label: 'Red & Green Chilli' },
    { id: 'garlic', label: 'Garlic' },
    { id: 'lemon', label: 'Lemon' }
  ];

  const filteredProducts = products.filter(p => {
    const isBest = p.isBestseller || p.badge === 'Bestseller' || p.rating >= 4.7;
    if (activeCategory === 'all') return isBest;
    if (activeCategory === 'mirchi') return isBest && (p.category === 'red-mirch' || p.category === 'green-mirch');
    if (activeCategory === 'lemon') return isBest && p.category === 'nimbu';
    return isBest && p.category === activeCategory;
  }).slice(0, 8);

  return (
    <section id="bestsellers" className="py-14 sm:py-20 bg-transparent border-b border-brand-yellow/30 relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-950 uppercase tracking-wider mb-2.5 bg-gradient-to-r from-[#FDE68A] via-[#F5D096] to-[#FDE68A] border border-[#D97706]/60 w-fit px-4 py-1.5 rounded-full shadow-2xs">
              <Flame className="w-4 h-4 text-amber-700 fill-current" />
              <span>Customer Favorites • Thar Desert Sun-Cured</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-brown tracking-tight">
              Thar Desert <span className="text-[#9C4E15]">Bestselling Pickles</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#5A493F] mt-2 font-semibold">
              Sun-cured on Rajasthan dunes and loved by over 10,000+ households across India.
            </p>
          </div>

          <button
            onClick={() => onNavigate('all-products')}
            className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-black text-[#9C4E15] hover:text-[#B45309] hover:underline self-start md:self-auto"
          >
            <span>See All 37 Pickles</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border whitespace-nowrap shadow-2xs cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-gradient-to-r from-[#9C4E15] to-[#B45309] text-[#FDE68A] border-[#D97706] shadow-sm'
                  : 'bg-[#FFFDF9]/92 backdrop-blur-xs text-[#4A2D19] border-[#DFC4A2] hover:bg-[#FDF6E8] hover:border-[#D97706]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => onNavigate('all-products')}
            className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellowHover border border-brand-yellow text-brand-brown font-extrabold text-xs rounded-2xl shadow-xs"
          >
            View All 37 Products →
          </button>
        </div>

      </div>
    </section>
  );
};
