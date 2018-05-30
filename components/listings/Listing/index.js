import {Component} from 'react'
import {View} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Modal from '@/components/shared/Modal'
import Map, {Marker} from '../Map'
import Gallery from '../Gallery'
import Matterport from '../Matterport'
import Description from './Description'
import Properties from './Properties'
import Thumbnail from './Thumbnail'
import styles, {modalStyles, markerStyles, markerColor} from './styles'

export default class ListingView extends Component {
  state = {
    ready: false,
    view: undefined
  }

  componentDidMount() {
    requestAnimationFrame(() => this.setState({ready: true}))
  }

  onOpen = (view) => this.setState({view})

  onClose = () => this.setState({view: undefined})

  renderModal() {
    const {images} = this.props
    const {view} = this.state
    switch (view) {
      case 'gallery':
        return <Gallery>{images}</Gallery>
      case 'matterport':
        return <Matterport code={this.props.matterportCode} />
      default:
        return undefined
    }
  }

  render() {
    const {address} = this.props
    const {view, ready} = this.state
    return (
      <View testID="@listings.Listing" style={styles.container}>
        <View testID="@listings.Listing.header" style={styles.header}>
          <Thumbnail active={ready} onOpen={this.onOpen} {...this.props} />
          <View style={styles.heading}>
            <Text style={styles.h1}>{address.street}</Text>
            <Text style={styles.h2}>{address.neighborhood.toUpperCase()}</Text>
          </View>
          <Properties {...this.props} />
        </View>
        <Description {...this.props} />
        {ready && (
          <View testID="@listings.Listing.map">
            <Map zoom="close" style={styles.map} {...address}>
              <Marker styles={markerStyles} address={address}>
                <Icon name="home" color={markerColor} size={20} />
              </Marker>
            </Map>
          </View>
        )}
        <Modal
          contrast
          overlay
          styles={view === 'matterport' && modalStyles}
          visible={Boolean(view)}
          onDismiss={this.onClose}
        >
          <View testID="@listings.Listing.modal" style={styles.modal}>
            {this.renderModal()}
          </View>
        </Modal>
      </View>
    )
  }
}
