import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {signOut} from '@/redux/modules/auth'
import {withUserListings} from '@/graphql/modules/user/containers'
import {Shell, Body, Header, Footer} from '@/components/layout'
import BottomTabs from '@/screens/containers/BottomTabs'
import Menu from '@/components/account/Menu'
import EditProfileScreen from '../EditProfile'
import AccountHeader from './Header'

class AccountMenuScreen extends PureComponent {
  static screenName = 'account.Menu'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      height: 0,
      backButtonTitle: 'Perfil'
    },
    bottomTab: {
      title: 'Perfil'
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
    const {userListings} = this.props
    return (
      <Shell>
        <Header>
          <AccountHeader />
        </Header>
        <Body>
          <Menu
            listingsCount={!userListings.loading && userListings.data.length}
            onSignOut={this.onSignOut}
            onEditProfile={this.navigateTo({
              id: 'edit_profile',
              name: EditProfileScreen.screenName
            })}
            onViewListings={this.navigateTo({
              id: 'user_listings',
              name: null
            })}
          />
        </Body>
        <Footer>
          <BottomTabs />
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(connect(null, {signOut}), withUserListings)(
  AccountMenuScreen
)
