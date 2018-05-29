import {Component} from 'react'
import {connect} from 'react-redux'

import * as listingsApi from '@/lib/services/listings'
import Shell from '@/containers/shared/Shell'
import Properties from '@/components/newListing/Properties'
import {getToken, getData} from '@/redux/modules/auth/selectors'

@connect((state) => ({
  jwt: getToken(state),
  user: getData(state) || {}
}))
export default class PropertiesFormScreen extends Component {
  state = {
    loading: false
  }

  onSubmit = async (value) => {
    const {navigation, jwt} = this.props
    const {params} = navigation.state
    const listing = {
      ...value,
      complement: params.complement
    }
    const address = params.address
    this.setState({loading: true})
    try {
      const response = await listingsApi.create({listing, address}, {jwt})
      this.setState({loading: false})
      navigation.navigate('success', response.listing)
    } catch (error) {
      this.setState({errors: error.errors, loading: false})
    }
  }

  render() {
    const {loading, user} = this.state

    return (
      <Shell scroll title="Dados principais">
        <Properties
          askForPhone={!user.phone}
          onSubmit={this.onSubmit}
          loading={loading}
        />
      </Shell>
    )
  }
}

export const screen = PropertiesFormScreen
