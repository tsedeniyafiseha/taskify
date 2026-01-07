'use client';

import { Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSimple() {
  return (
    <section className="relative bg-white overflow-hidden min-h-[70vh] flex items-center">
      {/* Bold purple gradient background effects */}
      <div className="absolute inset-0">
        {/* Main purple glow - center */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600 rounded-full blur-[150px]"
        />
        {/* Top right accent */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-purple-700 rounded-full blur-[100px]"
        />
        {/* Bottom left accent */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-purple-800 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-6 py-2.5 rounded-full text-sm font-medium mb-8"
          >
            <motion.span 
              className="relative flex h-2.5 w-2.5"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </motion.span>
            <span className="font-semibold text-gray-700">New Zealand&apos;s Local Task Marketplace</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <motion.span 
                className="inline-block text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get your tasks done
              </motion.span>
              <br />
              <motion.span 
                className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                by trusted locals
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with skilled workers in Christchurch and Auckland. Post tasks, get offers, and get things done—all in one place.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative flex flex-col sm:flex-row gap-3 bg-white border border-gray-200 rounded-3xl p-2 shadow-lg">
                <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="What do you need done?"
                    className="w-full pl-14 pr-6 py-5 text-lg bg-transparent outline-none placeholder:text-gray-400 text-gray-900"
                  />
                </div>
                <Link href="/post-task">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden w-full sm:w-auto px-10 py-5 bg-purple-600 text-white rounded-2xl text-lg font-semibold shadow-lg group/btn hover:bg-purple-700 transition-colors"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm"
          >
            {[
              { icon: CheckCircle2, text: 'Free to post' },
              { icon: CheckCircle2, text: 'Secure payments' },
              { icon: CheckCircle2, text: 'Verified workers' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full"
              >
                <item.icon className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-gray-600">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
