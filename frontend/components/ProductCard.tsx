
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
            <i className="fas fa-box text-xl"></i>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(product)}
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              onClick={() => onDelete(product._id)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-1">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-4">ID: {product._id.substring(0, 8)}...</p>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Price</span>
            <p className="text-lg font-bold text-slate-900">${product.price.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Stock</span>
            <div className="flex items-center gap-2">
              <p className={`text-lg font-bold ${isLowStock ? 'text-red-600' : 'text-slate-900'}`}>
                {product.quantity}
              </p>
              {isLowStock && (
                <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                  LOW
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-slate-50 flex justify-between items-center">
        <span className="text-xs text-slate-400 italic">Total Value: ${(product.price * product.quantity).toLocaleString()}</span>
        <button className="text-blue-600 text-xs font-semibold hover:underline">View History</button>
      </div>
    </div>
  );
};

export default ProductCard;
