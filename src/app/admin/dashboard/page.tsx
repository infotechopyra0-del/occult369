
"use client"
// Defensive helper for safe toLocaleString
function safeLocaleString(val: unknown): string {
  if (typeof val === 'number' && Number.isFinite(val)) {
    try {
      return val.toLocaleString('en-IN');
    } catch {
      return val.toString();
    }
  }
  return '0';
}

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LogOut,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  MessageCircle,
  TrendingUp,
  Calendar,
  Star,
  Sparkles,
  DollarSign,
  Activity,
  Phone
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  todayOrders: number;
  monthlyOrders: number;
  totalSampleReports: number;
  todaySampleReports: number;
  totalServices: number;
  totalContacts: number;
  todayContacts: number;
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;
}

interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

interface RecentOrder {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  serviceId?: {
    serviceName: string;
    price: number;
  };
  serviceName?: string;
  totalAmount: number;
  createdAt: string;
}

interface RecentSampleReport {
  _id: string;
  firstName: string;
  whatsappNumber: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    todayOrders: 0,
    monthlyOrders: 0,
    totalSampleReports: 0,
    todaySampleReports: 0,
    totalServices: 0,
    totalContacts: 0,
    todayContacts: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentSampleReports, setRecentSampleReports] = useState<RecentSampleReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading' && (!session || session.user?.role !== 'admin')) {
      router.push('/');
      return;
    }
    
    if (session?.user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      
      setStats(data.stats);
      setRevenueData(data.revenueChartData || []);
      setRecentOrders(data.recentOrders || []);
      setRecentSampleReports(data.recentSampleReports || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '₹' + safeLocaleString(value);
          }
        }
      }
    }
  };

  const revenueChartData = {
    labels: revenueData.map(item => {
      const date = new Date(item.date);
      if (isNaN(date.getTime())) return '';
      try {
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      } catch {
        return '';
      }
    }),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map(item => item.revenue),
        borderColor: '#B8860B',
        backgroundColor: '#B8860B20',
        tension: 0.1,
      },
    ],
  };

  const ordersChartData = {
    labels: revenueData.map(item => {
      const date = new Date(item.date);
      if (isNaN(date.getTime())) return '';
      try {
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      } catch {
        return '';
      }
    }),
    datasets: [
      {
        label: 'Orders',
        data: revenueData.map(item => item.orders),
        backgroundColor: '#301934',
        borderColor: '#301934',
        borderWidth: 1,
      },
    ],
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      todayValue: null,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      todayValue: stats.todayOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Sample Reports',
      value: stats.totalSampleReports,
      todayValue: stats.todaySampleReports,
      icon: FileText,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Services',
      value: stats.totalServices,
      todayValue: null,
      icon: Settings,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Contacts',
      value: stats.totalContacts,
      todayValue: stats.todayContacts,
      icon: MessageCircle,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${safeLocaleString(stats.totalRevenue)}`,
      todayValue: `₹${safeLocaleString(stats.todayRevenue)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="h-screen bg-[#f5f1e8] flex flex-col overflow-hidden">
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
                <Activity className="w-8 h-8 text-[#B8860B]" />
                Admin Dashboard
                <Sparkles className="w-6 h-6 text-[#A020F0] animate-pulse ml-2" />
              </h1>
              <p className="text-purple-100 font-sora text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#B8860B]" />
                Welcome back, {session.user?.name || 'Admin'}
              </p>
            </div>
            
            <Button
              onClick={() => signOut({ callbackUrl: '/login' })}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-sora"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 space-y-6 admin-contacts-scroll">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                        </div>
                        {stat.todayValue !== null && (
                          <div className="text-right">
                            <p className="text-xs text-gray-500 font-sora">Today</p>
                            <p className="text-sm font-semibold text-gray-700 font-sora">
                              {typeof stat.todayValue === 'number' ? `+${stat.todayValue}` : stat.todayValue}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-sora mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 font-heading">
                          {stat.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white border-none shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#B8860B]" />
                    Revenue Trend (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line data={revenueChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="bg-white border-none shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-gray-800 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#301934]" />
                    Orders Trend (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar data={ordersChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-white border-none shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-gray-800">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-80 overflow-y-auto">
                    {recentOrders.length > 0 ? (
                      <div className="space-y-1">
                        {recentOrders.map((order, index) => (
                          <motion.div
                            key={order._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-4 border-b hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 font-sora text-sm">
                                  {order.userId.name}
                                </p>
                                <p className="text-sm text-gray-600 font-sora">
                                  {order.serviceId?.serviceName || order.serviceName}
                                </p>
                                <p className="text-xs text-gray-500 font-sora">
                                  {formatDate(order.createdAt)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-[#B8860B] font-heading">
                                  ₹{safeLocaleString(order.totalAmount)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-sora">No recent orders</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Sample Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="bg-white border-none shadow-md">
                <CardHeader>
                  <CardTitle className="font-heading text-gray-800">Recent Sample Reports</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-80 overflow-y-auto">
                    {recentSampleReports.length > 0 ? (
                      <div className="space-y-1">
                        {recentSampleReports.map((report, index) => (
                          <motion.div
                            key={report._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-4 border-b hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 font-sora text-sm">
                                  {report.firstName}
                                </p>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Phone className="w-3 h-3" />
                                  <span className="font-sora">{report.whatsappNumber}</span>
                                </div>
                                <p className="text-xs text-gray-500 font-sora">
                                  {formatDate(report.createdAt)}
                                </p>
                              </div>
                              <div className="w-8 h-8 bg-[#B8860B]/10 rounded-full flex items-center justify-center">
                                <FileText className="w-4 h-4 text-[#B8860B]" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-sora">No recent sample reports</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
