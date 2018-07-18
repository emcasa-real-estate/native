import _ from 'lodash'
import {PureComponent} from 'react'
import {View, TouchableOpacity} from 'react-native'

import {field} from '@/components/shared/Form/Field'
import Text from '@/components/shared/Text'
import styles from './styles'

class ListingTypeField extends PureComponent {
  static defaultProps = {
    value: ['Casa', 'Apartamento', 'Cobertura'],
    options: ['Casa', 'Apartamento', 'Cobertura']
  }

  onSelect = (value) => () =>
    this.props.onChange(this.props.value.concat(value))

  onDeselect = (value) => () =>
    this.props.onChange(_.without(this.props.value, value))

  renderOption = (value) => {
    const isActive = _.includes(this.props.value, value)
    return (
      <TouchableOpacity
        key={value}
        style={styles.buttonContainer}
        onPress={isActive ? this.onDeselect(value) : this.onSelect(value)}
      >
        <View style={[styles.button, isActive && styles.buttonActive]}>
          <Text style={[styles.text, isActive && styles.textActive]}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {options} = this.props
    return (
      <View style={styles.container}>{options.map(this.renderOption)}</View>
    )
  }
}

export default field()(ListingTypeField)
