import React, { useState } from 'react';
import { ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { ArrowLeft, Search, CheckCircle, Info, RefreshCw, Check } from 'lucide-react';

interface SelectLanguageProps {
  lang: 'English' | 'Keep'; // wait, our state represents lang as 'English' | 'Hindi'
  selectedLang: 'English' | 'Hindi';
  onNavigate: (screen: ScreenId) => void;
  onLanguageSelect: (selected: 'English' | 'Hindi') => void;
}

export default function SelectLanguage({
  selectedLang,
  onNavigate,
  onLanguageSelect
}: SelectLanguageProps) {
  const dict = DICTIONARY[selectedLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [localSelected, setLocalSelected] = useState<'English' | 'Hindi'>(selectedLang);

  const languages = [
    { code: 'English', label: 'English', native: 'Default Language', badge: 'En', bg: 'bg-emerald-50 text-emerald-800' },
    { code: 'Hindi', label: 'Hindi', native: 'हिन्दी', badge: 'हि', bg: 'bg-teal-50 text-teal-800' },
    { code: 'Punjabi', label: 'Punjabi', native: 'ਪੰਜਾਬी', badge: 'ਪੰ', bg: 'bg-indigo-50 text-indigo-805' },
    { code: 'Marathi', label: 'Marathi', native: 'मराठी', badge: 'म', bg: 'bg-slate-100 text-slate-700' },
    { code: 'Telugu', label: 'Telugu', native: 'తెలుగు', badge: 'తె', bg: 'bg-orange-50 text-orange-800' },
    { code: 'Bengali', label: 'Bengali', native: 'বাংলা', badge: 'বা', bg: 'bg-amber-50 text-amber-800' }
  ];

  const handleApply = () => {
    setLoading(true);
    setApplied(false);

    setTimeout(() => {
      onLanguageSelect(localSelected);
      setLoading(false);
      setApplied(true);
      
      // Navigate home after successful save
      setTimeout(() => {
        onNavigate('home');
      }, 700);
    }, 900);
  };

  const filteredLanguages = languages.filter(l =>
    l.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.native.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-20 relative">
      {/* Dynamic Header Block with Visual Background Accent */}
      <header className="bg-primary-base text-white pt-4 pb-6 px-4 rounded-b-[2rem] shadow-md relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex justify-between items-center w-full mb-3">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-1.5 rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <h1 className="font-display font-medium text-lg tracking-tight">
            {selectedLang === 'English' ? 'Select Language' : 'भाषा चुनें (Language)'}
          </h1>
          <div className="w-8"></div> {/* Spacer for symmetry */}
        </div>

        <div className="px-1 mt-2">
          <p className="text-xs text-emerald-100/90 leading-relaxed font-semibold">
            Choose your preferred language for the app experience.
          </p>
          
          {/* Internal searching bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search languages..."
              className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 bg-white text-slate-800 rounded-xl outline-hidden border-none shadow-sm focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>
      </header>

      {/* Main Container list of languages scrollable area */}
      <main className="flex-1 px-4 py-4 space-y-4 max-w-sm mx-auto w-full">
        <div className="space-y-2.5">
          {filteredLanguages.map((langItem) => {
            const isSelectable = langItem.code === 'English' || langItem.code === 'Hindi';
            const isSelected = localSelected === langItem.code;

            return (
              <div
                key={langItem.code}
                onClick={() => {
                  if (isSelectable) {
                    setLocalSelected(langItem.code as any);
                  }
                }}
                className={`bg-white rounded-2xl border p-4 shadow-sm flex items-center gap-3.5 transition-all outline-hidden ${
                  !isSelectable ? 'opacity-50 cursor-not-allowed border-slate-100' : 'cursor-pointer active:scale-99'
                } ${
                  isSelected ? 'border-primary-base ring-1 ring-primary-base/20' : 'border-slate-150'
                }`}
              >
                {/* Circular Initial badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold shrink-0 ${langItem.bg}`}>
                  <span>{langItem.badge}</span>
                </div>

                <div className="flex-grow min-w-0 pr-3">
                  <h4 className="text-xs font-extrabold text-slate-800">{langItem.label}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">{langItem.native}</p>
                </div>

                {/* Radio check selection */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-primary-base bg-primary-base text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5px]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Translation Request placeholder help link */}
        <div className="bg-emerald-50/10 p-4 border border-emerald-150/45 rounded-xl flex gap-3">
          <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            {selectedLang === 'English' 
              ? 'Don\'t see your language? Request a translation below or consult our helpdesk support.' 
              : 'क्या आपकी क्षेत्रीय भाषा उपलब्ध नहीं है? हमसे सहायता केंद्र पर संपर्क करें।'}
          </p>
        </div>
      </main>

      {/* Sticky Bottom footer apply action */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 z-40">
        <button
          onClick={handleApply}
          disabled={loading}
          className="w-full h-11 bg-primary-base hover:bg-[#0e4c33] disabled:opacity-80 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-97 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Setting up...</span>
            </>
          ) : applied ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Language Applied!</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Apply Selection</span>
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
