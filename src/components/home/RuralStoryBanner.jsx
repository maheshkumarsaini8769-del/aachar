import React from 'react';
import { ArrowRight, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const RuralStoryBanner = ({ onNavigate }) => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#FAF5EB] to-[#F5EEDB] border-b border-brand-yellow/30 relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-brand-yellow/40 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center backdrop-blur-md">
          
          {/* Photo Column */}
          <div className="md:col-span-5 flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl bg-white group">
              <img
                src="/images/process/step-2-sun-drying.jpg"
                alt="Rural women handcrafting traditional achar in Sikar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full w-fit mb-1 border border-amber-400/30">
                  Sikar District • Shekhawati, Rajasthan
                </span>
                <span className="font-serif font-black text-base sm:text-lg">
                  Shanti Devi & 45+ Rural Women Artisans
                </span>
                <p className="text-[11px] text-[#E5D7C3]">
                  Handcrafted Traditional Pickles • A Story of Self-Reliance
                </p>
              </div>
            </div>
          </div>

          {/* Text & Movement Column */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left order-1 md:order-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-rose-900 bg-rose-100 border border-rose-300 px-3.5 py-1 rounded-full shadow-2xs">
              <Heart className="w-4 h-4 text-rose-600 fill-current" />
              <span>Sikar Didi Movement • Women Artisan Collective</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown leading-tight">
              Our Story: Preserving Village Kitchen Heritage
            </h2>

            <p className="text-sm sm:text-base text-brand-brownMuted leading-relaxed font-medium">
              Every jar of Marusthali Achar is a living celebration of rural Rajasthan's culinary heritage. Led by 45+ skilled village women artisans in Sikar, we take no shortcuts—washing raw mangoes in clean well-water, sun-drying under white cotton canopies, and blending cold-pressed mustard oil with age-old grandmother recipes.
            </p>

            {/* Impact Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-brand-brown font-semibold">
              <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-800 shrink-0" />
                <span>45+ Rural Women Empowered</span>
              </div>
              <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>100% Fair Dignified Wages</span>
              </div>
              <div className="bg-rose-50/80 p-2.5 rounded-xl border border-rose-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-800 shrink-0" />
                <span>Zero Middlemen Margin</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('our-story')}
                className="inline-flex items-center gap-2 bg-[#2D1810] hover:bg-[#43251A] text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold shadow-md transition-all transform hover:scale-105"
              >
                <span>Read Full Artisan Story & Heritage 📖</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
