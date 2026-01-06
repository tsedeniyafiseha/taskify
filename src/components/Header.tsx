'use client';

import { Search, Bell, User, Plus, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200' 
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tight text-gray-900">Taskify</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/tasks">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  Browse Tasks
                </motion.div>
              </Link>
              <Link href="/how-it-works">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  How it Works
                </motion.div>
              </Link>
              <Link href="/become-tasker">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  Become a Tasker
                </motion.div>
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className={`hidden lg:flex items-center flex-1 max-w-md mx-8 relative transition-all duration-300 ${searchFocused ? 'max-w-lg' : ''}`}>
            <motion.div 
              animate={{ 
                scale: searchFocused ? 1.02 : 1,
              }}
              className={`w-full flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 transition-all duration-300 border ${
                searchFocused ? 'border-purple-500 ring-2 ring-purple-100' : 'border-transparent hover:border-gray-200'
              }`}
            >
              <Search className={`w-4 h-4 mr-3 flex-shrink-0 transition-colors ${searchFocused ? 'text-purple-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search for tasks..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 text-gray-900"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/post-task">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-purple-700 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Post Task
              </motion.button>
            </Link>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full shadow-lg"
              />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5 text-gray-500" />
            </motion.button>

            <button 
              className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-500" /> : <Menu className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 mb-4">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search for tasks..."
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <nav className="flex flex-col gap-2">
              <Link href="/tasks" className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                Browse Tasks
              </Link>
              <Link href="/how-it-works" className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                How it Works
              </Link>
              <Link href="/become-tasker" className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                Become a Tasker
              </Link>
            </nav>
            <Link href="/post-task" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-2xl text-sm font-semibold hover:bg-purple-700 transition-all">
                <Plus className="w-4 h-4" />
                Post a Task
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
