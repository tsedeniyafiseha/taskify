'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle, Clock, DollarSign } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Your data is protected with bank-level encryption',
    color: 'from-purple-500 to-purple-700'
  },
  {
    icon: Lock,
    title: 'Safe Payments',
    description: 'Money held securely until task completion',
    color: 'from-purple-600 to-purple-800'
  },
  {
    icon: Award,
    title: 'Verified Taskers',
    description: 'All taskers are background checked',
    color: 'from-purple-500 to-purple-700'
  },
  {
    icon: CheckCircle,
    title: 'Quality Guaranteed',
    description: 'Get your money back if not satisfied',
    color: 'from-purple-600 to-purple-800'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our team is here to help anytime',
    color: 'from-purple-500 to-purple-700'
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Compare quotes and choose the best',
    color: 'from-purple-600 to-purple-800'
  },
];

export default function TrustBadges() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Why Choose Taskify?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-neutral-400 max-w-2xl mx-auto"
          >
            Your safety and satisfaction are our top priorities
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group relative glass rounded-2xl p-6 hover:purple-glow transition-all duration-300 border border-neutral-800"
            >
              {/* Icon */}
              <div className="relative mb-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className={`relative w-14 h-14 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <badge.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg mb-2 text-white">{badge.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
