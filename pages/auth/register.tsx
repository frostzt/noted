import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import Button from '../../Components/Button/Button';
import Layout from '../../Components/Layout/Layout';
import FormInput from '../../Components/Form/FormInput/FormInput';

const RegisterPage = () => {
  // Form Data
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
  };

  return (
    <Layout className="px-8 py-4">
      <Head>
        <title>Register - Noted</title>
        <meta name="description" content="Note taking made easy and beautiful" />
      </Head>
      <h2 className="text-slate-50 font-bold text-2xl mb-8">Register</h2>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          type="text"
          name="register-name-input"
          value={name}
          setValue={handleNameChange}
          label="Name"
          required={true}
          placeholder="Your awesome name"
          className="mb-4"
        />
        <FormInput
          type="email"
          name="register-email-input"
          value={email}
          setValue={handleEmailChange}
          label="Email"
          required={true}
          placeholder="Your email"
          className="mb-4"
        />
        <FormInput
          type="text"
          name="register-password-input"
          value={password}
          setValue={handlePasswordChange}
          label="Password"
          required={true}
          placeholder="Your super-secret password"
          className="mb-8"
        />
        <Button className="!w-full">Register</Button>
      </form>
      <p className="text-slate-50 text-sm text-center mt-10">
        Or{' '}
        <Link href="/auth/login" passHref>
          <span className="cursor-pointer text-blue-500">already got an account</span>
        </Link>
      </p>
    </Layout>
  );
};

export default RegisterPage;
