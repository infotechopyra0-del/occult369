"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Shield,
  Users as UsersIcon,
  Star,
  Sparkles
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { motion } from 'framer-motion';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  lastLogin?: string;
  totalOrders?: number;
  totalSpent?: number;
  avatar?: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users || []);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchUsers();
    }
  }, [status, session]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'banned': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'user': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(u => u._id !== userId));
        }
      } catch (error) {
      }
    }
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
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
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#301934] to-purple-700 px-6 lg:px-8 py-6 shadow-lg  overflow-hidden ">
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
                <UsersIcon className="w-8 h-8 text-[#B8860B]" />
                User Management
                <Sparkles className="w-6 h-6 text-[#A020F0] animate-pulse ml-2" />
              </h1>
              <p className="text-purple-100 font-sora text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#B8860B]" />
                Manage all registered users and their activities
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          

          {/* Users Table */}
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-gray-800">
                Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">User</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Contact</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Role</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Join Date</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Orders</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Spent</th>
                      <th className="text-left p-4 font-semibold text-gray-700 font-sora text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#301934] to-[#A020F0] rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 font-sora">{user.name || 'Unknown User'}</p>
                              <p className="text-sm text-gray-500 font-sora">{user.email || 'No email'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span className="font-sora">{user.email || 'No email'}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span className="font-sora">{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role || 'user')} font-sora`}>
                            {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status || 'active')} font-sora`}>
                            {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-600 font-sora">
                            {new Date(user.joinDate).toLocaleDateString('en-GB')}
                          </p>
                          {user.lastLogin && (
                            <p className="text-xs text-gray-400 font-sora">
                              Last: {new Date(user.lastLogin).toLocaleDateString('en-GB')}
                            </p>
                          )}
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-gray-900 font-sora">{user.totalOrders || 0}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-gray-900 font-sora">₹{user.totalSpent || 0}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUser(user._id)}
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
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-sora">No users found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* View User Modal */}
        {showViewModal && selectedUser && (
          <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#301934] font-sora flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    User Details
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
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900 font-sora">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 font-sora">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900 font-sora">{selectedUser.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <p className="text-gray-900 font-sora capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <p className="text-gray-900 font-sora capitalize">{selectedUser.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <p className="text-gray-900 font-sora">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Orders</label>
                    <p className="text-gray-900 font-sora">{selectedUser.totalOrders || 0}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent</label>
                    <p className="text-gray-900 font-sora">₹{selectedUser.totalSpent || 0}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#301934] font-sora flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Edit User
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closeEditModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <Input
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        className="font-sora"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        className="font-sora"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input
                        value={editingUser.phone || ''}
                        onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                        className="font-sora"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={editingUser.status}
                        onChange={(e) => setEditingUser({...editingUser, status: e.target.value as 'active' | 'inactive' | 'banned'})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md font-sora text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="banned">Banned</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={closeEditModal}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button"
                      className="bg-[#301934] hover:bg-[#301934]/90 text-white"
                    >
                      Update User
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
