import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { z } from 'zod';
import mongoose from 'mongoose';

// Validation schemas
const getOrdersSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  search: z.string().optional(),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled', 'all']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(['createdAt', 'price', 'serviceName']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to access your orders.' },
        { status: 401 }
      );
    }

    // Parse and validate query parameters
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    
    const validationResult = getOrdersSchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const {
      page,
      limit,
      search,
      status,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder
    } = validationResult.data;

    // Validate pagination limits
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Build query filters
    const query: Record<string, unknown> = {
      userId: new mongoose.Types.ObjectId(session.user.id)
    };

    // Add status filter
    if (status && status !== 'all') {
      query.paymentStatus = status;
    }

    // Add search filter
    if (search && search.trim()) {
      query.$or = [
        { serviceName: { $regex: search.trim(), $options: 'i' } },
        { orderId: { $regex: search.trim(), $options: 'i' } },
        { 'contactDetails.name': { $regex: search.trim(), $options: 'i' } }
      ];
    }

    // Add date range filter
    if (dateFrom || dateTo) {
      const dateQuery: { $gte?: Date; $lte?: Date } = {};
      if (dateFrom) {
        dateQuery.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999); // End of day
        dateQuery.$lte = endDate;
      }
      query.createdAt = dateQuery;
    }

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const [orders, totalCount] = await Promise.all([
      Order.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v -updatedAt')
        .lean(),
      Order.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Format orders with virtual fields
    const formattedOrders = orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      formattedPrice: `₹${order.price.toLocaleString('en-IN')}`,
      formattedDate: new Date(order.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      statusColor: getStatusColor(order.paymentStatus),
      statusLabel: getStatusLabel(order.paymentStatus)
    }));

    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        page: page,
        limit: limit,
        total: totalCount,
        totalPages: totalPages,
        hasNext: hasNextPage,
        hasPrev: hasPreviousPage
      }
    });

  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Helper functions
function getStatusColor(status: string): string {
  const colors = {
    pending: 'yellow',
    completed: 'green',
    failed: 'red',
    cancelled: 'gray'
  };
  return colors[status as keyof typeof colors] || 'gray';
}

function getStatusLabel(status: string): string {
  const labels = {
    pending: 'Pending',
    completed: 'Payment Successful',
    failed: 'Payment Failed',
    cancelled: 'Cancelled'
  };
  return labels[status as keyof typeof labels] || 'Unknown';
}

export const runtime = 'nodejs';