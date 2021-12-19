import React from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';

import '../styles/globals.css';
import Logo from '../Components/Logo/Logo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Logo />
      <AnimatePresence exitBeforeEnter initial={true}>
        <Component {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
