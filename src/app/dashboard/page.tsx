'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { 
  Briefcase, Users, Plus, Eye, Clock, CheckCircle, Settings, 
  ArrowRight, Loader2, MapPin, AlertCircle
} from 'lucide-react';

interface TaskSummary {
  total: number;
  pending: number;
  approved: number;
  completed: number;
}

export default function DashboardPage() {
  const { user, profile, loading: authLoading, becomeWorker, refreshProfile } = useAuth();
  const router = useRouter();
  const [taskStats, setTaskStats] = useState<TaskSummary>({ total: 0, pending: 0, approved: 0, completed: 0 });
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<'poster' | 'worker'>('poster');
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user, activeRole]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const supabase = createClient();
    
    if (activeRole === 'poster') {
      // Fetch poster's tasks
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*, category:categories(name), location:locations(name)')
        .eq('poster_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (tasks) {
        setRecentTasks(tasks);
        setTaskStats({
          total: tasks.length,
          pending: tasks.filter(t => t.status === 'pending').length,
          approved: tasks.filter(t => t.status === 'approved').length,
          completed: tasks.filter(t => t.status === 'completed').length,
        });
      }
    } else {
      // Fetch available tasks for workers
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*, category:categories(name), location:locations(name), poster:profiles(full_name)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (tasks) setRecentTasks(tasks);
    }
    setLoading(false);
  };

  const handleBecomeWorker = async () => {
    setUpgrading(true);
    await becomeWorker();
    await refreshProfile();
    setUpgrading(false);
  };

  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>;
  }

  if (!user || !profile) return null;

  const isWorker = profile.is_worker;
  const isApprovedWorker = isWorker && profile.worker_status === 'approved';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {profile.full_name}!</h1>
              <p className="text-gray-500">Manage your tasks and profile</p>
            </div>
            
            {/* Role Switcher */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setActiveRole('poster')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeRole === 'poster' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Post Tasks
              </button>
              <button
                onClick={() => isWorker ? setActiveRole('worker') : null}
                disabled={!isWorker}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeRole === 'worker' ? 'bg-purple-600 text-white' : isWorker ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <Users className="w-4 h-4" /> Find Work
              </button>
            </div>
          </div>

          {/* Worker Status Banner */}
          {!isWorker && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Want to earn money?</p>
                  <p className="text-sm text-purple-200">Become a worker and start finding tasks</p>
                </div>
              </div>
              <button onClick={handleBecomeWorker} disabled={upgrading}
                className="px-4 py-2 bg-white text-purple-600 rounded-xl font-medium hover:bg-purple-50 disabled:opacity-50">
                {upgrading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Become a Worker'}
              </button>
            </motion.div>
          )}

          {isWorker && !isApprovedWorker && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">Worker profile pending approval</p>
                <p className="text-sm text-amber-600">Complete your profile in settings to speed up approval</p>
              </div>
              <Link href="/settings" className="ml-auto">
                <button className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700">
                  Complete Profile
                </button>
              </Link>
            </div>
          )}

          {/* Poster View */}
          {activeRole === 'poster' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Briefcase} label="Total Tasks" value={taskStats.total} color="purple" />
                <StatCard icon={Clock} label="Pending" value={taskStats.pending} color="amber" />
                <StatCard icon={Eye} label="Live" value={taskStats.approved} color="green" />
                <StatCard icon={CheckCircle} label="Completed" value={taskStats.completed} color="blue" />
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Link href="/post-task">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                        <Plus className="w-6 h-6 text-purple-600 group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Post a New Task</h3>
                        <p className="text-sm text-gray-500">Get help with anything</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600" />
                    </div>
                  </div>
                </Link>
                <Link href="/dashboard/my-tasks">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">View My Tasks</h3>
                        <p className="text-sm text-gray-500">Manage your posted tasks</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Recent Tasks */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Recent Tasks</h2>
                  <Link href="/dashboard/my-tasks" className="text-sm text-purple-600 hover:text-purple-700">View all</Link>
                </div>
                {loading ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>
                ) : recentTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No tasks yet</p>
                    <Link href="/post-task"><button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium">Post Your First Task</button></Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentTasks.map(task => (
                      <Link key={task.id} href={`/tasks/${task.id}`}>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{task.title}</p>
                            <p className="text-sm text-gray-500">{task.category?.name} • {task.location?.name}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-purple-600 font-semibold">${task.budget}</span>
                            <StatusBadge status={task.status} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Worker View */}
          {activeRole === 'worker' && (
            <>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Link href="/tasks">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Browse All Tasks</h3>
                        <p className="text-sm text-gray-500">Find work in your area</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600" />
                    </div>
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Settings className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Worker Profile</h3>
                        <p className="text-sm text-gray-500">Update skills & availability</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Available Tasks */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Available Tasks</h2>
                  <Link href="/tasks" className="text-sm text-purple-600 hover:text-purple-700">View all</Link>
                </div>
                {loading ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>
                ) : recentTasks.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No tasks available right now</p>
                ) : (
                  <div className="space-y-3">
                    {recentTasks.map(task => (
                      <Link key={task.id} href={`/tasks/${task.id}`}>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{task.title}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-3 h-3" /> {task.location?.name}
                              <span>•</span>
                              <span>by {task.poster?.full_name}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-purple-600 font-bold text-lg">${task.budget}</span>
                            <p className="text-xs text-gray-500">{task.budget_type}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${colors[color]}`}><Icon className="w-4 h-4" /></div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-600',
    rejected: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100'}`}>{status}</span>;
}
