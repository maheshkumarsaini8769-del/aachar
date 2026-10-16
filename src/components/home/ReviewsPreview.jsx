import React from 'react';
import { Star, CheckCircle, ArrowRight, PenTool, Camera } from 'lucide-react';
import { initialReviews, reviewStats } from '../../data/reviews';
import { products } from '../../data/products';

export const ReviewsPreview = ({ onNavigate }) => {
  // Product lookup map
  const productMap = React.useMemo(() => {
    const map = {};
    products.forEach(p => {
      map[p.id] = p;
    });
    return map;
  }, []);

  return (
    <section id="customer-reviews" className="py-14 sm:py-16 bg-transparent border-b border-brand-border/60">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              <span>4.8 / 5.0 Star Rating (1,234+ Verified Reviews)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F110B]">
              Customer Reviews <span className="text-[#6B5546] font-sans text-base font-normal">(Verified Stories)</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C483A] mt-1 font-semibold">
              Read authentic feedback and photo reviews from pickle lovers across India
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => onNavigate('reviews', { openWriteModal: true })}
              className="bg-[#F5A623] hover:bg-[#E09415] text-[#1F110B] font-black text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>

            <button
              onClick={() => onNavigate('reviews')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-emerald-800 hover:underline cursor-pointer"
            >
              <span>View All 1,234 Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vintage Royal Postcard Reviews Cards (शाही डाक पत्र) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialReviews.slice(0, 3).map(rev => {
            const product = productMap[rev.productId] || products[0];

            return (
              <div 
                key={rev.id}
                className="bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E7] to-[#F5EAD4] p-6 sm:p-7 rounded-t-[32px] rounded-b-2xl border-2 border-[#D5C2A5] flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(45,24,16,0.16)] hover:-translate-y-1.5 transition-all duration-300 group shadow-sm relative overflow-hidden"
              >
                {/* Decorative Corner Stars */}
                <span className="absolute top-2.5 left-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>
                <span className="absolute top-2.5 right-2.5 text-[9px] text-[#C59A3F]/70 select-none pointer-events-none">✦</span>

                {/* Subtle Decorative Background Quote Accent */}
                <span className="absolute -top-3 right-6 text-7xl font-serif text-amber-900/5 select-none pointer-events-none">
                  “
                </span>

                <div className="space-y-3.5 relative z-10">
                  {/* Top Bar: Product Badge & Vintage Postal Mark */}
                  <div className="flex items-center justify-between gap-2">
                    <div 
                      onClick={() => onNavigate('product-detail', { productId: product.id })}
                      className="cursor-pointer inline-flex items-center gap-1.5 bg-white/90 hover:bg-amber-100/90 border border-amber-300/80 rounded-full py-1 px-2.5 text-[11px] text-[#2D1810] transition-colors max-w-[65%] shadow-2xs"
                      title={`View ${product.name}`}
                    >
                      <img
                        src={product.image || '/images/products/marusthali-mango-jar.jpg'}
                        alt={product.name}
                        className="w-4 h-4 rounded-full object-cover shrink-0 border border-amber-400"
                      />
                      <span className="font-extrabold truncate text-[#1F110B] group-hover:text-[#B45309]">
                        {product.name}
                      </span>
                    </div>

                    {/* Vintage Postage Stamp Postmark */}
                    <div className="flex items-center gap-1 bg-[#FAF3DE] border border-dashed border-[#B8860B]/70 px-2 py-0.5 rounded text-[9px] font-black text-[#5C3D1E] shadow-2xs shrink-0">
                      <span>📬 {rev.location || 'Rajasthan'}</span>
                    </div>
                  </div>

                  {/* Stars & Date */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < rev.rating ? 'fill-current text-amber-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#7A6455] font-bold">{rev.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-[13px] text-[#2C180E] leading-relaxed italic font-serif">
                    "{rev.comment}"
                  </p>

                  {/* Review images if available */}
                  {rev.images && rev.images.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center gap-1 text-[10px] text-[#8C6D53] font-bold">
                        <Camera className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Customer Photo:</span>
                      </div>
                      <div className="flex gap-2">
                        {rev.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => onNavigate('reviews')}
                            className="cursor-pointer relative overflow-hidden rounded-xl border-2 border-white bg-white shadow-xs hover:scale-105 transition-transform"
                          >
                            <img 
                              src={img} 
                              alt="Customer Review" 
                              className="w-14 h-14 object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-[#DFC5A2] flex items-center justify-between text-xs mt-4 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5D79E] to-[#E4B86A] border-2 border-[#FFF0C8] flex items-center justify-center font-black text-[#1F110B] text-xs shadow-xs">
                      {rev.userName ? rev.userName[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="font-black text-[#1F110B] text-xs sm:text-sm">{rev.userName}</div>
                      <div className="text-[10px] text-[#8C6D53] font-bold">{rev.location}</div>
                    </div>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-950 bg-emerald-100/90 px-2.5 py-0.5 rounded-full font-black border border-emerald-300 shadow-2xs">
                      <CheckCircle className="w-3 h-3 text-emerald-700" /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
