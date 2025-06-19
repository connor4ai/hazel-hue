import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  Package, 
  Calendar, 
  Download, 
  ArrowLeft,
  Mail,
  CreditCard
} from 'lucide-react';

interface Order {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  analysisResult?: any;
  pdfPath?: string;
}

export default function Account() {
  const [, setLocation] = useLocation();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation('/login');
      return;
    }

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('sessionToken');
      if (!token) return;

      const response = await apiRequest('GET', '/api/auth/orders', undefined, {
        Authorization: `Bearer ${token}`
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load order history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You've been signed out of your account.",
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to logout properly",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-warm-gray hover:text-warm-gray-dark mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-warm-gray-dark mb-2">
                My Account
              </h1>
              <p className="text-warm-gray">
                Manage your color analysis orders and account settings
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-warm-gray hover:text-warm-gray-dark"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-terracotta" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-warm-gray">Name</p>
                <p className="font-semibold">
                  {user.firstName || user.lastName 
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                    : 'Not specified'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-warm-gray">Email</p>
                <p className="font-semibold flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-warm-gray" />
                  {user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-terracotta" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-warm-gray">Total Orders</p>
                <p className="font-semibold text-2xl">{orders.length}</p>
              </div>
              <div>
                <p className="text-sm text-warm-gray">Completed</p>
                <p className="font-semibold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Action */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-terracotta" />
                New Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-warm-gray mb-4">
                Ready for another color analysis?
              </p>
              <Button
                onClick={() => setLocation('/checkout')}
                className="w-full bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white rounded-full font-semibold"
              >
                Order Now - $29
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-terracotta" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-warm-gray mx-auto mb-4" />
                <p className="text-warm-gray mb-4">No orders yet</p>
                <Button
                  onClick={() => setLocation('/checkout')}
                  className="bg-gradient-to-r from-terracotta via-marigold to-lagoon hover:from-terracotta/90 hover:via-marigold/90 hover:to-lagoon/90 text-white rounded-full font-semibold"
                >
                  Get Your First Analysis
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-warm-gray-light rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-warm-gray">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(order.amount)}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {order.status === 'completed' && order.analysisResult && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <p className="text-green-800 font-semibold mb-1">
                          Your Color Season: {order.analysisResult.season}
                        </p>
                        <p className="text-green-700 text-sm">
                          {order.analysisResult.description}
                        </p>
                      </div>
                    )}

                    {order.status === 'completed' && order.pdfPath && (
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-terracotta border-terracotta hover:bg-terracotta hover:text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    )}

                    {order.status === 'paid' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          Payment received! Upload your photos to continue.
                        </p>
                        <Button
                          size="sm"
                          onClick={() => setLocation(`/upload/${order.id}`)}
                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Upload Photos
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}