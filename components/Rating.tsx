import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import ReactStars from 'react-rating-stars-component'

const defaultAvatar =
  'https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png'

const Rating = ({ rating }) => {
  return (
    <div className="p-3 rounded-xl border">
      <div className="pointer-events-none -ml-1">
        <ReactStars
          count={5}
          emptyIcon={<StarIcon className="w-5 h-5 text-gray-300" />}
          filledIcon={<StarIconSolid className="w-5 h-5 text-yellow-500" />}
          value={rating.star}
        />
      </div>
      <div className="text-sm mt-1">
        <div className="text-xs flex items-center my-2">
          <span className="flex items-center">
            <img
              className="w-5 h-5 rounded-full mr-2 object-cover"
              src={rating.order.user?.image || defaultAvatar}
              alt=""
            />
            <b className="text-sm">{rating.order.user?.name || 'Guest'}</b>{' '}
            <span className="mx-1">&middot;</span>
          </span>
          <span className="text-gray-600">
            {new Date(rating.createdAt).toLocaleDateString()}
          </span>
        </div>
        {/* TODO: tanya WPU cara bikin truncate */}
        <p className="text-gray-600 max-h-[80px]">{rating.comment}</p>
      </div>
    </div>
  )
}

export default Rating
