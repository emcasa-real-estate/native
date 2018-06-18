import {PureComponent} from 'react'
import {View, Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {signOut} from '@/redux/modules/auth'
import {withUserListings} from '@/screens/account/shared/UserListingsQuery'
import Menu from '@/components/account/Menu'
import EditProfileScreen from '../EditProfile'
import HeaderScreen from './Header'

@connect(null, {signOut}, null, {withRef: true})
@withUserListings
export default class AccountMenuScreen extends PureComponent {
  static screenName = 'account.Menu'

  static options = {
    topBar: {
      component: {name: HeaderScreen.screenName},
      title: {text: 'Perfil'}
    },
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
      <View style={{marginTop: Platform.OS === 'ios' ? 20 : 0}}>
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
      </View>
    )
  }
}
