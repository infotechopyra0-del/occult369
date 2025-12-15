"use client";

import { useState, Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        toast.error('Invalid credentials');
        setIsLoading(false);
        return;
      }

      // Get session to determine user role (from secure cookie/session)
      const session = await getSession();
      toast.success('Login successful! Redirecting...');
      if (callbackUrl !== '/') {
        router.push(callbackUrl);
      } else if (session?.user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
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
      
      <div className="relative z-10 flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <Sparkles className="h-8 w-8 text-[#B8860B]" />
            <span className="text-2xl font-bold text-[#F5F5DC]" style={{fontFamily: 'cormorantgaramond'}}>
              Occult369
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-[#F5F5DC] mb-2" style={{fontFamily: 'cormorantgaramond'}}>
            Welcome Back
          </h2>
          <p className="text-[#F5F5DC]/80" style={{fontFamily: 'sora'}}>
            Sign in to your mystical journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8"
        >
          <Card className="shadow-2xl border border-[#B8860B]/20 bg-[#301934]/90 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl text-center text-[#F5F5DC]" style={{fontFamily: 'cormorantgaramond'}}>
                Sign In
              </CardTitle>
              <CardDescription className="text-center text-[#F5F5DC]/70" style={{fontFamily: 'sora'}}>
                Access your account to continue your spiritual journey
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
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
                      className="pl-10 h-12 bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#B8860B] focus:ring-[#B8860B]/30"
                      placeholder="Enter your email"
                      style={{fontFamily: 'sora'}}
                    />
                    <Mail className="h-5 w-5 text-[#B8860B]/70 absolute left-3 top-3.5" />
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
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 bg-[#301934]/50 border-[#B8860B]/30 text-[#F5F5DC] placeholder-[#F5F5DC]/50 focus:border-[#B8860B] focus:ring-[#B8860B]/30"
                      placeholder="Enter your password"
                      style={{fontFamily: 'sora'}}
                    />
                    <Lock className="h-5 w-5 text-[#B8860B]/70 absolute left-3 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-[#B8860B]/70 hover:text-[#B8860B]"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#B8860B] to-[#A020F0] hover:from-[#B8860B]/90 hover:to-[#A020F0]/90 text-[#301934] font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{fontFamily: 'sora'}}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#301934]"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-[#F5F5DC]/80" style={{fontFamily: 'sora'}}>
                    Don&apos;t have an account?{' '}
                    <Link 
                      href="/signup" 
                      className="font-medium text-[#B8860B] hover:text-[#B8860B]/80 transition-colors duration-200"
                    >
                      Sign up →
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

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1E] via-[#1A1B3A] to-[#2D1B3D] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}