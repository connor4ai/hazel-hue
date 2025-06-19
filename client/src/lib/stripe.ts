import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

// Validate that this is a publishable key (starts with pk_)
if (!stripePublicKey.startsWith('pk_')) {
  throw new Error('VITE_STRIPE_PUBLIC_KEY must be a publishable key (starts with pk_)');
}

export const stripePromise = loadStripe(stripePublicKey);
