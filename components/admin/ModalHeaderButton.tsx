import cn from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode
  Icon?: any
  fill?: 'solid' | 'outlined'
  variant?: 'green' | 'red'
}

const Button = ({
  children,
  Icon,
  fill = 'solid',
  variant = 'green',
  ...props
}: Props) => {
  const { className } = props

  return (
    <button
      type="button"
      {...props}
      className={cn(
        'flex justify-center items-center transition-colors font-semibold w-full px-4 py-2 rounded-xl whitespace-nowrap',
        variant == 'green' &&
          fill === 'solid' &&
          'bg-green-500 hover:bg-green-400 text-white',
        variant == 'red' &&
          fill === 'solid' &&
          'bg-red-600 hover:bg-red-500 text-white',
        variant == 'green' &&
          fill === 'outlined' &&
          'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
        variant == 'red' &&
          fill === 'outlined' &&
          'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white ',
        className
      )}
    >
      <Icon className="w-5 h-5 mr-1" /> {children}
    </button>
  )
}

export default Button
