'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Calendar, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  FileX
} from 'lucide-react';
import ResponsiveNav from '@/components/ResponsiveNav';

interface OrderItem {
  _id: string;
  userId: string;
  orderId: string;
  serviceName: string;
  serviceType: 'natal-chart' | 'numerology' | 'soul-alignment' | 'consultation';
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
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface OrdersResponse {
  orders: OrderItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

const OrdersPage = () => {
  const { status } = useSession();
  const router = useRouter();
  
  // State management
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and filtering
  const [searchTerm] = useState('');
  const [statusFilter] = useState('all');
  const [serviceFilter] = useState('all');
  const [sortBy] = useState('createdAt');
  const [sortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 10;

  // Authentication check
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  // Fetch orders function
  const fetchOrders = useCallback(async () => {
    if (status !== 'authenticated') return;
    
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(serviceFilter !== 'all' && { serviceType: serviceFilter }),
        sortBy,
        sortOrder
      });

      const response = await fetch(`/api/orders/user?${params}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();
      
      // Handle case where API returns error
      if (data.error) {
        throw new Error(data.error);
      }
      
      setOrders(data.orders || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalOrders(data.pagination?.total || 0);
      
    } catch (err) {
      console.error('Error fetching orders:', err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [status, currentPage, searchTerm, statusFilter, serviceFilter, sortBy, sortOrder]);

  // Fetch orders on component mount and dependency changes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Search debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setCurrentPage(1);
      fetchOrders();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, fetchOrders]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, serviceFilter, sortBy, sortOrder]);



  // Helper functions
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default'; // Green
      case 'pending':
        return 'secondary'; // Yellow
      case 'failed':
        return 'destructive'; // Red
      case 'cancelled':
        return 'outline'; // Gray
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };



  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
        <ResponsiveNav />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]"></div>
            <span className="ml-3 text-[#301934]">Loading your orders...</span>
          </div>
        </div>
      </div>
    );
  }

  // Authentication required
  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
        <ResponsiveNav />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-[#301934]">
              <p>Please sign in to view your orders.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      <ResponsiveNav />
      
      {/* Header Section */}
      <section className="pt-24 sm:pt-28 lg:pt-36 pb-8 px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#F5F5DC] mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Orders
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track and manage all your mystical readings and services
          </motion.p>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Orders Summary */}
          <div className="mb-6 flex items-center justify-between mt-16">
            <div className="text-[#301934]/80">
              Showing {orders.length} of {totalOrders} orders
            </div>
            <div className="text-[#301934]/70 text-sm">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <Card className="bg-[#301934]/10 border-[#B8860B]/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileX className="w-16 h-16 text-[#B8860B] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#301934] mb-2">
                    No Orders Found
                  </h3>
                  <p className="text-[#301934]/70 mb-6">
                    {searchTerm || statusFilter !== 'all' || serviceFilter !== 'all'
                      ? 'Try adjusting your search criteria or filters'
                      : 'You have not placed any orders yet'
                    }
                  </p>
                  <Button
                    onClick={() => router.push('/services')}
                    className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#301934] font-semibold"
                  >
                    Browse Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-[#301934]/10 border-[#B8860B]/30 backdrop-blur-sm hover:bg-[#301934]/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-[#301934]">
                                {order.serviceName}
                              </h3>
                              <p className="text-sm text-[#301934]/70">
                                Order #{order.orderId}
                              </p>
                            </div>
                            <Badge
                              variant={getStatusBadgeVariant(order.paymentStatus)}
                              className="flex items-center gap-1"
                            >
                              {getStatusIcon(order.paymentStatus)}
                              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#301934]/80">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#B8860B]" />
                              <span>Created: {formatDate(order.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-[#B8860B]" />
                              <span>
                                ₹{order.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#B8860B]" />
                              <span>
                                Timeline: {order.bookingDetails?.timelineSelected || 'Standard'}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm text-[#301934]/80">
                            <span className="font-medium">Customer:</span> {order.contactDetails.name}
                            {order.contactDetails.email && (
                              <span className="ml-2">({order.contactDetails.email})</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => router.push(`/orders/${order._id}`)}
                            variant="outline"
                            size="sm"
                            className="border-[#B8860B] text-[#301934] hover:bg-[#B8860B] hover:text-[#F5F5DC]"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Card className="mt-6 bg-[#301934]/10 border-[#B8860B]/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="border-[#B8860B]/50 text-[#301934] hover:bg-[#B8860B]/10 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className={currentPage === pageNum 
                            ? "bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#301934] font-semibold" 
                            : "border-[#B8860B]/50 text-[#301934] hover:bg-[#B8860B]/10"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="text-[#301934]/60">...</span>
                        <Button
                          onClick={() => setCurrentPage(totalPages)}
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          className={currentPage === totalPages 
                            ? "bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#301934] font-semibold" 
                            : "border-[#B8860B]/50 text-[#301934] hover:bg-[#B8860B]/10"
                          }
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="border-[#B8860B]/50 text-[#301934] hover:bg-[#B8860B]/10 disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersPage;


