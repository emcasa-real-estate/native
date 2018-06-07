import _ from 'lodash'
import {PureComponent} from 'react'
import SortableList from 'react-native-sortable-list'

import ImagePicker from './ImagePicker'
import Image from './Image'

export default class ListingGallery extends PureComponent {
  state = {}

  static getDerivedStateFromProps({loading, images}, state) {
    if (!state.order || loading !== state.loading)
      return {
        loading,
        data: _.keyBy(_.sortBy(images, 'id'), 'id'),
        order: _.map(images, 'id')
      }
    return null
  }

  onPickImage = (image) => {
    this.props.onUpload([
      {
        image,
        position: 0
      }
    ])
  }

  onDeleteImage = (id) => () => this.props.onDeleteImage(id)

  onChangeOrder = (order) => this.setState({order})

  onReleaseRow = () => {
    this.props.onChangeOrder(
      this.state.order.map((id, position) => ({id, position}))
    )
  }

  getImageByID = (id) => this.props.images.find((image) => image.id == id)

  renderImage = ({key, index}) => {
    const image = this.getImageByID(key)
    return (
      <Image
        key={key}
        index={index}
        onDelete={this.onDeleteImage(image.id)}
        {...image}
      />
    )
  }

  renderFooter = () => {
    const {progress} = this.props
    return <ImagePicker progress={progress} onPickImage={this.onPickImage} />
  }

  render() {
    const {data, order} = this.state
    return (
      <SortableList
        style={{flex: 1, display: 'flex'}}
        contentContainerStyle={{padding: 15}}
        data={data}
        order={order}
        renderRow={this.renderImage}
        renderFooter={this.renderFooter}
        onChangeOrder={this.onChangeOrder}
        onReleaseRow={this.onReleaseRow}
      />
    )
  }
}
