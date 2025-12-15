import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SampleReport from '@/models/SampleReport';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const sampleReports = await SampleReport.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      sampleReports
    });

  } catch (error) {
    console.error('Error fetching sample reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sample reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { firstName, birthDate, whatsappNumber } = body;

    // Validate required fields
    if (!firstName || !birthDate || !whatsappNumber) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new sample report
    const sampleReport = new SampleReport({
      firstName: firstName.trim(),
      birthDate: new Date(birthDate),
      whatsappNumber: whatsappNumber.trim()
    });

    await sampleReport.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Sample report created successfully!',
        sampleReport 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating sample report:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create sample report' },
      { status: 500 }
    );
  }
}
