import request from '../utils/request'

export function get(params = {}) {
  return request({
    method: 'GET',
    url: '/prefixes',
    params,
  })
}
