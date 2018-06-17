import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {signOut} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import Menu from '@/components/account/Menu'
import {withUserListings} from '@/screens/account/shared/UserListingsQuery'

@connect(
  (state) => ({
    user: getUser(state)
  }),
  {signOut},
  null,
  {withRef: true}
)
@withUserListings
export default class AccountMenuScreen extends PureComponent {
  static screenName = 'account.Menu'

  static options = {
    bottomTabs: {
      visible: true
    },
    bottomTab: {
      title: 'Perfil'
    }
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        visible: true
      }
    })
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
      <View>
        <Menu
          listingsCount={!userListings.loading && userListings.data.length}
          onSignOut={this.onSignOut}
          onEditProfile={this.navigateTo({
            id: 'edit_profile',
            name: null
          })}
          onViewListings={this.navigateTo({
            id: 'user_listings',
            name: null
          })}
        />
      </View>
    )
  }
}
