import _ from 'lodash/fp'
import {PureComponent} from 'react'
import {View, TouchableOpacity, Image, Modal, CameraRoll} from 'react-native'

import Icon from '@/components/shared/Icon'
import ListPicker from './Picker'
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
      first: this.props.rowLength
    })
    this.setState({
      images: edges.map(getImage),
      hasNextPage: page_info.has_next_page,
      endCursor: page_info.end_cursor
    })
  }

  onLoadMore = async () => {
    if (!this.state.hasNextPage) return
    const {edges, page_info} = await CameraRoll.getPhotos({
      first: 15,
      after: this.state.endCursor
    })
    this.setState(({images}) => ({
      images: images.concat(edges.map(getImage)),
      hasNextPage: page_info.has_next_page,
      endCursor: page_info.end_cursor
    }))
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  onOpenModal = _.flow(_.once(this.onLoadMore), () =>
    this.setState({showModal: true})
  )

  onCloseModal = () => this.setState({showModal: false})

  onSelectImages = (images) =>
    this.props.onPickImage(images.map((index) => this.state.images[index]))

  renderImage = (index) => {
    const {uri} = this.state.images[index]
    const size = this.cellSize
    return (
      <TouchableOpacity
        key={uri}
        style={styles.cell}
        onPress={() => this.onSelectImages([index])}
      >
        <Image
          source={{uri}}
          style={[styles.image, {width: size, height: size}]}
        />
      </TouchableOpacity>
    )
  }

  renderPlaceholder(index) {
    const size = this.cellSize
    return (
      <View key={`placeholder_${index}`} style={styles.cell}>
        <View style={[styles.button, {width: size, height: size}]}>
          <Icon name="image" />
        </View>
      </View>
    )
  }

  renderImagesRow = _.times(
    (index) =>
      this.state.images[index]
        ? this.renderImage(index)
        : this.renderPlaceholder(index)
  )

  render() {
    const {rowLength} = this.props
    const {images, showModal, hasNextPage} = this.state
    const size = this.cellSize

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {this.renderImagesRow(rowLength - 1)}
        <TouchableOpacity style={styles.cell} onPress={this.onOpenModal}>
          <View style={[styles.button, {height: size, width: size}]}>
            <Icon name="plus" />
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={this.onCloseModal}
        >
          <ListPicker
            images={images}
            onDismiss={this.onCloseModal}
            onSelect={this.onSelectImages}
            onLoadMore={this.onLoadMore}
            hasNextPage={hasNextPage}
          />
        </Modal>
      </View>
    )
  }
}
