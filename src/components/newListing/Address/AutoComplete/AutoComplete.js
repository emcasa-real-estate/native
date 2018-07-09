import _ from 'lodash'
import React, {PureComponent} from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

import {gray} from '@/assets/colors'
import {GOOGLE_PLACES_API_KEY} from '@/lib/config'

const filterComponent = (place, property) => {
  const component = place.address_components.find((val) =>
    val.types.includes(property)
  )
  if (component) return component.short_name
}

const parsePlaceText = (place) => {
  const [street, streetNumber] = place.structured_formatting.main_text.split(
    ','
  )
  return {street, streetNumber}
}

const placeDetails = (place, details) => ({
  street: filterComponent(details, 'route'),
  streetNumber:
    filterComponent(details, 'street_number') ||
    parsePlaceText(place).streetNumber,
  postalCode: filterComponent(details, 'postal_code'),
  neighborhood: filterComponent(details, 'sublocality_level_1'),
  state: filterComponent(details, 'administrative_area_level_1'),
  city: filterComponent(details, 'administrative_area_level_2'),
  ...details.geometry.location
})

const addressText = (place) => {
  let {street, streetNumber} = parsePlaceText(place)
  const secondary_address = place.structured_formatting.secondary_text
  streetNumber = (streetNumber || '').trim()
  if (!streetNumber || !isFinite(streetNumber)) streetNumber = 'número'
  let value = street
  if (streetNumber) value += ', ' + streetNumber
  if (secondary_address) value += ' - ' + secondary_address
  return {
    value,
    street,
    streetNumber
  }
}

export default class AutoComplete extends PureComponent {
  static defaultProps = {
    value: {}
  }

  state = {
    text: '',
    active: false,
    selection: {start: 0, end: 0}
  }

  autoComplete = React.createRef()

  request = null

  constructor(props) {
    super(props)
    if (props.value.text) this.state.text = props.value.text.value
  }

  get text() {
    return this.state.text
  }

  get valueText() {
    const text = this.props.value.text
    return text ? text.value : ''
  }

  get dataSource() {
    return this.autoComplete.current.state.dataSource || []
  }

  get isListVisible() {
    return (
      this.autoComplete.current &&
      this.autoComplete.current.state.listViewDisplayed
    )
  }

  focus() {
    this.autoComplete.current.triggerFocus()
  }

  blur() {
    this.autoComplete.current.triggerBlur()
  }

  async awaitRequests() {
    if (this.autoComplete)
      await Promise.all(this.autoComplete.current._requests)
  }

  updateAddressText() {
    this.setState({
      text: this.valueText
    })
  }

  hasAddressChanged() {
    return this.text !== this.valueText
  }

  selectBestMatch() {
    const place = this.dataSource[0]
    if (place) this.autoComplete.current._onPress(place)
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.value, this.props.value) && this.props.value)
      this.updateAddressText()
  }

  onSelectionChange = ({nativeEvent: {selection}}) => this.setState({selection})

  onSubmitEditing = () => {
    if (this.hasAddressChanged()) this.selectBestMatch()
  }

  onBlur = async () => {
    this.setState({active: false})
    if (this.props.textInputProps && this.props.textInputProps.onBlur)
      this.props.textInputProps.onBlur()
    if (this.props.onBlur) this.props.onBlur()
    setTimeout(async () => {
      if (!this.autoComplete.current) return
      await this.awaitRequests()
      if (this.hasAddressChanged()) this.selectBestMatch()
    }, 500)
  }

  onFocus = () => this.setState({active: true})

  onChangeText = (text) => {
    this.setState({text})
    if (!text) this.props.onChange({})
    if (this.props.onChangeText) this.props.onChangeText(text)
  }

  onChange = (place, _details) => {
    const {onChange, onChangeText, onValidate, onChangeComplete} = this.props
    const text = addressText(place)
    const details = placeDetails(place, _details)
    this.setState({text: text.value})
    onChange({text, details}, onValidate)
    if (onChangeText) onChangeText(text.value)
    if (isNaN(text.streetNumber)) {
      const start = text.street.length + 2
      requestAnimationFrame(() =>
        this.setState(
          {
            selection: {
              start,
              end: start + text.streetNumber.length
            }
          },
          () => {
            requestAnimationFrame(() => {
              if (this.autoComplete.current)
                this.autoComplete.current.triggerFocus()
            })
          }
        )
      )
    } else if (onChangeComplete) {
      onChangeComplete({text, details})
    }
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        {...this.props}
        fetchDetails
        suppressDefaultStyles
        testID="address_auto_complete"
        listViewDisplayed={this.state.active}
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
          types: ['address'],
          components: {country: 'BR'}
        }}
        textInputProps={{
          ...(this.props.textInputProps || {}),
          value: this.state.text,
          accessible: true,
          accessibilityLabel: this.props.placeholder + ' autocomplete',
          onSubmitEditing: this.onSubmitEditing,
          onSelectionChange: this.onSelectionChange,
          onChangeText: this.onChangeText,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          selection: this.state.selection,
          placeholderTextColor: gray.light + '90'
        }}
      />
    )
  }
}
