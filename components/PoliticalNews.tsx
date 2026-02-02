
import React, { useState, useMemo } from 'react';
import { MOCK_NEWS } from '../constants';
import { AppLanguage, translations } from '../App';

interface PoliticalNewsProps {
  lang: AppLanguage;
}

const PoliticalNews: React.FC<PoliticalNewsProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[lang];

  const filteredNews = useMemo(() => {
    return MOCK_NEWS.filter(news => 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getPageOverview = () => {
    const overviews: Record<AppLanguage, string> = {
      en: "This category monitors general political news, upcoming elections, policy shifts, and international affairs impacting the 2026 legislative landscape.",
      hi: "यह श्रेणी सामान्य राजनीतिक समाचारों, आगामी चुनावों और नीतिगत परिवर्तनों की निगरानी करती है।",
      ta: "இந்த வகை பொது அரசியல் செய்திகள், வரவிருக்கும் தேர்தல்கள் மற்றும் கொள்கை மாற்றங்களை கண்காணிக்கிறது.",
      bn: "এই বিভাগটি সাধারণ রাজনৈতিক খবর, আসন্ন নির্বাচন এবং নীতি পরিবর্তনের ওপর নজর রাখে।",
      mr: "ही श्रेणी सामान्य राजकीय बातम्या, आगामी निवडणुका आणि धोरणात्मक बदलांवर लक्ष ठेवते।",
      te: "ఈ విభాగం సాధారణ రాజకీయ వార్తలు, రాబోయే ఎన్నికలు మరియు విధాన మార్పులను పర్యవేక్షిస్తుంది."
    };
    return overviews[lang] || overviews.en;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Overview Section */}
      <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-[2.5rem] border-t-8 border-saffron shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3 uppercase tracking-tight">
          <span className="w-1.5 h-8 bg-green rounded-full"></span>
          {t.news}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold opacity-80 leading-relaxed italic">
          {getPageOverview()}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* News Grid */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    news.category === 'Election' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    news.category === 'Policy' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    'bg-slate-50 text-slate-600 border-slate-100'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{news.date}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                  {news.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3 mb-6">
                  {news.content}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source: {news.source}</span>
                  <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                    Read Report <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Categories Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-widest">News Search</h3>
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-widest">Election Watch 2026</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Voter Turnout Target</span>
                <span className="text-xs font-black text-green">85%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Upcoming Polls</span>
                <span className="text-xs font-black text-saffron">5 States</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticalNews;
