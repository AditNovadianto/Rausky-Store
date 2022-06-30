import nc, { Middleware } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { User } from 'next-auth'
import { Role } from '@prisma/client'

const apiHandler = () => {
  return nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
      console.error(err)
      res
        .status(err.status || 500)
        .json({ message: err.message || 'Something broke!', ...err })
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ message: `${req.method} ${req.url} not found` })
    },
  })
}

export default apiHandler

interface ExtendedRequest extends NextApiRequest {
  user: User
}

export const checkAuth =
  (role: Role = 'USER'): Middleware<ExtendedRequest, NextApiResponse> =>
  async (req, res, next) => {
    const session = await getSession({ req })
    if (!session?.user) {
      throw { status: 401, message: 'you are not logged in' }
    }
    // check if role = ADMIN
    if (role == 'ADMIN' && session.user.role !== 'ADMIN') {
      throw { status: 403, message: 'forbidden' }
    }
    // @ts-ignore
    req.user = session.user
    next()
  }
