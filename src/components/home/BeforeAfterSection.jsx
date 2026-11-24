import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Sun, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  HeartHandshake, 
  Eye, 
  Scale, 
  Layers,
  SlidersHorizontal,
  Gift,
  UtensilsCrossed,
  RotateCcw
} from 'lucide-react';

export const BeforeAfterSection = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'breakdown' | 'roadmap'
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Comparison metrics data
  const comparisonItems = [
    {
      title: "Cooking & Preservation Oil",
      factory: "Refined Palm or Cottonseed Oil (waxy film & heavy grease)",
      heritage: "100% Cold-Pressed Mustard Oil (Kacchi Ghani, pure pungency)",
      icon: Flame
    },
    {
      title: "Shelf-Life & Chemicals",
      factory: "Sodium Benzoate (E211) & synthetic acetic acid vinegar",
      heritage: "0% Chemicals: Naturally preserved with rock salt, turmeric & oil",
      icon: ShieldCheck
    },
    {
      title: "Fermentation & Curing Time",
      factory: "Indoor metal factory tanks force-matured in under 48 hours",
      heritage: "21 to 40 Days slow solar fermentation on Sikar rooftops",
      icon: Sun
    },
    {
      title: "Container & Packaging",
      factory: "Single-use PET plastic jars (microplastics leech over months)",
      heritage: "Glazed Ceramic Earthen Barnis (breathable, inert & heirloom)",
      icon: Layers
    },
    {
      title: "Digestive Impact & Feel",
      factory: "Causes heartburn, acidic reflux and artificial chemical throat burn",
      heritage: "Gut-friendly probiotics with stone-ground digestive spices",
      icon: HeartHandshake
    }
  ];

  const handleSliderMove = (e) => {
    if (!isDragging && e.type !== 'click') return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const offset = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (offset / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section 
      id="before-after-comparison" 
      className="py-16 sm:py-20 bg-transparent border-b border-[#E5D5BC]/60 relative overflow-hidden"
    >
      {/* Decorative Heritage Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 text-[#251208] border border-amber-300/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
            <Scale className="w-4 h-4 text-amber-800" />
            <span>The Heritage Purity Revolution</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1F110B] tracking-tight">
            Commercial Factory Pickle <span className="text-[#8B2500]">vs.</span> TharSwad Sun-Cured
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#5A493F] font-semibold max-w-2xl mx-auto leading-relaxed">
            See the exact difference between mass-market chemical pickles and authentic grandmother-recipe achar cured for 21 days under the Rajasthan desert sun.
          </p>

          {/* Navigation Filter Buttons */}
          <div className="inline-flex items-center gap-1.5 bg-[#EFE4D2] p-1.5 rounded-2xl border border-[#D8C7B0] shadow-inner mt-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'visual'
                  ? 'bg-brand-red text-white shadow-md'
                  : 'text-[#4A3B32] hover:text-[#1F110B]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Visual Comparison</span>
            </button>

            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'breakdown'
                  ? 'bg-brand-red text-white shadow-md'
                  : 'text-[#4A3B32] hover:text-[#1F110B]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Ingredient Breakdown</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'roadmap'
                  ? 'bg-brand-red text-white shadow-md'
                  : 'text-[#4A3B32] hover:text-[#1F110B]'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Heritage Features</span>
            </button>
          </div>
        </div>

        {/* TAB 1: VISUAL BEFORE & AFTER DISPLAY */}
        {activeTab === 'visual' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Primary Visual Showcase Card */}
            <div className="bg-gradient-to-b from-[#1F1610] to-[#120D09] rounded-3xl p-3 sm:p-5 border-2 border-brand-yellow/40 shadow-2xl overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-inner group">
                <img 
                  src="/images/banners/before_after_comparison.png" 
                  alt="Before and After: Mass Factory Commercial Pickle vs Authentic TharSwad Sun Cured Achar" 
                  className="w-full h-auto object-cover rounded-2xl shadow-md border border-amber-500/20"
                  loading="lazy"
                />

                {/* Corner Badges */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-red-600/95 backdrop-blur-md text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-red-400/50 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Before: Factory Pickle</span>
                </div>

                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-emerald-600/95 backdrop-blur-md text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-emerald-400/50 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>After: TharSwad Heritage</span>
                </div>
              </div>

              {/* Bottom Quick Callout */}
              <div className="mt-4 px-3 sm:px-6 py-3 bg-[#2A1D15] rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Sun className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-200">100% Traditional Solar Fermentation</h4>
                    <p className="text-xs text-amber-100/70">Never machine-heated or chemical preserved. Tested & trusted by 10,000+ Indian homes.</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate ? onNavigate('products') : window.location.hash = '#bestsellers'}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shrink-0"
                >
                  <span>Taste The Difference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DETAILED INGREDIENT & PROCESS BREAKDOWN */}
        {activeTab === 'breakdown' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 gap-4">
              {comparisonItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E4] to-[#FFFDF9] rounded-2xl p-5 border-2 border-[#D8BE95] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-stretch gap-4"
                  >
                    {/* Item Category Header */}
                    <div className="md:w-1/4 flex items-center gap-3 pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-[#DFC5A2] pr-4">
                      <div className="w-11 h-11 rounded-xl bg-[#F5D79E] border border-[#E4B86A] flex items-center justify-center text-[#251208] shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-black text-[#1F110B] text-base leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    {/* Factory Side (Before) */}
                    <div className="md:w-3/8 bg-red-50/70 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-700 block">
                          Ordinary Factory Pickle
                        </span>
                        <p className="text-xs sm:text-sm text-red-950 font-medium mt-0.5 leading-relaxed">
                          {item.factory}
                        </p>
                      </div>
                    </div>

                    {/* TharSwad Side (After) */}
                    <div className="md:w-3/8 bg-emerald-50/70 border border-emerald-300 rounded-xl p-3.5 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                          TharSwad Sun-Cured Heritage
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-950 font-bold mt-0.5 leading-relaxed">
                          {item.heritage}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: INNOVATIVE STORE FEATURES ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-2xl p-6 border-2 border-[#D8BE95] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl mb-4">
                    🏺
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    Gifting Premium
                  </span>
                  <h3 className="font-serif font-black text-lg text-[#1F110B] mt-2 mb-1.5">
                    Personalized Ceramic Barni
                  </h3>
                  <p className="text-xs text-[#5C483A] leading-relaxed font-medium">
                    Customize your jar with custom brass/clay name tags like <em>"Sharma Ji Ki Rasoi"</em> or <em>"Special Wedding Gift"</em>.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#DFC5A2] flex items-center justify-between text-xs font-bold text-amber-900">
                  <span>+35% Cart Value</span>
                  <span>Festive Favorite</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-2xl p-6 border-2 border-[#D8BE95] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl mb-4">
                    🍽️
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    Flavor Matching
                  </span>
                  <h3 className="font-serif font-black text-lg text-[#1F110B] mt-2 mb-1.5">
                    Dish Pairing Sommelier
                  </h3>
                  <p className="text-xs text-[#5C483A] leading-relaxed font-medium">
                    Select your food (<em>Paratha, Dal Baati, Khichdi, Curd Rice</em>) and get instant matching achar suggestions with tasting notes.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#DFC5A2] flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>Higher Multi-Jar Sales</span>
                  <span>Instant Match</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E4] to-[#F5E8CD] rounded-2xl p-6 border-2 border-[#D8BE95] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl mb-4">
                    ☀️
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-yellow-900 bg-yellow-200/80 px-2.5 py-0.5 rounded-full">
                    Transparency
                  </span>
                  <h3 className="font-serif font-black text-lg text-[#1F110B] mt-2 mb-1.5">
                    Live Sun-Curing Tracker
                  </h3>
                  <p className="text-xs text-[#5C483A] leading-relaxed font-medium">
                    Dynamic rooftop batch badges showing day-by-day solar fermentation progress in Sikar, proving 100% authentic preparation.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#DFC5A2] flex items-center justify-between text-xs font-bold text-yellow-900">
                  <span>100% Authentic Proof</span>
                  <span>Zero Doubts</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
