import React, { useState } from 'react';
import { Sparkles, Gift, CheckCircle2, ShoppingBag, Truck, ShieldCheck, Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const SamplerBoxSection = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [addedToast, setAddedToast] = useState(false);

  const samplerProduct = {
    id: 'heritage-sampler-box-4',
    name: 'Marusthali Achar 4-Jar Tasting Box',
    hindiName: 'Marusthali Achar 4-Mini Jar Tasting Crate',
    categoryName: 'Sampler Box',
    price: 349,
    mrp: 449,
    image: '/images/products/festive-special-pack.jpg',
    packSizes: [{ size: '4 x 100g Jars', price: 349, mrp: 449 }]
  };

  const handleAddSampler = () => {
    addToCart(samplerProduct, '4 x 100g Jars', 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const jars = [
    { name: '1. Classic Ramkela Mango', desc: 'Sun-Cured Tart Raw Mango', badge: 'Flagship' },
    { name: '2. Stuffed Banarasi Red Chilli', desc: 'Sun-Cured Whole Red Chilli', badge: 'Hot & Spicy' },
    { name: '3. Country Garlic Pickle', desc: 'Whole Garlic Cloves in Mustard Oil', badge: 'Rich Aroma' },
    { name: '4. Sweet & Tangy Lemon', desc: 'Sun-Cured Digestive Lemon', badge: 'Digestive' }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#2D1810] via-[#3B1F14] to-[#25120A] text-white relative overflow-hidden border-b border-amber-600/30">
      
      {/* Decorative ambient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Discovery Box Presentation (Col 6) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Box Showcase */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-[#1C0D08]/80 group">
                <img
                  src="/images/products/festive-special-pack.jpg"
                  alt="Marusthali Achar 4-Jar Discovery Sampler Box"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-amber-400 text-brand-brown font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Farm-Direct Discovery Pack</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="font-bold text-white ml-1">4.9 / 5.0 (2,410+ Discovery Boxes Delivered)</span>
                  </div>
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
                    Marusthali Achar 4-Mini Jar Tasting Box
                  </h3>
                  <p className="text-xs text-[#E5D7C3] mt-0.5">
                    4 Glass Jars (100g each) • Sample before buying 1kg Jars
                  </p>
                </div>
              </div>

              {/* Price Pill Floating */}
              <div className="absolute -bottom-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-brand-brown px-5 py-2.5 rounded-2xl shadow-xl border-2 border-white font-serif flex items-center gap-2">
                <div>
                  <div className="text-[10px] uppercase font-sans font-black tracking-wider opacity-80">Special Trial Offer</div>
                  <div className="text-lg font-black leading-none">₹349 <span className="text-xs line-through opacity-70">₹449</span></div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Why Try Discovery Box (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>New Customer Favorite • Trial Tasting Pack</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Not Sure Which Pickle to Pick? Try Our Mini Discovery Box!
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#D8C7B4] leading-relaxed">
                Trying Marusthali Achar for the first time? Sample our 4 most loved traditional pickles in mini glass jars before purchasing full 1kg containers. 100% cold-pressed mustard oil and slow sun-ripened heritage.
              </p>
            </div>

            {/* Included Jars Mini Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jars.map((j, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-400/30">
                    🏺
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-white truncate">{j.name}</h4>
                    </div>
                    <p className="text-[11px] text-[#C4B5A5]">{j.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Perks Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#E5D7C3] pt-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" /> Free Pan-India Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Food-Grade Glass Jars
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" /> 45+ Sikar Women Artisans
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleAddSampler}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-brand-brown font-black text-sm px-8 py-4 rounded-full shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add 4-Jar Discovery Box (₹349)</span>
              </button>

              <button
                onClick={() => onNavigate('combo-builder')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-full border border-white/20 flex items-center justify-center transition-colors"
              >
                <span>Or Custom Build 3-Jar Box ✨</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Added Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-600 animate-slide-up text-xs font-bold">
          <span>✓ Added 4-Jar Khazana Discovery Box to your thali!</span>
        </div>
      )}
    </section>
  );
};
