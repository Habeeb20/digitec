import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import PaystackButton from './PaystackButton';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data.items || []);
      calculateTotal(res.data.items || []);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    setTotal(sum);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/remove/${productId}`);
      fetchCart();
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) return <div className="text-center py-20">Loading cart...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-6 bg-white p-6 rounded-3xl shadow"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-2xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{item.product.name}</h3>
                  <p className="text-gray-500">Sold by: {item.product.seller?.name}</p>
                  <p className="text-2xl font-bold mt-2">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-lg font-medium">₦{item.product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Paystack */}
          <div className="mt-12 bg-gray-900 text-white p-8 rounded-3xl">
            <div className="flex justify-between items-center text-3xl font-bold mb-6">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <PaystackButton 
              amount={total * 100} // Paystack expects kobo (₦1 = 100 kobo)
              email="user@example.com" // Replace with actual user email from context/auth
              onSuccess={(reference) => {
                toast.success('Payment successful! Reference: ' + reference);
                // Clear cart or redirect to success page
              }}
              onClose={() => toast('Payment cancelled')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;