import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import { TrashIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { useStateMachine } from 'little-state-machine'
import Link from '../components/Link'
import { addToCart, removeFromCart, decrementAmount } from '../lib/cartHandler'

const Cart = () => {
  const { state, actions } = useStateMachine({
    addToCart,
    removeFromCart,
    decrementAmount,
  })
  const { cart, order } = state

  console.log(cart)

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
    window.snap.pay('7bdc35eb-74d4-4232-87ce-1fcb361e4b54', {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert('payment success!')
        console.log(result)
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert('wating your payment!')
        console.log(result)
      },
      onError: function (result) {
        /* You may add your own implementation here */
        // alert('payment failed!')
        console.log(result)
      },
      onClose: function () {
        /* You may add your own implementation here */
        // alert('you closed the popup without finishing the payment')
      },
    })
  }

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
                          onClick={() => actions.decrementAmount(item)}
                          className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100"
                        >
                          {' '}
                          -{' '}
                        </button>
                        <div className="px-5">{item.amount}</div>
                        <button
                          onClick={() => actions.addToCart(item)}
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
          <div className="lg:flex-grow mt-8 lg:mt-0 lg:max-w-sm lg:sticky lg:top-[80px] lg:self-start border p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">Order Info</h2>
            <div className="space-y-2 mt-6">
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
            <button
              onClick={checkout}
              className="w-full py-4 bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl my-8 shadow-xl shadow-green-300"
            >
              Checkout (Rp {order.total.toLocaleString()})
            </button>
          </div>
        </Wrapper>
      )}
    </Container>
  )
}

export default Cart
