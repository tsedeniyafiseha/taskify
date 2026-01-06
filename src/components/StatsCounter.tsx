'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Users, Briefcase, Star, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Briefcase,
    value: 50000,
    suffix: '+',
    label: 'Tasks Completed',
  },
  {
    icon: Users,
    value: 2500,
    suffix: '+',
    label: 'Active Taskers',
  },
  {
    icon: Star,
    value: 4.8,
    suffix: '★',
    label: 'Average Rating',
    decimals: 1,
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
  },
];

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [springValue, decimals]);

  return <span ref={ref}>0</span>;
}

export default function StatsCounter() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="group text-center relative"
            >
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block mb-6"
                >
                  <div className="relative">
                    <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl mx-auto border border-white/30">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Value */}
                <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform">
                  <Counter value={stat.value} decimals={stat.decimals} />
                  <span>{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="text-white/80 font-medium text-lg">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
