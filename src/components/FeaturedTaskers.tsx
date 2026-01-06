'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle2, ArrowRight, Award, TrendingUp } from 'lucide-react';
import { featuredTaskers } from '@/data/mockData';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedTaskers() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-purple-100 border border-purple-200 px-4 py-2 rounded-full text-sm font-semibold text-purple-700 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Top Rated
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-3 gradient-text"
            >
              Featured Taskers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-500"
            >
              Trusted professionals in Christchurch
            </motion.p>
          </div>
          <Link href="/become-tasker" className="hidden sm:block">
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg"
            >
              Become a Tasker
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTaskers.map((tasker, i) => (
            <motion.div
              key={tasker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-200 p-6"
            >
              {/* Top Badge */}
              {tasker.completionRate > 95 && (
                <div className="absolute top-4 right-4 bg-purple-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-purple-200">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs font-bold text-purple-700">Top Rated</span>
                </div>
              )}

              {/* Avatar */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-purple-100 shadow-lg">
                    <Image
                      src={tasker.avatar}
                      alt={tasker.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {tasker.verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Rating */}
              <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                {tasker.name}
              </h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{tasker.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {tasker.reviews} reviews
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
                {tasker.description}
              </p>

              {/* Completion Rate */}
              <div className="bg-gray-50 rounded-2xl p-3 mb-5 border border-gray-100">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Completion Rate</span>
                  <span className="font-bold text-gray-900">{tasker.completionRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tasker.completionRate}%` }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-purple-600 rounded-full"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {tasker.specialties.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 hover:bg-purple-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* View Profile Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-purple-600 text-white rounded-2xl font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                View Profile
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
