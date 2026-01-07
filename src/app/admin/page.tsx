'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { EmailService } from '@/lib/email/service';
import { 
  Users, Briefcase, CheckCircle, XCircle, Eye, Clock, 
  TrendingUp, AlertTriangle, Loader2, Search, Filter
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalTasks: number;
  pendingTasks: number;
  pendingWorkers: number;
  totalRevenue: number;
}

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0, totalTasks: 0, pendingTasks: 0, pendingWorkers: 0, totalRevenue: 0
  });
  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  const [pendingWorkers, setPendingWorkers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'workers' | 'users'>('tasks');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !profile?.is_admin)) {
      router.push('/');
    }
  }, [user, profile, authLoading, router]);

  useEffect(() => {
    if (profile?.is_admin) fetchAdminData();
  }, [profile]);

  const fetchAdminData = async () => {
    setLoading(true);
    
    // Fetch stats
    const [usersRes, tasksRes, paymentsRes] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact' }),
      supabase.from('tasks').select('id, status', { count: 'exact' }),
      supabase.from('payments').select('amount').eq('status', 'completed')
    ]);

    const pendingTasksRes = await supabase
      .from('tasks')
      .select('*, poster:profiles(full_name), category:categories(name), location:locations(name)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    const pendingWorkersRes = await supabase
      .from('profiles')
      .select('*')
      .eq('is_worker', true)
      .eq('worker_status', 'pending')
      .order('created_at', { ascending: false });

    setStats({
      totalUsers: usersRes.count || 0,
      totalTasks: tasksRes.count || 0,
      pendingTasks: tasksRes.data?.filter(t => t.status === 'pending').length || 0,
      pendingWorkers: pendingWorkersRes.data?.length || 0,
      totalRevenue: paymentsRes.data?.reduce((sum, p) => sum + p.amount, 0) || 0
    });

    setPendingTasks(pendingTasksRes.data || []);
    setPendingWorkers(pendingWorkersRes.data || []);
    setLoading(false);
  };

  const approveTask = async (taskId: string) => {
    await supabase
      .from('tasks')
      .update({ status: 'approved', approved_at: new Date().toISOString(), approved_by: user?.id })
      .eq('id', taskId);
    
    // Send email notification
    try {
      await EmailService.notifyTaskApproved(taskId);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
    
    fetchAdminData();
  };

  const rejectTask = async (taskId: string) => {
    await supabase.from('tasks').update({ status: 'rejected' }).eq('id', taskId);
    fetchAdminData();
  };

  const approveWorker = async (workerId: string) => {
    await supabase.from('profiles').update({ worker_status: 'approved' }).eq('id', workerId);
    
    // Send email notification
    try {
      await EmailService.notifyWorkerApproved(workerId);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
    
    fetchAdminData();
  };

  const rejectWorker = async (workerId: string) => {
    await supabase.from('profiles').update({ worker_status: 'rejected' }).eq('id', workerId);
    fetchAdminData();
  };

  if (authLoading || !profile?.is_admin) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage tasks, users, and platform operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <StatCard icon={Users} label="Total Users" value={stats.totalUsers} />
            <StatCard icon={Briefcase} label="Total Tasks" value={stats.totalTasks} />
            <StatCard icon={Clock} label="Pending Tasks" value={stats.pendingTasks} color="amber" />
            <StatCard icon={AlertTriangle} label="Pending Workers" value={stats.pendingWorkers} color="red" />
            <StatCard icon={TrendingUp} label="Revenue" value={`$${(stats.totalRevenue / 100).toFixed(0)}`} color="green" />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-200 w-fit">
            {[
              { id: 'tasks', label: 'Pending Tasks', count: stats.pendingTasks },
              { id: 'workers', label: 'Pending Workers', count: stats.pendingWorkers },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-red-100 text-red-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : (
            <>
              {/* Pending Tasks */}
              {activeTab === 'tasks' && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Pending Task Approvals</h2>
                    <p className="text-sm text-gray-500">Review and approve tasks before they go live</p>
                  </div>
                  {pendingTasks.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No pending tasks</div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {pendingTasks.map(task => (
                        <div key={task.id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>By {task.poster?.full_name}</span>
                                <span>•</span>
                                <span>{task.category?.name}</span>
                                <span>•</span>
                                <span>{task.location?.name}</span>
                                <span>•</span>
                                <span className="font-semibold text-purple-600">${task.budget}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => rejectTask(task.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                              >
                                <XCircle className="w-4 h-4" /> Reject
                              </button>
                              <button
                                onClick={() => approveTask(task.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                              >
                                <CheckCircle className="w-4 h-4" /> Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Pending Workers */}
              {activeTab === 'workers' && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Pending Worker Approvals</h2>
                    <p className="text-sm text-gray-500">Review worker applications</p>
                  </div>
                  {pendingWorkers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No pending worker applications</div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {pendingWorkers.map(worker => (
                        <div key={worker.id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{worker.full_name}</h3>
                              <p className="text-gray-600 text-sm mb-3">{worker.email}</p>
                              {worker.bio && <p className="text-gray-600 text-sm mb-3">{worker.bio}</p>}
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {worker.skills?.length > 0 && (
                                  <span>Skills: {worker.skills.join(', ')}</span>
                                )}
                                {worker.hourly_rate && (
                                  <span>Rate: ${worker.hourly_rate}/hr</span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => rejectWorker(worker.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                              >
                                <XCircle className="w-4 h-4" /> Reject
                              </button>
                              <button
                                onClick={() => approveWorker(worker.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                              >
                                <CheckCircle className="w-4 h-4" /> Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color = 'purple' }: { 
  icon: any; label: string; value: string | number; color?: string 
}) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}