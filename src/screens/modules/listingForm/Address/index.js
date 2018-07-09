import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import withContext from '@/screens/modules/context/withContext'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
import AddressForm from '@/components/newListing/Address'

import EditPropertiesScreen from '@/screens/modules/listingForm/Properties'
import SubmitButtonScreen from '@/screens/modules/listingForm/SubmitButton'

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

  componentWillUnmount() {
    this.props.clearContext()
  }

  componentDidAppear() {
    const {componentId, params} = this.props
    if (!params.id) return
    const passProps = {...params, contextId: componentId}
    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: `${componentId}_submit`,
            passProps,
            component: {
              name: SubmitButtonScreen.screenName,
              passProps
            }
          }
        ]
      }
    })
  }

  onChange = (value) => this.props.setContext({value})

  onSubmit = () => {
    const {componentId, params} = this.props
    if (this.form.current.onValidate())
      Navigation.push(componentId, {
        component: {
          name: EditPropertiesScreen.screenName,
          passProps: {params: {...params, contextId: componentId}}
        }
      })
  }

  render() {
    const {params: {id}, value} = this.props
    if (id && !value.address) return null
    return (
      <Shell testID="@listingForm.Address">
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

export default composeWithRef(withContext.byProp('componentId'))(
  EditAddressScreen
)
