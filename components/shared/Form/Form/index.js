import {PureComponent} from 'react'
import {View} from 'react-native'

import SubmitButton from '../SubmitButton'
import {form} from './Provider'

@form
export default class FormView extends PureComponent {
  static defaultProps = {
    label: 'Enviar'
  }

  render() {
    const {children, label, style, onSubmit, ...props} = this.props
    return (
      <View style={style}>
        {children}
        {onSubmit && (
          <SubmitButton label={label} onPress={onSubmit} {...props} />
        )}
      </View>
    )
  }
}
