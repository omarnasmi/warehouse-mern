
import React, { useState, useEffect } from 'react';
import { Garage } from '../types';

const Garages: React.FC = () => {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setGarages([
        { _id: '1', num: 101, name: 'Main Cold Storage', size: { capacity: 2500 } },
        { _id: '2', num: 102, name: 'Dry Goods Wing', size: { capacity: 5000 } },
        { _id: '3', num: 201, name: 'Hazardous Materials', size: { capacity: 800 } },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Warehouse Garages</h1>
        <p className="text-slate-500">Manage storage areas and capacity allocation.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {garages.map(garage => (
            <div key={garage._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
              <div className="bg-slate-900 p-6 text-white relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl transform translate-x-4 -translate-y-4">
                  <i className="fas fa-warehouse"></i>
                </div>
                <div className="relative z-10">
                  <span className="bg-indigo-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">
                    Zone {Math.floor(garage.num / 100)}
                  </span>
                  <h3 className="text-2xl font-bold">{garage.name}</h3>
                  <p className="text-slate-400 text-sm">Garage #{garage.num}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-500">Capacity Utilization</span>
                    <span className="text-sm font-bold text-slate-900">72%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[72%]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                  <div>
                    <span className="block text-xs text-slate-400 uppercase font-semibold">Max Units</span>
                    <span className="text-lg font-bold text-slate-900">{garage.size.capacity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase font-semibold">Available</span>
                    <span className="text-lg font-bold text-indigo-600">{(garage.size.capacity * 0.28).toFixed(0)}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-bold transition-colors">
                    View Contents
                  </button>
                  <button className="px-3 py-2 text-slate-400 hover:text-red-600 transition-colors">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Garage Placeholder */}
          <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group min-h-[300px]">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <i className="fas fa-plus text-2xl text-slate-400 group-hover:text-indigo-600"></i>
            </div>
            <span className="text-lg font-bold text-slate-900">Add New Garage</span>
            <p className="text-slate-500 text-sm text-center mt-2 px-6">Expand your storage capacity by defining a new wing.</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Garages;
