import {PureComponent} from 'react'

import {Shell, Body} from '@/components/layout'
import Calendly from '@/components/interest/Calendly'

export default class CalendlyScreen extends PureComponent {
  static screenName = 'interest.Calendly'

  static options = {
    topBar: {
      title: {text: 'Agendamento online'}
    },
    bottomTabs: {
      visible: false,
      animated: false
    }
  }

  render() {
    return (
      <Shell>
        <Body>
          <Calendly />
        </Body>
      </Shell>
    )
  }
}
