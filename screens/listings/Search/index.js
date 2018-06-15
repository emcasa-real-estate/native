import _ from 'lodash'
import {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {updateOptions} from '@/redux/modules/listings/feed'
import {getOptions} from '@/redux/modules/listings/feed/selectors'
import Form from '@/components/listings/Search/Form'

@connect(
  (state) => ({
    options: getOptions(state, {type: 'search'})
  }),
  {updateOptions: updateOptions('search')}
)
export default class ListingSearchScreen extends PureComponent {
  static screen = 'listings.Search'

  onChange = (params) => this.props.updateOptions(params)

  onReset = () => this.props.updateOptions({})

  onPressNeighborhoods = () => {
    Navigation.push(this.props.componentId, {
      component: {name: null}
    })
  }

  render() {
    const {options} = this.props

    return <ScrollView style={{flex: 1}} />
  }
}
