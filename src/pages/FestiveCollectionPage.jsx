import { Gift, Sparkles, ChevronRight, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/product/ProductCard';

export const FestiveCollectionPage = ({ onNavigate, onQuickView }) => {
  const { products } = useProducts();
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  const festiveProducts = products.filter(p => p.category === 'festive');

  const occasions = [
    { id: 'all', name: 'All Festive Hampers' },
    { id: 'diwali', name: 'Diwali Special' },
    { id: 'rakhi', name: 'Raksha Bandhan' },
    { id: 'wedding', name: 'Wedding Gifting' },
    { id: 'holi', name: 'Holi Celebrations' },
  ];

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Festive Collections</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border-2 border-brand-border bg-[#381108] text-white p-8 sm:p-12 shadow-warm">
          {/* Background Image with Gradient Fade */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/banners/hero-slide-festive.jpg" 
              alt="Festive Pickle Hampers" 
              className="w-full h-full object-cover object-right md:object-center select-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A0D06] via-[#2A0D06]/90 via-45% to-transparent" />
          </div>

          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Royal Heritage Gifting</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFDF8] leading-tight">
              Royal Festive Pickle Hampers
            </h1>

            <p className="text-xs sm:text-base text-[#E9D9C9] leading-relaxed">
              Celebrate festive occasions with royal gifting hampers. Handcrafted glass pickle jars, brass spoons, and traditional keepsake wooden gift boxes designed for family celebrations.
            </p>
          </div>
        </div>

        {/* Occasion Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-brand-border">
          {occasions.map(occ => (
            <button
              key={occ.id}
              onClick={() => setSelectedOccasion(occ.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                selectedOccasion === occ.id
                  ? 'bg-brand-red text-white border-brand-red shadow-xs'
                  : 'bg-white text-brand-brown border-brand-border hover:bg-brand-cream'
              }`}
            >
              {occ.name}
            </button>
          ))}
        </div>

        {/* Festive Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {festiveProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Corporate & Bulk Gifting Notice */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider block">
              Corporate & Shaadi Bulk Orders
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-brown">
              Planning Bulk Festive Gifting or Wedding Favors?
            </h3>
            <p className="text-xs sm:text-sm text-brand-brownMuted max-w-xl">
              We offer customized gift boxes with personalized foil printing, greeting cards, and direct pan-India shipping to all your recipients.
            </p>
          </div>

          <button
            onClick={() => onNavigate('stores')}
            className="bg-brand-green hover:bg-brand-greenHover text-white px-6 py-3 rounded-full text-xs font-bold shrink-0 transition-colors shadow-xs"
          >
            Contact Concierge Desk
          </button>
        </div>

      </div>
    </div>
  );
};
