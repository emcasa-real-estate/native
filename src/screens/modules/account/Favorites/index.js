import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withFavoriteListings} from '@/graphql/containers'
import {Shell, Body, Footer} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import BottomTabs from '@/screens/modules/navigation/BottomTabs'
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
      backButtonTitle: 'Favoritos'
    }
  }

  onSwitchView = () => {
    const {componentId, params: {switchViewId}} = this.props
    if (switchViewId) Navigation.popTo(switchViewId)
    else
      Navigation.push(componentId, {
        component: {
          component: 'account.Blacklist',
          passProps: {params: {switchViewId: componentId}}
        }
      })
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
        <Body loading={favorites.loading}>
          <Feed
            data={favorites.data}
            onSelect={this.onSelect}
            ListEmptyComponent={favorites.loading ? undefined : ListEmpty}
          />
        </Body>
        <Footer>
          <BottomTabs />
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(withFavoriteListings)(FavoritesScreen)
