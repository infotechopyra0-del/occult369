"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Trash2,
  CheckCircle, 
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Star,
  Sparkles,
  Users,
  MessageCircle
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export default function ContactsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (status !== 'loading' && (!session || session.user?.role !== 'admin')) {
      router.push('/');
      return;
    }
    
    if (session?.user?.role === 'admin') {
      fetchContacts();
    }
  }, [session, status, router]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    if (!contactToDelete) return;

    try {
      const response = await fetch(`/api/admin/contacts/${contactToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      setContacts(prev => prev.filter(contact => contact._id !== contactToDelete._id));
      toast.success('Contact deleted successfully');
      setShowDeleteDialog(false);
      setContactToDelete(null);
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'contacted': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'life-path': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'numerology-chart': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'compatibility': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'career-guidance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'name-analysis': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'yearly-forecast': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'consultation': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatService = (service: string) => {
    if (!service) return 'General Inquiry';
    return service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatPreferredContact = (preferredContact: string) => {
    if (!preferredContact) return 'Email';
    return preferredContact.charAt(0).toUpperCase() + preferredContact.slice(1);
  };

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen bg-[#f5f1e8]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#301934]"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return (
    <AdminLayout>
      <div className="h-screen bg-[#f5f1e8] flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#301934] to-purple-700 px-6 lg:px-8 py-3 shadow-lg overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#B8860B]/10 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-[#B8860B] animate-pulse" />
          </div>
          <div className="absolute top-2 right-16 w-6 h-6 bg-[#A020F0]/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-[#A020F0] animate-bounce" />
          </div>
          <div className="absolute -bottom-1 left-20 w-5 h-5 bg-[#B8860B]/15 rounded-full flex items-center justify-center">
            <Star className="w-2.5 h-2.5 text-[#B8860B] animate-ping" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#A020F0]/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-[#A020F0] animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-[#B8860B] animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
            <div>
              <h1 className="text-3xl font-bold text-white font-heading mb-1 flex items-center gap-2">
                <MessageCircle className="w-8 h-8 text-[#B8860B]" />
                Contact Management
                <Sparkles className="w-6 h-6 text-[#A020F0] animate-pulse ml-2" />
              </h1>
              <p className="text-purple-100 font-sora text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#B8860B]" />
                Manage all customer inquiries and messages
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 space-y-6 admin-contacts-scroll">
          {/* Contacts Table */}
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-gray-800">
                Contacts ({contacts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Contact Info</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Service</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Message Preview</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Date</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      // Skeleton loading
                      [...Array(3)].map((_, index) => (
                        <tr key={index} className="border-b animate-pulse">
                          <td className="p-4">
                            <div className="space-y-2">
                              <div className="w-32 h-4 bg-gray-200 rounded"></div>
                              <div className="w-48 h-3 bg-gray-200 rounded"></div>
                              <div className="w-40 h-3 bg-gray-200 rounded"></div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="w-full h-3 bg-gray-200 rounded"></div>
                              <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                          </td>
                          <td className="p-4">
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                          </td>
                          <td className="p-4">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      contacts.map((contact, index) => (
                      <motion.tr
                        key={contact._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900 font-sora">
                              {contact.name}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                              <Mail className="w-3 h-3" />
                              <span className="font-sora">{contact.email}</span>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                                <Phone className="w-3 h-3" />
                                <span className="font-sora">{contact.phone}</span>
                              </div>
                            )}
                            {contact.preferredContact && (
                              <div className="text-xs text-gray-400 font-sora">
                                Prefers: {formatPreferredContact(contact.preferredContact)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getServiceColor(contact.service || '')} font-sora`}>
                            {formatService(contact.service || '')}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-600 font-sora line-clamp-2 max-w-xs">
                            {contact.message?.substring(0, 100)}
                            {contact.message?.length > 100 && '...'}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)} font-sora flex items-center gap-1 w-fit`}>
                            {getStatusIcon(contact.status)}
                            {contact.status?.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="font-sora">
                              {new Date(contact.createdAt).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                              onClick={() => {
                                setContactToDelete(contact);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    )))}

                  </tbody>
                </table>
              </div>
              
              {!loading && contacts.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-sora">No contacts found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading text-gray-900">Delete Contact</AlertDialogTitle>
              <AlertDialogDescription className="font-sora text-gray-600">
                Are you sure you want to delete this contact from <strong>{contactToDelete?.name}</strong>? 
                This action cannot be undone and will permanently remove all their information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                className="font-sora"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setContactToDelete(null);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 font-sora text-white rounded-lg px-6 py-2"
                onClick={handleDeleteContact}
              >
                Delete Contact
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}