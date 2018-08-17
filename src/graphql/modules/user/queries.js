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

export const GET_USER_PROFILE = gql`
  query userProfile {
    userProfile {
      ...UserProfile
    }
  }
  ${frag.UserProfile}
`

export const GET_FAVORITE_LISTINGS_IDS = ({cache}) => gql`
  query favoritedListingsIds {
    favoritedListings ${cache === true ? '@client' : ''} {
      id
    }
  }
`

export const GET_FAVORITE_LISTINGS = ({cache}) => gql`
  query favoritedListings {
    favoritedListings ${cache === true ? '@client' : ''} {
      ...ListingFeed
    }
  }
  ${frag.ListingFeed}
`
