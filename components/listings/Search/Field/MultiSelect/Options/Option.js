import {TouchableHighlight, View} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import styles, {highlightColor, iconColor} from './styles'

function MultiSelectOption({label, active, onPress}) {
  const color = active ? iconColor.active : iconColor.default
  return (
    <TouchableHighlight underlayColor={highlightColor} onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.text, active && {color}]}>{label}</Text>
        <Icon name="check" color={color} />
      </View>
    </TouchableHighlight>
  )
}

export default MultiSelectOption
