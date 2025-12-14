"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, User, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.password) {
      toast.error('Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      toast.success('Account created successfully! Signing you in...');

      // Auto sign-in after successful signup
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (signInResult?.error) {
        toast.error('Account created but sign-in failed. Please try logging in manually.');
        router.push('/login');
      } else {
        router.push('/');
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{backgroundColor: '#F5F5DC'}}>
      {/* Cosmic Background matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#301934] via-[#301934]/90 to-[#A020F0]"></div>
      
      {/* Mystical decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 text-[#B8860B]/40">
          <div className="w-4 h-4 bg-[#B8860B] rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-40 right-32 text-[#B8860B]/30">
          <div className="w-6 h-6 bg-gradient-to-r from-[#B8860B] to-[#A020F0] rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-32 left-40 text-[#B8860B]/50">
          <div className="w-5 h-5 bg-[#B8860B] rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 right-20 text-[#B8860B]/40">
          <div className="w-7 h-7 bg-gradient-to-r from-[#A020F0] to-[#B8860B] rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-[#F5F5DC] hover:text-[#B8860B] hover:bg-[#B8860B]/10 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span style={{fontFamily: 'sora'}}>Home</span>
          </Button>
        </Link>
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-md mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <Link href="/" className="inline-flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-[#B8860B]" />
            <span className="text-2xl font-bold text-[#F5F5DC]" style={{fontFamily: 'cormorantgaramond'}}>
              Occult369
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8"
        >
          <Card className="shadow-2xl border border-[#B8860B]/20 bg-[#301934]/90 backdrop-blur-sm max-w-md w-full">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-xl text-center text-[#F5F5DC]" style={{fontFamily: 'cormorantgaramond'}}>
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-[#F5F5DC]/70 text-sm" style={{fontFamily: 'sora'}}>
                Join our mystical community and discover your path
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#F5F5DC]" style={{fontFamily: 'sora'}}>
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 h-11 bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#B8860B] focus:ring-[#B8860B]/30"
                      placeholder="Enter your full name"
                      style={{fontFamily: 'sora'}}
                    />
                    <User className="h-5 w-5 text-[#B8860B]/70 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#F5F5DC]" style={{fontFamily: 'sora'}}>
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-11 bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#B8860B] focus:ring-[#B8860B]/30"
                      placeholder="Enter your email"
                      style={{fontFamily: 'sora'}}
                    />
                    <Mail className="h-5 w-5 text-[#B8860B]/70 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#F5F5DC]" style={{fontFamily: 'sora'}}>
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-11 bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#B8860B] focus:ring-[#B8860B]/30"
                      placeholder="Create a password"
                      style={{fontFamily: 'sora'}}
                    />
                    <Lock className="h-5 w-5 text-[#B8860B]/70 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#B8860B]/70 hover:text-[#B8860B]"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#F5F5DC]" style={{fontFamily: 'sora'}}>
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-11 bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#B8860B] focus:ring-[#B8860B]/30"
                      placeholder="Confirm your password"
                      style={{fontFamily: 'sora'}}
                    />
                    <Lock className="h-5 w-5 text-[#B8860B]/70 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-[#B8860B]/70 hover:text-[#B8860B]"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-[#B8860B] to-[#A020F0] hover:from-[#B8860B]/90 hover:to-[#A020F0]/90 text-[#301934] font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{fontFamily: 'sora'}}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#301934]"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-[#F5F5DC]/80" style={{fontFamily: 'sora'}}>
                    Already have an account?{' '}
                    <Link 
                      href="/login" 
                      className="font-medium text-[#B8860B] hover:text-[#B8860B]/80 transition-colors duration-200"
                    >
                      Sign in →
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}