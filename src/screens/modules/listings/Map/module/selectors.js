import geolib from 'geolib'
import {createSelector} from 'reselect'

export const getMapScreen = (state) => state.screens.listings.Map

export const getUserPosition = createSelector(
  getMapScreen,
  (screen) => screen.position
)

export const isWithinBounds = createSelector(getUserPosition, (position) => {
  if (!position) return undefined
  // Vista Chinesa - RJ
  const centerOfRJ = {
    latitude: -22.9730992,
    longitude: -43.2524123
  }
  const distance = 17 * 1000
  return geolib.isPointInCircle(position, centerOfRJ, distance)
})

export const isWatchingPosition = createSelector(
  getMapScreen,
  (screen) => screen.watching
)

export const getActiveListing = createSelector(
  getMapScreen,
  (screen) => screen.activeId
)
