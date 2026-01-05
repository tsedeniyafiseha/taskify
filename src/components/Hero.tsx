'use client';

import { Search, ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

const floatingElements = [
  { icon: Sparkles, label: 'Cleaning', price: '$180', color: 'from-blue-500 to-cyan-500', position: 'top-20 left-[10%]', delay: 0 },
  { icon: TrendingUp, label: 'Moving', price: '$350', color: 'from-purple-500 to-pink-500', position: 'top-32 right-[15%]', delay: 0.2 },
  { icon: Users, label: 'Handyman', price: '$120', color: 'from-orange-500 to-red-500', position: 'bottom-32 left-[15%]', delay: 0.4 },
  { icon: Zap, label: 'Delivery', price: '$95', color: 'from-green-500 to-emerald-500', position: 'bottom-24 right-[12%]', delay: 0.6 },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-neutral-200/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-neutral-200/40 to-transparent rounded-full blur-3xl" />
      
      {/* Floating cards */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {floatingElements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: item.delay + 0.5, duration: 0.6, type: "spring" }}
            className={`absolute ${item.position} z-10`}
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                delay: item.delay,
                ease: "easeInOut"
              }}
              className="glass hover-lift rounded-2xl p-5 min-w-[180px] cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{item.label}</div>
                  <div className="text-xs text-neutral-500">Just posted</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-black">{item.price}</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-400 border-2 border-white" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">+12 offers</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-36">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 glass-dark text-white px-6 py-2.5 rounded-full text-sm font-medium mb-10 shadow-xl"
          >
            <motion.span 
              className="relative flex h-2.5 w-2.5"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </motion.span>
            <span className="font-semibold">Christchurch&apos;s #1 Task Marketplace</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get anything
              </motion.span>
              <br />
              <motion.span 
                className="inline-block gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                done today
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with skilled locals in Christchurch. Post tasks, get offers, and get things done—all in one place.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex flex-col sm:flex-row gap-3 bg-white rounded-3xl p-2 shadow-2xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-hover:text-black transition-colors" />
                  <input
                    type="text"
                    placeholder="What do you need done?"
                    className="w-full pl-14 pr-6 py-5 text-lg bg-transparent outline-none placeholder:text-neutral-400"
                  />
                </div>
                <Link href="/post-task">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden w-full sm:w-auto px-10 py-5 bg-black text-white rounded-2xl text-lg font-semibold shadow-xl group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-black opacity-0 group-hover/btn:opacity-100 transition-opacity" />
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
            className="flex flex-wrap items-center justify-center gap-8 text-sm mb-16"
          >
            {[
              { icon: CheckCircle2, text: 'Free to post', color: 'text-emerald-600' },
              { icon: CheckCircle2, text: 'Secure payments', color: 'text-blue-600' },
              { icon: CheckCircle2, text: 'Verified taskers', color: 'text-purple-600' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2 glass px-4 py-2 rounded-full"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium text-neutral-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/tasks">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all"
              >
                Browse Tasks
              </motion.button>
            </Link>
            <Link href="/become-tasker">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-neutral-600 hover:text-black font-semibold transition-colors flex items-center gap-2"
              >
                Earn as a Tasker
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative animated-gradient text-white py-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50,000+', label: 'Tasks Completed', icon: CheckCircle2 },
              { value: '2,500+', label: 'Active Taskers', icon: Users },
              { value: '15,000+', label: 'Happy Customers', icon: Sparkles },
              { value: '4.8★', label: 'Average Rating', icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-neutral-300 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
