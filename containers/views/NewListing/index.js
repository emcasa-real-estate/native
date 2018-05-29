import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Address from '@/components/newListing/Address'

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
      <Shell title="Endereço">
        <Address onSubmit={this.onSubmit} />
      </Shell>
    )
  }
}

export const screen = AddressFormScreen
