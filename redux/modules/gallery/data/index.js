import update from 'immutability-helper'

export const CREATE = 'gallery/data/CREATE'
export const REQUEST = 'gallery/data/REQUEST'
export const SUCCESS = 'gallery/data/SUCCESS'
export const FAILURE = 'gallery/data/FAILURE'

export const request = (id) => ({type: REQUEST, id})
export const success = (id, data) => ({type: SUCCESS, id, data})
export const failure = (id, error) => ({type: FAILURE, id, error})

export default function galleryData(state = {}, action) {
  switch (action.type) {
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      return update(state, {
        [action.id]: {$set: galleryData.node(state[action.id], action)}
      })
    default:
      return state
  }
}

const initialState = {
  loading: false,
  error: undefined,
  data: []
}

galleryData.node = (state = initialState, action) => {
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
    default:
      return state
  }
}
