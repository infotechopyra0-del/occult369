import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  serviceName: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  serviceImage: string;
  status: 'active' | 'inactive';
  category?: string;
  duration?: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    serviceName: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      minlength: [3, 'Service name must be at least 3 characters long'],
      maxlength: [200, 'Service name must be less than 200 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      minlength: [10, 'Short description must be at least 10 characters long'],
      maxlength: [500, 'Short description must be less than 500 characters'],
    },
    longDescription: {
      type: String,
      required: [true, 'Long description is required'],
      trim: true,
      minlength: [20, 'Long description must be at least 20 characters long'],
      maxlength: [5000, 'Long description must be less than 5000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Service price is required'],
      min: [0, 'Price must be a positive number'],
    },
    serviceImage: {
      type: String,
      required: [true, 'Service image is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
      enum: ['General', 'Astrology', 'Numerology', 'Spiritual', 'Consultation'],
    },
    duration: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
serviceSchema.index({ serviceName: 'text', shortDescription: 'text', longDescription: 'text' });
serviceSchema.index({ status: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ createdAt: -1 });

// Prevent model recompilation
const Service: Model<IService> = 
  mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);

export default Service;
