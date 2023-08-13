'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import React, { ReactNode } from 'react'; // Import ReactNode type

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
