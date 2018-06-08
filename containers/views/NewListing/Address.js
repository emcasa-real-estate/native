import {Component} from 'react'
import {connect} from 'react-redux'
import {NavigationActions, StackActions} from 'react-navigation'

import {getToken} from '@/redux/modules/auth/selectors'
import Shell from '@/containers/shared/Shell'
import Address from '@/components/newListing/Address'

@connect((state) => ({jwt: getToken(state)}))
export default class AddressFormScreen extends Component {
  onSubmit = (value) => {
    const {navigation} = this.props
    navigation.navigate(
      'properties',
      Object.assign({}, navigation.state.params, value)
    )
  }

  render() {
    return (
      <Shell scroll title="Endereço" testID="@newListing.Address">
        <Address onSubmit={this.onSubmit} />
      </Shell>
    )
  }
}

export const screen = AddressFormScreen
