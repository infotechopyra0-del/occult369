"use client";

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Clock, Globe } from 'lucide-react';
import Link from 'next/link';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function PrivacyPolicyPage() {


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
            <Shield className="w-16 h-16 text-[#B8860B] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#F5F5DC] mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-[#F5F5DC]/90 max-w-2xl mx-auto">
              Your privacy and confidentiality are sacred to us. Learn how we protect your personal information and spiritual journey.
            </p>
            <p className="text-sm font-paragraph text-[#F5F5DC]/70 mt-4">
              Last Updated: January 1, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#B8860B]" />
                Introduction
              </h2>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                Welcome to Occult369. We are committed to protecting your privacy and ensuring the confidentiality of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our numerology and astrology services.
              </p>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this policy. We respect the sacred nature of the personal details you share for spiritual guidance and treat all information with the utmost confidentiality.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8 text-[#B8860B]" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Personal Information</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Birth Details:</strong> Full birth name, birth date, birth time, and birth location for accurate numerological calculations</li>
                <li>• <strong>Contact Information:</strong> Email address, phone number, and messaging app details for communication</li>
                <li>• <strong>Current Name:</strong> Any name changes or preferred names you currently use</li>
                <li>• <strong>Relationship Details:</strong> Partner information for compatibility readings (with consent)</li>
                <li>• <strong>Payment Information:</strong> Billing details processed securely through encrypted payment systems</li>
              </ul>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Automatically Collected Information</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Website Usage:</strong> Pages visited, time spent, and interaction patterns (anonymized)</li>
                <li>• <strong>Device Information:</strong> Browser type, operating system, and IP address for security</li>
                <li>• <strong>Cookies:</strong> Essential cookies for website functionality and user experience</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-[#B8860B]" />
                How We Use Your Information
              </h2>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-3">
                <li>• <strong>Numerology Services:</strong> Perform accurate calculations and provide personalized readings based on your birth details</li>
                <li>• <strong>Communication:</strong> Send you reports, updates, and respond to your inquiries via your preferred contact method</li>
                <li>• <strong>Service Improvement:</strong> Enhance our services and develop new offerings based on anonymized feedback</li>
                <li>• <strong>Customer Support:</strong> Provide ongoing assistance and clarification about your readings</li>
                <li>• <strong>Legal Compliance:</strong> Maintain records as required by law and protect against fraud</li>
                <li>• <strong>Marketing (Optional):</strong> Send promotional content only with explicit consent, which can be withdrawn anytime</li>
              </ul>
            </div>

            {/* Information Security */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8 text-[#B8860B]" />
                Information Security
              </h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                We employ industry-standard security measures to protect your personal information:
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Encryption:</strong> All sensitive data is encrypted during transmission and storage</li>
                <li>• <strong>Access Control:</strong> Only authorized practitioners have access to your information on a need-to-know basis</li>
                <li>• <strong>Secure Storage:</strong> Data is stored on secure servers with regular backups and monitoring</li>
                <li>• <strong>Payment Security:</strong> We use PCI-compliant payment processors and never store credit card details</li>
                <li>• <strong>Regular Updates:</strong> Security protocols are regularly reviewed and updated</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Information Sharing</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                We do <strong>NOT</strong> sell, trade, or rent your personal information to third parties. Information may only be shared in these limited circumstances:
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>With Your Consent:</strong> When you explicitly authorize sharing (e.g., family readings)</li>
                <li>• <strong>Service Providers:</strong> Trusted partners who help deliver our services (email providers, payment processors) under strict confidentiality agreements</li>
                <li>• <strong>Legal Requirements:</strong> When required by law, court order, or to protect our legal rights</li>
                <li>• <strong>Business Transfer:</strong> In the unlikely event of a merger or acquisition, with the same privacy protections</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#B8860B]" />
                Data Retention
              </h2>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Active Records:</strong> We retain your information for as long as you remain a client or as needed to provide services</li>
                <li>• <strong>Completed Services:</strong> Reading data is kept for 7 years to provide follow-up support and maintain service quality</li>
                <li>• <strong>Marketing Data:</strong> Promotional contact lists are maintained until you opt-out</li>
                <li>• <strong>Legal Requirements:</strong> Some data may be retained longer if required by applicable laws</li>
                <li>• <strong>Secure Deletion:</strong> When retention periods expire, data is securely and permanently deleted</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Your Rights</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li>• <strong>Correction:</strong> Ask us to correct any inaccurate or incomplete information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                <li>• <strong>Restriction:</strong> Ask us to limit how we use your information</li>
                <li>• <strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li>• <strong>Objection:</strong> Object to processing of your information for marketing purposes</li>
                <li>• <strong>Withdrawal:</strong> Withdraw consent for any consent-based processing</li>
              </ul>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                To exercise these rights, contact us at <a href="mailto:privacy@occult369.com" className="text-[#B8860B] hover:underline">privacy@occult369.com</a> or WhatsApp +91 6390 057 777.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Cookies and Tracking</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                Our website uses cookies to enhance your experience:
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Essential Cookies:</strong> Required for website functionality and security</li>
                <li>• <strong>Performance Cookies:</strong> Help us understand how visitors use our site (anonymized)</li>
                <li>• <strong>Preference Cookies:</strong> Remember your choices and settings</li>
                <li>• <strong>Third-Party Cookies:</strong> Limited to essential services like payment processing</li>
              </ul>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                You can control cookies through your browser settings, though some website features may not function properly if disabled.
              </p>
            </div>

            {/* International Users */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">International Users</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                We serve clients worldwide and comply with applicable international privacy laws including GDPR, CCPA, and local regulations. Data may be transferred and processed in India where our primary servers are located, but always with appropriate safeguards.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Children&apos;s Privacy</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                While we provide numerology readings for children, we require parental consent for anyone under 18. We collect only the minimum information necessary for accurate readings and follow strict guidelines for protecting minors&apos; privacy.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Changes to This Privacy Policy</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any significant changes by:
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• Posting the updated policy on our website with a new &ldquo;Last Updated&rdquo; date</li>
                <li>• Sending email notifications to active clients about material changes</li>
                <li>• Providing WhatsApp notifications for significant policy updates</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Contact Us</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              
              <div className="bg-[#301934]/5 p-6 rounded-lg">
                <ul className="font-paragraph text-[#301934]/80 space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:privacy@occult369.com" className="text-[#B8860B] hover:underline">privacy@occult369.com</a></li>
                  <li><strong>WhatsApp:</strong> +91 6390 057 777</li>
                  <li><strong>Website:</strong> <a href="/contact" className="text-[#B8860B] hover:underline">www.occult369.com/contact</a></li>
                  <li><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 72 hours</li>
                </ul>
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