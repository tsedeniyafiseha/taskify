'use client';

import { motion } from 'framer-motion';
import { FileText, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { 
    icon: FileText, 
    title: 'Post your task', 
    description: 'Tell us what you need done, when and where.' 
  },
  { 
    icon: Users, 
    title: 'Get offers', 
    description: 'Receive offers from skilled Taskers in minutes.' 
  },
  { 
    icon: CheckCircle, 
    title: 'Get it done', 
    description: 'Choose the best Tasker and get your task completed.' 
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How Taskify Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-neutral-400 max-w-xl mx-auto"
          >
            Getting things done has never been easier
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl flex items-center justify-center mx-auto purple-glow">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold border-2 border-black">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-neutral-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/how-it-works">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500 text-purple-400 rounded-full font-medium hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all purple-glow">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
