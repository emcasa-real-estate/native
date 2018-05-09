import {View, TouchableHighlight} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {underlayColor, iconColor} from './styles'

export default function FormButton({onPress, icon, children}) {
  return (
    <TouchableHighlight underlayColor={underlayColor} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
        <Icon
          name={icon}
          size={16}
          color={iconColor}
          stroke={iconColor}
          strokeWidth={30}
        />
      </View>
    </TouchableHighlight>
  )
}
