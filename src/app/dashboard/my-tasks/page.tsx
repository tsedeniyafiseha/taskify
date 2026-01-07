'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Task, Category, Location } from '@/types/database';
import { 
  CheckCircle, XCircle, Clock, Eye, MapPin, DollarSign, 
  Loader2, AlertTriangle, MoreVertical, Trash2, Check
} from 'lucide-react';
import Link from 'next/link';

type TaskWithRelations = Task & {
  category: Category;
  location: Location;
};

export default function MyTasksPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [tasks, setTasks] = useState<TaskWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'completed' | 'cancelled'>('all');
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/dashboard/my-tasks');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('tasks')
      .select('*, category:categories(*), location:locations(*)')
      .eq('poster_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (data) setTasks(data as TaskWithRelations[]);
    setLoading(false);
  };

  const updateTaskStatus = async (taskId: string, status: 'completed' | 'cancelled') => {
    setUpdating(taskId);
    setActionMenu(null);
    
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .eq('poster_id', user?.id);

    if (!error) {
      await fetchTasks();
    }
    setUpdating(null);
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task? This cannot be undone.')) return;
    
    setUpdating(taskId);
    setActionMenu(null);
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('poster_id', user?.id);

    if (!error) {
      await fetchTasks();
    }
    setUpdating(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Live</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> Completed</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Cancelled</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Rejected</span>;
      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-gray-500">Manage your posted tasks</p>
            </div>
            <Link href="/post-task">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Post New Task
              </button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {(['all', 'pending', 'approved', 'completed', 'cancelled'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f === 'all' ? 'All Tasks' : f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'all' && ` (${tasks.length})`}
                {f !== 'all' && ` (${tasks.filter(t => t.status === f).length})`}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-4">
                {filter === 'all' ? "You haven't posted any tasks yet" : `No ${filter} tasks`}
              </p>
              {filter === 'all' && (
                <Link href="/post-task">
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Post Your First Task
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(task.status)}
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {task.category?.name}
                        </span>
                      </div>
                      
                      <Link href={`/tasks/${task.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors truncate">
                          {task.title}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{task.description}</p>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{task.location?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${task.budget} {task.budget_type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{task.views} views</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="relative">
                      {updating === task.id ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                      ) : (
                        <button
                          onClick={() => setActionMenu(actionMenu === task.id ? null : task.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                      
                      {actionMenu === task.id && (
                        <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-48 z-10">
                          <Link href={`/tasks/${task.id}`}>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Task
                            </button>
                          </Link>
                          
                          {task.status === 'approved' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                              className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Completed
                            </button>
                          )}
                          
                          {(task.status === 'pending' || task.status === 'approved') && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'cancelled')}
                              className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                            >
                              <XCircle className="w-4 h-4" />
                              Cancel Task
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Task
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">Task Status Guide</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><span className="font-medium">Pending:</span> Waiting for admin approval</li>
              <li><span className="font-medium">Live:</span> Visible to workers, accepting contacts</li>
              <li><span className="font-medium">Completed:</span> Task has been done, no longer visible</li>
              <li><span className="font-medium">Cancelled:</span> You cancelled the task</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
