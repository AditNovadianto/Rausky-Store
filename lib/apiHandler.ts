import nc, { Middleware } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { User } from 'next-auth'

export default nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err)
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
  (): Middleware<ExtendedRequest, NextApiResponse> =>
  async (req, res, next) => {
    const session = await getSession({ req })
    if (!session?.user) {
      throw { status: 401, message: 'you are not logged in' }
    }
    // @ts-ignore
    req.user = session.user
    next()
  }
