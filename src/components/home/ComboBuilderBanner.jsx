import React from 'react';
import { Sparkles, ArrowRight, Package, Check, Star } from 'lucide-react';

export const ComboBuilderBanner = ({ onNavigate }) => {
  const comboTiers = [
    {
      id: 'pack-2',
      size: '2 Jars',
      title: 'Starter Pair Box',
      price: '₹449',
      mrp: '₹549',
      save: 'Save 18%',
      jars: '2 × 400g Jars',
      image: '/images/products/combo-2pack-duo.jpg',
      popular: false
    },
    {
      id: 'pack-3',
      size: '3 Jars',
      title: 'Family Feast Box',
      price: '₹649',
      mrp: '₹799',
      save: 'Save 19%',
      jars: '3 × 400g Jars',
      image: '/images/products/combo-3pack-heritage.jpg',
      popular: true
    },
    {
      id: 'pack-4',
      size: '4 Jars',
      title: 'Royal Crate Box',
      price: '₹849',
      mrp: '₹1,099',
      save: 'Save 23%',
      jars: '4 × 400g Jars',
      image: '/images/products/combo-4pack-royal.jpg',
      popular: false
    }
  ];

  return (
    <section id="combo-banner" className="py-10 sm:py-14 bg-transparent border-y border-[#E5D9C5]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#1F110B] uppercase tracking-wider bg-[#FDE68A] border border-[#D97706] px-3 py-1 rounded-full shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>MARUSTHALI ACHAR • CUSTOM COMBO PACKS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F110B] tracking-tight">
              Build Your Custom <span className="text-[#B45309]">Combo Box</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A3B32] font-semibold mt-1 max-w-xl">
              Pick your favorite 2, 3, or 4 Rajasthani pickle flavours in our dedicated interactive studio & save up to 23%!
            </p>
          </div>

          <button
            onClick={() => onNavigate('combo-builder')}
            className="self-start md:self-auto bg-[#F5A623] hover:bg-[#E09415] text-[#1F110B] font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span>Open Combo Builder Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Custom Combo Pack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-stretch pt-2">
          {comboTiers.map((tier, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('combo-builder', { preselectedPack: tier.id })}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-visible hover:-translate-y-1 hover:shadow-lg ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FDF4E2] border-[#D97706] ring-2 ring-[#F5A623]/35 shadow-md'
                  : 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5ECE0] border-[#E5D7C3] hover:border-[#D97706]'
              }`}
            >
              {/* Crown Banner for Most Popular Tier */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 via-[#F5A623] to-amber-600 text-[#1F110B] font-black text-[10px] sm:text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-amber-300 whitespace-nowrap z-10">
                  <Star className="w-3.5 h-3.5 fill-current text-[#1F110B]" />
                  <span>⭐ Most Loved Family Choice</span>
                </div>
              )}

              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between mb-3.5 mt-1">
                  <span className="text-[11px] font-black bg-[#2D1810] text-[#FBBF24] px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                    {tier.size}
                  </span>
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    tier.popular 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {tier.save}
                  </span>
                </div>

                {/* Box Image Preview */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-[#E0D4C3] bg-[#EFE8DD] mb-3.5 shadow-xs">
                  <img
                    src={tier.image}
                    alt={tier.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[#FBBF24] text-[10px] font-black px-2.5 py-0.5 rounded-md border border-amber-500/30">
                    📦 {tier.jars}
                  </div>
                </div>

                <h3 className="font-serif font-black text-lg sm:text-xl text-[#1F110B] group-hover:text-[#B45309] transition-colors leading-snug">
                  {tier.title}
                </h3>

                {/* Feature Perks */}
                <ul className="mt-2.5 space-y-1 text-[11px] font-bold text-[#5C483A]">
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span>
                    <span>Mix any Marusthali 400g jars</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span>
                    <span>Free Sheesham wooden spoon</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span>
                    <span>Shockproof gift box packing</span>
                  </li>
                </ul>
              </div>

              {/* Footer Price & Action */}
              <div className="mt-4 pt-3.5 border-t border-[#E5D7C3] flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-[#1F110B]">{tier.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-1.5 font-bold">{tier.mrp}</span>
                </div>

                <button
                  type="button"
                  className="bg-gradient-to-r from-[#F5A623] to-[#D97706] group-hover:from-[#E09415] group-hover:to-[#B45309] text-[#1F110B] font-black text-xs sm:text-[13px] px-3.5 sm:px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Build Box</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComboBuilderBanner;
