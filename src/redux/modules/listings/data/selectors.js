import {createSelector} from 'reselect'

export const getListings = (state) => state.listings.data

export const getListing = createSelector(
  getListings,
  (_, {id}) => id,
  (listings, id) => listings[id] || {}
)

export const getData = createSelector(getListing, (listing) => listing.data)

export const getError = createSelector(getListing, (listing) => listing.error)

export const isLoading = createSelector(getListing, (listing) =>
  Boolean(listing.loading)
)
