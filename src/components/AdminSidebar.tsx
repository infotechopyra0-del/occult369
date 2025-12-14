"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Briefcase, 
  FileText, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  Star,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/admin/dashboard/users',
    icon: Users,
  },
  {
    name: 'Orders',
    href: '/admin/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    name: 'Sample Reports',
    href: '/admin/dashboard/sample-reports',
    icon: FileText,
  },
  {
    name: 'Services',
    href: '/admin/dashboard/services',
    icon: Briefcase,
  },
  {
    name: 'Contacts',
    href: '/admin/dashboard/contacts',
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-60 p-2 rounded-lg bg-[#301934] text-[#B8860B] shadow-lg border border-[#B8860B]/20"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out",
          "w-72 bg-gradient-to-b from-[#301934] via-[#301934]/95 to-[#A020F0] text-[#F5F5DC] shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-20 border-b border-[#B8860B]/20 bg-[#301934] relative overflow-hidden">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#B8860B]/10 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-[#B8860B]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#A020F0]/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#A020F0]" />
            </div>
            <Link href="/admin/dashboard" className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold font-heading tracking-wider text-[#F5F5DC]">OCCULT369</h1>
              <p className="text-xs text-[#B8860B] font-sora">Admin Panel</p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    "hover:bg-[#B8860B]/10 hover:translate-x-1",
                    isActive 
                      ? "bg-gradient-to-r from-[#B8860B]/20 to-[#B8860B]/10 text-[#B8860B] shadow-lg border border-[#B8860B]/30" 
                      : "text-[#F5F5DC]/90 hover:text-[#B8860B]"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors", 
                    isActive ? "text-[#B8860B]" : "text-[#F5F5DC]/70 group-hover:text-[#B8860B]"
                  )} />
                  <span className="font-sora">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#B8860B]/20">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500/20 text-[#F5F5DC]/90 hover:text-red-200 border border-transparent hover:border-red-500/30"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-sora">Logout</span>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-0 w-1 h-20 bg-gradient-to-b from-[#B8860B] to-transparent opacity-30"></div>
        </div>
      </aside>
    </>
  );
}
