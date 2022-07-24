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
import { SkeletonTheme } from 'react-loading-skeleton'

createStore(
  {
    globalTheme: 'device',
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
  const { state, actions } = useStateMachine({
    setRequirements,
    setCart,
    setGlobalTheme: (state, payload) => ({ ...state, globalTheme: payload }),
  })
  const { globalTheme } = state

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

    const getUserData = async () => {
      await setMyRequirements()
      await setMyCart()
    }
    getUserData()

    const html = document.documentElement
    actions.setGlobalTheme(html.classList.contains('dark') ? 'dark' : 'light')
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
            <SkeletonTheme
              baseColor={
                globalTheme === 'dark' ? 'rgb(31 41 55)' : 'rgb(229 231 235)'
              }
              highlightColor={
                globalTheme === 'dark' ? 'rgb(55 65 81)' : 'rgb(243 244 246)'
              }
            >
              <Component {...pageProps} />
            </SkeletonTheme>
          </motion.div>
        </div>
      </AnimatePresence>

      {!['/cart', '/signin', '/order'].includes(router.route) && (
        <ContinuePayBtn />
      )}
      <Toaster
        toastOptions={{
          className: 'dark:bg-gray-700 dark:text-gray-100',
        }}
      />
    </>
  )
}
