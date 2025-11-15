// WhatsApp utility functions
export const openWhatsAppChat = (message?: string) => {
  const defaultMessage = "Hi! I'd like to learn more about your numerology services.";
  const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(message || defaultMessage)}`;
  window.open(whatsappUrl, '_blank');
};

export const handleWhatsAppContact = (customMessage?: string) => {
  openWhatsAppChat(customMessage);
};