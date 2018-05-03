import {Component} from 'react'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import withNavigation from 'react-navigation/src/views/withNavigation'

import {GET_FAVORITE_LISTINGS} from '@/lib/graphql/queries/favorites'
import {getToken} from '@/redux/modules/auth/selectors'
import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'

@withNavigation
@connect((state) => ({
  online: state.network.isConnected,
  jwt: getToken(state)
}))
@graphql(GET_FAVORITE_LISTINGS, {
  fetchPolicy: 'cache-and-network',
  props: ({data}) => ({
    data: data.favoritedListings || [],
    loading: data.loading
  })
})
export default class FavoritesFeedApp extends Component {
  componentDidMount() {
    this.redirectGuests()
  }

  componentDidUpdate() {
    this.redirectGuests()
  }

  redirectGuests() {
    const {jwt, navigation} = this.props
    if (!jwt) navigation.replace('auth')
  }

  render() {
    const {navigation, ...props} = this.props
    return (
      <Feed
        {...props}
        Card={Card}
        onSelect={(id) => navigation.navigate('listing', {id})}
      />
    )
  }
}
