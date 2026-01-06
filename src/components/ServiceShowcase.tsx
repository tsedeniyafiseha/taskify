'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Home, Truck, Leaf } from 'lucide-react';
import Link from 'next/link';

const services = [
  { icon: Home, name: 'Home Services', count: '2,400+' },
  { icon: Truck, name: 'Moving & Delivery', count: '1,800+' },
  { icon: Leaf, name: 'Outdoor & Garden', count: '1,200+' },
];

export default function ServiceShowcase() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight"
          >
            Services for every need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            From home repairs to garden care, find skilled help for any task
          </motion.p>
        </div>

        {/* Simple list of services */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 mb-6 group-hover:bg-purple-200 group-hover:border-purple-300 transition-all">
                <service.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-500 text-lg">{service.count} tasks available</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/tasks">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-semibold hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all text-lg"
            >
              Browse all services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
