export const APP_LAUNCHED = 'screens/APP_LAUNCHED'
export const SCREEN_APPEARED = 'screens/SCREEN_APPEARED'
export const SCREEN_DISAPPEARED = 'screens/SCREEN_DISAPPEARED'
export const UPDATE_TAB = 'screens/UPDATE_TAB'
export const SWITCH_TAB = 'screens/SWITCH_TAB'

export const screenAppeared = (id, name) => ({type: SCREEN_APPEARED, id, name})
export const screenDisappeared = (id, name) => ({
  type: SCREEN_DISAPPEARED,
  id,
  name
})
export const updateTab = (tab) => ({type: UPDATE_TAB, tab})
export const switchTab = (tab) => ({type: SWITCH_TAB, tab})

const initialState = {
  tab: undefined,
  screen: {id: undefined, name: undefined}
}

export default function screenReducer(state = initialState, action) {
  switch (action.type) {
    case SCREEN_APPEARED:
      return {
        ...state,
        screen: {id: action.id, name: action.name}
      }
    case UPDATE_TAB:
      return {
        ...state,
        tab: action.tab
      }
    default:
      return state
  }
}
