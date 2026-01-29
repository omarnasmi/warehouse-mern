
import React, { useState, useEffect } from 'react';
import { Product, Garage } from '../types';
import { getWarehouseInsights } from '../services/geminiService';

const Home: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, stock: 0, value: 0, garages: 0 });
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'inbound', item: 'Steel Girders', qty: '+50', time: '2h ago' },
    { id: 2, type: 'outbound', item: 'Industrial Paint', qty: '-20', time: '4h ago' },
    { id: 3, type: 'inventory', item: 'Hydraulic Press', qty: 'Check', time: '6h ago' },
  ]);

  useEffect(() => {
    const mockProducts: Product[] = [
      { _id: '1', name: 'Steel Beams', price: 1200, quantity: 45 },
      { _id: '2', name: 'Industrial Paint', price: 85, quantity: 120 },
      { _id: '3', name: 'Power Drills', price: 150, quantity: 8 }
    ];
    const mockGarages: Garage[] = [
      { _id: 'g1', num: 101, name: 'North Wing', size: { capacity: 500 } }
    ];

    const totalValue = mockProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    const totalStock = mockProducts.reduce((acc, p) => acc + p.quantity, 0);

    setStats({
      products: mockProducts.length,
      stock: totalStock,
      value: totalValue,
      garages: mockGarages.length
    });

    const fetchInsights = async () => {
      setIsLoadingAi(true);
      const insight = await getWarehouseInsights(mockProducts, mockGarages);
      setAiInsight(insight);
      setIsLoadingAi(false);
    };

    fetchInsights();
  }, []);

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-slide-in-left">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Welcome back, John. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <i className="fas fa-calendar-alt mr-2"></i>Last 30 Days
          </button>
          <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
            Generate Report
          </button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <StatCard icon="fa-boxes-stacked" label="Total SKU" value={stats.products} sub="Across 3 Categories" color="blue" delay="delay-100" />
        <StatCard icon="fa-layer-group" label="Total Stock" value={stats.stock} sub="+12% from last week" color="emerald" delay="delay-200" />
        <StatCard icon="fa-wallet" label="Asset Valuation" value={`$${(stats.value / 1000).toFixed(1)}k`} sub="Real-time market price" color="indigo" delay="delay-300" />
        <StatCard icon="fa-door-open" label="Capacity Usage" value="78%" sub="2 Garages nearly full" color="orange" delay="delay-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: AI & Charts */}
        <div className="xl:col-span-2 space-y-8 animate-fade-in-up delay-200">
          {/* AI Intelligence Panel */}
          <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform duration-500">
                  <i className="fas fa-microchip text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">Nexus AI Insights</h2>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Powered by Gemini 3</p>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm min-h-[160px]">
                {isLoadingAi ? (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-indigo-400">
                    <div className="flex gap-2 mb-4">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Generating actionable intelligence...</span>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                    {aiInsight.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 flex items-start gap-2">
                        {line.trim().startsWith('-') || line.trim().startsWith('*') ? (
                          <i className="fas fa-circle-check text-indigo-500 mt-1 text-[10px]"></i>
                        ) : null}
                        <span>{line.replace(/^[-*]\s*/, '')}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <i className="fas fa-brain text-[180px]"></i>
            </div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>
          </div>

          {/* Simple Visual Placeholder for Stock Trend */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Inventory Trends</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Stock In
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                  Stock Out
                </div>
              </div>
            </div>
            <div className="h-48 flex items-end justify-between gap-4 px-4">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div key={i} className="group relative flex-grow flex flex-col items-center">
                  <div 
                    style={{ height: `${h}%` }} 
                    className="w-full bg-indigo-100 group-hover:bg-indigo-500 transition-all rounded-t-lg relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {h} units
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-3">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="space-y-8 animate-fade-in-up delay-400">
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Live Activity</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">Realtime</span>
            </div>
            
            <div className="space-y-6 flex-grow">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                    act.type === 'inbound' ? 'bg-emerald-50 text-emerald-600' : 
                    act.type === 'outbound' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <i className={`fas ${
                      act.type === 'inbound' ? 'fa-arrow-down-long' : 
                      act.type === 'outbound' ? 'fa-arrow-up-long' : 'fa-clipboard-list'
                    }`}></i>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 leading-tight">{act.item}</h4>
                      <span className={`text-xs font-bold ${
                        act.qty.startsWith('+') ? 'text-emerald-600' : 
                        act.qty.startsWith('-') ? 'text-rose-600' : 'text-slate-500'
                      }`}>{act.qty}</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">{act.type.charAt(0).toUpperCase() + act.type.slice(1)} operation successful</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-2">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold text-sm hover:border-indigo-400 hover:text-indigo-600 transition-all">
              View Audit Log
            </button>
          </div>

          {/* Secondary Quick Access */}
          <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-600/30">
            <h3 className="text-lg font-bold mb-4">Stock Scanner</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Quickly add items or check stock levels using your device camera.</p>
            <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              <i className="fas fa-camera"></i>
              Launch Scanner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, color, delay }: { icon: string, label: string, value: string | number, sub: string, color: string, delay: string }) => {
  const colorMap: any = {
    blue: "bg-blue-600 shadow-blue-500/20",
    emerald: "bg-emerald-500 shadow-emerald-500/20",
    indigo: "bg-indigo-600 shadow-indigo-500/20",
    orange: "bg-orange-500 shadow-orange-500/20"
  };

  return (
    <div className={`bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 animate-fade-in-up ${delay}`}>
      <div className={`w-14 h-14 ${colorMap[color]} rounded-2xl flex items-center justify-center text-white text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
      </div>
      <p className="text-slate-400 text-xs font-bold mt-2 flex items-center gap-1">
        <i className="fas fa-trending-up text-emerald-500"></i>
        {sub}
      </p>
    </div>
  );
};

export default Home;
