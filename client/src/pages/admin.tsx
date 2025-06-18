import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Eye, Download, Lock, X } from "lucide-react";

interface Order {
  id: number;
  userId: number;
  paymentIntentId: string;
  amount: number;
  status: string;
  images: string[] | null;
  analysisResult: any;
  pdfPath: string | null;
  emailSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/admin/login", { password });
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        fetchOrders();
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await apiRequest("GET", "/api/admin/orders");
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      paid: { color: "bg-blue-100 text-blue-800", label: "Paid" },
      processing: { color: "bg-orange-100 text-orange-800", label: "Processing" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      failed: { color: "bg-red-100 text-red-800", label: "Failed" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadReport = async (orderId: number) => {
    try {
      const response = await fetch(`/api/download-report/${orderId}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `color-analysis-report-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the report",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-warm-gray-dark flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
              >
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-warm-gray-dark">
            Admin Dashboard
          </h1>
          <Button
            variant="ghost"
            onClick={() => setIsAuthenticated(false)}
            className="text-warm-gray hover:text-terracotta"
          >
            <X className="h-5 w-5" />
            Logout
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <div className="flex justify-between items-center">
              <p className="text-warm-gray">Total Orders: {orders.length}</p>
              <Button onClick={fetchOrders} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Order ID</th>
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Amount</th>
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Status</th>
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Images</th>
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Email Sent</th>
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Created</th>
                    <th className="text-left py-4 px-2 font-semibold text-warm-gray-dark">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50">
                      <td className="py-4 px-2 text-warm-gray">#{order.id}</td>
                      <td className="py-4 px-2 text-warm-gray">${(order.amount / 100).toFixed(2)}</td>
                      <td className="py-4 px-2">{getStatusBadge(order.status)}</td>
                      <td className="py-4 px-2">
                        <Badge variant="outline" className={order.images ? "text-green-600" : "text-red-600"}>
                          {order.images ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="outline" className={order.emailSent ? "text-green-600" : "text-red-600"}>
                          {order.emailSent ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="py-4 px-2 text-warm-gray text-sm">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-lagoon hover:text-lagoon/80"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.pdfPath && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadReport(order.id)}
                              className="text-terracotta hover:text-terracotta/80"
                              title="Download Report"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-warm-gray">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
