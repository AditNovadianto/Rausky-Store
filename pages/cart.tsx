import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import {
  CheckIcon,
  CloudUploadIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline'
import { useStateMachine } from 'little-state-machine'
import Link from '../components/Link'
import {
  addToCart,
  removeFromCart,
  decrementAmount,
  setOrderPromoCode,
} from '../lib/cartHandler'
import RequirementField from '../components/RequirementField'
import { signIn, useSession } from 'next-auth/react'
import Skeleton from 'react-loading-skeleton'
import ProductItem from '../components/ProductItem'
import { GetServerSideProps } from 'next'
import usePayHandler from '../hooks/usePayHandler'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import request from '../lib/request'
import useIsMounted from '../hooks/useIsMounted'

const Cart = () => {
  const { data: session, status } = useSession()
  const user = session?.user
  const isLoggedIn = status != 'loading' && user
  const [promoCode, setPromoCode] = useState('')
  const [promoCodeApplied, setPromoCodeApplied] = useState(false)
  const { state, actions } = useStateMachine({
    addToCart,
    removeFromCart,
    decrementAmount,
    setUser: (state, payload: { fieldName: string; fieldValue: string }) => {
      const newUser = { ...state.order.user }
      newUser[payload.fieldName] = payload.fieldValue
      return {
        ...state,
        order: {
          ...state.order,
          user: newUser,
        },
      }
    },
    setOrderPromoCode,
  })
  const { cart, order, updatedDB, updatingDB } = state

  const [payHandler, launching] = usePayHandler()
  const isMounted = useIsMounted()

  useEffect(() => {
    if (order.promoCode) {
      setPromoCode(order.promoCode)
      setPromoCodeApplied(true)
    }
  }, [order])

  const isFieldError = ({ requirement, field }) => {
    return order.missingRequirements[requirement.categorySlug]?.[field.value]
  }
  const isAnyError = Object.values(order.missingRequirements).some((errors) => {
    return Object.keys(errors).length > 0
  })
  const totalItemsInCart = cart.length

  const promoCodeHandler = async () => {
    if (!promoCode) return
    let toastId: string
    try {
      toastId = toast.loading(`Checking validity of ${promoCode}`)
      const { data } = await request.get(`/discountCodes/${promoCode}`)
      toast.success(data.message, { id: toastId })
      console.log({ data })
      actions.setOrderPromoCode(data.promoCode)
      setPromoCodeApplied(true)
    } catch (err) {
      console.log(err)
      toast.error(err.data.message, { id: toastId })
    }
  }

  return (
    <Container title={`My Cart (${totalItemsInCart})`}>
      {isMounted && totalItemsInCart == 0 ? (
        <Wrapper className="flex flex-col text-center justify-center items-center space-y-10">
          <div>
            <img
              className="w-[300px] h-[300px] mx-auto"
              src="/images/illustration/empty-cart.svg"
              alt="empty cart"
            />
            <h2 className="font-bold text-3xl mt-1">Your cart is empty.</h2>
            <Link
              href="/"
              className="block mt-8 text-green-500 text-lg hover:underline font-medium"
            >
              Back to home &rarr;
            </Link>
          </div>
          {/* TODO: tampilin rekomendasi produk */}
        </Wrapper>
      ) : (
        <Wrapper className="flex flex-col lg:flex-row justify-between lg:space-x-20">
          <div className="lg:flex-grow">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Cart</h2>
              <Link
                href="/"
                className="text-green-500 hover:underline font-medium"
              >
                Browse more
              </Link>
            </div>

            {/* PRODUCT LIST */}
            <div className="space-y-8 mt-8">
              {cart.map((item) => (
                <ProductItem key={item.id} item={item} actions={actions} />
              ))}
            </div>
          </div>

          {/* ORDER INFO */}
          <div className="lg:flex-grow mt-8 lg:mt-0 lg:max-w-sm lg:sticky lg:top-[80px] lg:self-start border dark:border-gray-700 rounded-2xl dark:bg-gray-800 divide-y dark:divide-gray-700">
            <h2 className="text-2xl font-bold p-6 flex items-center justify-between">
              Order Info
              {updatingDB && (
                <div className="flex text-xs items-center font-normal text-green-500">
                  <CloudUploadIcon className="w-4 h-4 mr-1" /> saving
                </div>
              )}
              {updatedDB && (
                <div className="flex text-xs items-center font-normal text-green-500">
                  <CheckIcon className="w-4 h-4 mr-1" /> saved
                </div>
              )}
            </h2>
            <div className="divide-y dark:divide-gray-700 lg:max-h-[65vh] lg:overflow-y-auto">
              {/* REQUIREMENTS */}
              {order.categoryRequirements.length > 0 && (
                <div className="p-6">
                  <h3 className="font-bold text-xl">Requirements</h3>
                  <div className="mt-5 space-y-10">
                    {order.categoryRequirements.map((requirement) => (
                      <div key={requirement.id}>
                        <div className="flex items-center">
                          <img
                            src={requirement.categoryLogo}
                            alt={requirement.categorySlug}
                            className="w-5 h-5 rounded-md mr-2"
                          />
                          <h3 className="font-semibold">
                            {requirement.categoryName}
                          </h3>
                        </div>
                        <div className="space-y-3 mt-4">
                          {requirement.fields.map((field) => {
                            const errorMessage = isFieldError({
                              requirement,
                              field,
                            })

                            return status != 'loading' ? (
                              <div key={field.id}>
                                <RequirementField
                                  field={field}
                                  categorySlug={requirement.categorySlug}
                                  user={isLoggedIn ? user : null}
                                  error={errorMessage}
                                />
                              </div>
                            ) : (
                              <Skeleton
                                key={field.id}
                                height={50}
                                borderRadius={12}
                              />
                            )
                          })}
                        </div>
                        {(requirement.img || requirement.description) && (
                          <details className="mt-4 text-gray-500 dark:text-gray-400">
                            <summary className="cursor-pointer">
                              Details
                            </summary>
                            <div className="mt-4">
                              {requirement.img && (
                                <img
                                  className="rounded-xl lg:hover:scale-[1.5] hover:scale-[1.2] lg:hover:-translate-x-[35%] transition-all"
                                  src={requirement.img}
                                  alt={requirement.title}
                                />
                              )}

                              {requirement.description && (
                                <p className="mt-3 pb-2">
                                  {requirement.description}
                                </p>
                              )}
                            </div>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* USER NAME AND EMAIL */}
              {!user && (
                <div className="p-6">
                  <h3 className="font-bold text-xl">
                    Personal data (opsional)
                  </h3>
                  <div className="text-gray-500 text-sm mt-1">
                    <button
                      onClick={() => signIn()}
                      className="text-green-500 hover:underline"
                    >
                      Sign In
                    </button>{' '}
                    atau lengkapi data di bawah
                    <br /> untuk mendapat bukti pembayaran melalui email
                    <br />{' '}
                    <span className="text-yellow-500">
                      *untuk saat ini gak beneran masuk ke email
                    </span>
                  </div>
                  <div className="mt-5 space-y-4">
                    <input
                      type="text"
                      className="input"
                      placeholder="Masukkan nama"
                      onChange={(e) =>
                        actions.setUser({
                          fieldName: 'name',
                          fieldValue: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      className="input"
                      placeholder="Masukkan email"
                      onChange={(e) =>
                        actions.setUser({
                          fieldName: 'email',
                          fieldValue: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* ORDER SUMMARY */}
              <div className="p-6">
                <div className="space-y-2">
                  {user ? (
                    <div className="flex space-x-4 text-sm">
                      <input
                        type="text"
                        className="input"
                        placeholder="Promo Code"
                        disabled={promoCodeApplied}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button
                        disabled={!promoCode || promoCodeApplied}
                        onClick={promoCodeHandler}
                        className="bg-green-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-4 rounded-lg font-semibold hover:bg-green-400"
                      >
                        {promoCodeApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">
                      <button
                        onClick={() => signIn()}
                        className="text-green-500 hover:underline"
                      >
                        Sign In
                      </button>{' '}
                      to use Promo Code
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <p>Subtotal</p>
                    <p>Rp {order.subtotal.toLocaleString()}</p>
                  </div>
                  {order.tax > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <p>Pajak</p>
                      <p>Rp {order.tax.toLocaleString()}</p>
                    </div>
                  )}
                  {order.discount > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <p>Discount</p>
                      <p>{order.discount.toLocaleString()}%</p>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-semibold">
                    <p className="">Total</p>
                    <p>Rp {order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="my-8">
                  {isAnyError && (
                    <p className="mt-2 text-red-500 mb-3 font-medium flex items-center justify-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-2" /> Please
                      fill all the requirements
                    </p>
                  )}
                  <button
                    onClick={() => payHandler({ products: cart, user })}
                    disabled={isAnyError || launching}
                    className="w-full py-4 bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl shadow-xl shadow-green-300 disabled:bg-gray-400/40 disabled:shadow-gray-200 dark:disabled:shadow-none dark:shadow-green-300/20"
                  >
                    Pay (Rp {order.total.toLocaleString()})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      )}
    </Container>
  )
}

export default Cart

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { order_id } = query
  if (order_id) {
    return {
      redirect: {
        destination: `/order?orderId=${order_id}`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
