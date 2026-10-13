import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, ExternalLink, ChevronRight, Check } from 'lucide-react';
import { stores } from '../data/stores';

export const StoreLocationPage = ({ onNavigate }) => {
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Store Locations</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
            Experience Our Flavours Live
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
            Our Physical Stores & Tasting Counters
          </h1>
          <p className="text-xs sm:text-sm text-brand-brownMuted mt-1">
            Visit our workshop in Sikar or flagship tasting boutiques to sample our traditional pickles before choosing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Stores Selection List (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-brown">
              Select Location
            </h3>

            <div className="space-y-3">
              {stores.map(store => {
                const isSelected = selectedStore.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-green bg-white shadow-warm ring-1 ring-brand-green'
                        : 'border-brand-border bg-white hover:border-brand-yellow/80 hover:bg-brand-ivory'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        {store.isMain && (
                          <span className="inline-block text-[10px] bg-brand-yellow text-brand-brown font-extrabold px-2 py-0.5 rounded-full mb-1">
                            Main Workshop & Store
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-base text-brand-brown">
                          {store.name}
                        </h4>
                        <p className="text-xs text-brand-brownMuted mt-1 leading-relaxed">
                          {store.address}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="pt-3 mt-3 border-t border-brand-border/40 flex items-center justify-between text-xs text-brand-brownMuted">
                      <span className="flex items-center gap-1 font-semibold text-brand-green">
                        <Phone className="w-3 h-3" /> {store.phone}
                      </span>
                      <span>PIN: <strong>{store.pincode}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Selected Store Detail & Map (Col 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-warm space-y-6 sticky top-28">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                  Store Details
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-brown">
                  {selectedStore.name}
                </h3>
              </div>

              {/* Map Illustration / Visual Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-border aspect-16/9 bg-brand-cream shadow-xs">
                <img
                  src={selectedStore.image || '/images/banners/store-map-preview.jpg'}
                  alt={`Map location of ${selectedStore.name}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Simulated Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-brand-red text-white p-2 rounded-full shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="bg-white/95 px-2.5 py-1 rounded-md text-[11px] font-bold text-brand-brown shadow-md mt-1 border border-brand-border">
                    Marusthali Achar
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-brand-border text-xs font-bold text-brand-brown">
                  📍 {selectedStore.address}
                </div>
              </div>

              {/* Store Contacts & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border space-y-1">
                  <div className="font-bold text-brand-brown flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-green" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="text-brand-brownMuted">Mon - Sat: {selectedStore.timingMonSat}</div>
                  <div className="text-brand-brownMuted">Sun: {selectedStore.timingSun}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border space-y-1">
                  <div className="font-bold text-brand-brown flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-brand-green" />
                    <span>Direct Telephone</span>
                  </div>
                  <div className="text-brand-brown font-bold">{selectedStore.phone}</div>
                  <div className="text-brand-brownMuted">{selectedStore.email}</div>
                </div>
              </div>

              {/* Available Amenities */}
              {selectedStore.features && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                    Available at this Store:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedStore.features.map((feat, i) => (
                      <span key={i} className="text-xs bg-brand-cream border border-brand-border px-3 py-1 rounded-lg text-brand-brown font-semibold">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={selectedStore.mapDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-brand-green hover:bg-brand-greenHover text-white py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Get Live Directions in Google Maps</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
