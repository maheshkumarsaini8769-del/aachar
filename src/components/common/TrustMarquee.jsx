import React from 'react';
import { Sun, Sparkles, ShieldCheck, Heart, Award, Truck, Star, Droplets } from 'lucide-react';

export const TrustMarquee = () => {
  const items = [
    { icon: <Sun className="w-4 h-4 text-amber-600" />, text: 'Naturally Sun-Cured (21-40 Days Solar Aging)', highlight: '100% Natural' },
    { icon: <Droplets className="w-4 h-4 text-amber-700" />, text: 'Pure Cold-Pressed Mustard Oil (First Press)', highlight: 'Cold-Pressed' },
    { icon: <Heart className="w-4 h-4 text-rose-600" />, text: 'Handcrafted by 45+ Rural Women Artisans', highlight: 'Empowering Women' },
    { icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />, text: '0% Synthetic Vinegar & Chemical Preservatives', highlight: '100% Pure' },
    { icon: <Award className="w-4 h-4 text-amber-600" />, text: 'Lab-Tested & FSSAI Certified Standards', highlight: 'Quality Assured' },
    { icon: <Truck className="w-4 h-4 text-brand-green" />, text: 'Free Pan-India Delivery on Orders ₹499+', highlight: 'Fast Dispatch' },
    { icon: <Star className="w-4 h-4 text-amber-500 fill-current" />, text: '4.9★ Verified Reviews (10,000+ Happy Families)', highlight: 'Trusted Taste' },
    { icon: <Sparkles className="w-4 h-4 text-amber-600" />, text: 'Traditional Ceramic & Glass Jar Packaging', highlight: 'Zero Plastic' }
  ];

  return (
    <div className="bg-gradient-to-r from-[#2A150D] via-[#3D1E12] to-[#2A150D] text-amber-100 py-2.5 border-y border-amber-600/30 overflow-hidden relative shadow-inner">
      {/* Ambient edge glow */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#2A150D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#2A150D] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-8 text-xs font-semibold tracking-wide">
        {/* Render twice for continuous infinite scroll */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 shrink-0 px-2 py-0.5">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              {item.icon}
            </span>
            <span className="text-[#F5EEDB] font-medium">{item.text}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-600/40">
              {item.highlight}
            </span>
            <span className="text-amber-500/40 ml-4 font-serif">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
