import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
        {/* TODO: add custom font here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
