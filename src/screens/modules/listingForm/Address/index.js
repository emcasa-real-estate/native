import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {withApollo} from 'react-apollo'

import composeWithRef from '@/lib/composeWithRef'
import {authRequired} from '@/containers/AuthRequired'
import withContext from '@/screens/modules/context/withContext'
import {GET_USER_LISTING} from '@/graphql/modules/listings/queries'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
import AddressForm from '@/components/newListing/Address'

import EditPropertiesScreen from '@/screens/modules/listingForm/Properties'
import SubmitButtonScreen from '@/screens/modules/listingForm/SubmitButton'

const addressText = ({city, state, street, streetNumber, neighborhood}) => {
  let text = `${street}, ${streetNumber} - `
  if (neighborhood) text += `${neighborhood}, `
  text += `${city} - ${state}`
  return text
}

const addressValue = (address) => ({
  details: address,
  text: {
    street: address.street,
    streetNumber: String(address.streetNumber),
    value: addressText(address)
  }
})

const listingValue = ({address, ...listing}) => ({
  ..._.mapValues(listing, (val) => (val ? String(val) : undefined)),
  address: addressValue(address)
})

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

  async setDefaultValue() {
    const {client, setContext, params: {id}} = this.props
    setContext({loading: true})
    try {
      const {data: {listing}} = await client.query({
        query: GET_USER_LISTING,
        variables: {id}
      })
      setContext({
        value: listingValue(listing),
        error: undefined,
        loading: false
      })
    } catch (error) {
      setContext({error, loading: false})
    }
  }

  validateForm = () => {
    return (
      this.props.validListing !== false &&
      this.form.current &&
      this.form.current.onValidate()
    )
  }

  componentDidMount() {
    const {params: {id}} = this.props
    if (id) this.setDefaultValue()
  }

  componentWillUnmount() {
    this.props.clearContext()
  }

  componentDidAppear() {
    const {componentId, params} = this.props
    if (!params.id) return
    const passProps = {
      params,
      contextId: componentId,
      onValidate: this.validateForm
    }
    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: `${componentId}_submit`,
            passProps,
            component: {name: SubmitButtonScreen.screenName, passProps}
          }
        ]
      }
    })
  }

  onChange = (value) => this.props.setContext({value})

  onValidate = (valid) => this.props.setContext({validAddress: valid})

  onSubmit = () => {
    const {componentId, params} = this.props
    if (this.validateForm())
      Navigation.push(componentId, {
        component: {
          name: EditPropertiesScreen.screenName,
          passProps: {params: {...params, contextId: componentId}}
        }
      })
  }

  render() {
    const {value, loading, params: {id}} = this.props
    return (
      <Shell testID="@listingForm.Address">
        <Progress progress={1 / 3} />
        <Body loading={loading || (id && !value)}>
          <AddressForm
            formRef={this.form}
            value={value}
            onValidate={this.onValidate}
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
  authRequired(() => ({
    notice: 'Você precisa estar logado para anunciar um imóvel.'
  })),
  withContext.byProp('componentId'),
  withApollo
)(EditAddressScreen)
