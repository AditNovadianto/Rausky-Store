import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import ReactStars from 'react-rating-stars-component'

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
        <span>
          {/* TODO: tambah user image */}
          <b>{rating.order.user?.name || 'Guest'}</b> &middot;{' '}
          <span className="text-gray-600 text-xs">
            {new Date(rating.createdAt).toLocaleDateString()}
          </span>
        </span>
        {/* TODO: tanya WPU cara bikin truncate */}
        <p className="text-gray-600 max-h-[80px]">{rating.comment}</p>
      </div>
    </div>
  )
}

export default Rating
