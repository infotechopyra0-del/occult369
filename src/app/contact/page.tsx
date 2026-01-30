"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredContact: ''
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('✨ Message sent successfully! We will contact you soon through your preferred method.');
      
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          preferredContact: ''
        });
        
        setResult("✨ Thank you! Your message has been sent successfully. We'll contact you soon through your preferred method.");
        
        // Also send WhatsApp notification for immediate response option
        setTimeout(() => {
          setResult(prev => prev + " 💬 You can also contact us instantly via WhatsApp for immediate assistance!");
        }, 2000);
        
      } else {
        toast.error(data.error || '❌ There was an error sending your message. Please try again or contact us directly via WhatsApp.');
        setResult("❌ There was an error sending your message. Please try again or contact us directly via WhatsApp.");
      }
    } catch (error) {
      toast.error('❌ Network error. Please check your connection and try again.');
      setResult("❌ Network error. Please check your connection and try again, or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to learn more about your numerology services and schedule a consultation.";
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "Numerology Reading Inquiry - Occult369";
    const body = "Hi! I'm interested in learning more about your numerology services and would like to schedule a consultation. Please contact me at your earliest convenience.\n\nBest regards,";
    window.location.href = `mailto:reports@occult369.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
  <div className="min-h-screen overflow-x-hidden relative isolate" style={{backgroundColor: '#F5F5DC', scrollbarGutter: 'stable'}}>
      {/* Responsive Header */}
      <ResponsiveNav currentPage="contact" />

      {/* Hero Section */}
  <section className="pt-24 sm:pt-28 lg:pt-36 pb-16 px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-heading font-bold mb-6" style={{color: '#F5F5DC'}}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect With Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-paragraph max-w-3xl mx-auto" style={{color: 'rgba(245,245,220,0.9)'}}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to begin your journey of cosmic discovery? Reach out to our sacred circle and let us guide you toward your destiny.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6" style={{color: '#301934'}}>
              Sacred Channels of Communication
            </h2>
            <p className="text-lg font-paragraph max-w-2xl mx-auto" style={{color: 'rgba(48,25,52,0.8)'}}>
              Choose your preferred way to connect with our cosmic guidance team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <MessageCircle className="w-12 h-12 text-[#B8860B]" />,
                title: "WhatsApp Chat",
                description: "Get instant responses and book your reading through our sacred WhatsApp channel.",
                action: "Chat Now",
                onClick: handleWhatsAppContact
              },
              {
                icon: <Phone className="w-12 h-12 text-[#B8860B]" />,
                title: "Phone Consultation",
                description: "Speak directly with our numerology experts for personalized guidance.",
                action: "Call Us",
                onClick: () => window.location.href = 'tel:+916390057777'
              },
              {
                icon: <Mail className="w-12 h-12 text-[#B8860B]" />,
                title: "Email Inquiry",
                description: "Send us detailed questions and receive comprehensive responses.",
                action: "Email Us",
                onClick: handleEmailContact
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:shadow-lg cursor-pointer" onClick={method.onClick}>
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                      {method.title}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 mb-6 leading-relaxed">
                      {method.description}
                    </p>
                    <Button className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5 relative contain-layout">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-[#B8860B]/20">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-heading font-bold text-[#301934] mb-6">
                    Begin Your Sacred Journey
                  </h3>
                  <p className="font-paragraph text-[#301934]/80 mb-8">
                    Fill out this form and we&apos;ll connect with you through your preferred method to discuss your numerological needs.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6 isolate relative">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="font-paragraph">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full birth name"
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-paragraph">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="font-paragraph">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredContact" className="font-paragraph">Preferred Contact Method</Label>
                        <Select value={formData.preferredContact} onValueChange={(value: string) => handleInputChange('preferredContact', value)}>
                          <SelectTrigger className="mt-2 relative">
                            <SelectValue placeholder="Choose your preference" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-[#F5F5DC] border border-[#B8860B]/20 shadow-xl" sideOffset={5} avoidCollisions={false} position="popper">
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="video">Video Call</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="service" className="font-paragraph">Service Interest</Label>
                      <Select value={formData.service} onValueChange={(value: string) => handleInputChange('service', value)}>
                        <SelectTrigger className="mt-2 relative">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                          <SelectContent className='z-[100] bg-[#F5F5DC] border border-[#B8860B]/20 shadow-xl' sideOffset={5} avoidCollisions={false} position="popper">
                          <SelectItem value="life-path">Life Path Reading</SelectItem>
                          <SelectItem value="numerology-chart">Complete Numerology Chart</SelectItem>
                          <SelectItem value="compatibility">Relationship Compatibility</SelectItem>
                          <SelectItem value="career-guidance">Career & Purpose Guidance</SelectItem>
                          <SelectItem value="name-analysis">Name Analysis</SelectItem>
                          <SelectItem value="yearly-forecast">Yearly Forecast</SelectItem>
                          <SelectItem value="consultation">General Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-paragraph">Your Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your questions, goals, or what you hope to discover through numerology..."
                      rows={5}
                      className="mt-2"
                    />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    
                    {/* Result Message */}
                    {result && (
                      <div className={`mt-4 p-4 rounded-lg text-center ${
                        result.includes('✨') 
                          ? 'bg-green-100 text-green-800 border border-green-300' 
                          : result.includes('❌')
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {result}
                        {result.includes('✨') && (
                          <div className="mt-3">
                            <a
                              href="https://wa.me/916390057777?text=Hi! I just submitted a contact form. Please confirm you received it."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#25D366]/90 transition-colors"
                            >
                              💬 Contact via WhatsApp
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-heading font-bold text-[#301934] mb-6">
                  Sacred Contact Details
                </h3>
                <p className="font-paragraph text-[#301934]/80 mb-8 leading-relaxed">
                  Our cosmic guidance team is here to support you on your numerological journey. Reach out through any of these sacred channels.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-[#B8860B]/20">
                  <CardContent className="p-6 flex items-center">
                    <MapPin className="w-8 h-8 text-[#B8860B] mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#301934] mb-1">Sacred Sanctuary</h4>
                      <p className="font-paragraph text-[#301934]/80">
                        AIC BUILDING BHU <br />
                        VARANASI 221005<br />
                        UP INDIA
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#B8860B]/20">
                  <CardContent className="p-6 flex items-center">
                    <Phone className="w-8 h-8 text-[#B8860B] mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#301934] mb-1">Sacred Hotline</h4>
                      <p className="font-paragraph text-[#301934]/80">
                        <a 
                          href="tel:+916390057777"
                          className="hover:text-[#B8860B] transition-colors cursor-pointer"
                        >
                          +91 6390 057 777
                        </a><br />
                        Available for consultations
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#B8860B]/20">
                  <CardContent className="p-6 flex items-center">
                    <Mail className="w-8 h-8 text-[#B8860B] mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#301934] mb-1">Cosmic Email</h4>
                      <p className="font-paragraph text-[#301934]/80">
                        <a 
                          href="mailto:reports@occult369.com?subject=Numerology Reading Inquiry - Occult369"
                          className="hover:text-[#B8860B] transition-colors cursor-pointer"
                        >
                          reports@occult369.com
                        </a><br />
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#B8860B]/20">
                  <CardContent className="p-6 flex items-center">
                    <Clock className="w-8 h-8 text-[#B8860B] mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#301934] mb-1">Sacred Hours</h4>
                      <p className="font-paragraph text-[#301934]/80">
                        Monday - Friday: 9:00 AM - 7:00 PM PST<br />
                        Saturday: 10:00 AM - 5:00 PM PST<br />
                        Sunday: By appointment only
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#B8860B]/20">
                  <CardContent className="p-6 flex items-center">
                    <MessageCircle className="w-8 h-8 text-[#B8860B] mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#301934] mb-1">WhatsApp Support</h4>
                      <p className="font-paragraph text-[#301934]/80">
                        +91 6390 057 777
                        <br />
                        Instant responses & booking
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-[#301934]/10 p-6 rounded-lg">
                <h4 className="font-heading font-semibold text-[#301934] mb-3">Emergency Spiritual Guidance</h4>
                <p className="font-paragraph text-[#301934]/80 text-sm leading-relaxed">
                  For urgent spiritual guidance or crisis support, please contact our 24/7 WhatsApp line. Our practitioners are available to provide immediate cosmic support when you need it most.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Sacred Questions & Answers
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Common questions about connecting with our cosmic guidance team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How quickly will you respond to my inquiry?",
                answer: "We typically respond to WhatsApp messages within 1-2 hours during business hours, and email inquiries within 24 hours. For urgent matters, WhatsApp is your fastest option."
              },
              {
                question: "Can I schedule a reading immediately?",
                answer: "While we strive to accommodate urgent requests, we recommend booking 2-3 days in advance to ensure availability with your preferred practitioner."
              },
              {
                question: "Do you offer readings in other languages?",
                answer: "Currently, we provide readings in English and Spanish. For other languages, please contact us to discuss special arrangements."
              },
              {
                question: "What if I'm in a different time zone?",
                answer: "We work with clients globally and can accommodate various time zones. We'll coordinate the best time for your reading during our consultation."
              },
              {
                question: "Is my personal information kept confidential?",
                answer: "Absolutely. All personal information and reading details are kept strictly confidential. We honor the sacred trust you place in us."
              },
              {
                question: "Can I reschedule my reading if needed?",
                answer: "Yes, we understand life happens. Please give us at least 24 hours notice for rescheduling, and we'll find a new time that works for you."
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
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-bold text-[#301934] mb-3">
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
              Your Cosmic Journey Awaits
            </h2>
            <p className="text-xl font-paragraph text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto">
              Don&apos;t wait for the stars to align. Take the first step toward understanding your numerological destiny today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90" onClick={handleWhatsAppContact}>
                Start WhatsApp Chat
              </Button>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                  Browse Our Services
                </Button>
              </Link>
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
                <Link href="/returns" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm mt-2">Returns & Refunds</Link>
                <Link href="/shipping" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm mt-2">Shipping & Delivery</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Contact Us</Link>
                <div className="font-paragraph text-[#F5F5DC]/80">
                  WhatsApp: 
                  <a 
                    href="https://wa.me/916390057777?text=Hi! I'd like to learn more about your numerology services."
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="hover:text-[#B8860B] transition-colors cursor-pointer ml-1"
                  >
                    +91 6390 057 777
                  </a>
                </div>
                <div className="font-paragraph text-[#F5F5DC]/80">
                  Email: 
                  <a 
                    href="mailto:reports@occult369.com?subject=Numerology Reading Inquiry - Occult369"
                    className="hover:text-[#B8860B] transition-colors cursor-pointer ml-1"
                  >
                    reports@occult369.com
                  </a>
                </div>
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
