import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        try {
        await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error('Invalid credentials');
          }

          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            profileImage: user.profileImage
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn() {
      return true; // Allow sign in
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Always allow the redirect - we'll handle admin redirect in the login page
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: { token: any; user?: { id?: string; role?: string; profileImage?: string }; trigger?: string; session?: any }) {
      if (user) {
        token.role = user.role;
        token.profileImage = user.profileImage || '/images/default.jpg';
      }
      
      // Handle session updates - fetch fresh data from database
      if (trigger === 'update' && session) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: token.email }).select('-password');
          if (dbUser) {
            token.name = dbUser.name;
            token.profileImage = dbUser.profileImage || '/images/default.jpg';
            token.phone = dbUser.phone;
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      // Always fetch fresh user data on token refresh
      if (token.email && !user) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: token.email }).select('-password');
          if (dbUser) {
            token.name = dbUser.name;
            token.profileImage = dbUser.profileImage || '/images/default.jpg';
            token.phone = dbUser.phone;
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any & { role?: string; profileImage?: string; phone?: string } }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.profileImage = token.profileImage as string || '/images/default.jpg';
        session.user.phone = token.phone as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
};

declare module 'next-auth' {
  interface User {
    role: string;
    profileImage: string;
    phone?: string;
  }
  
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      profileImage: string;
      phone?: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    profileImage: string;
    phone?: string;
  }
}