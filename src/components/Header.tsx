'use client';

import { Search, Bell, User, Plus, Menu, X, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

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
              <Link href="/workers">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  Find Workers
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
            {!loading && (
              <>
                {user ? (
                  <>
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
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
                    </motion.button>
                    
                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-purple-600">
                            {profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      </motion.button>

                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">{profile?.full_name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              {profile?.is_worker ? 'Worker' : 'Poster'}
                            </span>
                          </div>
                          
                          <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}>
                            <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </div>
                          </Link>
                          
                          <Link href="/settings" onClick={() => setUserMenuOpen(false)}>
                            <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <Settings className="w-4 h-4" />
                              Settings
                            </div>
                          </Link>

                          {profile?.is_admin && (
                            <Link href="/admin" onClick={() => setUserMenuOpen(false)}>
                              <div className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" />
                                Admin Panel
                              </div>
                            </Link>
                          )}
                          
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button
                              onClick={handleSignOut}
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Sign in
                      </motion.button>
                    </Link>
                    <Link href="/auth/signup">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-purple-700 transition-all shadow-sm"
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </>
                )}
              </>
            )}

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
              <Link href="/workers" className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                Find Workers
              </Link>
              <Link href="/how-it-works" className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                How it Works
              </Link>
              <Link href="/become-tasker" className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                Become a Tasker
              </Link>
            </nav>
            
            {!loading && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full mb-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl">
                        Dashboard
                      </button>
                    </Link>
                    <Link href="/post-task" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-xl text-sm font-semibold">
                        <Plus className="w-4 h-4" />
                        Post a Task
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full mb-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl">
                        Sign in
                      </button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-xl text-sm font-semibold">
                        Get Started
                      </button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
