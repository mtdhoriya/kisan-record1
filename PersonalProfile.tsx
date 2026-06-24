import React, { useState } from 'react';
import { ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { Menu, Bell, User, Edit3, Smartphone, FileText, Globe, Map, ShieldAlert, LogOut, Sun, HelpCircle, ChevronRight, Moon, Settings } from 'lucide-react';

interface PersonalProfileProps {
  lang: 'English' | 'Hindi';
  onNavigate: (screen: ScreenId) => void;
  onLanguageToggle: (selected: 'English' | 'Hindi') => void;
  onLogoutToggle: () => void;
}

export default function PersonalProfile({
  lang,
  onNavigate,
  onLanguageToggle,
  onLogoutToggle
}: PersonalProfileProps) {
  const dict = DICTIONARY[lang];
  const [darkMode, setDarkMode] = useState(false);
  const [notiActive, setNotiActive] = useState(true);

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Top sticky app header bar */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-white cursor-pointer" />
          <h1 className="font-display font-medium text-lg tracking-tight">
            {lang === 'English' ? 'Personal Profile' : 'किसान प्रोफ़ाइल'}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Main content frame */}
      <main className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* User Card Frame avatar */}
        <section className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          {/* Header Visual Decorator */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-primary-base to-emerald-700"></div>

          <div className="relative mt-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-base shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80"
                alt="Ramesh Kumar profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary-base text-white rounded-full flex items-center justify-center border-2 border-white hover:scale-105 active:scale-95 shadow-sm">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2 className="font-display font-extrabold text-base text-slate-800 mt-3">Ramesh Kumar</h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Indore, Madhya Pradesh</p>

          <button 
            onClick={() => onNavigate('language')}
            className="mt-4 px-6 h-9 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold text-xs flex items-center gap-2 hover:bg-emerald-100/60 active:scale-97 transition-colors"
          >
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>Edit Profile</span>
          </button>
        </section>

        {/* Section 1: Personal Verification credentials */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3.5">
          <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2 pb-2.5 border-b border-slate-100/80">
            <User className="w-4.5 h-4.5 text-primary-base" />
            <span>{dict.personal_info}</span>
          </h3>

          <div className="space-y-3 leading-normal">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobile Number</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aadhaar Number</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">XXXX XXXX 5678</p>
            </div>
            <div 
              onClick={() => onNavigate('language')}
              className="flex justify-between items-center cursor-pointer group"
            >
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Language</p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">English / Hindi</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
            </div>
          </div>
        </section>

        {/* Section 2: Farm Details acreage */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3.5">
          <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2 pb-2.5 border-b border-slate-100/80">
            <Map className="w-4.5 h-4.5 text-primary-base" />
            <span>{dict.farm_details}</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 pb-1">
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100/85">
              <span className="block text-[9px] font-bold text-slate-400 uppercase">Total Land</span>
              <span className="font-display font-bold text-emerald-800 text-sm mt-0.5 block">5.5 Acres</span>
            </div>
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100/85">
              <span className="block text-[9px] font-bold text-slate-400 uppercase">Primary Crops</span>
              <span className="font-display font-bold text-slate-850 text-sm mt-0.5 block">Wheat, Paddy</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-100/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Farm Location</p>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">Village Sanwer, Indore (Dist.)</p>
          </div>
        </section>

        {/* Section 3: App Configuration toggles */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3.5">
          <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2 pb-2.5 border-b border-slate-100/80">
            <Settings className="w-4.5 h-4.5 text-primary-base" />
            <span>{dict.app_settings}</span>
          </h3>

          <div className="space-y-4">
            {/* Language Selector row */}
            <div 
              onClick={() => onNavigate('language')}
              className="flex justify-between items-center cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4.5 h-4.5 text-slate-450" />
                <span className="text-xs font-semibold text-slate-800">App Language</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-450">{lang}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Dark Mode toggle switch */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                {darkMode ? <Moon className="w-4.5 h-4.5 text-slate-800" /> : <Sun className="w-4.5 h-4.5 text-amber-500" />}
                <span className="text-xs font-semibold text-slate-800">{dict.dark_mode}</span>
              </div>
              
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-hidden relative ${
                  darkMode ? 'bg-primary-base' : 'bg-slate-205'
                }`}
                style={{ backgroundColor: darkMode ? '#0f5238' : '#cbd5e1' }}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform duration-200 ease-in-out ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {/* Notification toggle switch */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4.5 h-4.5 text-slate-450 hover:scale-105" />
                <span className="text-xs font-semibold text-slate-800">{dict.notifications}</span>
              </div>
              
              <button 
                onClick={() => setNotiActive(!notiActive)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-hidden relative ${
                  notiActive ? 'bg-primary-base' : 'bg-slate-205'
                }`}
                style={{ backgroundColor: notiActive ? '#0f5238' : '#cbd5e1' }}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform duration-200 ease-in-out ${
                  notiActive ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: External links policy support */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <h3 className="font-display font-bold text-sm text-slate-800 pb-2 border-b border-slate-100/80">
            {dict.support_info}
          </h3>

          <div className="space-y-3.5 pt-1.5">
            {/* Government schemes redirection */}
            <button 
              onClick={() => onNavigate('schemes')}
              className="w-full flex justify-between items-center group text-left"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4.5 h-4.5 text-slate-450" />
                <span className="text-xs font-semibold text-slate-800">{dict.schemes}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
            </button>

            {/* Help Center redirection (can take to language support etc) */}
            <button 
              onClick={() => onNavigate('language')}
              className="w-full flex justify-between items-center group text-left"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4.5 h-4.5 text-slate-450" />
                <span className="text-xs font-semibold text-slate-800">{dict.help_center}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
            </button>

            {/* Privacy Policy mock link */}
            <div className="flex justify-between items-center group cursor-not-allowed">
              <div className="flex items-center gap-2.5 text-slate-400">
                <ShieldAlert className="w-4.5 h-4.5" />
                <span className="text-xs font-semibold">{dict.privacy_policy}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </section>

        {/* Destructive Exit trigger */}
        <button
          onClick={onLogoutToggle}
          className="w-full h-11 border border-red-300 hover:bg-red-50 text-red-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2 duration-150"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>{dict.log_out}</span>
        </button>
      </main>
    </div>
  );
}
