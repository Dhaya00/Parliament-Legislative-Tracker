
import React from 'react';
import { Bill } from '../types';
import { AppLanguage, translations } from '../App';

interface GeographicViewProps {
  bills: Bill[];
  lang: AppLanguage;
}

const GeographicView: React.FC<GeographicViewProps> = ({ bills, lang }) => {
  const t = translations[lang];

  const getOverview = () => {
    const overviews: Record<AppLanguage, string> = {
      en: "The Geographic Visualization module maps legislative impact across Indian states, providing insights into regional policy focus and administrative density.",
      hi: "भौगोलिक विज़ुअलाइज़ेशन मॉड्यूल भारतीय राज्यों में विधायी प्रभाव को दर्शाता है, जो क्षेत्रीय नीति फोकस में अंतर्दृष्टि प्रदान करता है।",
      ta: "புவியியல் காட்சிப்படுத்தல் தொகுதி இந்திய மாநிலங்கள் முழுவதும் சட்டமன்ற தாக்கத்தை வரைபடமாக்குகிறது.",
      bn: "ভৌগলিক ভিজ্যুয়ালাইজেশন মডিউল ভারতীয় রাজ্যগুলিতে আইনী প্রভাব ম্যাপ করে।",
      mr: "भौगोलिक व्हिज्युअलायझेशन मॉड्यूल भारतीय राज्यांमध्ये विधायी प्रभावाचा नकाशा तयार करते।",
      te: "భౌగోళిక విజువలైజేషన్ మాడ్యూల్ భారతీయ రాష్ట్రాలలో శాసన ప్రభావాన్ని మ్యాప్ చేస్తుంది."
    };
    return overviews[lang] || overviews.en;
  };

  const stateCounts = bills.reduce((acc: Record<string, number>, bill: Bill) => {
    const state = bill.state || 'Unassigned';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedStates = (Object.entries(stateCounts) as [string, number][]).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
          {t.mapping}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {getOverview()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl relative min-h-[500px] flex flex-col">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-8 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-map-marked-alt text-indigo-500"></i>
            Regional Legislative Density
          </h3>
          
          <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px]"></div>
             <div className="z-10 text-center p-8">
               <div className="w-24 h-24 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <i className="fas fa-map-pin text-5xl text-indigo-600 animate-bounce"></i>
               </div>
               <p className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-widest max-w-xs mx-auto">
                 Geographic mapping node active. real-time state focus analysis in progress.
               </p>
             </div>
          </div>

          <div className="mt-8 flex gap-3 overflow-x-auto pb-4 custom-sidebar-scroll">
             {sortedStates.map(([state, count]) => (
               <div key={state} className="bg-slate-100 dark:bg-slate-800 rounded-xl px-5 py-3 flex items-center gap-3 shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
                 <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter">{state}</span>
                 <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">{count}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-8 uppercase tracking-widest">Statistical Ranking</h3>
          <div className="space-y-6">
            {sortedStates.map(([state, count]) => {
              const percentage = (count / bills.length) * 100;
              return (
                <div key={state} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{state}</span>
                    <span className="text-[10px] font-black text-slate-400">{count} Active Record(s)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" 
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicView;
