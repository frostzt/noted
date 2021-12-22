import axios from 'axios';
import React, { useContext } from 'react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import '../styles/globals.css';
import Logo from '../Components/Logo/Logo';
import AuthContext, { AuthProvider } from '../contexts/Auth.context';

function MyApp({ Component, pageProps }: AppProps) {
  const { updateIsAuthenticated, updateAuthToken } = useContext(AuthContext);

  axios.interceptors.response.use((response) => {
    if (response.status === 401) {
      updateAuthToken('');
      updateIsAuthenticated(false);
    }

    return response;
  });

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
