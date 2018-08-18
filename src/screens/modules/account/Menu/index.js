import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {signOut} from '@/redux/modules/auth'
import {withUserListings, withMessengerUnreadCount} from '@/graphql/containers'
import {Shell, Body, Header} from '@/components/layout'
import Menu from '@/components/account/Menu'
import AccountHeader from './Header'

import EditProfileScreen from '@/screens/modules/account/EditProfile'
import UserListingsScreen from '@/screens/modules/account/Listings'
import MessengerChannelsScreen from '@/screens/modules/messenger/Channels'

class AccountMenuScreen extends PureComponent {
  static screenName = 'account.Menu'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      height: 0,
      backButton: {title: 'Perfil'}
    }
  }

  navigateTo = (component) => () => {
    Navigation.push(this.props.componentId, {component})
  }

  onSignOut = () => {
    const {signOut} = this.props
    signOut()
    Navigation.popToRoot(this.props.componentId)
  }

  render() {
    const {userListings, unreadCount} = this.props
    return (
      <Shell>
        <Header>
          <AccountHeader />
        </Header>
        <Body>
          <Menu
            listingsCount={
              !userListings.loading &&
              userListings.data &&
              userListings.data.length
            }
            unreadMessages={unreadCount}
            onSignOut={this.onSignOut}
            onEditProfile={this.navigateTo({
              name: EditProfileScreen.screenName
            })}
            onViewListings={this.navigateTo({
              name: UserListingsScreen.screenName
            })}
            onViewMessenger={this.navigateTo({
              name: MessengerChannelsScreen.screenName
            })}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {signOut}
  ),
  withUserListings,
  withMessengerUnreadCount
)(AccountMenuScreen)
