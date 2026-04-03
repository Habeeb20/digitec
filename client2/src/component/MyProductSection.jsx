// client/src/components/dashboard/MyProductsSection.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, ShoppingBag, Plus } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import ProductUploadModal from './ProductModal';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function MyProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch user's products
  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const { data } = await axios.get(`${VITE_BACKEND_URL}/api/marketplace/my-products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load your products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${VITE_BACKEND_URL}/api/marketplace/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Product deleted successfully");
      fetchMyProducts(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowUploadModal(true);
  };

  const handleModalSuccess = () => {
    setEditingProduct(null);
    fetchMyProducts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">My Posted Products</h2>
          <p className="text-slate-400 mt-1">Manage all the items you've listed in the Kingdom Marketplace</p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowUploadModal(true);
          }}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl text-white font-medium transition"
        >
          <Plus size={22} />
          Post New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-16 text-center">
          <ShoppingBag className="mx-auto text-slate-500 mb-6" size={80} />
          <h3 className="text-2xl font-semibold text-white mb-3">No products yet</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            You haven't posted any products yet. Start selling anointed books, apparel, audio messages, and ministry tools.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white font-medium"
          >
            Post Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden group hover:border-indigo-500 transition-all"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="font-semibold text-xl text-white line-clamp-2 mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-3xl font-bold text-emerald-400">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Price</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">
                      Posted on {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-2xl text-white font-medium transition"
                  >
                    <Edit2 size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-950 hover:bg-red-900 py-3 rounded-2xl text-red-400 font-medium transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Product Upload / Edit Modal */}
      <ProductUploadModal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setEditingProduct(null);
        }}
        onSuccess={handleModalSuccess}
        initialData={editingProduct}   // Pass data when editing
      />
    </div>
  );
}