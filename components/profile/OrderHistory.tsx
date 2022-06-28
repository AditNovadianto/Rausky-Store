import { CheckCircleIcon, ClockIcon } from '@heroicons/react/outline'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'
import request from '../../lib/request'
import Link from '../Link'
import ProductItem from '../ProductItem'

const fetcher = (url: string) => request.get(url)

const OrderHistory = () => {
  const { data, error } = useSWR('/orders/me', fetcher)

  const loading = !data && !error

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
  console.log({ orders, loading })

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
            <button className="w-full bg-green-500 hover:bg-green-400 transition-colors text-white font-semibold py-2">
              Reorder
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default OrderHistory
