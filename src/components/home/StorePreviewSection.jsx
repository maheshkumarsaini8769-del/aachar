import React from 'react';
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { stores } from '../../data/stores';

export const StorePreviewSection = ({ onNavigate }) => {
  const mainStore = stores[0];

  return (
    <section className="py-12 bg-white border-b border-brand-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs sm:text-sm font-black text-brand-green uppercase tracking-wider block mb-1.5 bg-emerald-100 border border-emerald-300 w-fit px-3 py-0.5 rounded-full">
              Visit Us In Person • Free Tasting
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown">
              Our Physical Stores & Tasting Counters
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-brand-brownMuted mt-1.5 font-medium">
              Taste all 37 traditional achar varieties directly from ceramic barnis before buying.
            </p>
          </div>

          <button
            onClick={() => onNavigate('stores')}
            className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-brand-green hover:underline self-start md:self-auto"
          >
            <MapPin className="w-4 h-4 text-brand-green" />
            <span>View All 4 Stores</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-bg rounded-3xl p-6 sm:p-8 border border-brand-border">
          
          {/* Main Sikar Branch Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-brand-yellow text-brand-brown font-black text-xs px-3 py-1 rounded-full uppercase">
              Flagship Workshop & Store
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-brown">
              {mainStore.name}
            </h3>

            <div className="space-y-2.5 text-sm sm:text-base text-brand-brown leading-relaxed font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>{mainStore.address} (PIN: {mainStore.pincode})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-brand-green shrink-0" />
                <span>{mainStore.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-brand-green shrink-0" />
                <span>Mon - Sat: {mainStore.timingMonSat} | Sun: {mainStore.timingSun}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {mainStore.features.map((f, i) => (
                <span key={i} className="text-[11px] bg-brand-cream text-brand-brown font-semibold px-2.5 py-1 rounded-lg border border-brand-border">
                  ✓ {f}
                </span>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={mainStore.mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-green hover:bg-brand-greenHover text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <button
                onClick={() => onNavigate('stores')}
                className="bg-white border border-brand-border text-brand-brown px-5 py-2.5 rounded-full text-xs font-bold hover:bg-brand-cream transition-colors"
              >
                Other Cities (Jaipur, Delhi, Nawalgarh)
              </button>
            </div>
          </div>

          {/* Map Preview Graphic */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-brand-border shadow-sm aspect-16/10 bg-brand-cream">
              <img
                src="/images/banners/store-map-preview.jpg"
                alt="Store Location Map in Sikar Rajasthan"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-border text-xs font-bold text-brand-brown shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open Today</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
