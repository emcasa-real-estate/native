import {View, TouchableOpacity} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function ImagePickerOptions({children, style, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        {typeof children === 'string' ? (
          <Text style={[styles.buttonText, style]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  )
}
