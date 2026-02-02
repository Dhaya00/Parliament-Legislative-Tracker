
import React from 'react';
import { AppLanguage, translations } from '../App';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  theme, 
  setTheme, 
  language, 
  setLanguage,
  isOpen,
  onClose
}) => {
  const t = translations[language];

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: 'fa-chart-line' },
    { id: 'registry', label: t.registry, icon: 'fa-file-invoice' },
    { id: 'analytics', label: t.analytics, icon: 'fa-chart-pie' },
    { id: 'mapping', label: t.mapping, icon: 'fa-map-marked-alt' },
    { id: 'calendar', label: t.calendar, icon: 'fa-calendar-alt' },
    { id: 'news', label: t.news, icon: 'fa-newspaper' },
  ];

  const availableLanguages: { id: AppLanguage, name: string }[] = [
    { id: 'en', name: 'English' }, { id: 'hi', name: 'हिन्दी' }, { id: 'ta', name: 'தமிழ்' },
    { id: 'bn', name: 'বাংলা' }, { id: 'mr', name: 'मराठी' }, { id: 'te', name: 'తెలుగు' },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[40] md:hidden" onClick={onClose} />}

      <div className={`fixed md:relative z-[50] w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-white/10 h-full transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-saffron via-white to-green p-1.5 rounded-xl shadow-lg ring-2 ring-white/20">
               <svg width="24" height="24" viewBox="0 0 100 100" className="text-navy fill-current">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="8" fill="currentColor" />
                  {[...Array(24)].map((_, i) => (
                    <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(i * 15 * Math.PI / 180)} y2={50 + 40 * Math.sin(i * 15 * Math.PI / 180)} stroke="currentColor" strokeWidth="1" />
                  ))}
               </svg>
            </div>
            <h1 className="font-black text-white text-lg tracking-tighter">Bharat<span className="text-saffron">Legis</span></h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-sidebar-scroll">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest border ${
                  activeTab === item.id 
                  ? 'bg-gradient-to-r from-saffron/10 via-white/10 to-green/10 border-white/20 text-white shadow-xl' 
                  : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <i className={`fas ${item.icon} w-5 text-center`}></i>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 mb-4 border-t border-white/5 pt-6">
            <span className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.settings}</span>
            <div className="mt-4 grid grid-cols-2 gap-2 px-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`text-[9px] font-black py-2 rounded-xl border transition-all truncate uppercase ${
                    language === lang.id 
                    ? 'bg-saffron border-saffron text-white shadow-lg' 
                    : 'bg-slate-800 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <div className="px-4 mt-6">
               <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-300 transition-colors border border-white/5"
                >
                  <i className={`fas ${theme === 'light' ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-400'}`}></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">{theme}</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
