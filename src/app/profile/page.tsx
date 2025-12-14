"use client";

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Shield,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import ResponsiveNav from '@/components/ResponsiveNav';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profile');
      const data = await response.json();
      
      if (response.ok) {
        setUserProfile(data.user);
        setFormData({
          name: data.user.name || '',
          phone: data.user.phone || ''
        });
      } else {
        toast.error(data.error || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }
    
    fetchProfile();
  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUserProfile(data.user);
        setIsEditing(false);
        await update({ name: data.user.name });
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Update profile with new image
        const updateResponse = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: userProfile?.name, 
            phone: userProfile?.phone,
            profileImage: data.imageUrl 
          }),
        });
        
        if (updateResponse.ok) {
          const updatedData = await updateResponse.json();
          setUserProfile(updatedData.user);
          
          // Update the session with new profile image
          const sessionUpdate = await update({ 
            name: updatedData.user.name,
            profileImage: data.imageUrl,
            trigger: 'update'
          });
          
          console.log('Session updated:', sessionUpdate);
          
          toast.success('Profile picture updated successfully');
          
          // Force navbar refresh by reloading after a short delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#4A1A4A]">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-[#B8860B] border-t-transparent"></div>
      </div>
    );
  }

  if (!session || !userProfile) {
    return null;
  }

  return (
    <>
      <ResponsiveNav currentPage="profile" />
      <div className="min-h-screen bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#4A1A4A] pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/cosmic-pattern.png')] opacity-5"></div>
      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-[#301934]/80 backdrop-blur-md border border-[#B8860B]/20 shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-center">
                    {/* Profile Picture with Upload */}
                    <div className="relative inline-block mb-6">
                      <Avatar className="w-32 h-32 mx-auto border-4 border-[#B8860B]/30 shadow-lg">
                        <AvatarImage 
                          src={userProfile.profileImage} 
                          alt={userProfile.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#B8860B] to-[#B8860B]/80 text-[#301934] text-3xl font-bold">
                          {userProfile.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* Upload Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-0 right-0 bg-[#B8860B] hover:bg-[#B8860B]/90 text-[#301934] rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
                      >
                        {isUploading ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-[#301934] border-t-transparent" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                      </motion.button>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#F5F5DC] mb-2" style={{fontFamily: 'cormorantgaramond'}}>
                      {userProfile.name}
                    </h2>
                    <p className="text-[#F5F5DC]/70 mb-4" style={{fontFamily: 'sora'}}>{userProfile.email}</p>
                    
                    {/* Role Badge */}
                    <Badge 
                      variant={userProfile.role === 'admin' ? 'destructive' : 'secondary'}
                      className={`mb-6 ${userProfile.role === 'admin' 
                        ? 'bg-red-600/20 text-red-300 border-red-500/30' 
                        : 'bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30'
                      }`}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {userProfile.role === 'admin' ? 'Administrator' : 'User'} Account
                    </Badge>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {!isEditing ? (
                        <Button 
                          onClick={() => setIsEditing(true)}
                          className="w-full bg-gradient-to-r from-[#B8860B] to-[#B8860B]/80 text-[#301934] hover:from-[#B8860B]/90 hover:to-[#B8860B]/70"
                          style={{fontFamily: 'sora'}}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Button 
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            style={{fontFamily: 'sora'}}
                          >
                            {isSaving ? (
                              <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Changes
                          </Button>
                          <Button 
                            onClick={() => {
                              setIsEditing(false);
                              setFormData({
                                name: userProfile.name || '',
                                phone: userProfile.phone || ''
                              });
                            }}
                            variant="outline"
                            className="w-full border-[#B8860B]/30 text-[#F5F5DC] hover:bg-[#B8860B]/10"
                            style={{fontFamily: 'sora'}}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                      
                      <Separator className="bg-[#B8860B]/20" />
                      
                      <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        style={{fontFamily: 'sora'}}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-[#301934]/80 backdrop-blur-md border border-[#B8860B]/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#F5F5DC]" style={{fontFamily: 'cormorantgaramond'}}>
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>
                      Your personal details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#B8860B]/5 border border-[#B8860B]/10">
                          <div className="p-2 rounded-full bg-[#B8860B]/10">
                            <User className="h-5 w-5 text-[#B8860B]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>Full Name</p>
                            <p className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>{userProfile.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#B8860B]/5 border border-[#B8860B]/10">
                          <div className="p-2 rounded-full bg-[#B8860B]/10">
                            <Mail className="h-5 w-5 text-[#B8860B]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>Email Address</p>
                            <p className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>{userProfile.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#B8860B]/5 border border-[#B8860B]/10">
                          <div className="p-2 rounded-full bg-[#B8860B]/10">
                            <Phone className="h-5 w-5 text-[#B8860B]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>Phone Number</p>
                            <p className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>
                              {userProfile.phone || 'Not provided'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#B8860B]/5 border border-[#B8860B]/10">
                          <div className="p-2 rounded-full bg-[#B8860B]/10">
                            <Calendar className="h-5 w-5 text-[#B8860B]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>Member Since</p>
                            <p className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>
                              {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:border-[#B8860B] focus:ring-[#B8860B]/20"
                            style={{fontFamily: 'sora'}}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            value={userProfile.email}
                            disabled
                            className="bg-[#301934]/30 border-[#B8860B]/20 text-[#F5F5DC]/60 cursor-not-allowed"
                            style={{fontFamily: 'sora'}}
                          />
                          <p className="text-xs text-[#F5F5DC]/50" style={{fontFamily: 'sora'}}>
                            Email cannot be changed for security reasons
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>
                            Phone Number (Optional)
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:border-[#B8860B] focus:ring-[#B8860B]/20"
                            style={{fontFamily: 'sora'}}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-[#301934]/80 backdrop-blur-md border border-[#B8860B]/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#F5F5DC]" style={{fontFamily: 'cormorantgaramond'}}>
                      Account Security
                    </CardTitle>
                    <CardDescription className="text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>
                      Your account security status and information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="p-2 rounded-full bg-green-500/10">
                          <Shield className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>Account Status</p>
                          <p className="text-green-400 font-medium" style={{fontFamily: 'sora'}}>Active & Verified</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20">
                        <div className="p-2 rounded-full bg-[#B8860B]/10">
                          <Settings className="h-5 w-5 text-[#B8860B]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#F5F5DC]/60" style={{fontFamily: 'sora'}}>Last Updated</p>
                          <p className="text-[#F5F5DC] font-medium" style={{fontFamily: 'sora'}}>
                            {new Date(userProfile.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}