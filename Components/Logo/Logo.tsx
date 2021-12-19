import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import noted from '../../public/noted-dark.svg';
import Layout from '../Layout/Layout';

const Logo = () => {
  return (
    <Layout className="ml-8 mt-10 inline-block items-center cursor-pointer hover:animate-bounce">
      <Image priority src={noted} alt="Noted" width={30} height={30} />
      <p className="ml-5 text-slate-50 uppercase font-bold text-base hidden">
        <Link href="/">Noted</Link>
      </p>
    </Layout>
  );
};

export default Logo;
