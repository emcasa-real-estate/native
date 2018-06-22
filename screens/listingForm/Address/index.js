import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {getData} from '@/redux/modules/listings/data/selectors'
import {setContext, clearContext} from '@/screens/module/context'
import {getContext} from '@/screens/module/context/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
import AddressForm from '@/components/newListing/Address'

import EditPropertiesScreen from '@/screens/listingForm/Properties'

class EditAddressScreen extends PureComponent {
  static defaultProps = {
    params: {},
    value: {}
  }

  static screenName = 'listingForm.EditAddress'

  static options = {
    topBar: {
      title: {text: 'Endereço'}
    }
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
    const {componentId, setContext} = this.props
    Navigation.mergeOptions(componentId, {})
    if (this.props.listing) {
      const {address, complement, ...listing} = listing
      setContext({
        value: {address, complement, ...listing}
      })
    }
  }

  componentWillUnmount() {
    this.props.clearContext()
  }

  onChange = (value) =>
    this.props.setContext({value: {...this.props.value, ...value}})

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
  connect((state, {params = {}}) => ({
    listing: params.id && getData(state, params)
  })),
  connect((state) => getContext(state, {screen: 'edit_listing'}), {
    setContext: setContext('edit_listing'),
    clearContext: clearContext('edit_listing')
  })
)(EditAddressScreen)
