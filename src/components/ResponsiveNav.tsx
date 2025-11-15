"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ResponsiveNavProps {
  currentPage?: string;
}

export default function ResponsiveNav({ currentPage = '' }: ResponsiveNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/services', label: 'Services', page: 'services' },
    { href: '/testimonials', label: 'Testimonials', page: 'testimonials' },
    { href: '/contact', label: 'Contact', page: 'contact' },
    { href: '/about', label: 'About', page: 'about' },
  ];

  const isActive = (href: string) => pathname === href || currentPage === navLinks.find(link => link.href === href)?.page;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="bg-[#301934]/95 backdrop-blur-md border-b border-[#B8860B]/30 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-3 md:py-4 px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#B8860B]/30 shadow-md bg-gradient-to-br from-[#B8860B] to-[#B8860B]/80 flex items-center justify-center"
              >
                <Image
                  src="/images/MainLogo.jpg"
                  alt="Occult369 Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
              <div className="block">
                <h1 className="font-heading text-sm md:text-base lg:text-lg font-bold text-[#F5F5DC]">
                  Occult369
                </h1>
                <p className="text-xs md:text-xs text-[#B8860B] leading-tight">Unlock Your Destiny</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`text-sm font-medium transition-colors relative group ${
                      isActive(link.href)
                        ? 'text-[#B8860B]'
                        : 'text-[#F5F5DC] hover:text-[#B8860B]'
                    }`}
                  >
                    {link.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B8860B] to-transparent"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/book-reading" className="hidden lg:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="px-6 py-2 bg-gradient-to-r from-[#B8860B] to-[#B8860B]/80 text-[#301934] rounded-full text-sm font-semibold transition-shadow hover:shadow-lg hover:shadow-[#B8860B]/50 border-0 hover:from-[#B8860B]/90 hover:to-[#B8860B]/70">
                  Book Reading
                </Button>
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-[#B8860B]/10 rounded-lg transition-colors flex-shrink-0"
            >
              {isOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#F5F5DC]" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-[#F5F5DC]" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="py-3 md:py-4 space-y-2 border-t border-[#B8860B]/20 px-4 sm:px-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-[#B8860B]/20 text-[#B8860B] shadow-md border border-[#B8860B]/30'
                        : 'text-[#F5F5DC] hover:bg-[#B8860B]/10 hover:text-[#B8860B]'
                    }`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <Link href="/book-reading" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-3 mt-4 bg-gradient-to-r from-[#B8860B] to-[#B8860B]/80 text-[#301934] rounded-lg text-sm font-semibold text-center shadow-lg"
                >
                  📞 Book Your Reading
                </motion.div>
              </Link>
              
              {/* WhatsApp Quick Contact */}
              <a 
                href="https://wa.me/916390057777?text=Hi! I'd like to learn more about your numerology services."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-3 mt-2 border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#301934] rounded-lg text-sm font-semibold text-center transition-all duration-200"
                >
                  💬 WhatsApp Contact
                </motion.div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
