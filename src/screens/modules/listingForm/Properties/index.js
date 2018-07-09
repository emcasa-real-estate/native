import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withListingMutation} from '@/graphql/containers'
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

  state = {
    active: false
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

  createListing = async () => {
    const {value, loading, setContext, submitListing} = this.props
    if (loading) return
    setContext({loading: true})
    try {
      const x = await submitListing({listing: value})
      console.log(x)
      setContext({loading: false})
    } catch (error) {
      setContext({error, loading: false})
    }
  }

  componentDidAppear() {
    const {componentId, params} = this.props
    this.setState({active: true})
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

  componentDidDisappear() {
    this.setState({active: false})
  }

  onChange = (value) => this.props.setContext({value})

  onPressButton = () => {
    const {componentId, params} = this.props
    if (params.id)
      Navigation.push(componentId, {
        component: {
          name: EditGalleryScreen.screenName,
          passProps: {params}
        }
      })
    else if (this.form.current.onValidate()) this.createNewListing()
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
  withListingMutation(({params: {id}}) => ({id})),
  connect((state) => ({user: getUser(state)}), {setStack})
)(EditPropertiesScreen)
