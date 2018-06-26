import {TouchableOpacity, View} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import {button as styles, iconColor} from './styles'

export default function MultiSelectOption({label, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <Icon
          name="times-circle"
          color={iconColor.option}
          style={styles.icon}
          size={18}
        />
      </View>
    </TouchableOpacity>
  )
}
