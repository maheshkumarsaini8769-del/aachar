import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Sparkles,
  ChevronDown,
  Award,
  Users,
  MessageCircle,
  CreditCard,
  CheckCircle2,
  PackageCheck,
  Leaf
} from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  // Mobile accordion state for sections
  const [openSections, setOpenSections] = useState({
    shop: false,
    policies: false,
    company: false,
    help: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const popularSearches = [
    { label: 'Pickles', action: () => onNavigate('all-products') },
    { label: 'Achar', action: () => onNavigate('all-products') },
    { label: 'Pickle Without Onion And Garlic (Jain)', action: () => onNavigate('category', { categoryId: 'jain' }) },
    { label: 'Mango Pickle', action: () => onNavigate('category', { categoryId: 'mango' }) },
    { label: 'Aam Ka Achar', action: () => onNavigate('product-detail', { productId: 'aam-classic' }) },
    { label: 'Kairi Ka Achar', action: () => onNavigate('product-detail', { productId: 'kairi-aam' }) },
    { label: 'Sweet Mango Pickle', action: () => onNavigate('product-detail', { productId: 'meethi-aam' }) },
    { label: 'Dry Mango Pickle', action: () => onNavigate('category', { categoryId: 'mango' }) },
    { label: 'Nimbu Ka Achar', action: () => onNavigate('category', { categoryId: 'nimbu' }) },
    { label: 'Lemon Pickle', action: () => onNavigate('category', { categoryId: 'nimbu' }) },
    { label: 'Sweet Lemon Pickle', action: () => onNavigate('product-detail', { productId: 'nimbu-khatta-meetha' }) },
    { label: 'Kala Nimbu Achar', action: () => onNavigate('category', { categoryId: 'nimbu' }) },
    { label: 'Hari Mirch Ka Achar', action: () => onNavigate('category', { categoryId: 'green-mirch' }) },
    { label: 'Red Chilli Pickle', action: () => onNavigate('category', { categoryId: 'mirchi' }) },
    { label: 'Lal Mirch Ka Achar', action: () => onNavigate('product-detail', { productId: 'lal-mirch-bharwa' }) },
    { label: 'Rajasthani Mirchi Achar', action: () => onNavigate('category', { categoryId: 'mirchi' }) },
    { label: 'Garlic Pickle', action: () => onNavigate('category', { categoryId: 'garlic' }) },
    { label: 'Desi Lahsun Ka Achar', action: () => onNavigate('product-detail', { productId: 'garlic-lahsun' }) },
    { label: 'Mixed Pickle', action: () => onNavigate('category', { categoryId: 'mixed' }) },
    { label: 'Pachranga Achar', action: () => onNavigate('product-detail', { productId: 'mix-pachranga' }) },
    { label: 'Ker Sangri Pickle', action: () => onNavigate('category', { categoryId: 'heritage' }) },
    { label: 'Gunda Lesua Achar', action: () => onNavigate('category', { categoryId: 'heritage' }) },
    { label: 'Custom Combo Box', action: () => onNavigate('combo-builder') },
    { label: 'Festive Gift Hampers', action: () => onNavigate('festive') },
    { label: 'Mustard Oil Pickles', action: () => onNavigate('all-products') },
    { label: 'Zero Preservative Achar', action: () => onNavigate('our-story') }
  ];

  return (
    <footer id="footer2" className="relative bg-[#1A1009] text-[#F3E8DB] pt-12 pb-24 lg:pb-8 font-sans overflow-hidden">
      
      {/* Decorative Traditional Rajasthani Arch Pattern Top Border Strip */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D97706] via-[#FBBF24] via-[#F59E0B] to-[#D97706]" />
      
      {/* Subtle Warm Background Glow Accents */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#C88214]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 4 TRUST BADGES STRIP (With Golden Accent Border & Glassmorphism Card Design) */}
      {/* ========================================================================= */}
      <div className="max-w-[1280px] mx-auto px-4 pb-10 mb-10 border-b border-[#352115] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-left">
          
          {/* Card 1 */}
          <div className="group relative flex items-center gap-3.5 bg-gradient-to-br from-[#27170F] to-[#1E120A] p-3.5 sm:p-4 rounded-2xl border border-[#482D1D] hover:border-[#D97706] shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#3D2213] to-[#55301A] border border-[#C88214]/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-[#FBBF24]" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs sm:text-sm text-[#FFFDF9] tracking-tight group-hover:text-[#FBBF24] transition-colors">
                100% Homemade
              </h5>
              <p className="text-[11px] text-[#B8A796] leading-tight mt-0.5">
                Cold-pressed mustard oil
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex items-center gap-3.5 bg-gradient-to-br from-[#27170F] to-[#1E120A] p-3.5 sm:p-4 rounded-2xl border border-[#482D1D] hover:border-[#D97706] shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#3D2213] to-[#55301A] border border-[#C88214]/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-[#FBBF24]" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs sm:text-sm text-[#FFFDF9] tracking-tight group-hover:text-[#FBBF24] transition-colors">
                No Chemicals
              </h5>
              <p className="text-[11px] text-[#B8A796] leading-tight mt-0.5">
                Zero synthetic vinegar
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex items-center gap-3.5 bg-gradient-to-br from-[#27170F] to-[#1E120A] p-3.5 sm:p-4 rounded-2xl border border-[#482D1D] hover:border-[#D97706] shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#3D2213] to-[#55301A] border border-[#C88214]/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 text-[#FBBF24]" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs sm:text-sm text-[#FFFDF9] tracking-tight group-hover:text-[#FBBF24] transition-colors">
                Rural Women Made
              </h5>
              <p className="text-[11px] text-[#B8A796] leading-tight mt-0.5">
                45+ mothers in Sikar
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative flex items-center gap-3.5 bg-gradient-to-br from-[#27170F] to-[#1E120A] p-3.5 sm:p-4 rounded-2xl border border-[#482D1D] hover:border-[#D97706] shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#3D2213] to-[#55301A] border border-[#C88214]/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5 text-[#FBBF24]" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs sm:text-sm text-[#FFFDF9] tracking-tight group-hover:text-[#FBBF24] transition-colors">
                Pan-India Shipping
              </h5>
              <p className="text-[11px] text-[#B8A796] leading-tight mt-0.5">
                Cushioned safe glass jars
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN FOOTER GRID (With Styled Boxes, Clear Contrast & No Overflow) */}
      {/* ========================================================================= */}
      <div className="max-w-[1280px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Col 1: Brand Logo, Reg Address & Highlighted Social Bar (5 cols) */}
          <div className="lg:col-span-4 space-y-4 bg-[#23140D]/70 p-5 rounded-3xl border border-[#3A2215] shadow-sm">
            {/* Website Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C88214] via-[#F59E0B] to-[#FBBF24] text-[#1C120C] flex items-center justify-center font-serif font-black text-2xl shadow-lg ring-2 ring-amber-400/30">
                M
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-tight text-[#FFFDF9]">
                  Marusthali <span className="text-[#FBBF24]">Achar</span>
                </span>
                <p className="text-[10px] font-bold tracking-widest text-[#D4B996] uppercase">
                  Artisanal Village Pickles • Sikar
                </p>
              </div>
            </div>

            {/* Reg Address */}
            <div className="text-xs text-[#C2B29F] leading-relaxed pt-1">
              <p className="font-bold text-[#F3E8DB] mb-1 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Registered Address :</span>
              </p>
              <p className="font-medium text-[#B8A796] pl-5 leading-normal">
                Marusthali Rural Foods & Crafts Private Limited<br />
                Plot No. 84, Shekhawati Heritage Complex,<br />
                Near Old Bus Stand, Ward No. 5,<br />
                Sikar, Rajasthan, 332001
              </p>
            </div>

            {/* Social Media Follow Box - Highlighted & Styled Pill Container */}
            <div className="pt-3 border-t border-[#3A2215]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#FBBF24]">
                  FOLLOW MARUSTHALI ACHAR
                </h4>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-md ring-2 ring-white/10 hover:ring-[#DD2A7B]"
                  aria-label="Instagram"
                  title="Follow Marusthali Achar on Instagram"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#1877F2] hover:bg-[#0C63D4] text-white flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-md ring-2 ring-white/10 hover:ring-[#1877F2]"
                  aria-label="Facebook"
                  title="Follow Marusthali Achar on Facebook"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-md ring-2 ring-white/10 hover:ring-[#FF0000]"
                  aria-label="YouTube"
                  title="Subscribe to Marusthali Achar on YouTube"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-black hover:bg-neutral-900 text-white border border-[#442C1E] flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-md ring-2 ring-white/10"
                  aria-label="Twitter / X"
                  title="Follow Marusthali Achar on X"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-md ring-2 ring-white/10 hover:ring-[#25D366]"
                  aria-label="WhatsApp"
                  title="Chat with Marusthali Achar on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                </a>
              </div>
            </div>

          </div>

          {/* Col 2: Shop Menu (Desktop + Mobile Accordion) (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3 bg-[#23140D]/40 p-5 rounded-3xl border border-[#3A2215]/80">
            <button 
              onClick={() => toggleSection('shop')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 border-b md:border-b-0 border-[#3D281C]"
            >
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#FBBF24]">
                Shop Flavours
              </h3>
              <ChevronDown className={`w-4 h-4 md:hidden text-[#C88214] transition-transform ${openSections.shop ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2.5 text-xs text-[#C2B29F] ${openSections.shop ? 'block' : 'hidden md:block'}`}>
              <li>
                <button onClick={() => onNavigate('all-products')} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Homemade Pickles (All)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', { categoryId: 'mango' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Mango Pickles (Aam Ka Achar)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', { categoryId: 'mirchi' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Spicy Red & Green Chillies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', { categoryId: 'nimbu' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Tangy Lemon Pickles (Nimbu)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product-detail', { productId: 'nimbu-khatta-meetha' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Sweet & Tangy Pickles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', { categoryId: 'garlic' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Mustard Oil Garlic Pickles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', { categoryId: 'heritage' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Rajasthani Heritage Pickles
                </button>
              </li>
              <li className="pt-1">
                <button onClick={() => onNavigate('combo-builder')} className="hover:text-[#FBBF24] hover:underline transition-colors font-bold text-[#F59E0B] flex items-center gap-1">
                  <span>Build Custom Combo</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Policies (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3 bg-[#23140D]/40 p-5 rounded-3xl border border-[#3A2215]/80">
            <button 
              onClick={() => toggleSection('policies')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 border-b md:border-b-0 border-[#3D281C]"
            >
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#FBBF24]">
                Customer Policies
              </h3>
              <ChevronDown className={`w-4 h-4 md:hidden text-[#C88214] transition-transform ${openSections.policies ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2.5 text-xs text-[#C2B29F] ${openSections.policies ? 'block' : 'hidden md:block'}`}>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'privacy' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'privacy' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Privacy Policies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'returns' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Cancellation & 100% Refund
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'shipping' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Shipping & Pan-India Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policy', { policyType: 'food-safety' })} className="hover:text-[#FFFDF9] hover:underline transition-colors text-left">
                  Food Safety & FSSAI Standards
                </button>
              </li>
              <li className="pt-1">
                <button onClick={() => onNavigate('account', { tab: 'orders' })} className="hover:text-[#FBBF24] hover:underline transition-colors font-bold text-[#F59E0B] flex items-center gap-1">
                  <span>Track My Order</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Need Help? & Support Desk (3 cols) */}
          <div className="lg:col-span-3 space-y-3 bg-[#23140D]/40 p-5 rounded-3xl border border-[#3A2215]/80">
            <button 
              onClick={() => toggleSection('company')}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 border-b md:border-b-0 border-[#3D281C]"
            >
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#FBBF24]">
                Need Help?
              </h3>
              <ChevronDown className={`w-4 h-4 md:hidden text-[#C88214] transition-transform ${openSections.company ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`space-y-3 text-xs text-[#C2B29F] ${openSections.company ? 'block' : 'hidden md:block'}`}>
              <div>
                <a 
                  href="mailto:customercare@marusthaliachar.com" 
                  className="hover:text-[#FFFDF9] hover:underline flex items-start gap-2 break-all group"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-snug">customercare@marusthaliachar.com</span>
                </a>
              </div>
              <div>
                <a 
                  href="mailto:careers@marusthaliachar.com" 
                  className="hover:text-[#FFFDF9] hover:underline flex items-start gap-2 break-all group"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-snug">careers@marusthaliachar.com</span>
                </a>
              </div>
              <div>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#FFFDF9] hover:underline flex items-center gap-2 font-bold text-[#25D366] group"
                >
                  <Phone className="w-4 h-4 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 9876543210</span>
                </a>
              </div>
              <div className="pt-0.5 text-[11px] text-[#A89885] leading-relaxed flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C88214] shrink-0 mt-0.5" />
                <span>Monday–Saturday: 10:00 AM – 6:00 PM</span>
              </div>

              <div className="pt-2.5 border-t border-[#3A2215] space-y-1.5">
                <button 
                  onClick={() => onNavigate('our-story')} 
                  className="hover:text-[#FBBF24] hover:underline block font-bold text-[#F3E8DB] text-left"
                >
                  Our Rural Story & Impact
                </button>
                <button 
                  onClick={() => onNavigate('faq')} 
                  className="hover:text-[#FBBF24] hover:underline block text-[#C2B29F] text-left"
                >
                  Frequently Asked Questions
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* POPULAR SEARCHES (Neat Tag Cloud Design with Gold Dividers) */}
      {/* ========================================================================= */}
      <div className="max-w-[1280px] mx-auto px-4 mt-12 pt-8 border-t border-[#352115] relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#FBBF24]">
            POPULAR SEARCHES
          </h4>
        </div>
        <div className="text-[12px] leading-relaxed text-[#A89885]">
          {popularSearches.map((item, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={item.action}
                className="hover:text-[#FFFDF9] hover:text-[#FBBF24] hover:underline inline-block transition-colors cursor-pointer py-0.5"
              >
                {item.label}
              </button>
              {idx < popularSearches.length - 1 && (
                <span className="mx-2 text-[#4A3223]">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM PAYMENT STRIP (Rich Black Strip with Gold Highlights & Badges) */}
      {/* ========================================================================= */}
      <div className="bg-[#0D0805] text-white mt-12 py-6 px-4 border-t border-[#26160D] relative z-10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-gray-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Secure Payments • Safe Honeycomb Glass Packaging</span>
          </p>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center text-[11px]">
            <span className="bg-[#1C120C] text-gray-200 border border-[#3D281C] px-3 py-1 rounded-md font-semibold tracking-wider shadow-2xs">
              UPI
            </span>
            <span className="bg-[#1C120C] text-gray-200 border border-[#3D281C] px-3 py-1 rounded-md font-semibold tracking-wider shadow-2xs">
              VISA
            </span>
            <span className="bg-[#1C120C] text-gray-200 border border-[#3D281C] px-3 py-1 rounded-md font-semibold tracking-wider shadow-2xs">
              MASTERCARD
            </span>
            <span className="bg-[#1C120C] text-gray-200 border border-[#3D281C] px-3 py-1 rounded-md font-semibold tracking-wider shadow-2xs">
              RUPAY
            </span>
            <span className="bg-[#1C120C] text-[#FBBF24] border border-[#C88214]/60 px-3 py-1 rounded-md font-bold tracking-wider shadow-2xs">
              CASH ON DELIVERY
            </span>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto mt-4 pt-4 border-t border-[#1C120C] text-[11px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Marusthali Achar. All Rights Reserved.</span>
          <span>Crafted with love by 45+ rural women artisans in Sikar, Rajasthan</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
