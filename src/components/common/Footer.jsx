import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Briefcase,
  Gift,
  HelpCircle
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer = ({ onNavigate }) => {
  // Mobile accordion state for sections
  const [openSections, setOpenSections] = useState({
    shop: false,
    policies: false,
    company: false
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
    <footer id="main-footer" className="relative font-sans overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP ILLUSTRATED RIBBON BANNER (Signature FarmDidi Feature Layout) */}
      {/* ========================================================================= */}
      <div className="relative bg-[#FAF6EE] pt-8 sm:pt-12 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-6 lg:px-8 border-t border-[#E8DDCD]">
        
        {/* Subtle Decorative Background Arches / Sun Ray Texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <svg className="w-full h-full text-[#E5D5C0]" viewBox="0 0 1440 240" fill="none" preserveAspectRatio="none">
            <path d="M-50,80 Q250,180 600,100 T1300,140 Q1450,110 1500,80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M-50,110 Q280,210 650,130 T1350,170" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
          
          {/* Left: Joyful Curving Header with Stitched Arch Wave */}
          <div className="text-center lg:text-left space-y-2 max-w-2xl">
            <div className="relative inline-block">
              {/* Warm decorative curved swoosh underline */}
              <svg className="absolute -top-3 sm:-top-5 -left-4 sm:-left-6 w-16 sm:w-24 h-10 sm:h-14 text-[#C88214]/30 pointer-events-none" viewBox="0 0 100 60" fill="none">
                <path d="M10,45 Q50,5 90,30" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
              </svg>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-[#2D1810] tracking-tight leading-tight drop-shadow-xs">
                Taste that brings <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#9C4E15]">you back home</span>
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#6E5444] max-w-xl">
              Authentic Rajasthani pickles sun-cured in glazed ceramic barnis for 21–40 days. Handcrafted with traditional stone-ground spices & 100% cold-pressed mustard oil.
            </p>
          </div>

          {/* Right: Signature Framed Polaroid Card ("Made with love in Dadi's Rasoi") */}
          <div className="shrink-0 relative group">
            {/* Cute wooden tape / pin at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-16 h-5 bg-[#D2B48C]/90 rounded-sm shadow-xs border border-[#B38F6A] rotate-[-2deg]" />

            {/* Polaroid Photo Frame */}
            <div className="bg-white p-3 sm:p-3.5 pb-4 rounded-sm shadow-xl border border-stone-200 rotate-1 sm:rotate-2 group-hover:rotate-0 transition-transform duration-300 w-[240px] sm:w-[270px]">
              
              {/* Yellow Title Strip on Polaroid */}
              <div className="bg-[#B45309] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider py-1.5 px-3 text-center rounded-xs shadow-xs mb-2">
                Made with love in Dadi's Kitchen
              </div>

              {/* Authentic Kachi Kairi & Ceramic Barni Photo inside frame */}
              <div className="aspect-4/3 bg-[#FBF8F1] rounded-xs border border-stone-200 overflow-hidden relative group/img">
                <img 
                  src="/images/products/mango-ceramic-barni.jpg" 
                  alt="Authentic Kachi Kairi in Terracotta Bowl & Glazed Ceramic Barni"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Subtle Sun-Cured Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Kachi Kairi Authentic Tag */}
                <div className="absolute top-2 left-2 bg-[#15803D]/95 backdrop-blur-xs text-white text-[9px] font-black uppercase tracking-wider py-0.5 px-2 rounded-xs shadow-xs">
                  Kachi Kairi
                </div>

                {/* Subtle Stamp in bottom corner */}
                <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-white/90 font-bold uppercase tracking-widest drop-shadow-sm">
                  SIKAR • RAJASTHAN
                </div>
              </div>

              {/* Hand-written style caption below photo */}
              <p className="text-center font-serif text-[11px] sm:text-xs text-[#5A4031] font-bold italic mt-2.5">
                Slow Sun-Fermented in Ceramic Jars
              </p>
            </div>
          </div>

        </div>

        {/* Continuous Smooth Wave / Slide Transition across Full Width - Increased Height & Prominent Slide Slope */}
        <div className="absolute -bottom-1 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="w-full h-16 sm:h-24 lg:h-32 text-[#1C120C] fill-current block" viewBox="0 0 1440 140" preserveAspectRatio="none">
            <path d="M0,45 C280,125 460,10 740,55 C1020,115 1220,15 1440,45 L1440,140 L0,140 Z" />
          </svg>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN FOOTER CONTENT (NO YELLOW - Deep Royal Heritage Brown Background) */}
      {/* ========================================================================= */}
      <div className="relative bg-[#1C120C] text-[#FAF6EE] pt-10 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C88214]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto relative z-10">
          
          {/* Main 4-Column Grid (Mirroring FarmDidi Layout Structure) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ------------------------------------------------------------- */}
            {/* Col 1: Brand Circular Logo, Reg Address & Solid Round Socials */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Brand Circular Heritage Seal Badge */}
              <BrandLogo 
                variant="badge" 
                size="lg" 
                onClick={() => onNavigate('home')} 
              />

              {/* Reg Address */}
              <div className="space-y-1 text-xs text-[#D9C8B4] leading-relaxed pt-1">
                <p className="font-bold text-[#FFFDF9] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A855] shrink-0" />
                  <span>Reg Address :</span>
                </p>
                <p className="font-medium text-[#C2B29F] pl-5 leading-normal">
                  Marusthali Rural Foods Private Limited<br />
                  Plot No. 84, Shekhawati Heritage Zone, Sector 5,<br />
                  Near Old Sikar Highway, Piprali Road,<br />
                  Sikar, Rajasthan, 332001
                </p>
              </div>

              {/* Social Media Section: Title + 5 Circular Black Buttons */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-[#FFFDF9]">
                  FOLLOW MARUSTHALI ACHAR
                </h4>

                {/* 5 Solid Round Black Discs with Crisp White Icons (Exact FarmDidi Style) */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#120B07] hover:bg-[#B45309] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border-2 border-white/25 hover:border-amber-400 group cursor-pointer"
                    aria-label="Instagram"
                    title="Follow Marusthali Achar on Instagram"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a 
                    href="https://www.pinterest.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#120B07] hover:bg-[#B45309] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border-2 border-white/25 hover:border-amber-400 group cursor-pointer"
                    aria-label="Pinterest"
                    title="Follow Marusthali Achar on Pinterest"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#120B07] hover:bg-[#B45309] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border-2 border-white/25 hover:border-amber-400 group cursor-pointer"
                    aria-label="Facebook"
                    title="Follow Marusthali Achar on Facebook"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>

                  {/* Twitter / X */}
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#120B07] hover:bg-[#B45309] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border-2 border-white/25 hover:border-amber-400 group cursor-pointer"
                    aria-label="Twitter / X"
                    title="Follow Marusthali Achar on X"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a 
                    href="https://www.youtube.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#120B07] hover:bg-[#B45309] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border-2 border-white/25 hover:border-amber-400 group cursor-pointer"
                    aria-label="YouTube"
                    title="Subscribe to Marusthali Achar on YouTube"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      {/* White YouTube Screen Shape */}
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FFFFFF"/>
                      {/* Dark Play Triangle Cutout */}
                      <polygon points="9.5 15.5 15.8 12 9.5 8.5 9.5 15.5" fill="#120B07" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* ------------------------------------------------------------- */}
            {/* Col 2: SHOP (Clean List of Flavours) */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-2 space-y-3">
              <button 
                onClick={() => toggleSection('shop')}
                className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 border-b md:border-b-0 border-[#382316]"
              >
                <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-widest text-[#FFFDF9]">
                  SHOP
                </h3>
                <ChevronDown className={`w-4 h-4 md:hidden text-[#E5A855] transition-transform ${openSections.shop ? 'rotate-180' : ''}`} />
              </button>
              
              <ul className={`space-y-2.5 text-xs sm:text-[13px] text-[#D9C8B4] ${openSections.shop ? 'block' : 'hidden md:block'}`}>
                <li>
                  <button onClick={() => onNavigate('all-products')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Homemade Pickles
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('all-products')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Mustard Oil Pickles
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category', { categoryId: 'mirchi' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Spicy Pickles
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category', { categoryId: 'nimbu' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Tangy Pickles
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('product-detail', { productId: 'meethi-aam' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Sweet Pickles
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category', { categoryId: 'mango' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Mango Pickles
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('category', { categoryId: 'garlic' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Oil Free & Garlic
                  </button>
                </li>
              </ul>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Col 3: POLICIES */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-3 space-y-3">
              <button 
                onClick={() => toggleSection('policies')}
                className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 border-b md:border-b-0 border-[#382316]"
              >
                <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-widest text-[#FFFDF9]">
                  POLICIES
                </h3>
                <ChevronDown className={`w-4 h-4 md:hidden text-[#E5A855] transition-transform ${openSections.policies ? 'rotate-180' : ''}`} />
              </button>
              
              <ul className={`space-y-2.5 text-xs sm:text-[13px] text-[#D9C8B4] ${openSections.policies ? 'block' : 'hidden md:block'}`}>
                <li>
                  <button onClick={() => onNavigate('policy', { policyType: 'terms' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('policy', { policyType: 'privacy' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Privacy Policies
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('policy', { policyType: 'returns' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Cancellation and Refund
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('policy', { policyType: 'shipping' })} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    Shipping and Exchange
                  </button>
                </li>
              </ul>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Col 4: COMPANY & NEED HELP? */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-3 space-y-5">
              
              {/* Company Links */}
              <div className="space-y-2.5">
                <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-widest text-[#FFFDF9]">
                  COMPANY
                </h3>
                <ul className="space-y-2 text-xs sm:text-[13px] text-[#D9C8B4]">
                  <li>
                    <button onClick={() => onNavigate('our-story')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                      Our Story
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('our-story')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                      Blogs and Recipe
                    </button>
                  </li>
                </ul>
              </div>

              {/* Need Help? Block */}
              <div className="space-y-2 pt-2 border-t border-[#382316]/70">
                <h4 className="font-bold text-xs sm:text-sm text-[#FFFDF9]">
                  Need Help?
                </h4>
                
                <div className="space-y-1.5 text-xs text-[#D9C8B4]">
                  <p>
                    <a href="mailto:customercare@marusthaliachar.com" className="hover:text-white hover:underline break-all">
                      customercare@marusthaliachar.com
                    </a>
                  </p>
                  <p>
                    <a href="mailto:careers@marusthaliachar.com" className="hover:text-white hover:underline break-all">
                      careers@marusthaliachar.com
                    </a>
                  </p>
                  <p className="font-semibold text-[#FFFDF9]">
                    <a href="tel:+919829012345" className="hover:underline">
                      +91 98290 12345
                    </a>
                  </p>
                  <p className="text-[11px] text-[#B8A796] pt-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E5A855] shrink-0" />
                    <span>Working hours: Monday–Saturday | 10 AM – 6 PM</span>
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 3. POPULAR SEARCHES (Dense Keyword Cloud Separated by Pipes |) */}
          {/* ========================================================================= */}
          <div className="mt-12 pt-8 border-t border-[#382316] space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#FFFDF9] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
              <span>POPULAR SEARCHES</span>
            </h4>

            <div className="text-[11px] sm:text-xs leading-relaxed text-[#B8A796]">
              {popularSearches.map((item, idx) => (
                <React.Fragment key={idx}>
                  <button
                    onClick={item.action}
                    className="hover:text-white hover:underline inline-block transition-colors cursor-pointer py-0.5"
                  >
                    {item.label}
                  </button>
                  {idx < popularSearches.length - 1 && (
                    <span className="mx-2 text-[#4E3424]">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FLIPKART-STYLE BOTTOM UTILITY & PAYMENT BAR */}
      {/* ========================================================================= */}
      <div className="bg-[#121212] text-[#E0E0E0] py-4 sm:py-5 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
        <div className="max-w-[1360px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-[13px]">
          
          {/* Quick Utility Links (Flipkart style with amber/gold icons) */}
          <div className="flex items-center flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 font-medium text-white/90">
            {/* Become a Seller */}
            <button 
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 hover:text-[#FFB800] transition-colors group cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform" />
              <span>Become a Seller</span>
            </button>

            {/* Advertise */}
            <button 
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 hover:text-[#FFB800] transition-colors group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform" />
              <span>Advertise</span>
            </button>

            {/* Gift Cards */}
            <button 
              onClick={() => onNavigate('festive')}
              className="inline-flex items-center gap-2 hover:text-[#FFB800] transition-colors group cursor-pointer"
            >
              <Gift className="w-4 h-4 text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform" />
              <span>Gift Cards</span>
            </button>

            {/* Help Center */}
            <button 
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 hover:text-[#FFB800] transition-colors group cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#FFB800] shrink-0 group-hover:scale-110 transition-transform" />
              <span>Help Center</span>
            </button>
          </div>

          {/* Copyright notice (Flipkart style) */}
          <div className="text-stone-300 text-xs text-center xl:text-left whitespace-nowrap">
            © 2007-{new Date().getFullYear()} Marusthali.com
          </div>

          {/* Payment Partner Logos (Flipkart Card Strip Style) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            {/* VISA */}
            <div className="bg-white px-2 py-1 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[36px]">
              <span className="font-sans font-black italic tracking-tighter text-[#1A1F71] text-[11px] sm:text-xs leading-none">
                VISA
              </span>
            </div>

            {/* MasterCard */}
            <div className="bg-white px-1.5 py-1 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[34px]">
              <div className="flex items-center -space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
              </div>
            </div>

            {/* Maestro */}
            <div className="bg-white px-1.5 py-1 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[34px]">
              <div className="flex items-center -space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#0099DF] opacity-90" />
              </div>
            </div>

            {/* American Express */}
            <div className="bg-[#007AC1] px-1.5 py-0.5 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[36px]">
              <span className="font-sans font-black text-white text-[8px] sm:text-[9px] tracking-tight uppercase leading-none">
                AMEX
              </span>
            </div>

            {/* Diners Club */}
            <div className="bg-white px-1.5 py-1 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[34px]">
              <div className="w-3.5 h-3.5 rounded-full border border-[#004B87] flex items-center justify-center">
                <div className="w-1.5 h-2 bg-[#004B87] rounded-xs" />
              </div>
            </div>

            {/* Discover */}
            <div className="bg-white px-1.5 py-0.5 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[38px]">
              <span className="font-sans font-black text-[#1F1F1F] text-[8px] sm:text-[9px] tracking-tighter leading-none flex items-center">
                DISC<span className="w-1.5 h-1.5 rounded-full bg-[#FF6000] inline-block mx-0.5"></span>VER
              </span>
            </div>

            {/* RuPay */}
            <div className="bg-white px-2 py-0.5 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6 min-w-[38px]">
              <span className="font-sans font-black tracking-tighter text-[#1C3E8A] text-[9px] sm:text-[10px] leading-none">
                Ru<span className="text-[#F15A24]">Pay</span>
              </span>
            </div>

            {/* Net Banking */}
            <div className="bg-white px-1.5 py-0.5 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6">
              <span className="font-sans font-bold text-stone-700 text-[8px] sm:text-[9px] tracking-tight uppercase leading-none">
                Net Banking
              </span>
            </div>

            {/* Cash on Delivery */}
            <div className="bg-white px-1.5 py-0.5 rounded-xs shadow-xs flex items-center justify-center h-5 sm:h-6">
              <span className="font-sans font-bold text-stone-700 text-[8px] sm:text-[9px] tracking-tight uppercase leading-none">
                COD
              </span>
            </div>

            {/* UPI */}
            <div className="bg-white px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-0.5 h-5 sm:h-6 min-w-[34px]">
              <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24">
                <path d="M12 2L3 8l9 6 9-6-9-6z" fill="#097939" />
                <path d="M3 16l9 6 9-6" stroke="#ED7524" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
              <span className="font-sans font-black tracking-tight text-[#2D2D2D] text-[9px] leading-none">
                UPI
              </span>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
