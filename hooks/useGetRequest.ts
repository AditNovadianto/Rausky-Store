import useSWR from 'swr'
import request from '../lib/request'

const fetcher = (url: string) => request.get(url)

const useGetRequest = (url: string) => {
  const { data, error } = useSWR(url, fetcher)
  const loading = !data && !error
  return { data: data?.data, loading, error }
}

export default useGetRequest
