import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import ReactStars from 'react-rating-stars-component'
import { defaultAvatar } from '../lib/data'

const Rating = ({ rating }) => {
  return (
    <div className="p-3 rounded-xl border">
      <div className="pointer-events-none -ml-1 flex justify-between items-center">
        <ReactStars
          count={5}
          emptyIcon={<StarIcon className="w-5 h-5 text-gray-300" />}
          filledIcon={<StarIconSolid className="w-5 h-5 text-yellow-500" />}
          value={rating.star}
        />
        <span className="text-gray-600 text-xs">
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
            <b className="text-sm">{rating.order.user?.name || 'Guest'}</b>{' '}
            {rating.order.user?.role == 'ADMIN' && (
              <span className="ml-1 text-[10px] font-bold tracking-wide bg-green-500 text-white px-1 rounded-md">
                ADMIN
              </span>
            )}
          </span>
        </div>
        {/* TODO: tanya WPU cara bikin truncate */}
        <p className="text-gray-600 max-h-[80px]">{rating.comment}</p>
      </div>
    </div>
  )
}

export default Rating
