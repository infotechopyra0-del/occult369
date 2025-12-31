
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';


export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    const params = (context?.params instanceof Promise) ? await context.params : context?.params;
    const { _id } = params || {};
    const service = await Service.findById(_id).lean();
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ service: { ...service, _id: service._id.toString() } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}
