"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Settings,
  DollarSign,
  Clock,
  Star,
  Sparkles,
  Package,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Service {
  _id: string;
  serviceName: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  serviceImage: string;
  status: 'active' | 'inactive';
  featured?: boolean;
  category?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    shortDescription: '',
    longDescription: '',
    price: 0,
    serviceImage: '',
    category: 'General',
    duration: '',
    featured: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [updating, setUpdating] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingService, setViewingService] = useState<Service | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/admin/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data.services || []);
        } else {
          setServices([]);
        }
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchServices();
    }
  }, [status, session]);

  const filteredServices = services.filter(service => {
    const matchesSearch = (service.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.shortDescription || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.longDescription || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Astrology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Numerology': 'bg-blue-100 text-blue-800 border-blue-200',
      'Spiritual': 'bg-pink-100 text-pink-800 border-pink-200',
      'Consultation': 'bg-orange-100 text-orange-800 border-orange-200',
      'General': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const totalRevenue = services.filter(s => s.status === 'active').reduce((sum, service) => sum + service.price, 0);
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))];

  const handleDelete = (serviceId: string) => {
    setServiceToDelete(serviceId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/services?id=${serviceToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setServices(services.filter(s => s._id !== serviceToDelete));
        setShowDeleteDialog(false);
        setServiceToDelete(null);
        toast.success('Service deleted successfully!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setServiceToDelete(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setNewService({
      serviceName: service.serviceName,
      shortDescription: service.shortDescription,
      longDescription: service.longDescription,
      price: service.price,
      serviceImage: service.serviceImage,
      category: service.category || 'General',
      duration: service.duration || '',
      featured: service.featured || false
    });
    setShowEditModal(true);
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/services/${editingService._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });
      
      if (response.ok) {
        const updatedService = await response.json();
        setServices(services.map(s => s._id === editingService._id ? updatedService.service : s));
        setShowEditModal(false);
        setEditingService(null);
        setNewService({
          serviceName: '',
          shortDescription: '',
          longDescription: '',
          price: 0,
          serviceImage: '',
          category: 'General',
          duration: '',
          featured: false
        });
        setSelectedFile(null);
        toast.success('Service updated successfully!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Error updating service');
    } finally {
      setUpdating(false);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditingService(null);
    setNewService({
      serviceName: '',
      shortDescription: '',
      longDescription: '',
      price: 0,
      serviceImage: '',
      category: 'General',
      duration: '',
      featured: false
    });
    setSelectedFile(null);
  };

  const handleView = (service: Service) => {
    setViewingService(service);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewingService(null);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      setUploading(false);
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      setUploading(false);
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        try {
          // Upload to Cloudinary via API
          const response = await fetch('/api/upload/image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: result }),
          });

          if (response.ok) {
            const uploadData = await response.json();
            setNewService(prevService => ({
              ...prevService,
              serviceImage: uploadData.url
            }));
            toast.success('Image uploaded to Cloudinary successfully!');
          } else {
            const errorData = await response.json();
            toast.error(errorData.error || 'Failed to upload image');
          }
        } catch (error) {
          console.error('Upload error:', error);
          toast.error('Failed to upload image');
        }
      } else {
        toast.error('Failed to process image');
      }
      setUploading(false);
    };
    
    reader.onerror = () => {
      toast.error('Failed to read image file');
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      handleImageUpload(file);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });
      
      if (response.ok) {
        const addedService = await response.json();
        setServices([addedService.service, ...services]);
        setShowAddModal(false);
        setNewService({
          serviceName: '',
          shortDescription: '',
          longDescription: '',
          price: 0,
          serviceImage: '',
          category: 'General',
          duration: '',
          featured: false
        });
        setSelectedFile(null);
        toast.success('Service added successfully!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add service');
      }
    } catch (error) {
      toast.error('Error adding service');
    } finally {
      setSubmitting(false);
    }
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
      <div className="h-screen bg-[#f5f1e8] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#301934] to-purple-700 px-6 lg:px-4 py-6 shadow-lg  overflow-hidden">
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
                <Settings className="w-8 h-8 text-[#B8860B]" />
                Service Management
                <Sparkles className="w-6 h-6 text-[#A020F0] animate-pulse ml-2" />
              </h1>
              <p className="text-purple-100 font-sora text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#B8860B]" />
                Manage all services and their configurations
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-sora"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">      

          {/* Services Table */}
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-gray-800">
                Services ({filteredServices.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Service</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Category</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Price</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Created</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((service, index) => (
                      <motion.tr
                        key={service._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#301934] to-[#A020F0] rounded-lg flex items-center justify-center text-white">
                              {service.serviceImage ? (
                                <img 
                                  src={service.serviceImage} 
                                  alt={service.serviceName}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <ImageIcon className="w-6 h-6" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 font-sora">
                                {service.serviceName || 'Untitled Service'}
                              </p>
                              <p className="text-sm text-gray-500 font-sora line-clamp-2">
                                {service.shortDescription?.substring(0, 60)}...
                              </p>
                              {service.duration && (
                                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{service.duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(service.category || 'General')} font-sora`}>
                            {service.category || 'General'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-gray-900 font-sora">
                              ₹{service.price || 0}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)} font-sora flex items-center gap-1 w-fit`}>
                            {getStatusIcon(service.status)}
                            {service.status?.toUpperCase() || 'INACTIVE'}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="text-sm text-gray-600 font-sora">
                            {service.createdAt ? new Date(service.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                              onClick={() => handleView(service)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                              onClick={() => handleEdit(service)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(service._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-sora">No services found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-heading text-gray-800">Add New Service</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleAddService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Service Name *
                </label>
                <Input
                  type="text"
                  required
                  value={newService.serviceName}
                  onChange={(e) => setNewService({...newService, serviceName: e.target.value})}
                  placeholder="Enter service name"
                  className="font-sora"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Short Description *
                </label>
                <textarea
                  required
                  value={newService.shortDescription}
                  onChange={(e) => setNewService({...newService, shortDescription: e.target.value})}
                  placeholder="Enter brief description (for cards and previews)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Long Description *
                </label>
                <textarea
                  required
                  value={newService.longDescription}
                  onChange={(e) => setNewService({...newService, longDescription: e.target.value})}
                  placeholder="Enter detailed description (for service pages)"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                    Price (₹) *
                  </label>
                  <Input
                    type="number"
                    required
                    min="0"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                    placeholder="0"
                    className="font-sora"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                    Category
                  </label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({...newService, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                  >
                    <option value="General">General</option>
                    <option value="Astrology">Astrology</option>
                    <option value="Numerology">Numerology</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                    Duration
                  </label>
                  <Input
                    type="text"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    placeholder="e.g., 30 minutes"
                    className="font-sora"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                    Service Image *
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                      disabled={uploading}
                    />
                    {uploading && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm font-sora">Uploading image...</span>
                      </div>
                    )}
                    {newService.serviceImage && (
                      <div className="flex items-center gap-3">
                        <img 
                          src={newService.serviceImage} 
                          alt="Preview" 
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-green-600 font-sora">Image uploaded successfully!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              

              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#301934] hover:bg-[#301934]/90 text-white"
                  disabled={submitting || uploading || !newService.serviceImage}
                >
                  {submitting ? 'Adding Service...' : uploading ? 'Uploading Image...' : 'Add Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 font-sora">Delete Service</h3>
                  <p className="text-sm text-gray-600 font-sora">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-sora text-sm font-medium mb-1">
                      ⚠️ Warning: Permanent Deletion
                    </p>
                    <p className="text-red-700 font-sora text-sm">
                      Are you sure you want to delete this service? All associated data will be permanently removed and cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={cancelDelete}
                  disabled={deleting}
                  className="font-sora"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white font-sora"
                >
                  {deleting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </div>
                  ) : (
                    'Delete Service'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-[#301934] font-sora flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Service
              </h2>
            </div>
            
            <form onSubmit={handleUpdateService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Service Name *
                </label>
                <Input
                  type="text"
                  required
                  value={newService.serviceName}
                  onChange={(e) => setNewService({...newService, serviceName: e.target.value})}
                  placeholder="Enter service name"
                  className="font-sora"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Short Description *
                </label>
                <textarea
                  required
                  value={newService.shortDescription}
                  onChange={(e) => setNewService({...newService, shortDescription: e.target.value})}
                  placeholder="Enter brief description (for cards and previews)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Long Description *
                </label>
                <textarea
                  required
                  value={newService.longDescription}
                  onChange={(e) => setNewService({...newService, longDescription: e.target.value})}
                  placeholder="Enter detailed description (for service pages)"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                    Price (₹) *
                  </label>
                  <Input
                    type="number"
                    required
                    min="0"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: Number(e.target.value)})}
                    placeholder="999"
                    className="font-sora"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                    Duration
                  </label>
                  <Input
                    type="text"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    placeholder="30 minutes"
                    className="font-sora"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Category
                </label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                >
                  <option value="General">General</option>
                  <option value="Astrology">Astrology</option>
                  <option value="Numerology">Numerology</option>
                  <option value="Spiritual">Spiritual</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sora">
                  Service Image *
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm font-sora">Uploading image...</span>
                    </div>
                  )}
                  {newService.serviceImage && (
                    <div className="flex items-center gap-3">
                      <img 
                        src={newService.serviceImage} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-green-600 font-sora">Image uploaded successfully!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              

              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={cancelEdit}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#301934] hover:bg-[#301934]/90 text-white"
                  disabled={updating || uploading || !newService.serviceImage}
                >
                  {updating ? 'Updating Service...' : uploading ? 'Uploading Image...' : 'Update Service'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Service Modal */}
      {showViewModal && viewingService && (
        <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#301934] font-sora flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Service Details
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeViewModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service Image */}
                <div>
                  <img 
                    src={viewingService.serviceImage} 
                    alt={viewingService.serviceName}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 flex items-center gap-2">

                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(viewingService.status || 'active')}`}>
                      {getStatusIcon(viewingService.status || 'active')}
                      <span className="ml-1 capitalize">{viewingService.status || 'active'}</span>
                    </span>
                    {viewingService.category && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(viewingService.category)}`}>
                        {viewingService.category}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Service Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-sora mb-2">
                      {viewingService.serviceName}
                    </h3>
                    <p className="text-gray-600 font-sora">
                      {viewingService.shortDescription}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-800">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium font-sora">Price</span>
                      </div>
                      <p className="text-lg font-bold text-green-900 font-sora mt-1">
                        ₹{viewingService.price.toLocaleString()}
                      </p>
                    </div>
                    
                    {viewingService.duration && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-800">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium font-sora">Duration</span>
                        </div>
                        <p className="text-lg font-bold text-blue-900 font-sora mt-1">
                          {viewingService.duration}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 font-sora mb-2">Detailed Description</h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700 font-sora leading-relaxed">
                        {viewingService.longDescription}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 font-sora">
                    <div>
                      <span className="font-medium">Created:</span>
                      <br />
                      {new Date(viewingService.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>
                      <br />
                      {new Date(viewingService.updatedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={closeViewModal}
                >
                  Close
                </Button>
                <Button
                  className="bg-[#301934] hover:bg-[#301934]/90 text-white"
                  onClick={() => {
                    closeViewModal();
                    handleEdit(viewingService);
                  }}
                >
                  Edit Service
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}