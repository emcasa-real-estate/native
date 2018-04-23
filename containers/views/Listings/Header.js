import {Component} from 'react'
import withNavigation from 'react-navigation/src/views/withNavigation'

import Header from '@/components/listings/Search/Results'

@withNavigation
export default class ResultsHeaderApp extends Component {
  onPress = () => {
    const {navigation} = this.props
    navigation.navigate('search')
  }

  render() {
    return <Header onPress={this.onPress} />
  }
}
