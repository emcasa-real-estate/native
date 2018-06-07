import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Menu from '@/containers/account/Menu'
import {withUserListings} from '@/containers/account/UserListingsQuery'

@withUserListings
export default class AccountMenuScreen extends Component {
  navigateTo = (screen) => () => this.props.navigation.navigate(screen)

  render() {
    const {userListings} = this.props
    return (
      <Shell scroll>
        <Menu
          listingsCount={!userListings.loading && userListings.data.length}
          onEditProfile={this.navigateTo('editProfile')}
          onViewListings={this.navigateTo('userListings')}
        />
      </Shell>
    )
  }
}

export const screen = AccountMenuScreen
