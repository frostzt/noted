import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { toast } from 'react-hot-toast';
import React, { useState, useContext, useEffect } from 'react';

import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import AuthContext from '../../contexts/Auth.context';
import FormInput from '../../Components/Form/FormInput/FormInput';

const LoginPage = () => {
  const { updateAuthToken, authToken } = useContext(AuthContext);

  // Form Data
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (authToken.trim()) {
      Router.replace('/notes');
    }
  }, [authToken]);

  // Handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      try {
        const data = { email, password };
        const config = { headers: { 'Content-Type': 'application/json' } };
        const response = await axios.post(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/auth/signin`, data, config);
        if (response.status == 201) {
          updateAuthToken(response.data.accessToken);
          Router.replace('/notes');
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Layout className="px-8 py-4 xl:w-3/4 xl:mx-auto 2xl:w-3/5">
      <Head>
        <title>Login - Noted</title>
        <meta name="description" content="Note taking made easy and beautiful" />
      </Head>
      <h2 className="text-slate-50 font-bold text-2xl md:text-3xl mb-8 sm:ml-32 md:ml-44 lg:ml-64">Login</h2>
      <form onSubmit={handleFormSubmit} className="sm:mr-32 sm:ml-32 md:ml-44 md:mr-44 lg:ml-64 lg:mr-64">
        <FormInput
          type="email"
          name="login-email-input"
          value={email}
          setValue={handleEmailChange}
          label="Email"
          required={true}
          placeholder="Your email"
          className="mb-4"
        />
        <FormInput
          type="password"
          name="login-password-input"
          value={password}
          setValue={handlePasswordChange}
          label="Password"
          required={true}
          placeholder="Your super-secret password"
          className="mb-8"
        />
        <Button className="!w-full">Login</Button>
      </form>
      <p className="text-slate-50 text-sm text-center mt-10">
        Or{' '}
        <Link href="/auth/register" passHref>
          <span className="cursor-pointer text-blue-500">create an account</span>
        </Link>
      </p>
    </Layout>
  );
};

export default LoginPage;
