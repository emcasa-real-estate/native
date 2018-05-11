import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function FormSection({children, active, title}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, active && styles.activeTitle]}>
        {title.toUpperCase()}
        {active ? ' *' : ''}
      </Text>
      <View style={styles.body}>{children}</View>
    </View>
  )
}
