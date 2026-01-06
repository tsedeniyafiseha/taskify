'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does Taskify work?',
    answer: 'Taskify connects people who need tasks done with skilled Taskers. Simply post your task, receive offers from Taskers, choose the best one, and get your task completed. Payment is held securely until you\'re satisfied with the work.'
  },
  {
    question: 'Is it free to post a task?',
    answer: 'Yes! Posting a task on Taskify is completely free. You only pay when you accept an offer and the task is completed. There are no hidden fees or subscription costs.'
  },
  {
    question: 'How do I become a Tasker?',
    answer: 'To become a Tasker, simply sign up, complete your profile with your skills and experience, and start browsing available tasks. You can make offers on tasks that match your expertise and build your reputation through reviews.'
  },
  {
    question: 'How are payments handled?',
    answer: 'Payments are held securely by Taskify until the task is completed to your satisfaction. Once you approve the work, the payment is released to the Tasker. This ensures both parties are protected.'
  },
  {
    question: 'What if I\'m not satisfied with the work?',
    answer: 'If you\'re not satisfied with the completed task, you can request revisions or contact our support team. We have a dispute resolution process to ensure fair outcomes for both task posters and Taskers.'
  },
  {
    question: 'Are Taskers verified?',
    answer: 'Yes, all Taskers go through a verification process including identity checks. Additionally, our review and rating system helps you choose Taskers with proven track records.'
  },
  {
    question: 'What areas does Taskify cover?',
    answer: 'Taskify currently operates throughout Christchurch and surrounding areas in Canterbury. We\'re constantly expanding to serve more communities across New Zealand.'
  },
  {
    question: 'How quickly can I get my task done?',
    answer: 'Many tasks receive offers within minutes of posting. The completion time depends on the task complexity and Tasker availability, but most tasks are completed within 24-48 hours.'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-purple-100 border border-purple-200 px-4 py-2 rounded-full text-sm font-semibold text-purple-700">
              FAQ
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500"
          >
            Everything you need to know about Taskify
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-md transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-gray-900 pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-600" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
