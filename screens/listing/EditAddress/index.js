import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import AddressForm from '@/components/newListing/Address'

export default class EditAddressScreen extends PureComponent {
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
    if (this.form.current.onValidate())
      Navigation.push(this.props.componentId, {
        component: {
          name: null
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
