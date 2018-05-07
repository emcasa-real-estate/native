import React, {Component} from 'react'
import Dropdown from 'react-native-modal-dropdown'

import {field} from '../Field'

@field()
export default class FormDropdown extends Component {
  dropdown = React.createRef()

  componentDidUpdate(prev) {
    const {value} = this.props
    if (value !== prev.value) this.dropdown.value.select(this.selectedId)
  }

  onChange = (i) => this.props.onChange(this.props.options[i].value)

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
    const {placeholder} = this.props

    return (
      <Dropdown
        ref={this.dropdown}
        options={this.options}
        onSelect={this.onChange}
        defaultValue={placeholder}
      />
    )
  }
}
