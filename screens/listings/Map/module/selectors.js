import {createSelector} from 'reselect'

export const getMapScreen = (state) => state.screens.listings.Map

export const getUserPosition = createSelector(
  getMapScreen,
  (screen) => screen.lastUserPosition
)

export const isWatchingPosition = createSelector(
  getMapScreen,
  (screen) => screen.watching
)

export const getActiveListing = createSelector(
  getMapScreen,
  (screen) => screen.activeId
)
