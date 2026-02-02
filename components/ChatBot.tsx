
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { AppLanguage, translations } from '../App';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatBotProps {
  lang: AppLanguage;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    // Ensure the message list updates before sending AI request
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Fixed: Strictly following initialization guidelines using only process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: `You are an expert Indian Legislative Assistant. Provide accurate, professional, and concise information about Indian Parliamentary procedures and bills. The current language is ${lang}.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      const modelText = response.text || "No response received.";
      setMessages((prev) => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: "Service unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-16 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-indigo-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Legislative AI</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-indigo-100 font-medium">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white"><i className="fas fa-times"></i></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {messages.length === 0 && (
              <div className="text-center mt-10 text-slate-400 dark:text-slate-600">
                <i className="fas fa-landmark text-4xl mb-4 opacity-20"></i>
                <p className="text-xs px-8">Ask me anything about Indian Parliamentary bills.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm font-medium ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border shadow-sm">
                  <div className="flex gap-1"><span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></span><span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span><span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 px-3 border border-slate-200 dark:border-slate-700">
              <input 
                type="text" placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-slate-900 dark:text-white"
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} disabled={isLoading} className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50">
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        {isOpen ? <i className="fas fa-chevron-down text-xl"></i> : <i className="fas fa-comment-dots text-xl"></i>}
      </button>
    </div>
  );
};

export default ChatBot;
