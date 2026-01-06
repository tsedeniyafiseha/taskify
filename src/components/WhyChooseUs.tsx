'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Quick & Easy',
    description: 'Post a task in minutes and get offers from skilled Taskers instantly.'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your payments are protected until the job is done to your satisfaction.'
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'All Taskers are rated and reviewed by the community.'
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight"
          >
            Built for everyone
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            Whether you need help or want to earn, Taskify makes it simple
          </motion.p>
        </div>

        {/* Features Grid - Clean and Minimal */}
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 group-hover:bg-purple-200 group-hover:border-purple-300 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
