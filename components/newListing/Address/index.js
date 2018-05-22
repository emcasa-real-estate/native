import {Component} from 'react'
import {View} from 'react-native'

import TextInput from '@/components/shared/TextInput'
import SubmitButton from '@/components/shared/Form/SubmitButton'
import AutoComplete from './AutoComplete'
import styles from './styles'

export default class ListingAddressForm extends Component {
  state = {
    address: '',
    complement: ''
  }

  onSubmit = () => this.props.onSubmit(this.state)

  onChangeComplement = (value) => this.setState({complement: value})

  onChangeAddress = (value) => {
    const {onChangeAddress} = this.props
    this.setState({address: value})
    if (onChangeAddress) onChangeAddress(value)
  }

  render() {
    const {address, complement} = this.state
    return (
      <View style={styles.container}>
        <AutoComplete
          placeholder="Endereço"
          value={address}
          onChange={this.onChangeAddress}
        />
        <SubmitButton label="Próximo" onPress={this.onSubmit} />
      </View>
    )
  }
}
