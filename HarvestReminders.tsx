import React, { useState } from 'react';
import { HarvestReminder, ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { ArrowLeft, Menu, Bell, AlertTriangle, Layers, Calendar, ClipboardCheck, Settings, Users, Store, Truck, Plus, CheckCircle, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

interface HarvestRemindersProps {
  lang: 'English' | 'Hindi';
  reminders: HarvestReminder[];
  onToggleTaskChecked: (reminderId: string, taskId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onAddTask: (reminderId: string, text: string, subtext: string) => void;
}

export default function HarvestReminders({
  lang,
  reminders,
  onToggleTaskChecked,
  onNavigate,
  onAddTask
}: HarvestRemindersProps) {
  const dict = DICTIONARY[lang];
  const [advisoryDismiss, setAdvisoryDismiss] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [activeReminderId, setActiveReminderId] = useState(reminders[0]?.id || 'hr_1');

  // Custom task form states
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [taskSubtext, setTaskSubtext] = useState('');

  const activeReminder = reminders.find((r) => r.id === activeReminderId) || reminders[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleCheckboxToggle = (reminderId: string, taskId: string) => {
    onToggleTaskChecked(reminderId, taskId);
    triggerToast(lang === 'English' ? 'Task updated successfully' : 'कार्य का विवरण अपडेट किया गया');
  };

  const handleAddNewTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText) return;

    onAddTask(activeReminderId, taskText, taskSubtext || 'Custom agricultural preparation');
    triggerToast(lang === 'English' ? 'Custom task added successfully!' : 'नया कार्य जोड़ लिया गया है!');
    setTaskText('');
    setTaskSubtext('');
    setShowAddTaskForm(false);
  };

  // Helper icons selector
  const getTaskIconSymbol = (iconName: string) => {
    switch (iconName) {
      case 'Settings':
        return <Settings className="w-5 h-5 text-slate-500 shrink-0" />;
      case 'Users':
        return <Users className="w-5 h-5 text-slate-500 shrink-0" />;
      case 'Store':
        return <Store className="w-5 h-5 text-slate-500 shrink-0" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-slate-500 shrink-0" />;
      default:
        return <ClipboardCheck className="w-5 h-5 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-16 relative">
      {/* App header bar with back option */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-display font-medium text-lg tracking-tight">
            {dict.harvest_reminders}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Main scrolling wrapper */}
      <main className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* Weather advisory alert notice box */}
        {!advisoryDismiss && (
          <section className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-3.5 items-start shadow-sm transition-all hover:bg-rose-100/35">
            <AlertTriangle className="w-5 h-5 text-rose-600 fill-rose-100/50 mt-0.5 shrink-0 animate-bounce" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-sm text-rose-955">{dict.advisory}</h3>
              <p className="text-[11px] text-rose-700 leading-relaxed font-medium mt-1">
                {dict.advisory_desc}
              </p>
            </div>
            <button 
              onClick={() => {
                setAdvisoryDismiss(true);
                triggerToast(lang === 'English' ? 'Alert dismissed' : 'मौसम चेतावनी छुपाई गई');
              }}
              className="text-xs font-bold text-rose-700 hover:text-rose-950 px-1 border border-solid border-rose-220 hover:bg-rose-100 rounded-lg shrink-0 pointer-events-auto"
            >
              Dismiss
            </button>
          </section>
        )}

        {/* Horizontal scroll cards display */}
        <section>
          <div className="flex justify-between items-end mb-2.5">
            <h3 className="font-display font-bold text-sm text-slate-800">Upcoming Harvests</h3>
            <span className="text-xs text-primary-base font-semibold">{dict.view_all}</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar -mx-4 px-4">
            {reminders.map((reminder) => {
              const isActive = reminder.id === activeReminderId;
              return (
                <div
                  key={reminder.id}
                  onClick={() => setActiveReminderId(reminder.id)}
                  style={{ minWidth: '280px' }}
                  className={`bg-white rounded-2xl p-4 border flex flex-col gap-3 shadow-xs hover:shadow-md cursor-pointer transition-all active:scale-98 ${
                    isActive ? 'border-primary-base ring-1 ring-primary-base/20' : 'border-slate-150'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {reminder.fieldId}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-800 mt-1 truncate">
                        {reminder.cropName}
                      </h4>
                    </div>
                    
                    <div className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-slate-100 shadow-inner" style={{ backgroundImage: `url('${reminder.image}')` }}></div>
                  </div>

                  {/* Range Progress meter */}
                  <div className="space-y-1.5 mt-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">Maturity Progress</span>
                      <span className="text-primary-base font-extrabold">{reminder.maturityProgress}%</span>
                    </div>

                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                      <div 
                        className="h-full bg-emerald-700 rounded-full transition-all"
                        style={{ width: `${reminder.maturityProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Yield forecasts */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/80">
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Expected Date</span>
                      <p className="text-xs font-bold text-slate-801 mt-0.5 font-display">{reminder.expectedDate}</p>
                    </div>
                    <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100/80">
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Est. Yield</span>
                      <p className="text-xs font-bold text-slate-801 mt-0.5 font-display">{reminder.estimatedYieldRange}</p>
                    </div>
                  </div>

                  <button className="mt-1 w-full bg-primary-base text-white hover:bg-[#0e4c33] py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-97 transition-colors">
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <span>Plan Harvest</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Readiness Checklist interactive console */}
        <section className="bg-emerald-50/10 rounded-2xl p-4 border border-emerald-150/45 space-y-3.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-primary-base rounded-full flex items-center justify-center text-white shadow-xs">
              <ClipboardCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-display font-extrabold text-sm text-slate-800">{dict.readiness_checklist}</h3>
          </div>
          
          <p className="text-xs font-medium text-slate-500">
            {dict.preparation} <strong className="text-slate-800">{activeReminder.cropName}</strong>
          </p>

          <div className="space-y-2">
            {activeReminder.checklist.map((task) => (
              <label
                key={task.id}
                className={`flex items-center gap-3 p-3 bg-white rounded-xl border cursor-pointer hover:bg-slate-50/50 transition-colors shadow-xs ${
                  task.checked ? 'border-primary-base/40 bg-emerald-50/10' : 'border-slate-150'
                }`}
              >
                {/* Regular HTML checkbox wrapper */}
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleCheckboxToggle(activeReminder.id, task.id)}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700 focus:ring-offset-0 focus:ring-opacity-20 cursor-pointer"
                />

                <div className="flex-grow min-w-0 pr-2">
                  <p className={`text-xs font-bold text-slate-850 ${
                    task.checked ? 'line-through text-slate-400' : ''
                  }`}>
                    {task.text}
                  </p>
                  <p className="text-[10px] text-slate-400 tracking-wide font-medium mt-0.5">{task.subtext}</p>
                </div>

                {getTaskIconSymbol(task.icon)}
              </label>
            ))}
          </div>

          {!showAddTaskForm ? (
            <button
              onClick={() => setShowAddTaskForm(true)}
              className="mt-4 w-full py-2 hover:bg-emerald-50/40 rounded-xl flex items-center justify-center gap-1.5 text-primary-base font-bold text-xs active:scale-97 transition-colors"
            >
              <Plus className="w-4.5 h-4.5 text-primary-base" />
              <span>{dict.add_custom_task}</span>
            </button>
          ) : (
            <form onSubmit={handleAddNewTaskSubmit} className="bg-white p-4.5 rounded-xl border border-slate-150 mt-4 space-y-3">
              <p className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">New Checklist Item</p>
              
              <input
                type="text"
                required
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="e.g. Clean silo spaces or Fuel tractors"
                className="w-full text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg outline-hidden focus:border-primary-base focus:ring-1 text-slate-800"
              />
              <input
                type="text"
                value={taskSubtext}
                onChange={(e) => setTaskSubtext(e.target.value)}
                placeholder="Brief instruction note"
                className="w-full text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg outline-hidden focus:border-primary-base focus:ring-1 text-slate-800"
              />

              <div className="flex gap-2 pt-1.5">
                <button
                  type="button"
                  onClick={() => setShowAddTaskForm(false)}
                  className="flex-1 py-1.5 border border-slate-200 text-slate-500 font-bold text-xs rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 bg-primary-base text-white font-bold text-xs rounded-lg hover:bg-[#0e4c33]"
                >
                  Add Task
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Secondary Completed harvests segment link */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-700" />
            </div>
            
            <div className="text-left font-display">
              <h4 className="text-xs font-bold text-slate-800">Completed Harvests</h4>
              <p className="text-[10px] text-slate-400 font-semibold">View historical logs for Rabi 2024</p>
            </div>
          </div>
          
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </section>
      </main>

      {/* SUCCESS INTERACTIVE TOAST POPUP */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transition-all duration-300 transform z-50 ${
        showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
