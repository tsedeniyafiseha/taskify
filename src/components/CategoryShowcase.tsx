'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Cleaning', tasks: 34 },
  { name: 'Gardening', tasks: 15 },
  { name: 'Handyman', tasks: 22 },
  { name: 'Delivery', tasks: 28 },
];

export default function CategoryShowcase() {
  return (
    <section className="relative bg-black overflow-hidden py-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-black" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 bg-purple-500/10 border border-purple-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-purple-400">Get Started Today</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.1]"
            >
              Ready to get things done?
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-lg"
            >
              Join thousands of people in Christchurch who are getting their tasks completed quickly and affordably. Post your first task for free and see the difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/post-task">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-7 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all"
                >
                  Post a Task
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/become-tasker">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-7 py-4 bg-white/5 border border-neutral-800 text-white rounded-full font-semibold hover:bg-white/10 hover:border-neutral-700 transition-all"
                >
                  Become a Tasker
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-10"
            >
              <div>
                <div className="text-2xl font-bold text-white">50,000+</div>
                <div className="text-sm text-neutral-500">Tasks completed</div>
              </div>
              <div className="w-px h-10 bg-neutral-800" />
              <div>
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-sm text-neutral-500">Average rating</div>
              </div>
              <div className="w-px h-10 bg-neutral-800" />
              <div>
                <div className="text-2xl font-bold text-white">2,500+</div>
                <div className="text-sm text-neutral-500">Active taskers</div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Category Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, i) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group ${i === 1 || i === 3 ? 'mt-8' : ''}`}
                  style={{ height: i === 0 || i === 1 ? '200px' : '180px' }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40" />
                  
                  {/* Border */}
                  <div className="absolute inset-0 border border-purple-500/10 rounded-2xl group-hover:border-purple-500/30 transition-colors" />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-purple-300/70">{category.tasks} tasks available</p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
