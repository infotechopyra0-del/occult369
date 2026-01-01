import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISampleReport extends Document {
  firstName: string;
  birthDate: Date;
  whatsappNumber: string;
  time: string;
  email: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const sampleReportSchema = new Schema<ISampleReport>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required'],
      validate: {
        validator: function(date: Date) {
          return date <= new Date();
        },
        message: 'Birth date cannot be in the future'
      }
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      trim: true,
      validate: {
        validator: function(phone: string) {
          // WhatsApp number validation (international format)
          return /^[\+]?[1-9][\d]{1,15}$/.test(phone);
        },
        message: 'Please provide a valid WhatsApp number'
      }
    }
    ,
    time: {
      type: String,
      required: [true, 'Time is required'],
      validate: {
        validator: function(t: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);
        },
        message: 'Please provide a valid time in HH:MM format'
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function(e: string) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e);
        },
        message: 'Please provide a valid email address'
      }
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [100, 'City cannot exceed 100 characters']
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'samplereports'
  }
);

// Index for efficient queries
sampleReportSchema.index({ createdAt: -1 });
sampleReportSchema.index({ firstName: 1 });

const SampleReport: Model<ISampleReport> = 
  mongoose.models.SampleReport || 
  mongoose.model<ISampleReport>('SampleReport', sampleReportSchema);

export default SampleReport;