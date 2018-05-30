import qs from 'qs'
import toCamelCase from 'camelcase-keys-deep'

import {API_URL} from '@/lib/config'
import ResponseError from './ResponseError'

export const buildUrl = (path) => API_URL + path

export const buildHeaders = ({jwt} = {}) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: jwt ? `Token ${jwt}` : undefined
})

export async function fetch(path, options = {}) {
  const finalOptions = {
    ...options,
    headers: Object.assign(buildHeaders(options.jwt), options.headers || {})
  }
  const response = await window.fetch(buildUrl(path), finalOptions)
  if (Math.floor(response.status / 100) === 2) {
    return toCamelCase(await response.json())
  } else {
    let data
    const cType = response.headers.get('Content-Type')
    if (/application\/json/.test(cType))
      try {
        data = await response.json()
      } catch (_) {
        data = undefined
      }
    throw new ResponseError(response, data)
  }
}

export async function get(path, params) {
  const queryString = qs.stringify(params, {
    arrayFormat: 'brackets',
    encodeValuesOnly: true
  })
  return await fetch(`${path}?${queryString}`)
}

export async function post(path, params, options) {
  return await fetch(path, {
    method: 'POST',
    headers: buildHeaders(options),
    body: JSON.stringify(params)
  })
}

export async function put(path, params, options) {
  return await fetch(path, {
    method: 'PUT',
    headers: buildHeaders(options),
    body: JSON.stringify(params)
  })
}
