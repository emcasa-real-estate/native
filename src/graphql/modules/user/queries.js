import _ from 'lodash'
import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_USER_LISTINGS = gql`
  query userListings {
    userListings {
      ...UserListing
    }
  }
  ${frag.UserListing}
`

export const GET_FAVORITE_LISTINGS_IDS = _.memoize(
  ({cache}) => gql`
  query favoritedListingsIds {
    favoritedListings ${cache === true ? '@client' : ''} {
      id
    }
  }
`
)

export const GET_FAVORITE_LISTINGS = _.memoize(
  ({cache}) => gql`
  query favoritedListings {
    favoritedListings ${cache === true ? '@client' : ''} {
      ...ListingFeed
    }
  }
  ${frag.ListingFeed}
`
)

export const GET_BLACKLISTED_LISTINGS_IDS = _.memoize(
  ({cache}) => gql`
  query blacklistedListingsIds {
    blacklistedListings ${cache === true ? '@client' : ''} {
      id
    }
  }
  ${frag.ListingFeed}
`
)

export const GET_BLACKLISTED_LISTINGS = _.memoize(
  ({cache}) => gql`
  query blacklistedListings {
    blacklistedListings ${cache === true ? '@client' : ''} {
      ...ListingFeed
    }
  }
  ${frag.ListingFeed}
`
)
