import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Form from '@/components/listings/Search/Form'

export default class FormScreen extends Component {
  onChange = (params) => {
    const {navigation} = this.props
    navigation.setParams(params)
  }

  onPressNeighborhoods = () => {
    const {navigation} = this.props
    navigation.navigate('neighborhoods')
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

export const screen = FormScreen