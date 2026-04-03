import { X, ShoppingCart, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const handleBuyNow = () => {
    // Future payment integration (MTN, Orange, Card)
    toast.success("Payment gateway coming soon! (MTN MoMo, Orange Money & Card supported)");
    // You can later integrate real payment here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left: Image */}
              <div className="lg:w-5/12 relative">
                <div className="aspect-square lg:aspect-auto lg:h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Right: Details */}
              <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col">
                <div className="flex-1">
                  <div className="uppercase tracking-widest text-xs text-indigo-400 mb-2">
                    {product.category}
                  </div>

                  <h1 className="text-3xl font-bold text-white leading-tight mb-6">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-5xl font-bold text-emerald-400">
                      ₦{product.price.toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-sm">Fixed Price</div>
                  </div>

                  {/* Description */}
                  <div className="mb-10">
                    <h3 className="text-slate-400 text-sm font-medium mb-3">DESCRIPTION</h3>
                    <p className="text-slate-300 leading-relaxed">
                      {product.description || 
                        "This powerful kingdom resource will bless your spiritual life and ministry. Carefully selected and anointed for maximum impact."}
                    </p>
                  </div>

                  {/* Seller Information */}
                  <div className="bg-slate-800 rounded-2xl p-6 mb-8">
                    <h3 className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
                      <User size={18} /> Posted By
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {product.seller?.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {product.seller?.name || 'Apostle Godwin Bantar Ministry'}
                        </p>
                        <p className="text-slate-400 text-sm">
                          Kingdom Seller • Christ's Revelation International Church
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      Posted on {new Date(product.createdAt).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition"
                  >
                    <ShoppingCart size={24} />
                    Buy Now - ₦{product.price.toLocaleString()}
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 py-5 border border-slate-600 hover:bg-slate-800 rounded-2xl font-semibold text-lg transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}