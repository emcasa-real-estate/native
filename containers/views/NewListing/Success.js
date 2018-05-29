import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import FormMessage from '@/components/shared/Form/Message'

export default class NewListingFormSuccessScreen extends Component {
  onClose = () => {
    const {navigation} = this.props
    navigation.navigate('listings')
  }

  render() {
    return (
      <Shell scroll>
        <FormMessage title="Imóvel adicionado" onClose={this.onClose}>
          Seu imóvel foi adicionado com sucesso.
        </FormMessage>
      </Shell>
    )
  }
}

export const screen = NewListingFormSuccessScreen
