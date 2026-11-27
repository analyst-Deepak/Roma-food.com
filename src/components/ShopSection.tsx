import React, { useState, useMemo, useEffect } from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { ECOMMERCE_PRODUCTS } from '../data/ecommerceProducts';
import { EcommerceCategory, EcommerceProduct } from '../types/ecommerce';
import { ProductCard3D } from './ProductCard3D';
import { EcommerceQuickViewModal } from './EcommerceQuickViewModal';

interface ShopSectionProps {
  id?: string;
  isStandalonePage?: boolean;
  initialCategory?: EcommerceCategory;
  onSelectProduct?: (product: EcommerceProduct) => void;
  onNavigateHome?: (sectionId?: string) => void;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

const CATEGORIES: { id: EcommerceCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Products', count: 14 },
  { id: 'slabs', label: 'Compound Slab', count: 3 },
  { id: 'choco-chips', label: 'Choco Chips', count: 3 },
  { id: 'buttons', label: 'Buttons (Coins)', count: 3 },
  { id: 'paste', label: 'Choco Paste', count: 3 },
  { id: 'butterscotch', label: 'Butterscotch Crunch', count: 1 },
  { id: 'tuttifrutti', label: 'Tutti Frutti', count: 1 },
];

export const ShopSection: React.FC<ShopSectionProps> = ({
  id = 'shop',
  initialCategory = 'all',
  onSelectProduct,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EcommerceCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<EcommerceProduct | null>(null);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Featured products for the left sidebar "| Products" list
  const featuredSidebarProducts = useMemo(() => {
    return ECOMMERCE_PRODUCTS.slice(0, 4);
  }, []);

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
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div id={id} className="relative w-full bg-[#FAF8F5] text-[#1C0E07] overflow-hidden select-none font-sans">
      
      {/* Background Subtle Botanical Line-Art Watermark Texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "url('/assets/textures/botanical_etching.svg')",
          backgroundSize: '520px 520px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 1. TOP BREADCRUMB & PAGE TITLE (Exact Popat Namkeen Style) */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EADBCC]/70 py-4 sm:py-8 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1C0E07] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Products
            </h1>
            <p className="text-xs sm:text-sm text-[#7A5832] mt-1 font-sans">
              This is where you can browse products in this store.
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[11px] sm:text-xs font-semibold shadow-2xs">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Online Shop: Coming Soon &bull; Display Showcase Only</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8C6D4C] font-medium font-sans">
            <button
              onClick={() => onNavigateHome?.()}
              className="hover:text-[#1C0E07] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-[#B89C7D]">›</span>
            <span className="text-[#1C0E07] font-bold">Products</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN STORE LAYOUT (Exact Popat Namkeen Layout) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10 items-start">

          {/* =========================================================================
              LEFT SIDEBAR: Search Box + "| Categories" (ON TOP) + "| Products" List
              ========================================================================= */}
          <aside className="w-full md:w-64 lg:w-72 shrink-0 space-y-4 sm:space-y-6">
            
            {/* Search Box */}
            <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-[#EADBCC]/80 shadow-xs">
              <label className="text-xs sm:text-sm font-bold text-[#1C0E07] block mb-1.5 sm:mb-2 font-sans">
                Search Products
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-[#D5C2AF] text-xs text-[#1C0E07] focus:outline-none focus:border-[#8C4724] bg-white placeholder-[#A08C79]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1.5 text-[#A08C79] hover:text-[#1C0E07] text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#2B2B2B] hover:bg-[#111111] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 shadow-xs active:scale-95"
                >
                  SEARCH
                </button>
              </div>
            </div>

            {/* | Categories List (Mobile Collapsible / Compact, Desktop Expanded) */}
            <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-[#EADBCC]/80 shadow-xs">
              <button
                type="button"
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="w-full flex items-center justify-between cursor-pointer md:cursor-default"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#8C4724] rounded-full" />
                  <h3 className="text-sm font-bold text-[#1C0E07] tracking-wider uppercase font-sans">
                    Categories
                  </h3>
                  <span className="text-[11px] text-[#8C4724] font-bold md:hidden">
                    • {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#8C4724] md:hidden px-2 py-0.5 rounded bg-[#FAF0E4]">
                  {isMobileCategoryOpen ? '▲ Hide' : '▼ Filter'}
                </span>
              </button>

              <div
                className={`${
                  isMobileCategoryOpen
                    ? 'block mt-3 pt-3 border-t border-[#EADBCC]/60'
                    : 'hidden md:block md:mt-3 md:pt-2.5 md:border-t md:border-[#EADBCC]/60'
                } space-y-1`}
              >
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsMobileCategoryOpen(false);
                      }}
                      className={`w-full text-left py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'font-bold text-[#8C4724] bg-[#FAF0E4] shadow-xs'
                          : 'text-[#6C5543] hover:text-[#1C0E07] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[11px] font-bold text-[#A08C79]">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* | Products (Featured Miniature List) - HIDDEN ON MOBILE to give direct access to product grid */}
            <div className="hidden md:block bg-white p-4 sm:p-5 rounded-xl border border-[#EADBCC]/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4 border-b border-[#EADBCC]/60 pb-2.5">
                <span className="w-1 h-4 bg-[#8C4724] rounded-full" />
                <h3 className="text-sm font-bold text-[#1C0E07] tracking-wider uppercase font-sans">
                  Products
                </h3>
              </div>

              <div className="space-y-4">
                {featuredSidebarProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct?.(item)}
                    className="flex items-center gap-3 group cursor-pointer border-b border-[#F0E6DC] pb-3 last:border-b-0 last:pb-0"
                  >
                    {/* Miniature Packet on Mini Marble Shelf */}
                    <div className="w-12 h-14 shrink-0 flex flex-col items-center justify-center relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-110 filter drop-shadow-xs"
                      />
                      <div className="w-10 h-1 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full shadow-2xs mt-[-2px]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#1C0E07] group-hover:text-[#8C4724] line-clamp-1 transition-colors leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#8C6D4C] block mt-0.5 font-sans italic">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* =========================================================================
              RIGHT MAIN AREA: Top Toolbar + Marble Shelf Products Grid
              ========================================================================= */}
          <main className="flex-1 min-w-0 w-full">
            
            {/* Top Toolbar (Grid/List Toggle, Default Sorting, View Count) */}
            <div className="flex items-center justify-between gap-2 border-b border-[#EADBCC]/80 pb-3 mb-4 sm:mb-8">
              
              {/* Left: View Mode Toggles */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'border-[#1C0E07] bg-[#FAF8F5] text-[#1C0E07]'
                      : 'border-gray-200 text-gray-400 hover:text-black'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'border-[#1C0E07] bg-[#FAF8F5] text-[#1C0E07]'
                      : 'border-gray-200 text-gray-400 hover:text-black'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Center: Sorting Dropdown */}
              <div className="flex items-center gap-1.5">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#D5C2AF] text-[11px] sm:text-xs text-[#1C0E07] bg-white cursor-pointer focus:outline-none focus:border-[#8C4724]"
                >
                  <option value="relevance">Default sorting</option>
                  <option value="rating">Sort by popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Right: Products Count */}
              <div className="text-[11px] sm:text-xs text-[#8C6D4C] font-semibold font-sans">
                <span className="text-[#1C0E07] font-bold">{filteredProducts.length}</span> Products
              </div>
            </div>

            {/* Product Cards Container (Grid / List with 3D Marble Shelves) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#EADBCC] p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#FAF0E4] flex items-center justify-center text-3xl mx-auto mb-3">
                  🍫
                </div>
                <h3 className="text-base font-bold text-[#1C0E07] mb-1">
                  No products found
                </h3>
                <p className="text-xs text-gray-500 mb-4 font-sans">
                  Try clearing your search query or choosing another category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2 rounded-full bg-[#1C0E07] hover:bg-[#8C4724] text-[#FEE8B4] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 items-stretch'
                    : 'space-y-4 sm:space-y-6'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard3D
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={(p) => {
                      setQuickViewProduct(p);
                      if (onSelectProduct) onSelectProduct(p);
                    }}
                  />
                ))}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Quick View Display Showcase Modal (Online Shop Coming Soon) */}
      <EcommerceQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};