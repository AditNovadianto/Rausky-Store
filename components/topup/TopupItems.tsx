import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import cn from 'classnames'
import { TrashIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion } from 'framer-motion'
import Link from '../Link'
import Wrapper from '../Wrapper'

const filterProductsBySubCategory = (subCategory, products) => {
  return subCategory
    ? products.filter((product) => product.subCategory.slug == subCategory)
    : products
}

const getProductInCart = (product, cart) => {
  const idx = cart.findIndex((item) => item.id == product.id)
  const isProductInCart = idx >= 0
  const productInCart = cart[idx]
  return { isProductInCart, idx, productInCart }
}

const TopupItems = ({ category }) => {
  const { state, actions } = useStateMachine({
    addToCart: (state, payload) => {
      const product = {
        ...payload,
        amount: 1,
      }

      const newCart = [...state.cart]

      const { isProductInCart, idx } = getProductInCart(product, state.cart)
      if (isProductInCart) {
        newCart.splice(idx, 1, {
          ...product,
          amount: state.cart[idx].amount + 1,
        })
      } else {
        newCart.push(product)
      }

      return {
        ...state,
        cart: newCart,
      }
    },
    decrementAmount: (state, payload) => {
      const newCart = [...state.cart]
      const { idx, productInCart } = getProductInCart(payload, state.cart)
      const newAmount = productInCart.amount - 1
      if (newAmount <= 0) {
        newCart.splice(idx, 1)
      } else {
        newCart.splice(idx, 1, {
          ...productInCart,
          amount: newAmount,
        })
      }
      return { ...state, cart: newCart }
    },
    removeFromCart: (state, payload) => {
      const newCart = [...state.cart]
      const { idx } = getProductInCart(payload, state.cart)
      newCart.splice(idx, 1)
      return { ...state, cart: newCart }
    },
  })
  const { cart } = state

  const [currentSubCategory, setCurrentSubCategory] = useState(
    category.subCategories[0]?.slug
  )

  console.log(category)

  const products = filterProductsBySubCategory(
    currentSubCategory,
    category.products
  )

  const totalItemsInCart = cart.length
  const currentSubtotal = cart.reduce((total, item) => {
    total += item.amount * item.price
    return total
  }, 0)

  return (
    <div className="md:w-[60%] md:mt-0 mt-10 w-full md:ml-5 space-y-8">
      {/* REQUIREMENT */}
      {category.requirement && (
        <div className="border rounded-2xl px-5 pb-5 w-full">
          <div className="w-[40px] h-[40px] text-center -mt-5 leading-[32px] border-4 border-green-100 rounded-full bg-green-500 text-white font-bold">
            1
          </div>
          <h1 className="text-2xl font-bold mt-2">
            {category.requirement.title}
          </h1>

          <form className="mt-5 lg:flex-row flex-col flex space-x-0 lg:space-x-3 space-y-3 lg:space-y-0">
            {category.requirement.fields.map((field) => (
              <div className="w-full" key={field.id}>
                {/* TODO: bikin input validation */}
                <input
                  className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-green-400"
                  placeholder={field.placeholder}
                  type={field.type}
                />
                {/* <p
            className={`${
              haveUserID ? 'opacity-100 mt-0' : 'opacity-0 -mt-[20px]'
            } text-red-600 transition-all`}
          >
            Harus Diisi!!!
          </p> */}
              </div>
            ))}
          </form>
          <div className="mt-4">
            {category.requirement.img && (
              <img
                className="rounded-xl lg:hover:scale-[1.5] hover:scale-[1.2] lg:hover:-translate-x-[35%] transition-all"
                src={category.requirement.img}
                alt={category.requirement.title}
              />
            )}

            {category.requirement.description && (
              <p className="mt-3 pb-2 text-gray-500">
                {category.requirement.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CHOOSE */}
      <div className="border rounded-2xl px-5 pb-5 w-full">
        <div className="w-[40px] h-[40px] text-center -mt-5 leading-[32px] border-4 border-green-100 rounded-full bg-green-500 text-white font-bold">
          {category.requirement ? 2 : 1}
        </div>
        <h1 className="text-2xl font-bold mt-2">Pilih Nominal Topup</h1>

        {/* SUB CATEGORY */}
        {category.subCategories.length > 0 && (
          <div className="mt-5">
            <p className="font-semibold text-lg">Pilih Kategori</p>
            <div className="flex flex-col md:flex-row space-y-4 mt-4 md:space-y-0 md:space-x-4">
              {category.subCategories.map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => setCurrentSubCategory(subCategory.slug)}
                  className={cn(
                    'w-full flex items-center px-2 py-3 border rounded-xl hover:border-green-400',
                    currentSubCategory == subCategory.slug &&
                      'border-green-400 bg-green-100'
                  )}
                >
                  <img
                    className="w-6 h-6"
                    src={subCategory.logoImg}
                    alt={subCategory.slug}
                  />
                  <span className="font-semibold ml-2">{subCategory.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ITEMS */}
        <div className="mt-5">
          <p className="font-semibold text-lg">Pilih Item</p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {products.map((product) => {
              const { isProductInCart, productInCart } = getProductInCart(
                product,
                cart
              )
              return (
                <div
                  role={isProductInCart ? undefined : 'button'}
                  key={product.id}
                  onClick={() => {
                    if (isProductInCart) return
                    actions.addToCart(product)
                  }}
                  className={cn(
                    'px-4 py-3 border rounded-xl hover:border-green-400',
                    isProductInCart && 'border-green-400'
                  )}
                >
                  <div className="flex items-center">
                    {product.img && (
                      <img
                        src={product.img}
                        className="w-10 h-10 object-cover rounded-lg mb-1.5"
                      />
                    )}
                    {isProductInCart && (
                      <button
                        onClick={() => actions.removeFromCart(product)}
                        className="block md:hidden p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl ml-auto"
                      >
                        <TrashIcon className="w-5 h-5 text-current" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-gray-500">
                      Rp {product.price.toLocaleString()}
                    </p>
                    {isProductInCart && (
                      <div className="flex items-center mt-3">
                        <div className="flex items-center flex-grow md:flex-grow-0 justify-between text-gray-500">
                          <button
                            onClick={() => actions.decrementAmount(product)}
                            className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100"
                          >
                            {' '}
                            -{' '}
                          </button>
                          <div className="px-5">{productInCart.amount}</div>
                          <button
                            onClick={() => actions.addToCart(product)}
                            className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100"
                          >
                            {' '}
                            +{' '}
                          </button>
                        </div>
                        <button
                          onClick={() => actions.removeFromCart(product)}
                          className="hidden md:block p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl ml-auto"
                        >
                          <TrashIcon className="w-5 h-5 text-current" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {totalItemsInCart > 0 && (
          <motion.div
            className="fixed bottom-0 left-0 w-full pb-8 bg-white md:bg-transparent"
            initial={{
              y: '100%',
              opacity: 0,
            }}
            animate={{
              y: '0%',
              opacity: 1,
            }}
            exit={{
              y: '100%',
              opacity: 0,
            }}
          >
            <Wrapper className="max-w-md">
              <Link
                href="/cart"
                className="block w-full -mt-4 py-4 text-center bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl shadow-xl shadow-green-300"
              >
                Continue to payment (Rp {currentSubtotal.toLocaleString()})
              </Link>
            </Wrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopupItems
