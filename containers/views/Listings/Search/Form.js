import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Form from '@/components/listings/Search/Form'

export default class SearchFormScreen extends Component {
  onChange = (params) => {
    const {navigation} = this.props
    navigation.setParams(params)
  }

  onPressNeighborhoods = () => {
    const {navigation} = this.props
    const {params, key} = navigation.state
    navigation.navigate('neighborhoods', {...params, parent: key})
  }

  render() {
    const {params} = this.props.navigation.state

    return (
      <Shell scroll>
        <Form
          onChange={this.onChange}
          onPressNeighborhoods={this.onPressNeighborhoods}
          value={params}
        />
      </Shell>
    )
  }
}

export const screen = SearchFormScreen
