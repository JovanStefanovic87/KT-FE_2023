import { prisma } from '../lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcrypt';
import { NextAuthOptions, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    token?: string;
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}

async function authorize(credentials: { username: string; password: string }): Promise<any | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: credentials.username }],
      },
    });

    if (!user || !user.password || !(await bcrypt.compare(credentials.password, user.password))) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw new Error('Internal Server Error');
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/prijava',
    signOut: '/prijava',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await authorize(credentials as any);
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      console.log('callbacks-jwt', token);
      return token;
    },
  },
  // adapter: PrismaAdapter(prisma),
};
