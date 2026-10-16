import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable shimmering placeholder box
 */
export const SkeletonShimmer = ({ className = '', style = {} }) => (
  <div 
    className={`relative overflow-hidden bg-[#EFE7DA]/70 rounded-xl before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent ${className}`}
    style={style}
  />
);

/**
 * Single Product Card Skeleton matching the redesigned wavy cards
 */
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-[#E8DDCD] overflow-hidden shadow-xs p-3 sm:p-4 flex flex-col justify-between space-y-3 animate-pulse">
    {/* Image Placeholder */}
    <div className="relative aspect-square w-full rounded-2xl bg-[#F7F2E8] overflow-hidden flex items-center justify-center">
      <SkeletonShimmer className="w-full h-full" />
    </div>

    {/* Category & Rating */}
    <div className="flex items-center justify-between pt-1">
      <SkeletonShimmer className="h-3 w-20 rounded-md" />
      <SkeletonShimmer className="h-3 w-12 rounded-md" />
    </div>

    {/* Title */}
    <SkeletonShimmer className="h-5 w-4/5 rounded-md" />

    {/* Weight Dial Placeholder */}
    <div className="flex gap-1.5 py-1">
      <SkeletonShimmer className="h-7 flex-1 rounded-lg" />
      <SkeletonShimmer className="h-7 flex-1 rounded-lg" />
      <SkeletonShimmer className="h-7 flex-1 rounded-lg" />
    </div>

    {/* Price & CTA Button */}
    <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#F2E9DC]">
      <SkeletonShimmer className="h-6 w-20 rounded-md" />
      <SkeletonShimmer className="h-9 w-28 rounded-full" />
    </div>
  </div>
);

/**
 * Full Page Skeleton for Suspense fallback on route navigation
 */
export const PageSkeletonLoader = ({ title = 'Loading handcrafted pickles...' }) => (
  <div className="min-h-screen max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
    {/* Breadcrumbs Skeleton */}
    <div className="flex items-center gap-2">
      <SkeletonShimmer className="h-3.5 w-16 rounded-md" />
      <span className="text-gray-300">/</span>
      <SkeletonShimmer className="h-3.5 w-24 rounded-md" />
    </div>

    {/* Hero Banner Skeleton */}
    <div className="w-full h-44 sm:h-64 rounded-3xl bg-[#FAF5EC] border border-[#E5D9C5] p-6 sm:p-8 flex flex-col justify-center space-y-3">
      <SkeletonShimmer className="h-4 w-32 rounded-full" />
      <SkeletonShimmer className="h-8 sm:h-12 w-3/5 rounded-xl" />
      <SkeletonShimmer className="h-4 w-2/5 rounded-md" />
      <div className="flex gap-2 pt-2">
        <SkeletonShimmer className="h-7 w-28 rounded-full" />
        <SkeletonShimmer className="h-7 w-32 rounded-full" />
      </div>
    </div>

    {/* Toolbar Skeleton */}
    <div className="flex items-center justify-between py-2">
      <SkeletonShimmer className="h-5 w-36 rounded-md" />
      <SkeletonShimmer className="h-8 w-28 rounded-xl" />
    </div>

    {/* 4-Column Product Grid Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

/**
 * Section Skeleton Loader for below-the-fold home page sections
 */
export const SectionSkeletonLoader = ({ height = '320px', label = 'Loading section...' }) => (
  <div 
    className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
    style={{ minHeight: height }}
  >
    <div className="w-full h-full rounded-3xl bg-[#FAF5EC]/70 border border-[#EAE0D0] p-6 sm:p-8 flex flex-col justify-center items-center space-y-4">
      <SkeletonShimmer className="h-4 w-28 rounded-full" />
      <SkeletonShimmer className="h-7 w-64 rounded-xl" />
      <SkeletonShimmer className="h-4 w-80 max-w-full rounded-md" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <SkeletonShimmer className="h-28 rounded-2xl" />
        <SkeletonShimmer className="h-28 rounded-2xl" />
        <SkeletonShimmer className="h-28 rounded-2xl" />
      </div>
    </div>
  </div>
);

/**
 * DeferredSection: High-performance IntersectionObserver wrapper
 * Keeps initial bundle tiny and renders heavy components only when near viewport
 */
export const DeferredSection = ({ children, fallbackHeight = '340px', label }) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '250px 0px', // Pre-fetch 250px before user reaches the section
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {isInView ? (
        <div className="animate-fade-in">{children}</div>
      ) : (
        <SectionSkeletonLoader height={fallbackHeight} label={label} />
      )}
    </div>
  );
};
