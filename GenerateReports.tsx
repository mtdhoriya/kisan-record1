import React, { useState } from 'react';
import { ScreenId } from '../types';
import { DICTIONARY } from '../data';
import { ArrowLeft, Bell, Download, Calendar, Check, Share2, FileSpreadsheet, FileText, Settings, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

interface GenerateReportsProps {
  lang: 'English' | 'Hindi';
  onNavigate: (screen: ScreenId) => void;
}

export default function GenerateReports({ lang, onNavigate }: GenerateReportsProps) {
  const dict = DICTIONARY[lang];
  const [reportType, setReportType] = useState<'financial' | 'crop' | 'inventory' | 'weather'>('financial');
  const [formatType, setFormatType] = useState<'pdf' | 'excel'>('pdf');
  const [loadingExportId, setLoadingExportId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [downloads, setDownloads] = useState([
    { id: 'dl_1', name: 'October_Finance.pdf', size: '2.4 MB', date: 'Oct 12, 2024', type: 'pdf' },
    { id: 'dl_2', name: 'Wheat_Inventory_v2.xlsx', size: '840 KB', date: 'Oct 10, 2024', type: 'excel' },
    { id: 'dl_3', name: 'Monsoon_Forecast.pdf', size: '1.1 MB', date: 'Oct 05, 2024', type: 'pdf' }
  ]);

  const handleTriggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  const handleDownloadPreset = (id: string, name: string) => {
    setLoadingExportId(id);
    setTimeout(() => {
      setLoadingExportId(null);
      handleTriggerToast(lang === 'English' ? `Downloaded ${name} successfully!` : `${name} सफलतापूर्वक डाउनलोड किया गया!`);
    }, 1200);
  };

  const handleGenerateCustom = () => {
    setLoadingExportId('custom');
    setTimeout(() => {
      setLoadingExportId(null);
      
      const fileExt = formatType === 'pdf' ? '.pdf' : '.xlsx';
      const newFile = {
        id: 'dl_' + Date.now(),
        name: `Custom_${reportType.charAt(0).toUpperCase() + reportType.slice(1)}_Report${fileExt}`,
        size: formatType === 'pdf' ? '1.8 MB' : '420 KB',
        date: 'Today',
        type: formatType
      };

      setDownloads([newFile, ...downloads]);
      handleTriggerToast(lang === 'English' ? 'Report compiled successfully!' : 'कस्टम कृषि विवरण तैयार किया गया!');
    }, 1500);
  };

  const handleShareFile = (fileName: string) => {
    handleTriggerToast(lang === 'English' ? `Link copied to share ${fileName}` : `शेयर लिंक कॉपी किया गया: ${fileName}`);
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-20 relative">
      {/* Top Header App bar */}
      <header className="sticky top-0 z-30 bg-primary-base text-white py-4 px-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="p-1 rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-display font-medium text-lg tracking-tight">
            {dict.generate_reports}
          </h1>
        </div>
        <Bell className="w-5 h-5 text-white" />
      </header>

      {/* Main scrolling layout content */}
      <main className="px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* Quick export cards row */}
        <section>
          <h2 className="font-display font-bold text-sm text-slate-800 mb-2.5">
            {dict.quick_export}
          </h2>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-hide -mx-4 px-4">
            {/* Quick Card 1: Finance ledger */}
            <div className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between h-44 w-60 shrink-0 shadow-xs hover:shadow-md transition-shadow select-none">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2.5">
                  <FileText className="w-5 h-5 text-primary-base" />
                </div>
                <h3 className="font-display font-semibold text-xs text-slate-800 leading-snug">
                  Monthly Income & Expense Summary
                </h3>
              </div>
              <button
                disabled={loadingExportId !== null}
                onClick={() => handleDownloadPreset('preset_1', 'Monthly_Ledger.pdf')}
                className="w-full py-1.5 bg-primary-base hover:bg-[#0e4c33] disabled:opacity-50 text-white rounded-full font-bold text-[10px] flex items-center justify-center gap-1 mt-2 transition-colors active:scale-97 cursor-pointer"
              >
                {loadingExportId === 'preset_1' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Download</span>
              </button>
            </div>

            {/* Quick Card 2: Crop yields */}
            <div className="flex-shrink-0 w-60 bg-white border border-slate-150 rounded-xl p-4 flex flex-col justify-between h-44 hover:shadow-md transition-all">
              <div>
                <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-primary-base" />
                </div>
                <h3 className="font-display font-semibold text-xs text-slate-850 leading-snug">Crop Harvest Yield Log</h3>
              </div>
              <button
                onClick={() => handleDownloadPreset('preset_2', 'Yield_Report.pdf')}
                className="w-full py-1.5 bg-primary-base text-white text-[10px] font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </section>

        {/* Custom PDF/Excel Report Builder */}
        <section className="bg-emerald-50/15 p-4 rounded-2xl border border-emerald-100 shadow-xs space-y-4">
          <h2 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
            <Settings className="w-5 h-5 text-primary-base" />
            <span>{dict.custom_report_builder}</span>
          </h2>

          {/* Date Selector input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              {dict.select_date_range}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                defaultValue="2023-10-01"
                className="w-full text-xs font-semibold py-1.5 px-3 bg-white border border-slate-200 rounded-lg focus:border-primary-base outline-hidden text-slate-800"
              />
              <input
                type="date"
                defaultValue="2023-11-15"
                className="w-full text-xs font-semibold py-1.5 px-3 border border-slate-200 rounded-lg focus:border-primary-base outline-hidden text-slate-800"
              />
            </div>
          </div>

          {/* Type Chips selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              {dict.report_type}
            </label>
            <div className="flex flex-wrap gap-2">
              {(['financial', 'crop', 'inventory', 'weather'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setReportType(t)}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    reportType === t
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-extrabold shadow-inner'
                      : 'border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
                  }`}
                >
                  {reportType === t && <Check className="w-3.5 h-3.5 text-primary-base shrink-0" />}
                  <span className="capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Excel vs PDF toggle Format selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {dict.export_format}
            </label>
            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setFormatType('pdf')}
                className={`py-2 border bg-white rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 transition-all ${
                  formatType === 'pdf'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-extrabold ring-1 ring-emerald-500'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full border border-slate-400 flex items-center justify-center p-0.5"><div className={`w-full h-full rounded-full ${formatType === 'pdf' ? 'bg-primary-base' : ''}`}></div></div>
                <span>PDF Format</span>
              </button>
              <button
                type="button"
                onClick={() => setFormatType('excel')}
                className={`py-2 border bg-white rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 transition-all ${
                  formatType === 'excel'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-extrabold ring-1 ring-emerald-500'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full border border-slate-400 flex items-center justify-center p-0.5"><div className={`w-full h-full rounded-full ${formatType === 'excel' ? 'bg-primary-base' : ''}`}></div></div>
                <span>Excel Spreadsheet</span>
              </button>
            </div>
          </div>
        </section>

        {/* Recent files list log */}
        <section className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-display font-bold text-sm text-slate-800">{dict.recent_downloads}</h2>
            <button className="text-xs text-primary-base font-semibold">{dict.view_all}</button>
          </div>

          <div className="space-y-2.5">
            {downloads.map((dl) => (
              <div
                key={dl.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-xs"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  dl.type === 'pdf' ? 'bg-rose-50 text-rose-800' : 'bg-emerald-50 text-emerald-850'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>

                <div className="flex-grow min-w-0 pr-2">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{dl.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{dl.size} • {dl.date}</p>
                </div>

                <button 
                  onClick={() => handleShareFile(dl.name)}
                  className="w-8 h-8 rounded-lg border border-slate-100/80 text-slate-400 hover:text-slate-700 flex items-center justify-center active:scale-90 transition-transform shrink-0"
                >
                  <Share2 className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating builder execution action footer block */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 z-40">
        <button
          disabled={loadingExportId !== null}
          onClick={handleGenerateCustom}
          className="w-full h-11 bg-primary-base hover:bg-[#0e4c33] disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-97 cursor-pointer"
        >
          {loadingExportId === 'custom' ? (
            <RefreshCw className="w-4.5 h-4.5 animate-spin" />
          ) : (
            <Settings className="w-4.5 h-4.5 text-emerald-350" />
          )}
          <span>{dict.generate_custom_report}</span>
        </button>
      </footer>

      {/* SUCCESS INTERACTIVE TOAST POPUP */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transition-all duration-300 transform z-50 ${
        showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
        <span>{toastMsg}</span>
      </div>
    </div>
  );
}

// Inline fallback icons for Vite compiling compatibility
function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m0 0l-3-3m3 3l3-3m-9-6a9 9 0 1118 0" />
    </svg>
  );
}
