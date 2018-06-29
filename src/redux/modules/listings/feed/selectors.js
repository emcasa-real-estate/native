import _ from 'lodash'
import {createSelector} from 'reselect'

import {getListings as getListingsData} from '../data/selectors'

export const getFeedTypes = (state) => state.listings.feed

export const getFeed = createSelector(
  getFeedTypes,
  (_, {type}) => type,
  (feed, type) => feed[type] || {}
)

export const getError = createSelector(getFeed, (feed) => feed.error)

export const getOptions = createSelector(getFeed, (feed) => feed.options)

export const isLoading = createSelector(getFeed, (feed) => feed.loading)

export const getPages = createSelector(getFeed, (feed) => feed.pages || {})

export const getListingIds = createSelector(getPages, (pages) =>
  _.flatten(pages)
)

export const getPagination = createSelector(
  getFeed,
  getListingIds,
  ({pagination}, listings) =>
    _.assign(
      {
        count: listings.length,
        totalCount: listings.length + (pagination && pagination.remainingCount)
      },
      pagination
    )
)

export const getListings = createSelector(
  getListingsData,
  getListingIds,
  (listings, ids) => ids.map((id) => listings[id].data)
)
