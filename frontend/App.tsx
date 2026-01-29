
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import Garages from './pages/Garages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-grow bg-slate-50 overflow-y-auto h-screen">
          <div className="max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/garages" element={<Garages />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
