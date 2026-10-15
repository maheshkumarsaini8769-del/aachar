import React from 'react';

/**
 * BrandLogo Component for Marusthali Achar
 * 
 * Variants:
 * - 'full': Icon emblem + Royal Typography (used in Header, Drawer, modals)
 * - 'badge': Circular Heritage Seal (used in Footer, product cards, trust stamps)
 * - 'icon': Emblem-only standalone icon
 */
export const BrandLogo = ({
  variant = 'full',
  size = 'md',
  className = '',
  onClick
}) => {
  // Sizing definitions
  const badgeSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32 sm:w-36 sm:h-36'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  // SVG Emblem Icon (Traditional Glazed Ceramic Barni with Sun-Cured Sun Rays & Sprig)
  const EmblemSvg = ({ className: svgClass = 'w-full h-full' }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={svgClass}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunBurstGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="65%" stopColor="#FDE68A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FAF5EC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="amberGlazeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="60%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="jarBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5EFE6" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FAF5EC" />
          <stop offset="100%" stopColor="#EADBCC" />
        </linearGradient>
      </defs>

      {/* Outer Decorative Ring */}
      <circle cx="50" cy="50" r="47" fill="#FFFDF9" stroke="#B45309" strokeWidth="1.8" />
      <circle cx="50" cy="50" r="44.5" fill="none" stroke="#D97706" strokeWidth="0.8" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="42" fill="url(#sunBurstGrad)" stroke="#E5D5C0" strokeWidth="0.8" />

      {/* Sun Rays behind Barni (Dhoop Sun-Cured Heritage) */}
      <g stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" opacity="0.6">
        <line x1="50" y1="12" x2="50" y2="18" />
        <line x1="68" y1="17" x2="64" y2="22" />
        <line x1="82" y1="30" x2="76" y2="34" />
        <line x1="87" y1="48" x2="81" y2="49" />
        <line x1="32" y1="17" x2="36" y2="22" />
        <line x1="18" y1="30" x2="24" y2="34" />
        <line x1="13" y1="48" x2="19" y2="49" />
      </g>

      {/* Golden Sun Disc */}
      <circle cx="50" cy="38" r="14" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />

      {/* Ceramic Barni (Martaban) */}
      <g transform="translate(50, 56) scale(0.68)">
        {/* Soft shadow */}
        <ellipse cx="0" cy="46" rx="36" ry="6" fill="#29150B" opacity="0.2" />

        {/* Jar Body */}
        <path 
          d="M -30,8 C -34,20 -32,40 -25,44 C -18,48 18,48 25,44 C 32,40 34,20 30,8 Z" 
          fill="url(#jarBodyGrad)" 
          stroke="#5C2D0C" 
          strokeWidth="2.4" 
        />

        {/* Glazed Amber Rim & Shoulder */}
        <path 
          d="M -30,8 C -30,2 -25,-6 -19,-10 L 19,-10 C 25,-6 30,2 30,8 C 24,11 -24,11 -30,8 Z" 
          fill="url(#amberGlazeGrad)" 
          stroke="#5C2D0C" 
          strokeWidth="2.4" 
        />

        {/* Neck */}
        <rect x="-19" y="-15" width="38" height="6" rx="1.5" fill="#92400E" stroke="#5C2D0C" strokeWidth="1.8" />

        {/* Tied Muslin Cloth Cap (Cotton Potli on top) */}
        <path 
          d="M -21,-15 C -23,-22 -13,-28 0,-28 C 13,-28 23,-22 21,-15 Z" 
          fill="#FFFDF9" 
          stroke="#5C2D0C" 
          strokeWidth="1.8" 
        />
        
        {/* Tie String */}
        <path d="M -22,-15 Q 0,-12 22,-15" stroke="#D97706" strokeWidth="2" fill="none" />
        <circle cx="0" cy="-13.5" r="2.2" fill="#D97706" />

        {/* Traditional Paisley / Barni Stamp */}
        <g transform="translate(0, 24)">
          <path d="M 0,-10 C 4,-10 7,-5 7,0 C 7,6 0,10 0,10 C 0,10 -7,6 -7,0 C -7,-5 -4,-10 0,-10 Z" fill="#B45309" opacity="0.85" />
          <circle cx="0" cy="-0.5" r="2.2" fill="#FFFDF9" />
        </g>

        {/* Green Leaf sprig (left) */}
        <g transform="translate(-25, 20) rotate(-35)">
          <path d="M 0,0 C -6,-10 3,-18 9,-22 C 10,-13 7,-4 0,0 Z" fill="#15803D" stroke="#166534" strokeWidth="0.8" />
        </g>

        {/* Mustard flower (right) */}
        <g transform="translate(25, 24) rotate(25)">
          <circle cx="4" cy="-10" r="2.2" fill="#EAB308" />
          <circle cx="8" cy="-13" r="1.8" fill="#FACC15" />
          <path d="M 0,0 Q 4,-7 7,-13" stroke="#15803D" strokeWidth="1" fill="none" />
        </g>
      </g>
    </svg>
  );

  // Variant: Badge (Used in Footer circular seal)
  if (variant === 'badge') {
    return (
      <div 
        onClick={onClick}
        className={`relative rounded-full shadow-xl overflow-hidden cursor-pointer group transition-transform hover:scale-105 ${badgeSizes[size] || badgeSizes.lg} ${className}`}
        title="Marusthali Achar - Return to Home"
      >
        <img 
          src="/images/marusthali-logo.svg" 
          alt="Marusthali Achar Est. 1994 Logo"
          className="w-full h-full object-contain filter drop-shadow-sm" 
        />
      </div>
    );
  }

  // Variant: Icon Only
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-block ${iconSizes[size] || iconSizes.md} ${className} cursor-pointer`}
      >
        <EmblemSvg />
      </div>
    );
  }

  // Variant: Full (Emblem + Royal Typography for Header)
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none ${className}`}
      title="Marusthali Achar - Home"
    >
      {/* Visual Emblem */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 group-hover:scale-105 transition-transform duration-200">
        <EmblemSvg />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-serif text-xl sm:text-2xl md:text-[25px] font-black tracking-tight text-[#1F110B] group-hover:text-[#B45309] transition-colors">
            Marusthali
          </span>
          <span className="font-serif text-xl sm:text-2xl md:text-[25px] font-black tracking-tight text-[#B45309]">
            Achar
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6542] tracking-wider uppercase">
            Est. 1994 • Sikar
          </span>
          <span className="w-1 h-1 rounded-full bg-[#D97706] inline-block"></span>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#15803D] tracking-wide">
            100% Desi
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
