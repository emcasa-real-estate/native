import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
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

  get value() {
    const {value} = this.state
    return {
      address: value.address.details,
      complement: value.complement
    }
  }

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {})
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {componentId, params} = this.props
    const {address, complement} = this.value
    if (this.form.current.onValidate())
      Navigation.push(componentId, {
        component: {
          name: EditPropertiesScreen.screenName,
          passProps: {
            params: {...params, address, complement}
          }
        }
      })
  }

  render() {
    return (
      <Shell>
        <Progress progress={1 / 3} />
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
