import {PureComponent} from 'react'
import {View, Platform} from 'react-native'

import {withPermission} from '@/containers/Permission'
import Camera from './Camera'
import CameraRoll from './CameraRoll'
import Button from './Button'
import styles from './styles'

@withPermission(
  Platform.select({
    android: 'readStorage',
    ios: 'photo'
  })
)
export default class ImagePickerOptions extends PureComponent {
  onPickImage = (images) =>
    requestAnimationFrame(() => {
      this.props.onDismiss()
      requestAnimationFrame(() => this.props.onPickImage(images))
    })

  componentDidMount() {
    this.props.onRequestPermission()
  }

  render() {
    const {onDismiss, permission} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Camera onPickImage={this.onPickImage} />
          {permission == 'authorized' && (
            <CameraRoll onPickImage={this.onPickImage} />
          )}
          <Button style={styles.closeButtonText} onPress={onDismiss}>
            Cancelar
          </Button>
        </View>
      </View>
    )
  }
}
