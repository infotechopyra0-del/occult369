// app/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect('/login');
  }
  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).select('role email name').lean();
  if (!user || user.role !== 'admin') {
    redirect('/');
  }
  return <AdminDashboardClient />;
}
export const metadata = {
  title: 'Admin Dashboard - Occult369',
  description: 'Admin Dashboard',
};