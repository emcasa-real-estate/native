import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {getUser} from '@/redux/modules/auth/selectors'
import {setValue, submit} from '@/screens/modules/listingForm/reducer'
import {getValue, getListing, isLoading} from '@/screens/modules/listingForm/selectors'
import {setStack} from '@/screens/modules/navigation'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
import PropertiesForm from '@/components/newListing/Properties'

import CreatedScreen from '@/screens/modules/listingForm/Created'
import EditGalleryScreen from '@/screens/modules/listingForm/Gallery'
import SubmitButtonScreen from '@/screens/modules/listingForm/SubmitButton'

class EditPropertiesScreen extends PureComponent {
  static defaultProps = {
    params: {}
  }

  static screenName = 'listingForm.EditProperties'

  static options = {
    topBar: {
      title: {text: 'Dados principais'},
      backButtonTitle: ''
    }
  }

  state = {}

  form = React.createRef()

  openSuccessModal() {
    const {componentId, listing, value: {address}} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: CreatedScreen.screenName,
        passProps: {
          params: {listing, address: address.details},
          onDismiss: () => {
            Navigation.dismissModal(`${componentId}_success`)
            this.navigateToListing(listing)
          }
        }
      }
    })
  }

  navigateToListing = ({id}) => {
    const params = {id, editing: true, parent: `new_listing_${id}`}
    this.props.setStack(
      [
        {name: 'account.Menu'},
        {name: 'account.Listings'},
        {name: 'listing.Listing', passProps: {params}, id: params.parent},
        {name: 'listingForm.EditAddress', passProps: {params}},
        {name: 'listingForm.EditProperties', passProps: {params}},
        {name: 'listingForm.EditGallery', passProps: {params}}
      ],
      'account'
    )
  }

  componentDidAppear() {
    const {componentId, params} = this.props
    if (params.id) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          rightButtons: [
            {
              id: `${componentId}_submit`,
              passProps: {params},
              component: {
                name: SubmitButtonScreen.screenName,
                passProps: {params}
              }
            }
          ]
        }
      })
    }
  }

  componentDidUpdate(prev) {
    const {listing, loading, params: {id}} = this.props
    if (!id && !prev.listing && listing && !loading) this.openSuccessModal()
  }

  onChange = (value) => this.props.setValue(value)

  onSubmit = () => {
    const {componentId, params, submit} = this.props
    if (params.id)
      Navigation.push(componentId, {
        component: {
          name: EditGalleryScreen.screenName,
          passProps: {params}
        }
      })
    else if (this.form.current.onValidate()) submit()
  }

  render() {
    const {user, value, loading, params} = this.props
    return (
      <Shell>
        <Progress progress={2 / 3} />
        <Body scroll>
          <PropertiesForm
            formRef={this.form}
            value={value}
            requirePhone={!user.phone}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onSubmit}>
            {params.id ? 'Próximo' : loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      user: getUser(state),
      value: getValue(state),
      loading: isLoading(state),
      listing: getListing(state)
    }),
    {setValue, submit, setStack}
  )
)(EditPropertiesScreen)
