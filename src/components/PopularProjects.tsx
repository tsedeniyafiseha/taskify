'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Furniture Assembly',
    price: 49,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    category: 'assembly'
  },
  {
    id: 2,
    title: 'Mount Art or Shelves',
    price: 65,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop',
    category: 'handyman'
  },
  {
    id: 3,
    title: 'Mount a TV',
    price: 69,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
    category: 'handyman'
  },
  {
    id: 4,
    title: 'Help Moving',
    price: 67,
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&h=400&fit=crop',
    category: 'moving'
  },
  {
    id: 5,
    title: 'Home & Apartment Cleaning',
    price: 49,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    category: 'cleaning'
  },
  {
    id: 6,
    title: 'Minor Plumbing Repairs',
    price: 74,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop',
    category: 'handyman'
  },
  {
    id: 7,
    title: 'Electrical Help',
    price: 69,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop',
    category: 'tech'
  },
  {
    id: 8,
    title: 'Heavy Lifting',
    price: 61,
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&h=400&fit=crop',
    category: 'moving'
  },
];

export default function PopularProjects() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Purple mesh gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Popular Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-400"
          >
            Get help with these common tasks in Christchurch
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <Link key={project.id} href={`/tasks?category=${project.category}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-2xl overflow-hidden hover:purple-glow transition-all duration-500 border border-neutral-800"
              >
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-neutral-400 text-sm">
                      Starting at <span className="font-bold text-2xl text-purple-400">${project.price}</span>
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
                
                {/* Purple glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/tasks">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-semibold hover:from-purple-700 hover:to-purple-900 transition-all shadow-xl purple-glow group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
