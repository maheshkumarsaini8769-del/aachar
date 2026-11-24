import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { ComboBuilderBanner } from '../components/home/ComboBuilderBanner';
import { TrustMarquee } from '../components/common/TrustMarquee';
import { DishPairingSommelier } from '../components/home/DishPairingSommelier';
import { MakingProcessPost } from '../components/home/MakingProcessPost';
import { BeforeAfterSection } from '../components/home/BeforeAfterSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ReviewsPreview } from '../components/home/ReviewsPreview';
import { FAQSection } from '../components/home/FAQSection';
import { DeferredSection } from '../components/common/SkeletonLoader';

export const HomePage = ({ onNavigate, onQuickView }) => {
  return (
    <div className="space-y-0">
      {/* 1. Header Hero Section (Instant Render) */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Flagship Products: Bestselling Homemade Achar (Instant Render) */}
      <BestsellersSection onNavigate={onNavigate} onQuickView={onQuickView} />

      {/* 3. Compact Combo Box Preview */}
      <ComboBuilderBanner onNavigate={onNavigate} />

      {/* 4. Trust Ticker Marquee */}
      <TrustMarquee />

      {/* 5. AI Dish Pairing & Achar Sommelier (Deferred) */}
      <DeferredSection fallbackHeight="440px" label="AI Dish Pairing Sommelier">
        <DishPairingSommelier onNavigate={onNavigate} onQuickView={onQuickView} />
      </DeferredSection>

      {/* Decorative Desert Flow Divider */}
      <div className="flex items-center justify-center py-1 opacity-60 select-none pointer-events-none" aria-hidden="true">
        <div className="h-[1px] w-28 bg-gradient-to-r from-transparent to-[#D8BE95]" />
        <span className="px-3 text-[#B45309] text-xs font-serif tracking-widest">✦ ❖ ✦</span>
        <div className="h-[1px] w-28 bg-gradient-to-l from-transparent to-[#D8BE95]" />
      </div>

      {/* 6. 5-Step Solar Fermentation Making Process (Deferred for Peak FPS) */}
      <DeferredSection fallbackHeight="480px" label="Handcrafted Making Process">
        <MakingProcessPost onNavigate={onNavigate} />
      </DeferredSection>

      {/* Decorative Desert Flow Divider */}
      <div className="flex items-center justify-center py-1 opacity-60 select-none pointer-events-none" aria-hidden="true">
        <div className="h-[1px] w-28 bg-gradient-to-r from-transparent to-[#D8BE95]" />
        <span className="px-3 text-[#B45309] text-xs font-serif tracking-widest">✦ ❖ ✦</span>
        <div className="h-[1px] w-28 bg-gradient-to-l from-transparent to-[#D8BE95]" />
      </div>

      {/* 7. Before & After Purity Comparison: Commercial vs. TharSwad Heritage */}
      <DeferredSection fallbackHeight="520px" label="Before & After Purity Comparison">
        <BeforeAfterSection onNavigate={onNavigate} />
      </DeferredSection>

      {/* 8. Why Families Trust TharSwad Achar (Deferred) */}
      <DeferredSection fallbackHeight="380px" label="Why Families Trust Us">
        <WhyChooseUs />
      </DeferredSection>

      {/* 9. Customer Photo Reviews (Deferred) */}
      <DeferredSection fallbackHeight="420px" label="Customer Verified Reviews">
        <ReviewsPreview onNavigate={onNavigate} />
      </DeferredSection>

      {/* 10. Frequently Asked Questions (Deferred) */}
      <DeferredSection fallbackHeight="360px" label="Frequently Asked Questions">
        <FAQSection onNavigate={onNavigate} />
      </DeferredSection>
    </div>
  );
};
