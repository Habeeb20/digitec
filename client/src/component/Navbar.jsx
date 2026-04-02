'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage changes (in case login/logout happens in another tab)
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Optional: remove other user data
    // localStorage.removeItem('user');
    setIsLoggedIn(false);
    // You can also redirect to home or login page
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="font-semibold text-2xl tracking-tight">YourApp</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="/market" className="text-gray-600 hover:text-gray-900 transition-colors">
              Marketplace
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <User size={18} />
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="auth"
                  className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Login
                </a>
                <a
                  href="/auth"
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <a href="/" className="text-gray-600 hover:text-gray-900 py-2">Home</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 py-2">About</a>
              <a href="/market" className="text-gray-600 hover:text-gray-900 py-2">Marketplace</a>

              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <a
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <User size={18} />
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/auth"
                      className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl text-center transition-colors"
                    >
                      Login
                    </a>
                    <a
                      href="/auth"
                      className="px-5 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-center transition-colors"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;