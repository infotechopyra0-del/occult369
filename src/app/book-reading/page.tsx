"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Calendar, Clock, User, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function BookReadingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    currentName: '',
    service: '',
    urgency: '',
    message: '',
    preferredContact: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending....");
    
    // Submit to Web3Forms
    const formDataSubmit = new FormData();
    formDataSubmit.append("access_key", "0a5155ff-51aa-4945-b7d8-b69123baeecd");
    formDataSubmit.append("name", formData.name);
    formDataSubmit.append("email", formData.email);
    formDataSubmit.append("phone", formData.phone);
    formDataSubmit.append("birth_date", formData.birthDate);
    formDataSubmit.append("birth_time", formData.birthTime);
    formDataSubmit.append("birth_place", formData.birthPlace);
    formDataSubmit.append("current_name", formData.currentName);
    formDataSubmit.append("service", formData.service);
    formDataSubmit.append("urgency", formData.urgency);
    formDataSubmit.append("preferred_contact", formData.preferredContact);
    formDataSubmit.append("message", formData.message);
    formDataSubmit.append("subject", "New Numerology Reading Booking");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataSubmit
      });

      const data = await response.json();
      if (data.success) {
        setResult("Booking submitted successfully! We'll contact you soon.");
        setIsSubmitted(true);
        
        // Also send to WhatsApp for immediate contact
        const message = `🌟 NEW NUMEROLOGY READING BOOKING 🌟

📋 PERSONAL DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Current Name (if different): ${formData.currentName || 'Same as birth name'}

🎂 BIRTH INFORMATION:
Birth Date: ${formData.birthDate}
Birth Time: ${formData.birthTime || 'Not provided'}
Birth Place: ${formData.birthPlace}

📖 SERVICE DETAILS:
Service Type: ${formData.service}
Urgency: ${formData.urgency}
Preferred Contact: ${formData.preferredContact}

💬 ADDITIONAL MESSAGE:
${formData.message || 'No additional message'}

Please confirm my booking and provide payment details. Thank you! ✨`;

        const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        setResult("Error submitting booking. Please try again.");
      }
    } catch {
      setResult("Error submitting booking. Please try again.");
    }
  };

  const services = [
    { id: 'life-path', name: 'Life Path Analysis', price: '₹2,999', description: 'Complete numerological blueprint of your life journey' },
    { id: 'destiny-number', name: 'Destiny Number Reading', price: '₹1,999', description: 'Discover your life purpose and destiny' },
    { id: 'compatibility', name: 'Relationship Compatibility', price: '₹3,499', description: 'Numerological analysis for couples' },
    { id: 'business-name', name: 'Business Name Analysis', price: '₹2,499', description: 'Optimize your business name for success' },
    { id: 'personal-year', name: 'Personal Year Forecast', price: '₹1,799', description: 'What the numbers reveal for this year' },
    { id: 'sacred-369', name: 'Sacred 369 Reading', price: '₹4,999', description: 'Advanced Tesla-inspired numerology analysis' }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
        <ResponsiveNav />
        
        <section className="pt-24 sm:pt-28 lg:pt-36 pb-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 bg-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-[#301934]" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#301934] mb-6">
                Booking Request Sent!
              </h1>
              
              <p className="text-lg font-paragraph text-[#301934]/80 mb-8 leading-relaxed">
                Thank you for your interest in our numerology services! Your booking request has been sent via WhatsApp. 
                Our team will contact you within 2-4 hours to confirm your reading and provide payment details.
              </p>
              
              <div className="bg-[#301934]/5 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">What happens next?</h3>
                <ul className="text-left font-paragraph text-[#301934]/80 space-y-2">
                  <li>✓ We&apos;ll review your birth details for accuracy</li>
                  <li>✓ Confirm service type and delivery timeline</li>
                  <li>✓ Send secure payment link (50% advance required)</li>
                  <li>✓ Begin your personalized numerology reading</li>
                  <li>✓ Deliver comprehensive report within promised timeframe</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="w-full sm:w-auto bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                    Return Home
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="w-full sm:w-auto border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
          >
            <Calendar className="w-16 h-16 text-[#B8860B] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#F5F5DC] mb-4">
              Book Your Numerology Reading
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-[#F5F5DC]/90 max-w-2xl mx-auto mb-8">
              Begin your journey of self-discovery with a personalized numerology reading. 
              Unlock the secrets hidden in your birth details and name.
            </p>
            
            {/* Quick Contact Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 flex items-center gap-2"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar size={20} />
                Book Online Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934] flex items-center gap-2"
                onClick={() => window.location.href = 'tel:+916390057777'}
              >
                <Phone size={20} />
                📞 Call Now: +91 6390 057 777
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Selection */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#301934] mb-6">
              Choose Your Reading Type
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Select the numerology service that best suits your needs. Each reading is personalized and includes detailed insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`h-full border-2 transition-all duration-300 cursor-pointer ${
                    formData.service === service.id 
                      ? 'border-[#B8860B] bg-[#B8860B]/5' 
                      : 'border-[#B8860B]/20 hover:border-[#B8860B]/40'
                  }`}
                  onClick={() => handleInputChange('service', service.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B] to-[#301934] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-[#F5F5DC]" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[#301934]/80 font-paragraph mb-4 text-sm">
                      {service.description}
                    </p>
                    <div className="text-2xl font-heading font-bold text-[#B8860B] mb-4">
                      {service.price}
                    </div>
                    {formData.service === service.id && (
                      <div className="w-6 h-6 bg-[#B8860B] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-4 h-4 text-[#F5F5DC]" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-[#B8860B]/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-[#301934] mb-6 text-center">
                  Your Details
                </h3>
                
                <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[#301934] font-paragraph font-semibold">
                        Full Birth Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-[#B8860B]/30 focus:border-[#B8860B]"
                        placeholder="Enter your full name as on birth certificate"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currentName" className="text-[#301934] font-paragraph font-semibold">
                        Current Name (if different)
                      </Label>
                      <Input
                        id="currentName"
                        type="text"
                        value={formData.currentName}
                        onChange={(e) => handleInputChange('currentName', e.target.value)}
                        className="border-[#B8860B]/30 focus:border-[#B8860B]"
                        placeholder="Current name you use"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-[#301934] font-paragraph font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-[#B8860B]/30 focus:border-[#B8860B]"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-[#301934] font-paragraph font-semibold">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-[#B8860B]/30 focus:border-[#B8860B]"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>

                  {/* Birth Information */}
                  <div className="border-t border-[#B8860B]/20 pt-6">
                    <h4 className="text-lg font-heading font-semibold text-[#301934] mb-4">
                      Birth Information
                    </h4>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="birthDate" className="text-[#301934] font-paragraph font-semibold">
                          Birth Date *
                        </Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          className="border-[#B8860B]/30 focus:border-[#B8860B]"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="birthTime" className="text-[#301934] font-paragraph font-semibold">
                          Birth Time (if known)
                        </Label>
                        <Input
                          id="birthTime"
                          type="time"
                          value={formData.birthTime}
                          onChange={(e) => handleInputChange('birthTime', e.target.value)}
                          className="border-[#B8860B]/30 focus:border-[#B8860B]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="birthPlace" className="text-[#301934] font-paragraph font-semibold">
                          Birth Place *
                        </Label>
                        <Input
                          id="birthPlace"
                          type="text"
                          value={formData.birthPlace}
                          onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                          className="border-[#B8860B]/30 focus:border-[#B8860B]"
                          placeholder="City, State, Country"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Preferences */}
                  <div className="border-t border-[#B8860B]/20 pt-6">
                    <h4 className="text-lg font-heading font-semibold text-[#301934] mb-4">
                      Service Preferences
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="urgency" className="text-[#301934] font-paragraph font-semibold">
                          Delivery Timeline
                        </Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                          <SelectTrigger className="border-[#B8860B]/30 focus:border-[#B8860B]">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (3-5 days) - No extra cost</SelectItem>
                            <SelectItem value="priority">Priority (24-48 hours) - +50% cost</SelectItem>
                            <SelectItem value="express">Express (12-24 hours) - +100% cost</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="preferredContact" className="text-[#301934] font-paragraph font-semibold">
                          Preferred Contact Method
                        </Label>
                        <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                          <SelectTrigger className="border-[#B8860B]/30 focus:border-[#B8860B]">
                            <SelectValue placeholder="How to contact you" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <Label htmlFor="message" className="text-[#301934] font-paragraph font-semibold">
                      Additional Questions or Requests
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-[#B8860B]/30 focus:border-[#B8860B] min-h-[100px]"
                      placeholder="Any specific questions or areas you'd like us to focus on..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full sm:w-auto bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 flex items-center gap-2"
                      disabled={!formData.name || !formData.email || !formData.phone || !formData.birthDate || !formData.birthPlace || !formData.service}
                    >
                      <MessageCircle size={20} />
                      Send Booking Request
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline" 
                      size="lg"
                      className="w-full sm:w-auto border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934] flex items-center gap-2"
                      onClick={() => window.location.href = 'tel:+916390057777'}
                    >
                      <Phone size={20} />
                      📞 Call Directly
                    </Button>
                  </div>

                  {result && (
                    <p className={`text-center text-sm font-medium ${result.includes('successfully') ? 'text-green-600' : result.includes('Sending') ? 'text-blue-600' : 'text-red-600'}`}>
                      {result}
                    </p>
                  )}

                  <p className="text-sm font-paragraph text-[#301934]/60 text-center">
                    By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                    We&apos;ll contact you within 2-4 hours to confirm your booking.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#301934] mb-6">
              Why Choose Occult369?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="w-8 h-8 text-[#B8860B]" />,
                title: "Expert Practitioners",
                description: "Over 10 years of experience in numerology and ancient wisdom traditions"
              },
              {
                icon: <Clock className="w-8 h-8 text-[#B8860B]" />,
                title: "Fast Delivery",
                description: "Comprehensive readings delivered within 24-48 hours or your chosen timeline"
              },
              {
                icon: <Star className="w-8 h-8 text-[#B8860B]" />,
                title: "98% Satisfaction",
                description: "Over 2,500 satisfied clients with personalized, accurate insights"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-[#301934] mb-3">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-[#301934]/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
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