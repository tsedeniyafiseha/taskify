'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Found an amazing cleaner within hours! The whole process was so smooth and professional. Highly recommend Taskify for anyone in Christchurch.',
    taskType: 'House Cleaning'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Small Business Owner',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'As a tasker, Taskify has been a game-changer for my handyman business. I get consistent work and the payment system is secure and reliable.',
    taskType: 'Handyman Services'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Busy Professional',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Moving house was stressful until I found Taskify. Got multiple quotes quickly and hired a fantastic team. Made my move so much easier!',
    taskType: 'Moving Help'
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full blur-[120px] opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-purple-100 border border-purple-200 px-4 py-2 rounded-full text-sm font-semibold text-purple-700">
              Testimonials
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Loved by Thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            See what our community has to say about their Taskify experience
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-200"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-purple-500" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Task Type Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                  {testimonial.taskType}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
