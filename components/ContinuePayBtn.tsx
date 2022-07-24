import { AnimatePresence, motion } from 'framer-motion'
import { useStateMachine } from 'little-state-machine'
import Link from './Link'
import Wrapper from './Wrapper'

const ContinuePayBtn = () => {
  const { state } = useStateMachine()
  const { cart, order } = state

  const totalItemsInCart = cart.length

  return (
    <AnimatePresence>
      {totalItemsInCart > 0 && (
        <>
          <div className="pt-20"></div>
          <motion.div
            className="fixed bottom-0 left-0 w-full pb-8 bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent pointer-events-none"
            initial={{
              y: '100%',
              opacity: 0,
            }}
            animate={{
              y: '0%',
              opacity: 1,
            }}
            exit={{
              y: '100%',
              opacity: 0,
            }}
          >
            <Wrapper className="max-w-md">
              <Link
                href="/cart"
                className="block w-full -mt-4 py-4 text-center bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl shadow-xl shadow-green-300/50 dark:shadow-green-300/10 pointer-events-auto"
              >
                Continue to payment (Rp {order.subtotal.toLocaleString()})
              </Link>
            </Wrapper>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ContinuePayBtn
