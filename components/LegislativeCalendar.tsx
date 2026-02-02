
import React from 'react';
import { Bill } from '../types';
import { AppLanguage, translations } from '../App';

interface LegislativeCalendarProps {
  bills: Bill[];
  lang: AppLanguage;
}

const LegislativeCalendar: React.FC<LegislativeCalendarProps> = ({ bills, lang }) => {
  const t = translations[lang];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getOverview = () => {
    const overviews: Record<AppLanguage, string> = {
      en: "The Legislative Calendar schedules vital parliamentary sessions, bill discussions, and voting deadlines for the 2026 tenure.",
      hi: "विधायी कैलेंडर 2026 कार्यकाल के लिए महत्वपूर्ण संसदीय सत्रों और मतदान की समयसीमा निर्धारित करता है।",
      ta: "சட்டமன்ற காலண்டர் 2026 ஆம் ஆண்டிற்கான முக்கியமான நாடாளுமன்ற அமர்வுகள் மற்றும் காலக்கெடுவை திட்டமிடுகிறது.",
      bn: "আইনসভা ক্যালেন্ডার ২০২৬ মেয়াদের জন্য গুরুত্বপূর্ণ সংসদীয় অধিবেশন এবং ভোটের সময়সীমা নির্ধারণ করে।",
      mr: "विधायी दिनदर्शिका २०२६ कार्यकाळासाठी महत्त्वाच्या संसदीय सत्रांचे आणि मतदानाच्या मुदतीचे नियोजन करते।",
      te: "లెజిస్లేటివ్ క్యాలెండర్ 2026 పదవీ కాలానికి ముఖ్యమైన పార్లమెంటరీ సమావేశాలు మరియు ఓటింగ్ గడువులను షెడ్యూల్ చేస్తుంది."
    };
    return overviews[lang] || overviews.en;
  };

  const events = [
    { day: 5, label: "2026 Budget Presentation", type: "session" },
    { day: 12, label: "LS Voting: Digital Bill", type: "bill" },
    { day: 18, label: "RS Special Session", type: "session" },
    { day: 24, label: "Home Affairs Review", type: "meeting" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
          {t.calendar}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {getOverview()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">August 2026</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 flex items-center justify-center text-slate-600"><i className="fas fa-chevron-left"></i></button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 flex items-center justify-center text-slate-600"><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-inner">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-slate-50 dark:bg-slate-900/50 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
               <div key={`empty-${i}`} className="bg-white dark:bg-slate-900 min-h-[120px]"></div>
            ))}
            {days.map(day => {
              const dayEvent = events.find(e => e.day === day);
              return (
                <div key={day} className="bg-white dark:bg-slate-900 min-h-[120px] p-4 border-t border-l border-slate-50 dark:border-slate-800 hover:bg-slate-50 transition-colors group">
                  <span className="text-xs font-black text-slate-300 dark:text-slate-700 group-hover:text-indigo-600 transition-colors">{day}</span>
                  {dayEvent && (
                    <div className={`mt-2 p-2 rounded-xl text-[9px] font-black uppercase tracking-tighter leading-tight shadow-sm ${
                      dayEvent.type === 'session' ? 'bg-indigo-600 text-white shadow-indigo-200' : 
                      dayEvent.type === 'bill' ? 'bg-emerald-500 text-white shadow-emerald-200' : 
                      'bg-amber-500 text-white shadow-amber-200'
                    }`}>
                      {dayEvent.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-8 uppercase tracking-widest">Session Alerts</h3>
            <div className="space-y-6">
              {events.map((event, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="bg-slate-100 dark:bg-slate-800 w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                    <span className="text-[9px] font-black text-slate-500 uppercase group-hover:text-indigo-100">Aug</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-200 leading-none group-hover:text-white">{event.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-tighter">{event.label}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{event.type === 'bill' ? 'Legislative Vote' : 'Official Session'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegislativeCalendar;
