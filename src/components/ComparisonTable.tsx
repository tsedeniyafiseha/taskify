'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const features = [
  { name: 'Post unlimited tasks', taskify: true, traditional: false },
  { name: 'Get multiple quotes', taskify: true, traditional: false },
  { name: 'Secure payment protection', taskify: true, traditional: false },
  { name: 'Verified tasker profiles', taskify: true, traditional: false },
  { name: 'Real-time messaging', taskify: true, traditional: true },
  { name: 'Review and rating system', taskify: true, traditional: true },
  { name: 'Insurance coverage', taskify: true, traditional: false },
  { name: 'Flexible scheduling', taskify: true, traditional: false },
  { name: 'No subscription fees', taskify: true, traditional: false },
  { name: '24/7 customer support', taskify: true, traditional: false },
];

export default function ComparisonTable() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Why Taskify Stands Out
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-400"
          >
            See how we compare to traditional service providers
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl shadow-xl border border-neutral-800 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-neutral-900/50 border-b border-neutral-800">
            <div className="font-semibold text-white">Features</div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-sm font-bold purple-glow">
                Taskify
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-neutral-800 text-neutral-400 rounded-full text-sm font-medium">
                Traditional
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral-800">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4 p-6 hover:bg-neutral-900/30 transition-colors"
              >
                <div className="text-neutral-300 font-medium">{feature.name}</div>
                <div className="flex justify-center">
                  {feature.taskify ? (
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <Check className="w-5 h-5 text-purple-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-neutral-600" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {feature.traditional ? (
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <Check className="w-5 h-5 text-purple-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-neutral-600" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center">
            <p className="text-lg font-semibold mb-4">Ready to experience the difference?</p>
            <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-neutral-100 transition-colors shadow-xl">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
