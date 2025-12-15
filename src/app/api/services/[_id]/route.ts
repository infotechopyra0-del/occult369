
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';


export async function GET(
  req: NextRequest,
  context: { params: { _id: string } } | { params: Promise<{ _id: string }> }
) {
  try {
    await dbConnect();
    // Support both Promise and plain object for params
    const params = (context.params instanceof Promise) ? await context.params : context.params;
    const { _id } = params;
    // Debug: print env, _id, and query result
    console.log('DEBUG: MONGODB_URI =', process.env.MONGODB_URI);
    console.log('DEBUG: Requested _id =', _id);
    // Try to find the service
    const service = await Service.findById(_id).lean();
    console.log('DEBUG: Query result =', service);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ service: { ...service, _id: service._id.toString() } });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}
