'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    title: '10 Tips for Hiring the Perfect Tasker',
    category: 'Tips & Guides',
    date: 'Jan 2, 2026',
    readTime: '5 min',
  },
  {
    title: 'Spring Cleaning Made Easy',
    category: 'Home Care',
    date: 'Dec 28, 2025',
    readTime: '4 min',
  },
  {
    title: 'Moving House? Here\'s Your Complete Guide',
    category: 'Moving',
    date: 'Dec 25, 2025',
    readTime: '7 min',
  },
  {
    title: 'How to Get the Best Value for Your Tasks',
    category: 'Tips & Guides',
    date: 'Dec 20, 2025',
    readTime: '3 min',
  },
  {
    title: 'Become a Top-Rated Tasker: Success Stories',
    category: 'Community',
    date: 'Dec 15, 2025',
    readTime: '6 min',
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-purple-400 text-sm font-medium mb-2 block"
            >
              Latest Articles
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Tips & Resources
            </motion.h2>
          </div>
          <Link href="#" className="hidden sm:block">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        {/* Article List - Clean Table Style */}
        <div className="border-t border-neutral-800">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group flex items-center justify-between py-6 border-b border-neutral-800 hover:bg-neutral-900/30 -mx-4 px-4 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-6 flex-1 min-w-0">
                {/* Category Tag */}
                <span className="hidden sm:inline-flex px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 whitespace-nowrap">
                  {post.category}
                </span>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                  {post.title}
                </h3>
              </div>

              {/* Meta & Arrow */}
              <div className="flex items-center gap-6 ml-4">
                <span className="hidden md:block text-sm text-neutral-500 whitespace-nowrap">
                  {post.date}
                </span>
                <span className="hidden lg:block text-sm text-neutral-600 whitespace-nowrap">
                  {post.readTime}
                </span>
                <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
