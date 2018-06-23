import {createSelector} from 'reselect'

import {getData} from '@/redux/modules/listings/data/selectors'

export const listingFormScreen = (state) => state.screens.listingForm
export const getListingId = (state) => listingFormScreen(state).listingId
export const getValue = (state) => listingFormScreen(state).value
