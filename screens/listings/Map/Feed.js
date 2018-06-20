import _ from 'lodash'
import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {load} from '@/redux/modules/listings/feed'
import {
  getListings,
  getPagination,
  isLoading
} from '@/redux/modules/listings/feed/selectors'
import InfiniteScroll from '@/screens/containers/InfiniteScroll'
import Feed from '@/components/listings/Feed/Map'
import Card from '@/screens/listings/shared/Card'

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
    pagination: getPagination(state, {type: 'search'}),
    loading: isLoading(state, {type: '  search'})
  }),
  {load}
)
export default class MapFeed extends PureComponent {
  static defaultProps = {
    length: 15,
    params: {}
  }

  onInitialLoad = () => {
    const {load, data} = this.props
    if (_.isEmpty(data)) load('search', this.params)
    this.onLoad = this.onRequestLoad
  }

  onRequestLoad = () => {
    const {load, loading} = this.props
    if (!loading) load('search', this.params)
  }

  onSelect = (id) => {
    // const {navigation} = this.props
    // navigation.navigate('listing', {id})
  }

  onLoad = this.onInitialLoad

  get params() {
    const {length, params} = this.props
    return {...params, page_size: length}
  }

  get status() {
    return _.pick(this.props, ['data', 'pagination', 'loading'])
  }

  render() {
    return <Feed {...this.status} onSelect={this.onSelect} Card={Card} />
  }
}
