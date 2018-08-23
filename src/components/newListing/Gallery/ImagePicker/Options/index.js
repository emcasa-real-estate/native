import {PureComponent} from 'react'
import {View, Platform, Dimensions, StatusBar} from 'react-native'

import {withPermission} from '@/containers/Permission'
import Camera from './Camera'
import CameraRoll from './CameraRoll'
import Button from './Button'
import styles from './styles'

class ImagePickerOptions extends PureComponent {
  state = {
    layout: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height + (StatusBar.currentHeight || 0)
    }
  }

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
      <View style={[styles.container, this.state.layout]}>
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

export default withPermission(
  Platform.select({
    android: 'readStorage',
    ios: 'photo'
  })
)(ImagePickerOptions)
