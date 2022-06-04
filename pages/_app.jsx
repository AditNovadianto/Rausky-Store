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
    payFinish: {
      order: {},
      data: {},
    },
  },
  {
    name: 'state',
    persist: 'none',
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
      <Component {...pageProps} />
      {router.route != '/cart' && <ContinuePayBtn />}
    </>
  )
}
