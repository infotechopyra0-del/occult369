import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SampleReport from '@/models/SampleReport';
import mongoose from 'mongoose';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid sample report ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const deletedSampleReport = await SampleReport.findByIdAndDelete(id);

    if (!deletedSampleReport) {
      return NextResponse.json(
        { error: 'Sample report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sample report deleted successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete sample report' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid sample report ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const sampleReport = await SampleReport.findById(id).lean();

    if (!sampleReport) {
      return NextResponse.json(
        { error: 'Sample report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      sampleReport
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sample report' },
      { status: 500 }
    );
  }
}
