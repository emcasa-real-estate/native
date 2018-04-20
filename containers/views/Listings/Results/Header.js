import {Component} from 'react'

import Header from '@/components/listings/Search/Results'

export default class ResultsHeaderApp extends Component {
  onPress = () => {
    const {navigation} = this.props
    navigation.navigate('search')
  }

  render() {
    return <Header onPress={this.onPress} />
  }
}
