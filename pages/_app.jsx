import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#90EE90" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
