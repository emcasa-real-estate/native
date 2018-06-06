import {PureComponent} from 'react'
import {View, TouchableOpacity} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {iconColor} from './styles'

export default class GalleryImagePicker extends PureComponent {
  onPickImage = () => {
    ImagePicker.showImagePicker(
      {
        quality: 1.0,
        noData: true,
        storageOptions: {
          skipBackup: true
        }
      },
      (response) => {
        // eslint-disable-next-line no-console
        if (response.error) console.log(response.error)
        else if (!response.didCancel && response.uri) {
          this.props.onPickImage(response)
        }
      }
    )
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPickImage}>
        <View style={styles.button}>
          <Icon
            name="plus"
            color={iconColor}
            stroke={iconColor}
            size={23}
            strokeWidth={20}
          />
          <Text style={styles.buttonText}>Adicionar foto</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
