import {PureComponent} from 'react'
import {View, TouchableOpacity, Image, Modal, CameraRoll} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles from './styles'

const getImage = ({node}) => ({
  type: node.type,
  uri: node.image.uri,
  fileName: node.image.filename,
  width: node.image.width,
  height: node.image.height
})

export default class CameraRollPicker extends PureComponent {
  static defaultProps = {
    rowLength: 5
  }

  state = {
    layout: undefined,
    images: [],
    hasNextPage: true,
    showModal: false
  }

  get cellSize() {
    const {rowLength} = this.props
    const {layout} = this.state
    const cellPadding = 2.5
    if (!layout) return undefined
    return layout.width / rowLength - cellPadding * 2
  }

  async componentDidMount() {
    const {edges, page_info} = await CameraRoll.getPhotos({
      first: this.props.rowLength - 1
    })
    this.setState({
      images: edges.map(getImage),
      hasNextPage: page_info.has_next_page,
      endCursor: page_info.end_cursor
    })
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  onOpenModal = () => this.setState({showModal: true})

  onCloseModal = () => this.setState({showModal: false})

  onSelectImages = (images) =>
    this.props.onPickImage(images.map((index) => this.state.images[index]))

  renderImage = ({uri}, i) => {
    const size = this.cellSize
    return (
      <TouchableOpacity
        key={uri}
        style={styles.cell}
        onPress={() => this.onSelectImages([i])}
      >
        <Image
          source={{uri}}
          style={[styles.image, {width: size, height: size}]}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const {rowLength} = this.props
    const {images, showModal} = this.state
    const size = this.cellSize

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {images.slice(0, rowLength - 1).map(this.renderImage)}
        <TouchableOpacity style={styles.cell} onPress={this.onOpenModal}>
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
