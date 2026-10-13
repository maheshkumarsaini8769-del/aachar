import React, { useState } from 'react';
import { 
  Sun, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Clock, 
  Award,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  X
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: 1,
    day: 'Day 01',
    phase: 'Harvest & Produce Selection',
    title: '1. Handpicked Farm Produce & Washing',
    subtitle: 'Direct Farm Harvest • Twice Hand-Washed in Well Water',
    desc: 'We select only plump Ramkela raw mangoes, thin-skinned Kagzi lemons, and fresh whole red chillies from local family orchards. Every single fruit is inspected by hand, washed twice in clean well-water, and gently towel-dried.',
    highlight: '100% Grade-A Raw Produce',
    icon: '🌱',
    image: '/images/process/step-1-harvest.jpg',
    artisanQuote: 'We hand-sort every mango individually. Any blemished fruit is removed instantly to ensure supreme quality in every jar.',
    artisanName: 'Shanti Devi & Sikar Artisans',
    artisanRole: 'Master Produce Selector • Sikar'
  },
  {
    step: 2,
    day: 'Day 02 - 03',
    phase: 'Solar Sun-Drying on Terracotta Rooftops',
    title: '2. Solar Sun-Drying on Terracotta Rooftops',
    subtitle: 'Natural Moisture Evaporation Under 45°C Rajasthan Sun',
    desc: 'After meticulous hand-cutting, the mangoes and chillies are spread across clean white cotton sheets under the warm Rajasthan sun for 48 hours. This traditional solar technique eliminates surface moisture, preserving natural crunch for over two years without chemicals.',
    highlight: 'Zero Electric Dehydrators',
    icon: '☀️',
    image: '/images/process/step-2-sun-drying.jpg',
    artisanQuote: 'Sun-drying is the most critical step. Pure solar warmth preserves the crunch naturally without needing artificial preservatives.',
    artisanName: 'Kamla Bai',
    artisanRole: 'Solar Curing Elder • Shekhawati'
  },
  {
    step: 3,
    day: 'Day 04',
    phase: 'Stone-Ground Spices & Virgin Mustard Oil',
    title: '3. Stone-Ground Spices & Cold-Pressed Mustard Oil',
    subtitle: 'First-Press Cold Mustard Oil • Hand-Pounded Spices',
    desc: 'Pure whole spices—thick fennel seeds, yellow mustard, roasted fenugreek, rock salt, and aromatic hing. First-press cold mustard oil is gently tempered in traditional brass vessels and hand-mixed to coat every single slice evenly.',
    highlight: 'Pure Cold-Pressed Mustard Oil',
    icon: '🧄',
    image: '/images/process/step-3-spices-oil.jpg',
    artisanQuote: 'Stone-ground spices and pungent cold-pressed mustard oil are the true soul and heartbeat of our village pickle tradition.',
    artisanName: 'Geeta Sharma',
    artisanRole: 'Spice Master • Sikar Hub'
  },
  {
    step: 4,
    day: 'Day 05 - 25',
    phase: 'Ceramic Jar Solar Fermentation',
    title: '4. Glazed Ceramic Jar Solar Fermentation',
    subtitle: '21 to 30 Days Slow Maturation in Sun-Warmed Ceramic Jars',
    desc: 'The pickles are transferred into traditional glazed ceramic jars, covered with breathable muslin cloth, and placed under direct sunlight. Hand-stirred daily for 21 to 30 days, allowing spices and natural probiotic cultures to thoroughly meld.',
    highlight: 'Aged in Authentic Ceramic Jars',
    icon: '🏺',
    image: '/images/process/step-4-ceramic-barni.jpg',
    artisanQuote: 'Pickles breathe inside glazed ceramic jars. Industrial machines can never replicate the warmth and depth of slow solar fermentation.',
    artisanName: 'Santosh Devi',
    artisanRole: 'Ceramic Fermentation Lead • Sikar'
  },
  {
    step: 5,
    day: 'Day 30',
    phase: 'Pure Glass Jar Packaging',
    title: '5. Hand-Inspected Glass Jar Packaging',
    subtitle: '0% Synthetic Vinegar • 0% Sodium Benzoate • Sealed Fresh',
    desc: 'Matured pickles are filled into sterilized, food-grade glass jars. Completely free from synthetic acetic acid and chemical preservatives. A top seal of cold-pressed oil preserves pristine freshness for months.',
    highlight: 'Zero Chemicals Guaranteed',
    icon: '🌿',
    image: '/images/process/step-5-glass-packing.jpg',
    artisanQuote: 'Zero plastic, zero synthetic vinegar. Sealed in clear glass jars to bring authentic home taste straight to your dining table.',
    artisanName: 'Pooja Saini',
    artisanRole: 'Quality & Packaging Lead'
  }
];

