import React from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';

import '../styles/globals.css';
import Logo from '../Components/Logo/Logo';
import { AuthProvider } from '../contexts/Auth.context';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster />
      <Logo />
      <AnimatePresence exitBeforeEnter initial={true}>
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}

export default MyApp;
