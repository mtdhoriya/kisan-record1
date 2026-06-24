import React, { useState } from 'react';
import { Crop, ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { Menu, Bell, Plus, X, Tag, Calendar, Ruler, Layers, DollarSign, Sparkles } from 'lucide-react';

interface CropRecordsProps {
  lang: 'English' | 'Hindi';
  crops: Crop[];
  onAddCrop: (crop: Crop) => void;
  onNavigate: (screen: ScreenId) => void;
}

export default function CropRecords({ lang, crops, onAddCrop, onNavigate }: CropRecordsProps) {
  const dict = DICTIONARY[lang];
  const [activeTab, setActiveTab] = useState<'all' | 'current' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [cropType, setCropType] = useState<'wheat' | 'paddy' | 'soybean' | 'maize'>('wheat');
  const [area, setArea] = useState('2.5');
  const [date, setDate] = useState('22 Jun 2026');
  const [status, setStatus] = useState<'Growing' | 'Sowing' | 'Completed'>('Growing');
  const [cost, setCost] = useState('11000');
  const [expectedYield, setExpectedYield] = useState('15');
  const [marketPrice, setMarketPrice] = useState('2200');

  // Filter crops
  const filteredCrops = crops.filter((crop) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'current') return crop.status === 'Growing' || crop.status === 'Sowing';
    if (activeTab === 'completed') return crop.status === 'Completed';
    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Growing':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'Sowing':
        return 'bg-teal-50 text-teal-800 border-teal-100';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-100';
    }
  };

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!area || isNaN(parseFloat(area))) return;

    const names = {
      wheat: lang === 'English' ? 'Wheat' : 'गेहूं (Wheat)',
      paddy: lang === 'English' ? 'Paddy' : 'धान (Paddy)',
      soybean: lang === 'English' ? 'Soybean' : 'सोयाबीन (Soybean)',
      maize: lang === 'English' ? 'Maize' : 'मक्का (Maize)'
    };

    const images = {
      wheat: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwICcB419vZH65DuV89Gk1yDIo4ATw9onc6r5QC7HEGu_8DcSKUlafHhT8748yDzOy-YyHapLpnly4AKxoHoOY4tE_eVsb029tsgL8sOkhs0AHYnPckkn1zIIE3qtM4mDDD18Y8sw33fLcL8KlOHt4g2_hRFcLlibJxowPV0PuLNmQmR6vIH1313c6z-o17zZuxCzQuHWttNA4Y8BunGzieKtk99ZYwcs3lXdXW9nFHBnf4BntqF-OZ163XyP5XkIAIAqTTIltRknV',
      paddy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM3OkKcTXxE0A_vhgmBtfNfLj_YP6tDjN1c0BrRPatoFzknnFmdO5lVAS3qJaHt1b6mqgDr_ykOCyYpioXmG6HrzHwINi2T4NE28Ap6D-sBbbPMZypuELyAzN-tsAz6LCdXMMnW2UXB5dJUiCxL2-UYDMm1xr1tfy4dTxkmHM58qrmOp5W_UBpi1ahg4mMgzLD4tE9iJlAqje0g-pNWUybozESODsp1a7UY_00bbpxY9FntOldKLeUlJKOSi4sOj4o3IqOwfHANEpF',
      soybean: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUXhtzWbYzIRLuhfje_-e__dnS8-tde72m59kzeDkiVCEYTddkzfAmXNS16BupOOcPovMM8of2FANdGWFnXsU2Xtk-hP9NdZzkYYTPTHiGV_CvEa-EGpNowPIASpid__wNSl8o2Bkp7NjvzECj0vKtXwUbhONwmh0_utuyNpJm3l5aWSIjV4B31IrIHBNxoAhCJvPnPDLkJYtjRghN_0fVTzwcAZyDjesh-PV8KuANSyzlvEGLGprgh9-YyYG_UAhCNPGXjnsWgRcz',
      maize: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCesRPXuKnGZiHiDSGjES-gSefUHGnTMBt6Zc37CpqzBbyvlIQ-oaNErMIF4QqCobS7AalltWRCIDH-pRKHoGM2r2UBuqTRh4bqIifQANqnAv-IIlONBSaHz9yimnMsqACN4nssX--BbM1H8QvoyFsEZkowFJjTYPRmhshSFmJpGEy6UdTqgeJEAtNWW_687EnoqRLNAsVSjMH-v_ETBfwm4IZcXcNbAzr6YB1dEnZT9g5x3gXiAYCJurIFWhOPJSUQnLp9l8dIJwEv'
    };

    const newCrop: Crop = {
      id: 'crop_' + Date.now(),
      name: names[cropType],
      area: parseFloat(area),
      date: date || 'Today',
      status: status as any,
      image: images[cropType],
      type: cropType,
      expectedYield: expectedYield ? parseFloat(expectedYield) : 15,
      totalCost: cost ? parseFloat(cost) : 10000,
      marketPrice: marketPrice ? parseFloat(marketPrice) : 2200
    };

    onAddCrop(newCrop);
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-white cursor-pointer" />
          <h1 className="font-display font-medium text-lg tracking-tight">
            {lang === 'English' ? 'Crop Records' : 'फसल रिकॉर्ड'}
          </h1>
        </div>
        <button className="p-1 rounded-full hover:bg-emerald-800 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Sticky Filter Tabs */}
      <div className="bg-white border-b border-slate-100 flex items-center justify-between px-2 py-1 sticky top-[56px] z-20 shadow-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'all'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {dict.all_crops}
        </button>
        <button
          onClick={() => setActiveTab('current')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'current'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {dict.current}
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'completed'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {dict.completed}
        </button>
      </div>

      {/* Crops List Container */}
      <div className="px-4 py-4 space-y-3.5">
        {filteredCrops.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-500">
              {lang === 'English' ? 'No crop records found' : 'कोई फसल रिकॉर्ड नहीं मिला'}
            </p>
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center transition-all hover:shadow-md cursor-pointer group"
              onClick={() => onNavigate('fertilizer_schedule')}
            >
              <div className="flex-1 min-w-0 pr-3">
                <span className="inline-block px-1.5 py-0.5 rounded-md text-[9px] bg-slate-100 text-slate-600 font-semibold mb-1 uppercase tracking-wider">
                  {crop.type}
                </span>
                <h3 className="font-display font-bold text-base text-slate-800 truncate mb-1">
                  {crop.name}
                </h3>
                
                <div className="space-y-1 mt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-slate-400 font-medium">Area</span>
                    <span className="text-slate-800 font-semibold">{crop.area} Acre</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-slate-400 font-medium">Date</span>
                    <span className="text-slate-850 font-semibold">{crop.date}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1.5">
                    <span className="w-10 text-slate-400 font-medium">Status</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(crop.status)}`}>
                      {lang === 'English' ? crop.status : crop.status === 'Growing' ? 'बढ़ रही है' : 'बुवाई'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Crop image container */}
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-inner group-hover:scale-102 transition-transform">
                <img
                  className="w-full h-full object-cover"
                  src={crop.image}
                  alt={crop.name}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button (FAB) to open modal */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-primary-base hover:bg-[#0e4c33] text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Crop Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 overflow-y-auto max-h-[85vh] shadow-xl border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-display font-extrabold text-base text-slate-800">
                {lang === 'English' ? 'Add Crop Record' : 'नया फसल रिकॉर्ड जोड़ें'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCrop} className="space-y-4">
              {/* Type Category Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Select Crop Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['wheat', 'paddy', 'soybean', 'maize'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCropType(type)}
                      className={`py-2 text-center text-xs font-bold rounded-xl border transition-all truncate uppercase ${
                        cropType === type
                          ? 'border-primary-base bg-emerald-50 text-emerald-800 font-extrabold shadow-xs'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area in Acre */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Total Area (Acre)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 2.5"
                    className="w-full py-2 px-3 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base focus:ring-1 focus:ring-primary-base text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Sowing Date Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Sowing Date</label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 22 Jun 2026"
                  className="w-full py-2 px-3 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base focus:ring-1 focus:ring-primary-base text-sm font-semibold text-slate-800"
                />
              </div>

              {/* Growth Status Badge */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Status</label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="w-full py-2 px-3 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base focus:ring-1 focus:ring-primary-base text-sm font-semibold text-slate-800"
                >
                  <option value="Sowing">Sowing</option>
                  <option value="Growing">Growing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Optional Fields (for Profit Calculator usage) */}
              <div className="border-t border-slate-100 pt-3 mt-1 space-y-3">
                <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary-base" />
                  <span>Configure Calculator Defaults (Optional)</span>
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Expected Yield (Qtl/Acre)</label>
                    <input
                      type="number"
                      value={expectedYield}
                      onChange={(e) => setExpectedYield(e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Total Cost (₹)</label>
                    <input
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Market Price (₹/Quintal)</label>
                  <input
                    type="number"
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Submit triggers */}
              <button
                type="submit"
                className="w-full py-2.5 bg-primary-base text-white hover:bg-[#0e4c33] font-bold text-sm rounded-xl shadow-xs transition-all mt-4"
              >
                {lang === 'English' ? 'Save Crop Record' : 'रिकॉर्ड सुरक्षित करें'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
