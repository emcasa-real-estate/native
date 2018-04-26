import _ from 'lodash/fp'
import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {abbrevPrice} from '@/assets/format'
import Text from '@/components/shared/Text'
import styles from './styles'

const omitEmpty = _.omitBy(_.isEmpty)

const activeFilters = _.flow(
  _.entries,
  _.map(([name, value]) => activeFilters[name].call(null, value)),
  _.join(', ')
)

activeFilters.rooms = ({min, max}) =>
  `${min || 1}-${!max || max >= 4 ? '4+' : max} quartos`
activeFilters.price = ({min, max}) => {
  if (!min || min <= 100000) return `≤R$${abbrevPrice(max)}`
  if (!max || max >= 10000000) return `≥R$${abbrevPrice(min)}`
  return `R$${abbrevPrice(min)}-${abbrevPrice(max)}`
}
activeFilters.area = ({min, max}) => {
  if (!min) return `≤${max}m²`
  if (!max || max >= 1000) return `≥${min}m²`
  return `${min}-${max}m²`
}
activeFilters.neighborhoods = ([...value]) => {
  const result = value.pop()
  if (value.length) return `${result} e ${value.length}+`
  return result
}

export default function ResultsHeader({onPress, value}) {
  const filters = omitEmpty(value)
  const hasFilters = !_.isEmpty(filters)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon style={styles.icon} name="filter-outline" />
        <Text
          style={[styles.text, hasFilters && styles.textActive]}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.85}
        >
          {hasFilters ? activeFilters(filters) : 'Sem filtros'}
        </Text>
        <Text style={styles.button}>Filtrar</Text>
      </View>
    </TouchableOpacity>
  )
}
