import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICING } from '@/lib/stripe/config';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, taskId } = await request.json();

    let lineItems;
    let metadata: Record<string, string> = { userId: user.id, type };
    let mode: 'payment' | 'subscription' = 'payment';

    switch (type) {
      case 'task_posting':
        lineItems = [{
          price_data: {
            currency: 'nzd',
            product_data: {
              name: 'Task Posting Fee',
              description: 'Post your task on Taskify',
            },
            unit_amount: PRICING.TASK_POSTING_FEE,
          },
          quantity: 1,
        }];
        if (taskId) metadata.taskId = taskId;
        break;

      case 'featured_task':
        lineItems = [{
          price_data: {
            currency: 'nzd',
            product_data: {
              name: 'Featured Task',
              description: 'Boost your task visibility',
            },
            unit_amount: PRICING.FEATURED_TASK_FEE,
          },
          quantity: 1,
        }];
        if (taskId) metadata.taskId = taskId;
        break;

      case 'worker_subscription':
        mode = 'subscription';
        lineItems = [{
          price_data: {
            currency: 'nzd',
            product_data: {
              name: 'Worker Subscription',
              description: 'Monthly access to contact task posters',
            },
            unit_amount: PRICING.WORKER_SUBSCRIPTION,
            recurring: { interval: 'month' as const },
          },
          quantity: 1,
        }];
        break;

      default:
        return NextResponse.json({ error: 'Invalid payment type' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: lineItems,
      mode,
      success_url: `${request.nextUrl.origin}/dashboard?payment=success&type=${type}`,
      cancel_url: `${request.nextUrl.origin}/dashboard?payment=cancelled`,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
