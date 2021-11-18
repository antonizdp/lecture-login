import request from '../utils/request'

export function create(data) {
  return request({
    method: 'POST',
    url: '/users',
    data,
  })
}

export function login(data) {
  return request({
    method: 'POST',
    url: '/tokens',
    data,
  })
}
