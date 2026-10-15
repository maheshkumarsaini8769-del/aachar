import React from 'react';
import { ChevronRight, Heart, Award, ShieldCheck, Sun } from 'lucide-react';

export const OurStoryPage = ({ onNavigate }) => {
  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Our Story</span>
        </div>

        {/* Hero */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest block">
            Authentic Tradition • Heritage of Rajasthan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-brown">
            The Story of Marusthali Achar
          </h1>
          <p className="text-sm sm:text-base text-brand-brownMuted max-w-xl mx-auto leading-relaxed">
            Preserving the sacred tradition of sun-cooked Indian pickles while empowering rural women artisans in Sikar, Rajasthan.
          </p>
        </div>

        {/* Story Visual */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-brand-border shadow-warm aspect-16/9 bg-brand-cream mb-10">
          <img
            src="/images/banners/hero-slide-barni.jpg"
            alt="Traditional pickle preparation by rural artisans in Sikar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
            <span className="text-white text-sm font-bold">
              Artisan Mothers of Sikar Handcrafting Pickles in Traditional Ceramic Barnis
            </span>
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-6 text-sm text-brand-brown leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-brand-brown">
              Where It Began: A Nostalgic Kitchen Awakening
            </h2>
            <p>
              Growing up in the Shekhawati region of Rajasthan, summer was announced not by the calendar, but by the pungent, golden aroma of pure cold-pressed mustard oil warming under the courtyard sun. Grandmothers carefully washed raw tart green mangoes in fresh well-water, diced them with age-old brass choppers, and mixed stone-ground fenugreek, fennel, and nigella seeds with pink rock salt.
            </p>
            <p>
              Decades later, looking at commercial store shelves filled with industrial pickles steeped in chemical acetic acid, artificial preservatives, and synthetic food colors, we realized that the authentic Indian achar had almost vanished from urban tables. Marusthali Achar was founded to revive that lost authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 my-2 border-y border-brand-border/60 text-center">
            <div className="p-4 bg-brand-cream rounded-2xl">
              <span className="font-serif text-3xl font-extrabold text-brand-brown block">45+</span>
              <span className="text-xs text-brand-brownMuted mt-1 block">Rural Women Employed</span>
            </div>
            <div className="p-4 bg-brand-cream rounded-2xl">
              <span className="font-serif text-3xl font-extrabold text-brand-brown block">100%</span>
              <span className="text-xs text-brand-brownMuted mt-1 block">Preservative Free</span>
            </div>
            <div className="p-4 bg-brand-cream rounded-2xl">
              <span className="font-serif text-3xl font-extrabold text-brand-brown block">28,000+</span>
              <span className="text-xs text-brand-brownMuted mt-1 block">Jars Delivered Pan-India</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-brand-brown">
              Purity First: Our Sacred Sun-Cooking Principles
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5 text-brand-brown leading-relaxed">
              <li><strong>Zero Chemical Preservatives:</strong> We never touch sodium benzoate, potassium metabisulphite, or synthetic vinegar. Preservation happens purely through cold-pressed mustard oil, rock salt, and solar heat.</li>
              <li><strong>First-Press Cold Pressed Mustard Oil:</strong> Gives every jar its signature sharp kick and wholesome wellness value.</li>
              <li><strong>Handcrafted in Small Batches:</strong> Every single jar is packed by hand in food-grade glass containers with shock-proof protection.</li>
            </ul>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => onNavigate('all-products')}
              className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold text-sm px-8 py-3.5 rounded-full shadow-sm transition-all"
            >
              Taste Our Pickles (Explore Catalogue) →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
