export const WATCH_POSITION = 'screens/listings.Map/WATCH_POSITION'
export const UNWATCH_POSITION = 'screens/listings.Map/UNWATCH_POSITION'
export const UPDATE_WATCH_ID = 'screens/listings.Map/UPDATE_WATCH_ID'
export const UPDATE_USER_POSITION = 'screens/listings.Map/UPDATE_USER_POSITION'
export const SET_ACTIVE_LISTING = 'screens/listings.Map/SET_ACTIVE_LISTING'

export const watchPosition = () => ({type: WATCH_POSITION})
export const unwatchPosition = () => ({type: UNWATCH_POSITION})
export const updateWatchId = (id) => ({type: UPDATE_WATCH_ID, id})
export const updateUserPosition = (position) => ({
  type: UPDATE_USER_POSITION,
  position
})
export const setActiveListing = (id) => ({type: SET_ACTIVE_LISTING, id})

const initialState = {
  lastUserPosition: undefined,
  activeId: undefined,
  watching: false,
  watchId: undefined
}

export default function listingMapScreenReducer(state = initialState, action) {
  switch (action.type) {
    case WATCH_POSITION:
      return {...state, watching: true}
    case UNWATCH_POSITION:
      return {...state, watching: false}
    case UPDATE_WATCH_ID:
      return {...state, watchId: action.id}
    case UPDATE_USER_POSITION:
      return {...state, lastUserPosition: action.position}
    case SET_ACTIVE_LISTING:
      return {...state, activeId: action.id}
    default:
      return state
  }
}
