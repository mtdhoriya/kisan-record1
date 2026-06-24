import React, { useState } from 'react';
import { MandiRate } from '../types';
import { DICTIONARY } from '../data';
import { Menu, Bell, MapPin, Search, SlidersHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw, Layers } from 'lucide-react';

interface MarketPricesProps {
  lang: 'English' | 'Hindi';
  mandiRates: MandiRate[];
}

export default function MarketPrices({ lang, mandiRates }: MarketPricesProps) {
  const dict = DICTIONARY[lang];
  const [searchTerm, setSearchInput] = useState('');
  const [selectedSubTab, setSelectedSubTab] = useState<'nearby' | 'favorited' | 'state'>('nearby');
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>('m_1');

  // Filter records
  const filteredMandi = mandiRates.filter((item) =>
    item.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMandi = mandiRates.find((m) => m.id === selectedCommodityId) || mandiRates[0];

  // Helper trend colors
  const getTrendColor = (type: string) => {
    switch (type) {
      case 'up':
        return 'text-emerald-750 bg-emerald-50 border-emerald-100';
      case 'down':
        return 'text-rose-650 bg-rose-50 border-rose-100';
      default:
        return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-white cursor-pointer" />
          <h1 className="font-display font-medium text-lg tracking-tight">
            {lang === 'English' ? 'Market Prices' : 'मंडी बाजार भाव'}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Location Picker & Custom Search bar */}
      <div className="bg-white p-4 space-y-3.5 border-b border-slate-100">
        {/* Location Picker */}
        <div className="flex items-center gap-1.5 text-slate-700 hover:opacity-90 cursor-pointer">
          <MapPin className="w-5 h-5 text-primary-base fill-emerald-100" />
          <span className="font-display font-bold text-xs">Indore, Madhya Pradesh</span>
          <span className="text-[10px] text-slate-400">▼</span>
        </div>

        {/* Search Input box */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={dict.search_crops_mandis}
            className="w-full text-xs font-semibold pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary-base focus:bg-white focus:ring-1 focus:ring-primary-base rounded-xl outline-hidden text-slate-800 tracking-sm"
          />
          <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs list nearby/favorited/state */}
      <div className="bg-white px-4 border-b border-slate-100 scroll-hide flex gap-6 overflow-x-auto">
        <button
          onClick={() => setSelectedSubTab('nearby')}
          className={`pb-2.5 pt-1.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            selectedSubTab === 'nearby'
              ? 'border-primary-base text-primary-base font-extrabold'
              : 'border-transparent text-slate-500'
          }`}
        >
          {dict.nearby_mandis}
        </button>
        <button
          onClick={() => setSelectedSubTab('favorited')}
          className={`pb-2.5 pt-1.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            selectedSubTab === 'favorited'
              ? 'border-primary-base text-primary-base font-extrabold'
              : 'border-transparent text-slate-500'
          }`}
        >
          {dict.favorite_crops}
        </button>
        <button
          onClick={() => setSelectedSubTab('state')}
          className={`pb-2.5 pt-1.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            selectedSubTab === 'state'
              ? 'border-primary-base text-primary-base font-extrabold'
              : 'border-transparent text-slate-500'
          }`}
        >
          {dict.state_wide}
        </button>
      </div>

      {/* Main container */}
      <div className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* Wheat/Selected Price Trend Graph Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3.5">
            <div>
              <h2 className="font-display font-extrabold text-sm text-slate-800">
                {selectedMandi.commodity} Price Trend
              </h2>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Indore Mandi (A-Grade Averages)</p>
            </div>
            
            <div className={`px-2.5 py-1 rounded-full border text-xs font-extrabold flex items-center gap-1 ${
              getTrendColor(selectedMandi.changeType)
            }`}>
              {selectedMandi.changeType === 'up' && <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />}
              {selectedMandi.changeType === 'down' && <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />}
              <span>{selectedMandi.changeType === 'down' ? '-' : '+'}{selectedMandi.trendPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* Price sparkline chart path representation */}
          <div className="h-28 w-full bg-slate-50/50 rounded-xl border border-slate-100/50 overflow-hidden relative flex items-end">
            <svg className="w-full h-full stroke-emerald-700 fill-emerald-100/5 shadow-inner" viewBox="0 0 100 35" preserveAspectRatio="none">
              <path
                d="M0,28 Q15,10 30,22 T60,8 T80,18 T100,5 L100,35 L0,35 Z"
                strokeWidth="1.5"
              />
            </svg>
            <div className="absolute bottom-1.5 left-2 right-2 flex justify-between text-[8px] text-slate-400 font-bold uppercase tracking-wider">
              <span>12 Nov</span>
              <span>14 Nov</span>
              <span>16 Nov</span>
              <span className="text-primary-base font-extrabold">Today</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3.5">
            <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100/60 shadow-xs">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{dict.lowest_7d}</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5 font-display">₹{(selectedMandi.minPrice - 100).toLocaleString()}</p>
            </div>
            <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100/60 shadow-xs">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{dict.highest_7d}</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5 font-display">₹{(selectedMandi.maxPrice + 100).toLocaleString()}</p>
            </div>
          </div>
        </section>

        {/* Detailed market list */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-sm text-slate-800">{dict.market_rates_today}</h3>
            <span className="text-xs text-primary-base font-semibold flex items-center gap-1">
              <span>{dict.sort_by}</span>
              <span>▼</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredMandi.length === 0 ? (
              <div className="text-center py-6 bg-white rounded-xl">
                <Layers className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-500">No commodities found</p>
              </div>
            ) : (
              filteredMandi.map((item) => {
                const isSelected = item.id === selectedCommodityId;
                // Calculate percentage slider positioning
                const percentRange = ((item.currentPrice - item.minPrice) / (item.maxPrice - item.minPrice)) * 100 || 50;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCommodityId(item.id)}
                    className={`bg-white rounded-2xl border p-4 shadow-sm flex items-start gap-3.5 transition-all hover:bg-slate-50/30 cursor-pointer active:scale-99 ${
                      isSelected ? 'border-primary-base ring-1 ring-primary-base/20' : 'border-slate-150'
                    }`}
                  >
                    {/* Circle icon */}
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold font-display">{item.commodity[0]}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1.5">
                        <h4 className="text-xs font-extrabold text-slate-800 truncate pr-2">
                          {item.commodity}
                        </h4>
                        
                        <div className="text-right shrink-0">
                          <p className="text-xs font-extrabold text-slate-800 font-display">₹{item.currentPrice.toLocaleString()}</p>
                          <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">{dict.per_quintal}</span>
                        </div>
                      </div>

                      {/* Slider & min/max displays */}
                      <div className="space-y-1.5 mt-2">
                        {/* Change statistics */}
                        <div className="flex items-center text-[10px] font-bold">
                          {item.changeType === 'down' && (
                            <span className="text-rose-600 flex items-center gap-0.5">
                              ▼ ₹{Math.abs(item.change)}
                            </span>
                          )}
                          {item.changeType === 'up' && (
                            <span className="text-emerald-750 flex items-center gap-0.5">
                              ▲ ₹{item.change}
                            </span>
                          )}
                          {item.changeType === 'stable' && (
                            <span className="text-slate-400">Stable</span>
                          )}
                        </div>

                        {/* Relative slider scale */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                          <div
                            style={{ width: `${percentRange}%` }}
                            className="h-full bg-emerald-600 rounded-full"
                          ></div>
                        </div>

                        <div className="flex justify-between text-[9px] text-slate-450 font-bold uppercase tracking-wider">
                          <span>Min: ₹{item.minPrice.toLocaleString()}</span>
                          <span>Max: ₹{item.maxPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Mandi pricing info footer note */}
        <section className="bg-slate-100/50 p-4 border-l-4 border-primary-base rounded-r-xl italic">
          <p className="text-[10px] text-slate-500 leading-normal font-medium">
            {dict.mandi_source_note}
          </p>
        </section>
      </div>
    </div>
  );
}
