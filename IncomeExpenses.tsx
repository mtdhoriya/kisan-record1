import React, { useState } from 'react';
import { Transaction, ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { Menu, Bell, Plus, ChevronRight, X, TrendingUp, TrendingDown, Target, Landmark, Percent } from 'lucide-react';

interface IncomeExpensesProps {
  lang: 'English' | 'Hindi';
  transactions: Transaction[];
  onAddTransaction: (entry: Transaction) => void;
  onNavigate: (screen: ScreenId) => void;
}

export default function IncomeExpenses({
  lang,
  transactions,
  onAddTransaction,
  onNavigate
}: IncomeExpensesProps) {
  const dict = DICTIONARY[lang];
  const [activeSegment, setActiveSegment] = useState<'month' | 'year' | 'custom'>('month');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form Field States
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'crop_sale' | 'fertilizer' | 'pesticide' | 'labor' | 'seeds' | 'equipment' | 'other'>('crop_sale');
  const [dateStr, setDateStr] = useState('22 Jun 2026');

  // Compute stats on the fly
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((val, curr) => val + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((val, curr) => val + curr.amount, 0);

  const handleApplyTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || isNaN(parseFloat(amount))) return;

    const newTx: Transaction = {
      id: 't_' + Date.now(),
      title,
      type,
      amount: parseFloat(amount),
      date: dateStr || 'Today',
      category
    };

    onAddTransaction(newTx);
    setShowAddModal(false);

    // Reset fields
    setTitle('');
    setAmount('');
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-white cursor-pointer" />
          <h1 className="font-display font-medium text-lg tracking-tight">
            {lang === 'English' ? 'Income & Expenses' : 'आय-व्यय बही (Ledger)'}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Tabs segment */}
      <div className="bg-white border-b border-slate-100 flex items-center justify-between px-2 py-1 sticky top-[56px] z-20 shadow-xs">
        <button
          onClick={() => setActiveSegment('month')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
            activeSegment === 'month'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {dict.this_month}
        </button>
        <button
          onClick={() => setActiveSegment('year')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
            activeSegment === 'year'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {dict.this_year}
        </button>
        <button
          onClick={() => setActiveSegment('custom')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
            activeSegment === 'custom'
              ? 'bg-emerald-50 text-emerald-800 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {dict.custom}
        </button>
      </div>

      <main className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* Ledger Balance overview blocks */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Income block */}
          <div className="bg-emerald-550 bg-gradient-to-br from-emerald-800 to-emerald-950 p-4 rounded-2xl flex flex-col justify-between h-28 h-touch-target shadow-sm text-white">
            <span className="text-emerald-200 text-xs font-medium">{dict.total_income}</span>
            <span className="font-display font-extrabold text-lg tracking-tight">
              ₹{totalIncome.toLocaleString()}
            </span>
          </div>

          {/* Expense block */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex flex-col justify-between h-28 h-touch-target shadow-sm text-slate-800">
            <span className="text-slate-400 text-xs font-medium">{dict.total_expenses}</span>
            <span className="font-display font-extrabold text-lg tracking-tight text-red-650">
              ₹{totalExpense.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Ledger Logs list */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-sm text-slate-800">{dict.transactions}</h2>
            <button className="text-primary-base font-semibold text-xs flex items-center gap-0.5 hover:underline">
              <span>{dict.view_all}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {transactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isIncome ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {isIncome ? (
                      <TrendingUp className="w-5 h-5 text-emerald-750" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-650" />
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 truncate mb-0.5">{tx.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {tx.date} • <span className="capitalize">{tx.category.replace('_', ' ')}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-xs font-extrabold ${isIncome ? 'text-emerald-750' : 'text-red-650'}`}>
                      {isIncome ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add ledger button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full h-11 flex items-center justify-center gap-2 bg-primary-base text-white hover:bg-[#0e4c33] font-bold text-xs rounded-xl shadow-xs transition-all mt-3 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>{dict.add_transaction}</span>
          </button>
        </section>

        {/* Tractor Savings Goal Card */}
        <div className="bg-[#4d6553] bg-gradient-to-br from-[#4d6553] to-emerald-950 text-white p-5 rounded-2xl relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h3 className="font-display font-extrabold text-sm text-emerald-100">{dict.equipment_savings}</h3>
            <p className="text-[11px] text-emerald-100/80 mt-1 mb-4 leading-normal">
              {dict.saving_goal}
            </p>

            {/* Slider bar progress indicator */}
            <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden shadow-inner">
              <div className="bg-emerald-300 w-[65%] h-full rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Background vector symbol overlay */}
          <Landmark className="absolute -right-4 -bottom-4 w-28 h-28 text-white/5 pointer-events-none transform rotate-12" />
        </div>
      </main>

      {/* Add Transaction Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-sm w-full p-5 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-4">
              <h3 className="font-display font-extrabold text-base text-slate-800">
                {lang === 'English' ? 'Add Transaction' : 'बहीखाता प्रविष्टि करें'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-150"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyTransaction} className="space-y-3.5">
              {/* Type toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 py-1.5 rounded-lg border font-bold text-xs text-center transition-all ${
                    type === 'income'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-extrabold shadow-inner'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'English' ? 'Income (+)' : 'आय (+)'}
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 py-1.5 rounded-lg border font-bold text-xs text-center transition-all ${
                    type === 'expense'
                      ? 'border-red-650 bg-red-50 text-red-800 font-extrabold shadow-inner'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'English' ? 'Expense (-)' : 'व्यय (-)'}
                </button>
              </div>

              {/* Title description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-550 mb-1">Title / Description</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Urea Purchase or Wheat Seed Sale"
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base focus:ring-1 focus:ring-primary-base text-slate-800"
                />
              </div>

              {/* Amount value */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-550 mb-1">Amount (₹)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400 text-xs font-bold font-display">₹</span>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 4200"
                    className="w-full text-xs font-semibold pl-7 pr-3 py-2 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base focus:ring-1 focus:ring-primary-base text-slate-800"
                  />
                </div>
              </div>

              {/* Category selection selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-550 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base text-slate-800"
                >
                  <option value="crop_sale">Crop Sale / Sowing Yield</option>
                  <option value="fertilizer">Fertilizer Purchase</option>
                  <option value="pesticide">Pesticide / Foliar Spray</option>
                  <option value="labor">Labor & Contractor Fees</option>
                  <option value="seeds">Seeds Application</option>
                  <option value="equipment">Heavy Machinery & Tractors</option>
                  <option value="other">Other / Support Aid</option>
                </select>
              </div>

              {/* Transaction Date description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-550 mb-1">Date</label>
                <input
                  type="text"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl outline-hidden focus:border-primary-base text-slate-800"
                  placeholder="e.g. 12 Nov 2024"
                />
              </div>

              {/* Form submit confirmation triggers */}
              <button
                type="submit"
                className="w-full py-2.5 bg-primary-base text-white hover:bg-[#0e4c33] font-bold text-xs rounded-xl shadow-xs transition-all mt-4"
              >
                {lang === 'English' ? 'Save Transaction' : 'लेनदेन सुरक्षित करें'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
