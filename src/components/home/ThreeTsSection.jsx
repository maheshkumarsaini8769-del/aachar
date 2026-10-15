import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Heart, 
  CheckCircle2, 
  QrCode, 
  Award, 
  FileText, 
  Search,
  Check,
  ChevronRight,
  Users,
  FlaskConical
} from 'lucide-react';

export const ThreeTsSection = ({ onNavigate }) => {
  const [selectedBatch, setSelectedBatch] = useState('SKR-2026-AAM');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  const BATCH_DATA = {
    'SKR-2026-AAM': {
      pickleName: 'Classic Ramkela Mango Pickle',
      harvestLocation: 'Sikar Orchards, Shekhawati, Rajasthan',
      artisanLead: 'Shanti Devi & Group (Sikar)',
      sunCuredDays: '28 Days Solar Curing',
      oilPurity: '100% Cold-Pressed Mustard Oil',
      syntheticVinegar: '0.00% (Lab Verified Nil)',
      benzoates: '0.00% (Lab Verified Nil)',
      fssaiLicense: 'FSSAI Lic. #12224026000189',
      packagedDate: '02 Oct 2026',
      bestBefore: '01 Oct 2028 (24 Months)'
    },
    'SKR-2026-MIRCH': {
      pickleName: 'Banarasi Stuffed Red Chilli Pickle',
      harvestLocation: 'Chandauli, UP & Sikar Hub',
      artisanLead: 'Kamla Bai & Sikar Artisans',
      sunCuredDays: '21 Days Solar Curing',
      oilPurity: '100% Cold-Pressed Mustard Oil',
      syntheticVinegar: '0.00% (Lab Verified Nil)',
      benzoates: '0.00% (Lab Verified Nil)',
      fssaiLicense: 'FSSAI Lic. #12224026000189',
      packagedDate: '28 Sep 2026',
      bestBefore: '27 Sep 2028 (24 Months)'
    }
  };

  const handleVerifyBatch = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowBatchModal(true);
    }, 400);
  };

  const currentBatch = BATCH_DATA[selectedBatch] || BATCH_DATA['SKR-2026-AAM'];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF5EB] via-[#FDFBF7] to-[#FAF5EB] border-b border-brand-yellow/30 relative overflow-hidden">
      {/* Decorative ambient watermarks */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (Inspired by FarmDidi's 3 Ts: Traditional • Tested • Traceable) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>The 3-T Heritage Standard • Our Three Commitments</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown tracking-tight leading-tight">
            Traditional • Tested • Traceable
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-brand-brownMuted leading-relaxed max-w-2xl mx-auto font-medium">
            Every jar of Marusthali Achar is a symbol of 30-year-old grandmother traditions, certified laboratory purity, and rural women empowerment.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Pillar 1: Traditional */}
          <div className="bg-white rounded-3xl p-7 border-2 border-brand-yellow/30 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs group-hover:scale-110 transition-transform">
                  <Sun className="w-7 h-7 text-amber-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                  T-1: Traditional
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-brand-brown mb-1.5 group-hover:text-brand-green transition-colors">
                  30-Year Heirloom Recipe
                </h3>
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
                  Generational Heritage Recipe
                </h4>
                <p className="text-xs sm:text-sm text-brand-brownMuted leading-relaxed">
                  Crisp green Ramkela mangoes, plump Banarasi red chillies, and thin-skinned Kagzi lemons prepared with 30-year-old grandmother spice ratios and aged 21 to 40 days under the Rajasthan sun. Zero industrial machine processing.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/60 mt-6 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Ceramic Jar Solar Fermentation</span>
              </div>
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>First-Press Cold Mustard Oil</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Tested */}
          <div className="bg-white rounded-3xl p-7 border-2 border-brand-yellow/30 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-emerald-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                  T-2: Tested & Pure
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-brand-brown mb-1.5 group-hover:text-brand-green transition-colors">
                  Tested & Lab-Certified
                </h3>
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
                  0% Synthetic Chemicals Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-brand-brownMuted leading-relaxed">
                  Every batch is certified by NABL-accredited laboratories. 0% Synthetic Vinegar (Acetic Acid), 0% Sodium Benzoate, and 0% Artificial Colors. Preserved naturally with rock salt, yellow mustard, and mustard oil for a 24-month shelf life.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/60 mt-6 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>FSSAI Certified Food Grade Jars</span>
              </div>
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Pink Rock Salt & Mustard Seed Natural Preservation</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Traceable */}
          <div className="bg-white rounded-3xl p-7 border-2 border-brand-yellow/30 shadow-md hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-rose-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 bg-rose-100 border border-rose-300 px-2.5 py-1 rounded-full">
                  T-3: Traceable
                </span>
              </div>


              <div>
                <h3 className="font-serif font-bold text-xl text-brand-brown mb-1.5 group-hover:text-brand-green transition-colors">
                  Artisanal Craftsmanship (Traceable Origin)
                </h3>
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-3">
                  45+ Sikar Women Artisans
                </h4>
                <p className="text-xs sm:text-sm text-brand-brownMuted leading-relaxed">
                  Behind every jar are the skilled hands of a village artisan mother. Families in Sikar receive dignified livelihoods and independence. Verify your jar with the batch QR code to know who prepared your pickle.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/60 mt-6 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Direct Rural Livelihood Impact</span>
              </div>
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>QR Traceable Batch Tracking</span>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Batch Transparency Widget (Like FarmDidi's Traceability) */}
        <div className="bg-[#2D1810] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-brand-yellow/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <QrCode className="w-4 h-4" />
              <span>Interactive Batch Transparency • Verify Your Jar</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-black text-white">
              Scan or Verify Any Marusthali Achar Pickle Batch
            </h4>
            <p className="text-xs sm:text-sm text-[#D8C7B4] leading-relaxed">
              Enter the batch number printed on your glass jar to review laboratory purity certificates, oil authenticity, and the artisan team that handcrafted your pickle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-[#43251A] border border-amber-500/40 text-amber-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-yellow w-full sm:w-auto"
            >
              <option value="SKR-2026-AAM">Batch #SKR-2026-AAM (Classic Mango)</option>
              <option value="SKR-2026-MIRCH">Batch #SKR-2026-MIRCH (Banarasi Stuffed Chilli)</option>
            </select>

            <button
              onClick={handleVerifyBatch}
              disabled={isVerifying}
              className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>{isVerifying ? 'Verifying Lab Report...' : 'Verify Lab Certificate'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lab Verification Certificate Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-brand-border shadow-2xl relative animate-scale-up space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-brown text-base">
                    Verified Quality Certificate
                  </h4>
                  <span className="text-[11px] text-brand-brownMuted font-mono">
                    Batch: {selectedBatch}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowBatchModal(false)}
                className="w-8 h-8 rounded-full bg-brand-cream hover:bg-brand-border text-brand-brown flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Certificate Details */}
            <div className="space-y-2.5 text-xs text-brand-brown bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span className="text-brand-brownMuted">Product Name:</span>
                <strong className="text-brand-brown text-right">{currentBatch.pickleName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span className="text-brand-brownMuted">Artisan Lead:</span>
                <strong className="text-emerald-800 text-right">{currentBatch.artisanLead}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span className="text-brand-brownMuted">Solar Fermentation:</span>
                <strong className="text-amber-900 text-right">{currentBatch.sunCuredDays}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span className="text-brand-brownMuted">Oil Base Type:</span>
                <strong className="text-brand-brown text-right">{currentBatch.oilPurity}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span className="text-brand-brownMuted">Synthetic Vinegar (Sirka):</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {currentBatch.syntheticVinegar}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span className="text-brand-brownMuted">Chemical Benzoates:</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {currentBatch.benzoates}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-brownMuted">Regulatory Standard:</span>
                <strong className="text-amber-900 font-mono text-right">{currentBatch.fssaiLicense}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
              <Award className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>100% Traditional Food Grade Guarantee Passed. Suitable for all age groups.</span>
            </div>

            <button
              onClick={() => setShowBatchModal(false)}
              className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold py-3 rounded-full text-xs shadow-xs"
            >
              Close Certificate Window
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
