import {Component} from 'react'
import {connect} from 'react-redux'

import * as listingsApi from '@/lib/services/listings'
import Shell from '@/containers/shared/Shell'
import Properties from '@/components/newListing/Properties'
import {withProfileMutation} from '@/containers/account/ProfileMutation'
import {getToken, getData} from '@/redux/modules/auth/selectors'

@connect((state) => ({
  jwt: getToken(state),
  user: getData(state)
}))
@withProfileMutation
export default class PropertiesFormScreen extends Component {
  static defaultProps = {
    user: {}
  }

  state = {
    loading: false
  }

  onSubmit = async (value) => {
    const {navigation, editUserProfile, jwt} = this.props
    const {params} = navigation.state
    const listing = {
      ...value,
      price: 0,
      complement: params.complement
    }
    const address = params.address
    this.setState({loading: true})
    try {
      if (value.phone) editUserProfile({variables: {phone: value.phone}})
      const response = await listingsApi.create({listing, address}, {jwt})
      this.setState({loading: false})
      navigation.navigate('success', {listing: response.listing, address})
    } catch (error) {
      this.setState({errors: error.errors, loading: false})
    }
  }

  render() {
    const {loading} = this.state
    const {user} = this.props

    return (
      <Shell scroll title="Dados principais">
        <Properties
          requirePhone={!user.phone}
          onSubmit={this.onSubmit}
          loading={loading}
        />
      </Shell>
    )
  }
}

export const screen = PropertiesFormScreen
