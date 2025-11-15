"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, BookOpen, Calculator, Heart, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function LearnMorePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Discover Your Life Path",
      description: "Understand your true purpose and the journey you're meant to take in this lifetime."
    },
    {
      icon: Heart,
      title: "Improve Relationships",
      description: "Learn compatibility insights and how to build stronger, more harmonious connections."
    },
    {
      icon: Calculator,
      title: "Make Better Decisions",
      description: "Use numerological timing and insights to make choices aligned with your energy cycles."
    },
    {
      icon: Star,
      title: "Unlock Hidden Talents",
      description: "Discover your natural abilities and gifts that can lead to success and fulfillment."
    }
  ];

  const numerologyBasics = [
    {
      number: "1",
      title: "Life Path Number",
      description: "Your core purpose and main life lesson, calculated from your birth date."
    },
    {
      number: "2",
      title: "Expression Number",
      description: "Your natural talents and abilities, derived from your full birth name."
    },
    {
      number: "3",
      title: "Soul Urge Number",
      description: "Your inner desires and motivations, calculated from vowels in your name."
    },
    {
      number: "4",
      title: "Personality Number",
      description: "How others see you, derived from consonants in your birth name."
    }
  ];

  const testimonialHighlights = [
    {
      quote: "My numerology reading revealed so much about my career path. I finally understand why certain jobs felt right!",
      name: "Priya Sharma",
      result: "Career Clarity"
    },
    {
      quote: "The relationship compatibility reading saved my marriage. We now understand each other's needs better.",
      name: "Rajesh Kumar",
      result: "Relationship Harmony"
    },
    {
      quote: "Understanding my life cycles helped me time major decisions perfectly. Amazing accuracy!",
      name: "Anita Verma",
      result: "Perfect Timing"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-36 pb-16 px-4 sm:px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#F5F5DC] mb-6">
              Discover the Power of
              <span className="block text-[#B8860B]">Numerology</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#F5F5DC]/90 mb-8 max-w-3xl mx-auto">
              Unlock the ancient wisdom of numbers to understand your life purpose, relationships, and destiny. 
              Learn how numerology can transform your understanding of yourself and your path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-reading">
                <Button className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 text-lg py-3 px-8">
                  Get Your Reading
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-[#F5F5DC] text-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-[#301934] text-lg py-3 px-8">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Numerology Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-6">
              What is Numerology?
            </h2>
            <p className="text-lg text-[#301934]/80 max-w-4xl mx-auto leading-relaxed">
              Numerology is the ancient study of numbers and their divine significance in human life. 
              Dating back thousands of years, this mystical science reveals how numbers influence your 
              personality, relationships, career, and life events. Every number carries a unique vibration 
              that can unlock profound insights about your soul&apos;s journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">
                Ancient Wisdom, Modern Application
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#B8860B] mt-1 flex-shrink-0" />
                  <p className="text-[#301934]/80 leading-relaxed">
                    <strong>Pythagorean System:</strong> Based on the mathematical principles of the Greek philosopher Pythagoras
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#B8860B] mt-1 flex-shrink-0" />
                  <p className="text-[#301934]/80 leading-relaxed">
                    <strong>Chaldean Method:</strong> Ancient Babylonian system focusing on name vibrations and sound frequencies
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#B8860B] mt-1 flex-shrink-0" />
                  <p className="text-[#301934]/80 leading-relaxed">
                    <strong>Modern Psychology:</strong> Validated by contemporary research in personality and behavioral patterns
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#B8860B] mt-1 flex-shrink-0" />
                  <p className="text-[#301934]/80 leading-relaxed">
                    <strong>Practical Guidance:</strong> Real-world applications for career, relationships, and personal growth
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#301934] to-[#A020F0] p-8 rounded-2xl text-white"
            >
              <BookOpen className="h-12 w-12 text-[#B8860B] mb-6" />
              <h4 className="text-xl font-heading font-bold mb-4">How It Works</h4>
              <p className="text-white/90 leading-relaxed mb-6">
                By analyzing your birth date and full name, we calculate your core numbers that reveal:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Your life purpose and spiritual mission</li>
                <li>• Natural talents and career inclinations</li>
                <li>• Relationship patterns and compatibility</li>
                <li>• Optimal timing for major decisions</li>
                <li>• Challenges and growth opportunities</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Numbers Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#301934]/5 to-[#A020F0]/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-6">
              Your Core Numbers
            </h2>
            <p className="text-lg text-[#301934]/80 max-w-3xl mx-auto">
              Every person has four essential numbers that form the foundation of their numerological profile. 
              Understanding these numbers provides deep insights into your true nature.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {numerologyBasics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                      {item.number}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#301934]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-6">
              Why Choose Numerology?
            </h2>
            <p className="text-lg text-[#301934]/80 max-w-3xl mx-auto">
              Discover how numerology can transform every aspect of your life with practical insights and guidance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8860B] to-[#B8860B]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-[#301934]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#301934] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#301934]/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#301934] to-[#A020F0]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#F5F5DC] mb-6">
              Real Results, Real People
            </h2>
            <p className="text-lg text-[#F5F5DC]/90 max-w-3xl mx-auto">
              See how numerology has transformed the lives of our clients with accurate insights and practical guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialHighlights.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/10 border-[#B8860B]/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#B8860B] fill-current" />
                      ))}
                    </div>
                    <p className="text-[#F5F5DC]/90 leading-relaxed mb-4 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-[#B8860B] font-semibold">{testimonial.name}</p>
                      <p className="text-[#F5F5DC]/70 text-sm">{testimonial.result}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#301934] mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-[#301934]/80 mb-8 max-w-3xl mx-auto">
              Take the first step towards understanding your true potential. Our expert numerologist will provide 
              you with a comprehensive reading that reveals your unique path to success and fulfillment.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">1</div>
                <h3 className="font-heading font-bold text-[#301934] mb-2">Book Your Reading</h3>
                <p className="text-[#301934]/70 text-sm">Choose your preferred service and schedule a consultation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">2</div>
                <h3 className="font-heading font-bold text-[#301934] mb-2">Receive Your Analysis</h3>
                <p className="text-[#301934]/70 text-sm">Get detailed insights about your numbers and their meanings</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#B8860B] text-[#301934] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">3</div>
                <h3 className="font-heading font-bold text-[#301934] mb-2">Transform Your Life</h3>
                <p className="text-[#301934]/70 text-sm">Apply the wisdom to make better decisions and achieve your goals</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-reading">
                <Button className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 text-lg py-3 px-8">
                  Book Your Reading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a 
                href="https://wa.me/916390057777?text=Hi! I have some questions about your numerology services. Can you please help me?"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-[#301934] text-[#301934] hover:bg-[#301934] hover:text-[#F5F5DC] text-lg py-3 px-8">
                  Ask Questions
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#301934] text-[#F5F5DC] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-heading font-bold text-[#B8860B] mb-4">Occult369</h3>
              <p className="text-[#F5F5DC]/80 leading-relaxed mb-4">
                Unlock the mysteries of your life through the ancient wisdom of numerology. 
                Discover your true purpose and potential with personalized readings.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                  WhatsApp: +91 6390 057 777
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-[#B8860B] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-[#F5F5DC]/80">
                <li><Link href="/" className="hover:text-[#B8860B] transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#B8860B] transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:text-[#B8860B] transition-colors">Services</Link></li>
                <li><Link href="/testimonials" className="hover:text-[#B8860B] transition-colors">Testimonials</Link></li>
                <li><Link href="/contact" className="hover:text-[#B8860B] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-[#B8860B] mb-4">Legal</h4>
              <ul className="space-y-2 text-[#F5F5DC]/80">
                <li><Link href="/privacy-policy" className="hover:text-[#B8860B] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-[#B8860B] transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/faq" className="hover:text-[#B8860B] transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#B8860B]/20 mt-8 pt-8 text-center text-[#F5F5DC]/60">
            <p>&copy; 2025 Occult369. All rights reserved. | Discover Your Destiny Through Numbers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}