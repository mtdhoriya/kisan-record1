import React, { useState } from 'react';
import { FertilizerTask, ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { ArrowLeft, Menu, Bell, CheckCircle, Calendar, ShieldCheck, Sun, Star, Check } from 'lucide-react';

interface FertilizerScheduleProps {
  lang: 'English' | 'Hindi';
  tasks: FertilizerTask[];
  onToggleTask: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export default function FertilizerSchedule({
  lang,
  tasks,
  onToggleTask,
  onNavigate
}: FertilizerScheduleProps) {
  const dict = DICTIONARY[lang];
  const [activeTaskTab, setActiveTaskTab] = useState<'upcoming' | 'completed'>('upcoming');

  // Filter tasks based on selected filter tab
  const displayedTasks = tasks.filter((task) => {
    if (activeTaskTab === 'upcoming') {
      return task.status !== 'Completed';
    } else {
      return task.status === 'Completed';
    }
  });

  const getStatusBadgeStyle = (statusBadge: string) => {
    switch (statusBadge) {
      case 'MISSING':
        return 'bg-rose-50 text-rose-800 border-rose-100';
      case 'READY':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'PLANNED':
        return 'bg-slate-100 text-slate-655 border-slate-200';
      case 'APPLIED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16">
      {/* Top App Bar with back triggers */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-display font-medium text-lg tracking-tight">
            {lang === 'English' ? 'Fertilizer Schedule' : 'खाद और स्प्रे तालिका'}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Main Container */}
      <main className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* Active Crop Summary Card */}
        <section className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx9L1eaI1SEptQw8ZnB-hqbJTMZiDgfOwLIQ8LIdzdk2BGga4ypUc3a3M8xFblBBVQSvkrbKlOktN4X-qVRK2C3OJliQ80BrdaaTlXUR1xBTGiVnqPn6-qSFFYPWadosgVB4mKXFk60KcAReI8k5DXGTWRIOfEfDZgTUQv4XBPSRwaueubWzxDYMpQBiok2IPfwu1rfCAxdKx1qSwqnlb522G5ryDBSWZYZFKn5OizSwAK_SUjdyEZ04hCVfWx5-gyWBDXLNionkyH"
              alt="Wheat Winter crop micro photography"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-grow min-w-0">
            <h2 className="font-display font-bold text-sm text-slate-800 truncate">
              {lang === 'English' ? 'Wheat - Winter Crop' : 'गेहूं - रबी की फसल'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Day 45: Tillering Stage</span>
            </p>
          </div>

          <span className="shrink-0 px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full">
            Active
          </span>
        </section>

        {/* Action filter Upcoming vs Completed tabs */}
        <div className="bg-white p-1 rounded-xl border border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setActiveTaskTab('upcoming')}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
              activeTaskTab === 'upcoming'
                ? 'bg-primary-base text-white font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'English' ? 'Upcoming' : 'आने वाले छिड़काव'}
          </button>
          
          <button
            onClick={() => setActiveTaskTab('completed')}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
              activeTaskTab === 'completed'
                ? 'bg-primary-base text-white font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'English' ? 'Completed' : 'संपन्न (Applied)'}
          </button>
        </div>

        {/* Timeline Tasks Content list */}
        <section className="space-y-4 relative pl-3.5 border-l-2 border-slate-150/70 ml-2">
          {displayedTasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-slate-150 relative -left-5">
              <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-slate-500">
                {lang === 'English' ? 'No tasks found' : 'कोई कार्य सूचित नहीं है'}
              </p>
            </div>
          ) : (
            displayedTasks.map((task) => {
              const isFinished = task.status === 'Completed';
              return (
                <div key={task.id} className="relative group">
                  {/* Timeline pointer bullet circle node */}
                  <div className={`absolute -left-[24.5px] top-4 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    isFinished ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-350'
                  }`}>
                    {isFinished && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                  </div>

                  <div className="space-y-1 mt-1 block">
                    {/* Header labels */}
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        task.status === 'Overdue' ? 'text-rose-600' : 'text-slate-500'
                      }`}>
                        {task.status} • Day {task.status === 'Overdue' ? 42 : task.dayNum}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold border ${
                        getStatusBadgeStyle(task.statusBadge)
                      }`}>
                        {task.statusBadge}
                      </span>
                    </div>

                    {/* Task Content Card */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3.5 hover:shadow-sm transition-shadow">
                      <div>
                        <h3 className={`font-display font-bold text-sm text-slate-800 ${
                          isFinished ? 'line-through text-slate-400' : ''
                        }`}>
                          {task.title}
                        </h3>
                        {task.notes && (
                          <p className="text-xs text-slate-450 mt-1 font-medium">{task.notes}</p>
                        )}
                      </div>

                      {/* Stats table */}
                      <div className="flex items-center gap-6 py-2 border-y border-slate-100/50">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dosage</p>
                          <p className="text-xs font-bold text-slate-700 mt-0.5">{task.dosage}</p>
                        </div>
                        <div className="w-[1.5px] h-8 bg-slate-100"></div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Method</p>
                          <p className="text-xs font-bold text-slate-700 mt-0.5">{task.method}</p>
                        </div>
                      </div>

                      {/* Call-to-action button */}
                      {!isFinished ? (
                        <button
                          onClick={() => onToggleTask(task.id)}
                          className="w-full h-11 bg-primary-base text-white hover:bg-[#0e4c33] font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-97"
                        >
                          <CheckCircle className="w-4 h-4 cursor-pointer" />
                          <span>{lang === 'English' ? 'Mark as Applied' : 'छिड़काव लगाया गया'}</span>
                        </button>
                      ) : (
                        <div className="w-full py-2 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-extrabold flex items-center justify-center gap-1 border border-emerald-100">
                          <CheckCircle className="w-4 h-4 text-emerald-750" />
                          <span>Applied Successfully</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* Weather advisory spray prompt conditions card */}
        <section className="bg-emerald-50/20 p-4 border border-emerald-150/50 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 hover:scale-103 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
            <Sun className="w-6 h-6 fill-amber-300" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800">{dict.optimal_weather}</h4>
            <p className="text-[10px] text-slate-500 leading-normal font-medium mt-0.5">
              {dict.optimal_weather_desc}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
