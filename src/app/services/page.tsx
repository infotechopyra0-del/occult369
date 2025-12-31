"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Star, Clock, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ResponsiveNav from '@/components/ResponsiveNav';

interface Service {
  _id: string;
  serviceName: string;
  shortDescription: string;
  longDescription?: string;
  price: number;
  duration?: string;
  serviceImage?: string;
  serviceType?: string;
  category?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export default function ServicesPage() {
  const router = useRouter();
  const { status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data.services || []);
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleBookService = (service: Service) => {
    if (status === 'unauthenticated') {
      const url = '/login?callbackUrl=' + encodeURIComponent(`/services/checkout?serviceId=${service._id}`);
      router.push(url);
      return;
    }
    const checkoutUrl = `/services/checkout?serviceId=${service._id}`;
    router.push(checkoutUrl);
  };

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to learn more about your numerology services and book a session.";
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav currentPage="services" />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-36 pb-16 px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-heading font-bold text-[#F5F5DC] mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-paragraph text-[#F5F5DC]/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our comprehensive range of numerological and astrological services designed to illuminate your path and unlock your highest potential.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="text-lg font-paragraph text-[#301934]/80">Loading our sacred services...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-0">
                      {service.serviceImage && (
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Image
                            src={service.serviceImage}
                            alt={service.serviceName || 'Service'}
                            width={400}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-4 right-4 bg-[#B8860B] text-[#301934] px-3 py-1 rounded-full text-sm font-paragraph font-semibold">
                            {service.serviceType || 'Reading'}
                          </div>
                        </div>
                      )}
                      <div className="p-8">
                        <h3 className="text-2xl font-heading font-bold text-[#301934] mb-4">
                          {service.serviceName}
                        </h3>
                        <p className="text-[#301934]/80 font-paragraph mb-6 leading-relaxed">
                          {service.shortDescription}
                        </p>
                        {service.longDescription && (
                          <p className="text-[#301934]/70 font-paragraph mb-6 text-sm leading-relaxed">
                            {service.longDescription}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-6">
                          <div className="text-3xl font-heading font-bold text-[#B8860B]">
                            ₹{safeLocaleString(service.price)}
                          </div>
                          <div className="flex items-center text-[#B8860B]">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm font-paragraph">60 min</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90"
                          onClick={() => handleBookService(service)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Features */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-6">
              What Makes Our Readings Special
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Every reading is a sacred journey crafted with precision, intuition, and deep cosmic understanding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="w-12 h-12 text-[#B8860B]" />,
                title: "Personalized Insights",
                description: "Each reading is uniquely tailored to your birth date, name, and specific life questions."
              },
              {
                icon: <Users className="w-12 h-12 text-[#B8860B]" />,
                title: "Expert Practitioners",
                description: "Our certified numerologists have decades of combined experience in sacred number wisdom."
              },
              {
                icon: <CheckCircle className="w-12 h-12 text-[#B8860B]" />,
                title: "Comprehensive Reports",
                description: "Receive detailed written reports you can reference throughout your spiritual journey."
              },
              {
                icon: <Clock className="w-12 h-12 text-[#B8860B]" />,
                title: "Flexible Sessions",
                description: "Choose from in-person, video call, or phone consultations to suit your preferences."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-[#B8860B]/20">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-6">
              Your Sacred Reading Journey
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              From booking to transformation, here&apos;s what you can expect from your numerological consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Book Your Session",
                description: "Choose your preferred service and schedule a time that works for you through our easy booking system."
              },
              {
                step: "2",
                title: "Preparation Call",
                description: "We'll contact you to gather your birth details and understand your specific questions and goals."
              },
              {
                step: "3",
                title: "Sacred Reading",
                description: "Experience your personalized numerological consultation with our expert practitioners."
              },
              {
                step: "4",
                title: "Integration Guide",
                description: "Receive your detailed report and guidance on how to apply the insights to your daily life."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center text-2xl font-heading font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                  {step.title}
                </h3>
                <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-6">
              Sacred Wisdom FAQ
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Common questions about our numerological services and what to expect from your reading.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What information do I need for a reading?",
                answer: "We'll need your full birth name (as it appears on your birth certificate) and your complete birth date. This information forms the foundation of your numerological chart."
              },
              {
                question: "How long does a typical reading take?",
                answer: "Most readings last 60-90 minutes, allowing time for in-depth analysis and discussion of your questions. We never rush the sacred process of revelation."
              },
              {
                question: "Can I get a reading for someone else?",
                answer: "Yes, you can book readings for family members or friends. However, we recommend that the person receiving the reading be present for the most accurate and meaningful experience."
              },
              {
                question: "How often should I get a numerology reading?",
                answer: "Many clients find annual readings helpful for guidance, while others seek readings during major life transitions. Trust your intuition about when you need cosmic guidance."
              },
              {
                question: "Do you offer couple or family readings?",
                answer: "Absolutely! Our compatibility and family numerology readings explore the cosmic connections between loved ones and provide insights for harmonious relationships."
              },
              {
                question: "What if I'm skeptical about numerology?",
                answer: "We welcome all levels of belief and curiosity. Our approach is respectful and grounded, focusing on practical insights that can benefit anyone, regardless of their spiritual background."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-[#B8860B]/20">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-heading font-bold text-[#301934] mb-4">
                      {faq.question}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F5F5DC] mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl font-paragraph text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto">
              Choose the reading that calls to your soul and take the first step toward unlocking your cosmic potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
              <Button size="lg" className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                Book Your Reading Now
              </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]" onClick={handleWhatsAppContact}>
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#301934] text-[#F5F5DC] py-16 px-6">
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
              © 2025 Occult369. All rights reserved. | Unlock your destiny through ancient wisdom.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
