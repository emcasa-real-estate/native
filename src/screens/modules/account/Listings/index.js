import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withUserListings} from '@/graphql/containers'
import {Shell, Body, Footer} from '@/components/layout'
import BottomTabs from '@/screens/modules/navigation/BottomTabs'
import Feed from '@/components/listings/Feed/UserListing'

import EditListingScreen from '@/screens/modules/listingForm/Address'
import DashboardScreen from '@/screens/modules/listing/Dashboard'
import ListingScreen from '@/screens/modules/listing/Listing'

class UserListingsScreen extends PureComponent {
  static screenName = 'account.Listings'

  static options = {
    topBar: {
      title: {text: 'Meus imóveis'}
    }
  }

  onEditListing = (id) => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        name: EditListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  onViewListingStats = (id) => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        name: DashboardScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  onViewListing = (id) => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
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
            onEdit={this.onEditListing}
            onViewStats={this.onViewListingStats}
            onViewListing={this.onViewListing}
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
