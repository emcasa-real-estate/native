import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'

import Icon from '@/components/shared/Icon'
import styles from './styles'

export default class GalleryPagination extends PureComponent {
  renderIcon = (index) => {
    let {currentPosition, totalPages} = this.props
    const limit = 2
    let right = currentPosition + limit
    let left = currentPosition - limit
    if (left < 0) right -= left
    if (right >= totalPages) left = totalPages - limit * 2 - 1
    if (index < left || index > right) return null
    const distanceFromActivePage = Math.min(
      limit,
      Math.abs(index - currentPosition)
    )
    const size = 12 / (distanceFromActivePage + 1) + 2
    const opacity = 0.6 / (distanceFromActivePage + 1) + 0.4
    return (
      <Icon
        key={index}
        type="solid"
        name="circle"
        color="white"
        size={size}
        style={[styles.pageIcon, {opacity}]}
      />
    )
  }

  render() {
    const {totalPages} = this.props
    return (
      <View style={styles.container}>
        {_.times(totalPages, this.renderIcon)}
      </View>
    )
  }
}
