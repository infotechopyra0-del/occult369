"use client";

import { motion } from 'framer-motion';
import { FileCheck, Scale, AlertTriangle, Clock, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import ResponsiveNav from '@/components/ResponsiveNav';

export default function TermsConditionsPage() {


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
            <Scale className="w-16 h-16 text-[#B8860B] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#F5F5DC] mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-[#F5F5DC]/90 max-w-2xl mx-auto">
              Please read these terms carefully before using our numerology and astrology services.
            </p>
            <p className="text-sm font-paragraph text-[#F5F5DC]/70 mt-4">
              Last Updated: January 1, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms & Conditions Content */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            {/* Acceptance of Terms */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <FileCheck className="w-8 h-8 text-[#B8860B]" />
                Acceptance of Terms
              </h2>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                By accessing and using the services of Occult369 (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), you (&ldquo;client,&rdquo; &ldquo;you,&rdquo; &ldquo;your&rdquo;) accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                These terms apply to all visitors, users, clients, and others who access or use our numerology and astrology services, whether through our website, WhatsApp, email, or any other communication channel.
              </p>
            </div>

            {/* Service Description */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-[#B8860B]" />
                Service Description
              </h2>
              
              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">What We Provide</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Numerology Readings:</strong> Personal life path analysis, destiny number calculations, and numerological insights</li>
                <li>• <strong>Compatibility Reports:</strong> Relationship analysis using numerological principles</li>
                <li>• <strong>Business Consultations:</strong> Name analysis and numerological guidance for business decisions</li>
                <li>• <strong>Astrological Guidance:</strong> Supporting insights based on cosmic influences</li>
                <li>• <strong>Spiritual Counseling:</strong> Guidance for personal growth and life decisions</li>
              </ul>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Nature of Services</h3>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                Our services are for entertainment, spiritual guidance, and personal insight purposes. While we use traditional numerological methods and have extensive experience, our readings should not be considered as:
              </p>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• Professional medical, legal, or financial advice</li>
                <li>• Guaranteed predictions of future events</li>
                <li>• Substitute for professional counseling or therapy</li>
                <li>• Investment or business recommendations</li>
                <li>• Medical diagnosis or treatment advice</li>
              </ul>
            </div>

            {/* Client Responsibilities */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Client Responsibilities</h2>
              
              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Accurate Information</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• Provide accurate birth details including full name, date, time, and location</li>
                <li>• Inform us of any name changes or corrections needed</li>
                <li>• Understand that inaccurate information may affect reading quality</li>
                <li>• Take responsibility for decisions made based on the guidance provided</li>
              </ul>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Appropriate Use</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• Use services for personal spiritual guidance and entertainment</li>
                <li>• Maintain respectful communication with our practitioners</li>
                <li>• Not share proprietary reading content without permission</li>
                <li>• Not use services for illegal or harmful purposes</li>
                <li>• Respect intellectual property rights</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Payment Terms</h2>
              
              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Payment Policy</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Advance Payment:</strong> 50% payment required before beginning work on your reading</li>
                <li>• <strong>Balance Payment:</strong> Remaining 50% due upon completion and before delivery</li>
                <li>• <strong>Rush Services:</strong> Additional charges apply for expedited delivery</li>
                <li>• <strong>Payment Methods:</strong> Bank transfer, UPI, PayPal, and major credit/debit cards accepted</li>
                <li>• <strong>Currency:</strong> All prices listed in Indian Rupees (INR) unless otherwise specified</li>
              </ul>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Refund Policy</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Satisfaction Guarantee:</strong> We offer revisions if you&apos;re not satisfied with your reading</li>
                <li>• <strong>Refund Window:</strong> Refund requests must be made within 7 days of delivery</li>
                <li>• <strong>Partial Refunds:</strong> May be offered for justified concerns about reading quality</li>
                <li>• <strong>No Refunds:</strong> Once work begins, advance payments are generally non-refundable</li>
                <li>• <strong>Evaluation:</strong> Each refund request is evaluated individually based on circumstances</li>
              </ul>
            </div>

            {/* Delivery Terms */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#B8860B]" />
                Delivery Terms
              </h2>
              
              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Delivery Timeline</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Standard Readings:</strong> 24-48 hours from receipt of full payment and information</li>
                <li>• <strong>Detailed Analysis:</strong> 3-5 business days for comprehensive life path reports</li>
                <li>• <strong>Compatibility Reports:</strong> 2-4 business days depending on complexity</li>
                <li>• <strong>Rush Services:</strong> 12-24 hours with additional charges</li>
                <li>• <strong>Delays:</strong> We will notify you immediately of any unexpected delays</li>
              </ul>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Delivery Method</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Primary:</strong> Comprehensive PDF reports delivered via email</li>
                <li>• <strong>Follow-up:</strong> Key insights shared via WhatsApp message</li>
                <li>• <strong>Consultation:</strong> Brief clarification calls included with premium services</li>
                <li>• <strong>Backup:</strong> Alternative delivery methods available if needed</li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#B8860B]" />
                Confidentiality
              </h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                We maintain strict confidentiality regarding all client information:
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Personal Information:</strong> All birth details and personal information are kept strictly confidential</li>
                <li>• <strong>Reading Content:</strong> Your readings are private and not shared with third parties</li>
                <li>• <strong>Communication:</strong> All interactions remain confidential</li>
                <li>• <strong>Testimonials:</strong> Only shared with explicit written consent</li>
                <li>• <strong>Data Protection:</strong> Information stored securely with encryption and access controls</li>
              </ul>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-[#B8860B]" />
                Important Disclaimers
              </h2>
              
              <div className="bg-[#301934]/5 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Entertainment and Guidance</h3>
                <p className="font-paragraph text-[#301934]/80 leading-relaxed">
                  Our numerology and astrology services are provided for entertainment, spiritual guidance, and personal insight. They are not substitutes for professional advice in medical, legal, financial, or psychological matters.
                </p>
              </div>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Free Will and Personal Responsibility</h3>
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• You have free will and the power to make your own choices</li>
                <li>• Our readings provide guidance and insights, not absolute predictions</li>
                <li>• You are responsible for all decisions made based on our guidance</li>
                <li>• We encourage you to use our insights as one factor in your decision-making process</li>
                <li>• Seek appropriate professional advice for serious life decisions</li>
              </ul>

              <h3 className="text-xl font-heading font-semibold text-[#301934] mb-4">Limitation of Liability</h3>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                Occult369, its practitioners, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from or related to the use of our services. This includes but is not limited to decisions made based on our guidance, financial losses, or personal disputes.
              </p>
            </div>

            {/* Age Restrictions */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Age Restrictions</h2>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Adult Services:</strong> Direct consultations are for clients 18 years and older</li>
                <li>• <strong>Minor Readings:</strong> Readings for children under 18 require parental consent</li>
                <li>• <strong>Parental Responsibility:</strong> Parents are responsible for any services requested for their children</li>
                <li>• <strong>Educational Focus:</strong> Children&apos;s readings focus on positive guidance and potential development</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Intellectual Property</h2>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Original Content:</strong> All reading formats, methodologies, and written content are our intellectual property</li>
                <li>• <strong>Personal Use:</strong> Readings are provided for your personal use only</li>
                <li>• <strong>No Redistribution:</strong> You may not copy, distribute, or resell our reading content</li>
                <li>• <strong>Brand Protection:</strong> The Occult369 name, logo, and branding are protected trademarks</li>
                <li>• <strong>Traditional Methods:</strong> We use established numerological principles while adding our unique interpretation</li>
              </ul>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Modifications to Terms</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of new terms.
              </p>
              
              <ul className="font-paragraph text-[#301934]/80 leading-relaxed mb-6 space-y-2">
                <li>• <strong>Notification:</strong> Significant changes will be communicated via email to active clients</li>
                <li>• <strong>Review:</strong> We recommend reviewing these terms periodically</li>
                <li>• <strong>Questions:</strong> Contact us if you have questions about any changes</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Governing Law</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or our services shall be subject to the jurisdiction of courts in India.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Contact Information</h2>
              
              <p className="font-paragraph text-[#301934]/80 leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              
              <div className="bg-[#301934]/5 p-6 rounded-lg">
                <ul className="font-paragraph text-[#301934]/80 space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:legal@occult369.com" className="text-[#B8860B] hover:underline">legal@occult369.com</a></li>
                  <li><strong>WhatsApp:</strong> +91 6390 057 777</li>
                  <li><strong>Website:</strong> <a href="/contact" className="text-[#B8860B] hover:underline">www.occult369.com/contact</a></li>
                  <li><strong>Response Time:</strong> We respond to all legal inquiries within 72 hours</li>
                </ul>
              </div>
            </div>

            {/* Agreement */}
            <div className="mb-12 bg-[#B8860B]/10 p-8 rounded-lg border border-[#B8860B]/20">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#301934] mb-6">Your Agreement</h2>
              <p className="font-paragraph text-[#301934]/80 leading-relaxed text-lg">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. You also confirm that you are legally able to enter into this agreement.
              </p>
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