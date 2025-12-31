import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, phone } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone number are required' },
        { status: 400 }
      );
    }
    const orders = await Order.find({
      'contactDetails.email': email.toLowerCase().trim(),
      'contactDetails.phone': phone.trim()
    })
    .sort({ createdAt: -1 })
    .limit(20) 
    .lean();

    return NextResponse.json({
      orders,
      total: orders.length
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}