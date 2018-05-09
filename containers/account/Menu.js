import {Component} from 'react'
import {connect} from 'react-redux'

import {signOut} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import Menu from '@/components/account/Menu'

@connect(
  (state) => ({
    user: getUser(state)
  }),
  {signOut}
)
export default class ProfileMenuApp extends Component {
  render() {
    const {user, signOut, ...props} = this.props
    return <Menu user={user} onSignOut={signOut} {...props} />
  }
}
