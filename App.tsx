
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_BILLS } from './constants';
import { BillStatus, User, SyncInfo, AppNotification } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BillRegistry from './components/BillRegistry';
import AnalyticsView from './components/AnalyticsView';
import GeographicView from './components/GeographicView';
import LegislativeCalendar from './components/LegislativeCalendar';
import PoliticalNews from './components/PoliticalNews';
import ChatBot from './components/ChatBot';

export type AppLanguage = 'en' | 'hi' | 'ta' | 'bn' | 'mr' | 'te';

export const translations: Record<AppLanguage, any> = {
  en: {
    dashboard: 'Dashboard', registry: 'Bill Registry', analytics: 'Deep Analytics', mapping: 'Geo Visualization',
    calendar: 'Legis. Calendar', news: 'Political News', settings: 'Settings', activeBills: 'Active Bills', 
    lokSabha: 'Lok Sabha', rajyaSabha: 'Rajya Sabha', assented: 'Assented', 
    recentStream: 'Official Bill Stream (2026)', searchPlaceholder: 'Search by title, ministry, or ID...', 
    exportData: 'Export Data', developedBy: 'Developed by Yasothai Sankaravel', 
    systemOfficer: 'System Officer', lastSync: 'Last Data Sync', chamber: 'Chamber', 
    status: 'Status', summary: 'Executive Abstract', ministry: 'Ministry',
    id: 'ID', subject: 'Subject', actions: 'Actions', close: 'Close', liveUpdates: 'Get Live Updates',
    pagePurpose: 'Purpose of this Page', notifications: 'Notifications', markRead: 'Mark all as read'
  },
  hi: {
    dashboard: 'डैशबोर्ड', registry: 'विधेयक रजिस्ट्री', analytics: 'गहन विश्लेषण', mapping: 'भौगोलिक चित्रण',
    calendar: 'विधायी कैलेंडर', news: 'राजनीतिक समाचार', settings: 'सेटिंग्स', activeBills: 'सक्रिय विधेयक', 
    lokSabha: 'लोकसभा', rajyaSabha: 'राज्यसभा', assented: 'स्वीकृत', 
    recentStream: 'आधिकारिक विधेयक प्रवाह (2026)', searchPlaceholder: 'खोजें...', exportData: 'डेटा निर्यात',
    developedBy: 'यशोथाई शंकरवेल द्वारा विकसित', systemOfficer: 'अधिकारी', lastSync: 'अंतिम समन्वयन',
    chamber: 'सदन', status: 'स्थिति', summary: 'कार्यकारी सारांश', ministry: 'मंत्रालय',
    id: 'आईडी', subject: 'विषय', actions: 'कार्रवाई', close: 'बंद करें', liveUpdates: 'लाइव अपडेट',
    pagePurpose: 'इस पृष्ठ का उद्देश्य', notifications: 'सूचनाएं', markRead: 'सभी को पढ़ा हुआ चिह्नित करें'
  },
  ta: {
    dashboard: 'டாஷ்போர்டு', registry: 'மசோதா பதிவு', analytics: 'பகுப்பாய்வு', mapping: 'வரைபடம்',
    calendar: 'காலண்டர்', news: 'அரசியல் செய்திகள்', settings: 'அமைப்புகள்', activeBills: 'செயலில் உள்ளவை', 
    lokSabha: 'மக்களவை', rajyaSabha: 'மாநிலங்களவை', assented: 'ஒப்புதல்', 
    recentStream: 'சமீபத்திய மசோதாக்கள் (2026)', searchPlaceholder: 'தேடுக...', exportData: 'ஏற்றுமதி',
    developedBy: 'யசோதை சங்கரவேல்', systemOfficer: 'அதிகாரி', lastSync: 'கடைசி புதுப்பிப்பு',
    chamber: 'சபை', status: 'நிலை', summary: 'சுருக்கம்', ministry: 'அமைச்சகம்',
    id: 'எண்', subject: 'தலைப்பு', actions: 'செயல்கள்', close: 'மூடு', liveUpdates: 'நேரடி புதுப்பிப்புகள்',
    pagePurpose: 'இந்த பக்கத்தின் நோக்கம்', notifications: 'அறிவிப்புகள்', markRead: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்'
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড', registry: 'বিল রেজিস্ট্রি', analytics: 'বিশ্লেষণ', mapping: 'মানচিত্র', calendar: 'ক্যালেন্ডার', news: 'রাজনৈতিক খবর', settings: 'সেটিংস', activeBills: 'সক্রিয় বিল', lokSabha: 'লোকসভা', rajyaSabha: 'রাজ্যসভা', assented: 'সম্মতিপ্রাপ্ত', recentStream: 'সাম্প্রতিক বিল (২০২৬)', searchPlaceholder: 'খুঁজুন...', exportData: 'এক্সপোর্ট', developedBy: 'যশোথai শঙ্করভেল', systemOfficer: 'অফিসার', lastSync: 'সর্বশেষ আপডেট', chamber: 'কক্ষ', status: 'অবস্থা', summary: 'সারাংশ', ministry: 'মন্ত্রণালয়', id: 'আইডি', subject: 'বিষয়', actions: 'অ্যাকশন', close: 'বন্ধ', liveUpdates: 'লাইভ আপডেট', pagePurpose: 'পৃষ্ঠার উদ্দেশ্য', notifications: 'বিজ্ঞপ্তি', markRead: 'সবগুলো পড়া হয়েছে হিসেবে চিহ্নিত করুন'
  },
  mr: {
    dashboard: 'डॅशबोर्ड', registry: 'नोंदणी', analytics: 'विश्लेषण', mapping: 'चित्रण', calendar: 'कॅलेंडर', news: 'राजकीय बातम्या', settings: 'सेटिंग्ज', activeBills: 'सक्रिय', lokSabha: 'लोकसभा', rajyaSabha: 'राज्यसभा', assented: 'संमती', recentStream: 'नवीनतम प्रवाह (२०२०)', searchPlaceholder: 'शोधा...', exportData: 'निर्यात', developedBy: 'यशोथाई शंकरवेल', systemOfficer: 'अधिकारी', lastSync: 'शेवटचे सिंक', chamber: 'सभागृह', status: 'स्थिती', summary: 'सारांश', ministry: 'मंत्रालय', id: 'आयडी', subject: 'विषय', actions: 'कृती', close: 'बंद करा', liveUpdates: 'थेट अपडेट', pagePurpose: 'पृष्ठाचा उद्देश', notifications: 'सूचना', markRead: 'सर्व वाचलेले म्हणून चिन्हांकित करा'
  },
  te: {
    dashboard: 'డాష్‌బోర్డ్', registry: 'రిజిస్ట్రీ', analytics: 'విశ్లేషణ', mapping: 'మ్యాపింగ్', calendar: 'క్యాలెండర్', news: 'రాజకీయ వార్తలు', settings: 'సెట్టింగ్‌లు', activeBills: 'యాక్టివ్', lokSabha: 'లోక్ సభ', rajyaSabha: 'రాజ్యసభ', assented: 'ఆమోదం', recentStream: 'తాజా బిల్లులు (2026)', searchPlaceholder: 'వెతకండి...', exportData: 'ఎగుమతి', developedBy: 'యశోతై శంకరవేల్', systemOfficer: 'అధికారి', lastSync: 'చివరి అప్‌డేట్', chamber: 'సభ', status: 'స్థితి', summary: 'సారాంశం', ministry: 'మంత్రిత్వ శాఖ', id: 'ఆయ్డి', subject: 'అంశం', actions: 'చర్యలు', close: 'మూసివేయి', liveUpdates: 'లైవ్ అప్‌డేట్‌లు', pagePurpose: 'పేజీ ఉద్దేశ్యం', notifications: 'నోటిఫికేషన్లు', markRead: 'అన్నింటినీ చదివినట్లుగా గుర్తించు'
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: '1', title: 'System Initialized', message: 'Legislation portal 2026 is now live.', time: '2 mins ago', isRead: false, type: 'sync' },
    { id: '2', title: 'New Bill Introduced', message: 'Banking Laws (Amendment) Bill, 2024 is now tracked.', time: '1 hour ago', isRead: false, type: 'update' }
  ]);
  
  const [syncInfo, setSyncInfo] = useState<SyncInfo>({
    lastUpdated: new Date().toLocaleString(),
    nextScheduled: new Date(Date.now() + 1800000).toLocaleString(),
    status: 'Idle'
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLanguageChange = (lang: AppLanguage) => {
    setLanguage(lang);
    localStorage.setItem('legis_lang', lang);
  };

  const handleThemeChange = (t: 'light' | 'dark') => {
    setTheme(t);
    localStorage.setItem('legis_theme', t);
  };

  const triggerSync = () => {
    setSyncInfo(prev => ({ ...prev, status: 'Syncing' }));
    setTimeout(() => {
      setSyncInfo({
        lastUpdated: new Date().toLocaleString(),
        nextScheduled: new Date(Date.now() + 1800000).toLocaleString(),
        status: 'Completed'
      });
      
      const newNotif: AppNotification = {
        id: Date.now().toString(),
        title: 'Sync Completed',
        message: `Database successfully synchronized at ${new Date().toLocaleTimeString()}`,
        time: 'Just now',
        isRead: false,
        type: 'sync'
      };
      setNotifications(prev => [newNotif, ...prev]);

      setTimeout(() => setSyncInfo(prev => ({ ...prev, status: 'Idle' })), 3000);
    }, 1500);
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const sortedBills = useMemo(() => {
    return [...MOCK_BILLS].sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }, []);

  const filteredBills = useMemo(() => {
    return sortedBills.filter(bill => 
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.includes(searchQuery)
    );
  }, [searchQuery, sortedBills]);

  const t = translations[language];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard bills={sortedBills} syncInfo={syncInfo} lang={language} />;
      case 'registry': return <BillRegistry bills={filteredBills} searchQuery={searchQuery} setSearchQuery={setSearchQuery} lang={language} />;
      case 'analytics': return <AnalyticsView bills={sortedBills} lang={language} />;
      case 'mapping': return <GeographicView bills={sortedBills} lang={language} />;
      case 'calendar': return <LegislativeCalendar bills={sortedBills} lang={language} />;
      case 'news': return <PoliticalNews lang={language} />;
      default: return <Dashboard bills={sortedBills} syncInfo={syncInfo} lang={language} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden relative dark:bg-slate-950 transition-colors duration-300`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} 
        theme={theme} 
        setTheme={handleThemeChange}
        language={language}
        setLanguage={handleLanguageChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none chakra-rotate">
           <svg width="600" height="600" viewBox="0 0 100 100" className="text-navy fill-current">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
              {[...Array(24)].map((_, i) => (
                <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(i * 15 * Math.PI / 180)} y2={50 + 40 * Math.sin(i * 15 * Math.PI / 180)} stroke="currentColor" strokeWidth="0.5" />
              ))}
           </svg>
        </div>

        <Header 
          activeTab={activeTab} 
          syncInfo={syncInfo} 
          onSync={triggerSync} 
          lang={language}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          notifications={notifications}
          onClearNotifications={clearNotifications}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 z-10">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderContent()}
          </div>
          
          <footer className="w-full h-16 flex flex-col items-center justify-center mt-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 backdrop-blur-sm">
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-navy/60 dark:text-white/60">Satyameva Jayate • सत्यमेవ జయతే</p>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 mt-1">
              {t.developedBy}
            </p>
          </footer>
        </main>
      </div>

      <ChatBot lang={language} />
    </div>
  );
};

export default App;
