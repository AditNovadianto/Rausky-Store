import Modal from '../Modal'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import Rating from '../Rating'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { XIcon } from '@heroicons/react/outline'

const buttonClassname =
  'flex-grow p-2 rounded-md border text-sm font-semibold flex items-center justify-center'

const RatingsModal = ({ open, onClose, ratings }) => {
  const [filter, setFilter] = useState<string | number>(5)
  const [filteredRatings, setFilteredRatings] = useState(ratings.ratings)

  useEffect(() => {
    let newRatings = []
    const ratingsCopy = [...ratings.ratings]
    // star filter
    if (typeof filter == 'number') {
      newRatings = ratingsCopy.filter((rating) => rating.star == filter)
    }
    // time created filter
    else if (typeof filter == 'string') {
      newRatings = ratingsCopy.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        if (filter == 'newest') return dateB - dateA
        if (filter == 'oldest') return dateA - dateB
      })
    }
    setFilteredRatings(newRatings)
  }, [filter])

  return (
    <Modal open={open} onClose={onClose}>
      <header className="sticky w-full top-0 p-5 text-2xl font-bold bg-white z-10 shadow-sm">
        <h2 className="flex justify-between items-center">
          <div>
            Ratings{' '}
            <span className="text-gray-500 font-normal">
              ({ratings.ratings.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-green-500"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </h2>
        <div className="flex mt-3 space-x-4 overflow-y-auto">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setFilter(star)}
              className={cn(
                buttonClassname,
                filter == star
                  ? 'bg-green-100 border-green-300'
                  : 'border-gray-300'
              )}
            >
              <StarIconSolid className="text-yellow-500 w-5 h-5 mr-1" />
              {star}
            </button>
          ))}
          {['newest', 'oldest'].map((sortTo) => (
            <button
              key={sortTo}
              onClick={() => setFilter(sortTo)}
              className={cn(
                buttonClassname,
                filter == sortTo
                  ? 'bg-green-100 border-green-300'
                  : 'border-gray-300'
              )}
            >
              {sortTo}
            </button>
          ))}
        </div>
      </header>
      <div className="overflow-auto p-5 space-y-4">
        {filteredRatings.length > 0 ? (
          filteredRatings.map((rating) => (
            <Rating key={rating.id} rating={rating} />
          ))
        ) : (
          <div className="text-center">
            <img
              src="/images/empty-rating.svg"
              alt="empty-rating"
              className="mx-auto w-[100px] h-[100px]"
            />
            <h3 className="font-bold text-xl mt-2">No ratings.</h3>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default RatingsModal
