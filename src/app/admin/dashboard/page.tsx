"use client"

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalOrders: number;
  todaySales: number;
  pendingOrders: number;
  completedServices: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    todaySales: 0,
    pendingOrders: 0,
    completedServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats({
            totalOrders: data.totalOrders || 0,
            todaySales: data.revenue || 0,
            pendingOrders: data.totalContacts || 0,
            completedServices: data.totalServices || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchStats();
    }
  }, [status, session]);

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#301934]"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
    },
    {
      title: "Today's Sales",
      value: `₹${stats.todaySales}`,
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
    },
    {
      title: 'Completed Services',
      value: stats.completedServices,
    },
  ];

  return (
    <AdminLayout>
      <div className="w-full h-screen bg-[#f5f1e8] overflow-hidden flex flex-col">
        {/* Header with Purple Gradient */}
        <div className="bg-gradient-to-r from-[#301934] to-purple-700 px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading mb-1">
              Admin Dashboard
            </h1>
            <p className="text-purple-100 font-sora text-sm">
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 space-y-6 admin-contacts-scroll">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 font-sora mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 font-heading">
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 font-heading mb-6">
                    Revenue (Last 7 days)
                  </h3>
                  <div className="h-80 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Simple Chart Placeholder */}
                      <div className="absolute inset-0 flex items-end justify-around px-4 pb-8">
                        {[0, 0, 0, 0, 0, 0, 0].map((value, i) => (
                          <div key={i} className="flex-1 mx-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${value || 2}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      {/* Axis */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                      <div className="absolute bottom-0 left-0 top-0 w-px bg-gray-300"></div>
                      {/* Labels */}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-around text-xs text-gray-500 font-sora">
                        <span>2025-11-25</span>
                        <span>2025-11-26</span>
                        <span>2025-11-27</span>
                        <span>2025-11-28</span>
                        <span>2025-11-29</span>
                        <span>2025-11-30</span>
                        <span>2025-12-01</span>
                      </div>
                      {/* Y-axis labels */}
                      <div className="absolute left-2 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 font-sora">
                        <span>1.0</span>
                        <span>0.8</span>
                        <span>0.6</span>
                        <span>0.4</span>
                        <span>0.2</span>
                        <span>0</span>
                        <span>-0.2</span>
                        <span>-0.4</span>
                        <span>-0.6</span>
                        <span>-0.8</span>
                        <span>-1.0</span>
                      </div>
                      {/* Legend */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600 font-sora">Revenue</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Purchases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white border-none shadow-md h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 font-heading mb-6">
                    Recent Purchases
                  </h3>
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500 font-sora text-sm">
                      No recent purchases
                    </p>
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
