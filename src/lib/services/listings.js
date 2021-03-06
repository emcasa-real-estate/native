import _ from 'lodash/fp'
import {get as $get, post, put} from '../api'

export async function create(params, options) {
  return post('/listings', params, options)
}

export async function update(id, params, options) {
  return put(`/listings/${id}`, params, options)
}

export async function get(id, options) {
  return $get(`/listings/${id}`, {}, options)
}

export async function featured() {
  return $get('/featured_listings')
}

export async function related(id, params) {
  return $get(`/listings/${id}/related`, params)
}

export async function search(params) {
  return $get('/listings', search.params(params))
}

search.params = _.flow(
  // Flatten object params
  _.reduce.convert({cap: false})((result, value, key) => {
    switch (key) {
      case 'garage_spots':
      case 'price':
      case 'area':
      case 'rooms':
        return {...result, ..._.mapKeys((k) => `${k}_${key}`)(value)}
      default:
        return {...result, [key]: value}
    }
  }, {}),
  _.omitBy(_.isNil)
)
