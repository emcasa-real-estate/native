import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withFavoriteListings} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import ListEmpty from './ListEmpty'

import ListingScreen from '@/screens/modules/listing/Listing'

class FavoritesScreen extends PureComponent {
  static defaultProps = {
    favorites: {}
  }

  static screenName = 'account.Favorites'

  static options = {
    topBar: {
      title: {text: 'Meus imóveis favoritos'},
      backButton: {title: 'Favoritos'}
    }
  }

  onSelect = (id) =>
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })

  render() {
    const {favorites} = this.props
    return (
      <Shell>
        <Body>
          <Feed
            data={favorites.data}
            loading={favorites.loading}
            onSelect={this.onSelect}
            ListEmptyComponent={favorites.loading ? undefined : ListEmpty}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(withFavoriteListings)(FavoritesScreen)
