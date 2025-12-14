import { z } from 'zod';

// Report validation schema
export const reportSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthTime: z.string().min(1, 'Birth time is required'),
  birthPlace: z.string().min(1, 'Birth place is required'),
  reportType: z.enum(['natal-chart', 'numerology', 'compatibility'], {
    message: 'Invalid report type'
  }),
  additionalInfo: z.string().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'delivered'], {
    message: 'Invalid status'
  }).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

// Service validation schema
export const serviceSchema = z.object({
  serviceName: z.string().min(1, 'Service name is required').max(100, 'Service name must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  detailedDescription: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  originalPrice: z.number().optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  duration: z.string().min(1, 'Duration is required'),
  serviceType: z.enum(['reading', 'consultation', 'report', 'course'], {
    message: 'Invalid service type'
  }),
  category: z.string().min(1, 'Category is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  deliverables: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
  galleryImages: z.array(z.string().url('Invalid image URL')).optional(),
  videoUrl: z.string().url('Invalid video URL').optional(),
  requirements: z.array(z.string()).optional(),
  availability: z.object({
    isAvailable: z.boolean().default(true),
    nextAvailableDate: z.date().optional(),
    maxBookingsPerDay: z.number().min(1).optional(),
  }).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Order validation schema
export const orderSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  customerInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  }),
  orderDetails: z.object({
    birthDate: z.string().optional(),
    birthTime: z.string().optional(),
    birthPlace: z.string().optional(),
    additionalInfo: z.string().optional(),
    requirements: z.record(z.string(), z.any()).optional(),
  }).optional(),
  amount: z.number().min(0, 'Amount must be a positive number'),
  currency: z.string().default('INR'),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled', 'refunded']).default('pending'),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

// User validation schema
export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  role: z.enum(['user', 'admin']).default('user'),
  isActive: z.boolean().default(true),
});

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const serviceFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  serviceType: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
});

export const reportFilterSchema = z.object({
  search: z.string().optional(),
  reportType: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const orderFilterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// Export types
export type ReportInput = z.infer<typeof reportSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
export type ServiceFilters = z.infer<typeof serviceFilterSchema>;
export type ReportFilters = z.infer<typeof reportFilterSchema>;
export type OrderFilters = z.infer<typeof orderFilterSchema>;