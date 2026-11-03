import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Filter,
  Check,
  ChevronDown,
  Star,
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { ECOMMERCE_PRODUCTS } from '../data/ecommerceProducts';
import { EcommerceCategory, EcommerceProduct } from '../types/ecommerce';
import { ProductCard3D } from './ProductCard3D';

interface ShopSectionProps {
  id?: string;
  isStandalonePage?: boolean;
  onSelectProduct?: (product: EcommerceProduct) => void;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
type PriceRange = 'all' | 'under-350' | '350-500' | 'above-500';

const CATEGORIES: { id: EcommerceCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Creations', count: 9 },
  { id: 'slabs', label: 'Signature Slabs', count: 2 },
  { id: 'couverture', label: 'Couvertures', count: 1 },
  { id: 'praline', label: 'Pralines & Nuts', count: 3 },
  { id: 'cocoa', label: 'Cocoa & Dragées', count: 2 },
  { id: 'gifting', label: 'Gifting Boxes', count: 1 },
];

export const ShopSection: React.FC<ShopSectionProps> = ({
  id = 'shop',
  isStandalonePage = false,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EcommerceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVegetarian, setOnlyVegetarian] = useState(true);
  const [onlyAssured, setOnlyAssured] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setOnlyAssured(false);
    setSortBy('relevance');
  };

