import {PureComponent} from 'react'
import {FlatList} from 'react-native'

import Option from './Option'

const extractKey = ({value}) => value

export default class MultiSelectField extends PureComponent {
  static defaultProps = {
    value: []
  }

  onSelect = (option) => {
    const {onChange} = this.props
    const value = Array.from(this.props.value)
    const index = this.selectedIndex(option)
    if (index === -1) value.push(option)
    else value.splice(index, 1)
    onChange(value)
  }

  selectedIndex(option) {
    return this.props.value.findIndex((val) => val === option)
  }

  renderOption = ({item}) => {
    return (
      <Option
        {...item}
        key={item.value}
        active={this.selectedIndex(item.value) !== -1}
        onPress={() => this.onSelect(item.value)}
      />
    )
  }

  render() {
    const {options} = this.props

    return (
      <FlatList
        data={options}
        renderItem={this.renderOption}
        keyExtractor={extractKey}
      />
    )
  }
}
