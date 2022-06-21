import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

export interface DropdownItem {
  icon?: any
  className?: string
  label: string
  onClick: () => void
}

interface Props {
  items: DropdownItem[]
  children: React.ReactNode
  className?: string
  translateY?: number
  deps?: any[]
}

const Dropdown = ({
  children,
  className,
  items,
  translateY = 0,
  deps = [],
}: Props) => {
  const [show, setShow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [childrenWidth, setChildrenWidth] = useState(0)

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

  return (
    <div
      ref={containerRef}
      role="button"
      className={cn('relative', className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={cn(
            'bg-white border shadow-xl absolute top-full right-full p-1 rounded-xl min-w-[250px] flex flex-col'
          )}
          style={{
            transform: `translate(${childrenWidth}px, ${translateY}px)`,
          }}
        >
          {items?.map((item, idx) => {
            return (
              <button
                key={idx}
                className={cn(
                  'w-full p-2 rounded-lg text-left truncate flex items-center',
                  item.className ||
                    'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
                )}
                onClick={() => {
                  item.onClick && item.onClick()
                  setShow(false)
                }}
              >
                {item.icon &&
                  (typeof item.icon == 'string' ? (
                    <img className="w-5 h-5 mr-2" src={item.icon} />
                  ) : (
                    <item.icon className="w-5 h-5 mr-2" />
                  ))}

                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
