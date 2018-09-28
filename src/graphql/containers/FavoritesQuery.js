import _ from 'lodash'
import {Query} from 'react-apollo'
import {compose, mapProps} from 'recompose'

import {
  GET_FAVORITE_LISTINGS_IDS,
  GET_FAVORITE_LISTINGS
} from '@/graphql/modules/user/queries'

const createFavoritesContainer = (query, getProps) => (Target) => (props) => (
  <Query fetchPolicy="cache-and-network" query={query}>
    {(response) => <Target {...props} {...getProps(response)} />}
  </Query>
)

export const withFavoriteListings = createFavoritesContainer(
  GET_FAVORITE_LISTINGS,
  (response) => ({
    favorites: {
      data: !_.isEmpty(response.data)
        ? response.data.userProfile.favorites
        : [],
      loading: response.loading
    }
  })
)

export const withFavoriteListingIDs = createFavoritesContainer(
  GET_FAVORITE_LISTINGS_IDS,
  (response) => ({
    favorites: {
      data: !_.isEmpty(response.data)
        ? response.data.userProfile.favorites
        : [],
      loading: response.loading
    }
  })
)

export const withFavoriteListingByID = compose(
  withFavoriteListingIDs,
  mapProps(({favorites, ...props}) => ({
    ...props,
    favorite:
      favorites.data &&
      favorites.data.findIndex((fav) => fav.id == props.id) !== -1
  }))
)
