// client/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, isPrimaryPointer } from 'framer-motion';
import { 
  Home, Users, ShoppingBag,  Award, LogOut, 
  Menu, X, Bell, User 
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Overview from '../component/Overview';
import MyProductsSection from './../component/MyProductSection';


const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'marketplace', label: 'My products', icon: ShoppingBag },
  { id: 'prayer', label: 'Prayer Requests', icon: isPrimaryPointer },
  { id: 'partnership', label: 'Partnership', icon: Users },
  { id: 'school', label: 'Leadership School', icon: Award },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login first");
      navigate('/auth');
      return;
    }

    // Decode token to get basic user info (you can also fetch /api/auth/me)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        name: "Believer", // Replace with real data from backend if needed
        email: "user@covenanthub.com",
        signupType: "partnership"
      });
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/auth');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully");
    navigate('/auth');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview user={user} />;
      case 'marketplace':
        return <MyProductsSection />;
    //   case 'prayer':
    //     return <PrayerSection />;
    //   case 'partnership':
    //     return <PartnershipSection />;
    //   case 'school':
    //     return <SchoolSection />;
      case 'profile':
        return <ProfileSection user={user} />;
      default:
        return <Overview user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex w-72 bg-slate-900 border-r border-slate-700 flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
              🙏
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tighter">CovenantHub</h1>
              <p className="text-xs text-slate-400">Kingdom Community</p>
            </div>
          </div>
        </div>

        <div className="flex-1 py-8 px-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={22} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-950/50 rounded-2xl transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/70" onClick={() => setIsSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="lg:hidden fixed top-0 left-0 h-full w-72 bg-slate-900 z-50 flex flex-col"
          >
            {/* Same sidebar content as desktop */}
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                  🙏
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tighter">CovenantHub</h1>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={28} className="text-slate-300" />
              </button>
            </div>

            <div className="flex-1 py-8 px-4">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all ${
                        isActive 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Icon size={22} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 border-t border-slate-700">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-950/50 rounded-2xl transition">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-slate-900 border-b border-slate-700 h-16 flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              <Menu size={28} />
            </button>
            <h2 className="text-2xl font-semibold text-white capitalize">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="text-slate-300 hover:text-white cursor-pointer" size={24} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-medium">3</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-white font-medium text-sm">{user?.name}</p>
                <p className="text-slate-400 text-xs">{user?.email}</p>
              </div>
              <div className="w-9 h-9 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-auto bg-slate-950 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}