import {Component} from 'react'
import {View} from 'react-native'

import Form from '@/components/shared/Form/Form'
import TextInput from '@/components/shared/Form/TextInput'
import AutoComplete from './AutoComplete'
import styles from './styles'

export default class ListingAddressForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form label="Próximo" {...this.props}>
          <View style={{zIndex: 1}}>
            <AutoComplete name="address" placeholder="Endereço" />
          </View>
          <TextInput
            name="complement"
            keyboardType={
              process.env.NODE_ENV === 'e2e'
                ? 'numbers-and-punctuation'
                : 'default'
            }
            placeholder="Complemento"
          />
        </Form>
      </View>
    )
  }
}
