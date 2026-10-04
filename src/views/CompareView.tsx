import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  Plus,
  Trash2,
  Check,
  X,
  Smartphone,
  Cpu,
  Layers,
  Battery,
  Zap,
  Camera,
  ArrowRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import mobilesData from '../data/mobiles.json';
import type { MobilePhone } from '../types';

export const CompareView: React.FC = () => {
  const { comparisonList, addToComparison, removeFromComparison, clearComparison, navigateTo } = useApp();
  const [highlightDiff, setHighlightDiff] = useState<boolean>(true);

  // Get active phones in comparison (up to 3)
  const allPhones = mobilesData as unknown as MobilePhone[];
  const selectedPhones: MobilePhone[] = comparisonList
    .map(slug => allPhones.find(m => m.slug === slug || m.id === slug))
    .filter((p): p is MobilePhone => Boolean(p))
    .slice(0, 3);

  // Phone selection handler for adding another phone
  const availablePhonesToAdd = allPhones.filter(
    m => !comparisonList.includes(m.slug) && !comparisonList.includes(m.id)
  );

  const handleAddPhone = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug) {
      addToComparison(slug);
    }
  };

  // Spec comparison rows
  const specRows = [
    {
      group: 'Pricing & Availability',
      items: [
        { label: 'Bangladesh Price', getValue: (p: MobilePhone) => p.price.bangladesh },
        { label: 'Saudi Arabia Price', getValue: (p: MobilePhone) => p.price.saudi },
        { label: 'Global USD (Approx)', getValue: (p: MobilePhone) => p.price.globalUSD || 'N/A' },
        { label: 'Release Date', getValue: (p: MobilePhone) => p.releaseDate },
      ],
    },
    {
      group: 'Display',
      items: [
        { label: 'Panel Type', getValue: (p: MobilePhone) => p.display.type },
        { label: 'Size', getValue: (p: MobilePhone) => p.display.size },
        { label: 'Resolution', getValue: (p: MobilePhone) => p.display.resolution },
        { label: 'Refresh Rate', getValue: (p: MobilePhone) => p.display.refreshRate },
        { label: 'Brightness', getValue: (p: MobilePhone) => p.display.brightness },
        { label: 'Protection', getValue: (p: MobilePhone) => p.display.protection },
      ],
    },
    {
      group: 'Performance & Gaming',
      items: [
        { label: 'Chipset', getValue: (p: MobilePhone) => p.performance.chipset },
        { label: 'GPU Engine', getValue: (p: MobilePhone) => p.performance.gpu },
        { label: 'AnTuTu Benchmark', getValue: (p: MobilePhone) => p.benchmarks?.antutu || 'Not tested' },
        { label: 'PUBG Tested FPS', getValue: (p: MobilePhone) => p.gaming?.pubgFps || '60 FPS' },
        { label: 'Bypass Charging', getValue: (p: MobilePhone) => p.gaming?.bypassCharging ? 'Yes (Supported)' : 'No' },
        { label: 'Peak Gaming Heat', getValue: (p: MobilePhone) => p.gaming?.heating || 'Not recorded' },
      ],
    },
    {
      group: 'Cameras',
      items: [
        { label: 'Rear Main Camera', getValue: (p: MobilePhone) => p.camera.rear },
        { label: 'Front Selfie', getValue: (p: MobilePhone) => p.camera.front },
        { label: 'Video Max Quality', getValue: (p: MobilePhone) => p.camera.video },
      ],
    },
    {
      group: 'Battery & Charging',
      items: [
        { label: 'Capacity', getValue: (p: MobilePhone) => p.battery.capacity },
        { label: 'Wired Fast Charging', getValue: (p: MobilePhone) => p.battery.charging },
        { label: 'Wireless Charging', getValue: (p: MobilePhone) => p.battery.wirelessCharging },
      ],
    },
    {
      group: 'Body, Build & Audio',
      items: [
        { label: 'Dimensions', getValue: (p: MobilePhone) => p.body.dimensions },
        { label: 'Weight', getValue: (p: MobilePhone) => p.body.weight },
        { label: 'Build Material & IP', getValue: (p: MobilePhone) => p.body.build },
        { label: '3.5mm Headphone Jack', getValue: (p: MobilePhone) => p.sound.headphoneJack },
        { label: 'Stereo Speakers', getValue: (p: MobilePhone) => p.sound.speaker },
      ],
    },
    {
      group: 'Software & Connectivity',
      items: [
        { label: 'Operating System', getValue: (p: MobilePhone) => p.software.os },
        { label: 'User Interface (UI)', getValue: (p: MobilePhone) => p.software.ui },
        { label: '5G Connectivity', getValue: (p: MobilePhone) => (p.network.fiveG ? 'Yes (5G Dual Active)' : '4G LTE Only') },
        { label: 'NFC Support', getValue: (p: MobilePhone) => p.connectivity.nfc },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>Factual Matrix</span>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Compare Mobile Phones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Side-by-side technical comparison of up to 3 devices. We present unbiased specs, benchmarks, and thermal metrics without arbitrary winners.
          </p>
        </div>

        {/* Highlight differences toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={highlightDiff}
              onChange={e => setHighlightDiff(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Highlight Differences</span>
          </label>

          {selectedPhones.length > 0 && (
            <button
              onClick={clearComparison}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Selected Phones Header Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs overflow-x-auto">
        <div className="min-w-[650px]">
          {/* Top comparison columns */}
          <div className="grid grid-cols-4 gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col justify-end p-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Phones ({selectedPhones.length}/3)
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Add or swap devices to compare their exact specifications.
              </p>
            </div>

            {[0, 1, 2].map(slotIdx => {
              const currentPhone = selectedPhones[slotIdx];

              if (currentPhone) {
                return (
                  <div
                    key={currentPhone.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between relative group"
                  >
                    <button
                      onClick={() => removeFromComparison(currentPhone.slug)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-rose-100 hover:text-rose-600 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-3">
                      <div className="h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={currentPhone.image}
                          alt={currentPhone.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
                          {currentPhone.brand}
                        </span>
                        <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {currentPhone.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700 space-y-2">
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {currentPhone.price.bangladesh}
                      </div>
                      <button
                        onClick={() => navigateTo('mobile-detail', currentPhone.slug)}
                        className="w-full py-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Full Specs</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              }

              // Empty slot to add phone
              return (
                <div
                  key={`empty-${slotIdx}`}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Add Phone {slotIdx + 1}
                    </h4>
                    <p className="text-[10px] text-slate-400">Choose from database</p>
                  </div>
                  <select
                    onChange={handleAddPhone}
                    defaultValue=""
                    className="w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select phone...
                    </option>
                    {availablePhonesToAdd.map(p => (
                      <option key={p.id} value={p.slug}>
                        {p.name} ({p.brand})
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          {/* Comparison spec rows */}
          <div className="space-y-6 pt-6">
            {specRows.map((category, catIdx) => (
              <div key={catIdx} className="space-y-2">
                <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl text-xs font-bold font-heading text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {category.group}
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {category.items.map((item, itemIdx) => {
                    const values = selectedPhones.map(p => item.getValue(p));
                    const isDifferent =
                      highlightDiff &&
                      values.length > 1 &&
                      new Set(values).size > 1;

                    return (
                      <div
                        key={itemIdx}
                        className={`grid grid-cols-4 gap-4 px-4 py-3 items-center transition-colors ${
                          isDifferent
                            ? 'bg-blue-50/40 dark:bg-blue-950/20'
                            : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                        }`}
                      >
                        <span className="font-medium text-slate-500 dark:text-slate-400">
                          {item.label}
                        </span>

                        {[0, 1, 2].map(slotIdx => {
                          const val = values[slotIdx];
                          if (val === undefined) {
                            return (
                              <span key={slotIdx} className="text-slate-300 dark:text-slate-700 italic">
                                —
                              </span>
                            );
                          }
                          return (
                            <span
                              key={slotIdx}
                              className={`text-slate-800 dark:text-slate-200 ${
                                isDifferent ? 'font-semibold text-blue-900 dark:text-blue-300' : ''
                              }`}
                            >
                              {val}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
