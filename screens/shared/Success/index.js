import {PureComponent} from 'react'
import {View, TouchableOpacity} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {iconColor} from './styles'

export default class SuccessScreen extends PureComponent {
  static screenName = 'shared.Success'

  render() {
    const {title, children, onDismiss} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onDismiss}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <Icon
              name="times"
              size={24}
              strokeWidth={20}
              stroke={iconColor}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          {typeof children === 'string' ? (
            <Text style={styles.message}>{children}</Text>
          ) : (
            children
          )}
        </View>
      </View>
    )
  }
}
