'use client';

import { Task } from '@/types';
import { MapPin, Clock, MessageSquare, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusConfig = {
    open: { 
      bg: 'bg-green-500/20', 
      text: 'text-green-400',
      border: 'border-green-500/30',
      label: 'Open'
    },
    assigned: { 
      bg: 'bg-amber-500/20', 
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      label: 'In Progress'
    },
    completed: { 
      bg: 'bg-neutral-500/20', 
      text: 'text-neutral-400',
      border: 'border-neutral-500/30',
      label: 'Completed'
    },
  };

  const status = statusConfig[task.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-neutral-900/50 rounded-2xl p-6 hover:bg-neutral-900 transition-all duration-300 cursor-pointer border border-neutral-800 hover:border-neutral-700"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`${status.bg} ${status.text} border ${status.border} px-3 py-1 text-xs font-bold rounded-full`}>
                {status.label}
              </span>
              <span className="px-3 py-1 bg-neutral-800/50 text-neutral-400 text-xs font-medium rounded-full capitalize border border-neutral-700">
                {task.category}
              </span>
              {task.offers > 10 && (
                <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full border border-purple-500/30">
                  <TrendingUp className="w-3 h-3" />
                  Hot
                </span>
              )}
            </div>
            <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
              {task.title}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="bg-neutral-800 text-white px-4 py-3 rounded-xl border border-neutral-700">
              <div className="text-2xl font-bold">${task.budget}</div>
              <div className="text-xs text-neutral-400">Budget</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-400 line-clamp-2 mb-5 leading-relaxed">
          {task.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-400">{task.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-400">{task.postedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-400">{task.offers} offers</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-700">
              <Image
                src={task.poster.avatar}
                alt={task.poster.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{task.poster.name}</div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span>{task.poster.rating}</span>
                </div>
                <span>·</span>
                <span>{task.poster.tasksPosted} tasks</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
