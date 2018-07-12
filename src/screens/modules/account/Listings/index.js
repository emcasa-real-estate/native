import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withUserListings} from '@/graphql/containers'
import {Shell, Body, Footer} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import BottomTabs from '@/screens/modules/navigation/BottomTabs'

import ListingScreen from '@/screens/modules/listing/Listing'

class UserListingsScreen extends PureComponent {
  static screenName = 'account.Listings'

  static options = {
    topBar: {
      title: {text: 'Meus imóveis'}
    }
  }

  onSelect = (id) => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id, editing: true}}
      }
    })
  }

  render() {
    const {userListings: {data, loading}} = this.props
    return (
      <Shell>
        <Body>
          <Feed
            data={data}
            loading={loading}
            onSelect={this.onSelect}
            Card={Card}
          />
        </Body>
        <Footer>
          <BottomTabs />
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(withUserListings)(UserListingsScreen)
