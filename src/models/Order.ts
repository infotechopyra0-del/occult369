import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderId: string;
  serviceName: string;
  serviceType: 'natal-chart' | 'numerology' | 'soul-alignment' | 'consultation';
  price: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
  };
  bookingDetails?: {
    date?: string;
    time?: string;
    timelineSelected?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    additionalNotes?: string;
  };
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['natal-chart', 'numerology', 'soul-alignment', 'consultation'],
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending',
      index: true
    },
    transactionId: {
      type: String,
      sparse: true,
      index: true
    },
    razorpayOrderId: {
      type: String,
      sparse: true,
      index: true
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
      index: true
    },
    contactDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
      }
    },
    bookingDetails: {
      date: {
        type: String,
        trim: true
      },
      time: {
        type: String,
        trim: true
      },
      timelineSelected: {
        type: String,
        trim: true,
        maxlength: 50
      },
      birthDate: {
        type: String,
        trim: true
      },
      birthTime: {
        type: String,
        trim: true
      },
      birthPlace: {
        type: String,
        trim: true,
        maxlength: 100
      },
      additionalNotes: {
        type: String,
        trim: true,
        maxlength: 500
      }
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1, createdAt: -1 });
orderSchema.index({ serviceName: 'text', 'contactDetails.name': 'text' });

// Virtual for formatted price
orderSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price.toLocaleString('en-IN')}`;
});

// Virtual for formatted date
orderSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Static method to generate unique order ID
orderSchema.statics.generateOrderId = async function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

// Instance method to get status color for badges
orderSchema.methods.getStatusColor = function() {
  const colors: { [key: string]: string } = {
    pending: 'yellow',
    completed: 'green',
    failed: 'red',
    cancelled: 'gray'
  };
  return colors[this.paymentStatus as string] || 'gray';
};

// Instance method to get status label
orderSchema.methods.getStatusLabel = function() {
  const labels: { [key: string]: string } = {
    pending: 'Pending',
    completed: 'Payment Successful',
    failed: 'Payment Failed',
    cancelled: 'Cancelled'
  };
  return labels[this.paymentStatus as string] || 'Unknown';
};

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;