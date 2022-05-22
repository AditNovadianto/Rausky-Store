import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import { createStore, StateMachineProvider } from 'little-state-machine'
import ContinuePayBtn from '../components/ContinuePayBtn'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRouter } from 'next/router'

// TODO: bikin global state buat nyimpen cart
createStore(
  {
    cart: [],
    order: {
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
    },
  },
  {
    name: 'state',
    persist: process.env.NODE_ENV === 'production' ? 'onAction' : 'none',
  }
)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      <StateMachineProvider>
        <NextNProgress color="#90EE90" options={{ showSpinner: false }} />
        <Component {...pageProps} />
        {router.route != '/cart' && <ContinuePayBtn />}
      </StateMachineProvider>
    </SessionProvider>
  )
}

export default MyApp
