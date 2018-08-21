import {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import {field} from '@/components/shared/Form/Field'
import styles, {iconColor} from './styles'

class NumberPicker extends Component {
  static defaultProps = {
    value: 0,
    min: 0
  }

  onChange = (i) => () => {
    const {onChange, max, min} = this.props
    const value = this.value + i
    if (value >= min && !(max || value <= max)) onChange(value)
  }

  get value() {
    return parseInt(this.props.value) || 0
  }

  render() {
    const {label} = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.body}>
          <TouchableOpacity onPress={this.onChange(-1)}>
            <View style={styles.button}>
              <Icon
                name="minus"
                color={iconColor}
                stroke={iconColor}
                strokeWidth={30}
                size={12}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.value}>{this.value}</Text>
          <TouchableOpacity onPress={this.onChange(1)}>
            <View style={styles.button}>
              <Icon
                name="plus"
                color={iconColor}
                stroke={iconColor}
                strokeWidth={30}
                size={12}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default field()(NumberPicker)
