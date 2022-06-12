import cn from 'classnames'
import { FC } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
}

const Wrapper: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn('container mx-auto px-5 print:px-0', className)}
    >
      {children}
    </div>
  )
}

export default Wrapper
