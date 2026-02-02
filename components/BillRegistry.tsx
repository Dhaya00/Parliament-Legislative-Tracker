
import React, { useState, useEffect } from 'react';
import { Bill, BillStatus } from '../types';
import { AppLanguage, translations } from '../App';
import { GoogleGenAI } from '@google/genai';

interface BillRegistryProps {
  bills: Bill[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: AppLanguage;
}

const BillRegistry: React.FC<BillRegistryProps> = ({ bills, searchQuery, setSearchQuery, lang }) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [translatedBill, setTranslatedBill] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const t = translations[lang];

  const getPageOverview = () => {
    const overviews: Record<AppLanguage, string> = {
      en: "The Bill Registry acts as the digital archive for 2026. Every legislative entry is tracked with dynamic AI translation and official verification nodes.",
      hi: "विधेयक रजिस्ट्री 2026 के लिए डिजिटल संग्रह के रूप में कार्य करती है। प्रत्येक विधायी प्रविष्टि को गतिशील AI अनुवाद के साथ ट्रैक किया जाता है।",
      ta: "மசோதா பதிவேடு 2026 ஆம் ஆண்டிற்கான டிஜிட்டல் காப்பகமாக செயல்படுகிறது. ஒவ்வொரு சட்டமன்ற பதிவும் AI மொழிபெயர்ப்புடன் கண்காணிக்கப்படுகிறது.",
      bn: "বিল রেজিস্ট্রি ২০২৬ সালের ডিজিটাল আর্কাইভ হিসেবে কাজ করে। প্রতিটি আইনী এন্ট্রি ডায়নামিক AI অনুবাদের মাধ্যমে ট্র্যাক করা হয়।",
      mr: "विधेयक नोंदणी २०२६ साठी ডিজিটাল আর্কাইভ হিসেবে কাজ করে। প্রতিটি বিধায়ী নথি AI ভাষাান্তরের মাধ্যমে ট্র‍্যাক করা হয়।",
      te: "బిల్ రిజిస్ట్రీ 2026 కోసం డిజిటల్ ఆర్కైవ్‌గా పనిచేస్తుంది. ప్రతి శాసన నమోదు డైనమిక్ AI అనువాదంతో ట్రాక్ చేయబడుతుంది."
    };
    return overviews[lang] || overviews.en;
  };

  const translateContent = async (bill: Bill, targetLang: string) => {
    if (targetLang === 'en') {
      setTranslatedBill(bill);
      return;
    }
    setIsTranslating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Translate this legislative info to ${targetLang}. Provide a detailed professional summary and history. Respond strictly in JSON:
      Title: ${bill.title}
      Ministry: ${bill.ministry}
      History: ${bill.summary}
      Current Status: ${bill.status}
      Committee: ${bill.committeeStatus || 'N/A'}
      Financial Implication: ${bill.financialImplication || 'N/A'}
      JSON format: { "title": "...", "ministry": "...", "summary": "...", "status": "...", "committeeStatus": "...", "financialImplication": "..." }`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      const result = JSON.parse(response.text || '{}');
      setTranslatedBill({ ...bill, ...result });
    } catch (e) {
      console.error("Translation Error:", e);
      setTranslatedBill(bill);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    if (selectedBill) translateContent(selectedBill, lang);
  }, [selectedBill, lang]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-[2.5rem] border-t-8 border-green shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-saffron rounded-full"></span>
          {t.pagePurpose}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold opacity-80 leading-relaxed italic">
          {getPageOverview()}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative max-w-lg">
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-black focus:border-green outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.id}</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.subject}</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.status}</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                  <td className="px-8 py-6 text-xs text-slate-500 font-bold font-mono">{bill.id}</td>
                  <td className="px-8 py-6 max-w-lg">
                    <button 
                      onClick={() => setSelectedBill(bill)} 
                      className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-green text-left leading-snug transition-colors"
                    >
                      {bill.title}
                    </button>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Year: 2026 • GOI Resource</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase border bg-green/5 text-green border-green/10">
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setSelectedBill(bill)} 
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-green hover:scale-110 transition-all shadow-sm"
                      title="View Entire Details"
                    >
                      <i className="fas fa-expand-arrows-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in transition-all">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border-t-[12px] border-green border-b-8 border-saffron">
            <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-green rounded-2xl text-white flex items-center justify-center shadow-xl">
                  <i className="fas fa-landmark text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">ENTIRE DETAILS</h3>
                  <p className="text-[10px] font-black text-green uppercase tracking-widest">Legislative Node {selectedBill.id} • LATEST 2026</p>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedBill(null); setTranslatedBill(null); }} 
                className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:rotate-90 transition-all shadow-sm"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-10 space-y-8 overflow-y-auto max-h-[70vh] custom-sidebar-scroll">
              {isTranslating ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-saffron/30 border-t-green rounded-full animate-spin"></div>
                    <i className="fas fa-language absolute inset-0 flex items-center justify-center text-green"></i>
                  </div>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest animate-pulse">Deep Linguistic Processing Active...</p>
                </div>
              ) : translatedBill && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-saffron text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-saffron/20">
                      {translatedBill.status}
                    </span>
                    <span className="px-4 py-2 bg-green/10 text-green rounded-xl text-[10px] font-black uppercase tracking-widest border border-green/20">
                      Gazette: {selectedBill.gazetteNumber || 'N/A'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Official Subject (Translated)</h4>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{translatedBill.title}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-inner">
                        <h4 className="text-[10px] font-black text-green uppercase mb-4 flex items-center gap-2 tracking-widest">
                          <i className="fas fa-history"></i> SUMMARY & HISTORY
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                          {translatedBill.summary}
                        </p>
                      </div>

                      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Parliamentary Committee Status</h5>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200">{translatedBill.committeeStatus || 'No Referral Reported'}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.ministry}</h5>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200">{translatedBill.ministry}</p>
                      </div>

                      <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
                        <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Financial Implication</h5>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200">{translatedBill.financialImplication || 'None Reported'}</p>
                      </div>

                      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Key Stakeholders</h5>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(selectedBill.keyStakeholders || ['Government']).map((s: string) => (
                            <span key={s} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-[9px] font-black rounded-lg text-slate-600 dark:text-slate-400 uppercase">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedBill.legislativeHistory && (
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Timeline History</h5>
                          <div className="space-y-3">
                            {selectedBill.legislativeHistory.map((h, i) => (
                              <div key={i} className="flex gap-3 text-[10px]">
                                <span className="font-black text-green shrink-0">{h.date}</span>
                                <span className="font-medium text-slate-600 dark:text-slate-400">{h.action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-10 py-8 bg-slate-50 dark:bg-slate-800/50 border-t dark:border-slate-800 flex justify-end">
               <button 
                onClick={() => { setSelectedBill(null); setTranslatedBill(null); }} 
                className="px-10 py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95"
               >
                {t.close}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillRegistry;