  const isFiltered =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    priceRange !== 'all' ||
    minRating > 0 ||
    onlyAssured;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = ECOMMERCE_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const match =
          prod.name.toLowerCase().includes(query) ||
          prod.subtitle.toLowerCase().includes(query) ||
          prod.categoryLabel.toLowerCase().includes(query);
        if (!match) return false;
      }
      // Price range filter
      if (priceRange === 'under-350' && prod.price >= 350) return false;
      if (priceRange === '350-500' && (prod.price < 350 || prod.price > 500)) return false;
      if (priceRange === 'above-500' && prod.price <= 500) return false;

      // Rating filter
      if (minRating > 0 && prod.rating < minRating) return false;

      // Vegetarian filter
      if (onlyVegetarian && !prod.vegetarian) return false;

      // Assured filter
      if (onlyAssured && !prod.isBestseller) return false;

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result = [...result].sort(
        (a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp
      );
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, minRating, onlyVegetarian, onlyAssured, sortBy]);

  return (
    <section
      id={id}
      className={`relative bg-[#F1F3F6] text-[#212121] overflow-hidden ${
        isStandalonePage ? 'pt-28 sm:pt-32 pb-20' : 'py-16 sm:py-24 border-t border-gray-200'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10">

        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4 flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-bold text-[#8C4724] uppercase tracking-wider cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {isFiltered && '(Active)'}</span>
          </button>

          <span className="text-xs text-gray-500">
            {filteredProducts.length} Items Found
          </span>
        </div>

        {/* 2-Column Flipkart Layout: Left Sidebar Filters + Right Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Flipkart Style Filters Sidebar
              ========================================================================= */}
          <aside
            className={`md:col-span-4 lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-xs divide-y divide-gray-100 ${
              isMobileFilterOpen ? 'block mb-4' : 'hidden md:block'
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-4 flex items-center justify-between bg-white">
              <span className="font-bold text-sm text-[#212121] uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span>Filters</span>
              </span>

              {isFiltered && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs font-bold text-[#8C4724] hover:underline cursor-pointer"
                >
                  CLEAR ALL
                </button>
              )}
            </div>

            {/* CATEGORIES Section (Flipkart Tree Style on the Left) */}
            <div className="p-4 space-y-3">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
                Categories
              </span>

              <div className="text-xs text-gray-700 font-semibold mb-1 flex items-center gap-1 text-[#8C4724]">
                <span>‹</span>
                <span>Chocolates</span>
              </div>

              <div className="space-y-1 pl-2">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left py-1.5 px-2.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#FAF0E4] text-[#8C4724] font-bold border-l-3 border-[#8C4724]'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-black font-medium'
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-[#8C4724] text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE RANGE Section */}
            <div className="p-4 space-y-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
                Price Range
              </span>

              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-350', label: 'Under ₹350' },
                  { id: '350-500', label: '₹350 - ₹500' },
                  { id: 'above-500', label: 'Over ₹500' },
                ].map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-black select-none text-gray-700"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id as PriceRange)}
                      className="w-3.5 h-3.5 text-[#8C4724] cursor-pointer"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CUSTOMER RATINGS Section */}
            <div className="p-4 space-y-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
                Customer Ratings
              </span>

              <div className="space-y-1.5 text-xs text-gray-700">
                {[
                  { rating: 4.8, label: '4.8★ & above' },
                  { rating: 4.5, label: '4.5★ & above' },
                  { rating: 0, label: 'All Ratings' },
                ].map((r) => (
                  <label
                    key={r.rating}
                    className="flex items-center gap-2 cursor-pointer hover:text-black select-none"
                  >
                    <input
                      type="radio"
                      name="minRating"
                      checked={minRating === r.rating}
                      onChange={() => setMinRating(r.rating)}
                      className="w-3.5 h-3.5 text-[#8C4724] cursor-pointer"
                    />
                    <div className="flex items-center gap-1 font-medium">
                      <span>{r.label}</span>
                      {r.rating > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* DIETARY PREFERENCE Section */}
            <div className="p-4 space-y-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
                Dietary Preference
              </span>

              <label className="flex items-center gap-2 text-xs text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyVegetarian}
                  onChange={(e) => setOnlyVegetarian(e.target.checked)}
                  className="w-4 h-4 text-[#388E3C] rounded cursor-pointer"
                />
                <span className="w-3 h-3 rounded border border-emerald-600 flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </span>
                <span className="font-semibold text-emerald-800">100% Vegetarian Only</span>
              </label>
            </div>

            {/* ROMAS ASSURED Section */}
            <div className="p-4 space-y-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
                Assurance
              </span>

              <label className="flex items-center gap-2 text-xs text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAssured}
                  onChange={(e) => setOnlyAssured(e.target.checked)}
                  className="w-4 h-4 text-[#8C4724] rounded cursor-pointer"
                />
                <span className="bg-[#FAF0E4] text-[#8C4724] border border-[#8C4724]/30 px-1.5 py-0.5 rounded text-[10px] font-black italic">
                  ✦ ROMAS Assured
                </span>
              </label>
            </div>

            {/* Factory Trust Note */}
            <div className="p-4 bg-[#FAF8F5] text-[11px] text-gray-600 space-y-1">
              <strong className="text-gray-900 block font-bold">Factory Guarantee:</strong>
              <p>Direct temperature-controlled dispatch from Kurod works, Dhamtari (493663).</p>
            </div>
          </aside>

          {/* =========================================================================
              RIGHT COLUMN: Top Sorting Bar & Enhanced Product Cards Grid
              ========================================================================= */}
          <main className="md:col-span-8 lg:col-span-9 space-y-4">
            
            {/* Flipkart Style Top Bar: Breadcrumb & Sort Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                {/* Search Bar inside Catalog */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dark slab, milk couverture, hazelnut praline, cocoa..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8C4724] focus:bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black cursor-pointer text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Items Counter */}
                <div className="text-xs text-gray-500 shrink-0">
                  Showing <strong>{filteredProducts.length}</strong> of <strong>{ECOMMERCE_PRODUCTS.length}</strong> items
                </div>
              </div>

              {/* Flipkart Sort By Bar */}
              <div className="flex items-center gap-2 sm:gap-4 pt-3 overflow-x-auto text-xs text-gray-600">
                <span className="font-bold text-gray-800 shrink-0">Sort By:</span>
                {[
                  { id: 'relevance', label: 'Relevance' },
                  { id: 'price-asc', label: 'Price -- Low to High' },
                  { id: 'price-desc', label: 'Price -- High to Low' },
                  { id: 'rating', label: 'Rating' },
                  { id: 'discount', label: 'Discount' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id as SortOption)}
                    className={`shrink-0 py-1 transition-colors cursor-pointer ${
                      sortBy === s.id
                        ? 'text-[#8C4724] font-bold border-b-2 border-[#8C4724]'
                        : 'text-gray-600 hover:text-[#8C4724] font-medium'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced 3D Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mx-auto mb-3">
                  🍫
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  No chocolates match your active filters
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try clearing your search query or selecting "All Prices".
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-5 py-2 rounded-full bg-[#8C4724] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer hover:bg-[#6E371B] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard3D
                    key={product.id}
                    product={product}
                    onQuickView={(p) => {
                      if (onSelectProduct) {
                        onSelectProduct(p);
                      }
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Bottom Flipkart Trust Banner */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-xl block mb-1">🧊</span>
                <strong className="text-xs text-gray-800 block font-bold">Insulated Packaging</strong>
                <span className="text-[10px] text-gray-500">Melt-free pan-India transit</span>
              </div>
              <div>
                <span className="text-xl block mb-1">🏭</span>
                <strong className="text-xs text-gray-800 block font-bold">Kurud Works Fresh</strong>
                <span className="text-[10px] text-gray-500">Direct factory tempering</span>
              </div>
              <div>
                <span className="text-xl block mb-1">🍫</span>
                <strong className="text-xs text-gray-800 block font-bold">100% Pure Cocoa</strong>
                <span className="text-[10px] text-gray-500">No palm oil or substitutes</span>
              </div>
              <div>
                <span className="text-xl block mb-1">⚡</span>
                <strong className="text-xs text-gray-800 block font-bold">WhatsApp Direct</strong>
                <span className="text-[10px] text-gray-500">+91-9098229454</span>
              </div>
            </div>

          </main>
        </div>

      </div>
    </section>
  );
};
