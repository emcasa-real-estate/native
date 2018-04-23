import {Component} from 'react'
import {NavigationActions} from 'react-navigation'

import {MultiSelectOptions} from '@/components/listings/Search/Field'
import {withNeighborhoods} from '@/containers/neighborhoods/Loader'
import Shell from '@/containers/shared/Shell'

@withNeighborhoods
export default class NeighborhoodsScreen extends Component {
  onChange = (value) => {
    const {navigation} = this.props
    const {parent, ...params} = navigation.state.params
    const nextParams = {...params, neighborhoods: value}
    navigation.setParams(nextParams)
    navigation.dispatch(
      NavigationActions.setParams({
        params: nextParams,
        key: parent
      })
    )
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
      <Shell scroll>
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
