import _ from 'lodash/fp'
import update from 'immutability-helper'

import * as feed from '../feed'
import * as relations from '../relations'

export const LOAD = 'listings/data/LOAD'
export const PATCH = 'listings/data/PATCH'
export const REQUEST = 'listings/data/REQUEST'
export const SUCCESS = 'listings/data/SUCCESS'
export const FAILURE = 'listings/data/FAILURE'

export const load = (id) => ({type: LOAD, id})
export const patch = (id, data) => ({type: PATCH, id, data})
export const request = (id) => ({type: REQUEST, id})
export const success = (id, data) => ({type: SUCCESS, id, data})
export const failure = (id, error) => ({type: FAILURE, id, error})

const mapFeed = _.flow(
  _.keyBy('id'),
  _.mapValues((data) => ({...initialState, data}))
)

export default function listingsData(state = {}, action) {
  switch (action.type) {
    case PATCH:
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      return update(state, {
        [action.id]: {$set: listingsData.node(state[action.id], action)}
      })
    case feed.SUCCESS:
    case relations.SUCCESS:
      return update(state, {$merge: mapFeed(action.data)})
    default:
      return state
  }
}

const initialState = {
  loading: false,
  error: undefined,
  data: undefined
}

listingsData.node = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return update(state, {
        $merge: {
          loading: true
        }
      })
    case SUCCESS:
      return update(state, {
        $merge: {
          loading: false,
          error: undefined,
          data: action.data
        }
      })
    case FAILURE:
      return update(state, {
        $merge: {
          loading: false,
          error: action.error
        }
      })
    case PATCH:
      return update(state, {
        data: {
          $apply: (data) => ({...data, ...action.data})
        }
      })
    default:
      return state
  }
}
