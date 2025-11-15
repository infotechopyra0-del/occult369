"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Moon, Home, ArrowLeft } from 'lucide-react';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function NotFound() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to learn more about your numerology services.";
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
      {/* Responsive Header */}
      <ResponsiveNav />

      {/* 404 Section */}
      <section className="pt-24 sm:pt-28 lg:pt-36 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Mystical Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10">
            <Star size={32} className="text-[#B8860B] animate-pulse" />
          </div>
          <div className="absolute top-40 right-20">
            <Sparkles size={28} className="text-[#B8860B] animate-bounce" />
          </div>
          <div className="absolute bottom-20 left-20">
            <Moon size={36} className="text-[#B8860B] animate-pulse" />
          </div>
          <div className="absolute bottom-40 right-10">
            <Star size={24} className="text-[#B8860B] animate-bounce" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-8xl sm:text-9xl md:text-[12rem] font-heading font-bold text-[#B8860B]/30 leading-none">
              404
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#F5F5DC] mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Lost in the Cosmic Void?
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-paragraph text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The page you&apos;re seeking has wandered into another dimension. Let the sacred numbers guide you back to your destined path.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 flex items-center gap-2">
                <Home size={20} />
                Return to Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934] flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/about"
              className="group p-6 bg-[#F5F5DC]/10 backdrop-blur-sm rounded-lg border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:bg-[#F5F5DC]/20"
            >
              <h3 className="text-lg font-heading font-semibold text-[#F5F5DC] mb-2">About Us</h3>
              <p className="text-sm font-paragraph text-[#F5F5DC]/80">Discover our sacred journey</p>
            </Link>

            <Link
              href="/services"
              className="group p-6 bg-[#F5F5DC]/10 backdrop-blur-sm rounded-lg border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:bg-[#F5F5DC]/20"
            >
              <h3 className="text-lg font-heading font-semibold text-[#F5F5DC] mb-2">Our Services</h3>
              <p className="text-sm font-paragraph text-[#F5F5DC]/80">Explore numerology readings</p>
            </Link>

            <Link
              href="/contact"
              className="group p-6 bg-[#F5F5DC]/10 backdrop-blur-sm rounded-lg border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:bg-[#F5F5DC]/20"
            >
              <h3 className="text-lg font-heading font-semibold text-[#F5F5DC] mb-2">Contact Us</h3>
              <p className="text-sm font-paragraph text-[#F5F5DC]/80">Connect with our mystics</p>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-[#F5F5DC]/70 font-paragraph mb-4">
              Need immediate guidance? Connect with us directly:
            </p>
            <Button
              onClick={handleWhatsAppContact}
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Chat on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}