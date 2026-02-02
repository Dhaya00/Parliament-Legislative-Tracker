
import React, { useState } from 'react';
import { AppLanguage, translations } from '../App';

interface RegisterViewProps {
  onRegister: () => void;
  onGoToLogin: () => void;
  lang: AppLanguage;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onRegister, onGoToLogin, lang }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const t = translations[lang];

  const validatePasswordComplexity = (pass: string) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSymbol = /[@$!%*?&#]/.test(pass);
    return pass.length >= 8 && hasUpper && hasLower && hasNumber && hasSymbol;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePasswordComplexity(password)) {
      setError('Patriotic Security Policy: Password must have Upper, Lower, Number, and Symbol.');
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (response.ok) {
        alert("Success! Yasothai Sankaravel (Developer) has been notified of your registration.");
        onRegister();
      } else {
        const d = await response.json();
        setError(d.error || 'Registration failed.');
      }
    } catch (e) {
      setError('Network error connecting to verification system.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/10 via-white to-green/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-t-8 border-saffron">
          <div className="p-12 pb-6 text-center">
             <div className="inline-flex items-center justify-center w-20 h-20 bg-green rounded-3xl mb-8 shadow-xl shadow-green/20">
              <i className="fas fa-shield-alt text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.registerTitle}</h1>
            <p className="text-slate-500 text-sm mt-3 font-medium">{t.registerSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-12 pt-4 space-y-6">
            {error && <div className="bg-rose-50 text-rose-600 text-[11px] p-4 rounded-2xl border border-rose-100 font-black flex items-center gap-3"><i className="fas fa-flag"></i> {error}</div>}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
              <input
                type="text" required
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-green outline-none text-black bg-white font-bold transition-all"
                placeholder="Officer Name"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Official Email</label>
              <input
                type="email" required
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-green outline-none text-black bg-white font-bold transition-all"
                placeholder="email@gov.in"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.password}</label>
              <input
                type="password" required
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-green outline-none text-black bg-white font-bold transition-all"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-green hover:bg-green/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-green/20 transition-all active:scale-[0.98] uppercase tracking-widest">
              {t.submitApp}
            </button>
          </form>

          <div className="px-12 pb-12 text-center">
            <button onClick={onGoToLogin} className="text-[10px] font-black text-slate-500 hover:text-saffron transition-colors uppercase tracking-widest">
              {t.backToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
