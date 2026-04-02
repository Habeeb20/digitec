// client/src/pages/Auth.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const signupOptions = [
  {
    id: 'partnership',
    title: "Kingdom Partnership",
    desc: "Support the vision with monthly giving",
    icon: "🤝",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 'distant-prayer',
    title: "One-on-One Distant Prayer",
    desc: "Book personal prayer sessions",
    icon: "🙏",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: 'prayer-request',
    title: "Submit Prayer Request",
    desc: "Share your prayer needs with us",
    icon: "📝",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    signupType: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupTypeSelect = (type) => {
    setSelectedType(type);
    setFormData({ ...formData, signupType: type });
    setIsLogin(false); // Switch to signup mode when type is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin 
        ? `${VITE_BACKEND_URL}/api/auth/login` 
        : `${VITE_BACKEND_URL}/api/auth/register`;

      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            signupType: formData.signupType 
          };

      const { data } = await axios.post(url, payload);

      localStorage.setItem('token', data.token);
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');

      // Redirect to dashboard
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(129,140,248,0.15),transparent)]" />

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Beautiful Branding */}
        <div className="hidden md:flex flex-col justify-center text-white pr-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center text-5xl shadow-xl">
              🙏
            </div>
            <h1 className="text-6xl font-bold tracking-tighter">CovenantHub</h1>
          </div>

          <h2 className="text-5xl font-semibold leading-tight mb-6 faith-glow">
            Connect. Pray.<br />Partner. Grow.
          </h2>
          <p className="text-xl text-indigo-200 max-w-md">
            A spiritual community where faith meets fellowship, prayer meets power, and partnership meets purpose.
          </p>

          <div className="mt-12 text-sm text-indigo-300">
            Trusted by thousands of believers worldwide
          </div>
        </div>

        {/* Right Side - Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? 'Welcome Back' : 'Join the Family'}
            </h2>
            <p className="text-indigo-200 mt-2">
              {isLogin 
                ? 'Sign in to continue your spiritual journey' 
                : 'Choose how you want to connect with us'}
            </p>
          </div>

          {/* Toggle Login / Signup */}
          <div className="flex bg-white/10 rounded-full p-1 mb-8">
            <button
              onClick={() => { setIsLogin(true); setSelectedType(null); }}
              className={`flex-1 py-3 text-sm font-medium rounded-full transition-all ${isLogin ? 'bg-white text-slate-900 shadow' : 'text-white'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-medium rounded-full transition-all ${!isLogin ? 'bg-white text-slate-900 shadow' : 'text-white'}`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!isLogin && !selectedType ? (
              // Signup Type Selection
              <motion.div
                key="type-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4"
              >
                {signupOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSignupTypeSelect(option.id)}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl p-6 cursor-pointer transition-all flex gap-5 items-center"
                  >
                    <div className={`w-14 h-14 flex-shrink-0 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-4xl transition-transform group-hover:rotate-12`}>
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">{option.title}</h3>
                      <p className="text-indigo-200 text-sm mt-1">{option.desc}</p>
                    </div>
                    <ArrowRight className="ml-auto text-white/40 group-hover:text-white transition" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Login or Signup Form
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {!isLogin && (
                  <div>
                    <label className="text-white/80 text-sm block mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-indigo-300" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-indigo-400 transition"
                        placeholder="Pastor John Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-white/80 text-sm block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-indigo-300" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-indigo-400 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-sm block mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-indigo-300" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-indigo-400 transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'} 
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {isLogin && (
                  <p className="text-center text-white/60 text-sm">
                    Don't have an account?{' '}
                    <span onClick={() => setIsLogin(false)} className="text-indigo-400 cursor-pointer hover:underline">
                      Sign up
                    </span>
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
    </>

  
  );
}