import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {getUser} from '@/redux/modules/auth/selectors'
import Header from '@/components/account/Menu/Header'

@connect((state) => ({user: getUser(state)}), null, null, {withRef: true})
export default class AccountMenuHeader extends PureComponent {
  static screenName = 'account.MenuHeader'

  render() {
    const {user} = this.props
    return <Header user={user} />
  }
}
