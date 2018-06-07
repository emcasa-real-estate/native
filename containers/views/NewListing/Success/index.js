import {Component} from 'react'

import FormMessage from '@/components/shared/Form/Message'
import Shell from '@/containers/shared/Shell'
import {withNeighborhoods} from '@/containers/neighborhoods/Loader'
import Message from './Message'

@withNeighborhoods
export default class NewListingFormSuccessScreen extends Component {
  onClose = () => {
    const {navigation} = this.props
    navigation.navigate('listings')
  }

  get isValidAddress() {
    const {neighborhoods} = this.props
    const {address} = this.props.navigation.state.params
    return (
      address.state === 'RJ' &&
      neighborhoods.findIndex((value) => value === address.neighborhood) !== -1
    )
  }

  render() {
    return (
      <Shell scroll title="Imóvel cadastrado" testID="@newListing.Success">
        <FormMessage title="Seja bem-vindo à EmCasa" onClose={this.onClose}>
          <Message valid={this.isValidAddress} />
        </FormMessage>
      </Shell>
    )
  }
}

export const screen = NewListingFormSuccessScreen
