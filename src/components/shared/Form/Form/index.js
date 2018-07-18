import {PureComponent} from 'react'
import {View} from 'react-native'

import {form} from './Provider'

export default form(
  class FormView extends PureComponent {
    render() {
      const {children, style} = this.props
      return <View style={style}>{children}</View>
    }
  }
)
