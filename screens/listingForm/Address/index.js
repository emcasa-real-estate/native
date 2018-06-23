import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {setValue, setListing, reset} from '@/screens/listingForm/reducer'
import {getValue} from '@/screens/listingForm/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
import AddressForm from '@/components/newListing/Address'

import EditPropertiesScreen from '@/screens/listingForm/Properties'

class EditAddressScreen extends PureComponent {
  static defaultProps = {
    params: {}
  }

  static screenName = 'listingForm.EditAddress'

  static options = {
    topBar: {
      title: {text: 'Endereço'}
    }
  }

  form = React.createRef()

  get value() {
    const {value} = this.props
    return {
      address: value.address.details,
      complement: value.complement
    }
  }

  componentDidMount() {
    const {componentId, setListing, params: {id}} = this.props
    Navigation.mergeOptions(componentId, {})
    if (id) setListing({id})
  }

  componentWillUnmount() {
    this.props.reset()
  }

  onChange = (value) => this.props.setValue(value)

  onSubmit = () => {
    const {componentId, params} = this.props
    if (this.form.current.onValidate())
      Navigation.push(componentId, {
        component: {
          name: EditPropertiesScreen.screenName,
          passProps: {params}
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
            value={this.props.value}
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

export default composeWithRef(
  connect(
    (state) => ({
      value: getValue(state)
    }),
    {setValue, setListing, reset}
  )
)(EditAddressScreen)
