import React, {Component} from 'react'
import {View, Dimensions} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import {field} from '@/components/shared/Form/Field'
import Label from './Label'
import styles, {LABEL_WIDTH} from './styles'

const sliderWidth = () => Dimensions.get('window').width - 120

class SlideRangeField extends Component {
  static defaultProps = {
    min: 0,
    value: {},
    renderLabel: (value) => value
  }

  state = {
    width: sliderWidth(),
    position: {
      min: 0,
      max: sliderWidth()
    }
  }

  slider = React.createRef()

  parseValue = (value) => Number(value)

  updateLayout = () => {
    const slider = this.slider.current
    this.setState({
      position: {
        min: slider.state.positionOne,
        max: slider.state.positionTwo
      }
    })
  }

  get range() {
    const {min, max} = this.props
    return max - min
  }

  get displayValue() {
    const {min, max, value} = this.props
    return {
      min: value.min || min,
      max: value.max || max
    }
  }

  get labelOverlap() {
    const {position} = this.state
    const distance = position.max - position.min - LABEL_WIDTH
    return distance < 1 ? Math.abs(distance) : 0
  }

  componentDidMount() {
    this.updateLayout()
  }

  onChangeSlider = ([min, max]) => {
    this.props.onChange({min, max})
    this.updateLayout()
  }

  renderMarker = () => {
    return (
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
      </View>
    )
  }

  renderLabel = (key) => {
    const {renderLabel} = this.props
    const overlap = this.labelOverlap
    let position = this.state.position[key]
    const value = this.displayValue[key]
    const delta = key === 'min' ? -1 : 1
    if (overlap) position += (overlap / 2 + 2) * delta
    return (
      <Label style={{left: position}} tipOffset={-overlap / 2 * delta}>
        {renderLabel(value, key)}
      </Label>
    )
  }

  renderSlider() {
    const {min, max, step, snapped} = this.props
    const value = this.displayValue
    return (
      <MultiSlider
        ref={this.slider}
        snapped={snapped}
        values={[value.min, value.max]}
        min={min}
        max={max}
        step={step}
        sliderLength={this.state.width}
        onValuesChange={this.onChangeSlider}
        customMarker={this.renderMarker}
        containerStyle={styles.slider}
        trackStyle={styles.track}
        selectedStyle={styles.trackActive}
        unselectedStyle={styles.trackInactive}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          {this.renderLabel('min')}
          {this.renderLabel('max')}
        </View>
        <View style={styles.body}>{this.renderSlider()}</View>
      </View>
    )
  }
}

export default field()(SlideRangeField)
