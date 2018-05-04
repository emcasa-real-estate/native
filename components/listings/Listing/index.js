import {Component} from 'react'
import {View} from 'react-native'

import Modal from '@/components/shared/Modal'
import Map from '../Map'
import Gallery from '../Gallery'
import Matterport from '../Matterport'
import Description from './Description'
import Properties from './Properties'
import Thumbnail from './Thumbnail'
import styles, {modalStyles} from './styles'

export default class ListingView extends Component {
  state = {
    view: undefined
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
    const {active, address} = this.props
    const {view} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Thumbnail onOpen={this.onOpen} {...this.props} />
          <Properties {...this.props} />
        </View>
        <Description {...this.props} />
        {active && <Map zoom="close" style={styles.map} {...address} />}
        <Modal
          contrast
          overlay
          styles={view === 'matterport' && modalStyles}
          visible={Boolean(view)}
          onDismiss={this.onClose}
        >
          {this.renderModal()}
        </Modal>
      </View>
    )
  }
}
