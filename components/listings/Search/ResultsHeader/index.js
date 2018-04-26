import _ from 'lodash/fp'
import {View, Image, TouchableOpacity} from 'react-native'

import {abbrevPrice} from '@/assets/format'
import Text from '@/components/shared/Text'
import styles from './styles'

const omitEmpty = _.omitBy(_.isEmpty)

const activeFilters = _.flow(
  _.entries,
  _.map(([name, value]) => activeFilters[name].call(null, value)),
  _.join(', ')
)

activeFilters.rooms = ({min, max}) => {
  if (!max || max >= 4) return `${min}+ quartos`
  return `${min}-${max >= 4 ? '4+' : max} quartos`
}
activeFilters.price = ({min, max}) => {
  if (!max || max >= 10000000) return `R$${abbrevPrice(min)}+`
  return `R$${abbrevPrice(min)}-${abbrevPrice(max)}`
}
activeFilters.area = ({min, max}) => {
  if (!max || max >= 1000) return `${min}m²+`
  return `${min}-${max}m²`
}
activeFilters.neighborhoods = ([...value]) => {
  const result = value.pop()
  if (value.length) return `${result} e ${value.length}+`
  return result
}

const Icon = () => (
  <Image
    style={[styles.icon, {width: 20, height: 33 * 20 / 54}]}
    source={require('@/assets/img/filter-icon.png')}
  />
)

export default function ResultsHeader({onPress, value}) {
  const filters = omitEmpty(value)
  const hasFilters = !_.isEmpty(filters)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon />
        <Text
          style={[styles.text, hasFilters && styles.textActive]}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.85}
        >
          {hasFilters ? activeFilters(filters) : 'Sem filtros aplicados'}
        </Text>
        <Text style={styles.button}>Filtrar</Text>
      </View>
    </TouchableOpacity>
  )
}
