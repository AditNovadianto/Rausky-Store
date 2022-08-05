import { useStateMachine } from 'little-state-machine'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import request from '../lib/request'

const usePayHandler = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { state, actions } = useStateMachine({
    clearOrder: (state) => {
      request.delete('/carts/me')
      return {
        ...state,
        cart: [],
        order: {
          ...state.order,
          categoryRequirements: [],
          missingRequirements: {},
          subtotal: 0,
          tax: 0,
          discount: 0,
          total: 0,
          promoCode: '',
        },
      }
    },
  })
  const { order } = state
  const [launching, setLaunching] = useState(false)

  useEffect(() => {
    if (document.getElementById('snap-midtrans-js') != undefined) return

    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY

    let scriptTag = document.createElement('script')
    scriptTag.src = midtransScriptUrl
    scriptTag.id = 'snap-midtrans-js'
    scriptTag.setAttribute('data-client-key', myMidtransClientKey)

    document.body.appendChild(scriptTag)
  }, [])

  const payHandler = async ({ products, user }) => {
    let toastId: string
    try {
      toastId = toast.loading('Launching Payment Gateway...')
      setLaunching(true)
      // create new order
      const { data } = await request.post('/orders', {
        products: products.map((product) => ({
          id: product.id,
          amount: product.amount,
        })),
        requirements: order.requirements,
        promoCode: order.promoCode,
        user: !user ? order.user : null,
      })

      const newOrder = data.order
      const { paymentToken } = newOrder

      // pay with midtrans snap api
      // @ts-ignore
      window.snap.pay(paymentToken, {
        onPending: async (result) => {
          toast.success('Success. Redirecting to order summary page...', {
            id: toastId,
          })
          const paidAt = new Date(result.transaction_time).toISOString()
          await request.put(`/orders/${result.order_id}`, {
            paymentMethod: result.payment_type,
            status: 'PAID',
            paidAt,
          })
          if (session && order.discount > 0) {
            // change discountCodes isUsed to true
            request.put(`/discountCodes/${order.promoCode}`)
          }
          actions.clearOrder()

          router.push({
            pathname: '/order',
            query: {
              orderId: result.order_id,
            },
          })
        },
        onError: (error) => {
          console.log(error)
          request.delete(`/orders/${newOrder.id}`)
        },
        onClose: () => {
          request.delete(`/orders/${newOrder.id}`)
          toast.remove(toastId)
        },
      })
    } catch (err) {
      let errMsg = ''
      if (err?.data?.message) {
        errMsg = err.data.message
      } else {
        errMsg = 'Please retry.'
      }
      toast.error(`Failed. ${errMsg}`, { id: toastId })
      console.log(err)
    } finally {
      setLaunching(false)
    }
  }

  return [payHandler, launching] as [
    ({ products, user }: { products: any; user: any }) => Promise<void>,
    boolean
  ]
}

export default usePayHandler
