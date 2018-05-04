import {Component} from 'react'
import {mapProps} from 'recompose'
import withNavigation from 'react-navigation/src/views/withNavigation'

import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'
import {withFavoriteListings} from '@/containers/listings/FavoritesQuery'

@withNavigation
@withFavoriteListings
@mapProps(({favorites, ...props}) => ({
  ...props,
  ...favorites
}))
export default class FavoritesFeedApp extends Component {
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
