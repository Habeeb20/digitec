import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users,  ShoppingBag, TrendingUp } from 'lucide-react';
import ProductUploadModal from './ProductModal';

import { isPrimaryPointer } from 'framer-motion';
export default function Overview({ user }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [stats, setStats] = useState({
    totalPartnership: 1245000,
    totalPrayers: 342,
    productsSold: 87,
    activeMembers: 1243,
  });

  const productStats = [
    { category: 'Books', count: 45, percentage: 52 },
    { category: 'Apparel', count: 18, percentage: 21 },
    { category: 'Audio', count: 15, percentage: 17 },
    { category: 'Tools', count: 9, percentage: 10 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Good morning, {user?.name?.split(' ')[0] || 'Believer'} 🙏</h1>
        <p className="text-slate-400 mt-2">Here's what's happening in your spiritual marketplace today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Partnership', value: `₦${stats.totalPartnership.toLocaleString()}`, icon: DollarSign, color: 'indigo', trend: '+12%' },
          { label: 'Prayer Requests', value: stats.totalPrayers, icon: isPrimaryPointer, color: 'purple', trend: '+8%' },
          { label: 'Products Sold', value: stats.productsSold, icon: ShoppingBag, color: 'emerald', trend: '+23%' },
          { label: 'Kingdom Members', value: stats.activeMembers, icon: Users, color: 'amber', trend: '+5%' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl p-6 hover:border-indigo-500 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-4xl font-bold text-white mt-3">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-500/10 rounded-2xl flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 transition`}>
                <stat.icon size={28} />
              </div>
            </div>
            <div className="mt-6 flex items-center text-emerald-400 text-sm font-medium">
              <TrendingUp size={18} className="mr-1" /> {stat.trend} this month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Product Statistics with Charts */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-700 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-white">Product Performance</h3>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium flex items-center gap-2 transition"
            >
              <ShoppingBag size={20} /> Sell New Product
            </button>
          </div>

          <div className="space-y-8">
            {productStats.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-300">{item.category}</span>
                  <span className="text-white font-medium">{item.count} items • {item.percentage}%</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1.2, delay: index * 0.15 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-700 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6 text-sm">
            {[
              { time: '2h ago', action: 'New prayer request from Sister Aisha', type: 'prayer' },
              { time: 'Yesterday', action: 'You sold "Power of Prayer" book', type: 'sale' },
              { time: '3 days ago', action: 'New partnership of ₦50,000 received', type: 'partnership' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-slate-300">{activity.action}</p>
                  <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Upload Modal */}
      <ProductUploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
        onSuccess={() => {
          // Refresh stats or show toast
          alert("Product uploaded successfully! (Refresh stats in real app)");
        }} 
      />
    </div>
  );
}