import {Component} from 'react'
import {connect} from 'react-redux'
import withNavigation from 'react-navigation/src/views/withNavigation'

import {signOut} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import Menu from '@/components/account/Menu'

@withNavigation
@connect(
  (state) => ({
    user: getUser(state)
  }),
  {signOut}
)
export default class ProfileMenuApp extends Component {
  onSignOut = () => {
    const {signOut, navigation} = this.props
    navigation.goBack(null)
    signOut()
  }

  render() {
    const {user, ...props} = this.props
    return <Menu user={user} onSignOut={this.onSignOut} {...props} />
  }
}
