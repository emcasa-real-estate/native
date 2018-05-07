import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Calendly from '@/components/interest/Calendly'

export default class CalendlyScreen extends Component {
  onDismiss = () => {
    const {navigation} = this.props
    navigation.goBack(null)
  }

  render() {
    return (
      <Shell footer={null}>
        <Calendly onDismiss={this.onDismiss} />
      </Shell>
    )
  }
}

export const screen = CalendlyScreen
