import { useStateMachine } from 'little-state-machine'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import { isObjectEmpty } from '../lib/utils'
import {
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  CodeIcon,
  PrinterIcon,
  StarIcon,
} from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import ProductItem from '../components/ProductItem'
import Skeleton from 'react-loading-skeleton'
import request from '../lib/request'
import ReactStars from 'react-rating-stars-component'
import Confetti from 'react-confetti'
import toast from 'react-hot-toast'
import cn from 'classnames'

// TODO: update hrefnya
const contacts = [
  {
    id: 'ig',
    name: 'Instagram',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png',
    href: '#',
  },
  {
    id: 'wa',
    name: 'WhatsApp',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png',
    href: '#',
  },
  {
    id: 'line',
    name: 'LINE',
    img: 'http://assets.stickpng.com/images/580b57fcd9996e24bc43c523.png',
    href: '#',
  },
]

// TODO: tambahin animasi confetti
const PayFinish = () => {
  const { state, actions } = useStateMachine({
    setOrderFinish: (state, payload) => {
      return {
        ...state,
        orderFinish: payload,
      }
    },
  })
  const [loading, setLoading] = useState(true)
  const [showOrderPreview, setShowOrderPreview] = useState(false)
  const { orderFinish } = state
  const router = useRouter()

  const [comment, setComment] = useState('')
  const [star, setStar] = useState(0)
  const [sendingRating, setSendingRating] = useState(false)

  useEffect(() => {
    const checkOrder = async () => {
      if (isObjectEmpty(orderFinish)) {
        const orderId = new URLSearchParams(window.location.search).get(
          'orderId'
        )
        if (!orderId) {
          router.replace('/')
          return
        }

        try {
          const { data } = await request.get(`/orders/${orderId}`)
          const { order } = data
          actions.setOrderFinish(order)
          setStar(order.rating.star)
          setComment(order.rating.comment)
        } catch (err) {
          router.replace('/')
          return
        }
      }
      setLoading(false)
    }
    checkOrder()
    return () => {
      actions.setOrderFinish({})
    }
  }, [])

  console.log(orderFinish)

  const sendRating = async () => {
    let toastId
    try {
      toastId = toast.loading('Sending rating')
      setSendingRating(true)
      const { data } = await request.post('/ratings', {
        star,
        comment,
        orderId: orderFinish.id,
      })
      console.log(data.rating)
      actions.setOrderFinish({ ...orderFinish, rating: data.rating })
      toast.success(
        `Thank you for your feedback${
          orderFinish.user ? `, ${orderFinish.user.name}` : ''
        }`,
        { id: toastId }
      )
    } catch (err) {
      console.log(err)
      toast.error('Opps... Something error', { id: toastId })
    } finally {
      setSendingRating(false)
    }
  }

  return (
    <Container>
      {loading ? (
        <LoadingSkeletons />
      ) : (
        <Wrapper className="flex flex-col-reverse lg:flex-row">
          <Confetti recycle={false} style={{ zIndex: 100 }} />
          {/* ORDER PREVIEW */}
          {showOrderPreview && (
            <div className="print:hidden flex-[1] overflow-hidden mt-10 lg:mt-0 lg:mr-10 lg:sticky lg:top-[80px] lg:self-start">
              <h2 className="font-semibold text-xl flex items-center">
                <CodeIcon className="w-6 h-6 mr-2" /> Order Preview
                <button
                  className="ml-2 text-sm bg-gray-900 hover:bg-gray-500 text-white px-2 py-1 rounded-lg"
                  onClick={() => setShowOrderPreview(false)}
                >
                  Hide
                </button>
              </h2>
              <pre className="mt-2 overflow-auto max-h-[70vh] bg-gray-800 text-green-500 rounded-2xl p-5">
                {JSON.stringify(orderFinish, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex-[1] max-w-2xl mx-auto print:max-w-none print:mx-0">
            <h3 className="font-semibold text-2xl flex items-center">
              <span>
                Thanks for your order
                {orderFinish.user?.name ? `, ${orderFinish.user.name}` : ''}! ✅
              </span>
              {!showOrderPreview && (
                <button
                  className="print:hidden hidden md:block ml-auto hover:text-gray-500"
                  onClick={() => setShowOrderPreview(true)}
                >
                  <CodeIcon className="w-6 h-6 mr-2" />
                </button>
              )}
            </h3>

            <div className="mt-5">
              <p className="text-xl font-medium">
                Your order has been processed
              </p>
              <p className="text-sm text-gray-400">
                Order ID: {orderFinish.id}
              </p>
            </div>

            {/* ORDER INFORMATION */}
            <div className="mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 print:flex-row print:space-y-0 print:space-x-4">
              <div className="w-full font-medium text-sm p-2 border border-l-2 border-l-green-500 md:border-l md:border-l-gray-200 md:border-t-4 md:border-t-green-500 print:border-l print:border-l-gray-200 print:border-t-4 print:border-t-green-500 rounded-xl">
                <h3 className="flex items-center">
                  Payment method <CreditCardIcon className="w-4 h-4 ml-1" />
                </h3>
                <p className="text-gray-500">{orderFinish.paymentMethod}</p>
              </div>
              <div className="w-full font-medium text-sm p-2 border border-l-2 border-l-green-500 md:border-l md:border-l-gray-200 md:border-t-4 md:border-t-green-500 print:border-l print:border-l-gray-200 print:border-t-4 print:border-t-green-500 rounded-xl">
                <h3 className="flex items-center">
                  Status <CheckCircleIcon className="w-4 h-4 ml-1" />
                </h3>
                <p className="text-gray-500">{orderFinish.status}</p>
              </div>
              <div className="w-full font-medium text-sm p-2 border border-l-2 border-l-green-500 md:border-l md:border-l-gray-200 md:border-t-4 md:border-t-green-500 print:border-l print:border-l-gray-200 print:border-t-4 print:border-t-green-500 rounded-xl">
                <h3 className="flex items-center">
                  Paid At <ClockIcon className="w-4 h-4 ml-1" />
                </h3>
                <p className="text-gray-500">
                  {new Date(orderFinish.paidAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* ORDER RATING */}
            <div className="mt-10 print:hidden">
              <h3 className="font-semibold text-xl">Rating</h3>
              {orderFinish.rating && (
                <div className="mt-3 p-2 rounded-xl border border-green-300 bg-green-100">
                  Thank you
                  {orderFinish.user && (
                    <>
                      , <b>{orderFinish.user.name}</b>
                    </>
                  )}{' '}
                  😊. Your rating has been sent.
                </div>
              )}
              <div
                className={cn(
                  'mt-3 flex flex-col',
                  orderFinish.rating && 'pointer-events-none'
                )}
              >
                <div>
                  <ReactStars
                    count={5}
                    emptyIcon={<StarIcon className="w-10 h-10 text-gray-300" />}
                    filledIcon={
                      <StarIconSolid className="w-10 h-10 text-yellow-500" />
                    }
                    onChange={(star) => setStar(star)}
                    value={star}
                  />
                </div>
                <textarea
                  disabled={star == 0 || sendingRating}
                  className="mt-3 px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:border-green-400"
                  placeholder="How was the experience while using Rausky?"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  cols={30}
                  rows={3}
                ></textarea>
                {!orderFinish.rating && (
                  <button
                    disabled={star == 0 || sendingRating}
                    onClick={sendRating}
                    className="bg-green-500 disabled:bg-gray-400/60 text-white w-full py-3 rounded-b-md font-semibold hover:bg-green-400"
                  >
                    {star == 0 ? (
                      'Please select star'
                    ) : (
                      <>
                        Send Rating ({star} Star{star > 1 && 's'})
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* PRODUCT LIST */}
            <div className="mt-10">
              <h3 className="font-semibold text-xl">Products</h3>
              <div className="mt-8 space-y-8">
                {orderFinish.products?.map((item) => (
                  <ProductItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              {/* ORDER SUMMARY */}
              <div className="flex-[2] p-4 pb-8 print:pb-4 border rounded-2xl">
                <h3 className="font-semibold text-xl">Summary</h3>
                <div className="mt-2 flex justify-between text-gray-500">
                  <p>Pajak</p>
                  <p>Rp {orderFinish.tax?.toLocaleString()}</p>
                </div>
                <div className="mt-2 flex justify-between text-gray-500">
                  <p>Diskon</p>
                  <p>Rp {orderFinish.discount?.toLocaleString()}</p>
                </div>
                <div className="flex mt-4 p-4 print:p-0 rounded-2xl justify-between text-xl font-semibold bg-green-500 text-white print:text-black print:shadow-none shadow-xl shadow-green-300">
                  <p className="">Total</p>
                  <p>Rp {orderFinish.total?.toLocaleString()}</p>
                </div>
              </div>
              {/* CONTACT */}
              <div className="print:hidden flex-[1] p-4 border rounded-2xl text-gray-500">
                <p>
                  <span className="font-semibold text-black">
                    Punya pertanyaan ?
                  </span>{' '}
                  <br /> kontak kami melalui:
                </p>
                <div className="flex flex-col mt-4 space-y-1">
                  {contacts.map((contact) => (
                    <a
                      key={contact.id}
                      href={contact.href}
                      className="flex items-center"
                    >
                      <img
                        src={contact.img}
                        alt={contact.id}
                        className="w-4 h-4 mr-2"
                      />
                      {contact.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* PRINT BUTTON */}
            <button
              onClick={print}
              className="print:hidden mt-8 w-full flex items-center justify-center py-3 rounded-2xl border border-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              <PrinterIcon className="w-5 h-5 mr-2" /> Print
            </button>

            {!showOrderPreview && (
              <button
                className="print:hidden w-full flex md:hidden mt-5 hover:text-gray-500"
                onClick={() => setShowOrderPreview(true)}
              >
                <CodeIcon className="w-6 h-6 ml-auto" />
              </button>
            )}
          </div>
        </Wrapper>
      )}
    </Container>
  )
}

export default PayFinish

const LoadingSkeletons = () => (
  <Wrapper className="max-w-2xl mx-auto">
    <div className="w-full">
      <Skeleton height={30} width="80%" />
      <div className="my-5">
        <Skeleton height={30} />
      </div>
      <div className="mt-8">
        <Skeleton width="50%" height={80} />
        <Skeleton width="50%" height={80} className="mt-8" />
        <Skeleton width="100%" height={100} className="mt-8" />
      </div>
    </div>
  </Wrapper>
)
