import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function ListingsFeedEmpty({title, children}) {
  return (
    <View style={styles.container}>
      {title && <Text style={[styles.text, styles.header]}>{title}</Text>}
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
