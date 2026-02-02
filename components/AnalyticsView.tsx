
import React from 'react';
import { Bill } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AppLanguage, translations } from '../App';

interface AnalyticsViewProps {
  bills: Bill[];
  lang: AppLanguage;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ bills, lang }) => {
  const t = translations[lang];

  const getOverview = () => {
    const overviews: Record<AppLanguage, string> = {
      en: "The Deep Analytics module provides data-driven visualizations of legislative trends, ministry-wise performance, and session progress for 2026 data.",
      hi: "गहन विश्लेषण मॉड्यूल विधायी रुझानों और मंत्रालय-वार प्रदर्शन का डेटा-संचालित विज़ुअलाइज़ेशन प्रदान करता है।",
      ta: "ஆழமான பகுப்பாய்வு தொகுதி சட்டமன்ற போக்குகள் மற்றும் அமைச்சகம் வாரியான செயல்திறனின் தரவு சார்ந்த காட்சிப்படுத்தல்களை வழங்குகிறது.",
      bn: "ডিপ অ্যানালিটিক্স মডিউল আইনসভার প্রবণতা এবং মন্ত্রণালয় ভিত্তিক পারফরম্যান্সের ডেটা-চালিত ভিজ্যুয়ালাইজেশন প্রদান করে।",
      mr: "डीप ॲनालिटिक्स मॉड्यूल विधायी ट्रेंड आणि मंत्रालय-निहाय कामगिरीचे डेटा-आधारित व्हिज्युअलायझेशन प्रदान करते।",
      te: "డీప్ అనలిటిక్స్ మాడ్యూల్ శాసన పోకడలు మరియు మంత్రిత్వ శాఖల వారీ పనితీరు యొక్క డేటా-ఆధారిత విజువలైజేషన్‌లను అందిస్తుంది."
    };
    return overviews[lang] || overviews.en;
  };

  const ministryData = bills.reduce((acc: any[], bill) => {
    const existing = acc.find(item => item.name === bill.ministry);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: bill.ministry, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => b.count - a.count).slice(0, 6);

  const trendData = [
    { session: 'Budget 2025', passed: 19, introduced: 25 },
    { session: 'Monsoon 2025', passed: 12, introduced: 18 },
    { session: 'Winter 2025', passed: 21, introduced: 28 },
    { session: 'Budget 2026', passed: 8, introduced: 15 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
          {t.analytics}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {getOverview()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-8 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-landmark text-indigo-500"></i>
            Active Ministries (2026 Registry)
          </h3>
          {/* Fix: Applied min-height: 450px and minWidth={0} */}
          <div className="w-full h-[450px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={ministryData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 12, 12, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-8 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-chart-line text-indigo-500"></i>
            Legislative Session Velocity
          </h3>
          <div className="w-full h-[450px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="session" tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }} />
                <Line type="monotone" dataKey="introduced" stroke="#cbd5e1" strokeWidth={3} dot={{ r: 6, fill: '#cbd5e1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="passed" stroke="#6366f1" strokeWidth={5} dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
