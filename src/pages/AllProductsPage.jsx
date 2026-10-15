import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ChevronRight, X, Tag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/category/ProductFilters';

export const AllProductsPage = ({ onNavigate, onQuickView }) => {
  const { products } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSpices, setSelectedSpices] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(['in-stock']);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const itemsPerPage = 9;

  const quickPriceRanges = [
    { label: 'All Prices', min: 0, max: 1500 },
    { label: 'Under ₹200 (250g)', min: 0, max: 200 },
    { label: '₹200 – ₹300 (500g)', min: 200, max: 300 },
    { label: '₹300 – ₹500 (1kg)', min: 300, max: 500 },
    { label: '₹500+ (Gift Boxes)', min: 500, max: 1500 },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      // Min-Max Price filter (matches base price OR any available packSize price within [minPrice, maxPrice])
      const matchesBasePrice = p.price >= minPrice && p.price <= maxPrice;
      const matchesPackPrice = p.packSizes?.some(s => s.price >= minPrice && s.price <= maxPrice);
      if (!matchesBasePrice && !matchesPackPrice) {
        return false;
      }
      // Spice level filter
      if (selectedSpices.length > 0 && !selectedSpices.includes(p.spiceLevel)) {
        return false;
      }
      // Pack size filter
      if (selectedSizes.length > 0) {
        const hasSize = p.packSizes?.some(s => selectedSizes.includes(s.size));
        if (!hasSize) return false;
      }
      // Availability filter
      if (selectedAvailability.length > 0 && selectedAvailability.includes('in-stock') && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
      return b.reviewCount - a.reviewCount; // popularity default
    });
  }, [selectedCategories, minPrice, maxPrice, selectedSizes, selectedSpices, selectedAvailability, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(1500);
    setSelectedSizes([]);
    setSelectedSpices([]);
    setSelectedAvailability(['in-stock']);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  const isPriceFiltered = minPrice > 0 || maxPrice < 1500;
  const activeFiltersCount = selectedCategories.length + selectedSizes.length + selectedSpices.length + (isPriceFiltered ? 1 : 0);

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-4 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">All Achar Products</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-brand-border gap-4">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
              Traditional Rajasthani Catalogue
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
              All Achar Products
            </h1>
            <p className="text-xs sm:text-sm text-brand-brownMuted mt-1">
              Showing {filteredProducts.length} authentic sun-cooked pickle varieties
              {isPriceFiltered && ` in ₹${minPrice} – ₹${maxPrice}`}
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-brand-cream border border-brand-border px-3.5 py-2 rounded-xl text-xs font-bold text-brand-brown"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-green" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-bold text-brand-brown">
              <span className="hidden sm:inline text-brand-brownMuted">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-brand-border rounded-xl px-3 py-2 text-xs font-semibold text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-green shadow-xs"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Customer Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Price Range Bar (1-Tap Filter for standard sizes) */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-brand-brown mr-1 inline-flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-brand-green" />
            <span>Price Range:</span>
          </span>
          {quickPriceRanges.map((range) => {
            const isActive = minPrice === range.min && maxPrice === range.max;
            return (
              <button
                key={range.label}
                type="button"
                onClick={() => {
                  setMinPrice(range.min);
                  setMaxPrice(range.max);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E5631] text-white border-[#1E5631] shadow-xs'
                    : 'bg-white text-brand-brown border-brand-border hover:border-[#D97706] hover:bg-brand-cream'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <span className="text-xs text-brand-brownMuted font-bold">Active:</span>
            {isPriceFiltered && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[#1E5631] font-extrabold">
                ₹{minPrice} – ₹{maxPrice}
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(1500);
                  }}
                >
                  <X className="w-3 h-3 text-[#1E5631] hover:text-brand-red" />
                </button>
              </span>
            )}
            {selectedCategories.map(catId => {
              const cat = categories.find(c => c.id === catId);
              return (
                <span key={catId} className="inline-flex items-center gap-1 text-[11px] bg-brand-cream border border-brand-border px-2.5 py-0.5 rounded-full text-brand-brown font-semibold">
                  {cat?.name || catId}
                  <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== catId))}>
                    <X className="w-3 h-3 text-brand-brownMuted hover:text-brand-red" />
                  </button>
                </span>
              );
            })}
            {selectedSizes.map(size => (
              <span key={size} className="inline-flex items-center gap-1 text-[11px] bg-brand-cream border border-brand-border px-2.5 py-0.5 rounded-full text-brand-brown font-semibold">
                {size}
                <button onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}>
                  <X className="w-3 h-3 text-brand-brownMuted hover:text-brand-red" />
                </button>
              </span>
            ))}
            {selectedSpices.map(spice => (
              <span key={spice} className="inline-flex items-center gap-1 text-[11px] bg-brand-cream border border-brand-border px-2.5 py-0.5 rounded-full text-brand-brown font-semibold">
                {spice}
                <button onClick={() => setSelectedSpices(selectedSpices.filter(s => s !== spice))}>
                  <X className="w-3 h-3 text-brand-brownMuted hover:text-brand-red" />
                </button>
              </span>
            ))}
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-red hover:underline font-bold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          
          {/* Desktop Filters Sidebar (Col 1) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                minPrice={minPrice}
                setMinPrice={(v) => { setMinPrice(v); setCurrentPage(1); }}
                maxPrice={maxPrice}
                setMaxPrice={(v) => { setMaxPrice(v); setCurrentPage(1); }}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedSpices={selectedSpices}
                setSelectedSpices={setSelectedSpices}
                selectedAvailability={selectedAvailability}
                setSelectedAvailability={setSelectedAvailability}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Product Grid Area (Col 3) */}
          <div className="lg:col-span-3 space-y-8">
            {currentProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-brand-border space-y-4 shadow-xs">
                <div className="text-4xl">🏺</div>
                <h3 className="font-serif text-xl font-bold text-brand-brown">
                  No pickles match ₹{minPrice} – ₹{maxPrice}
                </h3>
                <p className="text-xs sm:text-sm text-brand-brownMuted max-w-sm mx-auto">
                  Try broadening your price range or clearing selected categories to explore our full selection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-green text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-brand-greenHover transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
                  {currentProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onNavigate={onNavigate}
                      onQuickView={onQuickView}
                      activePriceRange={isPriceFiltered ? { min: minPrice, max: maxPrice } : null}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6 border-t border-brand-border">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-brand-border bg-white text-xs font-bold text-brand-brown disabled:opacity-40"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          currentPage === i + 1
                            ? 'bg-brand-brown text-white shadow-xs'
                            : 'bg-white border border-brand-border text-brand-brown hover:bg-brand-cream'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-brand-border bg-white text-xs font-bold text-brand-brown disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-start lg:hidden">
          <div 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-4 overflow-y-auto z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="font-serif font-bold text-base text-brand-brown">Filter Pickles</h3>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded-full hover:bg-brand-cream"
              >
                <X className="w-5 h-5 text-brand-brown" />
              </button>
            </div>
            <ProductFilters
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              minPrice={minPrice}
              setMinPrice={(v) => { setMinPrice(v); setCurrentPage(1); }}
              maxPrice={maxPrice}
              setMaxPrice={(v) => { setMaxPrice(v); setCurrentPage(1); }}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedSpices={selectedSpices}
              setSelectedSpices={setSelectedSpices}
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={setSelectedAvailability}
              onReset={handleResetFilters}
            />
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full bg-brand-green text-white py-3 rounded-xl font-bold text-xs"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
