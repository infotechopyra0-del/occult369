import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await connectToDatabase();
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json({ 
        error: 'Contact not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      contact,
      success: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch contact' 
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    await connectToDatabase();

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status: data.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json({ 
        error: 'Contact not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      contact,
      message: 'Contact status updated successfully',
      success: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to update contact' 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await connectToDatabase();
    
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json({ 
        error: 'Contact not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Contact deleted successfully',
      success: true 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to delete contact' 
    }, { status: 500 });
  }
}