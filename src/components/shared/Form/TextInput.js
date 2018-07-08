import React, {PureComponent} from 'react'

import TextInput from '@/components/shared/TextInput'
import {field} from './Field'

@field()
export default class TextInputField extends PureComponent {
  static defaultProps = {
    value: ''
  }

  input = React.createRef()

  componentDidUpdate(prev) {
    const {focus} = this.props
    const input = this.input.current
    if (focus && !prev.focus && input && !input.isFocused()) input.focus()
  }

  onSubmit = () => {
    const {returnKeyType, nextField, onSubmit, onFocusField} = this.props
    switch (returnKeyType) {
      case 'next':
        onFocusField(nextField)
        break
      case 'done':
        onSubmit()
        break
    }
  }

  render() {
    const {onChange, valid, ...props} = this.props
    return (
      <TextInput
        {...props}
        accessible
        accessibilityLabel={props.placeholder}
        invalid={!valid}
        inputRef={this.input}
        onChangeText={onChange}
        onSubmitEditing={this.onSubmit}
      />
    )
  }
}
