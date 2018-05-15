import _ from 'lodash'
import {Component} from 'react'

import Address from '@/components/newListing/Address'
import * as maps from '@/lib/services/maps'

export default class AddressFormApp extends Component {
  state = {
    autoComplete: [],
    loading: false
  }

  onUpdate = _.debounce(async (value) => {
    if (this.state.loading) return
    this.setState({loading: true})
    try {
      const {json} = await maps.autoComplete(value)
      this.setState({autoComplete: json.predictions})
    } catch (error) {
      console.warn(error)
    }
    this.setState({loading: false})
  }, 100)

  render() {
    return <Address onChangeAddress={this.onUpdate} />
  }
}
