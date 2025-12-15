// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Redirect authenticated users away from auth pages
    if (token && (pathname === '/login' || pathname === '/signup')) {
      // Admin ko dashboard pe bhejo
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // Regular user ko home pe bhejo
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Admin routes protection with role check
    if (pathname.startsWith('/admin')) {
      // No token? Redirect to login
      if (!token) {
        console.log('[Middleware] No token, redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      // Token hai but admin nahi? Redirect to home
      if (token.role !== 'admin') {
        console.log('[Middleware] User is not admin:', token.role);
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // Admin hai! Access allowed
      console.log('[Middleware] Admin access granted');
      return NextResponse.next();
    }

    // Protected routes (profile, orders) - just need authentication
    if (pathname.startsWith('/profile') || pathname.startsWith('/orders')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    return NextResponse.next();
    
  } catch (error) {
    console.error('[Middleware] Error:', error);
    // Error case me home redirect karo, infinite loop avoid karne ke liye
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/login',
    '/signup', 
    '/admin/:path*',
    '/profile/:path*',
    '/orders/:path*'
  ]
};