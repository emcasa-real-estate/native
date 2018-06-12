import {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import {load} from '@/redux/modules/listings/feed'
import {
  getOptions,
  getPagination
} from '@/redux/modules/listings/feed/selectors'
import ListButton from '@/components/listings/Feed/Button'
import Map from './Map'
import Feed from './Feed'
import styles from './styles'

@connect(
  (state) => ({
    pagination: getPagination(state, {type: 'search'}),
    options: getOptions(state, {type: 'search'})
  }),
  {load}
)
export default class MapScreen extends Component {
  state = {active: undefined}

  componentDidMount() {
    const {load, options, pagination} = this.props
    // Load all markers
    if (!pagination.remainingCount) return
    load('search', {
      ...options,
      page_size: pagination.remainingCount
    })
  }

  onSelect = (id) =>
    this.setState(({active}) => ({active: id === active ? null : id}))

  render() {
    const {active} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <ListButton style={styles.button} onPress={this.onReturn} />
          <Map active={active} onSelect={this.onSelect} />
        </View>
        <View style={styles.listings}>
          <Feed active={active} />
        </View>
      </View>
    )
  }
}
