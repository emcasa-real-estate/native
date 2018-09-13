import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {updateStackRoot} from '@/screens/modules/navigation'
import {withUserListings, withSignOutMutation} from '@/graphql/containers'
import {Shell, Body, Header} from '@/components/layout'
import Menu from '@/components/account/Menu'
import AccountHeader from './Header'

import EditProfileScreen from '@/screens/modules/account/EditProfile'
import UserListingsScreen from '@/screens/modules/account/Listings'

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

  onSignOut = async () => {
    const {signOut, updateStackRoot} = this.props
    await signOut()
    updateStackRoot()
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
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {updateStackRoot}
  ),
  withSignOutMutation,
  withUserListings
)(AccountMenuScreen)
