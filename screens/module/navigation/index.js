export const SCREEN_APPEARED = 'screens/SCREEN_APPEARED'
export const SCREEN_DISAPPEARED = 'screens/SCREEN_DISAPPEARED'
export const SWITCH_TAB = 'screens/SWITCH_TAB'

export const screenAppeared = (id, name) => ({type: SCREEN_APPEARED, id, name})
export const screenDisappeared = (id, name) => ({
  type: SCREEN_DISAPPEARED,
  id,
  name
})
export const switchTab = (tab) => ({type: SWITCH_TAB, tab})

const initialState = {
  tab: 'listings_tab',
  screen: {id: undefined, name: undefined}
}

export default function screenReducer(state = initialState, action) {
  switch (action) {
    case SCREEN_APPEARED:
      return {
        ...state,
        screen: {id: action.id, name: action.name}
      }
    case SWITCH_TAB:
      return {
        ...state,
        tab: action.tab
      }
    default:
      return state
  }
}
