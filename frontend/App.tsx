
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Garages from './pages/Garages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/garages" element={<Garages />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-slate-800 text-white p-1.5 rounded">
                <i className="fas fa-warehouse text-xs"></i>
              </div>
              <span className="font-bold text-slate-900">Nexus WMS v1.0.0</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Nexus Logistics Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Documentation</a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Support</a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
