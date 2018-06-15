import _ from 'lodash/fp'
import {PureComponent} from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getOptions} from '@/redux/modules/listings/feed/selectors'
import {abbrevPrice} from '@/assets/format'
import Text from '@/components/shared/Text'
import Button from '@/screens/shared/Header/TextButton'
import Search from '@/screens/listings/Search'
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

@connect((state) => ({
  options: getOptions(state, {type: 'search'})
}))
export default class ListingsFeedHeader extends PureComponent {
  static screen = 'listings.Feed.Header'

  onPress = () => {
    const {target, componentId} = this.props
    Navigation.push(target || componentId, {
      component: {
        name: Search.screen
      }
    })
  }

  render() {
    const {options} = this.props
    const filters = omitEmpty(options)
    const hasFilters = !_.isEmpty(filters)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={this.onPress}
        >
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
          <Button label="Filtrar" />
        </TouchableOpacity>
      </View>
    )
  }
}
