import { useStateMachine } from 'little-state-machine'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import request from '../lib/request'

const usePayHandler = () => {
  const router = useRouter()
  const { state } = useStateMachine()
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
        user: !user ? order.user : null,
      })

      const newOrder = data.order
      const { paymentToken } = newOrder

      // pay with midtrans snap api
      window.snap.pay(paymentToken, {
        onPending: (result) => {
          const paidAt = new Date(result.transaction_time).toISOString()
          router.push({
            pathname: '/order',
            query: {
              isNewOrder: 'true',
              orderId: result.order_id,
              paymentMethod: result.payment_type,
              status: 'PAID',
              paidAt,
            },
          })
        },
        onError: (error) => {
          console.log(error)
          request.delete(`/orders/${newOrder.id}`)
        },
        onClose: () => {
          request.delete(`/orders/${newOrder.id}`)
        },
      })
    } catch (err) {
      toast.error('Failed. Check console for details', { id: toastId })
      console.log(err)
    } finally {
      toast.remove(toastId)
      setLaunching(false)
    }
  }

  return [payHandler, launching] as [
    ({ products, user }: { products: any; user: any }) => Promise<void>,
    boolean
  ]
}

export default usePayHandler
