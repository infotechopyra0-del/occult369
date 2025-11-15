// Entity type definitions for the application

export interface Services {
  _id: string;
  serviceName: string;
  shortDescription: string;
  longDescription?: string;
  price: number;
  duration?: string;
  serviceImage?: string;
  serviceType?: string;
  bookingLink?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonials {
  _id: string;
  customerName: string;
  customerPhoto?: string;
  testimonialText: string;
  rating: number;
  serviceMentioned?: string;
  date?: string;
  submissionDate?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactForm {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  preferredContact?: string;
  createdAt?: string;
}
