import request from '../utils/request'

export function get(params = {}) {
  return request({
    method: 'GET',
    url: '/products',
    params,
  })
}

export function getOne(id) {
  return request({
    method: 'GET',
    url: `/products/${id}`,
  })
}

export function update(id, data) {
  return request({
    method: 'PUT',
    url: `/products/${id}`,
    data,
  })
}

export function create(data) {
  return request({
    method: 'POST',
    url: `/products`,
    data,
  })
}
