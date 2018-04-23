import _ from 'lodash'
import {Component} from 'react'
import {NavigationActions} from 'react-navigation'

import Shell from '@/containers/shared/Shell'
import Form from '@/components/listings/Search/Form'
import Header from '@/components/listings/Search/Header'

export default class SearchFormScreen extends Component {
  onChange = (params) => {
    const {navigation} = this.props
    navigation.setParams(params)
  }

  onReset = () => {
    const {navigation} = this.props
    const {params} = this.props.navigation.state
    navigation.setParams({
      ..._.mapValues(params, () => undefined),
      parent: params.parent
    })
  }

  onReturn = () => {
    const {navigation} = this.props
    const {parent, ...params} = navigation.state.params
    navigation.dispatch(NavigationActions.setParams({params, key: parent}))
    navigation.goBack(null)
  }

  onPressNeighborhoods = () => {
    const {navigation} = this.props
    const {params, key} = navigation.state
    navigation.navigate('neighborhoods', {...params, parent: key})
  }

  render() {
    const {params} = this.props.navigation.state

    return (
      <Shell
        scroll
        header={
          <Header
            title="Filtrar busca"
            onReturn={this.onReturn}
            onReset={this.onReset}
          />
        }
      >
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
