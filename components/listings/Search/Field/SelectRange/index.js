import {Component} from 'react'
import {View} from 'react-native'

import {field} from '@/components/shared/Form/Field'
import Button from './Button'
import styles from './styles'

@field()
export default class SelectRangeInput extends Component {
  static defaultProps = {
    value: {}
  }

  onSelect = (option) => {
    const {value, onChange} = this.props
    if (value.min === option) onChange({})
    else onChange({min: option})
  }

  render() {
    const {options, value: {min, max}} = this.props

    return (
      <View style={styles.container}>
        {options.map(({value, label}) => (
          <Button
            key={value}
            label={label}
            active={value === min || value === max}
            onPress={() => this.onSelect(value)}
          />
        ))}
      </View>
    )
  }
}
