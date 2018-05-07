import React, {PureComponent} from 'react'
import {View} from 'react-native'
import Dropdown from 'react-native-modal-dropdown'

import {field} from '../Field'
import $styles from './styles'

const StyledDropdown = $styles.inject()(
  ({styles, width, dropdownRef, ...props}) => (
    <Dropdown
      ref={dropdownRef}
      style={[styles.container, {width}]}
      textStyle={styles.text}
      dropdownStyle={[styles.dropdown, {width}]}
      {...props}
    />
  )
)

@field()
export default class FormDropdown extends PureComponent {
  static defaultProps = {
    width: null
  }

  state = {
    width: null
  }

  dropdown = React.createRef()

  static getDerivedStateFromProps({width}) {
    if (width) return {width}
    return null
  }

  componentDidUpdate(prev) {
    const {value} = this.props
    if (value !== prev.value && this.dropdown.value)
      this.dropdown.value.select(this.selectedId)
  }

  onChange = (i) => this.props.onChange(this.props.options[i].value)

  onLayout = ({nativeEvent: {layout: {width}}}) => this.setState({width})

  get selectedId() {
    const {value, options} = this.props
    if (!value) return null
    return options.findIndex((opt) => opt.value === value)
  }

  get value() {
    return this.props.options[this.selectedId]
  }

  get options() {
    return this.props.options.map((opt) => opt.label)
  }

  render() {
    const {placeholder, value} = this.props
    const {active, width} = this.state

    return (
      <View onLayout={width ? undefined : this.onLayout}>
        <StyledDropdown
          active={active}
          value={value}
          width={width}
          dropdownRef={this.dropdown}
          options={this.options}
          onSelect={this.onChange}
          defaultValue={placeholder}
        />
      </View>
    )
  }
}
