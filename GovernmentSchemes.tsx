import React, { useState } from 'react';
import { GovernmentScheme, ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { ArrowLeft, Search, Bell, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

interface GovernmentSchemesProps {
  lang: 'English' | 'Hindi';
  schemes: GovernmentScheme[];
  onNavigate: (screen: ScreenId) => void;
}

export default function GovernmentSchemes({
  lang,
  schemes,
  onNavigate
}: GovernmentSchemesProps) {
  const dict = DICTIONARY[lang];
  const [searchTerm, setSearchSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Subsidies' | 'Insurance' | 'Irrigation' | 'Education'>('All');

  // Filter schemes out
  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && s.category === selectedCategory;
  });

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Top Bar with banner */}
      <section className="bg-primary-base text-white pt-4 pb-6 px-4 rounded-b-[2rem] shadow-md relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('profile')} 
              className="p-1 rounded-full hover:bg-emerald-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="font-display font-bold text-lg tracking-tight">
              {lang === 'English' ? 'Government Schemes' : 'सरकारी योजना सूची'}
            </h1>
          </div>
          <Bell className="w-5 h-5 text-white" />
        </div>

        {/* Searching block */}
        <div className="mt-3 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchSearch(e.target.value)}
            placeholder={dict.search_schemes}
            className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 bg-white text-slate-800 rounded-xl outline-hidden border-none shadow-sm focus:ring-2 focus:ring-emerald-300"
          />
        </div>
      </section>

      {/* Category Horizontal Filter Scrolling bar */}
      <section className="mt-4 px-4">
        <div className="flex gap-2 pb-2 overflow-x-auto custom-scrollbar">
          {(['All', 'Subsidies', 'Insurance', 'Irrigation', 'Education'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-base text-white font-extrabold shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {lang === 'English' ? cat : dict[cat.toLowerCase() as keyof typeof dict] || cat}
            </button>
          ))}
        </div>
      </section>

      {/* Bento schemes lists cards */}
      <main className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            {/* Conditional header cover photo for featured first popular item */}
            {scheme.popular && (
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3.5 left-4 z-20">
                  <span className="bg-emerald-400 text-emerald-950 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md mb-1.5 inline-block">
                    {dict.popular}
                  </span>
                  <h3 className="text-white font-display font-extrabold text-base leading-tight">
                    {scheme.title}
                  </h3>
                </div>
              </div>
            )}

            <div className="p-4 space-y-3.5">
              {/* Content heading when not featured cover style */}
              {!scheme.popular && (
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-extrabold text-sm text-slate-800 leading-tight truncate">
                        {scheme.title}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">
                      Focus: {scheme.category}
                    </span>
                  </div>
                  
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    <img
                      src={scheme.image}
                      alt={scheme.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {scheme.description}
              </p>

              {/* Badges block */}
              <div className="grid grid-cols-2 gap-3.5 pt-1.5 border-t border-slate-100/50">
                <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/80">
                  <span className="block text-[8px] font-bold text-slate-400 uppercase">Benefit</span>
                  <span className="text-xs font-bold text-emerald-800 tracking-tight block mt-0.5">{scheme.benefit}</span>
                </div>
                <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/80">
                  <span className="block text-[8px] font-bold text-slate-400 uppercase">Eligibility</span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">{scheme.eligibility}</span>
                </div>
              </div>

              {/* Subsidies, schedules stats */}
              {(scheme.subsidy || scheme.deadline) && (
                <div className="grid grid-cols-2 gap-2 text-center text-xs py-1 border-t border-slate-150/40">
                  {scheme.subsidy && (
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Subsidy Offer</span>
                      <p className="font-bold text-slate-850 mt-0.5">{scheme.subsidy}</p>
                    </div>
                  )}
                  {scheme.deadline && (
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Apply Deadline</span>
                      <p className="font-bold text-rose-650 mt-0.5">{scheme.deadline}</p>
                    </div>
                  )}
                </div>
              )}

              <button className="w-full h-11 bg-primary-base text-white hover:bg-[#0e4c33] font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-98">
                {dict.learn_more}
              </button>
            </div>
          </div>
        ))}

        {/* Support Section */}
        <section className="text-center pt-2">
          <div className="bg-emerald-50/30 rounded-3xl p-5 border border-dashed border-emerald-300/40">
            <HeartHandshake className="w-9 h-9 text-primary-base mx-auto mb-1.5" />
            <h4 className="font-display font-extrabold text-sm text-emerald-950">{dict.need_help_applying}</h4>
            <p className="text-xs text-slate-500 leading-normal font-medium mt-1 mb-4">
              {dict.need_help_desc}
            </p>
            <a 
              href="tel:18005554321"
              className="px-6 py-2.5 bg-emerald-700 text-white rounded-full font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors hover:bg-emerald-800 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-emerald-350 fill-white" />
              <span>{dict.call_helpline}</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
