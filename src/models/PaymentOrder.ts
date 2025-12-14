import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the Payment Order document (Razorpay Payment Orders)
export interface IPaymentOrder extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  currency: string;
  orderId: string; // Razorpay order ID
  paymentId?: string; // Razorpay payment ID
  signature?: string; // Razorpay signature
  status: 'created' | 'paid' | 'failed';
  razorpayOrderData?: Record<string, unknown>;
  razorpayPaymentData?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  // Additional order details
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  deliveryTimeline?: string;
  additionalInfo?: string;
  
  // Instance methods
  getStatusColor(): string;
  getStatusLabel(): string;
  getFormattedAmount(): string;
  isPaymentComplete(): boolean;
}

// Payment Order Schema
const paymentOrderSchema = new Schema<IPaymentOrder>({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        const digits = v.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 15;
      },
      message: 'Please enter a valid phone number'
    }
  },
  
  serviceId: {
    type: String,
    required: [true, 'Service ID is required'],
    trim: true
  },
  
  serviceName: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be greater than 0']
  },
  
  currency: {
    type: String,
    required: true,
    default: 'INR',
    enum: ['INR', 'USD'],
    uppercase: true
  },
  
  orderId: {
    type: String,
    required: [true, 'Razorpay order ID is required'],
    unique: true,
    trim: true
  },
  
  paymentId: {
    type: String,
    trim: true,
    sparse: true // Allow multiple null values
  },
  
  signature: {
    type: String,
    trim: true
  },
  
  status: {
    type: String,
    required: true,
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  },
  
  razorpayOrderData: {
    type: Schema.Types.Mixed,
    default: null
  },
  
  razorpayPaymentData: {
    type: Schema.Types.Mixed,
    default: null
  },
  
  paidAt: {
    type: Date
  },
  
  // Additional order details
  birthDate: {
    type: String,
    trim: true,
    default: ''
  },
  
  birthTime: {
    type: String,
    trim: true,
    default: ''
  },
  
  birthPlace: {
    type: String,
    trim: true,
    default: ''
  },
  
  deliveryTimeline: {
    type: String,
    trim: true,
    enum: ['standard', 'priority', 'express', ''],
    default: 'standard'
  },
  
  additionalInfo: {
    type: String,
    trim: true,
    maxlength: [500, 'Additional info cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true,
  collection: 'payment_orders'
});

// Pre-save middleware
paymentOrderSchema.pre('save', function() {
  if (this.isModified('status') && this.status === 'paid' && !this.paidAt) {
    this.paidAt = new Date();
  }
});

// Instance method to get status color
paymentOrderSchema.methods.getStatusColor = function(): string {
  switch (this.status) {
    case 'paid':
      return '#10B981'; // Green
    case 'failed':
      return '#EF4444'; // Red
    case 'created':
      return '#F59E0B'; // Yellow/Orange
    default:
      return '#6B7280'; // Gray
  }
};

// Instance method to get status label
paymentOrderSchema.methods.getStatusLabel = function(): string {
  switch (this.status) {
    case 'paid':
      return 'Payment Successful';
    case 'failed':
      return 'Payment Failed';
    case 'created':
      return 'Payment Pending';
    default:
      return 'Unknown Status';
  }
};

// Instance method to format amount
paymentOrderSchema.methods.getFormattedAmount = function(): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: this.currency
  }).format(this.amount);
};

// Instance method to check if payment is complete
paymentOrderSchema.methods.isPaymentComplete = function(): boolean {
  return this.status === 'paid' && !!this.paymentId && !!this.signature;
};

// Static method to find orders by user email
paymentOrderSchema.statics.findByUserEmail = function(email: string) {
  return this.find({ email: email.toLowerCase().trim() }).sort({ createdAt: -1 });
};

// Static method to get order statistics
paymentOrderSchema.statics.getOrderStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    }
  ]);
};

// Indexes for better query performance
paymentOrderSchema.index({ email: 1, createdAt: -1 });
// orderId and paymentId indexes are already defined in schema fields above
paymentOrderSchema.index({ status: 1, createdAt: -1 });
paymentOrderSchema.index({ serviceId: 1, createdAt: -1 });
paymentOrderSchema.index({ createdAt: -1 });

// Compound index for admin queries
paymentOrderSchema.index({ status: 1, createdAt: -1, amount: -1 });

// Virtual for formatted creation date
paymentOrderSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for payment duration (if paid)
paymentOrderSchema.virtual('paymentDuration').get(function() {
  if (this.paidAt && this.createdAt) {
    const diff = this.paidAt.getTime() - this.createdAt.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  }
  return null;
});

// Ensure virtuals are included in JSON output
paymentOrderSchema.set('toJSON', { virtuals: true });

// Create and export the model
const PaymentOrder: Model<IPaymentOrder> = mongoose.models.PaymentOrder || mongoose.model<IPaymentOrder>('PaymentOrder', paymentOrderSchema);

export default PaymentOrder;