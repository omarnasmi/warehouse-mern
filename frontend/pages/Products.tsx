
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts([
        { _id: '1', name: 'Industrial Pipe Fittings', price: 45.50, quantity: 150 },
        { _id: '2', name: 'Hydraulic Press', price: 2400.00, quantity: 4 },
        { _id: '3', name: 'Safety Harnesses', price: 89.99, quantity: 42 },
        { _id: '4', name: 'Lubricant Oil (5L)', price: 34.00, quantity: 8 },
        { _id: '5', name: 'Heavy Duty Crate', price: 12.00, quantity: 500 },
        { _id: '6', name: 'Precision Calipers', price: 185.00, quantity: 12 },
      ]);
      setIsLoading(false);
    }, 800);
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p._id === editingProduct._id ? { ...p, ...formData } : p));
    } else {
      const newProduct: Product = {
        _id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p._id !== id));
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ name: product.name, price: product.price, quantity: product.quantity });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: 0, quantity: 0 });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 lg:p-12">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12 animate-slide-in-left">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Inventory Stock</h1>
          <p className="text-slate-500 mt-1 font-medium">Detailed view of all active stock components.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="relative group flex-grow sm:min-w-[320px]">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search by SKU name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900 shadow-sm"
            />
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span>Register Item</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 animate-pulse">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6 shadow-xl shadow-indigo-500/10"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Syncing with Central DB...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200 animate-fade-in-up">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-box-open text-4xl text-slate-300"></i>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">No matching items</h2>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">Adjust your search terms or register a new product in the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 animate-fade-in-up delay-200">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onDelete={handleDelete}
              onEdit={openModal}
            />
          ))}
        </div>
      )}

      {/* Modal - Repurposed with better design */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden transform transition-all animate-fade-in-up">
            <div className="bg-indigo-600 px-10 py-10 text-white relative">
              <div className="absolute top-0 right-0 p-10 opacity-10 text-8xl pointer-events-none">
                <i className="fas fa-box-open"></i>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight relative z-10">
                {editingProduct ? 'Update Stock Item' : 'Register New Item'}
              </h3>
              <p className="text-indigo-100 font-medium relative z-10 mt-1">Ensure all technical details are accurately logged.</p>
              <button onClick={closeModal} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleCreateOrUpdate} className="p-10 space-y-8">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Product Nomenclature</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold"
                  placeholder="e.g. Grade A Steel Tubing"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Unit Valuation ($)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Initial Quantity</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
              </div>
              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-8 py-4 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-600/30"
                >
                  {editingProduct ? 'Commit Updates' : 'Confirm Registry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
