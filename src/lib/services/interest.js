import {get, post} from '../api'

export async function create(id, params, options) {
  return post(
    `/listings/${id}/interests`,
    {
      interest: params
    },
    options
  )
}

export async function types() {
  return get('/interest_types')
}
