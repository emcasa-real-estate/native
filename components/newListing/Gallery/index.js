import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import SortableList from 'react-native-sortable-list'

import ImagePicker from './ImagePicker'
import Image from './Image'

export default class ListingGallery extends PureComponent {
  onPickImage = (image) => {
    this.props.onUpload([
      {
        image,
        position: 0
      }
    ])
  }

  onDeleteImage = (id) => () => this.props.onDeleteImage(id)

  getImageByID = (id) => this.props.images.find((image) => image.id == id)

  get order() {
    return this.props.images.map(({id}, order) => [id, order])
  }

  renderImage = ({key, index}) => {
    const image = this.getImageByID(key[0])
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
    const {images} = this.props
    console.log(images, _.keyBy(images, 'position'))
    return (
      <SortableList
        style={{flex: 1, display: 'flex'}}
        contentContainerStyle={{padding: 15}}
        data={_.keyBy(images, 'id')}
        order={this.order}
        renderRow={this.renderImage}
        renderFooter={this.renderFooter}
      />
    )
  }
}
