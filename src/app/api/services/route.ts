import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
  try {
    await dbConnect();

    const services = await Service.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      services: services.map(service => ({
        ...service,
        _id: service._id.toString()
      }))
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { 
      serviceName, 
      shortDescription, 
      longDescription, 
      price, 
      duration, 
      serviceImage, 
      category 
    } = body;

    // Validate required fields
    if (!serviceName || !shortDescription || !price) {
      return NextResponse.json(
        { error: 'Service name, description, and price are required' },
        { status: 400 }
      );
    }

    // Create new service
    const service = new Service({
      serviceName: serviceName.trim(),
      shortDescription: shortDescription.trim(),
      longDescription: longDescription?.trim(),
      price: Number(price),
      duration: duration?.trim(),
      serviceImage: serviceImage?.trim(),
      category: category?.trim() || 'General'
    });

    await service.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Service created successfully!',
        service: {
          ...service.toObject(),
          _id: service._id.toString()
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating service:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}