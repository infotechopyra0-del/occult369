"use client"
import ResponsiveNav from '@/components/ResponsiveNav';
import { motion } from 'framer-motion';
import { Star, Sparkles, Undo2 } from 'lucide-react';
import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav currentPage="returns" />

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
              <Undo2 className="w-10 h-10 text-[#B8860B]" />
              Returns & Refunds
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-[#F5F5DC]/90 mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Understand our returns and refund policy for digital and physical products at Occult369. We value your satisfaction and trust.
          </motion.p>
        </div>
      </section>

      {/* Returns Details Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-[#F5F5DC] rounded-xl shadow-xl border border-[#B8860B]/20 p-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-2">
            <Undo2 className="w-7 h-7 text-[#B8860B]" />
            Returns & Refund Policy
          </h2>
          <ul className="list-disc pl-6 text-[#301934]/90 text-lg space-y-4 mb-8">
            <li>
              <span className="font-semibold text-[#B8860B]">Digital Products:</span> Due to the personalized nature of our digital reports and instant delivery, all sales of digital products (PDFs, numerology reports, etc.) are final and non-refundable.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Physical Products:</span> Returns are accepted only for damaged or incorrect items. Please contact us within 48 hours of delivery with photos and order details.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Refunds:</span> Approved refunds for physical products will be processed to your original payment method within 7 business days after we receive and inspect the returned item.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Exchanges:</span> We do not offer exchanges for digital products. For physical products, exchanges are possible only for the same item if available.
            </li>
            <li>
              <span className="font-semibold text-[#B8860B]">Contact:</span> For any return or refund request, please <Link href="/contact" className="text-[#B8860B] underline hover:text-[#A020F0]">contact us</Link> with your order number and issue details.
            </li>
          </ul>
          <div className="text-[#301934]/80 text-base mb-4">
            We are committed to your satisfaction. If you have any questions, please reach out to our support team.
          </div>
        </div>
      </section>
    </div>
  );
}
