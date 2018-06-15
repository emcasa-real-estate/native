import _ from 'lodash'
import {PureComponent} from 'react'

import Loader from '@/containers/shared/Loader'
import InfiniteScroll from '@/containers/shared/InfiniteScroll'
import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'
import Empty from './Empty'
import Header from './Header'

export default class ListingsFeed extends PureComponent {
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
    return (
      <Loader
        as={InfiniteScroll}
        params={this.params}
        onLoad={this.onLoad}
        {...this.status}
      >
        <Feed
          {...this.status}
          onSelect={this.onSelect}
          Card={Card}
          ListHeaderComponent={Header}
          ListEmptyComponent={this.status.loading ? undefined : Empty}
        />
      </Loader>
    )
  }
}
