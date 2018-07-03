import {View} from 'react-native'

import * as format from '@/assets/format'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles from './styles'

function Property({title, icon, value}) {
  return (
    <View style={styles.row}>
      <View style={styles.propTitle}>
        <Icon name={icon} />
        <Text>{title}</Text>
      </View>
      <View style={styles.propValue}>
        <Text>{value}</Text>
      </View>
    </View>
  )
}

export default function ListingDashboard({insertedAt}) {
  return (
    <View style={styles.container}>
      <Property
        title="Data de criação"
        icon="calendar"
        value={format.date(new Date(insertedAt))}
      />
    </View>
  )
}
