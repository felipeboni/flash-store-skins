import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <title>Flash Store Skins</title>
        <link rel="manifest" href="/manifest.json"></link>
        <meta name="description" content="Flash Store Skins" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@100;200;300;400;500;600;700;800&family=Syne:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-top bg-cover bg-no-repeat bg-[url('/backgrounds/main.png')]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
