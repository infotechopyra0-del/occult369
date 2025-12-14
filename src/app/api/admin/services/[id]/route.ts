import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Service from '@/models/Service';
import { uploadToCloudinary } from '@/lib/cloudinary';

// PUT - Update existing service
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In production, add proper authentication check
    // const session = await getServerSession();
    // if (!session?.user || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { id: serviceId } = await params;
    const data = await request.json();
    
    // Validate required fields
    const { serviceName, shortDescription, longDescription, price, serviceImage } = data;
    if (!serviceName || !shortDescription || !longDescription || !price || !serviceImage) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    await connectToDatabase();

    // Find existing service
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return NextResponse.json({ 
        error: 'Service not found' 
      }, { status: 404 });
    }

    // Upload image to Cloudinary if it's base64 (new image)
    let imageUrl = serviceImage;
    if (serviceImage.startsWith('data:')) {
      try {
        const uploadResult = await uploadToCloudinary(serviceImage, 'occult369/services');
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json({ 
          error: 'Failed to upload image' 
        }, { status: 400 });
      }
    }

    // Update service
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
    console.error('Error updating service:', error);
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

// GET - Get specific service by ID
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
    console.error('Error fetching service:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch service' 
    }, { status: 500 });
  }
}