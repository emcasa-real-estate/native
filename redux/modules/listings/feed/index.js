import _ from 'lodash'
import update from 'immutability-helper'

export const UPDATE_OPTIONS = 'listings/feed/UPDATE_OPTIONS'
export const LOAD_MORE = 'listings/feed/LOAD_MORE'
export const REQUEST = 'listings/feed/REQUEST'
export const SUCCESS = 'listings/feed/SUCCESS'
export const FAILURE = 'listings/feed/FAILURE'

export const updateOptions = (key) => (options) => ({
  type: UPDATE_OPTIONS,
  key,
  options
})
export const loadMore = (key) => (count = 15) => ({type: LOAD_MORE, key, count})
export const request = (key) => ({type: REQUEST, key})
export const success = (key, data, pagination) => ({
  type: SUCCESS,
  key,
  data,
  pagination
})
export const failure = (key, error) => ({type: FAILURE, key, error})

function listingsFeed(state = {}, action) {
  switch (action.type) {
    case UPDATE_OPTIONS:
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      return update(state, {
        [action.key]: {$set: listingsFeed.node(state[action.key], action)}
      })
    default:
      return state
  }
}

const initialState = {
  loading: false,
  error: null,
  options: {},
  pagination: {},
  pages: []
}

listingsFeed.node = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OPTIONS:
      return {...initialState, options: action.options}
    case REQUEST:
      return update(state, {
        $merge: {
          loading: true,
          error: null
        }
      })
    case SUCCESS:
      return update(state, {
        $merge: {
          loading: false,
          error: undefined,
          pagination: action.pagination
        },
        pages: {$push: _.map(action.data, 'id')}
      })
    case FAILURE:
      return update(state, {
        $merge: {
          loading: false,
          error: action.error
        }
      })
    default:
      return state
  }
}

export default listingsFeed
