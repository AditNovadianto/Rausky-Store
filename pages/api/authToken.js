import apiHandler from '../../lib/apiHandler'
import nookies from 'nookies'

const app = apiHandler()

// this api route is used for testing in postman
export default app.post((req, res) => {
  const { sessionToken, csrfToken } = req.body
  if (!sessionToken || !csrfToken) {
    throw { status: 400, message: 'please provide sessionToken, csrfToken' }
  }
  nookies.set({ res }, 'next-auth.session-token', sessionToken, {
    httpOnly: true,
    path: '/',
  })
  nookies.set({ res }, 'next-auth.csrf-token', csrfToken, {
    httpOnly: true,
    path: '/',
  })
  res.send('success')
})
