import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Star, Quote, Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Testimonials } from '@/entities';
import { format } from 'date-fns';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Testimonials>('testimonials');
        setTestimonials(items);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to book a numerology reading after reading the amazing testimonials. Could you help me get started?";
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMMM yyyy');
    } catch {
      return '';
    }
  };

  const renderStars = (rating: number = 5) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'fill-[#B8860B] text-[#B8860B]' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
  <header className="fixed top-0 w-full z-50" style={{backgroundColor: 'rgba(48,25,52,0.9)', backdropFilter: 'blur(4px)', borderBottom: '1px solid rgba(184,134,11,0.2)'}}>
        <nav className="max-w-[120rem] mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-heading font-bold text-primary-foreground">
            Occult369
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-primary-foreground hover:text-secondary transition-colors">Home</Link>
            <Link href="/about" className="text-primary-foreground hover:text-secondary transition-colors">About</Link>
            <Link href="/services" className="text-primary-foreground hover:text-secondary transition-colors">Services</Link>
            <Link href="/testimonials" className="text-secondary">Testimonials</Link>
            <Link href="/contact" className="text-primary-foreground hover:text-secondary transition-colors">Contact</Link>
          </div>
          <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-primary" onClick={handleWhatsAppContact}>
            Book Reading
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
  <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-[100rem] mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-heading font-bold text-[#F5F5DC] mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Voices of Transformation
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-paragraph text-[#F5F5DC]/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how our sacred numerological readings have illuminated paths, healed hearts, and transformed lives across the globe.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-[#301934]/5">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Readings Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "15+", label: "Years of Experience" },
              { number: "50+", label: "Countries Served" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-heading font-bold text-[#B8860B] mb-2">
                  {stat.number}
                </div>
                <div className="font-paragraph text-[#301934]/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 px-6">
        <div className="max-w-[100rem] mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="text-lg font-paragraph text-[#301934]/80">Loading sacred testimonials...</div>
            </div>
          ) : (
            <>
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-6">
                  Sacred Stories of Change
                </h2>
                <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
                  Real experiences from souls who have found clarity, purpose, and transformation through our numerological guidance.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: (index % 6) * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-8 relative">
                        <Quote className="absolute top-4 right-4 w-8 h-8 text-[#B8860B]/30" />
                        
                        <div className="flex mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        <blockquote className="text-[#301934]/80 font-paragraph mb-6 italic leading-relaxed">
                          &ldquo;{testimonial.testimonialText}&rdquo;
                        </blockquote>
                        
                        <div className="flex items-center">
                          {testimonial.customerPhoto ? (
                            <Image
                              src={testimonial.customerPhoto}
                              alt={testimonial.customerName || 'Customer'}
                              width={48}
                              className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-[#B8860B]/20 flex items-center justify-center mr-4">
                              <Heart className="w-6 h-6 text-[#B8860B]" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-heading font-semibold text-[#301934]">
                              {testimonial.customerName}
                            </div>
                            {testimonial.serviceMentioned && (
                              <div className="text-sm text-[#B8860B] font-paragraph">
                                {testimonial.serviceMentioned}
                              </div>
                            )}
                            {testimonial.submissionDate && (
                              <div className="text-xs text-[#301934]/60 font-paragraph">
                                {formatDate(testimonial.submissionDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-24 px-6 bg-[#301934]/5">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-4xl mx-auto border-[#B8860B]/20">
              <CardContent className="p-12">
                <Quote className="w-16 h-16 text-[#B8860B]/30 mx-auto mb-8" />
                <blockquote className="text-2xl md:text-3xl font-heading font-medium text-[#301934] mb-8 italic leading-relaxed">
                  &ldquo;The numerology reading I received from Occult369 was nothing short of life-changing. Elena&apos;s insights helped me understand patterns in my life that I had never noticed before. I finally found the courage to pursue my true calling, and everything has aligned beautifully since then.&rdquo;
                </blockquote>
                <div className="flex justify-center mb-6">
                  {renderStars(5)}
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-[#301934] text-xl mb-2">
                    Sarah Michelle Thompson
                  </div>
                  <div className="text-[#B8860B] font-paragraph">
                    Life Path Reading • Entrepreneur & Author
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-6">
              Transformation Across All Areas
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Our readings have guided souls through every aspect of life&apos;s journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Career & Purpose",
                icon: "💼",
                description: "Finding life purpose, career transitions, and professional fulfillment through numerological guidance."
              },
              {
                category: "Love & Relationships",
                icon: "💕",
                description: "Understanding compatibility, healing relationship patterns, and attracting soulmate connections."
              },
              {
                category: "Spiritual Growth",
                icon: "🌟",
                description: "Deepening spiritual practice, understanding life lessons, and connecting with higher purpose."
              },
              {
                category: "Personal Healing",
                icon: "🌿",
                description: "Overcoming challenges, breaking negative patterns, and embracing personal transformation."
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-6">{category.icon}</div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                      {category.category}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 px-6 bg-[#301934]/5">
        <div className="max-w-[100rem] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-6">
              Why Souls Trust Occult369
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Certified Expertise",
                description: "Our practitioners are certified by the International Numerology Association and have decades of combined experience in sacred number wisdom."
              },
              {
                title: "Confidential & Sacred",
                description: "Every reading is conducted in complete confidentiality with the utmost respect for your personal journey and spiritual privacy."
              },
              {
                title: "Ongoing Support",
                description: "We provide follow-up guidance and support to help you integrate the insights from your reading into your daily life."
              }
            ].map((trust, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-[#B8860B]/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                      {trust.title}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {trust.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#301934]">
        <div className="max-w-[100rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#F5F5DC] mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl font-paragraph text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto">
              Join thousands of souls who have discovered their true path through our sacred numerological guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                  Choose Your Reading
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
      <footer className="bg-foreground text-primary-foreground py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4">Occult369</h3>
              <p className="font-paragraph text-primary-foreground/80">
                Unlocking the mysteries of numerology and astrology for personal transformation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block font-paragraph text-primary-foreground/80 hover:text-secondary">Home</Link>
                <Link href="/about" className="block font-paragraph text-primary-foreground/80 hover:text-secondary">About</Link>
                <Link href="/services" className="block font-paragraph text-primary-foreground/80 hover:text-secondary">Services</Link>
                <Link href="/testimonials" className="block font-paragraph text-primary-foreground/80 hover:text-secondary">Testimonials</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <div className="font-paragraph text-primary-foreground/80">Numerology Readings</div>
                <div className="font-paragraph text-primary-foreground/80">Astrology Charts</div>
                <div className="font-paragraph text-primary-foreground/80">Life Path Analysis</div>
                <div className="font-paragraph text-primary-foreground/80">Compatibility Reports</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block font-paragraph text-primary-foreground/80 hover:text-secondary">Contact Us</Link>
                <div className="font-paragraph text-primary-foreground/80">WhatsApp: +1 (555) 369-3690</div>
                <div className="font-paragraph text-primary-foreground/80">Email: info@occult369.com</div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="font-paragraph text-primary-foreground/60">
              © 2024 Occult369. All rights reserved. | Unlock your destiny through ancient wisdom.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
