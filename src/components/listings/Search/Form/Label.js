import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function Label({component: Component, style, min, max}) {
  return (
    <View style={[styles.labelHeader, style]}>
      <View style={styles.label}>
        <Component style={styles.labelText}>{min}</Component>
      </View>
      <Text style={styles.divider}>{String.fromCharCode(0x2500)}</Text>
      <View style={styles.label}>
        <Component style={styles.labelText}>{max}</Component>
      </View>
    </View>
  )
}

Label.defaultProps = {
  component: Text,
  min: 0
}
