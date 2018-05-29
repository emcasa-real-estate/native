import _ from 'lodash'
import React, {PureComponent} from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

import {GOOGLE_PLACES_API_KEY} from '@/lib/config'

const addressText = ({street, streetNumber, secondaryAddress}) => {
  let text = street
  if (streetNumber) text += ', ' + streetNumber
  if (secondaryAddress) text += ' - ' + secondaryAddress
  return text || ''
}

export default class AutoComplete extends PureComponent {
  static defaultProps = {
    text: '',
    value: {}
  }

  state = {
    selection: {start: 0, end: 0}
  }

  autoComplete = React.createRef()

  get input() {
    return this.autoComplete.current.refs.textInput
  }

  get text() {
    return this.state.text
  }

  updateAddressText() {
    this.setState({
      text: addressText(this.props.value || {})
    })
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
    const autoComplete = this.autoComplete.current
    if (!autoComplete.state.dataSource) return
    const bestMatch = autoComplete.state.dataSource[0]
    this.onChange(bestMatch)
  }

  onChangeText = (text) => this.setState({text})

  onChange = (place) => {
    const {onChange, onChangeComplete} = this.props
    const streetAddress = place.structured_formatting.main_text.split(',')
    const secondaryAddress = place.structured_formatting.secondary_text
    const value = {
      street: streetAddress[0],
      streetNumber: streetAddress[1],
      secondaryAddress
    }
    if (!value.streetNumber) {
      const start = streetAddress[0].length + 2
      requestAnimationFrame(() =>
        this.setState(
          {
            selection: {
              start,
              end: start + 6
            }
          },
          () => {
            requestAnimationFrame(() =>
              this.autoComplete.current.refs.textInput.focus()
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
        autoFillOnNotFound
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
          selection: this.state.selection
        }}
      />
    )
  }
}
