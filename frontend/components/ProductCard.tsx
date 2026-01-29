
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  const isLowStock = product.quantity < 10;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl hover:border-indigo-200 transition-all duration-500 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
            isLowStock ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-600'
          }`}>
            <i className={`fas ${isLowStock ? 'fa-triangle-exclamation' : 'fa-box-archive'}`}></i>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(product)}
              className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
              title="Edit"
            >
              <i className="fas fa-pen-to-square text-sm"></i>
            </button>
            <button 
              onClick={() => onDelete(product._id)}
              className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
              title="Delete"
            >
              <i className="fas fa-trash-can text-sm"></i>
            </button>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">UID: {product._id.substring(0, 8)}</p>

        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Market Price</span>
            <span className="text-lg font-bold text-slate-900">${product.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Stock</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-extrabold ${isLowStock ? 'text-rose-600' : 'text-slate-900'}`}>
                {product.quantity}
              </span>
              {isLowStock && (
                <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-1 rounded-lg font-black animate-pulse">
                  LOW
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 flex justify-between items-center border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Inventory Value</span>
          <span className="text-sm font-bold text-indigo-600">${(product.price * product.quantity).toLocaleString()}</span>
        </div>
        <button className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
          LOGS
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
