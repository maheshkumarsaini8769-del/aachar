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
    <section className="py-10 sm:py-14 bg-transparent border-y border-[#E5D9C5]/60">
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

        {/* 3 Compact Cards (Quick preview that directly links to combo-builder page) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {comboTiers.map((tier, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('combo-builder', { preselectedPack: tier.id })}
              className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-lg ${
                tier.popular
                  ? 'bg-[#FFF9EE] border-[#D97706] ring-2 ring-[#F5A623]/30'
                  : 'bg-white border-[#E5D9C5] hover:border-[#D97706]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black bg-[#2D1810] text-[#FBBF24] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {tier.size}
                  </span>
                  {tier.popular ? (
                    <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <Star className="w-3 h-3 fill-current" /> Most Popular
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {tier.save}
                    </span>
                  )}
                </div>

                {/* Box Image Preview */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#E5D9C5] bg-[#FAF6EE] mb-3">
                  <img
                    src={tier.image}
                    alt={tier.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    {tier.jars}
                  </div>
                </div>

                <h3 className="font-serif font-black text-base text-[#1F110B] group-hover:text-[#B45309] transition-colors">
                  {tier.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DDCD] flex items-center justify-between">
                <div>
                  <span className="text-xl font-black text-[#1F110B]">{tier.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-1.5 font-bold">{tier.mrp}</span>
                </div>

                <span className="text-xs font-black text-[#B45309] group-hover:underline flex items-center gap-1">
                  <span>Customise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComboBuilderBanner;
