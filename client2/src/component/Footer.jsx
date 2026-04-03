import React from 'react';
import { Heart,  Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">G</span>
              </div>
              <span className="text-3xl font-semibold tracking-tight text-white">ConvenantHub</span>
            </div>
            
            <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-8">
              Building the future with beautiful design and powerful functionality. 
              Join thousands of users who love our platform.
            </p>

            <div className="flex items-center gap-4">
           
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
            <ul className="space-y-4">
              <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="/changelog" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>

            {/* Newsletter */}
            <div className="mt-10">
              <h4 className="text-white font-medium mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-l-2xl focus:outline-none focus:border-blue-500 w-full placeholder-gray-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-2xl font-medium transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            © {currentYear} YourApp. Made with 
            <Heart className="text-red-500" size={16} fill="currentColor" /> 
            for the web.
          </div>

          <div className="mt-4 md:mt-0 text-gray-500 text-center">
            All rights reserved • Built with ❤️ using React & Tailwind
          </div>

          <div className="mt-4 md:mt-0 flex gap-6 text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Status</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;