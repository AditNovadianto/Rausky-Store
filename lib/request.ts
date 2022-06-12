import axios from 'axios'

const request = axios.create()

// set baseURL to current url origin before sending request
request.interceptors.request.use((config) => {
  config.baseURL = window.location.origin + '/api'
  return config
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
    // if (error.response.status == 401) {
    //   Router.push('/signin')
    // }
    return Promise.reject(error.response ?? error)
  }
)

export default request
