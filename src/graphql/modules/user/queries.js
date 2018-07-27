import _ from 'lodash'
import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_USER_LISTINGS = gql`
  query userListings {
    userProfile {
      listings {
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
      favorites {
        id
      }
    }
  }
`
)

export const GET_FAVORITE_LISTINGS = _.memoize(
  ({cache}) => gql`
  query favoritedListings {
    userProfile ${cache === true ? '@client' : ''} {
      favorites {
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
      blacklists {
        id
      }
    }
  }
`
)

export const GET_BLACKLISTED_LISTINGS = _.memoize(
  ({cache}) => gql`
  query blacklistedListings {
    userProfile ${cache === true ? '@client' : ''} {
      blacklists {
        ...ListingFeed
      }
    }
  }
  ${frag.ListingFeed}
`
)
