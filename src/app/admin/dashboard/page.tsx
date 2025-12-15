// app/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  // Server-side check - ye pehle run hoga
  const session = await getServerSession(authOptions);
  // No session? Redirect immediately
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  // Connect to database and fetch user role
  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).select('role email name').lean();
  // No user or not admin? Redirect immediately
  if (!user || user.role !== 'admin') {
    redirect('/');
  }
  // Admin verified! Render the dashboard and pass user prop
  return <AdminDashboardClient />;
}

// Optional: Add metadata
export const metadata = {
  title: 'Admin Dashboard - Occult369',
  description: 'Admin Dashboard',
};