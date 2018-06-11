import update from 'immutability-helper'

export const CREATE = 'gallery/upload/CREATE'
export const REQUEST = 'gallery/upload/REQUEST'
export const SUCCESS = 'gallery/upload/SUCCESS'
export const FAILURE = 'gallery/upload/FAILURE'
export const CANCEL = 'gallery/upload/CANCEL'

export const create = (id, images) => ({type: CREATE, id, images})
export const request = (id, count) => ({type: REQUEST, id, count})
export const success = (id, position, data) => ({
  type: SUCCESS,
  id,
  position,
  data
})
export const failure = (id, position, error) => ({
  type: FAILURE,
  id,
  position,
  error
})

export default function galleryUploads(state = {}, action) {
  switch (action.type) {
    case REQUEST:
    case SUCCESS:
    case FAILURE:
    case CANCEL:
      return update(state, {
        [action.id]: {
          $set: galleryUploads.node(state[action.id], action)
        }
      })
    default:
      return state
  }
}

const initialState = {
  errors: undefined,
  progress: undefined
}

galleryUploads.node = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return update(state, {
        $merge: {
          progress: [0, action.count],
          errors: {}
        }
      })
    case SUCCESS:
      return update(state, {
        progress: {0: {$set: state.progress[0] + 1}}
      })
    case FAILURE:
      return update(state, {
        progress: {0: {$set: state.progress[0] + 1}},
        errors: {$merge: {[action.position]: action.error}}
      })
    case CANCEL:
      return initialState
    default:
      return state
  }
}
