"use client"
import ResponsiveNav from '@/components/ResponsiveNav';
import { motion } from 'framer-motion';
import { Star, Sparkles, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav currentPage="shipping" />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-20 sm:py-32 overflow-hidden">
        {/* Cosmic Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute top-10 left-4 text-[#B8860B]/40">
            <Star size={20} />
          </div>
          <div className="absolute top-20 right-8 text-[#B8860B]/30">
            <Sparkles size={28} />
          </div>
        </motion.div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-[#F5F5DC] mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-2">
              <Truck className="w-10 h-10 text-[#B8860B]" />
              Shipping & Delivery
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-[#F5F5DC]/90 mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Learn about our fast, secure, and reliable shipping process for all your digital and physical orders at Occult369.
          </motion.p>
        </div>
      </section>

      {/* Shipping Details Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-[#F5F5DC] rounded-xl shadow-xl border border-[#B8860B]/20 p-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-2">
            <Truck className="w-7 h-7 text-[#B8860B]" />
            Shipping Policy
          </h2>
          <ul className="list-disc pl-6 text-[#301934]/90 text-lg space-y-4 mb-8">
            <li>
              <span className="font-semibold text-[#B8860B]">Digital Products:</span> All numerology reports, PDFs, and digital guides are delivered instantly to your WhatsApp and email after payment confirmation.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Physical Products:</span> If you order any physical items (books, charts, etc.), they are shipped within 2-3 business days via trusted courier partners.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Shipping Charges:</span> Digital products are delivered free of charge. Physical product shipping fees (if any) are calculated at checkout.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Tracking:</span> You will receive a tracking link via WhatsApp/email once your physical order is dispatched.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Delivery Time:</span> Most physical orders are delivered within 5-7 business days across India. Delays may occur due to unforeseen circumstances.
            </li>
          </ul>
          <div className="text-[#301934]/80 text-base mb-4">
            For any shipping-related queries, please <Link href="/contact" className="text-[#B8860B] underline hover:text-[#A020F0]">contact us</Link>.
          </div>
        </div>
      </section>
    </div>
  );
}
