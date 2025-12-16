import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Download, Calendar, ChevronDown } from 'lucide-react';
import { ANALYTIC_DATA, STAGE_DISTRIBUTION } from '../constants';

const COLORS = ['#6750A4', '#625B71', '#7D5260', '#B3261E', '#60a5fa', '#34d399'];

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState('week');

  const handleExport = () => {
    alert("Данные аналитики выгружаются в CSV...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
          <p className="text-gray-500 mt-1">Обзор показателей эффективности операций</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Calendar className="h-5 w-5 text-gray-500" />
             </div>
             <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white border border-md-outline/30 text-gray-700 py-2.5 pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-md-primary/20 text-sm font-medium cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
             >
               <option value="week">За неделю</option>
               <option value="month">За месяц</option>
               <option value="year">За год</option>
             </select>
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
               <ChevronDown className="h-4 w-4 text-gray-400" />
             </div>
          </div>
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-white border border-md-outline/30 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition shadow-sm font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Выгрузить отчет
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Dynamics vs Norm */}
        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Динамика времени погрузки (vs Эталон)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ANALYTIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} fontSize={12} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#6B7280'}} label={{ value: 'Мин.', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="avgTime" name="Среднее время" stroke="#6750A4" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="normTime" name="Эталонное время" stroke="#9CA3AF" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Exceeded Counts */}
        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Количество превышений нормы</h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} fontSize={12} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#6B7280'}} allowDecimals={false} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="exceededCount" name="Превышения" fill="#B3261E" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Stage Distribution */}
        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Среднее время на каждый этап</h3>
          <div className="h-72 flex flex-col md:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart 
                  layout="vertical"
                  data={STAGE_DISTRIBUTION} 
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12, fill: '#4B5563'}} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" name="Минуты" radius={[0, 6, 6, 0]} barSize={24}>
                    {STAGE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;