import {View, TouchableHighlight, ActivityIndicator} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {underlayColor, iconColor} from './styles'

export default function FormButton({onPress, icon, label, children}) {
  return (
    <TouchableHighlight underlayColor={underlayColor} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1} eillipsizedMode="tail">
          {children}
        </Text>
        {Boolean(label) && <View style={styles.label}>{label}</View>}
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

export function ButtonLabel({style, loading, children}) {
  return (
    <View style={[styles.labelContainer, style]}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={styles.labelText}>{children}</Text>
      )}
    </View>
  )
}
