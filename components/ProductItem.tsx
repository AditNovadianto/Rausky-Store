import { TrashIcon } from '@heroicons/react/outline'
import cn from 'classnames'

interface Props {
  item: any
  actions?: any
  size?: 'normal' | 'small'
}

const ProductItem = ({ item, actions, size = 'normal' }: Props) => {
  return (
    <div key={item.id} className="flex flex-col md:flex-row">
      <img
        className={cn(
          'object-cover rounded-2xl',
          size == 'small' ? 'w-[40px] h-[40px]' : 'w-[80px] h-[80px]'
        )}
        src={item.img ?? item.category.logoImg}
        alt={item.title}
      />
      <div
        className={cn(
          'flex-grow md:mt-0',
          size == 'small' ? 'mt-2 md:ml-2' : 'mt-4 md:ml-4'
        )}
      >
        <p
          className={cn(
            'text-green-500',
            size == 'small' ? 'text-xs' : 'text-sm'
          )}
        >
          {item.category.name}
        </p>
        <h3
          className={cn(
            'font-semibold',
            size == 'small' ? 'text-base' : 'text-lg'
          )}
        >
          {item.title}{' '}
          {item.amount && item.amount > 1 && (
            <span className="ml-2 text-gray-500">x{item.amount}</span>
          )}
        </h3>
        <p
          className={cn(
            'text-gray-500 dark:text-gray-300 font-semibold',
            size == 'small' ? 'text-sm' : ''
          )}
        >
          Rp {item.price.toLocaleString()}
        </p>
      </div>

      {actions ? (
        <div className="flex justify-between lg:justify-start items-center mt-4">
          {/* SET QUANTITY */}
          <div className="flex items-center text-gray-500 dark:text-gray-300">
            <button
              onClick={() => actions.decrementAmount({ product: item })}
              className="w-8 h-8 rounded-xl font-medium border dark:border-gray-500 dark:hover:bg-gray-600 hover:bg-gray-800 hover:text-gray-100"
            >
              {' '}
              -{' '}
            </button>
            <div className="px-5">{item.amount}</div>
            <button
              onClick={() => actions.addToCart({ product: item })}
              className="w-8 h-8 rounded-xl font-medium border dark:border-gray-500 dark:hover:bg-gray-600 hover:bg-gray-800 hover:text-gray-100"
            >
              {' '}
              +{' '}
            </button>
          </div>

          {/* DELETE */}
          <button
            onClick={() => actions.removeFromCart(item)}
            className="p-1.5 bg-gray-200 dark:bg-gray-600 dark:hover:bg-red-500 hover:bg-red-500 text-gray-500 hover:text-gray-100 dark:text-gray-300 dark:hover:text-gray-50 rounded-xl ml-5"
          >
            <TrashIcon className="w-5 h-5 text-current" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ProductItem
