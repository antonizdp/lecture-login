import request from '@/utils/request'

export function get() {
  return request({
    method: 'get',
    url: '/motorTypes',
  })
}
