import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function Header({title, onReturn}) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={onReturn}>
          <Icon style={styles.buttonIcon} name="chevron-left" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
