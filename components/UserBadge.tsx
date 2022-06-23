import cn from 'classnames'

interface Props {
  className?: string
  role: string
}

const UserBadge = ({ className, role }: Props) => {
  return (
    role != 'USER' && (
      <span
        className={cn(
          'ml-1 text-[10px] font-bold tracking-wide text-white px-1 rounded-md',
          role == 'FAKE_ADMIN' ? 'bg-gray-400' : 'bg-green-500',
          className
        )}
      >
        {role.replace('_', ' ')}
      </span>
    )
  )
}

export default UserBadge
