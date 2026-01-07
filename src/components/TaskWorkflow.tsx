'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, User, MessageCircle, Star, Phone, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';

interface TaskWorkflowProps {
  task: any;
  offers: any[];
  onTaskUpdate: () => void;
}

export default function TaskWorkflow({ task, offers, onTaskUpdate }: TaskWorkflowProps) {
  const { user, profile } = useAuth();
  const { addNotification } = useNotifications();
  const [updating, setUpdating] = useState(false);
  const supabase = createClient();

  const isOwner = profile?.id === task.poster_id;
  const assignedWorker = task.assigned_worker_id;
  const acceptedOffer = offers.find(o => o.status === 'accepted');

  const markTaskCompleted = async () => {
    if (!isOwner) return;
    setUpdating(true);

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', task.id);

      if (error) throw error;

      addNotification({
        type: 'success',
        title: 'Task marked as completed',
        message: 'You can now leave a review for the worker'
      });

      onTaskUpdate();
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Failed to update task',
        message: error.message
      });
    } finally {
      setUpdating(false);
    }
  };

  const getWorkflowSteps = () => {
    const steps = [
      {
        id: 'posted',
        title: 'Task Posted',
        description: 'Task is live and accepting offers',
        status: 'completed',
        icon: CheckCircle
      },
      {
        id: 'offers',
        title: 'Receiving Offers',
        description: `${offers.length} offer${offers.length !== 1 ? 's' : ''} received`,
        status: offers.length > 0 ? 'completed' : 'current',
        icon: User
      },
      {
        id: 'assigned',
        title: 'Worker Assigned',
        description: assignedWorker ? 'Worker has been selected' : 'Waiting for offer acceptance',
        status: assignedWorker ? 'completed' : 'pending',
        icon: CheckCircle
      },
      {
        id: 'in_progress',
        title: 'Work in Progress',
        description: 'Worker is completing the task',
        status: assignedWorker && task.status !== 'completed' ? 'current' : assignedWorker ? 'completed' : 'pending',
        icon: Clock
      },
      {
        id: 'completed',
        title: 'Task Completed',
        description: 'Task finished and reviewed',
        status: task.status === 'completed' ? 'completed' : 'pending',
        icon: Star
      }
    ];

    return steps;
  };

  const steps = getWorkflowSteps();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Progress</h3>

      {/* Workflow Steps */}
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-100 text-green-600' :
                    step.status === 'current' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {!isLast && (
                    <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 ${
                      step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${
                    step.status === 'completed' ? 'text-green-900' :
                    step.status === 'current' ? 'text-purple-900' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assigned Worker Info */}
      {acceptedOffer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-green-600">
                {acceptedOffer.worker?.full_name?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-green-900">{acceptedOffer.worker?.full_name}</p>
              <p className="text-sm text-green-600">Assigned Worker • ${acceptedOffer.amount}</p>
            </div>
          </div>
          
          {isOwner && (
            <div className="flex gap-2">
              {acceptedOffer.worker?.phone && (
                <a
                  href={`tel:${acceptedOffer.worker.phone}`}
                  className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              )}
              {acceptedOffer.worker?.email && (
                <a
                  href={`mailto:${acceptedOffer.worker.email}`}
                  className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Actions */}
      {isOwner && assignedWorker && task.status === 'approved' && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={markTaskCompleted}
            disabled={updating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {updating ? (
              <Clock className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Mark as Completed
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Only mark as completed when the work is finished
          </p>
        </div>
      )}

      {/* Completion Message */}
      {task.status === 'completed' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="font-medium text-blue-900">Task Completed!</p>
          <p className="text-sm text-blue-600">Thank you for using Taskify</p>
        </div>
      )}
    </div>
  );
}