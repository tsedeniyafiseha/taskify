'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight, Sparkles, Truck, Wrench, Leaf, Package, Eye, Monitor } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Task, Category, Location, Profile } from '@/types/database';

type TaskWithRelations = Task & {
  poster?: Profile;
  category?: Category;
  location?: Location;
};

const categoryFilters = [
  { slug: 'all', name: 'All Tasks', icon: Sparkles },
  { slug: 'cleaning', name: 'Cleaning', icon: Sparkles },
  { slug: 'carpet-cleaning', name: 'Carpet Cleaning', icon: Sparkles },
  { slug: 'window-cleaning', name: 'Window Cleaning', icon: Sparkles },
  { slug: 'handyman', name: 'Handyman', icon: Wrench },
  { slug: 'gardening', name: 'Gardening', icon: Leaf },
  { slug: 'tech-help', name: 'Tech Help', icon: Monitor },
  { slug: 'rubbish-removal', name: 'Rubbish Removal', icon: Package },
  { slug: 'moving', name: 'Moving Help', icon: Truck },
];

// Sample tasks to show when database is empty
const sampleTasks = [
  {
    id: 'sample-1',
    title: 'Deep clean 3-bedroom house',
    description: 'Need a thorough deep clean of my 3-bedroom house. Including bathrooms, kitchen, and all living areas.',
    budget: 180,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'cleaning', name: 'Cleaning' },
    location: { name: 'Riccarton' },
    poster: { full_name: 'Sarah M.' },
  },
  {
    id: 'sample-2',
    title: 'Carpet cleaning for 4 rooms',
    description: 'Need professional carpet cleaning for lounge, 3 bedrooms. Pet-friendly products preferred.',
    budget: 150,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'carpet-cleaning', name: 'Carpet Cleaning' },
    location: { name: 'Ponsonby' },
    poster: { full_name: 'James T.' },
  },
  {
    id: 'sample-3',
    title: 'Window cleaning - 2 storey house',
    description: 'All windows inside and out for a 2 storey house. Approximately 20 windows total.',
    budget: 120,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'window-cleaning', name: 'Window Cleaning' },
    location: { name: 'Mt Eden' },
    poster: { full_name: 'Lisa W.' },
  },
  {
    id: 'sample-4',
    title: 'Fix leaky tap and install shelf',
    description: 'Kitchen tap is dripping and need a floating shelf installed in the living room.',
    budget: 85,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'handyman', name: 'Handyman' },
    location: { name: 'Hornby' },
    poster: { full_name: 'Mike R.' },
  },
  {
    id: 'sample-5',
    title: 'Lawn mowing and garden tidy',
    description: 'Large backyard needs mowing, edges trimmed, and general garden tidy. About 400sqm.',
    budget: 95,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'gardening', name: 'Gardening' },
    location: { name: 'Fendalton' },
    poster: { full_name: 'Emma L.' },
  },
  {
    id: 'sample-6',
    title: 'Help setting up new laptop',
    description: 'Need help transferring files from old laptop, setting up email and installing software.',
    budget: 60,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'tech-help', name: 'Tech Help' },
    location: { name: 'Takapuna' },
    poster: { full_name: 'David K.' },
  },
];

export default function RecentTasks() {
  const [tasks, setTasks] = useState<TaskWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [usingSamples, setUsingSamples] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, poster:profiles(*), category:categories(*), location:locations(*)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching tasks:', error);
        // Use sample tasks on error
        setTasks(sampleTasks as unknown as TaskWithRelations[]);
        setUsingSamples(true);
      } else if (data && data.length > 0) {
        setTasks(data);
        setUsingSamples(false);
      } else {
        // Use sample tasks when database is empty
        setTasks(sampleTasks as unknown as TaskWithRelations[]);
        setUsingSamples(true);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      // Use sample tasks on error
      setTasks(sampleTasks as unknown as TaskWithRelations[]);
      setUsingSamples(true);
    }
    setLoading(false);
  };

  const filteredTasks = activeFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.category?.slug === activeFilter);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Recent Tasks</h2>
            <p className="text-gray-500">See what people are getting done</p>
          </div>
          <Link href="/tasks" className="hidden sm:flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors">
            View all tasks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categoryFilters.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No tasks in this category. Try another filter!</p>
          </div>
        ) : (
          <>
            {usingSamples && (
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
                <p className="text-purple-700 text-sm">
                  ✨ These are sample tasks. <Link href="/post-task" className="font-semibold underline">Post a real task</Link> to get started!
                </p>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/tasks/${task.id}`}>
                    <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group p-5">
                      {/* Header with avatar and budget */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-purple-600">
                            {task.poster?.full_name?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 text-sm">{task.poster?.full_name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{task.location?.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">${task.budget}</div>
                          <div className="text-[10px] text-gray-500">{task.budget_type === 'hourly' ? '/hour' : 'fixed'}</div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {task.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{getTimeAgo(task.created_at)}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {task.category?.name}
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Open
                        </span>
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/tasks">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
              View all tasks
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
