"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle, Star, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to learn more about your numerology services.";
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is numerology and how does it work?",
          answer: "Numerology is the ancient science of numbers and their mystical relationship to life events. It works by analyzing the numerical values of your birth date, name, and other significant numbers to reveal insights about your personality, life path, destiny, and future potential. Our expert practitioners use time-tested calculations to decode the cosmic messages hidden in your personal numbers."
        },
        {
          question: "How accurate are numerology readings?",
          answer: "Our numerology readings have helped over 2,500 souls with a 98% satisfaction rate. While numerology provides profound insights and guidance, it's important to understand that it reveals potentials and tendencies rather than fixed predictions. The accuracy comes from the ancient wisdom combined with our practitioners' expertise in interpretation and your openness to the guidance provided."
        },
        {
          question: "What makes Occult369 different from other numerology services?",
          answer: "Occult369 specializes in the sacred power of numbers 3, 6, and 9 - what Tesla called 'the key to the universe.' We combine ancient numerological wisdom with modern understanding, offering personalized readings that bridge mystical insights with practical life guidance. Our practitioners are highly experienced, and we provide detailed, actionable insights rather than generic predictions."
        }
      ]
    },
    {
      category: "Services & Readings",
      questions: [
        {
          question: "What types of readings do you offer?",
          answer: "We offer comprehensive numerology readings including Life Path Analysis, Destiny Number readings, Personal Year forecasts, Compatibility reports for relationships, Business Name analysis, and specialized 369 Sacred Number readings. Each service is personalized based on your specific birth details and current life circumstances."
        },
        {
          question: "How long does a reading take?",
          answer: "Reading delivery times vary by service type. Most personal numerology readings are completed within 24-48 hours, while detailed Life Path Analysis reports may take 3-5 business days. Rush services are available for urgent requests. You'll receive a comprehensive written report along with any additional consultation time included in your selected package."
        },
        {
          question: "What information do I need to provide for a reading?",
          answer: "For accurate numerology readings, we need your full birth name (as written on your birth certificate), complete birth date (month, day, and year), and current name if different from birth name. For relationship compatibility readings, we'll need the same information for both partners. All personal information is kept strictly confidential."
        },
        {
          question: "Can you do readings for babies or children?",
          answer: "Yes! Numerology readings for children can provide valuable insights into their natural talents, potential challenges, and life purpose. These readings help parents understand their child's unique personality traits and how to best support their development. We offer specialized children's reports that are written in an encouraging, positive manner."
        }
      ]
    },
    {
      category: "Booking & Payment",
      questions: [
        {
          question: "How do I book a reading?",
          answer: "You can book a reading by contacting us through WhatsApp at +91 6390 057 777, using our contact form, or emailing us at reports@occult369.com. We'll discuss your needs, recommend the best service for you, and arrange payment and delivery details. Our team responds within 2-4 hours during business hours."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including bank transfers, UPI payments, PayPal, and major credit/debit cards. Payment details will be provided after consultation. We require 50% advance payment to begin work, with the balance due upon completion. All transactions are secure and encrypted."
        },
        {
          question: "Do you offer refunds?",
          answer: "We stand behind our work with a satisfaction guarantee. If you're not completely satisfied with your reading, we offer revisions or a partial refund within 7 days of delivery. However, due to the personalized nature of our services, refunds are evaluated case-by-case. We're committed to ensuring you receive valuable insights."
        },
        {
          question: "Can I get a sample reading first?",
          answer: "We offer brief sample insights during the initial consultation to give you a taste of our approach. While we don't provide full sample readings due to the extensive work involved, we can share examples of our previous work (with client permission) and explain our methodology to help you make an informed decision."
        }
      ]
    },
    {
      category: "Technical & Delivery",
      questions: [
        {
          question: "How will I receive my reading?",
          answer: "Readings are delivered via email as comprehensive PDF reports, typically 8-15 pages depending on the service. You'll also receive a follow-up WhatsApp message with key insights and the opportunity for a brief clarification call if needed. All reports include detailed explanations, charts, and actionable guidance."
        },
        {
          question: "Do you provide international services?",
          answer: "Yes! We serve clients worldwide. Our readings are delivered digitally, making location no barrier to accessing our services. We work with clients across different time zones and can accommodate various cultural naming conventions in our numerological calculations."
        },
        {
          question: "Can I share my reading with others?",
          answer: "Your reading is personal and confidential. While you're free to share insights with trusted family or friends, we ask that you don't distribute the complete report. If you'd like readings for multiple family members, we offer family packages with discounted rates."
        },
        {
          question: "What if I have questions after receiving my reading?",
          answer: "We provide ongoing support! You can reach out with clarification questions within 30 days of receiving your reading. We offer follow-up consultations via WhatsApp or email to help you understand and apply the insights. Additional detailed consultations can be arranged if needed."
        }
      ]
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-36 pb-16 px-4 sm:px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <HelpCircle className="w-16 h-16 text-[#B8860B] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#F5F5DC] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-paragraph text-[#F5F5DC]/90 max-w-2xl mx-auto">
              Find answers to common questions about numerology readings, our services, and the mystical science of numbers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-8 flex items-center gap-3">
                <Star className="w-8 h-8 text-[#B8860B]" />
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq) => {
                  const currentIndex = questionIndex++;
                  return (
                    <Card
                      key={currentIndex}
                      className="border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-colors overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleQuestion(currentIndex)}
                          className="w-full text-left p-6 flex justify-between items-center hover:bg-[#301934]/5 transition-colors"
                        >
                          <h3 className="text-lg font-heading font-semibold text-[#301934] pr-4">
                            {faq.question}
                          </h3>
                          {openQuestion === currentIndex ? (
                            <ChevronUp className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                          )}
                        </button>
                        
                        {openQuestion === currentIndex && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6"
                          >
                            <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#301934] mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 mb-8 max-w-2xl mx-auto">
              Our team of experienced numerologists is here to help. Get in touch for personalized answers and guidance on your spiritual journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleWhatsAppContact}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Chat on WhatsApp
              </Button>
              
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-[#301934]/70">
                <Clock className="w-5 h-5 text-[#B8860B]" />
                <span className="font-paragraph text-sm">Quick Response</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#301934]/70">
                <Shield className="w-5 h-5 text-[#B8860B]" />
                <span className="font-paragraph text-sm">Confidential</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#301934]/70">
                <Star className="w-5 h-5 text-[#B8860B]" />
                <span className="font-paragraph text-sm">Expert Guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#301934] text-[#F5F5DC] py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4">Occult369</h3>
              <p className="font-paragraph text-[#F5F5DC]/80">
                Unlocking the mysteries of numerology and astrology for personal transformation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Home</Link>
                <Link href="/about" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">About</Link>
                <Link href="/services" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Services</Link>
                <Link href="/testimonials" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Testimonials</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/faq" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">FAQ</Link>
                <Link href="/privacy-policy" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Privacy Policy</Link>
                <Link href="/terms-conditions" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Terms & Conditions</Link>
                <Link href="/returns" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm mt-2">Returns & Refunds</Link>
                <Link href="/shipping" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm mt-2">Shipping & Delivery</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Contact Us</Link>
                <div className="font-paragraph text-[#F5F5DC]/80">WhatsApp: +91 6390 057 777</div>
                <div className="font-paragraph text-[#F5F5DC]/80">Email: reports@occult369.com</div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#F5F5DC]/20 mt-12 pt-8 text-center">
            <p className="font-paragraph text-[#F5F5DC]/60">
              © 2026 Occult369. All rights reserved. | Unlock your destiny through ancient wisdom.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}