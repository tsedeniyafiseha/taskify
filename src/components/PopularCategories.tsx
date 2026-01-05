'use client';

import { motion } from 'framer-motion';
import { 
  Sparkles, Truck, Wrench, Package, 
  Leaf, Puzzle, Monitor, FileText, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Truck, Wrench, Package,
  Leaf, Puzzle, Monitor, FileText
};

export default function PopularCategories() {
  const displayCategories = categories.filter(c => c.id !== 'all');

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Purple glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800 rounded-full blur-[120px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="glass px-4 py-2 rounded-full text-sm font-semibold text-purple-400 border border-purple-500/30">
                Popular Services
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-3 gradient-text"
            >
              Browse by Category
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-neutral-400"
            >
              Find the perfect help for any task
            </motion.p>
          </div>
          <Link href="/tasks" className="hidden sm:block">
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 glass px-6 py-3 rounded-full font-semibold hover:purple-glow transition-all border border-neutral-800"
            >
              <span className="text-white">View all</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayCategories.map((category, i) => {
            const Icon = iconMap[category.icon];
            
            return (
              <Link key={category.id} href={`/tasks?category=${category.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative glass rounded-3xl overflow-hidden hover:purple-glow transition-all duration-500 cursor-pointer border border-neutral-800 p-6"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-xl purple-glow group-hover:scale-110 transition-transform">
                      {Icon && <Icon className="w-7 h-7 text-white" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-purple-300 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-400 font-medium">{category.count} tasks</p>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="w-5 h-5 text-purple-400" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Trending Badge */}
                  {category.count > 20 && (
                    <div className="absolute top-3 right-3 glass-dark px-2 py-1 rounded-full border border-purple-500/30">
                      <span className="text-xs font-bold text-purple-400">🔥 Hot</span>
                    </div>
                  )}

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
