
import React, { useState } from 'react';
import { AppLanguage, translations } from '../App';

interface LoginViewProps {
  onLogin: (username: string) => void;
  onGoToRegister: () => void;
  lang: AppLanguage;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onGoToRegister, lang }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 relative font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-12 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-xl">
              <i className="fas fa-landmark text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t.loginTitle}</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">{t.loginSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.username}</label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text" required
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                  placeholder="UID"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.password}</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="password" required
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                  placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all">
              {t.authSignIn}
            </button>
          </form>

          <div className="px-10 pb-10 text-center">
            <button onClick={onGoToRegister} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-lg">
              {t.noAccount}
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-[11px] text-slate-400 font-medium">{t.developedBy}</footer>
    </div>
  );
};

export default LoginView;
