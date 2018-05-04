import {Query} from 'react-apollo'
import {connect} from 'react-redux'

import {
  GET_FAVORITE_LISTINGS_IDS,
  GET_FAVORITE_LISTINGS
} from '@/lib/graphql/queries/favorites'
import {getToken} from '@/redux/modules/auth/selectors'

const props = (state) => ({jwt: getToken(state)})

const FavoritesQuery = connect(props)(({children, jwt, query}) => {
  const options = {cache: !jwt}
  return (
    <Query
      query={query(options)}
      fetchPolicy={jwt ? 'cache-and-network' : 'cache-first'}
    >
      {children}
    </Query>
  )
})

export default FavoritesQuery

export const withFavoriteListings = (Target) => (props) => (
  <FavoritesQuery query={GET_FAVORITE_LISTINGS}>
    {(response) => (
      <Target
        {...props}
        favorites={{
          data: response.data.favoritedListings,
          loading: response.loading
        }}
      />
    )}
  </FavoritesQuery>
)

export const withFavoriteListingIDs = (Target) => (props) => (
  <FavoritesQuery query={GET_FAVORITE_LISTINGS_IDS}>
    {(response) => (
      <Target
        {...props}
        favorites={{
          data: response.data.favoritedListings,
          loading: response.loading
        }}
      />
    )}
  </FavoritesQuery>
)
