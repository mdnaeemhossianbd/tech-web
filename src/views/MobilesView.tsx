import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  Check,
  Scale,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import mobilesData from '../data/mobiles.json';

export const MobilesView: React.FC = () => {
  const { mobiles, navigateTo, addToComparison, comparisonList } = useApp();

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedRam, setSelectedRam] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [selectedRefreshRate, setSelectedRefreshRate] = useState<string>('all');
  const [fiveGOnly, setFiveGOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc' | 'popular'>('latest');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(mobiles.map(m => m.brand)));
    return ['all', ...list];
  }, [mobiles]);

  // Filter & Sort logic
  const filteredPhones = useMemo(() => {
    return mobiles
      .filter(phone => {
        // Brand filter
        if (selectedBrand !== 'all' && phone.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
        // 5G filter
        if (fiveGOnly && !phone.network.fiveG) {
          return false;
        }
        // RAM filter
        if (selectedRam !== 'all' && !phone.memory.ram.includes(selectedRam)) {
          return false;
        }
        // Storage filter
        if (selectedStorage !== 'all' && !phone.memory.storage.includes(selectedStorage)) {
          return false;
        }
        // Refresh rate filter
        if (selectedRefreshRate !== 'all' && !phone.display.refreshRate.includes(selectedRefreshRate)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = phone.name.toLowerCase().includes(q);
          const matchBrand = phone.brand.toLowerCase().includes(q);
          const matchChip = phone.performance.chipset.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchChip) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        }
        if (sortBy === 'price-asc') {
          const priceA = parseInt(a.price.bangladesh.replace(/[^0-9]/g, '')) || 0;
          const priceB = parseInt(b.price.bangladesh.replace(/[^0-9]/g, '')) || 0;
          return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
          const priceA = parseInt(a.price.bangladesh.replace(/[^0-9]/g, '')) || 0;
          const priceB = parseInt(b.price.bangladesh.replace(/[^0-9]/g, '')) || 0;
          return priceB - priceA;
        }
        // default latest
        return 0;
      });
  }, [
    selectedBrand,
    selectedRam,
    selectedStorage,
    selectedRefreshRate,
    fiveGOnly,
    searchQuery,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedRam('all');
    setSelectedStorage('all');
    setSelectedRefreshRate('all');
    setFiveGOnly(false);
    setSearchQuery('');
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          Smartphone Directory
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Mobile Database & Specifications
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Search, filter, and compare tested smartphones with verified hardware specs, gaming frame rates, and regional prices for Bangladesh (BDT) and Saudi Arabia (SAR).
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top search & sorting row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Quick search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by phone name, chipset (e.g. Dimensity 8200, Snapdragon)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="latest">Latest Release</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <button
              onClick={resetFilters}
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter selectors row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {/* Brand */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              {brands.map(b => (
                <option key={b} value={b}>
                  {b === 'all' ? 'All Brands' : b}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Rate */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Display Refresh
            </label>
            <select
              value={selectedRefreshRate}
              onChange={e => setSelectedRefreshRate(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">All Refresh Rates</option>
              <option value="144Hz">144Hz Ultra Smooth</option>
              <option value="120Hz">120Hz Fast</option>
            </select>
          </div>

          {/* RAM */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              RAM
            </label>
            <select
              value={selectedRam}
              onChange={e => setSelectedRam(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">All RAM Sizes</option>
              <option value="12GB">12GB RAM</option>
              <option value="8GB">8GB RAM</option>
            </select>
          </div>

          {/* Storage */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Storage
            </label>
            <select
              value={selectedStorage}
              onChange={e => setSelectedStorage(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">All Capacities</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
            </select>
          </div>

          {/* 5G Network Checkbox */}
          <div className="flex items-end">
            <button
              onClick={() => setFiveGOnly(!fiveGOnly)}
              className={`w-full py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                fiveGOnly
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${fiveGOnly ? 'opacity-100' : 'opacity-0'}`} />
              <span>5G Network Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Active Comparison Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <strong>{filteredPhones.length}</strong> smartphone{filteredPhones.length === 1 ? '' : 's'}
        </div>

        {comparisonList.length > 0 && (
          <button
            onClick={() => navigateTo('compare')}
            className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Compare ({comparisonList.length} Selected)</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Phones Grid */}
      {filteredPhones.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <Smartphone className="w-12 h-12 mx-auto opacity-30" />
          <h3 className="font-heading font-semibold text-slate-800 dark:text-slate-200">
            No Smartphones Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No devices matched your selected filters. Try resetting the brand or RAM filters to see the full list.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map(phone => {
            const isComparing = comparisonList.includes(phone.slug);
            return (
              <div
                key={phone.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {phone.badge && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {phone.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {phone.brand}
                  </span>
                </div>

                {/* Specs body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {phone.name}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-slate-400">Display</span>
                        <span className="font-medium text-right line-clamp-1 max-w-[150px]">
                          {phone.quickSpecs.display}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-slate-400">Processor</span>
                        <span className="font-medium text-right line-clamp-1 max-w-[150px]">
                          {phone.quickSpecs.processor.split('(')[0]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-slate-400">Battery</span>
                        <span className="font-medium">
                          {phone.quickSpecs.battery} · {phone.quickSpecs.charging}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-0.5">
                        <span className="text-slate-400">Camera</span>
                        <span className="font-medium line-clamp-1 max-w-[150px]">
                          {phone.quickSpecs.camera}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown and Actions */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Bangladesh
                        </span>
                        <span className="font-heading font-bold text-sm text-blue-600 dark:text-blue-400">
                          {phone.price.bangladesh}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Saudi Arabia
                        </span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {phone.price.saudi}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigateTo('mobile-detail', phone.slug)}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          addToComparison(phone.slug);
                          navigateTo('compare');
                        }}
                        className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                          isComparing
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                        title={isComparing ? 'In comparison' : 'Add to comparison'}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
