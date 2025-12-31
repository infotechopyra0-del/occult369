import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Service from '@/models/Service';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    const data = await request.json();
    const { serviceName, shortDescription, longDescription, price, serviceImage } = data;
    if (!serviceName || !shortDescription || !longDescription || !price || !serviceImage) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    await connectToDatabase();
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return NextResponse.json({ 
        error: 'Service not found' 
      }, { status: 404 });
    }
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

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        serviceName,
        shortDescription,
        longDescription,
        price: Number(price),
        duration: data.duration || existingService.duration,
        serviceImage: imageUrl,
        category: data.category || existingService.category,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ 
      service: updatedService,
      message: 'Service updated successfully',
      success: true 
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: 'Validation failed: ' + error.message 
      }, { status: 400 });
    }
    return NextResponse.json({ 
      error: 'Failed to update service' 
    }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    
    await connectToDatabase();
    
    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json({ 
        error: 'Service not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      service,
      success: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch service' 
    }, { status: 500 });
  }
}