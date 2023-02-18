import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Get all you life questions answered in seconds"
          />
          <meta property="og:site_name" content="krishna-ai.vercel.app" />
          <meta
            property="og:description"
            content="Get all you life questions answered in seconds"
          />
          <meta property="og:title" content="Krishna Ai" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Krishna Ai" />
          <meta
            name="twitter:description"
            content="Get all you life questions answered in seconds"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
