import _ from 'lodash'
import {createSelector} from 'reselect'

import {getData} from '@/redux/modules/listings/data/selectors'

const compare = (value, source) =>
  _.findIndex(value, (val, key) => source[key] == val) === -1
const compareListings = ({address, ...value}, listing) => {
  return compare(value, listing) && compare(address, listing.address)
}

export const listingFormScreen = (state) => state.screens.listingForm

export const getListing = (state) => listingFormScreen(state).listing

export const getValue = (state) => listingFormScreen(state).value

export const getError = (state) => listingFormScreen(state).error

export const isLoading = (state) => listingFormScreen(state).loading

export const hasUnsavedChanges = createSelector(
  getValue,
  (state) => getData(state, getListing(state)),
  compareListings
)
