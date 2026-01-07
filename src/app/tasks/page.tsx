'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { Task, Category, Location, Profile } from '@/types/database';
import { MapPin, Clock, SlidersHorizontal, LayoutGrid, List, Loader2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Sample tasks to show when database is empty
const sampleTasks = [
  {
    id: 'sample-1',
    title: 'Deep clean 3-bedroom house',
    description: 'Need a thorough deep clean of my 3-bedroom house. Including bathrooms, kitchen, and all living areas. Must bring own cleaning supplies.',
    budget: 180,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'cleaning', name: 'Cleaning' },
    location: { slug: 'riccarton', name: 'Riccarton' },
    poster: { full_name: 'Sarah M.' },
  },
  {
    id: 'sample-2',
    title: 'Carpet cleaning for 4 rooms',
    description: 'Need professional carpet cleaning for lounge and 3 bedrooms. Pet-friendly products preferred. Approximately 60sqm total.',
    budget: 150,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'carpet-cleaning', name: 'Carpet Cleaning' },
    location: { slug: 'ponsonby', name: 'Ponsonby' },
    poster: { full_name: 'James T.' },
  },
  {
    id: 'sample-3',
    title: 'Window cleaning - 2 storey house',
    description: 'All windows inside and out for a 2 storey house. Approximately 20 windows total. Access to all areas available.',
    budget: 120,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'window-cleaning', name: 'Window Cleaning' },
    location: { slug: 'mt-eden', name: 'Mt Eden' },
    poster: { full_name: 'Lisa W.' },
  },
  {
    id: 'sample-4',
    title: 'Fix leaky tap and install shelf',
    description: 'Kitchen tap is dripping constantly and need a floating shelf installed in the living room. Parts provided.',
    budget: 85,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'handyman', name: 'Handyman' },
    location: { slug: 'hornby', name: 'Hornby' },
    poster: { full_name: 'Mike R.' },
  },
  {
    id: 'sample-5',
    title: 'Lawn mowing and garden tidy up',
    description: 'Large backyard needs mowing, edges trimmed, and general garden tidy. Approximately 400sqm lawn area. Hedges also need trimming.',
    budget: 95,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'gardening', name: 'Gardening' },
    location: { slug: 'fendalton', name: 'Fendalton' },
    poster: { full_name: 'Emma L.' },
  },
  {
    id: 'sample-6',
    title: 'Help setting up new laptop and phone',
    description: 'Need help transferring files from old laptop, setting up email, installing software and syncing with new phone.',
    budget: 60,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'tech-help', name: 'Tech Help' },
    location: { slug: 'takapuna', name: 'Takapuna' },
    poster: { full_name: 'David K.' },
  },
  {
    id: 'sample-7',
    title: 'Remove old furniture and rubbish',
    description: 'Need old couch, mattress, broken desk and some boxes removed from garage. Will need a trailer or ute.',
    budget: 110,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'rubbish-removal', name: 'Rubbish Removal' },
    location: { slug: 'rolleston', name: 'Rolleston' },
    poster: { full_name: 'Tom H.' },
  },
  {
    id: 'sample-8',
    title: 'Help moving out - need 2 people',
    description: 'Moving from apartment to new house. Need help with couch, bed, dining table and about 20 boxes. Have a van already.',
    budget: 140,
    budget_type: 'fixed',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'moving', name: 'Moving Help' },
    location: { slug: 'auckland-cbd', name: 'Auckland CBD' },
    poster: { full_name: 'Rachel B.' },
  },
];

export default function TasksPage() {
  const { profile } = useAuth();
  const supabase = createClient();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [usingSamples, setUsingSamples] = useState(false);
  
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    minBudget: 0,
    maxBudget: 1000,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch categories
      const { data: cats } = await supabase.from('categories').select('*').order('name');
      if (cats) setCategories(cats);
      
      // Fetch locations
      const { data: locs } = await supabase.from('locations').select('*').order('is_primary', { ascending: false });
      if (locs) setLocations(locs);
      
      // Fetch approved tasks
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*, poster:profiles(*), category:categories(*), location:locations(*)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching tasks:', error);
        // Use sample tasks on error
        setTasks(sampleTasks as unknown as Task[]);
        setUsingSamples(true);
      } else if (tasksData && tasksData.length > 0) {
        setTasks(tasksData);
        setUsingSamples(false);
      } else {
        // Use sample tasks when database is empty
        setTasks(sampleTasks as unknown as Task[]);
        setUsingSamples(true);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      // Use sample tasks on error
      setTasks(sampleTasks as unknown as Task[]);
      setUsingSamples(true);
    }
    
    setLoading(false);
  };

  const filteredTasks = tasks.filter(task => {
    const category = task.category as Category;
    const location = task.location as Location;
    if (filters.category !== 'all' && category?.slug !== filters.category) return false;
    if (filters.location !== 'all' && location?.slug !== filters.location) return false;
    if (task.budget < filters.minBudget || task.budget > filters.maxBudget) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Category Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filters.category === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Tasks
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: cat.slug }))}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filters.category === cat.slug
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-700" />
                  <span className="font-medium text-sm text-gray-900">Filters</span>
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                >
                  <option value="all">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.slug}>{loc.name}</option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Budget Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.minBudget}
                    onChange={(e) => setFilters(prev => ({ ...prev, minBudget: Number(e.target.value) }))}
                    placeholder="Min"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxBudget: Number(e.target.value) }))}
                    placeholder="Max"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Task List */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredTasks.length} tasks available
                </h2>
                <p className="text-sm text-gray-500">
                  {filters.category === 'all' ? 'All categories' : categories.find(c => c.slug === filters.category)?.name}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <>
                {usingSamples && (
                  <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <p className="text-purple-700 text-sm text-center">
                      ✨ These are sample tasks to show you how the platform works. <Link href="/post-task" className="font-semibold underline">Post a real task</Link> to get started!
                    </p>
                  </div>
                )}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'flex flex-col gap-4'}>
                  {filteredTasks.map((task, i) => {
                    const poster = task.poster as Profile;
                    const category = task.category as Category;
                    const location = task.location as Location;
                    const isSample = task.id.toString().startsWith('sample-');
                    
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                      >
                        <div className="p-5">
                          {/* Header with avatar and status */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-purple-600">
                                {poster?.full_name?.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">{poster?.full_name}</span>
                                {isSample && (
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-[10px] font-medium rounded-full">
                                    Sample
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MapPin className="w-3 h-3" />
                                <span>{location?.name}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">${task.budget}</div>
                              <div className="text-[10px] text-gray-500">{task.budget_type === 'hourly' ? '/hour' : 'fixed'}</div>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{task.title}</h3>
                          
                          {/* Description */}
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{task.description}</p>

                          {/* Meta row */}
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(task.created_at).toLocaleDateString()}</span>
                            </div>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {category?.name}
                            </span>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Open
                            </span>
                            <Link href={`/tasks/${task.id}`}>
                              <button className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
