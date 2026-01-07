import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Pricing configuration
export const PRICING = {
  TASK_POSTING_FEE: 500, // $5.00 NZD in cents
  FEATURED_TASK_FEE: 1000, // $10.00 NZD in cents
  WORKER_SUBSCRIPTION: 2000, // $20.00 NZD/month in cents
  CONTACT_ACCESS_FEE: 300, // $3.00 NZD per contact in cents
};

export const PRICE_IDS = {
  WORKER_SUBSCRIPTION: process.env.STRIPE_WORKER_SUBSCRIPTION_PRICE_ID,
};
