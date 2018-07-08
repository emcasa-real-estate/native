import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import * as frag from '@/graphql/fragments'
import {withListingMutation, withProfileMutation} from '@/graphql/containers'
import withContext from '@/screens/modules/context/withContext'
import {getUser} from '@/redux/modules/auth/selectors'
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

  form = React.createRef()

  navigateToListing = ({id}) => {
    const params = {
      id,
      editing: true,
      parentId: `new_listing_${id}`,
      contextId: `edit_listing_${id}`
    }
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

  openSuccessModal = (listing) => {
    const {componentId, value: {address}} = this.props
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

  createListing = async () => {
    const {
      value: {address, phone, ...listing},
      loading,
      setContext,
      submitListing,
      editUserProfile
    } = this.props
    if (loading) return
    setContext({loading: true})
    try {
      if (phone) await editUserProfile({variables: {phone}})
      const {data: {insertListing}} = await submitListing({
        variables: {
          listing: frag.ListingInput.parseInput({
            ...listing,
            address: address.details
          })
        }
      })
      this.openSuccessModal(insertListing)
      setContext({error: undefined, loading: false})
    } catch (error) {
      setContext({error, loading: false})
    }
  }

  validateForm = () => {
    return this.props.validAddress !== false && this.form.current.onValidate()
  }

  componentDidUpdate(prev) {
    if (!prev.error && this.props.error && this.form.current)
      this.form.current.onValidate()
  }

  componentDidAppear() {
    const {componentId, params} = this.props
    if (!params.id) return
    this.validateForm()
    const passProps = {params, onValidate: this.validateForm}
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

  onValidate = (valid) => this.props.setContext({validListing: valid})

  onPressButton = () => {
    const {componentId, params} = this.props
    if (params.id)
      Navigation.push(componentId, {
        component: {
          name: EditGalleryScreen.screenName,
          passProps: {params}
        }
      })
    else if (this.validateForm()) this.createListing()
  }

  render() {
    const {user, value, loading, params} = this.props
    return (
      <Shell testID="@listingForm.Properties">
        <Progress progress={2 / 3} />
        <Body scroll testID="scroll_view">
          <PropertiesForm
            formRef={this.form}
            value={value}
            requirePhone={!user.phone}
            onValidate={this.onValidate}
            onChange={this.onChange}
            onSubmit={this.onPressButton}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onPressButton}>
            {params.id ? 'Próximo' : loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  withContext.byProp('params.contextId'),
  withProfileMutation,
  withListingMutation(({params: {id}}) => ({id})),
  connect((state) => ({user: getUser(state)}), {setStack})
)(EditPropertiesScreen)
