import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { categories } from '../../data/categories';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#2D1810] text-[#FDFBF7] pt-12 pb-24 lg:pb-12 border-t-4 border-brand-yellow">
      <div className="max-w-[1360px] mx-auto px-4 pb-10 border-b border-[#4A2D22]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-13 h-13 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow text-2xl shrink-0">
              🌿
            </div>
            <div>
              <h5 className="font-serif font-bold text-base text-[#FAF0DF]">100% Homemade</h5>
              <p className="text-sm text-[#C5B49F]">Pure cold-pressed mustard oil & natural sun-cured spices</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-13 h-13 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow text-2xl shrink-0">
              🛡️
            </div>
            <div>
              <h5 className="font-serif font-bold text-base text-[#FAF0DF]">No Preservatives</h5>
              <p className="text-sm text-[#C5B49F]">Zero chemical vinegar or synthetic colors</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-13 h-13 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow text-2xl shrink-0">
              👩‍🌾
            </div>
            <div>
              <h5 className="font-serif font-bold text-base text-[#FAF0DF]">Rural Women Made</h5>
              <p className="text-sm text-[#C5B49F]">Empowering 45+ artisan mothers in Sikar</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3.5">
            <div className="w-13 h-13 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow text-2xl shrink-0">
              🏺
            </div>
            <div>
              <h5 className="font-serif font-bold text-base text-[#FAF0DF]">Safe Pan-India</h5>
              <p className="text-sm text-[#C5B49F]">Shock-proof bubble glass packaging</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white text-lg">
                🌿
              </div>
              <span className="font-serif text-3xl font-extrabold tracking-tight text-[#FAF0DF]">
                Marusthali<span className="text-brand-yellow">Achar</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#D2C3B0] max-w-sm font-medium">
              Marusthali Achar brings the timeless culinary heritage of traditional Indian pickles straight from village courtyards to your dining table. Handcrafted with pure cold-pressed mustard oil, authentic stone-ground spices, and sun-cooking patience.
            </p>

            <div className="pt-2 text-sm text-[#D2C3B0] space-y-2.5 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4.5 h-4.5 text-brand-yellow shrink-0 mt-0.5" />
                <span>Near Old Bus Stand, Ward No. 5, Sikar, Rajasthan - 332001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4.5 h-4.5 text-brand-yellow shrink-0" />
                <span>+91 9876543210 / +91 9876543211</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4.5 h-4.5 text-brand-yellow shrink-0" />
                <span>care@marusthaliachar.com</span>
              </div>
            </div>
          </div>

          {/* Pure Pickle Categories */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-brand-yellow uppercase tracking-wider">
              Achar Varieties
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D2C3B0] font-medium">
              {categories.slice(1, 7).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('category', { categoryId: cat.id })}
                    className="hover:text-brand-yellow transition-colors hover:translate-x-1 inline-block"
                  >
                    {cat.name} ({cat.hindiName})
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('all-products')}
                  className="text-brand-yellow font-bold hover:underline"
                >
                  View All 37 Achar →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Special Features */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-brand-yellow uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D2C3B0] font-medium">
              <li>
                <button onClick={() => onNavigate('combo-builder')} className="hover:text-brand-yellow transition-colors">
                  Build Your Own Combo Box ✨
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('festive')} className="hover:text-brand-yellow transition-colors">
                  Festive Special Collections 🎁
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-brand-yellow transition-colors">
                  Special Offers & Coupons 🔥
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stores')} className="hover:text-brand-yellow transition-colors">
                  Store Locations & Tasting 📍
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-brand-yellow transition-colors">
                  Customer Reviews ⭐ (4.9/5)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-story')} className="hover:text-brand-yellow transition-colors">
                  Our Rural Artisan Story
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Assistance */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-brand-yellow uppercase tracking-wider">
              Policies & Help
            </h4>
            <ul className="space-y-2 text-xs text-[#D2C3B0]">
              <li>
                <button onClick={() => onNavigate('account', { tab: 'orders' })} className="hover:text-brand-yellow transition-colors font-semibold text-amber-300">
                  My Orders & Live Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'shipping' })} className="hover:text-brand-yellow transition-colors">
                  Shipping & Pan-India Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'returns' })} className="hover:text-brand-yellow transition-colors">
                  Return & Replacement Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-brand-yellow transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'food-safety' })} className="hover:text-brand-yellow transition-colors">
                  Food Safety & Purity Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'privacy' })} className="hover:text-brand-yellow transition-colors">
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-[#4A2D22] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A89884]">
        <div>
          © {new Date().getFullYear()} Marusthali Achar Artisanal Pickles. All Rights Reserved. Handcrafted in Sikar, Rajasthan.
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="bg-[#402319] px-2 py-1 rounded border border-[#583528]">UPI Accepted</span>
          <span className="bg-[#402319] px-2 py-1 rounded border border-[#583528]">RuPay</span>
          <span className="bg-[#402319] px-2 py-1 rounded border border-[#583528]">Visa / Mastercard</span>
          <span className="bg-[#402319] px-2 py-1 rounded border border-[#583528]">Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
