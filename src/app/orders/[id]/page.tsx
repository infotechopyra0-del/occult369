'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ResponsiveNav from '@/components/ResponsiveNav';
import {
  ArrowLeft,
  Package,
  CreditCard,
  Calendar,
  User,
  Phone,
  Mail,
  RefreshCw,
  Copy,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock4
} from 'lucide-react';

interface Order {
  _id: string;
  orderId: string;
  serviceName: string;
  serviceType: string;
  price: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
  };
  bookingDetails?: {
    date?: string;
    time?: string;
    timelineSelected?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    additionalNotes?: string;
  };
  adminNotes?: string;
  createdAt: string;
  formattedPrice: string;
  formattedDate: string;
  statusColor: string;
  statusLabel: string;
}

export default function OrderDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      toast.error('Please login to view order details');
      router.push('/login');
      return;
    }
  }, [status, router]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!session?.user?.id || !orderId) return;

      try {
        setLoading(true);
        
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch order details');
        }

        if (data.success) {
          setOrder(data.data);
          toast.success('Order details loaded successfully');
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load order details');
        setTimeout(() => router.push('/orders'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [session?.user?.id, orderId, router]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success(`${type} copied to clipboard`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'pending':
        return <Clock4 className="h-5 w-5 text-yellow-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#F5F5DC'}}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]" />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <RefreshCw className="h-8 w-8 animate-spin text-[#B8860B] mx-auto" />
            <p className="text-[#F5F5DC]">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !order) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
      {/* Responsive Navigation */}
      <ResponsiveNav currentPage="orders" />
      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="my-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/orders')}
              className="text-[#F5F5DC] hover:text-[#B8860B] hover:bg-[#301934]/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#F5F5DC] mb-2">Order Details</h1>
              <p className="text-[#B8860B]">Complete information about your booking</p>
            </div>
          </div>
          <Separator className="bg-[#B8860B]/30" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-[#301934]/30 border-[#B8860B]/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-[#B8860B]" />
                      <CardTitle className="text-[#F5F5DC]">Order Overview</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.paymentStatus)}
                      <Badge
                        variant={order.statusColor === 'green' ? 'default' : 'secondary'}
                        className={`${
                          order.statusColor === 'green'
                            ? 'bg-green-600 hover:bg-green-700'
                            : order.statusColor === 'yellow'
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-black'
                            : order.statusColor === 'red'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-gray-600 hover:bg-gray-700'
                        } text-white`}
                      >
                        {order.statusLabel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-[#B8860B]">Order ID</label>
                      <div className="flex items-center space-x-2">
                        <div className="bg-[#301934]/50 px-3 py-2 rounded-md font-mono text-[#F5F5DC] text-sm">
                          {order.orderId}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(order.orderId, 'Order ID')}
                          className="text-[#B8860B] hover:text-[#F5F5DC] hover:bg-[#301934]/50"
                        >
                          {copied === 'Order ID' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#B8860B]">Service Type</label>
                      <div className="text-[#F5F5DC] font-medium capitalize">
                        {order.serviceType.replace('-', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#B8860B]">Service Name</label>
                    <div className="text-[#F5F5DC] font-semibold text-lg">{order.serviceName}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Amount</label>
                      <div className="text-2xl font-bold text-green-400">{order.formattedPrice}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Order Date</label>
                      <div className="flex items-center space-x-2 text-white">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <span>{order.formattedDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-[#301934]/30 border-[#B8860B]/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-[#B8860B]" />
                    <CardTitle className="text-[#F5F5DC]">Payment Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.transactionId && (
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Transaction ID</label>
                      <div className="flex items-center space-x-2">
                        <div className="bg-purple-800/50 px-3 py-2 rounded-md font-mono text-white text-sm flex-1">
                          {order.transactionId}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(order.transactionId!, 'Transaction ID')}
                          className="text-purple-300 hover:text-white hover:bg-purple-800/50"
                        >
                          {copied === 'Transaction ID' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

                  {order.razorpayOrderId && (
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Razorpay Order ID</label>
                      <div className="flex items-center space-x-2">
                        <div className="bg-purple-800/50 px-3 py-2 rounded-md font-mono text-white text-sm flex-1">
                          {order.razorpayOrderId}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(order.razorpayOrderId!, 'Razorpay Order ID')}
                          className="text-purple-300 hover:text-white hover:bg-purple-800/50"
                        >
                          {copied === 'Razorpay Order ID' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

                  {order.razorpayPaymentId && (
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Razorpay Payment ID</label>
                      <div className="flex items-center space-x-2">
                        <div className="bg-purple-800/50 px-3 py-2 rounded-md font-mono text-white text-sm flex-1">
                          {order.razorpayPaymentId}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(order.razorpayPaymentId!, 'Payment ID')}
                          className="text-purple-300 hover:text-white hover:bg-purple-800/50"
                        >
                          {copied === 'Payment ID' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

                  {!order.transactionId && !order.razorpayOrderId && (
                    <div className="text-center py-4 text-purple-300">
                      Payment information will appear here once payment is processed.
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>


            {/* Booking Details and Admin Notes removed as requested */}


          </div>

          {/* Sidebar - Contact Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-[#301934]/30 border-[#B8860B]/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-[#B8860B]" />
                    <CardTitle className="text-[#F5F5DC]">Contact Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-purple-300">Name</label>
                    <div className="flex items-center space-x-2 text-white">
                      <User className="h-4 w-4 text-purple-400" />
                      <span>{order.contactDetails.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-purple-300">Email</label>
                    <div className="flex items-center space-x-2 text-white">
                      <Mail className="h-4 w-4 text-purple-400" />
                      <span className="break-all">{order.contactDetails.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-purple-300">Phone</label>
                    <div className="flex items-center space-x-2 text-white">
                      <Phone className="h-4 w-4 text-purple-400" />
                      <span>{order.contactDetails.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-[#301934]/30 border-[#B8860B]/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#F5F5DC] text-sm">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => router.push('/contact')}
                    variant="outline"
                    className="w-full border-[#B8860B]/40 text-[#F5F5DC] hover:bg-[#301934]/50"
                  >
                    Contact Support
                  </Button>
                  <Button
                    onClick={() => router.push('/orders')}
                    variant="ghost"
                    className="w-full text-[#B8860B] hover:text-[#F5F5DC] hover:bg-[#301934]/50"
                  >
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}