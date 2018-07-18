import {View} from 'react-native'

import * as format from '@/assets/format'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {iconColor} from './styles'

function Property({title, icon, value}) {
  return (
    <View style={styles.row}>
      <View style={styles.propTitle}>
        {typeof icon == 'string' ? (
          <Icon name={icon} color={iconColor} size={22} />
        ) : (
          icon
        )}
        <Text style={styles.propTitleText}>{title}</Text>
      </View>
      <View style={styles.propValue}>
        <Text style={styles.propValueText}>{value}</Text>
      </View>
    </View>
  )
}

export default function ListingDashboard({
  isActive,
  insertedAt,
  inPersonVisitCount,
  interestCount,
  listingVisualisationCount,
  tourVisualisationCount,
  listingFavoriteCount,
  matterportCode
}) {
  return (
    <View style={styles.container}>
      <Property
        title="Status do imóvel"
        icon={
          <View
            style={[styles.statusIcon, isActive && styles.statusIconActive]}
          />
        }
        value={isActive ? 'Ativo' : 'Inativo'}
      />
      <Property
        title="Data de criação"
        icon="calendar-check"
        value={format.date(new Date(insertedAt))}
      />
      <Property
        title="Página do imóvel"
        icon="eye"
        value={`${listingVisualisationCount} visualizações`}
      />
      {Boolean(matterportCode) && (
        <Property
          title="Tour 3D"
          icon="home-heart"
          value={`${tourVisualisationCount} visualizações`}
        />
      )}
      <Property
        title="Visitas agendadas"
        icon="calendar-alt"
        value={`${interestCount} visitas`}
      />
      <Property
        title="Visitas realizadas"
        icon="home"
        value={`${inPersonVisitCount} visitas`}
      />
      <Property
        title="Favoritado por"
        icon="heart"
        value={`${listingFavoriteCount} pessoas`}
      />
    </View>
  )
}
