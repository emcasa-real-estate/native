import {Component} from 'react'
import {View} from 'react-native'

import Form from '@/components/shared/Form/Form'
import TextInput from '@/components/shared/Form/TextInput'
import AutoComplete from './AutoComplete'
import styles from './styles'

export default class ListingAddressForm extends Component {
  onSubmit = (value) =>
    this.props.onSubmit({
      address: value.address.details,
      complement: value.complement
    })

  render() {
    return (
      <View style={styles.container}>
        <Form onSubmit={this.onSubmit} label="Próximo">
          <View style={{zIndex: 1}}>
            <AutoComplete name="address" placeholder="Endereço" />
          </View>
          <TextInput name="complement" placeholder="Complemento" />
        </Form>
      </View>
    )
  }
}
