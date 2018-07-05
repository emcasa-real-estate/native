import _ from 'lodash/fp'
import {createSelector} from 'reselect'

export const getAllRelateDListings = (state) => state.relatedListings

export const getRelatedListings = createSelector(
  getAllRelateDListings,
  (_, {id}) => id,
  (listings, id) => listings[id] || []
)

export const getRelatedListingIds = createSelector(
  getRelatedListings,
  _.map('id')
)
