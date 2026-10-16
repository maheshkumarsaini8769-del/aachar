import React from 'react';
import { ShieldCheck, Heart, Sun, Award, CheckCircle2, Sparkles, Users, Flame, Leaf } from 'lucide-react';

export const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-16 sm:py-20 bg-transparent border-b-2 border-brand-yellow/30 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-200 text-[#251208] border border-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Pure Craftsmanship • 100% Traditional Guarantee</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1F110B] tracking-tight">
            Why Families Trust Marusthali Achar
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#5A493F] max-w-2xl mx-auto leading-relaxed font-semibold">
            In an era of chemical vinegars and artificial food colors, we stay true to 30-year-old grandmother traditions—slow solar fermentation in ceramic jars and pure cold-pressed mustard oil.
          </p>
        </div>

        {/* 4 Elevated Royal Heritage Sanad Pillar Cards (शाही ताम्रपत्र) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12">
          
          {/* Pillar 1: Mustard Oil */}
          <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-t-[32px] rounded-b-2xl p-6 sm:p-7 border-2 border-[#D8BE95] shadow-[0_8px_24px_rgba(45,24,16,0.08)] hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(45,24,16,0.16)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <span className="absolute top-2.5 left-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>
            <span className="absolute top-2.5 right-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#F5D79E] via-[#E4B86A] to-[#B8860B] border-2 border-[#FFF0C8] flex items-center justify-center text-[#251208] shadow-md group-hover:scale-108 transition-transform">
                  <Leaf className="w-6 h-6 text-[#251208]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200/80 border border-amber-400/70 px-3 py-1 rounded-full shadow-2xs">
                  100% First-Press
                </span>
              </div>

              <h3 className="font-serif font-black text-lg sm:text-xl text-[#1F110B] mb-2 group-hover:text-[#B45309] transition-colors leading-snug">
                Cold-Pressed Mustard Oil
              </h3>
              
              <p className="text-xs sm:text-sm text-[#5C483A] leading-relaxed mb-4 font-medium">
                Only first-press virgin mustard oil (Kachi Ghani). Zero refined palm oil, zero chemical fillers—authentic pungent aroma and natural solar preservation.
              </p>
            </div>

            {/* Purity Stamp Pill */}
            <div className="pt-3 border-t border-[#DFC5A2] text-xs space-y-1.5 bg-white/90 p-3 rounded-2xl border border-amber-300/80 shadow-xs">
              <div className="flex items-center gap-1.5 font-black text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Marusthali: 100% Kachi Ghani Oil</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5 font-semibold">
                Market: Refined Palm Oil & Fillers
              </div>
            </div>
          </div>

          {/* Pillar 2: Sun-Cooking */}
          <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-t-[32px] rounded-b-2xl p-6 sm:p-7 border-2 border-[#D8BE95] shadow-[0_8px_24px_rgba(45,24,16,0.08)] hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(45,24,16,0.16)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <span className="absolute top-2.5 left-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>
            <span className="absolute top-2.5 right-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#F5D79E] via-[#E4B86A] to-[#B8860B] border-2 border-[#FFF0C8] flex items-center justify-center text-[#251208] shadow-md group-hover:scale-108 transition-transform">
                  <Sun className="w-6 h-6 text-[#251208]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200/80 border border-amber-400/70 px-3 py-1 rounded-full shadow-2xs">
                  21-40 Days Solar
                </span>
              </div>

              <h3 className="font-serif font-black text-lg sm:text-xl text-[#1F110B] mb-2 group-hover:text-[#B45309] transition-colors leading-snug">
                Natural Sun-Cooking
              </h3>
              
              <p className="text-xs sm:text-sm text-[#5C483A] leading-relaxed mb-4 font-medium">
                Slow-cured in traditional ceramic barnis under the warm Rajasthan sun for 21 to 40 days, allowing authentic enzymes and spices to age naturally.
              </p>
            </div>

            {/* Purity Stamp Pill */}
            <div className="pt-3 border-t border-[#DFC5A2] text-xs space-y-1.5 bg-white/90 p-3 rounded-2xl border border-amber-300/80 shadow-xs">
              <div className="flex items-center gap-1.5 font-black text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Marusthali: 30-Day Solar Fermented</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5 font-semibold">
                Market: 2-Hour Chemical Acid Boil
              </div>
            </div>
          </div>

          {/* Pillar 3: Rural Women */}
          <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-t-[32px] rounded-b-2xl p-6 sm:p-7 border-2 border-[#D8BE95] shadow-[0_8px_24px_rgba(45,24,16,0.08)] hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(45,24,16,0.16)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <span className="absolute top-2.5 left-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>
            <span className="absolute top-2.5 right-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#F5D79E] via-[#E4B86A] to-[#B8860B] border-2 border-[#FFF0C8] flex items-center justify-center text-[#251208] shadow-md group-hover:scale-108 transition-transform">
                  <Users className="w-6 h-6 text-[#251208]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200/80 border border-amber-400/70 px-3 py-1 rounded-full shadow-2xs">
                  45+ Sikar Artisans
                </span>
              </div>

              <h3 className="font-serif font-black text-lg sm:text-xl text-[#1F110B] mb-2 group-hover:text-[#B45309] transition-colors leading-snug">
                Women Artisan Empowered
              </h3>
              
              <p className="text-xs sm:text-sm text-[#5C483A] leading-relaxed mb-4 font-medium">
                Every single jar is handcrafted by 45+ skilled rural women artisans in Sikar, Rajasthan, preserving heirloom recipes and enabling dignified livelihoods.
              </p>
            </div>

            {/* Purity Stamp Pill */}
            <div className="pt-3 border-t border-[#DFC5A2] text-xs space-y-1.5 bg-white/90 p-3 rounded-2xl border border-amber-300/80 shadow-xs">
              <div className="flex items-center gap-1.5 font-black text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Marusthali: Heirloom Handcrafted</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5 font-semibold">
                Market: Mass Factory Processing
              </div>
            </div>
          </div>

          {/* Pillar 4: Zero Chemicals */}
          <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-t-[32px] rounded-b-2xl p-6 sm:p-7 border-2 border-[#D8BE95] shadow-[0_8px_24px_rgba(45,24,16,0.08)] hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(45,24,16,0.16)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <span className="absolute top-2.5 left-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>
            <span className="absolute top-2.5 right-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#F5D79E] via-[#E4B86A] to-[#B8860B] border-2 border-[#FFF0C8] flex items-center justify-center text-[#251208] shadow-md group-hover:scale-108 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-[#251208]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200/80 border border-amber-400/70 px-3 py-1 rounded-full shadow-2xs">
                  0% Chemicals
                </span>
              </div>

              <h3 className="font-serif font-black text-lg sm:text-xl text-[#1F110B] mb-2 group-hover:text-[#B45309] transition-colors leading-snug">
                100% Pure & Vegetarian
              </h3>
              
              <p className="text-xs sm:text-sm text-[#5C483A] leading-relaxed mb-4 font-medium">
                100% free from sodium benzoate, synthetic vinegar (acetic acid), and artificial food colors. Naturally preserved with rock salt and mustard seeds.
              </p>
            </div>

            {/* Purity Stamp Pill */}
            <div className="pt-3 border-t border-[#DFC5A2] text-xs space-y-1.5 bg-white/90 p-3 rounded-2xl border border-amber-300/80 shadow-xs">
              <div className="flex items-center gap-1.5 font-black text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Marusthali: Natural Mineral Shelf-Life</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5 font-semibold">
                Market: Synthetic Benzoates & Acids
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Live Heritage Stats Bar */}
        <div className="bg-gradient-to-r from-[#4E2B1E] via-[#3B1F14] to-[#2B170E] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-brand-yellow/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-300">37</span>
            <p className="text-xs sm:text-sm font-bold text-amber-100">Pure Pickle Recipes</p>
            <span className="text-[11px] text-[#D8C7B4]">Traditional Pickles Only</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-300">30+ Days</span>
            <p className="text-xs sm:text-sm font-bold text-amber-100">Natural Sun Aging</p>
            <span className="text-[11px] text-[#D8C7B4]">Real Ceramic Jars</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-300">45+</span>
            <p className="text-xs sm:text-sm font-bold text-amber-100">Sikar Women Artisans</p>
            <span className="text-[11px] text-[#D8C7B4]">Dignified Employment</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-300">4.9 / 5</span>
            <p className="text-xs sm:text-sm font-bold text-amber-100">Family Trust Rating</p>
            <span className="text-[11px] text-[#D8C7B4]">10,000+ Verified Buyers</span>
          </div>
        </div>

      </div>
    </section>
  );
};
