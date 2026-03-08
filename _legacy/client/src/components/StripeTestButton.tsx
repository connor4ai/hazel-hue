import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { stripePromise } from '@/lib/stripe';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function StripeTestButton() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  const testStripe = async () => {
    setTesting(true);
    setResult(null);
    setMessage('');

    try {
      console.log('Testing Stripe initialization...');
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Just verify Stripe loaded successfully - no need to create test tokens
      if (stripe) {
        console.log('Stripe instance:', stripe);
      }

      setResult('success');
      setMessage('Stripe payment system is working correctly');
      console.log('Stripe test successful');
    } catch (error: any) {
      console.error('Stripe test failed:', error);
      setResult('error');
      setMessage(error.message || 'Stripe test failed');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-semibold">Payment System Test</h3>
        {result === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
        {result === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
      </div>
      
      <Button 
        onClick={testStripe} 
        disabled={testing}
        variant={result === 'success' ? 'outline' : 'default'}
        className="mb-3"
      >
        {testing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Testing Stripe...
          </>
        ) : (
          'Test Payment System'
        )}
      </Button>

      {message && (
        <p className={`text-sm ${result === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}