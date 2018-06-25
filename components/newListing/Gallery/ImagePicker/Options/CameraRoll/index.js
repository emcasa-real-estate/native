import {PureComponent} from 'react'
import {View, Image, CameraRoll} from 'react-native'

export default class CameraRollPicker extends PureComponent {
  state = {
    images: []
  }

  async componentDidMount() {
    const photos = await CameraRoll.getPhotos({
      first: 4
    })
    console.log(photos)
  }

  renderImage = () => null

  render() {
    const {images} = this.state
    return <View>{images.map(this.renderImage)}</View>
  }
}
