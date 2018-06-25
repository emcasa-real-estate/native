import {PureComponent} from 'react'
import {View} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Button from './Button'
import styles from './styles'

export default class CameraPicker extends PureComponent {
  options = {
    quality: 1.0,
    noData: true,
    storageOptions: {
      skipBackup: true
    }
  }

  onSelectPhoto = () => {
    ImagePicker.launchCamera(this.options, (response) => {
      // eslint-disable-next-line no-console
      if (response.error) console.log(response.error)
      else if (!response.didCancel && response.uri) {
        this.props.onPickImage(response)
      }
    })
  }

  render() {
    return (
      <Button onPress={this.onSelectPhoto}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Tirar foto</Text>
          <Icon name="camera" />
        </View>
      </Button>
    )
  }
}
