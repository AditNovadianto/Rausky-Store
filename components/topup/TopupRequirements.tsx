import { useState } from 'react'
import cn from 'classnames'

const TopupRequirements = ({
  category,
  isOpen = false,
}: {
  category: any
  isOpen?: boolean
}) => {
  const [isZoom, setIsZoom] = useState(false)

  const zoomHandler = () => {
    setIsZoom(!isZoom)
  }

  return category?.requirement.img || category?.requirement.description ? (
    <details className="mt-4" open={isOpen}>
      <summary className="cursor-pointer text-gray-500">Details</summary>
      <div className="mt-4">
        {category.requirement.img && (
          <div
            className={cn(isZoom ? 'cursor-zoom-out' : 'cursor-zoom-in')}
            onClick={zoomHandler}
          >
            <img
              className={cn(
                'rounded-xl transition-all',
                isZoom && 'lg:scale-[1.5] scale-[1.2] lg:-translate-x-[35%]'
              )}
              src={category.requirement.img}
              alt={category.requirement.title}
            />
          </div>
        )}

        {category?.requirement.description && (
          <p className="mt-3 pb-2 text-gray-500">
            {category.requirement.description}
          </p>
        )}
      </div>
    </details>
  ) : null
}

export default TopupRequirements
