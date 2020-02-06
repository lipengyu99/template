import request from '@/utils/request'

const URL = 'http://127.0.0.1:5000'
export function fetchList(query) {
  return request({
    url: '/course',
    method: 'get',
    params: {query},
    baseURL:URL
  })
}
export function fetchOptions() {
  return request({
    url:'/course/option',
    method:'get',
    baseURL: URL
  })
}
