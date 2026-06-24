import React from 'react';
import { ScreenId, Transaction } from '../types';
import { DICTIONARY } from '../data';
import { Sun, Menu, Bell, CloudRain, Wind, Droplets, ArrowRight, Wheat, ShoppingCart, UserCheck, Play, ArrowUpRight, TrendingUp } from 'lucide-react';

interface HomeDashboardProps {
  lang: 'English' | 'Hindi';
  onNavigate: (screen: ScreenId) => void;
  recentTransactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
}

export default function HomeDashboard({
  lang,
  onNavigate,
  recentTransactions,
  totalIncome,
  totalExpenses
}: HomeDashboardProps) {
  const dict = DICTIONARY[lang];

  // Helper to resolve transaction icons
  const getTxIcon = (category: string) => {
    switch (category) {
      case 'crop_sale':
        return <Wheat className="w-5 h-5 text-emerald-750" />;
      case 'fertilizer':
      case 'pesticide':
        return <ShoppingCart className="w-5 h-5 text-amber-600" />;
      case 'labor':
        return <UserCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <ShoppingCart className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-8">
      {/* Hero Welcome Header Banner */}
      <section className="bg-gradient-to-b from-primary-base to-emerald-900 text-white pt-5 pb-8 px-4 rounded-b-[2rem] shadow-md relative overflow-hidden">
        {/* Subtle glowing backgrounds */}
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 flex items-center justify-center">
              <Menu className="w-6 h-6 text-white" />
            </span>
            <h1 className="font-display font-bold text-lg tracking-tight">{dict.title}</h1>
          </div>
          <button className="p-1 rounded-full bg-white/10 text-white relative hover:scale-105 transition-transform">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xs text-emerald-200 tracking-wider font-medium uppercase">{dict.location}</p>
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-2xl font-bold font-display tracking-tight text-white">
              {dict.welcome} 👋
            </h2>
          </div>
          <p className="text-xs text-emerald-100/80 mt-1">{dict.subtitle}</p>
        </div>
      </section>

      {/* Main Container */}
      <div className="px-4 -mt-4 relative z-10 space-y-4">
        {/* Weather Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-4xl font-extrabold font-display text-slate-800 leading-none">28°C</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{lang === 'English' ? 'Partly Cloudy' : 'आंशिक रूप से बादल छाए हैं'}</p>
            </div>
            <div className="w-14 h-14 flex items-center justify-center bg-amber-50 rounded-full text-amber-500 shadow-inner">
              <Sun className="w-8 h-8 fill-amber-400 text-amber-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 border-t border-slate-100 mt-4 pt-3 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>{dict.humidity}</span>
              </div>
              <p className="font-semibold text-slate-800 text-sm mt-0.5">65%</p>
            </div>
            <div className="flex flex-col items-center border-x border-slate-100">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>{dict.wind}</span>
              </div>
              <p className="font-semibold text-slate-800 text-sm mt-0.5">12 km/h</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <CloudRain className="w-3.5 h-3.5 text-indigo-400" />
                <span>{dict.rain}</span>
              </div>
              <p className="font-semibold text-slate-800 text-sm mt-0.5">0 mm</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid Panel */}
        <section>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="font-display font-bold text-sm text-slate-800">{dict.quick_actions}</h3>
            <span className="text-xs text-primary-base font-semibold">{dict.view_all}</span>
          </div>
          
          <div className="grid grid-cols-4 gap-y-4 gap-x-2.5">
            {/* My Farm (redirects to Harvest list / Crop record) */}
            <button 
              onClick={() => onNavigate('harvest')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.my_farm}</span>
            </button>

            {/* Crop Record */}
            <button 
              onClick={() => onNavigate('crops')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <Wheat className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.crop_record}</span>
            </button>

            {/* Expenses */}
            <button 
              onClick={() => onNavigate('expenses')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.expenses}</span>
            </button>

            {/* Income */}
            <button 
              onClick={() => onNavigate('expenses')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.income}</span>
            </button>

            {/* Fertilizer Schedule */}
            <button 
              onClick={() => onNavigate('fertilizer_schedule')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <ShoppingCart className="w-5 h-5 text-emerald-800" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.fertilizer}</span>
            </button>

            {/* Weather / Farmer advisory page */}
            <button 
              onClick={() => onNavigate('harvest')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.weather}</span>
            </button>

            {/* Mandi Prices */}
            <button 
              onClick={() => onNavigate('mandi')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.market_price}</span>
            </button>

            {/* Government Schemes / Support */}
            <button 
              onClick={() => onNavigate('schemes')}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-emerald-100/60 rounded-xl flex items-center justify-center text-emerald-800 shadow-sm hover:bg-emerald-700 hover:text-white transition-all active:scale-95">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 mt-1.5">{dict.schemes}</span>
            </button>
          </div>
        </section>

        {/* Dynamic Ad Card / Agricultural Guide */}
        <div className="relative rounded-2xl bg-[#0f5238] text-white p-4 overflow-hidden flex items-center shadow-md border-r-4 border-emerald-400">
          <div className="relative z-10 w-2/3 pr-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-400 text-emerald-950 uppercase mb-1">
              Active Portal
            </span>
            <h4 className="font-display font-bold text-sm text-white mb-1">
              {dict.kisan_suvidha}
            </h4>
            <p className="text-[10px] text-emerald-100/95 leading-relaxed">
              {dict.suvidha_tag}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden">
            <img 
              className="object-contain object-bottom h-[110%] w-full" 
              alt="Farmer avatar"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz9DXT3ONW6Kiuywbbn2YF6rvLe1SbzwyExC-eic9tvPSG_IJh08jjYyFN9vj5v90_FpKJ52BN1PivtfyLSMJbsEey67WtBbOCf-9b-0Kui4v8uzMg7gdxdnpyztwmCbnvw6JlR0VHmqdNodDrbikaq9MfSSgLAuN2a5Yf3KhvPH-d_oT82rzP2x-CNVAek3CJWNrln5WewAPs1Xo4PyiUb70zD-GCGe0fqjQuM9QmZzmLclhilq63USSJcgcPTzpKBGzEv9vQrMh7"
            />
          </div>
        </div>

        {/* Recent Ledger Logs Section */}
        <section className="pb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display font-bold text-sm text-slate-800">{dict.recent_activities}</h3>
            <button 
              onClick={() => onNavigate('expenses')}
              className="text-xs text-primary-base font-semibold hover:underline"
            >
              {dict.view_all}
            </button>
          </div>
          
          <div className="space-y-2">
            {recentTransactions.slice(0, 3).map((item) => {
              const isIncome = item.type === 'income';
              return (
                <div 
                  key={item.id} 
                  className="flex items-center p-3 bg-white hover:bg-slate-50 transition-colors rounded-xl border border-slate-100 shadow-xs"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                    isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {getTxIcon(item.category)}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.date} • {lang === 'English' ? item.category.replace('_', ' ') : 'कृषि सामग्री'}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-xs font-bold ${
                      isIncome ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {isIncome ? '+' : '-'} ₹{item.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
