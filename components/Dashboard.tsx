
import React from 'react';
import { Bill, BillStatus, SyncInfo } from '../types';
import { STATUS_COLORS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AppLanguage, translations } from '../App';

interface DashboardProps {
  bills: Bill[];
  syncInfo: SyncInfo;
  lang: AppLanguage;
}

const Dashboard: React.FC<DashboardProps> = ({ bills, syncInfo, lang }) => {
  const t = translations[lang];

  const chartData = Object.values(BillStatus).map(status => ({
    name: status,
    value: bills.filter(b => b.status === status).length,
    color: STATUS_COLORS[status as keyof typeof STATUS_COLORS]
  })).filter(d => d.value > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Patriotic Page Definition */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] border-t-4 border-saffron shadow-2xl group">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-green rounded-full"></span>
          {t.pagePurpose}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold opacity-80 leading-relaxed italic">
          Overview of Bharat's Legislative Status for the 2026 Registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Card with Dimension Fix */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col">
          <h3 className="text-sm font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-chart-pie text-saffron"></i>
            Legislative Density
          </h3>
          {/* Requirement 1: Fixed dimensions (min-height: 450px) */}
          <div className="w-full h-[450px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-saffron/5 to-green/5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-scroll text-green"></i>
              {t.recentStream}
            </h3>
            <span className="text-[10px] font-black text-green bg-green/10 px-3 py-1 rounded-full border border-green/20">LIVE 2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">Title</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bills.slice(0, 8).map((bill) => (
                  <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5 font-mono text-[10px] text-slate-500 font-bold">{bill.id}</td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100 line-clamp-1">{bill.title}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase mt-1">{bill.ministry}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{bill.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
