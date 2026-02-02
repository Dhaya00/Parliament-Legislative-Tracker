
import React, { useState, useRef, useEffect } from 'react';
import { SyncInfo, AppNotification } from '../types';
import { AppLanguage, translations } from '../App';

interface HeaderProps {
  activeTab: string;
  syncInfo: SyncInfo;
  onSync: () => void;
  lang: AppLanguage;
  onToggleSidebar: () => void;
  notifications: AppNotification[];
  onClearNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  syncInfo, 
  onSync, 
  lang, 
  onToggleSidebar,
  notifications,
  onClearNotifications
}) => {
  const t = translations[lang];
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-[60] transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Parliament House</h2>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Legislative Division • {t[activeTab] || activeTab}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">{t.lastSync}</p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{syncInfo.lastUpdated}</p>
          </div>
          <button 
            onClick={onSync}
            disabled={syncInfo.status === 'Syncing'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              syncInfo.status === 'Syncing' 
              ? 'bg-slate-200 text-slate-400 animate-spin' 
              : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
            }`}
          >
            <i className="fas fa-sync-alt text-xs"></i>
          </button>
        </div>

        <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        {/* Real-time Notifications Center */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${
              unreadCount > 0 
              ? 'bg-saffron/10 border-saffron text-saffron' 
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <i className="fas fa-bell text-lg"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-top-4 duration-300">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800 flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{t.notifications}</h4>
                <button 
                  onClick={onClearNotifications}
                  className="text-[9px] font-black text-indigo-600 uppercase hover:underline"
                >
                  {t.markRead}
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-sidebar-scroll divide-y divide-slate-50 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <i className="fas fa-bell-slash text-3xl mb-3 opacity-20"></i>
                    <p className="text-[10px] font-black uppercase tracking-widest">No active updates</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className={`p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex gap-4 ${!notif.isRead ? 'bg-indigo-50/20' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${
                        notif.type === 'sync' ? 'bg-green/10 text-green border-green/20' : 
                        notif.type === 'update' ? 'bg-saffron/10 text-saffron border-saffron/20' : 
                        'bg-indigo-50 text-indigo-600 border-indigo-100'
                      }`}>
                        <i className={`fas ${notif.type === 'sync' ? 'fa-sync-alt' : notif.type === 'update' ? 'fa-file-signature' : 'fa-newspaper'}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[11px] font-black text-slate-900 dark:text-white truncate">{notif.title}</p>
                          <span className="text-[9px] font-bold text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
