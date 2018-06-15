export const REQUEST_POSITION = 'screens/listings.Map/WATCH_POSITION'
export const WATCH_POSITION = 'screens/listings.Map/WATCH_POSITION'
export const UNWATCH_POSITION = 'screens/listings.Map/UNWATCH_POSITION'
export const UPDATE_POSITION = 'screens/listings.Map/UPDATE_POSITION'
export const SET_ACTIVE_LISTING = 'screens/listings.Map/SET_ACTIVE_LISTING'

export const requestPosition = () => ({type: REQUEST_POSITION})
export const watchPosition = () => ({type: WATCH_POSITION})
export const unwatchPosition = () => ({type: UNWATCH_POSITION})
export const updatePosition = (position) => ({
  type: UPDATE_POSITION,
  position
})
export const setActiveListing = (id) => ({type: SET_ACTIVE_LISTING, id})

const initialState = {
  position: undefined,
  activeId: undefined,
  watching: undefined,
  watchId: undefined
}

export default function listingsMapScreenReducer(state = initialState, action) {
  switch (action.type) {
    case WATCH_POSITION:
      return {...state, watching: true}
    case UNWATCH_POSITION:
      return {...state, watching: false}
    case UPDATE_POSITION:
      return {...state, position: action.position}
    case SET_ACTIVE_LISTING:
      return {...state, activeId: action.id}
    default:
      return state
  }
}
