'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Get Started Today</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to get things done?
            </h2>
            
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Join thousands of people in Christchurch who are getting their tasks completed quickly and affordably. Post your first task for free and see the difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/post-task">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg group"
                >
                  Post a Task
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href="/become-tasker">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-8 py-4 rounded-full font-semibold hover:border-purple-500 hover:text-purple-600 transition-all text-gray-700"
                >
                  Become a Tasker
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-sm text-gray-500">Tasks completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8★</div>
                <div className="text-sm text-gray-500">Average rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-500">Active taskers</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Category Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Cleaning', tasks: 34 },
                { title: 'Gardening', tasks: 15 },
                { title: 'Handyman', tasks: 22 },
                { title: 'Delivery', tasks: 28 }
              ].map((category, i) => (
                <motion.div
                  key={category.title}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  className={`relative h-64 rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:border-purple-300 transition-all p-6 flex flex-col justify-end ${i === 1 || i === 3 ? 'mt-8' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xl font-bold text-gray-900 mb-1">{category.title}</div>
                    <div className="text-sm text-purple-600">{category.tasks} tasks available</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
