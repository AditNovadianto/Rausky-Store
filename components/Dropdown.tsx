import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from '@heroicons/react/outline'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

export interface DropdownItem {
  icon?: any
  className?: string
  label: string
  more?: DropdownItem[]
  onClick?: () => void
  disabled?: boolean
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
  const [containerWidth, setContainerWidth] = useState(0)
  const [dropdownItems, setDropdownItems] = useState(items)
  const [inMore, setInMore] = useState(null)

  useEffect(() => {
    const changeContainerWidth = () => {
      setContainerWidth(containerRef.current.clientWidth)
    }
    changeContainerWidth()
    window.addEventListener('resize', changeContainerWidth)
    return () => {
      window.removeEventListener('resize', changeContainerWidth)
    }
  }, deps)

  useEffect(() => {
    setDropdownItems(items)
  }, [items])

  const resetDropdown = () => {
    setInMore(null)
    setDropdownItems(items)
  }

  const dropdownProps =
    'ontouchstart' in window // if in touch device
      ? {
          onClick: () => {
            setShow(true)
          },
        }
      : {
          onMouseEnter: () => {
            setShow(true)
          },
          onMouseLeave: () => {
            setShow(false)
            resetDropdown()
          },
        }

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => {
            setShow(false)
            resetDropdown()
          }}
        ></div>
      )}
      <div
        ref={containerRef}
        role="button"
        className={cn('relative z-50', className)}
        {...dropdownProps}
      >
        {children}
        {show && (
          <div
            className={cn(
              'bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-xl absolute top-full right-full p-1 rounded-xl flex flex-col'
            )}
            style={{
              transform: `translate(${containerWidth}px, ${translateY}px)`,
              minWidth: minWidth + 'px',
            }}
          >
            {inMore && (
              <div>
                <header className="flex items-center">
                  <button
                    onClick={resetDropdown}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mr-2"
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
                  disabled={item.disabled || false}
                  className={cn(
                    'w-full p-2 rounded-lg text-left truncate',
                    item.className ||
                      'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-50',
                    'disabled:hover:bg-transparent disabled:opacity-30 disabled:text-current'
                  )}
                  onClick={() => {
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
                      {item.label}{' '}
                    </div>

                    {item.disabled ? (
                      <LockClosedIcon className="w-5 h-5" />
                    ) : (
                      item.more && <ChevronRightIcon className="w-5 h-5" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default Dropdown
