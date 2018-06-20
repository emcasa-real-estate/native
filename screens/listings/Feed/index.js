import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {loadMore} from '@/redux/modules/listings/feed'
import {getListings, isLoading} from '@/redux/modules/listings/feed/selectors'
import MapButton from '@/components/listings/Map/Button'
import ListingFeed from '@/components/listings/Feed/Listing'
import Feed from '@/screens/listings/shared/Feed'
import Card from '@/screens/listings/shared/Card'
import Header from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'
import styles from './styles'

import MapScreen from '@/screens/listings/Map'

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
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
          id: `${componentId}_header`,
          name: Header.screenName,
          passProps: {target: componentId}
        }
      }
    })
  }

  componentDidAppear() {
    const {data, loading, loadMore} = this.props
    if (_.isEmpty(data) && !loading) loadMore(15)
  }

  onOpenMap = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MapScreen.screenName,
        passProps: this.props
      }
    })
  }

  render() {
    const {loading, componentId} = this.props
    return (
      <View style={styles.container}>
        <Feed
          as={ListingFeed}
          target={componentId}
          Card={Card}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={loading ? undefined : ListEmpty}
        />
        <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
      </View>
    )
  }
}
