import React from 'react';
import { ChevronRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

export const CategoryHero = ({ category, onNavigate }) => {
  return (
    <div className="relative bg-[#FAF6EE] border-b border-[#E5D9C5] overflow-hidden min-h-[250px] sm:min-h-[290px] md:min-h-[320px] flex items-center">
      
      {/* Background Banner with Strong Left Overlay for Maximum Text Readability */}
      <div className="absolute inset-0 z-0">
        <img
          src={category.bannerImage || '/images/banners/hero-master-banner.jpg'}
          alt={category.name}
          className="w-full h-full object-cover object-right md:object-center select-none"
        />
        {/* Strong, solid-to-soft gradient so text on the left is 100% crisp and clear */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(250,246,238,0.98) 0%, rgba(250,246,238,0.95) 48%, rgba(250,246,238,0.72) 72%, rgba(250,246,238,0.25) 100%)'
          }}
        />
        {/* Subtle bottom fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FAF6EE] to-transparent" />
      </div>

      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#2D1810] mb-3 font-extrabold">
          <button onClick={() => onNavigate('home')} className="hover:text-[#B45309] transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#4A3B32]" />
          <button onClick={() => onNavigate('all-products')} className="hover:text-[#B45309] transition-colors cursor-pointer">
            All Pickles
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#4A3B32]" />
          <span className="text-[#B45309] font-black">{category.name}</span>
        </nav>

        {/* Content Showcase */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#1F110B] border border-[#F59E0B] px-3.5 py-1 rounded-full text-xs font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{category.heroTag || 'Heritage Artisanal Pickle'}</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1F110B] tracking-tight leading-tight">
              {category.name}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#1F110B] font-bold leading-relaxed max-w-xl">
              {category.description}
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs font-extrabold text-[#1F110B]">
              <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#D5C7B8] shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#1E5631]" /> 100% Homemade
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#D5C7B8] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B45309]" /> Cold-Pressed Mustard Oil
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#D5C7B8] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E5631]" /> Zero Chemical Vinegar
              </span>
            </div>

            <div className="text-xs sm:text-sm font-black text-[#1E5631] pt-1">
              ✓ Showing all {category.count} artisanal varieties • Pure Kachi Ghani Sarson Ka Tel
            </div>
          </div>

          {/* Heritage Floating Pill on Desktop */}
          <div className="hidden lg:block self-center pr-6">
            <div className="bg-white/95 backdrop-blur-md border-2 border-[#D5C7B8] rounded-2xl p-4 shadow-lg max-w-xs text-right">
              <span className="text-xs font-black uppercase tracking-wider text-[#1E5631] block">
                Heritage Batch
              </span>
              <p className="text-xs font-bold text-[#1F110B] mt-1 leading-relaxed">
                Naturally sun-ripened in porcelain barnis for authentic Indian flavour.
              </p>
              <div className="mt-2 text-xs font-extrabold text-[#B45309]">
                {category.count} Artisanal Varieties In Stock
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
