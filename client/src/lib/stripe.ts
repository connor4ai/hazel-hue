import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.error('Missing VITE_STRIPE_PUBLIC_KEY environment variable');
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

// Validate that this is a publishable key (starts with pk_)
if (!stripePublicKey.startsWith('pk_')) {
  console.error('Invalid Stripe key format. Expected publishable key starting with pk_, got:', stripePublicKey.substring(0, 10) + '...');
  throw new Error('VITE_STRIPE_PUBLIC_KEY must be a publishable key (starts with pk_)');
}

console.log('Loading Stripe with key:', stripePublicKey.substring(0, 10) + '...');
export const stripePromise = loadStripe(stripePublicKey);
