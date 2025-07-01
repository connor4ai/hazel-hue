import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

let stripePromise: Promise<any> | null = null;

// Initialize Stripe with proper error handling
if (stripePublicKey && stripePublicKey.startsWith('pk_')) {
  stripePromise = loadStripe(stripePublicKey).catch((error) => {
    console.error('Failed to load Stripe.js:', error);
    return null;
  });
} else {
  console.warn('Stripe public key not configured or invalid');
  stripePromise = Promise.resolve(null);
}

export { stripePromise };
