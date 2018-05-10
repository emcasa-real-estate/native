import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function FormSection({children, title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  )
}
