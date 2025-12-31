'use client';
function safeLocaleString(val: unknown): string {
  if (typeof val === 'number' && Number.isFinite(val)) {
    try {
      return val.toLocaleString('en-IN');
    } catch {
      return val.toString();
    }
  }
  return '0';
}

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Shield, 
  Clock, 
  ArrowLeft,
  Loader2,
  CheckCircle,
  Star,
  Lock,
  Phone,
  Mail,
  User
} from 'lucide-react';
import Link from 'next/link';
import { Services } from '@/entities';
import ResponsiveNav from '@/components/ResponsiveNav';

declare global {
  interface Window {
    Razorpay: {
      new (options: Record<string, unknown>): {
        open(): void;
        on(event: string, callback: (response: Record<string, unknown>) => void): void;
      };
    };
  }
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
}

const CheckoutPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const [service, setService] = useState<Services | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const serviceId = searchParams.get('serviceId');
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href));
    }
  }, [status, router]);

  useEffect(() => {
    if (!serviceId) {
      router.push('/services');
      return;
    }

    const fetchService = async () => {
      try {
        setLoading(true);
        const fetchUrl = `/api/services/${serviceId}`;
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Service not found');
        }
        const data = await response.json();
        setService(data.service); 
      } catch (error) {
        toast.error('Service not found');
        router.push('/services');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId, router]);

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || ''
      }));
    }
  }, [session]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm() || !service) return;

    setProcessing(true);
    
    try {
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          serviceId: serviceId,
          amount: service.price 
        })
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.json();
        throw new Error(error.error || 'Failed to create order');
      }

      const orderData = await orderResponse.json();
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.name,
        description: orderData.description,
        image: orderData.image,
        order_id: orderData.orderId,
        prefill: orderData.prefill,
        notes: orderData.notes,
        theme: orderData.theme,
        handler: function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          // Payment successful
          const successUrl = `/payment-success?orderId=${orderData.orderId}&amount=${service?.price || 0}&currency=INR&service=${encodeURIComponent(service?.serviceName || 'Service')}&transactionId=${response.razorpay_payment_id}&customerName=${encodeURIComponent(formData.name)}&customerEmail=${encodeURIComponent(formData.email)}&customerPhone=${encodeURIComponent(formData.phone)}`;
          window.location.href = successUrl;
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            toast.error('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response: Record<string, unknown>) {
        const error = response.error as { code: string; description: string; source: string; step: string; reason: string };
        const failedUrl = `/payment-failed?orderId=${orderData.orderId}&amount=${service?.price || 0}&currency=INR&service=${encodeURIComponent(service?.serviceName || 'Service')}&errorReason=${encodeURIComponent(error?.description || 'Payment failed')}&errorCode=${error?.code || 'UNKNOWN'}`;
        window.location.href = failedUrl;
      });

      razorpay.open();

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed');
      setProcessing(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
        <ResponsiveNav />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#B8860B] mx-auto mb-4" />
            <p className="text-[#301934]">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  // Authentication required
  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
        <ResponsiveNav />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center text-[#301934]">
            <p>Please sign in to continue with checkout.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
        <ResponsiveNav />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center text-[#301934]">
            <p>Service not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      <ResponsiveNav />

      {/* Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-[#F5F5DC] hover:text-[#B8860B] hover:bg-[#F5F5DC]/10"
            >
              <Link href="/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#F5F5DC] mb-4">
              Secure Checkout
            </h1>
            <p className="text-lg text-[#F5F5DC]/90">
              Complete your purchase for {service?.serviceName || 'Selected Service'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-[#B8860B]/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading font-bold text-[#301934] flex items-center gap-3">
                      <User className="w-6 h-6 text-[#B8860B]" />
                      Your Information
                    </CardTitle>
                    <CardDescription className="text-[#301934]/70">
                      Please provide your details for service delivery
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#301934] flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`bg-[#F5F5DC]/50 border-[#B8860B]/30 text-[#301934] placeholder-[#301934]/50 ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                        disabled={processing}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#301934] flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`bg-[#F5F5DC]/50 border-[#B8860B]/30 text-[#301934] placeholder-[#301934]/50 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        disabled={processing}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#301934] flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`bg-[#F5F5DC]/50 border-[#B8860B]/30 text-[#301934] placeholder-[#301934]/50 ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                        disabled={processing}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    {/* Security Notice */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-green-800">
                          <p className="font-semibold mb-1">Secure Payment</p>
                          <p>Your personal and payment information is protected with industry-standard encryption.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-[#B8860B]/30 shadow-xl sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading font-bold text-[#301934] flex items-center gap-3">
                      <Star className="w-5 h-5 text-[#B8860B]" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Service Details */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-[#301934]">{service?.serviceName || 'Service'}</h3>
                      <p className="text-sm text-[#301934]/70 leading-relaxed">
                        {service?.shortDescription || 'Service description'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-[#301934]/70">
                        <Clock className="w-4 h-4" />
                        <span>Delivered within 24-48 hours</span>
                      </div>
                    </div>

                    <Separator className="bg-[#B8860B]/20" />

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[#301934]">
                        <span>Service Price</span>
                        <span>₹{safeLocaleString(service?.price)}</span>
                      </div>
                      <div className="flex justify-between text-[#301934]/70 text-sm">
                        <span>Taxes & Fees</span>
                        <span>Included</span>
                      </div>
                    </div>

                    <Separator className="bg-[#B8860B]/20" />

                    <div className="flex justify-between text-lg font-bold text-[#301934]">
                      <span>Total Amount</span>
                      <span>₹{safeLocaleString(service?.price)}</span>
                    </div>

                    {/* Payment Button */}
                    <Button
                      onClick={handlePayment}
                      disabled={processing}
                      className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 font-semibold py-3 flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Proceed to Payment
                        </>
                      )}
                    </Button>

                    {/* Security Badges */}
                    <div className="pt-4 text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-xs text-[#301934]/60">
                        <Lock className="w-3 h-3" />
                        <span>SSL Secured Payment</span>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-[#301934]/60">
                        <span>💳 All Cards</span>
                        <span>📱 UPI</span>
                        <span>🏦 Net Banking</span>
                      </div>
                    </div>

                    {/* What You Get */}
                    <div className="pt-4 space-y-2">
                      <h4 className="font-semibold text-[#301934] text-sm">What You&apos;ll Receive:</h4>
                      <div className="space-y-1 text-xs text-[#301934]/70">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Detailed personalized report</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Email & WhatsApp delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Expert consultation support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>7-day satisfaction guarantee</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D0B1E] via-[#1A1B3A] to-[#2D1B3D]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default CheckoutPage;