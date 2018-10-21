import _ from 'lodash'
import {PureComponent} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import {isWatchingPosition} from './module/selectors'
import {getSearchFilters} from '@/redux/modules/search/selectors'
import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles from './styles'

class HeaderButton extends PureComponent {
  render() {
    const {children, active, icon, style, onPress} = this.props
    const color = active ? colors.blue.medium : colors.gray.medium
    return (
      <View style={styles.headerButton}>
        <TouchableOpacity
          onPress={onPress}
          style={[{alignItems: 'center'}, style]}
          hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
        >
          <Icon name={icon} size={14} color={color} />
          <Text style={{fontSize: 10, color}}>{children}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export const LocationHeaderButton = connect(
  (state) => ({
    icon: 'map',
    active: isWatchingPosition(state),
    children: 'Meu local'
  }),
  null,
  null,
  {withRef: true}
)(HeaderButton)

LocationHeaderButton.screenName = '@listings.Map.LocationButton'

export const FilterHeaderButton = connect(
  (state) => ({
    icon: 'filter',
    active: !_.isEmpty(getSearchFilters(state)),
    children: 'Filtros'
  }),
  null,
  null,
  {withRef: true}
)(HeaderButton)

FilterHeaderButton.screenName = '@listings.Map.FilterButton'
