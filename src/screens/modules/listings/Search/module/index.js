export const UPDATE_FILTERS = 'screens/listings.Search/UPDATE_FILTERS'
export const CLEAR = 'screens/listings.Search/CLEAR'

export const updateFilters = (filters) => ({type: UPDATE_FILTERS, filters})
export const clear = () => ({type: CLEAR})

const initialState = {
  filters: {}
}

export default function listingsMapScreenReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {...state, filters: action.filters}
    case CLEAR:
      return initialState
    default:
      return state
  }
}
