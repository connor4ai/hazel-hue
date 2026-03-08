import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

// Initialize Stripe with comprehensive error handling and retry logic
const initializeStripe = async (): Promise<Stripe | null> => {
  if (!stripePublicKey) {
    console.error('VITE_STRIPE_PUBLIC_KEY environment variable is not set');
    return null;
  }

  if (!stripePublicKey.startsWith('pk_')) {
    console.error('Invalid Stripe public key format. Must start with "pk_"');
    return null;
  }

  try {
    console.log('Initializing Stripe with key:', stripePublicKey.substring(0, 12) + '...');
    
    const stripe = await loadStripe(stripePublicKey, {
      // Add retry configuration
      stripeAccount: undefined,
      locale: 'auto'
    });

    if (!stripe) {
      throw new Error('Failed to initialize Stripe - loadStripe returned null');
    }

    console.log('Stripe initialized successfully');
    return stripe;
  } catch (error) {
    console.error('Failed to load Stripe.js:', error);
    
    // Retry once after a short delay
    try {
      console.log('Retrying Stripe initialization...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const stripe = await loadStripe(stripePublicKey);
      if (stripe) {
        console.log('Stripe initialized successfully on retry');
        return stripe;
      }
    } catch (retryError) {
      console.error('Stripe retry failed:', retryError);
    }
    
    return null;
  }
};

// Initialize Stripe promise
stripePromise = initializeStripe();

export { stripePromise };
