'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Users, CheckCircle, CreditCard, Shield, Star, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posterSteps = [
  { icon: FileText, title: 'Post your task', description: 'Describe what you need done, set your budget, and post it for free.' },
  { icon: Users, title: 'Review offers', description: 'Receive offers from skilled Taskers. Compare profiles, reviews, and prices.' },
  { icon: MessageSquare, title: 'Chat & hire', description: 'Message Taskers to discuss details, then hire the best fit for your task.' },
  { icon: CheckCircle, title: 'Get it done', description: 'Your Tasker completes the job. Release payment when you\'re satisfied.' },
];

const taskerSteps = [
  { icon: Users, title: 'Create your profile', description: 'Sign up, list your skills, and tell people what makes you great.' },
  { icon: FileText, title: 'Browse tasks', description: 'Find tasks that match your skills and availability in Christchurch.' },
  { icon: MessageSquare, title: 'Make offers', description: 'Send competitive offers and chat with task posters to win jobs.' },
  { icon: CreditCard, title: 'Get paid', description: 'Complete tasks and receive secure payments directly to your account.' },
];

const features = [
  { icon: Shield, title: 'Secure Payments', description: 'Money is held securely until the task is completed to your satisfaction.' },
  { icon: Star, title: 'Verified Reviews', description: 'Real ratings from real people help you make informed decisions.' },
  { icon: CheckCircle, title: 'Insurance Coverage', description: 'Taskers are covered by liability insurance for most task activities.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-black relative overflow-hidden">
          {/* Purple glow effects */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800 rounded-full blur-[120px] opacity-20" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              How Taskify Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neutral-400 max-w-2xl mx-auto"
            >
              Whether you need help or want to earn, Taskify makes it simple to connect with people in Christchurch.
            </motion.p>
          </div>
        </section>

        {/* For Task Posters */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm font-medium rounded-full mb-4 purple-glow">
                For Task Posters
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Get anything done</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {posterSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-5xl font-bold text-purple-900/30 mb-4">{i + 1}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl flex items-center justify-center mb-4 purple-glow">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-neutral-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/post-task">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-semibold hover:from-purple-700 hover:to-purple-900 transition-all purple-glow">
                  Post a Task
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Taskers */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 glass border border-purple-500/30 text-purple-400 text-sm font-medium rounded-full mb-4">
                For Taskers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Earn on your terms</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {taskerSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-5xl font-bold text-purple-900/30 mb-4">{i + 1}</div>
                  <div className="w-12 h-12 glass border border-purple-500/30 text-purple-400 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-neutral-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/become-tasker">
                <button className="inline-flex items-center gap-2 px-8 py-4 glass border border-purple-500 text-purple-400 rounded-full font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                  Become a Tasker
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trust & Safety</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Your safety is our priority. We&apos;ve built features to protect both task posters and Taskers.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-8 text-center border border-neutral-800 hover:purple-glow transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to get started?</h2>
            <p className="text-neutral-400 mb-8">
              Join thousands of people in Christchurch using Taskify every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/post-task">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-semibold hover:from-purple-700 hover:to-purple-900 transition-all purple-glow">
                  Post a Task
                </button>
              </Link>
              <Link href="/become-tasker">
                <button className="px-8 py-4 glass border border-purple-500 text-purple-400 rounded-full font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                  Become a Tasker
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
