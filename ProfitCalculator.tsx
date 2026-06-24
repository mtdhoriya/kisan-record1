import React, { useState, useEffect } from 'react';
import { Crop } from '../types';
import { DICTIONARY } from '../data';
import { Menu, Bell, Info, Calculator, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

interface ProfitCalculatorProps {
  lang: 'English' | 'Hindi';
  crops: Crop[];
}

export default function ProfitCalculator({ lang, crops }: ProfitCalculatorProps) {
  const dict = DICTIONARY[lang];

  // Form Inputs
  const [selectedCropId, setSelectedCropId] = useState<string>('');
  const [cropType, setCropType] = useState<string>('wheat');
  const [totalArea, setTotalArea] = useState<number>(2.5);
  const [totalCost, setTotalCost] = useState<number>(12500);
  const [expectedYield, setexpectedYield] = useState<number>(18);
  const [marketPrice, setMarketPrice] = useState<number>(2200);

  // Computed Outputs
  const [totalYield, setTotalYield] = useState<number>(45.0);
  const [grossIncome, setGrossIncome] = useState<number>(99000);
  const [estimatedProfit, setEstimatedProfit] = useState<number>(86500);

  // Auto fill when crop changes
  useEffect(() => {
    if (selectedCropId) {
      const selected = crops.find(c => c.id === selectedCropId);
      if (selected) {
        setCropType(selected.type);
        setTotalArea(selected.area);
        setTotalCost(selected.totalCost || 12000);
        setexpectedYield(selected.expectedYield || 15);
        setMarketPrice(selected.marketPrice || 2200);
      }
    }
  }, [selectedCropId, crops]);

  // Handle immediate live calculations
  useEffect(() => {
    const calculatedYield = totalArea * expectedYield;
    const calculatedGross = calculatedYield * marketPrice;
    const calculatedProfit = calculatedGross - totalCost;

    setTotalYield(calculatedYield);
    setGrossIncome(calculatedGross);
    setEstimatedProfit(calculatedProfit);
  }, [totalArea, totalCost, expectedYield, marketPrice]);

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-white" />
          <h1 className="font-display font-medium text-lg tracking-tight">
            {lang === 'English' ? 'Crop Profit Calculator' : 'कृषि लाभ गणन यंत्र'}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Calculator Main Section */}
      <main className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        <section className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 shadow-sm">
          
          {/* Quick Select Existing Crop */}
          {crops.length > 0 && (
            <div className="bg-emerald-50/55 p-3 rounded-xl border border-emerald-100">
              <label className="block text-xs font-bold text-slate-550 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-base" />
                <span>Quick Fill from Crops</span>
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full bg-white text-slate-700 text-xs py-1.5 px-2.5 border border-slate-200 rounded-lg font-medium outline-hidden"
              >
                <option value="">-- Choose Active Record --</option>
                {crops.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.area} Acre)</option>
                ))}
              </select>
            </div>
          )}

          {/* Crop Dropdown type selection */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500">Select Crop</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-sm font-semibold text-slate-800 focus:border-primary-base focus:ring-1 focus:ring-primary-base"
            >
              <option value="wheat">Wheat</option>
              <option value="paddy">Paddy</option>
              <option value="soybean">Soybean</option>
              <option value="maize">Maize</option>
            </select>
          </div>

          {/* Area Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500">Total Area (Acre)</label>
            <input
              type="number"
              step="0.1"
              value={totalArea}
              onChange={(e) => setTotalArea(parseFloat(e.target.value) || 0)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-sm font-semibold text-slate-800 focus:border-primary-base focus:ring-1 focus:ring-primary-base"
              placeholder="e.g. 2.5"
            />
          </div>

          {/* Total Cost input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500">Total Cost (₹)</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(parseInt(e.target.value) || 0)}
                className="w-full h-11 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-sm font-semibold text-slate-800 focus:border-primary-base focus:ring-1 focus:ring-primary-base"
                placeholder="12500"
              />
            </div>
          </div>

          {/* Expected Yield in quintal/acre */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500">Expected Yield (Quintal/Acre)</label>
            <input
              type="number"
              value={expectedYield}
              onChange={(e) => setexpectedYield(parseFloat(e.target.value) || 0)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-sm font-semibold text-slate-800 focus:border-primary-base focus:ring-1 focus:ring-primary-base"
              placeholder="e.g. 18"
            />
          </div>

          {/* Market Price per Quintal */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500">Market Price (₹/Quintal)</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={marketPrice}
                onChange={(e) => setMarketPrice(parseFloat(e.target.value) || 0)}
                className="w-full h-11 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-sm font-semibold text-slate-800 focus:border-primary-base focus:ring-1 focus:ring-primary-base"
                placeholder="2200"
              />
            </div>
          </div>

          <button
            onClick={() => {
              // Re-run animation/trigger simply
              setTotalYield(totalArea * expectedYield);
            }}
            className="w-full h-11 bg-primary-base text-white hover:bg-[#0e4c33] font-bold text-sm rounded-xl shadow-xs transition-all mt-2 flex items-center justify-center gap-2 active:scale-95"
          >
            <Calculator className="w-4 h-4" />
            <span>{dict.calculate_again}</span>
          </button>
        </section>

        {/* Calculation summary section box card */}
        <section className="bg-emerald-50/40 border border-emerald-150 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 bg-emerald-50/80 border-b border-emerald-150 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-base" />
            <h2 className="font-display font-bold text-sm text-emerald-950">
              {dict.calculation_summary}
            </h2>
          </div>
          
          <div className="p-4 space-y-3.5">
            {/* Net Total Yield */}
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/50">
              <span className="text-xs font-semibold text-slate-500">{dict.total_yield}</span>
              <span className="font-bold text-slate-800 text-sm font-display">{totalYield.toFixed(2)} Quintal</span>
            </div>

            {/* Total Gross value path */}
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/50">
              <span className="text-xs font-semibold text-slate-500">{dict.gross_income}</span>
              <span className="font-bold text-slate-800 text-sm font-display">₹{grossIncome.toLocaleString()}</span>
            </div>

            {/* Total Cost */}
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/50">
              <span className="text-xs font-semibold text-slate-500">{dict.total_cost}</span>
              <span className="font-bold text-slate-800 text-sm font-display">₹{totalCost.toLocaleString()}</span>
            </div>

            {/* Profit margin */}
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-sm font-bold text-primary-base font-display">{dict.estimated_profit}</span>
              <span className={`text-lg font-extrabold font-display ${estimatedProfit >= 0 ? 'text-primary-base' : 'text-red-700'}`}>
                ₹{estimatedProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Tip Box */}
        <div className="bg-emerald-50/20 p-4 border border-emerald-150/50 rounded-xl flex gap-3">
          <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {dict.calculator_helper}
          </p>
        </div>
      </main>
    </div>
  );
}
