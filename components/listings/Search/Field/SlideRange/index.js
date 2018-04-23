import _ from 'lodash'
import {Component} from 'react'
import {View, Dimensions} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import {field} from '@/components/shared/Form/Field'
import Text from '@/components/shared/Text'
import Label from './Label'
import styles from './styles'

const SLIDER_WIDTH = Dimensions.get('window').width - 120

@field()
export default class SlideRangeField extends Component {
  static defaultProps = {
    min: 0,
    value: {},
    Label
  }

  onChangeSlider = _.debounce(
    ([min, max]) => this.props.onChange({min, max}),
    300
  )

  parseValue = (value) => Number(value)

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

  renderMarker = () => {
    return (
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
      </View>
    )
  }

  renderLabel(type) {
    const {Label} = this.props
    return (
      <View style={styles.label}>
        <Label>{this.displayValue[type]}</Label>
      </View>
    )
  }

  renderSlider() {
    const {min, max, step} = this.props
    const value = this.displayValue
    return (
      <MultiSlider
        values={[value.min, value.max]}
        min={min}
        max={max}
        step={step}
        sliderLength={SLIDER_WIDTH}
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
        <View style={styles.header}>
          {this.renderLabel('min')}
          <Text style={styles.divider}>{String.fromCharCode(0x2500)}</Text>
          {this.renderLabel('max')}
        </View>
        <View style={styles.body}>{this.renderSlider()}</View>
      </View>
    )
  }
}
