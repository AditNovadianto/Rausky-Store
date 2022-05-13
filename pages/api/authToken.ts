import apiHandler from '../../lib/apiHandler'
import nookies from 'nookies'

// this api route is used for testing in postman
export default apiHandler.post((req, res) => {
  const { sessionToken, csrfToken } = req.body
  if (!sessionToken || !csrfToken) {
    throw { status: 401, message: 'please provide sessionToken, csrfToken' }
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
