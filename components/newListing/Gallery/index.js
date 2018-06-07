import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import SortableList from 'react-native-sortable-list'

import ImagePicker from './ImagePicker'
import Image from './Image'

export default class ListingGallery extends PureComponent {
  state = {
    order: undefined
  }

  static getDerivedStateFromProps(props) {
    return {
      order: _.map(props.images, 'id')
    }
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
    return (
      <SortableList
        style={{flex: 1, display: 'flex'}}
        contentContainerStyle={{padding: 15}}
        data={_.keyBy(this.props.images, 'id')}
        order={this.state.order}
        renderRow={this.renderImage}
        renderFooter={this.renderFooter}
        onChangeOrder={this.onChangeOrder}
        onReleaseRow={this.onReleaseRow}
      />
    )
  }
}
