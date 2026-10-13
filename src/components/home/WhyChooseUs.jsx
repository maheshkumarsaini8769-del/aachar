import React from 'react';
import { ShieldCheck, Heart, Sun, Award, CheckCircle2, Sparkles, Users, Flame } from 'lucide-react';

export const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F5EFE0] via-[#FAF7F0] to-[#F5EFE0] border-b-2 border-brand-yellow/30 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-200 text-brand-brown border border-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Pure Craftsmanship • 100% Traditional Guarantee</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown tracking-tight">
            Why Families Trust Marusthali Achar
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-brand-brownMuted max-w-2xl mx-auto leading-relaxed font-medium">
            In an era of chemical vinegars and artificial food colors, we stay true to 30-year-old grandmother traditions—slow solar fermentation in ceramic jars and pure cold-pressed mustard oil.
          </p>
        </div>

        {/* 4 Elevated Heritage Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12">
          
          {/* Pillar 1: Mustard Oil */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-brand-yellow/40 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  🌿
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                  100% Cold-Pressed
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-brown mb-2 group-hover:text-brand-green transition-colors">
                Cold-Pressed Mustard Oil
              </h3>
              
              <p className="text-sm text-brand-brownMuted leading-relaxed mb-4">
                Only first-press virgin mustard oil. Zero refined palm oil, zero chemical fillers—authentic pungent flavor and natural preservation.
              </p>
            </div>

            {/* Comparison Pill */}
            <div className="pt-3 border-t border-brand-border/60 text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Marusthali Achar: Pure Mustard Oil</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5">
                Market: Refined Palm Oil & Fillers
              </div>
            </div>
          </div>

          {/* Pillar 2: Sun-Cooking */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-brand-yellow/40 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  ☀️
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                  21-40 Days Solar
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-brown mb-2 group-hover:text-brand-green transition-colors">
                Natural Sun-Cooking
              </h3>
              
              <p className="text-sm text-brand-brownMuted leading-relaxed mb-4">
                Slow-cured in traditional ceramic barnis under the warm Rajasthan sun for 21 to 40 days, allowing natural probiotic cultures to bloom.
              </p>
            </div>

            {/* Comparison Pill */}
            <div className="pt-3 border-t border-brand-border/60 text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Marusthali Achar: 30-Day Solar Fermented</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5">
                Market: 2-Hour Chemical Acid Boil
              </div>
            </div>
          </div>

          {/* Pillar 3: Rural Women */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-brand-yellow/40 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  👩‍🌾
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                  45+ Sikar Artisans
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-brown mb-2 group-hover:text-brand-green transition-colors">
                Women Artisan Empowered
              </h3>
              
              <p className="text-sm text-brand-brownMuted leading-relaxed mb-4">
                Every single jar is handcrafted by 45+ skilled rural women artisans in Sikar, Rajasthan, fostering dignified livelihoods and independence.
              </p>
            </div>

            {/* Comparison Pill */}
            <div className="pt-3 border-t border-brand-border/60 text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Marusthali Achar: Handcrafted Heirloom Recipes</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5">
                Market: Mass Factory Production
              </div>
            </div>
          </div>

          {/* Pillar 4: Zero Chemicals */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-brand-yellow/40 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 bg-rose-100 border border-rose-300 px-2.5 py-1 rounded-full">
                  0% Chemicals
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-brown mb-2 group-hover:text-brand-green transition-colors">
                100% Pure & Vegetarian
              </h3>
              
              <p className="text-sm text-brand-brownMuted leading-relaxed mb-4">
                100% free from sodium benzoate, synthetic vinegar (acetic acid), and artificial colors. Preserved solely by mineral salt, mustard seeds, and pure oil.
              </p>
            </div>

            {/* Comparison Pill */}
            <div className="pt-3 border-t border-brand-border/60 text-xs space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Marusthali Achar: Natural Salt & Oil Shelf-Life</span>
              </div>
              <div className="text-[11px] text-gray-500 line-through pl-5">
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
