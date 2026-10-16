import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { ComboBuilderBanner } from '../components/home/ComboBuilderBanner';
import { TrustMarquee } from '../components/common/TrustMarquee';
import { MakingProcessPost } from '../components/home/MakingProcessPost';
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

      {/* 5. 5-Step Solar Fermentation Making Process (Deferred for Peak FPS) */}
      <DeferredSection fallbackHeight="480px" label="Handcrafted Making Process">
        <MakingProcessPost onNavigate={onNavigate} />
      </DeferredSection>

      {/* 6. Why Families Trust Marusthali Achar (Deferred) */}
      <DeferredSection fallbackHeight="380px" label="Why Families Trust Us">
        <WhyChooseUs />
      </DeferredSection>

      {/* 7. Customer Photo Reviews (Deferred) */}
      <DeferredSection fallbackHeight="420px" label="Customer Verified Reviews">
        <ReviewsPreview onNavigate={onNavigate} />
      </DeferredSection>

      {/* 8. Frequently Asked Questions (Deferred) */}
      <DeferredSection fallbackHeight="360px" label="Frequently Asked Questions">
        <FAQSection onNavigate={onNavigate} />
      </DeferredSection>
    </div>
  );
};
