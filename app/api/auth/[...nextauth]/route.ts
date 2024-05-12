import { authOptions } from '@/app/authOptions/authOptions';
import NextAuth from 'next-auth';

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
