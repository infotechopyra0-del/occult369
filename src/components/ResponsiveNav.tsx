"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, Settings, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';

interface ResponsiveNavProps {
  currentPage?: string;
}

export default function ResponsiveNav({ currentPage = '' }: ResponsiveNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/services', label: 'Services', page: 'services' },
    { href: '/testimonials', label: 'Testimonials', page: 'testimonials' },
    { href: '/contact', label: 'Contact', page: 'contact' },
    { href: '/about', label: 'About', page: 'about' },
  ];

  const isActive = (href: string) => pathname === href || currentPage === navLinks.find(link => link.href === href)?.page;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#301934]/95 backdrop-blur-md border-b border-[#B8860B]/30 shadow-lg transform-gpu will-change-transform">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-3 md:py-4 px-4 sm:px-6 relative" style={{ minHeight: '64px', contain: 'layout' }}>
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#B8860B]/30 shadow-md bg-gradient-to-br from-[#B8860B] to-[#B8860B]/80 flex items-center justify-center"
            >
              <Image
                src="/images/MainLogo.jpg"
                alt="Occult369 Logo"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <div className="block">
              <h1 className="font-heading text-sm md:text-base lg:text-lg font-bold text-[#F5F5DC]">
                Occult369
              </h1>
              <p className="text-[8px] md:text-[10px] lg:text-xs text-[#B8860B] font-medium tracking-wider uppercase">
                Numerology & Mysticism
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(link.href)
                      ? 'text-[#B8860B]'
                      : 'text-[#F5F5DC] hover:text-[#B8860B]'
                  }`}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B8860B] to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-[#B8860B] border-t-transparent"></div>
            ) : session?.user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent focus:bg-transparent"
                    style={{ outline: 'none', boxShadow: 'none' }}
                  >
                    <Avatar className="h-10 w-10 border-2 border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-200">
                      <AvatarImage 
                        src={session.user.profileImage || '/images/default.jpg'} 
                        alt={session.user.name} 
                      />
                      <AvatarFallback className="bg-[#B8860B] text-[#301934] font-semibold">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-[#301934]/95 backdrop-blur-md border border-[#B8860B]/20 shadow-xl" 
                  align="end" 
                  forceMount
                  sideOffset={8}
                  style={{ zIndex: 9999 }}
                >
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={session.user.profileImage || '/images/default.jpg'} 
                        alt={session.user.name} 
                      />
                      <AvatarFallback className="bg-[#B8860B] text-[#301934] text-sm">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-[#F5F5DC]" style={{fontFamily: 'sora'}}>{session.user.name}</p>
                      <p className="w-[180px] truncate text-xs text-[#F5F5DC]/70" style={{fontFamily: 'sora'}}>
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-[#B8860B]/20" />
                  <DropdownMenuItem asChild className="text-[#F5F5DC] hover:bg-[#B8860B]/20 focus:bg-[#B8860B]/20">
                    <Link href="/profile" className="flex items-center" style={{fontFamily: 'sora'}}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-[#F5F5DC] hover:bg-[#B8860B]/20 focus:bg-[#B8860B]/20">
                    <Link href="/orders" className="flex items-center" style={{fontFamily: 'sora'}}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  {session.user.role === 'admin' && (
                    <DropdownMenuItem asChild className="text-[#F5F5DC] hover:bg-[#B8860B]/20 focus:bg-[#B8860B]/20">
                      <Link href="/admin/dashboard" className="flex items-center" style={{fontFamily: 'sora'}}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-[#B8860B]/20" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="flex items-center text-red-400 hover:text-red-300 hover:bg-red-500/20 focus:bg-red-500/20"
                    style={{fontFamily: 'sora'}}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="px-6 py-2 bg-gradient-to-r from-[#B8860B] to-[#B8860B]/80 text-[#301934] rounded-full text-sm font-semibold transition-shadow hover:shadow-lg hover:shadow-[#B8860B]/50 border-0 hover:from-[#B8860B]/90 hover:to-[#B8860B]/70" style={{fontFamily: 'sora'}}>
                    Login
                  </Button>
                </motion.div>
              </Link>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-[#F5F5DC] hover:text-[#B8860B] hover:bg-[#B8860B]/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? 'auto' : 0 
          }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="bg-[#301934]/98 backdrop-blur-md border-t border-[#B8860B]/20 px-4 sm:px-6 pb-4">
            <div className="space-y-1 pt-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B]/30'
                        : 'text-[#F5F5DC] hover:bg-[#B8860B]/10 hover:text-[#B8860B]'
                    }`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}

              {session?.user ? (
                <>
                  <div className="px-3 py-3 mt-4 border-t border-[#B8860B]/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user.profileImage || '/images/default.jpg'} alt={session.user.name} />
                        <AvatarFallback className="bg-[#B8860B] text-[#301934] font-semibold">
                          {session.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#F5F5DC]" style={{fontFamily: 'sora'}}>{session.user.name}</p>
                        <p className="text-xs text-[#B8860B]" style={{fontFamily: 'sora'}}>{session.user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full px-3 py-3 mt-2 text-[#F5F5DC] hover:bg-[#B8860B]/10 hover:text-[#B8860B] rounded-lg text-sm font-medium transition-all duration-200"
                      style={{fontFamily: 'sora'}}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </motion.div>
                  </Link>
                  
                  <Link href="/orders" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full px-3 py-3 text-[#F5F5DC] hover:bg-[#B8860B]/10 hover:text-[#B8860B] rounded-lg text-sm font-medium transition-all duration-200"
                      style={{fontFamily: 'sora'}}
                    >
                      <ShoppingBag className="mr-3 h-4 w-4" />
                      Orders
                    </motion.div>
                  </Link>
                  
                  {session.user.role === 'admin' && (
                    <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center w-full px-3 py-3 text-[#F5F5DC] hover:bg-[#B8860B]/10 hover:text-[#B8860B] rounded-lg text-sm font-medium transition-all duration-200"
                        style={{fontFamily: 'sora'}}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Admin Dashboard
                      </motion.div>
                    </Link>
                  )}
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-3 py-3 mt-2 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{fontFamily: 'sora'}}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </motion.button>
                </>
              ) : (
                <div className="mt-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-[#B8860B] to-[#B8860B]/80 text-[#301934] rounded-lg text-sm font-semibold text-center shadow-lg transition-all duration-200"
                      style={{fontFamily: 'sora'}}
                    >
                      Login
                    </motion.div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}