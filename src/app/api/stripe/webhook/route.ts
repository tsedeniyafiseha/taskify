import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Only import Stripe if configured
let stripe: any = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_your_key') {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-12-15.clover',
  });
}

// Use service role for webhook to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, type, taskId } = session.metadata || {};

        if (!userId || !type) break;

        // Record payment
        await supabaseAdmin.from('payments').insert({
          user_id: userId,
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || 'NZD',
          type: type as any,
          status: 'completed',
          stripe_payment_id: session.payment_intent as string,
          task_id: taskId || null,
          completed_at: new Date().toISOString(),
        });

        // Handle subscription activation
        if (type === 'worker_subscription') {
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
          
          await supabaseAdmin.from('profiles').update({
            subscription_active: true,
            subscription_expires_at: expiresAt.toISOString(),
          }).eq('id', userId);
        }

        // Handle task posting payment
        if (type === 'task_posting' && taskId) {
          // Task is already created, payment is recorded
          console.log(`Task posting payment completed for task ${taskId}`);
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        // Find user by stripe customer and deactivate subscription
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.email) {
          await supabaseAdmin.from('profiles').update({
            subscription_active: false,
            subscription_expires_at: null,
          }).eq('email', customer.email);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
