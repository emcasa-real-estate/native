import _ from 'lodash'
import React, {Component} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'

import Text from '@/components/shared/Text'
import {field} from '@/components/shared/Form/Field'
import styles from './styles'

const overlaps = (a, b) =>
  (a[0] <= b[0] && b[0] <= a[1]) ||
  (a[0] <= b[1] && b[1] <= a[1]) ||
  (b[0] < a[0] && a[1] < b[1])

@field()
export default class OptionRangeField extends Component {
  static defaultProps = {
    min: 0,
    options: [],
    value: {min: undefined, max: undefined}
  }

  state = {
    layout: {
      slider: undefined,
      options: []
    },
    sliding: false,
    start: undefined,
    end: undefined,
    value: {}
  }

  parseValue = (value) => Number(value)

  static getDerivedStateFromProps({value}, state) {
    if (!state.sliding) return {value}
    return null
  }

  isActive = (value) => {
    const {min, max} = this.state.value
    return _.inRange(value, min, max + 1)
  }

  updateValue = () => {
    const {options} = this.props
    const {layout, start, end} = this.state
    const [min, max] = layout.options.reduce(([a, b], {x, width}, index) => {
      return overlaps([start, end], [x + 10, x + width - 10])
        ? [a || options[index].value, options[index].value]
        : [a, b]
    }, [])
    if (typeof min === 'undefined' && typeof max === 'undefined') return
    this.setState({value: {min, max}})
  }

  onSlide = ({nativeEvent}) => {
    this.setState(
      ({layout}) => ({end: nativeEvent.pageX - layout.slider.x}),
      this.updateValue
    )
  }

  onResponderGrant = ({nativeEvent}) =>
    this.setState(({layout}) => ({
      sliding: true,
      start: nativeEvent.pageX - layout.slider.x,
      end: undefined
    }))

  onResponderRelease = () => {
    this.setState({sliding: false})
    this.props.onChange(this.state.value)
  }

  onSelect = (value) => () => {
    const {min, max} = this.state.value
    const result = {min, max}
    const isActive = _.inRange(
      value,
      this.props.value.min,
      this.props.value.max + 1
    )
    if (min === value && max === value) return value
    const left = value - min
    const right = max - value
    const key = left < right ? 'min' : 'max'
    const delta = !isActive ? 0 : key === 'min' ? 1 : -1
    result[key] = value + delta
    this.props.onChange(result)
  }

  onSliderLayout = ({nativeEvent: {layout}}) =>
    this.setState((state) => ({
      layout: {...state.layout, slider: layout}
    }))

  onOptionLayout = (index) => ({nativeEvent: {layout}}) => {
    const options = this.state.layout.options.slice()
    options[index] = layout
    this.setState((state) => ({
      layout: {...state.layout, options}
    }))
  }

  renderOption = ({label, value}, index) => {
    const isActive = _.inRange(
      value,
      this.state.value.min,
      this.state.value.max + 1
    )

    return (
      <TouchableOpacity
        key={value}
        onPress={this.onSelect(value)}
        onLayout={this.onOptionLayout(index)}
      >
        <View style={[styles.button, isActive && styles.buttonActive]}>
          <Text
            style={[styles.buttonText, isActive && styles.buttonTextActive]}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {options} = this.props
    return (
      <View style={styles.container}>
        <View
          style={styles.slider}
          onMoveShouldSetResponder={() => true}
          onResponderMove={this.onSlide}
          onResponderGrant={this.onResponderGrant}
          onResponderRelease={this.onResponderRelease}
          onLayout={this.onSliderLayout}
        >
          {options.map(this.renderOption)}
        </View>
      </View>
    )
  }
}
