import _ from 'lodash'
import React, {PureComponent} from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

import {GOOGLE_PLACES_API_KEY} from '@/lib/config'

const addressFromPlace = (place) => {
  let [street, streetNumber] = place.structured_formatting.main_text.split(',')
  const secondaryAddress = place.structured_formatting.secondary_text
  if (!streetNumber || !isFinite(streetNumber)) streetNumber = 'número'
  else streetNumber = parseInt(streetNumber)
  return {
    street,
    streetNumber,
    secondaryAddress
  }
}

const addressText = ({street, streetNumber, secondaryAddress} = {}) => {
  let text = street
  if (streetNumber) text += ', ' + streetNumber
  if (secondaryAddress) text += ' - ' + secondaryAddress
  return text || ''
}

export default class AutoComplete extends PureComponent {
  static defaultProps = {
    value: {}
  }

  state = {
    text: '',
    selection: {start: 0, end: 0}
  }

  autoComplete = React.createRef()

  get text() {
    return this.state.text
  }

  get dataSource() {
    return this.autoComplete.current.state.dataSource || []
  }

  focus() {
    this.autoComplete.current.triggerFocus()
  }

  blur() {
    this.autoComplete.current.triggerBlur()
  }

  updateAddressText() {
    this.setState({
      text: addressText(this.props.value || {})
    })
  }

  hasAddressChanged() {
    return this.state.value !== addressText(this.props.value)
  }

  selectBestMatch() {
    const place = this.dataSource[0]
    if (place) this.onChange(place)
  }

  componentDidMount() {
    this.updateAddressText()
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.value, this.props.value) && this.props.value)
      this.updateAddressText()
  }

  onSelectionChange = ({nativeEvent: {selection}}) => this.setState({selection})

  onSubmitEditing = () => {
    if (this.hasAddressChanged()) this.selectBestMatch()
  }

  onBlur = () => {
    if (this.hasAddressChanged()) this.selectBestMatch()
    if (this.props.textInputProps && this.props.textInputProps.onBlur)
      this.props.textInputProps.onBlur()
  }

  onChangeText = (text) => this.setState({text})

  onChange = (place) => {
    const {onChange, onChangeComplete} = this.props
    const value = addressFromPlace(place)
    if (isNaN(value.streetNumber)) {
      const start = value.street.length + 2
      requestAnimationFrame(() =>
        this.setState(
          {
            selection: {
              start,
              end: start + value.streetNumber.length
            }
          },
          () => {
            requestAnimationFrame(() =>
              this.autoComplete.current.triggerFocus()
            )
          }
        )
      )
      value.streetNumber = 'número'
    } else if (onChangeComplete) {
      onChangeComplete(value)
    }
    this.setState({text: addressText(value)})
    onChange(value)
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        {...this.props}
        text={this.state.text}
        ref={this.autoComplete}
        autoFocus={false}
        horizontal={false}
        enablePoweredByContainer={false}
        minLength={3}
        getDefaultValue={() => ''}
        onPress={this.onChange}
        filterReverseGeocodingByTypes={['geocode', 'street_address']}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'pt-BR',
          types: 'address'
        }}
        textInputProps={{
          ...(this.props.textInputProps || {}),
          onSubmitEditing: this.onSubmitEditing,
          onSelectionChange: this.onSelectionChange,
          onChangeText: this.onChangeText,
          onBlur: this.onBlur,
          selection: this.state.selection
        }}
      />
    )
  }
}
