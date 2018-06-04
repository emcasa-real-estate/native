import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {load} from '@/redux/modules/listings/feed'
import {
  getOptions,
  getPagination
} from '@/redux/modules/listings/feed/selectors'
import {withFeed} from './Feed/FeedLoader'
import Map, {Marker, Aggregator} from '@/components/listings/Map'

@connect(
  (state, props) => ({
    options: getOptions(state, props),
    pagination: getPagination(state, props)
  }),
  {load}
)
@withFeed
export default class MapApp extends PureComponent {
  componentDidMount() {
    const {type, load, options, pagination} = this.props
    if (!pagination.remainingCount) return
    load(type, {
      ...options,
      page_size: pagination.remainingCount
    })
  }

  onSelect = (id) => () => this.props.onSelect(id)

  get data() {
    return this.props.data.map((listing) => ({
      listing,
      location: {
        longitude: listing.address.lng,
        latitude: listing.address.lat
      }
    }))
  }

  renderMarker = ({listing}) => {
    const active = this.props.active === listing.id
    return (
      <Marker
        active={active}
        onPress={this.onSelect(listing.id)}
        key={listing.id}
        style={{zIndex: active ? 2 : 1}}
        zIndex={active ? 2 : 1}
        {...listing}
      />
    )
  }

  render() {
    const {aggregate, ...props} = this.props
    return (
      <Map
        {...props}
        as={Aggregator}
        data={this.data}
        renderMarker={this.renderMarker}
        clusteringEnabled={aggregate}
      />
    )
  }
}
