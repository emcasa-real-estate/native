import {PureComponent} from 'react'
import {View} from 'react-native'

import Camera from './Camera'
import CameraRoll from './CameraRoll'
import Button from './Button'
import styles from './styles'

export default class ImagePickerOptions extends PureComponent {
  onPickImage = (images) => {
    this.props.onPickImage(images)
    this.props.onDismiss()
  }

  render() {
    const {onDismiss} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Camera onPickImage={this.onPickImage} />
          <CameraRoll onPickImage={this.onPickImage} />
          <Button style={styles.closeButtonText} onPress={onDismiss}>
            Cancelar
          </Button>
        </View>
      </View>
    )
  }
}
