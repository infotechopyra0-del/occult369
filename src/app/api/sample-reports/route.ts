import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SampleReport from '@/models/SampleReport';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { firstName, birthDate, time, whatsappNumber, email, city } = body;
    if (!firstName || !birthDate || !time || !whatsappNumber || !email || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    const sampleReport = new SampleReport({
      firstName: firstName.trim(),
      birthDate: new Date(birthDate),
      time: time,
      whatsappNumber: whatsappNumber.trim(),
      email: email.trim(),
      city: city.trim()
    });
    await sampleReport.save();
    return NextResponse.json(
      { 
        success: true, 
        message: 'Sample report request saved successfully!',
        id: sampleReport._id 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to save sample report request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const sampleReports = await SampleReport.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      sampleReports
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sample reports' },
      { status: 500 }
    );
  }
}