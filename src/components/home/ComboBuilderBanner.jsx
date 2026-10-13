import React from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const ComboBuilderBanner = ({ onNavigate }) => {
  return (
    <section className="py-12 bg-white border-b border-brand-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border-2 border-brand-border shadow-warm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-amber-800 bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Interactive Box Builder • Save Up to 23%</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown leading-tight">
              Build Your Own Achar Combo
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-brand-brownMuted leading-relaxed max-w-lg font-medium">
              Choose your favorite flavors and create a personalized pickle box! Pick from 2, 3, or 4 varieties with custom packaging and special combo savings.
            </p>

            <div className="grid grid-cols-3 gap-2.5 py-2 max-w-md mx-auto md:mx-0 text-center">
              <div className="p-3 rounded-2xl bg-brand-cream border border-brand-border">
                <span className="block text-xs sm:text-sm font-bold text-brand-brown">2-Pack Box</span>
                <span className="text-sm sm:text-base text-brand-green font-black">₹449</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-100 border-2 border-amber-400 shadow-xs relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-brand-yellow text-brand-brown px-2 py-0.5 rounded-full font-black uppercase">Popular</span>
                <span className="block text-xs sm:text-sm font-bold text-brand-brown">3-Pack Box</span>
                <span className="text-sm sm:text-base text-brand-green font-black">₹649</span>
              </div>
              <div className="p-3 rounded-2xl bg-brand-cream border border-brand-border">
                <span className="block text-xs sm:text-sm font-bold text-brand-brown">4-Pack Box</span>
                <span className="text-sm sm:text-base text-brand-green font-black">₹849</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('combo-builder')}
                className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-black text-sm sm:text-base px-8 sm:px-9 py-4 rounded-full flex items-center justify-center gap-2 shadow-md transform hover:-translate-y-0.5 transition-all mx-auto md:mx-0"
              >
                <span>Create Your Combo Now ✨</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden border-2 border-brand-border shadow-md bg-brand-cream">
              <img
                src="/images/banners/combo-signature-box-hero.jpg"
                alt="Build Your Own Combo Preview"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-brand-green text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                Save Up to 23% on Combos
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
