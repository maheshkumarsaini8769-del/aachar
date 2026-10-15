import React from 'react';
import { 
  Truck, 
  Tag, 
  Sun, 
  Heart, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Headphones, 
  Sparkles 
} from 'lucide-react';

export const AnnouncementBar = ({ onNavigate }) => {
  const announcements = [
    {
      id: 'freeship',
      icon: <Truck className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />,
      text: 'Free Express Shipping on Orders Above ₹499',
      highlight: 'FREE DELIVERY',
      action: null
    },
    {
      id: 'coupon',
      icon: <Tag className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      text: 'Use Coupon Code DESI10 for Flat 10% OFF',
      highlight: 'CODE: DESI10',
      action: () => onNavigate && onNavigate('all-products')
    },
    {
      id: 'natural',
      icon: <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      text: '100% Homemade • 21-Day Solar Cured in Barnis',
      highlight: '100% PURE',
      action: null
    },
    {
      id: 'women',
      icon: <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/50 shrink-0" />,
      text: 'Handcrafted with Love by 45+ Rural Women Artisans',
      highlight: 'WOMEN EMPOWERMENT',
      action: () => onNavigate && onNavigate('our-story')
    },
    {
      id: 'zero-chem',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      text: 'Zero Chemical Preservatives • Cold-Pressed Mustard Oil',
      highlight: 'CHEMICAL FREE',
      action: null
    },
    {
      id: 'cod',
      icon: <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />,
      text: 'Cash on Delivery (COD) & Safe Glass Jar Delivery',
      highlight: 'COD AVAILABLE',
      action: null
    },
    {
      id: 'store',
      icon: <MapPin className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />,
      text: 'Marusthali Barni Kitchen • Piprali Road, Sikar, Rajasthan',
      highlight: 'STORE LOCATION',
      action: () => onNavigate && onNavigate('store-location')
    },
    {
      id: 'support',
      icon: <Headphones className="w-3.5 h-3.5 text-amber-300 shrink-0" />,
      text: 'Need Help with Your Order? Instant Customer Support',
      highlight: 'HELP & SUPPORT',
      action: () => onNavigate && onNavigate('our-story')
    }
  ];

  return (
    <div className="bg-[#2D1810] text-white text-xs sm:text-[13px] font-bold py-2 border-b border-[#4A2D1B] overflow-hidden relative select-none">
      {/* Edge gradient smooth fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#2D1810] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#2D1810] to-transparent z-10 pointer-events-none" />

      {/* Infinite Continuous Scrolling Marquee */}
      <div className="w-full overflow-hidden flex items-center">
        <div className="animate-marquee items-center gap-6 sm:gap-8 tracking-wide">
          {[...announcements, ...announcements].map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              onClick={item.action || undefined}
              className={`flex items-center gap-2 shrink-0 py-0.5 ${
                item.action ? 'cursor-pointer hover:text-[#FBBF24] transition-colors' : ''
              }`}
            >
              {item.icon}
              <span className="text-white text-xs sm:text-[13px] font-bold whitespace-nowrap">
                {item.text}
              </span>
              {item.highlight && (
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FBBF24] bg-amber-950/80 border border-amber-600/50 px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                  {item.highlight}
                </span>
              )}
              <span className="text-amber-500/40 ml-4 font-serif">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
