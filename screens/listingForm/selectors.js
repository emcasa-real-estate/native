import _ from 'lodash'
import {createSelector} from 'reselect'

import {getData} from '@/redux/modules/listings/data/selectors'

const compare = (value, source) =>
  _.reduce(
    value,
    (result, val, key) => result && source[_.camelCase(key)] == val,
    true
  )

const compareListings = ({address, ...value}, listing) => {
  return (
    compare(value, listing) &&
    compare(_.omit(address.details, ['lng', 'lat']), listing.address)
  )
}

export const listingFormScreen = (state) => state.screens.listingForm

export const getListing = (state) => listingFormScreen(state).listing

export const getValue = (state) => listingFormScreen(state).value

export const getError = (state) => listingFormScreen(state).error

export const isLoading = (state) => listingFormScreen(state).loading

export const hasUnsavedChanges = createSelector(
  getValue,
  (state) => {
    const listing = getListing(state)
    return listing ? getData(state, listing) : undefined
  },
  (value, listing) => listing && !compareListings(value, listing)
)
