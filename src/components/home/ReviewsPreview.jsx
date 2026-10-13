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
    <section className="py-14 sm:py-16 bg-white border-b border-brand-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-green uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              <span>4.8 / 5.0 Star Rating (1,234+ Verified Reviews)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-brown">
              Customer Reviews <span className="text-brand-brownMuted font-sans text-base font-normal">(Verified Stories)</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-brownMuted mt-1">
              Read authentic feedback and photo reviews from pickle lovers across India
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => onNavigate('reviews', { openWriteModal: true })}
              className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>

            <button
              onClick={() => onNavigate('reviews')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-green hover:underline"
            >
              <span>View All 1,234 Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialReviews.slice(0, 3).map(rev => {
            const product = productMap[rev.productId] || products[0];

            return (
              <div 
                key={rev.id}
                className="bg-brand-bg p-5 sm:p-6 rounded-2xl border border-brand-border flex flex-col justify-between hover:shadow-warm transition-all group"
              >
                <div className="space-y-3.5">
                  {/* Product Badge */}
                  <div 
                    onClick={() => onNavigate('product-detail', { productId: product.id })}
                    className="cursor-pointer inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100/90 border border-amber-200/80 rounded-full py-1 px-2.5 text-[11px] text-brand-brown transition-colors max-w-full"
                    title={`View ${product.name}`}
                  >
                    <img
                      src={product.image || '/images/products/marusthali-mango-jar.jpg'}
                      alt={product.name}
                      className="w-4 h-4 rounded-full object-cover shrink-0 border border-amber-300"
                    />
                    <span className="text-[10px] text-brand-brownMuted shrink-0">For:</span>
                    <span className="font-bold truncate text-brand-brown hover:text-brand-green">
                      {product.name}
                    </span>
                  </div>

                  {/* Stars & Date */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < rev.rating ? 'fill-current text-amber-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-brand-brownMuted font-mono">{rev.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-brand-brown leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {/* Review images if available */}
                  {rev.images && rev.images.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center gap-1 text-[10px] text-brand-brownMuted font-semibold">
                        <Camera className="w-3 h-3 text-brand-green" />
                        <span>Customer Photos:</span>
                      </div>
                      <div className="flex gap-2">
                        {rev.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => onNavigate('reviews')}
                            className="cursor-pointer relative overflow-hidden rounded-xl border border-brand-border bg-white shadow-2xs hover:scale-105 transition-transform"
                          >
                            <img 
                              src={img} 
                              alt="Customer Review" 
                              className="w-14 h-14 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs mt-4">
                  <div>
                    <div className="font-bold text-brand-brown">{rev.userName}</div>
                    <div className="text-[10px] text-brand-brownMuted">{rev.location}</div>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Buyer
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
