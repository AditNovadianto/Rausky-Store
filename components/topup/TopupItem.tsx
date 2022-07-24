import { TrashIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { getProductInCart } from '../../lib/cartHandler'

interface Props {
  product: any
  category: any
  cart?: any
  onAddToCart?: any
  onRemoveFromCart?: any
  onDecrementAmount?: any
  preview?: boolean
}

const TopupItem = ({
  product,
  cart,
  category,
  onAddToCart,
  onRemoveFromCart,
  onDecrementAmount,
  preview = false,
}: Props) => {
  const { isProductInCart, productInCart } = getProductInCart(product, cart)

  return (
    <div
      role={isProductInCart ? undefined : 'button'}
      onClick={() => {
        if (isProductInCart) return
        onAddToCart && onAddToCart({ product, category })
      }}
      id={product.title}
      className={cn(
        'px-4 py-3 border rounded-xl dark:bg-gray-700',
        isProductInCart
          ? 'border-green-400 dark:border-green-400'
          : 'hover:border-green-400 dark:hover:border-green-400 dark:border-gray-600'
      )}
    >
      <div className="flex items-center">
        {((preview && category.logoImg) || product.img) && (
          <img
            src={
              preview
                ? (product.subCategory
                    ? category.subCategories.find(
                        (c) =>
                          c.slug == product.subCategory ||
                          c.slug == product.subCategory.slug
                      )
                    : category
                  )?.logoImg
                : product.img
            }
            className="w-10 h-10 object-cover rounded-lg mb-1.5"
          />
        )}
        {isProductInCart && (
          <button
            onClick={() => onRemoveFromCart && onRemoveFromCart(product)}
            className="block md:hidden p-1.5 bg-gray-200 dark:bg-gray-600 dark:hover:bg-red-500 hover:bg-red-500 text-gray-500 hover:text-gray-100 dark:text-gray-300 dark:hover:text-gray-50 rounded-xl ml-auto"
          >
            <TrashIcon className="w-5 h-5 text-current" />
          </button>
        )}
      </div>
      <div>
        <p className="font-semibold">
          {product.title || (preview && 'Untitled Product')}
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          Rp {product.price.toLocaleString()}
        </p>
        {(isProductInCart || preview) && (
          <div className="flex items-center mt-3">
            <div className="flex items-center flex-grow md:flex-grow-0 justify-between text-gray-500 dark:text-gray-300">
              <button
                onClick={() =>
                  onDecrementAmount && onDecrementAmount({ product })
                }
                className="w-8 h-8 rounded-xl font-medium border dark:border-gray-500 dark:hover:bg-gray-600 hover:bg-gray-800 hover:text-gray-100"
              >
                {' '}
                -{' '}
              </button>
              <div className="px-5">{preview ? 1 : productInCart.amount}</div>
              <button
                onClick={() =>
                  onAddToCart && onAddToCart({ product, category })
                }
                className="w-8 h-8 rounded-xl font-medium border dark:border-gray-500 dark:hover:bg-gray-600 hover:bg-gray-800 hover:text-gray-100"
              >
                {' '}
                +{' '}
              </button>
            </div>
            <button
              onClick={() => onRemoveFromCart && onRemoveFromCart(product)}
              className="hidden md:block p-1.5 bg-gray-200 dark:bg-gray-600 dark:hover:bg-red-500 hover:bg-red-500 text-gray-500 hover:text-gray-100 dark:text-gray-300 dark:hover:text-gray-50 rounded-xl ml-auto"
            >
              <TrashIcon className="w-5 h-5 text-current" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopupItem
