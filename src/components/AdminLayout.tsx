"use client"

import { SessionProvider } from 'next-auth/react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-white to-[#F5F5DC]">
        <AdminSidebar />
        <div className="lg:pl-36 min-h-screen">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
