import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return NextResponse.json({ 
        error: 'Name, email, and message are required' 
      }, { status: 400 });
    }
    await connectToDatabase();
    const newContact = await Contact.create({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      preferredContact: data.preferredContact || 'email',
      service: data.service || '',
      message: data.message,
      status: 'new',
    });
    return NextResponse.json({ 
      contact: newContact,
      message: 'Message sent successfully! We will contact you soon.',
      success: true 
    });
  } catch (error) {
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
    return NextResponse.json({ 
      error: 'Failed to fetch contacts' 
    }, { status: 500 });
  }
}