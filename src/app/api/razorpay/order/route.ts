import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceId, amount, currency = 'INR' } = body;

    if (!name || !email || !phone || !serviceId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const amountInPaise = amount ? Number(amount) * 100 : 100 * 100; 

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const shortServiceId = String(serviceId).slice(0, 12);
    const options = {
      amount: amountInPaise,
      currency,
      receipt: `r_${shortServiceId}_${Date.now()}`.slice(0, 40),
      payment_capture: 1,
      notes: {
        name,
        email,
        phone,
        serviceId,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      name: 'Occult369',
      description: 'Service Payment',
      image: '/logo.png', // update if you have a logo
      prefill: { name, email, contact: phone },
      notes: order.notes,
      theme: { color: '#B8860B' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
