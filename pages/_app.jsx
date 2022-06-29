import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import {
  createStore,
  StateMachineProvider,
  useStateMachine,
} from 'little-state-machine'
import ContinuePayBtn from '../components/ContinuePayBtn'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import request from '../lib/request'
import { setRequirements, setCart } from '../lib/cartHandler'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

createStore(
  {
    cart: [],
    order: {
      user: {},
      requirements: {},
      categoryRequirements: [],
      missingRequirements: {},
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
    },
    orderFinish: {},
  },
  {
    name: 'state',
  }
)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StateMachineProvider>
        <MyComponent Component={Component} pageProps={pageProps} />
      </StateMachineProvider>
    </SessionProvider>
  )
}

export default MyApp

const MyComponent = ({ Component, pageProps }) => {
  const router = useRouter()
  const { actions } = useStateMachine({
    setRequirements,
    setCart,
  })

  useEffect(() => {
    const setMyCart = async () => {
      try {
        const res = await request.get('/carts/me')
        actions.setCart(res.data.cart.products)
      } catch (err) {}
    }
    const setMyRequirements = async () => {
      try {
        const res = await request.get('/requirements')
        actions.setRequirements(res.data.requirements)
      } catch (err) {}
    }

    // TODO: simpen loading di global state
    const getUserData = async () => {
      await setMyRequirements()
      await setMyCart()
    }
    getUserData()
  }, [])

  return (
    <>
      <NextNProgress color="#90EE90" options={{ showSpinner: false }} />
      {/* TODO: make animation smoother */}
      <AnimatePresence exitBeforeEnter initial={false}>
        <div className="page-transition-wrapper">
          <motion.div
            key={router.pathname}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            id="page-transition-container"
          >
            <Component {...pageProps} />
          </motion.div>
        </div>
      </AnimatePresence>

      {!['/cart', '/signin'].includes(router.route) && <ContinuePayBtn />}
      <Toaster />
    </>
  )
}
