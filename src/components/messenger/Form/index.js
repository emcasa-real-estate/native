import {PureComponent} from 'react'
import {View, TouchableHighlight} from 'react-native'

import Icon from '@/components/shared/Icon'
import TextInput from '@/components/shared/TextInput'
import styles, {buttonUnderlayColor, buttonIconColor} from './styles'

export default class MessengerForm extends PureComponent {
  state = {value: ''}

  onChange = (value) => this.setState({value})

  onSubmit = () => this.props.onSubmit(this.state.value)

  render() {
    const {value} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            style={{maxHeight: 160}}
            value={value}
            onChangeText={this.onChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={buttonUnderlayColor}
            onPress={this.onSubmit}
          >
            <Icon name="arrow-right" color={buttonIconColor} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
