// client/src/pages/Home.jsx
import { motion } from 'framer-motion';
import { ShoppingBag, Users,  Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../component/ProductCard';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function Home() {
  // Sample products (in real app, fetch from /api/marketplace)
  const featuredProducts = [
    {
      _id: 1,
      name: "The Power of Prevailing Prayer",
      price: 8500,
      image: "https://res.cloudinary.com/digzrkdoe/image/upload/v1/covenant-hub/books/prayer-book",
      category: "Books"
    },
    {
      _id: 2,
      name: "Anointed Worship T-Shirt",
      price: 6500,
      image: "https://res.cloudinary.com/digzrkdoe/image/upload/v1/covenant-hub/merch/worship-shirt",
      category: "Apparel"
    },
    {
      _id: 3,
      name: "Revival Fire Audio Series",
      price: 12000,
      image: "https://res.cloudinary.com/digzrkdoe/image/upload/v1/covenant-hub/audio/revival-fire",
      category: "Audio"
    },
  ];

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      {/* HERO SECTION */}
      <Navbar/>
      <section className="hero-bg min-h-screen flex items-center relative">
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium tracking-widest">REVIVAL IS HERE</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tighter mb-6">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CovenantHub</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl">
                A spiritual marketplace connecting believers through prayer, partnership, and kingdom resources.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/auth" 
                  className="px-10 py-4 bg-white text-slate-900 font-semibold rounded-2xl hover:bg-slate-100 transition text-lg"
                >
                  Join the Movement
                </Link>
                <Link 
                  to="/marketplace" 
                  className="px-10 py-4 border-2 border-white/70 hover:border-white font-semibold rounded-2xl transition text-lg flex items-center gap-3"
                >
                  <ShoppingBag size={22} /> Explore Marketplace
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-xs tracking-widest text-slate-400 mb-2">SCROLL TO DISCOVER</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT APOSTLE SECTION */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold leading-tight mb-8">
                Led by Apostle<br />
                <span className="text-indigo-400">Godwin BANTAR</span>
              </h2>
              <div className="prose prose-invert text-slate-300 text-lg leading-relaxed">
                <p>
                  Apostle Godwin Bantar is a Cameroonian purpose-driven leader from Nkambe, Donga Mantung Division in the North West Region. 
                  A called and ordained servant of God serving in the apostolic office.
                </p>
                <p>
                  He is the founder of <strong>Christ's Revelation International Church</strong> with headquarters in Yaoundé, Cameroon. 
                  He is passionately driven by the spirit of revival and has a deep compassion for the less privileged.
                </p>
              </div>
              <Link 
                to="/about" 
                className="inline-block mt-8 text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2"
              >
                Read Full Story →
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl overflow-hidden border border-slate-700">
                <img 
                  src="https://via.placeholder.com/600x600/4f46e5/ffffff?text=Apostle+Godwin+Bantar" 
                  alt="Apostle Godwin Bantar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-[260px]">
                <p className="italic text-slate-400">"Revival is not coming — Revival is here through the power of the Holy Spirit."</p>
                <p className="mt-4 text-indigo-400 font-medium">- Apostle Godwin Bantar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE SECTION - Featured Products */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-3">Kingdom Marketplace</h2>
              <p className="text-slate-400 text-xl">Resources to strengthen your faith and ministry</p>
            </div>
            <Link 
              to="/marketplace" 
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2"
            >
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/marketplace" 
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 px-10 py-4 rounded-2xl text-white font-semibold transition"
            >
              Explore Full Marketplace <ShoppingBag />
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-br from-indigo-950 to-purple-950">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">Be Part of the Revival</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Whether through prayer, partnership, or resources — your contribution matters in God's kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth" className="px-12 py-5 bg-white text-slate-900 font-bold rounded-2xl text-lg">Join Now</Link>
            <Link to="/partnership" className="px-12 py-5 border-2 border-white/70 hover:bg-white/10 font-bold rounded-2xl text-lg">Become a Partner</Link>
          </div>
        </div>
     
      </section>
         <Footer />
    </div>
  );
}