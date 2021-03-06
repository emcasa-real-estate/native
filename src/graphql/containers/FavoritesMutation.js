import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {FAVORITE, UNFAVORITE} from '@/graphql/modules/listings/mutations'
import {GET_FAVORITE_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {logEvent} from '@/redux/modules/firebase/analytics'
import {withJwt} from './CredentialsQuery'
import {withFavoriteListingByID} from './FavoritesQuery'

const FavoriteMutation = connect(
  null,
  {logEvent}
)(function _FavoritesMutation({children, id, favorite, logEvent}) {
  return (
    <Mutation
      mutation={favorite ? UNFAVORITE : FAVORITE}
      variables={{id}}
      refetchQueries={[{query: GET_FAVORITE_LISTINGS_IDS}]}
      update={() =>
        logEvent(favorite ? 'unfavorite_listing' : 'favorite_listing', {id})
      }
    >
      {children}
    </Mutation>
  )
})

export default FavoriteMutation

export const withFavoriteMutation = (Target) =>
  withFavoriteListingByID((props) => (
    <FavoriteMutation {...props}>
      {(onFavorite) => <Target {...props} onFavorite={() => onFavorite()} />}
    </FavoriteMutation>
  ))
