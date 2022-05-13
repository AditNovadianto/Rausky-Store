import cn from 'classnames'

const Wrapper = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn('container mx-auto px-5', className)}>
      {children}
    </div>
  )
}

export default Wrapper
