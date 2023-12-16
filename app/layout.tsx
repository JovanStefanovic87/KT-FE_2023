'use client';
import '../styles/globals.css';
import Header from './components/layout/Header';

import { Providers } from './globalRedux/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
