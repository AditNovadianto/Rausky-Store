import NextLink, { LinkProps } from 'next/link'
import { FC } from 'react'

interface Props extends React.PropsWithChildren<LinkProps> {
  className?: string
}

const Link: FC<Props> = ({ className, children, ...linkProps }) => {
  return (
    <NextLink {...linkProps}>
      <a className={className}>{children}</a>
    </NextLink>
  )
}

export default Link
