import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'
import Icon from '@/components/shared/Icon'
import Shell from './Shell'

export default function Modal({style, ...props}) {
  return (
    <Shell
      style={[{marginTop: Platform.OS === 'ios' ? 20 : 0}].concat(style)}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    display: 'flex'
  },
  headerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1
  }
})

Modal.Header = ({style, inline, iconColor, onDismiss}) => (
  <View style={[styles.header, !inline && styles.headerAbsolute, style]}>
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
)

Modal.Header.defaultProps = {
  iconColor: colors.gray.dark
}
