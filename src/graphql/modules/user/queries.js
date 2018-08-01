import _ from 'lodash'
import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_USER_LISTINGS = gql`
  query userListings {
    userProfile {
      listings(
        filters: {}
        pagination: {excludedListingIds: [], pageSize: 1000}
      ) {
        ...UserListing
      }
    }
  }
  ${frag.UserListing}
`

export const GET_FAVORITE_LISTINGS_IDS = _.memoize(
  ({cache}) => gql`
    query favoritedListingsIds {
      userProfile ${cache === true ? '@client' : ''} {
        favorites(
          filters: {}
          pagination: {excludedListingIds: [], pageSize: 1000}
        ) {
          id
        }
      }
    }
  `
)

export const GET_FAVORITE_LISTINGS = _.memoize(
  ({cache}) => gql`
    query favoritedListings(
      $excludedListingIds: [ID] = []
      $filters: ListingFilter = {}
      $pageSize: Int = 1000
    ) {
      userProfile ${cache === true ? '@client' : ''} {
        favorites(
          filters: $filters
          pagination: {excludedListingIds: $excludedListingIds, pageSize: $pageSize}
        ) {
          ...ListingFeed
        }
      }
    }
    ${frag.ListingFeed}
  `
)

export const GET_BLACKLISTED_LISTINGS_IDS = _.memoize(
  ({cache}) => gql`
    query blacklistedListingsIds {
      userProfile ${cache === true ? '@client' : ''} {
        blacklists(
          filters: {}
          pagination: {excludedListingIds: [], pageSize: 1000}
        ) {
          id
        }
      }
    }
  `
)

export const GET_BLACKLISTED_LISTINGS = _.memoize(
  ({cache}) => gql`
    query blacklistedListings(
      $excludedListingIds: [ID] = []
      $filters: ListingFilter = {}
      $pageSize: Int = 1000
    ) {
      userProfile ${cache === true ? '@client' : ''} {
        blacklists(
          filters: $filters
          pagination: {excludedListingIds: $excludedListingIds, pageSize: $pageSize}
        ) {
          ...ListingFeed
        }
      }
    }
    ${frag.ListingFeed}
  `
)
