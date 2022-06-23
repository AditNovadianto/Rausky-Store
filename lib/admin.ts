import { getSession } from 'next-auth/react'
import { User } from '../types/next-auth'

export const getUserAdmin = async (
  ctx
): Promise<
  [
    User | null,
    {
      redirect: {
        destination: string
        permanent: boolean
      }
    } | null
  ]
> => {
  const session = await getSession(ctx)

  if (!session) {
    return [
      null,
      {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      },
    ]
  }

  const { user } = session
  if (!['ADMIN', 'FAKE_ADMIN'].includes(user.role)) {
    return [
      null,
      {
        redirect: {
          destination: '/',
          permanent: false,
        },
      },
    ]
  }

  return [user, null]
}
