import nc, { Middleware } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { User } from 'next-auth'
import { Role } from '@prisma/client'

export default nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err)
    if (err?.status == 401) {
      res.redirect('/api/auth/signin') // TODO: ganti ke custom signin
      return
    }
    res.status(err.status || 500).end(err.message || 'Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end(`${req.method} ${req.url} not found`)
  },
})

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
