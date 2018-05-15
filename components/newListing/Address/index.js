import {Component} from 'react'
import {View} from 'react-native'

import TextInput from '@/components/shared/TextInput'
import styles from './styles'

export default class ListingAddressForm extends Component {
  state = {
    address: '',
    complement: ''
  }

  onSubmit = (value) => {
    console.log(value)
  }

  onChangeComplement = (value) => this.setState({complement: value})

  onChangeAddress = (value) => {
    const {onChangeAddress} = this.props
    this.setState({address: value})
    if (onChangeAddress) onChangeAddress(value)
  }

  render() {
    const {address, complement} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.field}>
          <TextInput
            placeholder="Endereço"
            value={address}
            onChangeText={this.onChangeAddress}
          />
        </View>
        <View style={styles.field}>
          <TextInput
            placeholder="Complemento"
            value={complement}
            onChangeText={this.onChangeComplement}
          />
        </View>
      </View>
    )
  }
}
