import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import {
  CheckIcon,
  CloudUploadIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { useEffect } from 'react'
import { useStateMachine } from 'little-state-machine'
import Link from '../components/Link'
import { addToCart, removeFromCart, decrementAmount } from '../lib/cartHandler'
import request from '../lib/request'
import RequirementField from '../components/RequirementField'
import { useSession } from 'next-auth/react'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/router'

const Cart = () => {
  const { data: session, status } = useSession()
  const user = session?.user
  const isLoggedIn = status != 'loading' && user
  const { state, actions } = useStateMachine({
    addToCart,
    removeFromCart,
    decrementAmount,
    setPayFinishData: (state, payload) => {
      return {
        ...state,
        payFinish: {
          order: payload.order,
          data: payload.data,
        },
      }
    },
    clearOrder: (state) => {
      return {
        ...state,
        cart: [],
        order: {
          requirements: {},
          categoryRequirements: [],
          missingRequirements: {},
          subtotal: 0,
          tax: 0,
          discount: 0,
          total: 0,
        },
      }
    },
  })
  const { cart, order, updatedDB, updatingDB } = state
  const router = useRouter()

  //   console.log(cart)

  useEffect(() => {
    let scriptTag = document.createElement('script')
    scriptTag.type = 'text/javascript'
    scriptTag.src = 'https://app.sandbox.midtrans.com/snap/snap.js'

    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    scriptTag.setAttribute('data-client-key', myMidtransClientKey)

    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  //   TODO: bikin order ke backend, terus set payment token dari backend
  const checkout = async () => {
    try {
      const { data } = await request.post('/orders', {
        products: cart.map((product) => ({
          id: product.id,
          amount: product.amount,
        })),
        requirements: order.requirements,
      })

      //   @ts-ignore
      window.snap.pay(data.order.paymentToken, {
        onSuccess: (result) => {
          actions.setPayFinishData({ order: data.order, data: result })
          actions.clearOrder()
          router.push('/pay-finish')
        },
        onPending: (result) => {
          actions.setPayFinishData({ order: data.order, data: result })
          actions.clearOrder()
          router.push('/pay-finish')
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const isFieldError = ({ requirement, field }) => {
    return order.missingRequirements[requirement.categorySlug]?.[field.value]
  }
  const isAnyError = Object.values(order.missingRequirements).some((errors) => {
    return Object.keys(errors).length > 0
  })
  const totalItemsInCart = cart.length

  return (
    <Container title={`My Cart (${totalItemsInCart})`}>
      {totalItemsInCart == 0 ? (
        <Wrapper className="flex flex-col text-center justify-center items-center space-y-10">
          <div>
            <img
              className="w-[300px] h-[300px] mx-auto"
              src="/images/empty-cart.svg"
              alt="empty cart"
            />
            <h2 className="font-bold text-3xl mt-1">
              Keranjang kosong ni gan...
            </h2>
            <Link
              href="/"
              className="block mt-8 text-green-500 text-lg hover:underline font-medium"
            >
              Balik ke halaman utama &rarr;
            </Link>
          </div>
          {/* TODO: tampilin rekomendasi produk */}
          {/* <div>
            <h2 className="text-2xl font-bold mb-4">Rekomendasi Produk</h2>
          </div> */}
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
            <div className="space-y-8 mt-8">
              {cart.map((item) => (
                <div key={item.id} className="flex">
                  <img
                    className="w-[80px] h-[80px] object-cover rounded-2xl"
                    src={item.img ?? item.category.logoImg}
                    alt={item.title}
                  />
                  <div className="ml-4 flex-grow">
                    <p className="text-sm text-green-500">
                      {item.category.name}
                    </p>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-500 font-semibold">
                      Rp {item.price.toLocaleString()}
                    </p>

                    <div className="flex justify-between lg:justify-start items-center mt-4">
                      {/* SET QUANTITY */}
                      <div className="flex items-center text-gray-500">
                        <button
                          onClick={() =>
                            actions.decrementAmount({ product: item })
                          }
                          className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100"
                        >
                          {' '}
                          -{' '}
                        </button>
                        <div className="px-5">{item.amount}</div>
                        <button
                          onClick={() => actions.addToCart({ product: item })}
                          className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100"
                        >
                          {' '}
                          +{' '}
                        </button>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => actions.removeFromCart(item)}
                        className="p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl lg:ml-5"
                      >
                        <TrashIcon className="w-5 h-5 text-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ORDER INFO */}
          <div className="lg:flex-grow mt-8 lg:mt-0 lg:max-w-sm lg:sticky lg:top-[80px] lg:self-start border rounded-2xl divide-y">
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

            {/* REQUIREMENTS */}
            {order.categoryRequirements.length > 0 && (
              <div className="p-6 lg:max-h-[230px] lg:overflow-y-auto">
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
                        <details className="mt-4">
                          <summary className="cursor-pointer text-gray-500">
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
                              <p className="mt-3 pb-2 text-gray-500">
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

            <div className="p-6">
              <div className="space-y-2">
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
                    <p>Diskon</p>
                    <p>Rp {order.discount.toLocaleString()}</p>
                  </div>
                )}
                <div className="flex justify-between text-xl font-semibold">
                  <p className="">Total</p>
                  <p>Rp {order.total.toLocaleString()}</p>
                </div>
              </div>

              {/* TODO: handle missing requirements */}
              <div className="my-8">
                {isAnyError && (
                  <p className="mt-2 text-red-500 mb-3 font-medium flex items-center justify-center">
                    <ExclamationCircleIcon className="w-4 h-4 mr-2" /> Please
                    fill all the requirements
                  </p>
                )}
                <button
                  onClick={checkout}
                  disabled={isAnyError}
                  className="w-full py-4 bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl shadow-xl shadow-green-300 disabled:bg-gray-400/40 disabled:shadow-gray-200"
                >
                  Pay (Rp {order.total.toLocaleString()})
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      )}
    </Container>
  )
}

export default Cart
