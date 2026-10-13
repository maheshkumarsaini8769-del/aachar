import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

export const ProductFilters = ({
  selectedCategories,
  setSelectedCategories,
  minPrice = 0,
  setMinPrice,
  maxPrice = 1500,
  setMaxPrice,
  selectedSizes,
  setSelectedSizes,
  selectedSpices,
  setSelectedSpices,
  selectedAvailability,
  setSelectedAvailability,
  onReset
}) => {
  const pricePresets = [
    { label: 'All Prices', min: 0, max: 1500 },
    { label: 'Under ₹200 (250g)', min: 0, max: 200 },
    { label: '₹200 – ₹300 (500g)', min: 200, max: 300 },
    { label: '₹300 – ₹500 (1kg)', min: 300, max: 500 },
    { label: '₹500+ (Gift Boxes)', min: 500, max: 1500 },
  ];

  const handleMinChange = (val) => {
    const num = Math.max(0, Math.min(Number(val) || 0, maxPrice - 50));
    setMinPrice(num);
  };

  const handleMaxChange = (val) => {
    const num = Math.min(1500, Math.max(Number(val) || 0, minPrice + 50));
    setMaxPrice(num);
  };

  const handleCatToggle = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSpiceToggle = (spice) => {
    if (selectedSpices.includes(spice)) {
      setSelectedSpices(selectedSpices.filter(s => s !== spice));
    } else {
      setSelectedSpices([...selectedSpices, spice]);
    }
  };

  const availableCats = categories.filter(c => c.id !== 'all');

  return (
    <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-6 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-green" />
          <h3 className="font-serif font-bold text-base text-brand-brown">
            Filters
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-brand-brownMuted hover:text-brand-red font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Price Range Section (Min to Max + Quick Presets) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-bold text-brand-brown uppercase tracking-wider">
            Price Range
          </h4>
          <span className="font-extrabold text-brand-green bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            ₹{minPrice} – ₹{maxPrice}
          </span>
        </div>

        {/* 1-Click Price Range Presets (100-300, 200-300, etc.) */}
        <div className="grid grid-cols-2 gap-1.5">
          {pricePresets.map((preset) => {
            const isSelected = minPrice === preset.min && maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setMinPrice(preset.min);
                  setMaxPrice(preset.max);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold border transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E5631] text-white border-[#1E5631] shadow-2xs'
                    : 'bg-[#FAF6EE] text-[#2D1810] border-[#E5D9C5] hover:border-[#D97706] hover:bg-[#F3ECE0]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Custom Min & Max Price Number Inputs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-[#FAF7F2] border border-[#E5D9C5] rounded-xl px-2.5 py-1.5">
            <label className="block text-[9px] font-extrabold uppercase tracking-wider text-brand-brownMuted">
              Min Price (₹)
            </label>
            <input
              type="number"
              min="0"
              max={maxPrice - 50}
              step="50"
              value={minPrice}
              onChange={(e) => handleMinChange(e.target.value)}
              className="w-full bg-transparent text-xs font-black text-brand-brown focus:outline-none mt-0.5"
            />
          </div>
          <div className="bg-[#FAF7F2] border border-[#E5D9C5] rounded-xl px-2.5 py-1.5">
            <label className="block text-[9px] font-extrabold uppercase tracking-wider text-brand-brownMuted">
              Max Price (₹)
            </label>
            <input
              type="number"
              min={minPrice + 50}
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => handleMaxChange(e.target.value)}
              className="w-full bg-transparent text-xs font-black text-brand-brown focus:outline-none mt-0.5"
            />
          </div>
        </div>

        {/* Dual Sliders for Min & Max Adjustment */}
        <div className="space-y-2 pt-1">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-brand-brownMuted">
              <span>From (Min): ₹{minPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1400"
              step="50"
              value={minPrice}
              onChange={(e) => handleMinChange(e.target.value)}
              className="w-full accent-brand-green cursor-pointer h-1.5 bg-brand-cream rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-brand-brownMuted">
              <span>To (Max): ₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => handleMaxChange(e.target.value)}
              className="w-full accent-brand-green cursor-pointer h-1.5 bg-brand-cream rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Achar Type (Categories) */}
      <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
        <h4 className="font-bold text-xs text-brand-brown uppercase tracking-wider">
          Achar Type
        </h4>
        <div className="space-y-2">
          {availableCats.map(cat => (
            <label
              key={cat.id}
              className="flex items-center justify-between text-xs text-brand-brown cursor-pointer hover:text-brand-green group"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleCatToggle(cat.id)}
                  className="rounded border-brand-border text-brand-green focus:ring-brand-green w-3.5 h-3.5"
                />
                <span className="group-hover:font-semibold transition-all">
                  {cat.name}
                </span>
              </div>
              <span className="text-[10px] text-brand-brownMuted">
                ({cat.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Pack Size */}
      <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
        <h4 className="font-bold text-xs text-brand-brown uppercase tracking-wider">
          Pack Size
        </h4>
        <div className="space-y-2">
          {['250 g', '500 g', '1 kg'].map(size => (
            <label
              key={size}
              className="flex items-center gap-2 text-xs text-brand-brown cursor-pointer hover:text-brand-green"
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="rounded border-brand-border text-brand-green focus:ring-brand-green w-3.5 h-3.5"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Spice Level */}
      <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
        <h4 className="font-bold text-xs text-brand-brown uppercase tracking-wider">
          Spice Level
        </h4>
        <div className="space-y-2">
          {[
            { level: 'Mild', emoji: '🌱' },
            { level: 'Medium', emoji: '🌶️' },
            { level: 'Spicy', emoji: '🔥' }
          ].map(({ level, emoji }) => (
            <label
              key={level}
              className="flex items-center gap-2 text-xs text-brand-brown cursor-pointer hover:text-brand-green"
            >
              <input
                type="checkbox"
                checked={selectedSpices.includes(level)}
                onChange={() => handleSpiceToggle(level)}
                className="rounded border-brand-border text-brand-green focus:ring-brand-green w-3.5 h-3.5"
              />
              <span>{emoji} {level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
        <h4 className="font-bold text-xs text-brand-brown uppercase tracking-wider">
          Availability
        </h4>
        <div className="space-y-2 text-xs">
          <label className="flex items-center justify-between text-brand-brown cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAvailability.includes('in-stock')}
                onChange={() => {
                  if (selectedAvailability.includes('in-stock')) {
                    setSelectedAvailability(selectedAvailability.filter(a => a !== 'in-stock'));
                  } else {
                    setSelectedAvailability([...selectedAvailability, 'in-stock']);
                  }
                }}
                className="rounded border-brand-border text-brand-green focus:ring-brand-green w-3.5 h-3.5"
              />
              <span>In Stock</span>
            </div>
            <span className="text-[10px] text-brand-brownMuted">({products.filter(p => p.inStock).length})</span>
          </label>
        </div>
      </div>

    </div>
  );
};
