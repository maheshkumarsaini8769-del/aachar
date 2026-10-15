import React from 'react';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

export const FestiveBannerSection = ({ onNavigate }) => {
  return (
    <section className="py-10 bg-brand-bg border-b border-brand-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden shadow-warm border-2 border-brand-border bg-gradient-to-r from-[#421A12] via-[#5C2417] to-[#36130B] text-white p-6 sm:p-10 md:p-12">
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
                <Sparkles className="w-4 h-4" />
                <span>Festive Season Specials • Traditional Gifting</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFFDF8] leading-tight">
                Festive Special Pickle Hampers
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#EAD8C7] leading-relaxed max-w-lg font-medium">
                Celebrate the festive season with our signature handcrafted pickles. Exquisite gift boxes with customized greeting notes, earthen diyas, and authentic rural craftsmanship.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('festive')}
                  className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-black text-sm sm:text-base px-7 py-3.5 rounded-full flex items-center gap-2 shadow-md transform hover:-translate-y-0.5 transition-all"
                >
                  <Gift className="w-5 h-5" />
                  <span>Explore Festive Collection</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('combo-builder')}
                  className="bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Custom Combo Box</span>
                </button>
              </div>
            </div>

            {/* Right Images Collage */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden border-2 border-brand-yellow/40 shadow-2xl">
                <img
                  src="/images/banners/festive-collection-hero.jpg"
                  alt="Festive Special Achar Gift Box"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 right-2 bg-brand-yellow text-brand-brown font-extrabold text-[11px] px-2.5 py-1 rounded-lg shadow-sm">
                  Starting ₹499
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
