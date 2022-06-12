import { TrashIcon } from '@heroicons/react/outline'

interface Props {
  item: any
  actions?: any
}

const ProductItem = ({ item, actions }: Props) => {
  return (
    <div key={item.id} className="flex">
      <img
        className="w-[80px] h-[80px] object-cover rounded-2xl"
        src={item.img ?? item.category.logoImg}
        alt={item.title}
      />
      <div className="ml-4 flex-grow">
        <p className="text-sm text-green-500">{item.category.name}</p>
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-gray-500 font-semibold">
          Rp {item.price.toLocaleString()}
        </p>
      </div>

      {actions ? (
        <div className="flex justify-between lg:justify-start items-center mt-4">
          {/* SET QUANTITY */}
          <div className="flex items-center text-gray-500">
            <button
              onClick={() => actions.decrementAmount({ product: item })}
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
      ) : null}
    </div>
  )
}

export default ProductItem
