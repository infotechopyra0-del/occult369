import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

// GET - Fetch all contacts for admin
export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({ 
      contacts,
      total: contacts.length,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch contacts' 
    }, { status: 500 });
  }
}

// DELETE - Delete contact
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');
    
    if (!contactId) {
      return NextResponse.json({ 
        error: 'Contact ID is required' 
      }, { status: 400 });
    }

    await connectToDatabase();

    const contact = await Contact.findByIdAndDelete(contactId);
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
    console.error('Error deleting contact:', error);
    return NextResponse.json({ 
      error: 'Failed to delete contact' 
    }, { status: 500 });
  }
}