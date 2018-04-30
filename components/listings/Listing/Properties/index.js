import {View} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Price from '@/components/shared/Price'
import styles, {iconColor} from './styles'

const Property = ({children, icon}) => (
  <View style={styles.property}>
    <Icon name={icon} color={iconColor} style={styles.icon} />
    <Text style={styles.propertyText}>{children.toUpperCase()}</Text>
  </View>
)

export default function ListingProperties(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Property icon="bed">Quartos</Property>
        <Text style={styles.value}>{props.rooms}</Text>
      </View>
      <View style={styles.row}>
        <Property icon="bath">Banheiros</Property>
        <Text style={styles.value}>{props.bathrooms}</Text>
      </View>
      <View style={styles.row}>
        <Property icon="car">№ Vagas</Property>
        <Text style={styles.value}>{props.garage_spots}</Text>
      </View>
      <View style={styles.row}>
        <Property icon="building">Andar</Property>
        <Text style={styles.value}>{props.floor}</Text>
      </View>
      <View style={styles.row}>
        <Property icon="cube">Área</Property>
        <Text style={styles.value}>{props.area}m²</Text>
      </View>
      <View style={styles.row}>
        <Property icon="usd-circle">Preço/m²</Property>
        <Price styles={{container: styles.value}}>
          {Math.floor(props.price / props.area)}
        </Price>
      </View>
    </View>
  )
}
