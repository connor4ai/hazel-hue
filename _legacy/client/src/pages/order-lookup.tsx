import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Mail, Hash } from 'lucide-react';

interface Order {
  id: number;
  status: string;
  paymentStatus: string;
  analysisResult: any;
  createdAt: string;
  email: string;
}

export default function OrderLookupPage() {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderNumber })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Order not found');
      }

      const orderData = await response.json();
      setOrder(orderData);

      // If order is paid and has results, redirect to results page
      if (orderData.paymentStatus === 'paid' && orderData.analysisResult) {
        setLocation(`/results/${orderData.id}`);
      }

    } catch (error: any) {
      toast({
        title: 'Order Not Found',
        description: error.message || 'Please check your email and order number',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResults = () => {
    if (order) {
      setLocation(`/results/${order.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage-light to-dusty-rose-light">
      {/* Navigation */}
      <nav className="h-1 bg-gradient-to-r from-forest-green via-coral to-golden-yellow"></nav>
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-forest-green font-serif">
                Find Your Results
              </CardTitle>
              <CardDescription>
                Enter your email and order number to access your color analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLookup} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-warm-gray-dark mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-warm-gray-dark mb-2">
                    <Hash className="w-4 h-4 inline mr-2" />
                    Order Number
                  </label>
                  <input
                    type="number"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                    placeholder="Enter your order number"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading || !email || !orderNumber}
                  className="w-full bg-gradient-to-r from-coral to-golden-yellow hover:from-coral/90 hover:to-golden-yellow/90 text-white py-3 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>Searching...</>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Find My Results
                    </>
                  )}
                </Button>
              </form>

              {order && (
                <div className="mt-6 p-4 bg-sage-light rounded-md">
                  <h3 className="font-semibold text-forest-green mb-2">Order Found!</h3>
                  <p className="text-sm text-warm-gray-dark mb-2">
                    Order #{order.id} - Created {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-warm-gray-dark mb-3">
                    Status: {order.status} | Payment: {order.paymentStatus}
                  </p>
                  
                  {order.paymentStatus === 'paid' && order.analysisResult && (
                    <Button 
                      onClick={handleViewResults}
                      className="w-full bg-forest-green hover:bg-forest-green/90 text-white"
                    >
                      View Your Results
                    </Button>
                  )}
                  
                  {order.paymentStatus === 'unpaid' && (
                    <p className="text-sm text-coral">
                      This order is still pending payment. Please complete your purchase to access results.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-warm-gray">
                  Don't have an order yet?{' '}
                  <button 
                    onClick={() => setLocation('/upload')}
                    className="text-coral hover:text-coral/80 font-medium"
                  >
                    Get Your Analysis
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}