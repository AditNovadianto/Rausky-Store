import { useStateMachine } from 'little-state-machine'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import {
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  CodeIcon,
  PrinterIcon,
  StarIcon,
  HomeIcon,
  ArrowLeftIcon,
} from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import ProductItem from '../components/ProductItem'
import Skeleton from 'react-loading-skeleton'
import request from '../lib/request'
import ReactStars from 'react-rating-stars-component'
import Confetti from 'react-confetti'
import toast from 'react-hot-toast'
import cn from 'classnames'
import { socialMedia } from '../lib/data'
import { Category, Order, Product, Rating } from '@prisma/client'
import { User } from '../types/next-auth'
import { GetServerSideProps } from 'next'

type FinishedOrder = Order & {
  products: (Product & {
    category: Category
  })[]
  user: User
  rating: Rating
}

const Order = () => {
  const [finishedOrder, setFinishedOrder] = useState({} as FinishedOrder)
  const [loading, setLoading] = useState(true)
  const [showOrderPreview, setShowOrderPreview] = useState(false)
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [star, setStar] = useState(0)
  const [sendingRating, setSendingRating] = useState(false)

  const { actions } = useStateMachine()

  useEffect(() => {
    const run = async () => {
      try {
        const { orderId } = router.query

        if (orderId) {
          const { data } = await request.get(`/orders/${orderId}`)
          const { order } = data
          setFinishedOrder(order)

          order.rating?.star && setStar(order.rating.star)
          order.rating?.comment && setComment(order.rating.comment)
        }
      } catch (err) {
        console.log(err)
        router.replace('/')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [actions, router.query])

  const sendRating = async () => {
    let toastId
    try {
      toastId = toast.loading('Sending rating')
      setSendingRating(true)
      const { data } = await request.post('/ratings', {
        star,
        comment,
        orderId: finishedOrder.id,
      })
      setFinishedOrder({ ...finishedOrder, rating: data.rating })
      toast.success(
        `Thank you for your feedback${
          finishedOrder.user ? `, ${finishedOrder.user.name}` : ''
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

  console.log(finishedOrder)
  const paidAt = new Date(finishedOrder.paidAt)
  const paidAtDay = paidAt.toDateString()
  const paidAtTime = paidAt.toLocaleTimeString()

  return (
    <Container noNavbar noTopMargin>
      {loading ? (
        <LoadingSkeletons />
      ) : (
        <>
          <header className="print:hidden z-50 sticky mb-5 top-0 py-4 bg-white/70 backdrop-blur-sm shadow-sm">
            <Wrapper>
              <div className="max-w-3xl mx-auto">
                <button
                  onClick={() => {
                    if (router.query.back === 'true') {
                      router.back()
                    } else {
                      router.push('/')
                    }
                  }}
                  className="text-sm flex items-center hover:text-green-500"
                >
                  {router.query.back ? (
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  ) : (
                    <HomeIcon className="w-5 h-5 mr-2" />
                  )}
                  Back {!router.query.back ? 'to Home' : ''}
                </button>
              </div>
            </Wrapper>
          </header>
          <Wrapper>
            <Confetti recycle={false} style={{ zIndex: 100 }} />

            <div className="flex flex-col-reverse lg:flex-row">
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
                    {JSON.stringify(finishedOrder, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex-[1] max-w-3xl mx-auto print:max-w-none print:mx-0">
                <h3 className="font-semibold text-2xl flex items-center">
                  <span>
                    Thanks for your order
                    {finishedOrder.user?.name
                      ? `, ${finishedOrder.user.name}`
                      : ''}
                    ! ✅
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
                    Order ID: {finishedOrder.id}
                  </p>
                </div>

                {/* ORDER INFORMATION */}
                <div className="mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 print:flex-row print:space-y-0 print:space-x-4">
                  <div className="w-full font-medium text-sm p-2 border border-l-2 border-l-green-500 md:border-l md:border-l-gray-200 md:border-t-4 md:border-t-green-500 print:border-l print:border-l-gray-200 print:border-t-4 print:border-t-green-500 rounded-xl">
                    <h3 className="flex items-center">
                      Payment method <CreditCardIcon className="w-4 h-4 ml-1" />
                    </h3>
                    <p className="text-gray-500">
                      {finishedOrder.paymentMethod}
                    </p>
                  </div>
                  <div className="w-full font-medium text-sm p-2 border border-l-2 border-l-green-500 md:border-l md:border-l-gray-200 md:border-t-4 md:border-t-green-500 print:border-l print:border-l-gray-200 print:border-t-4 print:border-t-green-500 rounded-xl">
                    <h3 className="flex items-center">
                      Status <CheckCircleIcon className="w-4 h-4 ml-1" />
                    </h3>
                    <p className="text-gray-500">{finishedOrder.status}</p>
                  </div>
                  <div className="w-full font-medium text-sm p-2 border border-l-2 border-l-green-500 md:border-l md:border-l-gray-200 md:border-t-4 md:border-t-green-500 print:border-l print:border-l-gray-200 print:border-t-4 print:border-t-green-500 rounded-xl">
                    <h3 className="flex items-center">
                      Paid At <ClockIcon className="w-4 h-4 ml-1" />
                    </h3>
                    <p className="text-gray-500">
                      {paidAtDay} at {paidAtTime}
                    </p>
                  </div>
                </div>

                {/* ORDER RATING */}
                <div className="mt-10 print:hidden">
                  <h3 className="font-semibold text-xl">Rating</h3>
                  {finishedOrder.rating && (
                    <div className="mt-3 p-2 rounded-xl border border-green-300 bg-green-100">
                      Thank you
                      {finishedOrder.user && (
                        <>
                          , <b>{finishedOrder.user.name}</b>
                        </>
                      )}{' '}
                      😊. Your rating has been sent.
                    </div>
                  )}
                  <div
                    className={cn(
                      'mt-3 flex flex-col',
                      finishedOrder.rating && 'pointer-events-none'
                    )}
                  >
                    <div>
                      <ReactStars
                        count={5}
                        emptyIcon={
                          <StarIcon className="w-10 h-10 text-gray-300" />
                        }
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
                    {!finishedOrder.rating && (
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
                    {finishedOrder.products?.map((item) => (
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
                      <p>Rp {finishedOrder.tax?.toLocaleString()}</p>
                    </div>
                    <div className="mt-2 flex justify-between text-gray-500">
                      <p>Diskon</p>
                      <p>Rp {finishedOrder.discount?.toLocaleString()}</p>
                    </div>
                    <div className="flex mt-4 p-4 print:p-0 rounded-2xl justify-between text-xl font-semibold bg-green-500 text-white print:text-black print:shadow-none shadow-xl shadow-green-300">
                      <p className="">Total</p>
                      <p>Rp {finishedOrder.total?.toLocaleString()}</p>
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
                      {socialMedia.map((contact) => (
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
            </div>
          </Wrapper>
        </>
      )}
    </Container>
  )
}

export default Order

const LoadingSkeletons = () => (
  <Wrapper className="max-w-3xl mx-auto mt-3">
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { orderId } = query
  if (!orderId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
