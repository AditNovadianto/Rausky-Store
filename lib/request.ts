import axios from 'axios'
import Router from 'next/router'

const baseUrl = process.env.NEXTAUTH_URL

const request = axios.create({
  baseURL: `${baseUrl}/api`,
})

// before sending response to client
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // redirect to /signin page if user is not logged in
    if (error.response.status == 401) {
      Router.push('/signin')
    }
    return Promise.reject(error.response)
  }
)

export default request
