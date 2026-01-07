import { createClient } from '@/lib/supabase/server';

interface EmailNotification {
  to: string;
  subject: string;
  html: string;
  type: 'task_approved' | 'task_rejected' | 'worker_approved' | 'new_offer' | 'offer_accepted';
}

export class EmailService {
  private static async sendEmail(notification: EmailNotification) {
    // In production, integrate with email service like SendGrid, Resend, or AWS SES
    console.log('Email would be sent:', notification);
    
    // For now, just log the email content
    // TODO: Replace with actual email service integration
    return { success: true };
  }

  static async notifyTaskApproved(taskId: string) {
    const supabase = await createClient();
    const { data: task } = await supabase
      .from('tasks')
      .select('*, poster:profiles(*)')
      .eq('id', taskId)
      .single();

    if (!task || !task.poster) return;

    await this.sendEmail({
      to: task.poster.email,
      subject: 'Your task has been approved!',
      html: `
        <h2>Great news! Your task is now live</h2>
        <p>Hi ${task.poster.full_name},</p>
        <p>Your task "<strong>${task.title}</strong>" has been approved and is now visible to workers.</p>
        <p>You can view your task and manage offers at: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tasks/${task.id}">View Task</a></p>
        <p>Best regards,<br>The Taskify Team</p>
      `,
      type: 'task_approved'
    });
  }

  static async notifyTaskRejected(taskId: string, reason?: string) {
    const supabase = await createClient();
    const { data: task } = await supabase
      .from('tasks')
      .select('*, poster:profiles(*)')
      .eq('id', taskId)
      .single();

    if (!task || !task.poster) return;

    await this.sendEmail({
      to: task.poster.email,
      subject: 'Task requires revision',
      html: `
        <h2>Your task needs some updates</h2>
        <p>Hi ${task.poster.full_name},</p>
        <p>Your task "<strong>${task.title}</strong>" requires some revisions before it can go live.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>Please update your task and resubmit: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/my-tasks">My Tasks</a></p>
        <p>Best regards,<br>The Taskify Team</p>
      `,
      type: 'task_rejected'
    });
  }

  static async notifyWorkerApproved(workerId: string) {
    const supabase = await createClient();
    const { data: worker } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', workerId)
      .single();

    if (!worker) return;

    await this.sendEmail({
      to: worker.email,
      subject: 'Welcome to Taskify - You\'re approved!',
      html: `
        <h2>Welcome to the Taskify community!</h2>
        <p>Hi ${worker.full_name},</p>
        <p>Congratulations! Your worker application has been approved.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse and apply for tasks</li>
          <li>Contact task posters directly</li>
          <li>Build your reputation</li>
        </ul>
        <p>Get started: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tasks">Browse Tasks</a></p>
        <p>Best regards,<br>The Taskify Team</p>
      `,
      type: 'worker_approved'
    });
  }

  static async notifyNewOffer(taskId: string, offerId: string) {
    const supabase = await createClient();
    const { data: offer } = await supabase
      .from('offers')
      .select('*, task:tasks(*, poster:profiles(*)), worker:profiles(*)')
      .eq('id', offerId)
      .single();

    if (!offer || !offer.task || !offer.task.poster) return;

    await this.sendEmail({
      to: offer.task.poster.email,
      subject: 'New offer on your task',
      html: `
        <h2>You have a new offer!</h2>
        <p>Hi ${offer.task.poster.full_name},</p>
        <p><strong>${offer.worker?.full_name}</strong> has made an offer of <strong>$${offer.amount}</strong> for your task:</p>
        <p>"<strong>${offer.task.title}</strong>"</p>
        ${offer.message ? `<p><strong>Message:</strong> ${offer.message}</p>` : ''}
        <p>View and manage offers: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tasks/${taskId}">View Task</a></p>
        <p>Best regards,<br>The Taskify Team</p>
      `,
      type: 'new_offer'
    });
  }

  static async notifyOfferAccepted(offerId: string) {
    const supabase = await createClient();
    const { data: offer } = await supabase
      .from('offers')
      .select('*, task:tasks(*), worker:profiles(*)')
      .eq('id', offerId)
      .single();

    if (!offer || !offer.worker) return;

    await this.sendEmail({
      to: offer.worker.email,
      subject: 'Your offer was accepted!',
      html: `
        <h2>Congratulations! Your offer was accepted</h2>
        <p>Hi ${offer.worker.full_name},</p>
        <p>Great news! Your offer of <strong>$${offer.amount}</strong> has been accepted for:</p>
        <p>"<strong>${offer.task?.title}</strong>"</p>
        <p>Contact the task poster to coordinate the work.</p>
        <p>View task details: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tasks/${offer.task_id}">View Task</a></p>
        <p>Best regards,<br>The Taskify Team</p>
      `,
      type: 'offer_accepted'
    });
  }
}