import {PureComponent} from 'react'
import {TouchableOpacity, View} from 'react-native'

import Icon from '@/components/shared/Icon'
import {field} from '@/components/shared/Form/Field'
import Text from '@/components/shared/Text'
import Options from './Options'
import Button from './Button'
import styles, {iconColor} from './styles'

class MultiSelectField extends PureComponent {
  static Options = Options

  static defaultProps = {
    value: []
  }

  onSelect = (option) => {
    const {onChange, value} = this.props
    const newValue = Array.from(value)
    const index = this.props.value.findIndex((val) => val === option)
    newValue.splice(index, 1)
    onChange(newValue)
  }

  renderOption = (value) => {
    return (
      <Button key={value} label={value} onPress={() => this.onSelect(value)} />
    )
  }

  render() {
    const {title, value, onPress} = this.props

    return (
      <View>
        {value.length ? (
          <View style={styles.options}>{value.map(this.renderOption)}</View>
        ) : null}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
            <Icon
              name="chevron-right"
              color={iconColor.button}
              stroke={iconColor.button}
              strokeWidth={30}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default field()(MultiSelectField)
