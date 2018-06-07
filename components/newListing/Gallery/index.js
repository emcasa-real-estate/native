import {PureComponent} from 'react'
import {View} from 'react-native'

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

  renderImage = (image, index) => (
    <Image
      key={image.id}
      index={index}
      onDelete={this.onDeleteImage(image.id)}
      {...image}
    />
  )

  render() {
    const {images, progress} = this.props

    return (
      <View style={{flex: 1, display: 'flex', padding: 15}}>
        {images && images.map(this.renderImage)}
        <ImagePicker progress={progress} onPickImage={this.onPickImage} />
      </View>
    )
  }
}
