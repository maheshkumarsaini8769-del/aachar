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
      <div className="relative bg-[#FAF6EE] pt-8 sm:pt-12 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 border-t border-[#E8DDCD]">
        
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

              {/* Handcrafted Illustration Sketch inside frame */}
              <div className="aspect-4/3 bg-[#FBF8F1] rounded-xs border border-stone-200 overflow-hidden relative flex items-center justify-center p-2">
                
                {/* Vector Heritage Kitchen Sketch with Ceramic Barnis & Rural Mother */}
                <svg className="w-full h-full text-[#3D2517]" viewBox="0 0 200 140" fill="none">
                  {/* Kitchen Shelf */}
                  <line x1="15" y1="95" x2="185" y2="95" stroke="#B8A18B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="25" y1="98" x2="25" y2="135" stroke="#B8A18B" strokeWidth="2" />
                  <line x1="175" y1="98" x2="175" y2="135" stroke="#B8A18B" strokeWidth="2" />

                  {/* Ceramic Barni 1 (Small Left) */}
                  <rect x="24" y="55" width="28" height="38" rx="7" fill="#E8D5B7" stroke="#8C6542" strokeWidth="2" />
                  <path d="M22 65 Q38 52 54 65" stroke="#8C6542" strokeWidth="1.5" />
                  <rect x="27" y="52" width="22" height="6" rx="2" fill="#8C4A20" />
                  {/* Cotton cloth tied top */}
                  <path d="M26 50 Q38 46 50 50 L48 54 L28 54 Z" fill="#FFFDF9" stroke="#8C6542" strokeWidth="1.2" />
                  <circle cx="38" cy="53" r="2.5" fill="#8C4A20" />

                  {/* Ceramic Barni 2 (Center Big) */}
                  <rect x="58" y="42" width="36" height="51" rx="9" fill="#FFFDF9" stroke="#663B19" strokeWidth="2.2" />
                  {/* Glazed ochre top */}
                  <path d="M58 55 Q76 42 94 55 L94 42 L58 42 Z" fill="#C88214" />
                  <rect x="62" y="38" width="28" height="7" rx="2" fill="#8C4A20" stroke="#663B19" strokeWidth="1.5" />
                  {/* Cotton cloth lid with string */}
                  <path d="M60 36 Q76 30 92 36 L90 41 L62 41 Z" fill="#FAF6EE" stroke="#663B19" strokeWidth="1.2" />
                  <line x1="61" y1="40" x2="91" y2="40" stroke="#C88214" strokeWidth="1.5" />
                  <text x="76" y="74" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#663B19" fontFamily="serif">ACHAR</text>

                  {/* Ceramic Barni 3 (Medium) */}
                  <rect x="100" y="50" width="30" height="43" rx="8" fill="#E8D5B7" stroke="#8C6542" strokeWidth="2" />
                  <path d="M98 62 Q115 50 132 62" stroke="#8C6542" strokeWidth="1.5" />
                  <rect x="103" y="47" width="24" height="6" rx="2" fill="#8C4A20" />
                  <path d="M102 45 Q115 41 128 45 L126 49 L104 49 Z" fill="#FFFDF9" stroke="#8C6542" strokeWidth="1.2" />

                  {/* Smiling Rural Woman Artisan (Right side of sketch) */}
                  <g transform="translate(136, 32)">
                    {/* Odhni / Veil */}
                    <path d="M12 16 Q28 6 44 18 Q48 42 42 66 Q28 68 14 66 Z" fill="#9C4E15" opacity="0.9" />
                    {/* Face */}
                    <ellipse cx="28" cy="28" rx="10" ry="12" fill="#FCE4D6" stroke="#8C4A20" strokeWidth="1.5" />
                    {/* Hair */}
                    <path d="M19 24 Q28 17 37 24 Z" fill="#2D1810" />
                    {/* Bindi */}
                    <circle cx="28" cy="24" r="1.5" fill="#C00" />
                    {/* Eyes smiling */}
                    <path d="M22 28 Q25 30 27 28" stroke="#2D1810" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M29 28 Q31 30 34 28" stroke="#2D1810" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    {/* Smile */}
                    <path d="M25 34 Q28 37 31 34" stroke="#8C4A20" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    {/* Traditional Kurti */}
                    <path d="M17 40 L39 40 L44 65 L12 65 Z" fill="#E59400" stroke="#8C4A20" strokeWidth="1.5" />
                    {/* Bangles / Hand holding wooden spoon */}
                    <path d="M12 50 Q6 56 16 60" stroke="#8C4A20" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <line x1="16" y1="62" x2="8" y2="40" stroke="#8C6542" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="8" cy="38" r="4" fill="#B8860B" />
                  </g>
                </svg>

                {/* Subtle Stamp in bottom corner */}
                <div className="absolute bottom-1 right-1.5 text-[8px] font-mono text-stone-500 font-bold uppercase tracking-widest opacity-75">
                  SIKAR • RAJASTHAN
                </div>
              </div>

              {/* Hand-written style caption below sketch */}
              <p className="text-center font-serif text-[11px] text-[#5A4031] font-bold italic mt-2">
                Slow Sun-Fermented in Ceramic Jars
              </p>
            </div>
          </div>

        </div>

        {/* Continuous Smooth Wave / Slide Transition across Full Width */}
        <div className="absolute -bottom-1 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="w-full h-10 sm:h-14 lg:h-16 text-[#1C120C] fill-current block" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,28 C280,68 480,12 740,36 C1000,60 1200,12 1440,28 L1440,80 L0,80 Z" />
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
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-[#333] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border border-white/10"
                    aria-label="Instagram"
                    title="Follow Marusthali Achar on Instagram"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>

                  {/* Pinterest / Threads */}
                  <a 
                    href="https://www.pinterest.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-[#333] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border border-white/10"
                    aria-label="Pinterest"
                    title="Follow Marusthali Achar on Pinterest"
                  >
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-[#333] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border border-white/10"
                    aria-label="Facebook"
                    title="Follow Marusthali Achar on Facebook"
                  >
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>

                  {/* Twitter / X */}
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-[#333] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border border-white/10"
                    aria-label="Twitter / X"
                    title="Follow Marusthali Achar on X"
                  >
                    <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a 
                    href="https://www.youtube.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-[#333] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md border border-white/10"
                    aria-label="YouTube"
                    title="Subscribe to Marusthali Achar on YouTube"
                  >
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1C120C"/>
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
