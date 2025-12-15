import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

// Since there's no Testimonial model, I'll create a simple response for now
// You can create a Testimonial model later if needed

export async function GET() {
  try {
    // For now, return empty array or mock data
    // Later you can create a Testimonial model and fetch from database
    
    const mockTestimonials = [
      {
        _id: "1",
        customerName: "Priya Sharma",
        testimonialText: "The numerology reading completely changed my perspective on life. The insights were incredibly accurate and helped me make important decisions about my career.",
        rating: 5,
        serviceMentioned: "Life Path Reading",
        customerPhoto: null,
        createdAt: new Date()
      },
      {
        _id: "2", 
        customerName: "Rajesh Kumar",
        testimonialText: "Amazing experience! The compatibility analysis helped me understand my relationship better. Highly recommended for anyone seeking clarity.",
        rating: 5,
        serviceMentioned: "Relationship Compatibility",
        customerPhoto: null,
        createdAt: new Date()
      },
      {
        _id: "3",
        customerName: "Anita Verma", 
        testimonialText: "The yearly forecast was spot on! It helped me prepare for challenges and opportunities. Thank you for the detailed guidance.",
        rating: 5,
        serviceMentioned: "Yearly Forecast",
        customerPhoto: null,
        createdAt: new Date()
      }
    ];

    return NextResponse.json({
      success: true,
      testimonials: mockTestimonials
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}