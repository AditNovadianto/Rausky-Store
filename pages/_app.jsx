import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import { createStore, StateMachineProvider } from 'little-state-machine'

// TODO: bikin global state buat nyimpen cart
createStore(
  {},
  {
    name: 'state',
    persist: process.env.NODE_ENV === 'production' ? 'onAction' : 'none',
  }
)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StateMachineProvider>
        <NextNProgress color="#90EE90" options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </StateMachineProvider>
    </SessionProvider>
  )
}

export default MyApp
