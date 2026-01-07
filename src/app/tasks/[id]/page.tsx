'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { Task, Category, Location, Profile } from '@/types/database';
import { MapPin, Clock, Phone, Mail, ArrowLeft, Calendar, MessageCircle, Loader2, Lock, CheckCircle, XCircle, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

// Sample tasks data
const sampleTasksData: Record<string, any> = {
  'sample-1': {
    id: 'sample-1',
    title: 'Deep clean 3-bedroom house',
    description: 'Need a thorough deep clean of my 3-bedroom house. Including bathrooms, kitchen, and all living areas. Must bring own cleaning supplies.\n\nSpecific requirements:\n- All floors vacuumed and mopped\n- Bathrooms scrubbed including tiles\n- Kitchen appliances cleaned inside and out\n- Windows cleaned (inside)\n- Dusting all surfaces\n\nPreferred time: Weekday morning',
    budget: 180,
    budget_type: 'fixed',
    working_hours: 'Morning (8am - 12pm)',
    preferred_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'cleaning', name: 'Cleaning' },
    location: { name: 'Riccarton' },
    poster: { full_name: 'Sarah M.', created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '021 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-2': {
    id: 'sample-2',
    title: 'Carpet cleaning for 4 rooms',
    description: 'Need professional carpet cleaning for lounge and 3 bedrooms. Pet-friendly products preferred.\n\nDetails:\n- Lounge approximately 25sqm\n- 3 bedrooms approximately 12sqm each\n- Have a dog so pet-safe products needed\n- Some stains that need attention\n\nFlexible on timing.',
    budget: 150,
    budget_type: 'fixed',
    working_hours: 'Flexible',
    preferred_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'carpet-cleaning', name: 'Carpet Cleaning' },
    location: { name: 'Ponsonby' },
    poster: { full_name: 'James T.', created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '022 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-3': {
    id: 'sample-3',
    title: 'Window cleaning - 2 storey house',
    description: 'All windows inside and out for a 2 storey house. Approximately 20 windows total.\n\nDetails:\n- Ground floor: 12 windows\n- First floor: 8 windows (ladder access needed)\n- Some windows have screens to remove\n- Access to all areas available\n\nLooking for someone with own equipment.',
    budget: 120,
    budget_type: 'fixed',
    working_hours: 'Morning preferred',
    preferred_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'window-cleaning', name: 'Window Cleaning' },
    location: { name: 'Mt Eden' },
    poster: { full_name: 'Lisa W.', created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '027 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-4': {
    id: 'sample-4',
    title: 'Fix leaky tap and install shelf',
    description: 'Kitchen tap is dripping constantly and need a floating shelf installed in the living room.\n\nDetails:\n- Kitchen mixer tap has a slow drip\n- Floating shelf already purchased, just needs installation\n- May need new washers for the tap\n- Wall is gib board\n\nLooking for someone with handyman experience.',
    budget: 85,
    budget_type: 'fixed',
    working_hours: 'Flexible',
    preferred_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'handyman', name: 'Handyman' },
    location: { name: 'Hornby' },
    poster: { full_name: 'Mike R.', created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '027 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-5': {
    id: 'sample-5',
    title: 'Lawn mowing and garden tidy up',
    description: 'Large backyard needs mowing, edges trimmed, and general garden tidy. Approximately 400sqm lawn area. Hedges also need trimming.\n\nWork required:\n- Mow front and back lawns\n- Edge along paths and garden beds\n- Trim hedges (about 10m total)\n- Remove any weeds from garden beds\n- Green waste can be left in bins provided',
    budget: 95,
    budget_type: 'fixed',
    working_hours: 'Morning preferred',
    preferred_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'gardening', name: 'Gardening' },
    location: { name: 'Fendalton' },
    poster: { full_name: 'Emma L.', created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '021 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-6': {
    id: 'sample-6',
    title: 'Help setting up new laptop and phone',
    description: 'Need help transferring files from old laptop, setting up email, installing software and syncing with new phone.\n\nTasks:\n- Transfer photos and documents from old laptop\n- Set up email accounts (Gmail and work)\n- Install Microsoft Office\n- Set up new iPhone and sync contacts\n- Show me how to use basic features\n\nPatience appreciated - not very tech savvy!',
    budget: 60,
    budget_type: 'fixed',
    working_hours: 'Afternoon',
    preferred_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'tech-help', name: 'Tech Help' },
    location: { name: 'Takapuna' },
    poster: { full_name: 'David K.', created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '022 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-7': {
    id: 'sample-7',
    title: 'Remove old furniture and rubbish',
    description: 'Need old couch, mattress, broken desk and some boxes removed from garage. Will need a trailer or ute.\n\nItems for removal:\n- Old 2-seater couch\n- Single mattress\n- Broken computer desk\n- 5-6 cardboard boxes of misc items\n- Some garden waste bags\n\nEverything is in the garage, easy access.',
    budget: 110,
    budget_type: 'fixed',
    working_hours: 'Anytime',
    preferred_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'rubbish-removal', name: 'Rubbish Removal' },
    location: { name: 'Rolleston' },
    poster: { full_name: 'Tom H.', created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '022 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
  'sample-8': {
    id: 'sample-8',
    title: 'Help moving out - need 2 people',
    description: 'Moving from apartment to new house. Need help with couch, bed, dining table and about 20 boxes. Have a van already.\n\nItems to move:\n- 3-seater couch\n- Queen bed frame and mattress\n- Dining table with 4 chairs\n- Approximately 20 medium boxes\n- A few small furniture items\n\nI have the van sorted, just need 1-2 people to help load and unload.',
    budget: 140,
    budget_type: 'fixed',
    working_hours: 'Weekend',
    preferred_date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: { slug: 'moving', name: 'Moving Help' },
    location: { name: 'Auckland CBD' },
    poster: { full_name: 'Rachel B.', created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString() },
    contact_phone: '022 XXX XXXX',
    contact_email: 'sample@taskify.nz',
    status: 'approved',
  },
};

export default function TaskDetailPage() {
  const params = useParams();
  const { profile } = useAuth();
  const supabase = createClient();
  
  const [task, setTask] = useState<any | null>(null);
  const [relatedTasks, setRelatedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [params.id]);

  const fetchTask = async () => {
    setLoading(true);
    const taskId = params.id as string;
    
    // Check if it's a sample task
    if (taskId.startsWith('sample-')) {
      const sampleTask = sampleTasksData[taskId];
      if (sampleTask) {
        setTask(sampleTask);
        setIsSample(true);
        // Get related sample tasks (same category, different id)
        const related = Object.values(sampleTasksData)
          .filter((t: any) => t.category.slug === sampleTask.category.slug && t.id !== taskId)
          .slice(0, 3);
        setRelatedTasks(related);
      } else {
        setError('Task not found');
      }
      setLoading(false);
      return;
    }
    
    // Fetch real task from database
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*, poster:profiles(*), category:categories(*), location:locations(*)')
      .eq('id', taskId)
      .single();
    
    if (fetchError) {
      setError('Task not found');
    } else {
      setTask(data);
      setIsSample(false);
      // Increment view count
      await supabase.from('tasks').update({ views: (data.views || 0) + 1 }).eq('id', taskId);
      
      // Fetch related tasks (same category)
      const { data: related } = await supabase
        .from('tasks')
        .select('*, category:categories(*), location:locations(*), poster:profiles(*)')
        .eq('status', 'approved')
        .eq('category_id', data.category_id)
        .neq('id', taskId)
        .limit(3);
      
      if (related) setRelatedTasks(related);
    }
    
    setLoading(false);
  };

  const updateTaskStatus = async (status: 'completed' | 'cancelled') => {
    if (!task || !profile || isSample) return;
    setUpdating(true);
    
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', task.id)
      .eq('poster_id', profile.id);

    if (!error) {
      await fetchTask();
    }
    setUpdating(false);
  };

  const isWorker = profile?.is_worker;
  const isApprovedWorker = isWorker && profile?.worker_status === 'approved';
  const hasSubscription = profile?.subscription_active;
  const canViewContact = isApprovedWorker && hasSubscription && !isSample;
  const isOwner = !isSample && profile?.id === task?.poster_id;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Task not found</h1>
            <Link href="/tasks">
              <button className="text-purple-600 font-medium hover:text-purple-700">
                Browse all tasks
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const poster = task.poster;
  const category = task.category;
  const location = task.location;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link href="/tasks" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to tasks
          </Link>

          {isSample && (
            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <p className="text-purple-700 text-sm text-center">
                ✨ This is a sample task to show you how the platform works. <Link href="/post-task" className="font-semibold underline">Post a real task</Link> to get started!
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Image */}
              {task.image_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden"
                >
                  <Image
                    src={task.image_url}
                    alt={task.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                        {task.status === 'approved' ? 'Open' : task.status}
                      </span>
                      <span className="px-3 py-1 bg-white/95 text-purple-600 text-xs font-medium rounded-full shadow-lg">
                        {category?.name}
                      </span>
                      {isSample && (
                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full shadow-lg">
                          Sample
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: task.image_url ? 0.1 : 0 }}
                className="bg-white rounded-2xl p-6 border border-gray-200"
              >
                {!task.image_url && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      {task.status === 'approved' ? 'Open' : task.status}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">
                      {category?.name}
                    </span>
                    {isSample && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        Sample Task
                      </span>
                    )}
                  </div>
                )}

                <h1 className="text-2xl font-bold text-gray-900 mb-4">{task.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span>{location?.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Posted {new Date(task.created_at).toLocaleDateString()}</span>
                  </div>
                  {task.preferred_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Needed by {new Date(task.preferred_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h2 className="font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
                </div>

                {task.working_hours && (
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h2 className="font-semibold text-gray-900 mb-3">Preferred Time</h2>
                    <p className="text-gray-600">{task.working_hours}</p>
                  </div>
                )}
              </motion.div>

              {/* Poster Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200"
              >
                <h2 className="font-semibold text-gray-900 mb-4">Posted by</h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-purple-600">
                      {poster?.full_name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{poster?.full_name}</div>
                    <div className="text-sm text-gray-500">
                      Member since {new Date(poster?.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Related Tasks */}
              {relatedTasks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200"
                >
                  <h2 className="font-semibold text-gray-900 mb-4">Related Tasks in {category?.name}</h2>
                  <div className="space-y-4">
                    {relatedTasks.map((relatedTask: any) => (
                      <Link key={relatedTask.id} href={`/tasks/${relatedTask.id}`}>
                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer group">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                                {relatedTask.title}
                              </h3>
                              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{relatedTask.location?.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  <span>4.9</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-purple-600">${relatedTask.budget}</span>
                              <p className="text-xs text-gray-500">{relatedTask.budget_type}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Budget Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 border border-gray-200"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-purple-600">${task.budget}</div>
                  <div className="text-sm text-gray-500">{task.budget_type === 'fixed' ? 'Fixed price' : 'Per hour'}</div>
                </div>

                {/* Contact Section */}
                {isSample ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <div className="text-sm text-purple-700">
                        This is a sample task. Post a real task to connect with workers!
                      </div>
                    </div>
                    <Link href="/post-task" className="block">
                      <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                        Post a Task Like This
                      </button>
                    </Link>
                  </div>
                ) : canViewContact ? (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 text-sm">Contact the poster</h3>
                    {task.contact_phone && (
                      <a href={`tel:${task.contact_phone}`} className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                        <Phone className="w-5 h-5" />
                        <span className="font-medium">{task.contact_phone}</span>
                      </a>
                    )}
                    {task.contact_email && (
                      <a href={`mailto:${task.contact_email}`} className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">{task.contact_email}</span>
                      </a>
                    )}
                    {task.contact_whatsapp && (
                      <a href={`https://wa.me/${task.contact_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">WhatsApp</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <div className="text-sm text-gray-500">
                        {!profile ? 'Sign up as a worker to contact' : !isWorker ? 'Become a worker to contact' : !isApprovedWorker ? 'Waiting for admin approval' : 'Subscribe to view contact info'}
                      </div>
                    </div>
                    {!profile ? (
                      <Link href="/auth/signup" className="block">
                        <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">Sign Up</button>
                      </Link>
                    ) : !isWorker ? (
                      <Link href="/become-tasker" className="block">
                        <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">Become a Worker</button>
                      </Link>
                    ) : isApprovedWorker && !hasSubscription ? (
                      <Link href="/settings" className="block">
                        <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">Subscribe - $20/month</button>
                      </Link>
                    ) : null}
                  </div>
                )}
              </motion.div>

              {/* Owner Controls */}
              {isOwner && task.status === 'approved' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">Manage Task</h3>
                  <div className="space-y-3">
                    <button onClick={() => updateTaskStatus('completed')} disabled={updating} className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50">
                      {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      Mark as Completed
                    </button>
                    <button onClick={() => updateTaskStatus('cancelled')} disabled={updating} className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                      {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                      Cancel Task
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Disclaimer */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-800">
                  Taskify connects task posters with workers. We are not responsible for offline agreements, payments, or task completion. Please exercise caution when meeting strangers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