export const MakingProcessPost = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const currentStep = PROCESS_STEPS[activeStep];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveStep(prev => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveStep(prev => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F5EFE0] via-[#FAF7F0] to-[#F5EFE0] border-b-2 border-brand-yellow/30 relative overflow-hidden">
      
      {/* Background Motifs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Post Eyebrow & Main Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-200 text-brand-brown border border-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
            <Sun className="w-4 h-4 text-amber-800" />
            <span>Ancestral Recipe • 5-Step Crafting Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown tracking-tight leading-tight">
            How Is Marusthali Achar's Authentic Homemade Pickle Handcrafted?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-brand-brownMuted leading-relaxed max-w-2xl mx-auto font-medium">
            Authentic pickles are never made in factory machines — they are born in the warm desert sunshine, steeped in pure cold-pressed mustard oil, and perfected by 30+ years of culinary wisdom. <strong>Click on any step below to explore each phase of our making process:</strong>
          </p>
        </div>

        {/* Feature Grid: Left Dynamic Photo Showcase + Right Step List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Visual Story Showcase Card (5 cols) - DYNAMICALLY UPDATES ON STEP CLICK */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-7 border-2 border-brand-yellow/50 shadow-xl space-y-5 relative overflow-hidden">
            
            {/* Step Counter Top Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-brand-border/60 text-xs">
              <span className="font-bold text-brand-brown flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                <span>Live Making Step: <strong>{currentStep.step} of 5</strong></span>
              </span>
              <span className="font-mono text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                {currentStep.day}
              </span>
            </div>

            {/* DYNAMIC SIDE IMAGE (Changes on every step click!) */}
            <div 
              onClick={() => setLightboxImage(currentStep)}
              className="relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-md bg-amber-50 cursor-pointer group"
              title="Click to enlarge making process photo"
            >
              <img 
                key={currentStep.step}
                src={currentStep.image} 
                alt={currentStep.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              {/* Click to Zoom Pill */}
              <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2 rounded-full border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Step Navigation Arrows on Image */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110"
                title="Previous making step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110"
                title="Next making step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Text Overlay on Dynamic Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider bg-brand-yellow text-brand-brown px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-xs">
                  {currentStep.phase}
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg leading-snug">
                  {currentStep.title}
                </h4>
                <p className="text-xs text-amber-200 mt-0.5 line-clamp-1">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            {/* 5-Step Interactive Navigation Pills under image */}
            <div className="flex items-center justify-between gap-1 sm:gap-1.5 pt-1 overflow-x-auto no-scrollbar">
              {PROCESS_STEPS.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(i)}
                  className={`flex-1 min-w-[52px] py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all border text-center ${
                    activeStep === i
                      ? 'bg-brand-brown text-amber-100 border-brand-brown shadow-xs ring-2 ring-brand-yellow/80'
                      : 'bg-brand-bg text-brand-brown border-brand-border hover:bg-amber-100'
                  }`}
                >
                  <span className="block text-[9px] sm:text-[10px] opacity-75">{s.day}</span>
                  <span className="text-[10px] sm:text-[11px]">Step {s.step}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Artisan Quote (Changes per step) */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#F7F2E6] border border-amber-300/80 space-y-2">
              <div className="text-amber-700 text-xl font-serif leading-none">“</div>
              <p className="font-serif italic text-xs sm:text-sm text-brand-brown leading-relaxed font-semibold">
                {currentStep.artisanQuote}
              </p>
              <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-brown block">
                    {currentStep.artisanName}
                  </span>
                  <span className="text-[11px] text-brand-brownMuted">
                    {currentStep.artisanRole}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  👩‍🌾
                </div>
              </div>
            </div>

            {/* Quick Trust Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-brand-brown">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0% Synthetic Vinegar</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0% Sodium Benzoate</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pure Cold-Pressed Mustard Oil</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Food-Grade Glass Jars</span>
              </div>
            </div>

          </div>

          {/* Right 5-Step Process Timeline Cards (7 cols) - CLICKING ANY UPDATES THE SIDE IMAGE */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-white border-brand-brown shadow-xl ring-2 ring-brand-yellow transform scale-[1.01]'
                      : 'bg-white/85 border-brand-border/80 hover:bg-white hover:border-brand-yellow/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Step Thumbnail Preview (Gives visual cue of the making process photo) */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-brand-border shrink-0 bg-amber-50 shadow-xs">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                        {step.day}
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-brand-yellow bg-brand-yellow/15" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          {step.phase}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {step.highlight}
                        </span>
                      </div>

                      <h3 className={`font-serif font-bold text-sm sm:text-base md:text-lg leading-snug transition-colors ${
                        isActive ? 'text-brand-brown' : 'text-brand-brown'
                      }`}>
                        {step.title}
                      </h3>

                      <p className="text-[11px] sm:text-xs font-semibold text-brand-green">
                        {step.subtitle}
                      </p>

                      <p className="text-xs text-brand-brownMuted leading-relaxed pt-0.5">
                        {step.desc}
                      </p>

                      <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                        <span>Click to view process photo</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>

        {/* Bottom Banner Strip CTA */}
        <div className="bg-gradient-to-r from-[#4E2B1E] via-[#3B1F14] to-[#2B170E] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-brand-yellow/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Authentic Homemade Flavor • 100% Artisan Guarantee</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-amber-100">
              Try India's Authentic Sun-Cured Homemade Pickles Today
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C7B4] max-w-xl">
              37 traditional achar varieties available in high-res glass jars. Enjoy free shipping above ₹499.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('all-products')}
              className="px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-sm sm:text-base rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              Order Homemade Pickles 🏺
            </button>
            <button
              onClick={() => onNavigate('combo-builder')}
              className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm sm:text-base rounded-full transition-all"
            >
              Build Custom Combo ✨
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal for Process Photos */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-border animate-scale-up"
          >
            <div className="p-4 bg-brand-cream border-b border-brand-border flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-brand-brown text-base">
                  {lightboxImage.title}
                </h4>
                <p className="text-xs text-brand-brownMuted">
                  {lightboxImage.phase} • {lightboxImage.day}
                </p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-brand-border flex items-center justify-center text-brand-brown"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-black flex items-center justify-center max-h-[65vh]">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-white border-t border-brand-border text-xs text-brand-brown leading-relaxed">
              <p><strong>Process Description:</strong> {lightboxImage.desc}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
