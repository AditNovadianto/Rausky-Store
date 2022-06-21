import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

export interface DropdownItem {
  icon?: any
  rightIcon?: any
  className?: string
  label: string
  more?: DropdownItem[]
  customMore?: any
  onClick?: () => void
}

interface Props {
  items: DropdownItem[]
  children: React.ReactNode
  className?: string
  minWidth?: number
  translateY?: number
  deps?: any[]
}

const Dropdown = ({
  children,
  className,
  minWidth = 250,
  items,
  translateY = 0,
  deps = [],
}: Props) => {
  const [show, setShow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [childrenWidth, setChildrenWidth] = useState(0)
  const [dropdownItems, setDropdownItems] = useState(items)
  const [inMore, setInMore] = useState(null)

  useEffect(() => {
    const changeChildrenWidth = () => {
      setChildrenWidth(containerRef.current.clientWidth)
    }
    changeChildrenWidth()
    window.addEventListener('resize', changeChildrenWidth)
    return () => {
      window.removeEventListener('resize', changeChildrenWidth)
    }
  }, deps)

  const resetDropdown = () => {
    setInMore(null)
    setDropdownItems(items)
  }

  return (
    <div
      ref={containerRef}
      role="button"
      className={cn('relative', className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => {
        setShow(false)
        resetDropdown()
      }}
    >
      {children}
      {show && (
        <div
          className={cn(
            'bg-white border shadow-xl absolute top-full right-full p-1 rounded-xl flex flex-col'
          )}
          style={{
            transform: `translate(${childrenWidth}px, ${translateY}px)`,
            minWidth: minWidth + 'px',
          }}
        >
          {inMore && (
            <div>
              <header className="flex items-center">
                <button
                  onClick={resetDropdown}
                  className="p-2 hover:bg-gray-100 rounded-lg mr-2"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <h3>{inMore.label}</h3>
              </header>
              {inMore.customMore || null}
            </div>
          )}

          {dropdownItems?.map((item, idx) => {
            return (
              <button
                key={idx}
                className={cn(
                  'w-full p-2 rounded-lg text-left truncate',
                  item.className ||
                    'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
                )}
                onClick={() => {
                  if (item.customMore) {
                    setInMore(item)
                    setDropdownItems([])
                    return
                  }
                  if (item.more) {
                    setInMore(item)
                    setDropdownItems(item.more)
                    return
                  }
                  item.onClick && item.onClick()
                  resetDropdown()
                  setShow(false)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {item.icon &&
                      (typeof item.icon == 'string' ? (
                        <img className="w-5 h-5 mr-2" src={item.icon} />
                      ) : (
                        <item.icon className="w-5 h-5 mr-2" />
                      ))}

                    {item.label}
                  </div>

                  {(item.more || item.customMore) && (
                    <ChevronRightIcon className="w-5 h-5 mr-2" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
