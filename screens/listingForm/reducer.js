export const SET_VALUE = 'screens/listingForm/SET_VALUE'
export const SET_LISTING = 'screens/listingForm/SET_LISTING'
export const RESET = 'screens/listingForm/RESET'

export const setValue = (value) => ({type: SET_VALUE, value})
export const setListing = (listing) => ({type: SET_LISTING, listing})
export const reset = () => ({type: RESET})

const initialState = {
  listing: undefined,
  value: {
    price: 0
  }
}

export default function listingFormScreenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      return {
        value: {
          ...state.value,
          ...action.value
        }
      }
    case SET_LISTING:
      return {
        ...state,
        listing: action.listing
      }
    case RESET:
      return initialState
    default:
      return state
  }
}
