import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import FormMessage from '@/components/shared/Form/Message'

export default class InterestFormSuccessScreen extends Component {
  onClose = () => {
    const {navigation} = this.props
    navigation.goBack(null)
  }

  render() {
    return (
      <Shell scroll>
        <FormMessage title="Agente EmCasa Notificado" onClose={this.onClose}>
          Entraremos em contato o mais rápido possível para agendarmos uma
          visita!
        </FormMessage>
      </Shell>
    )
  }
}

export const screen = InterestFormSuccessScreen
