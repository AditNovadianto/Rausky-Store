import Modal from '../Modal'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import Rating from '../Rating'
import { useEffect, useState } from 'react'
import cn from 'classnames'

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
      <h1 className="sticky w-full top-0 p-5 text-2xl font-bold bg-white z-10 shadow-sm">
        Ratings{' '}
        <span className="text-gray-500 font-normal">
          ({ratings.ratings.length})
        </span>
        <div className="flex mt-3 space-x-4">
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
      </h1>
      <div className="overflow-auto p-5 space-y-4">
        {filteredRatings.map((rating) => (
          <Rating key={rating.id} rating={rating} />
        ))}
      </div>
    </Modal>
  )
}

export default RatingsModal
