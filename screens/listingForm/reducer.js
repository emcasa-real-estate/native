export const SET_VALUE = 'screens/listingForm/SET_VALUE'
export const SET_LISTING = 'screens/listingForm/SET_LISTING'
export const RESET = 'screens/listingForm/RESET'
export const SUBMIT = 'screens/listingForm/SUBMIT'
export const REQUEST = 'screens/listingForm/REQUEST'
export const SUCCESS = 'screens/listingForm/SUCCESS'
export const FAILURE = 'screens/listingForm/FAILURE'

export const setValue = (value) => ({type: SET_VALUE, value})
export const setListing = (listing) => ({type: SET_LISTING, listing})
export const reset = () => ({type: RESET})
export const submit = () => ({type: SUBMIT})
export const request = () => ({type: REQUEST})
export const success = (listing) => ({type: SUCCESS, listing})
export const failure = (error) => ({type: FAILURE, error})

const initialState = {
  listing: undefined,
  loading: false,
  error: undefined,
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
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        ...state,
        error: undefined,
        loading: false,
        listing: action.listing
      }
    case FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case RESET:
      return initialState
    default:
      return state
  }
}
