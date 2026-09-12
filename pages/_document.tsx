import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head title="Kiel H. Byrne">
          <meta
            name="description"
            content="Personal Webpage for Kiel Hamilton Byrne"
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
