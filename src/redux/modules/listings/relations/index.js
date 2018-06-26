import _ from 'lodash'

export const LOAD = 'listings/related/LOAD'
export const REQUEST = 'listings/related/REQUEST'
export const SUCCESS = 'listings/related/SUCCESS'
export const FAILURE = 'listings/related/FAILURE'

export const load = (id) => ({type: LOAD, id})
export const request = (id) => ({type: REQUEST, id})
export const success = (id, data) => ({type: SUCCESS, id, data})
export const failure = (id, error) => ({type: FAILURE, id, error})

export default function relatedListings(state = {}, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        [action.id]: _.map(action.data, 'id')
      }
    default:
      return state
  }
}
