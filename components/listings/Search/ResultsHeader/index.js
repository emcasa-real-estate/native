import _ from 'lodash/fp'
import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Text from '@/components/shared/Text'
import styles from './styles'

const isEmpty = _.flow(_.pickBy(_.identity), _.isEmpty)

export default function ResultsHeader({onPress, value}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon style={styles.icon} name="filter-outline" />
        <Text style={[styles.text, value && styles.textActive]}>
          {!isEmpty(value) ? 'Filtros aplicados' : 'Sem filtros'}
        </Text>
        <Text style={styles.button}>Filtrar</Text>
      </View>
    </TouchableOpacity>
  )
}
