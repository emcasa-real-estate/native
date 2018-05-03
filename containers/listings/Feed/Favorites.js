import {Component} from 'react'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import {mapProps} from 'recompose'
import withNavigation from 'react-navigation/src/views/withNavigation'

import {getToken} from '@/redux/modules/auth/selectors'
import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'
import {withFavoriteListings} from '@/containers/listings/FavoritesQuery'

@withNavigation
@connect((state) => ({
  online: state.network.isConnected,
  jwt: getToken(state)
}))
@withFavoriteListings
@mapProps(({favorites, ...props}) => ({
  ...props,
  ...favorites
}))
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
