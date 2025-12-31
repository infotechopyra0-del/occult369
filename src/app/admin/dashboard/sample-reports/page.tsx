"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Search, 
  Trash2,
  Calendar,
  Star,
  Sparkles,
  FileText,
  Phone,
  User,
  Cake
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface SampleReport {
  _id: string;
  firstName: string;
  birthDate: string;
  whatsappNumber: string;
  createdAt: string;
  updatedAt: string;
}

export default function SampleReportsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sampleReports, setSampleReports] = useState<SampleReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportToDelete, setReportToDelete] = useState<SampleReport | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (status !== 'loading' && (!session || session.user?.role !== 'admin')) {
      router.push('/');
      return;
    }
    
    if (session?.user?.role === 'admin') {
      fetchSampleReports();
    }
  }, [session, status, router]);

  const fetchSampleReports = async () => {
    try {
      const response = await fetch('/api/admin/sample-reports');
      if (!response.ok) {
        throw new Error('Failed to fetch sample reports');
      }
      const data = await response.json();
      setSampleReports(data.sampleReports || []);
    } catch (error) {
      toast.error('Failed to load sample reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async () => {
    if (!reportToDelete) return;

    try {
      const response = await fetch(`/api/admin/sample-reports/${reportToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sample report');
      }

      setSampleReports(prev => prev.filter(report => report._id !== reportToDelete._id));
      toast.success('Sample report deleted successfully');
      setShowDeleteDialog(false);
      setReportToDelete(null);
    } catch (error) {
      toast.error('Failed to delete sample report');
    }
  };

  const filteredReports = sampleReports.filter(report => {
    const matchesSearch = (report.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.whatsappNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatBirthDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
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
                <FileText className="w-8 h-8 text-[#B8860B]" />
                Sample Reports Management
                <Sparkles className="w-6 h-6 text-[#A020F0] animate-pulse ml-2" />
              </h1>
              <p className="text-purple-100 font-sora text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#B8860B]" />
                Manage all sample report requests from customers
              </p>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white/90 border-none focus:bg-white transition-all font-sora"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 space-y-6 admin-contacts-scroll">
          {/* Sample Reports Table */}
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-gray-800">
                Sample Reports ({filteredReports.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Customer Info</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Birth Date</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Age</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">WhatsApp</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Request Date</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report, index) => (
                      <motion.tr
                        key={report._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#B8860B]/20 to-[#301934]/20 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-[#301934]" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 font-sora">
                                {report.firstName}
                              </p>
                              <p className="text-sm text-gray-500 font-sora">
                                Report Request
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Cake className="w-4 h-4 text-[#B8860B]" />
                            <span className="font-sora">
                              {formatBirthDate(report.birthDate)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-[#B8860B]/10 text-[#301934] rounded-full text-sm font-medium font-sora">
                            {calculateAge(report.birthDate)} years
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-600" />
                            <a 
                              href={`https://wa.me/${report.whatsappNumber.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700 font-sora text-sm hover:underline"
                            >
                              {report.whatsappNumber}
                            </a>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="font-sora">
                              {formatDate(report.createdAt)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 hover:bg-green-50 hover:border-green-200"
                              onClick={() => {
                                window.open(`https://wa.me/${report.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi ${report.firstName}! Your sample numerology report is ready. Thank you for your interest in Occult369!`, '_blank');
                              }}
                              title="Send WhatsApp Message"
                            >
                              <Phone className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                              onClick={() => {
                                setReportToDelete(report);
                                setShowDeleteDialog(true);
                              }}
                              title="Delete Report"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-sora">No sample reports found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading text-gray-900">Delete Sample Report</AlertDialogTitle>
              <AlertDialogDescription className="font-sora text-gray-600">
                Are you sure you want to delete the sample report request from <strong>{reportToDelete?.firstName}</strong>? 
                This action cannot be undone and will permanently remove their information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                className="font-sora"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setReportToDelete(null);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 font-sora text-white rounded-lg px-6 py-2"
                onClick={handleDeleteReport}
              >
                Delete Report
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}