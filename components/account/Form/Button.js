import {View, TouchableHighlight} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {buttonUnderlayColor, buttonIconColor} from './styles'

export default function FormButton({onPress, icon, children}) {
  return (
    <TouchableHighlight underlayColor={buttonUnderlayColor} onPress={onPress}>
      <View style={styles.button}>
        <Text styles={styles.buttonText}>{children}</Text>
        <Icon name={icon} size={12} color={buttonIconColor} />
      </View>
    </TouchableHighlight>
  )
}
