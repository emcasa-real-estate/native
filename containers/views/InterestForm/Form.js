import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Form from '@/containers/interest/Form'

export default class InterestFormScreen extends Component {
  onClose = () => {
    const {navigation} = this.props
    navigation.goBack(null)
  }

  onSuccess = () => {
    const {navigation} = this.props
    navigation.navigate('success')
  }

  onOpenCalendly = () => {
    const {navigation} = this.props
    navigation.navigate('calendly')
  }

  render() {
    const {navigation} = this.props

    return (
      <Shell scroll>
        <Form
          id={navigation.state.params.id}
          onSuccess={this.onSuccess}
          onOpenCalendly={this.onOpenCalendly}
        />
      </Shell>
    )
  }
}

export const screen = InterestFormScreen
