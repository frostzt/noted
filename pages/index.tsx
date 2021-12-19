import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";

import noted from "../public/noted-dark.svg";

const Home: NextPage = () => {
  return (
    <div className="p-5">
      <Head>
        <title>Noted</title>
        <meta
          name="description"
          content="Note taking made easy and beautiful"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="inline-block">
        <div className="ml-3 mt-5 flex items-center cursor-pointer hover:animate-bounce">
          <Image src={noted} alt="Noted" width={30} height={30} />
          <p className="ml-5 text-slate-50 uppercase font-bold text-base hidden">
            <Link href="/">Noted</Link>
          </p>
        </div>
        <div className="absolute top-1/3 left-2/4 -translate-y-1/2 -translate-x-2/4">
          <h1 className="text-slate-50 text-6xl font-bold text-center">
            Noted
          </h1>
          <p className="text-slate-50 text-center">
            Yet another <span className="line-through">breathtaking</span>{" "}
            notetaking web-application
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
