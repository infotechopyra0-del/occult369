"use client"
import { motion, useTransform, useScroll } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Star, Sparkles, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Services, Testimonials } from '@/entities';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function HomePage() {
  const [services, setServices] = useState<Services[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [result, setResult] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 25]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "0a5155ff-51aa-4945-b7d8-b69123baeecd");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully! We'll send your sample report soon.");
      event.currentTarget.reset();
    } else {
      setResult("Error submitting form. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, testimonialsData] = await Promise.all([
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<Testimonials>('testimonials')
        ]);
        setServices(servicesData.items.slice(0, 3));
        setTestimonials(testimonialsData.items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav currentPage="home" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cosmic Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: y2 }}
        >
          <div className="absolute top-10 sm:top-20 left-4 sm:left-20 text-[#B8860B]/40">
            <Star size={16} className="sm:w-6 sm:h-6" />
          </div>
          <div className="absolute top-20 sm:top-40 right-8 sm:right-32 text-[#B8860B]/30">
            <Sparkles size={20} className="sm:w-8 sm:h-8" />
          </div>
          <div className="absolute bottom-20 sm:bottom-32 left-8 sm:left-40 text-[#B8860B]/50">
            <Moon size={18} className="sm:w-7 sm:h-7" />
          </div>
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 text-[#B8860B]/40">
            <Sun size={22} className="sm:w-9 sm:h-9" />
          </div>
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-[#F5F5DC] mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Occult369 Unlock Your Destiny
          </motion.h1>
          
          {/* Tagline */}
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-[#B8860B] font-heading font-semibold text-lg sm:text-xl md:text-2xl">
              <span className="relative">
                Decode
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#B8860B]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </span>
              <span className="text-[#F5F5DC]/50">•</span>
              <span className="relative">
                Discover
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#B8860B]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </span>
              <span className="text-[#F5F5DC]/50">•</span>
              <span className="relative">
                Awaken
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#B8860B]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                />
              </span>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-paragraph text-[#F5F5DC]/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            Discover the hidden meanings in numbers and unlock the secrets of your personal journey through ancient numerology and astrology.
          </motion.p>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-4 sm:mb-6">
                Ancient Wisdom for Modern Life
              </h2>
              <p className="text-lg font-paragraph text-[#301934]/80 mb-6 leading-relaxed">
                At Occult369, we bridge the gap between ancient numerological wisdom and contemporary life challenges. Our expert practitioners use time-tested methods to reveal the hidden patterns in your life.
              </p>
              <p className="text-lg font-paragraph text-[#301934]/80 mb-8 leading-relaxed">
                Whether you&apos;re seeking clarity in relationships, career guidance, or spiritual growth, our personalized readings provide insights that empower you to make informed decisions.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                  Discover Our Story
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/MysticalNumerology.png"
                alt="Mystical numerology symbols and cosmic elements with sacred geometry"
                width={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-[#B8860B]" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#301934]/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#301934]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get 55+ PDF Instantly Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#301934] via-[#301934]/95 to-[#A020F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-[#B8860B]/20 text-[#B8860B] rounded-full text-sm font-semibold mb-4">
                  📚 INSTANT ACCESS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#F5F5DC] mb-6">
                  Get 55+ Premium PDFs
                  <span className="block text-[#B8860B]">Instantly!</span>
                </h2>
                <p className="text-lg text-[#F5F5DC]/90 mb-8 leading-relaxed">
                  Unlock a treasure trove of ancient numerology wisdom with our exclusive collection of premium guides, charts, and detailed analysis reports.
                </p>
              </div>

              {/* Features List */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "✨ Complete Numerology Charts",
                  "🔮 Life Path Calculations",
                  "💫 Compatibility Analysis",
                  "📊 Personal Year Forecasts",
                  "🌟 Sacred Number Meanings",
                  "📈 Business Numerology Guide"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-[#F5F5DC]/90 text-sm"
                  >
                    <span className="mr-2">{feature.split(' ')[0]}</span>
                    <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://wa.me/916390057777?text=Hi! I want to get the 55+ Premium PDF collection instantly. Please send me the download link."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button className="w-full sm:w-auto bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 text-lg py-3 px-8 font-semibold">
                    📱 Get PDFs via WhatsApp
                  </Button>
                </motion.a>
                <Link href="/contact">
                  <Button variant="outline" className="w-full sm:w-auto border-[#F5F5DC] text-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-[#301934] text-lg py-3 px-8">
                    📧 Email Download
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main PDF Stack Visualization */}
              <div className="relative max-w-md mx-auto">
                {/* Background PDFs */}
                <div className="absolute top-4 left-4 w-full h-80 bg-[#F5F5DC]/20 rounded-lg transform rotate-3 backdrop-blur-sm"></div>
                <div className="absolute top-2 left-2 w-full h-80 bg-[#F5F5DC]/30 rounded-lg transform rotate-1 backdrop-blur-sm"></div>
                
                {/* Main PDF */}
                <Card className="relative bg-[#F5F5DC] border-[#B8860B]/30 shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">55+</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-[#301934] mb-2">
                        Premium PDFs
                      </h3>
                      <p className="text-[#301934]/70 text-sm mb-4">
                        Complete Numerology Collection
                      </p>
                    </div>
                    
                    {/* PDF Preview Icons */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {Array.from({length: 9}).map((_, i) => (
                        <div key={i} className="h-8 bg-[#301934]/10 rounded flex items-center justify-center">
                          <span className="text-xs text-[#301934]/60">📄</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-xs text-[#301934]/60">
                      ⚡ Instant Download • 🔒 Secure Access
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-[#B8860B]/30 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Star className="w-6 h-6 text-[#B8860B]" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-[#F5F5DC]/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Sparkles className="w-5 h-5 text-[#F5F5DC]" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-[#B8860B]/20"
          >
            {[
              { number: "55+", label: "Premium PDFs" },
              { number: "1000+", label: "Happy Customers" },
              { number: "24/7", label: "Instant Access" },
              { number: "100%", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#B8860B] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#F5F5DC]/70 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customized Report Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-6">
              Get Your Personalized
              <span className="block text-[#B8860B]">Numerology Report</span>
            </h2>
            <p className="text-lg text-[#301934]/80 max-w-3xl mx-auto leading-relaxed">
              Discover your unique numerological blueprint with our comprehensive, personalized report tailored specifically for you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Report Preview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Report Card */}
              <Card className="bg-gradient-to-br from-[#F5F5DC] to-[#F5F5DC]/80 border-[#B8860B]/30 shadow-2xl max-w-md mx-auto">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#301934] text-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">📊</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-2">
                      Personal Numerology Report
                    </h3>
                    <p className="text-[#301934]/70 text-sm">
                      Customized for John Doe
                    </p>
                  </div>

                  {/* Sample Report Content */}
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#B8860B] pl-4">
                      <h4 className="font-semibold text-[#301934] text-sm mb-1">Life Path Number</h4>
                      <p className="text-[#301934]/70 text-xs">7 - The Seeker of Truth</p>
                    </div>
                    <div className="border-l-4 border-[#A020F0] pl-4">
                      <h4 className="font-semibold text-[#301934] text-sm mb-1">Expression Number</h4>
                      <p className="text-[#301934]/70 text-xs">3 - The Creative Communicator</p>
                    </div>
                    <div className="border-l-4 border-[#B8860B] pl-4">
                      <h4 className="font-semibold text-[#301934] text-sm mb-1">Soul Urge Number</h4>
                      <p className="text-[#301934]/70 text-xs">9 - The Humanitarian</p>
                    </div>
                    
                    {/* Chart Visualization */}
                    <div className="bg-[#301934]/5 rounded-lg p-4 mt-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {[7, 3, 9, 1, 5, 2].map((num, i) => (
                          <div key={i} className="w-8 h-8 bg-[#B8860B]/20 rounded flex items-center justify-center text-xs font-bold text-[#301934]">
                            {num}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-[#301934]/60 mt-2 text-center">Numerological Chart</p>
                    </div>
                  </div>

                  {/* Report Features */}
                  <div className="mt-6 pt-4 border-t border-[#B8860B]/20">
                    <div className="text-xs text-[#301934]/60 space-y-1">
                      <div>✓ 25+ Page Detailed Analysis</div>
                      <div>✓ Personalized Insights</div>
                      <div>✓ Year Predictions</div>
                      <div>✓ Compatibility Guide</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-12 h-12 bg-[#B8860B]/20 rounded-full flex items-center justify-center"
              >
                <Star className="w-6 h-6 text-[#B8860B]" />
              </motion.div>
            </motion.div>

            {/* Right: Form & Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Quick Form */}
              <Card className="mb-8 border-[#B8860B]/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                    🌟 Get Your Free Sample Report
                  </h3>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#301934] mb-2">First Name</label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Enter your name"
                          required
                          className="w-full px-3 py-2 border border-[#B8860B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 bg-[#F5F5DC]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#301934] mb-2">Birth Date</label>
                        <input 
                          type="date" 
                          name="birth_date"
                          required
                          className="w-full px-3 py-2 border border-[#B8860B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 bg-[#F5F5DC]/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#301934] mb-2">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        name="whatsapp"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="w-full px-3 py-2 border border-[#B8860B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 bg-[#F5F5DC]/50"
                      />
                    </div>
                    <input type="hidden" name="subject" value="Free Sample Numerology Report Request" />
                    <Button type="submit" className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 py-3">
                      📱 Send My Sample Report
                    </Button>
                    {result && (
                      <p className={`text-center text-sm ${result.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                        {result}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* Report Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold text-[#301934] mb-4">
                  What&apos;s Included in Your Report?
                </h3>
                
                <div className="grid gap-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Life Path Analysis",
                      description: "Discover your core purpose and the journey you're meant to take in this lifetime."
                    },
                    {
                      icon: "💫",
                      title: "Personality Insights",
                      description: "Understand your natural traits, strengths, and areas for personal growth."
                    },
                    {
                      icon: "💝",
                      title: "Relationship Compatibility",
                      description: "Learn about your compatibility with others and how to build stronger connections."
                    },
                    {
                      icon: "📈",
                      title: "Career & Finance Guidance",
                      description: "Discover the best career paths and financial opportunities aligned with your numbers."
                    },
                    {
                      icon: "🔮",
                      title: "Year Ahead Forecast",
                      description: "Get insights into upcoming opportunities, challenges, and optimal timing."
                    },
                    {
                      icon: "🎨",
                      title: "Personal Growth Roadmap",
                      description: "Actionable steps to unlock your highest potential and achieve your goals."
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-[#301934]/5 transition-colors"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-semibold text-[#301934] mb-1">{feature.title}</h4>
                        <p className="text-[#301934]/70 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Full Report CTA */}
                <Card className="bg-gradient-to-r from-[#301934] to-[#A020F0] text-white">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-heading font-bold mb-2">
                      Ready for Your Complete Report?
                    </h4>
                    <p className="text-white/90 mb-4 text-sm">
                      Get the full 25+ page detailed analysis with personalized insights, predictions, and guidance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/book-reading" className="flex-1">
                        <Button className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                          📞 Book Full Reading
                        </Button>
                      </Link>
                      <a 
                        href="https://wa.me/916390057777?text=Hi! I want to order my complete personalized numerology report. Please share the details and pricing."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-[#301934]">
                          💬 WhatsApp Order
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sacred Numbers Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-4 sm:mb-6">
              The Sacred Power of 369
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-3xl mx-auto">
              Discover why Nikola Tesla called 3, 6, and 9 the key to the universe and how these sacred numbers can unlock your destiny.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                number: "3",
                title: "Creation & Expression",
                description: "The number of divine creativity, communication, and artistic expression. It represents the trinity of mind, body, and spirit.",
                image: "/images/Creation&Expression.png"
              },
              {
                number: "6",
                title: "Harmony & Love",
                description: "The number of nurturing, responsibility, and unconditional love. It governs family, home, and healing energies.",
                image: "/images/Harmony&Love.png"
              },
              {
                number: "9",
                title: "Completion & Wisdom",
                description: "The number of universal consciousness, spiritual awakening, and the completion of cycles. It represents enlightenment.",
                image: "/images/Completion&Wisdom.png"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <Image
                        src={item.image}
                        alt={`Sacred number ${item.number} symbolism`}
                        width={200}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center text-3xl font-heading font-bold shadow-lg">
                        {item.number}
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-[#301934] mb-4 mt-6">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <Image
                src="/images/TeslaSacred.png"
                alt="Tesla's sacred 369 quote with mystical background"
                width={800}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-[#301934]/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-[#F5F5DC] p-8">
                  <blockquote className="text-2xl md:text-3xl font-heading font-bold mb-4 italic">
                    &ldquo;If you only knew the magnificence of the 3, 6 and 9, then you would have the key to the universe.&rdquo;
                  </blockquote>
                  <cite className="text-lg font-paragraph">— Nikola Tesla</cite>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-4 sm:mb-6">
              Our Sacred Services
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Explore our range of personalized numerological and astrological services designed to illuminate your path.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-colors">
                  <CardContent className="p-8 text-center">
                    {service.serviceImage ? (
                      <Image
                        src={service.serviceImage}
                        alt={service.serviceName || 'Service'}
                        width={300}
                        className="w-full h-48 object-cover rounded-lg mb-6"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-[#301934]/20 to-[#B8860B]/20 rounded-lg mb-6 flex items-center justify-center">
                        <div className="text-center">
                          <Star className="w-16 h-16 text-[#B8860B] mx-auto mb-2" />
                          <div className="text-sm font-paragraph text-[#301934]/60">Sacred Reading</div>
                        </div>
                      </div>
                    )}
                    <h3 className="text-2xl font-heading font-bold text-[#301934] mb-4">
                      {service.serviceName}
                    </h3>
                    <p className="text-[#301934]/80 font-paragraph mb-6">
                      {service.shortDescription}
                    </p>
                    <div className="text-2xl font-heading font-bold text-[#B8860B] mb-6">
                      ₹{service.price.toLocaleString('en-IN')}
                    </div>
                    <a 
                      href={`https://wa.me/916390057777?text=Hi! I want to buy the ${service.serviceName} service for ₹${service.price.toLocaleString('en-IN')}. Please send me the payment details and schedule my session.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 font-semibold">
                        💬 Buy Now
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mystical Elements Gallery */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-4 sm:mb-6">
              Sacred Symbols & Cosmic Wisdom
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Explore the mystical elements that guide our practice and connect us to universal energies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "/images/CrystalDivination.png",
                title: "Crystal Divination",
                description: "Ancient scrying techniques"
              },
              {
                image: "/images/SacredGeometry.png",
                title: "Sacred Geometry",
                description: "Universal patterns of creation"
              },
              {
                image: "/images/MysticalCards.png",
                title: "Mystical Cards",
                description: "Numerological guidance tools"
              },
              {
                image: "/images/CosmicCharts.png",
                title: "Cosmic Charts",
                description: "Celestial mapping wisdom"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#301934]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-[#F5F5DC]">
                      <h3 className="text-lg font-heading font-bold mb-1">{item.title}</h3>
                      <p className="text-sm font-paragraph opacity-90">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-4 sm:mb-6">
              Voices of Transformation
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Discover how our readings have illuminated paths and transformed lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#B8860B]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#B8860B]/20 to-transparent"></div>
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#B8860B] text-[#B8860B]" />
                      ))}
                    </div>
                    <p className="text-[#301934]/80 font-paragraph mb-6 italic">
                      &ldquo;{testimonial.testimonialText}&rdquo;
                    </p>
                    <div className="flex items-center">
                      {testimonial.customerPhoto ? (
                        <Image
                          src={testimonial.customerPhoto}
                          alt={testimonial.customerName || 'Customer'}
                          width={48}
                          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-[#B8860B]/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B8860B]/20 to-[#301934]/20 mr-4 flex items-center justify-center">
                          <Star className="w-6 h-6 text-[#B8860B]" />
                        </div>
                      )}
                      <div>
                        <div className="font-heading font-semibold text-[#301934]">
                          {testimonial.customerName}
                        </div>
                        {testimonial.serviceMentioned && (
                          <div className="text-sm text-[#301934]/60">
                            {testimonial.serviceMentioned}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/testimonials">
              <Button variant="outline" size="lg" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                Read All Stories
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Secret Circle Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#301934] via-[#301934]/95 to-[#A020F0] relative overflow-hidden">
        {/* Background mystical elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-pulse">
            <Star size={24} className="text-[#B8860B]" />
          </div>
          <div className="absolute top-32 right-16 animate-pulse" style={{ animationDelay: '1s' }}>
            <Sparkles size={20} className="text-[#B8860B]" />
          </div>
          <div className="absolute bottom-32 left-20 animate-pulse" style={{ animationDelay: '2s' }}>
            <Moon size={28} className="text-[#B8860B]" />
          </div>
          <div className="absolute bottom-16 right-12 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Sun size={32} className="text-[#B8860B]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8860B]/20 text-[#B8860B] rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-[#B8860B] rounded-full animate-pulse"></span>
              EXCLUSIVE COMMUNITY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-[#F5F5DC] mb-6">
              Our Secret Circle
            </h2>
            <p className="text-lg sm:text-xl text-[#F5F5DC]/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Meet the enlightened souls who guide our sacred practice and share their cosmic wisdom with our community.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Kushagra",
                title: "Master Numerologist",
                specialty: "Life Path & Destiny Numbers", 
                image: "/images/Kushagra.png",
                description: "With over 8 years of experience in ancient numerology, Kushagra specializes in decoding life path numbers and revealing hidden destinies through sacred calculations.",
                expertise: ["Life Path Analysis", "Destiny Mapping", "Karmic Numbers"],
                mysticalSymbol: "🔮"
              },
              {
                name: "Prasant", 
                title: "Sacred Geometry Expert",
                specialty: "Cosmic Patterns & Energy",
                image: "/images/Prasant.png", 
                description: "Prasant combines numerology with sacred geometry to unlock the universal patterns that govern our existence and spiritual evolution.",
                expertise: ["Sacred Geometry", "Energy Mapping", "Cosmic Alignments"],
                mysticalSymbol: "✨"
              },
              {
                name: "Amit",
                title: "Relationship Oracle",
                specialty: "Love & Compatibility",
                image: "/images/Amit.png",
                description: "Amit's intuitive approach to numerological compatibility has helped thousands find their perfect match and strengthen existing relationships.",
                expertise: ["Love Compatibility", "Relationship Healing", "Soul Connections"],
                mysticalSymbol: "💫"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full bg-[#F5F5DC]/10 backdrop-blur-sm border-[#B8860B]/30 hover:border-[#B8860B] transition-all duration-500 hover:shadow-2xl hover:shadow-[#B8860B]/20 relative overflow-hidden">
                  {/* Mystical glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 via-transparent to-[#A020F0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Profile Section */}
                    <div className="text-center mb-8">
                      <div className="relative inline-block mb-6">
                        <div className="relative">
                          <Image
                            src={member.image}
                            alt={`${member.name} - ${member.title}`}
                            width={120}
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#B8860B]/30 group-hover:border-[#B8860B] transition-all duration-500"
                          />
                          {/* Mystical aura */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B8860B]/20 to-[#A020F0]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        </div>
                        {/* Mystical symbol */}
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {member.mysticalSymbol}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-heading font-bold text-[#F5F5DC] mb-2 group-hover:text-[#B8860B] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <div className="text-[#B8860B] font-semibold mb-1">{member.title}</div>
                      <div className="text-[#F5F5DC]/70 text-sm font-medium">{member.specialty}</div>
                    </div>

                    {/* Description */}
                    <p className="text-[#F5F5DC]/80 font-paragraph leading-relaxed mb-6 text-sm">
                      {member.description}
                    </p>

                    {/* Expertise Tags */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-[#B8860B] mb-3 uppercase tracking-wider">Expertise</div>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-[#B8860B]/20 text-[#F5F5DC] text-xs rounded-full border border-[#B8860B]/30 hover:bg-[#B8860B]/30 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#B8860B]/40 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#A020F0]/40 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-[#F5F5DC]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#B8860B]/20">
              <h3 className="text-2xl font-heading font-bold text-[#F5F5DC] mb-4">
                Join Our Exclusive Community
              </h3>
              <p className="text-[#F5F5DC]/80 mb-6 max-w-2xl mx-auto">
                Get personalized guidance from our master practitioners and unlock the secrets of your numerological destiny.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 px-8">
                    🌟 Book Your Reading
                  </Button>
                </Link>
                <a 
                  href="https://wa.me/916390057777?text=Hi! I'm interested in joining the Secret Circle community. Please share more details."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934] px-8">
                    💬 Join WhatsApp Circle
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spiritual Journey Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-6 sm:mb-8">
                Your Spiritual Journey Awaits
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm flex-shrink-0 mt-1">1</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Discover Your Numbers</h3>
                    <p className="font-paragraph text-[#301934]/80">Uncover the hidden meanings in your birth date and name through ancient numerological calculations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm flex-shrink-0 mt-1">2</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Receive Sacred Insights</h3>
                    <p className="font-paragraph text-[#301934]/80">Our expert practitioners interpret your cosmic blueprint with wisdom and compassion.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm flex-shrink-0 mt-1">3</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Transform Your Life</h3>
                    <p className="font-paragraph text-[#301934]/80">Apply the cosmic wisdom to make empowered decisions and align with your highest purpose.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 mr-4">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/images/CrystalDivination.png"
                  alt="Spiritual journey meditation with cosmic energy and sacred symbols"
                  width={600}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#301934]/20 to-transparent rounded-lg"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
                  <Moon className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#301934]/20 rounded-full flex items-center justify-center">
                  <Sun className="w-6 h-6 text-[#301934]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#301934] relative overflow-hidden">
        {/* Background mystical elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Star size={32} className="text-[#B8860B]" />
          </div>
          <div className="absolute top-20 right-20">
            <Sparkles size={28} className="text-[#B8860B]" />
          </div>
          <div className="absolute bottom-20 left-20">
            <Moon size={36} className="text-[#B8860B]" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Sun size={40} className="text-[#B8860B]" />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <Image
                src="/images/CosmicDestiny.png"
                alt="Cosmic destiny unlock with sacred numerology symbols"
                width={200}
                className="mx-auto rounded-full border-4 border-[#B8860B]/30"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#F5F5DC] mb-4 sm:mb-6">
              Ready to Unlock Your Destiny?
            </h2>
            <p className="text-xl font-paragraph text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto">
              Begin your journey of self-discovery with a personalized numerology reading today. The universe is calling you to step into your power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                  Book Your Reading
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                Chat on WhatsApp
              </Button>
            </div>
            <div className="mt-8 text-[#F5F5DC]/70 font-paragraph">
              ✨ Over 2,500 souls transformed • 98% satisfaction rate • Available worldwide ✨
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#301934] text-[#F5F5DC] py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#B8860B]">Occult369</h3>
              <p className="font-paragraph text-[#F5F5DC]/80 mb-6 leading-relaxed">
                Unlocking the mysteries of numerology and astrology for personal transformation through ancient wisdom and modern insights.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-paragraph text-[#F5F5DC]/80">
                  <svg className="w-4 h-4 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Serving globally online
                </div>
                <div className="flex items-center gap-2 text-sm font-paragraph text-[#F5F5DC]/80">
                  <svg className="w-4 h-4 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Available 24/7
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4 text-[#B8860B]">Navigation</h4>
              <div className="space-y-3">
                <Link href="/" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">Home</Link>
                <Link href="/about" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">About Us</Link>
                <Link href="/services" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">Our Services</Link>
                <Link href="/testimonials" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">Testimonials</Link>
                <Link href="/learn-more" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">Learn More</Link>
                <Link href="/book-reading" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">Book Reading</Link>
              </div>
            </div>

            {/* Contact & Legal Section */}
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4 text-[#B8860B]">Contact & Legal</h4>
              <div className="space-y-3">
                <Link href="/contact" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">Contact Us</Link>
                <a href="tel:+916390057777" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">📞 +91 6390 057 777</a>
                <a href="mailto:reports@occult369.com" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200">✉️ reports@occult369.com</a>
                <div className="pt-2 border-t border-[#F5F5DC]/20">
                  <Link href="/privacy-policy" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm">Privacy Policy</Link>
                  <Link href="/terms-conditions" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm mt-2">Terms & Conditions</Link>
                  <Link href="/faq" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B] transition-colors duration-200 text-sm mt-2">FAQ</Link>
                </div>
              </div>
            </div>
            {/* Social Media & Reviews Section */}
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4 text-[#B8860B]">Connect With Us</h4>
              
              {/* Social Media Icons */}
              <div className="mb-6">
                <p className="text-sm font-paragraph text-[#F5F5DC]/60 mb-3">Follow our journey</p>
                <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61578228427931&rdid=yWi3iu9kfTxZwzby&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AexVP3THG%2F" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-[#F5F5DC]/10 hover:bg-[#B8860B] rounded-full transition-colors group"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5 text-[#F5F5DC] group-hover:text-[#301934]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/occult.369?igsh=MXh1cnN4czBwYmZqeA%3D%3D" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-[#F5F5DC]/10 hover:bg-[#B8860B] rounded-full transition-colors group"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5 text-[#F5F5DC] group-hover:text-[#301934]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                </div>
              </div>
              
              {/* Google Business & WhatsApp */}
              <div className="space-y-3">
                <p className="text-sm font-paragraph text-[#F5F5DC]/60">Business & Reviews</p>
                <a 
                  href="https://g.page/r/occult369/review" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8860B]/20 hover:bg-[#B8860B] text-[#F5F5DC] hover:text-[#301934] rounded-lg transition-all duration-200 text-sm font-medium w-full justify-center group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  ⭐ Google Reviews
                </a>
                <a 
                  href="https://wa.me/916390057777?text=Hi! I'd like to learn more about your numerology services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366] text-[#F5F5DC] hover:text-white rounded-lg transition-all duration-200 text-sm font-medium w-full justify-center group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  � WhatsApp Us
                </a>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-[#F5F5DC]/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="font-paragraph text-[#F5F5DC]/60 text-sm">
                  © 2025 Occult369. All rights reserved.
                </p>
                <p className="font-paragraph text-[#F5F5DC]/40 text-xs mt-1">
                  Professional numerology and astrology services worldwide
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm font-paragraph text-[#F5F5DC]/60">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trusted Service
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#B8860B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Secure & Private
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}