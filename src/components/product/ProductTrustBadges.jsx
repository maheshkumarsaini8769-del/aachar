import React from 'react';

/**
 * ProductTrustBadges
 * Matches the requested 4 circular hand-crafted trust seals:
 * 1. "Hygienically Handmade" (Bangle hands wearing yellow safety hygiene gloves)
 * 2. "Premium Ingredients" (Stone mortar pestle with star anise & verified seal badge)
 * 3. "Sun-Dried" (Radiant golden sun with sun-cured warmth rays)
 * 4. "No Chemical Preservatives" (Chemistry flask with red X badge)
 */
export const ProductTrustBadges = ({ className = '' }) => {
  return (
    <div className={`w-full bg-white rounded-2xl sm:rounded-3xl border border-[#E8DDCD] p-4 sm:p-6 shadow-xs ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-start">
        
        {/* 1. Hygienically Handmade */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center p-2 bg-[#FFFDF9] transition-transform duration-200 group-hover:scale-105 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Arm & Wrist Bangles */}
              <path d="M30 82 L38 58 L46 60 L40 84 Z" fill="#FFE0B2" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Red & Gold Traditional Bangles */}
              <line x1="33" y1="78" x2="42" y2="80" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="31" y1="81" x2="40" y2="83" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              {/* Glove Body - Right Hand (Yellow Hygiene Glove) */}
              <path 
                d="M38 58 C38 54 41 50 45 49 L46 36 C46 32 50 31 52 34 L53 47 C54 44 57 43 59 46 L60 48 C61 46 64 45 66 48 L66 57 C67 55 70 55 71 58 C72 62 70 68 66 73 C61 78 52 76 46 72 C42 69 38 64 38 58 Z" 
                fill="#FDE047" 
                stroke="#111" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              {/* Left Hand / Glove adjusting cuff */}
              <path 
                d="M48 24 C46 20 42 20 40 23 L32 38 C30 42 27 46 27 50 C27 55 31 58 35 56 L42 50 C44 48 45 44 45 40 L45 28 C45 25 47 24 48 24 Z" 
                fill="#FEF08A" 
                stroke="#111" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              {/* Glove Cuff fold line */}
              <path d="M38 60 C42 61 46 62 50 63" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              {/* Hand hygiene sparkles */}
              <circle cx="68" cy="28" r="1.5" fill="#F59E0B" />
              <circle cx="74" cy="36" r="1" fill="#F59E0B" />
            </svg>
          </div>
          <span className="mt-2.5 font-bold text-xs sm:text-sm text-[#2D1810] tracking-tight leading-snug">
            Hygienically<br />Handmade
          </span>
        </div>

        {/* 2. Premium Ingredients */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center p-2 bg-[#FFFDF9] transition-transform duration-200 group-hover:scale-105 shadow-xs relative">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Mortar Bowl (Yellow) */}
              <path 
                d="M26 42 L74 42 C74 42 72 65 50 65 C28 65 26 42 26 42 Z" 
                fill="#FDE047" 
                stroke="#111" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              {/* Mortar Top Rim */}
              <ellipse cx="50" cy="42" rx="24" ry="4.5" fill="#FEF08A" stroke="#111" strokeWidth="2.5" />
              {/* Mortar Base Stand */}
              <path d="M40 65 L60 65 L63 69 L37 69 Z" fill="#FDE047" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Pestle Handle sticking out */}
              <path 
                d="M62 18 C65 17 68 20 67 24 L52 46 C50 49 46 48 45 45 L57 23 C58 20 60 18 62 18 Z" 
                fill="#FEF08A" 
                stroke="#111" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />

              {/* Star Anise Spice on the Left */}
              <g transform="translate(14, 52) scale(0.65)">
                <path 
                  d="M20 5 L23 15 L33 13 L27 20 L33 27 L23 25 L20 35 L17 25 L7 27 L13 20 L7 13 L17 15 Z" 
                  fill="#FFFBEB" 
                  stroke="#111" 
                  strokeWidth="2.5" 
                  strokeLinejoin="round" 
                />
                <circle cx="20" cy="20" r="2.5" fill="#F59E0B" />
              </g>

              {/* Verified Quality Checkmark Seal Badge on Bottom-Right */}
              <g transform="translate(56, 54)">
                {/* Fluted Rosette Badge */}
                <path 
                  d="M16 2 L20 5 L25 4 L27 9 L32 11 L31 16 L35 20 L32 24 L34 29 L29 31 L28 36 L23 35 L20 38 L16 35 L12 37 L10 33 L5 32 L6 27 L2 24 L5 20 L3 15 L8 13 L9 8 L14 9 Z" 
                  fill="#FFFFFF" 
                  stroke="#111" 
                  strokeWidth="2" 
                />
                {/* Green Circle Badge */}
                <circle cx="18" cy="20" r="11" fill="#15803D" />
                {/* White Checkmark */}
                <path d="M13 20 L16.5 23.5 L23.5 16.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <span className="mt-2.5 font-bold text-xs sm:text-sm text-[#2D1810] tracking-tight leading-snug">
            Premium<br />Ingredients
          </span>
        </div>

        {/* 3. Sun-Dried */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center p-2 bg-[#FFFDF9] transition-transform duration-200 group-hover:scale-105 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Central Glowing Golden Sun Circle */}
              <circle cx="50" cy="50" r="20" fill="#FEF08A" stroke="#111" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="16" fill="#FDE047" />

              {/* 12 Traditional Radiating Sun Rays in Vivid Warm Yellow */}
              {/* Top / Bottom / Left / Right cardinal rays */}
              <line x1="50" y1="18" x2="50" y2="25" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="50" y1="75" x2="50" y2="82" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="18" y1="50" x2="25" y2="50" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="75" y1="50" x2="82" y2="50" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />

              {/* Diagonal 45-degree rays */}
              <line x1="27" y1="27" x2="33" y2="33" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="67" y1="67" x2="73" y2="73" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="27" y1="73" x2="33" y2="67" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="67" y1="33" x2="73" y2="27" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />

              {/* Intermediate rays for full radiant effect */}
              <line x1="37" y1="21" x2="41" y2="27" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <line x1="63" y1="21" x2="59" y2="27" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <line x1="37" y1="79" x2="41" y2="73" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <line x1="63" y1="79" x2="59" y2="73" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="mt-2.5 font-bold text-xs sm:text-sm text-[#2D1810] tracking-tight leading-snug">
            Sun-Dried<br />& Natural
          </span>
        </div>

        {/* 4. No Chemical Preservatives */}
        <div className="flex flex-col items-center text-center group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center p-2 bg-[#FFFDF9] transition-transform duration-200 group-hover:scale-105 shadow-xs relative">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Chemistry Conical Flask Neck & Lip */}
              <rect x="44" y="16" width="12" height="4" rx="1.5" fill="#FFF" stroke="#111" strokeWidth="2.5" />
              <path d="M46 20 L46 36 L30 68 C27 74 31 80 38 80 L62 80 C69 80 73 74 70 68 L54 36 L54 20" stroke="#111" strokeWidth="2.5" fill="#FFFDF9" strokeLinejoin="round" />
              
              {/* Yellow Liquid Inside Flask */}
              <path 
                d="M33 66 L67 66 C68 70 66 77 60 77 L40 77 C34 77 32 70 33 66 Z" 
                fill="#FDE047" 
                stroke="#111" 
                strokeWidth="1.5" 
              />
              {/* Meniscus / Liquid surface */}
              <ellipse cx="50" cy="66" rx="17" ry="2" fill="#FEF08A" stroke="#111" strokeWidth="1.5" />
              {/* Effervescent chemical bubbles */}
              <circle cx="43" cy="71" r="1.5" fill="#111" />
              <circle cx="51" cy="69" r="1.2" fill="#111" />
              <circle cx="57" cy="72" r="1.8" fill="#111" />

              {/* Red X "NO" Badge on Bottom-Right */}
              <g transform="translate(56, 54)">
                {/* Circular White Rim */}
                <circle cx="18" cy="18" r="14" fill="#FFFFFF" stroke="#111" strokeWidth="2.5" />
                {/* Red Bold Cross Circle */}
                <line x1="10" y1="10" x2="26" y2="26" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="26" y1="10" x2="10" y2="26" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>
          <span className="mt-2.5 font-bold text-xs sm:text-sm text-[#2D1810] tracking-tight leading-snug">
            No Chemical<br />Preservatives
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProductTrustBadges;
