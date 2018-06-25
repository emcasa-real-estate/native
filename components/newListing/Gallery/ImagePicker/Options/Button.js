import {TouchableHighlight} from 'react-native'

import Text from '@/components/shared/Text'
import styles, {buttonUnderlayColor} from './styles'

export default function ImagePickerButton({children, style, onPress}) {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={buttonUnderlayColor}
      onPress={onPress}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.buttonText, style]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableHighlight>
  )
}
