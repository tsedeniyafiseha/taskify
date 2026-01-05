'use client';

import { Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const quickTasks = [
  { name: 'General Furniture Assembly', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
  { name: 'IKEA Assembly', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=200&fit=crop' },
  { name: 'Crib Assembly', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop' },
  { name: 'Bookshelf Assembly', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=200&h=200&fit=crop' },
  { name: 'Desk Assembly', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop' },
];

export default function HeroTaskRabbit() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-50" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            >
              Book trusted help
              <br />
              <span className="text-neutral-400">for home tasks</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-neutral-600 mb-8 leading-relaxed"
            >
              Same day service. Vetted Taskers. Happiness Pledge.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-neutral-200">
                  <Search className="absolute left-6 w-6 h-6 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="What do you need help with?"
                    className="w-full pl-16 pr-6 py-5 text-lg bg-transparent outline-none placeholder:text-neutral-400 rounded-2xl"
                  />
                  <Link href="/tasks">
                    <button className="absolute right-2 px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-sm text-neutral-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Vetted Taskers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Same Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Happiness Pledge</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Quick Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickTasks.map((task, i) => (
                <motion.div
                  key={task.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <Image
                    src={task.image}
                    alt={task.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-semibold leading-tight">
                      {task.name}
                    </p>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-neutral-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">50,000+</div>
                  <div className="text-sm text-neutral-500">Tasks completed</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '3.4 million+', label: 'Furniture Assemblies' },
              { value: '1.5 million+', label: 'Moving tasks' },
              { value: '1 million+', label: 'Items mounted' },
              { value: '890,000+', label: 'Homes cleaned' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-neutral-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
