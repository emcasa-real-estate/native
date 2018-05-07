import React, {PureComponent} from 'react'
import {View} from 'react-native'
import Dropdown from 'react-native-modal-dropdown'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import {field} from '../Field'
import $styles, {buttonIconColor} from './styles'

const buttonText = ({placeholder, value}) => (value ? value.label : placeholder)

const StyledDropdown = $styles.inject()(
  ({styles, width, dropdownRef, ...props}) => (
    <Dropdown
      ref={dropdownRef}
      style={[styles.container, {width}]}
      dropdownStyle={[styles.dropdown, {width}]}
      renderRow={(value) => (
        <View style={styles.option}>
          <Text
            style={styles.optionText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {value}
          </Text>
        </View>
      )}
      {...props}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
          {buttonText(props)}
        </Text>
        <Icon name="caret-down" type="solid" color={buttonIconColor(props)} />
      </View>
    </Dropdown>
  )
)

@field()
export default class ControlledDropdown extends PureComponent {
  static defaultProps = {
    width: null
  }

  state = {
    active: false,
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

  onToggle = (active) => () => this.setState({active})

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
    const {width} = this.state

    return (
      <View onLayout={width ? undefined : this.onLayout}>
        <StyledDropdown
          {...this.props}
          {...this.state}
          dropdownRef={this.dropdown}
          options={this.options}
          value={this.value}
          onSelect={this.onChange}
          onDropdownWillShow={this.onToggle(true)}
          onDropdownWillHide={this.onToggle(false)}
        />
      </View>
    )
  }
}
