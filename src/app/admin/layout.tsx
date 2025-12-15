// app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ye check har admin page ke liye automatically run hoga
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    redirect('/login');
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).select('role').lean();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  // Admin verified, render children
  return <>{children}</>;
}

// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic';
export const revalidate = 0;