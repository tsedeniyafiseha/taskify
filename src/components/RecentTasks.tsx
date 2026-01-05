'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Star, Sparkles, Truck, Wrench, Leaf, Home, Package } from 'lucide-react';
import { tasks } from '@/data/mockData';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const filters = [
  { id: 'all', name: 'All Tasks', icon: Sparkles },
  { id: 'cleaning', name: 'Cleaning', icon: Home },
  { id: 'moving', name: 'Moving', icon: Truck },
  { id: 'handyman', name: 'Handyman', icon: Wrench },
  { id: 'gardening', name: 'Gardening', icon: Leaf },
  { id: 'delivery', name: 'Delivery', icon: Package },
];

export default function RecentTasks() {
  const [activeFilter, setActiveFilter] = useState('all');
  const recentTasks = tasks.slice(0, 6);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-2 text-white"
            >
              Recent Tasks
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-neutral-400"
            >
              See what people are getting done
            </motion.p>
          </div>
          <Link href="/tasks" className="hidden sm:block">
            <button className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
              View all tasks
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Horizontal Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-purple-500/30 hover:text-white'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-neutral-900/50 rounded-2xl overflow-hidden hover:bg-neutral-900 transition-all duration-300 cursor-pointer border border-neutral-800 hover:border-purple-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/30">
                  Open
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">${task.budget}</div>
                  <div className="text-xs text-neutral-500">Budget</div>
                </div>
              </div>

              <h3 className="font-semibold text-xl mb-3 text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                {task.title}
              </h3>

              <p className="text-sm text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
                {task.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4 flex-wrap">
                <div className="flex items-center gap-1 bg-neutral-800/50 px-2 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-neutral-400">{task.location}</span>
                </div>
                <div className="flex items-center gap-1 bg-neutral-800/50 px-2 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-neutral-400">{task.postedAt}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative border-2 border-purple-500/30">
                    <Image
                      src={task.poster.avatar}
                      alt={task.poster.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                    <span>{task.poster.rating}</span>
                  </div>
                </div>
                <span className="text-xs text-neutral-400 font-medium">{task.offers} offers</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/tasks">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all"
            >
              Browse All Tasks
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
