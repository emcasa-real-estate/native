import {graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'
import withNavigation from 'react-navigation/src/views/withNavigation'

import {GET_FAVORITE_LISTINGS} from '@/lib/graphql/queries/favorites'
import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'

function FavoritesFeedApp({navigation, ...props}) {
  return (
    <Feed
      {...props}
      Card={Card}
      onSelect={(id) => navigation.navigate('listing', {id})}
    />
  )
}

export default compose(
  withNavigation,
  connect((state) => ({online: state.network.isConnected})),
  graphql(GET_FAVORITE_LISTINGS, {
    props: ({data}) => ({
      data: data.favoritedListings || [],
      loading: data.loading
    })
  })
)(FavoritesFeedApp)
