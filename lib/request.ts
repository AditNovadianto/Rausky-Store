import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
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
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

export default request
