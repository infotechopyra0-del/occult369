import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

interface UserRoleRequestBody {
  email: string;
}

interface UserRoleResponse {
  role: string | null;
}

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse<UserRoleResponse>> {
  const { email }: UserRoleRequestBody = await req.json();
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ role: null }, { status: 404 });
  }
  return NextResponse.json({ role: user.role });
}
