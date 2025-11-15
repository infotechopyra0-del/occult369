"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Clock, Users } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => setIsOpen(!isOpen);

  const sendWhatsAppMessage = (messageType: string) => {
    let message = "";
    
    switch (messageType) {
      case 'general':
        message = "Hi! I'd like to learn more about your numerology services.";
        break;
      case 'reading':
        message = "Hi! I want to book a numerology reading session.";
        break;
      case 'pdf':
        message = "Hi! I want to get the 55+ Premium PDF collection instantly.";
        break;
      case 'emergency':
        message = "Hi! I need urgent numerology consultation.";
        break;
      default:
        message = "Hi! I'd like to know more about Occult369.";
    }
    
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-[#B8860B]/20 overflow-hidden"
            style={{ width: '320px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Occult369 Support</h3>
                    <p className="text-xs opacity-90 flex items-center">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                      Online - Reply in minutes
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleWidget}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-4 max-h-80 overflow-y-auto">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-[#F5F5DC] rounded-lg p-3 text-sm text-[#301934] mb-3">
                  <p className="mb-2">👋 Welcome to Occult369!</p>
                  <p className="text-xs opacity-75">
                    Hi there! How can we help you discover your destiny through numerology today?
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => sendWhatsAppMessage('reading')}
                  className="w-full text-left p-3 bg-[#301934]/5 hover:bg-[#301934]/10 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">📱</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#301934]">Book Reading Session</p>
                      <p className="text-xs text-[#301934]/60">Get personalized numerology reading</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => sendWhatsAppMessage('pdf')}
                  className="w-full text-left p-3 bg-[#301934]/5 hover:bg-[#301934]/10 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">📚</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#301934]">Get 55+ PDFs Instantly</p>
                      <p className="text-xs text-[#301934]/60">Download premium numerology guides</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => sendWhatsAppMessage('general')}
                  className="w-full text-left p-3 bg-[#301934]/5 hover:bg-[#301934]/10 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">💬</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#301934]">General Inquiry</p>
                      <p className="text-xs text-[#301934]/60">Ask about our services</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => sendWhatsAppMessage('emergency')}
                  className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700">Urgent Consultation</p>
                      <p className="text-xs text-red-600">Need immediate guidance</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-[#B8860B]/20">
                <div className="flex items-center justify-between text-xs text-[#301934]/60">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>1000+ Happy Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={toggleWidget}
        className="relative bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        {/* Notification Badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          3
        </motion.div>

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-green-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-[#301934] text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#301934] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;