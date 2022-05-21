import cn from 'classnames'
import { useEffect, useState } from 'react'

const Badge = ({ children }) => {
  const [membesar, setMembesar] = useState(false)
  useEffect(() => {
    setMembesar(true)
  }, [])

  return (
    <div
      className={cn(
        'absolute -top-1 -right-1 bg-green-500 text-white font-semibold text-[10px] w-[16px] h-[15px] rounded-full flex items-center justify-center transition-all ease-out duration-100',
        membesar ? 'scale-100 opacity-1' : 'scale-0 opacity-0'
      )}
    >
      {children}
    </div>
  )
}

export default Badge
