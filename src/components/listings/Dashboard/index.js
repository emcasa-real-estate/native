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
        <Text style={styles.propTitleText}>{title}</Text>
      </View>
      <View style={styles.propValue}>
        <Text style={styles.propValueText}>{value}</Text>
      </View>
    </View>
  )
}

export default function ListingDashboard({
  insertedAt,
  interestCount,
  inPersonVisitCount,
  visualisations,
  tourVisualisations,
  matterportCode
}) {
  return (
    <View style={styles.container}>
      <Property
        title="Data de criação"
        icon="calendar-alt"
        value={format.date(new Date(insertedAt))}
      />
      <Property title="Visualizações" icon="eye" value={visualisations} />
      {matterportCode && (
        <Property
          title="Visualizações do Tour 3D"
          icon="eye"
          value={tourVisualisations}
        />
      )}
    </View>
  )
}
