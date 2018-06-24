import _ from 'lodash'
import {createSelector} from 'reselect'

import {getData} from '@/redux/modules/listings/data/selectors'

const compareListings = ({address, phone, ...value}, listing) => {
  return _.findIndex(value, (val, key) => listing[key] == val) === -1
}

export const listingFormScreen = (state) => state.screens.listingForm

export const getListing = (state) => listingFormScreen(state).listing

export const getValue = (state) => listingFormScreen(state).value

export const getError = (state) => listingFormScreen(state).error

export const isLoading = (state) => listingFormScreen(state).loading

export const hasUnsavedChanges = createSelector(
  getValue,
  getData,
  compareListings
)
