import _ from 'lodash/fp'
import {get as $get, post, del} from '../api'

export async function get(id, options) {
  return $get(`/listings/${id}/images`, {}, options)
}

export async function create(id, params, options) {
  return post(`/listings/${id}/images`, {image: params}, options)
}

export async function deleteImage(id, imageId, options) {
  return del(`/listings/${id}/images/${imageId}`, options)
}
