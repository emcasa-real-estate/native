import React, {Fragment, PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import * as listingsApi from '@/lib/services/listings'
import {
  withUserListings,
  withProfileMutation
} from '@/graphql/modules/user/containers'
import {getToken, getData} from '@/redux/modules/auth/selectors'
import {setListing, setValue} from '@/screens/listingForm/reducer'
import {getValue} from '@/screens/listingForm/selectors'
import {setStack} from '@/screens/module/navigation'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Progress from '@/components/shared/Progress'
import PropertiesForm from '@/components/newListing/Properties'

import CreatedScreen from '@/screens/listingForm/Created'

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

  get value() {
    const {value: {address, ...listing}} = this.props
    return {
      address: address.details,
      listing
    }
  }

  navigateToListing = ({id}) => {
    this.props.setStack([
      {name: 'account.Menu'},
      {name: 'account.Listings'},
      {name: 'listing.Listing', passProps: {params: {id, editing: true}}}
    ])
  }

  openSuccessModal({listing, address}) {
    const {componentId} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: CreatedScreen.screenName,
        passProps: {
          params: {listing, address},
          onDismiss: () => {
            Navigation.dismissModal(`${componentId}_success`)
            this.navigateToListing(listing)
          }
        }
      }
    })
  }

  onChange = (value) => this.props.setValue(value)

  onSubmit = async () => {
    const {
      editUserProfile,
      userListings,
      setListing,
      jwt,
      value: {phone}
    } = this.props
    const {listing, address} = this.value
    if (!this.form.current.onValidate()) return
    this.setState({loading: true})
    try {
      if (phone) editUserProfile({variables: {phone}})
      const response = await listingsApi.create({listing, address}, {jwt})
      userListings.refetch()
      this.setState({loading: false})
      setListing(response.listing)
      this.openSuccessModal({listing: response.listing, address})
    } catch (error) {
      this.setState({errors: error.errors, loading: false})
    }
  }

  render() {
    const {user, value} = this.props
    const {loading} = this.state
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
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      jwt: getToken(state),
      user: getData(state),
      value: getValue(state)
    }),
    {setListing, setValue, setStack}
  ),
  withProfileMutation,
  withUserListings
)(EditPropertiesScreen)
