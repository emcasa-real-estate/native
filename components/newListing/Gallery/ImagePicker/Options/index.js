import {View} from 'react-native'

import Camera from './Camera'
import CameraRoll from './CameraRoll'
import Button from './Button'
import styles from './styles'

export default function ImagePickerOptions({onDismiss, onPickImage}) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Camera onPickImage={onPickImage} />
        <CameraRoll onPickImage={onPickImage} />
        <Button style={styles.closeButtonText} onPress={onDismiss}>
          Cancelar
        </Button>
      </View>
    </View>
  )
}
