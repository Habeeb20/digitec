import { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductDetailModal from './ProductDetails';


export default function ProductCard({ product }) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden hover:border-indigo-500 transition-all duration-300"
      >
        {/* Product Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full">
            {product.category}
          </div>

          {/* Quick View Button */}
          <button
            onClick={() => setShowDetailModal(true)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          >
            <Eye size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="font-semibold text-xl text-white line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-3xl font-bold">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">Fixed Price</p>
            </div>

            <div className="text-right text-xs text-slate-400">
              By <span className="text-indigo-400">{product.seller?.name || 'Kingdom Seller'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setShowDetailModal(true)}
              className="flex-1 py-3.5 border border-slate-600 hover:border-slate-400 text-white rounded-2xl font-medium transition flex items-center justify-center gap-2"
            >
              <Eye size={18} />
              View Details
            </button>

            <button
              className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-medium transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={product}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}