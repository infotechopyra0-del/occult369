import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import SampleReport from '@/models/SampleReport';
import Service from '@/models/Service';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Get current date for today's calculations
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    // Get start of current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Get last 7 days for revenue chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    // Parallel database queries for better performance
    const [
      totalUsers,
      totalOrders,
      todayOrders,
      monthlyOrders,
      totalSampleReports,
      todaySampleReports,
      totalServices,
      totalContacts,
      todayContacts,
      last7DaysOrders
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: startOfToday, $lt: endOfToday } }),
      Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
      SampleReport.countDocuments(),
      SampleReport.countDocuments({ createdAt: { $gte: startOfToday, $lt: endOfToday } }),
      Service.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: startOfToday, $lt: endOfToday } }),
      Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: last7Days[0],
              $lt: endOfToday
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            },
            revenue: { $sum: '$totalAmount' },
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Calculate total revenue
    const totalRevenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);
    
    const todayRevenueResult = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lt: endOfToday }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);
    
    const monthlyRevenueResult = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const todayRevenue = todayRevenueResult[0]?.total || 0;
    const monthlyRevenue = monthlyRevenueResult[0]?.total || 0;

    // Format revenue data for chart
    const revenueChartData = last7Days.map(date => {
      const dayData = last7DaysOrders.find(order => 
        order._id.year === date.getFullYear() &&
        order._id.month === date.getMonth() + 1 &&
        order._id.day === date.getDate()
      );
      
      return {
        date: date.toISOString().split('T')[0],
        revenue: dayData?.revenue || 0,
        orders: dayData?.count || 0
      };
    });

    // Get recent orders for activity feed
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .populate('serviceId', 'serviceName price')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Get recent sample reports
    const recentSampleReports = await SampleReport.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        todayOrders,
        monthlyOrders,
        totalSampleReports,
        todaySampleReports,
        totalServices,
        totalContacts,
        todayContacts,
        totalRevenue,
        todayRevenue,
        monthlyRevenue
      },
      revenueChartData,
      recentOrders,
      recentSampleReports
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}
