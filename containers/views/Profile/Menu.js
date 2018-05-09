import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Menu from '@/containers/account/Menu'

export default class AccountMenuScreen extends Component {
  onEditProfile = () => {
    const {navigation} = this.props
    navigation.navigate('editProfile')
  }

  render() {
    return (
      <Shell scroll title="Editar Perfil">
        <Menu onEditProfile={this.onEditProfile} />
      </Shell>
    )
  }
}

export const screen = AccountMenuScreen
