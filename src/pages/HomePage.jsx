import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { ComboPacksSection } from '../components/home/ComboPacksSection';
import { TrustMarquee } from '../components/common/TrustMarquee';
import { MakingProcessPost } from '../components/home/MakingProcessPost';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ReviewsPreview } from '../components/home/ReviewsPreview';
import { FAQSection } from '../components/home/FAQSection';

export const HomePage = ({ onNavigate, onQuickView }) => {
  return (
    <div className="space-y-0">
      {/* 1. Header Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Flagship Products: Bestselling Homemade Achar */}
      <BestsellersSection onNavigate={onNavigate} onQuickView={onQuickView} />

      {/* 3. Combo Packs (Placed Directly Below Products as Requested) */}
      <ComboPacksSection onNavigate={onNavigate} />

      {/* 4. Trust Ticker Marquee */}
      <TrustMarquee />

      {/* 5. 5-Step Solar Fermentation Making Process (Interactive Photo Step Switcher) */}
      <MakingProcessPost onNavigate={onNavigate} />

      {/* 6. Why Families Trust Marusthali Achar (Clean Trust Pillars & Comparison) */}
      <WhyChooseUs />

      {/* 7. Customer Photo Reviews (Verified Real Social Proof) */}
      <ReviewsPreview onNavigate={onNavigate} />

      {/* 8. Frequently Asked Questions */}
      <FAQSection onNavigate={onNavigate} />
    </div>
  );
};
