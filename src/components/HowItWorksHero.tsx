'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, CheckCircle, Clock, Users } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Describe what you need done',
    description: 'Tell us what you need. It only takes 2 minutes to post a task.'
  },
  {
    number: '2',
    title: 'Set your budget',
    description: 'Choose how much you want to pay and when you need it done.'
  },
  {
    number: '3',
    title: 'Receive quotes and pick the best Tasker',
    description: 'Get offers from trusted Taskers and hire the perfect person for the job.'
  },
];

export default function HowItWorksHero() {
  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all">
              <Image
                src="/hero-categories.png"
                alt="Taskify Categories"
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Top-right floating badge - Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute top-6 right-6 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.8★</div>
                    <div className="text-sm text-gray-500">Avg. Rating</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-left floating badge - Tasks completed */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-500">Tasks Done</div>
                  </div>
                </div>
              </motion.div>

              {/* Top-left floating badge - Response time */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-4 left-4 bg-purple-600 rounded-full px-3 py-1.5 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-semibold text-white">Avg. 5 min response</span>
                </div>
              </motion.div>

              {/* Bottom-right floating badge - Active taskers */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute bottom-4 right-4 bg-purple-600 rounded-full px-3 py-1.5 shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-semibold text-white">2,500+ Taskers online</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - How it works */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            >
              Post your first task in seconds
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-500 mb-10"
            >
              Save yourself hours and get your to-do list completed
            </motion.p>

            {/* Steps */}
            <div className="space-y-6 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/post-task">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-all shadow-lg group"
              >
                Post your task
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
