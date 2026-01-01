"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Star, Heart, Eye, Compass } from 'lucide-react';
import Link from 'next/link';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function AboutPage() {

  return (
  <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Responsive Header */}
      <ResponsiveNav currentPage="about" />

      {/* Hero Section */}
  <section className="pt-24 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4 sm:mb-6 text-[#F5F5DC] leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Sacred Journey
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-paragraph max-w-3xl mx-auto text-[#F5F5DC]/90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the story behind Occult369 and our mission to bridge ancient wisdom with modern understanding.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-[#301934]">
                The Birth of Occult369
              </h2>
              <p className="text-lg font-paragraph mb-6 leading-relaxed text-[#301934]/80">
                Founded in the mystical year of 2019, Occult369 emerged from a profound understanding that the universe speaks to us through numbers. Our founder, Master Numerologist Elena Starweaver, discovered the transformative power of numerology during her own spiritual awakening.
              </p>
              <p className="text-lg font-paragraph mb-6 leading-relaxed text-[#301934]/80">
                After years of studying ancient texts, working with renowned mystics across the globe, and helping thousands find their true path, Elena established Occult369 as a sanctuary for those seeking deeper meaning in their lives.
              </p>
              <p className="text-lg font-paragraph mb-8 leading-relaxed text-[#301934]/80">
                The name &ldquo;369&rdquo; holds special significance in numerology - representing the divine trinity of creation, manifestation, and completion. These sacred numbers guide our practice and infuse every reading with cosmic wisdom.
              </p>
              <Link href="/contact">
                <Button className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                  Begin Your Journey
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
                src="/images/ElenaStarweaver.png"
                alt="Elena Starweaver, Master Numerologist and founder of Occult369"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#B8860B] text-[#301934] p-6 rounded-lg">
                <div className="text-3xl font-heading font-bold">369</div>
                <div className="text-sm font-paragraph">Sacred Numbers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
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
              Our Sacred Mission
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-3xl mx-auto">
              We believe that every soul carries a unique numerical blueprint that holds the keys to their destiny, purpose, and highest potential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Eye className="w-12 h-12 text-[#B8860B]" />,
                title: "Divine Insight",
                description: "We provide clarity through ancient numerological wisdom, helping you see beyond the veil of everyday existence."
              },
              {
                icon: <Heart className="w-12 h-12 text-[#B8860B]" />,
                title: "Compassionate Guidance",
                description: "Every reading is delivered with love, understanding, and deep respect for your unique spiritual journey."
              },
              {
                icon: <Star className="w-12 h-12 text-[#B8860B]" />,
                title: "Authentic Practice",
                description: "We honor traditional numerological methods while embracing modern insights to serve your highest good."
              },
              {
                icon: <Compass className="w-12 h-12 text-[#B8860B]" />,
                title: "Life Navigation",
                description: "Our readings serve as your cosmic compass, guiding you toward your true north and life purpose."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-4">
                      {value.title}
                    </h3>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Image
                src="/images/MysticalCards.png"
                alt="Sacred numerology practice with cosmic symbols and calculations"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#301934] mb-8">
                Our Sacred Methodology
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm">1</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Deep Consultation</h3>
                    <p className="font-paragraph text-[#301934]/80">We begin with an in-depth conversation to understand your questions, challenges, and spiritual goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm">2</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Numerical Analysis</h3>
                    <p className="font-paragraph text-[#301934]/80">Using your birth date and name, we calculate your core numbers and their cosmic significance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm">3</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Intuitive Interpretation</h3>
                    <p className="font-paragraph text-[#301934]/80">Our master numerologists blend mathematical precision with intuitive wisdom to reveal your path.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center text-[#301934] font-bold text-sm">4</div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-[#301934] mb-2">Practical Guidance</h3>
                    <p className="font-paragraph text-[#301934]/80">We provide actionable insights and recommendations to help you align with your highest potential.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Sacred Circle
            </h2>
            <p className="text-lg font-paragraph text-[#301934]/80 max-w-2xl mx-auto">
              Meet the dedicated souls who bring ancient wisdom to your modern journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Kushagra",
                role: "Master Numerologist",
                image: "/images/Kushagra.png",
                description: "With over 8 years of experience in ancient numerology, Kushagra specializes in decoding life path numbers and revealing hidden destinies through sacred calculations."
              },
              {
                name: "Prasant",
                role: "Sacred Geometry Expert",
                image: "/images/Prasant.png",
                description: "Prasant combines numerology with sacred geometry to unlock the universal patterns that govern our existence and spiritual evolution."
              },
              {
                name: "Amit",
                role: "Relationship Oracle",
                image: "/images/Amit.png",
                description: "Amit's intuitive approach to numerological compatibility has helped thousands find their perfect match and strengthen existing relationships."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-colors">
                  <CardContent className="p-8">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    />
                    <h3 className="text-xl font-heading font-bold text-[#301934] mb-2">
                      {member.name}
                    </h3>
                    <div className="text-[#B8860B] font-paragraph font-semibold mb-4">
                      {member.role}
                    </div>
                    <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Play Store App Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#301934] via-[#301934]/95 to-[#A020F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: App Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-[#B8860B]/20 text-[#B8860B] rounded-full text-sm font-semibold mb-4">
                  📱 NOW AVAILABLE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#F5F5DC] mb-6">
                  Download Our
                  <span className="block text-[#B8860B]">Numerology App</span>
                </h2>
                <p className="text-lg text-[#F5F5DC]/90 mb-8 leading-relaxed">
                  Access the power of numerology anywhere, anytime. Get instant readings, 
                  daily insights, and personalized guidance right at your fingertips.
                </p>
              </div>

              {/* App Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "🔢 Instant Calculations",
                  "📊 Personal Dashboard",
                  "📅 Daily Predictions",
                  "💝 Compatibility Checker",
                  "📈 Life Cycle Analysis",
                  "🔔 Cosmic Notifications"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-[#F5F5DC]/90 text-sm"
                  >
                    <span className="mr-3">{feature.split(' ')[0]}</span>
                    <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                  </motion.div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.occult369.numerology"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button className="w-full sm:w-auto bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90 text-lg py-3 px-8 font-semibold">
                    📱 Get on Google Play
                  </Button>
                </motion.a>
                <motion.a
                  href="https://wa.me/916390057777?text=Hi! I'd like to get the download link for your numerology app."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button variant="outline" className="w-full sm:w-auto border-[#F5F5DC] text-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-[#301934] text-lg py-3 px-8">
                    💬 Get Download Link
                  </Button>
                </motion.a>
              </div>

              {/* App Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#B8860B]/20">
                {[
                  { number: "50K+", label: "Downloads" },
                  { number: "4.8★", label: "Rating" },
                  { number: "24/7", label: "Access" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-[#B8860B] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-[#F5F5DC]/70 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: App Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative max-w-sm mx-auto">
                {/* Phone Outline */}
                <div className="bg-[#301934] rounded-[3rem] p-6 shadow-2xl border-4 border-[#B8860B]/30">
                  {/* Screen */}
                  <div className="bg-gradient-to-b from-[#F5F5DC] to-[#F5F5DC]/90 rounded-[2rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-[#301934] text-[#F5F5DC] text-xs p-2 flex justify-between items-center">
                      <span>9:41</span>
                      <span>Occult369</span>
                      <span>100%</span>
                    </div>

                    {/* App Content */}
                    <div className="p-6 space-y-4">
                      {/* Header */}
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🔮</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#301934] mb-2">Welcome Back!</h3>
                        <p className="text-[#301934]/70 text-sm">Your Daily Numerology</p>
                      </div>

                      {/* Today's Insight Card */}
                      <Card className="bg-gradient-to-r from-[#B8860B]/10 to-[#A020F0]/10 border-[#B8860B]/30">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-[#301934] text-sm mb-2">Today&apos;s Insight</h4>
                          <p className="text-[#301934]/70 text-xs mb-3">Your personal number is 7 - Focus on inner wisdom today.</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-[#B8860B]">Lucky: 7, 16, 25</span>
                            <span className="text-[#A020F0]">⭐⭐⭐⭐⭐</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#301934]/5 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">📊</div>
                          <div className="text-xs text-[#301934] font-medium">Life Path</div>
                        </div>
                        <div className="bg-[#301934]/5 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">💝</div>
                          <div className="text-xs text-[#301934] font-medium">Love Match</div>
                        </div>
                        <div className="bg-[#301934]/5 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">📅</div>
                          <div className="text-xs text-[#301934] font-medium">Year Ahead</div>
                        </div>
                        <div className="bg-[#301934]/5 rounded-lg p-3 text-center">
                          <div className="text-lg mb-1">🔮</div>
                          <div className="text-xs text-[#301934] font-medium">Reading</div>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="flex justify-around pt-2 border-t border-[#301934]/10">
                        {['🏠', '📊', '🔮', '👤'].map((icon, i) => (
                          <div key={i} className={`p-2 rounded-lg ${i === 0 ? 'bg-[#B8860B]/20' : ''}`}>
                            <span className="text-lg">{icon}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

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
                  <Heart className="w-5 h-5 text-[#F5F5DC]" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* User Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-[#B8860B]/20"
          >
            <h3 className="text-2xl font-heading font-bold text-[#F5F5DC] text-center mb-8">
              What Users Are Saying
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya S.",
                  rating: 5,
                  review: "Amazing app! The daily insights are so accurate and helpful for planning my day."
                },
                {
                  name: "Rahul M.",
                  rating: 5,
                  review: "Love the compatibility feature. It helped me understand my relationship better."
                },
                {
                  name: "Anita K.",
                  rating: 5,
                  review: "The interface is beautiful and the calculations are spot-on. Highly recommended!"
                }
              ].map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 border-[#B8860B]/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#B8860B] fill-current" />
                        ))}
                      </div>
                      <p className="text-[#F5F5DC]/90 text-sm mb-4 italic">
                        &ldquo;{review.review}&rdquo;
                      </p>
                      <p className="text-[#B8860B] font-semibold text-sm">
                        - {review.name}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Ready to Discover Your Path?
            </h2>
            <p className="text-xl font-paragraph text-[#F5F5DC]/90 mb-8 max-w-2xl mx-auto">
              Join thousands who have found clarity, purpose, and transformation through our sacred numerological practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-[#B8860B] text-[#301934] hover:bg-[#B8860B]/90">
                  Explore Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934]">
                  Schedule Consultation
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
              </div>
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Connect</h4>
              <div className="space-y-3">
                <Link href="/contact" className="block font-paragraph text-[#F5F5DC]/80 hover:text-[#B8860B]">Contact Us</Link>
                <div className="font-paragraph text-[#F5F5DC]/80">WhatsApp: +91 6390 057 777</div>
                <div className="font-paragraph text-[#F5F5DC]/80">Email: reports@occult369.com</div>
                
                {/* Social Media & Business Links */}
                <div className="pt-2">
                  <h5 className="text-sm font-semibold text-[#B8860B] mb-3">Follow Us</h5>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://www.facebook.com/occult369" 
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
                      href="https://www.instagram.com/occult369_official" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-[#F5F5DC]/10 hover:bg-[#B8860B] rounded-full transition-colors group"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5 text-[#F5F5DC] group-hover:text-[#301934]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.051-2.349-2.348 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.348 1.052 2.348 2.349 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.349-1.051-2.349-2.348 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.348 1.052 2.348 2.349 0 1.297-1.051 2.348-2.348 2.348z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.youtube.com/@occult369" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-[#F5F5DC]/10 hover:bg-[#B8860B] rounded-full transition-colors group"
                      aria-label="YouTube"
                    >
                      <svg className="w-5 h-5 text-[#F5F5DC] group-hover:text-[#301934]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com/occult369" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-[#F5F5DC]/10 hover:bg-[#B8860B] rounded-full transition-colors group"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5 text-[#F5F5DC] group-hover:text-[#301934]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Google My Business */}
                <div className="pt-3">
                  <a 
                    href="https://g.page/occult369" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8860B]/10 hover:bg-[#B8860B] text-[#F5F5DC] hover:text-[#301934] rounded-lg transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zm-5.568 16.988c-1.297 0-2.349-1.051-2.349-2.348 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.348 1.052 2.348 2.349 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.349-1.051-2.349-2.348 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.348 1.052 2.348 2.349 0 1.297-1.051 2.348-2.348 2.348z"/>
                    </svg>
                    Google Business
                  </a>
                </div>
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
