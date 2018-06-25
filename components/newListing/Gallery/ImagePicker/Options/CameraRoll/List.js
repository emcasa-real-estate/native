import {PureComponent} from 'react'
import {View, TouchableOpacity, Image, Modal, PureComponent} from 'react-native'

import Icon from '@/components/shared/Icon'
import styles from './styles'

export default class CameraRollList extends PureComponent {
  static defaultProps = {
    rowLength: 3
  }

  get cellSize() {
    const {layout} = this.state
    if (!layout) return undefined
    return layout.width / 5
  }

  onOpenModal = () => this.setState({showModal: true})

  onCloseModal = () => this.setState({showModal: false})

  renderImage = ({uri}) => {
    const size = this.cellSize
    return (
      <Image key={uri} source={{uri}} style={{width: size, height: size}} />
    )
  }

  render() {
    const {images, showModal} = this.state
    const size = this.cellSize

    return (
      <View style={[styles.container, {height: size}]} onLayout={this.onLayout}>
        {images.slice(0, 4).map(this.renderImage)}
        <TouchableOpacity onPress={this.onOpenModal}>
          <View style={[styles.button, {height: size, width: size}]}>
            <Icon name="plus" />
          </View>
        </TouchableOpacity>
        <Modal visible={showModal} onRequestClose={this.onCloseModal}>
          <View style={{flex: 1, backgroundColor: 'red'}} />
        </Modal>
      </View>
    )
  }
}
