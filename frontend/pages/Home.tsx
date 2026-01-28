
import React, { useState, useEffect } from 'react';
import { Product, Garage } from '../types';
import { getWarehouseInsights } from '../services/geminiService';

const Home: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, stock: 0, value: 0, garages: 0 });
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Mock data fetching logic (since we don't have a real backend in this sandbox)
  useEffect(() => {
    // In a real app, you'd fetch /api/products and /api/garages here
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
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Warehouse Overview</h1>
        <p className="text-slate-500">Real-time snapshots of your Nexus operations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon="fa-box" label="Total Products" value={stats.products} color="blue" />
        <StatCard icon="fa-cubes" label="Stock Level" value={stats.stock} color="green" />
        <StatCard icon="fa-dollar-sign" label="Asset Value" value={`$${stats.value.toLocaleString()}`} color="indigo" />
        <StatCard icon="fa-building" label="Active Garages" value={stats.garages} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insight Panel */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-wand-magic-sparkles text-xl"></i>
              </div>
              <h2 className="text-xl font-bold">Nexus AI Assistant</h2>
            </div>
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur-md border border-white/20 min-h-[120px]">
              {isLoadingAi ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
                  <span>Analyzing warehouse metrics...</span>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  {aiInsight.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-4">
              <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
                Run Optimization
              </button>
              <button className="bg-blue-500/30 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-500/50 transition-colors">
                Download Report
              </button>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <QuickActionButton icon="fa-plus" label="Add New Product" to="/products" color="blue" />
            <QuickActionButton icon="fa-warehouse" label="Manage Garages" to="/garages" color="indigo" />
            <QuickActionButton icon="fa-file-invoice" label="View Orders" to="#" color="slate" />
            <QuickActionButton icon="fa-gear" label="System Settings" to="#" color="slate" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: string, label: string, value: string | number, color: string }) => {
  const colorClasses: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
        <i className={`fas ${icon} text-2xl`}></i>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

const QuickActionButton = ({ icon, label, to, color }: { icon: string, label: string, to: string, color: string }) => {
  const colorClasses: any = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    indigo: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
    slate: "text-slate-600 bg-slate-50 hover:bg-slate-100"
  };

  return (
    <a href={to} className={`flex items-center gap-4 p-4 rounded-xl transition-colors font-medium ${colorClasses[color]}`}>
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <i className={`fas ${icon}`}></i>
      </div>
      <span>{label}</span>
      <i className="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
    </a>
  );
};

export default Home;
