import React from 'react';
import { Truck, Heart, MapPin, Headphones, ChevronRight } from 'lucide-react';

export const AnnouncementBar = ({ onNavigate }) => {
  return (
    <div className="bg-[#2D1810] text-white text-xs sm:text-[13px] font-bold py-2.5 px-3 sm:px-6 border-b border-[#4A2D1B]">
      <div className="max-w-[1360px] mx-auto">
        {/* Desktop View: Full 5 Items with High Contrast Text */}
        <div className="hidden md:flex items-center justify-between tracking-wide">
          <div className="flex items-center gap-2 text-white">
            <Truck className="w-4 h-4 text-[#FBBF24] shrink-0" />
            <span>Free Shipping on Orders Above ₹499</span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <span className="text-emerald-400 text-sm">🍃</span>
            <span>100% Homemade & Natural</span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/50 shrink-0" />
            <span>Made by Rural Women</span>
          </div>

          <button 
            onClick={() => onNavigate && onNavigate('store-location')}
            className="flex items-center gap-1.5 text-amber-200 hover:text-[#FBBF24] transition-colors font-extrabold cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#FBBF24]" />
            <span>Store Location</span>
          </button>

          <button 
            onClick={() => onNavigate && onNavigate('our-story')}
            className="flex items-center gap-1.5 text-amber-200 hover:text-[#FBBF24] transition-colors font-extrabold cursor-pointer"
          >
            <Headphones className="w-4 h-4 text-amber-300" />
            <span>Help & Support</span>
          </button>
        </div>

        {/* Mobile View: Single Centered Clean Item */}
        <div className="flex md:hidden items-center justify-center gap-2 py-0.5 text-xs font-extrabold text-white text-center">
          <Truck className="w-4 h-4 text-[#FBBF24] shrink-0" />
          <span>Free Shipping on Orders Above ₹499</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#FBBF24]" />
        </div>
      </div>
    </div>
  );
};
