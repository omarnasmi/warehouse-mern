
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-warehouse text-xl"></i>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Nexus WMS</span>
          </div>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className="fas fa-chart-line mr-2"></i>Dashboard
            </Link>
            <Link 
              to="/products" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className="fas fa-boxes-stacked mr-2"></i>Inventory
            </Link>
            <Link 
              to="/garages" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/garages') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className="fas fa-building mr-2"></i>Garages
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
