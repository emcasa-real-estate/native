import {PureComponent} from 'react'
import {View} from 'react-native'

import SubmitButton from '../SubmitButton'
import {form} from './Provider'
import styles from './styles'

@form
export default class FormView extends PureComponent {
  static defaultProps = {
    label: 'Enviar'
  }

  onSubmit = () => {
    const {onValidate, onSubmit} = this.props
    if (onValidate()) onSubmit(this.props.value)
  }

  render() {
    const {children, label, style, onSubmit, ...props} = this.props
    return (
      <View style={[styles.container].concat(style)}>
        {children}
        {onSubmit && (
          <SubmitButton label={label} onPress={this.onSubmit} {...props} />
        )}
      </View>
    )
  }
}
