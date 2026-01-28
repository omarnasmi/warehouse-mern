
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // In a real environment: await fetch('/api/products')
      // Simulate API delay
      setTimeout(() => {
        setProducts([
          { _id: '1', name: 'Industrial Pipe Fittings', price: 45.50, quantity: 150 },
          { _id: '2', name: 'Hydraulic Press', price: 2400.00, quantity: 4 },
          { _id: '3', name: 'Safety Harnesses', price: 89.99, quantity: 42 },
          { _id: '4', name: 'Lubricant Oil (5L)', price: 34.00, quantity: 8 },
        ]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Fetch error:", error);
      setIsLoading(false);
    }
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

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500">Manage, track, and optimize your stock levels.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add Product</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading inventory data...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <i className="fas fa-box-open text-5xl text-slate-300 mb-4"></i>
          <h2 className="text-xl font-semibold text-slate-900">No Products Found</h2>
          <p className="text-slate-500 mb-6">Start by adding your first product to the warehouse.</p>
          <button 
            onClick={() => openModal()}
            className="text-blue-600 font-bold hover:underline"
          >
            Create Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onDelete={handleDelete}
              onEdit={openModal}
            />
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <form onSubmit={handleCreateOrUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Steel Girders"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  {editingProduct ? 'Update Item' : 'Create Item'}
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
