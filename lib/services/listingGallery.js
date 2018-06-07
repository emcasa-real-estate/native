import {get as $get, post, put, del} from '../api'

export async function get(id, options) {
  return $get(`/listings/${id}/images`, {}, options)
}

export async function create(id, params, options) {
  return post(`/listings/${id}/images`, {image: params}, options)
}

export async function deleteImage(id, imageId, options) {
  return del(`/listings/${id}/images/${imageId}`, options)
}

export async function changeOrder(id, order, options) {
  return put(`/listings/${id}/images_orders`, {images: order}, options)
}
