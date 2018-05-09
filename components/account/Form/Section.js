import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function FormSection({children, title}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  )
}
