import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Service from '@/models/Service';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const services = await Service.find().sort({ createdAt: -1 });
    return NextResponse.json({ 
      services,
      total: services.length,
      success: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch services' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();
    const { serviceName, shortDescription, longDescription, price, serviceImage } = data;
    if (!serviceName || !shortDescription || !longDescription || !price || !serviceImage) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    await connectToDatabase();

    let imageUrl = serviceImage;
    if (serviceImage.startsWith('data:')) {
      try {
        const uploadResult = await uploadToCloudinary(serviceImage, 'occult369/services');
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        return NextResponse.json({ 
          error: 'Failed to upload image' 
        }, { status: 400 });
      }
    }

    const newService = await Service.create({
      serviceName,
      shortDescription,
      longDescription,
      price: Number(price),
      duration: data.duration || '30 minutes',
      serviceImage: imageUrl,
      status: 'active',
      category: data.category || 'General',
    });

    return NextResponse.json({ 
      service: newService,
      message: 'Service created successfully',
      success: true 
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: 'Validation failed: ' + error.message 
      }, { status: 400 });
    }
    return NextResponse.json({ 
      error: 'Failed to create service' 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('id');
    
    if (!serviceId) {
      return NextResponse.json({ 
        error: 'Service ID is required' 
      }, { status: 400 });
    }

    await connectToDatabase();

    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
      return NextResponse.json({ 
        error: 'Service not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Service deleted successfully',
      success: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to delete service' 
    }, { status: 500 });
  }
}