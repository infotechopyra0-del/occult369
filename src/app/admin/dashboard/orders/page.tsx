"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  Edit, 
  CheckCircle, 
  Clock,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ShoppingCart,
  Star,
  Sparkles,
  Package,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';

interface Order {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchOrders();
    }
  }, [status, session]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order.contactDetails?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.contactDetails?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.orderId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.paymentStatus === filterStatus;
    const matchesService = filterService === 'all' || order.serviceType === filterService;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'natal-chart': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'numerology': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'soul-alignment': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'consultation': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalRevenue = orders.filter(o => o.paymentStatus === 'completed').reduce((sum, order) => sum + order.price, 0);

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen bg-[#f5f1e8]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#301934]"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return (
    <AdminLayout>
      <div className="h-screen bg-[#f5f1e8] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#301934] to-purple-700 px-6 lg:px-8 py-3 shadow-lg overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#B8860B]/10 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-[#B8860B] animate-pulse" />
          </div>
          <div className="absolute top-2 right-16 w-6 h-6 bg-[#A020F0]/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-[#A020F0] animate-bounce" />
          </div>
          <div className="absolute -bottom-1 left-20 w-5 h-5 bg-[#B8860B]/15 rounded-full flex items-center justify-center">
            <Star className="w-2.5 h-2.5 text-[#B8860B] animate-ping" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#A020F0]/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-[#A020F0] animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-[#B8860B] animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
            <div>
              <h1 className="text-3xl font-bold text-white font-heading mb-1 flex items-center gap-2">
                <ShoppingCart className="w-8 h-8 text-[#B8860B]" />
                Order Management
                <Sparkles className="w-6 h-6 text-[#A020F0] animate-pulse ml-2" />
              </h1>
              <p className="text-purple-100 font-sora text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#B8860B]" />
                Manage all customer orders and payments
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {/* Orders Table */}
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-gray-800">
                Orders ({filteredOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Order ID</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Customer</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Service</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Amount</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Date</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#301934]" />
                            <span className="font-medium text-gray-900 font-sora">
                              #{order.orderId || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900 font-sora">
                              {order.contactDetails?.name || 'Unknown'}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Mail className="w-3 h-3" />
                              <span className="font-sora">{order.contactDetails?.email || 'N/A'}</span>
                            </div>
                            {order.contactDetails?.phone && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Phone className="w-3 h-3" />
                                <span className="font-sora">{order.contactDetails.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900 font-sora">
                              {order.serviceName || 'N/A'}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getServiceTypeColor(order.serviceType)} font-sora`}>
                              {order.serviceType?.replace('-', ' ')?.toUpperCase() || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-gray-900 font-sora">
                              ₹{order.price || 0}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.paymentStatus)} font-sora flex items-center gap-1 w-fit`}>
                            {getStatusIcon(order.paymentStatus)}
                            {order.paymentStatus?.toUpperCase() || 'PENDING'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="font-sora">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleView(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEdit(order)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-sora">No orders found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    {/* View Order Modal */}
    <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen} >
      <DialogContent className='bg-[#f5f1e8]'>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        {selectedOrder && (
          <div className="space-y-2 bg-[#f5f1e8]">
            <div><b>Order ID:</b> {selectedOrder.orderId}</div>
            <div><b>Service:</b> {selectedOrder.serviceName} ({selectedOrder.serviceType})</div>
            <div><b>Price:</b> ₹{selectedOrder.price}</div>
            <div><b>Status:</b> {selectedOrder.paymentStatus}</div>
            <div><b>Contact:</b> {selectedOrder.contactDetails?.name} ({selectedOrder.contactDetails?.email}, {selectedOrder.contactDetails?.phone})</div>
            <div><b>Created:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
            <div><b>Admin Notes:</b> {selectedOrder.adminNotes || 'N/A'}</div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setViewModalOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Edit Order Modal */}
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
      <DialogContent className='bg-[#f5f1e8]'>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>
        {selectedOrder && (
          <div className="space-y-2">
            <div><b>Order ID:</b> {selectedOrder.orderId}</div>
            {/* Add form fields for editing as needed */}
            <div><b>Admin Notes:</b>
              <Input
                value={selectedOrder.adminNotes || ''}
                onChange={e => setSelectedOrder({ ...selectedOrder, adminNotes: e.target.value })}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          {/* Add save logic here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </AdminLayout>
  );
}
