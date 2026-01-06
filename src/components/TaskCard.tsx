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
      bg: 'bg-green-100', 
      text: 'text-green-700',
      border: 'border-green-200',
      label: 'Open'
    },
    assigned: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700',
      border: 'border-amber-200',
      label: 'In Progress'
    },
    completed: { 
      bg: 'bg-gray-100', 
      text: 'text-gray-600',
      border: 'border-gray-200',
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
      className="group relative bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-purple-300"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`${status.bg} ${status.text} border ${status.border} px-3 py-1 text-xs font-bold rounded-full`}>
                {status.label}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize border border-gray-200">
                {task.category}
              </span>
              {task.offers > 10 && (
                <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                  <TrendingUp className="w-3 h-3" />
                  Hot
                </span>
              )}
            </div>
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
              {task.title}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-xl border border-gray-200">
              <div className="text-2xl font-bold">${task.budget}</div>
              <div className="text-xs text-gray-500">Budget</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 line-clamp-2 mb-5 leading-relaxed">
          {task.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{task.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{task.postedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{task.offers} offers</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={task.poster.avatar}
                alt={task.poster.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{task.poster.name}</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
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
