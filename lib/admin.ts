import { getSession } from 'next-auth/react'
import toast from 'react-hot-toast'
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

export const adminRequestHandler = async ({
  loading,
  success,
  handler,
  onError,
}: {
  loading: string
  success: string
  handler: () => void
  onError?: () => void
}) => {
  let toastId: string
  try {
    toastId = toast.loading(loading)
    await handler()
    toast.success(success, { id: toastId })
  } catch (err) {
    console.log(err)
    let errorMessage = ''
    if (err.status == 403) {
      errorMessage = 'Opps... fake admin is not allowed to do this operation'
    } else {
      errorMessage = 'Failed. Check console for details'
    }
    toast.error(errorMessage, { id: toastId })
    onError && onError()
  }
}
