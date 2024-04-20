import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcrypt';
import { prisma } from '@/app/lib/prisma';

async function authorize(credentials: { username: string; password: string }): Promise<any | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: credentials.username }, { email: credentials.username }],
      },
    });

    if (!user || !user.password || !(await bcrypt.compare(credentials.password, user.password))) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw new Error('Internal Server Error');
  }
}

export const authOptions = {
  pages: {
    signIn: '/prijava',
    signOut: '/prijava',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return authorize(credentials as any);
      },
    }),
  ],
  callbacks: {
    async session(session: any) {
      return session;
    },
    async jwt(token: JWT) {
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
