import '../styles/globals.css';
import { authOptions } from './authConfig/auth';
import Header from './components/layout/Header';
import SessionProvider from './components/sessionProvider/sessionProvider';

import { Providers } from './globalRedux/provider';
import { Session, getServerSession } from 'next-auth';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>
          <Header />
        </Providers>
        <Providers>
          <SessionProvider session={session}>{children}</SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
