import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withUserProfile} from '@/graphql/containers'
import Header from '@/components/account/Menu/Header'

class AccountMenuHeader extends PureComponent {
  static screenName = 'account.MenuHeader'

  render() {
    const {user} = this.props
    return <Header user={user} />
  }
}

export default composeWithRef(withUserProfile)(AccountMenuHeader)
