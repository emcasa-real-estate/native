import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Properties from '@/components/newListing/Properties'

export default class PropertiesFormScreen extends Component {
  onSubmit = (value) => {
    const {navigation} = this.props
    navigation.navigate(
      'gallery',
      Object.assign({}, navigation.state.params, value)
    )
  }

  render() {
    return (
      <Shell scroll title="Dados principais">
        <Properties onSubmit={this.onSubmit} />
      </Shell>
    )
  }
}

export const screen = PropertiesFormScreen
