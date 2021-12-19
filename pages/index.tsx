import Head from 'next/head';
import Link from 'next/link';
import Emoji from 'a11y-react-emoji';
import type { NextPage } from 'next';

import Button from '../Components/Button/Button';
import Layout from '../Components/Layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout className="p-8">
      <Head>
        <title>Noted - Yet another note-taking application</title>
        <meta name="description" content="Note taking made easy and beautiful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="mt-40 flex flex-col items-center">
          <h1 className="text-slate-50 text-6xl font-bold text-center">Noted</h1>
          <p className="text-slate-50 text-center mt-2">
            <Emoji symbol="📝" label="Memo" /> Yet another <span className="line-through">breathtaking</span> notetaking
            web-application
          </p>
          <Link href="/auth/login" passHref>
            <div className="inline-block">
              <Button className="mt-4">
                <Emoji symbol="🎉" label="Party Popper" /> Get Started
              </Button>
            </div>
          </Link>
        </div>
      </header>
    </Layout>
  );
};

export default Home;
