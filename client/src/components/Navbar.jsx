import { useState } from 'react';
import { Menu, X,  ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-stone-950/95 backdrop-blur-md border-b border-amber-900 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-stone-950 text-3xl">💎</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-white">BASIL</h1>
              <p className="text-[10px] text-amber-400 -mt-1 tracking-[2px]">BEAD ARTIST</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-widest text-stone-300">
            <button onClick={() => scrollToSection('home')} className="hover:text-amber-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-amber-400 transition-colors">About Us</button>
            <button onClick={() => scrollToSection('biography')} className="hover:text-amber-400 transition-colors">Biography</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">Contact</button>
          </div>

          <div className="flex items-center gap-4">
         
            
            <button className="hidden sm:flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-6 py-3 rounded-3xl font-semibold text-sm uppercase tracking-wider transition-all">
              <ShoppingBag size={18} />
              Shop Now
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-3xl text-amber-400"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-amber-900">
            <div className="flex flex-col gap-6 text-center text-lg font-medium">
              <button onClick={() => scrollToSection('home')} className="py-3 hover:text-amber-400">Home</button>
              <button onClick={() => scrollToSection('about')} className="py-3 hover:text-amber-400">About Us</button>
              <button onClick={() => scrollToSection('biography')} className="py-3 hover:text-amber-400">Biography</button>
              <button onClick={() => scrollToSection('contact')} className="py-3 hover:text-amber-400">Contact Us</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;