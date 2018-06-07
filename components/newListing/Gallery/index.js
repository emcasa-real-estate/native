import {PureComponent} from 'react'
import {View} from 'react-native'

import ImagePicker from './ImagePicker'
import Image from './Image'
import Progress from './Progress'

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

  renderImage = (image) => (
    <Image key={image.id} onDelete={this.onDeleteImage(image.id)} {...image} />
  )

  render() {
    const {images} = this.props

    return (
      <View style={{flex: 1, display: 'flex', padding: 15}}>
        {images && images.map(this.renderImage)}
        <ImagePicker onPickImage={this.onPickImage} />
        <Progress {...this.props} />
      </View>
    )
  }
}
