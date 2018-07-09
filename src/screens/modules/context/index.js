import update from 'immutability-helper'

export const SET_CONTEXT = 'screens/SET_CONTEXT'
export const CLEAR_CONTEXT = 'screens/CLEAR_CONTEXT'

export const setContext = (key) => (data) => ({
  type: SET_CONTEXT,
  key,
  data
})

export const clearContext = (key) => () => ({
  type: CLEAR_CONTEXT,
  key
})

export default function screenContextReducer(state = {}, action) {
  switch (action.type) {
    case SET_CONTEXT:
    case CLEAR_CONTEXT:
      return update(state, {
        [action.key]: {
          $set: screenContextReducer.node(state[action.key], action)
        }
      })
    default:
      return state
  }
}

screenContextReducer.node = (state = {}, action) => {
  switch (action.type) {
    case SET_CONTEXT:
      return {
        ...state,
        ...action.data
      }
    case CLEAR_CONTEXT:
      return undefined
    default:
      return state
  }
}
