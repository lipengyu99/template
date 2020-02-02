import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/course',
    method: 'get',
    params: query
  })
}
