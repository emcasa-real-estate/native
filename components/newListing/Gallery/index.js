import {PureComponent} from 'react'
import {View} from 'react-native'

import ImagePicker from './ImagePicker'
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

  render() {
    return (
      <View style={{flex: 1, display: 'flex', padding: 15}}>
        <ImagePicker onPickImage={this.onPickImage} />
        <Progress {...this.props} />
      </View>
    )
  }
}
