import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    console.log('📧 Contact API called');
    const data = await request.json();
    console.log('📝 Received data:', data);
    
    // Validate required fields
    const { name, email, message } = data;
    if (!name || !email || !message) {
      console.log('❌ Validation failed - missing required fields');
      return NextResponse.json({ 
        error: 'Name, email, and message are required' 
      }, { status: 400 });
    }

    console.log('🔗 Connecting to database...');
    await connectToDatabase();
    console.log('✅ Database connected successfully');

    // Create new contact
    console.log('💾 Creating new contact in database...');
    const newContact = await Contact.create({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      preferredContact: data.preferredContact || 'email',
      service: data.service || '',
      message: data.message,
      status: 'new',
    });
    
    console.log('✅ Contact created successfully:', newContact._id);

    return NextResponse.json({ 
      contact: newContact,
      message: 'Message sent successfully! We will contact you soon.',
      success: true 
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: 'Validation failed: ' + error.message 
      }, { status: 400 });
    }
    return NextResponse.json({ 
      error: 'Failed to send message. Please try again.' 
    }, { status: 500 });
  }
}

// GET - Fetch all contacts (for admin)
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