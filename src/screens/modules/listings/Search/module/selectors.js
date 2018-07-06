import _ from 'lodash/fp'
import {createSelector} from 'reselect'

export const getSearchScreen = (state) => state.screens.listings.Search

export const getSearchFilters = (state) => getSearchScreen(state).filters || {}

const parseRange = (name, {min, max}) => ({
  [`min${_.upperFirst(name)}`]: min,
  [`max${_.upperFirst(name)}`]: max
})

export const getSearchFiltersQuery = createSelector(
  getSearchFilters,
  _.flow(
    ({price, area, rooms, garage_spots, ...filters}) =>
      Object.assign(
        {},
        filters,
        price && parseRange('price', price),
        area && parseRange('area', area),
        rooms && parseRange('rooms', rooms),
        garage_spots && parseRange('garageSpots', garage_spots)
      ),
    _.pickBy(_.identity)
  )
)
