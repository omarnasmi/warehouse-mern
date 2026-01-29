
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'fa-chart-pie' },
    { path: '/products', label: 'Inventory', icon: 'fa-boxes-stacked' },
    { path: '/garages', label: 'Facilities', icon: 'fa-warehouse' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-[280px] bg-slate-900 h-screen sticky top-0 flex flex-col text-slate-400 border-r border-slate-800">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fas fa-cube text-xl"></i>
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">NEXUS<span className="text-indigo-500">.</span></span>
        </div>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Main Menu</p>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              isActive(item.path) 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <i className={`fas ${item.icon} text-lg transition-transform group-hover:scale-110`}></i>
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}

        <div className="px-4 mt-10 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Support</p>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-slate-800 hover:text-slate-100 group">
          <i className="fas fa-life-ring text-lg group-hover:rotate-12 transition-transform"></i>
          <span className="font-semibold">Help Center</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-slate-800 hover:text-slate-100 group">
          <i className="fas fa-gear text-lg group-hover:rotate-90 transition-transform"></i>
          <span className="font-semibold">Settings</span>
        </button>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3 border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-bold text-white truncate">John Doe</p>
            <p className="text-xs text-slate-500 truncate">Warehouse Mgr</p>
          </div>
          <button className="text-slate-500 hover:text-red-400 transition-colors">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
