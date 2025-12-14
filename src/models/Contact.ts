import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name must be less than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number must be less than 20 characters'],
    },
    preferredContact: {
      type: String,
      enum: ['whatsapp', 'phone', 'email', 'video'],
      default: 'email',
    },
    service: {
      type: String,
      enum: [
        'life-path', 
        'numerology-chart', 
        'compatibility', 
        'career-guidance', 
        'name-analysis', 
        'yearly-forecast', 
        'consultation'
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [2000, 'Message must be less than 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Prevent model recompilation
const Contact: Model<IContact> = 
  mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
