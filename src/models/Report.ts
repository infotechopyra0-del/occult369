import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the Report document
export interface IReport extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  name: string;
  birthDate: {
    day: number;
    month: number;
    year: number;
    formatted: string; // dd-mm-yyyy format
  };
  whatsappNumber: string;
  userId?: string; // Optional user reference
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  getFormattedBirthDate(): string;
  getWhatsAppLink(): string;
}

// Report Schema
const reportSchema = new Schema<IReport>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  birthDate: {
    day: {
      type: Number,
      required: [true, 'Birth day is required'],
      min: [1, 'Day must be between 1 and 31'],
      max: [31, 'Day must be between 1 and 31']
    },
    month: {
      type: Number,
      required: [true, 'Birth month is required'],
      min: [1, 'Month must be between 1 and 12'],
      max: [12, 'Month must be between 1 and 12']
    },
    year: {
      type: Number,
      required: [true, 'Birth year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    formatted: {
      type: String,
      required: true
    }
  },
  
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        // Remove all non-digit characters for validation
        const digits = v.replace(/\D/g, '');
        // Check if it's a valid phone number length (10-15 digits)
        return digits.length >= 10 && digits.length <= 15;
      },
      message: 'Please enter a valid WhatsApp number'
    }
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true,
  collection: 'reports'
});

// Pre-save middleware to format birth date
reportSchema.pre('save', function() {
  if (this.isModified('birthDate')) {
    const { day, month, year } = this.birthDate;
    // Format as dd-mm-yyyy
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    this.birthDate.formatted = `${formattedDay}-${formattedMonth}-${year}`;
  }
});

// Instance method to get formatted birth date
reportSchema.methods.getFormattedBirthDate = function(): string {
  return this.birthDate.formatted;
};

// Instance method to get WhatsApp link
reportSchema.methods.getWhatsAppLink = function(): string {
  // Clean the number and ensure it starts with country code
  const cleanNumber = this.whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;
  return whatsappUrl;
};

// Static method to validate birth date
reportSchema.statics.validateBirthDate = function(day: number, month: number, year: number): boolean {
  // Check if the date is valid
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && 
         date.getMonth() === (month - 1) && 
         date.getDate() === day &&
         date <= new Date();
};

// Indexes for better query performance
reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ firstName: 1 });
reportSchema.index({ 'birthDate.year': 1, 'birthDate.month': 1, 'birthDate.day': 1 });
reportSchema.index({ whatsappNumber: 1 });

// Create and export the model
const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema);

export default Report;