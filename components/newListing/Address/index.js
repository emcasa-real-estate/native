import {Component} from 'react'
import {View} from 'react-native'

import Form from '@/components/shared/Form/Form'
import TextInput from '@/components/shared/Form/TextInput'
import AutoComplete from './AutoComplete'
import styles from './styles'

export default class ListingAddressForm extends Component {
  state = {
    address: {},
    streetNumber: '',
    complement: ''
  }

  onSubmit = (value) =>
    this.props.onSubmit({
      address: `${value.address.street}, ${value.streetNumber} - ${
        value.address.secondaryAddress
      }`,
      complement: value.complement
    })

  onChange = (value) => this.setState(value)

  render() {
    return (
      <View style={styles.container}>
        <Form
          value={this.state}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          label="Próximo"
        >
          <View style={{zIndex: 1}}>
            <AutoComplete name="address" placeholder="Endereço" />
          </View>
          <TextInput name="complement" placeholder="Complemento" />
        </Form>
      </View>
    )
  }
}
