import {Component} from 'react'
import {NavigationActions} from 'react-navigation'

import {MultiSelectOptions} from '@/components/listings/Search/Field'
import {withNeighborhoods} from '@/containers/neighborhoods/Loader'
import Header from '@/components/listings/Search/Header'
import Shell from '@/containers/shared/Shell'

@withNeighborhoods
export default class NeighborhoodsScreen extends Component {
  onChange = (value) => {
    const {navigation} = this.props
    const {params} = navigation.state
    navigation.setParams({...params, neighborhoods: value})
  }

  onReset = () => this.onChange(undefined)

  onReturn = () => {
    const {navigation} = this.props
    const {parent, ...params} = navigation.state.params
    navigation.dispatch(NavigationActions.setParams({params, key: parent}))
    navigation.goBack()
  }

  get value() {
    const {params} = this.props.navigation.state
    return params ? params.neighborhoods : undefined
  }

  get options() {
    const {neighborhoods} = this.props
    if (!neighborhoods) return []
    return neighborhoods.map((value) => ({label: value, value}))
  }

  render() {
    return (
      <Shell
        scroll
        header={
          <Header
            title="Bairros"
            onReturn={this.onReturn}
            onReset={this.onReset}
          />
        }
      >
        <MultiSelectOptions
          value={this.value}
          options={this.options}
          onChange={this.onChange}
        />
      </Shell>
    )
  }
}

export const screen = NeighborhoodsScreen
