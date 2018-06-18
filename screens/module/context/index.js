import update from 'immutability-helper'

export const SET_CONTEXT = 'screen/SET_CONTEXT'
export const CLEAR_CONTEXT = 'screen/CLEAR_CONTEXT'

export const setContext = (screen) => (data) => ({
  type: SET_CONTEXT,
  screen,
  data
})

export const clearContext = (screen) => () => ({
  type: CLEAR_CONTEXT,
  screen
})

export default function screenContextReducer(state = {}, action) {
  switch (action.type) {
    case SET_CONTEXT:
    case CLEAR_CONTEXT:
      return update(state, {
        [action.screen]: {
          $set: screenContextReducer.node(state[action.screen], action)
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
      return {}
    default:
      return state
  }
}
