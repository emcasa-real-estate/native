import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import AddressForm from '@/components/newListing/Address'

import EditPropertiesScreen from '@/screens/listing/EditProperties'

export default class EditAddressScreen extends PureComponent {
  static defaultProps = {
    params: {}
  }

  static screenName = 'listing.EditAddress'

  static options = {
    topBar: {
      title: {text: 'Endereço'}
    }
  }

  state = {
    value: {}
  }

  form = React.createRef()

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {componentId, params} = this.props
    const {value} = this.state
    if (this.form.current.onValidate())
      Navigation.push(componentId, {
        component: {
          name: EditPropertiesScreen.screenName,
          passProps: {
            params: {...params, address: value}
          }
        }
      })
  }

  render() {
    return (
      <Shell>
        <Body>
          <AddressForm
            formRef={this.form}
            value={this.state.value}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button onPress={this.onSubmit}>Próximo</Button>
        </Footer>
      </Shell>
    )
  }
}
