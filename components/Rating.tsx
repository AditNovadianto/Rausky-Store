import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import ReactStars from 'react-rating-stars-component'
import { defaultAvatar } from '../lib/data'
import UserBadge from './UserBadge'

const Rating = ({ rating }) => {
  return (
    <div className="p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800">
      <div className="pointer-events-none -ml-1 flex justify-between items-center">
        <ReactStars
          count={5}
          emptyIcon={<StarIcon className="w-5 h-5 text-gray-300" />}
          filledIcon={<StarIconSolid className="w-5 h-5 text-yellow-500" />}
          value={rating.star}
        />
        <span className="text-gray-600 dark:text-gray-500 text-xs">
          {new Date(rating.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="text-sm mt-1">
        <div className="text-xs flex items-center my-2">
          <span className="flex items-center">
            <img
              className="w-5 h-5 rounded-full mr-2 object-cover"
              src={rating.order.user?.image || defaultAvatar}
              alt={rating.order.user?.name || 'Guest'}
            />
            <b className="text-sm truncate">
              {rating.order.user?.displayName ||
                rating.order.user?.name ||
                'Guest'}
            </b>{' '}
            {rating.order.user && <UserBadge role={rating.order.user.role} />}
          </span>
        </div>

        <div className="text-xs flex justify-between">
          <p className="text-green-500 truncate">
            {rating.order.products[0].product.title}
          </p>
          {rating.order.products.length > 1 && (
            <p className="text-gray-600 dark:text-gray-500">
              + {rating.order.products.length - 1} other
            </p>
          )}
        </div>

        {/* TODO: cari tau cara bikin truncate */}
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-h-[80px]">
          {rating.comment}
        </p>
      </div>
    </div>
  )
}

export default Rating
