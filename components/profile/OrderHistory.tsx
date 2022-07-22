import { CheckCircleIcon, ClockIcon } from '@heroicons/react/outline'
import Skeleton from 'react-loading-skeleton'
import Link from '../Link'
import ProductItem from '../ProductItem'
import { StarIcon } from '@heroicons/react/solid'
import useGetRequest from '../../hooks/useGetRequest'
import usePayHandler from '../../hooks/usePayHandler'

const OrderHistory = () => {
  const { data, loading } = useGetRequest('/orders/me')
  const [reorderHandler, launching] = usePayHandler()

  if (loading)
    return (
      <Skeleton
        count={3}
        height={100}
        borderRadius={12}
        containerClassName="space-y-5"
      />
    )

  const { orders } = data

  console.log(orders)

  return (
    <div className="space-y-5">
      {orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div
              className="block rounded-xl shadow-lg overflow-hidden"
              key={order.id}
            >
              {/* HEADER */}
              <div className="px-5 py-3 border-b flex items-center justify-between">
                <p className="text-sm text-gray-500 font-medium flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {new Date(order.paidAt).toDateString()} at{' '}
                  {new Date(order.paidAt).toLocaleTimeString()}
                </p>
                <span className="text-xs bg-green-100 text-green-500 px-2 py-1 rounded-lg font-semibold flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  {order.status}
                </span>
              </div>
              {/* BODY */}
              <Link href={`/order?orderId=${order.id}&back=true`}>
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
                <div className="px-5 py-3 flex justify-between items-center">
                  <div className="text-sm text-gray-500 flex">
                    <p className="mr-2">Total</p>
                    <h3 className="font-semibold text-green-500">
                      Rp {order.total.toLocaleString()}
                    </h3>
                  </div>
                  {order.rating && (
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-500" />{' '}
                      <span className="font-semibold">{order.rating.star}</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* REORDER BTN */}
              <button
                onClick={() =>
                  reorderHandler({ products: order.products, user: order.user })
                }
                disabled={launching}
                className="w-full bg-green-500 hover:bg-green-400 transition-colors text-white font-semibold py-2"
              >
                Reorder
              </button>
            </div>
          )
        })
      ) : (
        <div className="text-center mt-20">
          <img
            className="mx-auto w-[100px] h-[100px]"
            src="/images/empty-order.svg"
            alt="empty order"
          />
          <h3 className="font-bold text-xl">You have no orders yet.</h3>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
