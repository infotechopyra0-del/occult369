import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { image } = data;
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }
    if (!image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }
    const result = await uploadToCloudinary(image, 'occult369/services');
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}