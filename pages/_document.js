import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
