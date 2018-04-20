import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Screen from '@/components/listings/Search/Screen'
import Header from './Header'

export default class SearchScreenApp extends Component {
  onSubmit = () => {
    const {navigation} = this.props
    navigation.navigate('results', navigation.state.params)
  }

  render() {
    return (
      <Shell header={<Header />}>
        <Screen {...this.props} onSubmit={this.onSubmit} />
      </Shell>
    )
  }
}
