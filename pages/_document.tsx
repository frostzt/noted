import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html className="h-full" lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body className="bg-zinc-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
