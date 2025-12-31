import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to access order details.' },
        { status: 401 }
      );
    }
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID format.' },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const order = await Order.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(session.user.id)
    })
    .select('-__v -updatedAt')
    .lean();

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or you do not have permission to view this order.' },
        { status: 404 }
      );
    }

    const formattedOrder = {
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
    };

    return NextResponse.json({
      success: true,
      data: formattedOrder
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch order details. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

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