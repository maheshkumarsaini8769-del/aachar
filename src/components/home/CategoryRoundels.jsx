import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';

export const CategoryRoundels = ({ onNavigate }) => {
  const displayCats = categories.filter(c => c.id !== 'all');

  return (
    <section className="py-10 bg-brand-bg border-b border-brand-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-800 font-extrabold text-xs sm:text-sm uppercase tracking-wider bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Authentic Flavours</span>
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-brown">
              Shop by Category <span className="text-brand-brownMuted text-base sm:text-xl font-normal font-sans">(Traditional Pickles & More)</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigate('all-products')}
            className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-brand-green hover:text-brand-greenHover hover:underline"
          >
            <span>View All (28)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Circular Cards Horizontal Track on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto no-scrollbar gap-3.5 sm:grid sm:grid-cols-4 md:grid-cols-8 sm:gap-4 pb-2 text-center">
          {displayCats.map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', { categoryId: cat.id })}
              className="group flex flex-col items-center focus:outline-none shrink-0 w-20 sm:w-auto"
            >
              <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full aspect-square overflow-hidden border-2 border-brand-border group-hover:border-brand-yellow group-hover:shadow-warm transition-all duration-300 p-0.5 bg-white relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full aspect-square group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <span className="mt-2 text-xs sm:text-base font-extrabold text-brand-brown group-hover:text-brand-green line-clamp-1 transition-colors">
                {cat.shortName || cat.name}
              </span>

              <span className="text-[10px] sm:text-sm text-brand-brownMuted font-semibold line-clamp-1">
                {cat.hindiName}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
