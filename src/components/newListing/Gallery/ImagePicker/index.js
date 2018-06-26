import {PureComponent} from 'react'
import {View, TouchableOpacity, ActivityIndicator} from 'react-native'
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

  get loading() {
    const {progress} = this.props
    return progress && progress[0] / progress[1] < 1
  }

  render() {
    const {progress} = this.props
    const loading = this.loading

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={!loading ? this.onPickImage : undefined}
      >
        {loading ? (
          <View
            style={[styles.button, styles.buttonLoading, styles.flexContainer]}
          >
            <Text style={[styles.buttonText, styles.buttonTextLoading]}>
              Subindo fotos {progress[0]}/{progress[1]}
            </Text>
            <ActivityIndicator
              style={styles.activityIndicator}
              color="white"
              size="large"
            />
          </View>
        ) : (
          <View style={[styles.button, styles.flexContainer]}>
            <Icon
              name="plus"
              color={iconColor}
              stroke={iconColor}
              size={23}
              strokeWidth={20}
            />
            <Text style={styles.buttonText}>Adicionar foto</Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }
}
