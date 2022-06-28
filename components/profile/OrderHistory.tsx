import { CheckCircleIcon, ClockIcon } from '@heroicons/react/outline'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'
import request from '../../lib/request'
import {
  attachMidtransScript,
  removeMidtransScript,
  checkout,
  handleSuccessPayment,
  handleUnfinishPayment,
} from '../../lib/payment'
import Link from '../Link'
import ProductItem from '../ProductItem'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const fetcher = (url: string) => request.get(url)

const OrderHistory = () => {
  const { data, error } = useSWR('/orders/me', fetcher)
  const router = useRouter()

  const loading = !data && !error

  useEffect(() => {
    attachMidtransScript()
    return () => removeMidtransScript()
  })

  // this useEffect use to fix weird bug after payment finish
  // where users are not redirected to /order
  useEffect(() => {
    const { order_id } = router.query
    if (order_id) {
      router.push({
        pathname: '/order',
        query: {
          orderId: order_id,
        },
      })
    }
  }, [router])

  if (loading)
    return (
      <Skeleton
        count={3}
        height={100}
        borderRadius={12}
        containerClassName="space-y-5"
      />
    )

  const { orders } = data.data

  console.log(orders)

  const reorder = async (order) => {
    const newOrder = await checkout({
      products: order.products,
      order,
      user: order.user,
    })

    // @ts-ignore
    window.snap.pay(newOrder.paymentToken, {
      onPending: (result) => {
        handleSuccessPayment({ result })
      },
      onClose: () => {
        handleUnfinishPayment({ orderId: newOrder.id })
      },
    })
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => {
        return (
          <div
            className="block rounded-xl shadow-lg overflow-hidden"
            key={order.id}
          >
            {/* HEADER */}
            <div className="px-5 py-3 border-b flex items-center justify-between">
              <p className="text-sm text-gray-500 font-medium flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                {new Date(order.paidAt).toDateString()}
              </p>
              <span className="text-xs bg-green-100 text-green-500 px-2 py-1 rounded-lg font-semibold flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                {order.status}
              </span>
            </div>
            {/* BODY */}
            <Link href={'/order?orderId=' + order.id}>
              {/* PRODUCT */}
              <div className="px-5 py-3">
                <ProductItem item={order.products[0]} size="small" />
                {order.products.length > 1 && (
                  <p className="mt-2 text-sm text-gray-400">
                    + {order.products.length - 1} other products
                  </p>
                )}
              </div>
              {/* TOTAL */}
              <div className="px-5 py-3">
                <div className="text-sm text-gray-500 flex">
                  <p className="mr-2">Total</p>
                  <h3 className="font-semibold text-green-500">
                    Rp {order.total.toLocaleString()}
                  </h3>
                </div>
              </div>
            </Link>

            {/* REORDER BTN */}
            {/* TODO: bikin function reorder, nanti langsung ngebuka midtransnya */}
            <button
              onClick={() => reorder(order)}
              className="w-full bg-green-500 hover:bg-green-400 transition-colors text-white font-semibold py-2"
            >
              Reorder
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default OrderHistory
