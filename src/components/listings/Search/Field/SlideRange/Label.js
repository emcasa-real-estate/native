import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function SlideRangeLabel({children, style}) {
  return (
    <View style={[styles.label].concat(style)}>
      <View style={styles.labelBody}>
        <Text style={styles.labelText}>{children}</Text>
      </View>
      <View style={styles.labelTip} />
    </View>
  )
}
