import _ from 'lodash/fp'
import {get as $get} from '../api'

export async function get(id) {
  return $get(`/listings/${id}`)
}

export async function featured() {
  return $get('/featured_listings')
}

export async function related(id) {
  return $get(`/listings/${id}/related`)
}

export async function search(params) {
  return $get('/listings', search.params(params))
}

search.params = _.flow(
  // Flatten object params
  _.reduce.convert({cap: false})((result, value, key) => {
    switch (key) {
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
