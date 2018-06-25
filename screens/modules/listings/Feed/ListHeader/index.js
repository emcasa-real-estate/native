import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function ListingsFeedHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        Encontre o imóvel perfeito para você no Rio de Janeiro
      </Text>
    </View>
  )
}
