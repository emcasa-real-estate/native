import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withBlacklistedListings} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import ListEmpty from './ListEmpty'

import ListingScreen from '@/screens/modules/listing/Listing'

class BlacklistScreen extends PureComponent {
  static defaultProps = {
    blacklist: {}
  }

  static screenName = 'account.Blacklist'

  static options = {
    topBar: {
      title: {text: 'Meus imóveis ocultados'},
      backButtonTitle: 'Blacklist'
    }
  }

  onSwitchView = () => {
    const {
      componentId,
      params: {switchViewId}
    } = this.props
    if (switchViewId) Navigation.popTo(switchViewId)
    else
      Navigation.push(componentId, {
        component: {
          component: 'account.Favorites',
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
    const {blacklist} = this.props
    return (
      <Shell>
        <Body loading={blacklist.loading}>
          <Feed
            data={blacklist.data}
            onSelect={this.onSelect}
            ListEmptyComponent={blacklist.loading ? undefined : ListEmpty}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(withBlacklistedListings)(BlacklistScreen)
