import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ShoppingCart, User, Star } from 'lucide-react';
import Navbar from '../component/Navbar';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/marketplace/`); // Your existing route
      setProducts(res.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,{
        headers: { Authorization: `Bearer ${token}` }
       },
      {
        productId: product._id,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Discover Our Products</h1>
        <div className="text-gray-500">Shop with confidence • Secure payments</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
                ₦{product.price.toLocaleString()}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-500">4.8</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {product.description || 'Premium quality product'}
              </p>

              {/* Seller Info */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{product.seller?.name}</p>
                  <p className="text-xs text-gray-500">{product.seller?.email}</p>
                </div>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  
  );
};

export default ProductsPage;