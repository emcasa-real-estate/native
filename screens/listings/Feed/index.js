import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {loadMore} from '@/redux/modules/listings/feed'
import {
  getListings,
  getPagination,
  isLoading
} from '@/redux/modules/listings/feed/selectors'
import Feed from '@/components/listings/Feed/Listing'
import MapButton from '@/components/listings/Map/Button'
import InfiniteScroll from '@/screens/containers/InfiniteScroll'
import Card from '@/screens/listings/shared/Card'
import Header from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'
import styles from './styles'

import MapScreen from '@/screens/listings/Map'
import ListingScreen from '@/screens/listing/Listing'

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
    pagination: getPagination(state, {type: 'search'}),
    loading: isLoading(state, {type: 'search'})
  }),
  {loadMore: loadMore('search')},
  null,
  {withRef: true}
)
export default class ListingsFeedScreen extends PureComponent {
  static screenName = 'listings.Feed'

  static options = {
    topBar: {
      title: {text: 'Imóveis'}
    },
    bottomTab: {
      title: 'Imóveis'
    }
  }

  componentDidMount() {
    const {componentId} = this.props
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        component: {
          id: `${componentId}.header`,
          name: Header.screenName,
          passProps: {target: componentId}
        }
      }
    })
  }

  componentDidAppear() {
    const {data} = this.props
    if (_.isEmpty(data)) this.onLoadMore()
  }

  onSelect = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {
          params: {id}
        }
      }
    })
  }

  onOpenMap = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MapScreen.screenName,
        passProps: this.props
      }
    })
  }

  onLoadMore = () => {
    const {loading, loadMore} = this.props
    if (!loading) loadMore(15)
  }

  render() {
    const {data, pagination, loading} = this.props
    return (
      <View style={styles.container}>
        <InfiniteScroll
          loading={loading}
          pagination={pagination}
          onLoad={this.onLoadMore}
        >
          <Feed
            data={data}
            loading={loading}
            pagination={pagination}
            onSelect={this.onSelect}
            Card={Card}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={loading ? undefined : ListEmpty}
          />
        </InfiniteScroll>
        <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
      </View>
    )
  }
}
