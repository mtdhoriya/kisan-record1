import React, { useState } from 'react';
import { ScreenId, Crop, Transaction, FertilizerTask, GovernmentScheme, HarvestReminder } from './types';
import {
  INITIAL_CROPS,
  INITIAL_TRANSACTIONS,
  INITIAL_FERTILIZER_TASKS,
  INITIAL_SCHEMES,
  INITIAL_HARVEST_REMINDERS,
  DICTIONARY
} from './data';

// Import Screens
import HomeDashboard from './components/HomeDashboard';
import CropRecords from './components/CropRecords';
import MarketPrices from './components/MarketPrices';
import IncomeExpenses from './components/IncomeExpenses';
import FertilizerSchedule from './components/FertilizerSchedule';
import PersonalProfile from './components/PersonalProfile';
import GovernmentSchemes from './components/GovernmentSchemes';
import HarvestReminders from './components/HarvestReminders';
import SelectLanguage from './components/SelectLanguage';
import GenerateReports from './components/GenerateReports';

// Icons for bottom navbar
import { Home, Sprout, TrendingUp, Wallet, User } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'English' | 'Hindi'>('English');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');

  // Core global state
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [fertilizerTasks, setFertilizerTasks] = useState<FertilizerTask[]>(INITIAL_FERTILIZER_TASKS);
  const [reminders, setReminders] = useState<HarvestReminder[]>(INITIAL_HARVEST_REMINDERS);

  // Tab navigation helpers
  const dict = DICTIONARY[lang];

  // Callback to add a new crop
  const handleAddNewCrop = (newCrop: Crop) => {
    setCrops([newCrop, ...crops]);

    // Automatically create a corresponding ledger cost entry!
    const cropCostTx: Transaction = {
      id: 'tx_crop_init_' + Date.now(),
      title: `${lang === 'English' ? 'Sowing Cost:' : 'बुवाई खर्च:'} ${newCrop.name}`,
      type: 'expense',
      amount: newCrop.totalCost || 11000,
      date: newCrop.date,
      category: 'seeds'
    };
    setTransactions([cropCostTx, ...transactions]);
  };

  // Callback to add a new transaction ledger record
  const handleAddNewTransaction = (entry: Transaction) => {
    setTransactions([entry, ...transactions]);
  };

  // Callback to toggle spray timeline checklist items
  const handleToggleFertilizerTask = (taskId: string) => {
    setFertilizerTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'Completed' ? 'Ready' : 'Completed',
              statusBadge: task.status === 'Completed' ? 'READY' : 'APPLIED'
            }
          : task
      )
    );
  };

  // Callback to toggle checklist tasks inside harvesting reminders
  const handleToggleHarvestTask = (reminderId: string, taskId: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id !== reminderId) return r;
        return {
          ...r,
          checklist: r.checklist.map((t) =>
            t.id === taskId ? { ...t, checked: !t.checked } : t
          )
        };
      })
    );
  };

  // Callback to add custom harvesting task dynamically
  const handleAddHarvestTask = (reminderId: string, text: string, subtext: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id !== reminderId) return r;
        return {
          ...r,
          checklist: [
            ...r.checklist,
            {
              id: 'task_custom_' + Date.now(),
              text,
              subtext,
              icon: 'ClipboardCheck',
              checked: false
            }
          ]
        };
      })
    );
  };

  // Handle fake logouts
  const handleLogoutToggle = () => {
    setActiveScreen('language');
  };

  // Nav actions
  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
  };

  // Compute on-the-fly balances for Home Dashboard
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, curr) => sum + curr.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, curr) => sum + curr.amount, 0);

  // Dynamic router body builder
  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <HomeDashboard
            lang={lang}
            recentTransactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            onNavigate={handleNavigate}
          />
        );
      case 'crops':
        return (
          <CropRecords
            lang={lang}
            crops={crops}
            onAddCrop={handleAddNewCrop}
            onNavigate={handleNavigate}
          />
        );
      case 'mandi':
        return (
          <MarketPrices
            lang={lang}
            mandiRates={[
              {
                id: 'm_1',
                commodity: lang === 'English' ? 'Wheat' : 'गेहूं (Wheat)',
                currentPrice: 2450,
                minPrice: 2380,
                maxPrice: 2610,
                change: 25,
                changeType: 'up',
                trendPercentage: 2.4
              },
              {
                id: 'm_2',
                commodity: lang === 'English' ? 'Paddy (Basmati)' : 'धान (Paddy Basmati)',
                currentPrice: 3890,
                minPrice: 3600,
                maxPrice: 4150,
                change: -120,
                changeType: 'down',
                trendPercentage: 1.8
              },
              {
                id: 'm_3',
                commodity: lang === 'English' ? 'Soybean' : 'सोयाबीन (Soybean)',
                currentPrice: 4200,
                minPrice: 4150,
                maxPrice: 4350,
                change: 0,
                changeType: 'stable',
                trendPercentage: 0.0
              },
              {
                id: 'm_4',
                commodity: lang === 'English' ? 'Onion' : 'प्याज़ (Onion)',
                currentPrice: 2800,
                minPrice: 1200,
                maxPrice: 3500,
                change: 450,
                changeType: 'up',
                trendPercentage: 5.6
              }
            ]}
          />
        );
      case 'expenses':
        return (
          <IncomeExpenses
            lang={lang}
            transactions={transactions}
            onAddTransaction={handleAddNewTransaction}
            onNavigate={handleNavigate}
          />
        );
      case 'fertilizer_schedule':
        return (
          <FertilizerSchedule
            lang={lang}
            tasks={fertilizerTasks}
            onToggleTask={handleToggleFertilizerTask}
            onNavigate={handleNavigate}
          />
        );
      case 'profile':
        return (
          <PersonalProfile
            lang={lang}
            onNavigate={handleNavigate}
            onLanguageToggle={setLang}
            onLogoutToggle={handleLogoutToggle}
          />
        );
      case 'schemes':
        return (
          <GovernmentSchemes
            lang={lang}
            schemes={INITIAL_SCHEMES}
            onNavigate={handleNavigate}
          />
        );
      case 'harvest':
        return (
          <HarvestReminders
            lang={lang}
            reminders={reminders}
            onToggleTaskChecked={handleToggleHarvestTask}
            onNavigate={handleNavigate}
            onAddTask={handleAddHarvestTask}
          />
        );
      case 'language':
        return (
          <SelectLanguage
            selectedLang={lang}
            onNavigate={handleNavigate}
            onLanguageSelect={setLang}
            lang={lang}
          />
        );
      case 'reports':
        return (
          <GenerateReports
            lang={lang}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-slate-50 min-h-screen">
            <h2 className="text-sm font-semibold">Active view loading...</h2>
          </div>
        );
    }
  };

  // Hide the bottom navbar on setup screens to respect focused tasks
  const showBottomNavbar =
    activeScreen !== 'language' &&
    activeScreen !== 'fertilizer_schedule' &&
    activeScreen !== 'schemes' &&
    activeScreen !== 'harvest' &&
    activeScreen !== 'reports';

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
      {/* Mobile Frame Container Mockup wrapper */}
      <div className="w-full max-w-md h-screen md:max-h-[850px] md:my-5 bg-white md:rounded-3xl md:shadow-2xl overflow-y-auto flex flex-col relative border border-slate-200/60">
        
        {/* Main Routed Area */}
        <div className="flex-grow overflow-y-auto">
          {renderScreen()}
        </div>

        {/* Global Bottom Navigation Sticky Tab bar */}
        {showBottomNavbar && (
          <nav className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-150/70 flex items-center justify-around px-2 z-40 shadow-lg">
            {/* Tab 1: Home */}
            <button
              onClick={() => handleNavigate('home')}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                activeScreen === 'home' ? 'text-primary-base font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Home className={`w-5 h-5 ${activeScreen === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] uppercase tracking-wider">{dict.home}</span>
            </button>

            {/* Tab 2: Crops */}
            <button
              onClick={() => handleNavigate('crops')}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                activeScreen === 'crops' ? 'text-primary-base font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Sprout className={`w-5 h-5 ${activeScreen === 'crops' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] uppercase tracking-wider">{dict.my_farm}</span>
            </button>

            {/* Tab 3: Markets */}
            <button
              onClick={() => handleNavigate('mandi')}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                activeScreen === 'mandi' ? 'text-primary-base font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <TrendingUp className={`w-5 h-5 ${activeScreen === 'mandi' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] uppercase tracking-wider">{dict.mandi_rates}</span>
            </button>

            {/* Tab 4: Ledger */}
            <button
              onClick={() => handleNavigate('expenses')}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                activeScreen === 'expenses' ? 'text-primary-base font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Wallet className={`w-5 h-5 ${activeScreen === 'expenses' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] uppercase tracking-wider">{dict.tabs_ledger}</span>
            </button>

            {/* Tab 5: Profile */}
            <button
              onClick={() => handleNavigate('profile')}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                activeScreen === 'profile' ? 'text-primary-base font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <User className={`w-5 h-5 ${activeScreen === 'profile' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] uppercase tracking-wider">{dict.profile}</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
