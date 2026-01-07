'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Users, CheckCircle, CreditCard, Shield, Star, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posterSteps = [
  { icon: FileText, title: 'Post your task', description: 'Describe what you need done, set your budget, and submit for approval.' },
  { icon: Users, title: 'Get approved', description: 'Admin reviews your task to ensure quality. Usually within 24 hours.' },
  { icon: MessageSquare, title: 'Workers contact you', description: 'Approved workers can see your contact info and reach out directly.' },
  { icon: CheckCircle, title: 'Get it done', description: 'Choose the best worker, complete the task, and leave a review.' },
];

const taskerSteps = [
  { icon: Users, title: 'Create your profile', description: 'Sign up as a worker, list your skills, and set your rates.' },
  { icon: Shield, title: 'Get verified', description: 'Admin approves your profile. This ensures trust and quality.' },
  { icon: FileText, title: 'Browse tasks', description: 'Find tasks that match your skills in Christchurch and nearby areas.' },
  { icon: CreditCard, title: 'Contact & earn', description: 'Reach out to task posters directly and negotiate your work.' },
];

const features = [
  { icon: Shield, title: 'Admin Approved', description: 'All tasks and workers are reviewed by admin before going live.' },
  { icon: Star, title: 'Direct Contact', description: 'Workers contact posters directly via phone, email, or WhatsApp.' },
  { icon: CheckCircle, title: 'Local Focus', description: 'Focused on Christchurch and Canterbury region for better connections.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-20" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              How Taskify Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Whether you need help or want to earn, Taskify makes it simple to connect with people in Christchurch.
            </motion.p>
          </div>
        </section>

        {/* For Task Posters */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full mb-4">
                For Task Posters
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get anything done</h2>
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
                  <div className="text-5xl font-bold text-purple-100 mb-4">{i + 1}</div>
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/post-task">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg">
                  Post a Task
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Taskers */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium rounded-full mb-4">
                For Workers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Earn on your terms</h2>
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
                  <div className="text-5xl font-bold text-purple-100 mb-4">{i + 1}</div>
                  <div className="w-12 h-12 bg-purple-100 border border-purple-200 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/auth/signup">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold hover:border-purple-500 hover:text-purple-600 transition-all">
                  Become a Worker
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trust & Safety</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Your safety is our priority. We&apos;ve built features to protect both task posters and workers.
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
                  className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to get started?</h2>
            <p className="text-gray-500 mb-8">
              Join people in Christchurch using Taskify to get things done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/post-task">
                <button className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg">
                  Post a Task
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-8 py-4 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold hover:border-purple-500 hover:text-purple-600 transition-all">
                  Sign Up as Worker
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
