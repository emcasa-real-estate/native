import {Component} from 'react'
import {NavigationActions} from 'react-navigation'

import {MultiSelectOptions} from '@/components/listings/Search/Field'
import {withNeighborhoods} from '@/containers/neighborhoods/Loader'
import Shell, {Footer} from '@/containers/shared/Shell'
import Header from '@/components/shared/Form/SubmitHeader'

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
            buttonText="Limpar"
            onReturn={this.onReturn}
            onSubmit={this.onReset}
          />
        }
        footer={<Footer label="Selecionar" onPress={this.onReturn} />}
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
