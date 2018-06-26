import {createSelector} from 'reselect'

import {getListings as getListingsData} from '../data/selectors'

export const getRelationships = (state) => state.listings.relations

export const getRelatedListingIds = createSelector(
  getRelationships,
  (_, {id}) => id,
  (listings, id) => listings[id] || []
)

export const getRelatedListings = createSelector(
  getListingsData,
  getRelatedListingIds,
  (listings, ids) => ids.map((id) => listings[id].data)
)
